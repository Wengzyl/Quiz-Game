const questions = [
    {
        question: "What is input device that controls a cursor in a display?",
        answers: [
            { text: "Mouse", correct: true },
            { text: "Mousepad", correct: false },
            { text: "Keyboard", correct: false },
            { text: "Monitor", correct: false },
        ]
    },
    {
        question: "It is used to connect to a computer to generate sound, which is one of the most common output devices?",
        answers: [
            { text: "Speaker", correct: true },
            { text: "Microphone", correct: false },
            { text: "Graphics Card", correct: false },
            { text: "Motherboard", correct: false },
        ]
    },
    {
        question: "It is a device that allows a computer to keep running for at least a short time when the primary power source is lost?",
        answers: [
            { text: "Ups", correct: true },
            { text: "Cpu", correct: false },
            { text: "Hdd/Sdd", correct: false },
            { text: "Power Supply", correct: false },
        ]
    },
    {
        question: "Which component is considered the brain of the computer?",
        answers: [
            { text: "Hard Drive", correct: false },
            { text: "RAM", correct: false },
            { text: "CPU", correct: true },
            { text: "Graphics Card", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    nextButton.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
