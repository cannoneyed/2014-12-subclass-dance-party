var SpecialDancer = function(top, left, timeBetweenSteps){
  Dancer.call(this, top, left, timeBetweenSteps);
  this.$node = $('<div class = "dancerContainer"><div>');
  this.$node.append('<div class = "head left"></div>');
  this.$node.append('<div class = "body"></div>');
  this.setPosition(top, left);
  window.dancers.push(this);
  var fn = this.danceOffFunction.bind(this);
  this.$node.on('click', function() {
    fn();
  });
}

SpecialDancer.prototype = Object.create(Dancer.prototype);

SpecialDancer.prototype.step = function(){
  Dancer.prototype.step.call(this);
  this.$node.find('.head').toggleClass("right");
};

SpecialDancer.prototype.danceOffFunction = function () {
    var danceMoves = ['none', 'backFlip', 'fat', 'doubleBackFlip', 'spinMove', 'tornado', 'tumble', 'doubleTumble', 'giant', 'rocket'];
    if (window.danceOff) {
      var homeX = this.left;
      var homeY = this.top;
      var topX = $('body').width() * .45;
      var topY = $('body').height() * .4;
      var bottomX = $('body').width() * .45;;
      var bottomY = $('body').height() * .8;;
      console.log(this);
      this.setPosition(topY, topX);

      var dancer = this;

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
  };
