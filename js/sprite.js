class Sprite {
  constructor(ctx, scoreCtx, keysdown) {
    this.ctx = ctx;
    this.scoreCtx = scoreCtx;
    this.keysdown = keysdown;
    this.invader = new InvaderArr(this.ctx);
    this.plane = new Plane(this.ctx, 550, 656.25);
    this.sound = new Audio();
    this.sound.src = "./audio/InvaderHit.mp3";
    this.sound.volume = 0.025;
    this.explosion = new Image();
    this.explosion.src = "./img/expl.png";
    this.planeImg = new Image();
    this.planeImg.src = "./img/plane.png";
    this.score = 0;
    this.lives = 3;
    this.livesDx = 0;
  }

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
    this.invader.render();
    this.plane.render();
  };
  update = () => {
    this.invader.update();
    this.plane.update(this.keysdown);
    for (let i = 0; i < this.plane.bullets.length; i++) {
      for (let j = 0; j < this.invader.arr.length; j++) {
        for (let k = 0; k < this.invader.rows; k++) {
          if (
            this.plane.bullets[i].x > this.invader.arr[j][k].x1 &&
            this.plane.bullets[i].x < this.invader.arr[j][k].x2 &&
            this.plane.bullets[i].y > this.invader.arr[j][k].y1 &&
            this.plane.bullets[i].y < this.invader.arr[j][k].y2 &&
            this.invader.arr[j][k].destroyed == false
          ) {
            this.score++;
            this.sound.play();
            this.plane.bullets.splice(i, 1);
            this.invader.arr[j][k].destroyed = true;

            return;
          }
        }
      }
    }
  };
}
