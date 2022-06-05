
// Question list
const questions = [
    {
        numb: 1, 
        q: "Commonly used data DO NOT include:",
        o: ["1) Strings",
            "2) Booleans",
            "3) Alert",
            "4) Numbers"
        ],
        a: "3) Alert"
        
    },
    {   
        numb: 2,
        q: "The conditions in an if/else statement are enclosed with ____.",
        o: ["1) Quotes", 
            "2) Curly brackets", 
            "3) Parenthesis",        
            "4) Square brackets"
           ],
        a: "2) Curly brackets"
    },
    {   
        numb: 3,
        q: "Arrays in JavaScript can be used to store ____.",
        o: ["1) Numbers and strings", 
            "2) Other arrays",          
            "3) Booleans", 
            "4) All of the above" 
           ],
        a: "4) All of the above"
    },
    {
        numb: 4,
        q: "String values must be enclosed within ____ when being assigned to variables",
        o: ["1) Commas", 
            "2) Curly Brackets", 
            "3) Quotes", 
            "4) Parenthesis"       
           ],
        a: "3) Quotes"
    },
    {
        numb: 5,
        q: "A very useful tool used during development and debugging for printing content to the debugger is:",
        o: ["1) JavaScript",
            "2) Terminal/bash",
            "3) For loops",
            "4) Console.log"],
        a: "4) Console.log"
    }
]

// setting elements
const introPanel = document.querySelector(".intro-panel");
const beginBtn = intro.querySelector(".begin-btn");
const quizPanel = document.querySelector(".quiz-panel");
const questionContainer = document.querySelector(".question-container");
const answersContainer = document.querySelector(".answer-container");
const resultDisplay = document.querySelector("#result-display");
const resultPanel = document.querySelector(".result-panel");
const timeDisplay = document.querySelector(".time-display");
const currentTime = document.querySelector(".current-time");
const userName = document.querySelector("#userName");
const submitBtn = document.getElementById("submit-btn");
const finalScore = document.querySelector(".finalScore");



// setting up highscores
let timeValue = 75;
let questionsCount = 0;
let questionsNumb = 1;
let userScore = 0;


const numOfHighScores = 10;

 // save to local storage
let highScores = JSON.parse(localStorage.getItem("highScores")) || [] ;
console.log(highScores);

// When click begin quiz button.
beginBtn.onclick = () => {
    introPanel.classList.add("deactivated"); //hide intro
    quizPanel.classList.add("activeQuiz"); //display quiz
    displayQuiz(0); //call showQuestion function
    startTimer(75); //call startTimer function
}




// Getting questions and answer choice from array
function displayQuiz(index){

    // create new span/div tag inside question and answer container and passing values via array index
    let questionTag = "<span>" + questions[index].numb + ") " + questions[index].q + "</span>";
    let answersTag = "<div class='answers'><button>" + questions[index].o[0] + "</button></div>"
    + "<div class='answers'><button>" + questions[index].o[1] + "</button></div>"
    + "<div class='answers'><button>" + questions[index].o[2] + "</button></div>"
    + "<div class='answers'><button>" + questions[index].o[3] + "</button></div>";

    questionContainer.innerHTML = questionTag; 
    answersContainer.innerHTML = answersTag;

    const answers = answersContainer.querySelectorAll(".answers");

    // set onclick to all avilable answers
    for(i=0; i<answers.length; i++){
        answers[i].setAttribute("onclick", "answerSelected(this)");
    }
    
}

// When click an answer
function answerSelected(answer) {
    let userAnswer = answer.textContent; 
    let correctAnswer = questions[questionsCount].a;
    const allAnswers = answersContainer.children.length;

    if(userAnswer === correctAnswer){
        resultDisplay.textContent = "CORRECT!";
        console.log("Correct Answer!");     
    } else {
        resultDisplay.textContent = "INCORRECT!";
        console.log("Incorrect Answer!");
        timeValue -= 15;
    }
    for (i=0; i< allAnswers; i++) {
        answersContainer.children[i].classList.add("disabled");
    }
    nextQuestion();
};


function showResult() {
    quizPanel.classList.remove("activeQuiz"); //remove display quiz
    resultPanel.classList.add("activeResult");
    finalScore.textContent = timeValue;

}

function startTimer () {
    counter = setInterval(timer, 1000);
    function timer() {
        currentTime.textContent = timeValue;
        timeValue--;
        if (timeValue <= 9){
            currentTime.textContent = "0" + timeValue;
        }
        if (timeValue <= 0){
            showResult();
            currentTime.textContent = "0";
            clearInterval(counter);
        }
    }
}

function nextQuestion () {
    if (questionsCount < questions.length-1){
        questionsCount++;
        questionsNumb++;
        displayQuiz(questionsCount);
    }else{
        showResult();
        currentTime.textContent = 0;
        clearInterval(counter);
    }
}

function saveHighScore () {

    var newScore = {score: timeValue, initials: userName.value};

    // add to list
    highScores.push(newScore);

    // sort the list
    highScores.sort((a,b) => b.score - a.score);
 
    // select new list
    highScores.splice(numOfHighScores);

    // set list to local storage
    localStorage.setItem('highScores', JSON.stringify(highScores));
}

// Getting time
var timer = document.getElementsByClassName("timer");

// Setting timer
timer.innerText = "Countdown";

// onClick button to save local storage.
submitBtn.addEventListener("click", function(){saveHighScore()}); 