$(function () {

	// Default のテーブル表示の Column を定義
	var defalutDisplayElement = [
		'.eventlog_logid',
		'.eventlog_type',
		'.eventlog_subtype',
		'.eventlog_level',
		'.eventlog_msg',
		'.eventlog_custom_time',
		'.eventlog_allinfo',
	];

	$.each(defalutDisplayElement, function(index, value) {
		$(value).removeClass('hide');
	});

	// Default の Column Filter の定義
	var customTime = '#event_column_filter_custom_time';
	var allInfo = '#event_column_filter_allinfo' ;

	var defalutDisplayColumn = [
		'#event_column_filter_logid',
		'#event_column_filter_type',
		'#event_column_filter_subtype',
		'#event_column_filter_level',
		'#event_column_filter_msg',
	];

	$.each(defalutDisplayColumn, function(index, value) {
		$(value).prop('checked', true);
	});

	$(customTime).parent('p').css('display', 'none');
	$(allInfo).parent('p').css('display', 'none');

	// Cloumn Filter での表示/非表示切り替え
	var targetElement = '.container_columns_filter_window p > input';

	$(targetElement).on('click', function(){
		var targetColumn = $(this).attr('id').replace('event_column_filter_', 'eventlog_');
		$('.' + targetColumn).toggleClass('hide');
	});

});