'use strict';

chrome.runtime.onInstalled.addListener(function () {
    console.log("Extension is loaded.");
});

   
// Set the timer element to the selected duration
var timerEl = document.getElementById('timer');
timerEl.innerText = duration;

    
// Start the countdown
var countdownInterval = setInterval(function() {
    // Decrement the duration
    durationInMillis -= 1000;
    var remainingMinutes = Math.floor(durationInMillis / 60000);
    var remainingSeconds = Math.floor((durationInMillis % 60000) / 1000);

    // Update the timer element
    requestAnimationFrame(function() {
      timerEl.innerText = remainingMinutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds;
    });

    // Check if the countdown is finished
    if (durationInMillis <= 0) {
        clearInterval(countdownInterval);
        alert("Time's up!");
    }
}, 1000);
