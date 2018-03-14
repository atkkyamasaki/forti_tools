$(function () {

	// Default のテーブル表示の Column を定義
	var defalutDisplayElement = [
		'.webfilterlog_srcip',
		'.webfilterlog_srcport',
		'.webfilterlog_dstip',
		'.webfilterlog_dstport',
		'.webfilterlog_msg',
		'.webfilterlog_custom_time',
		'.webfilterlog_allinfo',
	];

	$.each(defalutDisplayElement, function(index, value) {
		$(value).removeClass('hide');
	});

	// Default の Column Filter の定義
	var customTime = '#webfilter_column_filter_custom_time';
	var allInfo = '#webfilter_column_filter_allinfo' ;

	var defalutDisplayColumn = [
		'#webfilter_column_filter_srcip',
		'#webfilter_column_filter_srcport',
		'#webfilter_column_filter_dstip',
		'#webfilter_column_filter_dstport',
		'#webfilter_column_filter_msg',
	];

	$.each(defalutDisplayColumn, function(index, value) {
		$(value).prop('checked', true);
	});

	$(customTime).parent('p').css('display', 'none');
	$(allInfo).parent('p').css('display', 'none');

	// Cloumn Filter での表示/非表示切り替え
	var targetElement = '.container_columns_filter_window p > input';

	$(targetElement).on('click', function(){
		var targetColumn = $(this).attr('id').replace('webfilter_column_filter_', 'webfilterlog_');
		$('.' + targetColumn).toggleClass('hide');
	});

});