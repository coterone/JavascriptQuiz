// Select elements from the DOM
var timer = document.querySelector(".timer");
var countdown = document.querySelector("#timerCountdown");
var time = 75;
var quiz = document.querySelector("#quiz");
var parentQuestion = document.querySelector(".question");
var answers = document.querySelector(".answers");
var btn = document.createElement("button");
var options = [btn, btn, btn, btn];
var card = document.querySelector(".card-body");
var shuffledQuestions, currentQuestionIndex;
var initialsForm = document.querySelector(".initials-form");
var initialsInput = document.getElementById("initials");
var submitButton = document.getElementById("submit-button");

// Define the questions
var questions = [
  //Question 1
  {
    question: "Commonly used data types DO NOT include:",
    options: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  //Question 2
  {
    question:
      "The condition in an 'if/else' statement is enclosed within ______.",
    options: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
  },
  //Question 3
  {
    question: "Arrays in Javascript can be used to store ______.",
    options: [
      "numbers & strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    answer: "all of the above",
  },
  //Question 4
  {
    question:
      "String values must be enclosed within ______ when being assigned to variables.",
    options: ["commas", "curly brackets", "quotes", "parantheses"],
    answer: "quotes",
  },
  //Question 5
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: ["Javascript", "terminal/bash", "for loops", "console.log"],
    answer: "console.log",
  },
];

// this hides the timer until the quiz is started
timer.style.display = "none";

// event listener to the startButton
var startButton = document.querySelector(".start-btn");
startButton.addEventListener("click", startQuestion);

// Function to start the quiz
function startQuestion() {
  // hide all elements in instruction card
  card.classList.add("hide");
  timer.style.display = "block";
  // start the clock
  var countdownInt = setInterval(function () {
    if (time === 0) {
      clearInterval(countdownInt);
      endQuiz();
    } else if (questions.length - 1 === currentQuestionIndex) {
      clearInterval(countdownInt);
    } else {
      countdown.textContent = time;
      time--;
    }
  }, 1000);

  // Display the questions
  parentQuestion.classList.remove("hide");
  // Shuffle questions
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  setNextQuestion();
}

function setNextQuestion() {
  console.log("Questions array length:", questions.length);
  console.log("Current question index:", currentQuestionIndex);
  if (questions.length == currentQuestionIndex) {
    endQuiz();
  } else {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  }
}

function showQuestion(currentQuestion) {
  console.log("Question:", currentQuestion.question);
  answers.innerHTML = "";
  quiz.innerText = currentQuestion.question;
  currentQuestion.options.forEach((option) => {
    var button = document.createElement("button");
    button.innerText = option;
    button.classList.add("btn");
    button.addEventListener("click", checkAnswer);
    answers.appendChild(button);
    answers.appendChild(document.createElement("br"));
  });
}

function checkAnswer() {
  var textBtn = this.innerText;
  if (textBtn === shuffledQuestions[currentQuestionIndex].answer) {
    this.style.backgroundColor = "green";
    this.style.color = "green";
  } else {
    this.style.backgroundColor = "red";
    this.style.color = "red";
    time -= 10;
  }
  currentQuestionIndex++;
  setTimeout(setNextQuestion, 200);
}

function endQuiz() {
  answers.innerHTML = "";
  quiz.innerText = "All done!";
  answers.innerText = "Your score is a " + time;
  answers.style = "font-size: 20px; text-align: center";
  initialsForm.classList.remove("hide");
}

submitButton.addEventListener("click", storeData);

// Local Storage
function storeData() {
  if (initialsInput.value.length > 3) {
    alert("Initials must be 3 letters!");
  } else {
    // Retrieve the existing data from local storage
    var users = JSON.parse(localStorage.getItem("users")) || [];

    // Add the new user to the array
    users.push({
      initials: initialsInput.value,
      score: time,
    });

    // Store the updated array back in local storage
    localStorage.setItem("users", JSON.stringify(users));

    setTimeout(function () {
      window.location.reload();
    }, 1000);
  }
}

//TODO:
// When highscores is clicked, possibly link it to another html with a list of highscores.
// have noticed if i take the test really fast, the timer cant keep up?
