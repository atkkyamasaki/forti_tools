<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Assignee
 *
 * @ORM\Table(name="assignee")
 * @ORM\Entity(repositoryClass="AppBundle\Entity\AssigneeRepository")
 */
class Assignee
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
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;      

    /**
     * @var integer
     *
     * @ORM\Column(name="laps", type="integer")
     */
    private $laps;

    /**
     * @var integer
     *
     * @ORM\Column(name="point", type="integer")
     */
    private $point;

    /**
     * @var integer
     *
     * @ORM\Column(name="high_pri", type="integer")
     */
    private $highPri;

    /**
     * @var integer
     *
     * @ORM\Column(name="pto", type="integer")
     */
    private $pto;

    /**
     * @var integer
     *
     * @ORM\Column(name="DA", type="integer")
     */
    private $da;


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
     * Set name
     *
     * @param string $name
     * @return Assignee
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
     * Set laps
     *
     * @param integer $laps
     * @return Assignee
     */
    public function setLaps($laps)
    {
        $this->laps = $laps;
    
        return $this;
    }

    /**
     * Get laps
     *
     * @return integer 
     */
    public function getLaps()
    {
        return $this->laps;
    }

    /**
     * Set point
     *
     * @param integer $point
     * @return Assignee
     */
    public function setPoint($point)
    {
        $this->point = $point;
    
        return $this;
    }

    /**
     * Get point
     *
     * @return integer 
     */
    public function getPoint()
    {
        return $this->point;
    }

    /**
     * Set highPri
     *
     * @param integer $highPri
     * @return Assignee
     */
    public function setHighPri($highPri)
    {
        $this->highPri = $highPri;
    
        return $this;
    }

    /**
     * Get highPri
     *
     * @return integer 
     */
    public function getHighPri()
    {
        return $this->highPri;
    }

    /**
     * Set pto
     *
     * @param integer $pto
     * @return Assignee
     */
    public function setPto($pto)
    {
        $this->pto = $pto;
    
        return $this;
    }

    /**
     * Get pto
     *
     * @return integer 
     */
    public function getPto()
    {
        return $this->pto;
    }

    /**
     * Set da
     *
     * @param integer $da
     * @return Assignee
     */
    public function setDa($da)
    {
        $this->da = $da;
    
        return $this;
    }

    /**
     * Get da
     *
     * @return integer 
     */
    public function getDa()
    {
        return $this->da;
    }
}
