/* =====================================================================
   CORE — универсальный движок одностраничного сайта.
   Рендерит страницу по window.SITE_CONFIG (config.js).
   Одинаков для всех ниш (СТО, стоматология, клиника, усадьба, кафе…):
   отличаются только config.js, theme.css и картинки в assets/.
   Редактировать этот файл для смены контента НЕ нужно.
   ===================================================================== */
(function () {
  "use strict";

  var C = window.SITE_CONFIG || {};
  var ICONS = window.SITE_ICONS || {};
  var doc = document;
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function icon(name, cls) {
    var p = ICONS[name] || ICONS.wrench || "";
    return '<svg class="icon' + (cls ? " " + cls : "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + p + "</svg>";
  }
  /* Картинка: "assets/img/name" → name-640.webp / name-1024.webp (srcset);
     "assets/img/photo.jpg" → используется как есть. */
  function img(path, alt, opts) {
    opts = opts || {};
    if (!path) return "";
    var attrs = ' alt="' + esc(alt || "") + '"' +
      (opts.eager ? ' loading="eager" fetchpriority="high"' : ' loading="lazy"') +
      ' decoding="async"' +
      (opts.cls ? ' class="' + opts.cls + '"' : "") +
      ' width="' + (opts.w || 1024) + '" height="' + (opts.h || 768) + '"';
    if (/\.[a-z0-9]{3,4}$/i.test(path)) return '<img src="' + esc(path) + '"' + attrs + ">";
    return '<img src="' + esc(path) + '-1024.webp" srcset="' + esc(path) + "-640.webp 640w, " + esc(path) +
      '-1024.webp 1024w" sizes="' + (opts.sizes || "(max-width: 700px) 100vw, 50vw") + '"' + attrs + ">";
  }
  function btn(b, extraCls) {
    var cls = "btn btn--" + (b.style || "primary") + (extraCls ? " " + extraCls : "");
    return '<a class="' + cls + '" href="' + esc(b.href || "#") + '"' + (b.service ? ' data-service="' + esc(b.service) + '"' : "") + ">" + esc(b.text) + "</a>";
  }
  function eyebrow(s) { return s.eyebrow ? '<p class="section-eyebrow">' + esc(s.eyebrow) + "</p>" : ""; }
  /* Согласие на обработку ПД: по умолчанию НЕ отмечено + ссылка на политику (privacy.html) */
  function privacyHref() { return (C.privacy && C.privacy.href) || "privacy.html"; }
  function consentBox(text) {
    return '<label class="checkbox checkbox--consent"><input type="checkbox" name="consent" required><span class="checkbox__box">' + icon("check") + "</span><span>" +
      esc(text || "Согласен(на) на обработку персональных данных") + ' в соответствии с <a class="checkbox__link" href="' + esc(privacyHref()) + '" target="_blank" rel="noopener">Политикой обработки персональных данных</a></span></label>';
  }
  function head(s, extra) {
    if (!s.title && !s.subtitle) return "";
    return '<div class="section-head reveal">' + eyebrow(s) +
      (s.title ? '<h2 class="section-title">' + esc(s.title) + "</h2>" : "") +
      (s.subtitle ? '<p class="section-subtitle">' + esc(s.subtitle) + "</p>" : "") +
      (extra || "") + "</div>";
  }
  function demoBadge() { return C.demo ? '<span class="demo-badge" title="Демонстрационные данные">пример</span>' : ""; }
  function services() { return C.services || menuServices(); }
  /* v1.5: если services не заданы — быстрые ссылки строятся из категорий меню */
  function menuServices() {
    var out = [];
    (C.sections || []).forEach(function (x) { if (x.type === "menu" && !x.hidden) (x.categories || []).forEach(function (c) { if (c.id) out.push({ id: c.id, title: c.title, icon: c.icon || "utensils", price: c.note || "", href: "#" + (x.id || "menu") }); }); });
    return out;
  }
  function contacts() { return C.contacts || {}; }
  function navLinks(list) { return (list || []).map(function (l) { return '<a href="' + esc(l.href) + '">' + esc(l.text) + "</a>"; }).join(""); }
  function tel(href, text, cls) { return '<a class="' + (cls || "") + '" href="tel:' + esc(href) + '">' + esc(text) + "</a>"; }

  function logo() {
    var b = C.brand || {};
    var inner = b.logo
      ? '<img src="' + esc(b.logo) + '" alt="' + esc(b.name) + '" class="logo__img" width="160" height="40">'
      : '<span class="logo__text">' + esc(b.logoText || b.name) + "</span>" + (b.logoAccent ? '<span class="logo__accent">' + esc(b.logoAccent) + "</span>" : "");
    return '<a class="logo" href="#top" aria-label="' + esc(b.name) + ' — на главную">' + inner + "</a>";
  }

  /* ---------- header ---------- */
  /* Однострочная шапка (варианты: logo | nav | actions, либо логотип по центру) */
  function renderHeaderBar() {
    var c = contacts(), h = C.header || {}, t = C.topbar || {};
    var cls = "header header--bar" + (h.align === "center" ? " header--center" : "") + (h.overlay ? " header--overlay" : "");
    return '<header class="' + cls + '" id="header">' + (h.announce ? '<div class="announce"><div class="container announce__inner">' + (h.announceHref ? '<a href="' + esc(h.announceHref) + '">' + esc(h.announce) + "</a>" : "<span>" + esc(h.announce) + "</span>") + "</div></div>" : "") + '<div class="container hbar">' +
      '<button class="icon-btn header__burger" type="button" aria-label="Открыть меню" aria-controls="drawer" aria-expanded="false" data-open-drawer>' + icon("menu") + "</button>" +
      logo() +
      '<nav class="nav hbar__nav" aria-label="Основное меню">' + navLinks(C.nav) + "</nav>" +
      '<div class="header__actions">' +
        (h.callback && t.callbackText ? '<button type="button" class="hbar__link" data-open-callback>' + esc(t.callbackText) + "</button>" : "") +
        (c.phone && h.phone !== false ? '<a class="hbar__phone" href="tel:' + esc(c.phoneHref) + '">' + icon("phone") + "<span>" + esc(c.phone) + "</span></a>" : "") +
        (C.cta ? btn({ text: C.cta.text, href: C.cta.href, style: h.ctaStyle || "primary" }, "header__cta btn--sm") : "") +
        (c.phone ? '<a class="icon-btn header__call-mobile" href="tel:' + esc(c.phoneHref) + '" aria-label="Позвонить">' + icon("phone") + "</a>" : "") +
      "</div></div></header>";
  }

  function renderHeader() {
    if (C.header && C.header.variant === "bar") return renderHeaderBar();
    var c = contacts(), t = C.topbar || {};
    var top = '<div class="topbar"><div class="container topbar__inner">' +
      '<nav class="topbar__links" aria-label="Дополнительное меню">' + (t.links || []).map(function (l) { return '<a href="' + esc(l.href) + '">' + esc(l.text) + "</a>"; }).join("") + "</nav>" +
      '<div class="topbar__right">' +
        (c.hoursShort ? '<span class="topbar__hours">' + icon("clock") + (c.schedule ? '<span data-open-status data-short>' + esc(c.hoursShort) + "</span>" : esc(c.hoursShort)) + "</span>" : "") +
        (c.phone ? tel(c.phoneHref, c.phone, "topbar__phone") : "") +
        (t.callbackText ? '<button type="button" class="topbar__callback" data-open-callback>' + esc(t.callbackText) + "</button>" : "") +
      "</div></div></div>";

    var svcMenu = '<div class="svc-menu" id="svc-menu" hidden><div class="container"><div class="svc-menu__grid">' +
      services().map(function (s) {
        return '<a class="svc-menu__item" href="' + esc(s.href || "#booking") + '" data-service="' + esc(s.id) + '">' +
          '<span class="svc-menu__icon">' + icon(s.icon) + "</span>" +
          '<span class="svc-menu__body"><span class="svc-menu__title">' + esc(s.title) + "</span>" +
          (s.price ? '<span class="svc-menu__price">' + esc(s.price) + "</span>" : "") + "</span></a>";
      }).join("") + "</div></div></div>";

    var main = '<div class="header__main"><div class="container header__inner">' +
      '<button class="icon-btn header__burger" type="button" aria-label="Открыть меню" aria-controls="drawer" aria-expanded="false" data-open-drawer>' + icon("menu") + "</button>" +
      logo() +
      '<button class="btn btn--primary btn--sm header__svc-btn" type="button" aria-expanded="false" aria-controls="svc-menu" data-svc-toggle>' + icon("menu") + "<span>" + esc(C.servicesButton || "Услуги") + "</span></button>" +
      '<a class="header__info" href="#contacts">' + icon("pin") + '<span><span class="header__info-main">' + esc(c.address || "") + '</span><span class="header__info-sub">' + esc(c.hoursShort || "") + "</span></span></a>" +
      '<div class="header__actions">' +
        (c.phone ? '<a class="header__phone" href="tel:' + esc(c.phoneHref) + '">' + icon("phone") + '<span class="header__phone-text">' + esc(c.phone) + "</span></a>" : "") +
        (C.cta ? btn({ text: C.cta.text, href: C.cta.href, style: "primary" }, "header__cta") : "") +
        (c.phone ? '<a class="icon-btn header__call-mobile" href="tel:' + esc(c.phoneHref) + '" aria-label="Позвонить">' + icon("phone") + "</a>" : "") +
      "</div></div></div>";

    var nav = '<div class="header__nav"><div class="container header__nav-inner">' +
      '<nav class="nav" aria-label="Основное меню">' + (C.nav || []).map(function (l) { return '<a href="' + esc(l.href) + '">' + esc(l.text) + "</a>"; }).join("") + "</nav>" +
      (C.navRight && C.navRight.length ? '<span class="nav__divider" aria-hidden="true"></span><nav class="nav nav--right" aria-label="Быстрые ссылки">' + C.navRight.map(function (l) { return '<a href="' + esc(l.href) + '">' + esc(l.text) + "</a>"; }).join("") + "</nav>" : "") +
      "</div></div>";

    return '<header class="header" id="header">' + top + main + nav + svcMenu + "</header>";
  }

  function renderDrawer() {
    var c = contacts();
    return '<div class="drawer" id="drawer" aria-hidden="true">' +
      '<div class="drawer__overlay" data-close-drawer></div>' +
      '<aside class="drawer__panel" role="dialog" aria-modal="true" aria-label="Меню" tabindex="-1">' +
        '<div class="drawer__head">' + logo() + '<button class="icon-btn" type="button" aria-label="Закрыть меню" data-close-drawer>' + icon("close") + "</button></div>" +
        '<nav class="drawer__nav" aria-label="Мобильное меню">' + (C.nav || []).concat(C.navRight || []).map(function (l) { return '<a href="' + esc(l.href) + '" data-close-drawer>' + esc(l.text) + icon("chevronRight") + "</a>"; }).join("") + "</nav>" +
        '<div class="drawer__svc"><p class="drawer__label">' + esc(C.servicesButton || "Услуги") + '</p><div class="drawer__chips">' +
          services().map(function (s) { return '<a class="chip" href="' + esc(s.href || "#booking") + '" data-service="' + esc(s.id) + '" data-close-drawer>' + esc(s.title) + "</a>"; }).join("") + "</div></div>" +
        '<div class="drawer__contacts">' +
          (c.phone ? tel(c.phoneHref, c.phone, "drawer__phone") : "") +
          (c.hoursShort ? '<p class="drawer__meta">' + esc(c.hoursShort) + "</p>" : "") +
          (c.address ? '<p class="drawer__meta">' + esc(c.address) + "</p>" : "") +
          (C.cta ? btn({ text: C.cta.text, href: C.cta.href }, "btn--block") .replace("<a ", "<a data-close-drawer ") : "") +
        "</div></aside></div>";
  }

  /* ---------- sections ---------- */
  var R = {};

  function heroTitle(s) {
    return '<h1 class="hero__title">' + esc(s.title) + (s.titleAccent ? ' <span class="hero__accent">' + esc(s.titleAccent) + "</span>" : "") + "</h1>";
  }
  function heroButtons(s) { return (s.openStatus && contacts().schedule ? '<p class="hero__status"><span data-open-status></span></p>' : "") + (s.buttons && s.buttons.length ? '<div class="hero__buttons">' + s.buttons.map(function (b) { return btn(b); }).join("") + "</div>" : ""); }
  var HERO = {};
  /* По центру: бейдж, крупный заголовок и «интерфейс» (mockup) — стиль SaaS */
  HERO.centered = function (s) {
    return '<section class="hero hero--centered" id="' + esc(s.id || "top") + '"><div class="container">' +
      '<div class="hero__content">' +
        (s.badge ? '<a class="hero__badge" href="' + esc(s.badge.href || "#services") + '">' + (s.badge.tag ? '<span class="hero__badge-tag">' + esc(s.badge.tag) + "</span>" : "") + "<span>" + esc(s.badge.text) + "</span>" + icon("chevronRight") + "</a>" : "") +
        heroTitle(s) + (s.text ? '<p class="hero__text">' + esc(s.text) + "</p>" : "") + heroButtons(s) +
      "</div>" + (s.calc ? calcWidget(s.calc) : s.mockup ? mockup(s.mockup) : "") + "</div></section>";
  };
  /* Калькулятор стоимости с рассрочкой (карточка в hero или отдельный блок) */
  function money(v, cur) { return Math.round(v).toLocaleString("ru-RU").replace(/\u00a0/g, " ") + " " + (cur || "BYN"); }
  function calcWidget(c) {
    var items = c.items || [], first = items[0] || {};
    return '<div class="calc reveal" data-calc role="group" aria-label="' + esc(c.title || "Калькулятор стоимости") + '">' +
      (c.title ? '<p class="calc__title">' + esc(c.title) + "</p>" : "") +
      '<div class="calc__row"><label class="calc__label" for="calc-item">' + esc(c.itemLabel || "Услуга") + '</label><div class="select calc__select"><select id="calc-item" data-calc-item>' +
        items.map(function (x, i) { return '<option value="' + i + '">' + esc(x.label) + "</option>"; }).join("") + "</select>" + icon("chevronDown") + "</div></div>" +
      '<div class="calc__row calc__row--qty" data-calc-qtyrow' + (first.unit ? "" : " hidden") + '><span class="calc__label" id="calc-qty-l">' + esc(c.qtyLabel || "Количество") + ' <span data-calc-unit>' + esc(first.unit || "") + '</span></span>' +
        '<div class="calc__stepper"><button type="button" class="round-btn" aria-label="Меньше" data-calc-minus>' + icon("minus") + '</button><output class="calc__qty" data-calc-qty aria-labelledby="calc-qty-l">1</output><button type="button" class="round-btn" aria-label="Больше" data-calc-plus>' + icon("plus") + "</button></div></div>" +
      '<div class="calc__row"><span class="calc__label">' + esc(c.termLabel || "Рассрочка") + '</span><div class="calc__terms" role="radiogroup" aria-label="' + esc(c.termLabel || "Рассрочка") + '">' +
        (c.terms || [0, 6, 12]).map(function (t, i) { return '<button type="button" class="calc__term' + (i === (c.termDefault || 0) ? " is-active" : "") + '" role="radio" aria-checked="' + (i === (c.termDefault || 0)) + '" data-calc-term="' + t + '">' + esc(t ? t + " мес" : (c.noTermText || "Сразу")) + "</button>"; }).join("") + "</div></div>" +
      '<div class="calc__result"><div class="calc__sum"><span class="calc__label">' + esc(c.totalLabel || "Ориентировочно") + '</span><strong class="calc__total" data-calc-total aria-live="polite">' + money(first.price || 0, c.currency) + "</strong></div>" +
        '<div class="calc__sum calc__sum--month"><span class="calc__label">' + esc(c.monthLabel || "Платёж в месяц") + '</span><strong class="calc__month" data-calc-month>—</strong></div></div>' +
      (c.note ? '<p class="calc__note">' + icon("checkCircle") + "<span>" + esc(c.note) + "</span></p>" : "") +
      '<a class="btn btn--primary btn--block calc__btn" href="' + esc(c.buttonHref || "#booking") + '" data-calc-btn' + (first.service ? ' data-service="' + esc(first.service) + '"' : "") + ">" + esc(c.buttonText || "Записаться") + "</a>" +
      (c.disclaimer ? '<p class="calc__disclaimer">' + esc(c.disclaimer) + "</p>" : "") +
    "</div>";
  }
  R.calc = function (s) {
    return '<section class="section calc-section" id="' + esc(s.id || "calc") + '"><div class="container calc-section__grid">' + head(s) + calcWidget(s) + "</div></section>";
  };
  /* Коллаж: цветной фон, крупные фото и огромный заголовок поверх (стиль мебельного бренда) */
  HERO.collage = function (s) {
    var im = s.images || [], ctr = s.layout === "center";
    return '<section class="hero hero--collage' + (ctr ? " hero--collage-center" : "") + '" id="' + esc(s.id || "top") + '"><div class="container hero__stage">' +
      im.map(function (x, i) { return '<figure class="hero__pic hero__pic--' + (i + 1) + '">' + img(x.image, x.alt, { eager: i === 0, sizes: i === 0 ? "(max-width: 700px) 100vw, 60vw" : "(max-width: 700px) 50vw, 25vw", w: 1024, h: 768 }) + "</figure>"; }).join("") +
      '<div class="hero__content">' + (s.eyebrow ? '<p class="hero__eyebrow">' + esc(s.eyebrow) + "</p>" : "") + heroTitle(s) + (ctr ? (s.text ? '<p class="hero__text">' + esc(s.text) + "</p>" : "") + heroButtons(s) : "") + "</div>" +
      (s.side ? '<p class="hero__side" aria-hidden="true">' + esc(s.side) + "</p>" : "") +
      "</div>" + (!ctr && (s.text || s.buttons) ? '<div class="container hero__below">' + (s.text ? '<p class="hero__text">' + esc(s.text) + "</p>" : "") + heroButtons(s) + "</div>" : "") + "</section>";
  };
  function mockup(m) {
    return '<div class="mock" role="group" aria-label="' + esc(m.label || "Пример интерфейса") + '"><div class="mock__bar"><span class="mock__dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="mock__url">' + esc(m.window || "") + "</span></div>" +
      '<div class="mock__body">' +
        '<div class="mock__side"><p class="mock__brand">' + esc(m.brand || (C.brand || {}).name || "") + "</p><ul>" + (m.sidebar || []).map(function (x) {
          return '<li class="' + (x.active ? "is-active" : "") + '">' + icon(x.icon || "circle") + "<span>" + esc(x.text) + "</span>" + (x.count ? "<em>" + esc(x.count) + "</em>" : "") + "</li>";
        }).join("") + "</ul></div>" +
        '<div class="mock__main"><div class="mock__head"><span class="mock__id">' + esc(m.id || "") + '</span><p class="mock__title">' + esc(m.title || "") + '</p><p class="mock__sub">' + esc(m.subtitle || "") + "</p></div>" +
          '<ol class="mock__steps">' + (m.steps || []).map(function (x) {
            return '<li class="is-' + esc(x.state || "todo") + '"><span class="mock__dot" aria-hidden="true"></span><span class="mock__step">' + esc(x.text) + '</span><span class="mock__meta">' + esc(x.meta || "") + "</span></li>";
          }).join("") + "</ol>" +
          (m.progress != null ? '<div class="mock__progress"><span class="mock__progress-label">' + esc(m.progressLabel || "Готовность") + '</span><span class="mock__progress-bar"><i style="width:' + (+m.progress || 0) + '%"></i></span><span class="mock__progress-val">' + (+m.progress || 0) + "%</span></div>" : "") +
        "</div>" +
        '<div class="mock__props"><p class="mock__label">' + esc(m.propsTitle || "Свойства") + "</p><dl>" + (m.props || []).map(function (x) {
          return "<div><dt>" + esc(x[0]) + "</dt><dd" + (x[2] ? ' class="is-' + esc(x[2]) + '"' : "") + ">" + esc(x[1]) + "</dd></div>";
        }).join("") + "</dl></div>" +
      "</div></div>";
  }
  /* Полноэкранное фото с текстом поверх (align: "center" | "left") */
  HERO.cover = function (s) {
    return '<section class="hero hero--cover hero--' + esc(s.align || "left") + '" id="' + esc(s.id || "top") + '">' +
      '<div class="hero__bg">' + img(s.image, s.imageAlt, { eager: true, sizes: "100vw", w: 1024, h: 683 }) + "</div>" +
      '<div class="container hero__inner"><div class="hero__content">' +
        (s.eyebrow ? '<p class="hero__eyebrow">' + esc(s.eyebrow) + "</p>" : "") + heroTitle(s) +
        (s.text ? '<p class="hero__text">' + esc(s.text) + "</p>" : "") + heroButtons(s) +
        (s.list && s.list.length ? '<ul class="hero__list">' + s.list.map(function (l) { return '<li><a href="' + esc(l.href || "#booking") + '"' + (l.service ? ' data-service="' + esc(l.service) + '"' : "") + '><span class="hero__list-text">' + esc(l.text) + "</span>" + (l.note ? '<span class="hero__list-note">' + esc(l.note) + "</span>" : "") + "</a></li>"; }).join("") + "</ul>" : "") +
      "</div>" + (s.caption ? '<p class="hero__caption">' + esc(s.caption) + "</p>" : "") + "</div></section>";
  };
  /* Журнальный: огромный заголовок + сетка фото с подписями */
  HERO.editorial = function (s) {
    return '<section class="hero hero--editorial" id="' + esc(s.id || "top") + '"><div class="container">' +
      (s.eyebrow ? '<p class="hero__eyebrow">' + esc(s.eyebrow) + "</p>" : "") + heroTitle(s) +
      '<div class="hero__row">' + (s.text ? '<p class="hero__text">' + esc(s.text) + "</p>" : "") + heroButtons(s) + "</div>" +
      '<div class="hero__grid">' + (s.images || []).map(function (x, i) {
        return '<a class="hero__card" href="' + esc(x.href || "#services") + '"' + (x.service ? ' data-service="' + esc(x.service) + '"' : "") + '><span class="hero__img">' + img(x.image, x.alt || x.caption, { eager: true, sizes: "(max-width: 700px) 100vw, 50vw", w: 1024, h: 683 }) + "</span>" +
          '<span class="hero__cap">' + (x.label ? '<span class="hero__cap-label">' + esc(x.label) + "</span>" : "") + "<span>" + esc(x.caption || "") + "</span></span></a>";
      }).join("") + "</div></div></section>";
  };

  R.hero = function (s) {
    if (s.variant && HERO[s.variant]) return HERO[s.variant](s);
    var slides = s.slides || [];
    var many = slides.length > 1;
    return '<section class="hero" id="' + esc(s.id || "top") + '" aria-roledescription="carousel" aria-label="Главные предложения">' +
      '<div class="container"><div class="hero__viewport">' +
        '<div class="hero__track" data-hero-track tabindex="-1">' +
        slides.map(function (sl, i) {
          return '<article class="hero__slide" style="--slide-bg:' + esc(sl.bg || "var(--color-bg-soft)") + '" aria-roledescription="slide" aria-label="' + (i + 1) + " из " + slides.length + '">' +
            '<div class="hero__content">' +
              (sl.eyebrow ? '<p class="hero__eyebrow">' + esc(sl.eyebrow) + "</p>" : "") +
              (i === 0 ? "<h1 class=\"hero__title\">" : '<h2 class="hero__title">') + esc(sl.title) + (i === 0 ? "</h1>" : "</h2>") +
              (sl.text ? '<p class="hero__text">' + esc(sl.text) + "</p>" : "") +
              (sl.openStatus && contacts().schedule ? '<p class="hero__status"><span data-open-status></span></p>' : "") +
              '<div class="hero__buttons">' + (sl.buttons || []).map(function (b) { return btn(b); }).join("") + "</div>" +
            "</div>" +
            '<div class="hero__media">' + img(sl.image, sl.imageAlt, { eager: i === 0, sizes: "(max-width: 900px) 100vw, 55vw", w: 1024, h: 768 }) + "</div>" +
          "</article>";
        }).join("") +
        "</div>" +
        (many ? '<div class="hero__controls">' +
          '<div class="hero__dots" role="tablist" aria-label="Выбор слайда">' + slides.map(function (_, i) { return '<button type="button" class="hero__dot' + (i === 0 ? " is-active" : "") + '" role="tab" aria-label="Слайд ' + (i + 1) + '" aria-selected="' + (i === 0) + '" data-hero-dot="' + i + '"></button>'; }).join("") + "</div>" +
          '<div class="hero__arrows"><button type="button" class="round-btn" aria-label="Предыдущий слайд" data-hero-prev>' + icon("chevronLeft") + '</button><button type="button" class="round-btn" aria-label="Следующий слайд" data-hero-next>' + icon("chevronRight") + "</button></div>" +
        "</div>" : "") +
      "</div></div></section>";
  };

  R.features = function (s) {
    return '<section class="section section--soft features" id="' + esc(s.id) + '"><div class="container">' + head(s) +
      '<div class="features__grid">' + (s.items || []).map(function (f, i) {
        return '<div class="feature card reveal" style="--d:' + i * 60 + 'ms">' + '<span class="feature__icon">' + icon(f.icon) + "</span>" +
          '<h3 class="feature__title">' + esc(f.title) + '</h3><p class="feature__text">' + esc(f.text) + "</p></div>";
      }).join("") + "</div></div></section>";
  };

  function svcMeta(v) { return [v.price, v.time].filter(Boolean).map(esc).join(" · "); }
  var SVC = {};
  /* «Бенто»-сетка карточек с иконками (без фото) */
  SVC.bento = function (s) {
    return '<div class="bento">' + services().map(function (v, i) {
      return '<a class="bento__item' + (v.wide ? " bento__item--wide" : "") + ' reveal" style="--d:' + (i % 3) * 60 + 'ms" href="#booking" data-service="' + esc(v.id) + '">' +
        '<span class="bento__icon">' + icon(v.icon) + '</span><h3 class="bento__title">' + esc(v.title) + '</h3><p class="bento__text">' + esc(v.text) + "</p>" +
        '<span class="bento__foot"><span class="bento__price">' + esc(v.price || "") + '</span><span class="bento__time">' + esc(v.time || "") + '</span><span class="bento__go">' + icon("arrowRight") + "</span></span></a>";
    }).join("") + "</div>";
  };
  /* Нумерованный список-индекс (строки) */
  SVC.list = function (s) {
    return '<ol class="svc-list">' + services().map(function (v, i) {
      return '<li class="svc-row reveal"><a class="svc-row__link" href="#booking" data-service="' + esc(v.id) + '">' +
        '<span class="svc-row__num">' + String(i + 1).padStart(2, "0") + '</span><span class="svc-row__main"><h3 class="svc-row__title">' + esc(v.title) + '</h3><span class="svc-row__text">' + esc(v.text) + "</span></span>" +
        '<span class="svc-row__time">' + esc(v.time || "") + '</span><span class="svc-row__price">' + esc(v.price || "") + '</span><span class="svc-row__go">' + icon("arrowUpRight") + "</span>" +
        (s.hoverImages && v.image ? '<span class="svc-row__img" aria-hidden="true">' + img(v.image, "", { sizes: "320px", w: 640, h: 480 }) + "</span>" : "") +
      "</a></li>";
    }).join("") + "</ol>";
  };
  /* Горизонтальная лента плиток-фото (стиль спортивного магазина) */
  SVC.tiles = function (s) {
    return '<div class="tiles" data-rail tabindex="0" aria-label="Услуги, прокручиваются по горизонтали">' + services().map(function (v) {
      return '<a class="tile" href="#booking" data-service="' + esc(v.id) + '"><span class="tile__img">' + img(v.image, v.title, { sizes: "(max-width: 600px) 80vw, 460px", w: 640, h: 800 }) + "</span>" +
        '<span class="tile__body">' + (s.showLabel ? '<span class="tile__label">' + esc(v.time || "") + "</span>" : "") + '<h3 class="tile__title">' + esc(v.title) + '</h3>' + (s.showText ? '<span class="tile__text">' + esc(v.text) + "</span>" : "") + '<span class="tile__meta">' + (s.showLabel ? esc(v.price || "") : svcMeta(v)) + "</span>" +
          (s.linkText ? '<span class="tile__link">' + esc(s.linkText) + icon("chevronRight") + "</span>" : "") + "</span></a>";
    }).join("") + "</div>";
  };
  function railArrows(label) {
    return '<div class="carousel-arrows"><button type="button" class="round-btn" aria-label="Назад: ' + esc(label) + '" data-rail-prev>' + icon("chevronLeft") + '</button><button type="button" class="round-btn" aria-label="Вперёд: ' + esc(label) + '" data-rail-next>' + icon("chevronRight") + "</button></div>";
  }

  R.services = function (s) {
    if (s.variant && SVC[s.variant]) {
      var rowHead = s.variant === "tiles";
      return '<section class="section services services--' + esc(s.variant) + '" id="' + esc(s.id) + '"><div class="container">' +
        (rowHead ? '<div class="section-head section-head--row reveal"><div>' + eyebrow(s) + '<h2 class="section-title">' + esc(s.title) + "</h2>" + (s.subtitle ? '<p class="section-subtitle">' + esc(s.subtitle) + "</p>" : "") + "</div>" + railArrows("услуги") + "</div>" : head(s)) +
        SVC[s.variant](s) + "</div></section>";
    }
    return '<section class="section services" id="' + esc(s.id) + '"><div class="container">' + head(s) +
      '<div class="services__grid">' + services().map(function (v, i) {
        return '<article class="svc-card reveal" style="--d:' + (i % 3) * 60 + 'ms">' +
          '<div class="svc-card__media">' + img(v.image, v.title, { sizes: "(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 440px", w: 640, h: 480 }) + (v.badge ? '<span class="svc-card__badge">' + esc(v.badge) + "</span>" : "") +
            '<span class="svc-card__icon">' + icon(v.icon) + "</span></div>" +
          '<div class="svc-card__body"><h3 class="svc-card__title">' + esc(v.title) + "</h3>" +
            '<p class="svc-card__text">' + esc(v.text) + "</p>" +
            '<div class="svc-card__foot"><div class="svc-card__meta">' + (v.price ? '<span class="svc-card__price">' + esc(v.price) + "</span>" : "") + (v.time ? '<span class="svc-card__time">' + icon("clock") + esc(v.time) + "</span>" : "") + "</div>" +
            '<a class="btn btn--soft btn--sm" href="#booking" data-service="' + esc(v.id) + '">' + esc(s.buttonText || "Записаться") + "</a></div>" +
          "</div></article>";
      }).join("") + "</div></div></section>";
  };

  function priceRows(c) { return '<ul class="price-list">' + (c.rows || []).map(function (r) { return '<li class="price-row"><span class="price-row__name">' + esc(r[0]) + '</span><span class="price-row__dots" aria-hidden="true"></span><span class="price-row__value">' + esc(r[1]) + "</span></li>"; }).join("") + "</ul>"; }
  R.prices = function (s) {
    var cats = s.categories || [];
    if (s.variant === "table") {
      return '<section class="section prices prices--table" id="' + esc(s.id) + '"><div class="container">' + head(s) +
        '<div class="price-table">' + cats.map(function (c, i) { return '<div class="price-col reveal" style="--d:' + (i % 3) * 60 + 'ms"><h3 class="price-col__title">' + esc(c.name) + "</h3>" + priceRows(c) + "</div>"; }).join("") + "</div>" +
        '<div class="prices__foot">' + (s.note ? '<p class="prices__note">' + esc(s.note) + "</p>" : "") + btn({ text: s.buttonText || "Записаться", href: "#booking" }) + "</div></div></section>";
    }
    return '<section class="section section--soft prices" id="' + esc(s.id) + '"><div class="container">' + head(s) +
      '<div class="prices__box card reveal">' +
        '<div class="tabs" role="tablist" aria-label="Категории цен">' + cats.map(function (c, i) {
          return '<button type="button" class="tab' + (i === 0 ? " is-active" : "") + '" role="tab" id="ptab-' + i + '" aria-controls="ppanel-' + i + '" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '" data-tab="' + i + '">' + esc(c.name) + "</button>";
        }).join("") + "</div>" +
        cats.map(function (c, i) {
          return '<div class="prices__panel" role="tabpanel" id="ppanel-' + i + '" aria-labelledby="ptab-' + i + '"' + (i === 0 ? "" : " hidden") + '><ul class="price-list">' +
            (c.rows || []).map(function (r) { return '<li class="price-row"><span class="price-row__name">' + esc(r[0]) + '</span><span class="price-row__dots" aria-hidden="true"></span><span class="price-row__value">' + esc(r[1]) + "</span></li>"; }).join("") +
            "</ul></div>";
        }).join("") +
        '<div class="prices__foot">' + (s.note ? '<p class="prices__note">' + esc(s.note) + "</p>" : "") + btn({ text: s.buttonText || "Записаться", href: "#booking" }) + "</div>" +
      "</div></div></section>";
  };

  R.banner = function (s) {
    var full = s.variant === "full";
    return '<section class="section banner-section' + (full ? " banner-section--full" : "") + '" id="' + esc(s.id) + '">' + (full ? "" : '<div class="container">') + '<div class="banner' + (full ? " banner--full" : "") + (s.align ? " banner--" + esc(s.align) : "") + ' reveal">' +
      img(s.image, s.imageAlt, { cls: "banner__img", sizes: "(max-width: 1400px) 100vw, 1360px", w: 1024, h: 576 }) +
      '<div class="banner__content">' + (s.eyebrow ? '<p class="banner__eyebrow">' + esc(s.eyebrow) + "</p>" : "") +
        '<h2 class="banner__title">' + esc(s.title) + "</h2>" +
        (s.text ? '<p class="banner__text">' + esc(s.text) + "</p>" : "") +
        (s.buttonText ? '<a class="btn btn--' + esc(s.buttonStyle || "outline-light") + '" href="' + esc(s.buttonHref || "#contacts") + '">' + esc(s.buttonText) + "</a>" : "") +
      "</div></div>" + (full ? "" : "</div>") + "</section>";
  };

  R.about = function (s) {
    return '<section class="section about' + (s.variant ? " about--" + esc(s.variant) : "") + '" id="' + esc(s.id) + '"><div class="container about__grid">' +
      '<div class="about__media reveal">' + img(s.image, s.imageAlt, { sizes: "(max-width: 900px) 100vw, 50vw", w: 1024, h: 768 }) + "</div>" +
      '<div class="about__body reveal">' + eyebrow(s) +
        '<h2 class="section-title">' + esc(s.title) + "</h2>" +
        (s.text ? '<p class="about__text">' + esc(s.text) + "</p>" : "") +
        (s.list ? '<ul class="checklist">' + s.list.map(function (li) { return "<li>" + icon("check") + "<span>" + esc(li) + "</span></li>"; }).join("") + "</ul>" : "") +
        (s.stats ? '<div class="stats">' + s.stats.map(function (st) {
          return '<div class="stat"><div class="stat__value"><span data-count="' + esc(st.value) + '">' + esc(st.value) + "</span>" + (st.suffix ? '<span class="stat__suffix">' + esc(st.suffix) + "</span>" : "") + '</div><div class="stat__label">' + esc(st.label) + "</div></div>";
        }).join("") + "</div>" : "") +
      "</div></div></section>";
  };

  R.steps = function (s) {
    return '<section class="section section--soft steps" id="' + esc(s.id) + '"><div class="container">' + head(s) +
      '<ol class="steps__list">' + (s.items || []).map(function (st, i) {
        return '<li class="step card reveal" style="--d:' + i * 60 + 'ms"><span class="step__num">' + (i + 1) + '</span><h3 class="step__title">' + esc(st.title) + '</h3><p class="step__text">' + esc(st.text) + "</p></li>";
      }).join("") + "</ol></div></section>";
  };

  R.gallery = function (s) {
    return '<section class="section gallery' + (s.variant ? " gallery--" + esc(s.variant) : "") + (s.lightbox ? " gallery--zoom" : "") + '" id="' + esc(s.id) + '"><div class="container">' +
      head(s, s.note && C.demo ? '<p class="section-note">' + esc(s.note) + "</p>" : "") +
      '<div class="gallery__grid">' + (s.items || []).map(function (g, i) {
        var media = g.before && g.after
          ? '<div class="ba" style="--pos:50%">' +
              img(g.after, g.title + " — после", { cls: "ba__img ba__after", sizes: "(max-width: 700px) 100vw, 33vw", w: 1024, h: 683 }) +
              '<div class="ba__before">' + img(g.before, g.title + " — до", { cls: "ba__img", sizes: "(max-width: 700px) 100vw, 33vw", w: 1024, h: 683 }) + "</div>" +
              '<span class="ba__label ba__label--before">До</span><span class="ba__label ba__label--after">После</span>' +
              '<span class="ba__handle" aria-hidden="true"><span class="ba__knob">' + icon("chevronLeft") + icon("chevronRight") + "</span></span>" +
              '<input class="ba__range" type="range" min="0" max="100" value="50" aria-label="Сравнить до и после: ' + esc(g.title) + '">' +
            "</div>"
          : s.lightbox ? '<button type="button" class="gallery__img gallery__zoom" data-lb data-lb-title="' + esc(g.title) + '" aria-label="Открыть фото: ' + esc(g.title) + '">' + img(g.image, g.alt || g.title, { sizes: "(max-width: 700px) 100vw, 33vw", w: 1024, h: 683 }) + '<span class="gallery__zoom-icon" aria-hidden="true">' + icon("expand") + "</span></button>"
          : '<div class="gallery__img">' + img(g.image, g.alt || g.title, { sizes: "(max-width: 700px) 100vw, 33vw", w: 1024, h: 683 }) + "</div>";
        return '<figure class="work card reveal' + (g.size ? " work--" + esc(g.size) : "") + '" style="--d:' + (i % 4) * 60 + 'ms">' + media + '<figcaption class="work__body"><h3 class="work__title">' + (g.href && !s.lightbox ? '<a class="work__link" href="' + esc(g.href) + '">' + esc(g.title) + "</a>" : esc(g.title)) + "</h3>" + (g.text ? '<p class="work__text">' + esc(g.text) + "</p>" : "") + "</figcaption></figure>";
      }).join("") + "</div></div></section>";
  };

  function stars(n) {
    var out = "";
    for (var i = 1; i <= 5; i++) out += '<svg class="star' + (i <= n ? " is-on" : "") + '" viewBox="0 0 24 24" aria-hidden="true"><path d="' + "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" + '"/></svg>';
    return '<span class="stars" role="img" aria-label="Оценка ' + n + ' из 5">' + out + "</span>";
  }
  function reviewCard(r) {
    var initials = String(r.name || "?").split(/\s+/).map(function (w) { return w.charAt(0); }).join("").slice(0, 2);
    return '<article class="review card"><div class="review__top">' + stars(r.rating || 5) + (r.date ? '<span class="review__date">' + esc(r.date) + "</span>" : "") + "</div>" +
      '<p class="review__text">' + esc(r.text) + "</p>" +
      '<div class="review__author"><span class="avatar" aria-hidden="true">' + esc(initials) + '</span><span><span class="review__name">' + esc(r.name) + "</span>" + (r.car ? '<span class="review__car">' + esc(r.car) + "</span>" : "") + "</span></div></article>";
  }
  R.reviews = function (s) {
    if (s.variant === "grid") {
      return '<section class="section section--soft reviews reviews--grid" id="' + esc(s.id) + '"><div class="container">' +
        '<div class="section-head reveal">' + eyebrow(s) + '<h2 class="section-title">' + esc(s.title) + demoBadge() + "</h2>" + (s.subtitle ? '<p class="section-subtitle">' + esc(s.subtitle) + "</p>" : "") + "</div>" +
        '<div class="reviews__grid">' + (s.items || []).map(function (r, i) { return reviewCard(r).replace('class="review card"', 'class="review card reveal" style="--d:' + (i % 3) * 60 + 'ms"'); }).join("") + "</div></div></section>";
    }
    return '<section class="section section--soft reviews" id="' + esc(s.id) + '"><div class="container">' +
      '<div class="section-head section-head--row reveal"><div>' + eyebrow(s) + '<h2 class="section-title">' + esc(s.title) + demoBadge() + "</h2>" + (s.subtitle ? '<p class="section-subtitle">' + esc(s.subtitle) + "</p>" : "") + "</div>" +
        '<div class="carousel-arrows"><button type="button" class="round-btn" aria-label="Предыдущие отзывы" data-rev-prev>' + icon("chevronLeft") + '</button><button type="button" class="round-btn" aria-label="Следующие отзывы" data-rev-next>' + icon("chevronRight") + "</button></div></div>" +
      '<div class="reviews__track" data-rev-track tabindex="0" aria-label="Отзывы, прокручиваются по горизонтали">' + (s.items || []).map(reviewCard).join("") + "</div></div></section>";
  };

  /* Команда / врачи: фото или монограмма, должность, стаж, теги */
  R.team = function (s) {
    return '<section class="section team' + (s.variant ? " team--" + esc(s.variant) : "") + '" id="' + esc(s.id || "team") + '"><div class="container">' +
      '<div class="section-head section-head--row reveal"><div>' + eyebrow(s) + '<h2 class="section-title">' + esc(s.title || "") + demoBadge() + "</h2>" + (s.subtitle ? '<p class="section-subtitle">' + esc(s.subtitle) + "</p>" : "") + "</div>" + railArrows("врачи") + "</div>" +
      '<div class="team__grid" data-rail tabindex="0" aria-label="Список специалистов, прокручивается по горизонтали">' + (s.items || []).map(function (p, i) {
        var initials = String(p.name || "?").split(/\s+/).map(function (w) { return w.charAt(0); }).join("").slice(0, 2);
        return '<article class="doc reveal" style="--d:' + (i % 4) * 60 + 'ms"><div class="doc__media">' +
          (p.image ? img(p.image, p.name, { sizes: "(max-width: 600px) 75vw, 25vw", w: 640, h: 800 }) : '<span class="doc__mono" aria-hidden="true">' + esc(initials) + "</span>") +
          (p.exp ? '<span class="doc__exp">' + esc(p.exp) + "</span>" : "") + "</div>" +
          '<div class="doc__body"><h3 class="doc__name">' + esc(p.name) + '</h3><p class="doc__role">' + esc(p.role || "") + "</p>" +
          (p.text ? '<p class="doc__text">' + esc(p.text) + "</p>" : "") +
          (p.tags ? '<ul class="doc__tags">' + p.tags.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" : "") +
          (s.buttonText ? '<a class="doc__link" href="#booking"' + (p.service ? ' data-service="' + esc(p.service) + '"' : "") + ">" + esc(s.buttonText) + icon("arrowRight") + "</a>" : "") +
        "</div></article>";
      }).join("") + "</div></div></section>";
  };

  R.faq = function (s) {
    return '<section class="section faq" id="' + esc(s.id) + '"><div class="container faq__grid">' +
      '<div class="faq__head reveal">' + eyebrow(s) + '<h2 class="section-title">' + esc(s.title) + "</h2>" +
        '<p class="section-subtitle">' + esc(s.subtitle || "Не нашли ответ? Позвоните нам — проконсультируем бесплатно.") + "</p>" +
        (contacts().phone ? tel(contacts().phoneHref, contacts().phone, "faq__phone") : "") + "</div>" +
      '<div class="faq__list">' + (s.items || []).map(function (f) {
        return '<details class="faq-item reveal"><summary><span>' + esc(f.q) + "</span>" + icon("chevronDown", "faq-item__chev") + '</summary><div class="faq-item__a"><p>' + esc(f.a) + "</p></div></details>";
      }).join("") + "</div></div></section>";
  };

  var LABEL_DEFAULTS = { name: "Ваше имя", phone: "Телефон", car: "Автомобиль", service: "Услуга", servicePlaceholder: "Выберите услугу", serviceOther: "Другое / не знаю", date: "Дата", time: "Время", timeAny: "Любое", comment: "Комментарий",
    guests: "Гости", timePlaceholder: "--:--", dateout: "Выезд", adults: "Взрослые", kids: "Дети", extras: "Добавить к отдыху", estimate: "Предварительный расчёт", total: "Итого", onRequest: "по запросу" };
  function labels(s) { var L = {}, k; for (k in LABEL_DEFAULTS) L[k] = (s.labels && s.labels[k]) || LABEL_DEFAULTS[k]; return L; }
  R.booking = function (s) {
    var L = labels(s);
    var today = new Date();
    function iso(d) { return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
    var max = new Date(today.getTime() + (s.maxDaysAhead || 60) * 864e5), stay = s.mode === "stay", table = s.mode === "table";
    if (table) return tableBooking(s, L, today, max, iso);
    return '<section class="section booking' + (stay ? " booking--stay" : "") + '" id="' + esc(s.id) + '"><div class="container"><div class="booking__box reveal">' +
      '<div class="booking__intro">' + eyebrow(s) + '<h2 class="section-title">' + esc(s.title) + "</h2>" +
        (s.subtitle ? '<p class="booking__subtitle">' + esc(s.subtitle) + "</p>" : "") +
        (s.perks ? '<ul class="booking__perks">' + s.perks.map(function (p) { return "<li>" + icon("checkCircle") + "<span>" + esc(p) + "</span></li>"; }).join("") + "</ul>" : "") +
        (contacts().phone ? '<div class="booking__call"><span>Или позвоните:</span>' + tel(contacts().phoneHref, contacts().phone) + "</div>" : "") +
      "</div>" +
      '<div class="booking__form-wrap">' +
      '<form class="form" id="booking-form" novalidate data-endpoint="' + esc(s.endpoint || "") + '">' +
        field("name", L.name, '<input id="f-name" name="name" type="text" autocomplete="name" required minlength="2" maxlength="60" placeholder="Иван">') +
        field("phone", L.phone, '<input id="f-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" required placeholder="' + esc(s.phoneMask || "+375 (__) ___-__-__") + '" data-mask="' + esc(s.phoneMask || "") + '">') +
        (s.carField === false || stay ? "" : field("car", L.car, '<input id="f-car" name="car" type="text"' + (s.carOptional ? "" : " required") + ' minlength="2" maxlength="80" placeholder="' + esc(s.carPlaceholder || "") + '"' + (s.carError ? ' data-error="' + esc(s.carError) + '"' : "") + ">", s.carOptional)) +
        field("service", L.service, '<div class="select"><select id="f-service" name="service" required><option value="">' + esc(L.servicePlaceholder) + "</option>" +
          services().map(function (v) { return '<option value="' + esc(v.id) + '">' + esc(v.title) + "</option>"; }).join("") +
          (function () { var pr = programItems(); return pr.length ? '<optgroup label="' + esc(pr[0].group || "Программы") + '">' + pr.map(function (v) { return '<option value="' + esc(v.id) + '">' + esc(v.title) + "</option>"; }).join("") + "</optgroup>" : ""; })() + '<option value="other">' + esc(L.serviceOther) + "</option></select>" + icon("chevronDown") + "</div>") +
        (stay ? stayFields(s, L, today, max, iso) : '<div class="form__row">' +
          field("date", L.date, '<input id="f-date" name="date" type="date" required min="' + iso(today) + '" max="' + iso(max) + '" data-closed="' + esc((s.closedWeekdays || []).join(",")) + '">') +
          field("time", L.time, '<div class="select"><select id="f-time" name="time"><option value="">' + esc(L.timeAny) + "</option>" + (s.timeSlots || []).map(function (t) { return "<option>" + esc(t) + "</option>"; }).join("") + "</select>" + icon("chevronDown") + "</div>", true) +
        "</div>") +
        field("comment", L.comment, '<textarea id="f-comment" name="comment" rows="3" maxlength="500" placeholder="' + esc(s.commentPlaceholder || "") + '"></textarea>', true) +
        consentBox(s.consentText) +
        '<p class="field__error" data-error-for="consent" role="alert"></p>' +
        '<button class="btn btn--primary btn--lg btn--block" type="submit"><span class="btn__label">' + esc(s.submitText || "Отправить") + '</span><span class="btn__spinner" aria-hidden="true"></span></button>' +
        '<p class="form__status" role="status" aria-live="polite"></p>' +
        (C.demo && !s.endpoint ? '<p class="form__demo">Демо-режим: заявка не отправляется, данные никуда не передаются.</p>' : "") +
      "</form>" +
      '<div class="form-success" hidden tabindex="-1"><span class="form-success__icon">' + icon("check") + '</span><h3 class="form-success__title">' + esc(s.successTitle || "Спасибо!") + '</h3><p class="form-success__text">' + esc(s.successText || "") + '</p><dl class="form-success__summary"></dl><button type="button" class="btn btn--soft" data-form-reset>Новая заявка</button></div>' +
      "</div></div></div></section>";
  };
  /* v1.5: бронирование столика — дата, время, гости, формат (зал / банкет) */
  function tableBooking(s, L, today, max, iso) {
    var zones = s.zones || [], pr = programItems(), gm = s.groupMax || 12;
    var body =
        field("name", L.name, '<input id="f-name" name="name" type="text" autocomplete="name" required minlength="2" maxlength="60" placeholder="Иван">') +
        field("phone", L.phone, '<input id="f-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" required placeholder="' + esc(s.phoneMask || "+375 (__) ___-__-__") + '" data-mask="' + esc(s.phoneMask || "") + '">') +
        '<div class="form__row form__row--3">' +
          field("date", L.date, '<input id="f-date" name="date" type="date" required min="' + iso(today) + '" max="' + iso(max) + '" data-closed="' + esc((s.closedWeekdays || []).join(",")) + '">') +
          field("time", L.time, '<div class="select"><select id="f-time" name="time" required><option value="">' + esc(L.timePlaceholder || "--:--") + "</option>" + (s.timeSlots || []).map(function (t) { return "<option>" + esc(t) + "</option>"; }).join("") + "</select>" + icon("chevronDown") + "</div>") +
          stepperField("guests", L.guests || "Гости", 1, gm, s.guestsDefault || 2) +
        "</div>" +
        (zones.length || pr.length ? field("service", L.service, '<div class="select"><select id="f-service" name="service"><option value="">' + esc(L.servicePlaceholder) + "</option>" +
          zones.map(function (z) { var id = z.id || z, t = z.title || z; return '<option value="' + esc(id) + '">' + esc(t) + "</option>"; }).join("") +
          (pr.length ? '<optgroup label="' + esc(pr[0].group || "События") + '">' + pr.map(function (v) { return '<option value="' + esc(v.id) + '">' + esc(v.title) + "</option>"; }).join("") + "</optgroup>" : "") +
          "</select>" + icon("chevronDown") + "</div>", true) : "") +
        field("comment", L.comment, '<textarea id="f-comment" name="comment" rows="3" maxlength="500" placeholder="' + esc(s.commentPlaceholder || "") + '"></textarea>', true) +
        consentBox(s.consentText) +
        '<p class="field__error" data-error-for="consent" role="alert"></p>' +
        '<button class="btn btn--primary btn--lg btn--block" type="submit"><span class="btn__label">' + esc(s.submitText || "Забронировать") + '</span><span class="btn__spinner" aria-hidden="true"></span></button>' +
        '<p class="form__status" role="status" aria-live="polite"></p>' +
        (C.demo && !s.endpoint ? '<p class="form__demo">Демо-режим: заявка не отправляется, данные никуда не передаются.</p>' : "");
    return '<section class="section booking booking--table" id="' + esc(s.id) + '"><div class="container"><div class="booking__box reveal">' +
      '<div class="booking__intro">' + eyebrow(s) + '<h2 class="section-title">' + esc(s.title) + "</h2>" +
        (s.subtitle ? '<p class="booking__subtitle">' + esc(s.subtitle) + "</p>" : "") +
        (s.perks ? '<ul class="booking__perks">' + s.perks.map(function (p) { return "<li>" + icon("checkCircle") + "<span>" + esc(p) + "</span></li>"; }).join("") + "</ul>" : "") +
        (contacts().phone ? '<div class="booking__call"><span>' + esc(s.callText || "Или позвоните:") + "</span>" + tel(contacts().phoneHref, contacts().phone) + "</div>" : "") +
      "</div>" +
      '<div class="booking__form-wrap"><form class="form" id="booking-form" novalidate data-mode="table" data-endpoint="' + esc(s.endpoint || "") + '">' + body + "</form>" +
      '<div class="form-success" hidden tabindex="-1"><span class="form-success__icon">' + icon("check") + '</span><h3 class="form-success__title">' + esc(s.successTitle || "Спасибо!") + '</h3><p class="form-success__text">' + esc(s.successText || "") + '</p><dl class="form-success__summary"></dl><button type="button" class="btn btn--soft" data-form-reset>' + esc(s.resetText || "Новая бронь") + "</button></div>" +
      "</div></div></div></section>";
  }
  function field(name, label, control, optional) {
    return '<div class="field" data-field="' + name + '"><label class="field__label" for="f-' + name + '">' + esc(label) + (optional ? ' <span class="field__opt">необязательно</span>' : "") + "</label>" + control + '<p class="field__error" data-error-for="' + name + '" role="alert"></p></div>';
  }

  R.contacts = function (s) {
    var c = contacts();
    var map = c.mapEmbed
      ? '<iframe class="map__frame" src="' + esc(c.mapEmbed) + '" title="Карта проезда" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>'
      : '<div class="map__placeholder" role="img" aria-label="Карта (заглушка)"><div class="map__grid" aria-hidden="true"></div><span class="map__pin">' + icon("pin") + '</span><div class="map__card"><strong>' + esc(c.address || "") + "</strong>" + (c.addressNote ? "<span>" + esc(c.addressNote) + "</span>" : "") + (c.mapLink ? '<a class="btn btn--primary btn--sm" href="' + esc(c.mapLink) + '" target="_blank" rel="noopener">' + icon("navigation") + "Открыть на карте</a>" : "") + "</div></div>";
    return '<section class="section section--soft contacts" id="' + esc(s.id) + '"><div class="container">' + head(s) +
      '<div class="contacts__grid">' +
        '<div class="contacts__info card reveal">' +
          infoRow("pin", "Адрес", esc(c.address) + (c.addressNote ? '<span class="info-row__sub">' + esc(c.addressNote) + "</span>" : "")) +
          infoRow("phone", "Телефон", (c.phone ? tel(c.phoneHref, c.phone) : "") + (c.phone2 ? "<br>" + tel(c.phone2Href, c.phone2) : "")) +
          (c.email ? infoRow("mail", "E-mail", '<a href="mailto:' + esc(c.email) + '">' + esc(c.email) + "</a>") : "") +
          infoRow("clock", "Режим работы", (c.schedule ? '<span class="open-status" data-open-status></span>' : "") + (c.hours || []).map(function (h) { return '<span class="hours-row"><span>' + esc(h.days) + "</span><span>" + esc(h.time) + "</span></span>"; }).join("")) +
          socials("contacts__socials") +
          '<a class="btn btn--primary btn--block" href="#booking">' + esc((C.cta && C.cta.text) || "Записаться") + "</a>" +
        "</div>" +
        '<div class="map reveal">' + map + "</div>" +
      "</div></div></section>";
  };
  function infoRow(ic, label, html) {
    return '<div class="info-row"><span class="info-row__icon">' + icon(ic) + '</span><div><p class="info-row__label">' + esc(label) + '</p><div class="info-row__value">' + html + "</div></div></div>";
  }
  function socials(cls) {
    var list = contacts().socials || [];
    if (!list.length) return "";
    return '<div class="socials ' + (cls || "") + '">' + list.map(function (s) {
      return '<a class="social" href="' + esc(s.url) + '" target="_blank" rel="noopener" aria-label="' + esc(s.label || s.type) + '">' + icon(s.type) + "</a>";
    }).join("") + "</div>";
  }

  /* Бегущая строка (static: true — просто строка без анимации) */
  R.marquee = function (s) {
    var items = (s.items || []).map(function (t) { return '<span class="marquee__item">' + esc(t) + "</span>"; }).join("");
    return '<section class="marquee' + (s.static ? " marquee--static" : "") + '"' + (s.id ? ' id="' + esc(s.id) + '"' : "") + ' aria-label="' + esc(s.label || "Ключевые слова") + '">' +
      (s.title ? '<p class="marquee__title">' + esc(s.title) + "</p>" : "") +
      '<div class="marquee__viewport"><div class="marquee__track"><div class="marquee__group">' + items + "</div>" + (s.static ? "" : '<div class="marquee__group" aria-hidden="true">' + items + "</div>") + "</div></div></section>";
  };
  /* Крупное заявление / манифест */
  R.statement = function (s) {
    return '<section class="section statement" id="' + esc(s.id || "") + '"><div class="container">' + eyebrow(s) +
      '<p class="statement__text reveal">' + esc(s.text) + (s.muted ? ' <span class="statement__muted">' + esc(s.muted) + "</span>" : "") + "</p>" +
      (s.sub ? '<p class="statement__sub reveal">' + esc(s.sub) + "</p>" : "") +
      (s.buttonText ? '<div class="statement__btn reveal">' + btn({ text: s.buttonText, href: s.buttonHref || "#booking", style: s.buttonStyle || "ghost" }) + "</div>" : "") +
      "</div></section>";
  };

  /* ===================== v1.3: клиника ===================== */
  function rowHead(s, label) {
    return '<div class="section-head section-head--row reveal"><div>' + eyebrow(s) + '<h2 class="section-title">' + esc(s.title || "") + "</h2>" + (s.subtitle ? '<p class="section-subtitle">' + esc(s.subtitle) + "</p>" : "") + "</div>" + railArrows(label) + "</div>";
  }
  /* Программы (чек-апы): цена, для кого, что входит, кнопка записи.
     rail: true — горизонтальная лента со стрелками. Программы автоматически попадают в список формы записи. */
  R.programs = function (s) {
    var items = s.items || [];
    return '<section class="section programs' + (s.variant ? " programs--" + esc(s.variant) : "") + (s.rail ? " programs--rail" : "") + '" id="' + esc(s.id || "programs") + '"><div class="container">' +
      (s.rail ? rowHead(s, "программы") : head(s)) +
      '<div class="programs__grid"' + (s.rail ? ' data-rail tabindex="0" aria-label="Программы, прокручиваются по горизонтали"' : "") + ">" + items.map(function (p, i) {
        var sid = p.service || p.id;
        return '<article class="prog' + (p.featured ? " prog--featured" : "") + ' reveal" style="--d:' + (i % 3) * 60 + 'ms">' +
          (p.image ? '<div class="prog__media">' + img(p.image, p.title, { sizes: "(max-width: 600px) 90vw, (max-width: 1100px) 50vw, 33vw", w: 640, h: 480 }) + (p.badge ? '<span class="prog__badge">' + esc(p.badge) + "</span>" : "") + "</div>" : "") +
          '<div class="prog__body">' +
            (!p.image && (p.badge || p.icon) ? '<div class="prog__top">' + (p.icon ? '<span class="prog__icon">' + icon(p.icon) + "</span>" : "") + (p.badge ? '<span class="prog__badge">' + esc(p.badge) + "</span>" : "") + "</div>" : "") +
            '<h3 class="prog__title">' + esc(p.title) + "</h3>" +
            (p.for ? '<p class="prog__for">' + esc(p.for) + "</p>" : "") +
            (p.items && p.items.length ? '<ul class="prog__list">' + p.items.map(function (x) { return "<li>" + icon("check") + "<span>" + esc(x) + "</span></li>"; }).join("") + "</ul>" : "") +
            '<div class="prog__foot"><div class="prog__price">' + (s.priceLabel ? '<span class="prog__price-label">' + esc(s.priceLabel) + "</span>" : "") + "<strong>" + esc(p.price || "") + "</strong>" + (p.oldPrice ? "<s>" + esc(p.oldPrice) + "</s>" : "") + "</div>" +
              (p.time ? '<span class="prog__time">' + icon("clock") + esc(p.time) + "</span>" : "") + "</div>" +
            '<a class="btn btn--' + esc(s.buttonStyle || "primary") + ' prog__btn" href="#booking"' + (sid ? ' data-service="' + esc(sid) + '"' : "") + ">" + esc(s.buttonText || "Записаться") + "</a>" +
          "</div></article>";
      }).join("") + "</div>" + (s.note ? '<p class="programs__note">' + esc(s.note) + "</p>" : "") + "</div></section>";
  };
  function programItems() {
    var out = [];
    (C.sections || []).forEach(function (x) { if (x.type === "programs" && !x.hidden) (x.items || []).forEach(function (p) { if (p.id && !p.service) out.push({ id: p.id, title: p.title, group: x.groupLabel || x.title }); }); });
    return out;
  }
  /* Первый экран с «поиском записи» (стиль авиакомпании): фото + виджет «направление / дата / время» */
  HERO.search = function (s) {
    var f = s.finder || {};
    return '<section class="hero hero--search" id="' + esc(s.id || "top") + '"><div class="container">' +
      '<div class="hero__media">' + img(s.image, s.imageAlt, { eager: true, sizes: "(max-width: 1400px) 100vw, 1360px", w: 1024, h: 576 }) +
        '<div class="hero__content">' + (s.eyebrow ? '<p class="hero__eyebrow">' + esc(s.eyebrow) + "</p>" : "") + heroTitle(s) + (s.text ? '<p class="hero__text">' + esc(s.text) + "</p>" : "") + heroButtons(s) + "</div></div>" +
      finderForm(f) + "</div></section>";
  };
  /* Крупный список ссылок со стрелками (стиль автобренда) */
  R.links = function (s) {
    return '<section class="section links-block" id="' + esc(s.id || "links") + '"><div class="container">' + head(s) +
      '<ul class="links-list">' + (s.items || []).map(function (l, i) {
        return '<li class="reveal" style="--d:' + i * 60 + 'ms"><a class="links-list__item" href="' + esc(l.href || "#booking") + '"' + (l.service ? ' data-service="' + esc(l.service) + '"' : "") + '><span class="links-list__text">' + esc(l.text) + "</span>" +
          (l.note ? '<span class="links-list__note">' + esc(l.note) + "</span>" : "") + icon(s.icon || "chevronRight", "links-list__icon") + "</a></li>";
      }).join("") + "</ul></div></section>";
  };
  /* Цветная полоса: крупный заголовок слева, текст и ссылка справа (стиль музея) */
  R.band = function (s) {
    return '<section class="band band--' + esc(s.tone || "accent") + '" id="' + esc(s.id || "") + '"><div class="container"><div class="band__box reveal">' +
      '<h2 class="band__title">' + esc(s.title) + "</h2>" +
      '<div class="band__side">' + (s.text ? '<p class="band__text">' + esc(s.text) + "</p>" : "") +
        (s.linkText ? '<a class="band__link" href="' + esc(s.href || "#booking") + '"' + (s.service ? ' data-service="' + esc(s.service) + '"' : "") + ">" + esc(s.linkText) + icon("arrowRight") + "</a>" : "") + "</div>" +
      "</div></div></section>";
  };
  /* Лицензии и документы */
  R.licenses = function (s) {
    return '<section class="section licenses" id="' + esc(s.id || "licenses") + '"><div class="container">' +
      '<div class="section-head reveal">' + eyebrow(s) + '<h2 class="section-title">' + esc(s.title || "Лицензии и документы") + demoBadge() + "</h2>" + (s.subtitle ? '<p class="section-subtitle">' + esc(s.subtitle) + "</p>" : "") + "</div>" +
      '<ul class="lic__grid">' + (s.items || []).map(function (d, i) {
        return '<li class="lic reveal" style="--d:' + (i % 4) * 60 + 'ms"><span class="lic__icon">' + icon(d.icon || "file") + '</span><div><h3 class="lic__title">' + esc(d.title) + "</h3>" + (d.text ? '<p class="lic__text">' + esc(d.text) + "</p>" : "") + "</div></li>";
      }).join("") + "</ul>" + (s.note ? '<p class="lic__note">' + icon("shield") + "<span>" + esc(s.note) + "</span></p>" : "") + "</div></section>";
  };

  /* Произвольный текстовый блок (SEO-текст и т.п.) */
  R.text = function (s) {
    return '<section class="section text-block" id="' + esc(s.id || "") + '"><div class="container container--narrow reveal">' +
      (s.title ? '<h2 class="section-title">' + esc(s.title) + "</h2>" : "") +
      (s.paragraphs || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + "</div></section>";
  };


  /* ===================== v1.4: усадьба / загородный комплекс ===================== */
  function plural(n, f) { n = Math.abs(n) % 100; var n1 = n % 10; return n > 10 && n < 20 ? f[2] : n1 > 1 && n1 < 5 ? f[1] : n1 === 1 ? f[0] : f[2]; }
  function bookingSection() { return (C.sections || []).filter(function (x) { return x.type === "booking"; })[0] || {}; }
  function stayMode() { return bookingSection().mode === "stay"; }
  function maxGuestsOf(v) { return v ? (+v.guests || 0) + (+v.extraBeds || 0) : 0; }
  function extrasItems() {
    var out = [];
    (C.sections || []).forEach(function (x) { if (x.type === "extras" && !x.hidden) (x.items || []).forEach(function (e) { if (e.id) out.push(e); }); });
    return out;
  }
  function stayPrice(v) { return v.price || (v.night ? "от " + money(v.night, C.currency) : ""); }
  /* Домики / номера: вместимость, площадь, удобства, цена за сутки. Данные — из массива services. */
  R.stays = function (s) {
    var v = s.variant || "grid", rail = v === "rail";
    return '<section class="section stays stays--' + esc(v) + '" id="' + esc(s.id || "stays") + '"><div class="container">' +
      (rail ? rowHead(s, "домики") : head(s)) +
      '<div class="stays__grid"' + (rail ? ' data-rail tabindex="0" aria-label="Домики, прокручиваются по горизонтали"' : "") + ">" + services().map(function (h, i) {
        var mg = maxGuestsOf(h);
        var facts = [
          h.guests ? [ "users", "до " + mg + " " + plural(mg, ["гостя", "гостей", "гостей"]) + (h.extraBeds ? " (" + h.guests + " + " + h.extraBeds + " доп.)" : "") ] : null,
          h.beds ? ["bed", h.beds] : null, h.area ? ["home", h.area] : null
        ].filter(Boolean);
        return '<article class="stay reveal" style="--d:' + (i % 3) * 60 + 'ms">' +
          '<div class="stay__media">' + img(h.image, h.imageAlt || h.title, { sizes: rail ? "(max-width: 700px) 84vw, 40vw" : "(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 33vw", w: 1024, h: 768 }) + (h.badge ? '<span class="stay__badge">' + esc(h.badge) + "</span>" : "") + "</div>" +
          '<div class="stay__body">' + (s.showNum ? '<span class="stay__num">' + String(i + 1).padStart(2, "0") + "</span>" : "") +
            '<h3 class="stay__title">' + esc(h.title) + "</h3>" +
            (facts.length ? '<ul class="stay__facts">' + facts.map(function (f) { return "<li>" + icon(f[0]) + "<span>" + esc(f[1]) + "</span></li>"; }).join("") + "</ul>" : "") +
            (h.text ? '<p class="stay__text">' + esc(h.text) + "</p>" : "") +
            (h.amenities && h.amenities.length ? '<ul class="stay__tags">' + h.amenities.map(function (a) { return "<li>" + esc(a) + "</li>"; }).join("") + "</ul>" : "") +
            '<div class="stay__foot"><div class="stay__price"><strong>' + esc(stayPrice(h)) + "</strong>" + (h.night ? "<span>" + esc(s.perNight || "за сутки") + "</span>" : "") +
              (h.weekend ? '<small>' + esc(s.weekendLabel || "Пт–Сб") + ": " + esc(money(h.weekend, C.currency)) + "</small>" : "") + "</div>" +
              '<a class="btn btn--' + esc(s.buttonStyle || "primary") + ' stay__btn" href="#booking" data-service="' + esc(h.id) + '">' + esc(s.buttonText || "Выбрать даты") + "</a></div>" +
          "</div></article>";
      }).join("") + "</div>" + (s.note ? '<p class="stays__note">' + esc(s.note) + "</p>" : "") + "</div></section>";
  };
  /* Баня и дополнительные услуги: кнопка «Добавить» отмечает услугу в форме бронирования */
  R.extras = function (s) {
    var v = s.variant || "cards", canAdd = stayMode();
    return '<section class="section extras extras--' + esc(v) + '" id="' + esc(s.id || "extras") + '"><div class="container">' + head(s) +
      '<div class="extras__grid">' + (s.items || []).map(function (e, i) {
        return '<article class="extra' + (e.featured ? " extra--featured" : "") + ' reveal" style="--d:' + (i % 3) * 60 + 'ms">' +
          (e.image && v !== "list" ? '<div class="extra__media">' + img(e.image, e.imageAlt || e.title, { sizes: e.featured ? "(max-width: 700px) 100vw, 66vw" : "(max-width: 700px) 100vw, 33vw", w: 1024, h: 768 }) + "</div>" : "") +
          '<div class="extra__body">' + (e.icon ? '<span class="extra__icon">' + icon(e.icon) + "</span>" : "") +
            '<div class="extra__main"><h3 class="extra__title">' + esc(e.title) + "</h3>" + (e.text ? '<p class="extra__text">' + esc(e.text) + "</p>" : "") + "</div>" +
            '<div class="extra__foot"><p class="extra__price">' + esc(e.price || "") + (e.unit ? " <span>" + esc(e.unit) + "</span>" : "") + "</p>" +
              (canAdd && e.id ? '<button type="button" class="btn btn--' + esc(s.buttonStyle || "soft") + ' btn--sm extra__btn" data-extra="' + esc(e.id) + '" aria-pressed="false"><span class="extra__add">' + icon("plus") + esc(s.addText || "К брони") + '</span><span class="extra__added">' + icon("check") + esc(s.addedText || "Добавлено") + "</span></button>"
                : '<a class="btn btn--' + esc(s.buttonStyle || "soft") + ' btn--sm" href="#booking">' + esc(s.buttonText || "Заказать") + "</a>") +
            "</div></div></article>";
      }).join("") + "</div>" + (s.note ? '<p class="extras__note">' + esc(s.note) + "</p>" : "") + "</div></section>";
  };
  /* Как добраться: расстояние, способы, координаты, ссылки на навигаторы */
  R.route = function (s) {
    return '<section class="section route" id="' + esc(s.id || "route") + '"><div class="container">' + head(s) +
      '<div class="route__grid"><div class="route__lead reveal">' +
        (s.distance ? '<p class="route__distance">' + esc(s.distance) + "</p>" : "") + (s.distanceNote ? '<p class="route__dnote">' + esc(s.distanceNote) + "</p>" : "") +
        (contacts().address ? '<p class="route__addr">' + icon("pin") + "<span>" + esc(contacts().address) + "</span></p>" : "") +
        (s.coords ? '<div class="route__coords"><span>GPS: <b>' + esc(s.coords) + '</b></span><button type="button" class="route__copy" data-copy="' + esc(s.coords) + '" data-copied="' + esc(s.copiedText || "Скопировано") + '">' + esc(s.copyText || "Копировать") + "</button></div>" : "") +
        (s.links && s.links.length ? '<div class="route__links">' + s.links.map(function (l, i) { return '<a class="btn btn--' + (i ? "ghost" : "primary") + ' btn--sm" href="' + esc(l.href) + '" target="_blank" rel="noopener">' + icon(l.icon || "navigation") + esc(l.text) + "</a>"; }).join("") + "</div>" : "") +
      "</div>" +
      '<ol class="route__list">' + (s.items || []).map(function (r, i) {
        return '<li class="route__item reveal" style="--d:' + i * 60 + 'ms"><span class="route__icon">' + icon(r.icon || "car") + '</span><div><h3 class="route__title">' + esc(r.title) + "</h3>" + (r.meta ? '<p class="route__meta">' + esc(r.meta) + "</p>" : "") + '<p class="route__text">' + esc(r.text) + "</p></div></li>";
      }).join("") + "</ol>" + (s.note && C.demo ? '<p class="route__note">' + esc(s.note) + "</p>" : "") + "</div></div></section>";
  };
  /* Форма «даты / гости» (в hero-поиске или отдельной полосой) */
  var finderIdx = 0;
  function finderForm(f, cls) {
    var bk = bookingSection(), sfx = finderIdx++ ? "-" + finderIdx : "", stay = bk.mode === "stay", table = bk.mode === "table";
    var sel = '<div class="finder__field finder__field--svc"><label class="finder__label" for="fd-service' + sfx + '">' + esc(f.serviceLabel || (stay ? "Домик" : "Направление")) + '</label><div class="select"><select id="fd-service' + sfx + '" data-fd="service">' +
      '<option value="">' + esc(f.servicePlaceholder || "Любое") + "</option>" + services().map(function (v) { return '<option value="' + esc(v.id) + '">' + esc(v.title) + "</option>"; }).join("") +
      programItems().map(function (v) { return '<option value="' + esc(v.id) + '">' + esc(v.title) + "</option>"; }).join("") + "</select>" + icon("chevronDown") + "</div></div>";
    var fields;
    if (table) {
      var tg = ""; for (var q = 1; q <= Math.min(bk.groupMax || 12, f.guestsMax || 10); q++) tg += '<option value="' + q + '"' + (q === (f.guestsDefault || 2) ? " selected" : "") + ">" + q + " " + plural(q, ["гость", "гостя", "гостей"]) + "</option>";
      fields = '<div class="finder__field"><label class="finder__label" for="fd-date' + sfx + '">' + esc(f.dateLabel || "Дата") + '</label><input id="fd-date' + sfx + '" type="date" data-fd="date"></div>' +
        '<div class="finder__field"><label class="finder__label" for="fd-time' + sfx + '">' + esc(f.timeLabel || "Время") + '</label><div class="select"><select id="fd-time' + sfx + '" data-fd="time"><option value="">' + esc(f.timeAny || "Любое") + "</option>" + (bk.timeSlots || []).map(function (t) { return "<option>" + esc(t) + "</option>"; }).join("") + "</select>" + icon("chevronDown") + "</div></div>" +
        '<div class="finder__field"><label class="finder__label" for="fd-guests' + sfx + '">' + esc(f.guestsLabel || "Гости") + '</label><div class="select"><select id="fd-guests' + sfx + '" data-fd="guests">' + tg + "</select>" + icon("chevronDown") + "</div></div>";
      return '<form class="finder finder--table' + (cls ? " " + cls : "") + ' reveal" data-finder novalidate aria-label="' + esc(f.title || "Забронировать столик") + '">' +
        (f.title ? '<p class="finder__title">' + esc(f.title) + "</p>" : "") +
        '<div class="finder__fields">' + fields + '<button class="btn btn--' + esc(f.buttonStyle || "primary") + ' finder__btn" type="submit">' + icon("calendar") + "<span>" + esc(f.buttonText || "Найти столик") + "</span></button></div>" +
        (f.note ? '<p class="finder__note">' + esc(f.note) + "</p>" : "") + "</form>";
    }
    if (stay) {
      var mg = Math.max.apply(null, [1].concat(services().map(maxGuestsOf)));
      var gOpts = ""; for (var g = 1; g <= mg; g++) gOpts += '<option value="' + g + '"' + (g === (f.guestsDefault || 2) ? " selected" : "") + ">" + g + " " + plural(g, ["гость", "гостя", "гостей"]) + "</option>";
      fields = (f.service === false ? "" : sel) +
        '<div class="finder__field"><label class="finder__label" for="fd-in' + sfx + '">' + esc(f.dateLabel || "Заезд") + '</label><input id="fd-in' + sfx + '" type="date" data-fd="date"></div>' +
        '<div class="finder__field"><label class="finder__label" for="fd-out' + sfx + '">' + esc(f.dateOutLabel || "Выезд") + '</label><input id="fd-out' + sfx + '" type="date" data-fd="dateout"></div>' +
        '<div class="finder__field"><label class="finder__label" for="fd-guests' + sfx + '">' + esc(f.guestsLabel || "Гости") + '</label><div class="select"><select id="fd-guests' + sfx + '" data-fd="adults">' + gOpts + "</select>" + icon("chevronDown") + "</div></div>";
    } else {
      fields = sel.replace(' finder__field--svc', '') +
        '<div class="finder__field"><label class="finder__label" for="fd-date' + sfx + '">' + esc(f.dateLabel || "Дата") + '</label><input id="fd-date' + sfx + '" type="date" data-fd="date" data-closed="' + esc((bk.closedWeekdays || []).join(",")) + '"></div>' +
        (bk.timeSlots && f.time !== false ? '<div class="finder__field"><label class="finder__label" for="fd-time' + sfx + '">' + esc(f.timeLabel || "Время") + '</label><div class="select"><select id="fd-time' + sfx + '" data-fd="time"><option value="">' + esc(f.timeAny || "Любое") + "</option>" + bk.timeSlots.map(function (t) { return "<option>" + esc(t) + "</option>"; }).join("") + "</select>" + icon("chevronDown") + "</div></div>" : "");
    }
    return '<form class="finder' + (stay ? " finder--stay" : "") + (f.service === false ? " finder--nosvc" : "") + (cls ? " " + cls : "") + ' reveal" data-finder novalidate aria-label="' + esc(f.title || (stay ? "Проверить даты" : "Быстрая запись")) + '">' +
      (f.title ? '<p class="finder__title">' + esc(f.title) + "</p>" : "") +
      '<div class="finder__fields">' + fields +
        '<button class="btn btn--' + esc(f.buttonStyle || "primary") + ' finder__btn" type="submit">' + icon(stay ? "calendar" : "search") + "<span>" + esc(f.buttonText || (stay ? "Проверить даты" : "Найти время")) + "</span></button>" +
      "</div>" + (f.note ? '<p class="finder__note">' + esc(f.note) + "</p>" : "") + "</form>";
  }
  R.finder = function (s) {
    return '<section class="finder-section' + (s.variant ? " finder-section--" + esc(s.variant) : "") + '" id="' + esc(s.id || "dates") + '"><div class="container">' + finderForm(s) + "</div></section>";
  };
  function lightboxHTML() {
    var any = (C.sections || []).some(function (x) { return x.type === "gallery" && x.lightbox && !x.hidden; });
    if (!any) return "";
    return '<div class="lightbox" id="lightbox" hidden aria-hidden="true"><div class="lightbox__overlay" data-lb-close></div>' +
      '<div class="lightbox__panel" role="dialog" aria-modal="true" aria-label="Просмотр фото" tabindex="-1">' +
        '<figure class="lightbox__fig"><img class="lightbox__img" alt="" width="1024" height="683"><figcaption class="lightbox__cap"><span class="lightbox__title"></span><span class="lightbox__count"></span></figcaption></figure>' +
        '<button type="button" class="round-btn lightbox__nav lightbox__prev" aria-label="Предыдущее фото" data-lb-prev>' + icon("chevronLeft") + "</button>" +
        '<button type="button" class="round-btn lightbox__nav lightbox__next" aria-label="Следующее фото" data-lb-next>' + icon("chevronRight") + "</button>" +
        '<button type="button" class="icon-btn lightbox__close" aria-label="Закрыть" data-lb-close>' + icon("close") + "</button>" +
      "</div></div>";
  }
  function stepperField(name, label, min, max, val, optional) {
    return '<div class="field" data-field="' + name + '"><label class="field__label" for="f-' + name + '">' + esc(label) + (optional ? ' <span class="field__opt">' + esc(optional) + "</span>" : "") + "</label>" +
      '<div class="stepper" data-stepper><button type="button" class="round-btn" aria-label="Меньше: ' + esc(label) + '" data-step="-1">' + icon("minus") + "</button>" +
      '<input id="f-' + name + '" name="' + name + '" type="number" inputmode="numeric" min="' + min + '" max="' + max + '" value="' + val + '">' +
      '<button type="button" class="round-btn" aria-label="Больше: ' + esc(label) + '" data-step="1">' + icon("plus") + "</button></div>" +
      '<p class="field__error" data-error-for="' + name + '" role="alert"></p></div>';
  }
  function stayFields(s, L, today, max, iso) {
    var mg = Math.max.apply(null, [2].concat(services().map(maxGuestsOf)));
    if (programItems().length && s.groupMax) mg = Math.max(mg, s.groupMax);
    var ex = extrasItems();
    return '<div class="form__row">' +
        field("date", L.date, '<input id="f-date" name="date" type="date" required min="' + iso(today) + '" max="' + iso(max) + '">') +
        field("dateout", L.dateout, '<input id="f-dateout" name="dateout" type="date" required min="' + iso(new Date(today.getTime() + 864e5)) + '">') +
      "</div>" +
      '<div class="form__row">' + stepperField("adults", L.adults, 1, mg, s.adultsDefault || 2) + stepperField("kids", L.kids, 0, mg, 0, s.kidsNote || "до 12 лет") + "</div>" +
      (ex.length ? '<fieldset class="field extras-pick"><legend class="field__label">' + esc(L.extras) + ' <span class="field__opt">необязательно</span></legend><div class="extras-pick__grid">' +
        ex.map(function (e) { return '<label class="pick"><input type="checkbox" name="extras" value="' + esc(e.id) + '"><span class="pick__box">' + icon("check") + '</span><span class="pick__text"><span class="pick__title">' + esc(e.short || e.title) + '</span><span class="pick__price">' + esc(e.price || "") + "</span></span></label>"; }).join("") +
        "</div></fieldset>" : "") +
      '<div class="estimate" data-estimate aria-live="polite" hidden></div>';
  }

  /* ===================== v1.5: общепит ===================== */
  var MENU_TAG_ICONS = { "веган": "leaf", "вегетарианское": "leaf", "вег": "leaf", "острое": "flame", "хит": "star", "новинка": "sparkles", "без глютена": "wheat", "без лактозы": "drop" };
  function menuItem(it, v, i) {
    var tags = (it.tags || []).map(function (t) { var ic = MENU_TAG_ICONS[String(t).toLowerCase()]; return '<li class="dish__tag">' + (ic ? icon(ic) : "") + esc(t) + "</li>"; }).join("");
    var meta = (it.weight ? '<span class="dish__weight">' + esc(it.weight) + "</span>" : "");
    if (v === "list") {
      return '<li class="dish dish--line reveal" style="--d:' + (i % 4) * 50 + 'ms"><div class="dish__line"><h4 class="dish__title">' + esc(it.title) + (it.badge ? ' <span class="dish__badge">' + esc(it.badge) + "</span>" : "") + '</h4><span class="dish__dots" aria-hidden="true"></span><span class="dish__price">' + esc(it.price || "") + "</span></div>" +
        (it.text || meta ? '<p class="dish__text">' + esc(it.text || "") + (meta ? " " + meta : "") + "</p>" : "") + (tags ? '<ul class="dish__tags">' + tags + "</ul>" : "") + "</li>";
    }
    return '<li class="dish' + (it.featured ? " dish--featured" : "") + ' reveal" style="--d:' + (i % 4) * 50 + 'ms">' +
      (it.image ? '<div class="dish__media">' + img(it.image, it.imageAlt || it.title, { sizes: "(max-width: 600px) 50vw, (max-width: 1100px) 33vw, 25vw", w: 640, h: 480 }) + (it.badge ? '<span class="dish__badge">' + esc(it.badge) + "</span>" : "") + "</div>" : "") +
      '<div class="dish__body"><h4 class="dish__title">' + esc(it.title) + (!it.image && it.badge ? ' <span class="dish__badge">' + esc(it.badge) + "</span>" : "") + "</h4>" +
        (it.text ? '<p class="dish__text">' + esc(it.text) + "</p>" : "") + (tags ? '<ul class="dish__tags">' + tags + "</ul>" : "") +
        '<div class="dish__foot"><span class="dish__price">' + esc(it.price || "") + "</span>" + meta + "</div></div></li>";
  }
  /* Меню: категории (вкладки), блюда с фото, весом, ценой и метками. variant: "grid" (карточки с фото) | "list" (строки с точками) */
  R.menu = function (s) {
    var cats = s.categories || [], v = s.variant || "grid", id = s.id || "menu", tabs = s.tabs !== false && cats.length > 1;
    return '<section class="section menu menu--' + esc(v) + '" id="' + esc(id) + '"><div class="container">' + head(s) +
      (tabs ? '<div class="tabs menu__tabs" role="tablist" aria-label="' + esc(s.tabsLabel || "Разделы меню") + '">' + cats.map(function (c, i) {
        return '<button type="button" class="tab' + (i === 0 ? " is-active" : "") + '" role="tab" id="mtab-' + esc(id) + '-' + i + '" aria-controls="mpanel-' + esc(id) + '-' + i + '" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '" data-tab="' + i + '"' + (c.id ? ' data-cat="' + esc(c.id) + '"' : "") + ">" + esc(c.title) + "</button>";
      }).join("") + "</div>" : "") +
      cats.map(function (c, i) {
        return '<div class="menu__panel"' + (tabs ? ' role="tabpanel" id="mpanel-' + esc(id) + '-' + i + '" aria-labelledby="mtab-' + esc(id) + '-' + i + '"' + (i === 0 ? "" : " hidden") : "") + ">" +
          (!tabs ? '<h3 class="menu__cat">' + esc(c.title) + "</h3>" : "") + (c.note ? '<p class="menu__note">' + esc(c.note) + "</p>" : "") +
          '<ul class="menu__grid">' + (c.items || []).map(function (it, k) { return menuItem(it, v, k); }).join("") + "</ul></div>";
      }).join("") +
      (s.note || s.buttonText ? '<div class="menu__foot">' + (s.note ? '<p class="menu__foot-note">' + esc(s.note) + "</p>" : "") + (s.buttonText ? btn({ text: s.buttonText, href: s.buttonHref || "#order", style: s.buttonStyle || "primary" }) : "") + "</div>" : "") +
      "</div></section>";
  };
  /* Доставка и самовывоз: текст, пункты, кнопки сервисов доставки, фото */
  R.order = function (s) {
    return '<section class="section order' + (s.variant ? " order--" + esc(s.variant) : "") + '" id="' + esc(s.id || "order") + '"><div class="container"><div class="order__box reveal">' +
      '<div class="order__content">' + eyebrow(s) + '<h2 class="section-title order__title">' + esc(s.title) + "</h2>" + (s.text ? '<p class="order__text">' + esc(s.text) + "</p>" : "") +
        (s.points && s.points.length ? '<ul class="order__points">' + s.points.map(function (p) { return '<li><span class="order__icon">' + icon(p.icon || "check") + "</span><span>" + esc(p.text) + "</span></li>"; }).join("") + "</ul>" : "") +
        (s.buttons && s.buttons.length ? '<div class="order__buttons">' + s.buttons.map(function (b) { var ext = /^https?:/.test(b.href || ""); return '<a class="btn btn--' + esc(b.style || "primary") + '" href="' + esc(b.href || "#contacts") + '"' + (ext ? ' target="_blank" rel="noopener"' : "") + ">" + (b.icon ? icon(b.icon) : "") + esc(b.text) + "</a>"; }).join("") + "</div>" : "") +
        (s.note ? '<p class="order__note">' + esc(s.note) + "</p>" : "") +
      "</div>" + (s.image ? '<div class="order__media">' + img(s.image, s.imageAlt, { sizes: "(max-width: 900px) 100vw, 50vw", w: 1024, h: 768 }) + "</div>" : "") +
      "</div></div></section>";
  };
  function isoDate0(d) { return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  /* Открыто / закрыто сейчас — по contacts.schedule: 7 элементов (0 — воскресенье), ["08:00","22:00"] или null (выходной) */
  function openStatusText(short) {
    var sc = contacts().schedule; if (!sc) return null;
    var now = new Date(), m = now.getHours() * 60 + now.getMinutes();
    function mins(t) { var p = t.split(":"); return +p[0] * 60 + +p[1]; }
    function day(i) { var d = sc[(i + 7) % 7]; return d && d.length === 2 ? d : null; }
    var t = day(now.getDay()), y = day(now.getDay() - 1);
    if (y && mins(y[1]) <= mins(y[0]) && m < mins(y[1])) return { open: true, text: (short ? "Открыто до " : "Сейчас открыто · до ") + y[1] };
    if (t) { var o = mins(t[0]), c = mins(t[1]), cross = c <= o; if (m >= o && (cross || m < c)) return { open: true, text: (short ? "Открыто до " : "Сейчас открыто · до ") + t[1] }; if (m < o) return { open: false, text: (short ? "Откроемся в " : "Сейчас закрыто · откроемся в ") + t[0] }; }
    for (var k = 1; k <= 7; k++) { var n = day(now.getDay() + k); if (n) return { open: false, text: (short ? "Закрыто · " : "Сейчас закрыто · откроемся ") + (k === 1 ? "завтра в " : ["в вс", "в пн", "во вт", "в ср", "в чт", "в пт", "в сб"][(now.getDay() + k) % 7] + " в ") + n[0] }; }
    return null;
  }
  function initOpenStatus() {
    $$("[data-open-status]").forEach(function (el) { var st = openStatusText(el.hasAttribute("data-short")); if (!st) return; el.textContent = st.text; el.classList.add("open-status"); el.classList.toggle("is-open", st.open); el.classList.toggle("is-closed", !st.open); });
  }
  /* Слоты времени: прошедшие на сегодня — недоступны; slotsByDay — свои слоты по дням недели */
  function initTableBooking(form) {
    var bs = bookingSection(), din = form.elements.date, tsel = form.elements.time, base = bs.timeSlots || [];
    function slots() {
      var list = base, cur = tsel.value, d = din.value ? parseISO(din.value) : null;
      if (d && bs.slotsByDay && bs.slotsByDay[d.getDay()]) list = bs.slotsByDay[d.getDay()];
      var lim = -1; if (din.value === isoDate0(new Date())) { var l = new Date(Date.now() + (bs.leadMinutes == null ? 60 : bs.leadMinutes) * 6e4); lim = l.getHours() * 60 + l.getMinutes(); if (l.getDate() !== new Date().getDate()) lim = 24 * 60; }
      var ph = tsel.options[0].outerHTML, any = false;
      tsel.innerHTML = ph + list.map(function (t) { var p = t.split(":"), off = +p[0] * 60 + +p[1] < lim; if (!off) any = true; return "<option" + (off ? " disabled" : "") + (t === cur && !off ? " selected" : "") + ">" + esc(t) + "</option>"; }).join("");
      tsel.options[0].textContent = din.value && !any ? (bs.noSlotsText || "На этот день мест нет") : ((bs.labels && bs.labels.timePlaceholder) || "--:--");
    }
    form._slots = slots;
    din.addEventListener("change", slots); slots();
    var st = $('[data-field="guests"] [data-stepper]', form);
    if (st) {
      var inp = $("input", st), mx = +inp.max;
      var note = doc.createElement("p"); note.className = "field__hint"; note.setAttribute("data-group-note", ""); note.hidden = true;
      note.textContent = bs.groupMaxText || ("Для компании больше " + mx + " человек — позвоните нам");
      var row = st.closest(".form__row"); if (row) row.insertAdjacentElement("afterend", note); else st.closest(".field").appendChild(note);
      var upd = function () { var v = Math.round(+inp.value || 0); $('[data-step="-1"]', st).disabled = v <= 1; $('[data-step="1"]', st).disabled = v >= mx; note.hidden = v < mx; };
      st.addEventListener("click", function (e) { var b = e.target.closest("[data-step]"); if (!b) return; inp.value = Math.max(1, Math.min(mx, Math.round(+inp.value || 0) + +b.getAttribute("data-step"))); inp.dispatchEvent(new Event("change", { bubbles: true })); upd(); });
      inp.addEventListener("change", upd); inp.addEventListener("input", upd); upd();
    }
  }

  /* ---------- footer ---------- */
  function renderFooter() {
    var f = C.footer || {}, c = contacts();
    var cols = (f.columns || []).map(function (col) {
      var links = col.links === "services" ? services().map(function (s) { return { text: s.title, href: s.href || "#services" }; }) : (col.links || []);
      return '<div class="footer__col"><p class="footer__title">' + esc(col.title) + "</p><ul>" + links.map(function (l) { return '<li><a href="' + esc(l.href) + '">' + esc(l.text) + "</a></li>"; }).join("") + "</ul></div>";
    }).join("");
    var contactCol = '<div class="footer__col footer__col--contacts"><p class="footer__title">Связаться с нами</p>' +
      (c.phone ? tel(c.phoneHref, c.phone, "footer__phone") : "") + (c.phone2 ? tel(c.phone2Href, c.phone2, "footer__phone") : "") +
      (c.email ? '<a class="footer__email" href="mailto:' + esc(c.email) + '">' + esc(c.email) + "</a>" : "") +
      '<p class="footer__addr">' + esc(c.address || "") + "</p>" +
      (c.hours || []).map(function (h) { return '<p class="footer__hours">' + esc(h.days) + ": " + esc(h.time) + "</p>"; }).join("") + "</div>";
    return '<footer class="footer"><div class="container">' +
      '<div class="footer__top"><div class="footer__brand">' + logo() + ((C.brand || {}).tagline ? '<p class="footer__tagline">' + esc(C.brand.tagline) + "</p>" : "") + socials("footer__socials") + "</div>" + cols + contactCol + "</div>" +
      '<div class="footer__bottom">' +
        '<div class="footer__legal">' + (f.legal || []).map(function (l) { return "<span>" + esc(l) + "</span>"; }).join("") + '<a class="footer__privacy" href="' + esc(privacyHref()) + '">Политика обработки персональных данных</a></div>' +
        '<p class="footer__copy">© <span data-year>' + new Date().getFullYear() + "</span> " + esc(f.copyright || "") + "</p>" +
        (C.demo && f.demoNote ? '<p class="footer__demo">' + esc(f.demoNote) + "</p>" : "") +
      "</div>" + (f.bigText ? '<p class="footer__big" aria-hidden="true">' + esc(f.bigText) + "</p>" : "") + "</div></footer>";
  }

  function renderMobileBar() {
    var c = contacts();
    return '<div class="mobile-bar" id="mobile-bar">' +
      (c.phone ? '<a class="btn btn--soft mobile-bar__call" href="tel:' + esc(c.phoneHref) + '">' +  icon("phone") + esc((C.mobileBar && C.mobileBar.call) || "Позвонить") + "</a>" : "") +
      (C.cta ? '<a class="btn btn--primary" href="' + esc(C.cta.href) + '">' + icon("calendar") + esc(C.cta.text) + "</a>" : "") + "</div>";
  }

  function renderCallback() {
    var cb = C.callback || {};
    var bk = (C.sections || []).filter(function (x) { return x.type === "booking"; })[0] || {};
    var mask = esc(bk.phoneMask || "+375 (__) ___-__-__");
    return '<div class="modal" id="callback" aria-hidden="true" hidden><div class="modal__overlay" data-close-modal></div>' +
      '<div class="modal__panel" role="dialog" aria-modal="true" aria-labelledby="cb-title" tabindex="-1">' +
        '<button class="icon-btn modal__close" type="button" aria-label="Закрыть" data-close-modal>' + icon("close") + "</button>" +
        '<h3 class="modal__title" id="cb-title">' + esc(cb.title || "Заказать звонок") + '</h3><p class="modal__text">' + esc(cb.text || "Оставьте номер — перезвоним в ближайшее время.") + "</p>" +
        '<form class="form" id="callback-form" novalidate>' +
          '<div class="field" data-field="cbname"><label class="field__label" for="f-cbname">Имя</label><input id="f-cbname" name="cbname" type="text" autocomplete="name" required minlength="2" maxlength="60" placeholder="Иван"><p class="field__error" data-error-for="cbname" role="alert"></p></div>' +
          '<div class="field" data-field="cbphone"><label class="field__label" for="f-cbphone">Телефон</label><input id="f-cbphone" name="cbphone" type="tel" inputmode="tel" autocomplete="tel" required placeholder="' + mask + '" data-mask="' + mask + '"><p class="field__error" data-error-for="cbphone" role="alert"></p></div>' +
          '<div class="field field--consent" data-field="consent">' + consentBox(cb.consentText || bk.consentText) + '<p class="field__error" data-error-for="consent" role="alert"></p></div>' +
          '<button class="btn btn--primary btn--lg btn--block" type="submit">' + esc(cb.button || "Жду звонка") + "</button>" +
          '<p class="form__status" role="status" aria-live="polite"></p>' +
        "</form></div></div>";
  }

  /* ---------- build page ---------- */
  function build() {
    var m = C.meta || {};
    if (m.title) doc.title = m.title;
    if (m.lang) doc.documentElement.lang = m.lang;
    if (C.header && C.header.variant === "bar") doc.documentElement.classList.add("hdr-bar");
    if (C.header && C.header.overlay) doc.documentElement.classList.add("hdr-overlay");
    setMeta("description", m.description);
    setMeta("theme-color", m.themeColor);
    setMeta("og:title", m.title, true); setMeta("og:description", m.description, true);
    if (m.ogImage) setMeta("og:image", m.ogImage, true);

    var app = doc.getElementById("app");
    /* Если страница уже пререндерена (tools/prerender.js) и config.js не менялся — используем готовый HTML */
    if (app.getAttribute("data-prerendered") !== configHash()) app.innerHTML = renderHTML();
    app.removeAttribute("aria-busy");
    /* обновляем то, что зависит от текущей даты */
    $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
    var dt = doc.getElementById("f-date");
    var bk2 = bookingSection();
    $$('[data-finder] input[type="date"]').forEach(function (fd) { fd.min = isoDate(new Date(Date.now() + (fd.getAttribute("data-fd") === "dateout" ? 864e5 : 0))); fd.max = isoDate(new Date(Date.now() + ((bk2.maxDaysAhead || 60) + (fd.getAttribute("data-fd") === "dateout" ? 30 : 0)) * 864e5)); });
    var dto = doc.getElementById("f-dateout"); if (dto) dto.min = isoDate(new Date(Date.now() + 864e5));
    if (dt) { var bk = (C.sections || []).filter(function (x) { return x.type === "booking"; })[0] || {}; dt.min = isoDate(new Date()); dt.max = isoDate(new Date(Date.now() + (bk.maxDaysAhead || 60) * 864e5)); }
  }
  function renderHTML() {
    finderIdx = 0;
    return renderHeader() + '<main id="main">' +
      (C.sections || []).filter(function (s) { return !s.hidden && R[s.type]; }).map(function (s) { return R[s.type](s); }).join("") +
      "</main>" + renderFooter() + renderMobileBar() + renderDrawer() + renderCallback() + lightboxHTML();
  }
  function isoDate(d) { return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  var CORE_VERSION = "1.5.0";
  function configHash() {
    var str = CORE_VERSION + JSON.stringify(C), h = 5381;
    for (var i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) | 0;
    return (h >>> 0).toString(36);
  }
  /* API для пререндера */
  window.SiteCore = { renderHTML: renderHTML, configHash: configHash, version: CORE_VERSION };
  function setMeta(name, val, og) {
    if (!val) return;
    var sel = og ? 'meta[property="' + name + '"]' : 'meta[name="' + name + '"]';
    var el = doc.head.querySelector(sel);
    if (!el) { el = doc.createElement("meta"); el.setAttribute(og ? "property" : "name", name); doc.head.appendChild(el); }
    el.setAttribute("content", val);
  }

  /* ---------- behaviour ---------- */
  function $(s, r) { return (r || doc).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || doc).querySelectorAll(s)); }

  /* Блокировка прокрутки фона. На сенсорных (iOS Safari игнорирует overflow:hidden) —
     фиксируем body и восстанавливаем позицию после закрытия. */
  var lockCount = 0, lockY = 0, coarse = window.matchMedia && matchMedia("(hover: none) and (pointer: coarse)").matches;
  function lockScroll(on) {
    var was = lockCount > 0;
    lockCount = Math.max(0, lockCount + (on ? 1 : -1));
    var now = lockCount > 0, html = doc.documentElement, bs = doc.body.style;
    html.classList.toggle("is-locked", now);
    if (!coarse || was === now) return;
    if (now) { lockY = window.pageYOffset || 0; bs.position = "fixed"; bs.top = -lockY + "px"; bs.left = "0"; bs.right = "0"; bs.width = "100%"; }
    else { bs.position = bs.top = bs.left = bs.right = bs.width = ""; html.style.scrollBehavior = "auto"; window.scrollTo(0, lockY); html.style.scrollBehavior = ""; }
  }

  function initHeader() {
    var header = $("#header"), bar = $("#mobile-bar"), ticking = false;
    function update() {
      if (lockCount > 0 && coarse) { ticking = false; return; }
      var y = window.scrollY || window.pageYOffset;
      header.classList.toggle("is-scrolled", y > 50);
      if (bar) bar.classList.toggle("is-visible", y > 480);
      ticking = false;
    }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();

    /* меню услуг (десктоп) */
    var toggle = $("[data-svc-toggle]"), menu = $("#svc-menu");
    function setMenu(open) {
      if (!menu) return;
      menu.hidden = !open; toggle.setAttribute("aria-expanded", String(open));
      toggle.classList.toggle("is-open", open);
    }
    if (toggle) toggle.addEventListener("click", function (e) { e.stopPropagation(); setMenu(menu.hidden); });
    doc.addEventListener("click", function (e) { if (menu && !menu.hidden && !menu.contains(e.target)) setMenu(false); });
    doc.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
    if (menu) menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });

    /* подсветка активного пункта меню (по позиции прокрутки) */
    var links = $$(".nav a[href^='#']"), targets = [];
    links.forEach(function (a) { var el = doc.getElementById(a.getAttribute("href").slice(1)); if (el && targets.indexOf(el) < 0) targets.push(el); });
    var navTick = false, current = null;
    function spy() {
      navTick = false;
      var line = window.innerHeight * 0.35, found = null;
      for (var i = 0; i < targets.length; i++) { var r = targets[i].getBoundingClientRect(); if (r.top <= line && r.bottom > line) found = targets[i]; }
      if (found === current) return;
      current = found;
      links.forEach(function (a) { a.classList.toggle("is-active", !!found && a.getAttribute("href") === "#" + found.id); });
    }
    window.addEventListener("scroll", function () { if (!navTick) { navTick = true; requestAnimationFrame(spy); } }, { passive: true });
    spy();
  }

  function initDrawer() {
    var drawer = $("#drawer"), panel = $(".drawer__panel", drawer), opener = $("[data-open-drawer]"), lastFocus;
    function open() {
      lastFocus = doc.activeElement;
      drawer.classList.add("is-open"); drawer.setAttribute("aria-hidden", "false");
      opener.setAttribute("aria-expanded", "true"); lockScroll(true);
      setTimeout(function () { panel.focus(); }, 30);
    }
    function close() {
      if (!drawer.classList.contains("is-open")) return;
      drawer.classList.remove("is-open"); drawer.setAttribute("aria-hidden", "true");
      opener.setAttribute("aria-expanded", "false"); lockScroll(false);
      if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    }
    opener.addEventListener("click", open);
    $$("[data-close-drawer]", drawer).forEach(function (el) { el.addEventListener("click", close); });
    doc.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); if (e.key === "Tab" && drawer.classList.contains("is-open")) trap(e, panel); });
    window.addEventListener("resize", function () { if (window.innerWidth > 1024) close(); });
  }
  function trap(e, root) {
    var f = $$('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])', root).filter(function (el) { return el.offsetParent !== null; });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && (doc.activeElement === first || doc.activeElement === root)) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && doc.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  function initModal() {
    var modal = $("#callback"); if (!modal) return;
    var panel = $(".modal__panel", modal), lastFocus;
    function open() {
      lastFocus = doc.activeElement; modal.hidden = false;
      requestAnimationFrame(function () { modal.classList.add("is-open"); });
      modal.setAttribute("aria-hidden", "false"); lockScroll(true);
      setTimeout(function () { var i = $("input", panel); (i || panel).focus(); }, 60);
    }
    function close() {
      if (modal.hidden) return;
      modal.classList.remove("is-open"); modal.setAttribute("aria-hidden", "true"); lockScroll(false);
      setTimeout(function () { modal.hidden = true; }, reduceMotion ? 0 : 220);
      if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    }
    $$("[data-open-callback]").forEach(function (b) { b.addEventListener("click", open); });
    $$("[data-close-modal]", modal).forEach(function (b) { b.addEventListener("click", close); });
    doc.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); if (e.key === "Tab" && !modal.hidden) trap(e, panel); });
    modal._close = close;
  }

  function initHero() {
    var track = $("[data-hero-track]"); if (!track) return;
    var slides = $$(".hero__slide", track), dots = $$("[data-hero-dot]"), idx = 0, timer = null;
    var cfg = (C.sections || []).filter(function (s) { return s.type === "hero"; })[0] || {};
    var delay = cfg.autoplay || 0;
    function go(i, smooth) {
      idx = (i + slides.length) % slides.length;
      track.scrollTo({ left: slides[idx].offsetLeft - track.offsetLeft, behavior: smooth === false || reduceMotion ? "auto" : "smooth" });
    }
    function mark(i) {
      idx = i;
      dots.forEach(function (d, k) { d.classList.toggle("is-active", k === i); d.setAttribute("aria-selected", String(k === i)); });
      slides.forEach(function (s, k) { s.classList.toggle("is-current", k === i); s.setAttribute("aria-hidden", String(k !== i)); $$("a,button", s).forEach(function (a) { a.tabIndex = k === i ? 0 : -1; }); });
    }
    var raf = 0;
    track.addEventListener("scroll", function () {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        var i = Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
        if (i !== idx) mark(Math.min(i, slides.length - 1));
      });
    }, { passive: true });
    dots.forEach(function (d) { d.addEventListener("click", function () { go(+d.getAttribute("data-hero-dot")); restart(); }); });
    var p = $("[data-hero-prev]"), n = $("[data-hero-next]");
    if (p) p.addEventListener("click", function () { go(idx - 1); restart(); });
    if (n) n.addEventListener("click", function () { go(idx + 1); restart(); });
    function stop() { clearInterval(timer); timer = null; }
    function start() { if (delay && !reduceMotion && slides.length > 1 && !timer) timer = setInterval(function () { if (!doc.hidden) go(idx + 1); }, delay); }
    function restart() { stop(); start(); }
    var hero = track.closest(".hero");
    hero.addEventListener("mouseenter", stop); hero.addEventListener("mouseleave", start);
    hero.addEventListener("focusin", stop); hero.addEventListener("focusout", start);
    track.addEventListener("touchstart", stop, { passive: true });
    track.addEventListener("touchend", function () { setTimeout(start, 4000); }, { passive: true });
    /* не крутим слайдер, когда он вне экрана */
    if ("IntersectionObserver" in window) new IntersectionObserver(function (e) { e[0].isIntersecting ? start() : stop(); }).observe(hero);
    else start();
    window.addEventListener("resize", function () { go(idx, false); });
    mark(0);
  }

  function initReviews() { $$("[data-rev-track], [data-rail]").forEach(initRail); }
  function initRail(track) {
    var sec = track.closest("section") || doc;
    function step(dir) {
      var card = track.firstElementChild; var gap = parseFloat(getComputedStyle(track).columnGap) || 20;
      var w = card ? card.getBoundingClientRect().width + gap : 320;
      track.scrollBy({ left: dir * w, behavior: reduceMotion ? "auto" : "smooth" });
    }
    var p = $("[data-rev-prev], [data-rail-prev]", sec), n = $("[data-rev-next], [data-rail-next]", sec);
    function upd() {
      var max = track.scrollWidth - track.clientWidth - 2;
      if (p) p.disabled = track.scrollLeft <= 2; if (n) n.disabled = track.scrollLeft >= max;
    }
    if (p) p.addEventListener("click", function () { step(-1); });
    if (n) n.addEventListener("click", function () { step(1); });
    var raf = 0;
    track.addEventListener("scroll", function () { cancelAnimationFrame(raf); raf = requestAnimationFrame(upd); }, { passive: true });
    window.addEventListener("resize", upd); upd();
  }

  function initTabs() {
    $$(".tabs").forEach(function (list) {
      var tabs = $$(".tab", list), box = list.parentNode;
      function activate(i, focus) {
        tabs.forEach(function (t, k) {
          var on = k === i; t.classList.toggle("is-active", on); t.setAttribute("aria-selected", String(on)); t.tabIndex = on ? 0 : -1;
          var panel = doc.getElementById(t.getAttribute("aria-controls")); if (panel) panel.hidden = !on;
        });
        if (focus) tabs[i].focus();
        tabs[i].scrollIntoView({ block: "nearest", inline: "nearest", behavior: reduceMotion ? "auto" : "smooth" });
      }
      tabs.forEach(function (t, i) {
        t.addEventListener("click", function () { activate(i); });
        t.addEventListener("keydown", function (e) {
          if (e.key === "ArrowRight") { e.preventDefault(); activate((i + 1) % tabs.length, true); }
          if (e.key === "ArrowLeft") { e.preventDefault(); activate((i - 1 + tabs.length) % tabs.length, true); }
        });
      });
      void box;
    });
  }

  function initBeforeAfter() {
    $$(".ba").forEach(function (ba) {
      var r = $(".ba__range", ba);
      function set() { ba.style.setProperty("--pos", r.value + "%"); }
      r.addEventListener("input", set); set();
    });
  }

  /* «Прожектор» за курсором на карточках бенто (только мышь) */
  function initSpotlight() {
    if (!window.matchMedia || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    $$(".bento__item").forEach(function (el) {
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty("--mx", (e.clientX - r.left) + "px"); el.style.setProperty("--my", (e.clientY - r.top) + "px");
      }, { passive: true });
    });
  }

  function initCalc() {
    $$("[data-calc]").forEach(function (box) {
      var cfgs = (C.sections || []).map(function (x) { return x.calc || (x.type === "calc" ? x : null); }).filter(Boolean);
      var c = cfgs[0] || {}, items = c.items || [], qty = 1, term = null;
      var sel = $("[data-calc-item]", box), out = $("[data-calc-qty]", box), row = $("[data-calc-qtyrow]", box), unit = $("[data-calc-unit]", box);
      var total = $("[data-calc-total]", box), month = $("[data-calc-month]", box), go = $("[data-calc-btn]", box), terms = $$("[data-calc-term]", box);
      var act = terms.filter(function (t) { return t.classList.contains("is-active"); })[0]; term = act ? +act.getAttribute("data-calc-term") : 0;
      function upd() {
        var it = items[+sel.value] || {}, max = it.max || 16;
        qty = it.unit ? Math.max(1, Math.min(max, qty)) : 1;
        row.hidden = !it.unit; unit.textContent = it.unit || ""; out.textContent = qty;
        $("[data-calc-minus]", box).disabled = qty <= 1; $("[data-calc-plus]", box).disabled = qty >= max;
        var sum = (it.price || 0) * qty; total.textContent = (it.from ? (c.fromText || "от") + " " : "") + money(sum, c.currency);
        month.textContent = term ? (it.from ? (c.fromText || "от") + " " : "") + money(sum / term, c.currency) : (c.noTermMonth || "без рассрочки");
        if (it.service) go.setAttribute("data-service", it.service); else go.removeAttribute("data-service");
      }
      sel.addEventListener("change", function () { qty = 1; upd(); });
      $("[data-calc-minus]", box).addEventListener("click", function () { qty--; upd(); });
      $("[data-calc-plus]", box).addEventListener("click", function () { qty++; upd(); });
      terms.forEach(function (t) { t.addEventListener("click", function () {
        term = +t.getAttribute("data-calc-term");
        terms.forEach(function (o) { var on = o === t; o.classList.toggle("is-active", on); o.setAttribute("aria-checked", String(on)); });
        upd();
      }); });
      upd();
    });
  }

  function initFaq() {
    /* плавное раскрытие без тяжёлых анимаций высоты */
    $$(".faq-item").forEach(function (d) {
      d.addEventListener("toggle", function () {
        if (d.open) $$(".faq-item[open]").forEach(function (o) { if (o !== d) o.open = false; });
      });
    });
  }

  function initReveal() {
    var els = $$(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("is-visible"); }); return; }
    doc.documentElement.classList.add("js-reveal");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    els.forEach(function (e) { io.observe(e); });
  }

  function initCounters() {
    var els = $$("[data-count]");
    if (reduceMotion || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        var el = en.target, raw = el.getAttribute("data-count");
        var num = parseFloat(raw.replace(/\s/g, "").replace(",", "."));
        if (isNaN(num)) return;
        var dec = (raw.split(".")[1] || "").length, t0 = null, dur = 1100;
        function fmt(v) { var s = v.toFixed(dec); return raw.indexOf(" ") > -1 ? Number(s).toLocaleString("ru-RU").replace(/\u00a0/g, " ") : s; }
        function tick(t) { if (!t0) t0 = t; var k = Math.min(1, (t - t0) / dur); k = 1 - Math.pow(1 - k, 3); el.textContent = fmt(num * k); if (k < 1) requestAnimationFrame(tick); else el.textContent = raw; }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.6 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- forms ---------- */
  function phoneMask(input) {
    var mask = input.getAttribute("data-mask");
    if (!mask) return;
    var prefix = (mask.match(/^[^_]*?(?=\s*\(|_)/) || [""])[0].replace(/\D/g, ""); // "375"
    function digits(v) {
      var d = v.replace(/\D/g, "");
      if (prefix && d.indexOf(prefix) === 0) d = d.slice(prefix.length);
      else if (d.charAt(0) === "8" && d.length > 1) d = d.slice(1).replace(/^0/, "");
      return d.slice(0, (mask.match(/_/g) || []).length);
    }
    function format(d) {
      if (!d.length) return "";
      var out = "", i = 0;
      for (var k = 0; k < mask.length; k++) {
        var ch = mask[k];
        if (ch === "_") { if (i >= d.length) break; out += d[i++]; }
        else { if (i >= d.length && k > mask.indexOf("_")) break; out += ch; }
      }
      return out;
    }
    input.addEventListener("input", function () { input.value = format(digits(input.value)); });
    input.addEventListener("focus", function () { if (!input.value) input.value = mask.slice(0, mask.indexOf("_")); });
    input.addEventListener("blur", function () { if (!digits(input.value).length) input.value = ""; });
    input._complete = function () { return digits(input.value).length === (mask.match(/_/g) || []).length; };
  }

  function setError(form, name, msg) {
    var f = form.querySelector('[data-field="' + name + '"]');
    var p = form.querySelector('[data-error-for="' + name + '"]');
    var ctrl = form.elements[name];
    if (p) p.textContent = msg || "";
    if (f) f.classList.toggle("has-error", !!msg);
    if (ctrl && ctrl.setAttribute) { ctrl.setAttribute("aria-invalid", msg ? "true" : "false"); if (p) { p.id = p.id || "err-" + name; ctrl.setAttribute("aria-describedby", p.id); } }
    return !msg;
  }

  function validators(form) {
    return {
      name: function (v) { v = v.trim(); if (!v) return "Укажите имя"; if (v.length < 2) return "Слишком короткое имя"; if (!/^[\p{L}\s'’.-]+$/u.test(v)) return "Только буквы, пробелы и дефис"; },
      cbname: function (v) { v = v.trim(); if (!v) return "Укажите имя"; if (v.length < 2) return "Слишком короткое имя"; },
      phone: function (v, el) { if (!v.trim()) return "Укажите телефон"; if (el._complete && !el._complete()) return "Введите номер полностью"; },
      cbphone: function (v, el) { if (!v.trim()) return "Укажите телефон"; if (el._complete && !el._complete()) return "Введите номер полностью"; },
      car: function (v, el) { if (!el.required && !v.trim()) return; if (v.trim().length < 2) return el.getAttribute("data-error") || "Укажите марку и модель"; },
      service: function (v, el) { if (!v && el.required !== false && el.hasAttribute("required")) return "Выберите услугу"; },
      time: function (v, el) {
        if (form.getAttribute("data-mode") !== "table") return;
        if (!v) return "Выберите время";
        var d = form.elements.date.value, bs = bookingSection();
        if (d && d === isoDate(new Date())) { var lim = new Date(Date.now() + (bs.leadMinutes == null ? 60 : bs.leadMinutes) * 6e4), p = v.split(":"); if (+p[0] * 60 + +p[1] < lim.getHours() * 60 + lim.getMinutes()) return "На сегодня — не раньше " + String(lim.getHours()).padStart(2, "0") + ":" + String(lim.getMinutes()).padStart(2, "0") + ". Или позвоните нам"; }
        void el;
      },
      guests: function (v) {
        var g = Math.round(+v || 0), bs = bookingSection(), gm = bs.groupMax || 12;
        if (g < 1) return "Укажите число гостей";
        if (g > gm) return bs.groupMaxText || ("Для компании больше " + gm + " человек — выберите банкет или позвоните нам");
      },
      date: function (v, el) {
        if (!v) return "Выберите дату";
        if (el.min && v < el.min) return "Дата уже прошла";
        if (el.max && v > el.max) return (form.elements.dateout ? "Бронирование открыто до " : "Запись доступна не дальше ") + el.max.split("-").reverse().join(".");
        var closed = (el.getAttribute("data-closed") || "").split(",").filter(Boolean).map(Number);
        var p = v.split("-"); var wd = new Date(+p[0], +p[1] - 1, +p[2]).getDay();
        if (closed.indexOf(wd) > -1) return "В этот день мы не работаем";
      },
      dateout: function (v) {
        var din = form.elements.date, bs = bookingSection(), n;
        if (!v) return isProgram(form.elements.service.value) ? undefined : "Выберите дату выезда";
        if (!din || !din.value) return;
        n = nightsBetween(din.value, v);
        if (n <= 0) return "Выезд должен быть позже заезда";
        if (n < (bs.minNights || 1)) return "Минимальный срок — " + bs.minNights + " " + plural(bs.minNights, ["ночь", "ночи", "ночей"]);
        if (n > (bs.maxNights || 30)) return "Не больше " + (bs.maxNights || 30) + " ночей — для долгого проживания позвоните нам";
      },
      adults: function (v) {
        var a = Math.round(+v || 0), k = Math.round(+((form.elements.kids || {}).value || 0)), st = findStay(form.elements.service.value), cap = maxGuestsOf(st);
        if (a < 1) return "Нужен хотя бы один взрослый";
        if (st && cap && a + k > cap) return "В «" + st.title + "» — до " + cap + " " + plural(cap, ["гостя", "гостей", "гостей"]) + ". Выберите домик побольше или два домика";
      },
      consent: function (v, el) { if (!el.checked) return "Нужно согласие на обработку данных"; }
    };
  }

  function initForm(form, onSuccess) {
    if (!form) return;
    var V = validators(form);
    $$("[data-mask]", form).forEach(phoneMask);
    function check(name) {
      var el = form.elements[name]; if (!el || !V[name]) return true;
      return setError(form, name, V[name](el.value, el));
    }
    Object.keys(V).forEach(function (name) {
      var el = form.elements[name]; if (!el) return;
      el.addEventListener("blur", function () { if (el.value || el.type === "checkbox") check(name); });
      el.addEventListener(el.tagName === "SELECT" || el.type === "checkbox" || el.type === "date" ? "change" : "input", function () {
        var f = form.querySelector('[data-field="' + name + '"]');
        if ((f && f.classList.contains("has-error")) || el.type === "checkbox") check(name);
      });
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var firstBad = null;
      Object.keys(V).forEach(function (name) { if (form.elements[name] && !check(name) && !firstBad) firstBad = form.elements[name]; });
      var status = $(".form__status", form);
      if (firstBad) { firstBad.focus(); if (status) status.textContent = ""; return; }
      var data = {}; $$("input, select, textarea", form).forEach(function (el) {
        if (!el.name) return;
        if (el.type === "checkbox" && el.name !== "consent") { data[el.name] = data[el.name] || []; if (el.checked) data[el.name].push(el.value); }
        else data[el.name] = el.type === "checkbox" ? el.checked : el.value.trim();
      });
      var endpoint = form.getAttribute("data-endpoint");
      var submit = $('[type="submit"]', form);
      submit.disabled = true; submit.classList.add("is-loading");
      var done = function () { submit.disabled = false; submit.classList.remove("is-loading"); onSuccess(data); };
      if (endpoint) {
        fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) })
          .then(function (r) { if (!r.ok) throw new Error(r.status); done(); })
          .catch(function () { submit.disabled = false; submit.classList.remove("is-loading"); if (status) status.textContent = "Не удалось отправить заявку. Позвоните нам: " + (contacts().phone || ""); });
      } else {
        setTimeout(done, reduceMotion ? 0 : 700); /* демо-режим */
      }
    });
  }

  function initBooking() {
    var form = $("#booking-form"); if (!form) return;
    var wrap = form.parentNode, success = $(".form-success", wrap);
    if (form.elements.dateout) initStayBooking(form);
    if (form.getAttribute("data-mode") === "table") initTableBooking(form);
    initForm(form, function (data) {
      var svcSel = form.elements.service;
      var bs = (C.sections || []).filter(function (x) { return x.type === "booking"; })[0] || {}, L = labels(bs);
      var rows = [[L.name, data.name], [L.phone, data.phone.replace(/ /g, "\u00a0")], data.car ? [L.car, data.car] : null, [L.service, svcSel.options[svcSel.selectedIndex].text],
        [L.date, data.date.split("-").reverse().join(".") + (data.time ? ", " + data.time : "")]];
      if (bs.mode === "table") {
        rows = [[L.name, data.name], [L.phone, data.phone.replace(/ /g, "\u00a0")], [bs.whenLabel || "Когда", ruDate(data.date) + ", " + data.time],
          [L.guests, data.guests + " " + plural(+data.guests, ["гость", "гостя", "гостей"])],
          svcSel && data.service ? [L.service, svcSel.options[svcSel.selectedIndex].text] : null];
      }
      if (bs.mode === "stay") {
        var r = stayCalc(form), kids = +data.kids || 0;
        rows = [[L.name, data.name], [L.phone, data.phone.replace(/ /g, "\u00a0")], [L.service, svcSel.options[svcSel.selectedIndex].text],
          [bs.datesLabel || "Даты", data.dateout ? ruDate(data.date) + " — " + ruDate(data.dateout) + " · " + r.nights + " " + plural(r.nights, ["ночь", "ночи", "ночей"]) : ruDate(data.date)],
          [bs.guestsLabel || "Гости", data.adults + " " + plural(+data.adults, ["взрослый", "взрослых", "взрослых"]) + (kids ? " + " + kids + " " + plural(kids, ["ребёнок", "ребёнка", "детей"]) : "")],
          r.extras.length ? [L.extras, r.extras.map(function (e) { return e.short || e.title; }).join(", ")] : null,
          r.stay && r.stay.night ? [L.total, (r.extrasUnknown ? "от " : "") + money(r.total, C.currency)] : null];
      }
      $(".form-success__summary", success).innerHTML = rows.filter(Boolean).map(function (r) { return "<div><dt>" + esc(r[0]) + "</dt><dd>" + esc(r[1]) + "</dd></div>"; }).join("");
      form.hidden = true; success.hidden = false; success.focus({ preventScroll: true });
      var top = wrap.getBoundingClientRect().top; if (top < 80) wrap.scrollIntoView({ block: "start", behavior: reduceMotion ? "auto" : "smooth" });
    });
    $("[data-form-reset]", success).addEventListener("click", function () {
      form.reset(); $$(".field", form).forEach(function (f) { f.classList.remove("has-error"); });
      if (form._update) { form._update(); syncExtraButtons(form); }
      if (form._slots) form._slots();
      $$(".field__error", form).forEach(function (p) { p.textContent = ""; });
      success.hidden = true; form.hidden = false; form.elements.name.focus();
    });
    /* предвыбор услуги из кнопок «Записаться» на карточках */
    doc.addEventListener("click", function (e) {
      var a = e.target.closest("[data-service]"); if (!a) return;
      var sel = form.elements.service, id = a.getAttribute("data-service");
      var mt = doc.querySelector('.menu .tab[data-cat="' + id + '"]'); if (mt) mt.click();
      if (!sel) return;
      if ($('option[value="' + id + '"]', sel)) { sel.value = id; setError(form, "service", ""); sel.dispatchEvent(new Event("change", { bubbles: true })); }
      if (!form.hidden) setTimeout(function () { var nm = form.elements.name; if (!nm.value && window.innerWidth > 1024) nm.focus({ preventScroll: true }); }, reduceMotion ? 0 : 700);
    });
  }

  function initCallback() {
    var form = $("#callback-form"); if (!form) return;
    initForm(form, function () {
      var st = $(".form__status", form);
      st.textContent = (C.callback && C.callback.success) || "Спасибо! Мы скоро перезвоним.";
      st.classList.add("is-success");
      setTimeout(function () { var m = $("#callback"); if (m && m._close) m._close(); form.reset(); st.textContent = ""; st.classList.remove("is-success"); }, 1800);
    });
  }

  function initFinder() {
    var form = $("#booking-form"); if (!form) return;
    $$("[data-finder]").forEach(function (f) {
      var g = function (k) { return $('[data-fd="' + k + '"]', f); };
      var fin = g("date"), fout = g("dateout");
      if (fin && fout) fin.addEventListener("change", function () {
        if (!fin.value) return; var d = parseISO(fin.value); d.setDate(d.getDate() + 1); fout.min = isoDate(d);
        if (!fout.value || fout.value <= fin.value) { d.setDate(d.getDate() + (bookingSection().minNights || 1) - 1); fout.value = isoDate(d); }
      });
      f.addEventListener("submit", function (e) {
        e.preventDefault();
        var sv = g("service"), tm = g("time"), ad = g("adults");
        if (sv && sv.value && $('option[value="' + sv.value + '"]', form.elements.service)) { form.elements.service.value = sv.value; setError(form, "service", ""); form.elements.service.dispatchEvent(new Event("change", { bubbles: true })); }
        if (fin && fin.value) { form.elements.date.value = fin.value; form.elements.date.dispatchEvent(new Event("change", { bubbles: true })); }
        if (fout && fout.value && form.elements.dateout) { form.elements.dateout.value = fout.value; form.elements.dateout.dispatchEvent(new Event("change", { bubbles: true })); }
        var gs = g("guests"); if (gs && form.elements.guests) { form.elements.guests.value = gs.value; form.elements.guests.dispatchEvent(new Event("change", { bubbles: true })); }
        if (ad && form.elements.adults) { form.elements.adults.value = ad.value; form.elements.kids.value = 0; form.elements.adults.dispatchEvent(new Event("change", { bubbles: true })); }
        if (tm && tm.value && form.elements.time) { if (form._slots) form._slots(); var op = $('option[value="' + tm.value + '"]', form.elements.time) || [].filter.call(form.elements.time.options, function (o) { return o.value === tm.value; })[0]; if (op && !op.disabled) form.elements.time.value = tm.value; }
        var target = form.closest("section"); if (target) target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
        setTimeout(function () { if (!form.hidden) { var nm = form.elements.name; if (!nm.value) nm.focus({ preventScroll: true }); } }, reduceMotion ? 0 : 700);
      });
    });
  }

  /* ---------- v1.4: бронирование по датам ---------- */
  function parseISO(v) { if (!v) return null; var p = v.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function nightsBetween(a, b) { var x = parseISO(a), y = parseISO(b); return x && y ? Math.round((y - x) / 864e5) : 0; }
  function ruDate(v) { return v ? v.split("-").reverse().join(".") : ""; }
  function isProgram(id) { return !!id && programItems().some(function (p) { return p.id === id; }); }
  function findStay(id) { return services().filter(function (v) { return v.id === id; })[0] || null; }
  function extraById(id) { return extrasItems().filter(function (e) { return e.id === id; })[0] || null; }
  /* per: "night" — за каждую ночь, "guest" — с человека, "guestNight" — с человека за ночь, иначе — разово */
  function extraMult(e, n, g) { n = Math.max(1, n); g = Math.max(1, g); return e.per === "night" ? n : e.per === "guest" ? g : e.per === "guestNight" ? n * g : 1; }
  function stayCalc(form) {
    var st = findStay(form.elements.service.value), din = form.elements.date.value, dout = form.elements.dateout.value;
    var n = din && dout ? nightsBetween(din, dout) : 0, guests = (+form.elements.adults.value || 0) + (+form.elements.kids.value || 0);
    var base = 0, wk = 0;
    if (st && st.night && n > 0) for (var i = 0; i < n; i++) { var d = parseISO(din); d.setDate(d.getDate() + i); var w = d.getDay() === 5 || d.getDay() === 6; if (w) wk++; base += w && st.weekend ? st.weekend : st.night; }
    var ex = [], exSum = 0, exUnknown = false;
    $$('input[name="extras"]:checked', form).forEach(function (c) {
      var e = extraById(c.value); if (!e) return; ex.push(e);
      if (e.cost == null) { exUnknown = true; return; }
      exSum += e.cost * extraMult(e, n, guests);
    });
    return { stay: st, nights: n, weekendNights: wk, guests: guests, base: base, extras: ex, extrasSum: exSum, extrasUnknown: exUnknown, total: base + exSum };
  }
  function initStayBooking(form) {
    var bs = bookingSection(), L = labels(bs), box = $("[data-estimate]", form);
    var din = form.elements.date, dout = form.elements.dateout, sel = form.elements.service;
    var minN = bs.minNights || 1;
    function addDays(v, k) { var d = parseISO(v); d.setDate(d.getDate() + k); return isoDate(d); }
    function capacity() { var st = findStay(sel.value); return st && st.guests ? maxGuestsOf(st) : +form.elements.adults.getAttribute("data-max0"); }
    ["adults", "kids"].forEach(function (n) { var el = form.elements[n]; el.setAttribute("data-max0", el.max); });
    function clampSteppers() {
      var cap = capacity();
      $$("[data-stepper]", form).forEach(function (w) {
        var inp = $("input", w), mn = +inp.min, v = Math.round(+inp.value || 0);
        inp.max = inp.name === "kids" ? Math.max(0, cap - 1) : cap;
        v = Math.max(mn, Math.min(+inp.max, v)); if (String(v) !== inp.value) inp.value = v;
        $('[data-step="-1"]', w).disabled = v <= mn; $('[data-step="1"]', w).disabled = v >= +inp.max || ((+form.elements.adults.value || 0) + (+form.elements.kids.value || 0)) >= cap;
      });
    }
    function update() {
      clampSteppers();
      if (!box) return;
      var r = stayCalc(form), cur = C.currency;
      if (!r.nights || r.nights < 0 || !r.stay) { box.hidden = true; box.innerHTML = ""; return; }
      var rows = [];
      if (r.stay.night) rows.push([esc(r.stay.title) + ", " + r.nights + " " + plural(r.nights, ["ночь", "ночи", "ночей"]) + (r.weekendNights && r.stay.weekend ? " <small>(" + r.weekendNights + " " + plural(r.weekendNights, ["выходная", "выходные", "выходных"]) + ")</small>" : ""), money(r.base, cur)]);
      r.extras.forEach(function (e) { rows.push([esc(e.short || e.title), e.cost == null ? esc(L.onRequest || "по запросу") : money(e.cost * extraMult(e, r.nights, r.guests), cur)]); });
      box.hidden = false;
      box.innerHTML = '<p class="estimate__title">' + esc(L.estimate) + "</p><ul>" + rows.map(function (x) { return "<li><span>" + x[0] + "</span><span>" + x[1] + "</span></li>"; }).join("") + "</ul>" +
        (r.stay.night ? '<p class="estimate__total"><span>' + esc(L.total || "Итого") + "</span><strong>" + (r.extrasUnknown ? "от " : "") + money(r.total, cur) + "</strong></p>" : '<p class="estimate__total"><span>' + esc(L.total || "Итого") + "</span><strong>" + esc(L.onRequest || "по запросу") + "</strong></p>") +
        (bs.estimateNote ? '<p class="estimate__note">' + esc(bs.estimateNote) + "</p>" : "");
    }
    din.addEventListener("change", function () {
      if (!din.value) return;
      dout.min = addDays(din.value, 1);
      if (!dout.value || dout.value <= din.value) { dout.value = addDays(din.value, minN); setError(form, "dateout", ""); }
      update();
    });
    [dout, sel, form.elements.adults, form.elements.kids].forEach(function (el) { el.addEventListener("change", update); el.addEventListener("input", update); });
    sel.addEventListener("change", function () { var f = form.querySelector('[data-field="adults"]'); if (f && f.classList.contains("has-error")) setTimeout(function () { form.elements.adults.dispatchEvent(new Event("blur")); }, 0); });
    $$("[data-stepper]", form).forEach(function (w) {
      var inp = $("input", w);
      $$("[data-step]", w).forEach(function (b) { b.addEventListener("click", function () { inp.value = (+inp.value || 0) + +b.getAttribute("data-step"); inp.dispatchEvent(new Event("change", { bubbles: true })); update(); var f = form.querySelector('[data-field="adults"]'); if (f && f.classList.contains("has-error")) setError(form, "adults", validators(form).adults(form.elements.adults.value)); }); });
    });
    $$('input[name="extras"]', form).forEach(function (c) { c.addEventListener("change", function () { syncExtraButtons(form); update(); }); });
    form._update = update;
    update();
  }
  function syncExtraButtons(form) {
    $$("[data-extra]").forEach(function (b) {
      var c = form && $('input[name="extras"][value="' + b.getAttribute("data-extra") + '"]', form), on = !!(c && c.checked);
      b.setAttribute("aria-pressed", String(on)); b.classList.toggle("is-added", on);
    });
  }
  function initExtras() {
    var form = $("#booking-form"); if (!form) return;
    doc.addEventListener("click", function (e) {
      var b = e.target.closest("[data-extra]"); if (!b) return;
      var c = $('input[name="extras"][value="' + b.getAttribute("data-extra") + '"]', form); if (!c) return;
      c.checked = !c.checked; c.dispatchEvent(new Event("change", { bubbles: true }));
    });
    syncExtraButtons(form);
  }
  function initLightbox() {
    var lb = $("#lightbox"); if (!lb) return;
    var panel = $(".lightbox__panel", lb), im = $(".lightbox__img", lb), cap = $(".lightbox__title", lb), cnt = $(".lightbox__count", lb), list = [], idx = 0, lastFocus;
    function show(i) {
      idx = (i + list.length) % list.length; var it = list[idx];
      im.src = it.src; im.alt = it.alt; cap.textContent = it.title; cnt.textContent = (idx + 1) + " / " + list.length;
    }
    function open(group, i) {
      list = $$("[data-lb]", group).map(function (b) { var g = $("img", b); return { src: g.getAttribute("src"), alt: g.getAttribute("alt") || "", title: b.getAttribute("data-lb-title") || g.getAttribute("alt") || "" }; });
      lastFocus = doc.activeElement; show(i); lb.hidden = false; lb.setAttribute("aria-hidden", "false"); lockScroll(true);
      requestAnimationFrame(function () { lb.classList.add("is-open"); }); setTimeout(function () { panel.focus(); }, 30);
    }
    function close() {
      if (lb.hidden) return;
      lb.classList.remove("is-open"); lb.setAttribute("aria-hidden", "true"); lockScroll(false);
      setTimeout(function () { lb.hidden = true; im.removeAttribute("src"); }, reduceMotion ? 0 : 200);
      if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    }
    doc.addEventListener("click", function (e) {
      var b = e.target.closest("[data-lb]"); if (!b) return;
      var group = b.closest("section") || doc; open(group, $$("[data-lb]", group).indexOf(b));
    });
    $$("[data-lb-close]", lb).forEach(function (b) { b.addEventListener("click", close); });
    $("[data-lb-prev]", lb).addEventListener("click", function () { show(idx - 1); });
    $("[data-lb-next]", lb).addEventListener("click", function () { show(idx + 1); });
    doc.addEventListener("keydown", function (e) {
      if (lb.hidden) return;
      if (e.key === "Escape") close(); else if (e.key === "ArrowLeft") show(idx - 1); else if (e.key === "ArrowRight") show(idx + 1); else if (e.key === "Tab") trap(e, panel);
    });
    var x0 = null;
    panel.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    panel.addEventListener("touchend", function (e) { if (x0 == null) return; var dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1)); x0 = null; }, { passive: true });
  }
  function initCopy() {
    $$("[data-copy]").forEach(function (b) {
      b.addEventListener("click", function () {
        var t = b.getAttribute("data-copy"), label = b.textContent;
        function ok() { b.textContent = b.getAttribute("data-copied") || "Скопировано"; b.classList.add("is-done"); setTimeout(function () { b.textContent = label; b.classList.remove("is-done"); }, 1600); }
        if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(t).then(ok, ok);
        else { var ta = doc.createElement("textarea"); ta.value = t; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0"; doc.body.appendChild(ta); ta.select(); try { doc.execCommand("copy"); } catch (e) {} doc.body.removeChild(ta); ok(); }
      });
    });
  }

  function init() {
    build();
    initHeader(); initDrawer(); initModal(); initHero(); initReviews(); initTabs();
    initBeforeAfter(); initSpotlight(); initCalc(); initFaq(); initReveal(); initCounters(); initBooking(); initFinder(); initCallback();
    initExtras(); initLightbox(); initCopy(); initOpenStatus();
    /* если в адресе есть #якорь — прокрутить после рендера */
    if (location.hash && location.hash.length > 1) { var t = doc.getElementById(location.hash.slice(1)); if (t) setTimeout(function () { t.scrollIntoView(); }, 0); }
  }

  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", init); else init();
})();
