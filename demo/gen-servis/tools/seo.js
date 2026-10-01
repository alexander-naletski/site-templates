#!/usr/bin/env node
/*
  SEO-файлы из config.js (без зависимостей, нужен только Node.js):
    • блок <head> в index.html между <!--SEO:START--> и <!--SEO:END-->
      (title, description, robots, canonical, Open Graph, иконки, JSON-LD AutoRepair);
    • sitemap.xml и robots.txt.

  Запуск из папки сайта:  node tools/seo.js
  Открыть сайт поисковикам: в config.js  seo.indexing: true  → node tools/seo.js
  Сменить домен:            в config.js  seo.siteUrl: "https://…/" → node tools/seo.js
*/
const fs = require("fs"), path = require("path"), vm = require("vm");
const root = path.resolve(__dirname, "..");
const ctx = { window: {} }; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, "config.js"), "utf8"), ctx);
const C = ctx.window.SITE_CONFIG, m = C.meta || {}, c = C.contacts || {}, seo = C.seo || {};
const site = String(seo.siteUrl || "").replace(/\/?$/, "/");
const index = !!seo.indexing;
const abs = (p) => (index && site ? site + String(p).replace(/^\.?\//, "") : p);
/* пока сайт закрыт (indexing:false) — превью для мессенджеров берём с адреса, где сайт реально опубликован */
const preview = seo.previewUrl ? String(seo.previewUrl).replace(/\/?$/, "/") : "";
const absOg = (p) => (index && site ? abs(p) : preview ? preview + String(p).replace(/^\.?\//, "") : p);
const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const d0 = new Date(), today = d0.getFullYear() + "-" + String(d0.getMonth() + 1).padStart(2, "0") + "-" + String(d0.getDate()).padStart(2, "0");

/* --- JSON-LD AutoRepair: только подтверждённые факты из config.js --- */
const prices = (C.sections || []).filter((s) => s.type === "prices")[0] || {};
const offers = [];
(prices.categories || []).forEach((cat) => (cat.rows || []).forEach((r) => {
  const v = String(r[1]).match(/^(\d+(?:[.,]\d+)?)\s*BYN$/); /* только однозначные цены «N BYN» */
  if (v && cat.name !== "Комплексы") offers.push({ "@type": "Offer", name: cat.name + ": " + r[0], price: v[1].replace(",", "."), priceCurrency: "BYN" });
}));
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const sched = c.schedule || [];
const ohs = [];
sched.forEach((d, i) => { if (!d) return; const o = ohs.find((x) => x.opens === d[0] && x.closes === d[1]); if (o) o.dayOfWeek.push(days[i]); else ohs.push({ "@type": "OpeningHoursSpecification", dayOfWeek: [days[i]], opens: d[0], closes: d[1] }); });
const ld = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: (C.brand || {}).name,
  description: m.description,
  url: site || undefined,
  image: ["assets/img/workshop-1024.jpg", "assets/img/hero-repair-1024.jpg", "assets/img/about-1024.jpg"].map((p) => (site ? site + p : p)),
  telephone: [c.phoneHref, c.phone2Href].filter(Boolean),
  address: { "@type": "PostalAddress", streetAddress: "ул. Кальварийская, 33, корп. 14", addressLocality: "Минск", postalCode: "220073", addressCountry: "BY" },
  geo: { "@type": "GeoCoordinates", latitude: 53.906802, longitude: 27.512937 },
  hasMap: c.mapLink,
  openingHoursSpecification: ohs,
  currenciesAccepted: "BYN",
  paymentAccepted: "Наличные, банковская карта, бесконтактная оплата, безналичный расчёт, банковский перевод",
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Парковка", value: true },
    { "@type": "LocationFeatureSpecification", name: "Wi-Fi", value: true },
    { "@type": "LocationFeatureSpecification", name: "Вход для колясок", value: true }
  ],
  areaServed: { "@type": "City", name: "Минск" },
  sameAs: [c.mapLink, "https://2gis.by/minsk/firm/70000001060776434", "https://t.me/stogenservice"].concat((c.socials || []).filter((s) => s.type === "instagram").map((s) => s.url)),
  hasOfferCatalog: offers.length ? { "@type": "OfferCatalog", name: "Цены на работы", itemListElement: offers } : undefined
  /* aggregateRating намеренно не указан: правила Google запрещают размечать рейтинг, собранный на сторонних площадках (Яндекс, 2ГИС). */
};

const title = m.title || (C.brand || {}).name;
const block = [
  "<!--SEO:START-->",
  "<title>" + esc(title) + "</title>",
  '<meta name="robots" content="' + (index ? "index, follow" : "noindex, nofollow") + '">',
  '<meta name="description" content="' + esc(m.description) + '">',
  '<meta name="theme-color" content="' + esc(m.themeColor || "#ffffff") + '">',
  index && site ? '<link rel="canonical" href="' + esc(site) + '">' : "",
  '<meta property="og:type" content="website">',
  '<meta property="og:locale" content="ru_BY">',
  '<meta property="og:site_name" content="' + esc((C.brand || {}).name) + '">',
  '<meta property="og:title" content="' + esc(title) + '">',
  '<meta property="og:description" content="' + esc(m.description) + '">',
  index && site ? '<meta property="og:url" content="' + esc(site) + '">' : preview ? '<meta property="og:url" content="' + esc(preview) + '">' : "",
  m.ogImage ? '<meta property="og:image" content="' + esc(absOg(m.ogImage)) + '">' : "",
  m.ogImage ? '<meta property="og:image:width" content="1200">\n  <meta property="og:image:height" content="630">' : "",
  '<meta name="twitter:card" content="summary_large_image">',
  '<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">',
  '<link rel="icon" href="assets/favicon-32.png" sizes="32x32" type="image/png">',
  '<link rel="apple-touch-icon" href="assets/apple-touch-icon.png">',
  '<script type="application/ld+json">' + JSON.stringify(ld).replace(/</g, "\\u003c") + "</script>",
  "<!--SEO:END-->"
].filter(Boolean).join("\n  ");

const file = path.join(root, "index.html");
let src = fs.readFileSync(file, "utf8");
if (src.includes("<!--SEO:START-->")) src = src.replace(/<!--SEO:START-->[\s\S]*?<!--SEO:END-->/, block);
else throw new Error("В index.html нет меток <!--SEO:START--> / <!--SEO:END-->");
fs.writeFileSync(file, src);

fs.writeFileSync(path.join(root, "sitemap.xml"),
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  "  <url><loc>" + esc(site) + "</loc><lastmod>" + today + "</lastmod></url>\n</urlset>\n");
fs.writeFileSync(path.join(root, "robots.txt"),
  "User-agent: *\nAllow: /\n" + (index ? "\nSitemap: " + site + "sitemap.xml\n"
    : "\n# Сайт пока закрыт от индексации метатегом noindex в index.html (config.js → seo.indexing: false).\n# Обход не запрещён намеренно: иначе поисковик не увидит noindex.\n"));
console.log("SEO: indexing=" + index + ", site=" + site + ", offers=" + offers.length);
