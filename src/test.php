<?php
namespace wdpf\test;
final class test{
    public function __construct(){
        include __DIR__."/mother.php";
        wdpf\mother\mother();
    }
}
