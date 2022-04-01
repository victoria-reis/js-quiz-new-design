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

const techTestApp = {};

techTestApp.apiKey = "GyC8jhRUYRRfOwH3Qnhimw6ybHwhSFmP4C2AZRSZ";

techTestApp.init = function() {
};

techTestApp.url = new URL("https://quizapi.io/api/v1/questions");
techTestApp.url.search = new URLSearchParams({
    apiKey: techTestApp.apiKey,
    category: "Code",
    tags: "javascript",
    difficulty: "easy"
})

fetch(techTestApp.url)
.then(function(response) {
  // console.log(response);
  return response.json();
})
.then(function(jsonResponse) {
  // console.log(jsonResponse);

  const question1 = jsonResponse[0].question;

  const answers1 = jsonResponse[0].answers;
  const answerArray1 = Object.values(answers1);

  // const correctAnswer1 = jsonResponse[0].correct_answer[0];

  const correctAnswers1 = jsonResponse[0].correct_answers;
  const correctAnswersArray1 = Object.values(correctAnswers1);

  //appending the question
  const h3 = document.querySelector("h3");
  h3.innerText = question1;

  //appending the answers below, so long as the answer doesn't contain a null value
  const ul = document.querySelector("ul");
  for(i = 0; i < answerArray1.length; i++) {
  if(answerArray1[i] !== null) {
    const li = document.createElement("li");
    li.innerText = answerArray1[i];
    ul.appendChild(li);
  }
}
//once answers are listed, run event listener for options clicked
techTestApp.answerSelect();

console.log(question1);
console.log(answerArray1);
// console.log(correctAnswer1);
console.log(correctAnswersArray1);
})

techTestApp.answerSelect = function() {
  const options = document.querySelectorAll("li");
  
  options.forEach(function(clickOption) {
    clickOption.addEventListener("click", function() {
      document.querySelectorAll("li").classList.toggle("selected");
      console.log("Something was clicked!");
    })
  })
};


techTestApp.init();