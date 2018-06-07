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
        projectinfo(json);
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
      if(element.Title === "CarApp"){
        var card_text = $('<p class="card-text"></p>').text(element.Summary);
        var card_title = $('<h4 class="card-title"></h4>').text(element.Title);
        var hr = $("<hr>");
        var card_body = $('<div class="card-body"></div>').append(card_title,hr,card_text);
        var img = $("<img class='img-fluid' src='../images/Thumbnails/"+element.Thumbnail+"' />");
        var card = $('<div class="card"></div>').append(img,card_body);
        var parentdiv = $('<a class="col-6 col-md-3 py-2 px-2 card-link text-dark itemAnchor" href="view?title='+element.Title+'"></a>').append(card);

        $("#projects").append(parentdiv);
      }
    })
  }

  function projectinfo(json){
    $.each(json.info, (index, element)  => {
      if(element.Title === "CarApp"){
        var card_text = $('<p class="card-text"></p>').text(element.Description);
        var card_title = $('<h4 class="card-title"></h4>').text(element.Title);
        var hr = $("<hr>");
        var card_body = $('<div class="card-body"></div>').append(card_title,hr,card_text);
        var img = $("<img class='img-fluid' src='../images/Thumbnails/"+element.Thumbnail+"' />");
        var card = $('<div class="card"></div>').append(img,card_body);
        var parentdiv = $('<a class="col-6 col-md-3 py-3 card-link text-dark" href="view?title='+element.Title+'"><div class="col-6 col-md-3 py-3"></div></a>').append(card);

        $("#projects").append(parentdiv);
      }
    })
  }

  function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };
}
