const mot = document.getElementById("mot");
const tentatives = document.getElementById("tentatives");
let affichage = document.getElementById("hiddenWord");
const letter = document.getElementById("letterToFind");
const stockLetter = document.getElementById("stockLetter");
const win = document.getElementById("win");
const lose = document.getElementById("lose");

let victory = false;
let defeat = false;
let life = 6;
let foundLetter = [];
let word;
const init = () => {
  tentatives.innerHTML = life;
};

let addWord = () => {
  word = mot.value;
  wordSplit = word.split("");
  for (let index = 0; index < wordSplit.length; index++) {
    if (index !== 0 && index !== wordSplit.length - 1) {
      wordSplit[index] = "-";
    }
  }
  affichage.innerHTML = wordSplit.join("");
  mot.value = "";
};

const addLetter = () => {
  if (!victory && !defeat && letter.value.length === 1) {
    if (word.includes(letter.value)) {
      foundLetter.push(letter.value);
      if (stockLetter.innerHTML === "") {
        stockLetter.innerHTML += letter.value;
      } else {
        stockLetter.innerHTML += "," + letter.value;
      }
    } else {
      if (stockLetter.innerHTML === "") {
        stockLetter.innerHTML += letter.value;
      }
      stockLetter.innerHTML += "," + letter.value;
      tentatives.innerHTML = --life;
    }
  }
  showFoundLetter();

  if (affichage.innerHTML.indexOf("-") === -1) {
    victory = true;
    win.innerHTML = "Vous avez gagné !";
    letter.disabled = true;
  } else if (life === 0) {
    defeat = true;
    lose.innerHTML = "Vous avez perdu !";
    letter.disabled = true;
  }
};

const showFoundLetter = () => {
  for (let index = 0; index < foundLetter.length; index++) {
    if (word.includes(foundLetter[index])) {
      for (let i = 0; i < wordSplit.length; i++) {
        if (word[i] === foundLetter[index]) {
          wordSplit[i] = foundLetter[index];
        }
      }
    }
  }
  affichage.innerHTML = wordSplit.join("");
};

const playGame = () => {
  init();
  addWord();

  letter.addEventListener("keypress", (event) => {
    if (event.key === "Entrer") {
      addLetter();
    }
  });
};

playGame();
