(function() {
  var counter = 0;
  var refreshRate = 10;

  var imageTransformFriction = 1 / 10;

  // Throttle updateImageTransform
  var isTimeToUpdate = function() {
    return counter++ % refreshRate === 0;
  };

  var onMouseEnterHandler = function(event) {
    mouse.setOrigin(this);
    var img = this.getElementsByTagName("img")[0];
    updateImageTransform.call(img, event);
  };

  var onMouseMoveHandler = function(event) {
    if (isTimeToUpdate()) {
      var img = this.getElementsByTagName("img")[0];
      updateImageTransform.call(img, event);
    }
  };

  var onMouseLeaveHandler = function(event) {
    var img = this.getElementsByTagName("img")[0];
    resetImageTransform.call(img, event);
  };

  var updateImageTransform = function(event) {
    mouse.updatePosition(event);
    var x = -mouse.x * imageTransformFriction;
    var y = -mouse.y * imageTransformFriction;
    var transform = "translate(" + x + "px," + y + "px)scale(1.1)";
    this.style.transform = transform;
    this.style.webkitTransform = transform;
    this.style.mozTranform - transform; 
  };

  var resetImageTransform = function(event) {
    var transform = "scale(1.1)";
    this.style.transform = transform;
    this.style.webkitTransform = transform;
    this.style.mozTranform - transform; 
  }
  
  var mouse = {
    _x: 0,
    _y: 0,
    x: 0,
    y: 0,
    updatePosition: function(event) {
      var e = event || window.event;
      this.x = e.pageX - this._x;
      this.y = e.pageY - this._y;
    },
    setOrigin: function(el) {
      var domRect = el.getBoundingClientRect();
      this._x = window.pageXOffset + domRect.left + domRect.width / 2;
      this._y = window.pageYOffset + domRect.top + domRect.height / 2;
    }
  };

  var portfolioItems = document.getElementsByClassName("portfolio-container");
  Array.prototype.forEach.call(portfolioItems, function (el) {
    el.onmouseenter = onMouseEnterHandler;
    el.onmousemove = onMouseMoveHandler;
    el.onmouseleave = onMouseLeaveHandler;
  });
})();