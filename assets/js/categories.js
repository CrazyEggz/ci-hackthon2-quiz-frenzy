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