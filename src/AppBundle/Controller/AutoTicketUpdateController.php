<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\JsonResponse;
use JMS\Serializer\SerializationContext;
use AppBundle\Entity\Assignee;
use ZipArchive;

/**
 * @Route("/auto_ticket")
 */
class AutoTicketUpdateController extends Controller
{
    /**
     * @Route("/view")
     * @Method({"GET"})
     */
    public function viewAction()
    {
        $em = $this->getDoctrine()->getManager();
        $assigneeRepository = $em->getRepository('AppBundle:Assignee');
        $assigneeList = $assigneeRepository->findBy([], ['id' => 'ASC']);
        $assignee = $this->toArray($assigneeList);

        $em = $this->getDoctrine()->getManager();
        $pool0Repository = $em->getRepository('AppBundle:Pool0');
        $pool0List = $pool0Repository->findBy([], ['id' => 'ASC']);
        $pool0 = $this->toArray($pool0List);


        $logFilePath = '../src/AppBundle/Resources/config/AutoTicketUpdate/logs.csv';

        return $this->render('AppBundle:AutoTicketUpdate:index.html.twig', [
            'assignee' => $assigneeList,
            'pool0' => $pool0,
        ]);

    }

    /**
     * @Route("/next_assign")
     * @Method({"GET"})
     */
    public function nextAssignAction()
    {
        $cmd = 'PoolMonitor.sh';
        exec($cmd, $output);
        $this->writeOutputLog($cmd, $output);

        foreach ($output as $value) {
            if (strpos($value,'Next assginee            :') !== false) {
                $nextAssginInfo = explode(',', $value);
                $nextAssgin = str_replace(' name = ', '', $nextAssginInfo[1]);
            } elseif (strpos($value,'Next assginee (high_pri) :') !== false) {
                $nextHighAssginInfo = explode(',', $value);
                $nextHighAssgin = str_replace(' name = ', '', $nextHighAssginInfo[1]);
            } elseif (strpos($value,'unassigned tickets') !== false) {
                $unassignNum = str_replace('# of unassigned tickets = ', '', $value);
            } 
        }

        return new JsonResponse([
            'next_assign' => $nextAssgin,
            'next_high_assign' => $nextHighAssgin,
            'unassign_num' => $unassignNum,
        ]);
    }

    /**
     * @Route("/auto_assign")
     * @Method({"PUT"})
     */
    public function autoAssignAction()
    {
        $cmd = 'PoolMonitor.sh -a';
        exec($cmd, $output);
        $this->writeOutputLog($cmd, $output);

        return new JsonResponse([
            'status' => 'successful',
            'cmd' => $cmd,
        ]);
    }

    /**
     * @Route("/case_move")
     * @Method({"PUT"})
     */
    public function caseMoveAction()
    {
        $cmd = 'CaseMover.sh';
        exec($cmd, $output);
        $this->writeOutputLog($cmd, $output);

        return new JsonResponse([
            'status' => 'successful',
            'cmd' => $cmd,
        ]);
    }

    /**
     * @Route("/manual_assign_create/{caseId}/{newUserId}")
     * @Method({"PUT"})
     */
    public function manualAssignCreateAction($caseId, $newUserId)
    {
        $cmd = 'PoolMonitor.sh -f ' . $caseId . ' ' . $newUserId;
        exec($cmd, $output);
        $this->writeOutputLog($cmd, $output);
        
        return new JsonResponse([
            'case' => $caseId,
            'new_user' => $newUserId,
            'cmd' => $cmd,
        ]);
    }

    /**
     * @Route("/manual_assign/{caseId}/{oldUserId}/{newUserId}")
     * @Method({"PUT"})
     */
    public function manualAssignUpdateAction($caseId, $oldUserId, $newUserId)
    {
        $cmd = 'PoolMonitor.sh -s ' . $caseId . ' ' . $oldUserId . ' ' . $newUserId;
        exec($cmd, $output);
        $this->writeOutputLog($cmd, $output);
        
        return new JsonResponse([
            'case' => $caseId,
            'old_user' => $oldUserId,
            'new_user' => $newUserId,
            'cmd' => $cmd,
        ]);
    }

    /**
     * @Route("/case_delete/{caseId}")
     * @Method({"DELETE"})
     */
    public function caseDeleteAction($caseId)
    {
        $cmd = 'PoolMonitor.sh -r ' . $caseId;
        exec($cmd, $output);
        $this->writeOutputLog($cmd, $output);

        return new JsonResponse([
            'status' => 'successful',
            'cmd' => $cmd,
        ]);
    }

    /**
     * @Route("/assignee_status/{userId}/{pto}/{da}")
     * @Method({"PUT"})
     */
    public function ptoChangeAction($userId, $pto, $da)
    {
        // データの追加処理
        // $assignee = new Assignee();
        // $assignee->setName('test');
        // $assignee->setLaps(5);
        // $assignee->setPoint(100);
        // $assignee->setHighPri(2);
        // $assignee->setPto(1);
        // $assignee->setDa(1);

        // $em = $this->getDoctrine()->getManager();
        // $em->persist($assignee);
        // $em->flush();

        // データの更新処理
        // $em = $this->getDoctrine()->getManager();
        // $user = $em->getRepository('AppBundle:Assignee')->find($userId);
        // if (!$user) {
        //     throw $this->createNotFoundException(
        //         'No user found for id '. $userId
        //     );
        // }
        // $user->setPto($pto);
        // $em->flush();

        // $em = $this->getDoctrine()->getManager();
        // $user = $em->getRepository('AppBundle:Assignee')->find($userId);
        // if (!$user) {
        //     throw $this->createNotFoundException(
        //         'No user found for id '. $userId
        //     );
        // }
        // $user->setDa($da);
        // $em->flush();

        $cmd = 'PTO_add.sh ' . $userId . ' ' . $pto . ' ' . $da;
        exec($cmd, $output);
        $this->writeOutputLog($cmd, $output);

        return new JsonResponse([
            'user' => $userId,
            'pto' => $pto,
            'da' => $da,
            'cmd' => $cmd,
        ]);
    }

    /**
     * @Route("/log_download")
     * @Method({"GET"})
     */
    public function logDownloadAction()
    {
        $logFilePath = '../src/AppBundle/Resources/config/AutoTicketUpdate/logs.csv';
        $downloadLogPath = '../web/image/AutoTicketUpdate/logs.zip';

        unlink($downloadLogPath);
        $zip = new ZipArchive();
        $res = $zip->open($downloadLogPath, ZipArchive::CREATE);
         
        if ($res === true) {         
            $zip->addFile($logFilePath, 'logs.log');
            $zip->close();
        }

        return new JsonResponse([
            'status' => 'successful',
        ]);
    }

    /**
     * Covert entity object into array.
     *
     * @param $entity
     * @return array
     */
    private function toArray($entity)
    {
        return json_decode($this->serialize($entity), true);
    }

    /**
     * Serialize entity object into json.
     *
     * @param object $entity
     * @return mixed|string
     */
    private function serialize($entity)
    {
        return $this->container->get('jms_serializer')->serialize(
            $entity,
            'json',
            SerializationContext::create()->enableMaxDepthChecks()->setSerializeNull(true)
        );
    }

    /**
     * Write cmd output to log file.
     *
     * @param string $cmd
     * @param array $output
     * @return boolean
     */
    private function writeOutputLog($cmd, $output)
    {
        $date = date('Y/m/d H:i:s');

        $delimiter = ',+*+*+,';
        $writeData = $date . $delimiter . $cmd . $delimiter . implode(PHP_EOL, $output) . $delimiter . PHP_EOL;
        
        $logFilePath = '../src/AppBundle/Resources/config/AutoTicketUpdate/logs.csv';
        $this->rotateOutputLog($logFilePath);

        $contents = file_get_contents($logFilePath);
        $contents = $writeData . $contents;
        file_put_contents($logFilePath, $contents);

        return true;
    }

    /**
     * Log file rotate.
     *
     * @param string $logFilePath
     * @return boolean
     */
    private function rotateOutputLog($logFilePath)
    {
        $cutDate = date('Y/m/d', strtotime('-7 day'));
        $newLog = '';

        $fp = fopen( $logFilePath, 'r' );

        while (!feof($fp)) {

            $log = fgets($fp);
            $logDate = substr($log, 0, 10);

            if (preg_match("/^20..\/..\/../", $logDate)) {
                if (date('Y/m/d', strtotime($cutDate)) < date('Y/m/d', strtotime($logDate))) {
                    $newLog = $newLog . $log;
                } else {
                    break;
                }
            } else {
                $newLog = $newLog . $log;
            }
        }
        fclose($fp);
        
        file_put_contents($logFilePath, $newLog);
        return true;
    }

    /**
     * get Array from log file.
     *
     * @param string $logFilePath
     * @return array
     */
    private function getArrayOutputLog($logFilePath)
    {
        $date = date('Y/m/d H:i:s');
        $delimiter = ',+*+*+,';

        $logs = file_get_contents($logFilePath);

        if (!strlen($logs)) {
            return [['log no exists', '', '']];
        }

        $result = [];
        for ($i = 0, $hasDelimiter = true, $displayMaxNum = 30; $hasDelimiter && $i < $displayMaxNum; $i++) { 

            if ($i === 0) {
                $result[$i] = explode($delimiter, $logs, 4);
                $newLogs = ltrim($result[$i][3], PHP_EOL);
                array_pop($result[$i]);

            } else {

                if (strpos($newLogs, $delimiter) !== false) {

                    $result[$i] = explode($delimiter, $newLogs, 4);
                    $newLogs = ltrim($result[$i][3], PHP_EOL);
                    array_pop($result[$i]);

                } else {
                    $hasDelimiter = false;
                }
            }
        }

        return $result;
    }

    /**
     * @Route("/api/assignee")
     * @Method({"GET"})
     */
    public function apiAssigneeAction()
    {
        $em = $this->getDoctrine()->getManager();
        $assigneeRepository = $em->getRepository('AppBundle:Assignee');
        $assigneeList = $assigneeRepository->findBy([], ['id' => 'ASC']);
        $assignee = $this->toArray($assigneeList);

        return new JsonResponse($assignee);
    }

    /**
     * @Route("/api/log")
     * @Method({"GET"})
     */
    public function apiLogAction()
    {
        $logFilePath = '../src/AppBundle/Resources/config/AutoTicketUpdate/logs.csv';

        if (!file_exists($logFilePath)) {
            $logs = [['file no exists', '', '']];
        } else {
            $logs = $this->getArrayOutputLog($logFilePath);
        }

        return new JsonResponse($logs);
    }
}

