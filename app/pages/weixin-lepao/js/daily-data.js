$(function() {  
  
  var time,
      weixinId,
      stepsGoal,
      sport = true,
      dataSport = { steps: 0, calorie: 0, distance: 0 },
      dataSleep = { deepSleep: 0, shallowSleep: 0, noSleep: 0 },
      hours24 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
      chartSport = document.getElementById('chart-sport') ? echarts.init(document.getElementById('chart-sport')) : null,
      chartSleep = document.getElementById('chart-sleep') ? echarts.init(document.getElementById('chart-sleep')) : null;
  
    getTimeAndWeixinIdArgs();
    changeDate();
    changeGlobalNav();
  
  
  // 初始化运动图表
  function initChartSport() {
    if (!chartSport) return;
    chartSport.resize();
    chartSport.clear();
    chartSport.setOption({
      series: [
        {
          name: '运动数据',
          type: 'pie',
          radius : ['90%', '100%'],
          itemStyle: {
            normal: {
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            }
          },
          data: [
            {
              value: (dataSport.steps > stepsGoal) ? stepsGoal : dataSport.steps,
              name: '步数完成',
              itemStyle: {
                normal: {
                  color: '#96e62a',
                  label: {
                    show: true,
                    position: 'center',
                    textStyle: {
                      color: '#4d4d4d',
                      fontSize: 13
                    },
                    formatter: function(a, b, c, d) {
                      return b + '\n\n\n\n\n目标:' + stepsGoal + '步'
                    }
                  }
                }
              }
            },
            {
              value: (dataSport.steps > stepsGoal) ? 0 : stepsGoal - dataSport.steps,
              name: '步数剩余',
              itemStyle: {
                normal: {
                  color: '#ddd',
                  label: {
                    show: true,
                    position: 'center',
                    textStyle: {
                      color: '#4d4d4d',
                      fontSize: 50
                    },
                    formatter: function(a, b, c, d) {
                      return Math.round((dataSport.steps / stepsGoal)*100) + '%'
                    }
                  }  
                }
              }
            }
          ]
        }
      ]
    });
  }
  
  // 初始化睡眠图表
  function initChartSleep() {
    if (!chartSleep) return;
    chartSleep.resize();
    chartSleep.clear();
    var color = ['#277fbe', '#74c0f4', '#fcbd49'];
    // 三者都是0的情况
    if(dataSleep.deepSleep === 0 && dataSleep.shallowSleep === 0 && dataSleep.noSleep === 0) {
      dataSleep.noSleep = 100;
      color[2] = '#b2b2b2';
    }
    chartSleep.setOption({
      series: [
        {
          name: '睡眠数据',
          type: 'pie',
          radius : ['75%', '100%'],
          itemStyle: {
            normal: {
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            }
          },
          data: [
            {
              value: dataSleep.deepSleep,
              name: '深睡状态',
              itemStyle: {
                normal: {
                  color: color[0],
                  label: {
                    show: true,
                    position: 'center',
                    textStyle: {
                      color: '#4d4d4d',
                      fontSize: 15,
                      baseline : 'bottom'
                    },
                    formatter: function(a, b, c, d) {
                      return '睡眠\n'
                    }
                  }
                }
              }
            },
            {
              value: dataSleep.shallowSleep,
              name: '浅睡状态',
              itemStyle: {
                normal: {
                  color: color[1],
                  label: {
                    show: true,
                    position: 'center',
                    textStyle: {
                      color: '#4d4d4d',
                      fontSize: 22,
                      baseline : 'top'
                    },
                    formatter: function(a, b, c, d) {
                      return convertMS(dataSleep.deepSleep + dataSleep.shallowSleep).h + '小时' + convertMS(dataSleep.deepSleep + dataSleep.shallowSleep).m + '分'
                    }
                  }
                }
              }
            },
            {
              value: dataSleep.noSleep,
              name: '清醒状态',
              itemStyle: {
                normal: {
                  color: color[2]
                }
              }
            }
          ]
        }
      ]
    })
  }  
  
  // 插入运动数据
  function insertSportData() {
    $('.data-steps .data-content').html(dataSport.steps + '步');
    $('.data-calorie .data-content').html(dataSport.calorie + '大卡');
    $('.data-distance .data-content').html(dataSport.distance + '米');
  }
  
  // 插入睡眠数据
  function insertSleepData() {
    $('.data-deep-sleep .data-content').html(convertMS(dataSleep.deepSleep).h + '小时' + convertMS(dataSleep.deepSleep).m + '分');
    $('.data-shallow-sleep .data-content').html(convertMS(dataSleep.shallowSleep).h + '小时' + convertMS(dataSleep.shallowSleep).m + '分');
    $('.data-no-sleep .data-content').html(convertMS(dataSleep.noSleep).h + '小时' + convertMS(dataSleep.noSleep).m + '分');
  }
  
  // 获取 运动或睡眠数据
  function getSportOrSleepData() {
    /*
     * index=1时，按小时统计，默认统计最近24小时。
     * index=2时，按天统计，默认统计最近30天。
     * index=3时，按周统计，默认统计最近12周。
     * index=4时，按月统计，默认统计最近12月。
     * index=5时，统计所有数据。
     * index为其他时，设置为1。
     * time 需要统计的截止日期。
     * num 指统计多少个小时，天，周，月，默认如上。从1开始计算。
     * sportOrSleep: 1是sport, 2是sleep
     * 第一次进入时，url中的search部分例子 ?time=1394899200000&weixinId=oWuSJuAZvpswI5t5bhWX84V4P0bQ   需记住其 time 和 weixinId
     * 请求 例子 url http://114.255.24.42/order/h/v2/user/getSportOrSleepDataByIndex?index=2&time=1394899200000&num=1&sportOrSleep=1&weixinId=oWuSJuAZvpswI5t5bhWX84V4P0bQ
     */
    $.ajax({
      url: 'http://114.255.24.42/order/h/v2/user/getSportOrSleepDataByIndex',
      dataType: 'json',
      cache: false,
      data: {
        index: 2,
        time: time,
        num: 1,
        sportOrSleep: sport ? 1 : 2,
        weixinId: weixinId
      }
    }).then(function(data) {
      if(sport) {
        stepsGoal = data.stepsGoal; // 目标步数
        $('#steps-goal').html(data.stepsGoal);
        if(data.sportDatas.length > 0) {
          dataSport.steps = data.sportDatas[0].steps; // 步数
          dataSport.calorie = data.sportDatas[0].calorie; // 卡路里
          dataSport.distance = data.sportDatas[0].distance; // 里程
        } else {
          dataSport.steps = 0;
          dataSport.calorie = 0;
          dataSport.distance = 0;
        }
        initChartSport();
        insertSportData();
      } else {
        dataSleep.deepSleep = data.avgSleepData.deepSleep, // 深睡时间（毫秒）
        dataSleep.shallowSleep = data.avgSleepData.shallowSleep, // 浅睡时间（毫秒）
        dataSleep.noSleep = data.avgSleepData.noSleep // 清醒时间（毫秒）
        initChartSleep();
        insertSleepData();
      }
    });
  }
  
  // Tab
  $('.nav-tabs > li > a').on('click touchend', function(event) {
    event.preventDefault();
    var $navTabs = $(this).closest('.nav-tabs'),
        $tabPane = $navTabs.next('.tab-content').find('.tab-pane');
    $navTabs.children('li').removeClass('active');
    $(this).parent('li').addClass('active');
    $tabPane.removeClass('active');
    $($(this).attr('href')).addClass('active');
  });
  
  // 显示日期
  function changeDate() {
    var month = new Date(time).getMonth(),
        day = new Date(time).getDate(),
        hash = location.hash || '#sport';
    history.replaceState(null, '', '?time=' + time + '&weixinId=' + weixinId + hash);
    if(month === new Date(Date.now()).getMonth() && day === new Date(Date.now()).getDate()) {
      $('.data-date').html('今天');
      $('.date-next').addClass('inactive');
    } else {
      $('.data-date').html((month + 1) + '月' + day + '日');
      $('.date-next').removeClass('inactive');
    }
  }
  
  // 切换 date-nav
  function toggleDateNav() {
    if(new Date(time).getMonth() === new Date(Date.now()).getMonth() && new Date(time).getDate() === new Date(Date.now()).getDate()) {
      $(this).addClass('inactive')
    } else {
      $(this).removeClass('inactive');
    }
  }
  
  
  // 运动 上一日
  $('#sport .date-prev').on('click touchend', function(event) {
    event.preventDefault();
    time -= 24*60*60*1000;
    changeDate();
    changeGlobalNav();
    getSportOrSleepData();
    toggleDateNav();
  });
  
  // 运动 下一日
  $('#sport .date-next').on('click touchend', function(event) {
    event.preventDefault();
    time += 24*60*60*1000;
    changeDate();
    changeGlobalNav();
    getSportOrSleepData();
    toggleDateNav();
  });
  
  $('[href=#tab-sport]').on('click touchend', function() {
    sport = true;
    getSportOrSleepData();
/*     $('.nav-tabs li.active a').click(); */
    history.replaceState(null, '', '#sport');
    changeGlobalNav();
  })
  
  $('[href=#tab-sleep]').on('click touchend', function() {
    sport = false;
    getSportOrSleepData();
/*     $('.nav-tabs li.active a').click(); */
    history.replaceState(null, '', '#sleep');
    changeGlobalNav();
  })
  
  console.log(location.hash.split('#')[1])
  $('[href=#tab-' + location.hash.split('#')[1] + ']').click();
  
  // 获取 url 中的 time 和 weixinId 参数
  function getTimeAndWeixinIdArgs() {
    var qs = location.search.length > 0 ? location.search.slice(1) : '';
    if(qs.indexOf('weixinId') > -1 && qs.indexOf('time') > -1) {
      time = parseInt(qs.match(/time=([^&]*)/)[1]);
      weixinId = qs.match(/weixinId=([^&]*)/)[1];
    }
  }
  
  // 改变全局导航的url
  function changeGlobalNav() {
    $('#global-nav a').each(function() {
      var href = $(this).data('href');
      href += '?time=' + time + '&weixinId=' + weixinId + location.hash;
      $(this).attr('href', href);
    })
  }
  
  // 不使导航有记录留在history中
  $('#global-nav a').on('click touchend', function(event) {
    event.preventDefault();
    location.replace(this.href);
  });
  
  // 返回今天的时间戳（不含小时）
  function todayTimestamp() {
    return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime();
  }
  
  
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

  
  // 窗口改变大小时，重设图表的尺寸
  $(window).on('resize', function() {
    if(chartSport) chartSport.resize();
    if(chartSleep) chartSleep.resize();
  })
  
});