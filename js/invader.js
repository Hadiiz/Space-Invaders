class Invader {
  constructor(ctx, x1, y1) {
    this.ctx = ctx;
    this.imgW = 48;
    this.imgH = 36;
    this.x1 = x1;
    this.x2 = this.x1 + this.imgW;
    this.dx = -1;
    this.y1 = y1;
    this.y2 = this.y1 + this.imgH;
    this.dy = 70 + this.y1;
    this.state = 1;
    this.destroyed = false;
    this.ticksPerFrame = 45;
    this.frameCount = 0;
    this.tickCounter = 0;

    this.invaderImg = new Image();
    this.invaderImg.src = "./img/InvaderB.png";

    this.explCounter = 15;
    this.explosion = new Image();
    this.explosion.src = "./img/expl.png";
    this.planeImg = new Image();
    this.planeImg.src = "./img/plane.png";
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  render = () => {
    this.ctx.drawImage(
      this.invaderImg,
      this.frameCount * this.imgW,
      0,
      this.imgW,
      this.imgH,
      this.x1,
      this.y1,
      this.imgW,
      this.imgH
    );
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  update = () => {
    this.tickCounter++;
    if (this.tickCounter > this.ticksPerFrame) {
      this.tickCounter = 0;
      this.frameCount++;
      this.frameCount = this.frameCount % 2;
    }
    switch (this.state) {
      case 1:
        this.x1 += -this.dx * 9;
        this.x2 += -this.dx * 9;
        if (this.x2 >= 1200 || this.x1 < 0) this.state++;
        break;
      case 2:
        this.y1 += 5;
        this.y2 += 5;
        if (this.y2 >= this.dy) {
          this.state--;
          this.dx *= -1;
          this.dy += 30;
        }
    }
  };
}
