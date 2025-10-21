let currentQuestion = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let correctAnswer = 0;
let timeLeft = 600;
let timerInterval;
let gameActive = false;

function generateQuestion() {
    const num1 = Math.floor(Math.random() * 50) + 10;
    const num2 = Math.floor(Math.random() * 50) + 10;
    correctAnswer = num1 + num2;

    document.getElementById("question").textContent = `${num1}+${num2} =`;

    const answers = [correctAnswer];
    while (answers.length < 3) {
        const wrongAnswer =
            correctAnswer + Math.floor(Math.random() * 20) - 10;
        if (wrongAnswer > 0 && !answers.includes(wrongAnswer)) {
            answers.push(wrongAnswer);
        }
    }

    answers.sort(() => Math.random() - 0.5);

    const container = document.getElementById("answersContainer");
    container.innerHTML = "";
    answers.forEach((answer) => {
        const btn = document.createElement("button");
        btn.className = "answer-btn";
        btn.textContent = answer;
        btn.onclick = () => checkAnswer(answer, btn);
        container.appendChild(btn);
    });
}

function checkAnswer(selected, btn) {
    if (!gameActive) return;

    const buttons = document.querySelectorAll(".answer-btn");
    buttons.forEach((b) => (b.style.pointerEvents = "none"));

    if (selected === correctAnswer) {
        correctAnswers++;
        btn.classList.add("correct-answer");
        document.getElementById("correctScore").textContent = correctAnswers;
    } else {
        wrongAnswers++;
        btn.classList.add("wrong-answer");
        document.getElementById("wrongScore").textContent = wrongAnswers;

        buttons.forEach((b) => {
            if (parseInt(b.textContent) === correctAnswer) {
                b.classList.add("correct-answer");
            }
        });
    }

    currentQuestion++;
    document.getElementById("questionCount").textContent = currentQuestion;

    if (currentQuestion >= 20) {
        setTimeout(endGame, 1000);
    } else {
        setTimeout(() => {
            buttons.forEach((b) => {
                b.classList.remove("correct-answer", "wrong-answer");
                b.style.pointerEvents = "auto";
            });
            generateQuestion();
        }, 1000);
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        document.getElementById("timer").textContent = `${minutes}:${seconds
            .toString()
            .padStart(2, "0")}`;

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function startGame() {
    gameActive = true;
    currentQuestion = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    timeLeft = 600;

    document.getElementById("questionCount").textContent = "0";
    document.getElementById("correctScore").textContent = "0";
    document.getElementById("wrongScore").textContent = "0";
    document.getElementById("gameArea").classList.remove("hidden");
    document.getElementById("gameOver").style.display = "none";

    clearInterval(timerInterval);
    startTimer();
    generateQuestion();
}

function endGame() {
    gameActive = false;
    clearInterval(timerInterval);

    document.getElementById("finalScore").textContent = correctAnswers;
    document.getElementById("finalCorrect").textContent = correctAnswers;
    document.getElementById("finalWrong").textContent = wrongAnswers;

    document.getElementById("gameArea").classList.add("hidden");
    document.getElementById("gameOver").style.display = "block";
}

document.getElementById("startBtn").onclick = startGame;

startGame();