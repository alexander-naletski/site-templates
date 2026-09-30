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
    title: "Кадр — усадьба на Браславских озёрах | Демо-шаблон",
    description: "Усадьба на берегу озера: 5 домов с камином от 3 до 10 гостей, финская сауна, дровяная печь, свадьбы на закате, вечеринки и аренда локации для съёмок. Бронирование по датам.",
    ogImage: "assets/img/og-image.jpg",
    themeColor: "#000000"
  },

  brand: {
    name: "Кадр",
    logo: null,
    logoText: "КАДР",
    logoAccent: "",
    tagline: "Усадьба на озере, где каждый вечер — как в кино"
  },

  contacts: {
    phone: "+375 (29) 000-00-34",
    phoneHref: "+375290000034",
    email: "kadr@example.com",
    city: "Браславский район",
    address: "Витебская обл., Браславский р-н, усадьба «Кадр» (пример)",
    addressNote: "Своя парковка на 20 машин",
    hours: [
      { days: "Заезд", time: "с 15:00" },
      { days: "Выезд", time: "до 12:00" },
      { days: "Звонки", time: "10:00–22:00" }
    ],
    hoursShort: "Звонки 10:00–22:00",
    mapEmbed: "",
    mapLink: "https://yandex.by/maps/?text=%D0%91%D1%80%D0%B0%D1%81%D0%BB%D0%B0%D0%B2",
    socials: [
      { type: "instagram", url: "https://instagram.com/", label: "Instagram" },
      { type: "telegram", url: "https://t.me/", label: "Telegram" },
      { type: "video", url: "https://youtube.com/", label: "YouTube" }
    ]
  },

  header: {
    variant: "bar",
    align: "center",
    overlay: true,
    phone: false,
    ctaStyle: "outline-light"
  },

  nav: [
    { text: "Дома", href: "#services" },
    { text: "Сауна и ужин", href: "#extras" },
    { text: "События", href: "#events" },
    { text: "Съёмки", href: "#events" },
    { text: "Дорога", href: "#route" }
  ],

  cta: { text: "Бронь", href: "#booking" },
  servicesButton: "Дома",
  mobileBar: { call: "Позвонить" },

  callback: {
    title: "Перезвонить вам?",
    text: "Оставьте номер — продюсер усадьбы перезвонит и расскажет о свободных датах.",
    button: "Жду звонка",
    success: "Спасибо! Перезвоним сегодня."
  },

  /* ДОМА — в «афише» первого экрана, ленте домов и в форме бронирования.
     guests — основных мест, extraBeds — доп. мест, night — за сутки Вс–Чт, weekend — Пт и Сб. */
  services: [
    { id: "brick", icon: "home", title: "Кирпичный дом", text: "Дом 1930-х с зелёными рамами, кухней-столовой и печью. Три спальни, окна на озеро.", guests: 6, extraBeds: 2, beds: "3 спальни", area: "120 м²", amenities: ["Печь", "Кухня-столовая", "Вид на озеро"], night: 380, weekend: 450, price: "от 380 BYN", image: "assets/img/stay-brick", imageAlt: "Кирпичная стена с зелёными окнами и старинной мебелью" },
    { id: "lodge", icon: "flame", title: "Лодж с камином", text: "Большая гостиная с каменным камином и панорамными окнами. Для компании до 10 человек.", guests: 8, extraBeds: 2, beds: "4 спальни", area: "160 м²", amenities: ["Камин", "Панорамные окна", "2 санузла"], night: 520, weekend: 620, price: "от 520 BYN", badge: "Хит сезона", image: "assets/img/stay-lodge", imageAlt: "Гостиная с каменным камином и кожаными диванами" },
    { id: "piano", icon: "music", title: "Дом с роялем", text: "Амбар-лофт с роялем, винтовой лестницей и библиотекой. Любимая локация фотографов.", guests: 4, extraBeds: 2, beds: "2 спальни", area: "90 м²", amenities: ["Рояль", "Библиотека", "Лофт"], night: 300, weekend: 360, price: "от 300 BYN", image: "assets/img/stay-piano", imageAlt: "Деревянный лофт с роялем и старинной мебелью" },
    { id: "hunt", icon: "tree", title: "Охотничий дом", text: "Бревенчатые стены, кожаный диван, камин и тишина. Две спальни и терраса над водой.", guests: 4, beds: "2 спальни", area: "75 м²", amenities: ["Камин", "Терраса", "Мангал"], night: 260, weekend: 310, price: "от 260 BYN", image: "assets/img/stay-hunt", imageAlt: "Бревенчатая гостиная с камином и кожаным диваном" },
    { id: "shore", icon: "waves", title: "Дом у воды", text: "Маленький дом для двоих на самом берегу. Зимой — вид на заснеженный лёд, летом — свой причал.", guests: 2, extraBeds: 1, beds: "Кровать 180 см", area: "40 м²", amenities: ["Причал", "Печь", "Для двоих"], night: 190, weekend: 230, price: "от 190 BYN", image: "assets/img/stay-winter", imageAlt: "Дом на берегу среди заснеженных деревьев" }
  ],

  sections: [
    {
      type: "hero",
      variant: "cover",
      id: "top",
      eyebrow: "Усадьба «Кадр» · Браславские озёра",
      title: "Пять домов на озере",
      text: "",
      image: "assets/img/hero",
      imageAlt: "Человек на холме смотрит на дом на рассвете",
      list: [
        { text: "Лодж с камином", note: "до 10", href: "#services", service: "lodge" },
        { text: "Кирпичный дом", note: "до 8", href: "#services", service: "brick" },
        { text: "Дом с роялем", note: "до 6", href: "#services", service: "piano" },
        { text: "Охотничий дом", note: "до 4", href: "#services", service: "hunt" },
        { text: "Дом у воды", note: "до 3", href: "#services", service: "shore" }
      ],
      caption: "Сауна · Свадьбы · Съёмки"
    },

    {
      type: "stays",
      id: "services",
      variant: "rail",
      showNum: true,
      eyebrow: "В ролях",
      title: "Дома",
      subtitle: "Цена за дом за сутки. Бельё, дрова и завтрак-сет в холодильнике — включены.",
      perNight: "за сутки",
      weekendLabel: "Пт–Сб",
      buttonText: "Выбрать даты",
      buttonStyle: "light",
      note: "Цены — пример. Минимум 2 ночи в выходные летом."
    },

    {
      type: "extras",
      id: "extras",
      eyebrow: "Дополнительно",
      title: "Сауна, огонь и ужин",
      subtitle: "Добавьте к брони — посчитаем стоимость в форме.",
      addText: "К брони",
      addedText: "В брони",
      buttonStyle: "outline",
      items: [
        { id: "sauna", icon: "flame", title: "Финская сауна", short: "Сауна", text: "Сауна на 8 человек с видом на озеро, купель и полотенца. Три часа.", price: "120 BYN", unit: "за 3 часа", cost: 120, image: "assets/img/ex-banya", imageAlt: "Сауна с красной подсветкой" },
        { id: "oven", icon: "utensils", title: "Ужин из дровяной печи", short: "Ужин из печи", text: "Пицца, хлеб и запечённые овощи — готовим при вас на террасе.", price: "30 BYN", unit: "с гостя", cost: 30, per: "guest", image: "assets/img/ex-oven", imageAlt: "Пицца у открытой дровяной печи" },
        { id: "wine", icon: "gift", title: "Винный вечер", short: "Винный вечер", text: "Пять вин, сыры и рассказ сомелье у камина.", price: "40 BYN", unit: "с гостя", cost: 40, per: "guest", image: "assets/img/ex-wine", imageAlt: "Два бокала красного вина" },
        { id: "boat", icon: "waves", title: "Лодка на рассвете", short: "Лодка", text: "Деревянная лодка, термос кофе и туман над озером. Два часа.", price: "25 BYN", unit: "за лодку", cost: 25, image: "assets/img/ex-boats", imageAlt: "Лодки на туманном озере" }
      ]
    },

    {
      type: "programs",
      id: "events",
      eyebrow: "События",
      title: "Свадьбы, вечеринки, съёмки",
      subtitle: "Усадьба целиком — до 60 гостей на празднике и 30 с проживанием.",
      groupLabel: "События",
      priceLabel: "Стоимость",
      buttonText: "Обсудить",
      buttonStyle: "outline-light",
      items: [
        { id: "wedding", title: "Свадьба на закате", for: "До 60 гостей", items: ["Церемония на берегу", "Шатёр и банкет", "Все дома для гостей"], price: "от 4 500 BYN", badge: "Сезон май–сентябрь", image: "assets/img/ev-wedding", imageAlt: "Молодожёны на берегу на закате" },
        { id: "party", title: "Вечеринка или день рождения", for: "15–40 гостей", items: ["Лодж и терраса", "Диджей или живая музыка", "Сауна после полуночи"], price: "от 1 200 BYN", image: "assets/img/ev-party", imageAlt: "Друзья за столом с бокалами" },
        { id: "reception", title: "Фуршет и презентация", for: "20–60 гостей", items: ["Зал в амбаре", "Кейтеринг и бармен", "Свет и звук"], price: "от 1 500 BYN", image: "assets/img/ev-reception", imageAlt: "Официант с бокалами шампанского на подносе" },
        { id: "shoot", title: "Съёмка и фотосессия", for: "Кино, реклама, клипы", items: ["5 интерьеров и берег", "Гримёрка и парковка для техники", "Проживание для группы"], price: "от 250 BYN / час", image: "assets/img/ev-shoot", imageAlt: "Деревянная гостиная с камином и старинной мебелью" }
      ],
      note: "Стоимость зависит от даты и числа гостей (пример)."
    },

    {
      type: "gallery",
      id: "gallery",
      lightbox: true,
      eyebrow: "Раскадровка",
      title: "Кадры усадьбы",
      items: [
        { title: "Вечернее купание", image: "assets/img/g-swim" },
        { title: "Закат на причале", image: "assets/img/g-sunset" },
        { title: "Костёр", image: "assets/img/g-fire" },
        { title: "Угли", image: "assets/img/g-embers" },
        { title: "Туман", image: "assets/img/g-fog" },
        { title: "Осень на озере", image: "assets/img/g-autumn" },
        { title: "Камин в лодже", image: "assets/img/g-hearth" },
        { title: "Ночь на берегу", image: "assets/img/g-bonfire" }
      ]
    },

    {
      type: "reviews",
      id: "reviews",
      variant: "grid",
      title: "Рецензии",
      items: [
        { name: "Алина В.", car: "Свадьба, 45 гостей", rating: 5, date: "август", text: "Церемония на закате, как в фильме. Гости жили во всех пяти домах — никто не хотел уезжать в воскресенье." },
        { name: "Студия «Пример»", car: "Съёмка клипа, 2 дня", rating: 5, date: "март", text: "Пять разных интерьеров в одном месте, берег и туман по утрам. Хозяева помогли со светом и едой для группы." },
        { name: "Максим Д.", car: "Лодж с камином", rating: 5, date: "январь", text: "Камин, сауна, заснеженное озеро. Отмечали день рождения ввосьмером — лучшие выходные зимы." }
      ]
    },

    {
      type: "faq",
      id: "faq",
      title: "Вопросы",
      subtitle: "Не нашли ответ? Позвоните — на связи с 10 до 22.",
      items: [
        { q: "Можно снять усадьбу целиком?", a: "Да, все пять домов — до 30 гостей с проживанием, до 60 — на празднике. Выберите «События» в форме." },
        { q: "Как арендовать локацию для съёмки?", a: "Почасово от 250 BYN (пример), минимум 4 часа. Пришлите сценарий или референсы — предложим интерьеры и время с лучшим светом." },
        { q: "Сколько стоит предоплата?", a: "30% после подтверждения. Отмена за 14 дней — без удержаний, для свадеб — индивидуальные условия." },
        { q: "Можно шуметь после 23:00?", a: "В Лодже и амбаре — да, до 02:00. Остальные дома стоят далеко, соседей нет." },
        { q: "Можно с детьми и собакой?", a: "С детьми — да, есть кроватки и стульчики. С собакой — в Охотничьем доме и Доме у воды, 20 BYN за проживание." }
      ]
    },

    {
      type: "booking",
      id: "booking",
      mode: "stay",
      title: "Бронирование",
      subtitle: "Выберите дом или событие и даты — перезвоним в течение часа и подтвердим.",
      endpoint: "",
      phoneMask: "+375 (__) ___-__-__",
      minNights: 1,
      maxNights: 14,
      maxDaysAhead: 300,
      groupMax: 60,
      labels: {
        service: "Дом или событие", servicePlaceholder: "Выберите дом", serviceOther: "Нужна консультация",
        date: "Заезд / дата", dateout: "Выезд", adults: "Взрослые", kids: "Дети", extras: "Дополнительно", comment: "Комментарий"
      },
      estimateNote: "Расчёт предварительный. Предоплата — 30%.",
      commentPlaceholder: "Например: свадьба на 40 гостей или съёмка на 6 часов",
      consentText: "Согласен(на) на обработку персональных данных",
      submitText: "Отправить заявку",
      successTitle: "Снято!",
      successText: "Заявка у нас. Перезвоним в течение часа и подтвердим даты.",
      perks: ["Перезвоним в течение часа", "Предоплата 30%", "Отмена за 14 дней — без удержаний"]
    },

    {
      type: "route",
      id: "route",
      title: "Дорога",
      distance: "230 км",
      distanceNote: "от Минска · 3 часа по трассе Р3",
      coords: "55.6390, 27.0420",
      links: [
        { text: "Яндекс Навигатор", href: "https://yandex.by/maps/?pt=27.042,55.639&z=13&l=map", icon: "navigation" },
        { text: "Google Карты", href: "https://maps.google.com/?q=55.639,27.042", icon: "pin" }
      ],
      items: [
        { icon: "car", title: "На машине", meta: "3 часа", text: "Через Докшицы и Глубокое по Р3 до Браслава, дальше 9 км по указателям «Кадр»." },
        { icon: "bus", title: "На автобусе", meta: "4 часа", text: "С автовокзала «Центральный» до Браслава, встретим на машине — 15 минут." },
        { icon: "users", title: "Трансфер для гостей", meta: "для событий", text: "Автобус на 30 мест из Минска и обратно — от 600 BYN (пример)." }
      ],
      note: "Координаты и маршрут — пример."
    },

    { type: "contacts", id: "contacts", title: "Контакты" }
  ],

  footer: {
    columns: [
      { title: "Дома", links: "services" },
      { title: "Усадьба", links: [
        { text: "Сауна и ужин", href: "#extras" },
        { text: "События и съёмки", href: "#events" },
        { text: "Кадры", href: "#gallery" },
        { text: "Вопросы", href: "#faq" },
        { text: "Дорога", href: "#route" }
      ]}
    ],
    legal: ["ООО «Пример» (демо-реквизиты)", "УНП 000000000", "Агроэкоусадьба, свидетельство № 000 (пример)"],
    copyright: "Усадьба «Кадр».",
    bigText: "КАДР",
    demoNote: "Демонстрационный шаблон сайта. Название, контакты, координаты, цены и отзывы вымышлены. Фото: CC0 / Public Domain."
  }
};
