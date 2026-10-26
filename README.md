# Pak Services website

Files: `index.html` (the whole site) + `assets/logo.jpg`. `serve.js` is only for local preview (`node serve.js`) and is not needed online.

## What to edit (all in index.html)
| What | Where |
|---|---|
| WhatsApp number | `CONFIG.whatsapp` in the `<script>` — format `923002141517` (no +, no leading 0) |
| Email, Facebook, Instagram | `CONFIG` just below it |
| Services (add/remove/rename) | `SERVICES` list — copy one line, change text/emoji/`from` price |
| Categories (filter tabs) | `CATEGORIES` list |
| Membership tiers | `TIERS` list |
| Urdu / English wording | `I18N` block |
| Colors | `:root { --navy, --gold, --blue, --green }` at the top of `<style>` |
| Logo | replace `assets/logo.jpg` (same file name) |
| Portfolio photos | section `id="work"` — swap each `<div class="ph">` for `<img src="assets/photo.jpg" alt="..." loading="lazy">` |
| Testimonials / stats | sections `id="reviews"` and `class="stats"` (placeholders now) |
| Address, map pin, email, Facebook, Instagram, call number, announcement bar | `CONFIG` block (`address`, `mapLat/mapLng`, `email`, `facebook`, `instagram`, `phoneTel`, `announcement`) |
| Contact-form email delivery | `CONFIG.formEndpoint` (FormSubmit — click the activation link emailed to `info@thepakservices.com` after the first test submission) |
| Tax estimator slabs | `SLABS` (update each year after the budget) |
| Cities / "What we need" checklists | `CITIES`, `DETAILS` |
| Domain in SEO/social tags | replace `thepakservices.com` in `<meta property="og:...">` and the JSON-LD block |

## Publish free
**Netlify (easiest):** go to app.netlify.com/drop, drag the whole `Pak Services` folder in. You get a live `*.netlify.app` link in seconds.

**GitHub Pages:** create a repo, upload `index.html` and `assets/`, then Settings → Pages → Deploy from branch `main` / root.

**Vercel:** vercel.com → Add New → Project → upload/import the folder (framework: Other).

## Connect thepakservices.com
1. Buy the domain (e.g. from a .com registrar or PKNIC for .pk).
2. Netlify: Site settings → Domain management → Add custom domain, then follow its DNS instructions (an `A` record to Netlify's IP for the root, `CNAME` for `www`). Vercel/GitHub Pages show equivalent records.
3. Wait for DNS (minutes to a few hours); HTTPS is enabled automatically.

## Ideas for later
1. **Online payments** — JazzCash / Easypaisa (or Safepay / PayFast) for membership fees and service deposits.
2. **Booking system** — date/time slot picker per service (Calendly, Cal.com or a small form + Google Sheet) with WhatsApp confirmations.
3. **Blog / guides** — "How to register a company in Pakistan", "NTN & tax filing explained" to rank on Google and win trust.
