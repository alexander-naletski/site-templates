/* =====================================================================
   КОНФИГУРАЦИЯ САЙТА «Питлейн» (шаблон СТО №4, стиль спортивного бренда)
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
    title: "Питлейн — быстрый автосервис в Бресте | Демо-шаблон",
    description: "Шиномонтаж, ТО, тормоза, подвеска и диагностика в ритме пит-стопа: запись онлайн, работа при вас, выдача точно в срок.",
    ogImage: "assets/img/og-image.jpg",
    themeColor: "#ffffff"
  },

  brand: {
    name: "Питлейн",
    logo: null,
    logoText: "ПИТЛЕЙН",
    logoAccent: "",
    tagline: "Автосервис в ритме пит-стопа"
  },

  /* Шапка: однострочная, кнопка-«таблетка» чёрного цвета */
  header: { variant: "bar", ctaStyle: "primary", callback: false },

  contacts: {
    phone: "+375 (29) 000-00-04",
    phoneHref: "+375290000004",
    phone2: "",
    email: "pit@example.com",
    city: "Брест",
    address: "г. Брест, ул. Примерная, 44",
    addressNote: "Заезд с улицы, 8 постов, зона ожидания с кофе (пример)",
    hours: [
      { days: "Пн–Сб", time: "08:00–22:00" },
      { days: "Вс", time: "09:00–20:00" }
    ],
    hoursShort: "Ежедневно, 08:00–22:00",
    mapEmbed: "",
    mapLink: "https://yandex.by/maps/?text=%D0%91%D1%80%D0%B5%D1%81%D1%82",
    socials: [
      { type: "instagram", url: "https://instagram.com/", label: "Instagram" },
      { type: "telegram", url: "https://t.me/", label: "Telegram" },
      { type: "vk", url: "https://vk.com/", label: "VK" }
    ]
  },

  topbar: { links: [], callbackText: "Заказать звонок" },

  nav: [
    { text: "Услуги", href: "#services" },
    { text: "Цены", href: "#prices" },
    { text: "О нас", href: "#about" },
    { text: "Работы", href: "#works" },
    { text: "Отзывы", href: "#reviews" },
    { text: "Контакты", href: "#contacts" }
  ],
  navRight: [ { text: "Онлайн-запись", href: "#booking" } ],

  cta: { text: "Записаться", href: "#booking" },
  servicesButton: "Услуги",
  mobileBar: { call: "Позвонить" },

  callback: {
    title: "Заказать звонок",
    text: "Оставьте номер — перезвоним за 5 минут.",
    button: "Перезвоните мне",
    success: "Принято! Уже набираем."
  },

  /* УСЛУГИ. image — фото плитки (соотношение 4:5) */
  services: [
    { id: "tires", icon: "tire", image: "assets/img/svc-tires", title: "Шиномонтаж", text: "Переобувка за 25 минут, балансировка, хранение.", price: "от 40 BYN", time: "25 мин" },
    { id: "maintenance", icon: "oil", image: "assets/img/svc-oil", title: "Экспресс-ТО", text: "Масло, фильтры, жидкости — пока вы пьёте кофе.", price: "от 55 BYN", time: "40 мин" },
    { id: "brakes", icon: "brakes", image: "assets/img/svc-brakes", title: "Тормоза", text: "Колодки, диски, суппорты, прокачка.", price: "от 35 BYN", time: "от 40 мин" },
    { id: "suspension", icon: "suspension", image: "assets/img/svc-suspension", title: "Подвеска", text: "Диагностика и ремонт ходовой, развал-схождение.", price: "от 45 BYN", time: "от 1 часа" },
    { id: "diagnostics", icon: "diagnostics", image: "assets/img/svc-diagnostics", title: "Диагностика", text: "Компьютерная проверка всех систем.", price: "от 40 BYN", time: "30 мин" },
    { id: "engine", icon: "engine", image: "assets/img/svc-engine", title: "Двигатель", text: "От замены свечей до капремонта.", price: "от 90 BYN", time: "от 2 часов" },
    { id: "electrics", icon: "electrics", image: "assets/img/svc-electrics", title: "Электрика", text: "АКБ, стартеры, генераторы, свет.", price: "от 30 BYN", time: "от 30 мин" },
    { id: "body", icon: "body", image: "assets/img/svc-body", title: "Кузов", text: "Локальный ремонт и полировка.", price: "от 150 BYN", time: "от 1 дня" }
  ],

  sections: [
    {
      type: "hero",
      variant: "cover",
      align: "left",
      id: "top",
      image: "assets/img/hero-burnout",
      imageAlt: "Спортивный автомобиль в облаке дыма от шин",
      title: "Сервис на скорости пит-стопа",
      text: "Шиномонтаж, ТО и ремонт по точному графику. Записался — приехал — уехал.",
      buttons: [
        { text: "Записаться", href: "#booking", style: "light" },
        { text: "Все услуги", href: "#services", style: "outline-light" }
      ]
    },

    {
      type: "marquee",
      label: "Ключевые преимущества",
      items: ["Шиномонтаж за 25 минут", "Запись онлайн 24/7", "8 постов", "Работаем до 22:00", "Гарантия 12 месяцев", "Кофе, пока ждёте"]
    },

    {
      type: "services",
      variant: "tiles",
      id: "services",
      title: "Выбери свою услугу",
      subtitle: "Нажми на плитку — услуга сразу подставится в форму записи."
    },

    {
      type: "features",
      id: "features",
      eyebrow: "Почему Питлейн",
      title: "Скорость без компромиссов",
      items: [
        { icon: "clock", title: "Точно в срок", text: "Называем время выдачи заранее и укладываемся в него." },
        { icon: "users", title: "Работа при вас", text: "Смотрите процесс из зоны ожидания через стекло." },
        { icon: "receipt", title: "Цена до старта", text: "Фиксируем смету до начала работ." },
        { icon: "shield", title: "Гарантия 12 месяцев", text: "На работы и запчасти из нашего склада." }
      ]
    },

    {
      type: "banner",
      variant: "full",
      align: "left",
      id: "track",
      image: "assets/img/banner-drift",
      imageAlt: "Автомобиль в управляемом заносе на треке",
      eyebrow: "Сезонная переобувка",
      title: "Готов к любой трассе",
      text: "Запишитесь на шиномонтаж заранее — без очередей даже в пик сезона.",
      buttonText: "Записаться на шиномонтаж",
      buttonHref: "#booking",
      buttonStyle: "light"
    },

    {
      type: "about",
      id: "about",
      eyebrow: "О нас",
      title: "Команда, которая работает как пит-стоп",
      text: "Питлейн — это 8 постов, склад расходников на 2000 позиций и мастера, которые знают свою часть работы до секунды. Поэтому мы быстрые — и при этом аккуратные.",
      image: "assets/img/about-lift",
      imageAlt: "Автомобиль на подъёмнике в сервисе",
      stats: [
        { value: "25", suffix: "мин", label: "шиномонтаж" },
        { value: "8", suffix: "", label: "постов" },
        { value: "40 000", suffix: "+", label: "автомобилей" },
        { value: "12", suffix: "мес", label: "гарантия" }
      ],
      list: [
        "Расходники в наличии — не ждём поставку",
        "Каждый мастер отвечает за свой этап",
        "Контроль качества перед выдачей"
      ]
    },

    {
      type: "prices",
      id: "prices",
      eyebrow: "Цены",
      title: "Прайс без мелкого шрифта",
      subtitle: "Базовая стоимость работ. Точную цену назовём до начала работ.",
      note: "Цены в белорусских рублях, пример. Запчасти оплачиваются отдельно.",
      categories: [
        { name: "Шины", rows: [
          ["Шиномонтаж R13–R16 (4 колеса)", "40 BYN"],
          ["Шиномонтаж R17–R20 (4 колеса)", "60 BYN"],
          ["Балансировка колеса", "от 7 BYN"],
          ["Сезонное хранение", "60 BYN"]
        ]},
        { name: "ТО", rows: [
          ["Замена масла и фильтра", "25 BYN"],
          ["Экспресс-ТО (масло + 3 фильтра)", "55 BYN"],
          ["Замена свечей", "от 25 BYN"],
          ["Замена антифриза", "от 40 BYN"]
        ]},
        { name: "Тормоза", rows: [
          ["Замена колодок (ось)", "35 BYN"],
          ["Замена дисков и колодок (ось)", "от 70 BYN"],
          ["Замена тормозной жидкости", "35 BYN"],
          ["Обслуживание суппортов", "от 50 BYN"]
        ]},
        { name: "Подвеска", rows: [
          ["Диагностика подвески", "25 BYN"],
          ["Развал-схождение", "45 BYN"],
          ["Замена амортизатора", "от 40 BYN"],
          ["Замена стойки стабилизатора", "от 20 BYN"]
        ]}
      ],
      buttonText: "Записаться"
    },

    {
      type: "steps",
      id: "steps",
      eyebrow: "Как это работает",
      title: "Четыре шага до финиша",
      items: [
        { title: "Запись", text: "Онлайн за минуту — выберите услугу и время." },
        { title: "Заезд", text: "Приезжаете к назначенному времени — пост уже свободен." },
        { title: "Работа", text: "Мастера работают по чек-листу, вы — в зоне ожидания." },
        { title: "Финиш", text: "Контроль качества, оплата и выдача точно в срок." }
      ]
    },

    {
      type: "gallery",
      id: "works",
      eyebrow: "Работы",
      title: "До и после",
      subtitle: "Потяни ползунок, чтобы сравнить.",
      note: "Изображения «до» — иллюстрация для демо-шаблона.",
      items: [
        { title: "Фары", text: "Полировка и защита.", before: "assets/img/ba-headlight-before", after: "assets/img/ba-headlight-after" },
        { title: "Диски", text: "Очистка и полировка.", before: "assets/img/ba-rim-before", after: "assets/img/ba-rim-after" },
        { title: "Моторный отсек", text: "Мойка и консервация.", before: "assets/img/ba-engine-before", after: "assets/img/ba-engine-after" }
      ]
    },

    {
      type: "reviews",
      id: "reviews",
      eyebrow: "Отзывы",
      title: "Говорят клиенты",
      items: [
        { name: "Никита Б.", car: "VW Golf GTI", rating: 5, date: "сентябрь 2026", text: "Переобулся за 25 минут, как и обещали. Даже кофе допить не успел." },
        { name: "Алина М.", car: "Toyota C-HR", rating: 5, date: "сентябрь 2026", text: "Записалась в 21:00 на утро — всё чётко, без очереди. Понравилось, что видно, как работают." },
        { name: "Роман С.", car: "Subaru WRX", rating: 5, date: "август 2026", text: "Поменяли колодки и диски, сразу сказали точную цену. Тормоза как новые." },
        { name: "Вадим Л.", car: "Kia Rio", rating: 4, date: "июль 2026", text: "Быстро и недорого. В субботу было много народу, но по записи приняли вовремя." },
        { name: "Катерина Ж.", car: "Mazda 3", rating: 5, date: "июль 2026", text: "Экспресс-ТО за 40 минут. Дали чек-лист, что проверили. Приеду ещё." }
      ]
    },

    {
      type: "faq",
      id: "faq",
      eyebrow: "FAQ",
      title: "Вопросы",
      subtitle: "Не нашли ответ? Позвоните — ответим сразу.",
      items: [
        { q: "Можно ли приехать без записи?", a: "Можно, если есть свободный пост. Но по записи — гарантированно без ожидания." },
        { q: "Сколько длится шиномонтаж?", a: "Около 25 минут на 4 колеса с балансировкой." },
        { q: "Есть ли зона ожидания?", a: "Да: кофе, Wi-Fi и окно в рабочую зону." },
        { q: "Какая гарантия?", a: "12 месяцев на работы и запчасти, купленные у нас." },
        { q: "Как оплатить?", a: "Картой, наличными, онлайн. Для компаний — по счёту." }
      ]
    },

    {
      type: "booking",
      id: "booking",
      eyebrow: "Запись",
      title: "Займи свой слот",
      subtitle: "Выберите услугу и время — подтвердим в течение 5 минут.",
      endpoint: "",
      phoneMask: "+375 (__) ___-__-__",
      labels: {
        name: "Имя", phone: "Телефон", car: "Автомобиль", service: "Услуга",
        servicePlaceholder: "Выберите услугу", serviceOther: "Другое / нужна консультация",
        date: "Дата", time: "Время", timeAny: "Любое", comment: "Комментарий"
      },
      carPlaceholder: "Например, VW Golf 2019",
      commentPlaceholder: "Размер шин, пожелания (необязательно)",
      timeSlots: ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"],
      closedWeekdays: [],
      maxDaysAhead: 30,
      consentText: "Согласен(на) на обработку персональных данных",
      submitText: "Записаться",
      successTitle: "Слот забронирован",
      successText: "Мы подтвердим запись звонком или сообщением в течение 5 минут.",
      perks: [ "Подтверждение за 5 минут", "Без очереди по записи", "Цена до начала работ" ]
    },

    { type: "contacts", id: "contacts", eyebrow: "Контакты", title: "Где нас найти" }
  ],

  footer: {
    columns: [
      { title: "Услуги", links: "services" },
      { title: "Клиентам", links: [
        { text: "Цены", href: "#prices" },
        { text: "Как это работает", href: "#steps" },
        { text: "Работы", href: "#works" },
        { text: "Отзывы", href: "#reviews" },
        { text: "Вопросы", href: "#faq" }
      ]}
    ],
    legal: [ "ООО «Пример» (демо-реквизиты)", "УНП 000000000", "г. Брест, ул. Примерная, 44" ],
    copyright: "Питлейн. Все права защищены.",
    demoNote: "Демонстрационный шаблон сайта. Название, контакты, цены и отзывы вымышлены. Фото: CC0.",
    bigText: "ПИТЛЕЙН"
  }
};
