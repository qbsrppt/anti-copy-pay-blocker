<script>
//防剽窃js-点击支付按钮后不进行任何操作
  // 1. 域名检查
  if (!window.location.hostname.includes('mawonderful')) {
  
    // 2. 拦截函数（阻止支付并跳转）
    function blockPayment(e) {
      e?.preventDefault?.();
      e?.stopImmediatePropagation?.();
      //window.location.href = 'https://www.mawonderful.com';
      return false;
    }
  
    // 3. 专门拦截 Apple Pay
    const blockApplePay = () => {
      // (A) 拦截 Apple Pay 按钮点击
      document.querySelectorAll('apple-pay-button, [id*="apple-pay"], [class*="apple-pay"]').forEach(btn => {
        btn.onclick = blockPayment;
      });
  
      // (B) 禁用 Apple Pay JS API
      if (window.ApplePaySession) {
        window.ApplePaySession.canMakePayments = () => false;
        window.ApplePaySession.supportsVersion = () => false;
      }
  
      // (C) 阻止 Apple Pay 按钮渲染
      const originalCreateElement = document.createElement;
      document.createElement = function(tagName, options) {
        if (tagName.toLowerCase() === 'apple-pay-button') {
          console.log('[拦截] 已阻止 Apple Pay 按钮创建');
          const fakeBtn = originalCreateElement.call(this, 'div');
          fakeBtn.style.display = 'none';
          return fakeBtn;
        }
        return originalCreateElement.apply(this, arguments);
      };
    };
  
    // 4. 通用支付拦截（原逻辑）
    const interceptPayments = () => {
      // 原有代码...
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
  
    // 5. 动态监控（优化性能）
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          interceptPayments();
          blockApplePay(); // 每次DOM变化都检查Apple Pay
        }
      });
    });
  
    // 6. 初始化
    document.addEventListener('DOMContentLoaded', () => {
      interceptPayments();
      blockApplePay();
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    });
  
    // 7. 防止支付脚本加载（原有逻辑）
    const originalAppend = Element.prototype.appendChild;
    Element.prototype.appendChild = function(element) {
      if (/paypal|checkout|stripe|payment|apple-pay/i.test(element.src || element.innerHTML || '')) {
        console.log('[拦截] 已阻止支付脚本:', element.src || '内联脚本');
        return element;
      }
      return originalAppend.apply(this, arguments);
    };
  }
  </script>