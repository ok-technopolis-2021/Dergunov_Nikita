document.addEventListener("DOMContentLoader", changeTheme);
function changeTheme() {
    let cv = document.querySelector("#CV").classList
    cv.toggle("dark-theme")
    cv.toggle("light-theme")
}