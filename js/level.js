class Level {
  constructor(ctx, scoreCtx, keysdown) {
    this.ctx = ctx;
    this.scoreCtx = scoreCtx;
    this.keysdown = keysdown;
    this.levelMusic = new Audio("./audio/level.mp3");

    this.sprite = [];
    this.deleted = [];

    this.invLength = 7;
    this.invaderDx = 0;
    this.invaderDy = 0;
    this.invRandom = false;
    this.invBullet = new Audio("./audio/InvaderBullet.mp3");
    this.invBullet.volume = 0.2;
    this.invSpeed = 1;

    this.planeImg = new Image();
    this.planeImg.src = "./img/plane.png";
    this.score = 0;
    this.lives = 3;
    this.livesDx = 0;

    this.planeX1 = 0;
    this.planeX2 = 0;
    this.planeY1 = 0;
    this.planeY2 = 0;
    this.fire = true;
    this.bulletSound = new Audio("./audio/ShipBullet.mp3");
    this.bulletSound.volume = 0.2;
    this.destroyed = false;

    this.explosionImg = new Image();
    this.explosionImg.src = "./img/explosion.png";
    this.explosionSound = new Audio("./audio/explosion.mp3");
    this.explosionSound.volume = 0.2;
    this.frameCount = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 7;
    this.destruction = 4;

    this.endGame = false;

    this.generate();
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  generate = () => {
    for (let i = 0; i < this.invLength; i++) {
      if (i % 10 == 0 && i != 0) {
        this.invaderDy += 60;
        this.invaderDx = 0;
      }
      this.sprite.push(
        new Invader(this.ctx, this.invaderDx, this.invaderDy, this.invSpeed)
      );
      this.invaderDx += 80;
    }
    this.sprite.push(new Plane(this.ctx, 550, 656.25));
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  newLevel = () => {
    this.invaderDx = 0;
    this.invaderDy = 0;
    this.invSpeed++;
    for (let i = 0; i < this.invLength; i++) {
      if (i % 10 == 0 && i != 0) {
        this.invaderDy += 60;
        this.invaderDx = 0;
      }
      this.sprite.unshift(
        new Invader(this.ctx, this.invaderDx, this.invaderDy, this.invSpeed)
      );
      this.invaderDx += 80;
    }
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  render = () => {
    this.scoreCtx.fillStyle = "black";
    this.scoreCtx.fillRect(0, 0, scoreCanvas.width, scoreCanvas.height);
    this.scoreCtx.fillStyle = "white";
    this.scoreCtx.font = "25px Orbitron";
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

    if (this.destroyed == true && this.destruction != 0) {
      this.explode();
    }
    if (this.destruction == 0) {
      this.destruction = 4;
      this.destroyed = false;
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  update = () => {
    this.levelMusic.play();
    for (let i = 0; i < this.sprite.length; i++) {
      if (this.sprite[i] instanceof Invader) {
        this.sprite[i].update(this.lives, this.endGame);
        this.invRandom = Math.round(Math.random() * 170) == 0;
        if (this.invRandom && this.lives > 0 && this.endGame == false) {
          this.sprite.push(
            new InvBullet(this.ctx, this.sprite[i].x1, this.sprite[i].y2)
          );
          this.invBullet.play();
          console.log(this.sprite[i].y2);
          console.log(this.planeY1);
          if (this.sprite[i].y2 >= this.planeY1) {
            this.endGame = true;
          }
        }
      } else if (this.sprite[i] instanceof Bullet) {
        this.sprite[i].update(this.keysdown);
        if (this.sprite[i].y < 0) {
          this.deleted.push(this.sprite[i]);
        }
        for (let j = 0; j < this.invLength; j++) {
          if (
            this.collide(
              this.sprite[i].x1,
              this.sprite[i].x2,
              this.sprite[i].y1,
              this.sprite[i].y2,
              this.sprite[j].x1,
              this.sprite[j].x2,
              this.sprite[j].y1,
              this.sprite[j].y2
            )
          ) {
            this.deleted.push(this.sprite[i]);
            this.deleted.push(this.sprite[j]);
            this.invLength--;
            this.score++;
          }
        }
      } else if (this.sprite[i] instanceof Plane) {
        this.sprite[i].update(this.keysdown, this.lives, this.endGame);
        this.planeX1 = this.sprite[i].x1;
        this.planeX2 = this.sprite[i].x2;
        this.planeY1 = this.sprite[i].y1;
        this.planeY2 = this.sprite[i].y2;
      } else if (this.sprite[i] instanceof InvBullet) {
        this.sprite[i].update(this.keysdown);
        if (this.sprite[i].y2 > 800) {
          this.deleted.push(this.sprite[i]);
        }
        if (
          this.collide(
            this.sprite[i].x1,
            this.sprite[i].x2,
            this.sprite[i].y1,
            this.sprite[i].y2,
            this.planeX1,
            this.planeX2,
            this.planeY1,
            this.planeY2
          ) &&
          this.destroyed == false
        ) {
          this.lives--;
          this.destroyed = true;
        }
      }
    }

    for (let i = 0; i < this.deleted.length; i++) {
      let element = this.deleted[i];
      this.sprite.splice(this.sprite.indexOf(element), 1);
      this.deleted.splice(this.deleted.indexOf(element), 1);
    }

    if (
      32 in this.keysdown &&
      this.fire == true &&
      this.lives > 0 &&
      this.endGame == false
    ) {
      this.sprite.push(
        new Bullet(this.ctx, this.planeX1 + 48.5, this.planeY1 - 10)
      );
      this.bulletSound.play();

      this.fire = false;
    }
    if (this.lives <= 0 || this.endGame) {
      setInterval(this.gameOver(), 200);
    }
    if (this.invLength == 0) {
      66;
      this.invLength = 8;
      this.newLevel();
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  collide = (x1, x2, y1, y2, x3, x4, y3, y4) => {
    if (
      ((x1 < x4 && x1 > x3) || (x2 < x4 && x2 > x3)) &&
      ((y1 < y4 && y1 > y3) || (y2 < y4 && y2 > y3))
    ) {
      return true;
    }
    return false;
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  explode = () => {
    this.ctx.drawImage(
      this.explosionImg,
      this.frameCount * 96,
      0,
      96,
      96,
      this.planeX1 - 25,
      this.planeY1 - 25,
      150,
      150
    );
    this.tickCount++;
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      this.frameCount++;
      this.frameCount = this.frameCount % 12;
      if (this.frameCount % 12 == 0) {
        this.destruction--;
      }
    }
    this.fire = false;
    this.explosionSound.play();
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  gameOver = () => {
    this.ctx.fillStyle = "orange";
    this.ctx.font = "100px Orbitron";
    this.ctx.fillText("GAME OVER", 250, 400);
  };
}
