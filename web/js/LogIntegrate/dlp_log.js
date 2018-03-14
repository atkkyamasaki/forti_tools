$(function () {

	// Default のテーブル表示の Column を定義
	var defalutDisplayElement = [
		'.dlplog_level',
		'.dlplog_srcip',
		'.dlplog_service',
		'.dlplog_action',
		'.dlplog_url',
		'.dlplog_custom_time',
		'.dlplog_allinfo',
	];

	$.each(defalutDisplayElement, function(index, value) {
		$(value).removeClass('hide');
	});

	// Default の Column Filter の定義
	var customTime = '#dlp_column_filter_custom_time';
	var allInfo = '#dlp_column_filter_allinfo' ;

	var defalutDisplayColumn = [
		'#dlp_column_filter_level',
		'#dlp_column_filter_srcip',
		'#dlp_column_filter_service',
		'#dlp_column_filter_action',
		'#dlp_column_filter_url',
	];

	$.each(defalutDisplayColumn, function(index, value) {
		$(value).prop('checked', true);
	});

	$(customTime).parent('p').css('display', 'none');
	$(allInfo).parent('p').css('display', 'none');

	// Cloumn Filter での表示/非表示切り替え
	var targetElement = '.container_columns_filter_window p > input';

	$(targetElement).on('click', function(){
		var targetColumn = $(this).attr('id').replace('dlp_column_filter_', 'dlplog_');
		$('.' + targetColumn).toggleClass('hide');
	});

});