document.addEventListener("DOMContentLoaded", function() {
/*   chrome.storage.sync.clear(() => {
    console.log("Storage cleared.");
  }); */
  
  let countdown;
  const startButton = document.getElementById("start");
  startButton.addEventListener("click", () => {
    const task = document.getElementById("task").value;
    const duration = document.querySelector('input[name="duration"]:checked').value;

    chrome.storage.sync.set({ task, duration, start: Date.now() });
    startTimer(duration);
  });

  // local timer
/*   function startTimer(duration) {
    let timerDisplay = document.getElementById("timer");
    timerDisplay.style.display = "block";
    let endTime = Date.now() + duration * 1000;
    countdown = setInterval(() => {
      let remainingTime = Math.round((endTime - Date.now()) / 1000);
      if (remainingTime < 0) {
        clearInterval(countdown);
        chrome.windows.create({
          url: "notification.html",
          type: "popup",
          width: 400,
          height: 200
        });
      } else {
        let minutes = Math.floor(remainingTime / 60);
        let seconds = remainingTime % 60;
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
      }
    }, 1000);
  } */

  //TODO: move timer to background
  function startTimer(duration) {
    chrome.runtime.sendMessage({ action: "callMyFunction", task: task, duration: duration, startTime: Date.now }, function(response) {
      console.log(response);
    });
  }
});