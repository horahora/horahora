'use strict';
if(typeof document.addEventListener == 'function') {
  document.addEventListener('DOMContentLoaded', function() {

    var portfolio = document.getElementById('portfolio'),
        hand = document.querySelector('#about-me .content');

    var isTouch = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
    if(isTouch) {
      document.documentElement.className += ' touch';
    }

    // 对不支持srcset属性的retina设备回退
    if (window.devicePixelRatio >= 2 && document.createElement('img').srcset === undefined) {
      var imgs = document.querySelectorAll('img');
      for(var i = 0, len = imgs.length; i < len; i++) {
        if(imgs[i].getAttribute('srcset') !== null) {
          var retinaImg = imgs[i].getAttribute('srcset').match(/([^,\s]+@2x\.(?:png|jpg|gif))\s+2x/i)[1];
          imgs[i].setAttribute('src', retinaImg)
        }
      }
    }

    // 滚动到一定程度显示手的滑动动画(考虑添加touchend事件)
    hand.classList.add('transparent');
    window.addEventListener('scroll', function() {
      if(hand.getBoundingClientRect().top + hand.offsetHeight / 3 < window.innerHeight) {
        hand.classList.add('hand-animation');
      }
    }, false)

    // 去除hover状态对动画的干扰
    /*
portfolio.addEventListener('webkitAnimationStart', function(event) {
      event.target.classList.add('disable-hover');
    }, false);
    portfolio.addEventListener('webkitAnimationEnd', function(event) {
      event.target.classList.remove('disable-hover');
      event.target.classList.add('animated');
    }, false);

    portfolio.addEventListener('animationtart', function(event) {
      event.target.classList.add('disable-hover');
    }, false);
    portfolio.addEventListener('animationend', function(event) {
      event.target.classList.remove('disable-hover');
      event.target.classList.add('animated');
    }, false);
*/

  }, false)
}
