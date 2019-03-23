let canvas = document.getElementById("myCanvas");
var width = canvas.width;
var height = canvas.height;
let ctx = canvas.getContext("2d");

////////////////////////////////! KEYSDOWN

this.keysDown = {};
s = new Sprite(ctx, keysDown);
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
