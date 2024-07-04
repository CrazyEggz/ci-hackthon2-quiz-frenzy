/** Linking the API Data to the right category */
const API_URL = "https://opentdb.com/api.php?"
const QUESTION_AMOUNT = 10;
const QUESTION_DIFFICULTY = "easy";
const QUESTION_TYPE = "multiple";
const QUESTION_ENCODING = "url3986";

let questions;

async function getQuestions() {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('category');

    const apiParams = new URLSearchParams();
    apiParams.set("amount", QUESTION_AMOUNT);
    apiParams.set("category", categoryId);
    apiParams.set("difficulty", QUESTION_DIFFICULTY);
    apiParams.set("type", QUESTION_TYPE);
    apiParams.set("encode", QUESTION_ENCODING);

    const response = await fetch(API_URL + apiParams.toString());
    const data = await response.json();

    if (response.ok) {
        return data.results;
    } else {
        throw new Error(data.error);
    }
}

async function getQuestion(questionNumber) {
    if (!questions) {
        questions = await getQuestions();
    }

    return questions[questionNumber];
}

// Questions display

document.addEventListener('DOMContentLoaded', async () => {
    // Variable to keep track of the current question index
    let currentQuestionIndex = 0;
    const answerButtons = document.querySelectorAll('#answer-buttons .btn');
    const nextButton = document.getElementById("next-btn");

    // Function to set a new question and answers
    async function setQuestionAndAnswers(index) {
        const question = await getQuestion(index);

        enableAnswerButtons();
        nextButton.disabled = true;

        // slice duplicates the answers array so we don't modify the original array
        // use splice to insert the correct answer randomly
        const answers = question.incorrect_answers.slice();
        answers.splice(Math.round(Math.random() * answers.length), 0, question.correct_answer);

        const questionElement = document.getElementById('question');
        const answerButtons = document.querySelectorAll('#answer-buttons .btn');

        questionElement.textContent = decodeURIComponent(question.question);
        answerButtons.forEach((button, i) => {
            button.textContent = decodeURIComponent(answers[i]);
        });
    }

    // Display the first question and answers
    setQuestionAndAnswers(currentQuestionIndex);

    // Function to display the next question
    async function displayNextQuestion() {
        // Increment the current question index
        currentQuestionIndex++;

        for (let btn of answerButtons) {
            btn.classList.remove("correct", "incorrect");
        }

        // Check if there are more questions left
        if (currentQuestionIndex < questions.length) {
            await setQuestionAndAnswers(currentQuestionIndex);
        } else {
            displayFinalResult(correctAnswerCount);
        }
    }

    // Disable all answer buttons
    function disableAnswerButtons() {
        for (let btn of answerButtons) {
            btn.disabled = true;
        }
    }

    // Enable all answer buttons
    function enableAnswerButtons() {
        for (let btn of answerButtons) {
            btn.disabled = false;
        }
    }

    // Add event listener to the Next button
    nextButton.addEventListener('click', displayNextQuestion);
    document.getElementById('home-icon').addEventListener('click', goToCategories);

    displayUserName();

    // Counter section
    let correctAnswerCount = 0;
    let incorrectAnswerCount = 0;

    // Increment the correct answer count by 1
    function incrementCorrectAnswerCount() {
        const correctAnswerCountEl = document.querySelector("#correct-answer-count > span");
        correctAnswerCountEl.innerText = ++correctAnswerCount;
    }

    // Increment the incorrect answer count by 1
    function incrementIncorrectAnswerCount() {
        const incorrectAnswerCountEl = document.querySelector("#incorrect-answer-count > span");
        incorrectAnswerCountEl.innerText = ++incorrectAnswerCount;
    }

    // Add event listeners to answer buttons
    answerButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            const currentQuestion = await getQuestion(currentQuestionIndex);

            const selectedBtn = e.target;

            const selectedAnswer = selectedBtn.textContent;
            const correctAnswer = decodeURIComponent(currentQuestion.correct_answer);

            disableAnswerButtons();
            nextButton.disabled = false;

            if (selectedAnswer === correctAnswer) {
                incrementCorrectAnswerCount();
                selectedBtn.classList.add("correct");
            } else {
                incrementIncorrectAnswerCount();
                selectedBtn.classList.add("incorrect");

                for (let btn of answerButtons) {
                    if (btn.innerText === decodeURIComponent(currentQuestion.correct_answer)) {
                        btn.classList.add("correct");
                    }
                }
            }
        });
    });

    // Result display
    function displayFinalResult(score) {
        const userName = getParameter("name");

        const resultContainer = document.getElementById('result-container');
        const questionContainer = document.getElementById('question-container');

        nextButton.style["display"] = "none";
        questionContainer.style.display = 'none';

        resultContainer.innerHTML = `
            <h2>Congratulations, ${userName}!</h2>
            <div id="score-container"><p>Your final score is: ${score}</p></div>
            <button id="play-again-btn" class="btn">Play Again</button>
            <button id="categories-btn" class="btn">Choose Another Category</button>
        `;

        document.getElementById('play-again-btn').addEventListener('click', playAgain);
        document.getElementById('categories-btn').addEventListener('click', goToCategories);
    }

    function playAgain() {
        window.location.reload();
    }

    function goToCategories() {
        const userName = getParameter("name");
        const params = new URLSearchParams();
        params.set("name", userName);
        window.location.href = 'categories.html?' + params.toString();
    }
});
