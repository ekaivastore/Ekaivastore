/* =========================================================================
   EKAIVA — PRODUCTS  (edit this file to change anything about a product)

   buy.instamart : paste the product's own Swiggy Instamart link here.
                   If it's empty and onInstamart is true, the button opens Instamart's
                   home page and asks people to search "Ekaiva".
   buy.amazon    : optional Amazon link (hidden when empty).
   onInstamart   : true only for products that are really live on Instamart.
   mrp           : price printed on the pack in rupees (or null to hide).
   images        : how many photos are in images/products/<folder>/  (1.webp, 2.webp ...)
                   Photo #1 is the transparent front-of-pack shot used on cards.
   category      : "blend" (masala blends) or "pure" (pure spice powders)
   uses          : used by the "Shop by use" tiles: sabzi, chaat, rice, curry
   price         : OPTIONAL. Price per pack for WhatsApp orders, in rupees. If you leave it out, the
                   mrp is used. If both are missing, the order says "price to be confirmed".
   orderable     : OPTIONAL. Set to false to hide the "Add to order" button for one product.
   ========================================================================= */
window.EKAIVA_PRODUCTS = [
  {
    slug: "kitchen-king", folder: "kitchen-king",
    name: "Kitchen King Masala", hindi: "किचन किंग मसाला",
    category: "blend", weight: "100 g", mrp: 96, images: 6, featured: true, onInstamart: true,
    uses: ["sabzi", "curry"],
    tagline: "One blend for everyday sabzi",
    description: "A versatile masala blend for everyday cooking. Stir it into vegetable sabzis, paneer dishes and gravies for a rounded, full-bodied masala flavour.",
    ideas: ["Mixed vegetable sabzi", "Paneer bhurji or paneer sabzi", "Quick masala gravy for boiled eggs or potatoes"],
    buy: { instamart: "", amazon: "" }
  },
  {
    slug: "royal-garam-masala", folder: "royal-garam-masala",
    name: "Royal Garam Masala", hindi: "रॉयल गरम मसाला",
    category: "blend", weight: "100 g", mrp: 110, images: 6, featured: true, onInstamart: true,
    uses: ["curry", "rice"],
    tagline: "The classic finishing blend",
    description: "A warm, aromatic garam masala for curries, dals, rice dishes and marinades. Add it towards the end of cooking so the aroma stays bright.",
    ideas: ["Finish a dal or rajma", "Add depth to chicken or paneer curry", "Season pulao and masala rice"],
    buy: { instamart: "", amazon: "" }
  },
  {
    slug: "royal-chat-masala", folder: "royal-chat-masala",
    name: "Royal Chat Masala", hindi: "रॉयल चाट मसाला",
    category: "blend", weight: "100 g", mrp: 88, images: 6, featured: true, onInstamart: true,
    uses: ["chaat"],
    tagline: "Tangy, savoury, sprinkle-on flavour",
    description: "A tangy chaat seasoning for fruit chaat, sev puri, papdi chaat, salads, raita and buttermilk. A pinch lifts almost anything.",
    ideas: ["Fruit chaat", "Sprinkle on raita, cucumber or sprouts salad", "Masala chaas and buttermilk"],
    buy: { instamart: "", amazon: "" }
  },
  {
    slug: "kashmiri-chilli-powder", folder: "kashmiri-chilli-powder",
    name: "Kashmiri Chilli Powder", hindi: "कश्मीरी मिर्च पावडर",
    category: "pure", weight: "100 g", mrp: 138, images: 6, featured: true, onInstamart: true,
    uses: ["curry"],
    tagline: "Vibrant red colour, gentle heat",
    description: "Kashmiri-style red chilli powder, known for its rich red colour and moderate heat. Use it to give curries, tandoori marinades and tadkas a deep red colour.",
    ideas: ["Red colour for curries and gravies", "Tandoori and tikka marinades", "Tadka for dal and sambar"],
    buy: { instamart: "", amazon: "" }
  },
  {
    slug: "biryani-masala", folder: "biryani-masala",
    name: "Biryani Masala", hindi: "बिर्याणी मसाला",
    category: "blend", weight: "100 g", mrp: null, images: 6, featured: false, onInstamart: false,
    uses: ["rice"],
    tagline: "For biryani, pulao and layered rice",
    description: "A spice blend made for biryani, pulao and other layered rice dishes. Use it in the marinade and between the layers.",
    ideas: ["Veg or chicken biryani", "Tawa pulao", "Masala rice with leftover vegetables"],
    buy: { instamart: "", amazon: "" }
  },
  {
    slug: "chole-masala", folder: "chole-masala",
    name: "Chole Masala", hindi: "छोले मसाला",
    category: "blend", weight: "100 g", mrp: null, images: 5, featured: false, onInstamart: false,
    uses: ["curry"],
    tagline: "For a proper plate of chole",
    description: "A dark, tangy-spiced blend for chole and chana masala. Use it with onion-tomato gravy for the classic taste.",
    ideas: ["Chole bhature", "Chana masala with rice or kulcha", "Spiced chickpea salad"],
    buy: { instamart: "", amazon: "" }
  },
  {
    slug: "paneer-masala", folder: "paneer-masala",
    name: "Paneer Masala", hindi: "पनीर मसाला",
    category: "blend", weight: "100 g", mrp: null, images: 5, featured: false, onInstamart: false,
    uses: ["sabzi", "curry"],
    tagline: "For paneer sabzis and gravies",
    description: "A masala blend made for paneer. Use it for rich, restaurant-style paneer gravies and dry paneer sabzis.",
    ideas: ["Paneer butter masala", "Kadai paneer", "Dry paneer tawa fry"],
    buy: { instamart: "", amazon: "" }
  },
  {
    slug: "turmeric-powder", folder: "turmeric-powder",
    name: "Turmeric Powder", hindi: "हळदी पावडर",
    category: "pure", weight: "100 g", mrp: null, images: 6, featured: false, onInstamart: false,
    uses: ["sabzi", "curry"],
    tagline: "Haldi for everyday cooking",
    description: "Turmeric (haldi) powder for the daily tadka, dals, sabzis and curries. Also used in traditional haldi doodh.",
    ideas: ["Dal and khichdi", "Every sabzi's first spice", "Haldi doodh"],
    buy: { instamart: "", amazon: "" }
  },
  {
    slug: "coriander-masala", folder: "coriander-masala",
    name: "Coriander Powder", hindi: "धनिया पावडर",
    category: "pure", weight: "100 g", mrp: null, images: 6, featured: false, onInstamart: false,
    uses: ["sabzi", "curry"],
    tagline: "The everyday base of Indian curries",
    description: "Coriander (dhania) powder, a staple base spice for curries, gravies, dals and dry sabzis.",
    ideas: ["Base for onion-tomato gravies", "Dry sabzis like bhindi or aloo", "Marinades"],
    buy: { instamart: "", amazon: "" }
  }
];

window.EKAIVA_USES = [
  { id: "sabzi", title: "Everyday sabzi", hindi: "रोज़ की सब्ज़ी", text: "Vegetable and paneer dishes" },
  { id: "chaat", title: "Chaat & snacks", hindi: "चाट", text: "Fruit chaat, salads, raita" },
  { id: "rice", title: "Biryani & rice", hindi: "बिर्याणी", text: "Biryani, pulao, masala rice" },
  { id: "curry", title: "Curry, colour & heat", hindi: "तड़का", text: "Gravies, dals, marinades" }
];

/* "Cook with Ekaiva" ideas shown on the home page. Edit freely; slug links to a product. */
window.EKAIVA_COOK = [
  { title: "Fruit chaat in two minutes", text: "Toss chopped seasonal fruit with a pinch of Chat Masala and a squeeze of lemon.", slug: "royal-chat-masala" },
  { title: "Weeknight paneer sabzi", text: "Saute onion and tomato, add paneer cubes and a spoon of Kitchen King Masala, and finish with coriander.", slug: "kitchen-king" },
  { title: "Dal with a garam masala finish", text: "Stir a pinch of Garam Masala into hot dal just before serving so the aroma stays bright.", slug: "royal-garam-masala" }
];
