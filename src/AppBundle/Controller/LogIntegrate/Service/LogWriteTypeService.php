<?php

namespace AppBundle\Controller\LogIntegrate\Service;

use AppBundle\Controller\LogIntegrate\Service;

class LogWriteTypeService
{
    /**
     * Write and Sort for Event Log.
     *
     * @param string $id
     * @param string $firmware
     * @param string $logFilePath
     * @param string $margeFilePath
     * @param string $count
     * @return array
     */
    public function writeTypeEventlog($id, $firmware, $logFilePath, $margeFilePath, $count)
    {

        /* ファイルポインタをオープン */
        $file = fopen($logFilePath, "r");
         
        /* ファイルを1行ずつ出力 */
        if($file){

            // 列 Filter 用のキーワードを入れる配列
            $columnFilterWordArray = [];

            while ($line = fgets($file)) {

                // Log 文字列の初期化（初めの文字が "date" となる）
                $rawLine = mb_strstr($line, 'date=');

                // Log 文字列から空白文字区切りの配列に変換
                $loopCount = mb_substr_count($rawLine, ' ');
                $logArray = [];
                for ($i =0 ; $i < $loopCount; $i++) { 
                    $tmp = mb_strstr($rawLine, ' ', true);

                    if (mb_substr_count($tmp, '"') === 1) {

                        $rawLine = trim(str_replace($tmp, '', $rawLine));
                        $tmp2 = mb_strstr($rawLine, "\"", true);
                        $tmpMarge = $tmp . ' ' . $tmp2 . '"';
                        $rawLine = trim(str_replace($tmp2. '"', '', $rawLine));

                        array_push($logArray, $tmpMarge);

                    } else {
                        array_push($logArray, $tmp);
                        $rawLine = trim(str_replace($tmp, '', $rawLine));
                    }
                }

                // 配列内の空を削除
                $logArray = array_values(array_filter($logArray, "strlen"));

                // 連想配列へ変換
                $logHash = [];
                foreach ($logArray as $value) {
                    $tmp = explode('=', $value);
                    $logHash[$tmp['0']] = $tmp['1'];
                }

                // 日付情報と生ログメッセージを追加
                $logHash = array_merge(array('custom_time' => $logHash['date'] . ' ' . $logHash['time']), $logHash);
                $logHash['allinfo'] = mb_strstr($line, 'date=');

                // 配列を展開して HTML タグ付け
                $logString = '<tr class="filtertype_event cbfilter_' . $count . '">';
                foreach ($logHash as $key => $value) {
                    
                    // 列 Filter 用のキーワードを追加
                    if (!in_array($key, $columnFilterWordArray)) {
                        array_push($columnFilterWordArray, $key);
                    }

                    if ($key !== 'allinfo') {
                        $logString .= '<td class="hide eventlog_' . $key . '">';
                        $logString .= $value;
                        $logString .= '</td>';
                    } else {
                        $logString .= '<td class="hide eventlog_allinfo target-allinfo"><i class="fa fa-plus-square"></i><span>' . preg_replace('/\n|\r|\r\n/', '', $value) . '<span></td></tr>';
                    }
                }

            file_put_contents($margeFilePath, $logString . PHP_EOL, FILE_APPEND);
            }
        }
         
        /* ファイルポインタをクローズ */
        fclose($file);

        // 列 Filter 用のキーワードをファイルに書き込み
        $filterFilePath = '../web/image/LogIntegrate/' . $id . '/column_filter_event.txt';
       
        if (file_exists($filterFilePath)) {
            $existFilterWordArray = file($filterFilePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            $columnFilterWordArray = array_unique(array_merge($existFilterWordArray, $columnFilterWordArray));
        }

        $file = fopen($filterFilePath, "w");
        foreach ($columnFilterWordArray as $value) {
            fputs($file, $value . PHP_EOL);
        }
        fclose($file);

        return true;
    }

    /**
     * Write and Sort for ForwardTraffic Log.
     *
     * @param string $id
     * @param string $firmware
     * @param string $logFilePath
     * @param string $margeFilePath
     * @param string $count
     * @return array
     */
    public function writeTypeForwardTrafficlog($id, $firmware, $logFilePath, $margeFilePath, $count)
    {

        /* ファイルポインタをオープン */
        $file = fopen($logFilePath, "r");
         
        /* ファイルを1行ずつ出力 */
        if($file){

            // 列 Filter 用のキーワードを入れる配列
            $columnFilterWordArray = [];

            while ($line = fgets($file)) {

                // Log 文字列の初期化（初めの文字が "date" となる）
                $rawLine = mb_strstr($line, 'date=');

                // Log 文字列から空白文字区切りの配列に変換
                $loopCount = mb_substr_count($rawLine, ' ');
                $logArray = [];
                for ($i =0 ; $i < $loopCount; $i++) { 
                    $tmp = mb_strstr($rawLine, ' ', true);

                    if (mb_substr_count($tmp, '"') === 1) {

                        $rawLine = trim(str_replace($tmp, '', $rawLine));
                        $tmp2 = mb_strstr($rawLine, "\"", true);
                        $tmpMarge = $tmp . ' ' . $tmp2 . '"';
                        $rawLine = trim(str_replace($tmp2. '"', '', $rawLine));

                        array_push($logArray, $tmpMarge);

                    } else {
                        array_push($logArray, $tmp);
                        $rawLine = trim(str_replace($tmp, '', $rawLine));
                    }
                }

                // 配列内の空を削除
                $logArray = array_values(array_filter($logArray, "strlen"));

                // 連想配列へ変換
                $logHash = [];
                foreach ($logArray as $value) {
                    $tmp = explode('=', $value);
                    $logHash[$tmp['0']] = $tmp['1'];
                }

                // 日付情報と生ログメッセージを追加
                $logHash = array_merge(array('custom_time' => $logHash['date'] . ' ' . $logHash['time']), $logHash);
                $logHash['allinfo'] = mb_strstr($line, 'date=');

                // 配列を展開して HTML タグ付け
                $logString = '<tr class="filtertype_forwardtraffic cbfilter_' . $count . '">';
                foreach ($logHash as $key => $value) {
                    
                    // 列 Filter 用のキーワードを追加
                    if (!in_array($key, $columnFilterWordArray)) {
                        array_push($columnFilterWordArray, $key);
                    }

                    if ($key !== 'allinfo') {
                        $logString .= '<td class="hide forwardtrafficlog_' . $key . '">';
                        $logString .= $value;
                        $logString .= '</td>';
                    } else {
                        $logString .= '<td class="hide forwardtrafficlog_allinfo target-allinfo"><i class="fa fa-plus-square"></i><span>' . preg_replace('/\n|\r|\r\n/', '', $value) . '<span></td></tr>';
                    }
                }

            file_put_contents($margeFilePath, $logString . PHP_EOL, FILE_APPEND);
            }
        }
         
        /* ファイルポインタをクローズ */
        fclose($file);

        // 列 Filter 用のキーワードをファイルに書き込み
        $filterFilePath = '../web/image/LogIntegrate/' . $id . '/column_filter_forwardtraffic.txt';
       
        if (file_exists($filterFilePath)) {
            $existFilterWordArray = file($filterFilePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            $columnFilterWordArray = array_unique(array_merge($existFilterWordArray, $columnFilterWordArray));
        }

        $file = fopen($filterFilePath, "w");
        foreach ($columnFilterWordArray as $value) {
            fputs($file, $value . PHP_EOL);
        }
        fclose($file);

        return true;
    }
}
