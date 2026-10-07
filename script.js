(function () {
  "use strict";

  const slides = Array.from(document.querySelectorAll(".hero-slide"));
  const dots = Array.from(document.querySelectorAll(".slide-dots button"));
  let slideIndex = 0;
  let slideTimer;

  function showSlide(index) {
    if (!slides.length) return;
    slideIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle("visible", i === slideIndex);
      slide.setAttribute("aria-hidden", i === slideIndex ? "false" : "true");
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("selected", i === slideIndex);
      dot.setAttribute("aria-current", i === slideIndex ? "true" : "false");
    });
  }

  function restartSlideTimer() {
    window.clearInterval(slideTimer);
    slideTimer = window.setInterval(() => showSlide(slideIndex + 1), 10000);
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      restartSlideTimer();
    });
  });

  if (slides.length) {
    showSlide(0);
    restartSlideTimer();
  }

  // Google reviews: rendered from reviews.json, which the deploy workflow
  // regenerates daily from the Google Places API. If the file is missing
  // (API not configured yet, or page opened from disk) the card falls back
  // to a plain link to the clinic's Google reviews.
  const reviewCard = document.getElementById("google-reviews");
  const reviewSummary = document.getElementById("review-summary");
  const reviewStars = document.getElementById("review-stars");
  const quoteText = document.getElementById("testimonial-text");
  const quoteName = document.getElementById("testimonial-name");
  const quoteControls = document.getElementById("testimonial-controls");
  const quoteCounter = document.getElementById("testimonial-counter");
  const previousButton = document.getElementById("testimonial-previous");
  const nextButton = document.getElementById("testimonial-next");
  const reviewAllLink = document.getElementById("review-all");
  let reviews = [];
  let quoteIndex = 0;
  let quoteTimer;

  function starString(rating) {
    const full = Math.max(0, Math.min(5, Math.round(Number(rating) || 0)));
    return "★".repeat(full) + "☆".repeat(5 - full);
  }

  function showQuote(index) {
    if (!reviews.length) return;
    quoteIndex = (index + reviews.length) % reviews.length;
    const review = reviews[quoteIndex];
    reviewStars.textContent = starString(review.rating);
    reviewStars.setAttribute("aria-label", `${review.rating} out of 5 stars`);
    quoteText.textContent = `“${review.text}”`;

    quoteName.textContent = "";
    if (review.authorPhoto) {
      const photo = document.createElement("img");
      photo.src = review.authorPhoto;
      photo.alt = "";
      photo.className = "reviewer-photo";
      photo.referrerPolicy = "no-referrer";
      photo.addEventListener("error", () => photo.remove());
      quoteName.appendChild(photo);
    }
    const author = document.createElement(review.authorUri ? "a" : "span");
    author.textContent = review.author;
    if (review.authorUri) {
      author.href = review.authorUri;
      author.target = "_blank";
      author.rel = "noopener noreferrer";
    }
    quoteName.appendChild(author);
    if (review.relativeTime) {
      const when = document.createElement("span");
      when.className = "review-time";
      when.textContent = ` · ${review.relativeTime}`;
      quoteName.appendChild(when);
    }
    quoteCounter.textContent = `${quoteIndex + 1} / ${reviews.length}`;
  }

  function restartQuoteTimer() {
    window.clearInterval(quoteTimer);
    quoteTimer = window.setInterval(() => showQuote(quoteIndex + 1), 12000);
  }

  function showFallback() {
    reviewStars.textContent = "";
    quoteText.textContent = "";
    quoteName.textContent = "";
    quoteControls.hidden = true;
    reviewSummary.hidden = true;
    reviewCard.classList.add("reviews-fallback");
  }

  function renderReviews(data) {
    reviews = (data.reviews || []).filter((r) => r && r.text && r.author);
    if (data.googleMapsUri) {
      reviewSummary.href = data.googleMapsUri;
      reviewAllLink.href = data.googleMapsUri;
    }
    if (typeof data.rating === "number" && data.userRatingCount) {
      reviewSummary.textContent = `${data.rating.toFixed(1)} ★ · ${data.userRatingCount} Google reviews`;
      reviewSummary.hidden = false;
    }
    if (!reviews.length) {
      showFallback();
      return;
    }
    quoteControls.hidden = reviews.length < 2;
    previousButton.addEventListener("click", () => { showQuote(quoteIndex - 1); restartQuoteTimer(); });
    nextButton.addEventListener("click", () => { showQuote(quoteIndex + 1); restartQuoteTimer(); });
    showQuote(0);
    restartQuoteTimer();
  }

  if (reviewCard && window.fetch) {
    fetch("reviews.json", { cache: "no-cache" })
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error(`HTTP ${response.status}`))))
      .then(renderReviews)
      .catch(showFallback);
  } else if (reviewCard) {
    showFallback();
  }
})();
