window.onload = function(){

	var ApplicationRouter = Backbone.Router.extend({

		//map url routes to contained methods
		routes: {
			"": "about",
			"skills": "skills",
			"about": "about",
			"contact": "contact",
			"projects": "projects",
			"projects/view/:title": "view"
		},

		deselectPills: function(){
			//deselect all navigation pills
			$('ul#pills li, a.adminlink').removeClass('activelink');
			$('nav#dashnav ul li, a.adminlink').removeClass('activelink');
		},

		selectPill: function(pill){
			//deselect all navigation pills
			this.deselectPills();
			//select passed navigation pill by selector
			$(pill).addClass('activelink');
		},

		skills: function() {
			//this.showPage('div#skills-page');

			this.selectPill('li#skills-pill');
			$('#page').load( "views/home/skills.php" );
		},

		about: function() {
			//this.showPage('div#about-page');

			this.selectPill('li#about-pill');
			$('#page').load( "views/home/about.php" );
		},

		contact: function() {
			//this.showPage('div#about-page');

			this.selectPill('li#contact-pill');
			$('#page').load( "views/home/contact.php" );
		},

		projects: function() {
			//this.showPage('div#projects-page');

			$('#page').load( "views/projects/", () => {

				fetch("model/data/info.json", {cache: "default"}).then(response => {
					response.json().then(json => {
					  listprojects(json);
					  jsonObj = json;
					})
				})
			});

			this.selectPill('li#projects-pill');

		},

		view: function(data) {
			//this.showPage('div#projects-page');
			$('nav#projectnav').show();

			this.selectPill('li#projects-pill');


			$('#page').load( "views/projects/view", () => {

				fetch("model/data/info.json", {cache: "default"}).then(response => {
					response.json().then(json => {
						projectinfo(json, data);
					})
				})

			});
		},

		add: function() {
			//this.showPage('div#about-page');
			switchSideNav();
			this.selectPill('li#add');
			$('#page').load( "views/admin/dashboard/add.php", () => {});
		},

		addRedirect: function() {
			//this.showPage('div#about-page');
			window.location.href = "#admin/dashboard/add/";
			this.add();
		},

		list: function() {
			//this.showPage('div#about-page');
			switchSideNav();

			this.selectPill('li#list');
			$('#page').load( "views/admin/dashboard/list.php", () => {

				fetch("model/data/info.json", {cache: "default"}).then(response => {
					response.json().then(json => {
					  listprojects_admin(json);
					})
				})

			});
		}
	});


	var ApplicationView = Backbone.View.extend({

		//bind view to body element (all views should be bound to DOM elements)
		el: $('body'),

		//observe navigation click events and map to contained methods
		events: {
			'click ul#pills li#skills-pill a': 'displaySkills',
			'click ul#pills li#about-pill a': 'displayAbout',
			'click ul#pills li#projects-pill a': 'displayProjects',
			'click ul#pills li#contact-pill a': 'displayContact',
			'click a.pview': 'displayProjectView',
			'click a#projectViewBackBtn': 'displayProjects',
		    'click img.scrnsht': 'openModal',
		    'click span.close': 'closeModal',
		    //'click #myModal': 'closeModal',
		    'click a.next': 'plusSlides',
		    'click a.prev': 'plusSlides'
			//'click button#showPrototype': 'displayPrototype'
		},

		//called on instantiation
		initialize: function(){
			//set dependency on ApplicationRouter
			this.router = new ApplicationRouter();
      this.slideIndex = 1;
			this.isShowProto = true;
			//call to begin monitoring uri and route changes
			Backbone.history.start();
      this.showSlides(this.slideIndex);
			this.displayPrototype();
		},

		displaySkills: function(){
			//update url and pass true to execute route method
			this.router.navigate("skills", true);
		},

		displayAbout: function(){
			//update url and pass true to execute route method
			this.router.navigate("about", true);
		},

		displayContact: function(){
			//update url and pass true to execute route method
			this.router.navigate("contact", true);
		},

		displayProjects: function(){
			//update url and pass true to execute route method
			this.router.navigate("projects", true);
		},

		displayProjectView: function(event){
			//update url and pass true to execute route method
			//alert(this.collection);
			let title = event.currentTarget.dataset.title;
			this.router.navigate("projects/view/"+title, true);
		},

		displayPrototype: function(){
			console.log(this.isShowProto);
			if(this.isShowProto){
				$("#showPrototype").html("Hide info");
				$("#prototypeInfo").show("slow");
				this.isShowProto = false;
			}
			else{
				$("#showPrototype").html("Show info");
				$("#prototypeInfo").hide("slow");
				this.isShowProto = true;
			}
		},

    openModal: function(event) {
      event.preventDefault();
      let image_index = event.currentTarget.dataset.imageposition;
      let scrollBarWidth = window.innerWidth - document.body.offsetWidth;
      $('body').css('margin-right', scrollBarWidth).addClass('showing-modal');
      console.log(image_index);
      document.getElementById('myModal').style.display = "block";
      this.slideIndex;
      this.currentSlide(image_index);
    },

    closeModal: function() {
      $('body')
      .css('margin-right', '')
      .removeClass('showing-modal');
      document.getElementById('myModal').style.display = "none";
    },

    plusSlides: function(event) {
      let index = parseInt(event.currentTarget.dataset.plusslides);
      this.slideIndex = parseInt(this.slideIndex) + index
      console.log("plusSlides:" + index);
      this.showSlides(this.slideIndex);
    },

    currentSlide: function(n) {
      this.slideIndex = n;
      this.showSlides(this.slideIndex);
    },

    showSlides: function(n) {
      console.log("slideIndex: " + this.slideIndex);
      console.log("numIndex: " + n);
      let i;
      let slides = document.getElementById('modalBody').getElementsByClassName("mySlides");
      console.log("slides");
      console.log(slides);
      console.log("slidesLength");
      console.log(slides.length);
      //var dots = document.getElementsByClassName("demo");
      let captionText = document.getElementById("caption");
      if (n > slides.length) {this.slideIndex = 1}
      if (n < 1) {this.slideIndex = slides.length}
      for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
          console.log("slides i: "+i);
      }
      /*for (i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(" active", "");
      }*/
      slides[this.slideIndex-1].style.display = "block";
      //dots[slideIndex-1].className += " active";
      //captionText.innerHTML = dots[slideIndex-1].alt;
    }

	});

	//load application
	new ApplicationView();


  function listprojects_admin(json){
    json.info.reverse().forEach( (element) => {
		var date = $('<p class="card-text"><small class="text-muted">'+element.Date+'</small></p>');
    var Summary = $('<p class="card-text"></p>').text(element.Summary);
    var title = $('<h4 class="card-title"></h4>').text(element.Title);
    var img = $("<img class='img-fluid' src='assets/images/Thumbnails/"+element.Thumbnail+"' />");
    var imgAnchor = $('<a data-title="'+element.Title+'" class="pview d-block card-link text-dark"></a>').append(img);
		var editBtn = $('<button type="button" data-title="'+element.Title+'" class="edit btn btn-warning text-white mr-2">Edit</button>');
		var deleBtn = $('<button type="button" data-title="'+element.Title+'" class="remove btn btn-danger">Delete</button>');
		var actiondiv = $('<div class="col-md-3"></div>').append(editBtn, deleBtn);
		var descdiv = $('<div class="col-md-3"></div>').append(Summary);
    var infodiv = $('<div class="col-md-3"></div>').append(title, date);
		var imgdiv = $('<div class="col-md-3"></div>').append(imgAnchor);
		var rowdiv = $('<div class="row"></div>').append(imgdiv, infodiv, descdiv, actiondiv);
		var parentdiv = $('<div class="container-fluid py-3 px-1 mb-3"></div>').append(rowdiv);

        $('div#projects').append(parentdiv);
    })
  }



  function listprojects(json){
    json.info.reverse().forEach( (element) => {
  		var card_date = $('<p class="card-text"><small class="text-muted">'+element.Date+'</small></p>');
      var card_text = $('<p class="card-text"></p>').text(element.Summary);
      var card_title = $('<h4 class="card-title"></h4>').text(element.Title);
      var hr = $("<hr>");
      var card_body = $('<div class="card-body"></div>').append(card_title,hr,card_text,card_date);
      var img = $("<img class='img-fluid' src='assets/images/Thumbnails/"+element.Thumbnail+"' />");
      var a = $('<a data-title="'+element.Title+'" class="pview d-block card-link text-dark"></a>').append(img,card_body);
      var card = $('<div class="card"></div>').append(a);
      var parentdiv = $('<div class="col-6 col-sm-4 col-md-3 col-lg-2 py-1 px-1 mb-3 itemAnchor"></div>').append(card);

      $('div#projects').append(parentdiv);
    })
  }

  function projectinfo(json, titleVar){
    $.each(json.info, (index, element)  => {
      if(titleVar === element.Title){
        let scrnshtCount = 0;
				let protoImgCount = 0;
        $(".name").html(element.Title);
        $('<h2 class="card-title px-0">Project - <b>'+element.Title+'</b></h2>').appendTo(".title");
        let desc = $('<p class="card-text"><b>Description:</b><br> '+element.Description+'</p>');
        let date = $("<p><b>Date:</b> "+element.Date+"</p>");
				let module_name = $("<p><b>Module:</b> "+element.Module+"</p>");
				let module_length = $("<p><b>Module length:</b> "+element.Module_length+"</p>");
				let prototype = $(`<p><b class="mr-2">Prototype:</b> <button id="showPrototype" class='btn bg-secondary text-white py-1 px-1'>Show info</button></p>
					<div id="prototypeInfo" class="container-fluid border bg-light" style="display: none">
							<p class="text-danger font-weight-bold">Prototype may differ to some extent from the final project.</p>
							<p><b>PowerPoint:</b></p>
							<p><b>Images(<span id="protoImgCnt"></span>)</b></p>
							<div id="prototypeImg" class="row"></div>
					</div>
				`);

				let language = $("<div class='d-flex'><p><b>Languages/Technologies:&nbsp;</b></p><div class='language'></div></div>");
        let website = element.Website != null ? '<span class="pr-1"><a href="views/sites'+element.Website+'">View website</a></span>' : '';
        let gitHub = element.Github != null ? "<a href='"+element.Github+"' class='ml-1' target='_blank'>View on Github<i class='fa fa-github ml-1'></i></a>" : "";
        let p = $("<p class='col-12 my-4 py-3 d-flex justify-content-between border-bottom'><b>Screenshots(<span id='scrnshtCnt'></span>)</b> <span class='pj-links'>"+website+""+gitHub+"</span></p>");
        $("#info").append(date,module_name,module_length,prototype,language,desc);
        $("div#screenshots").prepend(p);
        element.LanguagesAndTechnologies.map(element => {
          $(".language").append(element+"<br>");
        });
				element.Prototype.Images.map(element => {
					let prototypeimg = $("<img class='scrnsht img-fluid hover-shadow cursor' data-imagePosition='"+(index+1)+"' src='assets/images/Prototype/"+element+"' width='200' />");
          let prototypediv = $("<div class='column col-6 col-md-3 mb-4'></div>").append(prototypeimg);
          protoImgCount++;
          $('div#prototypeImg').append(prototypediv);
				});
        element.Screenshots.map((element, index) => {
          let scrnshtimg = $("<img class='scrnsht img-fluid hover-shadow cursor' data-imagePosition='"+(index+1)+"' src='assets/images/Screenshots/"+element+"' width='200' />");
          let scrnshtdiv = $("<div class='column col-6 col-md-3 mb-4'></div>").append(scrnshtimg);
          scrnshtCount++;
          $('div#screenshots').append(scrnshtdiv);
          //
          let scrnshtImgModal = $("<img class='img-fluid' src='assets/images/Screenshots/"+element+"' />");
          let scrnshtDivModal = $("<div class='mySlides'></div>").append(scrnshtImgModal);
          $('.modal-content').append(scrnshtDivModal);
          //
          /*var scrnshtImgDot = $("<img class='scrnsht demo' src='assets/images/Screenshots/"+element+"' />");
          var scrnshtDivDot = $("<div class='column'></div>").append(scrnshtImgDot);
          console.log("index: "+index);
          $('.caption-container').after(scrnshtDivDot);*/
        });
				$("p").find('#protoImgCnt').html(protoImgCount);
        $("p").find('#scrnshtCnt').html(scrnshtCount);
      }

      //$("#projects").append(parentdiv);
    })
  }
}
