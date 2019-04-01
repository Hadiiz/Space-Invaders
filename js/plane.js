class Plane {
  constructor(context, x, y) {
    this.context = context;
    this.x1 = x;
    this.y1 = y;
    this.planeImgW = 100;
    this.planeImgH = 90;
    this.x2 = this.x1 + this.planeImgW;
    this.y2 = this.y1 + this.planeImgH;
    this.planeImg = new Image();
    this.planeImg.src = "./img/plane.png";
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  render = function() {
    this.context.drawImage(this.planeImg, this.x1, this.y1, 100, 90);
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  update = function(keysdown, lives, endGame) {
    if (lives > 0 && endGame == false) {
      if (65 in keysdown && this.x1 > 0) {
        this.x1 -= 5;
        this.x2 -= 5;
      }
      if (68 in keysdown && this.x1 + 100 < 1200) {
        this.x1 += 5;
        this.x2 += 5;
      }
    }
  };
}
