/* =====================================================================
   КОНФИГУРАЦИЯ САЙТА — ВСЕ ТЕКСТЫ, КОНТАКТЫ, ДОМА, ДОП. УСЛУГИ И ЦЕНЫ.
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
    title: "Луг — семейная усадьба и праздники на Немане | Демо-шаблон",
    description: "Усадьба у Немана в 70 км от Минска: 5 домов от 2 до 16 гостей, баня, байдарки и лошади, свадьбы, корпоративы, детские выходные и летний фестиваль. Бронирование по датам.",
    ogImage: "assets/img/og-image.jpg",
    themeColor: "#fff200"
  },

  brand: {
    name: "Луг",
    logo: null,
    logoText: "ЛУГ",
    logoAccent: "",
    tagline: "Семейная усадьба и праздники на Немане"
  },

  contacts: {
    phone: "+375 (29) 000-00-55",
    phoneHref: "+375290000055",
    email: "lug@example.com",
    city: "Столбцовский район",
    address: "Минская обл., Столбцовский р-н, усадьба «Луг» (пример)",
    addressNote: "Парковка на 40 машин и площадка для автобусов",
    hours: [
      { days: "Заезд", time: "с 14:00" },
      { days: "Выезд", time: "до 12:00" },
      { days: "Звонки", time: "9:00–21:00" }
    ],
    hoursShort: "Звонки 9:00–21:00",
    mapEmbed: "",
    mapLink: "https://yandex.by/maps/?text=%D0%A1%D1%82%D0%BE%D0%BB%D0%B1%D1%86%D1%8B",
    socials: [
      { type: "instagram", url: "https://instagram.com/", label: "Instagram" },
      { type: "telegram", url: "https://t.me/", label: "Telegram" },
      { type: "viber", url: "viber://chat?number=%2B375290000055", label: "Viber" }
    ]
  },

  header: {
    variant: "bar",
    phone: true,
    ctaStyle: "primary"
  },

  nav: [
    { text: "Дома", href: "#services" },
    { text: "Праздники", href: "#events" },
    { text: "Баня и прогулки", href: "#extras" },
    { text: "Фото", href: "#gallery" },
    { text: "Как доехать", href: "#route" }
  ],

  cta: { text: "Забронировать", href: "#booking" },
  servicesButton: "Дома",
  mobileBar: { call: "Позвонить" },

  callback: {
    title: "Перезвонить вам?",
    text: "Оставьте номер — расскажем о свободных датах и праздниках.",
    button: "Перезвоните мне",
    success: "Спасибо! Перезвоним в течение часа."
  },

  /* ДОМА — карточки, выбор в форме бронирования и расчёт стоимости.
     guests — основных мест, extraBeds — доп. мест, night — за сутки Вс–Чт, weekend — Пт и Сб. */
  services: [
    { id: "meadow", icon: "sun", title: "Домик на лугу", text: "Маленький дом с верандой прямо в поле. Для пары или пары с ребёнком.", guests: 2, extraBeds: 1, beds: "Кровать 160 см", area: "28 м²", amenities: ["Веранда", "Душ", "Мангал"], night: 150, weekend: 180, price: "от 150 BYN", image: "assets/img/stay-meadow", imageAlt: "Небольшой деревянный домик на лугу на закате" },
    { id: "grove", icon: "tree", title: "Дом-сеновал", text: "Старый сенник у рощи, перестроенный в дом: две спальни и кухня-гостиная под аркой крыши. Качели у крыльца.", guests: 4, extraBeds: 2, beds: "2 спальни", area: "64 м²", amenities: ["Кухня", "Детская зона", "Терраса"], night: 240, weekend: 290, price: "от 240 BYN", badge: "Для семьи", image: "assets/img/stay-grove", imageAlt: "Деревянный сенник с арочной крышей на лугу у рощи" },
    { id: "pond", icon: "waves", title: "Дом у пруда", text: "Свой мостик, лодка и печь. Окна гостиной выходят на воду.", guests: 4, extraBeds: 1, beds: "2 спальни", area: "58 м²", amenities: ["Мостик", "Печь", "Лодка"], night: 260, weekend: 310, price: "от 260 BYN", image: "assets/img/stay-lake", imageAlt: "Дом с мостиком у пруда" },
    { id: "big", icon: "home", title: "Большой дом", text: "Для компании и больших семей: 5 спален, каминный зал на 20 человек и баня рядом.", guests: 12, extraBeds: 4, beds: "5 спален", area: "240 м²", amenities: ["Камин", "Зал на 20", "3 санузла"], night: 690, weekend: 820, price: "от 690 BYN", badge: "До 16 гостей", image: "assets/img/stay-big", imageAlt: "Большой бревенчатый дом среди сосен зимой" },
    { id: "barn", icon: "users", title: "Амбар-хостел", text: "Отдельные места в перестроенном амбаре — для гостей праздника, команд и детских групп.", guests: 16, beds: "4 комнаты по 4 места", area: "180 м²", amenities: ["Кухня", "Душевые", "Шкафчики"], night: 400, weekend: 480, price: "от 400 BYN", image: "assets/img/stay-barn", imageAlt: "Красный амбар у поля" }
  ],

  sections: [
    {
      type: "hero",
      variant: "centered",
      id: "top",
      badge: { tag: "8 августа", text: "Летний фестиваль «Луг» — билеты с проживанием", href: "#events" },
      title: "Луг",
      text: "Семейная усадьба у Немана: 5 домов, баня, байдарки и лошади. Свадьбы, корпоративы и детские выходные — в 70 км от Минска.",
      buttons: [
        { text: "Выбрать даты", href: "#booking", style: "primary" },
        { text: "Праздники", href: "#events", style: "outline" }
      ]
    },

    {
      type: "finder",
      id: "dates",
      title: "Свободные даты",
      service: true,
      serviceLabel: "Дом",
      servicePlaceholder: "Любой",
      buttonText: "Найти",
      note: "Подставим даты в форму — администратор подтвердит за 15 минут."
    },

    {
      type: "marquee",
      label: "Что есть в усадьбе",
      items: ["5 домов", "Баня на дровах", "Байдарки", "Лошади", "Велосипеды", "Шатёр на 120 гостей", "Детский лагерь", "Фестиваль 8 августа"]
    },

    {
      type: "stays",
      id: "services",
      eyebrow: "Проживание",
      title: "Дома",
      subtitle: "Цена за дом за сутки. Бельё, полотенца, дрова для мангала и Wi-Fi — включены.",
      perNight: "за сутки",
      weekendLabel: "Пт–Сб",
      buttonText: "Забронировать",
      buttonStyle: "primary",
      note: "Цены — пример. Летом в выходные минимум 2 ночи."
    },

    {
      type: "banner",
      variant: "full",
      id: "festival",
      image: "assets/img/banner",
      imageAlt: "Толпа у сцены под открытым небом, над ней летит конфетти",
      eyebrow: "Фестиваль «Луг» · 8 августа",
      title: "Музыка на лугу до утра",
      text: "Три сцены, фуд-корт, мастерские для детей и ночёвка в домах и шатрах. Проживание продаём вместе с билетом.",
      buttonText: "Забронировать дом на фестиваль",
      buttonHref: "#booking",
      buttonStyle: "light"
    },

    {
      type: "programs",
      id: "events",
      eyebrow: "Праздники",
      title: "Праздники под ключ",
      subtitle: "Шатёр на 120 гостей, кухня на месте и проживание до 50 человек.",
      groupLabel: "Праздники",
      priceLabel: "Стоимость",
      buttonText: "Заявка",
      buttonStyle: "primary",
      items: [
        { id: "wedding", title: "Свадьба на лугу", for: "До 120 гостей", items: ["Выездная регистрация", "Шатёр, свет и звук", "Банкет от шеф-повара"], price: "от 5 900 BYN", badge: "Май–сентябрь", image: "assets/img/ev-wedding", imageAlt: "Свадебная церемония на лугу" },
        { id: "corp", title: "Корпоратив и тимбилдинг", for: "20–100 гостей", items: ["Гриль и полевая кухня", "Квесты, байдарки, футбол", "Трансфер из Минска"], price: "от 55 BYN / гость", image: "assets/img/ev-grill", imageAlt: "Мясо и овощи на гриле" },
        { id: "kids", title: "Детские выходные", for: "Группы 10–30 детей", items: ["Вожатые и программа", "Лошади и мастерские", "Амбар-хостел и питание"], price: "от 95 BYN / ребёнок", image: "assets/img/ev-kids", imageAlt: "Дети бегают под брызгами воды на лужайке" },
        { id: "fest", title: "Фестиваль «Луг»", for: "8 августа · 1 день", items: ["Три сцены и фуд-корт", "Семейная зона", "Ночёвка в доме или шатре"], price: "от 45 BYN / билет", badge: "Раз в год", image: "assets/img/ev-fest", imageAlt: "Зрители снимают концерт на телефон" }
      ],
      note: "Стоимость зависит от даты и числа гостей (пример)."
    },

    {
      type: "extras",
      id: "extras",
      eyebrow: "Баня и прогулки",
      title: "Добавьте к отдыху",
      subtitle: "Отметьте в форме — посчитаем вместе с проживанием.",
      addText: "Добавить",
      addedText: "Добавлено",
      buttonStyle: "outline",
      items: [
        { id: "banya", icon: "flame", title: "Баня на дровах", short: "Баня", text: "Парная, купель и веники. До 10 человек, 3 часа.", price: "140 BYN", unit: "за 3 часа", cost: 140, image: "assets/img/ex-banya", imageAlt: "Деревянная баня у воды" },
        { id: "kayak", icon: "waves", title: "Сплав на байдарках", short: "Байдарки", text: "Маршрут 12 км по Неману с инструктором, обратно — на автобусе.", price: "35 BYN", unit: "с гостя", cost: 35, per: "guest", image: "assets/img/ex-kayak", imageAlt: "Байдарки на реке" },
        { id: "horse", icon: "heart", title: "Прогулка на лошадях", short: "Лошади", text: "Час по лугу и лесу, для детей — пони в загоне.", price: "40 BYN", unit: "с гостя", cost: 40, per: "guest", image: "assets/img/ex-horse", imageAlt: "Лошадь на лугу" },
        { id: "bike", icon: "bike", title: "Велосипеды", short: "Велосипеды", text: "Взрослые, детские и с креслом. Карта маршрутов в подарок.", price: "10 BYN", unit: "с гостя в сутки", cost: 10, per: "guestNight", image: "assets/img/ex-bike", imageAlt: "Велосипед у деревянного забора" },
        { id: "picnic", icon: "utensils", title: "Пикник-корзина", short: "Пикник", text: "Плед, лимонад, сыры, хлеб и фрукты на четверых.", price: "60 BYN", unit: "за корзину", cost: 60, image: "assets/img/ex-picnic", imageAlt: "Пикник на пледе в траве" }
      ]
    },

    {
      type: "gallery",
      id: "gallery",
      lightbox: true,
      eyebrow: "Фото",
      title: "Лето в «Луге»",
      items: [
        { title: "Беседка у пруда", image: "assets/img/g-gazebo" },
        { title: "Гамаки в роще", image: "assets/img/g-hammock" },
        { title: "Мостик", image: "assets/img/g-dock" },
        { title: "Луг в июне", image: "assets/img/g-field" },
        { title: "Сенокос", image: "assets/img/g-hay" },
        { title: "Байдарки", image: "assets/img/g-kayak" },
        { title: "Шатёр", image: "assets/img/g-pavilion" },
        { title: "Семейный вечер", image: "assets/img/g-family" }
      ]
    },

    {
      type: "reviews",
      id: "reviews",
      variant: "grid",
      title: "Отзывы гостей",
      items: [
        { name: "Ольга и Павел", car: "Свадьба, 90 гостей", rating: 5, date: "июль", text: "Шатёр на лугу, закат и танцы до двух ночи. Гости жили в Большом доме и амбаре — всё организовали за нас." },
        { name: "Команда «Пример»", car: "Корпоратив, 60 человек", rating: 5, date: "июнь", text: "Сплав, футбол и гриль — лучший тимбилдинг за пять лет. Автобус забрал прямо от офиса." },
        { name: "Анна К.", car: "Дом-сеновал, семья", rating: 5, date: "август", text: "Дети весь день на пони и в песочнице, мы — в бане. Вернёмся на фестиваль в следующем году." }
      ]
    },

    {
      type: "faq",
      id: "faq",
      title: "Частые вопросы",
      subtitle: "Не нашли ответ? Позвоните — на связи с 9 до 21.",
      items: [
        { q: "Можно приехать с детьми и собакой?", a: "С детьми — конечно: кроватки, стульчики и детское меню бесплатно. С собакой — в Домике на лугу и Доме-сеновале, 20 BYN за проживание." },
        { q: "Как забронировать дом на фестиваль?", a: "Выберите «Фестиваль «Луг»» в форме и укажите число гостей — предложим свободный дом или место в шатре вместе с билетами." },
        { q: "Сколько гостей вмещает усадьба?", a: "До 50 человек с проживанием и до 120 — в шатре на празднике." },
        { q: "Какая предоплата?", a: "30% после подтверждения. Отмена за 14 дней — без удержаний." },
        { q: "Есть ли питание?", a: "Завтраки — 15 BYN с гостя, ужины и банкеты — по меню. В каждом доме есть кухня." }
      ]
    },

    {
      type: "booking",
      id: "booking",
      mode: "stay",
      title: "Бронирование",
      subtitle: "Выберите дом или праздник, даты и число гостей — перезвоним и подтвердим.",
      endpoint: "",
      phoneMask: "+375 (__) ___-__-__",
      minNights: 1,
      maxNights: 21,
      maxDaysAhead: 365,
      groupMax: 120,
      labels: {
        service: "Дом или праздник", servicePlaceholder: "Выберите дом", serviceOther: "Нужна консультация",
        date: "Заезд / дата", dateout: "Выезд", adults: "Взрослые", kids: "Дети", extras: "Дополнительно", comment: "Комментарий"
      },
      estimateNote: "Расчёт предварительный. Предоплата — 30%.",
      commentPlaceholder: "Например: день рождения на 20 гостей, нужен гриль",
      consentText: "Согласен(на) на обработку персональных данных",
      submitText: "Отправить заявку",
      successTitle: "Ура, заявка у нас!",
      successText: "Перезвоним в течение часа и подтвердим даты.",
      perks: ["Перезвоним в течение часа", "Предоплата 30%", "Дети до 5 лет — бесплатно"]
    },

    {
      type: "route",
      id: "route",
      title: "Как доехать",
      distance: "70 км",
      distanceNote: "от Минска · 1 час по трассе М1",
      coords: "53.4870, 26.7430",
      links: [
        { text: "Яндекс Навигатор", href: "https://yandex.by/maps/?pt=26.743,53.487&z=13&l=map", icon: "navigation" },
        { text: "Google Карты", href: "https://maps.google.com/?q=53.487,26.743", icon: "pin" }
      ],
      items: [
        { icon: "car", title: "На машине", meta: "1 час", text: "По М1 до поворота на Столбцы, дальше 8 км по указателям «Луг»." },
        { icon: "train", title: "На электричке", meta: "1 ч 20 мин", text: "С вокзала Минск-Пассажирский до Столбцов, встретим на станции — 10 минут." },
        { icon: "bus", title: "Шаттл на фестиваль", meta: "8 августа", text: "Автобусы от станции метро «Малиновка» каждый час с 12:00 (пример)." }
      ],
      note: "Координаты и маршрут — пример."
    },

    { type: "contacts", id: "contacts", title: "Контакты" }
  ],

  footer: {
    columns: [
      { title: "Дома", links: "services" },
      { title: "Усадьба", links: [
        { text: "Праздники", href: "#events" },
        { text: "Фестиваль", href: "#festival" },
        { text: "Баня и прогулки", href: "#extras" },
        { text: "Вопросы", href: "#faq" },
        { text: "Как доехать", href: "#route" }
      ]}
    ],
    legal: ["ООО «Пример» (демо-реквизиты)", "УНП 000000000", "Агроэкоусадьба, свидетельство № 000 (пример)"],
    copyright: "Усадьба «Луг».",
    demoNote: "Демонстрационный шаблон сайта. Название, контакты, координаты, цены и отзывы вымышлены. Фото: CC0 / Public Domain."
  }
};
