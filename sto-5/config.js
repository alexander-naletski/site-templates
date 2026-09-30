/* =====================================================================
   КОНФИГУРАЦИЯ САЙТА «Чистая линия» (шаблон СТО №5, стиль fashion-журнала)
   ---------------------------------------------------------------------
   • Меняйте только значения в кавычках. Не удаляйте запятые и скобки.
   • Порядок блоков на странице = порядок в массиве `sections`.
     Блок можно скрыть, поставив `hidden: true`.
   • Все данные ниже — ПРИМЕР. Название, телефоны, адрес, цены и отзывы
     вымышлены и не относятся к реальной компании.
   ===================================================================== */
window.SITE_CONFIG = {
  demo: true,

  meta: {
    lang: "ru",
    title: "Чистая линия — сервис и детейлинг премиум-автомобилей в Гомеле | Демо-шаблон",
    description: "Техническое обслуживание, шины, кузов и уход за салоном премиальных автомобилей. Строгий подход, аккуратная работа, запись онлайн.",
    ogImage: "assets/img/og-image.jpg",
    themeColor: "#ffffff"
  },

  brand: {
    name: "Чистая линия",
    logo: null,
    logoText: "ЧИСТАЯ ЛИНИЯ",
    logoAccent: "",
    tagline: "Сервис и детейлинг премиальных автомобилей"
  },

  /* Шапка: логотип по центру, меню слева, запись справа */
  header: { variant: "bar", align: "center", ctaStyle: "outline", callback: false },

  contacts: {
    phone: "+375 (29) 000-00-05",
    phoneHref: "+375290000005",
    phone2: "",
    email: "studio@example.com",
    city: "Гомель",
    address: "г. Гомель, ул. Примерная, 3",
    addressNote: "Отдельный въезд, клиентский лаунж (пример)",
    hours: [
      { days: "Пн–Пт", time: "09:00–20:00" },
      { days: "Сб–Вс", time: "10:00–18:00" }
    ],
    hoursShort: "Ежедневно, по записи",
    mapEmbed: "",
    mapLink: "https://yandex.by/maps/?text=%D0%93%D0%BE%D0%BC%D0%B5%D0%BB%D1%8C",
    socials: [
      { type: "instagram", url: "https://instagram.com/", label: "Instagram" },
      { type: "telegram", url: "https://t.me/", label: "Telegram" }
    ]
  },

  topbar: { links: [], callbackText: "Заказать звонок" },

  nav: [
    { text: "Услуги", href: "#services" },
    { text: "Цены", href: "#prices" },
    { text: "Студия", href: "#about" },
    { text: "Работы", href: "#works" },
    { text: "Контакты", href: "#contacts" }
  ],
  navRight: [ { text: "Запись", href: "#booking" } ],

  cta: { text: "Запись", href: "#booking" },
  servicesButton: "Услуги",
  mobileBar: { call: "Позвонить" },

  callback: {
    title: "Заказать звонок",
    text: "Оставьте номер — менеджер студии перезвонит.",
    button: "Перезвоните мне",
    success: "Спасибо. Мы перезвоним."
  },

  /* УСЛУГИ. image — фото карточки (соотношение 4:5) */
  services: [
    { id: "service", icon: "oil", image: "assets/img/svc-service", title: "Техническое обслуживание", text: "Регламент производителя, оригинальные материалы.", price: "от 90 BYN", time: "2 часа" },
    { id: "diagnostics", icon: "diagnostics", image: "assets/img/svc-diagnostics", title: "Диагностика", text: "Полная проверка систем дилерским сканером.", price: "от 60 BYN", time: "1 час" },
    { id: "tires", icon: "tire", image: "assets/img/svc-tires", title: "Шины и диски", text: "Шиномонтаж без царапин, балансировка, хранение.", price: "от 60 BYN", time: "40 мин" },
    { id: "body", icon: "body", image: "assets/img/svc-body", title: "Кузов и полировка", text: "Восстановительная полировка, керамика, плёнка.", price: "от 300 BYN", time: "от 1 дня" },
    { id: "interior", icon: "sparkles", image: "assets/img/svc-interior", title: "Салон", text: "Деликатная чистка кожи и алькантары.", price: "от 180 BYN", time: "1 день" },
    { id: "brakes", icon: "brakes", image: "assets/img/svc-brakes", title: "Тормозная система", text: "Колодки, диски, жидкость — по допускам марки.", price: "от 50 BYN", time: "от 1 часа" }
  ],

  sections: [
    {
      type: "hero",
      variant: "editorial",
      id: "top",
      eyebrow: "Сервис · Детейлинг · Гомель",
      title: "Ваш автомобиль в идеальной форме",
      text: "Обслуживание и уход за премиальными автомобилями — строго по регламенту, без лишних слов и лишних работ.",
      buttons: [ { text: "Записаться", href: "#booking", style: "primary" } ],
      images: [
        { image: "assets/img/hero-white", alt: "Белый автомобиль в студии", label: "Сервис", caption: "Техническое обслуживание по регламенту", href: "#booking", service: "service" },
        { image: "assets/img/hero-detail", alt: "Деталь кузова автомобиля крупным планом", label: "Детейлинг", caption: "Полировка и защита кузова", href: "#booking", service: "body" }
      ]
    },

    {
      type: "services",
      id: "services",
      eyebrow: "Услуги",
      title: "Услуги студии",
      buttonText: "Записаться"
    },

    {
      type: "statement",
      id: "manifest",
      text: "Меньше шума. Больше точности.",
      sub: "Мы берём не больше шести автомобилей в день — чтобы каждому уделить столько внимания, сколько нужно.",
      buttonText: "О студии",
      buttonHref: "#about",
      buttonStyle: "outline"
    },

    {
      type: "about",
      variant: "reverse",
      id: "about",
      eyebrow: "Студия",
      title: "Сервис как ателье",
      text: "«Чистая линия» — студия на три поста для владельцев автомобилей премиум-класса. Мы соединили техническое обслуживание и детейлинг в одном месте, чтобы вы доверяли автомобиль одной команде.",
      image: "assets/img/about-rear",
      imageAlt: "Задняя часть тёмного автомобиля в студийном свете",
      stats: [
        { value: "3", suffix: "", label: "поста" },
        { value: "6", suffix: "", label: "авто в день" },
        { value: "11", suffix: "", label: "лет опыта" }
      ],
      list: [
        "Дилерское диагностическое оборудование",
        "Составы для ухода — только профессиональные",
        "Лаунж для клиентов, кофе и Wi-Fi"
      ]
    },

    {
      type: "prices",
      variant: "table",
      id: "prices",
      eyebrow: "Цены",
      title: "Прайс-лист",
      subtitle: "Базовая стоимость. Итог зависит от модели автомобиля и согласуется заранее.",
      note: "Цены в белорусских рублях, пример. Материалы и запчасти оплачиваются отдельно.",
      categories: [
        { name: "Сервис", rows: [
          ["ТО по регламенту", "от 90 BYN"],
          ["Диагностика", "от 60 BYN"],
          ["Замена тормозных колодок (ось)", "от 50 BYN"],
          ["Замена жидкостей", "от 40 BYN"]
        ]},
        { name: "Шины", rows: [
          ["Шиномонтаж R17–R19", "60 BYN"],
          ["Шиномонтаж R20–R22", "85 BYN"],
          ["Балансировка (4 колеса)", "35 BYN"],
          ["Хранение комплекта", "80 BYN"]
        ]},
        { name: "Детейлинг", rows: [
          ["Восстановительная полировка", "от 400 BYN"],
          ["Керамическое покрытие", "от 700 BYN"],
          ["Химчистка салона", "от 180 BYN"],
          ["Уход за кожей", "от 120 BYN"]
        ]}
      ],
      buttonText: "Записаться"
    },

    {
      type: "steps",
      id: "steps",
      eyebrow: "Процесс",
      title: "Как мы работаем",
      items: [
        { title: "Запись", text: "Онлайн или по телефону, в удобное время." },
        { title: "Приёмка", text: "Осмотр при вас, фотофиксация состояния." },
        { title: "Работа", text: "Строго по согласованной смете." },
        { title: "Выдача", text: "Отчёт, рекомендации и чистый автомобиль." }
      ]
    },

    {
      type: "gallery",
      id: "works",
      eyebrow: "Работы",
      title: "До / После",
      subtitle: "Потяните разделитель, чтобы сравнить.",
      note: "Изображения «до» — иллюстрация для демо-шаблона.",
      items: [
        { title: "Оптика", text: "Полировка и защитная плёнка.", before: "assets/img/ba-headlight-before", after: "assets/img/ba-headlight-after" },
        { title: "Диски", text: "Очистка и керамика.", before: "assets/img/ba-rim-before", after: "assets/img/ba-rim-after" },
        { title: "Салон", text: "Химчистка и уход за кожей.", before: "assets/img/ba-interior-before", after: "assets/img/ba-interior-after" }
      ]
    },

    {
      type: "reviews",
      variant: "grid",
      id: "reviews",
      eyebrow: "Отзывы",
      title: "Отзывы",
      items: [
        { name: "Дмитрий А.", car: "Porsche Macan", rating: 5, date: "сентябрь 2026", text: "Спокойно, аккуратно, без навязывания. Автомобиль вернули в лучшем состоянии, чем я ожидал." },
        { name: "Виктория С.", car: "BMW X5", rating: 5, date: "август 2026", text: "Сделали полировку и керамику — выглядит как из салона. Отдельное спасибо за подробный отчёт." },
        { name: "Игорь Н.", car: "Lexus RX", rating: 5, date: "июль 2026", text: "Нравится, что всё по записи и без очередей. Можно спокойно поработать в лаунже, пока идёт ТО." }
      ]
    },

    {
      type: "faq",
      id: "faq",
      eyebrow: "Вопросы",
      title: "Вопросы",
      subtitle: "Не нашли ответ? Позвоните — ответим.",
      items: [
        { q: "С какими марками вы работаете?", a: "С большинством премиальных марок. Уточните модель при записи — подготовим материалы заранее." },
        { q: "Сохраняется ли гарантия производителя?", a: "Мы работаем по регламенту производителя и с материалами нужных допусков, а все работы фиксируем документально." },
        { q: "Сколько времени занимает полировка?", a: "Обычно 1–2 дня в зависимости от состояния лакокрасочного покрытия." },
        { q: "Можно ли оставить автомобиль на ночь?", a: "Да, автомобиль хранится в закрытом помещении под охраной." }
      ]
    },

    {
      type: "booking",
      id: "booking",
      eyebrow: "Запись",
      title: "Запись в студию",
      subtitle: "Оставьте заявку — мы перезвоним и подтвердим время.",
      endpoint: "",
      phoneMask: "+375 (__) ___-__-__",
      labels: {
        name: "Имя", phone: "Телефон", car: "Автомобиль", service: "Услуга",
        servicePlaceholder: "Выберите услугу", serviceOther: "Другое / нужна консультация",
        date: "Дата", time: "Время", timeAny: "Любое", comment: "Комментарий"
      },
      carPlaceholder: "Например, Porsche Macan 2021",
      commentPlaceholder: "Пожелания (необязательно)",
      timeSlots: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"],
      closedWeekdays: [],
      maxDaysAhead: 45,
      consentText: "Согласен(на) на обработку персональных данных",
      submitText: "Отправить",
      successTitle: "Заявка отправлена",
      successText: "Мы свяжемся с вами, чтобы подтвердить время визита.",
      perks: [ "Приём строго по записи", "Фотофиксация при приёмке", "Отчёт о работах" ]
    },

    { type: "contacts", id: "contacts", eyebrow: "Контакты", title: "Контакты" }
  ],

  footer: {
    columns: [
      { title: "Услуги", links: "services" },
      { title: "Студия", links: [
        { text: "Цены", href: "#prices" },
        { text: "Процесс", href: "#steps" },
        { text: "Работы", href: "#works" },
        { text: "Отзывы", href: "#reviews" },
        { text: "Вопросы", href: "#faq" }
      ]}
    ],
    legal: [ "ООО «Пример» (демо-реквизиты)", "УНП 000000000", "г. Гомель, ул. Примерная, 3" ],
    copyright: "Чистая линия. Все права защищены.",
    demoNote: "Демонстрационный шаблон сайта. Название, контакты, цены и отзывы вымышлены. Фото: CC0."
  }
};
