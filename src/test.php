<?php
namespace wdpf\test;
class test{
    public function __construct(){
        include __DIR__."/motherboard.php";
        $pagination = new motherboard();
    }
}
