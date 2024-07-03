/** Linking the API Data to the right category */
const API_URL = "https://opentdb.com/api.php?"
const QUESTION_AMOUNT = 10;
const QUESTION_DIFFICULTY = "easy";
const QUESTION_TYPE = "multiple";

let questions;

async function getQuestions() {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('category');

    const apiParams = new URLSearchParams();
    apiParams.set("amount", QUESTION_AMOUNT);
    apiParams.set("category", categoryId);
    apiParams.set("difficulty", QUESTION_DIFFICULTY);
    apiParams.set("type", QUESTION_TYPE);

    const response = await fetch(API_URL + apiParams.toString());
    const data = await response.json();

    if (response.ok) {
        return data.results;
    } else {
        throw new Error(data.error);
    }
}

async function getQuestionNumber(questionNumber) {
    if (!questions) {
        questions = await getQuestions();
    }

    return questions[questionNumber];
} 

function displayFinalResult(userName, score) {
    const resultContainer = document.getElementById('result-container');
    const questionContainer = document.getElementById('question-container');
    questionContainer.style.display = 'none';

    resultContainer.innerHTML = `
        <h2>Congratulations, ${userName}!</h2>
        <p>Your final score is: ${score}</p>
        <button id="play-again-btn">Play Again</button>
        <button id="categories-btn">Choose Another Category</button>
    `;

    document.getElementById('play-again-btn').addEventListener('click', playAgain);
    document.getElementById('categories-btn').addEventListener('click', goToCategories);
}

function playAgain() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('question-container').style.display = 'block';
    document.getElementById('result-container').innerHTML = '';
    showQuestion();
}

function goToCategories() {
    window.location.href = 'categories.html';
}

// Initialize the quiz
showQuestion();