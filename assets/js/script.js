// Timer
// Create array for questions
// Write a function to show a question based on an index
// Track high scores using local storage
// Clear all high scores using local storage

// Variables

var score = 0;
var questionIndex = 0;
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTimer");
var questionsSection = document.querySelector("#questionsSection");
var quizContainer = document.querySelector("#quizContainer");
var allScores = JSON.parse(localStorage.getItem("allScores")) || [];
var questionTitle = document.createElement("h2");
var ulEl = document.createElement("ul");
var listItem = document.createElement("li");

// Timer function
function timerCountdown() {
    var timeLeft = 75;
}

var timeInterval = setInterval (function() {
    if (timeLeft >= 0) {
        clearInterval (timeInterval);
        displayFinalScore();
    } 1000;
});
