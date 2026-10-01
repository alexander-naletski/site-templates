# Как сделать шаблон для другой ниши (стоматология, клиника, усадьба, кафе…)

Движок (`core/`) универсален: страница собирается из **блоков** по описанию в `config.js`.
Новая ниша = копия папки + свой `config.js`, `theme.css` и фото.

```bash
cp -r sites/sto sites/dentistry
# правим: sites/dentistry/config.js, theme.css, assets/img/*
```

Папка `core/` должна оставаться одинаковой во всех шаблонах. Если улучшаете движок — копируйте обновлённую `core/` во все сайты
(`for d in sites/*/; do [ -d "$d/core" ] && cp -r sites/sto/core "$d"; done`).

## Типы блоков (`sections[].type`)

| type | Назначение | Основные поля |
|---|---|---|
| `hero` | Слайдер-баннер вверху | `slides[]: eyebrow, title, text, image, imageAlt, bg, buttons[] {text, href, style: primary/ghost/soft, service}`, `autoplay` (мс) |
| `features` | 4 карточки-преимущества с иконками | `items[]: icon, title, text` |
| `services` | Карточки услуг из общего `services[]` | `title, subtitle, buttonText` |
| `prices` | Прайс с вкладками | `categories[]: name, rows[[название, цена]]`, `note`, `buttonText` |
| `banner` | Широкое фото с заголовком | `image, eyebrow, title, buttonText, buttonHref` |
| `about` | Фото + текст + чек-лист + цифры | `image, title, text, list[], stats[]: value, suffix, label` |
| `steps` | Этапы работы | `items[]: title, text` |
| `gallery` | Работы: «до/после» (слайдер) или обычные фото | `items[]: title, text, before+after` **или** `image` |
| `reviews` | Карусель отзывов | `items[]: name, car (подпись), rating, date, text` |
| `faq` | Аккордеон вопросов | `items[]: q, a` |
| `booking` | Форма записи | `endpoint, phoneMask, timeSlots, closedWeekdays, maxDaysAhead, perks[]…` |
| `contacts` | Контакты + карта | берёт данные из `contacts` |
| `text` | Произвольный текст (SEO) | `title, paragraphs[]` |
| `team` | Специалисты (врачи, мастера) | `items[]: name, role, exp, text, tags[], service, image` (без `image` — монограмма); на ≤1100 px — лента со стрелками |
| `calc` | Калькулятор стоимости отдельным блоком (или `calc` внутри `hero` с `variant: "centered"`) | `items[]: label, price, unit, max, from, service`, `terms[]` (мес. рассрочки), `termDefault` |
| `marquee`, `statement` | Бегущая строка / крупный манифест | `items[]` / `text, muted` |
| `programs` | Программы / пакеты (чек-апы, абонементы, тарифы) | `items[]: id, title, for, items[], price, oldPrice, time, badge, icon, image, featured, service`; опции блока `variant, rail: true, priceLabel, buttonText, buttonStyle, note, groupLabel`. Программы с `id` (без `service`) автоматически попадают в форму записи отдельной группой `<optgroup>` |
| `links` | Огромный список ссылок со стрелками | `items[]: text, note, href, service`, `icon` |
| `band` | Цветная полоса: заголовок + текст + ссылка | `tone: accent / dark / soft`, `title, text, linkText, href, service` |
| `licenses` | Лицензии и документы (с пометкой «пример» в демо) | `items[]: icon, title, text`, `note` |

Новые опции движка 1.2.0: `hero.variant: "collage"` (`images[2], side`), `header.announce` + `announceHref` (полоса-объявление), `services[].badge` («хит», «новинка»), `tiles`-опции `showLabel / showText / linkText`, в `booking` — `carField: false` (убрать поле «автомобиль»), `carOptional: true`, `carError`, подпись поля — `labels.car`.

Новые опции движка 1.3.0: `hero.variant: "search"` — фото + виджет быстрой записи (`finder: {title, serviceLabel, servicePlaceholder, dateLabel, timeLabel, timeAny, time: false, buttonText, note}`; кнопка переносит выбор в форму `booking`), блоки `programs`, `links`, `band`, `licenses`, 14 медицинских иконок (`search, stethoscope, pulse, flask, brain, bone, pill, ear, female, lungs, file, video, home, activity`).

Любой блок можно скрыть (`hidden: true`) или переставить.

## Подсказки по нишам
- **Стоматология / клиника:** `services` → направления (терапия, имплантация…), `prices` → прайс по отделениям, `gallery` → «до/после» улыбок, поле `car` в форме уберите (`carField: false`) или переименуйте через `labels.car` + `carOptional: true` (например, «кто пациент»); врачей — блоком `team`. Готовые примеры: `sites/dent-1 … dent-5`.
- **Медицинский центр / клиника:** `services` → направления (терапевт, педиатр, УЗИ…), `programs` → чек-апы или годовые программы, `licenses` → лицензия Минздрава и документы, `team` → врачи; в подвале и под программами — «Имеются противопоказания, необходима консультация специалиста». Готовые примеры: `sites/clinic-1 … clinic-5`.
- **Усадьба:** `services` → домики/баня/беседки, `prices` → тарифы по сезонам, `gallery` → обычные фото (`image`), `booking` → даты заезда.
- **Кафе/ресторан:** `prices` → меню по категориям, `services` → банкеты/доставка/кейтеринг, `gallery` → интерьер и блюда.
