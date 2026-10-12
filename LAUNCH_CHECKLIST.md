# Launch Checklist

Work through top to bottom. Do not publish until every box is checked.

## Content
- [ ] Read every page once at phone width; text readable, no overlaps.
- [ ] Confirm all 6 case study images are the correct projects.
- [ ] Confirm product images match the actual Gumroad listings.
- [ ] About page photo and facts are current.
- [ ] No em-dashes (—) or en-dashes (–) anywhere in visible text.
- [ ] Testimonials: still none genuine, section stays omitted. Add only
      with real client quotes.

## Domain and hosting
- [ ] Site deployed (Netlify / Vercel / Cloudflare / cPanel).
- [ ] Real domain connected, HTTPS enabled.
- [ ] `siteUrl` in `assets/js/config.js` updated to the real domain.
- [ ] Search/replace `https://www.waqasaziz.com` with the real domain in:
      all HTML files (canonical + og tags) and `sitemap.xml`.
- [ ] `robots.txt` sitemap URL updated.

## Forms and integrations
- [ ] Formspree/Web3Forms endpoint pasted into `formEndpoint`; send a
      test inquiry from `start-project.html` and confirm it arrives.
- [ ] Spam check: honeypot field is hidden (view source, class
      `honeypot`).
- [ ] Newsletter endpoint set; test signup on `shop.html`.
- [ ] "Buy on Gumroad" buttons point to exact product URLs (not the
      store homepage).
- [ ] WhatsApp float opens a chat; email links open a compose window.
- [ ] Cookie banner appears on first visit; Accept/Decline both work.

## Shop
- [ ] "Logo to Client" price on the site matches the Gumroad listing.
- [ ] Coming-soon products show no price and no buy button.
- [ ] Test purchase flow on Gumroad: payment, receipt email, download.
- [ ] Refund Policy and License pages read and approved by you.

## SEO
- [ ] Every page has a unique title and meta description (done, verify
      after domain swap).
- [ ] `sitemap.xml` submitted in Google Search Console; `robots.txt`
      reachable at `/robots.txt`.
- [ ] Share one page on WhatsApp/Facebook; preview card shows the
      og-cover image and correct title.
- [ ] Google Business / social bios link to the new domain.

## Legal (review before launch)
- [ ] Privacy Policy, Terms, Refund Policy, License: read fully, adjust
      anything that does not match how you work.
- [ ] Footer legal links open the right pages.

## Final QA
- [ ] All nav links work on desktop and in the mobile menu.
- [ ] Work filters show the right projects; empty state never wrongly
      appears.
- [ ] Shop search finds products by keyword.
- [ ] FAQ accordions open/close; only one open at a time.
- [ ] 404 page shows for a bad URL (test `/nope`).
- [ ] Contact form: empty submit shows field errors; valid submit sends.
- [ ] No lorem ipsum, no placeholder text, no broken images anywhere.

## Post-launch
- [ ] Announce on Instagram/LinkedIn with the domain link.
- [ ] Add the site to your Dribbble and Upwork profiles.
- [ ] Set a monthly reminder: backup the folder, review inquiries.
