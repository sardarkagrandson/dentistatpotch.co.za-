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

  // Patient reviews are read from reviews.json. Only entries marked
  // "approved": true (reviewer has given permission) are shown. If none are
  // approved, or the file can't be loaded, the card falls back to a link to
  // the clinic's Google reviews.
  const reviewCard = document.getElementById("google-reviews");
  const reviewStars = document.getElementById("review-stars");
  const quoteText = document.getElementById("testimonial-text");
  const quoteName = document.getElementById("testimonial-name");
  const quoteControls = document.getElementById("testimonial-controls");
  const quoteCounter = document.getElementById("testimonial-counter");
  const previousButton = document.getElementById("testimonial-previous");
  const nextButton = document.getElementById("testimonial-next");
  const reviewNote = document.getElementById("review-note");
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
    if (review.rating) {
      reviewStars.textContent = starString(review.rating);
      reviewStars.setAttribute("aria-label", `${review.rating} out of 5 stars`);
      reviewStars.hidden = false;
    } else {
      reviewStars.textContent = "";
      reviewStars.hidden = true;
    }
    quoteText.textContent = `“${review.text}”`;
    quoteName.textContent = `— ${review.name}`;
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
    reviewNote.hidden = true;
    reviewCard.classList.add("reviews-fallback");
  }

  function renderReviews(data) {
    reviews = (data.reviews || []).filter((r) => r && r.approved === true && r.text && r.name);
    if (data.googleMapsUri) reviewAllLink.href = data.googleMapsUri;
    if (!reviews.length) {
      showFallback();
      return;
    }
    reviewNote.hidden = false;
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
