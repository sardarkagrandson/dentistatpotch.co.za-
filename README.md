# Dentist@Potch standalone website

This package is a complete static website. It does not require ChatGPT Sites, `chatgpt.site`, React, Node.js, a database, or a build step.

## Files

- `index.html` — Home page
- `services.html` — Services page
- `staff.html` — Staff page
- `styles.css` — All site styling, responsive layouts and service-icon animations
- `script.js` — Home-page gallery and Google reviews rotation
- `reviews.json` — Patient reviews shown on the home page (see below)
- `.github/workflows/deploy-pages.yml` — Publishes the site to GitHub Pages on every push
- `images/` — All website image files
- `IMAGE-ASSET-LIST.md` — Image and icon inventory with page usage

## Test locally

You can open `index.html` directly in a browser. For a more accurate local test, open a terminal in this folder and run:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000/`.

## Upload to your hosting

Upload the contents of this folder—not the enclosing folder itself—to your domain's web root, commonly named one of the following:

- `public_html`
- `www`
- `htdocs`
- the hosting provider's configured site root

Keep the filenames and the `images/` folder structure unchanged. The home page must remain named `index.html`.

## External services that intentionally remain

The website itself is fully independent of ChatGPT Sites. These user-facing external links remain because they provide clinic functions:

- RecoMed appointment booking
- Google Maps location
- `tel:` links for calling the clinic and emergency number

No page, stylesheet, script, image or navigation link depends on `chatgpt.site`.


## Hosting on GitHub Pages

The site is published automatically by GitHub Actions to GitHub Pages on every push to `main`.

## Patient reviews

The home page shows patient reviews from `reviews.json`. Each entry looks like this:

```json
{
  "name": "Lee-Ann W.",
  "approved": false,
  "rating": null,
  "text": "If you have dental anxiety, look no further. ..."
}
```

- Only entries with `"approved": true` appear on the site. Keep it `false` until the reviewer has given permission for their review to be quoted on the website, and keep a record of that permission.
- `name` is exactly what is shown on the site. Use whatever the reviewer agreed to, for example first name and initial.
- `rating` is optional. Give it a number from 1 to 5 to show stars, or leave it `null` to show no stars.
- While no reviews are approved, the card shows a "Read our reviews on Google" link instead.

Edit the file on GitHub, commit to `main`, and the site republishes within a minute or two.
