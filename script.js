let redValue;
let yellowValue;
let greenValue;
let orangeValue;
let blackValue;
let valuesTotal;
let myRoll;

/* Sum the total of all inputted numbers */
function getTotalAmounts() {
    redValue = Number(document.getElementById("red-quantity").value);
    yellowValue = Number(document.getElementById("yellow-quantity").value);
    greenValue = Number(document.getElementById("green-quantity").value);
    orangeValue = Number(document.getElementById("orange-quantity").value);
    blackValue = Number(document.getElementById("black-quantity").value);
    valuesTotal = redValue + yellowValue + greenValue + orangeValue + blackValue;
    console.log(valuesTotal);
    document.getElementById("live-count-number").innerText = valuesTotal;
    if (valuesTotal > 10) {
        document.getElementById("live-count").classList.remove('success-text');
        document.getElementById("live-count").classList.add('error-text');
    } else if (valuesTotal === 10) {
        document.getElementById("live-count").classList.remove('error-text');
        document.getElementById("live-count").classList.add('success-text');
    } else if (valuesTotal < 10) {
        document.getElementById("live-count").classList.remove('error-text');
        document.getElementById("live-count").classList.remove('success-text');
    }
}

/* The main function, triggered by the main button */
function generateRoll(event) {
    if (event) {
        event.preventDefault();  // From the lecture, this stops the form resetting
    }
    const totalSweets = document.getElementById("total-sweets");
    errorMessage = document.getElementById("error-message");

    context.clearRect(0, 0, canvas.width, canvas.height); // Wipe the canvas clean each time
    document.getElementById("my-roll").innerText = ""; // Wipe the printed array text
    errorMessage.innerText = "";

    if (valuesTotal > 10) {
        return errorMessage.innerText = "Warning - maximum number of sweets in a roll is 10. Please remove " + (valuesTotal - 10) + " sweets.";
    } else if (valuesTotal < 10) {
        return errorMessage.innerText = "Warning - minimum number of sweets is 10.\n Please add " + (10 - valuesTotal) + " more.";
    }
    totalSweets.innerText = "Total sweets: " + valuesTotal;
    mapFlavours(); // Updates the myRoll array with the selected colours.
    drawOnCanvas(); // Draws the pastilles on the canvas.
    document.getElementById("section-2").style.display = 'block'; // Reveal the order form
    if (window.innerWidth <= 450) {
        document.getElementById("results").scrollIntoView({ behavior: "smooth" });
    }
}

/* This is where I create a new array to map out how many different flavours (and in what amounts) are in the whole roll */
function mapFlavours() {
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
function shuffle() {
    let i = myRoll.length, j, temp;
    while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1));
        temp = myRoll[j];
        myRoll[j] = myRoll[i];
        myRoll[i] = temp;
    }
}


/* Drawing the sweets on the canvas */
let canvas = document.getElementById("pastille-roll");
let context = canvas.getContext("2d");

/* Call the PNGs and add them depending on the colour */
function drawPhoto(x,y,colour,width,height) {
    const pastillePng = new Image();
    if (colour === "yellow") {
            pastillePng.src = "images/yellow01.png";
    } else if (colour === "orange") {
            pastillePng.src = "images/orange01.png";
    }
        pastillePng.onload = function(){
    context.drawImage(pastillePng, x, y, 100, 40);
         }
    
}

function drawPastille(x, y, colour = "red", width, height) {
    if (colour === "red") {
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
        context.roundRect(x, y, 100, 40, [4]); // New rounded corner rectangle
        context.fill();
    }

    function drawOnCanvas() {
        myRoll.forEach((colour, index) => {
            drawPhoto(60, 6 + index * 46, colour, 100, 40);  // The index*46 nudges the pen down 46px to draw the next pastille underneath the previous one. The '6+' is nudges the first one down 6 pixels so it's not touching the top of the canvas.
        });
    }


    function thanksForYourOrder() {
        alert("Thanks for your order!");
    }



    /* This init keeps things tidy */
    function init() {
        document.getElementById("sweet-roll-generator").addEventListener("submit", generateRoll);
        document.getElementById("sweet-order-form").addEventListener("submit", thanksForYourOrder);
        document.getElementById("flavour-form").addEventListener("input", getTotalAmounts);
    }

    init();


