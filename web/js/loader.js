(function() {
    var userAgent = window.navigator.userAgent.toLowerCase();
    var cssFiles = [
        // '/vendor/ress.min.css',
        '/vendor/bootstrap/css/bootstrap.min.css',
        '/vendor/font-awesome/css/font-awesome.min.css',
        '/css/main.css'
    ];

    var jsFiles = [
        '/vendor/jquery/jquery-3.1.1.min.js',
        // '/vendor/jquery/jquery.cookie.js',
        '/vendor/tether/tether.min.js',
        // '/vendor/angular/angular.min.js',
        // '/vendor/angular/angular.min.js.map',
        '/vendor/bootstrap/js/bootstrap.min.js',
        '/vendor/highcharts/highcharts.js',
        '/vendor/highcharts/highcharts-3d.js',
        '/vendor/highcharts/exporting.js',
        '/vendor/highcharts/data.js',
        '/vendor/highcharts/drilldown.js',
        '/js/main.js'
    ];

    cssFiles.forEach(function(file) {
        write('<link rel="stylesheet" href="' + file + '">');
    });
    jsFiles.forEach(function(file) {
        write('<script src="' + file + '"></script>');
    });

    function write(text) {
        document.write(text);
    }
}());
