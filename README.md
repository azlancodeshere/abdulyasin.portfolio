# Abdul Yasin — Portfolio

Personal portfolio site. Every detail on it is mirrored from three places so
nothing drifts:

| Source | What it provides |
| --- | --- |
| [github.com/azlancodeshere](https://github.com/azlancodeshere) | name, bio, avatar, links, repos, stars, live URLs |
| Resume (`Abdul_Yasin_Resume_Dev_v8.docx`) → `public/resume.pdf` | summary, technical skills, projects, education |
| [linkedin.com/in/abdulyasin-devstack](https://www.linkedin.com/in/abdulyasin-devstack) | professional links |

All copy lives in one file: **`src/data/profile.js`**.

## Stack

React 19 · Vite · Tailwind CSS v4 · lucide-react — deployed on Vercel.

## Commands

```bash
npm install       # install deps
npm run dev       # local dev server
npm run build     # production build → dist/
npm run preview   # serve the production build
npm run sync      # refresh stars / live URLs + the contribution snapshot
```

## Live contribution calendar

The GitHub calendar on the site is **real-time**, not a baked-in image:

- `api/contributions.js` (Vercel function) fetches
  `github.com/users/azlancodeshere/contributions` server-side — the endpoint
  is not CORS-enabled, so a browser cannot call it — parses it in
  `scripts/lib/contributions.mjs` and returns `{ user, fetchedAt, total, days }`.
  The CDN caches the response for 30 minutes.
- `src/hooks/useContributions.js` paints `src/data/contributions.json` first
  (the snapshot written by `npm run sync`), then swaps in the live payload and
  flips the grid badge to "Live from GitHub". If the route is missing or fails,
  the snapshot stays — the calendar is never empty.
- `npm run dev` serves the same route through a middleware in `vite.config.js`,
  so local pages show live data too.

## Keeping it in sync with GitHub

```bash
npm run sync
```

Updates each project card's star count and live URL straight from the GitHub
API, then rebuilds:

```bash
npm run build
```

Adding a new project = one object in `profile.featured` or `profile.others` in
`src/data/profile.js`.

## Deploying (Vercel)

1. Push this folder to a GitHub repo.
2. Import it at [vercel.com/new](https://vercel.com/new) — framework auto-detected as **Vite**.
3. Every push to `main` redeploys automatically.

`vercel.json` pins `buildCommand: npm run build` and `outputDirectory: dist`.

## Résumé

`public/resume.pdf` is generated from `Abdul_Yasin_Resume_Dev_v8.docx`:

```bash
textutil -convert html ~/Downloads/Abdul_Yasin_Resume_Dev_v8.docx -output /tmp/resume.html
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --no-pdf-header-footer \
  --print-to-pdf=public/resume.pdf "file:///tmp/resume.html"
```

## Project screenshots

`public/projects/*.jpg` are headless-Chrome captures of the live apps. Refresh
them with:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless \
  --window-size=1440,900 --virtual-time-budget=9000 \
  --screenshot=public/projects/surhires.png https://surhires.vercel.app
```
