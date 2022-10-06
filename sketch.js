let bg;

function setup() {
  bg = loadImage("space4k.jpg"); //https://wallsdesk.com/wp-content/uploads/2016/09/Space-4K.jpg
  createCanvas(width, height);
}

function draw() {
  background(bg);
  for (let i = 0; i < objects.length; i++) {
    objects[i].update();
    objects[i].draw();
  }
}
