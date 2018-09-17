<?php  
	
	$base_path = $_SERVER["DOCUMENT_ROOT"];
	
	include($base_path . "Portfolio/views/include/utilities.php");
	
	$project = new Project();
	
	
	
	if(isset($_POST['title']) && isset($_POST['date']) && isset($_POST['summary']) && 
	   isset($_POST['description']) && isset($_FILES['imgToUpload']) && isset($_REQUEST['languages']) &&
	   isset($_FILES['thumbnail']) && isset($_POST['github'])){	
	   
		mkdir($base_path . "Portfolio/assets/images/Screenshots/".$_POST['title'], 0700);
		
		$project->Title = $_POST['title'];
		$project->Date = $_POST['date'];
		$project->Summary = $_POST['summary'];
		$project->Description = $_POST['description'];
		$project->Screenshots = array_map(function($value){
									return (string)$_POST['title'] . '/' . (string)$value["name"];
									
								}, reArrayFiles($_FILES['imgToUpload']));
		$project->Languages = array_map(function($value){
									return $value;
									
								}, $_REQUEST['languages']);
		$project->Thumbnail = $_FILES['thumbnail']['name'];
		$project->Github = $_POST['github'];
		
		
		// read json file
		$data = file_get_contents($base_path . "Portfolio/model/data/results_new.json");
		
		// decode json
		$json_arr = json_decode($data, true);
		//print_r($json_arr['info']);
		// add data
		array_push($json_arr['info'], $project);

		// encode json and save to file
		file_put_contents($base_path . "Portfolio/model/data/results_new.json", json_encode($json_arr, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
		
		
		
		// Copy thumbnail to directory
		$target_dir = $base_path . "Portfolio/assets/images/Thumbnails/";
		$target_file = $target_dir . basename($_FILES['thumbnail']['name']);
		$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
			
		// Check if image file is a actual image or fake image
		$check = getimagesize($_FILES['thumbnail']['tmp_name']);
		if($check !== false) {
			echo "File is an image - " . $check["mime"] . ".";
			$uploadOk = 1;
		} else {
			echo "File is not an image.";
			$uploadOk = 0;
		}
		
		// Check if file already exists
		if (file_exists($target_file)) {
			echo "Sorry, file already exists.";
			$uploadOk = 0;
		}
		// Check file size
		if ($_FILES['thumbnail']['size'] > 10000000) {
			echo "Sorry, your file is too large.";
			$uploadOk = 0;
		}
		// Allow certain file formats
		if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
		&& $imageFileType != "gif" ) {
			echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
			$uploadOk = 0;
		}
		// Check if $uploadOk is set to 0 by an error
		if ($uploadOk == 0) {
			echo "Sorry, your file was not uploaded.";
		// if everything is ok, try to upload file
		} else {
			if (move_uploaded_file($_FILES['thumbnail']['tmp_name'], $target_file)) {
				echo "The file ". basename($_FILES['thumbnail']['name']). " has been uploaded.";
			} else {
				echo "Sorry, there was an error uploading your file.";
			}
		}
		
		// Copy screenshots to directory
		$target_dir = $base_path . "Portfolio/assets/images/Screenshots/" . $_POST['title'] . "/";
		$uploadOk = 1;
		$files = reArrayFiles($_FILES['imgToUpload']);
		foreach($files as $value){
			
			//echo "name: ".$value["name"];
			$target_file = $target_dir . basename($value["name"]);
			$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
			
			// Check if image file is a actual image or fake image
			$check = getimagesize($value["tmp_name"]);
			if($check !== false) {
				echo "File is an image - " . $check["mime"] . ".";
				$uploadOk = 1;
			} else {
				echo "File is not an image.";
				$uploadOk = 0;
			}
			
			// Check if file already exists
			if (file_exists($target_file)) {
				echo "Sorry, file already exists.";
				$uploadOk = 0;
			}
			// Check file size
			if ($value["size"] > 10000000) {
				echo "Sorry, your file is too large.";
				$uploadOk = 0;
			}
			// Allow certain file formats
			if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
			&& $imageFileType != "gif" ) {
				echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
				$uploadOk = 0;
			}
			// Check if $uploadOk is set to 0 by an error
			if ($uploadOk == 0) {
				echo "Sorry, your file was not uploaded.";
			// if everything is ok, try to upload file
			} else {
				if (move_uploaded_file($value["tmp_name"], $target_file)) {
					echo "The file ". basename($value["name"]). " has been uploaded.";
				} else {
					echo "Sorry, there was an error uploading your file.";
				}
			}
		}
	}	
	
	
?>

<div class="container-fluid my-5">
	<div class="adminlabel">
		<h2 class="py-2 text-center">Admin's Dashboard</h2>
		<hr>
	</div>
  <div class="col-sm-12 col-md-8 mx-auto">
    <h2 class="py-2">Add Project</h2>
    <form id="form" name="fileinfo" method="POST" enctype="multipart/form-data">
        <div class="form-group">
            <label for="username">Title</label>
            <input type="text" class="form-control" name="title" placeholder="Enter project name" />
        </div>
        <div class="form-group">
            <label>Date</label>
            <input type="date" class="form-control" name="date" />
        </div>
		<div class="form-group">
            <label>Summary</label>
            <input type="text" class="form-control" name="summary" placeholder="Enter project summary" />
        </div>
		<div class="form-group">
            <label>Description</label>
            <input type="text" class="form-control" name="description" placeholder="Describe project" />
        </div>
		<div id="scrnsht" class="form-group">
			<p>
				<label>Screenshots</label>
				<span class="d-flex">
					<input type="file" class="file form-control my-auto" name="imgToUpload[]" />
					<a id="screenshot" class="addScnt mx-2 d-flex">
						<i class="fa fa-plus-circle my-auto" style="font-size:32px"></i>
					</a>
					<span class="image_preview" class="my-auto">
						<img src="assets/images/no-image.png" style="width: 50px; height: auto"  />
					</span>
				</span>
			</p>
		</div>
		<div id="lang" class="form-group">
			<p>
				<label>Languages</label>
				<span class="d-flex">
					<input type="text" class="lang form-control" name="languages[]" placeholder="Input language/s used in project" />
					<a id="language" class="addScnt ml-1 d-flex">
						<i class="fa fa-plus-circle my-auto" style="font-size:32px"></i>
					</a>
				</span>
			</p>
		</div>
		<div class="form-group">
            <label>Thumbnail</label>
			<span class="d-flex">
				<input type="file" name="thumbnail" class="thumbnail form-control" />
				<span class="image_preview ml-2" class="my-auto">
					<img src="assets/images/no-image.png" style="width: 50px; height: auto"  />
				</span>
			</span>
		</div>
		<div class="form-group">
            <label>Github</label>
            <input type="text" name="github" class="form-control" placeholder="Enter project's github repo" />
        </div>
        <div class="form-group">
            <button type="submit" id="submit" class="btn btn-primary">Add project</button>
            <img id="loading" style="display: none;" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
        </div>
    </form>
	<div id="message"></div>
  </div>
</div>