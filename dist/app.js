document.addEventListener("DOMContentLoader", changeTheme);
function changeTheme() {
    let body = document.querySelector("body").classList;
    body.toggle("dark-theme");
    body.toggle("light-theme");
}
