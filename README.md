# SonoPlot Website

Static rebuild of sonoplot.com, built with [Eleventy](https://www.11ty.dev/) and
deployed to GitHub Pages. No server, database, or build-time backend needed —
the build output in `_site/` is plain HTML/CSS/JS.

This replaced an earlier WordPress + Docker version of this project. That
approach was dropped once the site no longer needed a CMS: there's no login
system, no user-generated content, and the one form (quote requests) is an
external Zoho embed. A static site removes all the hosting/PHP/MySQL overhead
that would have bought nothing.

## Quick start

```bash
npm install
npm start          # dev server at http://localhost:8080 with live reload
npm run build       # writes the site to _site/
```

## Why Eleventy instead of plain HTML files

With ~10 pages sharing the same header, footer, and navigation, hand-copying
that markup into every file is exactly how nav bugs happen — a nav change
during the WordPress build already broke a couple of links this way. Eleventy
outputs plain static HTML (same deliverable as hand-written files) but keeps
the header/nav/footer in one shared layout
([`src/_includes/base.njk`](src/_includes/base.njk)) and the nav links in one
data file ([`src/_data/nav.js`](src/_data/nav.js)). Change the nav once, every
page picks it up on the next build.

## Structure

```
eleventy.config.js       Eleventy config: input/output dirs, pathPrefix, passthrough copy
src/
  _includes/
    base.njk              Full HTML shell — head, header/nav, footer. Every page uses this layout.
    partials/              Homepage sections (hero, product teaser, customer list, quote CTA)
  _data/
    nav.js                 Primary + footer navigation — edit here, not in base.njk
    site.js                Site name/description/address used in <title>/meta/JSON-LD
  css/style.css             All site styles (one file, no build step)
  js/nav.js                 Mobile nav toggle (desktop submenu is hover/focus CSS only)
  img/                      Logo, product photos, customer logos
  index.njk                 Home
  about/, products/, applications/, materials/, downloads/, request/, contact/, legal/
  publications/index.njk    Redirects to /applications/#publications (old URL, kept working)
  404.njk
.github/workflows/deploy.yml   Builds and deploys to GitHub Pages on every push to main
```

Every page is a directory with an `index.njk` (e.g. `src/about/index.njk` →
`/about/`), matching the URL structure the site already had. Internal links
and asset paths always go through Eleventy's `url` filter
(`{{ '/about/' | url }}`) rather than being hardcoded — that's what makes the
site work both locally and under GitHub Pages' `/repo-name/` subpath (see
below).

## Content notes — real vs. placeholder

Pulled verbatim from the live/previous sonoplot.com (safe to publish as-is):
- Applications page's Publications section — the full citation list from `sonoplot.com/publications`
- Materials page — ink partner list from `sonoplot.com/inks`
- Contact page — HQ address/phone/email and all four international offices, from `sonoplot.com/contact`
- Legal page — links to the five legal documents, from `sonoplot.com/legal`
- Quote request form — the exact Zoho CRM Web-to-Lead embed from `sonoplot.com/request`, including its reCAPTCHA

Flagged `[PLACEHOLDER]` in the page itself (needs SonoPlot sign-off before publish):
- Customer logo grid on About page (still a text list) and leadership bios
- Microplotter Ultima's specs (page currently reuses the Pro's content — there's no real Ultima page on the live site to pull from)
- Download links (point at placeholder PDF paths, not real files)
- The five legal documents (still link out to www.sonoplot.com — see "Before this replaces sonoplot.com" below)

**Customer logos** (NASA, Microsoft, MIT, Becton Dickinson — `src/img/customers/`) are
sourced from Wikimedia Commons, not supplied by SonoPlot or the customers
themselves. Confirm SonoPlot is cleared to display them, or swap in official
files, before launch.

## Deploying (GitHub Pages)

`.github/workflows/deploy.yml` builds and deploys automatically on every push
to `main` — no manual steps. First-time setup on GitHub: **Settings → Pages →
Source → GitHub Actions** (only needs doing once).

### The path-prefix thing

A GitHub Pages *project* site (no custom domain) serves from
`https://petecj.github.io/sonoplot-website/` — everything is under a
`/sonoplot-website/` subpath, not the domain root. If every link in this site
were root-relative (`/about/`), they'd resolve to
`https://petecj.github.io/about/` and 404, because that's a different (and
non-existent) path.

Eleventy's `pathPrefix` config option fixes this: every `{{ ... | url }}` in
the templates gets that prefix prepended automatically. The workflow sets it
via `ELEVENTY_PATH_PREFIX=/sonoplot-website/` at build time (see
`eleventy.config.js`); local dev (`npm start` / `npm run build`) doesn't set
it, so it defaults to `/` and links work at `http://localhost:8080/` as
expected.

**Once a custom domain is live** (see below), delete the
`ELEVENTY_PATH_PREFIX` line from `.github/workflows/deploy.yml` — a custom
domain serves from the root, so the prefix should go back to `/`.

### Custom domain (sonoplot.com)

1. Create `src/CNAME` containing just the domain, e.g. `sonoplot.com` (no
   `https://`, no trailing slash). `eleventy.config.js` already passes this
   file straight through to the build output — GitHub Pages reads it from
   there automatically once it exists.
2. Add the DNS records GitHub's Pages settings page shows you (an `A`/`ALIAS`
   record at the apex, or a `CNAME` record for a subdomain like `www`).
3. Remove `ELEVENTY_PATH_PREFIX` from the workflow (see above).
4. Update `url` in `src/_data/site.js` if it isn't already `https://sonoplot.com`.

## Local dev notes

- `npm start` runs Eleventy's own dev server with live reload — no separate
  build step needed while working on pages.
- The Zoho quote-request form's reCAPTCHA key is registered to sonoplot.com,
  so the captcha won't validate on `localhost` or on the GitHub Pages URL —
  only once the custom domain is live. Don't submit the form while testing;
  it creates a real lead in SonoPlot's Zoho CRM regardless of which domain
  it's served from.
- No JS framework, no client-side routing, no build-time data fetching — the
  only script on the site is `js/nav.js` (mobile menu toggle) plus whatever
  the Zoho embed brings with it on the Request page.

## Before this replaces sonoplot.com

- Resolve every `[PLACEHOLDER]` block listed above with SonoPlot
- Move the five legal documents (Terms, Warranty, EULA, SMS Terms, Privacy)
  onto this site — right now `/legal/` just links out to the old domain,
  which won't exist once DNS moves here
- Confirm SonoPlot can display the four customer logos (see above), or
  replace them
- Add `src/CNAME` and update DNS per "Custom domain" above
- Run a Lighthouse pass once real images/content are final — a plain static
  site should score >90 with no extra work, but it's worth confirming once
  the placeholder content is replaced with real (larger) assets
