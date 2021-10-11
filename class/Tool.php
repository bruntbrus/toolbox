<?php

class Tool {

  public $name;
  public $styles;
  public $scripts;

  public function __construct(array $data) {
    $this->name    = $data['name'];
    $this->styles  = $data['styles'];
    $this->scripts = $data['scripts'];
  }

  public function begin() {
    echo "<!--\n";
    echo "name:".htmlspecialchars($this->name)."\n";
    echo "styles:".implode(';', $this->styles)."\n";
    echo "scripts:".implode(';', $this->scripts)."\n";
    echo "-->\n";
  }
}
