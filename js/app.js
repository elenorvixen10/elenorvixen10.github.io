window.onload = function () {
  characters = {
    kitty2: {
      div: document.getElementById("kitty2"),
      name: "Astronaut Kitty"
    },
    kitty1: {
      div: document.getElementById("kitty1"),
      name: "Space Kitty"
    },
    yarn: {
      div: document.getElementById("yarn"),
      width: document.getElementById("yarn").offsetWidth,
    }
  };
  activateButtons();
};


var characters = {};


function activateButtons(){
  document.getElementById("go").onclick = function(){
    startGame(characters);
  };
};

function startGame(characters){
  // start players and yarn on left
  characters.kitty2.div.style.left = 0;
  characters.kitty1.div.style.left = 0;
  characters.yarn.div.style.left = 0;

  // stop initial animations
  document.getElementById("go").className = "";
  document.getElementsByTagName("img").className = "";

  moveYarn();

  document.onkeydown = function(key) {
    characters.kitty2.position = parseInt(characters.kitty2.div.style.left, 10);
    characters.kitty1.position = parseInt(characters.kitty1.div.style.left, 10);
    checkWinner();
    movePlayer(key)
  };
};

function moveYarn(){
  characters.yarn.position = parseInt(characters.yarn.div.style.left, 10);
  setInterval(function(){
    var newVal = characters.yarn.position += 40;
    if(newVal <= window.innerWidth - characters.yarn.width){
      characters.yarn.div.style.left = newVal + "px";
    }
  }, 100);
};

function checkWinner(){
  if (characters.kitty2.position + characters.kitty2.div.offsetWidth >= window.innerWidth - 40) {
    setWinState(characters.kitty2, characters);
  };
  if (characters.kitty1.position + characters.kitty1.div.offsetWidth >= window.innerWidth - 40) {
    setWinState(characters.kitty1, characters);
  };
};

function movePlayer(key) {
  switch(key.which) {
    case 77: 
      var newkitty2Position = characters.kitty2.position += 40;
      characters.kitty2.div.style.left = newkitty2Position + "px";
      break;
    case 88: 
      var newkitty1Position = characters.kitty1.position += 40;
      characters.kitty1.div.style.left = newkitty1Position + "px";
      break;
  };
};

function setWinState(player, characters){
  // stop players from moving
  document.onkeydown = null;
  document.getElementsByTagName("h1")[0].innerText = player.name + " Wins!!!!";
  var button = document.getElementById("go")
  var title = document.getElementById("game-name")
  title.style.color="red"
  button.value = "Reset"
  button.onclick = function(){
    startGame(characters);
    button.value = "Chase the yarn!"
    document.getElementsByTagName("h1")[0].innerText = "Kitty Krawler!";
    title.style.color="black"
  };
}

