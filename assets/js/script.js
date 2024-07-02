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

/** After the user enters their name they are taken to the categories page */
function goToCategoriesPage() {
    const button = document.getElementById("name-input-btn");

    function categoriesPageLink() {
        window.location.href = 'categories.html';
    }

    document.addEventListener("keydown", function(event) {
        if (button && event.key === "Enter") {
            categoriesPageLink();
        }
    });

    if (button) {
        button.addEventListener("click", categoriesPageLink);
    }
}

goToCategoriesPage();

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

