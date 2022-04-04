const techTestApp = {};

techTestApp.apiKey = "GyC8jhRUYRRfOwH3Qnhimw6ybHwhSFmP4C2AZRSZ";
techTestApp.startButton = document.querySelector("#start");
techTestApp.nextButton = document.querySelector("#next");
techTestApp.playAgain = document.querySelector("#playAgain");
techTestApp.playAgainMsg = document.querySelector("#playAgainMsg");
techTestApp.h3 = document.querySelector("h3");
techTestApp.h4 = document.querySelector("h4");
techTestApp.span = document.querySelector("span");
techTestApp.p = document.querySelector("p");
techTestApp.form = document.querySelector("#test-form");
techTestApp.fieldset = document.querySelector("fieldset");
techTestApp.correctIndvidualAnswer;
techTestApp.counter = 0;
techTestApp.score = 0;

techTestApp.init = function() {
  techTestApp.starter();
  techTestApp.nextQuestion();
};


techTestApp.fetchData = function() {
  
}

techTestApp.starter = function() {
  techTestApp.startButton.addEventListener("click", function() {
    techTestApp.url = new URL("https://quizapi.io/api/v1/questions");
    techTestApp.url.search = new URLSearchParams({
        apiKey: techTestApp.apiKey,
        limit: "1",
        category: "Code",
        tags: "javascript",
        difficulty: "easy"
    })
    fetch(techTestApp.url)
    .then(function(response) {
      if (response.ok) {
      return response.json();
      } else {
        throw new Error("Something's broken.")
      }
    })
    .then(function(jsonResponse) {
      techTestApp.displayQandA(jsonResponse);
      techTestApp.testCorrector(jsonResponse);
    })
    .catch(function(error) {
      techTestApp.h3.innerText = error;
    })
    techTestApp.form.style.display = "block";
    techTestApp.startButton.style.display = "none";
    techTestApp.p.style.display = "block";
    techTestApp.nextButton.style.display = "block";
  })
}

techTestApp.nextQuestion = function() {
  techTestApp.nextButton.addEventListener("click", function(event) {
    event.preventDefault();
    techTestApp.clearFieldset();
  
    techTestApp.url = new URL("https://quizapi.io/api/v1/questions");
    techTestApp.url.search = new URLSearchParams({
        apiKey: techTestApp.apiKey,
        limit: "1",
        category: "Code",
        tags: "javascript",
        difficulty: "easy"
    })
    fetch(techTestApp.url)
    .then(function(response) {
      if (response.ok) {
      return response.json();
      } else {
        throw new Error("Something's broken.")
      }
    })
    .then(function(jsonResponse) {
      techTestApp.displayQandA(jsonResponse);
      techTestApp.testCorrector(jsonResponse);
      techTestApp.counter = techTestApp.counter + 1;
      techTestApp.h4.innerText = "";
      techTestApp.gameOver();
    })
    .catch(function(error) {
      techTestApp.h3.innerText = error;
    })
  })
}

techTestApp.displayQandA = function(data) {
  techTestApp.fieldset.disabled = false;
  const i = 0;
  let question = data[i].question;
  let answers = data[i].answers;

  techTestApp.h3.innerText = question;

  for(let individualAnswer in answers) {
      if(answers[individualAnswer] !== null) {
        const newLabel = document.createElement("label");
        const newInput = document.createElement("input");
        
        newLabel.htmlFor = individualAnswer;
        newLabel.innerText = answers[individualAnswer];
        newInput.type = "radio";
        newInput.id = individualAnswer;
        newInput.value = individualAnswer;
        newInput.name = "option";

        newInput.addEventListener("click", function(event) {
            if(techTestApp.correctIndvidualAnswer.includes(newInput.value)) {
              techTestApp.h4.innerText = "CORRECT!";
              techTestApp.h4.style.color = "#48ff00";
              techTestApp.score = techTestApp.score + 1;
              techTestApp.span.innerText = techTestApp.score;
              techTestApp.fieldset.disabled = true;
            } else {
              techTestApp.h4.innerText = "INCORRECT!";
              techTestApp.h4.style.color = "#ff0000";

            }
        })
        techTestApp.fieldset.style.border = "1px white solid";
        techTestApp.fieldset.appendChild(newInput);
        techTestApp.fieldset.appendChild(newLabel);
      }
    }
}
techTestApp.testCorrector = function(data) {
  const i = 0;

  let correctAnswersObj = data[i].correct_answers; 

  for(let individualAnswer in correctAnswersObj) {
    if(correctAnswersObj[individualAnswer] === "true") {
      techTestApp.correctIndvidualAnswer = individualAnswer;
    }
  }
}

techTestApp.gameOver = function() {
  if (techTestApp.counter === 5) {
    techTestApp.clearFieldset();
    techTestApp.nextButton.style.display = "none";
    techTestApp.h3.innerText = "THANKS FOR PLAYING!";
    techTestApp.fieldset.style.border = "none";
    techTestApp.playAgain.style.display = "block";
    techTestApp.playAgainMsg.style.display = "block";
  }
}

techTestApp.clearFieldset = function() {
  techTestApp.fieldset.innerHTML = "";
}

techTestApp.init();