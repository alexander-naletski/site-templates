/* =====================================================================
   КОНФИГУРАЦИЯ САЙТА — ВСЕ ТЕКСТЫ, КОНТАКТЫ, МЕНЮ, ЦЕНЫ И БРОНЬ СТОЛОВ.
   ---------------------------------------------------------------------
   • Меняйте только значения в кавычках. Не удаляйте запятые и скобки.
   • Порядок блоков на странице = порядок в массиве `sections`.
     Блок можно скрыть, поставив `hidden: true`.
   • Все данные ниже — ПРИМЕР (демо-наполнение). Название, телефоны,
     адрес, цены, блюда и отзывы вымышлены.
   ===================================================================== */
window.SITE_CONFIG = {
  demo: true,
  currency: "BYN",

  meta: {
    lang: "ru",
    title: "Сезон — ресторан авторской кухни в Минске | Демо-шаблон",
    description: "Ресторан современной белорусской кухни: дегустационные сеты из 5 и 8 подач, винное сопровождение, стол шефа и частные ужины. Бронирование столика онлайн.",
    ogImage: "assets/img/og-image.jpg",
    themeColor: "#ffffff"
  },

  brand: {
    name: "Сезон",
    logo: null,
    logoText: "СЕЗОН",
    logoAccent: "",
    tagline: "Ресторан авторской кухни · Минск"
  },

  /* Шапка: bar, логотип по центру, без телефона (как у часового бренда) */
  header: { variant: "bar", align: "center", phone: false, callback: false, ctaStyle: "outline" },

  contacts: {
    phone: "+375 (29) 000-00-43",
    phoneHref: "+375290000043",
    email: "table@example.com",
    city: "Минск",
    address: "Минск, ул. Примерная, 3",
    addressNote: "Парковка во дворе, дресс-код smart casual (пример)",
    hours: [
      { days: "Вт–Чт", time: "18:00–23:00" },
      { days: "Пт–Сб", time: "18:00–00:00" },
      { days: "Вс", time: "13:00–17:00, ланч" },
      { days: "Пн", time: "выходной" }
    ],
    hoursShort: "Вт–Сб с 18:00, Вс — ланч",
    /* 0 — воскресенье … 6 — суббота; null — выходной */
    schedule: [["13:00", "17:00"], null, ["18:00", "23:00"], ["18:00", "23:00"], ["18:00", "23:00"], ["18:00", "00:00"], ["18:00", "00:00"]],
    mapEmbed: "",
    mapLink: "https://yandex.by/maps/?text=%D0%9C%D0%B8%D0%BD%D1%81%D0%BA",
    socials: [
      { type: "instagram", url: "https://instagram.com/", label: "Instagram" },
      { type: "telegram", url: "https://t.me/", label: "Telegram" }
    ]
  },

  topbar: { links: [], callbackText: "Заказать звонок" },

  nav: [
    { text: "Меню", href: "#menu" },
    { text: "Сеты", href: "#sets" },
    { text: "Вино", href: "#wine" },
    { text: "События", href: "#events" },
    { text: "Контакты", href: "#contacts" }
  ],

  cta: { text: "Бронь", href: "#booking" },
  servicesButton: "Меню",
  mobileBar: { call: "Позвонить" },

  callback: {
    title: "Заказать звонок",
    text: "Оставьте номер — менеджер ресторана перезвонит.",
    button: "Жду звонка",
    success: "Спасибо! Мы скоро перезвоним."
  },

  sections: [
    {
      type: "hero",
      variant: "centered",
      id: "top",
      title: "Осенний сет «Лес и поле»: восемь подач о белорусской осени",
      text: "Грибы, дичь, корнеплоды и ягоды с фермерских хозяйств в радиусе 100 километров.",
      openStatus: true,
      buttons: [
        { text: "Забронировать стол ›", href: "#booking", style: "link" },
        { text: "Смотреть сеты ›", href: "#sets", style: "link" }
      ]
    },

    {
      type: "banner",
      id: "season",
      variant: "full",
      image: "assets/img/hero",
      imageAlt: "Блюдо из овощей и зелени на белой тарелке, повар добавляет последние штрихи",
      title: "Кухня сезона",
      text: "Меню меняется четыре раза в год.",
      buttonText: "Меню",
      buttonHref: "#menu"
    },

    {
      type: "menu",
      id: "menu",
      eyebrow: "Меню à la carte",
      title: "Блюда",
      subtitle: "Порции рассчитаны на одного гостя. Шеф рекомендует 3 блюда на человека.",
      categories: [
        { id: "starters", title: "Закуски", icon: "leaf", items: [
          { title: "Крудо из тунца", text: "Икра тобико, васаби, цитрусовый понзу", weight: "120 г", price: "38", image: "assets/img/d-crudo", imageAlt: "Ломтики сырого тунца с икрой на тарелке" },
          { title: "Сашими сезонной рыбы", text: "Три вида рыбы, дайкон, шисо", weight: "110 г", price: "42", image: "assets/img/d-sashimi", imageAlt: "Сашими на тёмной тарелке" },
          { title: "Террин из лосося", text: "Укроп, хрен, маринованная свёкла", weight: "130 г", price: "34", image: "assets/img/d-terrine", imageAlt: "Террин из лосося с зеленью" },
          { title: "Огород шефа", text: "Молодые овощи, соус из трав, цветы настурции", weight: "150 г", price: "29", image: "assets/img/d-veg", imageAlt: "Вегетарианская закуска на тарелке-треугольнике", tags: ["Вег"] },
          { title: "Креветка в катаифи", text: "Хрустящее тесто, авокадо, юдзу", weight: "90 г", price: "36", image: "assets/img/d-shrimp", imageAlt: "Креветка в тонком тесте на белой тарелке" },
          { title: "Устрицы Fine de Claire", text: "Шалот, красный винный уксус, лимон", weight: "3 шт.", price: "45", image: "assets/img/d-oysters", imageAlt: "Открытые устрицы на льду" }
        ]},
        { id: "mains", title: "Основные", icon: "utensils", items: [
          { title: "Драник с лососем", text: "Картофель, слабосолёный лосось, каперсы, сметана с травами", weight: "220 г", price: "39", image: "assets/img/d-salmon", imageAlt: "Картофельный драник с лососем и каперсами", badge: "Подпись шефа", featured: true },
          { title: "Говяжья щека", text: "Томлёная 12 часов, глазированная морковь, соус из красного вина", weight: "260 г", price: "58", image: "assets/img/d-fish", imageAlt: "Мясо с морковью в глубокой тарелке" },
          { title: "Вырезка, демиглас", text: "Говядина местного фермера, печёная свёкла, пюре из пастернака", weight: "240 г", price: "72", image: "assets/img/d-beef", imageAlt: "Кусок говяжьей вырезки с соусом на голубой тарелке" },
          { title: "Лангустины", text: "Цукини, биск, молодой горошек", weight: "200 г", price: "68", image: "assets/img/d-duck", imageAlt: "Лангустины на овощной подушке" },
          { title: "Тёплые корнеплоды", text: "Морковь, пастернак, топинамбур, ореховый соус", weight: "220 г", price: "32", image: "assets/img/d-salad", imageAlt: "Запечённые корнеплоды на тарелке", tags: ["Веган"] },
          { title: "Форель и цветы", text: "Тартар из форели, огурец, съедобные цветы", weight: "160 г", price: "41", image: "assets/img/d-flowers", imageAlt: "Тартар из рыбы со съедобными цветами" }
        ]},
        { id: "desserts", title: "Десерты и сыры", icon: "cake", items: [
          { title: "Ягодный муссовый торт", text: "Лесные ягоды, белый шоколад, соус из черноплодки", weight: "120 г", price: "24", image: "assets/img/d-berry", imageAlt: "Ягодный десерт с соусом на тёмной тарелке" },
          { title: "Бриошь с ягодами", text: "Карамелизованная бриошь, малина, крем из топлёного молока", weight: "140 г", price: "22", image: "assets/img/d-fruit", imageAlt: "Бриошь с ягодами на голубой тарелке" },
          { title: "Сырная тарелка", text: "Пять сыров белорусских сыроварен, мёд, орехи", weight: "180 г", price: "46", image: "assets/img/d-cheese", imageAlt: "Сыры, оливки и нож на доске" }
        ]}
      ],
      note: "Сервисный сбор не взимается. Меню и цены в BYN — пример.",
      buttonText: "Забронировать стол",
      buttonHref: "#booking",
      buttonStyle: "outline"
    },

    {
      type: "programs",
      id: "sets",
      eyebrow: "Дегустационные сеты",
      title: "Сеты шефа",
      subtitle: "Подаются всему столу. Предупредите об аллергиях при бронировании.",
      groupLabel: "Сеты и события",
      priceLabel: "С гостя",
      buttonText: "Выбрать при брони",
      buttonStyle: "outline",
      items: [
        { id: "set5", title: "«Знакомство» — 5 подач", for: "около 2 часов", items: ["Комплимент и хлеб на закваске", "Две закуски, горячее, десерт", "Безалкогольное сопровождение +45 BYN"], price: "165 BYN", image: "assets/img/p-plating", imageAlt: "Повар выкладывает блюдо на тарелку" },
        { id: "set8", title: "«Лес и поле» — 8 подач", for: "около 3 часов", items: ["Осеннее меню шефа", "Грибы, дичь, корнеплоды", "Винное сопровождение +120 BYN"], price: "245 BYN", badge: "Сезон", featured: true, image: "assets/img/p-chef", imageAlt: "Повар в перчатках готовит блюдо" }
      ]
    },

    {
      type: "statement",
      id: "quote",
      text: "«Мы готовим то, что сегодня растёт вокруг Минска, — и ничего сверх этого.»",
      sub: "Шеф-повар Андрей П. (пример)"
    },

    {
      type: "menu",
      id: "wine",
      variant: "list",
      tabs: false,
      eyebrow: "Винная карта",
      title: "Вино по бокалам",
      subtitle: "Больше 180 позиций в погребе — сомелье поможет выбрать.",
      categories: [
        { title: "Игристое и белое", items: [
          { title: "Crémant de Loire, Франция", text: "шенен блан, брют", weight: "125 мл", price: "22" },
          { title: "Riesling, Мозель", text: "полусухое", weight: "150 мл", price: "24" },
          { title: "Chablis, Бургундия", text: "шардоне", weight: "150 мл", price: "32" },
          { title: "Grüner Veltliner, Австрия", text: "сухое", weight: "150 мл", price: "21" }
        ]},
        { title: "Красное и сладкое", items: [
          { title: "Pinot Noir, Бургундия", text: "лёгкое, вишня и лес", weight: "150 мл", price: "34" },
          { title: "Nebbiolo, Пьемонт", text: "танинное, роза и смола", weight: "150 мл", price: "36" },
          { title: "Сидр ледяной, Беларусь", text: "яблоко, десертный", weight: "75 мл", price: "18", badge: "Местное" },
          { title: "Tokaji Aszú 5 puttonyos", text: "десертное", weight: "75 мл", price: "29" }
        ]}
      ]
    },

    {
      type: "order",
      id: "order",
      eyebrow: "Навынос и сертификаты",
      title: "Ужин шефа — у вас дома",
      text: "По пятницам и субботам готовим сет навынос на двоих: четыре блюда с инструкцией по подаче. Забрать можно с 16:00 или заказать доставку курьером.",
      points: [
        { icon: "bag", text: "Сет на двоих — 190 BYN, заказ до четверга" },
        { icon: "scooter", text: "Доставка по Минску в термобоксе — 15 BYN" },
        { icon: "gift", text: "Подарочные сертификаты от 100 BYN" }
      ],
      buttons: [
        { text: "Заказать по телефону", href: "tel:+375290000043", style: "primary", icon: "phone" },
        { text: "Сертификат", href: "#contacts", style: "outline" }
      ],
      image: "assets/img/p-wine",
      imageAlt: "Бокал белого вина в руке"
    },

    {
      type: "programs",
      id: "events",
      eyebrow: "Частные события",
      title: "Стол шефа и закрытые ужины",
      groupLabel: "Сеты и события",
      priceLabel: "Стоимость",
      buttonText: "Обсудить",
      buttonStyle: "outline",
      items: [
        { id: "chefs", title: "Стол шефа", for: "до 8 гостей, у открытой кухни", items: ["Сет из 10 подач", "Шеф сам подаёт блюда"], price: "от 320 BYN / гость", image: "assets/img/ev-chef", imageAlt: "Шеф выкладывает блюдо" },
        { id: "private", title: "Закрытый зал", for: "до 24 гостей", items: ["Индивидуальное меню", "Свой сомелье на вечер"], price: "от 4 800 BYN", image: "assets/img/ev-private", imageAlt: "Длинный сервированный стол у окна" },
        { id: "wedding", title: "Камерная свадьба", for: "до 60 гостей, ресторан целиком", items: ["Банкетный сет шефа", "Флористика и музыка"], price: "от 280 BYN / гость", image: "assets/img/ev-banquet", imageAlt: "Праздничная сервировка с цветами" },
        { id: "winedinner", title: "Винный ужин", for: "раз в месяц, 30 гостей", items: ["Винодел в гостях", "6 вин и 6 подач"], price: "210 BYN", image: "assets/img/ev-wine", imageAlt: "Бокалы вина на столе в ресторане" }
      ],
      note: "Условия и стоимость — пример."
    },

    {
      type: "about",
      id: "about",
      eyebrow: "О ресторане",
      title: "32 места и открытая кухня",
      text: "«Сезон» — небольшой ресторан в доме 1930-х годов. Зал на 32 гостя, открытая кухня и винный погреб. Мы работаем с 14 фермерскими хозяйствами и сами ферментируем, коптим и печём хлеб.",
      image: "assets/img/p-hall",
      imageAlt: "Светлый зал ресторана с белыми скатертями",
      list: [
        "Меню меняется 4 раза в год",
        "Вегетарианский сет — по запросу",
        "Дресс-код: smart casual"
      ],
      stats: [
        { value: "32", label: "места" },
        { value: "14", label: "фермеров" },
        { value: "180", label: "вин в погребе" }
      ]
    },

    {
      type: "gallery",
      id: "gallery",
      title: "Ресторан",
      lightbox: true,
      items: [
        { title: "Зал вечером", image: "assets/img/g-hall" },
        { title: "Бар", image: "assets/img/g-bar" },
        { title: "Огни зала", image: "assets/img/g-night" },
        { title: "Сервировка", image: "assets/img/g-table" },
        { title: "Детали", image: "assets/img/g-setting" },
        { title: "Шампанское", image: "assets/img/g-glass" },
        { title: "Устрицы", image: "assets/img/g-oysters" },
        { title: "Кухня", image: "assets/img/g-chef" },
        { title: "При свечах", image: "assets/img/g-candle" }
      ]
    },

    {
      type: "reviews",
      id: "reviews",
      title: "Гости о нас",
      subtitle: "4,9 из 5 на основе 210 отзывов (пример)",
      items: [
        { name: "Виктория Л.", car: "Сет «Лес и поле»", rating: 5, date: "сентябрь", text: "Три часа пролетели незаметно. Драник с лососем и десерт из черноплодки — то, ради чего хочется вернуться." },
        { name: "Павел Р.", car: "Стол шефа", rating: 5, date: "август", text: "Отмечали годовщину. Шеф рассказывал о каждом блюде, сомелье идеально подобрал вина." },
        { name: "Анна и Олег", car: "Камерная свадьба", rating: 5, date: "июнь", text: "40 гостей, закрытый ресторан, безупречный сервис. Гости до сих пор вспоминают ужин." },
        { name: "Дмитрий К.", car: "À la carte", rating: 4, date: "май", text: "Отличная кухня и вино. Столы стоят плотновато — просите место у окна." }
      ]
    },

    {
      type: "faq",
      id: "faq",
      title: "Вопросы",
      items: [
        { q: "Нужна ли предоплата при бронировании?", a: "Для столов до 6 гостей — нет. Для дегустационных сетов в пятницу и субботу, а также для компаний от 7 человек — депозит 50%, возвращаем при отмене за 48 часов (пример условий)." },
        { q: "Учтёте ли аллергии и диету?", a: "Да, напишите об этом в комментарии к брони. Готовим вегетарианскую, безглютеновую и безлактозную версии сета." },
        { q: "Можно ли с детьми?", a: "Мы рады детям от 12 лет. Для младших гостей удобнее воскресный ланч." },
        { q: "Есть ли дресс-код?", a: "Smart casual: без спортивной одежды и шорт." }
      ]
    },

    {
      type: "booking",
      id: "booking",
      mode: "table",
      title: "Бронирование",
      subtitle: "Выберите дату, время и число гостей. Можно сразу указать сет — кухня подготовится заранее.",
      endpoint: "",
      phoneMask: "+375 (__) ___-__-__",
      maxDaysAhead: 60,
      leadMinutes: 120,
      groupMax: 8,
      groupMaxText: "Для компании больше 8 гостей выберите «Закрытый зал» или позвоните нам.",
      guestsDefault: 2,
      closedWeekdays: [1],
      timeSlots: ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"],
      slotsByDay: { 0: ["13:00", "13:30", "14:00", "14:30", "15:00"] },
      labels: {
        name: "Ваше имя", phone: "Телефон", service: "Сет или событие",
        servicePlaceholder: "À la carte", date: "Дата", time: "Время", guests: "Гостей",
        comment: "Аллергии и пожелания", timePlaceholder: "Время"
      },
      commentPlaceholder: "Например: без орехов, годовщина",
      consentText: "Согласен(на) на обработку персональных данных",
      submitText: "Отправить запрос",
      successTitle: "Спасибо, запрос получен",
      successText: "Менеджер подтвердит бронь по телефону в течение часа.",
      resetText: "Новая бронь",
      perks: [
        "Подтверждение в течение часа",
        "Депозит только для сетов в Пт–Сб",
        "Бесплатная отмена за 48 часов"
      ]
    },

    { type: "contacts", id: "contacts", title: "Контакты" }
  ],

  footer: {
    columns: [
      { title: "Меню", links: "services" },
      { title: "Ресторан", links: [
        { text: "Сеты шефа", href: "#sets" },
        { text: "Винная карта", href: "#wine" },
        { text: "Навынос и сертификаты", href: "#order" },
        { text: "События", href: "#events" },
        { text: "Бронирование", href: "#booking" }
      ]}
    ],
    legal: [
      "ООО «Примерный ресторан» (демо-реквизиты)",
      "УНП 000000000"
    ],
    copyright: "Сезон. Все права защищены.",
    demoNote: "Демонстрационный шаблон сайта. Название, контакты, блюда, цены и отзывы вымышлены. Фото: CC0 / Public Domain."
  }
};
