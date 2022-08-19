let bg;

function setup() {
  bg = loadImage("space4k.jpg");
  createCanvas(width, height);
}

function draw() {
  background(bg); //39, 32, 86
  for (let i = 0; i < planets.length; i++) {
    planets[i].update();
    planets[i].draw();
  }
}
