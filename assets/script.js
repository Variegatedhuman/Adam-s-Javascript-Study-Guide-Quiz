const startButton = document.querySelector("#start-button")
const leaderBoard = document.querySelector(".highScoreLeaderboard")
const questions = document.querySelector(".questions")
const questionCard = document.querySelector(".questionCards")
const currentTime = document.querySelector("#currentTime")
const initialButton = document.querySelector("#initialButton")
const scoreBoard = document.querySelector(".scoreBoard")
const initials = document.querySelector("#initialText")
const highScoreBanner = document.querySelector(".highScoreBanner")
const restartButton = document.querySelector("#restart")
const timerDisplay = document.querySelector(".timer")
let highScore = document.querySelector(".scoreLeaders")

let currentQuestion = 0
let score = 0
let time = 60
let timer

alert("Welcome! You'll have 60 seconds to complete this quiz. If you get a question wrong then you'll have 10 seconds deducted. Click start when you are ready to begin.")


let question = [
    {
        questionTitle: "Javascript is an alternative term for which of the following?",
        choices: ["java", "python", "html", "none of the above"],
        answer: "none of the above"
    },

    {
        questionTitle: "The DOM stands for?",
        choices: ["Direct Organizational Material", "Don't Oppose the Machines", "Document Object Model", "none of the above"],
        answer: "Document Object Model"
    },

    {
        questionTitle: "|| is a logical operator which means what?",
        choices: ["Not", "Or", "And", "In-between"],
        answer: "Or"
    },

    {
        questionTitle: "In Javascript % is an Arithmetic Operator which means?",
        choices: ["Remainder", "Percentage", "Division", "none of the above"],
        answer: "Remainder"
    },

    {
        questionTitle: "JSON stands for?",
        choices: ["Jason the creator of Javascript", "Javascript Object Notation", "Javascript Orientation Notation", "none of the above"],
        answer: "Javascript Object Notation"
    },

    {
        questionTitle: "Which removes the last element of an array, and returns that element?",
        choices: ["pop()", "push()", "pounce()", "none of the above"],
        answer: "pop()"
    },

]






// function leaders(){
//     const scoreLeaders = document.querySelector(".scoreLeaders")
//     scoreLeaders.innerHTML="";
//         let scoreLeadersEl= document.createElement("li");
//         scoreLeadersEl.textContent = localStorage.getItem(score)
//         scoreLeadersEl.textContent = localStorage.getItem(initials)
//         leaderBoard.appendChild(scoreLeadersEl)

// }



function endQuiz() {
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

function checkAnswer() {
    console.log(this.dataset.value);

    if (this.dataset.value === question[currentQuestion].answer) {
        alert("CORRECT!")
        score++
    } else {
        alert("Incorrect")
        time -= 10
    }
    currentQuestion++;

    if (currentQuestion >= question.length) {
        endQuiz();
    } else {
        renderQuestion();
    }
}
function renderQuestion() {
    const questionOptions = document.querySelector(".questionOptions")
    questionOptions.innerHTML = "";
    questions.textContent = question[currentQuestion].questionTitle
    for (let index = 0; index < question[currentQuestion].choices.length; index++) {
        let liEl = document.createElement("li");
        liEl.textContent = question[currentQuestion].choices[index]
        liEl.setAttribute("type", "button")
        liEl.setAttribute("data-value", question[currentQuestion].choices[index])
        liEl.classList.add("buttons")
        liEl.addEventListener("click", checkAnswer)
        questionOptions.appendChild(liEl)
    }
}

function timerCountdown() {
    timer = setInterval(() => {
        if (time === 0) {
            clearInterval(timer)
            endQuiz()
        } else {
            time--
            currentTime.textContent = time
        }
    }, 1000);

}

function startQuiz() {
    questionCard.classList.remove("hide");
    startButton.classList.add("hide");
    renderQuestion();
    timerCountdown();
}

function openLeaderBoard() {

    scoreBoard.classList.add("hide")
    leaderBoard.classList.remove("hide")
    highScoreBanner.classList.remove("hide")
    timerDisplay.classList.add("hide")


    // leaderBoard.innerHTML = "Highscores"



}

// function saveUserScore() {
//     let userScore = {
//       user: initials.value,
//       currentScore: score.value,
//     };
//     localStorage.setItem("userScore", JSON.stringify(userScore));
//   }

//   function renderLastScore() {
//     let lastScore = JSON.parse(localStorage.getItem("userScore"));
//     if (lastScore !== null) {
//     document.getElementsByClassName("user-Score").innerHTML = lastScore.user;
//     document.getElementsByClassName("user-Score").innerHTML = lastScore.currentScore;
//     } else {
//       return;
//     }
//   }


startButton.addEventListener("click", startQuiz)
restartButton.addEventListener("click", function () {
    window.location.replace("./index.html");

});

initialButton.addEventListener("click", function () {


    let userData = initials.value;

    if (userData == "" || userData.length == 0 || userData == null) {

        alert("Please enter initials");
        return

    } else {
        let currentScore = {
            userData: userData,
            score: score,
        }
        console.log(currentScore);
        let allScores = localStorage.getItem("allScores");
        if (allScores === null) {
            allScores = [];
        } else {
            allScores = JSON.parse(allScores);
        }
        allScores.push(currentScore);
        let newScore = JSON.stringify(allScores);
        localStorage.setItem("allScores", newScore);
        openLeaderBoard();
    }


    let allScores = localStorage.getItem("allScores");
    allScores = JSON.parse(allScores);

    if (allScores !== null) {

        for (let i = 0; i < allScores.length; i++) {

            let createLi = document.createElement("li");
            createLi.textContent = allScores[i].userData + " scored " + allScores[i].score + " point(s)";
            highScore.appendChild(createLi);

        }
    }
});




