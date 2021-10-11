<?php

define('ROOT_DIR', dirname(__DIR__));

function class_loader($class) {
  include ROOT_DIR."/class/$class.php";
  return class_exists($class);
}

spl_autoload_register('class_loader');
