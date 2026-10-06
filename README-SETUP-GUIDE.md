# Ekaiva website - setup guide

This is a complete, ready-to-publish website (no database, no WordPress, nothing to install).
It works on any normal web hosting, including GoDaddy Web Hosting.

## 1. What is in this folder

| File / folder | What it is |
|---|---|
| `index.html`, `products.html`, `product.html`, `about.html`, `faq.html`, `contact.html` | The pages |
| `thank-you.html`, `privacy.html`, `terms.html`, `404.html` | Supporting pages |
| `js/site-config.js` | **Your details** - phone, email, WhatsApp, social links, videos. Edit this first |
| `js/products-data.js` | **Your products** - names, prices, buy links, descriptions |
| `css/style.css` | Colours and design (colours are at the top, under `:root`) |
| `images/products/` | Product photos, one folder per product |
| `images/videos/` | Put your videos here |
| `fonts/` | The website fonts (already included - no Google needed) |
| `robots.txt`, `sitemap.xml`, `.htaccess` | For Google and for GoDaddy/Apache hosting |

To edit any file, right-click it and open it with Notepad (or any text editor). Do not use Word.

## 2. See it on your computer first

1. **Extract the zip completely** (right-click -> Extract All). Do not open files from inside the zip - that is what makes pictures look broken.
2. Open the extracted folder and double-click `index.html`.

## 3. Your details (already filled in)

These are already set in `js/site-config.js`: website `https://ekaivastore.com`, email `ekaivaspices@gmail.com`, WhatsApp `917208607821`, Instagram `ekaivastore`. Still empty (so hidden): phone number for calls, opening hours, Facebook/YouTube, Amazon link, and the Instamart link of each product.

Open `js/site-config.js`. Anything you leave as `""` is simply hidden - the site never shows a dead button.

| Setting | What to put | What it switches on |
|---|---|---|
| `siteUrl` | Your website address, e.g. `"https://www.yourdomain.com"` | Google and WhatsApp/Facebook share previews |
| `contact.email` | Your email | The **contact form** (messages arrive in this inbox) |
| `contact.phone` | e.g. `"+91 98XXXXXXXX"` | Phone number in the footer and contact page |
| `contact.whatsapp` | Digits only with country code, e.g. `"9198XXXXXXXX"` | Green WhatsApp button on every page |
| `social.instagram` etc. | Full profile links | Social icons in the footer |
| `videos` / `heroVideo` | See the examples in the file | A video section / looping video behind the home headline |
| `analyticsId` | Google Analytics ID like `G-XXXXXXXXXX` | Visitor statistics |
| `fssai.validTill` | Already set to `"09 Dec 2028"` from your renewed certificate | "Registration valid till ..." on the About page |
| `ordering.*` | Delivery note, payment note, minimum order, max quantity | WhatsApp ordering (section 3A) |

### 3A. WhatsApp ordering

It switches on by itself as soon as `contact.whatsapp` has your number. Every product then gets a green **+ Add to order** button, and a green **Order on WhatsApp** button floats at the bottom of every page.

How a customer uses it: they add products, open "Your order", change quantities, type their name and delivery address, and press **Send order on WhatsApp**. WhatsApp opens with the whole order already written out, addressed to your number. They only have to press send. You then reply on WhatsApp to confirm items, price, delivery and payment.

What it does **not** do: it does not take payment, and it does not notify you by email - the order reaches you only when the customer presses send in WhatsApp. Nothing is confirmed until you reply.

Settings (in `js/site-config.js`, under `ordering`):
- `deliveryNote` / `paymentNote` - one line each shown in the order panel, for example "We deliver in Mira Bhayander and nearby areas." Leave empty if you do not want to state anything yet.
- `minOrder` - minimum order value in rupees (0 = none).
- `maxQty` - most packs of one product per order.
- `enabled: false` - turns ordering off completely.
- In `js/products-data.js`: `price: 90` sets a different price for one product (otherwise the MRP is used; if neither exists the order says "price to be confirmed"), and `orderable: false` hides the button for one product.

Test it yourself first: add something, send the order to your own number, and check that the message reads well.

Then open `js/products-data.js` and, for each product that is live on Swiggy Instamart, paste its link between the quotes of `instamart: ""`.
How to get the link: open the product in the Swiggy Instamart app or on the Swiggy website and copy its share/page link.
Until you do, those buttons say "Find on Swiggy Instamart" and open Instamart's home page.

## 4. Put it on your domain

In GoDaddy open **My Products**. The link you shared is the *domain settings* page for ekaivastore.com, which does not by itself show whether you also have hosting. Look for a product called **Web Hosting** (cPanel) next to the domain.

**A. You have GoDaddy "Web Hosting" (cPanel)** - the easiest case.
1. GoDaddy -> My Products -> Web Hosting -> Manage -> cPanel Admin -> **File Manager** (menu names can differ slightly).
2. Open the `public_html` folder. If there is a GoDaddy placeholder page (like `index.htm` or `default.html`), delete it.
3. Click **Upload** and upload everything that is *inside* the `ekaiva-website` folder (`index.html`, `css`, `js`, `images`, ...). `index.html` must sit directly inside `public_html`. In File Manager, click Settings -> "Show Hidden Files" so you can see `.htaccess`.
4. Open your domain in the browser.
5. In cPanel (or GoDaddy hosting dashboard) install the **free SSL certificate** for your domain. Once `https://` works, open `.htaccess` and remove the `#` at the start of the four lines under "Turn these ON only AFTER the free SSL...".

**B. You only have a domain name (no hosting), or you have GoDaddy's drag-and-drop "Websites + Marketing" builder.**
That builder cannot take uploaded website files. Either buy GoDaddy **Web Hosting** (option A), or use a free host and point your domain to it, for example Netlify, Cloudflare Pages or GitHub Pages: create a free account, upload this folder, add your domain in their "Custom domain" settings, then in GoDaddy -> your domain -> DNS, add the records they show you. If you get stuck, send me a screenshot of the screen you are on and I will walk you through it.

## 5. After it is live - checklist

- [ ] **Contact form:** send yourself a test message. The first time, formsubmit.co emails ekaivaspices@gmail.com a confirmation link - click it once. Check the spam folder if you do not see it.
- [ ] **WhatsApp ordering:** add something to the order, press Send, and check the message that arrives on 7208607821.
- [ ] **Instamart links** pasted for each product (section 3).
- [ ] **Google files:** `robots.txt` and `sitemap.xml` already point to ekaivastore.com - nothing to change.
- [ ] **Google Search Console:** add ekaivastore.com and submit `https://ekaivastore.com/sitemap.xml` so Google finds your pages.
- [ ] Test on your phone, and click every button once.

## 6. Everyday editing

- **Change a price / description / add a Hindi name:** `js/products-data.js`.
- **Add a product:** copy one product block in `products-data.js`, paste it below, change the text, and create a folder `images/products/<your-folder>/` with `1.webp`, `1-thumb.webp`, `2.webp`... (photo 1 is the front-of-pack shot with a transparent background; it looks best as a transparent PNG/WebP).
- **Remove a product:** delete its `{ ... },` block.
- **Replace a photo:** save the new file with the *same name* in the same folder. WebP is the format used (small and fast); free tools like squoosh.app convert JPG/PNG to WebP.
- **Change the About story:** open `about.html` and edit the text under "Our story" (there is a note in the file). Use your own founder story - it is the best part of any brand website.
- **Change colours:** `css/style.css`, the `:root` block at the very top.
- **Turn off the loading animation:** `preloader: false` in `site-config.js`. It plays once per visit.
- Changes not showing? Press **Ctrl + F5** in the browser.

## 7. Please double-check before you go public

- Product descriptions are general cooking descriptions. Read each one and make sure you are happy with it.
- The site does **not** claim "no preservatives", "stone ground" or similar - add those only if they are true and shown on your packs.
- MRP values come from your Instamart sales report (Kitchen King 96, Garam 110, Chat 88, Kashmiri Chilli 138). Add the others in `products-data.js` when you have them.
- The Privacy and Terms pages are simple templates, not legal advice.
- Your FSSAI registration number is shown in the footer and the renewal date on the About page (valid till 09 Dec 2028). Update `fssai.validTill` when you renew.
- Your FSSAI certificate shows the owner's photo, so it is **not** published on the website. Keep the PDF for Swiggy, distributors and inspections.
- Orders that come through WhatsApp are your own direct sales: they do not count towards your Instamart unit target. Your certificate also states an annual turnover limit of Rs. 12 lakh, so keep an eye on total sales.

## 8. Troubleshooting

| Problem | Fix |
|---|---|
| Pictures look broken | You opened files from inside the zip. Extract it fully first (section 2) |
| White page / "500 error" after upload | Delete `.htaccess` and reload |
| Contact form says "not switched on" | Add your email in `site-config.js` |
| Form submits but no email arrives | Confirm the formsubmit.co email (section 5) and check spam |
| No "Add to order" buttons | `contact.whatsapp` is empty, or `ordering.enabled` is false |
| WhatsApp opens but the number is wrong | `contact.whatsapp` must be digits only with country code, e.g. 9198XXXXXXXX |
| Old text still showing | Ctrl + F5 |
