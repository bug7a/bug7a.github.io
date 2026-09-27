# webpage-bugra (v3)

The personal web page of Buğra Özden (a new version of <https://bug7a.github.io/>), written with **basic.js**.
It has the same content as `webpage-bugra-v2`, with a new, dark and animated design.
Everything on the page is created with code: no HTML markup, no CSS file to author, no build step.

## Run it

Open `index.html` in a browser, or serve the folder (VS Code Live Server, port 5505).
The folder is self contained (it has its own copy of the library), so it can be deployed as it is
(for example to GitHub Pages). The only outside file is the Plus Jakarta Sans font from Google Fonts;
without internet the page uses the Open Sans of basic.js.

## Files

| Path | Contents |
|---|---|
| `index.html` | The English page (`https://bug7a.github.io/`): its SEO part (`<head>`, JSON-LD, `<noscript>`), the files it loads. |
| `tr/index.html` | The Turkish page (`https://bug7a.github.io/tr/`): the same, in Turkish. `<base href="../">`, so it uses the files of the root (nothing is copied into `tr/`). |
| `js/site.js` | The code of the page (`STYLE`, `Site.*`, `start()`). The same file for both languages. |
| `js/content-en.js`, `js/content-tr.js` | The content and the texts of each language (`SITE`). The same keys in both. |
| `basic/` | A copy of basic.js v26.09.18 (`basic.min.js`, `basic.min.css`, `scroll-bar.min.js`, fonts). |
| `img/` | The pictures of the projects and services, the open-source logos, the e-mail picture, the icon, the form icons (`form/`) and the link preview pictures (`og-image.jpg`, `og-image-tr.jpg`). |
| `comp/` | Copies of the js-components used by the contact form (`Form`, `InputB`… and `RadioButton`). |
| `robots.txt`, `sitemap.xml` | For search engines (see SEO). |

The pages are `index.html`, not `.htm`, because the live site at this address already opens with `index.html`
(`https://bug7a.github.io/index.htm` is 404). A new name would leave the old `index.html` in the repository as the page of `/`.

## Editing the page

- **`SITE`** (`js/content-en.js`, `js/content-tr.js`): the content. Name, role, the typed words of the hero
  (`focusPrefix`, `focus`), accounts, services, projects (title, texts, video, images, links), more projects,
  open-source libraries, e-mail, the contact form, the footer, and `ui`: every text of the page itself
  (menu, buttons, section titles, the fields and messages of the form, the titles of the fields in the mail).
  A new project is one more object in the `projects` list; it is drawn by itself. **Change both languages.**
  `otherLanguage` is the "TR" / "EN" link of the top bar.
  `hidden: 1` on a service or a contact topic hides it for now (it is not drawn, `Site.shown()`).
  **easyPWA is hidden** now: to show it again, remove `hidden: 1` from the service and the "pwa" topic in
  both content files, put its `Service` back into the JSON-LD of both pages and take its part in
  `<noscript>` out of the comment.
- **`STYLE`** (`js/site.js`): the look. Colors, gradients, font, the width of the column and the size of the top bar.

The page code is under `Site.*` (`Site.createProject`, `Site.layout`…). It is one object, not global
functions, because a global name like `createButton` would break basic.js (`Button()`). The code has
no texts of its own: they all come from `SITE`.

Istanbul is written as the place of the clients, not of the person (the work is remote):
"for clients in Istanbul" / "İstanbul'daki müşteriler", never "in Istanbul" / "İstanbul'da yaşıyorum".

## The parts of the page

| Part | What it does |
|---|---|
| Top bar | A floating glass bar. It gets its background after the top of the page, and the link of the section on the screen is lit. A thin gradient line shows how far the page is scrolled. The "TR" / "EN" link goes to the other language (a real `<a>`). On a small screen there are only that link and a "Contact" button. |
| Hero | Fills the screen: slowly moving lights that follow the mouse a little, grid lines, the role in a pill, the name, the typed words, buttons and accounts. It goes up slower and fades while scrolling. |
| Marquee | Two endless rows of every project picture. They slow down under the mouse; a click opens the picture. |
| Projects | One card for every project: video or a gallery (a big picture on a blurred copy of itself, small pictures under it) and the texts. The cards change sides on a wide screen, and are one under the other on a narrow one. A light follows the mouse on the card. |
| More Projects | A grid: the first two pictures are big, the rest are 4, 3 or 2 columns. A picture with a url opens it (↗), the others open in the lightbox. |
| Open Source | Cards with the logo, the name and the address. |
| Contact | A card: a short text, the e-mail card and the accounts on one side, the contact form (js-components `Form`, in `comp/`) on the other. Then the footer. |
| Lightbox | The pictures in full screen. Arrows, the arrow keys and swipe change the picture; Esc or a click on the background closes it. |

## How it is built

- `page` never scrolls (basic.css), so all the content is in one scrolling Box, and the top bar is
  drawn over it. `basic/scroll-bar.js` draws the scroll bar instead of the browser.
- `Site.main` is a full-width `VGroup`. The hero and the marquee are full width; every section is a
  centered column (`Site.column()`), whose width is set in `Site.layout()`.
- `Site.layout()` sets the sizes that the flex layout can not: the column width, the side of the project
  media, the tile widths of the grids, the size of the name and the titles. It runs on every resize.
- Motion: the loops (lights, marquee, caret, pulse) use the Web Animations API (`elem.animate`), the
  sections come in with an `IntersectionObserver` (`Site.reveal()`). With the system setting
  "reduce motion", nothing moves and everything is shown at once.
- The e-mail is a picture and the address is put together in code, so spam robots do not read it.

## SEO

The page is drawn by JavaScript and `<body>` has no markup, so everything that search engines and link
previews (WhatsApp, LinkedIn, X) read is written in the HTML by hand. **When the content in `SITE` changes,
update these too:**

| Where | What |
|---|---|
| `<head>` | `<title>`, description, keywords, canonical, `hreflang` (the two languages) and the Open Graph / Twitter tags of the link preview. The code does not change the title. In both pages. |
| `<head>` JSON-LD | schema.org data: the person (the accounts in `sameAs`, no address: the work is remote), the web site and the three services (`areaServed`: Istanbul, Türkiye, worldwide). The e-mail is not written there (spam). |
| `<body>` `<noscript>` | The content as plain HTML (h1, h2, h3, links) for the browsers and robots that do not run JavaScript. |
| `img/og-image.jpg`, `img/og-image-tr.jpg` | The pictures of the link preview (1200 x 630): the hero of each page, taken with "reduce motion" on, so the typed word is whole. |

| `robots.txt`, `sitemap.xml` | For the root of the site (`https://bug7a.github.io/`). The sitemap has both pages with their `hreflang` links. Change `lastmod` after a big change. |

The code also gives ARIA roles to the drawn page (`Site.addSemantics()`): the name is the h1, the section
titles are h2 and the card titles are h3; the top bar is the navigation, `Site.main` is the main part.
