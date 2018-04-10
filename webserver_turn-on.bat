rem ===================================
rem PHP Web Server Turn On
rem ===================================
cd /d %~dp0
del /Q app\cache\prod
php app/console server:run --env=prod 0.0.0.0:80
rem pause