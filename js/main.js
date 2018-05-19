window.onload = function(){

  /*GitHubActivity.feed({
  	username: "desmond700",
  	repository: "https://github.com/desmond700/BookStore.git", // optional
  	selector: "#feed",
  	limit: 20 // optional
  });*/

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

  $('a.smooth-scroll[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
}
