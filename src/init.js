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

    var danceMoves = ['none', 'backFlip', 'fat', 'doubleBackFlip', 'spinMove', 'tornado', 'tumble', 'doubleTumble'];

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
          dancer.$node.css('transition-duration', '15000ms, 15000ms, 1500ms');
          dancer.setPosition(bottomY, bottomX)
        }, 3000);
        setTimeout(function(){
          dancer.$node.css('transition-duration', '1500ms, 1500ms, 1500ms');
          dancer.setPosition(homeY, homeX)
        }, 15000);

        var randomClass = danceMoves[Math.floor(Math.random() * danceMoves.length)];
        var secondRandomClass = danceMoves[Math.floor(Math.random() * danceMoves.length)];

        setTimeout(function(){
          dancer.$node.addClass(randomClass);
          dancer.$node.css('transition-duration', '1500ms, 1500ms, 1500ms');
        }, 6000);
        setTimeout(function(){
          dancer.$node.removeClass(randomClass);
          dancer.$node.css('transition-duration', '1500ms, 1500ms, 1000ms');
        }, 8000);

        setTimeout(function(){
          dancer.$node.addClass(secondRandomClass);
          dancer.$node.css('transition-duration', '1500ms, 1500ms, 1500ms');
        }, 4000);
        setTimeout(function(){
          dancer.$node.removeClass(secondRandomClass);
          dancer.$node.css('transition-duration', '1500ms, 1500ms, 1000ms');
        }, 6000);
      }
    });

  });

  var whichSong = Math.floor(Math.random() * 2);
  if (whichSong === 0) {
    $('.music_bad').trigger("play");
  } else {
    $('.music_beatIt').trigger("play");
  }

  $('.fredify').on('click', function(){
    for(var i = 0; i < window.dancers.length; i++){
      console.log(window.dancers[i].$node.find('.head'))
      window.dancers[i].$node.find('.head').addClass('spin');
      window.dancers[i].$node.find('.head').toggleClass('fred');

      setTimeout(function(index) {
        return function() {
          window.dancers[index].$node.find('.head').css('transition', '500ms');
          window.dancers[index].$node.find('.head').removeClass('spin');
          setTimeout(function(){
            window.dancers[index].$node.find('.head').css('transition', '1000ms');
          },1000);
        }
      }(i), 5000)
    }
  });

  $('.head').on('click', function(){
    $(this).toggleClass('backFlip');
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
  Alan: "img/heads/alan.png",
  Andy: "img/heads/andy.png",
  Arun: "img/heads/arun.png",
  Benoy: "img/heads/benoy.png",
  Bren: "img/heads/bren.png",
  Christian: "img/heads/christian.png",
  David: "img/heads/david.png",
  'Eric B': "img/heads/eric_b.png",
  Eric: "img/heads/eric_s.png",
  Henry: "img/heads/henry.png",
  Hou: "img/heads/hou.png",
  Kiran: "img/heads/kiran.png",
  Luke: "img/heads/luke.png",
  Matt: "img/heads/matt.png",
  'Mike D': "img/heads/mike_d.png",
  'Mike M': "img/heads/mike_m.png",
  Neil: "img/heads/neil.png",
  Omar: "img/heads/omar.png",
  Preston: "img/heads/preston.png",
  Rob: "img/heads/rob.png",
  'Ryan L': "img/heads/ryan_l.png",
  'Ryan M': "img/heads/ryan_m.png",
  Sasha: "img/heads/sasha.png",
  Shin: "img/heads/shin.png",
  Steven: "img/heads/steven.png",
  Todd: "img/heads/todd.png",
  Wes: "img/heads/wes.png",
  Yondy: "img/heads/yondy.png",
  Zach: "img/heads/zach.png",
 //Fred: "img/heads/fred.png"
};




