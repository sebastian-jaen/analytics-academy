const queryParams = new URLSearchParams(window.location.search);
const quizNumber = queryParams.get("quiz") || "1";
const quizPath = `data/quiz${quizNumber}.json`;

let currentQuestion = 0;
let quizData = [];
let userAnswers = [];

fetch(quizPath)
  .then(res => res.json())
  .then(data => {
    quizData = data.questions;
    document.getElementById('quiz-title').textContent = data.title;
    showQuestion(0);
  });
function showQuestion(idx) {
  const container = document.getElementById('question-container');
  container.innerHTML = '';
  const q = quizData[idx];

  const block = document.createElement('div');
  block.className = 'quiz-question';
  block.innerHTML = `<h3>${idx+1}. ${q.question}</h3>`;
  q.options.forEach((opt, i) => {
    // Check if userAnswers[idx] matches this option (1-based)
    const checked = (userAnswers[idx] === (i+1)) ? 'checked' : '';
    block.innerHTML += `
      <label>
        <input type="radio" name="q${idx}" value="${i+1}" ${checked}>
        ${opt}
      </label>`;
  });
  container.appendChild(block);

  // Controls
  document.getElementById('prev-btn').disabled = idx === 0;
  document.getElementById('next-btn').style.display = idx === quizData.length-1 ? 'none' : 'inline-block';
  document.getElementById('submit-btn').style.display = idx === quizData.length-1 ? 'inline-block' : 'none';
}

// Next / Prev
document.getElementById('next-btn').addEventListener('click', () => {
  saveAnswer();
  currentQuestion++;
  showQuestion(currentQuestion);
});
document.getElementById('prev-btn').addEventListener('click', () => {
  saveAnswer();
  currentQuestion--;
  showQuestion(currentQuestion);
});

// Submit
document.getElementById('submit-btn').addEventListener('click', () => {
  saveAnswer();
  let score = 0;
  let resultHTML = '';

  quizData.forEach((q, i) => {
    const user = userAnswers[i];
    const correct = q.answer;
    const userLabel = user
      ? `${user}. ${q.options[user - 1]}`
      : "<em>No answer selected</em>";
    const correctLabel = `${correct}. ${q.options[correct - 1]}`;
    const isCorrect = user === correct;

    resultHTML += `
      <div style="margin-bottom:16px; padding:10px; border-radius:6px; background:${isCorrect ? '#e6ffe6' : '#fff7f7'};">
        <strong>Q${i + 1}: ${q.question}</strong><br>
        Your answer: <span style="color:${isCorrect ? 'green' : 'red'}">${userLabel}</span><br>
        Correct answer: <span style="color:green">${correctLabel}</span>
      </div>
    `;

    if (isCorrect) score++;
  });

  document.getElementById('result-container').innerHTML =
    `<h3>You scored ${score} out of ${quizData.length}.</h3><hr>` + resultHTML;

  // Optional: disable navigation/buttons after submission
  document.getElementById('next-btn').disabled = true;
  document.getElementById('prev-btn').disabled = true;
  document.getElementById('submit-btn').disabled = true;
  document.getElementById('retry-btn').style.display = 'inline-block';
  document.getElementById('retry-btn').addEventListener('click', () => {
    currentQuestion = 0;
    userAnswers = [];  // Reset user answers
    showQuestion(currentQuestion);
    document.getElementById('result-container').innerHTML = '';
    document.getElementById('next-btn').disabled = false;
    document.getElementById('prev-btn').disabled = false;
    document.getElementById('submit-btn').disabled = false;
    document.getElementById('retry-btn').style.display = 'none';
  });
});

function saveAnswer() {
  const radios = document.querySelectorAll(`input[name="q${currentQuestion}"]`);
  radios.forEach(radio => {
    if(radio.checked) {
      userAnswers[currentQuestion] = parseInt(radio.value);  // Store 1-based answer
    }
  });
}
