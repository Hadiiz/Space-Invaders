class Level {
  constructor(ctx, scoreCtx, keysdown) {
    this.ctx = ctx;
    this.scoreCtx = scoreCtx;
    this.keysdown = keysdown;
    this.sprite = [];
    this.invLength = 49;
    this.invaderDx = 0;
    this.invaderDy = 0;
    this.planeImg = new Image();
    this.planeImg.src = "./img/plane.png";
    this.score = 0;
    this.lives = 3;
    this.livesDx = 0;

    this.planeX = 0;
    this.planeY = 0;
    this.generate();
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  generate = () => {
    for (let i = 0; i < this.invLength; i++) {
      if (i % 25 == 0 && i != 0) {
        this.invaderDy += 60;
        this.invaderDx = 0;
      }
      this.sprite.push(new Invader(this.ctx, this.invaderDx, this.invaderDy));
      this.invaderDx += 80;
    }
    this.sprite.push(new Plane(this.ctx, 550, 656.25));
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  render = () => {
    this.scoreCtx.fillStyle = "black";
    this.scoreCtx.fillRect(0, 0, scoreCanvas.width, scoreCanvas.height);
    this.scoreCtx.fillStyle = "white";
    this.scoreCtx.font = "25px monospace";
    this.scoreCtx.fillText("Score: " + this.score, 10, 50);
    this.scoreCtx.fillText("Lives: ", 10, 100);

    for (let i = 0; i < this.lives; i++) {
      this.scoreCtx.drawImage(this.planeImg, this.livesDx + 100, 82.5, 20, 20);
      this.livesDx += 20;
    }
    this.livesDx = 0;
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < this.sprite.length; i++) {
      if (this.sprite[i] instanceof Invader) {
        this.sprite[i].render(this.invaderDx, 10);
      } else if (this.sprite[i] instanceof Plane) {
        this.sprite[i].render(this.keysdown);
      } else {
        this.sprite[i].render();
      }
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  update = () => {
    for (let i = 0; i < this.sprite.length; i++) {
      this.sprite[i].update(this.keysdown);
      if (this.sprite[i] instanceof Plane) {
        this.planeX = this.sprite[i].x;
        this.planeY = this.sprite[i].y;
      }
    }
    if (32 in this.keysdown) {
      this.sprite.push(new Bullet(this.ctx, this.planeX, this.planeY));
      console.log(this.sprite);
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
