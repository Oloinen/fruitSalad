let foods = [];
let prices = [];
let toRemove = [];
let budget = [];

let foodField = document.getElementById('food_item');
let priceField = document.getElementById('food_price');

function Food(foodItem, foodPrice) {
        this.foodItem = foodItem;
        this.foodPrice = foodPrice;
        this.setPrice = function(price) {
            this.foodPrice = price;
        }
        this.printFood = function() {
        return this.foodItem + " " + this.foodPrice + "€";
    }
}

function createFood() {
  const food = new Food(
    foodField.value.trim(),
    priceField.value
  );
  return food;
}

function newFood() {
    if (foodField.value === "") {
        alert('Syötä käypä tuote!')
    } else if (priceField.value === "") {
        alert('Syötä käypä hinta!')
    } else if (parseFloat(priceField.value)<0) { 
        alert('Hinta ei saa olla negatiivinen')
    } else {
    let nFood = createFood();
    prices.push(parseFloat(priceField.value.replace(",",".")));
    foods.push(nFood);
    foodField.value="";
    priceField.value="";
    calculateMax(prices);
    calculateMin(prices);
    calculateSum(prices);
    updateView();
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
    let rem = toRemove[0];
    for (i = 0; i < toRemove.length; i++) {
        foods.splice(rem, 1);
        prices.splice(rem, 1);
        rem = toRemove[i+1]-1;
    }
    updateView();
}

function changePrice() {
    if (toRemove.length>1) {
        alert("Valitse vain yksi tuote!")
            let q = document.querySelectorAll("li.remove");
            for (let i = 0; i < q.length; i++) {
            q[i].style.backgroundColor="";}
    } else if (toRemove.length===0) {
        alert("Valitse ainakin yksi tuote")
    } else {
            let hinta = prompt("Syötä uusi hinta");
            let hintaNro = parseFloat(hinta.replace(",","."));
            let index = toRemove[0];
            if (hintaNro>=0) {
            console.log(hinta);
            console.log(hintaNro);
                foods[index].setPrice(hintaNro);
                prices[index] = hintaNro; } 
                else {
                    alert("Syötä kelpo hinta!")
                }
            
    } updateView();
}

function emptyFoods() {
    foods = [];
    prices = [];
    updateView();
}

function updateView() {
    let output = "";
    for (let i = 0; i <foods.length; i++) {
        output += "<li value='" + i + "'>" + foods[i].printFood() + "</li>";
    }
    document.getElementById("foods").innerHTML = output;
    document.getElementById('cheap').innerHTML = calculateMin(prices);
    document.getElementById('expensive').innerHTML=calculateMax(prices);
    document.getElementById('sum').innerHTML="Yhteensä: " + calculateSum(prices) + "€";
    toRemove.splice(0, toRemove.length);
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
    output="<li>" + foods[maxIndex].printFood() + "<li>";
    } else {
        for (let i = 0; i < numbers.length; i++) {
            output += "<li>" + foods[numbers[i]].printFood() + "</li>";
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
    output="<li>" + foods[minIndex].printFood() + "</li>";
    } else {
        for (let i = 0; i < numbers.length; i++) {
            output += "<li>" + foods[numbers[i]].printFood() + "</li>";
        }
    }
    return output;
}

function calculateSum(array) {
    let result = 0;
    for (let i = 0; i < array.length; i++) {
        result = result + array[i];
    }
    return result;
}