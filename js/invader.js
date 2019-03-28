class Invader {
  constructor(ctx) {
    this.ctx = ctx;
    this.imgW = 48;
    this.imgH = 36;
    this.x1 = 0;
    this.x2 = this.x1 + this.imgW;
    this.dx = -1;
    this.y1 = 0;
    this.y2 = this.y1 + this.imgH;
    this.dy = 100;
    this.state = 1;
    this.destroyed = false;
    this.ticksPerFrame = 45;
    this.frameCount = 0;
    this.tickCounter = 0;

    this.invaderImg = new Image();
    this.invaderImg.src = "./img/InvaderA.png";

    this.explCounter = 15;
    this.explosion = new Image();
    this.explosion.src = "./img/expl.png";
    this.planeImg = new Image();
    this.planeImg.src = "./img/plane.png";
  }

  render = (dx, dy, state) => {
    this.ctx.drawImage(
      this.invaderImg,
      this.frameCount * this.imgW,
      0,
      this.imgW,
      this.imgH,
      dx + this.x1,
      dy + this.y1,
      this.imgW,
      this.imgH
    );

    /* if (this.destroyed != true) {
      this.ctx.drawImage(
        this.invaderImg,
        this.frameCount * this.imgW,
        0,
        this.imgW,
        this.imgH,
        dx,
        dy,
        this.imgW,
        this.imgH
      );
    } else if (this.destroyed == true && this.explCounter > 0) {
      this.ctx.drawImage(this.explosion, dx - 15, dy - 10, 70, 50);
      this.explCounter--;
    }*/
  };

  update = () => {
    this.tickCounter++;
    if (this.tickCounter > this.ticksPerFrame) {
      this.tickCounter = 0;
      this.frameCount++;
      this.frameCount = this.frameCount % 2;
    }
    switch (this.state) {
      case 1:
        this.x1 += -this.dx;
        this.x2 += -this.dx;
        if (this.x2 >= 1200 || this.x1 < 0) this.state++;
        break;
      case 2:
        this.y1++;
        this.y2++;
        if (this.y2 >= this.dy) {
          this.state--;
          this.dx *= -1;
          this.dy += 100;
        }
    }
  };
}
