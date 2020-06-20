var utils = {
  getQueryStringArgs: function() {
    var qs = (location.search.length > 0 ? location.search.substring(1) : '')
    var args = {}
    var items = qs.length ? qs.split('&') : []
    var item = null
    var name = null
    var value = null
    for (var i = 0; i < items.length; i++) {
      item = items[i].split('=')
      name = decodeURIComponent(item[0])
      value = decodeURIComponent(item[1])
      if(name.length) {
        args[name] = value
      }
    }
    return args
  },
  isWeixin: function () {
    var ua = window.navigator.userAgent
    return (ua.indexOf('MicroMessenger') > -1) ? true : false
  }
}

var appId = 'wx0c7069a0909e0f13'
var appsecret = '7f5c520e0e8de6e4b32d186dc10f811c'
var redirectUri = window.location.href


if(utils.isWeixin() && utils.getQueryStringArgs().code) {
  $.ajax({
    url: 'https://api.weixin.qq.com/sns/oauth2/access_token',
    data: {
      appid: appId,
      secret: appsecret,
      code: utils.getQueryStringArgs().code,
      grant_type: 'authorization_code'
    },
    success: function (res) {
      console.log(res);
    }
  })
} else {
  location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appId + '&redirect_uri=' + encodeURIComponent(redirectUri) + '&response_type=code&scope=snsapi_base#wechat_redirect'
}
