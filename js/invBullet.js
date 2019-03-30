class InvBullet {
  constructor(context, x, y) {
    this.context = context;
    this.x1 = x;
    this.y1 = y;
    this.y2 = this.y1 + 25;
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  render = function() {
    this.context.fillStyle = "orange";
    this.context.fillRect(this.x1, this.y1, 5, 25);
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  update = function() {
    this.y1 += 7;
    this.y2 += 7;
  };
}
