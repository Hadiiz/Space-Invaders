let canvas = document.getElementById("myCanvas");
let scoreCanvas = document.getElementById("scoreCanvas");
var width = canvas.width;
var height = canvas.height;
let ctx = canvas.getContext("2d");
let scoreCtx = scoreCanvas.getContext("2d");

////////////////////////////////! KEYSDOWN

this.keysDown = {};
s = new Sprite(ctx, scoreCtx, keysDown);
addEventListener(
  "keydown",
  function(e) {
    this.keysDown[e.keyCode] = true;
  },
  false
);

addEventListener(
  "keyup",
  function(e) {
    delete this.keysDown[e.keyCode];
    s.plane.fire = true;
  },
  false
);
////////////////////////////////! KEYSDOWN

main = () => {
  s.render();
  s.update();
  requestAnimationFrame(main);
};

main();
