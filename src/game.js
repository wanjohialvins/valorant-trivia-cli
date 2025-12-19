const readline = require("readline");
const questions = require("./questions");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let score = 0;
let currentIndex = 0;
const TIME_LIMIT = 10;

function startGame() {
  console.log("\n🎯 VALORANT TRIVIA GAME");
  console.log("You have 10 seconds per question.\n");

  questions.sort(() => Math.random() - 0.5);
  askQuestion();
}

function askQuestion() {
  if (currentIndex >= questions.length) {
    endGame();
    return;
  }

  const q = questions[currentIndex];
  console.log(`\nQuestion ${currentIndex + 1}: ${q.question}`);
  q.options.forEach((opt, i) => {
    console.log(`${i + 1}. ${opt}`);
  });

  let answered = false;

  const timer = setTimeout(() => {
    if (!answered) {
      answered = true;
      console.log("\n⏰ Time's up!");
      console.log(`The correct answer was: ${q.options[q.answer]}`);
      currentIndex++;
      askQuestion();
    }
  }, TIME_LIMIT * 1000);

  rl.question("\nAnswer (number): ", (input) => {
    if (!answered) {
      answered = true;
      clearTimeout(timer);

      const userAnswer = parseInt(input) - 1;
      if (userAnswer === q.answer) {
        console.log("✅ Correct!");
        score++;
      } else {
        console.log("❌ Wrong!");
        console.log(`The correct answer was: ${q.options[q.answer]}`);
      }

      currentIndex++;
      askQuestion();
    }
  });
}



function endGame() {
  console.log("\n🏁 Game Over!");
  console.log(`Final Score: ${score} / ${questions.length}`);
  rl.close();
}

module.exports = startGame;
