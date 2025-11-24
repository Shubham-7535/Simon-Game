let gameSeq = [];
let userSeq = [];
let level = 0;
let started = false;
let btns = ["red", "blue", "green", "purple"];
let highScore = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function() {
    if (!started) {
        console.log("Game Started");
        started = true;
        levelUp();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 100);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.textContent = "Level " + level;
    let randIdx = Math.floor(Math.random() * 4);
    let randomColor = btns[randIdx];
    let randbtn = document.querySelector("." + randomColor);
    gameSeq.push(randomColor);
    console.log(gameSeq);
    btnFlash(randbtn);

}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        if (level > highScore) {
            highScore = level;
        }
        h2.innerHTML = "Game Over! Your score was <b>" + level + "</b>  Press Any Key to Restart";
        h2.innerHTML += "<br>High Score: " + highScore;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 200);
        resetGame();
    }
}

function btnPress() {
    let btn = this;
    btnFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".color-button");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function resetGame() {
    level = 0;
    gameSeq = [];
    userSeq = [];
    started = false;
}