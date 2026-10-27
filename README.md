# Pak Services website (React + TypeScript + Vite)

```bash
npm install
npm run dev      # local preview at http://localhost:5173
npm run build    # production files in dist/ (upload this folder)
```

The previous single-file version is kept in `legacy/index.html`.

## What to edit
| What | Where |
|---|---|
| WhatsApp, email, social links, address, map pin, forms, announcement bar | `CONFIG` in `src/data/site.ts` |
| Services, categories, membership tiers, cities, tax slabs, Google reviews | `src/data/site.ts` |
| English / Urdu wording | `src/data/i18n.ts` |
| Portfolio images | `src/data/portfolio.ts` + `public/assets/portfolio/` |
| Colors (navy, gold, blue, green) | `:root` at the top of `src/styles.css` |
| Logo, city photos | `public/assets/` |
| Page sections | `src/components/` |

Contact-form email delivery uses FormSubmit (`CONFIG.formEndpoint`); click the activation link emailed to `info@thepakservices.com` after the first test submission.
