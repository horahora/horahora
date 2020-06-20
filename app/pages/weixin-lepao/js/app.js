
  /*
var time,
      weixinId,
      stepsGoal,
      sportShow = true,
      dataSport = { steps: 0, calorie: 0, distance: 0 },
      dataSleep = { deepSleep: 0, shallowSleep: 0, noSleep: 0 },
      dataTrendSport = [],
      dataTrendSleep = [],
      dateInterval = 1, // 日期间隔 1天，10天，20天
      hours24 = [01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
      chartSport = document.getElementById('chart-sport') ? echarts.init(document.getElementById('chart-sport')) : null,
      chartSleep = document.getElementById('chart-sleep') ? echarts.init(document.getElementById('chart-sleep')) : null,
      chartSteps = document.getElementById('chart-steps') ? echarts.init(document.getElementById('chart-steps')) : null,
      chartCalorie = document.getElementById('chart-calorie') ? echarts.init(document.getElementById('chart-calorie')) : null,
      chartDistance = document.getElementById('chart-distance') ? echarts.init(document.getElementById('chart-distance')) : null;
*/
  
  
  var time,
      weixinId;
  
/*
  // 获取 url 中的 time 和 weixinId 参数
  function getTimeAndWeixinIdArgs() {
    var qs = location.search.length > 0 ? location.search.slice(1) : '';
    if(qs.indexOf('weixinId') > -1 && qs.indexOf('time') > -1) {
      time = parseInt(qs.match(/time=([^&]*)/)[1]);
      weixinId = qs.match(/weixinId=([^&]*)/)[1];
    }
  }
*/
  
/*
  // 改变全局导航的url
  function changeGlobalNav() {
    $('#global-nav a').each(function() {
      var href = $(this).attr('href');
      href += '?time=' + time + '&weixinId=' + weixinId;
      $(this).attr('href', href);
    })
  }
*/
  
/*
  // Tab
  $('.nav-tabs > li > a').on('click', function(event) {
    event.preventDefault();
    var $navTabs = $(this).closest('.nav-tabs'),
        $tabPane = $navTabs.next('.tab-content').find('.tab-pane');
    $navTabs.children('li').removeClass('active');
    $(this).parent('li').addClass('active');
    $tabPane.removeClass('active');
    $($(this).attr('href')).addClass('active');
  })
*/
  
  // 转换毫秒
  function convertMS(ms) {
    var d, h, m, s;
    s = Math.floor(ms / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    d = Math.floor(h / 24);
    h = h % 24;
    return {
      d: d,
      h: h,
      m: m,
      s: s
    };
  };
  
  
  
 
  