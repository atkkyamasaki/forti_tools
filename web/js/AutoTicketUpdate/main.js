// Case Status ページ更新

$(function () {
  $('#tab1_a').on('click', function (event) {
    $('.all_loading').removeClass('hide');
    location.reload(true);
  });
});


// Next Assign Check

$(function () {
  $('#next_assign').on('click', function (event) {
    $('.table_next_assign').fadeOut('200');

    $.ajax({
      type: 'get',
      url: '/auto_ticket/next_assign',
      success: function (data, status, xhr) {

        console.log(data);

        $('#next_assign_name').text(data['next_assign']);
        $('#next_high_assign_name').text(data['next_high_assign']);
        $('#next_assign_unassign_num').text(data['unassign_num']);
        $('.table_next_assign').fadeIn('200');

      },
      complete: function () {
      }
    });
  });
});


// Auto Assign

$(function () {
  $('#auto_assign').on('click', function (event) {

    if(!confirm('自動割り当てを実行しますか？')){
      /* キャンセルの時の処理 */
      return false;
    }else{
      /* OKの時の処理 */
      $('.all_loading').removeClass('hide');
      $.ajax({
        type: 'put',
        url: '/auto_ticket/auto_assign',
        success: function (data, status, xhr) {
          console.log(data);
        },
        complete: function () {
          window.location.href = '/auto_ticket/view';
        }
      });
    }
  });

  $('#case_move').on('click', function (event) {

    if(!confirm('割り当て処理を適用しますか？')){
      /* キャンセルの時の処理 */
      return false;
    }else{
      /* OKの時の処理 */
      $('.all_loading').removeClass('hide');
      $.ajax({
        type: 'put',
        url: '/auto_ticket/case_move',
        success: function (data, status, xhr) {
          console.log(data);
        },
        complete: function () {
          window.location.href = '/auto_ticket/view';
        }
      });
    }
  });

});


// Manual Assign (Assagin_Create)

$(function () {
  $('.not_assign_icon').on('click', function (event) {
    $(this).addClass('hide');
    $(this).next('div').removeClass('hide');
  });

  $('select.manual_assign_create').change(function () {

    var caseId = $(this).parents('tr').children('.case_id').text();
    var newUserId = $(this).val();
    var tacNameClassValue = '.table_tac_name_' + newUserId;

    if(!confirm($(tacNameClassValue).text() + 'へチケット(CaseID:' + caseId + ')の割り当てを実行しますか？')){
      /* キャンセルの時の処理 */
      return false;
    }else{
      /* OKの時の処理 */
      $('.all_loading').removeClass('hide');

      $.ajax({
        type: 'put',
        url: '/auto_ticket/manual_assign_create/' +  caseId + '/' + newUserId,
        success: function (data, status, xhr) {
          console.log(data);
        },
        complete: function () {
          window.location.href = '/auto_ticket/view';
          // $('.all_loading').addClass('hide');
        }
      });
    }
  });
});



// Manual Assign (Assagin_Update)

$(function () {
  $('.change_assign_icon').on('click', function (event) {
    $(this).addClass('hide');
    $(this).next('div').removeClass('hide');
  });

  $('select.manual_assign_update').change(function () {

    var oldUserId = $(this).parents('tr').children('.case_assignee').text();
    var caseId = $(this).parents('tr').children('.case_id').text();
    var newUserId = $(this).val();
    var tacNameClassValue = '.table_tac_name_' + newUserId;

    if(!confirm($(tacNameClassValue).text() + 'へチケット(CaseID:' + caseId + ')の割り当てを実行しますか？')){
      /* キャンセルの時の処理 */
      return false;
    }else{
      /* OKの時の処理 */
      $('.all_loading').removeClass('hide');

      $.ajax({
        type: 'put',
        url: '/auto_ticket/manual_assign/' +  caseId + '/' + oldUserId + '/' + newUserId,
        success: function (data, status, xhr) {
          console.log(data);
        },
        complete: function () {
          window.location.href = '/auto_ticket/view';
          // $('.all_loading').addClass('hide');
        }
      });
    }
  });
});



// Case Delete

$(function () {
  $('.case_delete').on('click', function (event) {

    var caseId = $(this).parents('.case_id').text();
    console.log(caseId);

    if(!confirm('CaseID:' + caseId + 'を削除しますか？')){
      /* キャンセルの時の処理 */
      return false;
    }else{
      /* OKの時の処理 */
      $('.all_loading').removeClass('hide');

      $.ajax({
        type: 'delete',
        url: '/auto_ticket/case_delete/' +  caseId,
        success: function (data, status, xhr) {
          console.log(data);
        },
        complete: function () {
          window.location.href = '/auto_ticket/view';
          // $('.all_loading').addClass('hide');
        }
      });
    }
  });
});

// Assignee Status Change

$(function () {
  $('.table_tac_name').on('click', function (event) {
    // Status 変更画面が表示されている場合は表示をすべて閉じる
    $('.assignee_status').addClass('hide');

    $(this).nextAll('.assignee_status').removeClass('hide');

    // 閉じるアイコンを押した場合に Status 変更画面を閉じる
    $('.assignee_statu_close_icon').on('click', function (event) {
      $(this).parents('.assignee_status').addClass('hide');
    });

    $('.assignee_status_update').on('click', function (event) {

      $(this).parents('td').css('opacity', '0');

      $('.assignee_status').addClass('hide');
      
      var userId = $(this).parent().parent().parent().prev().text();
      var ptoStatus = $(this).prev().prev().children('.pto_status').val();
      var daStatus = $(this).prev().children('.da_status').val();

      $.ajax({
        type: 'put',
        url: '/auto_ticket/assignee_status/' +  userId + '/' + ptoStatus + '/' + daStatus,
        success: function (data, status, xhr) {
        },
        complete: function () {
          // window.location.href = '/auto_ticket/view';

          $.ajax({
            type: 'get',
            url: '/auto_ticket/api/assignee',
            success: function (data, status, xhr) {

              $.each(data, function(i, value) {

                if (value.id == userId) {

                  var ptoElement = '#tac_pto_icon_' + value.id;
                  var daElement = '#tac_da_icon_' + value.id;

                  if (value.pto == 0) {
                    $(ptoElement).removeClass('attend_icon_red');
                    $(ptoElement).addClass('attend_icon_green');
                  } else {
                    $(ptoElement).removeClass('attend_icon_green');
                    $(ptoElement).addClass('attend_icon_red');
                  }
                  
                  if (value.da == 0) {
                    $(daElement).addClass('hide');
                  } else {
                    $(daElement).removeClass('hide');
                  }

                }
              });

            },
            complete: function () {
              var tdNameElement = '#tac_pto_icon_' + userId;
              $(tdNameElement).parents('td').css('opacity', '');
            }
          });
        }
      });
    });
  });
});




// TAC Status ページ更新

$(function () {
  $('#tab2_a').on('click', function (event) {
    $('.all_loading').removeClass('hide');

    $.ajax({
      type: 'get',
      url: '/auto_ticket/api/assignee',
      success: function (data, status, xhr) {
        var tacElement = '#table_person tr';

        $.each(data, function(i, value) {
          $(tacElement).eq(i+1).children('.table_tac_id').text(value.id);
          $(tacElement).eq(i+1).children('.table_tac_name').text(value.name);
          $(tacElement).eq(i+1).children('.table_tac_laps').text(value.laps);
          $(tacElement).eq(i+1).children('.table_tac_point').text(value.point);
          $(tacElement).eq(i+1).children('.table_tac_highpri').text(value.highPri);
          $(tacElement).eq(i+1).children('.table_tac_pto').text(value.pto);
          $(tacElement).eq(i+1).children('.table_tac_da').text(value.da);
        });

      },
      complete: function () {
        _updateTacSummaryChart();
        $('.all_loading').addClass('hide');
      }
    });
  });
});






// Log Update

$(function () {
  $('#tab3_a').on('click', function (event) {
    $('.all_loading').removeClass('hide');
    $('.table_log tbody tr').remove('');

    $.ajax({
      type: 'get',
      url: '/auto_ticket/api/log',
      success: function (data, status, xhr) {

        var newTbody;
        $.each(data, function(i, value) {
          value[2] = value[2].replace(/\r?\n/g, "<br>");
          newTbody = newTbody + '<tr><td>' + value[0] + '</td><td>' + value[1] + '</td><td>' + value[2] + '</td></tr>';
        });
        $('.table_log tbody').html(newTbody);
      },
      complete: function () {
        $('.all_loading').addClass('hide');
      }
    });

  });
});



// Log File Download

$(function () {
  $('#log_download').on('click', function (event) {
    $.ajax({
      type: 'get',
      url: '/auto_ticket/log_download',
      success: function (data, status, xhr) {
      },
      complete: function () {
        location.href = '/image/AutoTicketUpdate/logs.zip';
      }
    });
  });
});


// TAC Summary
// Highchart - Column chart
// 参考URL
// http://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/demo/column-negative/

function _updateTacSummaryChart () {
  var allTacName = [];
  var allTacLaps = [];
  var allTacPoint = [];
  var allTacHighPri  = [];

  var table = $('#table_person tbody');
  for(var i = 1, l = table.children().length + 1; i < l; i++) {
    allTacName.push($('.table_tac_name_' + i).text());
    allTacLaps.push(parseInt($('.table_tac_laps_' + i).text()));
    allTacPoint.push(parseInt($('.table_tac_point_' + i).text()));
    allTacHighPri.push(parseInt($('.table_tac_highpri_' + i).text()));
  }

  new Highcharts.chart('highchart_summary_tac', {
      chart: {
          type: 'column'
      },
      title: {
          text: 'Summary'
      },
      xAxis: {
          categories: allTacName
      },
      credits: {
          enabled: false
      },
      series: [{
          name: '負荷状況',
          color: 'green',
          data: allTacPoint
      }, {
          name: 'High Priority Case数',
          color: 'red',
          data: allTacHighPri
      }, {
          name: '本日の対応件数',
          color: 'blue',
          data: allTacLaps
      }]
  });
}

// タブ表示
// 参考URL
// http://www.aiship.jp/knowhow/archives/28160

$(function(){
    $('#tab_display #contents > div[id != "tab1"]').hide();
     
    // タブをクリックすると
    $("#tab_display > ul > li > a").click(function(){
        // 一度全てのコンテンツを非表示にする
        $("#tab_display #contents > div").hide();
 
        // 次に選択されたコンテンツを再表示する
        $($(this).attr("href")).show();
         
        // 現在のcurrentクラスを削除
        $(".current").removeClass("current");
         
        // 選択されたタブ（自分自身）にcurrentクラスを追加
        $(this).addClass("current");
         
        return false;
    }); 
});



