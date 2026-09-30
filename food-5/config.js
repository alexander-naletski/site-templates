/* =====================================================================
   КОНФИГУРАЦИЯ САЙТА — ВСЕ ТЕКСТЫ, КОНТАКТЫ, МЕНЮ, ЦЕНЫ И БРОНЬ СТОЛОВ.
   ---------------------------------------------------------------------
   • Меняйте только значения в кавычках. Не удаляйте запятые и скобки.
   • Порядок блоков на странице = порядок в массиве `sections`.
     Блок можно скрыть, поставив `hidden: true`.
   • Все данные ниже — ПРИМЕР (демо-наполнение). Название, телефоны,
     адрес, цены, изделия и отзывы вымышлены.
   ===================================================================== */
window.SITE_CONFIG = {
  demo: true,
  currency: "BYN",

  meta: {
    lang: "ru",
    title: "Крошка — пекарня и кондитерская в Витебске | Демо-шаблон",
    description: "Хлеб на закваске, круассаны, пирожные и торты на заказ. Кафе-кондитерская на 30 мест, самовывоз и доставка тортов по Витебску, детские праздники и свадебные торты.",
    ogImage: "assets/img/og-image.jpg",
    themeColor: "#f6f1e7"
  },

  brand: {
    name: "Крошка",
    logo: null,
    logoText: "КРОШКА",
    logoAccent: "",
    tagline: "Пекарня и кондитерская · Витебск · с 2012"
  },

  /* Шапка: логотип по центру, меню второй строкой (как у парфюмерного дома) */
  header: { variant: "bar", align: "center", phone: true, callback: false, ctaStyle: "primary", announce: "Торт к выходным — закажите до четверга и получите открытку в подарок", announceHref: "#events" },

  contacts: {
    phone: "+375 (29) 000-00-45",
    phoneHref: "+375290000045",
    email: "hello@example.com",
    city: "Витебск",
    address: "Витебск, ул. Примерная, 12",
    addressNote: "Кафе на 30 мест, вход с угла (пример)",
    hours: [
      { days: "Пн–Пт", time: "08:00–21:00" },
      { days: "Сб–Вс", time: "09:00–21:00" }
    ],
    hoursShort: "Ежедневно с 08:00",
    schedule: [["09:00", "21:00"], ["08:00", "21:00"], ["08:00", "21:00"], ["08:00", "21:00"], ["08:00", "21:00"], ["08:00", "21:00"], ["09:00", "21:00"]],
    mapEmbed: "",
    mapLink: "https://yandex.by/maps/?text=%D0%92%D0%B8%D1%82%D0%B5%D0%B1%D1%81%D0%BA",
    socials: [
      { type: "instagram", url: "https://instagram.com/", label: "Instagram" },
      { type: "telegram", url: "https://t.me/", label: "Telegram" },
      { type: "viber", url: "viber://chat?number=%2B375290000045", label: "Viber" }
    ]
  },

  topbar: { links: [], callbackText: "Заказать звонок" },

  nav: [
    { text: "Витрина", href: "#menu" },
    { text: "Торты на заказ", href: "#events" },
    { text: "Доставка", href: "#order" },
    { text: "Истории", href: "#stories" },
    { text: "Кафе", href: "#gallery" },
    { text: "Контакты", href: "#contacts" }
  ],

  cta: { text: "Забронировать стол", href: "#booking" },
  servicesButton: "Витрина",
  mobileBar: { call: "Позвонить" },

  callback: {
    title: "Заказать звонок",
    text: "Перезвоним и поможем выбрать торт.",
    button: "Жду звонка",
    success: "Спасибо! Мы скоро перезвоним."
  },

  sections: [
    {
      type: "hero",
      variant: "cover",
      align: "center",
      id: "top",
      image: "assets/img/hero",
      imageAlt: "Витрина с только что испечёнными круассанами",
      eyebrow: "Пекарня · кондитерская · с 2012",
      title: "Круассаны из печи каждые 40 минут",
      text: "Французское сливочное масло, 72 слоя и никакой спешки.",
      openStatus: true,
      buttons: [
        { text: "Смотреть витрину", href: "#menu", style: "primary" }
      ]
    },

    {
      type: "menu",
      id: "menu",
      eyebrow: "Витрина сегодня",
      title: "Хлеб, выпечка и десерты",
      subtitle: "Витрина обновляется в течение дня. Отложим любое изделие по звонку.",
      categories: [
        { id: "pastry", title: "Выпечка", icon: "croissant", items: [
          { title: "Круассан на сливочном масле", text: "72 слоя, французское масло 82%", weight: "80 г", price: "3,90", image: "assets/img/d-croissant", imageAlt: "Золотистый круассан на белом фоне", tags: ["Хит"] },
          { title: "Круассан с джемом", text: "Абрикосовый конфитюр на отдельной розетке", weight: "110 г", price: "4,50", image: "assets/img/d-croissant2", imageAlt: "Круассан на тарелке рядом с чашкой" },
          { title: "Даниш с корицей", text: "Слоёное тесто, корица, ванильная глазурь", weight: "100 г", price: "4,20", image: "assets/img/d-danish", imageAlt: "Слоёные булочки с корицей и глазурью" },
          { title: "Слойка с яблоком", text: "Антоновка, корица, миндальные лепестки", weight: "120 г", price: "3,80", image: "assets/img/d-apple", imageAlt: "Слойки с яблоком на подносе" },
          { title: "Булочка с корицей", text: "Сдобное тесто, корица, сливочный сыр", weight: "130 г", price: "4,40", image: "assets/img/d-roll", imageAlt: "Булочки с корицей на тарелке" },
          { title: "Эклеры ассорти", text: "Фиалка, лимон, ваниль — на выбор", weight: "70 г", price: "4,90", image: "assets/img/d-eclair", imageAlt: "Эклеры с разной глазурью на тарелке" },
          { title: "Пончик с глазурью", text: "Ягодная глазурь, посыпка", weight: "90 г", price: "3,20", image: "assets/img/d-donut", imageAlt: "Пончик с розовой глазурью и посыпкой" },
          { title: "Печенье с шоколадом", text: "Три вида шоколада, морская соль", weight: "70 г", price: "2,90", image: "assets/img/d-cookies", imageAlt: "Печенье с шоколадной крошкой" }
        ]},
        { id: "desserts", title: "Пирожные", icon: "cake", items: [
          { title: "Макарон, 6 шт.", text: "Фисташка, малина, лимон, шоколад, ваниль, лаванда", weight: "6 шт.", price: "14,90", image: "assets/img/d-macaron", imageAlt: "Стопки разноцветных макарон", badge: "В подарок", featured: true },
          { title: "Печенье и макарон", text: "Коробка ассорти на чаепитие", weight: "250 г", price: "18,50", image: "assets/img/d-macaron2", imageAlt: "Макарон и печенье на столе" },
          { title: "Тарталетка с клубникой", text: "Песочная корзиночка, заварной крем, клубника", weight: "90 г", price: "6,50", image: "assets/img/d-tarts", imageAlt: "Тарталетки с клубникой рядами" },
          { title: "Тарт с фруктами", text: "Манго, питахайя, клубника, крем патисьер", weight: "110 г", price: "7,90", image: "assets/img/d-fruittart", imageAlt: "Тарт с экзотическими фруктами" },
          { title: "Тарт с голубикой", text: "Миндальный крем, свежая голубика", weight: "120 г", price: "7,50", image: "assets/img/d-blacktart", imageAlt: "Тарт с голубикой крупным планом" },
          { title: "Бисквит с клубникой", text: "Ванильный бисквит, сливки, клубника", weight: "140 г", price: "6,90", image: "assets/img/d-strawslice", imageAlt: "Кусочек бисквита с клубникой" },
          { title: "Клубничное пирожное", text: "Сливочный мусс, клубничное конфи", weight: "130 г", price: "7,20", image: "assets/img/d-strawcake", imageAlt: "Клубничное пирожное на тарелке" },
          { title: "Шоколадный кусочек", text: "70% какао, ганаш, соус из малины", weight: "120 г", price: "7,50", image: "assets/img/d-darkchoc", imageAlt: "Кусок шоколадного торта с соусом" }
        ]},
        { id: "cakes", title: "Торты", icon: "gift", items: [
          { title: "Нейкед с ягодами", text: "Ванильный бисквит, крем-чиз, ягоды сезона", weight: "1,5 кг", price: "95", image: "assets/img/d-naked", imageAlt: "Торт без покрытия с ягодами сверху", tags: ["Хит"] },
          { title: "Красный бархат", text: "Какао-бисквит, крем на сливочном сыре", weight: "1,5 кг", price: "98", image: "assets/img/d-choc", imageAlt: "Кусок торта красный бархат" },
          { title: "Шоколадный с кремом", text: "Шоколадный бисквит, сливочный крем, ягоды", weight: "1,5 кг", price: "105", image: "assets/img/d-redvelvet", imageAlt: "Шоколадный торт с кремом и ягодами" },
          { title: "Фруктовый бисквит", text: "Бисквит, взбитые сливки, персик, киви", weight: "2 кг", price: "112", image: "assets/img/d-fruitcake", imageAlt: "Бисквитный торт с фруктами" },
          { title: "Чизкейк с голубикой", text: "Нью-Йорк, песочная основа, голубика", weight: "1,2 кг", price: "88", image: "assets/img/d-blueberry", imageAlt: "Чизкейк, усыпанный голубикой" },
          { title: "Ягодный чизкейк", text: "Малиновый слой, свежие ягоды", weight: "1,2 кг", price: "92", image: "assets/img/d-berrycheese", imageAlt: "Розовый ягодный чизкейк с цветами" },
          { title: "Белый торт с цветами", text: "Два яруса, крем-чиз, живые цветы — к торжеству", weight: "3 кг", price: "от 240", image: "assets/img/d-white", imageAlt: "Белый торт с ягодами и цветами" }
        ]},
        { id: "bread", title: "Хлеб", icon: "wheat", items: [
          { title: "Багет", text: "Пшеничная мука, закваска левен, 24 часа", weight: "250 г", price: "3,20", image: "assets/img/d-baguette", imageAlt: "Багеты на тёмном фоне" },
          { title: "Цельнозерновой", text: "Цельная пшеница, семечки, мёд", weight: "600 г", price: "5,40", image: "assets/img/d-wholewheat", imageAlt: "Буханки цельнозернового хлеба" },
          { title: "Батон на закваске", text: "Хрустящая корка, мягкий мякиш", weight: "450 г", price: "4,20", image: "assets/img/d-french", imageAlt: "Длинные батоны на столе" },
          { title: "Пшеничный на закваске", text: "Круглый хлеб, 36 часов ферментации", weight: "800 г", price: "6,90", image: "assets/img/d-loaf", imageAlt: "Разрезанный хлеб на закваске" }
        ]}
      ],
      note: "Цены в BYN — пример. Торты — от 1,2 кг, заказ за 48 часов.",
      buttonText: "Заказать торт",
      buttonHref: "#events"
    },

    {
      type: "order",
      id: "order",
      eyebrow: "Самовывоз и доставка",
      title: "Отложим, упакуем, привезём",
      text: "Позвоните или напишите — отложим выпечку к вашему приходу. Торты и наборы привозим по Витебску в холодильной сумке.",
      points: [
        { icon: "bag", text: "Самовывоз — закажите до 18:00 на завтра" },
        { icon: "scooter", text: "Доставка тортов — 8 BYN, от 120 BYN бесплатно" },
        { icon: "gift", text: "Подарочная упаковка и открытка — 3 BYN" }
      ],
      buttons: [
        { text: "Написать в Viber", href: "viber://chat?number=%2B375290000045", style: "primary", icon: "viber" },
        { text: "Позвонить", href: "tel:+375290000045", style: "outline", icon: "phone" }
      ],
      image: "assets/img/order",
      imageAlt: "Хлеб на закваске на деревянном столе"
    },

    {
      type: "programs",
      id: "events",
      eyebrow: "Торты на заказ и праздники",
      title: "Для особых дней",
      subtitle: "Расскажите о празднике — кондитер предложит начинку и декор, пришлёт эскиз.",
      groupLabel: "Заказы и праздники",
      priceLabel: "Стоимость",
      buttonText: "Обсудить заказ",
      items: [
        { id: "birthday", title: "Торт на день рождения", for: "от 1,5 кг, заказ за 48 часов", items: ["12 начинок на выбор", "Надпись и свечи в подарок"], price: "от 65 BYN / кг", image: "assets/img/ev-birthday", imageAlt: "Праздничный торт со свечами" },
        { id: "wedding", title: "Свадебный торт", for: "от 3 кг, дегустация начинок", items: ["Эскиз от кондитера", "Доставка и сборка на месте"], price: "от 80 BYN / кг", image: "assets/img/ev-wedding", imageAlt: "Многоярусный свадебный торт с цветами", badge: "Дегустация бесплатно" },
        { id: "candybar", title: "Кенди-бар и чаепитие", for: "кафе целиком до 30 гостей", items: ["Пирожные, макарон, капкейки", "Чай и кофе без ограничений"], price: "от 25 BYN / гость", image: "assets/img/ev-table", imageAlt: "Стол с пирожными и десертами" }
      ],
      note: "Цены и условия — пример."
    },

    {
      type: "gallery",
      id: "stories",
      variant: "stories",
      eyebrow: "Истории",
      title: "Как мы печём",
      lightbox: false,
      items: [
        { title: "Утро за прилавком", text: "Первый хлеб — в 06:30", image: "assets/img/s-shop", alt: "Прилавок пекарни с хлебом и покупателями" },
        { title: "72 слоя", text: "Круассаны раскатываем вручную", image: "assets/img/s-dough", alt: "Руки скручивают круассаны из теста" },
        { title: "Тесто любит тепло", text: "Закваске нашей пекарни 12 лет", image: "assets/img/s-knead", alt: "Руки замешивают тесто на столе" },
        { title: "Мука и яйца", text: "Только местные фермы", image: "assets/img/s-flour", alt: "Мука и яйцо на деревянном столе" }
      ]
    },

    {
      type: "about",
      id: "about",
      eyebrow: "О пекарне",
      title: "Семейная пекарня с 2012 года",
      text: "Всё началось с одной печи и рецептов бабушки. Сегодня нас 18 человек: пекари, кондитеры и бариста. Мы до сих пор раскатываем тесто вручную и не используем готовые смеси и улучшители.",
      image: "assets/img/s-baker",
      imageAlt: "Кондитер раскладывает пирожные на витрине",
      list: [
        "Хлеб на живой закваске",
        "Без маргарина и улучшителей",
        "Кафе на 30 мест с кофе и чаем"
      ],
      stats: [
        { value: "12", label: "лет печём" },
        { value: "40", label: "изделий каждый день" },
        { value: "3000", label: "тортов в год" }
      ]
    },

    {
      type: "gallery",
      id: "gallery",
      title: "Кафе-кондитерская",
      lightbox: true,
      items: [
        { title: "Витрина с тортами", image: "assets/img/g-cakes" },
        { title: "Вход", image: "assets/img/g-front" },
        { title: "Чайные пары", image: "assets/img/g-tea" },
        { title: "Пирожные дня", image: "assets/img/g-display" },
        { title: "Хлебная полка", image: "assets/img/g-bread" },
        { title: "Пончики", image: "assets/img/g-donuts" },
        { title: "Выпечка к завтраку", image: "assets/img/g-store" },
        { title: "Прилавок", image: "assets/img/g-shop2" }
      ]
    },

    {
      type: "reviews",
      id: "reviews",
      title: "Отзывы",
      subtitle: "4,9 из 5 на основе 640 отзывов (пример)",
      items: [
        { name: "Ирина С.", car: "Свадебный торт", rating: 5, date: "сентябрь", text: "Торт был не только красивым, но и очень вкусным — гости просили добавки. Спасибо за дегустацию и эскиз!" },
        { name: "Алексей Н.", car: "Круассаны", rating: 5, date: "август", text: "Лучшие круассаны в Витебске. Беру по утрам по дороге на работу." },
        { name: "Марина К.", car: "Кенди-бар", rating: 5, date: "июль", text: "Отмечали выпускной дочери в кафе. Уютно, красиво и очень вкусно." },
        { name: "Сергей Д.", car: "Хлеб", rating: 4, date: "июнь", text: "Хлеб на закваске отличный. Вечером часто заканчивается — лучше отложить по телефону." }
      ]
    },

    {
      type: "faq",
      id: "faq",
      title: "Вопросы",
      items: [
        { q: "За сколько дней заказывать торт?", a: "За 48 часов, свадебный — за 2–3 недели. Срочный заказ — позвоните, подскажем, что можно сделать." },
        { q: "Есть ли десерты без сахара или глютена?", a: "Да: безглютеновые макарон и тарты, торт на эритрите — по предзаказу." },
        { q: "Можно ли забронировать стол?", a: "Да, через форму ниже. Кафе целиком для праздника — выберите «Кенди-бар и чаепитие»." },
        { q: "Как хранить торт?", a: "В холодильнике при +2…+6 °C до 72 часов. Инструкция — на коробке." }
      ]
    },

    {
      type: "booking",
      id: "booking",
      mode: "table",
      title: "Стол в кафе",
      subtitle: "Забронируйте стол для завтрака или чаепития. Держим бронь 15 минут.",
      endpoint: "",
      phoneMask: "+375 (__) ___-__-__",
      maxDaysAhead: 30,
      leadMinutes: 60,
      groupMax: 8,
      groupMaxText: "Для компании больше 8 гостей выберите «Кенди-бар и чаепитие».",
      guestsDefault: 2,
      timeSlots: ["08:30", "09:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30", "19:30"],
      slotsByDay: { 0: ["09:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30", "19:30"], 6: ["09:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30", "19:30"] },
      zones: [
        { id: "window", title: "У окна" },
        { id: "sofa", title: "Диванная зона" }
      ],
      labels: {
        name: "Ваше имя", phone: "Телефон", service: "Место или праздник",
        servicePlaceholder: "Любой стол", date: "Дата", time: "Время", guests: "Гостей",
        comment: "Комментарий", timePlaceholder: "Время"
      },
      commentPlaceholder: "Например: отложите 2 круассана",
      consentText: "Согласен(на) на обработку персональных данных",
      submitText: "Забронировать",
      successTitle: "Спасибо!",
      successText: "Стол забронирован — перезвоним, если что-то изменится.",
      resetText: "Новая бронь",
      perks: [
        "Без депозита",
        "Детский стульчик по запросу",
        "Отложим выпечку к приходу"
      ]
    },

    { type: "contacts", id: "contacts", title: "Контакты" }
  ],

  footer: {
    columns: [
      { title: "Витрина", links: "services" },
      { title: "Крошка", links: [
        { text: "Торты на заказ", href: "#events" },
        { text: "Доставка", href: "#order" },
        { text: "Истории", href: "#stories" },
        { text: "Бронь стола", href: "#booking" }
      ]}
    ],
    legal: [
      "ИП Примерова А. А. (демо-реквизиты)",
      "УНП 000000000"
    ],
    copyright: "Крошка. Все права защищены.",
    demoNote: "Демонстрационный шаблон сайта. Название, контакты, изделия, цены и отзывы вымышлены. Фото: CC0 / Public Domain."
  }
};
