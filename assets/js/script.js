document.querySelector('body').addEventListener("mousemove", eyeball);

/**
 * To make the eyes on the landing page move, following the mouse cursor.
 */
function eyeball(event) {
    const eye = document.querySelectorAll(".eye");
    eye.forEach(function (eye) {
        let x = (eye.getBoundingClientRect().left + eye.clientWidth / 2);
        let y = (eye.getBoundingClientRect().top + eye.clientHeight / 2);

        let radian = Math.atan2(event.pageX - x, event.pageY - y);
        let rotation = (radian * (180 / Math.PI) * -1) + 90;
        eye.style.transform = "rotate(" + rotation + "deg)";
    });
}



/** Question page structure */

document.addEventListener('DOMContentLoaded', () => {
    // Function to set a new question
    function setQuestion(newQuestion) {
        const questionElement = document.getElementById('question');
        questionElement.textContent = newQuestion;
    }

    // First question
    setQuestion('What is the capital of Colombia?');
});

/*
const questions = [
    {
      question: 'What is the Capital of Colombia?',
      answers: [
        { text: 'Medellin', correct: false },
        { text: 'Cartagena', correct: false },
        { text: 'Bogota', correct: true },
        { text: 'Caracas', correct: false }
      ]
    },
]
*/

let correctAnswerCount = 0;
let incorrectAnswerCount = 0;
/**
 * Increment the correct answer count by 1
 * everytime when a correct answer is selected
 */
function incrementCorrectAnswerCount() {
    const correctAnswerCountEl = document.querySelector("#correct-answer-count > span");
    correctAnswerCountEl.innerText = ++correctAnswerCount;
}

/**
 * Increment the incorrect answer count by 1
 * everytime when an incorrect answer is selected
 */
function incrementIncorrectAnswerCount() {
    const incorrectAnswerCountEl = document.querySelector("#incorrect-answer-count > span");
    incorrectAnswerCountEl.innerText = ++incorrectAnswerCount;
}
