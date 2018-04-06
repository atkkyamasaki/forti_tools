<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\JsonResponse;
use JMS\Serializer\SerializationContext;
use ZipArchive;

/**
 * @Route("/monitor/{product}")
 */
class ReportController extends Controller
{
    /**
     * @Route("/{version}")
     * @Method({"GET"})
     */
    public function reportAction($product, $version)
    {
        if (!file_exists('../src/AppBundle/Resources/config/' . $product . '/' . $version . '/result.json')) {
            return $this->render('AppBundle:Error:index.html.twig', [
            'error' => 'There ara no result.json file in this product directory.',
            ]);
        }

        $data = $this->getCucumberJson($product, $version);
        $images = $this->getDirImages($product, $version);
        $resultSummary = $this->getSummary($data);
        $senarioSummary = $resultSummary['senario_summary'];
        $countTotal = $resultSummary['count_total'];
        $featureSummary = $this->getFeatureSummary($senarioSummary);

        return $this->render('AppBundle:Report:index.html.twig', [
            'product' => $product,
            'version' => $version,
            'result_data' => $data,
            'count_total' => $countTotal,
            'feature_summary_total'=> $featureSummary,
            'senario_summary_total' => $senarioSummary,
            'images' => $images,
        ]);
    }

    /**
     * @Route("/{version}/api/{feature}")
     * @Method({"GET"})
     */
    public function reportApiAction($product, $version, $feature)
    {
        if (!file_exists('../src/AppBundle/Resources/config/' . $product . '/' . $version . '/result.json')) {
            return new JsonResponse([
                'feature' => 'There ara no result.json file in this product directory.',
                'status' => 'error',
            ]);
        }

        $data = $this->getCucumberJson($product, $version);
        $resultSummary = $this->getSummary($data);
        $senarioSummary = $resultSummary['senario_summary'];
        $featureSummary = $this->getFeatureSummary($senarioSummary);

        if (array_key_exists($feature, $featureSummary)) {
            $result = $featureSummary[$feature];
            if ($result['failed'] || $result['pending'] || $result['skipped']) {
                $status = 'error';
            } else {
                $status = 'successful';
            }
        } else {
            return new JsonResponse([
                'feature' => 'There ara no feature.',
                'status' => 'error',
            ]);
        }

        return new JsonResponse([
            'feature' => $result,
            'status' => $status,
        ]);
    }


    /**
     * @Route("/{version}/download")
     * @Method({"POST"})
     */
    public function downloadAction($product, $version)
    {
        $fileResult = '../src/AppBundle/Resources/config/' . $product . '/' . $version . '/result.json';
        $filePath = '../web/image/' . $product . '/' . $version . '/';
        $images = $this->getDirImages($product, $version);
        $tmpZipFile = '../web/image/tmp/result.zip';

        unlink($tmpZipFile);
        $zip = new ZipArchive();
        $res = $zip->open($tmpZipFile, ZipArchive::CREATE);
         
        if ($res === true) {
         
            $zip->addFile($fileResult, 'result.json');
            $i = 0;
            foreach ($images as $value) {
                $zip->addFile($filePath . $value, 'screenshot' . str_pad($i, 4, 0, STR_PAD_LEFT) . '.png');
                $i++;
            }
            $zip->close();
        }
        return $this->render('AppBundle:Home:index.html.twig');
    }

    /**
     * @Route("/{version}/upload")
     * @Method({"POST"})
     */
    public function uploadAction($product, $version)
    {
        if($_FILES["file"]["tmp_name"]){
            $postFile = "../web/image/tmp/post/result.zip";
            if($postFile) {
                unlink($postFile);
            }
            move_uploaded_file($_FILES['file']['tmp_name'], $postFile);
        }

        $zip = new ZipArchive();
         
        // ZIPファイルをオープン
        $res = $zip->open($postFile);
         
        // zipファイルのオープンに成功した場合
        if ($res === true) {
         
            // 圧縮ファイル内の全てのファイルを指定した解凍先に展開する
            $zip->extractTo('../web/image/tmp/unzip/');
         
            // ZIPファイルをクローズ
            $zip->close();
        }

        rename('../web/image/tmp/unzip/result.json', '../src/AppBundle/Resources/config/' . $product . '/' . $version . '/result.json');

        foreach(glob('../web/image/tmp/unzip/*.png', GLOB_BRACE) as $file){
            if(is_file($file)){
                // echo htmlspecialchars($file);
                // error_log('debug = ' . print_r(htmlspecialchars($file), true) . "\n", 3, 'C:\Users\Administrator\Desktop\debug.txt');
                $screenShotName = str_replace('../web/image/tmp/unzip/', '', $file);
                rename('../web/image/tmp/unzip/' . $screenShotName, '../web/image/' . $product . '/' . $version . '/' . $screenShotName);
            }
        }

        return $this->render('AppBundle:Home:index.html.twig');
    }

    private function getSummary($data)
    {
        $arrayFeatureFile = [];
        $countTotalFeatures = count($data);
        $countTotalSenarios = 0;
        $countTotalSteps = 0;

        $countTotalPassed = 0;
        $countTotalFailed = 0;
        $countTotalPending = 0;
        $countTotalSkipped = 0;

        $senarioSummary = [];

        foreach ($data as $features) {
            $countTotalSenarios += count($features['elements']);
            $summaryScenarios = [];

            foreach ($features['elements'] as $scenarios) {
                $countTotalSteps += count($scenarios['steps']);
                $summaryTotalPassed = 0;
                $summaryTotalFailed = 0;
                $summaryTotalPending = 0;
                $summaryTotalSkipped = 0;

                foreach ($scenarios['steps'] as $steps) {

                    switch ($steps['result']['status']) {
                        case 'passed':
                            $countTotalPassed += 1;
                            $summaryTotalPassed += 1;
                            break;
                        case 'failed':
                            $countTotalFailed += 1;
                            $summaryTotalFailed += 1;
                            break;
                        case 'pending':
                            $countTotalPending += 1;
                            $summaryTotalPending += 1;
                            break;
                        case 'skipped':
                            $countTotalSkipped += 1;
                            $summaryTotalSkipped += 1;
                            break;
                        
                        default:
                            break;
                    }
                    $summaryScenarios = array_merge($summaryScenarios, array($scenarios['name'] => [
                        'passed' => $summaryTotalPassed,
                        'failed' => $summaryTotalFailed,
                        'pending' => $summaryTotalPending,
                        'skipped' => $summaryTotalSkipped,
                        ])
                    );
                }
            }
            $senarioSummary = array_merge($senarioSummary, array($features['name'] => $summaryScenarios));
        }

        $countTotal = [
            'total_features' => $countTotalFeatures,
            'total_senarios' => $countTotalSenarios, 
            'total_steps' => $countTotalSteps,
            'total_passed' => $countTotalPassed,
            'total_failed' => $countTotalFailed,
            'total_pending' => $countTotalPending,
            'total_skipped' => $countTotalSkipped,
            'percent_passed' => round(($countTotalPassed / $countTotalSteps) * 100),
            'percent_failed' => round(($countTotalFailed / $countTotalSteps) * 100),
            'percent_pending' => round(($countTotalPending / $countTotalSteps) * 100),
            'percent_skipped' => round(($countTotalSkipped / $countTotalSteps) * 100),
        ];

        $result = ['senario_summary' => $senarioSummary, 'count_total' => $countTotal];
        return $result;
    }

    private function getFeatureSummary($senarioSummary)
    {
        $featureSummary = [];
        foreach ($senarioSummary as $key => $value) {

            $featureSummaryArray = [];
            $featureSummaryPassed = 0;
            $featureSummaryFailed = 0;
            $featureSummaryPending = 0;
            $featureSummarySkipped = 0;

            foreach ($value as $value2) {
                $featureSummaryPassed += $value2['passed'];
                $featureSummaryFailed += $value2['failed'];
                $featureSummaryPending += $value2['pending'];
                $featureSummarySkipped += $value2['skipped'];
            }

            $featureSummaryArray = [
                'passed' => $featureSummaryPassed,
                'failed' => $featureSummaryFailed,
                'pending' => $featureSummaryPending,
                'skipped' => $featureSummarySkipped,
            ];

            $featureSummary = array_merge($featureSummary, array($key => $featureSummaryArray));
        }
        return $featureSummary;
    }

    private function getCucumberJson($productName, $version)
    {
        $filePath = '../src/AppBundle/Resources/config/' . $productName . '/' . $version . '/result.json';
        $json = file_get_contents($filePath);
        if ($json === false) {
            throw new \RuntimeException('file not found.');
        }
        $data = json_decode($json, true);
        
        return $data;
    }

    private function getDirImages($productName, $version)
    {
        $filePath = '../web/image/' . $productName . '/' . $version;

        $images = [];
        $files = scandir($filePath);
        foreach ($files as $value) {
            if(strpos($value, '.png') !== false){
                array_push($images, $value);
            }
        }
        
        sort($images);

        return $images;

    }
}