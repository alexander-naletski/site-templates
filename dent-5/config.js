/* =====================================================================
   КОНФИГУРАЦИЯ САЙТА «блеск.» — тексты, контакты, услуги, цены.
   • Меняйте только значения в кавычках. Порядок блоков = порядок в `sections`.
   • Блок можно скрыть: `hidden: true`.
   • Все данные — ПРИМЕР (демо). Название, телефоны, адрес, врачи, цены,
     акции и отзывы вымышлены.
   ===================================================================== */
window.SITE_CONFIG = {
  demo: true,

  meta: {
    lang: "ru",
    title: "блеск. — эстетическая стоматология в Гомеле | Демо-шаблон",
    description: "Студия эстетической стоматологии: отбеливание, виниры, элайнеры, гигиена и уход. Красивая улыбка без боли и лишних слов.",
    ogImage: "assets/img/og-image.jpg",
    themeColor: "#ffffff"
  },

  brand: { name: "блеск.", logo: null, logoText: "блеск.", tagline: "студия эстетической стоматологии" },

  /* Шапка: полоса-объявление + одна строка */
  header: {
    variant: "bar", phone: false, callback: true, ctaStyle: "primary",
    announce: "Консультация по отбеливанию бесплатно (пример акции)",
    announceHref: "#booking"
  },

  contacts: {
    phone: "+375 (29) 000-00-15",
    phoneHref: "+375290000015",
    email: "hello@example.com",
    city: "Гомель",
    address: "г. Гомель, ул. Демонстрационная, 5",
    addressNote: "1 этаж, вход с улицы, розовая дверь (пример)",
    hours: [
      { days: "Пн–Пт", time: "10:00–21:00" },
      { days: "Сб–Вс", time: "10:00–18:00" }
    ],
    hoursShort: "Ежедневно",
    mapEmbed: "",
    mapLink: "https://yandex.by/maps/?text=%D0%93%D0%BE%D0%BC%D0%B5%D0%BB%D1%8C",
    socials: [
      { type: "instagram", url: "https://instagram.com/", label: "Instagram" },
      { type: "telegram", url: "https://t.me/", label: "Telegram" },
      { type: "vk", url: "https://vk.com/", label: "VK" }
    ]
  },

  topbar: { callbackText: "Перезвоните мне" },

  nav: [
    { text: "Услуги", href: "#services" },
    { text: "О нас", href: "#about" },
    { text: "Цены", href: "#prices" },
    { text: "Отзывы", href: "#reviews" },
    { text: "Команда", href: "#team" }
  ],

  cta: { text: "Записаться", href: "#booking" },
  servicesButton: "Услуги",
  mobileBar: { call: "Позвонить" },

  callback: { title: "перезвоним тебе", text: "Оставь номер — администратор ответит на все вопросы.", button: "Жду звонка", success: "Спасибо! Скоро перезвоним." },

  /* УСЛУГИ — сетка «как витрина»: badge — стикер на фото (необязательно) */
  services: [
    { id: "whitening", icon: "sparkles", badge: "хит", title: "Отбеливание", text: "До 8 тонов за 90 минут", price: "390 BYN", time: "90 мин", image: "assets/img/svc-whitening" },
    { id: "veneers", icon: "crown", badge: "новинка", title: "Виниры", text: "Тонкая керамика по дизайну улыбки", price: "от 950 BYN", time: "2–3 визита", image: "assets/img/svc-veneers" },
    { id: "aligners", icon: "braces", title: "Элайнеры", text: "Прозрачные капы, 3D-план", price: "от 4 600 BYN", time: "6–18 мес", image: "assets/img/svc-aligners" },
    { id: "hygiene", icon: "drop", badge: "хит", title: "Гигиена", text: "Air Flow, полировка, уход", price: "130 BYN", time: "60 мин", image: "assets/img/svc-hygiene" },
    { id: "care", icon: "heart", title: "Домашний уход", text: "Подбор щётки и пасты", price: "40 BYN", time: "20 мин", image: "assets/img/svc-care" },
    { id: "therapy", icon: "tooth", title: "Лечение", text: "Эстетичные реставрации", price: "от 95 BYN", time: "40–60 мин", image: "assets/img/svc-therapy" },
    { id: "implant", icon: "implant", title: "Имплантация", text: "Коронка на имплант", price: "от 1 500 BYN", time: "от 1 часа", image: "assets/img/svc-implant" },
    { id: "kids", icon: "baby", title: "Детям", text: "Гигиена и лечение", price: "от 60 BYN", time: "30 мин", image: "assets/img/svc-kids" }
  ],

  sections: [
    {
      type: "hero",
      variant: "cover",
      align: "left",
      id: "top",
      image: "assets/img/hero",
      imageAlt: "Девушка с сияющей кожей касается лица",
      eyebrow: "ты сияешь.",
      title: "улыбка, которой хочется делиться",
      text: "Отбеливание, виниры и элайнеры в студии, где всё красиво — от кресла до результата.",
      buttons: [ { text: "Записаться", href: "#booking", style: "light" } ]
    },

    {
      type: "gallery",
      id: "looks",
      title: "Найди свою улыбку",
      items: [
        { title: "ярче", image: "assets/img/look-1" },
        { title: "ровнее", image: "assets/img/look-2" },
        { title: "нежнее", image: "assets/img/look-3" },
        { title: "смелее", image: "assets/img/look-4" },
        { title: "свежее", image: "assets/img/look-5" }
      ]
    },

    {
      type: "services",
      id: "services",
      title: "Популярное",
      subtitle: "Выбери услугу — она сразу появится в форме записи.",
      buttonText: "Записаться"
    },

    {
      type: "about",
      id: "about",
      variant: "reverse",
      eyebrow: "улыбка месяца",
      title: "Естественно. Честно. Красиво.",
      text: "Мы не делаем «голливудские» одинаковые улыбки. Мы подчёркиваем твою — оттенок, форму и характер. Сначала примерка на экране, потом — результат.",
      image: "assets/img/campaign",
      imageAlt: "Смеющаяся девушка с ослепительной улыбкой",
      list: [
        "Цифровой дизайн улыбки до начала работы",
        "Материалы, которые не отличить от своих зубов",
        "Без боли: анестезия и деликатные протоколы"
      ]
    },

    {
      type: "prices",
      id: "prices",
      title: "Цены",
      subtitle: "Прозрачно и без мелкого шрифта.",
      note: "Цены в BYN — пример для демо-шаблона. Не является публичной офертой.",
      buttonText: "Записаться",
      categories: [
        { name: "Отбеливание", rows: [["Кабинетное отбеливание", "390 BYN"], ["Домашнее (капы + гель)", "290 BYN"], ["Поддерживающий курс", "150 BYN"]] },
        { name: "Виниры", rows: [["Цифровой дизайн улыбки", "120 BYN"], ["Керамический винир", "от 950 BYN"], ["Композитный винир", "от 280 BYN"]] },
        { name: "Элайнеры", rows: [["Консультация + 3D-план", "90 BYN"], ["Курс элайнеров (лёгкий)", "от 4 600 BYN"], ["Ретейнер", "от 250 BYN"]] },
        { name: "Гигиена и уход", rows: [["Профгигиена", "130 BYN"], ["Подбор домашнего ухода", "40 BYN"], ["Фторирование", "30 BYN"]] }
      ]
    },

    {
      type: "reviews",
      id: "reviews",
      variant: "grid",
      title: "Говорят клиенты",
      subtitle: "4.9 из 5 — пример оценки.",
      items: [
        { name: "Настя Л.", car: "Отбеливание", rating: 5, date: "сентябрь 2026", text: "Пришла на отбеливание перед свадьбой — ушла с улыбкой, которую хочется показывать всем." },
        { name: "Катя М.", car: "Виниры", rating: 5, date: "август 2026", text: "Сначала увидела улыбку на экране. Результат — один в один, и выглядит естественно." },
        { name: "Даня В.", car: "Элайнеры", rating: 5, date: "август 2026", text: "Капы вообще никто не замечает. Уже 5 месяцев — зубы заметно ровнее." },
        { name: "Лера П.", car: "Гигиена", rating: 5, date: "июль 2026", text: "Самая приятная гигиена в жизни: быстро, не больно и красиво внутри." },
        { name: "Оля К.", car: "Домашний уход", rating: 4, date: "июнь 2026", text: "Подобрали щётку и пасту, чувствительность ушла. Хотелось бы больше окон для записи." },
        { name: "Марк Д.", car: "Лечение", rating: 5, date: "май 2026", text: "Реставрацию переднего зуба не отличить от соседних. Спасибо!" }
      ]
    },

    {
      type: "team",
      id: "team",
      title: "Команда",
      subtitle: "Имена — пример для демо-шаблона.",
      buttonText: "Записаться",
      items: [
        { name: "Дарья Ким", role: "Эстетист", exp: "10 лет", service: "veneers", tags: ["Виниры", "Дизайн улыбки"] },
        { name: "Алиса Ром", role: "Ортодонт", exp: "8 лет", service: "aligners", tags: ["Элайнеры"] },
        { name: "Вика Ёж", role: "Гигиенист", exp: "6 лет", service: "hygiene", tags: ["Air Flow", "Отбеливание"] },
        { name: "Макс Оз", role: "Терапевт", exp: "12 лет", service: "therapy", tags: ["Реставрации"] }
      ]
    },

    {
      type: "faq",
      id: "faq",
      title: "Вопросы",
      subtitle: "Не нашла ответ? Позвони нам.",
      items: [
        { q: "Отбеливание вредно для зубов?", a: "Профессиональное отбеливание под контролем врача безопасно. Перед процедурой проводим осмотр и гигиену." },
        { q: "Сколько держится эффект?", a: "Обычно 1–2 года, если соблюдать рекомендации и проходить гигиену раз в полгода." },
        { q: "Больно ли ставить виниры?", a: "Процедура проходит под анестезией. Для керамических виниров обычно нужна минимальная подготовка зуба." },
        { q: "Можно ли в рассрочку?", a: "Да, на виниры и элайнеры — до 12 месяцев (пример условий)." }
      ]
    },

    {
      type: "booking",
      id: "booking",
      title: "Запишись",
      subtitle: "Оставь заявку — перезвоним и подберём время. Консультация по отбеливанию — бесплатно (пример).",
      endpoint: "",
      phoneMask: "+375 (__) ___-__-__",
      carField: false,
      labels: { name: "Имя", phone: "Телефон", service: "Услуга", servicePlaceholder: "Выбери услугу", serviceOther: "Нужна консультация", date: "Дата", time: "Время", timeAny: "Любое", comment: "Комментарий" },
      commentPlaceholder: "Например: хочу отбеливание перед отпуском",
      timeSlots: ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"],
      closedWeekdays: [],
      maxDaysAhead: 45,
      consentText: "Согласна(ен) на обработку персональных данных",
      submitText: "Отправить",
      successTitle: "Ура, заявка у нас!",
      successText: "Перезвоним, чтобы подтвердить время.",
      perks: ["Консультация бесплатно", "Примерка улыбки на экране", "Без боли"]
    },

    { type: "contacts", id: "contacts", title: "Где мы" }
  ],

  footer: {
    columns: [
      { title: "Услуги", links: "services" },
      { title: "Студия", links: [
        { text: "О нас", href: "#about" }, { text: "Цены", href: "#prices" }, { text: "Отзывы", href: "#reviews" }, { text: "Команда", href: "#team" }, { text: "Запись", href: "#booking" }
      ]}
    ],
    legal: ["ООО «Пример» (демо-реквизиты)", "УНП 000000000", "Лицензия № 00000 (пример)"],
    copyright: "блеск. Все права защищены.",
    demoNote: "Демонстрационный шаблон. Название, врачи, контакты, цены, акции и отзывы вымышлены. Фото: CC0 / Public Domain. Имеются противопоказания, необходима консультация специалиста."
  }
};
