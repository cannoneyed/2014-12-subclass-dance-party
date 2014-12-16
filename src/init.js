$(document).ready(function(){
  window.dancers = [];

  for(var key in heads){
    var $link = $("<a href='#'></a>");
    $link.addClass('chooseDancer');
    $link.data('dancer-maker-function-name', "SpecialDancer");
    $link.data('name', key);
    var $profilePic = $('<div></div>');
    $profilePic.addClass('dancerProfile');
    $profilePic.css('background-image', 'url("' + heads[key] + '")');
    var $dancerName = $('<div></div>');
    $dancerName.addClass('dancerName');
    $dancerName.text(key)
    $dancerName.appendTo($profilePic);
    $profilePic.appendTo($link);
    $link.appendTo($('.dancerMenu'));

  }

  $(".addDancerButton").on("click", function(event){
    /* This function sets up the click handlers for the create-dancer
     * buttons on index.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data("dancer-maker-function-name");

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position

    var dancer = new dancerMakerFunction(
      $("body").height() * Math.random(),
      $("body").width() * Math.random(),
      500
    );
    $('body').append(dancer.$node);
  });


  $('.chooseDancer').on('click', function(){
    var dancerMakerFunctionName = $(this).data("dancer-maker-function-name");
    var name = $(this).data('name');
    console.log(name);

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];
    var dancer = new dancerMakerFunction(
      $("body").height() * Math.random(),
      $("body").width() * Math.random(),
      500
    );
    $('body').append(dancer.$node);
    // dancer.$node.find('.head').css('background-image', '\name);
  })

});

var heads = {
  yellow: "img/heads/smiley.png",
  red: "img/heads/smiley_red.png",
  blue: "img/heads/smiley_blue.png"
};




