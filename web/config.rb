require 'compass/import-once/activate'

# http_path = "C:\Origin_tool\auto_ui_reporter\web" 
http_path = "/"
css_dir = "css"
sass_dir = "sass"
images_dir = "image"
javascripts_dir = "js"
Encoding.default_external = "utf-8"

# アウトプットスタイル（デフォルト：expanded）
# output_style = :expanded   #一般的なCSS記述スタイル
# output_style = :nested     #Sassなどのネストを継承したスタイル
output_style = :compact      #1つのCSS設定が１行になるスタイル
# output_style = :compressed #コメント完全削除+圧縮するスタイル


# Compass拡張関数で使うURLを絶対パスか相対パスかで指定（デフォルト：false[絶対パス]）
relative_assets = true
 
# デバッグ用のコメント出力（デフォルト：true[出力する]）
line_comments = false
 
# SCSS記法とSass記法の切り替え（Sass記法利用時、コメント外す）
preferred_syntax = :sass