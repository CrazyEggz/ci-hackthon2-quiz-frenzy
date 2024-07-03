const API_URL = "https://opentdb.com/api.php?"
const API_KEY = "amount=10&category=17&difficulty=easy&type=multiple"

/** When category is clicked, user is directed to questions page of chosen category */
document.querySelectorAll('.category-box').forEach(function (button) {
    console.log(button)
    button.onclick = function () {
        const categoryId = button.getAttribute('data-category-id');
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('category', categoryId);
        const newUrl = 'questions.html?' + urlParams.toString();
        window.location.href = newUrl;
    }
})

// async function getCategory {
//     const queryString = `${API_URL}?api_key=${API_KEY}`;

//     const reponse = await fetch(queryString);
// }