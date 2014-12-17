$(document).ready(function(){
  window.dancers = [];
  var midPoint = $('body').height() * .4

  var danceOff = false;

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
      midPoint * Math.random() + midPoint,
      $("body").width() * Math.random(),
      500
    );
    $('body').append(dancer.$node);
    dancer.$node.find('.head').css('background-image', 'url("' + heads[name] + '")');

    dancer.$node.on('click', function() {
      if (danceOff) {
        var homeX = dancer.left;
        var homeY = dancer.top;
        var topX = $('body').width() * .45;
        var topY = $('body').height() * .4;
        var bottomX = $('body').width() * .45;;
        var bottomY = $('body').height() * .8;;
        dancer.setPosition(topY, topX);
        setTimeout(function(){
          dancer.$node.css('transition', '15000ms');
          dancer.setPosition(bottomY, bottomX)
        }, 3000);
        setTimeout(function(){
          dancer.$node.css('transition', '1500ms');
          dancer.setPosition(homeY, homeX)
        }, 15000);
      }
    });

  });

  $('.chooseYourDancer').on('click', function(){
    $('.dancerMenu').toggleClass('hidden');
  })

  $('.closeMenu').on('click', function(){
    $('.dancerMenu').addClass('hidden');
  })

  $('.randomizePositions').on('click', function(){
    danceOff = false;
    for(var i = 0; i < window.dancers.length; i++){
      window.dancers[i].setPosition(Math.random() * midPoint + midPoint, $("body").width() * Math.random())
    }
  });

  $('.lineUpOnYAxis').on('click', function(){
    danceOff = true;
    for(var i = 0; i < window.dancers.length; i++){
      window.dancers[i].setPosition($("body").height()/2, $("body").width()/window.dancers.length * i);

    }
  });

  $('.danceOff').on('click', function(){
    danceOff = true;
    var firstHalf = window.dancers.slice(0, window.dancers.length/2);
    var secondHalf = window.dancers.slice(window.dancers.length/2);
    var windowWidth = $('body').width();
    var windowHeight = $('body').height();
    var startX = 0;
    var startY = windowHeight * .75;
    var endX = windowWidth * .3;
    var endY = windowHeight * .33;
    var lengthX = endX - startX;
    var lengthY = startY - endY;
    for(var i = 0; i < firstHalf.length; i++){
      firstHalf[i].setPosition(
        startY - lengthY/firstHalf.length * i,
        startX + lengthX/firstHalf.length * i
        )

    }
    startX = windowWidth * .9;
    startY = windowHeight * .75;
    endX = windowWidth * .6;
    endY = windowHeight * .33;
    lengthX = endX - startX;
    lengthY = startY - endY;
    for(var i = 0; i < secondHalf.length; i++){
      secondHalf[i].setPosition(
        startY - lengthY/firstHalf.length * i,
        startX + lengthX/firstHalf.length * i
        )

    }
  });

  $('.switchPositions').on('click', function(){
    danceOff = false;
    var firstHalf = window.dancers.slice(0, window.dancers.length/2);
    var secondHalf = window.dancers.slice(window.dancers.length/2);
    for(var i = 0; i < firstHalf.length; i++){
      tempTop = firstHalf[i].top;
      tempLeft = firstHalf[i].left;
      firstHalf[i].setPosition(secondHalf[i].top, secondHalf[i].left);
      secondHalf[i].setPosition(tempTop, tempLeft);
    }
  });



  /*( function(){
    console.log('haiiii');
  });*/

});

var heads = {
  pasoidjasoijdsoopty: "img/heads/smiley.png",
  red: "img/heads/smiley_red.png",
  blue: "img/heads/smiley_blue.png",
    poo: "img/heads/smiley.png",
  re: "img/heads/smiley_red.png",
  bue: "img/heads/smiley_blue.png",
    oopty: "img/heads/smiley.png",
  rd: "img/heads/smiley_red.png",
  ble: "img/heads/smiley_blue.png",
    ppty: "img/heads/smiley.png",
  reasd: "img/heads/smiley_red.png",
  bluesadas: "img/heads/smiley_blue.png",
    poopasdty: "img/heads/smiley.png",
  reasdasd: "img/heads/smiley_red.png",
  bluasde: "img/heads/smiley_blue.png",
    poopasdasty: "img/heads/smiley.png",
  redhndfghdrg: "img/heads/smiley_red.png",
  bltrnyrdtue: "img/heads/smiley_blue.png",
    pooynrtstypty: "img/heads/smiley.png",
  renrtyrdd: "img/heads/smiley_red.png",
  blntydrtyue: "img/heads/smiley_blue.png",
    pntrydrtyoopty: "img/heads/smiley.png",
  retrnytryd: "img/heads/smiley_red.png",
  bltnyrtdyue: "img/heads/smiley_blue.png",
    pontrdyopty: "img/heads/smiley.png",
  reynrntyrdd: "img/heads/smiley_red.png",
  blrtdnyrue: "img/heads/smiley_blue.png",
    pootndypty: "img/heads/smiley.png",
  rtryned: "img/heads/smiley_red.png",
  btnydrlue: "img/heads/smiley_blue.png",
};




