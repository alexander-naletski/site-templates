#!/usr/bin/env node
/*
  Пререндер (необязательно, для SEO): «запекает» готовую разметку в index.html,
  чтобы поисковики и мессенджеры видели контент без выполнения JavaScript.

  Установка (один раз, в папке сайта):  npm i puppeteer
  Запуск:                               node tools/prerender.js

  После любого изменения config.js запустите снова. Если забыть — не страшно:
  сайт заметит, что config.js изменился, и отрисует актуальный контент сам.
*/
const fs = require("fs"), path = require("path");
let puppeteer;
try { puppeteer = require("puppeteer"); } catch (e) { puppeteer = require("puppeteer-core"); }

const root = path.resolve(__dirname, "..");
const file = path.join(root, "index.html");
const START = "<!--APP:START-->", END = "<!--APP:END-->";

(async () => {
  const opts = { headless: "new", args: ["--no-sandbox"] };
  if (process.env.CHROME_PATH) opts.executablePath = process.env.CHROME_PATH;
  const browser = await puppeteer.launch(opts);
  const page = await browser.newPage();
  await page.goto("file://" + file, { waitUntil: "load" });
  const r = await page.evaluate(() => ({
    html: window.SiteCore.renderHTML(), hash: window.SiteCore.configHash(),
    title: (window.SITE_CONFIG.meta || {}).title || document.title,
    desc: (window.SITE_CONFIG.meta || {}).description || "",
    og: (window.SITE_CONFIG.meta || {}).ogImage || ""
  }));
  await browser.close();

  const escAttr = s => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  let src = fs.readFileSync(file, "utf8");
  const block = START + '\n  <div id="app" data-prerendered="' + r.hash + '">' + r.html + "</div>\n  " + END;
  if (src.includes(START)) src = src.slice(0, src.indexOf(START)) + block + src.slice(src.indexOf(END) + END.length);
  else src = src.replace(/<div id="app"[^>]*><\/div>/, block);
  src = src.replace(/<title>[\s\S]*?<\/title>/, "<title>" + escAttr(r.title) + "</title>")
           .replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="' + escAttr(r.desc) + '">');
  if (r.og && !src.includes('property="og:image"')) src = src.replace('<meta property="og:type" content="website">', '<meta property="og:type" content="website">\n  <meta property="og:title" content="' + escAttr(r.title) + '">\n  <meta property="og:description" content="' + escAttr(r.desc) + '">\n  <meta property="og:image" content="' + escAttr(r.og) + '">');
  fs.writeFileSync(file, src);
  console.log("OK: index.html пререндерен (hash " + r.hash + ", " + Math.round(r.html.length / 1024) + " КБ разметки)");
})().catch(e => { console.error(e); process.exit(1); });
