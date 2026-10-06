/* =========================================================================
   EKAIVA — SITE SETTINGS  (edit this file to change contact details, links,
   social profiles, videos and analytics. Every page reads from here.)

   Anything you leave as "" (empty) is simply hidden on the website, so the
   site never shows a dead button. Fill things in as you get them.
   ========================================================================= */
window.EKAIVA_CONFIG = {

  brand: {
    name: "Ekaiva",
    tagline: "Swaad hai toh baat hai..",
    shortDescription:
      "Ekaiva makes everyday masalas and pure spice powders - Kitchen King, Garam Masala, Chat Masala, Kashmiri Chilli Powder and more. Available on Swiggy Instamart."
  },

  /* Your website address, WITHOUT a trailing slash. Example: "https://www.yourdomain.com"
     Used for share previews and Google. Leave "" until your domain is connected. */
  siteUrl: "https://ekaivastore.com",

  contact: {
    email: "ekaivaspices@gmail.com",   // contact form messages are sent here
    phone: "",          // e.g. "+91 98XXXXXXXX"  (shown as a call link)
    whatsapp: "917208607821",   // digits only, with country code 91  (switches on the WhatsApp buttons and ordering)
    hours: "",          // e.g. "Mon-Sat, 10 am - 6 pm"
    addressLines: [
      "Shop No 5, Hinglaaj CHS Ltd, Modi Patel Road,",
      "Bhayander West, Mira Bhayander,",
      "Maharashtra - 401101"
    ],
    mapQuery: "Ekaiva - Best spices and masala, Shop No 5, Modi Patel Road, Bhayandar West, Mira Bhayandar, Maharashtra 401101"
  },

  /* Verify a visitor's email (a one-time link) before they can send a message on
     the Contact page. Off by default and safe to leave off - the contact form
     works normally either way. Turn it on only after you've done the one-time
     Firebase setup in README-SETUP-GUIDE.md ("Email verification" section), then
     set enabled to true and fill in the firebase keys from your Firebase project. */
  verification: {
    enabled: true,
    firebase: {
      apiKey: "AIzaSyDhTAhs7xu_HR05z8-_hsTQKSwmOEEst_0",
      authDomain: "ekaiva-ac127.firebaseapp.com",
      projectId: "ekaiva-ac127",
      appId: "1:114841781933:web:1d544f93c30d9036766824"
    }
  },

  /* From your FSSAI registration certificate. */
  fssai: {
    number: "21522020001385",
    validTill: "09 Dec 2028"      // from your renewed certificate (issued 29-09-2026). Update when you renew.
  },

  /* WhatsApp ordering. Visitors add products to an order, type their name and address, and the
     site opens WhatsApp with the whole order written out, addressed to the number above.
     Nothing is paid on the website, and an order is only accepted when you reply and confirm.
     It switches on automatically once contact.whatsapp has a number. To turn it off: enabled: false.
     To hide one product from ordering: orderable: false in products-data.js. */
  ordering: {
    enabled: true,
    deliveryNote: "",     // e.g. "We deliver in Mira Bhayander and nearby areas. Delivery charges, if any, are confirmed on WhatsApp."
    paymentNote: "",      // e.g. "You can pay by UPI or cash on delivery."
    minOrder: 0,          // minimum order value in rupees, 0 = no minimum
    maxQty: 20            // most packs of one product in a single order
  },

  /* Full links, e.g. "https://www.instagram.com/yourhandle". Empty = hidden. */
  social: {
    instagram: "https://www.instagram.com/ekaivastore",
    facebook: "",
    youtube: "",
    x: ""
  },

  /* Where people can buy.
     - instamartHome: opens Swiggy Instamart when a product has no direct link yet.
     - Put each product's own Instamart / Amazon link inside js/products-data.js.   */
  buy: {
    instamartHome: "https://instamart.in/search?custom_back=true&query=Ekaiva",
    amazonStore: ""     // optional: your Amazon brand-store link
  },

  /* Optional videos (leave the list empty to hide the video section).
     1) Upload the file to the "images/videos" folder and use e.g. { title: "...", file: "images/videos/my-video.mp4" }
     2) Or use a YouTube video: { title: "...", youtube: "VIDEO_ID" }
     heroVideo: a short silent loop (under ~6 MB) shown behind the home page headline. */
  heroVideo: "",
  videos: [
    // { title: "Fruit chaat in two minutes", file: "images/videos/fruit-chaat.mp4" },
    // { title: "Our story", youtube: "dQw4w9WgXcQ" }
  ],

  /* Optional: Google Analytics measurement ID such as "G-XXXXXXXXXX". */
  analyticsId: "",

  /* The spice-burst loading animation: shown once per visit. Set false to turn it off. */
  preloader: true
};
