class Plane {
  constructor(context, x, y) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.planeImg = new Image();
    this.planeImg.src = "./img/plane.png";
  }

  render = function() {
    this.context.drawImage(this.planeImg, this.x, this.y, 100, 90);
  };

  update = function(keysdown) {
    if (65 in keysdown && this.x > 0) {
      this.x -= 5;
    }
    if (68 in keysdown && this.x + 100 < 1200) {
      this.x += 5;
    }
  };
}
