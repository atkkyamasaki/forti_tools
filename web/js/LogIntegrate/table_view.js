// チェックボックスを ON/OFF で対象のログの表示を切り替え

$(function () {

	var cbFilter1 = 'cbfilter_1';
	var cbFilter2 = 'cbfilter_2';

	var cbFilters = [
		cbFilter1,
		cbFilter2,
	];

	$.each(cbFilters, function(index, value) {
		$('#' + value).on('click', function() {
			if ($('#' + value).prop('checked')) {
				$('.container_result > table .' + value).removeClass('hide');
			} else {
				$('.container_result > table .' + value).addClass('hide');
			}

			$('.all_loading').removeClass('hide');
			setTimeout( function() {
				$('.all_loading').addClass('hide');
			}, 500);
		});
	});

});


// All Information（生ログ）の表示/非常時
$(function () {
	var allInfoTd = '.target-allinfo';
	var allInfoIcon = '.target-allinfo > i';
	var allInfoText = '.target-allinfo > span';
	$(allInfoText).addClass('hide');

	$(allInfoTd).on('click', function() {

		if ($(this).children('i').hasClass('fa-plus-square')) {
			$(this).children('i').removeClass('fa-plus-square');
			$(this).children('i').addClass('fa-minus-square');

			var getCbfilterClass = $(this).parent('tr').attr('class');
			var valAllInfo = '<tr class="column_allinfo ' + getCbfilterClass + '"><td colspan="100">' + $(this).text() + '</td></tr>';
			$(valAllInfo).insertAfter($(this).closest('tr'));
		} else {
			$(this).children('i').removeClass('fa-minus-square');
			$(this).children('i').addClass('fa-plus-square');
			$(this).parent('tr').next('tr').remove();
		}


	});



});


// Columns Filter

$(function () {

	// Filter タイプのサブメニューの表示/非表示
	var columnsFilterMenu = '.columns_filter_menu';
	var columnsFilterTypes = '.columns_filter_types';

	$(columnsFilterMenu).hover(function() {
		$(columnsFilterTypes).removeClass('hide');
	}, function() {
		$(columnsFilterTypes).addClass('hide');

		$(columnsFilterTypes).hover(function() {
			$(columnsFilterTypes).removeClass('hide');
		}, function() {
			$(columnsFilterTypes).addClass('hide');
		});
	});


	// Column の一覧表示と Filter の実行

	var filterTypes = [
		'columns_filter_type_event',
		'columns_filter_type_forwardtraffic',
	]

	var motalElement = $('.container_columns_filter_window,#container_modal_overlay');

	$.each(filterTypes, function(index, value) {

	    $('#' + value).on('click', function(){
	    	$('.' + value).removeClass('hide');
	        motalElement.css('display', 'block');
		});
	});

	// Filter Window 閉じる
	var closeBtn = '#select_filter_window_close';

	$(closeBtn).on('click', function(){
		$.each(filterTypes, function(index, value) {
		    $('.' + value).addClass('hide');
		});
		motalElement.css('display', 'none');
	});
});


// Date Time Filter
// 参考 URL
// https://qiita.com/yasuken/items/f789e19d02df34c024a3
// https://eonasdan.github.io/bootstrap-datetimepicker/Options/

$(function () {

	// Date Time Filter Window 開く
	var motalElement = $('.container_time_filter_window,#container_modal_overlay');

    $('.time_filter_menu').on('click', function(){
        motalElement.css('display', 'block');
	});

	// Date Time Filter の実行
    $('#datetimepicker_start').datetimepicker({
    	format: 'YYYY-MM-DD HH:mm:ss',
    	showTodayButton: true,
    	showClear: true,
    	showClose: true,
    });
    $('#datetimepicker_end').datetimepicker({
    	useCurrent: false,
    	format: 'YYYY-MM-DD HH:mm:ss',
    	showTodayButton: true,
    	showClear: true,
    	showClose: true,
    });

    $("#datetimepicker_start").on("dp.change", function (e) {
        $('#datetimepicker_end').data("DateTimePicker").minDate(e.date);
    });
    $("#datetimepicker_end").on("dp.change", function (e) {
        $('#datetimepicker_start').data("DateTimePicker").maxDate(e.date);
    });

	// Filter Window 閉じる際に Filter を実行
	var closeBtn = '#select_time_filter_window_submit';


	$(closeBtn).on('click', function(){
		
		var filterStartTime = $('input:text[name="datetimepicker_start"]').val();
		var filterEndTime = $('input:text[name="datetimepicker_end"]').val();

		doTimeFilter(filterStartTime, filterEndTime);
		motalElement.css('display', 'none');

		$('.all_loading').removeClass('hide');
		setTimeout( function() {
			$('.all_loading').addClass('hide');
		}, 500);

	});
});


function doTimeFilter (start, end) {

	// Unixtime で時間比較
	var startDateUnixtime = Date.parse(start.replace(/-/g, '/'))/1000;
	var endDateUnixtime = Date.parse(end.replace(/-/g, '/'))/1000;

	// すべての Filter 条件をクリア
	$('.time_hide').removeClass('time_hide');

	$('.eventlog_custom_time').map(function() {
		var logDate = $(this).text();
		logDateUnixtime = Date.parse(logDate.replace(/-/g, '/'))/1000;

		if (start) {
			if (logDateUnixtime < startDateUnixtime) {
				$(this).parents('tr').addClass('time_hide');
			}
		}

		if(end) {
			if (logDateUnixtime > endDateUnixtime) {
				$(this).parents('tr').addClass('time_hide');
			}
		}
	});
}


// 検索、除外ワード Filter

$(function () {

	// Include 処理
	var inputIncludeWord = $('#include_filter_input_raw');
	inputIncludeWord.on("keydown", function(e){
		if (e.keyCode === 13) {
			var filterString = inputIncludeWord.val();

			if (filterString) {
				var filterStringHtml = '<li class="input_string"><span class="input_string_text">' + filterString + '</span><span class="fa fa-times input_string_remove"></span></li>';
				inputIncludeWord.before(filterStringHtml);
				inputIncludeWord.val('');
				includeStringsFilter();
			}
		}
	});

	var inputStringRemove = '.input_string_remove';
	$('.container_strings_include_filter').on("click" , inputStringRemove, function(){
		$(this).parent().remove();
		includeStringsFilter();
	});

	// Exclude 処理
	var inputExcludeWord = $('#exclude_filter_input_raw');
	inputExcludeWord.on("keydown", function(e){
		if (e.keyCode === 13) {
			var filterString = inputExcludeWord.val();

			if (filterString) {
				var filterStringHtml = '<li class="input_string"><span class="input_string_text">' + filterString + '</span><span class="fa fa-times input_string_remove"></span></li>';
				inputExcludeWord.before(filterStringHtml);
				inputExcludeWord.val('');
				excludeStringsFilter();
			}
		}
	});

	var inputStringRemove = '.input_string_remove';
	$('.container_strings_exclude_filter').on("click" , inputStringRemove, function(){
		$(this).parent().remove();
		excludeStringsFilter();
	});


});


function includeStringsFilter () {

	var filterStrings = $('.container_strings_include_filter > .input_string > .input_string_text');

	// すべての Filter 条件をクリア
	$('.include_hide').removeClass('include_hide');

	filterStrings.map(function() {
		var filterString = $(this).text()
		$('.target-allinfo > span').map(function() {
			var allInfo = $(this).text();
			if (allInfo.indexOf(filterString) == -1) {
				if (!$(this).parents('tr').hasClass('include_hide')) {
					$(this).parents('tr').addClass('include_hide');
				}
			}
		});
	})
}


function excludeStringsFilter () {

	var filterStrings = $('.container_strings_exclude_filter > .input_string > .input_string_text');

	// すべての Filter 条件をクリア
	$('.exclude_hide').removeClass('exclude_hide');

	filterStrings.map(function() {
		var filterString = $(this).text()
		$('.target-allinfo > span').map(function() {
			var allInfo = $(this).text();
			if (allInfo.indexOf(filterString) != -1) {
				if (!$(this).parents('tr').hasClass('exclude_hide')) {
					$(this).parents('tr').addClass('exclude_hide');
				}
			}
		});
	})
}





// Table のソート
// 参考 URL
// https://beiznotes.org/install-tablesorter/

$(function () {
	$('#logs_table').tablesorter();

	$('#sort_date').click();
	$('th').hide();
});




// ページトップへ戻るボタン

$(function() {
	$('body').after('<p id="page-top" class="page_top_bottom"><a href="#wrap">PAGE TOP</a></p>');
	$('body').after('<p id="page-bottom" class="page_top_bottom"><a href="#wrap">PAGE BOTTOM</a></p>');
});

$(function() {
    var topshowFlag = false;
    var bottomshowFlag = false;
    var topBtn = $('#page-top');
    var bottomBtn = $('#page-bottom');
    topBtn.css('bottom', '-100px');
    bottomBtn.css('bottom', '-100px');

    var topshowFlag = false;
    $(window).scroll(function () {
    	if ($(this).scrollTop() > 200) {
    	    if (topshowFlag == false) {
    	        topshowFlag = true;
    	        topBtn.stop().animate({'bottom' : '62px'}, 200); 
    	    }
    	} else {
    	    if (topshowFlag) {
    	      topshowFlag = false;
    	      topBtn.stop().animate({'bottom' : '-100px'}, 200); 
    	    }
    	}
    });
    topBtn.click(function () {
        $('body,html').animate({
          scrollTop: 0
    	}, 500);
    	return false;
  	});

    var bottomshowFlag = false;
    $(window).scroll(function () {
    	if (1200 < $(document).height() - $(this).scrollTop()) {
    	    if (bottomshowFlag == false) {
    	        bottomshowFlag = true;
    	        bottomBtn.stop().animate({'bottom' : '20px'}, 200); 
    	    }
    	} else {
    	    if (bottomshowFlag) {
    	      bottomshowFlag = false;
    	      bottomBtn.stop().animate({'bottom' : '-100px'}, 200); 
    	    }
    	}
    });
    bottomBtn.click(function () {
        $('body,html').animate({
          scrollTop: $(document).height()
    	}, 500);
    	return false;
  	});

});

