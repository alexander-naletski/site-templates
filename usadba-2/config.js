/* =====================================================================
   КОНФИГУРАЦИЯ САЙТА — ВСЕ ТЕКСТЫ, КОНТАКТЫ, ДОМИКИ, ДОП. УСЛУГИ И ЦЕНЫ.
   ---------------------------------------------------------------------
   • Меняйте только значения в кавычках. Не удаляйте запятые и скобки.
   • Порядок блоков на странице = порядок в массиве `sections`.
     Блок можно скрыть, поставив `hidden: true`.
   • Все данные ниже — ПРИМЕР (демо-наполнение). Название, телефоны,
     адрес, координаты, цены и отзывы вымышлены.
   ===================================================================== */
window.SITE_CONFIG = {
  demo: true,
  currency: "BYN",

  meta: {
    lang: "ru",
    title: "Хутор Бор — лесные дома и баня у пущи | Демо-шаблон",
    description: "Хутор в сосновом бору на краю пущи: 6 лесных домов от 2 до 8 гостей, баня на дровах, каноэ, уха на костре, ретриты и выезды команд. Бронирование по датам.",
    ogImage: "assets/img/og-image.jpg",
    themeColor: "#ffffff"
  },

  brand: {
    name: "Хутор Бор",
    logo: null,
    logoText: "хутор бор",
    logoAccent: "",
    tagline: "Лесные дома на краю пущи. С 2009 года (пример)"
  },

  contacts: {
    phone: "+375 (29) 000-00-32",
    phoneHref: "+375290000032",
    email: "les@example.com",
    city: "Воложинский район",
    address: "Минская обл., Воложинский р-н, хутор Бор (пример)",
    addressNote: "Последние 2 км — грунтовка, проедет любая машина",
    hours: [
      { days: "Заезд", time: "с 14:00" },
      { days: "Выезд", time: "до 12:00" },
      { days: "Звонки", time: "09:00–21:00" }
    ],
    hoursShort: "Заезд с 14:00",
    mapEmbed: "",
    mapLink: "https://yandex.by/maps/?text=%D0%92%D0%BE%D0%BB%D0%BE%D0%B6%D0%B8%D0%BD",
    socials: [
      { type: "instagram", url: "https://instagram.com/", label: "Instagram" },
      { type: "telegram", url: "https://t.me/", label: "Telegram" }
    ]
  },

  header: {
    variant: "bar",
    announce: "Будни в ноябре — минус 20% на все дома (пример)",
    announceHref: "#booking",
    phone: false,
    ctaStyle: "primary"
  },

  nav: [
    { text: "Дома", href: "#services" },
    { text: "Баня и лес", href: "#extras" },
    { text: "Ретриты", href: "#events" },
    { text: "Хутор", href: "#about" },
    { text: "Как доехать", href: "#route" }
  ],

  cta: { text: "Бронь", href: "#booking" },
  servicesButton: "Дома",
  mobileBar: { call: "Позвонить" },

  callback: {
    title: "Позвонить вам?",
    text: "Оставьте номер — расскажем о свободных датах и поможем выбрать дом.",
    button: "Жду звонка",
    success: "Спасибо! Перезвоним в течение часа."
  },

  /* ДОМА — карточки, меню и список в форме бронирования.
     guests — основных мест, extraBeds — доп. мест, night — за сутки Вс–Чт, weekend — Пт и Сб. */
  services: [
    { id: "srub", icon: "home", title: "Лесной сруб", text: "Сруб из вековой сосны с печью и верандой. Две спальни, кухня, вид на бор из каждого окна.", guests: 4, extraBeds: 2, beds: "2 спальни", area: "62 м²", amenities: ["Печь", "Веранда", "Кухня"], night: 210, weekend: 250, price: "от 210 BYN", image: "assets/img/stay-srub", imageAlt: "Деревянный сруб в туманном лесу" },
    { id: "lesnik", icon: "tree", title: "Дом лесника", text: "Большой дом для компании: камин, длинный стол на 10 человек, три спальни и своя баня во дворе.", guests: 6, extraBeds: 2, beds: "3 спальни", area: "110 м²", amenities: ["Камин", "Своя баня", "Мангал"], night: 340, weekend: 410, price: "от 340 BYN", badge: "Для компании", image: "assets/img/stay-lesnik", imageAlt: "Освещённый дом в ночном лесу" },
    { id: "hut", icon: "flame", title: "Хижина на опушке", text: "Маленький дом для двоих на сваях: кровать у окна, печь-буржуйка, крыльцо над папоротником.", guests: 2, beds: "Двуспальная кровать", area: "28 м²", amenities: ["Буржуйка", "Крыльцо", "Душ"], night: 150, weekend: 180, price: "от 150 BYN", image: "assets/img/stay-hut", imageAlt: "Маленькая хижина в тёмном лесу, на крыльце гости" },
    { id: "lake", icon: "waves", title: "Дом на озере", text: "Панорамные окна на воду, свой причал и каноэ. Утром — туман над озером прямо с кровати.", guests: 4, extraBeds: 1, beds: "2 спальни", area: "70 м²", amenities: ["Причал", "Каноэ", "Панорамные окна"], night: 260, weekend: 320, price: "от 260 BYN", badge: "Вид на озеро", image: "assets/img/stay-lake", imageAlt: "Дом на берегу озера в утреннем тумане" },
    { id: "winter", icon: "snow", title: "Зимовье", text: "Охотничья избушка в глубине бора. Дровяная печь, солнечные панели и абсолютная тишина.", guests: 2, extraBeds: 2, beds: "Нары на 4 места", area: "36 м²", amenities: ["Дровяная печь", "Без соседей", "Фонари"], night: 140, weekend: 170, price: "от 140 BYN", image: "assets/img/stay-winter", imageAlt: "Избушка со светом в окне среди заснеженных елей" },
    { id: "workshop", icon: "file", title: "Мастерская", text: "Комната для одного или двоих: рабочий стол у окна, книги, чайник. Для тех, кто пишет, рисует и думает.", guests: 2, beds: "Кровать 160 см", area: "24 м²", amenities: ["Рабочий стол", "Wi-Fi", "Библиотека"], night: 110, weekend: 130, price: "от 110 BYN", image: "assets/img/stay-workshop", imageAlt: "Деревянная комната с рабочим столом и курткой на вешалке" }
  ],

  sections: [
    {
      type: "hero",
      variant: "cover",
      id: "top",
      align: "left",
      title: "Жизнь снаружи",
      text: "Лесные дома в сосновом бору на краю пущи. Баня на дровах, костёр, каноэ и тишина, какой в городе не бывает.",
      image: "assets/img/hero",
      imageAlt: "Двое сидят у костра в ночном сосновом лесу",
      buttons: [
        { text: "Выбрать дом", href: "#services", style: "light" }
      ]
    },

    {
      type: "finder",
      id: "dates",
      variant: "bar",
      title: "Свободные даты",
      serviceLabel: "Дом",
      servicePlaceholder: "Любой",
      buttonText: "Проверить",
      buttonStyle: "primary"
    },

    {
      type: "features",
      id: "features",
      title: "Создано для жизни в лесу",
      items: [
        { icon: "home", title: "Дома", text: "6 домов из сосны" },
        { icon: "flame", title: "Баня", text: "На дровах, с купелью" },
        { icon: "waves", title: "Озеро", text: "Каноэ и причал" },
        { icon: "tree", title: "Бор", text: "120 га леса" },
        { icon: "utensils", title: "Кухня", text: "Уха и хлеб из печи" },
        { icon: "paw", title: "С собакой", text: "Можно в 4 домах" },
        { icon: "bike", title: "Тропы", text: "Велосипеды и карты" },
        { icon: "sun", title: "Круглый год", text: "Печи в каждом доме" }
      ]
    },

    {
      type: "stays",
      id: "services",
      title: "Лесные дома",
      subtitle: "Цена за дом за сутки. Бельё, дрова, чай из трав и карта троп — включены.",
      perNight: "за сутки",
      weekendLabel: "Пт–Сб",
      buttonText: "Выбрать даты",
      buttonStyle: "primary",
      note: "Цены — пример. Минимум 2 ночи в выходные и праздники."
    },

    {
      type: "extras",
      id: "extras",
      title: "Опыт хутора",
      subtitle: "Добавьте к брони — посчитаем стоимость в форме.",
      addText: "К брони",
      addedText: "В брони",
      buttonStyle: "outline-light",
      items: [
        { id: "banya", icon: "flame", title: "Баня на дровах", short: "Баня", text: "Парная из липы, купель с родниковой водой, веники из своего леса. 3 часа.", price: "100 BYN", unit: "за 3 часа", cost: 100, image: "assets/img/ex-banya", imageAlt: "Тёплая деревянная парная" },
        { id: "ukha", icon: "fish", title: "Уха на костре", short: "Уха на костре", text: "Ловим рыбу утром, вечером варим уху в котелке с хозяином хутора.", price: "25 BYN", unit: "с гостя", cost: 25, per: "guest", image: "assets/img/ex-ukha", imageAlt: "Котелок над костром на камнях" },
        { id: "canoe", icon: "waves", title: "Каноэ на рассвете", short: "Каноэ", text: "Два часа по озеру и протокам, пока всё в тумане. Каноэ, вёсла, жилеты.", price: "35 BYN", unit: "за каноэ", cost: 35, image: "assets/img/ex-canoe", imageAlt: "Двое в каноэ на спокойной воде" },
        { id: "fire", icon: "sun", title: "Костёр на берегу", short: "Костёр", text: "Место у воды, дрова, пледы и чайник. Истории о пуще — по желанию.", price: "20 BYN", unit: "за вечер", cost: 20, image: "assets/img/ex-fire", imageAlt: "Мужчина раскладывает костёр на берегу озера" }
      ]
    },

    {
      type: "banner",
      id: "about",
      variant: "full",
      eyebrow: "О хуторе",
      title: "Мы не строили отель. Мы оставили лес лесом",
      text: "Хутор основан в 2009 году (пример): шесть домов стоят далеко друг от друга, между ними — только сосны, мох и тропы. Электричество — есть, шум — нет.",
      image: "assets/img/banner",
      imageAlt: "Ряд елей в тумане",
      buttonText: "Как доехать",
      buttonHref: "#route"
    },

    {
      type: "programs",
      id: "events",
      title: "Ретриты и выезды",
      subtitle: "Хутор можно арендовать целиком — до 30 гостей.",
      groupLabel: "Выезды и ретриты",
      priceLabel: "Хутор целиком",
      buttonText: "Обсудить",
      buttonStyle: "outline",
      items: [
        { id: "retreat", title: "Ретрит и йога", for: "10–30 участников, 2–4 дня", items: ["Зал для практик 80 м²", "Вегетарианское меню", "Баня и тропы"], price: "от 1 400 BYN / сутки", image: "assets/img/ev-retreat", imageAlt: "Палатки и костёр в лесу" },
        { id: "team", title: "Выезд команды", for: "8–30 человек", items: ["Стратегическая сессия в тишине", "Каноэ, ориентирование, костёр", "Проживание во всех домах"], price: "от 1 600 BYN / сутки", image: "assets/img/ev-team", imageAlt: "Силуэты людей на закате у воды" },
        { id: "newyear", title: "Новый год на хуторе", for: "Для семьи или компании, 3–5 ночей", items: ["Ёлка в лесу, а не в торговом центре", "Баня 31-го и 1-го", "Праздничный ужин из печи"], price: "от 1 200 BYN / дом", image: "assets/img/ev-newyear", imageAlt: "Заснеженная избушка" }
      ]
    },

    {
      type: "statement",
      id: "manifest",
      text: "Лес — это не фон для отдыха.",
      muted: "Это и есть отдых.",
      buttonText: "Смотреть дома",
      buttonHref: "#services",
      buttonStyle: "primary"
    },

    {
      type: "gallery",
      id: "gallery",
      title: "Хутор в кадре",
      lightbox: true,
      items: [
        { title: "Вечерний костёр", image: "assets/img/g-fire" },
        { title: "Дрова на зиму", image: "assets/img/g-wood" },
        { title: "Туман в бору", image: "assets/img/g-fog" },
        { title: "Тропа к озеру", image: "assets/img/g-path" },
        { title: "Черника в июле", image: "assets/img/g-berries" },
        { title: "Грибы в сентябре", image: "assets/img/g-mushrooms" },
        { title: "Река в тумане", image: "assets/img/g-river" },
        { title: "Лагерь у огня", image: "assets/img/g-camp" }
      ]
    },

    {
      type: "reviews",
      id: "reviews",
      variant: "grid",
      title: "Гости о хуторе",
      items: [
        { name: "Павел Р.", car: "Дом на озере", rating: 5, date: "октябрь", text: "Проснулись — за окном туман над водой. Взяли каноэ до завтрака. Лучшие выходные за год." },
        { name: "Анна С.", car: "Хижина на опушке", rating: 5, date: "январь", text: "Печка, снег, тишина. Телефон не ловит у кровати — и это прекрасно. Баня на дровах — отдельная любовь." },
        { name: "Команда студии «Пример»", car: "Выезд команды, 18 человек", rating: 5, date: "май", text: "Два дня стратегии в зале с видом на лес и вечер ухи у костра. Вернулись с планом на год и без усталости." }
      ]
    },

    {
      type: "faq",
      id: "faq",
      title: "Вопросы",
      subtitle: "Не нашли ответ? Позвоните — хозяин хутора на связи с 9 до 21.",
      items: [
        { q: "Есть ли связь и Wi-Fi?", a: "Мобильная связь — на большей части территории. Wi-Fi — в Мастерской, Доме лесника и в зале. В Зимовье связи почти нет — это его главная особенность." },
        { q: "Как устроена предоплата?", a: "30% после подтверждения дат, остальное — при заезде. Отмена за 14 дней — возвращаем всё, позже — переносим даты." },
        { q: "Можно с собакой?", a: "Да, в Лесном срубе, Доме лесника, Хижине и Зимовье. Доплата 15 BYN, просим не отпускать собаку без поводка в лесу." },
        { q: "Нужно ли брать продукты?", a: "Кухни есть во всех домах, кроме Мастерской. Хлеб, молоко, яйца и рыбу можно купить на хуторе. Ближайший магазин — 7 км." },
        { q: "Проедет ли обычная машина?", a: "Да. Последние 2 км — укатанная грунтовка, зимой её чистим. После сильного снегопада встретим на снегоходе." }
      ]
    },

    {
      type: "booking",
      id: "booking",
      mode: "stay",
      title: "Бронирование",
      subtitle: "Выберите дом и даты. Мы проверим наличие и перезвоним — обычно в течение часа.",
      endpoint: "",
      phoneMask: "+375 (__) ___-__-__",
      minNights: 1,
      maxNights: 14,
      maxDaysAhead: 240,
      groupMax: 30,
      labels: {
        service: "Дом или выезд", servicePlaceholder: "Выберите дом", serviceOther: "Посоветуйте",
        date: "Заезд", dateout: "Выезд", adults: "Взрослые", kids: "Дети", extras: "Добавить", comment: "Комментарий"
      },
      estimateNote: "Расчёт предварительный. Предоплата — 30%.",
      commentPlaceholder: "Например: приедем с собакой, нужна детская кроватка",
      consentText: "Согласен(на) на обработку персональных данных",
      submitText: "Отправить заявку",
      successTitle: "Заявка у нас",
      successText: "Проверим даты и перезвоним. Если дом занят — предложим другой или соседние даты.",
      perks: ["Перезвоним в течение часа", "Предоплата 30%", "Отмена за 14 дней — бесплатно"]
    },

    {
      type: "route",
      id: "route",
      title: "Как доехать",
      distance: "72 км",
      distanceNote: "от Минска · около 1 ч 10 мин",
      coords: "53.9260, 26.6430",
      links: [
        { text: "Яндекс Навигатор", href: "https://yandex.by/maps/?pt=26.643,53.926&z=13&l=map", icon: "navigation" },
        { text: "Google Карты", href: "https://maps.google.com/?q=53.926,26.643", icon: "pin" }
      ],
      items: [
        { icon: "car", title: "На машине", meta: "1 ч 10 мин", text: "По трассе М6 в сторону Воложина, после деревни Примерная — поворот на указатель «Хутор Бор», 2 км по грунтовке." },
        { icon: "train", title: "На электричке", meta: "1 ч 30 мин", text: "С вокзала Минска до станции Олехновичи, оттуда встретим (20 минут, 25 BYN за машину)." },
        { icon: "bike", title: "На велосипеде", meta: "для смелых", text: "Веломаршрут через пущу — 38 км от Воложина. Схему пришлём после бронирования." }
      ],
      note: "Координаты и маршрут — пример."
    },

    { type: "contacts", id: "contacts", title: "Контакты" }
  ],

  footer: {
    columns: [
      { title: "Дома", links: "services" },
      { title: "Хутор", links: [
        { text: "Баня и лес", href: "#extras" },
        { text: "Ретриты", href: "#events" },
        { text: "Галерея", href: "#gallery" },
        { text: "Вопросы", href: "#faq" },
        { text: "Как доехать", href: "#route" }
      ]}
    ],
    legal: ["ИП Примеров П. П. (демо-реквизиты)", "УНП 000000000", "Агроэкоусадьба, свидетельство № 000 (пример)"],
    copyright: "Хутор Бор.",
    demoNote: "Демонстрационный шаблон сайта. Название, контакты, координаты, цены и отзывы вымышлены. Фото: CC0 / Public Domain."
  }
};
