function allValues(event) {
    if (event) {
         event.preventDefault();
    }   
        const redValue = Number(document.getElementById("red-quantity").value);

    const yellowValue = Number(document.getElementById("yellow-quantity").value);

    const valuesTotal = redValue + yellowValue;

    document.getElementById("total-sweets").innerText = valuesTotal;
    console.log("Hello world")
}


function init() {

document.getElementById("sweet-roll-generator").addEventListener("submit", allValues);

allValues();
}

init();