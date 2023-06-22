const questions = [
    {
        question: "which is the largest animal in the world?",
        answers: [
            { text: "elephant", correct: false },
            { text: "blue whale", correct: true },
            { text: "giraffe", correct: false },
            { text: "lion", correct: false }
        ]
    },
    {
        question: "which is the tallest animal in the world?",
        answers: [
            { text: "elephant", correct: false },
            { text: "lion", correct: false },
            { text: "giraffe", correct: true },
            { text: "shark", correct: false }
        ]

    },
    {
        question: "which is the smallest bird in the world?",
        answers: [
            { text: "eagle", correct: false },
            { text: "peacock", correct: false },
            { text: "humming bird", correct: true },
            { text: "duck", correct: false }
        ]

    },
    {
        question: "which is the king of the jungle?",
        answers: [
            { text: "black tiger", correct: false },
            { text: "lion", correct: true },
            { text: "tiger", correct: false },
            { text: "lepord", correct: false }
        ]

    },
    {
        question: "what is the fastest animal in the world?",
        answers: [
            { text: "cheetah", correct: true },
            { text: "lion", correct: false },
            { text: "snake", correct: false },
            { text: "lepord", correct: false }
        ]
    },
    {
        question: "who is the prime minester of india",
        answers: [
            { text: "modhi", correct: true },
            { text: "jagan", correct: false },
            { text: "pawan kalyan", correct: false },
            { text: "chandrea babu", correct: false }
        ]
    }
    
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("buttons");
const nextButton = document.getElementById("btn-next");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
    nextButton.innerHTML = "Next";
    nextButton.addEventListener("click", handleNextButton);
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.removeEventListener("click", handleNextButton);
    nextButton.addEventListener("click", startQuiz);
    nextButton.style.display = "block";
}

startQuiz();
