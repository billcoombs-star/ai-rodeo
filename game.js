const character = document.getElementById("character");
const obstacle = document.getElementById("obstacle");
const message = document.getElementById("message");

document.body.onkeyup = function(e) {
  if (e.code === "Space") {
    jump();
  }
};

function jump() {
  if (!character.classList.contains("jump")) {
    character.classList.add("jump");
    setTimeout(() => {
      character.classList.remove("jump");
    }, 600);
  }
}

let isGameOver = false;

let gameInterval = setInterval(() => {
  let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
  let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));

  if (obstacleLeft < 150 && obstacleLeft > 50 && characterTop >= 200) {
    message.innerHTML = "💥 You tripped on an AI Bias Boulder! Game Over.";
    obstacle.style.animation = "none";
    clearInterval(gameInterval);
    isGameOver = true;
  }
}, 10);

// Animate obstacle
function startObstacle() {
  obstacle.style.left = "800px";
  obstacle.style.transition = "none";

  function move() {
    if (isGameOver) return;
    let left = parseInt(obstacle.style.left);
    if (left < -50) {
      obstacle.style.left = "800px";
    } else {
      obstacle.style.left = (left - 5) + "px";
    }
    requestAnimationFrame(move);
  }

  move();
}

startObstacle();
