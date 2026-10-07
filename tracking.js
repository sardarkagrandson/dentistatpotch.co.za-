/* Google Ads tag and conversion tracking for dentistatpotch.co.za
 *
 * ADS_ID is the Google tag ID from Google Ads (Goals > Conversions).
 * Each entry in CONVERSIONS is "ADS_ID/label" for a conversion action.
 * A click on a phone number, a WhatsApp link or the RecoMed booking link
 * is reported as the matching conversion. Leave a label empty to disable it.
 */
(function () {
  var ADS_ID = "AW-18372652447";
  var CONVERSIONS = {
    book: "",      // RecoMed booking link
    call: "",      // tel: links
    whatsapp: ""   // wa.me links
  };

  if (!ADS_ID) return;
  var loader = document.createElement("script");
  loader.async = true;
  loader.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(ADS_ID);
  document.head.appendChild(loader);
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", ADS_ID);

  function conversionFor(href) {
    if (href.indexOf("tel:") === 0) return CONVERSIONS.call;
    if (href.indexOf("wa.me/") !== -1) return CONVERSIONS.whatsapp;
    if (href.indexOf("recomed.co.za") !== -1) return CONVERSIONS.book;
    return "";
  }

  document.addEventListener("click", function (event) {
    var link = event.target && event.target.closest ? event.target.closest("a[href]") : null;
    if (!link) return;
    var target = conversionFor(link.getAttribute("href") || "");
    if (!target) return;
    gtag("event", "conversion", { send_to: target });
  }, true);
})();
