# bavulapati.com

Personal portfolio and blog for Bala Avulapati (Systems & P2P Engineer). Static site on GitHub Pages - no build step, bundler, or package manager.

## Develop

Open `index.html` in a browser. Edit the HTML/CSS/JS directly; there is nothing to compile.

## Structure

- `index.html` - single-page site with three tabbed sections (`about`, `resume`, `blog`); tab logic in `assets/js/script.js`.
- `blog/` - each post is a self-contained HTML file with its own inline styles.
- `assets/` - `css/style.css` (all styles; color/spacing tokens at `:root`), `js/script.js` (tabs + testimonial modal), `js/count.js` (self-hosted analytics), and `images/`.
- `feed.xml` (Atom), `sitemap.xml`, `robots.txt` - feed and SEO at the root.

See `CLAUDE.md` for conventions, especially the checklist for adding a blog post.

## Deploy

Push to `main`; GitHub Pages publishes automatically. The custom domain lives in `CNAME`.

## Credits

Built on [vcard-personal-portfolio](https://github.com/codewithsadee/vcard-personal-portfolio) by codewithsadee (MIT).
