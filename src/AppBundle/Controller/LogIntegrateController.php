<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\JsonResponse;
use JMS\Serializer\SerializationContext;

/**
 * @Route("/logIntegrate")
 */
class LogIntegrateController extends Controller
{
    /**
     * @Route("/view")
     * @Method({"GET"})
     */
    public function viewAction()
    {
        // 重複したアクセスが発生した際にも id を付与して処理するディレクトリを分ける
        $id = date("Ymd_His");

        return $this->render('AppBundle:LogIntegrate:index.html.twig', [
            'id' => $id,
        ]);

    }

    /**
     * @Route("/upload")
     * @Method({"POST"})
     */
    public function uploadAction()
    {
        // 新規ログファイルをアップロードして temp_file.txt に書き込む
        if($_FILES["file"]["tmp_name"]){
            $postFile = "../web/image/logIntegrate/temp_file.txt";
            if($postFile) {
                unlink($postFile);
            }
            move_uploaded_file($_FILES['file']['tmp_name'], $postFile);
        }

        return new JsonResponse([
            'status' => 'OK',
        ]);

    }

    /**
     * @Route("/uploadLogResult")
     * @Method({"POST"})
     */
    public function uploadLogResult()
    {
        // POST 情報よりファイル整形を行う情報を取得
        if ($_SERVER["REQUEST_METHOD"] === "POST") {
            $id = $_POST["id"];
            $firmware = $_POST["firmware"];
            $file = $_POST["file"];
            $count = $_POST["count"];
        }

        // 作業用のディレクトリとファイルの初期化
        $logFilePath = '../web/image/LogIntegrate/temp_file.txt';
        $htmlFilterFilePath = '../web/image/LogIntegrate/' . $id . '/html_file.txt';
        $margeFileDir = '../web/image/LogIntegrate/' . $id;
        $margeFilePath = $margeFileDir . '/marge_file.txt';

        if (!file_exists($margeFileDir)) {
            mkdir($margeFileDir, '0777',TRUE);
        }
        if (!file_exists($margeFilePath)) {
            touch($margeFilePath);
        }
        if (!file_exists($htmlFilterFilePath)) {
            touch($htmlFilterFilePath);
        }

        // ファイル整形処理を実行
        $result = $this->fileWriteTypeSelector($id, $file, $firmware, $logFilePath, $margeFilePath, $count);

        // フィルタ用の HTML ボタンを作成
        $resultHtmlFilterBtn = $this->createHtmlFilterBtn($id, $file, $firmware, $count, $htmlFilterFilePath);

        return new JsonResponse([
            'status' => $id . $firmware . $file .$count,
            'htmlFilterBtn' => $resultHtmlFilterBtn,
        ]);
    }

    /**
     * Select writing style per file type.
     *
     * @param string $id
     * @param string $file
     * @param string $firmware
     * @param string $logFilePath
     * @param string $margeFilePath
     * @param string $count
     * @return array
     */
    private function fileWriteTypeSelector($id, $file, $firmware, $logFilePath, $margeFilePath, $count)
    {
        switch($file) {
            case 'event':
                $this->writeTypeEventlog($id, $firmware, $logFilePath, $margeFilePath, $count);
                break;

            default:

        }

        return true;
    }

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
    private function writeTypeEventlog($id, $firmware, $logFilePath, $margeFilePath, $count)
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
     * Create html button for filter.
     *
     * @param string $id
     * @param string $file
     * @param string $firmware
     * @param string $count
     * @param string $htmlFilterFilePath
     * @return string
     */
    private function createHtmlFilterBtn($id, $file, $firmware, $count, $htmlFilterFilePath)
    {
        $htmlFilterBtn = '<p><input type="checkbox" name="cbfilter_' . $count . '" id="cbfilter_' . $count . '" value="1" class="cbfilter cbfilter_' . $count . '" checked="checked"><label for="cbfilter_' . $count . '">' . $count . ':' . $file . '</label></p>';

        file_put_contents($htmlFilterFilePath, $htmlFilterBtn . PHP_EOL, FILE_APPEND);

        return $htmlFilterBtn;
    }










    /**
     * @Route("/view/table/{id}")
     * @Method({"GET"})
     */
    public function tableViewAction($id)
    {
        $margeFilePath = '../web/image/LogIntegrate/' . $id . '/marge_file.txt';
        $resultLogArray = file($margeFilePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

        $htmlFilterFilePath = '../web/image/LogIntegrate/' . $id . '/html_file.txt';
        $resultHtmlFilterBtn = file($htmlFilterFilePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

        $resultColumnFilterArray = $this->getColumnFilterArray($id);

        // error_log('debug = ' . print_r($resultColumnFilterArray, true) . "\n", 3, 'C:\Users\Administrator\Desktop\debug.txt');

        return $this->render('AppBundle:LogIntegrate:table_view.html.twig', [
            'id' => $id,
            'result_log_array' => $resultLogArray,
            'result_html_filter_btn' => $resultHtmlFilterBtn,
            'reuslt_column_filter_array' => $resultColumnFilterArray,
        ]);

    }

    /**
     * Get array for Cloumn Filter
     *
     * @param string $id
     * @return array 
     */
    private function getColumnFilterArray($id)
    {
        $eventFilePath = '../web/image/LogIntegrate/' . $id . '/column_filter_event.txt';

        $result = [];
        if (file_exists($eventFilePath)) {
            $result['event'] = file($eventFilePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        }

        return $result;
    }


}

