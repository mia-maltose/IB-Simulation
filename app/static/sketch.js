function setup() {
  createCanvas(width, height);
}

function draw() {
  background(39, 32, 86);
  for (let i = 0; i < planets.length; i++) {
    planets[i].update();
    planets[i].draw();
  }
}
