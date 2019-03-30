let canvas = document.getElementById("myCanvas");
let scoreCanvas = document.getElementById("scoreCanvas");
var width = canvas.width;
var height = canvas.height;
let ctx = canvas.getContext("2d");
let scoreCtx = scoreCanvas.getContext("2d");

//remove
//FIXME remove
let explosionImg = new Image();
explosionImg.src = "./img/explosion.png";
let frameCount = 0;
////////////////////////////////! KEYSDOWN

this.keysDown = {};
level = new Level(ctx, scoreCtx, keysDown);
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
    level.fire = true;
  },
  false
);
////////////////////////////////! KEYSDOWN

main = () => {
  level.render();
  level.update();
  requestAnimationFrame(main);
};

main();
