// html part for selecting color of planets
<div class="row">
            <div class="col-4">Colour</div>
            <div class="col-8">
              <!-- <input class="colorfield" type="color" id="color"/> -->
              <button class="colorpicker white" id="white"></button>
              <button class="colorpicker red" id="red" onclick="addPlanet()"></button>
              <button class="colorpicker orange" id="orange" onclick="addPlanet()"></button>
              <button class="colorpicker yellow" id="yellow"></button>
              <button class="colorpicker Lgreen" id="Lgreen"></button>
              <button class="colorpicker Dgreen" id="Dgreen"></button>
              <button class="colorpicker Lblue" id="Lblue"></button>
              <button class="colorpicker Dblue" id="Dblue"></button>
              <button class="colorpicker violet" id="violet"></button>
            </div>
          </div>

// css part for colorpicker
.colorpicker {
  height: 15px;
  width: 5px;
  border-color: #a9a9a9;
}

.colorpicker:hover {
  border-color: white;
}

.colorpicker:focus {
  border-color: white;
}

.red {
  background-color: red;
}

.orange {
  background-color: orange;
}

.yellow {
  background-color: yellow;
}

.Lgreen {
  background-color: rgb(135, 255, 91);
}

.Dgreen {
  background-color: rgb(0, 189, 0);
}

.Lblue {
  background-color: rgb(98, 211, 255);
}

.Dblue {
  background-color: rgb(19, 55, 255);
}

.white {
  background-color: white;
}

.violet {
  background-color: violet;
}


// trying to add adjust mass slider
function adjust(mainmass) {
  var adjust_slider = document.getElementById("adjust_mass");
  var adjusted_mass = adjust_slider.value;
  mainmass = adjusted_mass;
}

// orginal working orbit in sim with g input
let width = 1000;
let height = 400;
let G = 90;
let count = 0;
let main;
let planet;
let theta;

class Main {
  constructor(name, mass, radius, grav) {
    this.mass = mass;
    this.radius = radius;
    this.grav = grav;
    this.name = name;
    this.x = width / 2;
    this.y = height / 2;
    print("IN MAIN");
  }

  update() {}

  draw() {
    ellipse(this.x, this.y, this.radius * 2);
  }
}

class Planet {
  constructor(name, mass, radius, maingrav, mainmass, distance) {
    this.G = G;
    this.mass = mass;
    this.radius = radius;
    this.name = name;
    this.g = maingrav;
    this.mainmass = mainmass;
    this.dist = distance; //Math.sqrt(G / this.g)
    this.px = width / 2 + 200;
    this.py = height / 2;
    this.offset = 300;
    this.diameter = radius * 2;
    this.vorb = Math.sqrt((this.G * this.mainmass) / this.dist) / 10; //convert from m to px? Math.sqrt((this.G * this.mainmass) / this.dist)
    this.time = (2 * this.dist * Math.PI) / this.vorb;
    this.angle = (2 * Math.PI) / this.time;
    this.previous = millis();
  }

  update() {
    let elapsedTime = millis() - this.previous;
    // this.previous = millis();
    if (elapsedTime / 1000 > this.time) {
      // count = count + 1;
      elapsedTime = elapsedTime - this.time;
    }
    theta = this.angle * (elapsedTime / 1000) - Math.PI / 2;
    this.px = 20 * this.vorb * Math.cos(theta);
    this.py = 20 * this.vorb * Math.sin(theta);
    if (count % 50 == 0) {
      print(
        G,
        this.radius,
        this.g,
        width,
        height,
        this.dist,
        millis(),
        this.previous
      );
    }
    count += 1;
    // print(this.vorb, theta, this.px, this.py, Math.cos(theta), Math.sin(theta));
  }

  draw() {
    ellipse(this.px + width / 2, this.py + height / 2, this.radius * 2);
  }
}
