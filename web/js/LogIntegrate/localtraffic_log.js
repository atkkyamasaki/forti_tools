$(function () {

	// Default のテーブル表示の Column を定義
	var defalutDisplayElement = [
		'.localtrafficlog_srcip',
		'.localtrafficlog_srcport',
		'.localtrafficlog_dstip',
		'.localtrafficlog_dstport',
		'.localtrafficlog_action',
		'.localtrafficlog_custom_time',
		'.localtrafficlog_allinfo',
	];

	$.each(defalutDisplayElement, function(index, value) {
		$(value).removeClass('hide');
	});

	// Default の Column Filter の定義
	var customTime = '#localtraffic_column_filter_custom_time';
	var allInfo = '#localtraffic_column_filter_allinfo' ;

	var defalutDisplayColumn = [
		'#localtraffic_column_filter_srcip',
		'#localtraffic_column_filter_srcport',
		'#localtraffic_column_filter_dstip',
		'#localtraffic_column_filter_dstport',
		'#localtraffic_column_filter_action',
	];

	$.each(defalutDisplayColumn, function(index, value) {
		$(value).prop('checked', true);
	});

	$(customTime).parent('p').css('display', 'none');
	$(allInfo).parent('p').css('display', 'none');

	// Cloumn Filter での表示/非表示切り替え
	var targetElement = '.container_columns_filter_window p > input';

	$(targetElement).on('click', function(){
		var targetColumn = $(this).attr('id').replace('localtraffic_column_filter_', 'localtrafficlog_');
		$('.' + targetColumn).toggleClass('hide');
	});

});