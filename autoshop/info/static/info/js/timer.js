
function getStartTime() {
  return localStorage.getItem("countdownStartTime");
}


function setStartTime() {
  const currentTime = new Date().getTime();
  localStorage.setItem("countdownStartTime", currentTime.toString());
}


function resetStartTime() {
  localStorage.removeItem("countdownStartTime");
}

function showRemainingTime() {
  const startTime = getStartTime();

  if (startTime) {
    const elapsedTime = new Date().getTime() - parseInt(startTime, 10);
    const remainingTime = Math.max(3600000 - elapsedTime, 0); 

    const minutes = Math.floor(
      (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    alert(`Оставшееся время: ${minutes} минут ${seconds} секунд`);

    if (remainingTime <= 0) {
      window.location.href = "https://www.google.com/";
      resetStartTime();
    }
  }
}

const startTime = getStartTime();

if (!startTime) {
  setStartTime();
  showRemainingTime();
} else {
  showRemainingTime();
}
