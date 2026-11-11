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
