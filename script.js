let redValue;
let yellowValue;
let greenValue;
let valuesTotal;

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
}

function checker(){
console.log(greenValue);
}

/* This init keeps things tidy */
function init() {
document.getElementById("sweet-roll-generator").addEventListener("submit", valuesCalc);
}

init();


