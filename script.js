let myRoll;

function redValue(){ 
    return Number(document.getElementById("red-quantity").value);
}
function yellowValue(){ 
    return Number(document.getElementById("yellow-quantity").value);
}
function greenValue(){ 
    return Number(document.getElementById("green-quantity").value);
}
function orangeValue(){ 
    return Number(document.getElementById("orange-quantity").value);
}
function blackValue(){ 
    return Number(document.getElementById("black-quantity").value);
}

function valuesTotal(){ 
    return redValue() + yellowValue() + greenValue() + orangeValue() + blackValue ();
}


/* Sum the total of all inputted numbers */
function getTotalAmounts() {
   // valuesTotal = redValue + yellowValue + greenValue + orangeValue + blackValue;
    liveCounting();
}

/* Updating the count in real time */
function liveCounting() {
    document.getElementById("live-count-number").innerText = valuesTotal();
    if (valuesTotal() > 12) {
        document.getElementById("live-count").classList.remove('success-text');
        document.getElementById("live-count").classList.add('roll-error-text');
    } else if (valuesTotal() === 12) {
        document.getElementById("live-count").classList.remove('roll-error-text');
        document.getElementById("live-count").classList.add('success-text');
    } else if (valuesTotal() < 12) {
        document.getElementById("live-count").classList.remove('roll-error-text');
        document.getElementById("live-count").classList.remove('success-text');
    }
}

function liveFeedback(element_id_as_text, remove_selector, add_selector){
	console.log(element_id_as_text, remove_selector, add_selector);
    document.getElementById(element_id_as_text).classlist.remove(remove_selector);
	document.getElementById(element_id_as_text).classlist.add(add_selector);
}

/* The main function, triggered by the main button */
function generateRoll(event) {
    if (event) {
        event.preventDefault();  // From the lecture, this stops the form resetting
    }
    const totalSweets = document.getElementById("total-sweets");
    errorMessage = document.getElementById("roll-error-message");

    context.clearRect(0, 0, canvas.width, canvas.height); // Wipe the canvas clean each time
    document.getElementById("my-roll").innerText = ""; // Wipe the printed array text

    errorMessage.innerText = ""; // Wipe the error text
    if (valuesTotal() > 12) {
        return errorMessage.innerText = "Warning - maximum number of sweets in a roll is 12. Please remove " + (valuesTotal() - 12) + " sweets.";
    } else if (valuesTotal() < 12) {
        return errorMessage.innerText = "Warning - minimum number of sweets is 12.\n Please add " + (12 - valuesTotal()) + " more.";
    }

    totalSweets.innerText = "Total sweets: " + valuesTotal();
    mapFlavours(); // Updates the myRoll array with the selected colours.
    drawOnCanvas(); // Draws the pastilles on the canvas.
    document.getElementById("order-form-container-div").style.display = 'block'; // Reveal the order form
    if (window.innerWidth <= 830) {
        document.getElementById("results").scrollIntoView({ behavior: "smooth" }); // Autoscroll to the pastilles on mobile
    }
}



/* This is where I create a new array to map out how many different flavours (and in what amounts) are in the whole roll */
function mapFlavours() {
    const valueArray = [redValue(), yellowValue(), greenValue(), orangeValue(), blackValue()];
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



/* Shuffle the order of the flavours in the array, using the Fisher-Yates shuffle */
function shuffle() {
    let i = myRoll.length, j, temp;
    while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1));
        temp = myRoll[j];
        myRoll[j] = myRoll[i];
        myRoll[i] = temp;
    }
}

/* CANVAS START */
/* Drawing the sweets on the canvas */
let canvas = document.getElementById("pastille-roll");
let context = canvas.getContext("2d");

/* Call a PNGs depending on the colour */
function drawPhoto(x, y, colour, width, height) {
    const pastillePng = new Image();
    pastillePng.src = "images/" + colour + "01.png";
    pastillePng.onload = function () {
        context.drawImage(pastillePng, x, y, width, height);
    }

}

function drawOnCanvas() {
    myRoll.forEach((colour, index) => {
        drawPhoto(96, 16 + index * 43, colour, 94, 50);  // The index*50 nudges the pen down a multiple of 50px to draw the next pastille underneath the previous one. The '10+' is nudges the first one down 6 pixels so it's not touching the top of the canvas.
    });
}

/* CANVAS END */


/* FORM VALIDATION START */

function errorCheckOnSubmit(event) {
    if (event) {
        event.preventDefault();  // From the lecture, this stops the form resetting
    }
    
    const form = event.target;
    let valid = true;

    // Get values
    const name = form.name.value.trim();
    const address = form.address.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();

    // Patterns
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{7,15}$/;

    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(span => span.textContent = '');


    console.log("Name:", name);
console.log("Address:", address);
console.log("Email:", email);
console.log("Phone:", phone);

    // Validate name
    if (name.length < 2) {
        document.getElementById('name-error').textContent = "Please enter a valid full name.";
        valid = false;
    }

    // Validate address
    if (address.length < 5) {
        document.getElementById('address-error').textContent = "Please enter a valid address.";
        valid = false;
    }

    // Validate email
    if (!emailPattern.test(email)) {
        document.getElementById('email-error').textContent = "Please enter a valid email address.";
        valid = false;
    }

    // Validate phone
    if (!phonePattern.test(phone)) {
        document.getElementById('phone-error').textContent = "Enter a valid phone number (7–15 digits).";
        valid = false;
    }

    if (!valid) {
        event.preventDefault(); // Prevent form submission
    } else {
        alert("Thanks for your order!");
    }



};


/* FORM VALIDATION END */


/* This init keeps things tidy */
function init() {
    document.getElementById("sweet-roll-generator").addEventListener("submit", generateRoll);
    document.getElementById("sweet-order-form").addEventListener("submit", errorCheckOnSubmit);
    document.getElementById("flavour-form").addEventListener("input", liveCounting);
}

init();
