#!/usr/bin/env python3
"""Fetch the clinic's Google rating and reviews and write them to a JSON file.

Runs inside the GitHub Actions deploy workflow. Needs two environment variables:
  GOOGLE_PLACES_API_KEY  - a Google Cloud API key with "Places API (New)" enabled
  GOOGLE_PLACE_ID        - the clinic's Google Place ID

Usage: fetch_google_reviews.py OUTPUT_PATH
"""
import datetime
import json
import os
import sys
import urllib.error
import urllib.request

FIELDS = "displayName,rating,userRatingCount,googleMapsUri,reviews"


def main() -> int:
    if len(sys.argv) != 2:
        print("usage: fetch_google_reviews.py OUTPUT_PATH", file=sys.stderr)
        return 2
    output_path = sys.argv[1]
    api_key = os.environ.get("GOOGLE_PLACES_API_KEY", "").strip()
    place_id = os.environ.get("GOOGLE_PLACE_ID", "").strip()
    if not api_key or not place_id:
        print("GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID must both be set", file=sys.stderr)
        return 2

    request = urllib.request.Request(
        f"https://places.googleapis.com/v1/places/{place_id}?languageCode=en",
        headers={
            "X-Goog-Api-Key": api_key,
            "X-Goog-FieldMask": FIELDS,
            "Accept": "application/json",
        },
    )
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            place = json.load(response)
    except urllib.error.HTTPError as error:
        body = error.read().decode("utf-8", "replace")
        print(f"Places API returned HTTP {error.code}: {body[:500]}", file=sys.stderr)
        return 1
    except (urllib.error.URLError, json.JSONDecodeError, TimeoutError) as error:
        print(f"Places API request failed: {error}", file=sys.stderr)
        return 1

    reviews = []
    for review in place.get("reviews", []):
        text = (review.get("text") or {}).get("text", "").strip()
        author = review.get("authorAttribution") or {}
        if not text or not author.get("displayName"):
            continue
        reviews.append(
            {
                "author": author.get("displayName"),
                "authorUri": author.get("uri"),
                "authorPhoto": author.get("photoUri"),
                "rating": review.get("rating"),
                "text": text,
                "relativeTime": review.get("relativePublishTimeDescription"),
                "publishTime": review.get("publishTime"),
                "reviewUri": review.get("googleMapsUri"),
            }
        )

    if "rating" not in place or "userRatingCount" not in place:
        print(f"Unexpected Places API response: {json.dumps(place)[:500]}", file=sys.stderr)
        return 1

    payload = {
        "fetchedAt": datetime.datetime.now(datetime.timezone.utc).isoformat(timespec="seconds"),
        "placeName": (place.get("displayName") or {}).get("text"),
        "rating": place["rating"],
        "userRatingCount": place["userRatingCount"],
        "googleMapsUri": place.get("googleMapsUri"),
        "reviews": reviews,
    }
    with open(output_path, "w", encoding="utf-8") as handle:
        json.dump(payload, handle, ensure_ascii=False, indent=2)
        handle.write("\n")
    print(f"Wrote {len(reviews)} reviews (rating {payload['rating']} from {payload['userRatingCount']} ratings) to {output_path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
