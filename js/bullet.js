class Bullet {
  constructor(context, x, y) {
    this.context = context;
    this.x = x;
    this.y = y;
  }

  render = function() {
    this.context.fillStyle = "red";
    this.context.fillRect(this.x, this.y, 5, 25);
  };

  update = function() {
    this.y -= 7;
  };
}
