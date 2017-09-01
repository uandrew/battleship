//Реалізація представлення, вьюшка
var view = {
// метод получає строкове повідомлення і виводить його в області повідомлення
  dispayMessage: function(msg) {
    var messageArea = document.getElementById("message");
    messageArea.innerHTML = msg;
  },
  displayMiss: function(location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "miss"); 
  },
  displayHit: function(location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
  }
};
//Реалізація моделі
/* var ship1 = {
  locations: ["10", "20", "30"],  //координати першого корабля відповідно, А0,В0,С0
  hits: ["","",""] //кораблі всі з 3 частин, тому масив зберігає три пусті строки, які заміняться строкою hit.
};
var ship2 = {
  locations: ["32", "33", "34"],
  hits: ["","",""]
};
var ship2 = {
  locations: ["63", "64", "65"],
  hits: ["","",""]
}; */

var model = {
  boardSize: 7,
  numShips: 3,
  shipLength: 3,
  shipSunk: 0,
  ships: [ // фіксовані позиції замінили на нульові
    {locations: [0, 0, 0], hits:["","",""]},
    {locations: [0, 0, 0], hits: ["","",""]},
    {locations: [0, 0, 0],hits:["","",""]}
  ],
  fire: function(guess) {
    for (var i = 0; i < this.numShips; i++ ) {  //всі кораблі перебираємо
      var ship = this.ships[i];
      //var locations = ship.locations; //отримуєм масив кліток, які займає корабель
      var index = ship.locations.indexOf(guess); //щоб не писати ще один цикл можна перевіряти чи є в масиві координат координати пострілу юзера
      if (ship.hits[index] === "hit") { // перевіряєм чи повторно не було попадання
        view.dispayMessage("Упс, ти вже попав по цих координатах!");
        return true;
      }else if (index >= 0) { //повертає -1 якщо відсутнє значення
        ship.hits[index] = "hit"; // той самий індекс має відмічатися в масиві який зберігає попадання і ми міняємо масив
        view.displayHit(guess);//об'єкт view має вивести маркер попадання і повідомлення
        view.displaymessage("ПОПАВ!");
       
        if (this.isSunk(ship)) {
          view.dispayMessage("Ти потопив мій корабель!");
          this.shipsSunk++;  //лічильник потоплених кораблів в моделі збільшується
        }
        return true;
      }
    }
    view.displayMiss(guess); //аналогічно по промахах
    view.dispayMessage("Ти промахнувся.");
    return false; // піля перебору всіх кораблів попадання не виявлено значить гравець промахнувся
    //важливо: попадання для об'єкта view необхідні щоб класами в розмітці відобразити вражену ціль, тоді як для об'єкта model ці попадання відображають стан програми.
  },
  isSunk: function (ship) {
    for (var i = 0; i < this.shipLength; i++) {
      if (ship.hits[i] !== "hit") {
        return false;
      }
    }
    return true;
  },

  generateShipLocation: function () {
    var locations;
    for (var i = 0; i < this.numShips; i++) {
      do {
        locations = this.generateShip(); // нові позиції генеруємо
      } while (this.colision(locations)); //перевіряємо з позиціями які вже на дошці
      this.ship[i].locations = locations; //отримані позиції переносимо в масив моделі яка зберігає кораблі
    }
  },
  generateShip: function() {
    var direction = Math.floor(Math.random() * 2);
    var row, col;

    if (direction === 1) { //горизонтальний напрямок
      row = Math.floor(Math.random() * this.boardSize);
      col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
    }else { //вертикальний напрямок
      row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
      col = Math.floor(Math.random() * this.boardSize);
    }
    var newShipLocations = [];

    for (var i = 0; i < this.shipLength; i++) {
      if (direction === 1) {
        newShipLocations.push(row + "" + (col + i));//гориз позиція створюється через додавання колонок
      } else {
        newShipLocations.push((row + i) + "" + col);//вертикальна позиція створюється через додавання рядків
      }
    }
    return newShipLocations;
  },
  collision: function (locations) { // передаємо масив позицій корабля який збираємось розмістити
    for (var i = 0; i < this.numShips; i++ ) {//кожен корабель який вже розміщений на полі
      var ship = model.ships[i];
      for (var j = 0; j < locations.length; j++) { // перевіряємо чи не збігаєтьмся їх розиції з тими що в новому масиві
        if (ship.locations.indexOf(locations[j]) >= 0) { //якщо більше 0 то позиції збігаються і виявлдено перекриття
          return true;
        }
      }
    }
    return false;
  }
};

//Controller

var controller = {
  guesses: 0,
  processGuess: function (guess) {
    var location = parseGuess(guess);
    if (location) {
      this.guesses++; // якщо дані введені правильно лічильник збільшується
      var hit = model.fire(location);
      if (hit && model.shipSunk === model.numShips) {
        view.displayMessage("ти потопив усі мої кораблі, в " + this.guesses + " спроб");
      }
    }
  }
}

function parseGuess(guess) {
  var alphabet = ["A", "B", "C", "D", "E", "F", "G"]; //букви з координат на дошці гри
  if (guess === null || guess.length !== 2) {
    alert("Упс, введіть літеру і цифру як на дошці");
  }else {
    firstChar = guess.charAt(0);//з даних юзера берем 1шу букву
    var row = alphabet.indexOf(firstChar);//і перевіряємо чи вона відповідає одній з тих що в масиві літер
    var column = guess.charAt(1);
    if (isNaN(row) || isNaN(column)) {
      alert("Упс, цього немає на дошці");
    }else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
      alert("Упс, це за межами дошки"); //по суті перевірка щоб цифри лежали в діапазоні розмірів дошки. при чому строка в column приводиться до числа під час перевірки
    } else {
      return row + column; //зєднюємо строку і стовбець в строку(конкатинація числа і строки буде строкою)
    }
  }
  return null;
}

function handleFireButton() { // при кожному кліку по кнопці викликаєтться функція
  var guessInput = document.getElementById("guessInput");
  var guess = guessInput.value;
  controller.processGuess(guess); //передаєм дані контролеру
  guessInput.value = ""; // видаляємо зміст інпута форми щоб не прийшлось кожного разу очищати елемент перед введенням пострілу
}

function handleKeyPress(e) { // браузер передаэ обэкт подыъ обробнику. обэкт вмыщаэ ынформацыю про те яка клавыша була нажата
  var fireButton = document.getElementById("fireButton");
  if (e.keyCode == 13) { 
    fireButton.click();//імітує клік нажаттям ентер
    return false; // повертаємо щоб форма не зробила нічого зайвого 
  }
}

window.onload = init;
function init() {
  var fireButton = document.getElementById("fireButton");
  fireButton.onclick = handleFireButton;
  var guessInput = document.getElementById("guessInput");
  guessInput.onkeypress = handleKeyPress;
  model.generateShipLocations();
}


