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
        title: "The 'function' and 'var' are known as: ",
        options: ["Keywords", "Data types", "Declaration statements", "Prototypes"],
        answer: "Declaration statements"
    },
    {
        title: "Which of the following variables takes precedence over the others if the names are the same?",
        options: ["Global variable", "The local element", "The two of the above", "None of the above"],
        answer: "The local element"
    },
    {
        title: "Which one of the following is the correct way for calling the JavaScript code?",
        options: ["Preprocessor","Triggering Event", "RMI", "Function/Method"],
        answer: "Function/Method"
    },
    {
        title: "Choose the correct snippet from the following to check if the variable 'a' is not equal the 'NULL':",
        options: ["if(a!==null)", "if (a!)", "if(a!null)", "if(!a!null"],
        answer: "if(a!==null)"
    },
    {
        title: "Which one of the following is used for the calling a function or a method in the JavaScript:",
        options: ["Property Access Expression", "Functional expression", "Invocation expression", "Primary Expression"],
        answer: "Invocation expression"
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

// Event to compare options with answer

function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var answerDiv = document.createElement("div");
        answerDiv.setAttribute("id", "answerDiv");

        // Correct condition 

        if (element.textContent == questions[questionIndex].answer) {
            score++;
            answerDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
        }
        else {

            // Will deduct 10 seconds off secondsLeft for wrong answers

            secondsLeft = secondsLeft - penalty;
            answerDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }

    }
    // Question Index determines number question user is on 
    // Append page with user information

    questionIndex++;

    if (questionIndex >= questions.length) {
        quizComplete();
        answerDiv.textContent = "Finished!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    }
    else {
        render(questionIndex);
    }
    questionsSection.appendChild(answerDiv);

}

// Quiz complete clear questionsSection

function quizComplete() {
    questionsSection.innerHTML = "";
    currentTime.innerHTML = "";

    // Create h1, p elements

    var h1El = document.createElement("h1");
    h1El.setAttribute("id", "h1El");
    h1El.textContent = "Quiz Complete!"

    questionsSection.appendChild(h1El);

    var pEl = document.createElement("p");
    pEl.setAttribute("id", "pEl");

    questionsSection.appendChild(pEl);

    // Calculates time remaining and creates score

    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var pEl2 = document.createElement("p");
        clearInterval(holdInterval);
        pEl.textContent = "Your final score is: " + timeRemaining;

        questionsSection.appendChild(pEl2);
    }

    // User prompted to enter intials

    var enterInitials = document.createElement("initials");
    enterInitials.setAttribute("id", "enterInitials");
    enterInitials.textContent = "Enter your initials: ";

    questionsSection.appendChild(enterInitials);

    // Enter initials

    var userInput = document.createElement("input");
    userInput.setAttribute("type", "text");
    userInput.setAttribute("id", "initials");
    userInput.textContent = "";

    questionsSection.appendChild(userInput);

    // Submit user information

    var initialsSubmit = document.createElement("button");
    initialsSubmit.setAttribute("class", "btn btn-light");
    initialsSubmit.setAttribute("type", "submit");
    initialsSubmit.setAttribute("id", "submit");
    initialsSubmit.textContent = "Submit";

    questionsSection.appendChild(initialsSubmit);

    // Event listener to capture initials and score in local storage 

    initialsSubmit.addEventListener("click", function (event) {
        event.preventDefault();
        var initials = userInput.value;
        console.log(initials);
        if (!initials) {
            document.querySelector("#submit").textContent = "Enter a valid value!";
            console.log(initialsSubmit);
        }
        else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }

            // Clearing HTML at #questionSection 

            document.querySelector("#questionsSection").innerHTML = "";

            // Create High Scores page heading

            var h2El = document.createElement("h2");
            h2El.setAttribute("id", "h2El");
            h2El.textContent = "High Scores!"

            // Append element to page

            questionsSection.appendChild(h2El);

            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            

            // Adds score to final page

            for (let i = 0; i < allScores.length; i++) {
                console.log(allScores.length);
                const el = allScores[i].initials + " " + allScores[i].score;
                console.log("All scores: " + el);
                var li2 = document.createElement("li");
                li2.textContent = el;
                var ul = document.querySelector("#highScoresUl");
                ul.appendChild(li2);

            }

        }

    });
}

const leaderboardLink = document.querySelector("#leaderboard-link");
leaderboardLink.addEventListener("click", showHighScores);


function showHighScores() {
    questionsSection.innerHTML = "";
    currentTime.innerHTML = "";
    ulEl.innerHTML = "";
    console.log(allScores);

    var h2El = document.createElement("h2");
    h2El.setAttribute("id", "h2El");
    h2El.textContent = "High Scores!";
    var ul = document.querySelector("#highScoresUl");
    ul.innerHTML = "";

    var clearScoresButton = document.createElement("button");
    clearScoresButton.setAttribute("class", "btn btn-light");
    clearScoresButton.setAttribute("type", "clearScores");
    clearScoresButton.setAttribute("id", "clearScores");
    clearScoresButton.textContent = "Clear Scores";


    questionsSection.appendChild(h2El);
    questionsSection.appendChild(clearScoresButton);

    

    for (let i = 0; i < allScores.length; i++) {
        const el = allScores[i].initials + " " + allScores[i].score;
        var li2 = document.createElement("li");
        li2.textContent = el;
        ul.appendChild(li2);

    }

}