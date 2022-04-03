/* 
Trivia project:

MVP:
- Trivia multiple choice game
  - Make a namespace object i.e. const techTestApp = {},
  with init function and callback,
  create a function that will append the question and answers to the page

  - listen for user interaction 'onclick' and check for correct answer

  - if correct, display "CORRECT", else display "INCORRECT" (Maybe an array of responses to make it feel more 'alive'; stretch goal?)

  - Our api call will specify the following paramaters
    - Specific category: Code
    - Specific tag: JavaScript
    - Specific difficulty: Easy

  - Convert data into json
    - store input and display question with answers
    - based on correct or wrong answer (if statement) display if user's answer is right or wrong
  
  - Keeps score
    - Create a counter that tracks correct answers (if correct answer === true then score++, else currentScore === currentScore)

Stretch goals:

- Shareable results
  - Consider how to track results if questions asked are random (share only question ID without spoiling question/answer? Similar to Wordle, etc)

- Options of difficulties
  - Ask user for difficult input (dropdown list)
    - Easy
    - Intermediate
    - Hard

- Options of categories
  - Ask user for category input (dropdown list)
    - HMTL
    - PHP
*/

//FIRST - NAMESPACE OBJECT
const techTestApp = {};

techTestApp.apiKey = "GyC8jhRUYRRfOwH3Qnhimw6ybHwhSFmP4C2AZRSZ";
techTestApp.startButton = document.querySelector("#start");
techTestApp.nextButton = document.querySelector("#next");
techTestApp.playAgain = document.querySelector("#playAgain");
techTestApp.h3 = document.querySelector("h3");
techTestApp.h4 = document.querySelector("h4");
techTestApp.span = document.querySelector("span");
techTestApp.p = document.querySelector("p");
techTestApp.form = document.querySelector("#test-form");
techTestApp.fieldset = document.querySelector("fieldset");
techTestApp.correctIndvidualAnswer;
techTestApp.counter = 0;
techTestApp.score = 0;

//THIRD - RUN THROUGH INIT ORDER
techTestApp.init = function() {
  techTestApp.starter();
  techTestApp.nextQuestion();
};

//FOURTH - STARTER FUNCTION
techTestApp.starter = function() {
  techTestApp.startButton.addEventListener("click", function() {
    console.log("clicked!")
    techTestApp.url = new URL("https://quizapi.io/api/v1/questions");
    techTestApp.url.search = new URLSearchParams({
        apiKey: techTestApp.apiKey,
        limit: "1",
        category: "Code",
        tags: "javascript",
        difficulty: "easy"
    })
    fetch(techTestApp.url).then(function(response) {
      console.log(response);
      return response.json();
    })
    .then(function(jsonResponse) {
      techTestApp.displayQandA(jsonResponse);
      console.log(jsonResponse);
      techTestApp.testCorrector(jsonResponse);
    })
    techTestApp.form.style.display = "block";
    techTestApp.startButton.style.display = "none";
    techTestApp.p.style.display = "block";
    techTestApp.nextButton.style.display = "block";
  })
}

//SIXTH - MOVE TO NEXT QUESTION ON SUBMIT CLICK
techTestApp.nextQuestion = function() {
    techTestApp.nextButton.addEventListener("click", function(event) {
      console.log(techTestApp.counter);  
      event.preventDefault();
      techTestApp.clearFieldset();
      console.log("clicked!");
  
      techTestApp.url = new URL("https://quizapi.io/api/v1/questions");
      techTestApp.url.search = new URLSearchParams({
          apiKey: techTestApp.apiKey,
          limit: "1",
          category: "Code",
          tags: "javascript",
          difficulty: "easy"
      })
      fetch(techTestApp.url).then(function(response) {
        console.log(response);
        return response.json();
      })
      .then(function(jsonResponse) {
        techTestApp.displayQandA(jsonResponse);
        console.log(jsonResponse);
        techTestApp.testCorrector(jsonResponse);
        techTestApp.counter = techTestApp.counter + 1;
        techTestApp.gameOver();
      })
    })
}

// IS THE GAME OVER?
techTestApp.gameOver = function() {
  if (techTestApp.counter === 5) {
    console.log("GAME OVER");
    techTestApp.clearFieldset();
    techTestApp.nextButton.style.display = "none";
    techTestApp.h3.innerText = "THANKS FOR PLAYING!";
    techTestApp.fieldset.style.border = "none";
    techTestApp.playAgain.style.display = "block";
  }
}

//FIFTH - DISPLAY QUESTION AND ANSWERS
techTestApp.displayQandA = function(data) {
  techTestApp.fieldset.disabled = false;
  const i = 0;
  let question = data[i].question;
  // const answers = Object.values(data[i].answers); // answers array
  let answers = data[i].answers;

  // console.log(question); // question text
  // console.log(answers); // answers object
  // console.log(correctAnswers); // correct answers object

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
          console.log(newInput.value);
            if(techTestApp.correctIndvidualAnswer.includes(newInput.value)) {
              console.log("answer is correct");
              techTestApp.h4.innerText = "CORRECT!";
              techTestApp.h4.style.color = "#48ff00";
              techTestApp.score = techTestApp.score + 1;
              techTestApp.span.innerText = techTestApp.score;
              techTestApp.fieldset.disabled = true;
            } else {
              console.log("answer is wrong");
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
//TEST CHECKER
techTestApp.testCorrector = function(data) {
  const i = 0;
  // const correctAnswers = Object.values(data[i].correct_answers); // correct answers array
  let correctAnswersObj = data[i].correct_answers; // correct answers object

  console.log(correctAnswersObj)
  for(let individualAnswer in correctAnswersObj) {
    if(correctAnswersObj[individualAnswer] === "true") {
      techTestApp.correctIndvidualAnswer = individualAnswer;
    }
  }
  console.log(techTestApp.correctIndvidualAnswer);
}

techTestApp.clearFieldset = function() {
  techTestApp.fieldset.innerHTML = "";
}

//SECOND - INITIALIZE APP
techTestApp.init();