class Plane {
  constructor(context, x, y) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.planeImg = new Image();
    this.planeImg.src = "./img/plane.png";
    this.bullets = [];
    this.fire = true;
    this.bsound = new Audio();
    this.bsound.src = "./audio/ShipBullet.mp3";
    this.bsound.volume = 0.02;
  }

  render = function() {
    this.context.drawImage(this.planeImg, this.x, this.y, 100, 90);
    for (var i = 0; i < this.bullets.length; i++) {
      this.bullets[i].render();
    }
  };

  update = function(keysdown) {
    if (65 in keysdown && this.x > 0) {
      this.x -= 5;
    }
    if (68 in keysdown && this.x + 100 < 1200) {
      this.x += 5;
    }
    if (32 in keysdown) {
      if (this.fire == true) {
        this.bullets.push(new Bullet(this.context, this.x + 48.5, this.y - 10));
        this.bsound.play();
        this.fire = false;
      }
    }
    for (var i = 0; i < this.bullets.length; i++) {
      this.bullets[i].update();
      if (this.bullets[i].y < 0) {
        this.bullets.splice(i, 1);
      }
    }
  };
}
