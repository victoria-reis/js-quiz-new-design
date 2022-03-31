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