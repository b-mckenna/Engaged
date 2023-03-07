'use strict';

chrome.runtime.onInstalled.addListener(function () {
    console.log("Extension is loaded.");
});

// background.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.task && request.duration && request.startTime) {
        // Do something with the received data
        console.log(request.task);
        console.log(request.duration);
        console.log(request.startTime);
    }
    if (request.action === "callMyFunction") {
      startTimer(duration);
      sendResponse({ message: "Function called successfully." });
    }

    return new Promise((resolve, reject) => {
        // Resolve the promise with the result
        resolve("success");
        reject("whoops!")
    });
});

function startTimer(duration) {
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
}
