let redValue;
let yellowValue;
let greenValue;
let valuesTotal;
let myRoll;

function valuesCalc(event) {
    if (event) {
         event.preventDefault();
    }   
    redValue = Number(document.getElementById("red-quantity").value);
    yellowValue = Number(document.getElementById("yellow-quantity").value);
    greenValue = Number(document.getElementById("green-quantity").value);

    valuesTotal = redValue + yellowValue + greenValue;

    if (valuesTotal>10){
        return document.getElementById("total-sweets").innerText = "Warning - max number of sweets in a roll is 10.";
    }
    document.getElementById("total-sweets").innerText = "Total sweets: " + valuesTotal;
    mapFlavours();
}

/* This creates an array of sweet flavours, with the amounts of each flavour */

function mapFlavours(){
  const valueArray = [redValue, yellowValue, greenValue];
  const flavourTypes = ["red", "yellow", "green"];
  myRoll = [];

  valueArray.forEach((count, flav) => {
    for (let i = 0; i < count; i++) {
      myRoll.push(flavourTypes[flav]);
    }
  });
  document.getElementById("my-roll").innerText = "My roll: " + myRoll;
}

/* Shuffle the order of the flavours in the array */

function shuffle(){
  let i = myRoll.length, j, temp;
  while (--i > 0) {
  j = Math.floor(Math.random () * (i+1));
  temp = myRoll[j];
  myRoll[j] = myRoll[i];
  myRoll[i] = temp;
  }
  document.getElementById("my-roll").innerText = "My roll: " + myRoll;
}



/* This init keeps things tidy */
function init() {
document.getElementById("sweet-roll-generator").addEventListener("submit", valuesCalc);
document.getElementById("shuffle-button").addEventListener("click", shuffle);
}

init();


