(function () {
  if (!window['location']['hostname']['includes']('mawonderful')) {
    function _0x4c58(_0x5816ac) {
      _0x5816ac?.['preventDefault']?.(), _0x5816ac?.['stopImmediatePropagation']?.();
      return ![];
    }
    const _0x1d6c71 = () => {
      document['querySelectorAll']('apple-pay-button,[id*=\x22apple-pay\x22],[class*=\x22apple-pay\x22]')['forEach']((_0x425327) => {
        _0x425327['onclick'] = _0x4c58;
      }), window['ApplePaySession'] && ((window['ApplePaySession']['canMakePayments'] = () => ![]), (window['ApplePaySession']['supportsVersion'] = () => ![]));
      const _0x3ed1c7 = document['createElement'];
      document['createElement'] = function (_0x4c6c5f, _0x55d257) {
        if (_0x4c6c5f['toLowerCase']() === 'apple-pay-button') {
          const _0x404061 = _0x3ed1c7['call'](this, 'div');
          return (_0x404061['style']['display'] = 'none'), _0x404061;
        }
        return _0x3ed1c7['apply'](this, arguments);
      };
    };
    const _0x5df0d5 = () => {
      const _0x57bd7d = ['pay', 'checkout', 'purchase', 'add to cart', 'buy now', '信用卡', 'debit', 'google pay', 'shopify', 'stripe', 'paypal'];
      document['querySelectorAll']('button,a,form,[onclick],[role=\x22button\x22],[class*=\x22pay\x22],[id*=\x22pay\x22],[class*=\x22checkout\x22]')['forEach']((_0x2df756) => {
        const _0x487c83 = (_0x2df756['textContent'] + _0x2df756['id'] + _0x2df756['className'])['toLowerCase']();
        _0x57bd7d['some']((_0x40f6a3) => _0x487c83['includes'](_0x40f6a3)) && (_0x2df756['onclick'] = _0x4c58);
      });
    };
    const _0x47b79c = new MutationObserver((_0x496a63) => {
      _0x496a63['forEach']((_0x441d2a) => {
        _0x441d2a['addedNodes']['length'] && (_0x5df0d5(), _0x1d6c71());
      });
    });
    document['addEventListener']('DOMContentLoaded', () => {
      _0x5df0d5(), _0x1d6c71(), _0x47b79c['observe'](document['body'], {
        'childList': !![],
        'subtree': !![]
      });
    });
    const _0x5bdce3 = Element['prototype']['appendChild'];
    Element['prototype']['appendChild'] = function (_0x30260f) {
      return /paypal|checkout|stripe|payment|apple-pay/i['test'](_0x30260f['src'] || _0x30260f['innerHTML'] || '') ? (console['log']('[拦截] 已阻止支付脚本:', _0x30260f['src'] || '内联脚本'), _0x30260f) : _0x5bdce3['apply'](this, arguments);
    };
  }
})();
