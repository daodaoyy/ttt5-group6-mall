/**
 * 客户端识别及基本属性与事件获取
 */

/*eslint-disable */
(function (global, baseFontSize) {
  if ('sysType' in global) {
    return !0;
  }
  var countScale;
  var setScale;
  var ua = navigator.userAgent.toLowerCase();
  // alert(ua);
  var doc = global.document;
  var docElem = doc.documentElement;
  var viewSet = doc.querySelector('meta[name="viewport"]');
  var isTouchPad = (/hp-tablet/gi).test(navigator.appVersion);
  var hasTouch = 'ontouchstart' in global && !isTouchPad;
  var Sys = {
    hasTouch: hasTouch,
    evStart: hasTouch ? 'touchstart' : 'mousedown',
    evMove: hasTouch ? 'touchmove' : 'mousemove',
    evEnd: hasTouch ? 'touchend' : 'mouseup',
    evInput: ('\v' === 'v') ? 'propertychange' : 'input',
    evResize: 'onresize' in global ? 'resize' : 'orientationchange',
    evTap: typeof global.Zepto === 'function' ? 'tap' : 'click',
  };
  // 增加class
  function addClass(klass) {
    docElem.className === '' ? docElem.className += klass : docElem.className += ' ' + klass;
  }
  // 判断浏览器类型与客户端类型
  (function () {
    /* eslint max-len: 0 */
    var s;
    // 微信
    (s = ua.match(/messenger\/([\d.]+)/)) ? (Sys.webOs = s[1], Sys.browser = 'weixin', addClass('weixin'))
      // 微博
      : (s = ua.match(/(webos|hpwos)[\s\/]([\d.]+)/)) ? (Sys.webOs = s[2], Sys.browser = 'webo', addClass('webo'))
        // IE
        : (s = ua.match(/(msie |trident\/)([\d.]+)/)) ? (Sys.ie = s[1], Sys.browser = 'ie', addClass('ie'))
          // 火狐
          : (s = ua.match(/firefox\/([\d.]+)/)) ? (Sys.firefox = s[1], Sys.browser = 'firefox', addClass('firefox'))
            // 谷歌
            : (s = ua.match(/chrome\/([\d.]+)/)) ? (Sys.chrome = s[1], Sys.browser = 'chrome', addClass('chrome'))
              // 欧朋
              : (s = ua.match(/opera.([\d.]+)/)) ? (Sys.opera = s[1], Sys.browser = 'opera', addClass('opera'))
                // 苹果
                : (s = ua.match(/version\/([\d.]+).*safari/)) ? (Sys.safari = s[1], Sys.browser = 'safari', addClass('safari')) : !1;
    // vivo手机特殊化
    (s = ua.match(/vivobrowser\/([\d.]+)/)) ? (Sys.vivo = s[1], Sys.isVivo = 'vivo', addClass('vivo')) : !1;

    // 客户端类型
    (s = ua.match(/windows.* ([\d.]+)\;/)) ? (Sys.windows = s[1], Sys.facility = 'windows', addClass('win-pc')) : (s = ua.match(
      /mac.*x ([\d.]+)\;/)) ? (Sys.windows = s[1], Sys.facility = 'osx', addClass('mac-pc')) : (s = ua.match(/iphone.* ([\d]+)\_([\d])/)) ?
        (Sys.ios = s[2] ? (s[1] + s[2]) / 10 : s[1], Sys.facility = 'iphone', addClass('ios')) : (s = ua.match(/ipad.* ([\d]+)\_([\d])\_/)) ? (
          Sys.ios = s[2] ? (s[1] + s[2]) / 10 : s[1], Sys.facility = 'ipad', addClass('ios')) : (s = ua.match(/android ([\d.]+)\;/)) ? (Sys.android =
            s[1], Sys.facility = 'android', addClass('android')) : !1;

    // 是否移动端
    (s = ua.match(/(mobile|silk-accelerated=true)/)) ? Sys.mobile = !0 : !1;
    Sys.telPrefix = Sys.facility === 'android' && parseInt(Sys.android, 10) < 4 ? 'tel://' : 'tel:';
    global.sysType = Sys;
    // alert(JSON.stringify(Sys));
  })();
  // 写入根字体大小
  function writeBaseFontSize() {
    if (location.pathname === '/app/download') {
      return false;
    }
    if (countScale > 1) {
      global.rem = baseFontSize / 2 * (docElem.getBoundingClientRect().width / 375);
    } else {
      global.rem = baseFontSize / 2 * countScale;
    }
    docElem.style.fontSize = global.rem + 'px';
  }
  // 没有viewport标签
  if (!viewSet) {
    viewSet = doc.createElement('meta');
    viewSet.setAttribute('name', 'viewport');
    doc.head.appendChild(viewSet);
  }

  // 计算缩放倍率
  if (!countScale || !setScale) {
    countScale = global.devicePixelRatio;
    if (Sys.facility === 'iphone') {
      countScale = countScale >= 3 ? 3 : countScale >= 2 ? 2 : 1;
    } else {
        countScale = 1;
      countScale = global.devicePixelRatio >= 3 ? 3 : global.devicePixelRatio >= 2 ? 2 : 1;
    }
    setScale = 1 / countScale;
    viewSet.setAttribute('content', `width=device-width,user-scalable=no,initial-scale=${setScale},maximum-scale=${setScale},minimum-scale=${setScale},viewport-fit=cover`);
    global.dpr = countScale;
  }

  // 屏幕旋转重新计算
  var delay;
  global.addEventListener(Sys.evResize, function () {
    clearTimeout(delay);
    delay = setTimeout(writeBaseFontSize, 10);
  }, !1);
  // 记录首次加载时间
  global.addEventListener('load', (e) => {
    global.loadTime = Date.now();
  });
  // 如果页面使用了bfcache，强制刷新
  global.addEventListener('pageshow', (e) => {
    // let curTime = Date.now();
    // // 如果浏览器有persisted属性或当前时间超过首次加载时间很长
    // if (e.persisted || (curTime - global.loadTime > 1000)) {
    //     return location.reload();
    // }
  });

  writeBaseFontSize();
})(window, 100);
