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

	// Filter Windows 閉じる
	var closeBtn = '#select_filter_window_close';

	$(closeBtn).on('click', function(){
		$.each(filterTypes, function(index, value) {
		    $('#' + value).addClass('hide');
		});
		motalElement.css('display', 'none');
	});
});


