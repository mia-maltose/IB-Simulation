let objects = [];
let addflag = false; // Main is not defined
let updateflag = false; //Main is not in list
let number = 0;
let color = "rgb(255,255,255)";

function updateList() {
  updateflag = false;
  lst = document.getElementById("list");
  lst.innerHTML = "";
  distfield = document.getElementById("distfield");
  distfield.innerHTML = "";
  header = document.getElementById("header");
  header.innerHTML = "<b>New Centre Object</b>";
  for (let i = 0; i < objects.length; i++) {
    if (updateflag == false && addflag == true) {
      updateflag = true;
      if (i == 0) {
        header.innerHTML = "<b>New Orbiting Object</b>";
        distfield.innerHTML =
          '<div class="col-4">Distance (m)</div><div class="col-8"><div class="slidecontainer"><input type="range" min="0" max="100" step="25" value="50" class="slider" id="distance_slider" list="interval"><datalist id="interval"><option value="0">&frac14 y</option><option value="25">&frac12 y</option><option value="50">y</option><option value="75">2y</option><option value="100">4y</option></datalist></input></div></div>';
        lst.innerHTML += `<div class="row variable gx-0">
        <div class="row">
        <div class="col-4">Mass</div>
        <div class="col-8">${objects[i].displaying_mass} kg</div>
        </div>`;
      }
    } else {
      lst.innerHTML += `<div class="row variable gx-0">
      <div class="row"><b>${objects[i].label}</b></div>
      <button class="remove" onclick="removeObject(${i});"><b>×</b></button>
        <div class="row">
        <div class="col-4">Mass</div>
        <div class="col-8">${objects[i].displaying_mass} kg</div>
        </div>
        <div class="row">
        <div class="col-4">Distance</div>
        <div class="col-8">${objects[i].displaying_dist} m</div>
        </div>
      </div>`;
    }
  }
}

function removeObject(index) {
  if (index == 0) {
    objects.splice(index, objects.length);
    updateflag = false;
    addflag = false;
    number = 0;
    updateList();
  } else {
    objects.splice(index, 1);
    updateList();
  }
}

function colorbtn(colorid) {
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
    color = "rgb(27, 107, 255)";
  } else if (colorid == "violet") {
    color = "rgb(238, 130, 238)";
  }
}

function addObject() {
  let mass = parseFloat(document.getElementById("mass_slider").value); //mass is the displaying mass (e.g. 'x')
  if (mass == 50) {
    mass = "x";
    Mass = 100;
    Radius = 16;
  } else if (mass == 25) {
    mass = "&frac12 x";
    Mass = 100 / 2;
    Radius = 11;
  } else if (mass == 0) {
    mass = "&frac14 x";
    Mass = 100 / 4;
    Radius = 8;
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
    mainradius = Radius; // new variable, rmb to add to criterion B
    objects.unshift(new Main(Mass, Radius, color, mass));
    addflag = true;
    updateList();
  } else {
    let Distance = parseFloat(document.getElementById("distance_slider").value); //Distance is the displaying distance (e.g. 'x')
    if (Mass < mainmass) {
      if (Distance == 50) {
        Distance = "y";
        Dist = 64;
      } else if (Distance == 25) {
        Distance = "&frac12 y";
        Dist = 32;
      } else if (Distance == 0) {
        Distance = "&frac14 y";
        Dist = 13;
      } else if (Distance == 75) {
        Distance = "2y";
        Dist = 128;
      } else if (Distance == 100) {
        Distance = "4y";
        Dist = 256;
      }
      radial_dist = Dist - mainradius - Radius; // new variable, rmb to add to criterion B
      // fixed bug, rmb to add to criterion B
      if (radial_dist >= 0) {
        number += 1;
        objects.push(
          new Orbiting(
            number,
            Mass,
            Radius,
            mainmass,
            Dist,
            color,
            mass,
            Distance
          )
        );
        updateList();
        document.getElementById("distance_slider").value = 50;
      } else {
        alert(
          "Radial distance must be larger than the radius of the center object.\nPlease select a lower mass and/or distance."
        );
      }
    } else if (Mass >= mainmass) {
      alert(
        "Mass of orbiting object needs to be less than the mass of the center object."
      );
    }
  }
  document.getElementById("mass_slider").value = 50;
  color = "rgb(255,255,255)";
}
