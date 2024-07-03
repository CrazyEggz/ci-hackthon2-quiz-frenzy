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

/**
 * Display the user's name on page
 */
function displayUserName() {
    const params = new URLSearchParams(window.location.search); 
    const userName = params.get("name");
    const userNameEl = document.getElementById("user-name");
    userNameEl.innerText = userName;
    console.log(userName);
}

displayUserName();