
console.log("script.js connected!");

// Store answers selected by the user
let selectedAnswers = {};

// Find all question blocks
const questions = document.querySelectorAll(".question-block");

// Track the selected answer for each question
questions.forEach(function(question) {
  const buttons = question.querySelectorAll(".answer-btn");

  buttons.forEach(function(button) {
    button.addEventListener("click", function() {

      // Remove previous selection
      buttons.forEach(function(btn) {
        btn.classList.remove("selected");
      });

      // Highlight selected answer
      button.classList.add("selected");

      // Save the answer
      const questionNumber = question.dataset.question;
      selectedAnswers[questionNumber] = button.dataset.answer;

      console.log(selectedAnswers);
    });
  });
});

// Calculate and display the result
function displayResult() {
  const resultText = document.getElementById("result-text");

  // Make sure all questions are answered
  if (Object.keys(selectedAnswers).length !== questions.length) {
    resultText.textContent = "Please answer all four questions first!";
    return;
  }

  // Count the answers for each personality
  let scores = {
    academic: 0,
    social: 0,
    athlete: 0,
    procrastinator: 0
  };

  for (let question in selectedAnswers) {
    let answer = selectedAnswers[question];
    scores[answer]++;
  }

  // Find the personality with the highest score
  let highestScore = 0;
  let result = "";

  for (let personality in scores) {
    if (scores[personality] > highestScore) {
      highestScore = scores[personality];
      result = personality;
    }
  }

  // Display the result
  if (result === "academic") {
    resultText.textContent = "You're the Academic! You take school seriously and always stay prepared.";
  } else if (result === "social") {
    resultText.textContent = "You're the Social Butterfly! You love making friends and having a good time.";
  } else if (result === "athlete") {
    resultText.textContent = "You're the Athlete! You enjoy staying active and competing.";
  } else {
    resultText.textContent = "You're the Professional Procrastinator! You always find a way to put things off until later.";
  }
}

// Run the function when Show Results is clicked
document.getElementById("show-result").addEventListener("click", displayResult);
