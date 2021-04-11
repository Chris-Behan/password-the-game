let numTeams = 0;
const twoTeams = document.getElementById("two");
const threeTeams = document.getElementById("three");
const fourTeams = document.getElementById("four");

twoTeams.onclick = function () {
    start(2);
}

threeTeams.onclick = function () {
    start(3);
}

fourTeams.onclick = function () {
    start(4);
}

function start(numTeams) {
    const gameContainer = document.getElementById("game-container");
    const gameplay = document.getElementById("gameplay");
    const gameplayContent = document.importNode(gameplay.content, true)
    gameContainer.replaceWith(gameplayContent)

    let seconds = 10;
    const timer = document.getElementById("timer")
    timer.innerText = seconds;
    const countdown = setInterval(function () {
        if (seconds == 0) {
            clearInterval(countdown)
            return;
        }
        seconds -= 1;
        timer.innerText = seconds

    }, 1000);
}


