<?php include($_SERVER["DOCUMENT_ROOT"]."/Portfolio/views/include/header.php") ?>
<div class="container-fluid">
  <div class="breadcrumb bg-white pl-0">
    <a id="projectViewBackBtn">Back to projects</a>
  </div>
  <div class="col-md-12 px-0">
    <div class="title"></div>
    <hr>
  </div>
  <div class="row">
    <div class="col-md-12 py-2 my-2" id="info">

    </div>
    <div class="col-md-12">
      <div class="containerifluid">
        <div class="row" id="screenshots"></div>
      </div>
    </div>
  </div>
  <div id="myModal" class="modal">
    <span class="close cursor">close <span class="font-weight-bold">&times;</span></span>
    <div id="modalBody" class="modal-content">
      <a class="prev" data-plusSlides=-1>&#10094;</a>
      <a class="next" data-plusSlides=1>&#10095;</a>
      <!-- Caption text -->
      <!--<div class="caption-container">
        <p id="caption"></p>
      </div>-->

    </div>
  </div>
</div>
<?php include($_SERVER["DOCUMENT_ROOT"]."/Portfolio/views/include/footer.php") ?>
