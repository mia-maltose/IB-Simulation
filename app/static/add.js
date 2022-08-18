let planets = [];
let addflag = false; // main is not defined
let updateflag = false; //main is not in toolbar
let colorflag = false;
var color = "rgb(255,255,255)";
let Mass;
let Dist;

function updateList() {
  updateflag = false;
  lst = document.getElementById("list");
  lst.innerHTML = "";
  distfield = document.getElementById("distfield");
  distfield.innerHTML = "";
  header = document.getElementById("header");
  header.innerHTML = "<b>New Centre Planet</b>";
  for (let i = 0; i < planets.length; i++) {
    if (updateflag == false && addflag == true) {
      updateflag = true;
      if (i == 0) {
        header.innerHTML = "<b>New Orbitting Planet</b>";
        distfield.innerHTML =
          '<div class="col-4">Distance (m)</div><div class="col-8"><div class="slidecontainer"><input type="range" min="0" max="100" step="25" value="50" class="slider" id="distance_slider" list="interval"><datalist id="interval"><option value="0" label="&frac14 y"></option><option value="25" label="&frac12 y"></option><option value="50" label="y"></option><option value="75" label="2y"></option><option value="100" label="4y"></option></datalist></input></div></div>';
        lst.innerHTML += `<div class="row variable">
        <div class="row">
        <div class="col-4"><b>Name</b></div>
        <div class="col-8"><b>${planets[i].name}</b></div>
        </div>
        <div class="row">
        <div class="col-4">Mass</div>
        <div class="col-8">${planets[i].displaying_mass} kg</div>
        </div>`;
      }
    } else {
      lst.innerHTML += `<div class="row variable">
      <div class="row">
      <div class="col-4"><b>Name</b></div>
      <div class="col-8"><b>${planets[i].name}</b></div>
      </div>
      <span class="remove" onclick="removePlanet(${i});"><b>×</b></span>
        <div class="row">
        <div class="col-4">Mass</div>
        <div class="col-8">${planets[i].displaying_mass} kg</div>
        </div>
        <div class="row">
        <div class="col-4">Distance</div>
        <div class="col-8">${planets[i].displaying_dist} m</div>
        </div>
      </div>`;
    }
  }
}

function removePlanet(index) {
  if (index == 0) {
    planets.splice(index, planets.length);
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
  let mass = parseFloat(document.getElementById("mass_slider").value); //mass is the displaying mass (e.g. 'x')
  if (mass.length != 0 && Name.length != 0) {
    if (mass == 50) {
      mass = "x";
      Mass = 100;
      Radius = 15;
    } else if (mass == 25) {
      mass = "&frac12 x";
      Mass = 100 / 2;
      Radius = 10;
    } else if (mass == 0) {
      mass = "&frac14 x";
      Mass = 100 / 4;
      Radius = 5;
    } else if (mass == 75) {
      mass = "2x";
      Mass = 100 * 2;
      Radius = 20;
    } else if (mass == 100) {
      mass = "4x";
      Mass = 100 * 4;
      Radius = 25;
    }

    if (addflag == false) {
      mainmass = Mass;
      planets.unshift(new Main(Name, Mass, Radius, color, mass));
      addflag = true;
      clear();
      updateList();
      console.log("jey");
    } else {
      let Distance = parseFloat(
        document.getElementById("distance_slider").value
      ); //Distance is the displaying distance (e.g. 'x')
      if (Distance.length != 0 && Mass < mainmass) {
        if (Distance == 50) {
          Distance = "y";
          Dist = 52;
        } else if (Distance == 25) {
          Distance = "&frac12 y";
          Dist = 26;
        } else if (Distance == 0) {
          Distance = "&frac14 y";
          Dist = 13;
        } else if (Distance == 75) {
          Distance = "2y";
          Dist = 104;
        } else if (Distance == 100) {
          Distance = "4y";
          Dist = 208;
        }
        planets.push(
          new Planet(Name, Mass, Radius, mainmass, Dist, color, mass, Distance)
        );
        document.getElementById("distance_slider").value = 50;
      }
    }
    document.getElementById("name").value = "";
    document.getElementById("mass_slider").value = 50;
  }
}
