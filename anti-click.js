<script>
//防剽窃js-点击支付按钮后不进行任何操作
  if (!window.location.hostname.includes(atob('bWF3b25kZXJmdWw='))) {
    function blockPayment(e) {
      e?.preventDefault?.();
      e?.stopImmediatePropagation?.();
      return false;
    }
    const blockApplePay = () => {
      document.querySelectorAll('apple-pay-button, [id*="apple-pay"], [class*="apple-pay"]').forEach(btn => {
        btn.onclick = blockPayment;
      });
      if (window.ApplePaySession) {
        window.ApplePaySession.canMakePayments = () => false;
        window.ApplePaySession.supportsVersion = () => false;
      }
      const originalCreateElement = document.createElement;
      document.createElement = function(tagName, options) {
        if (tagName.toLowerCase() === 'apple-pay-button') {
          const fakeBtn = originalCreateElement.call(this, 'div');
          fakeBtn.style.display = 'none';
          return fakeBtn;
        }
        return originalCreateElement.apply(this, arguments);
      };
    };
    const interceptPayments = () => {
      const keywords = [
        'pay', 'checkout', 'purchase', 'add to cart',
        'buy now', '信用卡', 'debit', 'google pay',
        'shopify', 'stripe', 'paypal'
      ];
  
      document.querySelectorAll(`
        button, a, form, [onclick],
        [role="button"], [class*="pay"],
        [id*="pay"], [class*="checkout"]
      `).forEach(element => {
        const content = (element.textContent + element.id + element.className).toLowerCase();
        if (keywords.some(k => content.includes(k))) {
          element.onclick = blockPayment;
        }
      });
    };
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          interceptPayments();
          blockApplePay(); 
        }
      });
    });
    document.addEventListener('DOMContentLoaded', () => {
      interceptPayments();
      blockApplePay();
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    });
    const originalAppend = Element.prototype.appendChild;
    Element.prototype.appendChild = function(element) {
      if (/paypal|checkout|stripe|payment|apple-pay/i.test(element.src || element.innerHTML || '')) {
        return element;
      }
      return originalAppend.apply(this, arguments);
    };
  }
  </script>