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

    document.addEventListener("keydown", function(event) {
        const button = document.getElementById("name-button");
        if (button && event.key === "Enter") {
            window.location.href = 'categories.html';
        }
    });
}

goToCategoriesPage();