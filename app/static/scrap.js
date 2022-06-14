//ADD
let planets = [];
let main_planet = "";

function updateList() {
  lst = document.getElementById("list");
  lst.innerHTML = "";
  gravfield = document.getElementById("gravfield");
  gravfield.innerHTML =
    '<div class="col-4">g</div> <div class="col-8"><input class="boxfield" type="number" id="grav" max="100" min="1" value = "9.81"/> N/kg</div>';
  for (let i = 0; i < planets.length; i++) {
    lst.innerHTML += `<div class="row variable">
      <span onclick="removePlanet(${i});updateList()"> X</span>
      <div class="row">
      <div class="col-4">Name</div>
      <div class="col-8">${planets[i].name}</div>
      </div>
      <div class="row">
      <div class="col-4">Mass</div>
      <div class="col-8">${planets[i].mass} kg</div>
      </div>
      <div class="row">
      <div class="col-4">Radius</div>
      <div class="col-8">${planets[i].radius} m</div>
      </div>
    </div>`;
  }
}

function removePlanet(index) {
  planets.splice(index, 1);
  updateList();
}

function removeMain() {
  main_planet = "";
}

function addPlanet() {
  let Radius = document.getElementById("radius").value;
  let Mass = document.getElementById("mass").value;
  let Name = document.getElementById("name").value;
  console.log(Radius, Mass, Name);
  if (Radius.length != 0 && Mass.length != 0 && Name.length != 0) {
    if (main_planet == "") {
      let Grav = document.getElementById("grav").value;
      if (Grav.length != 0) {
        main_planet = new Main(Name, Mass, Radius, Grav);
        planets.push(main_planet);
        updateList();
      }
      // return;
    } else {
      planets.push(new Planet(Name, Mass, Radius));
      updateList();
    }
  }
}

//2nd attempt

function updateList() {
  lst = document.getElementById("list");
  lst.innerHTML = "";
  gravfield = document.getElementById("gravfield");
  gravfield.innerHTML =
    '<div class="col-4">g</div> <div class="col-8"><input class="boxfield" type="number" id="grav" max="100" min="1" value = "9.81"/> N/kg</div>';
  for (let i = 0; i < planets.length; i++) {
    console.log(planets[i]);
    if (planets[0] != "") {
      gravfield.innerHTML = "";
      lst.innerHTML += `<div class="row variable">
        <span onclick="removePlanet(${i});updateList()"> X</span>
        <div class="row">
        <div class="col-4">Name</div>
        <div class="col-8">${planets[i].name}</div>
        </div>
        <div class="row">
        <div class="col-4">Mass</div>
        <div class="col-8">${planets[i].mass} kg</div>
        </div>
        <div class="row">
        <div class="col-4">Radius</div>
        <div class="col-8">${planets[i].radius} m</div>
        </div>
        <div class="row">
        <div class="col-4">g</div>
        <div class="col-8">${planets[i].grav} N/kg</div>
        </div>
      </div>`;
    }
  }
}

//third

let planets = [];
let flag = true;

function updateList() {
  lst = document.getElementById("list");
  lst.innerHTML = "";
  gravfield = document.getElementById("gravfield");
  gravfield.innerHTML =
    '<div class="col-4">g</div> <div class="col-8"><input class="boxfield" type="number" id="grav" max="100" min="1" value = "9.81"/> N/kg</div>';
  for (let i = 0; i < planets.length; i++) {
    console.log(planets[i]);
    // if (planets[0] != "") {
    if ((gravfield.innerHTML = "")) {
      lst.innerHTML += `<div class="row variable">
      <span onclick="removePlanet(${i});updateList()"> X</span>
      <div class="row">
      <div class="col-4">Name</div>
      <div class="col-8">${planets[i].name}</div>
      </div>
      <div class="row">
      <div class="col-4">Mass</div>
      <div class="col-8">${planets[i].mass} kg</div>
      </div>
      <div class="row">
      <div class="col-4">Radius</div>
      <div class="col-8">${planets[i].radius} m</div>
      </div>
    </div>`;
    } else {
      gravfield.innerHTML = "";
      lst.innerHTML += `<div class="row variable">
        <span onclick="removePlanet(${i});updateList()"> X</span>
        <div class="row">
        <div class="col-4">Name</div>
        <div class="col-8">${planets[i].name}</div>
        </div>
        <div class="row">
        <div class="col-4">Mass</div>
        <div class="col-8">${planets[i].mass} kg</div>
        </div>
        <div class="row">
        <div class="col-4">Radius</div>
        <div class="col-8">${planets[i].radius} m</div>
        </div>
        <div class="row">
        <div class="col-4">g</div>
        <div class="col-8">${planets[i].grav} N/kg</div>
        </div>
      </div>`;
    }
    // }
  }
}

function removePlanet(index) {
  if (index == 0) {
    planets[0] = "";
    updateList();
  } else {
    planets.splice(index, 1);
    updateList();
  }
}

function removeMain() {
  main_planet = "";
}

function addPlanet() {
  let Radius = document.getElementById("radius").value;
  let Mass = document.getElementById("mass").value;
  let Name = document.getElementById("name").value;
  if (Radius.length != 0 && Mass.length != 0 && Name.length != 0) {
    if (planets.length == 0) {
      let Grav = document.getElementById("grav").value;
      if (Grav.length != 0) {
        planets.unshift(new Main(Name, Mass, Radius, Grav));
        updateList();
      }
    } else {
      planets.push(new Planet(Name, Mass, Radius));
      updateList();
    }
  }
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
