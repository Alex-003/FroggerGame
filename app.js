const timeLeftDisplay = document.querySelector("#time-left");
const resultDisplay = document.querySelector("#result");
const buttonStartPause = document.querySelector("#start-pause-button");
const squares = document.querySelectorAll(".grid div");

const logLeft = document.querySelectorAll(".log-left");
const logRight = document.querySelectorAll(".log-right");

const carLeft = document.querySelectorAll(".car-left");
const carRight = document.querySelectorAll(".car-right");

const width = 9;
let currentIndex = 76;
let timerId;
let outcomeTimerId;
let currentTime = 20;

//move frog
function moveFrog(event) {
  squares[currentIndex].classList.remove("frog");

  if (event.type === "keydown") {
    switch (event.key) {
      case "ArrowLeft":
        if (currentIndex % width !== 0) {
          currentIndex -= 1;
        }
        break;
      case "ArrowRight":
        if (currentIndex % width < width - 1) {
          currentIndex += 1;
        }
        break;
      case "ArrowUp":
        if (currentIndex - width >= 0) {
          currentIndex -= width;
        }
        break;
      case "ArrowDown":
        if (currentIndex + width < width * width) {
          currentIndex += width;
        }
        break;
    }
  } else if (event.type === "touchstart") {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
  } else if (event.type === "touchend") {
    touchEndX = event.changedTouches[0].clientX;
    touchEndY = event.changedTouches[0].clientY;

    var deltaX = touchEndX - touchStartX;
    var deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0 && currentIndex % width < width - 1) {
        currentIndex += 1;
      } else if (deltaX < 0 && currentIndex % width !== 0) {
        currentIndex -= 1;
      }
    } else {
      if (deltaY > 0 && currentIndex + width < width * width) {
        currentIndex += width;
      } else if (deltaY < 0 && currentIndex - width >= 0) {
        currentIndex -= width;
      }
    }
  }

  squares[currentIndex].classList.add("frog");
}

document.addEventListener("touchstart", moveFrog);
document.addEventListener("touchend", moveFrog);


function autoMoveElements() {
  currentTime--;
  timeLeftDisplay.textContent = currentTime;
  logLeft.forEach((logLeft) => moveLogLeft(logLeft));
  logRight.forEach((logRight) => moveLogRight(logRight));
  carLeft.forEach((carLeft) => moveCarLeft(carLeft));
  carRight.forEach((carRight) => moveCarRight(carRight));
}

function checkOutComes() {
  loose();
  win();
}

function moveLogLeft(logLeft) {
  const classes = ["l1", "l2", "l3", "l4", "l5"];
  const currentClass = classes.findIndex((cls) =>
    logLeft.classList.contains(cls)
  );
  const nextClass = classes[(currentClass + 1) % classes.length];
  logLeft.classList.replace(classes[currentClass], nextClass);
}

function moveLogRight(logRight) {
  const classes = ["l1", "l2", "l3", "l4", "l5"];
  const currentClass = classes.findIndex((cls) =>
    logRight.classList.contains(cls)
  );
  const nextClass =
    classes[(currentClass + classes.length - 1) % classes.length];
  logRight.classList.replace(classes[currentClass], nextClass);
}

function moveCarLeft(carLeft) {
  const classes = ["c1", "c2", "c3"];
  const currentClass = classes.findIndex((cls) =>
    carLeft.classList.contains(cls)
  );
  const nextClass = classes[(currentClass + 1) % classes.length];
  carLeft.classList.replace(classes[currentClass], nextClass);
}

function moveCarRight(carRight) {
  const classes = ["c1", "c2", "c3"];
  const currentClass = classes.findIndex((cls) =>
    carRight.classList.contains(cls)
  );
  const nextClass =
    classes[(currentClass + classes.length - 1) % classes.length];
  carRight.classList.replace(classes[currentClass], nextClass);
}

//areas where you loose
function loose() {
  if (
    squares[currentIndex].classList.contains("c1") ||
    squares[currentIndex].classList.contains("l4") ||
    squares[currentIndex].classList.contains("l5") ||
    currentTime <= 0
  ) {
    resultDisplay.textContent = "You lose!";
    clearInterval(timerId);
    clearInterval(outcomeTimerId);
    squares[currentIndex].classList.remove("frog");
    document.removeEventListener("keyup", moveFrog);
  }
}

function win() {
  if (squares[currentIndex].classList.contains("ending-block")) {
    resultDisplay.textContent = "You win!";
    clearInterval(timerId);
    clearInterval(outcomeTimerId);
    document.removeEventListener("keyup", moveFrog);
  }
}

document.addEventListener("keyup", moveFrog);

buttonStartPause.addEventListener("click", () => {
  if (timerId) {
    clearInterval(timerId);
    clearInterval(outcomeTimerId);
    outcomeTimerId = null;
    timerId = null;
  } else {
    timerId = setInterval(autoMoveElements, 1000);
    outcomeTimerId = setInterval(checkOutComes, 50);
  }
});
