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