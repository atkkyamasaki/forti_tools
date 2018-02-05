$(function () {
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

});