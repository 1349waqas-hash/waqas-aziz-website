# Waqas Aziz — Personal Brand Website

A complete, production-ready website for Waqas Aziz, logo and brand identity designer.
19 pages, responsive, SEO-ready, no build step, no database.

## What was built (and the WordPress question)

You asked for WordPress + WooCommerce. A WordPress install needs a hosting
account with PHP/MySQL, which cannot be provisioned from here, so this site
is built as the **closest supported equivalent**: a production-ready static
website with the same pages, design, copy, SEO, and real integrations.

- **Nothing is faked.** Checkout runs on your real Gumroad store (secure
  payment + automatic file delivery). The contact form validates, blocks
  spam (honeypot), and posts to a real endpoint you connect in 5 minutes.
  Until you connect it, the form honestly offers WhatsApp/email instead of
  a fake success message.
- **WordPress path:** see "Migrating to WordPress/WooCommerce" below. Every
  page maps 1:1 to a WP page, and the shop maps to WooCommerce products.

## File structure

```
waqas-aziz-website/
  index.html                  Home
  work.html                   Filterable portfolio
  case-lumera.html            Case studies (6 total)
  case-smartflow.html
  case-carte-blanche.html
  case-yumi.html
  case-quarterback.html
  case-shipem.html
  services.html               Services
  about.html                  About
  shop.html                   Digital product shop
  product-logo-to-client.html       Product detail (live)
  product-social-brand-kit.html     Product detail (coming soon)
  product-brand-guidelines-pro.html Product detail (coming soon)
  start-project.html          Inquiry form
  faq.html                    FAQ
  privacy.html / terms.html / refund-policy.html / license.html
  404.html
  sitemap.xml / robots.txt
  assets/
    css/main.css              Entire design system (one file)
    js/config.js              <-- EDIT THIS: domain, form endpoint, links
    js/main.js                Navigation, filters, forms, accordions
    img/                      All optimized images
  README.md / LAUNCH_CHECKLIST.md
```

## Preview locally

Option A: open `index.html` in a browser (double-click).  
Option B (better, matches hosting): run `python3 -m http.server` in this
folder, then open `http://localhost:8000`.

## Editing content

- **Text:** edit the HTML files directly. Each page is plain HTML with
  clear section comments. Keep the class names as they are.
- **Images:** replace files in `assets/img/` keeping the same filenames,
  or add new files and update the `src` in the HTML. Keep covers at
  1600px wide max, product shots square.
- **Colors/fonts:** all in `assets/css/main.css` under `:root`.
- **Links, email, WhatsApp, socials:** `assets/js/config.js`.
- **Add a case study:** copy `case-yumi.html`, swap the images/text,
  add a card to `work.html`, add the URL to `sitemap.xml`.
- **Add a product:** copy `product-logo-to-client.html`, update details,
  add a card to `shop.html`.

Rule that never changes: **no em-dashes (—) or en-dashes (–) anywhere
in visible text.** Use commas, periods, or colons.

## Deploy (pick one)

**Netlify (free, easiest):** drag this folder into app.netlify.com/drop.
You get `https://your-site.netlify.app` instantly. Forms: Netlify Forms
works without extra setup (see Integrations).

**Cloudflare Pages / Vercel:** same idea, connect the folder or a git repo.

**cPanel shared hosting:** upload the folder contents (not the folder
itself) into `public_html/` via File Manager or FTP.

## Domain connection

1. Buy/connect your domain at your registrar.
2. Netlify/Vercel/Cloudflare: add the domain in their dashboard, then add
   the DNS records they show you (usually 1 A record or a CNAME).
3. Enable HTTPS (one click on all three; free).
4. Update `siteUrl` in `assets/js/config.js`, and replace
   `https://www.waqasaziz.com` in `sitemap.xml` and in every page's
   `<link rel="canonical">` + `og:` tags (search/replace across files).

## Integrations (5-minute setups)

**Contact form** (`start-project.html`): paste a Formspree endpoint into
`formEndpoint` in `config.js` (formspree.io, free tier). Alternative:
Web3Forms. Until set, the form shows WhatsApp/email options.

**Newsletter** (shop + product pages): same kind of endpoint into
`newsletterEndpoint`. Alternative: Brevo/Mailchimp embed.

**Gumroad product links:** `config.js` has the store URL. For each live
product, replace the "Buy on Gumroad" buttons' href with the exact
product URL from your Gumroad dashboard (Products > Share).

**Analytics:** paste a Plausible or GA4 ID into `analyticsId`, then add
the snippet where `main.js` indicates (search "analytics" in main.js...
currently the ID is stored for your snippet; add the provider script tag
in each page head or via tag manager).

## Payments in Pakistan (read before changing anything)

- **Current setup is correct:** Gumroad handles checkout and pays out to
  your verified Payoneer account. Do not "upgrade" this without reason.
- **Stripe** does not onboard merchants in Pakistan. **PayPal** cannot
  receive payments in Pakistan. Do not configure either without
  re-checking their current country support.
- If you later move to WooCommerce: use a gateway that actually pays out
  in Pakistan (e.g. Payoneer-linked options, or cash/bank-transfer for
  local clients) and confirm eligibility before promising it to buyers.

## Migrating to WordPress/WooCommerce later

1. Install WordPress on PHP/MySQL hosting; use a blank starter theme.
2. Recreate each HTML page as a WP page (copy the HTML into a Custom
   HTML block, or rebuild with Gutenberg; enqueue `main.css`).
3. Header/footer become the theme's header.php/footer.php.
4. Shop: install WooCommerce; each product page becomes a WooCommerce
   digital product (Gumroad links can stay as external/affiliate products
   on day one, then move to native checkout when a PK-compatible gateway
   is confirmed).
5. Forms: Fluent Forms / WPForms pointed at your email.
6. Keep `sitemap.xml` logic via RankMath/Yoast; keep the URL slugs
   identical (`/work`, `/services`...) to preserve SEO.

## Backup and security

- **Backup:** this folder IS the site. Keep a copy on your PC + Google
  Drive after every change. If hosted on Netlify/Vercel, every deploy is
  versioned. For WordPress later: UpdraftPlus to Google Drive, weekly.
- **Security (static site):** there is almost no attack surface. Keep
  HTTPS on, do not paste secrets into HTML/JS, and only use the official
  Gumroad/Formspree endpoints.
- **Security (WordPress later):** auto-updates on, limit login attempts,
  2FA on the admin account, weekly backups before updating plugins.

## Deliberately not included

- **Testimonials section:** omitted because no genuine testimonials were
  supplied. Add the section when you have real client quotes (there is a
  `.service-card`-style pattern you can reuse; ask and it will be added).
- **On-site cart:** by design. Real checkout happens on Gumroad, which
  you already use and which handles VAT, fraud, and delivery.
- **Blog:** not requested. The structure supports adding `/blog/` later.
