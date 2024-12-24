const data = [
    {
        word: "mountain",
        hint: "A large, elevated landform that rises significantly above its surroundings."
    },
    {
        word: "river",
        hint: "A natural flowing watercourse, typically a body of water flowing towards an ocean."
    },
    {
        word: "koala",
        hint: "An Australian marsupial with thick fur and large ears, often seen clinging to trees."
    },
    {
        word: "robot",
        hint: "A machine designed to perform tasks automatically or under remote control."
    },
    {
        word: "airplane",
        hint: "A vehicle designed for air travel with wings and a propulsion system."
    },
    {
        word: "computer",
        hint: "An electronic device used for processing data and performing calculations."
    },
    {
        word: "lighthouse",
        hint: "A tower with a light to guide ships safely through dangerous coastlines."
    },
    {
        word: "guitar",
        hint: "A stringed musical instrument typically played by strumming or plucking the strings."
    },
    {
        word: "dolphin",
        hint: "A highly intelligent marine mammal known for its playful nature."
    },
    {
        word: "volcano",
        hint: "A mountain that erupts with lava, ash, and gases from beneath the Earth's crust."
    },
    {
        word: "parrot",
        hint: "A colorful bird known for its ability to mimic sounds and speech."
    },
    {
        word: "cloud",
        hint: "A visible mass of condensed water vapor floating in the sky."
    },
    {
        word: "butterfly",
        hint: "An insect with large, colorful wings, often found in gardens."
    },
    {
        word: "piano",
        hint: "A large musical instrument with a keyboard and strings struck by hammers."
    },
    {
        word: "sunflower",
        hint: "A tall plant with bright yellow petals, commonly grown for its seeds."
    },
    {
        word: "cheetah",
        hint: "The fastest land animal, known for its incredible sprinting speed."
    }
];



const startBtn = document.querySelector(".start-btn");
const alphabetButtons = document.querySelectorAll(".alphabet-container button");
const timeElement = document.querySelector(".time");
const timeContainer = document.querySelector(".time");
const scoreElement = document.querySelector(".score span");
const inputField = document.querySelector(".inputs");
const Hint = document.querySelector(".hint");
const nextWordBtn = document.querySelector(".next-word");

let currentWord = "";
let score = 0;
let timer;
let gameStarted = false;
let incorrectLetters = [];
let correctLetters = [];

function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        incorrectLetters = [];
        correctLetters = [];
        startBtn.disabled = true;
        const formerInput = inputField.innerHTML;
        startTimer(30);
        timeContainer.style.backgroundColor = "green";
        applyGlossyEffect();
        chooseRandomWord();
        score = 0;
        updateScore();
    }
}

function startTimer(seconds) {
    let time = seconds;
    timer = setInterval(() => {
        timeElement.textContent = "Time: " + time;
        time--;
        if (time < 0) {
            endGame();
        }
    }, 1000);
}

function applyGlossyEffect() {
    alphabetButtons.forEach(button => {
        button.style.boxShadow = "0 0 5px rgba(255, 255, 255, 0.6), 0 0 10px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.2)";
    });
}

function updateScore() {
    scoreElement.textContent = "Score: " + score;
}

function chooseRandomWord() {
    if (gameStarted) {
        if (data.length === 0) {
            endGame();
            return;
        }
        const randomIndex = Math.floor(Math.random() * data.length);
        currentWord = data[randomIndex].word;
        const wordLength = currentWord.length;
        Hint.textContent = "Hint: " + data[randomIndex].hint;
        data.splice(randomIndex, 1);
        let html = "";
        inputField.innerHTML = html;
        for (let i = 0; i < wordLength; i++) {
            html += '<input type="text" class="user-input-game-time">';
        }
        inputField.innerHTML = html;
    }
}

function endGame() {
    window.location.reload()
}

startBtn.addEventListener("click", startGame);
nextWordBtn.addEventListener("click", chooseRandomWord);

function handleinputField(letter) {
    if (gameStarted) {
        if (currentWord.includes(letter)) {
            for (let i = 0; i < currentWord.length; i++) {
                if (currentWord[i] === letter) {
                    correctLetters.push(letter);
                    inputField.querySelectorAll('.user-input-game-time')[i].value = letter;
                }
            }
        } else {
            incorrectLetters.push(letter);
        }
        if (correctLetters.length === currentWord.length) {
            score++;
            updateScore();
            chooseRandomWord();
        }
    }
}

alphabetButtons.forEach(button => {
    button.addEventListener("click", () => {
        handleinputField(button.innerText);
    });
});