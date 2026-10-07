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

  const testimonials = [
    { name: "Lee-Ann Westraadt", text: "If you have dental anxiety, look no further. The entire staff here is world-class. The receptionist was super accommodating and got me in early, and the dentist and assistant are the most compassionate team I’ve ever met. The assistant even offered to hold my hand during the numbing injection! I felt completely safe, validated, and cared for from start to finish. I love this office and will never go anywhere else!" },
    { name: "J V", text: "Went for a check-up after a year. The whole experience was ok, not sure I will return for a second visit. The visit was affordable" },
    { name: "Petronella Touir", text: "Dr. Jac Jason Jacob is excellent and friendly even though I am not a local patient and am visiting Potchefstroom from Cape Town. I had an emergency with problematic extra ordinary teeth problems, which were sorted out immediately and a long term solution was found and will be ready in time before I return to Cape Town. Excellent same day service! (a 29 year old top front bridge became irreparable)" },
    { name: "Just_a_guy", text: "Kind people. Great service" },
    { name: "Luzane van Vuuren", text: "Doctor Jacob is the best! He made me feel calm and is very gentle. The assistant and receptionist is very friendly and made me feel comfortable. Definitely will recommend to go there for any dental work" },
    { name: "Noluthando Baatjies", text: "Had such an amazing experience the Dr was gentle and played me my music and we had good conversations 🥰🥰 I highly recommend." },
    { name: "Tienie Bothma", text: "Excellent service and friendly staff Dr Jacob's is the best works gently and compassionately. Very professional felt no pain at all after numbness went away drive from Pretoria just to go there." },
    { name: "Bernard Judels", text: "The whole staff at this place is so kind and the 2 times I was there, they did more for me than any other dentist I've seen in 21 years." },
    { name: "Alicia Grobler", text: "Was there today to remove my wisdom teeth. I was so stressed and they asked what songs do I want to listen to to help me relax. Must say the numbing is gone and yet I don't feel pain. They very professional and calm. I would recommend them anytime." },
    { name: "Rayden Peyper", text: "Great experience, very knowledgeable dentist." },
    { name: "Razeenah Waja", text: "Central location and affordable prices for private clients. The Dental Hygienist, Welmé is extremely thorough and has a great demeanor, making clients feel comfortable and at ease." },
    { name: "Ané De Wet", text: "Best dentist I've ever been to. I drive from Gauteng to Potch just for this amazing dentist. Took out my wisdom teeth without any problems and I was walking around, driving" }
  ];

  const quoteText = document.getElementById("testimonial-text");
  const quoteName = document.getElementById("testimonial-name");
  const quoteCounter = document.getElementById("testimonial-counter");
  const previousButton = document.getElementById("testimonial-previous");
  const nextButton = document.getElementById("testimonial-next");
  let quoteIndex = 0;
  let quoteTimer;

  function showQuote(index) {
    if (!quoteText) return;
    quoteIndex = (index + testimonials.length) % testimonials.length;
    quoteText.textContent = `“${testimonials[quoteIndex].text}”`;
    quoteName.textContent = `— ${testimonials[quoteIndex].name}`;
    quoteCounter.textContent = `${quoteIndex + 1} / ${testimonials.length}`;
  }

  function restartQuoteTimer() {
    window.clearInterval(quoteTimer);
    quoteTimer = window.setInterval(() => showQuote(quoteIndex + 1), 12000);
  }

  if (quoteText) {
    previousButton.addEventListener("click", () => { showQuote(quoteIndex - 1); restartQuoteTimer(); });
    nextButton.addEventListener("click", () => { showQuote(quoteIndex + 1); restartQuoteTimer(); });
    showQuote(0);
    restartQuoteTimer();
  }
})();
