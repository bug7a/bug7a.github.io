/* Bismillah */

/*

bug7a.github.io - The content of the page in English. (index.html)
- Loaded before js/site.js. The Turkish page (tr/index.html) loads js/content-tr.js: the same keys.
- The pictures are relative to the root of the site (tr/index.html has <base href="../">).

*/

"use strict";

// *** SITE CONTENT: (Edit the page here.)
const SITE = {

    lang: "en",
    // The link to the page in the other language (top bar). url: relative to the root of the site.
    otherLanguage: { code: "tr", text: "TR", title: "Türkçe", url: "tr/" },

    name: "Buğra Özden",
    role: "Freelance Web & App Developer",

    // The words typed in the hero, one after another.
    focusPrefix: "Building",
    focus: ["interactive web apps", "custom admin panels", "dashboards", "advanced web forms"],

    accounts: [
        { text: "GitHub", url: "https://github.com/bug7a/" },
        { text: "LinkedIn", url: "https://www.linkedin.com/in/bugra-ozden/" },
        { text: "YouTube", url: "https://www.youtube.com/c/bugraozden" },
        { text: "Udemy", url: "https://www.udemy.com/user/bugra-ozden/" },
    ],

    services: [
        {
            title: "Custom Admin Panels and Dashboards",
            texts: [
                "A management panel made for your business: orders, customers, products, reports and live device data on one screen. Only the pages you need, in your own colors.",
                "Charts, data tables, filters and exports are ready to use, and new modules can be added later without rewriting the panel. It runs in the browser, with nothing to install.",
            ],
            images: ["img/service-admin1.jpg", "img/service-admin2.jpg", "img/service-admin3.jpg", "img/service-admin4.jpg"],
            links: [
                { text: "Web page", url: "https://bug7a.github.io/ozden-panel/", primary: 1 },
                { text: "Live example", url: "https://bug7a.github.io/ozden-panel/demo/" },
            ],
        },
        {
            title: "Advanced Web Forms",
            texts: [
                "Forms that do more than collect text: appointments, orders, event tickets, job applications, support requests and customer feedback.",
                "Every field checks itself while the visitor types, and the send button shows what is still missing. The answers come to your e-mail or database, and the form can be embedded in any website.",
            ],
            images: ["img/service-form1.jpg", "img/service-form2.jpg", "img/service-form3.jpg", "img/service-form4.jpg"],
            links: [
                { text: "Web page", url: "https://bug7a.github.io/ozden-forms/", primary: 1 },
                { text: "Live example", section: "contact" }, // The contact form at the bottom of this page
            ],
        },
        {
            title: "easyPWA",
            hidden: 1, // HIDDEN for now: remove this line to show it again.
            texts: [
                "Turns your website or web app into an app that installs on phones and computers, without the App Store or Google Play.",
                "It opens from the home screen without the browser bar, shows your own loading screen and tells the user when there is no internet connection. When you update the site, the app is updated too.",
            ],
            images: [],
            // No pictures: these tiles are drawn in the place of the gallery. (icons: Site.FEATURE_ICONS in site.js)
            features: [
                { icon: "install", text: "Installs on phones and computers, without an app store" },
                { icon: "offline", text: "A clear page when there is no internet, or a site that works offline" },
                { icon: "launch", text: "Your own launch screen, icon and colors" },
                { icon: "banner", text: "An install banner, or your own install button" },
                { icon: "file", text: "One file added to your site, no library" },
                { icon: "update", text: "Updates with your site, nothing to publish again" },
            ],
            links: [
                { text: "Live example", url: "https://bug7a.github.io/pwa/", primary: 1 },
            ],
        },
    ],

    projects: [
        {
            title: "Kodlama: Kod Yazma Eğitimi",
            texts: [
                "Bu eğitim uygulaması; çocuklara, gerçek bir programlama dili (JavaScript) kullanarak, algoritma geliştirme ve problem çözme deneyimi kazandırmak için tasarlanmıştır.",
                "Eğlenceli ve daha akılda kalıcı olması için; bulmaca oyunu tarzında simülasyonlar ile, yazılım geliştirmenin temellerini öğretir.",
            ],
            video: "https://www.youtube.com/embed/tP0VKKtMyPE",
            images: [],
            links: [
                { text: "İnternet Sitesi", url: "https://bug7a.github.io/kodlama/", primary: 1 },
                { text: "Eğitim", url: "https://bug7a.github.io/kodlama-egitimi/" },
                { text: "Örnek Projeler", url: "https://github.com/bug7a/basicjs-turkce/" },
            ],
        },
        {
            title: "The Fallen Kingdoms",
            texts: [
                "A brand-new board game that combines turn-based strategy and card-drafting mechanics to provide an enjoyable experience with friends! Build your kingdom, defeat your rivals, and seize the throne!",
                "This is a party game and supports <b>\"Remote Play Together\"</b> on Steam.",
            ],
            images: ["img/s1.jpg", "img/s5.jpg", "img/s7.jpg", "img/s2.jpg"],
            links: [
                { text: "See on Steam", url: "https://store.steampowered.com/app/2923920?utm_source=bugraozden", primary: 1 },
            ],
        },
        {
            title: "Personal Expense Book",
            texts: [
                "Set a budget and track your spending by category.",
                "This mobile application; It has been designed with simplicity, functionality and fast usability in mind.",
            ],
            images: ["img/expense.jpg"],
            links: [
                { text: "Preview", url: "https://bug7a.github.io/expense/", primary: 1 },
            ],
        },
        {
            title: "Closed-Loop Marketing",
            texts: [
                "A mobile (iOS) Closed-Loop Marketing (CLM) app I developed for pharmaceutical sales teams. More than 500 medical representatives at Roche, Novo Nordisk and Boehringer Ingelheim used it on their doctor visits.",
                "Presentations to doctors, visit data and the representatives' training all live in one app.",
            ],
            images: ["img/clm1.jpg", "img/clm2.jpg", "img/mobile4.jpg", "img/mobile2.jpg", "img/mobile13.jpg", "img/mobile6.jpg", "img/mobile9.jpg"],
            links: [],
        },
    ],

    // WHY: The first two are drawn big. Keep the rest a multiple of 12 / 4 / 3 / 2 columns (12).
    moreProjects: [
        { text: "Mobile App", image: "img/notes.jpg" },
        { text: "Mobile Games", image: "img/mobile-game.jpg" },
        { text: "App content management", image: "img/telefun5.jpg" },
        { text: "Reusable components", image: "img/components.jpg", url: "https://bug7a.github.io/cordova-mobile-app-ui-template/" },
        { text: "API development", image: "img/component.jpg", url: "https://azimutportfoy.com/fon/lzv/" },
        { text: "Kiosk App", image: "img/mob1.jpg" },
        { text: "Mobile app content management", image: "img/admin1.jpg" },
        { text: "Interactive web", image: "img/table.jpg" },
        { text: "Survey module", image: "img/ekr.jpg" },
        { text: "In-App Messaging module", image: "img/message.jpg" },
        { text: "In-App Searching module", image: "img/novokampus.jpg" },
        { text: "Self-updatable web site", image: "img/tvshows1.jpg" },
        { text: "Mobile Game", image: "img/mobile-game2.jpg" },
        { text: "Desktop apps", image: "img/desktop.jpg" },
    ],

    openSource: [
        { text: "basic.js — UI Library", image: "img/logo/basicjs.svg", url: "https://bug7a.github.io/basic.js/" },
        { text: "basic.js — UI Components", image: "img/logo/basicui.svg", url: "https://bug7a.github.io/js-components/" },
        { text: "basic.js — App Templates", image: "img/logo/basicjs-templates.svg", url: "https://github.com/bug7a/js-components" },
    ],

    // WHY: The address is an image and is written by code, so it is not read by spam robots.
    emailImage: "img/email.png",
    emailUser: "bugra.ozden",
    emailHost: "gmail.com",

    contactTitle: "Have a project in mind?",
    contactText: "Tell me what you need with the form, or write to me directly. I will get back to you as soon as possible.<br><br>I work remotely, with clients in Istanbul, across Türkiye and worldwide.",

    // CONTACT FORM: Sent as JSON to the mail service. (The same service as __projects/contact-form)
    formServiceUrl: "https://www.hostelchillsteps.com/service/send-form-mail.php",
    formName: "website-contact",        // Which form is this? (Written by the mail service.)
    formMailTitle: "Website Contact Form", // Title on top of the mail.
    formTimeout: 15000,                 // ms

    // A question of the contact form, above the subject: what the message is about. (Radio buttons)
    contactTopicTitle: "WHAT IS IT ABOUT?",
    contactTopics: [
        { value: "admin-panel", text: "Admin panel or dashboard" },
        { value: "web-form", text: "Advanced web form" },
        { value: "pwa", text: "Installable web app (PWA)", hidden: 1 }, // HIDDEN for now: remove "hidden: 1" to show it again.
        { value: "other", text: "Something else" },
    ],
    contactTopicDefault: "other",       // Selected when the form opens (and after it is sent)

    footerText: "Written with basic.js",
    footerUrl: "https://bug7a.github.io/basic.js/",

    // *** TEXTS OF THE PAGE: (Buttons, titles, the contact form...)
    ui: {
        navServices: "Services",
        navProjects: "Projects",
        navOpenSource: "Open Source",
        navContact: "Contact",
        heroServicesButton: "View services",
        heroContactButton: "Get in touch",

        services: "Services",
        projects: "Projects",
        moreProjects: "More Projects",
        openSource: "Open Source",
        contact: "Contact",

        emailCardTitle: "E-MAIL",
        emailAlt: "E-mail address",
        videoTitle: "Video",
        backToTop: "Back to top ↑",

        form: {
            firstName: "FIRST NAME",
            firstNamePlaceholder: "Jack",
            lastName: "LAST NAME",
            lastNamePlaceholder: "Brown",
            email: "YOUR EMAIL",
            emailPlaceholder: "example@site.com",
            emailWarning: "Invalid email format",
            phone: "PHONE NUMBER",
            phoneWarning: "Invalid phone number format",
            subject: "SUBJECT",
            subjectPlaceholder: "What is your message about?",
            message: "MESSAGE",
            messagePlaceholder: "Tell me about your project: what you need, and when.",
            messageWarning: "The message must be longer than 20 characters",
            lengthText: "length: ",
            required: "Required",
            sendButton: "SEND MESSAGE",
            missingEntry: "{{count}} missing entry",
            missingEntries: "{{count}} missing entries",
            emptyWarning: "<b>{{name}}</b> can't be empty",
            errorWarning: "<b>{{name}}</b> is not valid",
            passiveHint: "Please fill in the missing fields to send the message.",
            successMessage: "Thank you, your message was sent.<br>I will get back to you as soon as possible.",
            successButton: "OKAY",
            errorMessage: "The message could not be sent.<br>Please try again, or send an e-mail.",
            errorButton: "CLOSE",
        },

        // The titles of the fields in the mail
        mail: {
            firstName: "FIRST NAME",
            lastName: "LAST NAME",
            email: "E-MAIL",
            phone: "PHONE",
            topic: "TOPIC",
            subject: "SUBJECT",
            message: "MESSAGE",
        },
    },

};
