/*
  Приём заявок с сайта → сообщение в Telegram. Cloudflare Worker (бесплатного тарифа хватает).
  Токен бота хранится ТОЛЬКО в переменных воркера, в коде сайта его нет.

  Настройка (≈10 минут, подробно — docs/FORMS.md):
    1. @BotFather → /newbot → получить токен.  Написать боту любое сообщение
       (или добавить бота в рабочую группу) и узнать chat_id.
    2. dash.cloudflare.com → Workers & Pages → Create Worker → вставить этот файл → Deploy.
    3. Settings → Variables and Secrets:
         BOT_TOKEN       (Secret)  — токен бота
         CHAT_ID         (Text)    — id чата/группы, куда слать заявки
         ALLOWED_ORIGIN  (Text)    — адрес сайта, например https://genservice.by
    4. Адрес воркера (https://….workers.dev) вписать в config.js → forms.endpoint.
*/
const FIELDS = [
  ["name", "Имя"], ["cbname", "Имя"], ["phone", "Телефон"], ["cbphone", "Телефон"],
  ["car", "Автомобиль"], ["serviceTitle", "Услуга"], ["date", "Дата"], ["timeTitle", "Время"], ["time", "Время"], ["comment", "Комментарий"]
];
const MAX = 600;

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const allowed = (env.ALLOWED_ORIGIN || "").split(",").map((s) => s.trim()).filter(Boolean);
    const okOrigin = !allowed.length || allowed.includes(origin);
    const cors = {
      "Access-Control-Allow-Origin": okOrigin && origin ? origin : allowed[0] || "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Accept",
      "Vary": "Origin"
    };
    const json = (obj, status) => new Response(JSON.stringify(obj), { status: status || 200, headers: { ...cors, "Content-Type": "application/json; charset=utf-8" } });

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    if (request.method !== "POST") return json({ ok: false, error: "method" }, 405);
    if (!okOrigin) return json({ ok: false, error: "origin" }, 403);
    if (!env.BOT_TOKEN || !env.CHAT_ID) return json({ ok: false, error: "not configured" }, 500);

    let data;
    try { data = await request.json(); } catch (e) { return json({ ok: false, error: "bad json" }, 400); }
    if (data._gotcha) return json({ ok: true }); /* бот-ловушка: молча «принимаем» */
    const phone = String(data.phone || data.cbphone || "").replace(/[^\d+]/g, "");
    if (phone.replace(/\D/g, "").length < 9) return json({ ok: false, error: "phone" }, 422);

    const clean = (v) => String(v == null ? "" : v).replace(/[<>&]/g, (ch) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[ch])).slice(0, MAX);
    const seen = new Set();
    const lines = [];
    FIELDS.forEach(([k, label]) => {
      if (data[k] == null || data[k] === "" || seen.has(label)) return;
      if (k === "time" && data.timeTitle) return;
      let v = data[k];
      if (k === "date" && /^\d{4}-\d{2}-\d{2}$/.test(v)) v = v.split("-").reverse().join(".");
      seen.add(label); lines.push("<b>" + label + ":</b> " + clean(v));
    });
    const kind = data.form === "callback" ? "📞 Обратный звонок" : "🛠 Запись на сервис";
    const text = "<b>" + kind + "</b>\n" + lines.join("\n") + (data.page ? "\n\n<i>" + clean(data.page) + "</i>" : "");

    const tg = await fetch("https://api.telegram.org/bot" + env.BOT_TOKEN + "/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: env.CHAT_ID, text, parse_mode: "HTML", disable_web_page_preview: true })
    });
    if (!tg.ok) return json({ ok: false, error: "telegram " + tg.status }, 502);
    return json({ ok: true });
  }
};
