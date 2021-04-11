function goToInstructions() {
    window.location.href = "instructions.html";
}

function goToGame() {
    window.location.href = "game.html";
}

const howToPlayBtn = document.getElementById("how-to-btn");
const playBtn = document.getElementById("play-btn");

howToPlayBtn.onclick = goToInstructions;
playBtn.onclick = goToGame;