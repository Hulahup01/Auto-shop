let radioBannerId = 1;
document.getElementById("radio" + radioBannerId).checked = true;
radioBannerId++;
let rotationDelay = 5000;
let rotationTimerId;

function startTimer() {
  rotationTimerId = setInterval(function () {
    document.getElementById("radio" + radioBannerId).checked = true;
    radioBannerId++;
    if (radioBannerId > 4) {
      radioBannerId = 1;
    }
  }, rotationDelay);
}

function updateRotationInterval() {
  var newInterval = parseInt(document.getElementById("rotation-interval").value) * 1000;
  if (!isNaN(newInterval) && newInterval > 0) {
      rotationDelay = newInterval;
      clearInterval(rotationTimerId);
      startTimer();
  }
}

function radioClicked(radio) {
  radioBannerId = radio.id.slice(-1);
}

window.addEventListener("focus", function () {
  clearInterval(rotationTimerId);
  startTimer();
});


window.addEventListener("blur", function () {
  clearInterval(rotationTimerId);
});

startTimer();
