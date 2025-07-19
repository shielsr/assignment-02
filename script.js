


function allValues() {
const redValue = Number(document.getElementById("redQuantity").value);

const yellowValue = Number(document.getElementById("yellowQuantity").value);

const valuesTotal = redValue + yellowValue;

document.getElementById("totalSweets").innerText = valuesTotal;
}


//Array
const valuesTotal = [
    redValue, yellowValue
];


document.getElementById("id-of-form").addEventListner("submit", allValues);