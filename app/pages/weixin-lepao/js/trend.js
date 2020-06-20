$(function() {
  
  var time,
      weixinId,
      dataTrendSport = [],
      dataTrendSleep = [],
      totalDeepSleep = {h: 0, m:0},
      totalShallowSleep = {h: 0, m:0},
      totalNoSleep = {h: 0, m:0},
      day1 = 86400000, // 1天的毫秒数
      dateInterval = 1, // 日期间隔 1天，10天，20天
      dateList = [], // 区间日期列表
      dateTimestampList = [],
      trendSport = true,
      hours24 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
      chartSteps = document.getElementById('chart-steps') ? echarts.init(document.getElementById('chart-steps')) : null,
      chartCalorie = document.getElementById('chart-calorie') ? echarts.init(document.getElementById('chart-calorie')) : null,
      chartDistance = document.getElementById('chart-distance') ? echarts.init(document.getElementById('chart-distance')) : null,
      chartTrendSleep = document.getElementById('chart-trend-sleep') ? echarts.init(document.getElementById('chart-trend-sleep')) : null;
  
    getTimeAndWeixinIdArgs();
    changeIntervalDate();
    changeGlobalNav();
    
  
  // 初始化趋势－步数
  function initChartSteps() {
    if (!chartSteps) return;
    chartSteps.resize();
    chartSteps.clear();
    var chartX = [];
    var chartY = [];
    if(dataTrendSport.length > 0) {
      $.each(dataTrendSport, function(index, value) {
        chartY.push(value.steps);
      });
    } else {
      chartY = [{
        value: 1000, // 无数据时，y轴最高点
        itemStyle: {
          normal: {
            color: 'rgba(0, 0, 0, 0)'
          },
          emphasis: {
            color: 'rgba(0, 0, 0, 0)'
          }
        }
      }];
    }
    
    $.each(dateList, function(index, value) {
      if(value.day === 1 || value.day === 2) {
        chartX.push(value.day + "\n" + '(' + value.month + '月)');
      } else {
        chartX.push(value.day);
      }
    });

    if(dateInterval === 1) {
      chartX = hours24
    }
    chartSteps.setOption({
      grid: {
        x: 60,
        y: 15,
        x2: 35,
        y2: 40,
        borderColor: 'transparent'
      },
      xAxis: [
        {
          name: dateInterval === 1 ? '小时' : '天',
          axisLine: {
            lineStyle: {
              color: '#444554',
            }
          },
          axisLabel: {
            interval: 1
          },
          axisTick: { show: false },
          splitLine: { show: false },
          type: 'category',
          data: chartX
        }
      ],
      yAxis: [
        {
          splitNumber: 6,
          axisLine: {
            lineStyle: {
              color: '#444554',
            }
          },
          axisLabel: {
            formatter: '{value}步'
          },
          splitLine: {
            lineStyle: {color: ['#898ba0']}
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['rgba(255,255,255,0)','#e2e2e2']
            }
          },
          type: 'value'
        }
      ],
      series: [
        {
          name: '步数',
          type: 'bar',
          data: chartY,
          itemStyle: {
            normal: {
              color: '#f5752c'
            }
          }
        }
      ]
    }); 
  }
  
  // 初始化趋势－卡路里
  function initChartCalorie() {
    if (!chartCalorie) return;
    chartCalorie.resize();
    chartCalorie.clear();
        
    var chartX = [];
    var chartY = [];
    if(dataTrendSport.length > 0) {
      $.each(dataTrendSport, function(index, value) {
        chartY.push(value.calorie);
      });
    } else {
      chartY = [{
        value: 1000, // 无数据时，y轴最高点
        itemStyle: {
          normal: {
            color: 'rgba(0, 0, 0, 0)'
          },
          emphasis: {
            color: 'rgba(0, 0, 0, 0)'
          }
        }
      }];
    }
    
    $.each(dateList, function(index, value) {
      if(value.day === 1 || value.day === 2) {
        chartX.push(value.day + "\n" + '(' + value.month + '月)');
      } else {
        chartX.push(value.day);
      }
    });
    
    if(dateInterval === 1) {
      chartX = hours24
    }
    chartCalorie.setOption({
      grid: {
        x: 60,
        y: 15,
        x2: 35,
        y2: 40,
        borderColor: 'transparent'
      },
      xAxis: [
        {
          name: dateInterval === 1 ? '小时' : '天',
          axisLine: {
            lineStyle: {
              color: '#444554',
            }
          },
          axisLabel: {
            interval: 1
          },
          axisTick: { show: false },
          splitLine: { show: false },
          type: 'category',
          data: chartX
        }
      ],
      yAxis: [
        {
          splitNumber: 6,
          axisLine: {
            lineStyle: {
              color: '#444554',
            }
          },
          axisLabel: {
            formatter: '{value}大卡'
          },
          splitLine: {
            lineStyle: {color: ['#898ba0']}
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['rgba(255,255,255,0)','#e2e2e2']
            }
          },
          type: 'value'
        }
      ],
      series: [
        {
          name: '卡路里',
          type: 'bar',
          data: chartY,
          itemStyle: {
            normal: {
              color: '#f13d6c'
            }
          }
        }
      ]
    }); 
    
  } 
  
  // 初始化趋势－里程
  function initChartDistance() {
    if (!chartDistance) return;
    chartDistance.resize();
    chartDistance.clear();
    var chartX = [];
    var chartY = [];
    if(dataTrendSport.length > 0) {
      $.each(dataTrendSport, function(index, value) {
        chartY.push(value.distance);
      });
    } else {
      chartY = [{
        value: 1000, // 无数据时，y轴最高点
        itemStyle: {
          normal: {
            color: 'rgba(0, 0, 0, 0)'
          },
          emphasis: {
            color: 'rgba(0, 0, 0, 0)'
          }
        }
      }];
    }
    
    $.each(dateList, function(index, value) {
      if(value.day === 1 || value.day === 2) {
        chartX.push(value.day + "\n" + '(' + value.month + '月)');
      } else {
        chartX.push(value.day);
      }
    });
    
    if(dateInterval === 1) {
      chartX = hours24
    }
    chartDistance.setOption({
      grid: {
        x: 60,
        y: 15,
        x2: 35,
        y2: 40,
        borderColor: 'transparent'
      },
      xAxis: [
        {
          name: dateInterval === 1 ? '小时' : '天',
          axisLine: {
            lineStyle: {
              color: '#444554',
            }
          },
          axisLabel: {
            interval: 1
          },
          axisTick: { show: false },
          splitLine: { show: false },
          type: 'category',
          data: chartX
        }
      ],
      yAxis: [
        {
          splitNumber: 6,
          axisLine: {
            lineStyle: {
              color: '#444554',
            }
          },
          axisLabel: {
            formatter: '{value}米'
          },
          splitLine: {
            lineStyle: {color: ['#898ba0']}
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['rgba(255,255,255,0)','#e2e2e2']
            }
          },
          type: 'value'
        }
      ],
      series: [
        {
          name: '里程',
          type: 'bar',
          data: chartY,
          itemStyle: {
            normal: {
              color: '#b34572'
            }
          }
        }
      ]
    }); 

  }  
  
  // 初始化趋势－睡眠
  function initChartTrendSleep() {
    if (!chartTrendSleep) return;
    chartTrendSleep.resize();
    chartTrendSleep.clear();
    var chartX = [];
    var chartY = [];
    if(dataTrendSleep.length > 0) {
      $.each(dataTrendSleep, function(index, value) {
        chartY.push(value.deepSleep);
      });
    } else {
      chartY = [{
        value: 1000, // 无数据时，y轴最高点
        itemStyle: {
          normal: {
            color: 'rgba(0, 0, 0, 0)'
          },
          emphasis: {
            color: 'rgba(0, 0, 0, 0)'
          }
        }
      }];
    }
    
    $.each(dateList, function(index, value) {
      if(value.day === 1 || value.day === 2) {
        chartX.push(value.day + "\n" + '(' + value.month + '月)');
      } else {
        chartX.push(value.day);
      }
    });
    
    if(dateInterval === 1) {
      chartX = hours24
    }
    chartTrendSleep.setOption({
      grid: {
        x: 60,
        y: 15,
        x2: 35,
        y2: 40,
        borderColor: 'transparent'
      },
      xAxis: [
        {
          name: dateInterval === 1 ? '小时' : '天',
          axisLine: {
            lineStyle: {
              color: '#444554',
            }
          },
          axisLabel: {
            interval: 1
          },
          axisTick: { show: false },
          splitLine: { show: false },
          type: 'category',
          data: chartX
        }
      ],
      yAxis: [
        {
          splitNumber: 6,
          axisLine: {
            lineStyle: {
              color: '#444554',
            }
          },
          axisLabel: {
            formatter: '{value}分钟'
          },
          splitLine: {
            lineStyle: {color: ['#898ba0']}
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['rgba(255,255,255,0)','#e2e2e2']
            }
          },
          type: 'value'
        }
      ],
      series: [
        {
          name: '深睡',
          type: 'bar',
          data: chartY,
          itemStyle: {
            normal: {
              color: '#277fbe'
            }
          }
        }
      ]
    }); 
  }  

  
  // 插入运动趋势数据
  function insertTrendSportData() {
    var totalSteps = 0,
        totalCalorie = 0,
        totalDistance = 0;
    $.each(dataTrendSport, function(index, value) {
      totalSteps += value.steps;
      totalCalorie += value.calorie;
      totalDistance += value.distance;
    });
    $('.data-range-steps .data-content').html(totalSteps);
    $('.data-range-calorie .data-content').html(totalCalorie);
    $('.data-range-distance .data-content').html(totalDistance);
  }
  
  
  // 插入睡眠数据
  function insertTrendSleepData() {
    $('.data-range-deep-sleep .data-content').html(totalDeepSleep.h + '小时<small>' + totalDeepSleep.m + '分钟</small>')
    $('.data-range-shallow-sleep .data-content').html(totalShallowSleep.h + '小时<small>' + totalShallowSleep.m + '分钟</small>')
    $('.data-range-no-sleep .data-content').html(totalNoSleep.h + '小时<small>' + totalNoSleep.m + '分钟</small>')
  
  }
  
  // 获取 趋势 数据
  function getTrendData() {
    $.ajax({
      url: 'http://114.255.24.42/order/h/v2/user/getSportOrSleepDataByIndex',
      dataType: 'json',
      cache: false,
      data: {
        index: dateInterval === 1 ? 1 : 2,
        time: time,
        num: dateInterval === 1 ? 24 : dateInterval,
        sportOrSleep: trendSport ? 1 : 2,
        weixinId: weixinId
      }
    }).then(function(data) {
/*       console.log(data) */
      if(trendSport) { 
        if(data.sportDatas.length > 0) {
          dataTrendSport.length = 0;
          
          
          if(dateInterval !== 1) {
            $.each(dateTimestampList, function(index, value) {
              var timestamp = value;
              var finded = false;
              $.each(data.sportDatas, function(index, value) {
                if(value.time === timestamp) {
                  dataTrendSport.push({
                    steps: value.steps,
                    distance: value.distance,
                    calorie: value.calorie
                  });
                  finded = true;
                  return false;
                }
              });
              
              if(!finded) {
                dataTrendSport.push({
                  steps: 0,
                  distance: 0,
                  calorie: 0
                });
              }
            });
          } else {
            console.log(data.sportDatas)
            $.each(hours24, function(index, value) {
              var hour = value;
              var finded = false;
              $.each(data.sportDatas, function(index, value) {
                if(new Date(value.time).getHours() === hour) {
                  dataTrendSport.push({
                    steps: value.steps,
                    distance: value.distance,
                    calorie: value.calorie
                  });
                  finded = true;
                  return false;
                }
              });
              
              if(!finded) {
                dataTrendSport.push({
                  steps: 0,
                  distance: 0,
                  calorie: 0
                });
              }
            });
            
          }
            
          
        } else {
          dataTrendSport.length = 0; 
        }
        initChartSteps();
        initChartCalorie();
        initChartDistance();
        insertTrendSportData();
      } else {
        /*
        * state, 0是清醒，1是浅度睡眠，2是深度睡眠
        *
        *
        *
        *
        */
        dataTrendSleep.length = 0;
        
        /*
if(dateInterval !== 1) {
          $.each(dateTimestampList, function(index, value) {
            var timestamp = value;
            var finded = false;
            $.each(data.deepSleep, function(index, value) {
              if(value.time === timestamp) {
                dataTrendSleep.push({
                  deepSleep: convertMS(value.duration).m
                });
                finded = true;
                return false;
              }
            });
            
            if(!finded) {
              dataTrendSleep.push({
                deepSleep: 0
              });
            }
          });
        } else {
          $.each(hours24, function(index, value) {
            var hour = value;
            var finded = false;
            $.each(data.deepSleep, function(index, value) {
              if(new Date(value.time).getHours() === hour) {
                dataTrendSleep.push({
                  deepSleep: convertMS(value.duration).m
                });
                finded = true;
                return false;
              }
            });
            
            if(!finded) {
              dataTrendSleep.push({
                deepSleep: 0
              });
            }
          });
          
        }
*/
        
        $.each(data.deepSleep, function(index, value) {
          dataTrendSleep.push({
            deepSleep: convertMS(value.duration).m
          })
        });
        
        if(dateInterval === 1) {
          totalDeepSleep.h = convertMS(data.avgSleepData.deepSleep*24).h;
          totalDeepSleep.m = convertMS(data.avgSleepData.deepSleep*24).m;
          totalShallowSleep.h = convertMS(data.avgSleepData.shallowSleep*24).h;
          totalShallowSleep.m = convertMS(data.avgSleepData.shallowSleep*24).m;
          totalNoSleep.h = convertMS(data.avgSleepData.noSleep*24).h;
          totalNoSleep.m = convertMS(data.avgSleepData.noSleep*24).m;
        } else {
          totalDeepSleep.h = convertMS(data.avgSleepData.deepSleep*dateInterval).h;
          totalDeepSleep.m = convertMS(data.avgSleepData.deepSleep*dateInterval).m;
          totalShallowSleep.h = convertMS(data.avgSleepData.shallowSleep*dateInterval).h;
          totalShallowSleep.m = convertMS(data.avgSleepData.shallowSleep*dateInterval).m;
          totalNoSleep.h = convertMS(data.avgSleepData.noSleep*dateInterval).h;
          totalNoSleep.m = convertMS(data.avgSleepData.noSleep*dateInterval).m;
        }
        
        initChartTrendSleep();
        insertTrendSleepData();
        console.log(data.avgSleepData.deepSleep, totalDeepSleep)
      }
    });
  }
  
  // 显示区间日期
  function changeIntervalDate() {
    var month = new Date(time).getMonth(),
        day = new Date(time).getDate(),
        monthFrom = new Date(time - (dateInterval-1)*day1).getMonth(),
        dayFrom = new Date(time - (dateInterval-1)*day1).getDate(),
        dateFrom = '',
        dateTo = '',
        hash = location.hash || '#sport';
    history.replaceState(null, '', '?time=' + time + '&weixinId=' + weixinId + hash);
    
    dateList.length = 0;
    dateTimestampList.length = 0;  
    if(dateInterval !== 1) {
      for(var i = 0; i < dateInterval; i++) {
        dateList.unshift({
          month: new Date(time - i*day1).getMonth() + 1,
          day: new Date(time - i*day1).getDate()
        });
        dateTimestampList.unshift(time - i*day1);
      }
    } 
    
    dateTo = (month + 1) + '.' + day;
    if(dateInterval !== 1) {
      dateFrom = (monthFrom + 1) + '.' + dayFrom + ' - ';
    }
    
    if(month === new Date(Date.now()).getMonth() && day === new Date(Date.now()).getDate()) {
      $('#trend .date-next').addClass('inactive');
      dateTo = '今天';
    } else {
      $('#trend .date-next').removeClass('inactive');
    }
    $('.date-current-text, .date-popup-current').html(dateFrom + dateTo);
  }
  
  // 趋势 上个日期
  $('#trend .date-prev').on('click touchend', function(event) {
    event.preventDefault();
    time -= dateInterval*day1;
    changeIntervalDate();
    changeGlobalNav();
    getTrendData();
  });
  
  // 趋势 下个日期
  $('#trend .date-next').on('click touchend', function(event) {
    event.preventDefault();
    time += dateInterval*day1;
    if(time > Date.now()) {
      time = todayTimestamp();
    }
    changeIntervalDate();
    changeGlobalNav();
    getTrendData();
  });
  
  // 弹出日期选择
  $('.date-current').on('click', function() {
    $(this).next('.date-popup').addClass('show');
  });
  $(document).on('click', function(event) {
    if($(event.target).is('.date-current, .date-current-text')) return;
    $('.date-popup').removeClass('show');
  });
  
  // 日期区间切换－10天
  $('.date-range-day10').on('click', function(event) {
    event.preventDefault();
    $('.date-popup > li').removeClass('current');
    $(this).addClass('current');
    time = todayTimestamp();
    dateInterval = 10;
    changeIntervalDate();
    getTrendData()
  });
  
  // 日期区间切换－20天
  $('.date-range-day20').on('click', function(event) {
    event.preventDefault();
    $('.date-popup > li').removeClass('current');
    $(this).addClass('current');
    time = todayTimestamp();
    dateInterval = 20;
    changeIntervalDate();
    getTrendData()
  });
  
  // 日期区间切换－今天
  $('.date-today').on('click', function(event) {
    event.preventDefault();
    $('.date-popup > li').removeClass('current');
    $(this).addClass('current');
    time = todayTimestamp();
    dateInterval = 1;
    changeIntervalDate();
    getTrendData()
  });
  
  // 返回今天的时间戳（不含小时）
  function todayTimestamp() {
    return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime();
  }
  
  // 改变全局导航的url
  function changeGlobalNav() {
    $('#global-nav a').each(function() {
      var href = $(this).data('href');
      console.log(time)
      href += '?time=' + time + '&weixinId=' + weixinId + location.hash;
      $(this).attr('href', href);
    })
  }
  
  // 不使导航有记录留在history中
  $('#global-nav a').on('click touchend', function(event) {
    event.preventDefault();
    location.replace(this.href);
  });
  
  // 获取 url 中的 time 和 weixinId 参数
  function getTimeAndWeixinIdArgs() {
    var qs = location.search.length > 0 ? location.search.slice(1) : '';
    if(qs.indexOf('weixinId') > -1 && qs.indexOf('time') > -1) {
      time = parseInt(qs.match(/time=([^&]*)/)[1]);
      weixinId = qs.match(/weixinId=([^&]*)/)[1];
    }
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
  
/*
  $('[href=#tab-trend-steps], [href=#tab-trend-calorie], [href=#tab-trend-distance]').on('click touchend', function() {
    getTrendData();
  })
*/
  
  
  $('[href=#tab-trend-sport]').on('click touchend', function() {
    trendSport = true;
    getTrendData();
    $('.nav-tabs-trend-items li.active a').click();
    history.replaceState(null, '', '#sport');
    changeGlobalNav();
  });
  
  $('[href=#tab-trend-sleep]').on('click touchend', function() {
    trendSport = false;
    getTrendData();
    $('.nav-tabs-trend-items li.active a').click();
    history.replaceState(null, '', '#sleep');
    changeGlobalNav();
  });
  
  $('[href=#tab-trend-' + location.hash.split('#')[1] + ']').click();
  
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
    if(chartSteps) chartSteps.resize();
    if(chartCalorie) chartCalorie.resize();
    if(chartDistance) chartDistance.resize();
    if(chartTrendSleep) chartTrendSleep.resize();
  })
  
});