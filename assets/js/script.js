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

// Quiz time remaining

var secondsLeft = 75;

// Interval time

var holdInterval = 0;

// Penalty 10 seconds

var penalty = 10;

var questions = [
    {
        title: "This is Question One",
        options: ["choice A", "choice B", "choice C", "choice D"],
        answer: "choice A"
    },
    {
        title: "This is Question Two",
        options: ["choice A", "choice B", "choice C", "choice D"],
        answer: "choice B"
    },
]

//check high scores
console.log(allScores);
// Check questions array in console log

console.log(questions);

// Create ul for quiz questions

console.log(ulEl);
console.log(timer);
if (timer !== null) {
    timer.addEventListener("click", function () {
        if (holdInterval === 0) {
            holdInterval = setInterval(function () {
                secondsLeft--;
                currentTime.textContent = secondsLeft + " seconds";

                if (secondsLeft <= 0) {
                    clearInterval(holdInterval);
                    quizComplete();
                    currentTime.textContent = "OOOPS! OUT OF TIME!";
                }
            }, 1000);
        }
        render(questionIndex);
    });
}
console.log(questionIndex);

// Renders questions

function render(questionIndex) {

    // Clears existing data 

    questionsSection.innerHTML = "";
    questionTitle.innerHTML = "";
    ulEl.innerHTML = "";



    // Loop through questions array

    for (var i = 0; i < questions.length; i++) {
        // Appends question title only
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].options;
        questionsSection.appendChild(questionTitle);
        questionTitle.textContent = userQuestion;
    }
    // New for each for question

    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.setAttribute("id", "questionli");
        listItem.textContent = newItem;
        questionsSection.appendChild(ulEl);
        ulEl.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}