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
		    $('#' + value).addClass('hide');
		});
		motalElement.css('display', 'none');
	});
});


// Date Time Filter
// 参考 URL
// https://qiita.com/yasuken/items/f789e19d02df34c024a3



$(function () {

	// Date Time Filter Window 開く
	var motalElement = $('.container_time_filter_window,#container_modal_overlay');

    $('.time_filter_menu').on('click', function(){
        motalElement.css('display', 'block');
	});


	// Date Time Filter の実行
    $('#datetimepicker_start').datetimepicker();


	// Filter Window 閉じる
	var closeBtn = '#select_time_filter_window_close';

	$(closeBtn).on('click', function(){
		motalElement.css('display', 'none');
	});
});


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











