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

document.addEventListener('DOMContentLoaded', () => {
    // Array of temporary questions
    const questions = [
        'What is the capital of Colombia?',
        'What is the capital of France?',
        'What is 2 + 2?',
        'What is the capital of Japan?',
        'What is the largest planet in our solar system?'
    ];

    // Array of temporary answers 
    const answers = [
        ['Bogotá', 'Paris', 'Berlin', 'Lisbon'],
        ['Paris', 'London', 'Rome', 'Madrid'],
        ['3', '4', '5', '6'],
        ['Tokyo', 'Beijing', 'Seoul', 'Bangkok'],
        ['Earth', 'Mars', 'Jupiter', 'Saturn']
    ];

    // Variable to keep track of the current question index
    let currentQuestionIndex = 0;

    // Function to set a new question and answers
    function setQuestionAndAnswers(index) {
        const questionElement = document.getElementById('question');
        const answerButtons = document.querySelectorAll('#answer-buttons .btn');

        questionElement.textContent = questions[index];
        answerButtons.forEach((button, i) => {
            button.textContent = answers[index][i];
        });
    }

    // Display the first question and answers
    setQuestionAndAnswers(currentQuestionIndex);

    // Function to display the next question
    function displayNextQuestion() {
        // Increment the current question index
        currentQuestionIndex++;

        // Check if there are more questions left
        if (currentQuestionIndex < questions.length) {
            setQuestionAndAnswers(currentQuestionIndex);
        } else {
            setQuestionAndAnswers(currentQuestionIndex - 1); // Display last question with answers
            document.getElementById('question').textContent = "You have completed the quiz!";
            document.querySelectorAll('#answer-buttons .btn').forEach(button => {
                button.disabled = true;
            });
            document.getElementById('next-btn').disabled = true;
        }
    }

    // Add event listener to the Next button
    document.getElementById('next-btn').addEventListener('click', displayNextQuestion);

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
    const answerButtons = document.querySelectorAll('#answer-buttons .btn');
    answerButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Placeholder: Replace with actual answer checking logic
            const selectedAnswer = e.target.textContent;
            const correctAnswer = answers[currentQuestionIndex].find(answer => answer === selectedAnswer); // Simplified check

            if (selectedAnswer === correctAnswer) {
                incrementCorrectAnswerCount();
            } else {
                incrementIncorrectAnswerCount();
            }
        });
    });
});
