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
    title: "Печь 900 — неаполитанская пицца и стрит-фуд в Бресте | Демо-шаблон",
    description: "Пицца из дровяной печи за 90 секунд, бургеры, тако и крафтовое пиво. Доставка по Бресту за 40 минут, самовывоз, дни рождения и фудтрак на ваш праздник.",
    ogImage: "assets/img/og-image.jpg",
    themeColor: "#111111"
  },

  brand: {
    name: "Печь 900",
    logo: null,
    logoText: "ПЕЧЬ",
    logoAccent: "900",
    tagline: "Пицца и стрит-фуд · Брест"
  },

  /* Шапка: чёрная плашка во всю ширину контейнера (как у игровой студии) */
  header: { variant: "bar", phone: true, callback: false, ctaStyle: "primary", announce: "Доставка по Бресту бесплатно от 40 BYN · каждый день до 23:00", announceHref: "#order" },

  contacts: {
    phone: "+375 (29) 000-09-00",
    phoneHref: "+375290000900",
    email: "pizza@example.com",
    city: "Брест",
    address: "Брест, ул. Примерная, 90",
    addressNote: "Вход с улицы, летняя веранда (пример)",
    hours: [
      { days: "Вс–Чт", time: "11:00–23:00" },
      { days: "Пт–Сб", time: "11:00–02:00" }
    ],
    hoursShort: "Ежедневно с 11:00",
    schedule: [["11:00", "23:00"], ["11:00", "23:00"], ["11:00", "23:00"], ["11:00", "23:00"], ["11:00", "23:00"], ["11:00", "02:00"], ["11:00", "02:00"]],
    mapEmbed: "",
    mapLink: "https://yandex.by/maps/?text=%D0%91%D1%80%D0%B5%D1%81%D1%82",
    socials: [
      { type: "instagram", url: "https://instagram.com/", label: "Instagram" },
      { type: "telegram", url: "https://t.me/", label: "Telegram" },
      { type: "viber", url: "viber://chat?number=%2B375290000900", label: "Viber" }
    ]
  },

  topbar: { links: [], callbackText: "Заказать звонок" },

  nav: [
    { text: "Меню", href: "#menu" },
    { text: "Доставка", href: "#order" },
    { text: "Праздники", href: "#events" },
    { text: "О нас", href: "#about" },
    { text: "Контакты", href: "#contacts" }
  ],

  cta: { text: "Заказать", href: "#order" },
  servicesButton: "Меню",
  mobileBar: { call: "Позвонить" },

  callback: {
    title: "Заказать звонок",
    text: "Перезвоним за 5 минут и примем заказ.",
    button: "Перезвоните мне",
    success: "Спасибо! Сейчас перезвоним."
  },

  sections: [
    {
      type: "hero",
      variant: "collage",
      layout: "center",
      id: "top",
      title: "ПЕЧЬ 900",
      text: "Неаполитанская пицца из дровяной печи за 90 секунд, бургеры, тако и холодное пиво. Готовим при вас, привозим горячей.",
      openStatus: true,
      buttons: [
        { text: "Заказать доставку", href: "#order", style: "primary" },
        { text: "Меню", href: "#menu", style: "ghost" }
      ],
      images: [
        { image: "assets/img/hero-l", alt: "Пиццайоло у кирпичной дровяной печи" },
        { image: "assets/img/hero-r", alt: "Кусок пиццы с тянущимся сыром" }
      ]
    },

    {
      type: "gallery",
      id: "what",
      variant: "cards",
      title: "Что у нас",
      lightbox: false,
      items: [
        { title: "Пицца 900 °C", text: "Тесто 48 часов, печь на буковых дровах", image: "assets/img/c-pizza", href: "#menu" },
        { title: "Стрит-фуд", text: "Бургеры, тако, хот-доги и паэлья по пятницам", image: "assets/img/c-street", href: "#menu" },
        { title: "Самовывоз за 15 минут", text: "Закажите заранее — заберёте из печи", image: "assets/img/c-oven", href: "#order" },
        { title: "Праздники", text: "Дни рождения, корпоративы, фудтрак", image: "assets/img/c-party", href: "#events" }
      ]
    },

    {
      type: "menu",
      id: "menu",
      eyebrow: "Меню",
      title: "Выбирай и заказывай",
      subtitle: "Пицца 32 см на неаполитанском тесте. Любую пиццу можно сделать 40 см — +8 BYN.",
      categories: [
        { id: "pizza", title: "Пицца", icon: "pizza", items: [
          { title: "Маргарита", text: "Томаты San Marzano, моцарелла фиор ди латте, базилик", weight: "32 см", price: "16,90", image: "assets/img/d-margo", imageAlt: "Пицца маргарита с базиликом", tags: ["Вег"], badge: "Классика" },
          { title: "Пепперони", text: "Острая салями пепперони, моцарелла, томатный соус", weight: "32 см", price: "21,90", image: "assets/img/d-pepperoni", imageAlt: "Пицца пепперони крупным планом", tags: ["Хит"] },
          { title: "Прошутто и руккола", text: "Вяленая ветчина, руккола, пармезан, черри", weight: "32 см", price: "24,90", image: "assets/img/d-rucola", imageAlt: "Пицца с рукколой на деревянной доске" },
          { title: "Четыре сыра с кукурузой", text: "Моцарелла, горгонзола, пармезан, чеддер, сладкая кукуруза", weight: "32 см", price: "22,90", image: "assets/img/d-4cheese", imageAlt: "Сырная пицца с кукурузой" },
          { title: "Салями и грибы", text: "Салями, шампиньоны, красный лук, орегано", weight: "32 см", price: "21,50", image: "assets/img/d-mushroom", imageAlt: "Пицца с салями, грибами и луком" },
          { title: "Диабло", text: "Пепперони, маслины, халапеньо, чили-мёд", weight: "32 см", price: "22,50", image: "assets/img/d-ham", imageAlt: "Пицца с пепперони и маслинами", tags: ["Острое"] },
          { title: "Овощная", text: "Томаты, цукини, огурец, моцарелла, песто", weight: "32 см", price: "18,90", image: "assets/img/d-veggie", imageAlt: "Пицца с томатами и овощами", tags: ["Вег"] },
          { title: "Сырная с чесноком", text: "Моцарелла, чесночное масло, петрушка", weight: "32 см", price: "15,90", image: "assets/img/d-cheese", imageAlt: "Сырная пицца на белой тарелке" },
          { title: "Острая XL в коробке", text: "Пепперони, халапеньо, лук — 40 см на компанию", weight: "40 см", price: "32,90", image: "assets/img/d-big", imageAlt: "Большая пицца с пепперони и перцем в коробке", badge: "Для компании", featured: true },
          { title: "Слайс со шпинатом", text: "Кусок 1/4 пиццы 45 см — на бегу", weight: "1 кусок", price: "6,50", image: "assets/img/d-slice", imageAlt: "Кусок пиццы со шпинатом на тарелке" }
        ]},
        { id: "street", title: "Стрит-фуд", icon: "burger", items: [
          { title: "Смэш-бургер", text: "Две котлеты, чеддер, маринованный лук, фирменный соус", weight: "320 г", price: "17,90", image: "assets/img/d-burger", imageAlt: "Бургер с красным луком на тарелке", tags: ["Хит"] },
          { title: "Чизбургер BBQ", text: "Говядина, бекон, соус барбекю, картофель по-деревенски", weight: "380 г", price: "19,90", image: "assets/img/d-bbq", imageAlt: "Бургер с беконом и картофелем" },
          { title: "Классик", text: "Говядина, томаты, салат, соус тартар", weight: "300 г", price: "15,90", image: "assets/img/d-classic", imageAlt: "Бургер с томатом на деревянной доске" },
          { title: "Тако с говядиной", text: "Две кукурузные тортильи, говядина, салат, сальса", weight: "2 шт.", price: "13,90", image: "assets/img/d-tacos", imageAlt: "Тако с говядиной и салатом" },
          { title: "Тако с курицей", text: "Три тортильи, курица, фета, томаты, кукуруза", weight: "3 шт.", price: "15,50", image: "assets/img/d-tacos2", imageAlt: "Тако с курицей и сыром" },
          { title: "Хот-дог «Брест»", text: "Колбаска гриль, горчица, хрустящий лук", weight: "220 г", price: "8,90", image: "assets/img/d-hotdog", imageAlt: "Хот-доги с горчицей" },
          { title: "Кукуруза гриль", text: "Сливочное масло, копчёная паприка", weight: "1 шт.", price: "5,50", image: "assets/img/d-corn", imageAlt: "Кукуруза на гриле на палочках", tags: ["Вег"] },
          { title: "Картофель фри", text: "С кетчупом или сырным соусом", weight: "180 г", price: "5,90", image: "assets/img/d-fries", imageAlt: "Картофель фри с кетчупом" }
        ]},
        { id: "drinks", title: "Напитки", icon: "cup", items: [
          { title: "Крафтовый эль", text: "Брестская пивоварня, 5%", weight: "0,5 л", price: "7,50", image: "assets/img/d-beer", imageAlt: "Бокал янтарного пива на столе" },
          { title: "Лагер", text: "Светлое фильтрованное, 4,7%", weight: "0,5 л", price: "6,50", image: "assets/img/d-lager", imageAlt: "Кружка светлого пива" },
          { title: "Клубничный лимонад", text: "Клубника, лайм, содовая", weight: "0,4 л", price: "5,90", image: "assets/img/d-lemonade", imageAlt: "Клубничный лимонад со льдом" },
          { title: "Лимонад с мятой", text: "Лимон, мята, тростниковый сироп", weight: "0,4 л", price: "5,50", image: "assets/img/d-lemonade2", imageAlt: "Лимонад с лимоном и мятой" }
        ]}
      ],
      note: "Цены в BYN — пример. Аллергены — у кассира.",
      buttonText: "Заказать доставку",
      buttonHref: "#order"
    },

    {
      type: "order",
      id: "order",
      eyebrow: "Доставка и самовывоз",
      title: "Горячая пицца за 40 минут",
      text: "Привозим по всему Бресту в термосумках. Самовывоз — скидка 10%, заказ будет готов через 15 минут.",
      points: [
        { icon: "scooter", text: "Доставка бесплатно от 40 BYN, иначе 4 BYN" },
        { icon: "bag", text: "Самовывоз −10% — просто назовите имя" },
        { icon: "clock", text: "Пт–Сб доставляем до 02:00" }
      ],
      buttons: [
        { text: "Заказать в Telegram", href: "https://t.me/", style: "primary", icon: "telegram" },
        { text: "+375 (29) 000-09-00", href: "tel:+375290000900", style: "outline", icon: "phone" }
      ],
      note: "Кнопки — пример: подставьте ссылку на свой бот или сервис доставки.",
      image: "assets/img/order",
      imageAlt: "Пицца с томатами и сыром в коробке"
    },

    {
      type: "programs",
      id: "events",
      eyebrow: "Праздники",
      title: "Устроим вечеринку",
      subtitle: "Зал на 40 гостей, фудтрак на выезд и мастер-классы для детей.",
      groupLabel: "Праздники",
      priceLabel: "Стоимость",
      buttonText: "Забронировать",
      items: [
        { id: "birthday", title: "День рождения", for: "10–40 гостей, зал или веранда", items: ["Пицца-сет и лимонады", "Торт от партнёров", "Колонка и плейлист"], price: "от 35 BYN / гость", image: "assets/img/ev-party", imageAlt: "Компания за столиками на летней веранде", badge: "Популярно" },
        { id: "kids", title: "Мастер-класс для детей", for: "6–12 лет, до 12 детей", items: ["Своя пицца в печи", "Колпак и фартук в подарок"], price: "29 BYN / ребёнок", image: "assets/img/ev-kids", imageAlt: "Руки посыпают пиццу сыром" },
        { id: "truck", title: "Фудтрак на праздник", for: "от 50 гостей, по Брестской области", items: ["Пицца и бургеры на месте", "Свой генератор и повара"], price: "от 1 200 BYN", image: "assets/img/ev-truck", imageAlt: "Розовый фудтрак у леса" }
      ],
      note: "Цены и условия — пример."
    },

    {
      type: "about",
      id: "about",
      eyebrow: "О нас",
      title: "900 градусов и 90 секунд",
      text: "Печь из вулканического камня сделали под Неаполем и привезли в Брест. Тесто ферментируется 48 часов, моцарелла — от фермы под Пружанами. Пицца готовится 90 секунд, бургеры жарим на чугуне прямо у окна.",
      image: "assets/img/about",
      imageAlt: "Пиццайоло отправляет пиццу в печь",
      list: [
        "Тесто 48 часов, мука типа 00",
        "Буковые дрова, 900 °C",
        "Веганский сыр — по запросу"
      ],
      stats: [
        { value: "90", suffix: " сек", label: "выпекается пицца" },
        { value: "40", suffix: " мин", label: "доставка по городу" },
        { value: "1200", label: "пицц в неделю" }
      ]
    },

    {
      type: "gallery",
      id: "gallery",
      title: "Жара у печи",
      lightbox: true,
      items: [
        { title: "Дровяная печь", image: "assets/img/g-oven" },
        { title: "Прямо из огня", image: "assets/img/g-fire" },
        { title: "Лопата и тесто", image: "assets/img/g-peel" },
        { title: "Мы открыты", image: "assets/img/g-neon" },
        { title: "Гриль на выезде", image: "assets/img/g-grill" },
        { title: "Неон у входа", image: "assets/img/g-sign" },
        { title: "Пикник в парке", image: "assets/img/g-park" },
        { title: "Нарезка", image: "assets/img/g-cut" }
      ]
    },

    {
      type: "reviews",
      id: "reviews",
      title: "Отзывы",
      subtitle: "4,8 из 5 на основе 1 240 отзывов (пример)",
      items: [
        { name: "Максим Т.", car: "Доставка", rating: 5, date: "сентябрь", text: "Пицца приехала через 35 минут и была реально горячей. Диабло — огонь во всех смыслах." },
        { name: "Катя Л.", car: "День рождения", rating: 5, date: "август", text: "Отмечали 10 лет сыну: мастер-класс, своя пицца, дети счастливы. Родители тоже." },
        { name: "Игорь В.", car: "Фудтрак", rating: 5, date: "июль", text: "Заказывали фудтрак на корпоратив на 80 человек. Всё чётко, никто не остался голодным." },
        { name: "Оля М.", car: "Самовывоз", rating: 4, date: "июнь", text: "Смэш-бургер лучший в городе. В пятницу вечером очередь — заказывайте заранее." }
      ]
    },

    {
      type: "faq",
      id: "faq",
      title: "Вопросы",
      items: [
        { q: "Куда доставляете?", a: "По всему Бресту в пределах объездной. В пригород — от 60 BYN, стоимость доставки уточнит оператор." },
        { q: "Сколько ждать заказ?", a: "Доставка — 30–45 минут, самовывоз — 15 минут. В пятницу вечером может быть дольше, оператор предупредит." },
        { q: "Можно ли забронировать стол?", a: "Да, через форму ниже. Для компании больше 10 гостей выберите «День рождения»." },
        { q: "Есть ли веганская пицца?", a: "Да: Маргарита и Овощная с веганским сыром (+3 BYN)." }
      ]
    },

    {
      type: "booking",
      id: "booking",
      mode: "table",
      title: "Забронировать стол",
      subtitle: "Держим стол 15 минут. Праздник — выберите формат, мы перезвоним.",
      endpoint: "",
      phoneMask: "+375 (__) ___-__-__",
      maxDaysAhead: 30,
      leadMinutes: 30,
      groupMax: 10,
      groupMaxText: "Больше 10 гостей — выберите «День рождения» или позвоните.",
      guestsDefault: 4,
      timeSlots: ["12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"],
      slotsByDay: { 5: ["12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "00:00"], 6: ["12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "00:00"] },
      zones: [
        { id: "hall", title: "Зал" },
        { id: "terrace", title: "Веранда (май–сентябрь)" }
      ],
      labels: {
        name: "Ваше имя", phone: "Телефон", service: "Зал или праздник",
        servicePlaceholder: "Любой стол", date: "Дата", time: "Время", guests: "Гостей",
        comment: "Комментарий", timePlaceholder: "Время"
      },
      commentPlaceholder: "Например: детский стульчик",
      consentText: "Согласен(на) на обработку персональных данных",
      submitText: "Забронировать",
      successTitle: "Готово!",
      successText: "Стол забронирован — пришлём подтверждение в SMS.",
      resetText: "Ещё одна бронь",
      perks: [
        "Без депозита",
        "Детские стульчики и раскраски",
        "Веранда с мая по сентябрь"
      ]
    },

    { type: "contacts", id: "contacts", title: "Контакты" }
  ],

  footer: {
    columns: [
      { title: "Меню", links: "services" },
      { title: "Печь 900", links: [
        { text: "Доставка", href: "#order" },
        { text: "Праздники", href: "#events" },
        { text: "О нас", href: "#about" },
        { text: "Бронь стола", href: "#booking" }
      ]}
    ],
    legal: [
      "ООО «Примерная пиццерия» (демо-реквизиты)",
      "УНП 000000000"
    ],
    copyright: "Печь 900. Все права защищены.",
    demoNote: "Демонстрационный шаблон сайта. Название, контакты, блюда, цены и отзывы вымышлены. Фото: CC0 / Public Domain."
  }
};
