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



// Columns Filter

$(function () {

	// Filter タイプのサブメニューの表示/非表示
	var columnsFilterMenu = '.columns_filter_menu';
	var columnsFilterTypes = '.columns_filter_types';

	$(columnsFilterMenu).on('click', function() {
			$(columnsFilterTypes).toggleClass('hide');
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


});


