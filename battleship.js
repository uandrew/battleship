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
