/* =====================================================================
   КОНФИГУРАЦИЯ САЙТА — ВСЕ ТЕКСТЫ, КОНТАКТЫ, КОМНАТЫ, ДОП. УСЛУГИ И ЦЕНЫ.
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
    title: "Тихая — усадьба медленного отдыха у реки | Демо-шаблон",
    description: "Старая усадьба у реки: пять комнат с льняным бельём, баня с травами, завтраки из сада, долгие ужины и камерные праздники до 30 гостей. Бронирование по датам.",
    ogImage: "assets/img/og-image.jpg",
    themeColor: "#fbfaf6"
  },

  brand: {
    name: "Тихая",
    logo: null,
    logoText: "ТИХАЯ",
    logoAccent: "",
    tagline: "Усадьба медленного отдыха. Пять комнат, сад и река"
  },

  contacts: {
    phone: "+375 (29) 000-00-33",
    phoneHref: "+375290000033",
    email: "tishe@example.com",
    city: "Березинский район",
    address: "Минская обл., Березинский р-н, усадьба «Тихая» (пример)",
    addressNote: "Парковка у ворот сада",
    hours: [
      { days: "Заезд", time: "с 15:00" },
      { days: "Выезд", time: "до 12:00" },
      { days: "Звонки", time: "10:00–20:00" }
    ],
    hoursShort: "Звонки 10:00–20:00",
    mapEmbed: "",
    mapLink: "https://yandex.by/maps/?text=%D0%91%D0%B5%D1%80%D0%B5%D0%B7%D0%B8%D0%BD%D0%BE",
    socials: [
      { type: "instagram", url: "https://instagram.com/", label: "Instagram" },
      { type: "telegram", url: "https://t.me/", label: "Telegram" }
    ]
  },

  header: {
    variant: "bar",
    align: "center",
    phone: false,
    ctaStyle: "outline"
  },

  nav: [
    { text: "Комнаты", href: "#services" },
    { text: "Ритуалы", href: "#extras" },
    { text: "События", href: "#events" },
    { text: "Сад", href: "#gallery" },
    { text: "Дорога", href: "#route" }
  ],

  cta: { text: "Бронь", href: "#booking" },
  servicesButton: "Комнаты",
  mobileBar: { call: "Позвонить" },

  callback: {
    title: "Перезвонить вам?",
    text: "Оставьте номер — хозяйка усадьбы перезвонит и расскажет о свободных датах.",
    button: "Жду звонка",
    success: "Спасибо! Перезвоним сегодня."
  },

  /* КОМНАТЫ — в меню, в блоке «Комнаты» и в форме бронирования.
     guests — основных мест, extraBeds — доп. мест, night — за сутки Вс–Чт, weekend — Пт и Сб. */
  services: [
    { id: "svetlitsa", icon: "sun", title: "Светлица", text: "Комната из светлой сосны под самой крышей. Кровать у окна, льняное бельё и утреннее солнце.", guests: 2, beds: "Кровать 160 см", area: "18 м²", amenities: ["Вид на сад", "Своя ванная", "Завтрак"], night: 150, weekend: 180, price: "от 150 BYN", image: "assets/img/stay-svetlitsa", imageAlt: "Светлая деревянная комната с кроватью" },
    { id: "len", icon: "bed", title: "Льняная", text: "Тёплая комната с ручным макраме, лампами из глины и креслом для чтения.", guests: 2, extraBeds: 1, beds: "Кровать 180 см", area: "22 м²", amenities: ["Кресло для чтения", "Своя ванная", "Завтрак"], night: 170, weekend: 200, price: "от 170 BYN", image: "assets/img/stay-len", imageAlt: "Спальня с макраме над кроватью и светильниками" },
    { id: "mansarda", icon: "home", title: "Мансарда", text: "Просторная комната с мансардными окнами и видом на реку — для пары с ребёнком или троих друзей.", guests: 3, extraBeds: 1, beds: "Кровать + диван", area: "30 м²", amenities: ["Окна в крыше", "Ванна", "Завтрак"], night: 210, weekend: 250, price: "от 210 BYN", badge: "Вид на реку", image: "assets/img/stay-mansarda", imageAlt: "Мансардная спальня с окнами в крыше" },
    { id: "veranda", icon: "tree", title: "Летняя веранда", text: "Застеклённая веранда с двумя кроватями и креслом-качалкой. Открыта с мая по сентябрь.", guests: 4, beds: "2 кровати", area: "36 м²", amenities: ["Сезон май–сентябрь", "Выход в сад", "Завтрак"], night: 190, weekend: 230, price: "от 190 BYN", image: "assets/img/stay-veranda", imageAlt: "Веранда с кроватями и креслом-качалкой" },
    { id: "okno", icon: "eye", title: "Комната с окном в сад", text: "Маленькая комната для одного или двоих: два плетёных кресла и окно прямо в яблони.", guests: 2, beds: "Кровать 140 см", area: "16 м²", amenities: ["Окно в сад", "Душ", "Завтрак"], night: 130, weekend: 150, price: "от 130 BYN", image: "assets/img/stay-okno", imageAlt: "Два плетёных кресла у большого окна" }
  ],

  sections: [
    {
      type: "hero",
      variant: "editorial",
      id: "top",
      eyebrow: "Выпуск 14 · Лето",
      title: "Лето у реки",
      text: "Старая усадьба на берегу. Пять комнат, сад, баня с травами и завтраки, ради которых стоит проснуться. Здесь не нужно ничего успевать.",
      buttons: [
        { text: "Выбрать комнату", href: "#services", style: "primary" },
        { text: "Проверить даты", href: "#booking", style: "ghost" }
      ],
      images: [
        { image: "assets/img/hero-tea", alt: "Красный чайник на столике на балконе", label: "01", caption: "Чай на балконе Светлицы", href: "#services", service: "svetlitsa" },
        { image: "assets/img/hero-birch", alt: "Берёзовая роща летом", label: "02", caption: "Берёзовая роща за садом", href: "#gallery" }
      ]
    },

    {
      type: "statement",
      id: "intro",
      eyebrow: "Об усадьбе",
      text: "Дом построен в 1896 году (пример). Мы сохранили печи, половицы и сад — и добавили горячую воду, хорошие матрасы и тишину.",
      sub: "Без телевизоров, аниматоров и громкой музыки. Только книги, река и разговоры до полуночи."
    },

    {
      type: "stays",
      id: "services",
      variant: "rows",
      showNum: true,
      eyebrow: "Внутри",
      title: "Пять комнат",
      subtitle: "Цена — за комнату за сутки, завтрак включён.",
      perNight: "за сутки, с завтраком",
      weekendLabel: "Пт–Сб",
      buttonText: "Выбрать даты",
      buttonStyle: "primary",
      note: "Цены — пример. Детям до 5 лет — бесплатно. Без животных: в доме живёт кот."
    },

    {
      type: "banner",
      id: "river",
      variant: "full",
      align: "center",
      title: "Отдыхать всерьёз",
      text: "Двести метров до реки, лодка у мостков и ни одного дела в списке.",
      image: "assets/img/banner",
      imageAlt: "Дерево над рекой в солнечный день"
    },

    {
      type: "extras",
      id: "extras",
      eyebrow: "Ритуалы",
      title: "Маленькие удовольствия",
      subtitle: "Отметьте то, что хотите добавить к брони, — мы всё подготовим к вашему приезду.",
      addText: "Добавить",
      addedText: "Добавлено",
      buttonStyle: "outline",
      items: [
        { id: "banya", title: "Баня с травами", short: "Баня", featured: true, text: "Парная из липы, веники из сада, чай с чабрецом и холодная река после. Три часа только для вас.", price: "110 BYN", unit: "за 3 часа", cost: 110, image: "assets/img/ex-banya", imageAlt: "Светлая парная с полками" },
        { id: "tea", title: "Чай из сада", short: "Чайная церемония", text: "Сбор трав, самовар и разговор о том, что растёт вокруг.", price: "15 BYN", unit: "с гостя", cost: 15, per: "guest", image: "assets/img/ex-tea", imageAlt: "Стеклянный чайник с травяным чаем" },
        { id: "robe", title: "Банный набор", short: "Банный набор", text: "Льняной халат, полотенца, масло и мыло ручной работы.", price: "20 BYN", unit: "с гостя", cost: 20, per: "guest", image: "assets/img/ex-robe", imageAlt: "Белые халаты на крючках" },
        { id: "breakfast", title: "Завтрак в комнату", short: "Завтрак в комнату", text: "Блины с ягодами, творог, мёд — на подносе к вашей двери.", price: "10 BYN", unit: "с гостя в день", cost: 10, per: "guestNight", image: "assets/img/ex-breakfast", imageAlt: "Блины с ягодами на завтрак" },
        { id: "bread", title: "Хлеб из печи", short: "Урок хлеба", text: "Мастер-класс: замешиваем, печём и уносим домой свою буханку.", price: "35 BYN", unit: "с гостя", cost: 35, per: "guest", image: "assets/img/ex-bread", imageAlt: "Домашний хлеб на деревянной доске" }
      ]
    },

    {
      type: "programs",
      id: "events",
      eyebrow: "События",
      title: "Камерные праздники",
      subtitle: "Долгие ужины, девичники, маленькие свадьбы — до 30 гостей.",
      groupLabel: "События",
      priceLabel: "Стоимость",
      buttonText: "Обсудить",
      buttonStyle: "outline",
      items: [
        { id: "dinner", title: "Долгий ужин в саду", for: "10–30 гостей", items: ["Стол под яблонями", "Сезонное меню из пяти подач", "Свечи, лён и живая музыка"], price: "от 65 BYN с гостя", image: "assets/img/ev-dinner", imageAlt: "Сервированный стол с карточкой гостя" },
        { id: "tea-party", title: "Девичник или чаепитие", for: "6–16 гостей", items: ["Веранда на весь день", "Десерты и чай из самовара", "Баня и банные наборы"], price: "от 480 BYN", image: "assets/img/ev-tea", imageAlt: "Чаепитие с десертами за деревянным столом" },
        { id: "tasting", title: "Дегустация у камина", for: "8–20 гостей", items: ["Сыры местных сыроварен", "Настойки и ягодные вина", "Рассказ о каждом продукте"], price: "от 45 BYN с гостя", image: "assets/img/ev-tasting", imageAlt: "Сыры, ягоды и бокалы на столе" }
      ]
    },

    {
      type: "gallery",
      id: "gallery",
      variant: "mosaic",
      lightbox: true,
      eyebrow: "Сад",
      title: "Сезон в фотографиях",
      items: [
        { title: "Яблони в цвету", image: "assets/img/g-blossom", size: "big" },
        { title: "Мёд с пасеки соседа", image: "assets/img/g-honey" },
        { title: "Малина в июле", image: "assets/img/g-raspberry", size: "tall" },
        { title: "Полотенца на солнце", image: "assets/img/g-towels" },
        { title: "Река утром", image: "assets/img/g-river", size: "wide" },
        { title: "Варенье на зиму", image: "assets/img/g-jars" },
        { title: "Лес за рекой", image: "assets/img/g-forest" }
      ]
    },

    {
      type: "reviews",
      id: "reviews",
      variant: "grid",
      title: "Письма гостей",
      items: [
        { name: "Вера Л.", car: "Светлица, 3 ночи", rating: 5, date: "июль", text: "Я впервые за год прочитала книгу от начала до конца. Завтраки — отдельная глава: блины с малиной и мёд, который пахнет липой." },
        { name: "Игорь и Надя", car: "Мансарда", rating: 5, date: "август", text: "Приехали на годовщину. Баня, река, ужин в саду при свечах. Хочется вернуться именно сюда и именно в эту комнату." },
        { name: "Ксения Т.", car: "Девичник, 12 гостей", rating: 5, date: "июнь", text: "Веранда, самовар, банные наборы — подруги до сих пор пересылают фотографии. Всё было очень бережно." }
      ]
    },

    {
      type: "faq",
      id: "faq",
      title: "Вопросы",
      subtitle: "Если не нашли ответ — позвоните, хозяйка ответит с 10 до 20.",
      items: [
        { q: "Завтрак входит в стоимость?", a: "Да, завтрак для всех гостей комнаты включён. Подаём с 8:30 до 11:00 в столовой или на веранде." },
        { q: "Можно с детьми?", a: "Да, с детьми от 5 лет — в Мансарде и на Веранде есть дополнительные места. Для малышей дадим кроватку." },
        { q: "Можно с собакой?", a: "К сожалению, нет: в доме живёт кот, а в саду — куры." },
        { q: "Как устроена бронь?", a: "Вы оставляете заявку, мы подтверждаем даты и присылаем реквизиты. Предоплата 30%, отмена за 10 дней — без удержаний." },
        { q: "Можно забронировать усадьбу целиком?", a: "Да, до 15 гостей с проживанием или до 30 — на праздник без ночёвки. Выберите «События» в форме." }
      ]
    },

    {
      type: "booking",
      id: "booking",
      mode: "stay",
      title: "Бронирование",
      subtitle: "Напишите, когда хотите приехать, — ответим и подтвердим в течение пары часов.",
      endpoint: "",
      phoneMask: "+375 (__) ___-__-__",
      minNights: 1,
      maxNights: 14,
      maxDaysAhead: 200,
      groupMax: 30,
      labels: {
        service: "Комната или событие", servicePlaceholder: "Выберите комнату", serviceOther: "Помогите выбрать",
        date: "Заезд", dateout: "Выезд", adults: "Взрослые", kids: "Дети", extras: "Ритуалы", comment: "Пожелания"
      },
      kidsNote: "от 5 лет",
      estimateNote: "Расчёт предварительный. Предоплата — 30%.",
      commentPlaceholder: "Например: у нас годовщина, хотим ужин в саду",
      consentText: "Согласен(на) на обработку персональных данных",
      submitText: "Отправить",
      successTitle: "Спасибо за письмо",
      successText: "Мы проверим даты и перезвоним — обычно в течение двух часов.",
      perks: ["Завтрак включён", "Предоплата 30%", "Отмена за 10 дней — без удержаний"]
    },

    {
      type: "route",
      id: "route",
      eyebrow: "Дорога",
      title: "Как добраться",
      distance: "105 км",
      distanceNote: "от Минска · 1 ч 20 мин по трассе М4",
      coords: "53.8310, 28.9960",
      links: [
        { text: "Яндекс Навигатор", href: "https://yandex.by/maps/?pt=28.996,53.831&z=13&l=map", icon: "navigation" },
        { text: "Google Карты", href: "https://maps.google.com/?q=53.831,28.996", icon: "pin" }
      ],
      items: [
        { icon: "car", title: "На машине", meta: "1 ч 20 мин", text: "По трассе М4 до Березино, затем 12 км по указателям «Тихая». Асфальт до ворот сада." },
        { icon: "bus", title: "На автобусе", meta: "1 ч 40 мин", text: "С автовокзала «Центральный» до Березино. Встретим на остановке — бесплатно." },
        { icon: "users", title: "Трансфер из Минска", meta: "по запросу", text: "Машина до 4 человек от двери до двери — 120 BYN в одну сторону." }
      ],
      note: "Координаты и маршрут — пример."
    },

    { type: "contacts", id: "contacts", title: "Контакты" }
  ],

  footer: {
    columns: [
      { title: "Комнаты", links: "services" },
      { title: "Усадьба", links: [
        { text: "Ритуалы", href: "#extras" },
        { text: "События", href: "#events" },
        { text: "Сад", href: "#gallery" },
        { text: "Вопросы", href: "#faq" },
        { text: "Дорога", href: "#route" }
      ]}
    ],
    legal: ["ИП Примерова П. П. (демо-реквизиты)", "УНП 000000000", "Агроэкоусадьба, свидетельство № 000 (пример)"],
    copyright: "Усадьба «Тихая».",
    bigText: "ТИХАЯ",
    demoNote: "Демонстрационный шаблон сайта. Название, контакты, координаты, цены и отзывы вымышлены. Фото: CC0 / Public Domain."
  }
};
