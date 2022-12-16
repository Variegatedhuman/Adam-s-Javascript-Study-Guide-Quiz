const startButton = document.querySelector("#start-button")
const buttonOne = document.querySelector("#choice-1")
const buttonTwo = document.querySelector("#choice-2")
const buttonThree = document.querySelector("#choice-3")
const buttonFour = document.querySelector("#choice-4")
const scoreButton = document.querySelector(".highScoreLeaderboard")
const questions = document.querySelector(".questions")
const questionCard = document.querySelector(".questionCards")
const currentTime = document.querySelector("#currentTime")
let currentQuestion = 0
let score = 0
let time = 5
let timer 

var question = [
    {
        questionTitle: "Favorite fruit?",
        choices: ["apple", "oranges", "peaches", "grapefruit"],
        answer: "apple"
    },
    {
        questionTitle: "Favorite veggie?",
        choices: ["carrot", "onions", "eggplant", "celery"],
        answer: "carrot"
    },
    {
        questionTitle: "Favorite rock?",
        choices: ["granite", "limestone", "tigerseye", "marble"],
        answer: "granite"
    },
]

function endQuiz (){
    questionCard.classList.add("hide");
    const scoreBoard = document.querySelector(".scoreBoard")
    scoreBoard.classList.remove("hide")
    let scoreEl = document.createElement("h2")
    scoreEl.textContent = "Congrats your score is: " + score
    scoreBoard.appendChild(scoreEl)
    clearInterval(timer)

}

function checkAnswer(){
    console.log(this.dataset.value);
    
    if(this.dataset.value === question[currentQuestion].answer){
        alert("CORRECT!")
        score++
    } else {
        alert("Incorrect")
        time-=10
    }
    currentQuestion++;

    if (currentQuestion >= question.length){
        endQuiz();
    } else {
    renderQuestion();
    }
}
function renderQuestion(){
    const questionOptions = document.querySelector(".questionOptions")
    questionOptions.innerHTML="";
    questions.textContent =question[currentQuestion].questionTitle
    for (let index = 0; index < question[currentQuestion].choices.length; index++) {
        var liEl= document.createElement("li");
        liEl.textContent = question[currentQuestion].choices[index]
        liEl.setAttribute("type","button")
        liEl.setAttribute("data-value", question[currentQuestion].choices[index])
        liEl.classList.add("buttons")
        liEl.addEventListener("click", checkAnswer)
        questionOptions.appendChild(liEl)
    }
}

function timerCountdown(){
    timer = setInterval(() => {
        if(time === 0){
            clearInterval(timer)
            endQuiz()
        } else {
        time--
        currentTime.textContent= time
        }
    }, 1000);

}

function startQuiz() {
    questionCard.classList.remove("hide");
    startButton.classList.add("hide");
    renderQuestion();
    timerCountdown();
}


startButton.addEventListener("click", startQuiz)