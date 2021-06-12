import { passwords } from "./passwords.js"

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

class Timer {
    constructor(seconds, btn, display) {
        this.initial = seconds;
        this.seconds = seconds;
        this.running = false;
        this.display = display;
        this.display.innerText = this.seconds;
        this.button = btn
        this.intervalID;
    }
    start() {
        this.intervalID = setInterval((function () {
            if (this.seconds == 0) {
                return;
            }
            this.seconds -= 1;
            this.display.innerText = this.seconds;
        }).bind(this), 1000)
    }

    stop() {
        clearInterval(this.intervalID);
    }

    reset() {
        this.running = false;
        clearInterval(this.intervalID)
        this.button.innerText = "Start timer";
        this.seconds = this.initial;
        this.display.innerText = this.seconds;
    }

}

function start(numTeams) {
    const scoreToWin = 10;
    intitialize(numTeams, scoreToWin);
}

function intitialize(numTeams, scoreToWin) {
    const gameContainer = document.getElementById("game-container");
    const gameplayTemplate = document.getElementById("gameplay");
    const gameplayContent = document.importNode(gameplayTemplate.content, true)
    gameContainer.replaceWith(gameplayContent)

    const password = document.getElementById("password");
    password.innerText = getPassword();
    const newPasswordBtn = document.getElementById("new-password-btn");
    newPasswordBtn.onclick = function () {
        password.innerText = getPassword();
    }

    const timerBtn = document.getElementById("start-stop-btn")
    const timerDisplay = document.getElementById("timer");
    const timer = new Timer(60, timerBtn, timerDisplay);
    timerBtn.onclick = function () {
        if (timer.running) {
            timer.stop();
            timer.running = false;
            timerBtn.innerText = "Start timer"
        } else {
            timer.start();
            timer.running = true;
            timerBtn.innerText = "Stop timer"
        }
    }

    const resetBtn = document.getElementById("reset-btn")
    resetBtn.onclick = timer.reset.bind(timer);

    const teamList = document.getElementById("team-list");
    const teamTemplate = document.getElementById("team")
    let scores = new Map();
    for (let i = 1; i <= numTeams; i++) {
        const teamNode = document.importNode(teamTemplate.content, true);
        teamNode.querySelector("div").id = `team-${i}`;
        teamNode.querySelector("#team-name").innerText = `Team ${i}`;
        scores.set(i, 0);
        connectScoreCounters(teamNode, i, scores, scoreToWin)
        teamList.append(teamNode);
    }
    return scores;
}

function connectScoreCounters(teamNode, teamNum, scores, scoreToWin) {
    let teamScore = teamNode.querySelector("#score");

    const plusBtn = teamNode.querySelector("#plus");
    plusBtn.onclick = function () {
        const newScore = scores.get(teamNum) + 1;
        scores.set(teamNum, newScore);
        teamScore.innerText = newScore;
        if (newScore == scoreToWin) {
            handleWinner(teamNum, scores);
        }
    }

    const minusBtn = teamNode.querySelector("#minus");
    minusBtn.onclick = function () {
        if(scores.get(teamNum) > 0){
            const newScore = scores.get(teamNum) - 1;
            scores.set(teamNum, newScore);
            teamScore.innerText = newScore;
        }
    }
}

function drawScores(scores, val) {
    for (let i = 0; i < scores.length; i++) {
        const score = scores[i];
        score.innerText = val
    }
}

function handleWinner(teamNum, scores) {
    // timeout before alerting so that browser has time to render
    // winning score
    setTimeout(() => alert(`Team ${teamNum} wins!`), 10)
    for (let i = 1; i <= scores.size; i++) {
        scores.set(i, 0)
    }
    const teamList = document.querySelector("#team-list");
    const scoreList = teamList.querySelectorAll("#score");
    drawScores(scoreList, 0);
}

function getPassword() {
    // Random integer between 0 and length of passwords
    const rand = Math.floor(Math.random() * passwords.length);
    return passwords[rand];
}

