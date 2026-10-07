# Dentist@Potch standalone website

This package is a complete static website. It does not require ChatGPT Sites, `chatgpt.site`, React, Node.js, a database, or a build step.

## Files

- `index.html` — Home page
- `services.html` — Services page
- `staff.html` — Staff page
- `styles.css` — All site styling, responsive layouts and service-icon animations
- `script.js` — Home-page gallery and testimonial rotation
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

