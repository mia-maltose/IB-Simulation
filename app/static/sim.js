const width = 918; //try to make width changeable with changing window size
const height = 570; // success: height is changeable with changing window size
let G = 200;
let count = 0;
let main;
let planet;
let theta;

class Main {
  constructor(name, mass, radius, c, dis_mass) {
    this.displaying_mass = dis_mass;
    this.name = name;
    this.mass = mass;
    this.radius = radius;
    this.x = width / 2;
    this.y = height / 2;
    this.c = c;
  }

  update() {}

  draw() {
    fill(this.c);
    ellipse(this.x, this.y, this.radius * 2);
  }
}

class Planet {
  constructor(name, mass, radius, mainmass, distance, c, dis_mass, dis_dist) {
    this.displaying_mass = dis_mass;
    this.displaying_dist = dis_dist;
    this.G = G;
    this.name = name;
    this.mass = mass;
    this.radius = radius;
    this.dist = distance;
    this.g = (G * this.mainmass) / this.dist ** 2;
    this.mainmass = mainmass;
    this.x = 0;
    this.y = 0;
    this.diameter = radius * 2;
    this.vorb = Math.sqrt((this.G * this.mainmass) / this.dist);
    this.time = (2 * this.dist * Math.PI) / this.vorb;
    this.angle = (2 * Math.PI) / this.time;
    this.previous = millis();
    this.c = c;
  }

  update() {
    let elapsedTime = millis() - this.previous;
    if (elapsedTime / 1000 > this.time) {
      elapsedTime = elapsedTime - this.time;
    }
    theta = this.angle * (elapsedTime / 1000) - Math.PI / 2;
    this.x = this.dist * Math.cos(theta);
    this.y = this.dist * Math.sin(theta);
    if (count % 50 == 0) {
      // print(this.x + width / 2, this.y + height / 2);
    }
    count += 1;
  }

  draw() {
    fill(this.c);
    ellipse(this.x + width / 2, this.y + height / 2, this.radius * 2); //add width/2 and height/2
  }
}
