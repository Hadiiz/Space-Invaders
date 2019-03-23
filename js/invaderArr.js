class InvaderArr {
  constructor(ctx) {
    this.ctx = ctx;
    this.arr = [];
    this.cols = 10;
    this.rows = 3;
    this.invaderImgB = new Image();
    this.invaderImgB.src = "./img/InvaderB.png";
    this.invaderImgC = new Image();
    this.invaderImgC.src = "./img/InvaderC.png";
    this.invaderImgA = new Image();
    this.invaderImgA.src = "./img/InvaderA.png";

    this.imgW = 48;
    this.imgH = 36;
    this.generate();
    this.invaderDx = 0;
    this.invaderDy = 0;

    this.arrX1 = 0;
    this.arrX2 = this.cols * this.imgW + (this.cols - 1) * 32;
    this.arrY1 = 0;
    this.arrY2 = this.rows * this.imgH + (this.rows - 1 * 4);
    this.arrDx = -1;
    this.dist = this.arrY2 + 100;

    this.state = 1;
  }

  generate = () => {
    for (let i = 0; i < this.cols; i++) {
      this.arr.push([]);
      for (let j = 0; j < this.rows; j++) {
        if (j == 0) {
          this.arr[i][j] = new Invader(this.ctx, this.invaderImgC);
        } else if (j == 1) {
          this.arr[i][j] = new Invader(this.ctx, this.invaderImgB);
        } else {
          this.arr[i][j] = new Invader(this.ctx, this.invaderImgA);
        }
      }
    }
  };

  render = () => {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.arr[i][j].render(
          this.arrX1 + this.invaderDx,
          this.arrY1 + this.invaderDy
        );
        this.invaderDy += 40;
      }
      this.invaderDy = 0;
      this.invaderDx += 80;
    }
    this.invaderDx = 0;
  };

  update = () => {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.arr[i][j].update();
      }
    }
    switch (this.state) {
      case 1:
        this.arrX1 += -this.arrDx;
        this.arrX2 += -this.arrDx;
        if (this.arrX2 >= 1200 || this.arrX1 < 0) this.state++;
        break;
      case 2:
        this.arrY1++;
        this.arrY2++;
        if (this.arrY2 >= this.dist) {
          this.dist += 100;
          this.arrDx *= -1;
          this.state--;
        }
        break;
    }
  };
}
