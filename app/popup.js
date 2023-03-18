document.addEventListener("DOMContentLoaded", function() {
 /*   chrome.storage.sync.clear(() => {
    console.log("Storage cleared.");
  }); */
  /* document.getElementById("engaged").addEventListener("click", function() {
    this.classList.add("pressed");
  }); */
  
  let countdown;
  const startButton = document.getElementById("start");
  startButton.addEventListener("click", () => {
    const task = document.getElementById("task").value;
    const duration = document.querySelector('input[name="duration"]:checked').value;

    chrome.storage.sync.get(null, function(items) {
      if (Object.keys(items).length > 0 && items.data) {
          // The data array already exists, add to it the new server and nickname
          items.data.push({task: task, duration, start: Date.now()});
          console.log("Items exist!")
          console.log(items)
      } else {
          // The data array doesn't exist yet, create it
          items.data = [{task: task, duration, start: Date.now()}];
          console.log("Items don't exist! Creating new data array")
          console.log(items)
      }
  
      // Now save the updated items using set
      chrome.storage.sync.set(items, function() {
          console.log('Data successfully saved to the storage!');
      });
  });
    
    //startTimer(duration);
  });

  document.addEventListener('keydown', function(event) {
    console.log("keydown listener has been pressed")
    if (event.key === 'Enter') {
      const focusedElement = document.activeElement;
      if (focusedElement.type === 'radio') {
        const optionId = focusedElement.id;
        console.log(optionId)
        const option = document.getElementById(optionId);
        console.log(option)
        option.checked = true;
      }
    }
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