<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\JsonResponse;
use JMS\Serializer\SerializationContext;
use AppBundle\Controller\LogIntegrate\Service\LogWriteTypeService;

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
            $memo = $_POST["memo"];
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
        $resultHtmlFilterBtn = $this->createHtmlFilterBtn($id, $file, $firmware, $memo, $count, $htmlFilterFilePath);

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
        $LogWriteTypeService = new LogWriteTypeService();

        switch($file) {
            case 'event':
                $LogWriteTypeService->writeTypelog('event', $id, $firmware, $logFilePath, $margeFilePath, $count);
                break;

            case 'forwardtraffic':
                $LogWriteTypeService->writeTypelog('forwardtraffic', $id, $firmware, $logFilePath, $margeFilePath, $count);
                break;

            case 'webfilter':
                $LogWriteTypeService->writeTypelog('webfilter', $id, $firmware, $logFilePath, $margeFilePath, $count);
                break;

            default:

        }

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
    private function createHtmlFilterBtn($id, $file, $firmware, $memo, $count, $htmlFilterFilePath)
    {
        $htmlFilterBtn = '<p><input type="checkbox" name="cbfilter_' . $count . '" id="cbfilter_' . $count . '" value="1" class="cbfilter cbfilter_' . $count . '" checked="checked"><label for="cbfilter_' . $count . '">' . $count . ':' . $file . '</label><span>' . $memo . ' (Version.' . $firmware . ')</span></p>';

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
        $forwardtrafficFilePath = '../web/image/LogIntegrate/' . $id . '/column_filter_forwardtraffic.txt';
        $webfilterFilePath = '../web/image/LogIntegrate/' . $id . '/column_filter_webfilter.txt';


        $result = [];
        if (file_exists($eventFilePath)) {
            $result['event'] = file($eventFilePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        }
        if (file_exists($forwardtrafficFilePath)) {
            $result['forwardtraffic'] = file($forwardtrafficFilePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        }
        if (file_exists($webfilterFilePath)) {
            $result['webfilter'] = file($webfilterFilePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        }

        return $result;
    }


}

