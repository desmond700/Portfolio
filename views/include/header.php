<!Doctype html>
<html>
<head>
  <title>Home - Porfolio</title>
  <meta charset="utf-8">
  <meta name="description" content="Portfolio of my personal and School Projects ">
  <meta name="keywords" content="HTML,CSS,XML,JavaScript, Portfolio, Projects, School">
  <meta name="author" content="Desmond Wallace">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="assets/css/main.css">
  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/octicons/2.0.2/octicons.min.css">
  <!--<link rel="stylesheet" href="github-activity-0.1.5.min.css">-->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">
  <!--<script src="github-activity-0.1.5.min.js"></script>-->

  <!-- Latest compiled and minified CSS -->

</head>
<body>
  <!--<div class="icon-bar">
    <a href="https://github.com/desmond700" class="github" target="_blank"><i class="fa fa-github"></i> <span>github</span></a>
    <a href="#" class="facebook" target="_blank"><i class="fa fa-facebook"></i> <span>facebook</span></a>
    <a href="#" class="twitter" target="_blank"><i class="fa fa-twitter"></i> <span>twitter</span></a>
    <a href="#" class="googleplus" target="_blank"><i class="fa fa-google-plus"></i> <span>google+</span></a>
    <a href="#" class="instagram" target="_blank"><i class="fa fa-instagram"></i> <span>instagram</span></a>
  </div>-->

  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header bg-secondary">
          <h5 class="modal-title" id="exampleModalCenterTitle">Modal title</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="col-md-12">
            <h5>Date: <span id="appdate"></span></h5>
            <p><h4>Description</h4><span id="desc"></span></p>
            <div class="container-fluid px-0">
              <div class="d-flex col-12 github bg-light py-3 px-0"><h4 class="my-auto text-dark">Screenshots</h4></div>
              <div class="row" id="screenshots">

              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>

  <div class="container-fluid px-0">
