const countries = [
    { name: "MONGOLIA", flag: "https://flagcdn.com/w320/mn.png" },
    { name: "JAPAN", flag: "https://flagcdn.com/w320/jp.png" },
    { name: "BRAZIL", flag: "https://flagcdn.com/w320/br.png" },
    { name: "FRANCE", flag: "https://flagcdn.com/w320/fr.png" },
    { name: "CANADA", flag: "https://flagcdn.com/w320/ca.png" },
    { name: "GERMANY", flag: "https://flagcdn.com/w320/de.png" },
    { name: "ITALY", flag: "https://flagcdn.com/w320/it.png" },
    { name: "INDIA", flag: "https://flagcdn.com/w320/in.png" },
    { name: "KOREA", flag: "https://flagcdn.com/w320/kr.png" },
    { name: "ARGENTINA", flag: "https://flagcdn.com/w320/ar.png" },
    { name: "MEXICO", flag: "https://flagcdn.com/w320/mx.png" },
    { name: "EGYPT", flag: "https://flagcdn.com/w320/eg.png" },
    { name: "TURKEY", flag: "https://flagcdn.com/w320/tr.png" },
    { name: "THAILAND", flag: "https://flagcdn.com/w320/th.png" },
    { name: "BHUTAN", flag: "https://flagcdn.com/w320/bt.png" },
    { name: "BRUNEI", flag: "https://flagcdn.com/w320/bn.png" },
    { name: "DJIBOUTI", flag: "https://flagcdn.com/w320/dj.png" },
    { name: "SURINAME", flag: "https://flagcdn.com/w320/sr.png" },
    { name: "KYRGYZSTAN", flag: "https://flagcdn.com/w320/kg.png" },
    { name: "TAJIKISTAN", flag: "https://flagcdn.com/w320/tj.png" },
    { name: "MOLDOVA", flag: "https://flagcdn.com/w320/md.png" },
    { name: "MONTENEGRO", flag: "https://flagcdn.com/w320/me.png" },
    { name: "TONGA", flag: "https://flagcdn.com/w320/to.png" },
    { name: "PALAU", flag: "https://flagcdn.com/w320/pw.png" },
    { name: "VANUATU", flag: "https://flagcdn.com/w320/vu.png" }
];

const MAX_LIVES = 5;
let selectedCountry;
let guessedLetters = [];
let remainingLives = MAX_LIVES;
let gameOver = false;

const flagDisplay = document.getElementById("flag");
const wordDisplay = document.getElementById("word");
const livesDisplay = document.getElementById("lives");
const guessedDisplay = document.getElementById("guessed-letters");
const keyboard = document.getElementById("keyboard");
const gameMessage = document.getElementById("game-message");
const messageText = document.getElementById("message");
const correctAnswer = document.getElementById("correct-answer");
const restartButton = document.getElementById("restart");
const hangman = document.querySelector(".hangman");

function startGame() {
    guessedLetters = [];
    remainingLives = MAX_LIVES;
    gameOver = false;

    const randomIndex = Math.floor(Math.random() * countries.length);
    selectedCountry = countries[randomIndex];

    flagDisplay.innerHTML = `<img src="${selectedCountry.flag}" alt="Country flag">`;
    guessedDisplay.textContent = "";
    keyboard.innerHTML = "";

    gameMessage.classList.remove("show");
    messageText.textContent = "";
    correctAnswer.textContent = "";

    const figureParts = document.querySelectorAll(".figure-part");
    figureParts.forEach(p => {p.style.display = "none";} );

    updateLives();
    displayWord();
    createKeyboard();
}

function displayWord() {
    const word = selectedCountry.name;
    let displayedWord = "";

    for (let letter of word) {
        if (guessedLetters.includes(letter)) {
            displayedWord += letter + " ";
        } else {
            displayedWord += "_ ";
        }
    }
    wordDisplay.textContent = displayedWord.trim();
}

function createKeyboard() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let letter of alphabet) {
        const button = document.createElement("button");
        button.textContent = letter;

        button.addEventListener("click", function () { guessLetter(letter, button); });
        keyboard.appendChild(button);
    }
}

function guessLetter(letter, button) {
    if (gameOver) {
        return;
    }
    if (guessedLetters.includes(letter)){
        return;
    }
    guessedLetters.push(letter);
    button.disabled = true;

    if (selectedCountry.name.includes(letter)){
        displayWord();
        checkWin();
    } else{
        remainingLives--;
        updateLives();
        drawHangmanPart();
        checkLose();
    }
    updateGuessedLetters();
}

function updateGuessedLetters() {
    guessedDisplay.textContent = guessedLetters.join(", ");
}

function updateLives() {
    livesDisplay.textContent = remainingLives;
}

function checkWin() {
    const allLettersGuessed = [...selectedCountry.name].every(l => guessedLetters.includes(l));

    if (allLettersGuessed) {
        gameOver = true;
        messageText.textContent = "Хожлоо!";
        correctAnswer.textContent = "";
        gameMessage.classList.add("show");
        disableKeyboard();
    }
}

function checkLose() {
    if (remainingLives === 0) {
        gameOver = true;

        messageText.textContent = "Хожигдлоо!";
        correctAnswer.textContent = "Зөв хариулт: " + selectedCountry.name;

        guessedLetters = [...selectedCountry.name];
        displayWord();
        gameMessage.classList.add("show");
        disableKeyboard();
    }
}

function disableKeyboard() {
    const buttons = keyboard.querySelectorAll("button");
    buttons.forEach(button => {
        button.disabled = true;
    });
}

function drawHangmanPart() {
    const figureParts = document.querySelectorAll(".figure-part");
    const wrongGuesses = MAX_LIVES - remainingLives;

    if (wrongGuesses === 1) {
        figureParts[0].style.display = "block";
        figureParts[1].style.display = "block";
    }

    if (wrongGuesses === 2) {
        figureParts[2].style.display = "block";
    }

    if (wrongGuesses === 3) {
        figureParts[3].style.display = "block";
    }

    if (wrongGuesses === 4) {
        figureParts[4].style.display = "block";
    }

    if (wrongGuesses === 5) {
        figureParts[5].style.display = "block";
    }
}
restartButton.addEventListener("click", startGame);
startGame();