window.onload = function(){

  /*GitHubActivity.feed({
  	username: "desmond700",
  	repository: "https://github.com/desmond700/BookStore.git", // optional
  	selector: "#feed",
  	limit: 20 // optional
  });*/

  fetch("../Data/info.json").then(response => {
    response.json().then(json => {
      listprojects(json);
      if(getUrlParameter("title") !== "")
        projectinfo(json,getUrlParameter("title"));
    })
  })


  //alert(urlParams.get("title"))

  $('#exampleModal').on('show.bs.modal', function (event) {
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
  })

  function listprojects(json){
    $.each(json.info, (index, element)  => {
        var card_text = $('<p class="card-text"></p>').text(element.Summary);
        var card_title = $('<h4 class="card-title"></h4>').text(element.Title);
        var hr = $("<hr>");
        var card_body = $('<div class="card-body"></div>').append(card_title,hr,card_text);
        var img = $("<img class='' src='../images/Thumbnails/"+element.Thumbnail+"' height='200' />");
        var card = $('<div class="card"></div>').append(img,card_body);
        var childDiv = $('<a class="d-block card-link text-dark" href="view?title='+element.Title+'"></a>').append(card);
        var parentdiv = $('<div class="col-6 col-md-3 py-1 px-1 mx-0 itemAnchor"></div>').append(childDiv);

        $("#projects").append(parentdiv);
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
        var p = $("<p class='col-12 my-4 py-3 d-flex justify-content-between border-bottom'><b>Screenshots</b> <a href='"+element.Github+"' target='_blank'>View on Github<i class='fa fa-github'></i></a></p>");
        $("#info").append(date,language,desc);
        $("div#screenshots").prepend(p);
        element.Languages.forEach(element => {
          $(".language").append(element+"<br>");
        })
        element.Screenshots.forEach(element  => {
          var img = $("<img class='img-fluid' src='../images/Screenshots/"+element+"' width='200' />");
          var div = $("<div class='col-6 col-md-3'></div>").append(img);

          $("div#screenshots").append(div);
        })
      }

      //$("#projects").append(parentdiv);
    })
  }

  function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };
}
