# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static personal portfolio site (bavulapati.com) with no build step, no bundler, and no package manager. Everything ships as-is to GitHub Pages.

## Previewing

Open `index.html` directly in a browser - no server required. There is no `npm run dev` or equivalent.

## Structure

All content lives in a single `index.html` file. The page is divided into three `<article>` sections identified by `data-page` attributes: `about`, `resume`, and `blog`. Tab navigation is handled by `assets/js/script.js`, which toggles the `active` class on the articles when the user clicks a navbar button.

The sidebar (`<aside class="sidebar">`) holds contact info and is collapsed on mobile via a "Show Contacts" button.

Testimonials open in a modal driven by `[data-testimonials-item]` click handlers in `script.js`.

## Styling

All styles are in `assets/css/style.css`. Color palette and spacing are defined as CSS custom properties at the top of the file under `:root`. Edit those variables first before touching individual rules.

## External dependencies

- **Google Fonts** - Inter (body text) and JetBrains Mono (the terminal-style `$`/`#` headings), loaded via `<link>` in `<head>`.
- **GoatCounter analytics** - self-hosted `assets/js/count.js` posting to the first-party endpoint `https://stats.bavulapati.com/count` (a CNAME to the GoatCounter site). No cookies, no consent banner. The "Reach out" CTA is tracked as a click event via `data-goatcounter-click`. It is served first-party so ad blockers (which key on `gc.zgo.at` / `goatcounter.com`) do not drop it; refresh `count.js` occasionally by re-downloading from `https://gc.zgo.at/count.js`.

Icons are inline SVG (mostly Ionicons 5.5.2 path data, `currentColor` so they inherit text color), not a runtime icon font - there is no longer an Ionicons or Google Maps dependency. The X (Twitter) glyph is the standard X logo, not Ionicons (5.5.2 predates it). Contact and social icons rest muted at `--icon-muted` and turn gold (`--orange-yellow-crayola`) on `:hover` / `:focus-within` / `:focus-visible`, matching the blog post headers.

No npm packages. The only local scripts are `assets/js/script.js` and the vendored `assets/js/count.js`.

## Meta files and CI

- Content pages (`index.html` and blog posts) set `description` and Open Graph tags; every page sets `theme-color`, favicons, and an `apple-touch-icon`. `404.html` is a custom dark page marked `noindex` (no `description`/OG).
- `feed.xml` (Atom), `sitemap.xml`, and `robots.txt` live at the repo root - keep them in sync when adding posts (see below).
- CI (`.github/workflows/checks.yml`) runs on every push: XML well-formedness (xmllint), link/asset checking (lychee), and HTML validation (html5validator against the W3C Nu validator).

## Blog posts

Each post is a self-contained HTML file in `blog/` (e.g. `blog/one-core-many-platforms.html`) - it is not part of the `index.html` SPA. Start a new post by copying the most recent one and matching its structure:

- Inline `<style>` block copied from the prior post (dark theme, Inter, `max-width: 720px` container). There is no shared blog stylesheet. (Blog posts load Inter only, not JetBrains Mono - the terminal headings are an `index.html` thing.)
- `<head>`: `description`, full Open Graph set (`og:title`, `og:description`, `og:image`, `og:type=article`, `og:url`), `twitter:card=summary_large_image`, `canonical`, and a `BlogPosting` JSON-LD block (headline matching `<title>`, `datePublished`/`dateModified`, author + publisher = Bala Avulapati). og:image is an absolute `https://bavulapati.com/...` URL and must be a static image (PNG), never a video.
- Body: `<header>` with a back-link to `../index.html#blog` plus the full contact-icon set (Email, GitHub, LinkedIn, PGP, X, RSS feed) matching the homepage sidebar, then `<article>` with one `<h1>`, a `.meta` line (`Month D, YYYY &middot; Category`), `<h2>` sections, and `<hr>` between them.
- Code blocks use highlight.js (atom-one-dark) loaded from CDN; `<figure>` holds images or an autoplay/loop/muted/playsinline `<video>` with a `poster` and an `<img>` fallback inside. Include a `prefers-reduced-motion` guard script that strips `autoplay`. Avoid mermaid unless a diagram genuinely adds something the prose cannot - prose usually wins.
- Prepend a card to the `blog-posts-list` in `index.html` (newest first), reusing an existing card's markup, with a banner SVG in `assets/images/` styled like `blog-hrpc-swift.svg` (dark, dotted bg, mono font).
- Asset naming: `blog-<slug>.svg` (index banner), `blog-<slug>.png` (hero/og), plus any `-poster.jpg` / `.mp4` for video heroes.
- Add the new post's URL to `sitemap.xml` and bump its `lastmod`.
- Prepend an `<entry>` to `feed.xml` (Atom; newest first) with the post's title, link, id (the URL), `published`/`updated` as `YYYY-MM-DDT00:00:00Z`, a `<category term="...">`, and the meta description as `<summary>`. Bump the feed-level `<updated>` to match the newest entry.
- ASCII punctuation only (hyphens, plain quotes, `...`), per the global style rule - note older posts and `index.html` still contain em-dashes; do not mass-rewrite them.

## Deployment

Pushing to `main` triggers GitHub Pages to publish automatically. The custom domain `bavulapati.com` is configured in the `CNAME` file - do not delete or rename it.
