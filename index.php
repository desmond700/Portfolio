<!Doctype html>
<html>
<head>
  <title>Home - Porfolio</title>
  <meta charset="utf-8">
  <meta name="description" content="Portfolio of my personal and School Projects ">
  <meta name="keywords" content="HTML,CSS,XML,JavaScript, Portfolio, Projects, School">
  <meta name="author" content="Desmond Wallace">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="css/main.css">
  <!-- Latest compiled and minified CSS -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">

  <!-- jQuery library -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

  <!-- Popper JS -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"></script>

  <!-- Latest compiled JavaScript -->
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>

</head>
<body>
  <div class="container-fluid px-0">
    <section class="landing-page">
      <div class="d-flex" id="overlay">
        <nav class="navbar fixed-top navbar-expand-lg navbar-dark">
          <a class="text-white card-link" href="#">Logo</a>
          <button class="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <hr>
            <ul class="navbar-nav">
              <li class="nav-item <?php echo $homelinkactive ?>">
                <a class="nav-link" href="./">Home <i class="fa fa-home" aria-hidden="true"></i> <span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item <?php echo $bookslinkactive ?>">
                <a class="nav-link" href="./books">Books <i class="fa fa-book"></i></a>
              </li>
              <li class="nav-item <?php echo $aboutlinkactive ?>">
                <a class="nav-link" href="./about">About <i class="fa fa-info-circle"></i></a>
              </li>
              <li class="nav-item <?php echo $contactlinkactive ?>">
                <a class="nav-link" href="./contact">Contact <i class="fa fa-phone-square" aria-hidden="true"></i></a>
              </li>
            </ul>
          </div>
        </nav>

        <div class="my-auto mx-auto d-flex justify-content-center col-md-6">
          <div class="text-white" style="width:100vh">
            <h2>Front end and Backend Web Developer</h2>
            <p>Coding is my passion.</p>
            <div class="text-center">
              <img class="rounded-circle" width="200" height="200" src="https://images.pexels.com/photos/462680/pexels-photo-462680.jpeg?cs=srgb&dl=beard-blur-casual-462680.jpg&fm=jpg" alt="">
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</body>
</html>
