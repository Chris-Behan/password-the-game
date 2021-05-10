function goToGame() {
    window.location.href = "game.html";
}

const playBtn = document.getElementById("play-btn");
playBtn.onclick = goToGame;