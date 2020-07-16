/*  function calcAmount() {
    let price = 1000;
    let amountInput = document.querySelector("input[name='amount-input']");
    let showAmount = document.querySelector("span.show-amount");
    let amountNumber = parseInt(amountInput.value);
  
    amountNumber = isNaN(amountNumber) ? 0 : amountNumber;
  
    if (amountNumber > 10) {
      alert("Maximum 10 termék vásárolható!");
      return;
    }
    else if (amountNumber < 1) {
      alert("Minimum 1 terméket kell vásárolnia!");
    }
    else {
      let amount = amountNumber * price;
  
      showAmount.innerHTML = amount;
    }
  } */
  // parent element kezelés
   let alertCloseButtons = document.querySelectorAll(".close[data-dismiss='alert']");
  let alertCloseEventHandlerFunction = function (ev) {
    this.parentElement.style.display = "none";
  };
  for (let i = 0; i < alertCloseButtons.length; i++) {
    alertCloseButtons[i].addEventListener("click", alertCloseEventHandlerFunction);
  } 
   
 /*   // select elem kitöltése
  let toppings = [
  "szalonna",
  "hagyma",
  "tükörtojás",
  "libamáj",
  "extra sonka"
 
];
  let toppingSelect = document.querySelector("#topInput");
  let index = 0;
  while(index < toppings.length) {
    let option = document.createElement("option");
    option.value = index;
    option.innerHTML = toppings[index];
    toppingSelect.appendChild(option);
    index++;
  } 
 */
//Alapadatok
let weekDegree = [2, 18, -1, 22, 30, 40, -10];
let offers = ["forró csoki", "meleg tea", "finom süti", "fagyi", "jéghideg limonádé"];
let intervalDegree = [0, 15, 20, 25, 100];

//min, max, avg megjelenítése
window.addEventListener("load", function () {

    let minDegree = document.querySelector("span#min-degree");
    let minFahrenheit = document.querySelector("span#min-fahrenheit");
    let minCelsiusTemp = minTemp(weekDegree)
    minDegree.innerHTML = minCelsiusTemp;
    minFahrenheit.innerHTML = celsiusToFahrenheit(minCelsiusTemp);

    let maxDegree = document.querySelector("span#max-degree");
    let maxFahrenheit = document.querySelector("span#max-fahrenheit");
    let maxCelsiusTemp = maxTemp(weekDegree)
    maxDegree.innerHTML = maxCelsiusTemp;
    maxFahrenheit.innerHTML = celsiusToFahrenheit(maxCelsiusTemp);

    let avgDegree = document.querySelector("span#avg-degree");
    let avgFahrenheit = document.querySelector("span#avg-fahrenheit");
    let avgCelsiusTemp = avgTemp(weekDegree)
    avgDegree.innerHTML = avgCelsiusTemp;
    avgFahrenheit.innerHTML = celsiusToFahrenheit(avgCelsiusTemp);

    console.log(minDegree, maxDegree, avgDegree)

  // Balázs Kiegészítés 
    let datum = new Date();
    let nap = datum.getDay();
    
    if (nap == 0) {
        document.getElementById("days-of-week").selectedIndex = 7;
        kiir(6);
    } else {
        document.getElementById("days-of-week").selectedIndex = nap;
        kiir(nap);
    }
  // Balázs Kiegészítés vége
}

);

//Konverzó Fahrenheitre
function celsiusToFahrenheit(celsiusTemp) {
    return celsiusTemp / 5 * 9 + 32;
}

//Heti minimum-hőmérséklet függvénye
function minTemp(weekDegree) {
    let min = weekDegree.length != 0 ? weekDegree[0] : 0;
    for (let i = 1; i < weekDegree.length; i++) {
        if (weekDegree[i] < min) {
            min = weekDegree[i];
        }
    }
    return min;
}

//Heti maximum-hőmérséklet függvénye
function maxTemp(weekDegree) {
    let max = weekDegree.length != 0 ? weekDegree[0] : 0;
    for (let i = 1; i < weekDegree.length; i++) {
        if (weekDegree[i] > max) {
            max = weekDegree[i];
        }
    }
    return max;
}

//Heti átlaghőmérséklet függvénye
function avgTemp(weekDegree) {
    let avg = 0;
    for (let i = 0; i < weekDegree.length; i++) {
        avg = (avg + weekDegree[i]);
    }
    return weekDegree.length != 0 ? Math.round(avg / weekDegree.length) : 0;
}



/* Select-change-re lefutó függvény
    - kiválasztott nap hőmérséklete
    - fahrenheitben is
    - ahhoz tartozó ajánlat
*/
document.addEventListener("change", function (ev) {
    var elem = ev.target;

    if (elem && elem.id == "days-of-week") {
        let weekSelect = document.getElementById("days-of-week");
        let valueSelectedDay = parseInt(weekSelect.options[weekSelect.selectedIndex].value);

      // Balázs Kiegészítés kiírás külön függvényben
        kiir(valueSelectedDay);
    }

});

  // Balázs Kiegészítés kiírás külön függvényben

function kiir(hetnapja) {
    let showDegree = document.querySelector("span#today-degree");
    let showFahrenheit = document.querySelector("span#today-fahrenheit");
    let showOffer = document.querySelector("span#today-offer");

    let valueSelectedDay = hetnapja;
    showDegree.innerHTML = weekDegree[valueSelectedDay];
    showFahrenheit.innerHTML = celsiusToFahrenheit(weekDegree[valueSelectedDay]);

    for (let i = 0; i < intervalDegree.length; i++) {

        if (weekDegree[valueSelectedDay] < intervalDegree[i]) {
            showOffer.innerHTML = offers[i];
            break;
        }
    }

}


  function validate() {
    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const address = document.querySelector("#address").value.trim();
    const comment = document.querySelector("#comment").value.trim();
    const message = document.querySelector('#message');
    const extra = parseInt(document.querySelector('[name=extra]:checked').value, 10);
    const sauce = parseInt(document.querySelector('#sauce').value, 10);
    const quantity = parseInt(document.querySelector('#quantity').value, 10);
    calculatePrice(extra, sauce, quantity);
    if (personalValidate(name, email, address, comment) && quantityValidate(quantity)) {
        message.innerHTML = price;
        return false;
    }
}

function personalValidate(name, email, address, comment) {
    if (!name) {
        alert("A név megadása kötelező!");
        return false;
    }
    if (!email || !(email.indexOf('@') > 0) || !(email.indexOf('.') > 0)) {
        alert("Invalid e-mail cím!");
        return false;
    }
    if (address.length < 10) {
        alert("A cím túl rövid!");
        return false;
    }
    if (comment.indexOf("<") >= 0 && comment.indexOf(">") >= 0) {
        alert("Nem megengedett karaktert tartalmaz!");
        return false;
    }
    return true;
}

function quantityValidate(quantity) {
    if (quantity > 10 || quantity < 1 || isNaN(quantity)) {
        alert("Minimum 1 és maximum 10 db terméket vásárolhat!");
        return false;
    }
    return true;
}

function calculatePrice(extra, sauce, quantity) {
    price = (1200 + extra + sauce) * quantity;
    if (price < 5000) {
        price += 500;
    }
    return price;
}
