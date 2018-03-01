$(function () {

	// Default のテーブル表示の Column を定義
	var msg = '.forwardtrafficlog_action';
	var customTime = '.forwardtrafficlog_custom_time';
	var allInfo = '.forwardtrafficlog_allinfo' ;

	var defalutDisplayElement = [
		msg,
		customTime,
		allInfo,
	];

	$.each(defalutDisplayElement, function(index, value) {
		$(value).removeClass('hide');
	});

	// Default の Column Filter の定義
	var msg = '#forwardtraffic_column_filter_action';
	var customTime = '#forwardtraffic_column_filter_custom_time';
	var allInfo = '#forwardtraffic_column_filter_allinfo' ;

	$(msg).prop('checked', true);

	$(customTime).parent('p').css('display', 'none');
	$(allInfo).parent('p').css('display', 'none');

	// Cloumn Filter での表示/非表示切り替え
	var targetElement = '.container_columns_filter_window p > input';

	$(targetElement).on('click', function(){
		var targetColumn = $(this).attr('id').replace('forwardtraffic_column_filter_', 'forwardtrafficlog_');
		$('.' + targetColumn).toggleClass('hide');
	});

});