

// Highchart - Bar chart
// 参考URL
// http://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/demo/bar-basic/

$(function () {
  var totalFeatures = [parseInt($('#total_features').text(), 10)];
  var totalSenarios = [parseInt($('#total_senarios').text(), 10)];
  var totalSteps = [parseInt($('#total_steps').text(), 10)];

  Highcharts.chart('container_summary_case', {
      chart: {
          type: 'bar'
      },
      title: {
          text: 'All Test'
      },
      subtitle: {
          text: 'Source: <p>result.json</p>'
      },
      xAxis: {
          categories: ['Summary'],
          title: {
              text: null
          }
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Number',
              align: 'high'
          },
          labels: {
              overflow: 'justify'
          }
      },
      tooltip: {
          valueSuffix: ' case'
      },
      plotOptions: {
          bar: {
              dataLabels: {
                  enabled: true
              }
          }
      },
      legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          x: -40,
          y: 80,
          floating: true,
          borderWidth: 1,
          backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
          shadow: true
      },
      credits: {
          enabled: false
      },
      series: [{
          name: 'Feature',
          data: totalFeatures
      }, {
          name: 'Sinario',
          data: totalSenarios
      }, {
          name: 'Step',
          data: totalSteps
      }]
  });
});

// Highchart - Pie chart
// 参考URL
// http://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/demo/pie-basic/
$(function () {
  var percentPassed = parseInt($('#percent_passed').text(), 10);
  var percentFailed = parseInt($('#percent_failed').text(), 10);
  var percentPending = parseInt($('#percent_pending').text(), 10);
  var percentSkipped = parseInt($('#percent_skipped').text(), 10);

  Highcharts.chart('container_summary_result', {
      chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie',
          options3d: {
              enabled: true,
              alpha: 45,
              beta: 0
          }
      },
      title: {
          text: 'Test Result Summary'
      },
      tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              depth: 35,
              dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                  style: {
                      color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                  }
              }
          }
      },
      series: [{
          name: 'Result',
          colorByPoint: true,
          data: [{
              name: 'Passed',
              // color: 'green',
              y: percentPassed,
              sliced: true,
              selected: true
          }, {
              name: 'Failed',
              // color: 'red',
              y: percentFailed,
          }, {
              name: 'Pending',
              // color: 'orange',
              y: percentPending,
          }, {
              name: 'Skipped',
              // color: 'skyblue',
              y: percentSkipped
          }]
      }]
  });
});

// Highchart - Column chart
// 参考URL
// http://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/demo/column-negative/
$(function () {

  // var featurePassed = [parseInt($('#feature_' + i + ' > .summary_step_passed').text(), 10)];
  // var featureFailed = [parseInt($('#feature_' + i + ' > .summary_step_failed').text(), 10)];
  // var featurePending = [parseInt($('#feature_' + i + ' > .summary_step_pending').text(), 10)];
  // var featureSkipped = [parseInt($('#feature_' + i + ' > .summary_step_skipped').text(), 10)];
  var totalPassed = [parseInt($('#total_passed').text(), 10)];
  var totalFailed = [parseInt($('#total_failed').text(), 10)];
  var totalPending = [parseInt($('#total_pending').text(), 10)];
  var totalSkipped = [parseInt($('#total_skipped').text(), 10)];

  Highcharts.chart('container_summary_total', {
      chart: {
          type: 'column'
      },
      title: {
          text: 'Feature Summary'
      },
      xAxis: {
          categories: ['Summary']
      },
      credits: {
          enabled: false
      },
      series: [{
          name: 'Passed',
          color: 'green',
          data: totalPassed
      }, {
          name: 'Failed',
          color: 'red',
          data: totalFailed
      }, {
          name: 'Pending',
          color: 'orange',
          data: totalPending
      }, {
          name: 'Skipped',
          color: 'skyblue',
          data: totalSkipped
      }]
  });
});

$(function () {

  for (var i = (parseInt($('#total_features').text())) - 1; i >= 0; i--) {
    var container_id = 'container_feature' + i + '_summary';
    var featurePassed = [parseInt($('#feature_' + i + ' > .summary_step_passed').text(), 10)];
    var featureFailed = [parseInt($('#feature_' + i + ' > .summary_step_failed').text(), 10)];
    var featurePending = [parseInt($('#feature_' + i + ' > .summary_step_pending').text(), 10)];
    var featureSkipped = [parseInt($('#feature_' + i + ' > .summary_step_skipped').text(), 10)];

    Highcharts.chart(container_id, {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Feature Summary'
        },
        xAxis: {
            categories: ['Summary']
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Passed',
            color: 'green',
            data: featurePassed
        }, {
            name: 'Failed',
            color: 'red',
            data: featureFailed
        }, {
            name: 'Pending',
            color: 'orange',
            data: featurePending
        }, {
            name: 'Skipped',
            color: 'skyblue',
            data: featureSkipped
        }]
    });
  }
});


// アコーディオン
$(function () {
  $('.li_feature').click( function() {

    var target = $(this).data('target');
    $('#' + target).slideToggle();

    if ($(this).children('i').hasClass('fa-chevron-down')) {
      $(this).children('i').removeClass('fa-chevron-down').addClass('fa-chevron-right');
    } else {
      $(this).children('i').removeClass('fa-chevron-right').addClass('fa-chevron-down');
    }

  });
});

$(function () {
  $('.li_scenario').click( function() {

    var target = $(this).data('target');
    $('#' + target).slideToggle();

    if ($(this).children('i').hasClass('fa-chevron-down')) {
      $(this).children('i').removeClass('fa-chevron-down').addClass('fa-chevron-right');
    } else {
      $(this).children('i').removeClass('fa-chevron-right').addClass('fa-chevron-down');
    }

  });
});

$(function () {
  $('.all_collapse').click( function() {
    for (var i = 0; i < (parseInt($('#total_features').text())); i++) {
      var target = '#li_feature_' + i;
      var iconTarget = '#feature_' + i;
      $(target).css('display','none');
      if ($(iconTarget).children('i').hasClass('fa-chevron-down')) {
        $(iconTarget).children('i').removeClass('fa-chevron-down').addClass('fa-chevron-right');
      }
    }

    for (var i = 0; i < (parseInt($('#total_senarios').text())); i++) {
      var target = '#li_scenario_' + i;
      var iconTarget = '#scenario_' + i;
      $(target).css('display','none');
      if ($(iconTarget).children('i').hasClass('fa-chevron-down')) {
        $(iconTarget).children('i').removeClass('fa-chevron-down').addClass('fa-chevron-right');
      }
    }

  });

  $('.all_expand').click( function() {
    for (var i = 0; i < (parseInt($('#total_features').text())); i++) {
      var target = '#li_feature_' + i;
      var iconTarget = '#feature_' + i;
      $(target).css('display','');
      if ($(iconTarget).children('i').hasClass('fa-chevron-right')) {
        $(iconTarget).children('i').removeClass('fa-chevron-right').addClass('fa-chevron-down');
      }
    }

    for (var i = 0; i < (parseInt($('#total_senarios').text())); i++) {
      var target = '#li_scenario_' + i;
      var iconTarget = '#scenario_' + i;
      $(target).css('display','');
      if ($(iconTarget).children('i').hasClass('fa-chevron-right')) {
        $(iconTarget).children('i').removeClass('fa-chevron-right').addClass('fa-chevron-down');
      }
    }

  });
});

// テスト結果の表示
$(function () {

  var notPassedTotal = parseInt($('#total_failed').text(), 10) + parseInt($('#total_pending').text(), 10) + parseInt($('#total_skipped').text(), 10);

  if (notPassedTotal > 0) {
    $('.border-block').css('background-color', 'red');
  } else {
    $('.border-block').css('background-color', 'lightgreen');
  }
});

$(function () {

  for (var i = 0; i < (parseInt($('#total_features').text())); i++) {
    var container_id = 'feature_' + i;
    var notPassedTotal = parseInt($('#' + container_id +' .summary_step_failed').text(), 10) + parseInt($('#' + container_id +' .summary_step_pending').text(), 10) + parseInt($('#' + container_id +' .summary_step_skipped').text(), 10);

    if (notPassedTotal > 0) {
      $('#' + container_id).css('color', 'red');
    } else {
      $('#' + container_id).css('color', 'green');
    }
  }

  for (var i = 0; i < (parseInt($('#total_senarios').text())); i++) {
    var container_id = 'scenario_' + i;
    var notPassedTotal = parseInt($('#' + container_id +' .summary_step_failed').text(), 10) + parseInt($('#' + container_id +' .summary_step_pending').text(), 10) + parseInt($('#' + container_id +' .summary_step_skipped').text(), 10);

    if (notPassedTotal > 0) {
      $('#' + container_id).css('color', 'red');
    } else {
      $('#' + container_id).css('color', 'green');
    }
  }

});

// ScreenShot の拡大
$(function() {
  $('.imag_screenshot').hover(function() {
    $(this).css('z-index', '1000');
  }, function() {
    $(this).css('z-index', '100');
  });
});


// ページトップへ戻るボタン用
$(function() {
  var showFlag = false;
  var topBtn = $('#page-top');    
  topBtn.css('bottom', '-100px');
  var showFlag = false;
  //スクロールが100に達したらボタン表示
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      if (showFlag == false) {
        showFlag = true;
        topBtn.stop().animate({'bottom' : '20px'}, 200); 
      }
    } else {
      if (showFlag) {
        showFlag = false;
        topBtn.stop().animate({'bottom' : '-100px'}, 200); 
      }
    }
  });
  //スクロールしてトップ
  topBtn.click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 500);
    return false;
  });
});


// ZIP File ダウンロード用

$(function () {
  $('#zip_download_btn').on('click', function (event) {
    var product = $('#hide_product').text();
    var version = $('#hide_version').text();

    $.ajax({
      type: 'post',
      url: '/' + product + '/' + version + '/download',
      success: function (data, status, xhr) {
      },
      complete: function () {
        location.href = '/image/tmp/result.zip';
      }
    });
  });
});

// ZIP File アップロード用

$(document).on('change','input[name="zip_upload_btn"]',function(){
  var product = $('#hide_product').text();
  var version = $('#hide_version').text();

  var fd = new FormData();
  if ($("input[name='zip_upload_btn']").val()!== '') {
    fd.append( "file", $("input[name='zip_upload_btn']").prop("files")[0] );
  }
  fd.append("dir",$("#zip_upload_btn").val());
  var postData = {
    type : "POST",
    dataType : "text",
    data : fd,
    processData : false,
    contentType : false
  };
  $.ajax(
    '/' + product + '/' + version + '/upload', postData
  ).done(function(data){
    $('#test_upload').prop("disabled", false).css({
      'background-color': '#31c8aa',
      'box-shadow': '2px 2px #23a188',
    });
  });
});

