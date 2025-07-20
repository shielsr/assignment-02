let redValue;
let yellowValue;
let greenValue;
let orangeValue;
let blackValue;
let valuesTotal;
let myRoll;

/* The main function, triggered by the main button */
function generateRoll(event) {
    if (event) {
         event.preventDefault();  // From the lecture, this stops the form resetting
    }   
    redValue = Number(document.getElementById("red-quantity").value);
    yellowValue = Number(document.getElementById("yellow-quantity").value);
    greenValue = Number(document.getElementById("green-quantity").value);
    orangeValue = Number(document.getElementById("orange-quantity").value);
    blackValue = Number(document.getElementById("black-quantity").value);
    valuesTotal = redValue + yellowValue + greenValue + orangeValue + blackValue;

    const totalSweets = document.getElementById("total-sweets");
    errorMessage = document.getElementById("error-message");

    context.clearRect(0, 0, canvas.width, canvas.height); // Wipe the canvas clean each time
    document.getElementById("my-roll").innerText = ""; // Wipe the printed array text
    errorMessage.innerText = "";

    if (valuesTotal>10){
        return errorMessage.innerText = "Warning - maximum number of sweets in a roll is 10.\n Please remove " + (valuesTotal-10) + " sweets.";
    } else if (valuesTotal<10){
        return errorMessage.innerText = "Warning - minimum number of sweets is 10.\n Please add " + (10-valuesTotal) + " more.";
    }
    totalSweets.innerText = "Total sweets: " + valuesTotal;
    mapFlavours(); // Updates the myRoll array with the selected colours.
    drawOnCanvas(); // Draws the pastilles on the canvas.
    document.getElementById("results").scrollIntoView({ behavior: 'smooth' });
}

/* This is where I create a new array to map out how many different flavours (and in what amounts) are in the whole roll */
function mapFlavours(){
  const valueArray = [redValue, yellowValue, greenValue, orangeValue, blackValue];
  const flavourTypes = ["red", "yellow", "green", "orange", "black"];
  myRoll = [];

  valueArray.forEach((count, flav) => {
    for (let i = 0; i < count; i++) {
      myRoll.push(flavourTypes[flav]);
    }
  });
  shuffle(myRoll); //This shuffles the order to make the picture look more natural
  document.getElementById("my-roll").innerText = myRoll.join(', '); /* This prints the list, adding some formatting to tidy up the appearance */
}



/* Helper function to shuffle the order of the flavours in the array, using the Fisher-Yates shuffle */
function shuffle(){
  let i = myRoll.length, j, temp;
  while (--i > 0) {
  j = Math.floor(Math.random () * (i+1));
  temp = myRoll[j];
  myRoll[j] = myRoll[i];
  myRoll[i] = temp;
  }
}


/* Drawing the sweets on the canvas */
let canvas = document.getElementById("pastille-roll");
let context = canvas.getContext("2d"); 

function drawPastille(x, y, colour = "red"){
    if (colour==="red") {
        context.fillStyle = "rgb(200, 0, 0)";
    } else if (colour === "black") { 
        context.fillStyle = "rgba(0, 0, 0, 1)"; 
    } else if (colour === "green") { 
        context.fillStyle = "rgba(45, 177, 28, 1)"; 
    } else if (colour === "yellow") { 
        context.fillStyle = "rgba(231, 202, 36, 1)"; 
    } else if (colour === "orange") { 
        context.fillStyle = "rgba(231, 124, 36, 1)"; 
    } else if (colour === "black") { 
        context.fillStyle = "rgba(0, 0, 0, 1)"; 
    }
    context.beginPath();
    context.roundRect(x,y,100,40,[4]); // New rounded corner rectangle
    context.fill();
}

function drawOnCanvas(){
    myRoll.forEach((colour, index) => {
    drawPastille(60, index*46, colour);  // The index*46 nudges the pen down 46px to draw the next pastille underneath the previous one
});
}

function sectionTwo() {
    console.log("Hello world");
    document.getElementById("section-2").style.display='block'; //to show
document.getElementById("order-button").style.display='none'; //to hide
  document.getElementById("section-2").scrollIntoView({ behavior: 'smooth' });
}


/* This init keeps things tidy */
function init() {
document.getElementById("sweet-roll-generator").addEventListener("submit", generateRoll);
document.getElementById("order-button").addEventListener("click", sectionTwo);
}

init();


