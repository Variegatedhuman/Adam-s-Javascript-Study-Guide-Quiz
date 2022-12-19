const startButton = document.querySelector("#start-button")
const leaderBoard = document.querySelector(".highScoreLeaderboard")
const questions = document.querySelector(".questions")
const questionCard = document.querySelector(".questionCards")
const currentTime = document.querySelector("#currentTime")
const initialButton = document.querySelector("#initialButton")
const scoreBoard = document.querySelector(".scoreBoard")
const initials = document.querySelector("#initialText")
let currentQuestion = 0
let score = 0
let time = 60
let timer 

alert("Welcome! You'll have 60 seconds to complete this quiz. If you get a question wrong then you'll have 10 seconds deducted. Click start when you are ready to begin.")


var question = [
    {
        questionTitle: "Some'll win, some will lose Some are born to sing the blues Whoa, the movie never ends It goes on and on and on and on?",
        choices: ["apple", "oranges", "peaches", "grapefruit"],
        answer: "apple"
    },
    
]





// function leaders(){
//     const scoreLeaders = document.querySelector(".scoreLeaders")
//     scoreLeaders.innerHTML="";
//         var scoreLeadersEl= document.createElement("li");
//         scoreLeadersEl.textContent = localStorage.getItem(score)
//         scoreLeadersEl.textContent = localStorage.getItem(initials)
//         leaderBoard.appendChild(scoreLeadersEl)

// }



function endQuiz (){
    questionCard.classList.add("hide");
    scoreBoard.classList.remove("hide")
    let scoreEl = document.createElement("h2")
    scoreEl.textContent = "Congrats your score is: " + score
    scoreBoard.appendChild(scoreEl)
    clearInterval(timer)
    // localStorage.setItem(initials);
    // localStorage.setItem(score)
    // leaders()
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

function openLeaderBoard(){
    scoreBoard.classList.add("hide")
    leaderBoard.classList.remove("hide")
    
}

function saveUserScore() {
    var userScore = {
      user: initials.value,
      currentScore: score.value,
    };
    localStorage.setItem("userScore", JSON.stringify(userScore));
  }
  
  function renderLastScore() {
    var lastScore = JSON.parse(localStorage.getItem("userScore"));
    if (lastScore !== null) {
    document.getElementsByClassName("user-Score").innerHTML = lastScore.user;
    document.getElementsByClassName("user-Score").innerHTML = lastScore.currentScore;
    } else {
      return;
    }
  }


startButton.addEventListener("click", startQuiz)
initialButton.addEventListener("click", function(event) {
    event.preventDefault
    openLeaderBoard();
    saveUserScore();
    renderLastScore();
});
