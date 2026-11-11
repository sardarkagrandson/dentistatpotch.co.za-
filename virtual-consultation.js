/* Virtual consultation page settings.
 * Edit the values here; the page fills them in on load. */
var VIRTUAL_CONSULT = {
  WEEKDAY_HOURS: "18:00 – 20:00",
  WEEKDAY_COST: "R350",
  WEEKEND_HOLIDAY_HOURS: "13:00 – 18:00",
  WEEKEND_HOLIDAY_COST: "R450",
  // The RecoMed booking link. Patients must choose "Virtual consult" as the reason for the visit.
  RECOMED_URL: "https://www.recomed.co.za/dentist/potchefstroom/jac-jason-jacob/9480/9414/"
};

(function () {
  "use strict";
  var map = {
    "weekday-hours": VIRTUAL_CONSULT.WEEKDAY_HOURS,
    "weekday-cost": VIRTUAL_CONSULT.WEEKDAY_COST,
    "weekend-hours": VIRTUAL_CONSULT.WEEKEND_HOLIDAY_HOURS,
    "weekend-cost": VIRTUAL_CONSULT.WEEKEND_HOLIDAY_COST
  };
  function apply() {
    Object.keys(map).forEach(function (key) {
      Array.prototype.forEach.call(document.querySelectorAll("[data-vc='" + key + "']"), function (el) { el.textContent = map[key]; });
    });
    Array.prototype.forEach.call(document.querySelectorAll("a[data-vc='recomed']"), function (a) { a.href = VIRTUAL_CONSULT.RECOMED_URL; });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", apply); else apply();
})();

/* "What it is" showcase: each item flies in, holds, fades out, then the next. */
(function () {
  "use strict";
  function start() {
    var items = Array.prototype.slice.call(document.querySelectorAll(".vc-show-item"));
    var dots = Array.prototype.slice.call(document.querySelectorAll(".vc-showcase-dots span"));
    if (items.length < 2) return;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { document.querySelector(".vc-showcase").classList.add("vc-showcase-static"); return; }
    var index = 0, HOLD = 2600, LEAVE = 450;
    function show(next) {
      items[index].classList.remove("is-active"); items[index].classList.add("is-leaving");
      dots[index] && dots[index].classList.remove("is-active");
      var leaving = items[index];
      window.setTimeout(function () { leaving.classList.remove("is-leaving"); }, LEAVE);
      index = next;
      items[index].classList.add("is-active");
      dots[index] && dots[index].classList.add("is-active");
    }
    window.setInterval(function () { show((index + 1) % items.length); }, HOLD);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
