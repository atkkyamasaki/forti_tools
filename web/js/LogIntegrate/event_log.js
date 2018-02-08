$(function () {

	// Default のテーブル表示の Column を定義
	var msg = '.eventlog_msg';
	var customTime = '.eventlog_custom_time';
	var allInfo = '.eventlog_allinfo' ;

	var defalutDisplayElement = [
		msg,
		customTime,
		allInfo,
	];

	$.each(defalutDisplayElement, function(index, value) {
		$(value).removeClass('hide');
	});

	// Default の Column Filter の定義
	var msg = '#column_filter_msg';
	var customTime = '#column_filter_custom_time';
	var allInfo = '#column_filter_allinfo' ;

	$(msg).prop('checked', true);

	$(customTime).parent('p').css('display', 'none');
	$(allInfo).parent('p').css('display', 'none');

	// Cloumn Filter での表示/非表示切り替え
	var targetElement = '.container_columns_filter_window > p > input';

	$(targetElement).on('click', function(){
		var targetColume = $(this).attr('id').replace('column_filter_', 'eventlog_');
		$('.' + targetColume).toggleClass('hide');
	});

});