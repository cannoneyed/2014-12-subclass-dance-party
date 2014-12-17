var Dancer = function(top, left, timeBetweenSteps){
  this.top = top;
  this.left = left;
  this.timeBetweenSteps = timeBetweenSteps || 2000;
  this.$node = $('<span class="dancer"></span>');
  this.step();
  this.setPosition(top, left);
};

Dancer.prototype.step = function(){
  var context = this;
  // console.log(this);
  setTimeout(function() {
    context.step()
  }, context.timeBetweenSteps);
};

Dancer.prototype.setPosition = function(top, left){
  this.top = top;
  this.left = left;
  var styleSettings = {
    'top': top,
    'left': left,
    'z-index': Math.floor(top)
  };
  this.$node.css(styleSettings);
};
