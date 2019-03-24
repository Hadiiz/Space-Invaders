class Invader {
  constructor(ctx, img) {
    this.ctx = ctx;
    this.x1 = 0;
    this.x2 = 0;
    this.y2 = 0;
    this.y1 = 0;
    this.img = img;
    this.imgW = 48;
    this.imgH = 36;
    this.destroyed = false;
    this.ticksPerFrame = 45;
    this.frameCount = 0;
    this.tickCounter = 0;

    this.explCounter = 15;
    this.explosion = new Image();
    this.explosion.src = "./img/expl.png";
  }

  render = (dx, dy) => {
    if (this.destroyed != true) {
      this.ctx.drawImage(
        this.img,
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
    }

    this.x1 = dx;
    this.y1 = dy;
    this.x2 = this.x1 + this.imgW;
    this.y2 = this.y1 + this.imgH;
  };

  update = () => {
    this.tickCounter++;
    if (this.tickCounter > this.ticksPerFrame) {
      this.tickCounter = 0;
      this.frameCount++;
      this.frameCount = this.frameCount % 2;
    }
  };
}
