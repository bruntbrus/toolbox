<?
require_once '../include/common.php';

$tool = new Tool(array(
  'name'    => 'notepad',
  'styles'  => array('notepad.css'),
  'scripts' => array('notepad.js')
));
$tool->begin();
?>
<p>Notepad</p>