const words = getWords();
const visibleWords = [];
let currentWord = null;
let currentIndex = -1;
let round = 1;
let timeoutId;
let isFinished = false;
let backgroundMusic;
let startMusic = true;
let bg;
let font;
let startTime;
let isTimerRunning = false;
let currentTime = 0;


function setup() {
    bg = loadImage('./assets/images/image.webp');
    font = loadFont('assets/fonts/font.ttf');
    createCanvas(window.innerWidth, window.innerHeight);
    startTime = new Date();
    textFont(font);
    textSize(LETTER_SIZE)
    backgroundMusic = loadSound("./assets/sounds/MUSIC.mp3")
    play();
}

function mousePressed() {
    if(startMusic) {
        backgroundMusic.play();
        startMusic = false;
    }
}

function draw() {
    
    background(bg);
    
    fill(WORD_COLOR);
    for (let word of visibleWords) {
        const visibleText = word === currentWord ? word.text.slice(currentIndex): word.text;
        text(visibleText, word.x, Math.floor(word.y));
        word.y += WORD_SPEED;
    }

    const [firstWord] = visibleWords;
    if (visibleWords.length && firstWord.y > height) {
        lose();
    }
    fill('#132538');  
    noStroke();
    rect(0, 0, 320, 30)
    fill("#bbd19f")
        text(`Time Elapsed: ${currentTime} seconds`, 20, 20);
        
    if (isTimerRunning) {
        const now = new Date();
        currentTime = Math.floor((now - startTime) / 1000);
        fill("#bbd19f")
        text(`Time Elapsed: ${currentTime} seconds`, 20, 20);
        
      }
}

function keyTyped() {
    if (!isTimerRunning) {
        isTimerRunning = true;
        startTime = new Date();
      }
      
    checkLetter(key);

}

function checkLetter(letter) {
    if (!currentWord) {
        selectWord(letter);
    } else {
        checkWordNextLetter(letter);
    }

    if (currentWord.text.length === currentIndex) {
        visibleWords.splice(visibleWords.indexOf(currentWord), 1);
        currentWord = null;
        currentIndex = -1;
    }
}

function selectWord(letter) {
    const word = visibleWords.find(item => {
        const [firstLetter] = item.text;
        return firstLetter === letter;
    });
    currentWord = word;
    currentIndex = 1;
}

function checkWordNextLetter(letter) {
    const expectedNextLetter = currentWord.text.charAt(currentIndex);
    if (letter === expectedNextLetter) {
        currentIndex++;
    }
}

function getWords() {
    const words = WORDS.filter(word => word.length <= MAX_LETTER_COUNT)

    return words.map((word) => ({
        text: word,
        x: Math.random() * MAX_WORD_X,
        y: 0,
    }));
}

function play() {
    let spawningInterval = INITIAL_SPAWNING_INTERVAL;
    function loop() {
        timeoutId = setTimeout(() => {
            addWord();
            if(spawningInterval > MIN_SPAWNING_INTERVAL) {
                spawningInterval -= SPAWNING_INTERVAL_ACCELERATION;
            }
            if(!isFinished) {
                timeoutId = setTimeout(loop, spawningInterval);
            }
        }, spawningInterval);
    }
    loop();
}

function addWord() {
    if(!words.length) {
        if(round < MAX_ROUNDS) {
            words.push(...getWords());
            round++;
        } else if(!visibleWords.length){
            win();
        }
    } else {
        visibleWords.push(words.pop());
    }
}
function finish() {
    isFinished = true;
    isTimerRunning = false;
    clearTimeout(timeoutId);
    noLoop();
    backgroundMusic.stop();

}
function win() {
    finish();
    alert(`You win! You passed it in ${currentTime} seconds`);
}

function lose() {
    finish();
    alert("You lost");
}