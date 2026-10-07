# Dentist@Potch standalone website

This package is a complete static website. It does not require ChatGPT Sites, `chatgpt.site`, React, Node.js, a database, or a build step.

## Files

- `index.html` — Home page
- `services.html` — Services page
- `staff.html` — Staff page
- `styles.css` — All site styling, responsive layouts and service-icon animations
- `script.js` — Home-page gallery and Google reviews rotation
- `scripts/fetch_google_reviews.py` — Fetches the clinic's Google rating and reviews during deployment
- `.github/workflows/deploy-pages.yml` — Publishes the site to GitHub Pages on every push and once a day
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

The site is published automatically by GitHub Actions to GitHub Pages on every push to `main`, and again once a day so the Google reviews stay fresh.

## Live Google reviews

The home page shows the clinic's live Google rating and its most relevant reviews, pulled from the Google Places API and shown with Google attribution. The reviews are fetched once a day inside the deploy workflow and written to `reviews.json`, which is published with the site but never committed. Visitors' browsers never call Google and the API key never appears in the site.

Until the two settings below exist, the reviews card simply shows a "Read our reviews on Google" link.

### One-time setup

1. **Find the clinic's Place ID.** Open <https://developers.google.com/maps/documentation/places/web-service/place-id>, use the "Place ID Finder" on that page, search for "Dentist@Potch Potchefstroom" and copy the Place ID (it looks like `ChIJ...`).
2. **Create an API key.**
   - Go to <https://console.cloud.google.com/>, create a project (any name), and set up billing. Google gives a free monthly allowance that comfortably covers one request per day.
   - Open "APIs & Services" → "Library", search for **Places API (New)** and enable it.
   - Open "APIs & Services" → "Credentials" → "Create credentials" → "API key".
   - Edit the key: under "API restrictions" choose "Restrict key" and tick only **Places API (New)**. Save.
3. **Add the two values to this GitHub repository.** Open the repository → Settings → Secrets and variables → Actions.
   - On the **Secrets** tab, click "New repository secret": name `GOOGLE_PLACES_API_KEY`, value = the API key.
   - On the **Variables** tab, click "New repository variable": name `GOOGLE_PLACE_ID`, value = the Place ID.
4. Open the Actions tab, choose "Deploy website to GitHub Pages" and click "Run workflow". The reviews appear on the home page once it finishes.

The API returns up to five reviews, chosen by Google as most relevant, and the overall rating and review count. Google's terms allow this content to be cached for up to 30 days; this site refreshes it daily.
