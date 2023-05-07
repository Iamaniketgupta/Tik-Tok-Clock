// Selecting DOM elements
const digitalClockDiv = document.querySelector("#digital-clock");
const analogClockDiv = document.querySelector("#analog-clock");
const analogClockImg = document.querySelector("#analog");
const hourHand = document.querySelector(".hour-hand");
const minuteHand = document.querySelector(".minute-hand");
const secondsHand = document.querySelector(".seconds-hand");

// Digital Clock function
function showDigital() {
  digitalClockDiv.style.display = "block";
  analogClockDiv.style.display = "none";
}

// Analog Clock function
function showAnalog() {
  digitalClockDiv.style.display = "none";
  analogClockDiv.style.display = "block";
}

// Toggle Clock function
function toggleClock() {
  if (digitalClockDiv.style.display === "none") {
    showDigital();
  } else {
    showAnalog();
  }
}

// Updating Clock function
function updateClock() {
  // Digital Clock
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  digitalClockDiv.querySelector("#clock").textContent = `${hours}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  // Analog Clock
  const secondsRatio = seconds / 60;
  const minutesRatio = (secondsRatio + minutes) / 60;
  const hoursRatio = (minutesRatio + hours) / 12;
  setRotation(secondsHand, secondsRatio);
  setRotation(minuteHand, minutesRatio);
  setRotation(hourHand, hoursRatio);
}

// function to set rotation of clock hands
function setRotation(element, rotationRatio) {
  element.style.setProperty("--rotation", (rotationRatio * 360) - 90);
}


// Updating clock every second
setInterval(updateClock, 1000);

// Move clock hands according to the system time
function moveHands() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const hr=30*hours+minutes/2;
  const min=6*minutes;
  const sec=6*seconds;
  secondsHand.style.transform = `rotate(${sec}deg)`;
  minuteHand.style.transform = `rotate(${min}deg)`;
  hourHand.style.transform = `rotate(${hr}deg)`;
  requestAnimationFrame(moveHands);
}

moveHands();
