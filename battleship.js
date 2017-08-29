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
  ships: [
    {locations: ["10", "20", "30"], hits:["","",""]},
    {locations: ["32","33","34"], hits: ["","",""]},
    {locations: ["63","64","65"],hits:["","",""]}
  ],
  fire: function(guess) {
    for (var i = 0; i < this.numShips; i++ ) {  //всі кораблі перебираємо
      var ship = this.ships[i];
      var locations = ship.locations; //отримуєм масив кліток, які займає корабель
      var index = locations.indexOf(guess); //щоб не писати ще один цикл можна перевіряти чи є в масиві координат координати пострілу юзера
      if (index >= 0) { //повертає -1 якщо відсутнє значення
        ship.hits[index] = "hit";
        return true;
      }
    }
    return false; // піля перебору всіх кораблів попадання не виявлено значить гравець промахнувся
  }
};