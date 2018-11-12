<?php
  // Get path of project directory
	$base_path = $_SERVER["DOCUMENT_ROOT"];

  include($base_path . "Portfolio/views/include/utilities.php");
  // Check if post contains project id
  if(isset($_POST['id'])){
    // read file
    $data = file_get_contents($base_path . "Portfolio/model/data/info_new.json");
    // decode json to array
    $json_arr = json_decode($data, true);
    // Loop through json file to apply changes
    foreach ($json_arr['info'] as $key => $value) {
       // Find project in json file that matches the id of the project to edit
       if ($value['id'] == $_POST['id']) {

         $target_dir = $base_path . 'assets/images/Thumbnails/';
         // Assign changes to their respective fields
         if(isset($_POST['title'])) $json_arr['info'][$key]['Title'] = $_POST['title'];
         if(isset($_POST['date'])) $json_arr['info'][$key]['Date'] = $_POST['date'];
         if(isset($_POST['summary'])) $json_arr['info'][$key]['Summary'] = $_POST['summary'];
         if(isset($_POST['description'])) $json_arr['info'][$key]['Description'] = $_POST['description'];
         if(isset($_POST['github'])) $json_arr['info'][$key]['Github'] = $_POST['github'];
         if(isset($_FILES['Thumbnail'])) {

           unlink($base_path . 'assets/images/Thumbnails/' . $json_arr['info'][$key]['Thumbnail']);

           if (move_uploaded_file($_FILES['Thumbnail']["tmp_name"], $target_dir)) {
              echo "The file " . basename($value["name"]) . " has been uploaded.";
            } else {
              echo "Sorry, there was an error uploading your file.";
            }

            $json_arr['info'][$key]['Thumbnail'] = $_FILES['Thumbnail']['name'];

         }
         if(isset($_FILES['imgToUpload'])){
         // Reorganise array to easily access info
   		   $files = reArrayFiles($_FILES['imgToUpload']);
         // Loop through image array
         foreach ($files as $scrnshkey => $value) {
           // Check if image name is set
           if($value['name'] != null && $value['name'] != ""){
               $screenshotFilename = $json_arr['info'][$key]['Screenshots'][$scrnshkey];
               $screenshotDir = $base_path . 'assets/images/Screenshots/';
               $target_file = $screenshotDir . $screenshotFilename;
               $target_dir = $screenshotDir . substr($screenshotFilename, 0, stripos($screenshotFilename, '/'));
               unlink($target_file);

               if (move_uploaded_file($value["tmp_name"], $target_dir)) {
         					echo "The file " . basename($value["name"]) . " has been uploaded.";
         				} else {
         					echo "Sorry, there was an error uploading your file.";
         				}
                // Assign changes to screenshot array
                $json_arr['info'][$key]['Screenshots'][$scrnshkey] = $value['name'];
             }
           }
         }
         // check if request array contains languages
         if(isset($_REQUEST['languages'])){
           // Loop through language array
           foreach ($_REQUEST['languages'] as $langkey => $value) {
             // assign changes to the language array
             $json_arr['info'][$key]['Languages'][$langkey] = $value;
           }
         }
       } // end id check if statement
    } // end foreach loop

    // encode array to json and save to file
    file_put_contents($base_path . "Portfolio/model/data/info_new.json", json_encode($json_arr, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
  }

?>

<div class="container my-5">
  <div class="adminlabel">
		<h2 class="py-2 text-center">Admin's Dashboard</h2>
		<hr>
  </div>
  <div class="col-sm-12 col-md-12 mx-auto">

    <fieldset form="editForm" class="border px-4 py-3" name="fileinfo" method="POST" enctype="multipart/form-data">
      <legend style="width:auto"><h3 class="py-2 px-2" >Edit Project: <span id="title" class="text-secondary"></span></h3></legend>
        <input type="hidden" name="id" />
        <div class="form-group">
            <label for="username">Title</label>
            <input type="text" class="form-control" name="title" />
        </div>
        <div class="form-group">
            <label>Date</label>
            <input type="date" class="form-control" name="date" />
        </div>
		    <div class="form-group">
            <label>Summary</label>
            <input type="text" class="form-control" name="summary" />
        </div>
        <div class="form-group">
            <label>Github</label>
            <input type="text" name="github" class="form-control" />
        </div>
        <div id="lang" class="form-group">
    			<p>
    				<label>Languages</label>
    				<span class="d-flex">
    					<input type="text" class="lang form-control" name="languages[]" />
    					<a id="language" class="addScnt ml-1 d-flex">
    						<i class="fa fa-plus-circle my-auto" style="font-size:32px"></i>
    					</a>
    				</span>
    			</p>
    		</div>
        <div class="form-group">
            <label>Description</label>
            <textarea class="form-control" name="description" rows="5"></textarea>
        </div>
        <div class="form-group">
            <label>Thumbnail</label>
            <span class="d-flex">
      				<input type="file" name="thumbnail" class="thumbnail form-control" />
      				<span class="image_preview ml-2" class="my-auto">
      					<img src="" style="width: 50px; height: auto"  />
      				</span>
      			</span>
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
    						<img src="" style="width: 50px; height: auto"  />
    					</span>
    				</span>
    			</p>
    		</div>
        <div class="form-group pt-3">
            <button type="submit" id="edit" class="btn btn-primary">Edit project</button>
            <img id="loading" style="display: none;" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
        </div>
    </fieldset>
	<div id="message"></div>
  </div>
</div>
