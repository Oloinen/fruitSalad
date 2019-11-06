class Food {
    constructor(foodItem, foodPrice) {
        this.foodItem = foodItem;
        this.foodPrice = foodPrice;
        this.setPrice = function(price) {
            this.foodPrice = price;
        }
    }
    printFood() {
        return this.foodItem + " " + this.foodPrice + "€";
    }
}

let foods = [];
let foodsToModify = [];
let prices = [];
let toRemove = [];

function addToFoods() {
    let foodItem = document.getElementById('food_item').value.trim();
    let foodPrice = document.getElementById('food_price').value;

    if (foodItem === "") {
        alert('Syötä käypä tuote!')
    } else if (foodPrice === "") {
        alert('Syötä käypä hinta!')
    } else {  
    newFood = new Food(foodItem, foodPrice);
    let food = newFood.printFood();
    foodsToModify.push(Food);
    foods.push(food);
    prices.push(parseFloat(foodPrice.replace(",", ".")));
    
    updateView();
    document.getElementById('food_item').value="";
    document.getElementById('food_price').value="";
    }
}

let forClick = document.getElementById("foods");
forClick.addEventListener('click', function(e) {
    if (e.target.matches("LI")){
        let key = e.target;
        key.className += "remove";
        key.style.backgroundColor = '#EF7A2A';
    
    let index = e.target.getAttribute('value');
    toRemove.push(index);
}
})

function sortToRemove(a, b) {
    return a > b ? 1 : b > a ? -1 : 0;
}

function remove() {
    toRemove.sort(sortToRemove);
    console.log(toRemove);
    let rem = toRemove[0];
    for (i = 0; i < toRemove.length; i++) {
        foods.splice(rem, 1);
        prices.splice(rem, 1);
        rem = toRemove[i+1]-1;
    }
    updateView();
}

function changePrice() {
    let hinta = prompt("Syötä uusi hinta");
    let index = toRemove[0];
    console.log(index);
    if (hinta != null) {
        newFood.setPrice(hinta);
        console.log(foods[index]);
        console.log(Food);
    }
    updateView();
}

function updateView() {
    let output = "";
    for (let i = 0; i <foods.length; i++) {
        output += "<li class='item' value='" + i + "'>" + foods[i] + "</li>";
    }
    document.getElementById("foods").innerHTML = output;
    document.getElementById('cheap').innerHTML = calculateMin(prices);
    document.getElementById('expensive').innerHTML=calculateMax(prices);
    toRemove.splice(0, toRemove.length);
    calculateSum();
    console.log(foodsToModify);
}

function calculateMax(array) {
    let max = array[0];
    let maxIndex = 0;
    let output = "";

    for (let i = 0; i < array.length; i++) {
        if (array[i] > max) {
            maxIndex = i;
            max = array[i];
        }
    }

    let numbers = [];
    let element = array[maxIndex];
    let index = array.indexOf(element);
    while (index != -1) {
        numbers.push(index);
        index = array.indexOf(element, index + 1);
    }

    if (numbers.length === 1) {
    output=foods[maxIndex];
    } else {
        for (let i = 0; i < numbers.length; i++) {
            output += "<li>" + foods[numbers[i]] + "</li>";
        }
    }
    return output;
}

function calculateMin(array) {
    let min = array[0];
    let minIndex = 0;
    let output = "";
   
    for (let i = 0; i < array.length; i++) {
        if(array[i] < min) {
            minIndex = i;
            min = array[i];
        }
    }

    let numbers = [];
    let element = array[minIndex];
    let index = array.indexOf(element);
    while (index != -1) {
        numbers.push(index);
        index = array.indexOf(element, index + 1);
    }

    if (numbers.length === 1) {
    output=foods[minIndex];
    } else {
        for (let i = 0; i < numbers.length; i++) {
            output += "<li>" + foods[numbers[i]] + "</li>";
        }
    }
    return output;
}

function calculateSum() {
    let result = 0;
    for (let i = 0; i< prices.length; i++) {
        result = result + prices[i];
    }
    document.getElementById('sum').innerHTML="Yhteensä: " + result + "€";
    if (result>100) {
        alert('Buljetti ylitetty!!')
    }
}
