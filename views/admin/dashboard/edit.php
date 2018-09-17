<div class="container my-5">
  <div class="adminlabel">
		<h2 class="py-2 text-center">Admin's Dashboard</h2>
		<hr>
  </div>
  <div class="col-md-6 col-md-offset-2 mx-auto">
    <h2 class="py-2">Edit Project: <span id="title"></span></h2>
    <form id="form" name="fileinfo" method="POST" enctype="multipart/form-data">
        <div class="form-group">
            <label for="username">Title</label>
            <input type="text" class="form-control" name="title" data-validation="title" data-validation-error-msg="You did not enter a valid e-mail" />
        </div>
        <div class="form-group">
            <label>Date</label>
            <input type="text" class="form-control" name="date" data-validation="date" data-validation-error-msg="You did not enter a valid e-mail" />
        </div>
		<div class="form-group">
            <label>Summary</label>
            <input type="text" class="form-control" name="summary" data-validation="summary" data-validation-error-msg="You did not enter a valid e-mail" />
        </div>
		<div class="form-group">
            <label>Description</label>
            <input type="text" class="form-control" name="description" data-validation="description" data-validation-error-msg="You did not enter a valid e-mail" />
        </div>
		<div id="scrnsht" class="form-group">
			<p>
				<label>Screenshots</label>
				<span class="d-flex">
					<input type="file" class="file form-control my-auto" name="imgToUpload[]" data-validation="screenshots" data-validation-error-msg="You did not enter a valid e-mail" />
					<a id="screenshot" class="addScnt mx-2 d-flex">
						<i class="fa fa-plus-circle my-auto" style="font-size:32px"></i>
					</a>
					<span class="image_preview" class="my-auto">
						<img src="images/no-image.png" style="width: 50px; height: auto"  />
					</span>
				</span>
			</p>
		</div>
		<div id="lang" class="form-group">
			<p>
				<label>Languages</label>
				<span class="d-flex">
					<input type="text" class="lang form-control" name="languages[]" placeholder="Input language" data-validation="languages" data-validation-error-msg="You did not enter a valid e-mail" />
					<a id="language" class="addScnt ml-1 d-flex">
						<i class="fa fa-plus-circle my-auto" style="font-size:32px"></i>
					</a>
				</span>
			</p>
		</div>
		<div class="form-group">
            <label>Thumbnail</label>
            <input type="text" name="thumbnail" class="form-control" data-validation="thumbnail" data-validation-error-msg="You did not enter a valid e-mail" />
        </div>
		<div class="form-group">
            <label>Github</label>
            <input type="text" name="github" class="form-control" data-validation="github" data-validation-error-msg="You did not enter a valid e-mail" />
        </div>
        <div class="form-group">
            <button type="submit" id="submit" class="btn btn-primary">Add</button>
            <img id="loading" style="display: none;" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
        </div>
    </form>
	<div id="message"></div>
  </div>
</div>