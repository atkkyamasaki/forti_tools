<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Pool0
 *
 * @ORM\Table(name="pool0")
 * @ORM\Entity(repositoryClass="AppBundle\Entity\Pool0Repository")
 */
class Pool0
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var integer
     *
     * @ORM\Column(name="case_id", type="integer")
     */
    private $caseId;

    /**
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=255)
     */
    private $title;

    /**
     * @var string
     *
     * @ORM\Column(name="priority", type="string", length=255)
     */
    private $priority;

    /**
     * @var string
     *
     * @ORM\Column(name="country", type="string", length=255)
     */
    private $country;

    /**
     * @var string
     *
     * @ORM\Column(name="queue", type="string", length=255)
     */
    private $queue;

    /**
     * @var string
     *
     * @ORM\Column(name="tac", type="string", length=255)
     */
    private $tac;

    /**
     * @var string
     *
     * @ORM\Column(name="model", type="string", length=255)
     */
    private $model;

    /**
     * @var string
     *
     * @ORM\Column(name="company", type="string", length=255)
     */
    private $company;

    /**
     * @var integer
     *
     * @ORM\Column(name="assignee", type="integer")
     */
    private $assignee;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;

    /**
     * @var integer
     *
     * @ORM\Column(name="mv_comp", type="integer")
     */
    private $mvComp;

    /**
     * @var integer
     *
     * @ORM\Column(name="q_group", type="integer")
     */
    private $qGroup;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set caseId
     *
     * @param integer $caseId
     * @return Pool0
     */
    public function setCaseId($caseId)
    {
        $this->caseId = $caseId;
    
        return $this;
    }

    /**
     * Get caseId
     *
     * @return integer 
     */
    public function getCaseId()
    {
        return $this->caseId;
    }

    /**
     * Set title
     *
     * @param string $title
     * @return Pool0
     */
    public function setTitle($title)
    {
        $this->title = $title;
    
        return $this;
    }

    /**
     * Get title
     *
     * @return string 
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set priority
     *
     * @param string $priority
     * @return Pool0
     */
    public function setPriority($priority)
    {
        $this->priority = $priority;
    
        return $this;
    }

    /**
     * Get priority
     *
     * @return string 
     */
    public function getPriority()
    {
        return $this->priority;
    }

    /**
     * Set country
     *
     * @param string $country
     * @return Pool0
     */
    public function setCountry($country)
    {
        $this->country = $country;
    
        return $this;
    }

    /**
     * Get country
     *
     * @return string 
     */
    public function getCountry()
    {
        return $this->country;
    }

    /**
     * Set queue
     *
     * @param string $queue
     * @return Pool0
     */
    public function setQueue($queue)
    {
        $this->queue = $queue;
    
        return $this;
    }

    /**
     * Get queue
     *
     * @return string 
     */
    public function getQueue()
    {
        return $this->queue;
    }

    /**
     * Set tac
     *
     * @param string $tac
     * @return Pool0
     */
    public function setTac($tac)
    {
        $this->tac = $tac;
    
        return $this;
    }

    /**
     * Get tac
     *
     * @return string 
     */
    public function getTac()
    {
        return $this->tac;
    }

    /**
     * Set model
     *
     * @param string $model
     * @return Pool0
     */
    public function setModel($model)
    {
        $this->model = $model;
    
        return $this;
    }

    /**
     * Get model
     *
     * @return string 
     */
    public function getModel()
    {
        return $this->model;
    }

    /**
     * Set company
     *
     * @param string $company
     * @return Pool0
     */
    public function setCompany($company)
    {
        $this->company = $company;
    
        return $this;
    }

    /**
     * Get company
     *
     * @return string 
     */
    public function getCompany()
    {
        return $this->company;
    }

    /**
     * Set assignee
     *
     * @param integer $assignee
     * @return Pool0
     */
    public function setAssignee($assignee)
    {
        $this->assignee = $assignee;
    
        return $this;
    }

    /**
     * Get assignee
     *
     * @return integer 
     */
    public function getAssignee()
    {
        return $this->assignee;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return Pool0
     */
    public function setName($name)
    {
        $this->name = $name;
    
        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set mvComp
     *
     * @param integer $mvComp
     * @return Pool0
     */
    public function setMvComp($mvComp)
    {
        $this->mvComp = $mvComp;
    
        return $this;
    }

    /**
     * Get mvComp
     *
     * @return integer 
     */
    public function getMvComp()
    {
        return $this->mvComp;
    }

    /**
     * Set qGroup
     *
     * @param integer $qGroup
     * @return Pool0
     */
    public function setQGroup($qGroup)
    {
        $this->qGroup = $qGroup;
    
        return $this;
    }

    /**
     * Get qGroup
     *
     * @return integer 
     */
    public function getQGroup()
    {
        return $this->qGroup;
    }
}
