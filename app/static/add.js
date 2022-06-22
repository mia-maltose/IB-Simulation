let planets = [];
let addflag = false; // main is not defined
let updateflag = false; //main is not in toolbar
let colorflag = false;
var color = "rgb(255,255,255)";

function updateList() {
  updateflag = false;
  lst = document.getElementById("list");
  lst.innerHTML = "";
  distfield = document.getElementById("distfield");
  distfield.innerHTML = "";
  resetid = document.getElementById("resetid");
  resetid = "";
  for (let i = 0; i < planets.length; i++) {
    if (updateflag == false && addflag == true) {
      updateflag = true;
      if (i == 0) {
        resetid.innerHTML =
          '<button class="resetbtn" onclick="removeMain()">reset</button>';
        distfield.innerHTML =
          '<div class="col-4">Distance (m)</div><div class="col-8"><div class="slidecontainer"><input type="range" min="0" max="100" step="25" value="50" class="slider" id="distance_slider" list="interval"><datalist id="interval"><option value="0" label="&frac14 x"></option><option value="25" label="&frac12 x"></option><option value="50" label="x"></option><option value="75" label="2x"></option><option value="100" label="4x"></option></datalist></input></div></div>';
        lst.innerHTML += `<div class="row variable">
        <div class="row">
        <div class="col-4"><b>Name</b></div>
        <div class="col-8"><b>${planets[i].name}</b></div>
        </div>
        <div class="row">
        <div class="col-4">Mass</div>
        <div class="col-8">${planets[i].mass} kg</div>
        </div>`;
      }
    } else {
      lst.innerHTML += `<div class="row variable">
      <div class="row">
      <div class="col-4"><b>Name</b></div>
      <div class="col-8"><b>${planets[i].name}</b></div>
      </div>
      <span class="remove" onclick="removePlanet(${i});">×</span>
        <div class="row">
        <div class="col-4">Mass</div>
        <div class="col-8">${planets[i].mass} kg</div>
        </div>
        <div class="row">
        <div class="col-4">Distance</div>
        <div class="col-8">${planets[i].dist} m</div>
        </div>
      </div>`;
    }
  }
}

function removeMain() {
  planets.splice(0, planets.length);
  updateflag = false;
  addflag = false;
  updateList();
}

function removePlanet(index) {
  if (index == 0) {
    planets.splice(index, 1);
    updateflag = false;
    addflag = false;
    updateList();
  } else {
    planets.splice(index, 1);
    updateList();
  }
}

function colorbtn(colorid) {
  colorflag = true;
  if (colorid == "red") {
    color = "rgb(255,0,0)";
  } else if (colorid == "orange") {
    color = "rgb(255,165,0)";
  } else if (colorid == "yellow") {
    color = "rgb(255,255,0)";
  } else if (colorid == "Lgreen") {
    color = "rgb(135, 255, 91)";
  } else if (colorid == "Dgreen") {
    color = "rgb(0, 189, 0)";
  } else if (colorid == "Lblue") {
    color = "rgb(98, 211, 255)";
  } else if (colorid == "Dblue") {
    color = "rgb(15, 99, 255)";
  } else if (colorid == "violet") {
    color = "rgb(238, 130, 238)";
  } else {
    color = "rgb(255,255,255)";
  }
}

function addPlanet() {
  if (colorflag == false) {
    color = "rgb(255,255,255)";
  } else {
    colorflag = false;
  }
  let Name = document.getElementById("name").value;
  let mass = parseFloat(document.getElementById("mass_slider").value);
  if (mass.length != 0 && Name.length != 0) {
    if (mass == 50) {
      Mass = 100;
      Radius = 15;
    } else if (mass == 25) {
      Mass = 100 / 2;
      Radius = 10;
    } else if (mass == 0) {
      Mass = 100 / 4;
      Radius = 5;
    } else if (mass == 75) {
      Mass = 100 * 2;
      Radius = 20;
    } else if (mass == 100) {
      Mass = 100 * 4;
      Radius = 25;
    }
    if (addflag == false) {
      mainmass = Mass;
      planets.unshift(new Main(Name, Mass, Radius, color));
      addflag = true;
      updateList();
    } else {
      let Distance = parseFloat(
        document.getElementById("distance_slider").value
      );
      if (Distance.length != 0 && Mass < mainmass) {
        if (Distance == 50) {
          Dist = 48;
        } else if (Distance == 25) {
          Dist = 24;
        } else if (Distance == 0) {
          Dist = 12;
        } else if (Distance == 75) {
          Dist = 96;
        } else if (Distance == 100) {
          Dist = 192;
        }
        planets.push(new Planet(Name, Mass, Radius, mainmass, Dist, color));
        updateList();
      }
    }
  }
}
