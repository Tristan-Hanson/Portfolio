//Script for clock
const clock = document.getElementById('link-time')

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
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
    const timeString = `${hoursString}:${minutes} ${period}`;
    clock.textContent = timeString;
}

if(clock){
    setInterval(updateClock, 1000);
    updateClock();
}

//Script for light and dark mode
const modeButton = document.getElementById('link-mode');
const sections = document.querySelectorAll('section');

if (modeButton) {
    modeButton.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');

        sections.forEach(section => {
            section.classList.toggle('light-border');
        });
    });
}

    

