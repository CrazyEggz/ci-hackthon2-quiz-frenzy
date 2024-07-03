function getParameter(paramName) {
    const params = new URLSearchParams(window.location.search); 
    return params.get(paramName);
}

/**
 * Display the user's name on page
 */
function displayUserName() {
    const userNameEl = document.getElementById("user-name");
    userNameEl.innerText = getParameter("name");
}