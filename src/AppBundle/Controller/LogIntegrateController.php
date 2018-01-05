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
        return $this->render('AppBundle:LogIntegrate:index.html.twig', [
        ]);

    }


    /**
     * @Route("/upload")
     * @Method({"POST"})
     */
    public function uploadAction()
    {
        $data = date("Ymd_His");
        $targetDir = "../web/image/logIntegrate/";
        $createPcapName = $data . '.pcap';

        if($_FILES["file"]["tmp_name"]){
            $postFile = "../web/image/logIntegrate/temp_file.txt";
            if($postFile) {
                unlink($postFile);
            }
            move_uploaded_file($_FILES['file']['tmp_name'], $postFile);
        }

        // Pcap 変換処理

        return new JsonResponse([
            'status' => 'OK',
            'file_name' => $createPcapName,
        ]);

    }


}

