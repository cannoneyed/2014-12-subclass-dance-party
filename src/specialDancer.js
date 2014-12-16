var SpecialDancer = function(top, left, timeBetweenSteps){
  Dancer.call(this, top, left, timeBetweenSteps);
  this.$node = $('<span class = "container"><span>');
  this.$node.head = $('<span class = "container"><span>');
  this.$node.body = $('<span class = "container"><span>');
  this.setPosition(top, left);
}

SpecialDancer.prototype = Object.create(Dancer.prototype);

SpecialDancer.prototype.step = function(){
  Dancer.prototype.step.call(this);
  this.$node.toggleClass("right");
};
