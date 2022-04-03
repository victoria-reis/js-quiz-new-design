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


//namespace object
const techTestApp = {};

//global variables
techTestApp.apiKey = "GyC8jhRUYRRfOwH3Qnhimw6ybHwhSFmP4C2AZRSZ";
techTestApp.startButton = document.querySelector("#start");
techTestApp.submitButton = document.querySelector("#submit");
techTestApp.h3 = document.querySelector("h3");
techTestApp.form = document.querySelector("#test-form");
techTestApp.fieldset = document.querySelector("fieldset");

//init function
techTestApp.init = function() {
  techTestApp.starter();
  techTestApp.nextQuestion();
};

//step 1: event listenter, hides start button and calls first question
techTestApp.starter = function() {
  techTestApp.startButton.addEventListener("click", function() {
    console.log("clicked!")
    techTestApp.startButton.classList.add("started");
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
    })
  })
}

techTestApp.nextQuestion = function() {
  techTestApp.submitButton.addEventListener("click", function() {
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
    })
  })
}

techTestApp.displayQandA = function(data) {
  const i = 0;
  let question = data[i].question;
  // const answers = Object.values(data[i].answers); // answers array
  let answers = data[i].answers;
  // const correctAnswers = Object.values(data[i].correct_answers); // correct answers array
  let correctAnswers = data[i].correct_answers; // correct answers object

  console.log(question); // question text
  console.log(answers); // answers object
  console.log(correctAnswers); // correct answers object

  techTestApp.h3.innerText = question;

  for(let individualAnswer in answers) {
      if(answers[individualAnswer] !== null) {
        const newLabel = document.createElement("label");
        const newInput = document.createElement("input");
        
        newLabel.for = individualAnswer;
        newLabel.innerText = answers[individualAnswer];
        newInput.type = "radio";
        newInput.id = individualAnswer;
        newInput.value = individualAnswer;
        newInput.name = "option";
        newInput.addEventListener("click", function() {
          console.log(newInput.value);
        })
        techTestApp.fieldset.appendChild(newInput);
        techTestApp.fieldset.appendChild(newLabel);
      }
    }
}


//init call

techTestApp.init();