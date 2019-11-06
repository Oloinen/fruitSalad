let foodItem = document.getElementById('food_item').value;
let foodPrice = parseInt(document.getElementById('food_price').value);


foods = [];
prices = [];

function addFood() {
    let foodItem = document.getElementById('food_item').value;
    let foodPrice = document.getElementById('food_price').value;
    let foodInput = "<tr><td>" + foodItem + "</td><td>" + foodPrice + "€</td></tr>";
    foods.push(foodInput);
    foodInput.value = "";
    document.getElementById('foods').innerHTML = foods.join();
    document.getElementById('food_item').value="";
    document.getElementById('food_price').value="";

    prices.push(parseFloat(foodPrice.replace(",", ".")));

    console.log(prices);
}

function calculateMax(array) {
    let max = array[0];
    let maxIndex = 0;

    for (let i = 1; i < array.length; i++) {
        if (array[i] > max) {
            maxIndex = i;
            max = array[i];
        }
    }
    document.getElementById('expensive').innerHTML=foods[maxIndex];
}

function calculateMin(array) {
    let min = array[0];
    let minIndex = 0;

    for (let i = 1; i < array.length; i++) {
        if(array[i] < min) {
            minIndex = i;
            min = array[i];
        }
    }
    document.getElementById('cheap').innerHTML=foods[minIndex];
}


function manyFunctions () {
    addFood();
    calculateMax(prices);
    calculateMin(prices);
}




