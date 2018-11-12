<?php

	class Project{
		public $id = 0;
		public $Title = "";
		public $Date = "";
		public $Summary = "";
		public $Description = "";
		public $Screenshots = array();
		public $Languages = array();
		public $Thumbnail = "";
		public $Github = "";
	}

	function reArrayFiles(&$file_post) {

    $file_ary = array();
    $file_count = count($file_post['name']);
    $file_keys = array_keys($file_post);

    for ($i=0; $i<$file_count; $i++) {
        foreach ($file_keys as $key) {
            $file_ary[$i][$key] = $file_post[$key][$i];
        }
    }

    return $file_ary;
}


?>
