rem ===================================
rem Note
rem ===================================
rem 1. Windows 起動時に対象のユーザで自動ログインするように設定
rem 2. 対象ユーザがログインした際、本バッチが起動するようタスクスケジューラで設定
rem
rem ===================================
rem PHP Web Server Turn On
rem ===================================
cd /d %~dp0
rem del /Q app\cache\prod
php app/console server:run --env=prod 0.0.0.0:80
pause