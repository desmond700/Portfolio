window.onload = function(){

  /*GitHubActivity.feed({
  	username: "desmond700",
  	repository: "https://github.com/desmond700/BookStore.git", // optional
  	selector: "#feed",
  	limit: 20 // optional
  });*/


	// Initialize Firebase
  var config = {
  	apiKey: "AIzaSyAvfb6OZzyjENqucLPsGO0hDetbukDe68w",
  	authDomain: "my-portfolio-1eb18.firebaseapp.com",
  	databaseURL: "https://my-portfolio-1eb18.firebaseio.com",
  	projectId: "my-portfolio-1eb18",
  	storageBucket: "my-portfolio-1eb18.appspot.com",
  	messagingSenderId: "59972690158"
  };
  firebase.initializeApp(config);

  firebase.auth().onAuthStateChanged(function(user) {
		// [START_EXCLUDE silent]
		//document.getElementById('quickstart-verify-email').disabled = true;
		// [END_EXCLUDE]
		if (!user) {
		  // User is not signed in.
		  var url = window.location.href;
		  if(url.includes("dashboard")){
			  window.location.href = "/Portfolio/";
		  }
		  return
		}
	})

	var ApplicationRouter = Backbone.Router.extend({

		//map url routes to contained methods
		routes: {
			"": "about",
			"skills": "skills",
			"about": "about",
			"contact": "contact",
			"projects": "projects",
			"projects/view/:title": "view",
			"admin/login": "login",
			"admin/dashboard": "addRedirect",
			"admin/dashboard/add": "add",
			"admin/dashboard/list": "list",
			"admin/dashboard/list/edit/:title": "edit"
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
			switchSideNav();

			this.selectPill('li#skills-pill');
			$('#page').load( "views/home/skills.php" );
		},

		about: function() {
			//this.showPage('div#about-page');
			switchSideNav();

			this.selectPill('li#about-pill');
			$('#page').load( "views/home/about.php" );
		},

		contact: function() {
			//this.showPage('div#about-page');
			switchSideNav();

			this.selectPill('li#contact-pill');
			$('#page').load( "views/home/contact.php" );
		},

		login: function() {
			//this.showPage('div#about-page');
			switchSideNav();

			if (firebase.auth().currentUser) {
				// [START signout]
				firebase.auth().signOut();
				// [END signout]
			}

			this.selectPill('a.adminlink');
			$('#page').load( "views/admin/login/" );
		},

		dashboard: function() {
			//this.showPage('div#about-page');
			this.selectPill('a.adminlink');
			$('#page').load( "views/admin/dashboard/" );

			switchSideNav();
		},

		projects: function() {
			//this.showPage('div#projects-page');
			switchSideNav();

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
			switchSideNav();

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
			$('#page').load( "views/admin/dashboard/add.php", () => {

			});
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
		},

		edit: function(event) {
			//this.showPage('div#about-page');
			switchSideNav();

			this.selectPill('li#list');
			$('#page').load( "views/admin/dashboard/edit.php", () => {
				$('#title').html(event);
				fetch("model/data/info.json", {cache: "default"}).then(response => {
					response.json().then(json => {
            var id = $("input[name='id']");
            var title = $("input[name='title']");
            var date = $("input[name='date']");
            var summary = $("input[name='summary']");
            var description = $("textarea[name='description']");
            var screenshots = $("#scrnsht");
            var languages = $("#lang");
            var thumbnail = $("input[name='thumbnail']");
            var github = $("input[name='github']");

						json.info.forEach(element => {
							if(element.Title == event){
                id.val(element.id);
                title.val(element.Title);
                date.val(element.Date);
                summary.val(element.Summary);
                description.val(element.Description);
                thumbnail.parents().find('span.d-flex').find('img').attr('src', 'assets/images/Thumbnails/'+element.Thumbnail);
                github.val(element.Github);
                element.Screenshots.forEach( (value, index) => {
                  if(index == 0){
                    screenshots.children(':first-child').find('span.d-flex').find("span.image_preview").find('img').attr('src', 'assets/images/screenshots/'+value);
                  }else{
                    $('<p><span class="d-flex"><input type="file" class="file form-control mr-2" id="p_scnt" name="imgToUpload[]" value="" /><span class="image_preview" class="my-auto"><img src="assets/images/Screenshots/'+value+'" style="width: 50px; height: auto"  /></span></span></p>').appendTo(screenshots);
                  }
                });
                element.Languages.forEach( (value, index) => {
                  if(index == 0){
                    languages.children(':first-child').find('span.d-flex').find("input").val(value);
                  }else{
                    $('<p class="d-flex"><input type="text" class="form-control" id="p_scnt" name="languages[]" value="'+value+'" placeholder="Input language" /></p>').appendTo(languages);
                  }
                });
							}
						})
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
			'click a.adminlink': 'displayAdminLogin',
			'click nav#dashnav ul li#add a': 'displayAddProject',
			'click a#projectViewBackBtn': 'displayProjects',
			'click nav#dashnav ul li#update a': 'displayUpdateProject',
			'click button#login': 'login',
			'click nav#dashnav ul li#logout a': 'logout',
			'click a.addScnt': 'addInput',
			'click a.remScnt': 'removeInput',
			'click form #submit': 'getFormData',
      'click form #edit': 'editProject',
			'change form input.file, input.thumbnail': 'inputfilechange',
			'keyup form input': 'inputchange',
			'click nav#dashnav ul li#list a': 'displayList',
			'click button.edit': 'displayEdit',
			'click button.remove': 'removeProject'
		},

		//called on instantiation
		initialize: function(){
			//set dependency on ApplicationRouter
			this.router = new ApplicationRouter();

			//call to begin monitoring uri and route changes
			Backbone.history.start();
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
			var title = event.currentTarget.dataset.title;
			this.router.navigate("projects/view/"+title, true);
		},

		displayAdminLogin: function(){
			//update url and pass true to execute route method
			this.router.navigate("admin/login", true);
		},

		displayAddProject: function(){
			//update url and pass true to execute route method

			this.router.navigate("admin/dashboard/add", true);
		},

		displayUpdateProject: function(){
			//update url and pass true to execute route method
			this.router.navigate("admin/dashboard/update-project", true);
		},

		addInput: function(e){
			//update url and pass true to execute route method
			var scrnshtDiv = $('#scrnsht');
			var langDiv = $('#lang');
			var i = $('#scrnsht p').length + 1;
			var j = $('#lang p').length + 1;
			var result = $(e.currentTarget).attr('id');;

			if(result === 'screenshot'){
				$('<p><span class="d-flex"><input type="file" class="file form-control" id="p_scnt" name="imgToUpload[]" value="" /> <a id="screenshot" class="remScnt mx-2 d-flex"><i class="fa fa-times-circle text-danger my-auto" style="font-size:32px"></i></a><span class="image_preview" class="my-auto"><img src="assets/images/no-image.png" style="width: 50px; height: auto"  /></span></span></p>').appendTo(scrnshtDiv);
				i++;
			}else if(result === 'language'){
				$('<p class="d-flex"><input type="text" class="form-control" id="p_scnt" name="languages[]" value="" placeholder="Input language" /> <a id="language" class="remScnt ml-1 d-flex"><i class="fa fa-times-circle text-danger my-auto" style="font-size:32px"></i></a></p>').appendTo(langDiv);
				j++;
			}

			return false;
		},

		removeInput: function(e){
			//update url and pass true to execute route method
			var scrnshtDiv = $('#scrnsht');
			var langDiv = $('#lang');
			var i = $('#scrnsht p').length + 1;
			var j = $('#lang p').length + 1;
			var result = $(e.currentTarget).attr('id');;
			var response = confirm("Are you sure you want to remove this item?");

			if(response){
				if(result === 'screenshot'){

					if( i > 2 ) {
						$(e.currentTarget).parents('p').remove();
						i--;
					}

				}else if(result === 'language'){

					if( j > 2 ) {
						$(e.currentTarget).parents('p').remove();
						j--;
					}
				}
			}


			return false;

		},

		inputfilechange: function(e){

			$("#message").empty(); // To remove the previous error message
			var targetClass = $(e.currentTarget).attr('class');
			var className = targetClass.substring(0,targetClass.indexOf(" "));
			var targetEle = $(e.currentTarget).parents('span').children(':last-child');
			var file = e.target.files[0];
			var imagefile = file.type;
			var match = ["image/jpeg","image/png","image/jpg"];
			if(!((imagefile==match[0]) || (imagefile==match[1]) || (imagefile==match[2]))){
				targetEle.find('img').attr('src','images/Screenshots/noimage.png');
				$("#message").html("<p id='error'>Please Select A valid Image File</p>"+"<h4>Note</h4>"+"<span id='error_message'>Only jpeg, jpg and png Images type allowed</span>");
				return false;
			}else{
				var reader = new FileReader();
				reader.onload = imageIsLoaded;
				reader.readAsDataURL(e.target.files[0]);
				$(e.currentTarget).removeClass( "border border-danger" );
			}

			function imageIsLoaded(e) {

				$("form ."+className).css("color","green");
				targetEle.css("display", "block");
				targetEle.find('img').attr('src', e.target.result);
				targetEle.attr('width', '250px');
				targetEle.attr('height', '230px');
			};

		},

		inputchange: function(e){

			var targetEle = $(e.currentTarget);

			if(targetEle.val()){
				targetEle.removeClass( "border border-danger" );
			}else{
				targetEle.addClass( "border border-danger" );
			}

		},

    editProject: function(e){

      var yesOrNo = confirm("Are you sure you want to add this project");
      e.preventDefault();

      if(yesOrNo){

        var formItem = document.forms.namedItem("fileinfo");

        $('#loading').show();
        $.ajax({
          url: "views/admin/dashboard/edit.php", // Url to which the request is send
          type: "POST",                   // Type of request to be send, called as method
          data: new FormData(formItem),   // Data sent to server, a set of key/value pairs (i.e. form fields and values)
          contentType: false,             // The content type used when sending data to the server.
          cache: false,             		// To unable request pages to be cached
          processData:false,        		// To send DOMDocument or non processed data file it is set to false
          success: function(data){  		// A function to be called if request succeeds
            $('#loading').hide();
            $("#message").html("Submitted successfully.");
          }
        });
      }

		},

		getFormData: function(e){
			//update url and pass true to execute route method
      var yesOrNo = confirm("Are you sure you want to add this project");
      e.preventDefault();

      if(yesOrNo){

  			var formItem = document.forms.namedItem("fileinfo");
  			var isValid = true;

  			$("fieldset[form='addForm']").find("input").each(function(index){

  				if($(this).val() == ""){
  					isValid = false;
  					$(this).addClass( "border border-danger" );
  				}else{
  					$(this).removeClass( "border border-danger" );
  				}
  					console.log($( this ).val());

  			})

  			$("#message").empty();
  			if(isValid){
  				$('#loading').show();
  				$.ajax({
  					url: "views/admin/dashboard/add.php", // Url to which the request is send
  					type: "POST",                   // Type of request to be send, called as method
  					data: new FormData(formItem),   // Data sent to server, a set of key/value pairs (i.e. form fields and values)
  					contentType: false,             // The content type used when sending data to the server.
  					cache: false,             		// To unable request pages to be cached
  					processData:false,        		// To send DOMDocument or non processed data file it is set to false
  					success: function(data){  		// A function to be called if request succeeds
  						$('#loading').hide();
  						$("#message").html("Submitted successfully.");
  					}
  				});
  			}
			}
		},

		displayList: function(){
			this.router.navigate("admin/dashboard/list", true);
		},

		displayEdit: function(e){

			var title = e.currentTarget.dataset.title;
			this.router.navigate("admin/dashboard/list/edit/"+title, true);
		},

		removeProject: function(e){

		},

		login: function(e){

			$("#adminLoginLoading").show();
			var email = document.getElementById('email').value;
			var password = document.getElementById('password').value;
			if (email.length < 4) {
			  alert('Please enter an email address.');
			  return;
			}
			if (password.length < 6) {
			  alert('Please enter a password.');
			  return;
			}
			// Sign in with email and pass.
			// [START authwithemail]
			firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
			   // user signed in
			   $("#adminLoginLoading").hide();
			   window.location.href = "#admin/dashboard";

			}).catch(function(error) {
			  // Handle Errors here.
			  $("#adminLoginLoading").hide();
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  // [START_EXCLUDE]
			  if (errorCode === 'auth/wrong-password') {
				      alert('Wrong password.');
			  } else {
				      alert(errorMessage);
			  }
			  console.log(error);
			  //document.getElementById('quickstart-sign-in').disabled = false;
			  // [END_EXCLUDE]
			});
			// [END authwithemail]

		},

		logout: function(e){

			var response = confirm("Are you sure you want to logout?");

			if(response){
				firebase.auth().signOut().then(function() {
					// Sign-out successful.

					window.location.href = "/Portfolio/";

				}, function(error) {
					// An error happened.
					console.log(error);

				});
			}

		}

	});

	//load application
	new ApplicationView();




	function switchSideNav(){
		var url = window.location.href;
		if(url.includes("dashboard")){
			$('nav#projectnav').hide(function(){
				$('nav#dashnav').show();
			});
		}else{
			$('nav#dashnav').hide(function(){
				$('nav#projectnav').show();
			});
		}


	}

  //alert(urlParams.get("title"))



  /*$('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var recipient = button.data('whatever') // Extract info from data-* attributes
    var modal = $(this)
    $('#screenshots').empty();
    modal.find('.github a').empty();
    fetch("Data/info.json").then(response => {
      response.json().then(json => {

        modal.find('.modal-title').text(json.info[0].Title);
        modal.find('span#appdate').text(json.info[0].Date);
        modal.find('span#desc').text(json.info[0].Description);

        if(true){
          var i = $("<i class='fa fa-github'></i>");
          var a = $("<a class='ml-auto my-auto text-dark' href='"+json.info[0].Github+"' target='_blank'>View on Github</a>").append(i);
          modal.find('.github').append(a);
        }

        $.each(json.info[0].Screenshots, (index, element) => {
          var img = $("<img />").attr("src","images/Screenshots/CarApp/"+element)
                                .height("200");
          var card = $("<div class='card'></div>").append(img);
          var parentDiv = $("<div class='col-sm-6 col-md-4'></div>").append(card);

          modal.find('div#screenshots').append(parentDiv)
          //modal.find('.modal-body input').val(recipient)
        })
      })
    })
  })*/



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
        $(".name").html(element.Title);
        $('<h2 class="card-title px-0">Project - <b>'+element.Title+'</b></h2>').appendTo(".title");
        var desc = $('<p class="card-text"><b>Description:</b><br> '+element.Description+'</p>');
        var date = $("<p><b>Date:</b> "+element.Date+"</p>")
        var language = $("<div class='d-flex'><p><b>Language/s:&nbsp;</b></p><div class='language'></div></div>");
        var website = element.Website != null ? '<span class="pr-1"><a href="views/sites'+element.Website+'">view website</a></span>' : '';
        var gitHub = element.Github != null ? "<a href='"+element.Github+"' class='ml-1' target='_blank'>View on Github<i class='fa fa-github ml-1'></i></a>" : "";
        var p = $("<p class='col-12 my-4 py-3 d-flex justify-content-between border-bottom'><b>Screenshots</b> <span class='pj-links'>"+website+""+gitHub+"</span></p>");
        $("#info").append(date,language,desc);
        $("div#screenshots").prepend(p);
        element.Languages.forEach(element => {
          $(".language").append(element+"<br>");
        })
        element.Screenshots.forEach(element => {
          var img = $("<img class='img-fluid' src='assets/images/Screenshots/"+element+"' width='200' />");
          var div = $("<div class='col-6 col-md-3'></div>").append(img);

          $('div#screenshots').append(div);
        })
      }

      //$("#projects").append(parentdiv);
    })
  }
}
