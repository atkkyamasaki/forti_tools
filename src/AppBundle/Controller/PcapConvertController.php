<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\JsonResponse;
use JMS\Serializer\SerializationContext;

/**
 * @Route("/pcapConvert")
 */
class PcapConvertController extends Controller
{
    /**
     * @Route("/view")
     * @Method({"GET"})
     */
    public function viewAction()
    {

        $fileDir = "../web/image/PcapConvert/pcap";
        $filesArray = array();

        foreach (glob($fileDir . '/{*.pcap}', GLOB_BRACE) as $file){
            if (is_file($file)) {
                array_push($filesArray, htmlspecialchars(basename($file)));
            }
        }

        return $this->render('AppBundle:PcapConvert:index.html.twig', [
            'file_num' => count($filesArray),
            'files_array' => $filesArray,
        ]);

    }


    /**
     * @Route("/upload")
     * @Method({"POST"})
     */
    public function uploadAction()
    {
        $data = date("Ymd_His");
        $createPcapName = $data . '.pcap';

        if($_FILES["file"]["tmp_name"]){
            $postFile = "../web/image/PcapConvert/temp_file.txt";
            if($postFile) {
                unlink($postFile);
            }
            move_uploaded_file($_FILES['file']['tmp_name'], $postFile);
        }

        // Pcap 変換処理


        $this->fileRotate();

        return new JsonResponse([
            'status' => 'OK',
            'file_name' => $createPcapName,
        ]);

    }

    /**
     * File rotate.
     *
     * @param string $logFilePath
     * @return array
     */
    private function fileRotate()
    {

        $fileDir = "../web/image/PcapConvert/pcap";
        $filesArray = array();

        foreach (glob($fileDir . '/{*.pcap}', GLOB_BRACE) as $file){
            if (is_file($file)) {
                array_push($filesArray, htmlspecialchars(basename($file)));
            }
        }

        // error_log('debug = ' . print_r($filesArray, true) . "\n", 3, 'C:\Users\Administrator\Desktop\debug.txt');

        while (count($filesArray) > 10) {
            $removeFile = array_pop($filesArray);
            unlink($fileDir . '/' . $removeFile);
        }
    }

}

