//Script for clock
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    let period = 'AM';

    if (hours > 12) {
        hours = hours - 12;
        period = 'PM';
    } else if (hours === 12) {
        period = 'PM';
    } else if (hours === 0) {
        hours = 12;
    }

    const hoursString = String(hours).padStart(2, '0');
    const timeString = `${hoursString}:${minutes}:${seconds} ${period}`;
    document.getElementById('link-time').textContent = timeString;
}

setInterval(updateClock, 1000);
updateClock();

//Script for light and dark mode
const modeButton = document.getElementById('link-mode')
const sections = document.querySelectorAll('section')
const icons = document.querySelectorAll('.icon')
let mode = "dark"

modeButton.addEventListener('click', () => {

    if (mode === "dark") {
        mode = "light";

        icons.forEach(icon =>{
            icon.style.background = 'white'
            icon.style.color = "black"
        })
        sections.forEach(section => {
            section.style.backgroundImage = "linear-gradient(to bottom right, white, rgb(189, 186, 186))";
            section.style.border = "2px solid black"
        });
    } else {
        mode = "dark";
        sections.forEach(section => {
            section.style.backgroundImage = "linear-gradient(to bottom right, rgb(26, 26, 26), rgb(66, 66, 66))";
            section.style.border = "2px solid white"
        });
        icons.forEach(icon =>{
            icon.style.background = 'black'
            icon.style.color = "white"
        })
    }
});