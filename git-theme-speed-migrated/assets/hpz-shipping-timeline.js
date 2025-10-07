// hpz-shipping-timeline.js — FINAL SAFE VERSION
(function () {
  function readPayloadFromDom() {
    var el = document.getElementById('hpz-shipping-timeline');
    if (!el) return {};
    try { return JSON.parse(el.getAttribute('data-json') || '{}'); } catch (e) { return {}; }
  }

  function writeTimelineToCartAttributes(payload) {
    return fetch('/cart/update.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        attributes: {
          shipping_timeline_weekday: payload.weekday || '',
          shipping_timeline_weekend: payload.weekend || ''
        }
      })
    });
  }

  // --- Auto-write when cart/drawer has payload (non-blocking)
  function autoWriteOnCartIfPresent() {
    try {
      var payload = readPayloadFromDom();
      if (payload && (payload.weekday || payload.weekend)) {
        writeTimelineToCartAttributes(payload).catch(function(){});
        console.debug('HPZ: autoWriteOnCartIfPresent fired', payload);
      }
    } catch (e) {}
  }

  // --- Background write when adding to cart (does not block mini-cart UX)
  function backgroundWriteOnAddToCart() {
    try {
      var forms = Array.from(document.querySelectorAll('form')).filter(function (f) {
        var a = (f.getAttribute('action') || '').toLowerCase();
        return a.indexOf('/cart') !== -1 || a.indexOf('/cart/add') !== -1;
      });
      forms.forEach(function (form) {
        if (form.__hpz_bg_bound) return;
        form.__hpz_bg_bound = true;
        form.addEventListener('submit', function () {
          try {
            var payload = readPayloadFromDom();
            if (payload && (payload.weekday || payload.weekend)) {
              writeTimelineToCartAttributes(payload).catch(function(){});
              console.debug('HPZ: backgroundWriteOnAddToCart initiated', payload);
            }
          } catch (e) {}
        }, { passive: true });
      });
    } catch (e) {}
  }

  // --- Intercept checkout form submission (cart → checkout)
  function interceptCheckoutForm() {
    var form = document.querySelector('form[action="/cart"]');
    if (!form || form.__hpzBound) return;
    form.__hpzBound = true;

    form.addEventListener('submit', function (ev) {
      var btn = ev.submitter || document.activeElement;
      var isCheckout = btn && btn.name === 'checkout';
      if (!isCheckout) return; // not the checkout submission

      var payload = readPayloadFromDom();
      if (!payload || (!payload.weekday && !payload.weekend)) return;

      ev.preventDefault();
      ev.stopImmediatePropagation();

      var timeout = setTimeout(function () {
        form.submit();
      }, 1200);

      writeTimelineToCartAttributes(payload).then(function () {
        clearTimeout(timeout);
        form.submit();
      }).catch(function () {
        clearTimeout(timeout);
        form.submit();
      });
    }, true);
  }

  // --- Init
  function init() {
    autoWriteOnCartIfPresent();
    backgroundWriteOnAddToCart();
    interceptCheckoutForm();

    // rebind if theme injects forms later
    setTimeout(backgroundWriteOnAddToCart, 1000);
    setTimeout(backgroundWriteOnAddToCart, 2500);
    setTimeout(interceptCheckoutForm, 1000);
    setTimeout(interceptCheckoutForm, 2500);

    console.debug('HPZ: timeline init complete');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
