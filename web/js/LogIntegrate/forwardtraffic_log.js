$(function () {

	// Default のテーブル表示の Column を定義
	var defalutDisplayElement = [
		'.forwardtrafficlog_srcip',
		'.forwardtrafficlog_srcport',
		'.forwardtrafficlog_dstip',
		'.forwardtrafficlog_dstport',
		'.forwardtrafficlog_action',
		'.forwardtrafficlog_custom_time',
		'.forwardtrafficlog_allinfo',
	];

	$.each(defalutDisplayElement, function(index, value) {
		$(value).removeClass('hide');
	});

	// Default の Column Filter の定義
	var customTime = '#forwardtraffic_column_filter_custom_time';
	var allInfo = '#forwardtraffic_column_filter_allinfo' ;

	var defalutDisplayColumn = [
		'#forwardtraffic_column_filter_srcip',
		'#forwardtraffic_column_filter_srcport',
		'#forwardtraffic_column_filter_dstip',
		'#forwardtraffic_column_filter_dstport',
		'#forwardtraffic_column_filter_action',
	];

	$.each(defalutDisplayColumn, function(index, value) {
		$(value).prop('checked', true);
	});

	$(customTime).parent('p').css('display', 'none');
	$(allInfo).parent('p').css('display', 'none');

	// Cloumn Filter での表示/非表示切り替え
	var targetElement = '.container_columns_filter_window p > input';

	$(targetElement).on('click', function(){
		var targetColumn = $(this).attr('id').replace('forwardtraffic_column_filter_', 'forwardtrafficlog_');
		$('.' + targetColumn).toggleClass('hide');
	});

});