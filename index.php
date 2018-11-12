<?php include($_SERVER["DOCUMENT_ROOT"]."/Portfolio/views/include/header.php") ?>

  <div class="content">
        <!--<div class="my-auto mx-auto d-flex justify-content-center col-md-12">
          <div class="mx-auto">
            <h2>Front end and Backend Web Developer</h2>
            <p>Coding is my passion.</p>
            <div class="text-center">
              <img class="rounded-circle" width="200" height="200" src="https://images.pexels.com/photos/462680/pexels-photo-462680.jpeg?cs=srgb&dl=beard-blur-casual-462680.jpg&fm=jpg" alt="">
            </div>
          </div>
        </div>-->


		<aside class="sidenav bg-dark">
			<div class="user-info">
				<img class="rounded-circle" src="assets/images/15027583_1430471596982184_305908304077287745_n.jpg" />
				<p id="name">Desmond Wallace</p>
				<p class="text-secondary">Web Developer, Mobile App Developer</p>
			</div>
			<nav id="projectnav" class="navbar px-0 py-0" style="display: none">
				<ul id="pills" class="">
				  <li id="about-pill">
					<a class="text-white nav-link smooth-scroll">About Me<span class="sr-only">(current)</span></a>
				  </li>
				  <li id="skills-pill">
					<a class="text-white nav-link smooth-scroll">Skills</a>
				  </li>
				  <li id="projects-pill">
					<a class="text-white nav-link smooth-scroll">Projects</a>
				  </li>
				  <li id="contact-pill">
					<a class="text-white nav-link smooth-scroll">Contact</a>
				  </li>
				</ul>
			</nav>
			<nav id="dashnav" class="navbar px-0 py-0" style="display: none">
				<ul>
				  <li id="add">
					<a class="text-white nav-link smooth-scroll">Add Project</a>
				  </li>
				  <li id="list">
					<a class="text-white nav-link smooth-scroll">List Project</a>
				  </li>
				  <li id="logout">
					<a class="text-white nav-link smooth-scroll">Logout</a>
				  </li>
				</ul>
			</nav>
			<p class="admin"><a class="adminlink">For administrative use only</a></p>

		</aside>

        <section id="page"></section>
    </div>

<?php include($_SERVER["DOCUMENT_ROOT"]."/Portfolio/views/include/footer.php") ?>
