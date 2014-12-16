var SpecialDancer = function(top, left, timeBetweenSteps){
  Dancer.call(this, top, left, timeBetweenSteps);
  this.$node = $('<div class = "dancerContainer"><div>');
  this.$node.append('<div class = "head left"></div>');
  this.$node.append('<div class = "body"></div>');
  this.setPosition(top, left);
}

SpecialDancer.prototype = Object.create(Dancer.prototype);

SpecialDancer.prototype.step = function(){
  Dancer.prototype.step.call(this);
  this.$node.find('.head').toggleClass("right");
};
