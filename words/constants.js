// const BACKGROUD_COLOR = "#1e0363";
const WORD_COLOR = "lightgreen";
const LETTER_SIZE = 22;

const WORDS = ["joyka", "ben", "fly", "sun", "flower", "juvenile", "fox", "wolf", "cat", "eagle", "raven", "bird", "paradise", "unique"];
const WORD_SPEED = 0.5;

const MAX_LETTER_COUNT = 10;
const MAX_WORD_SIZE = LETTER_SIZE * MAX_LETTER_COUNT;
const MAX_WORD_X = window.innerWidth - MAX_WORD_SIZE;
const INITIAL_SPAWNING_INTERVAL = 1000; // 1s
const SPAWNING_INTERVAL_ACCELERATION = 100; // 0.1s
const MIN_SPAWNING_INTERVAL = 600; // 0.4s

const MAX_ROUNDS = 2;