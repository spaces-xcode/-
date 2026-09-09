const chars = [
  { name: "ياسمين", greet: "مرحباً! أنا ياسمين، سعيدة بلقائك في أول يوم دراسي!", src: "yasmine.jpg" },
  { name: "بشرى", greet: "أهلاً بك! اسمي بشرى، متحمسة جداً لهذا اليوم!", src: "boushra.jpg" },
  { name: "يد", greet: "مرحباً، أنا يد! هيا نصبح أصدقاء.", src: "hand.jpg" },
  { name: "ليمون", greet: "أهلاً! اسمي ليمون، يسعدني التعرف عليكم جميعاً!", src: "lemon.jpg" }
];

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

const introContainer = document.getElementById("intro-cards");
chars.forEach(function (c) {
  const btn = document.createElement("button");
  btn.className = "char-btn";
  const img = document.createElement("img");
  img.src = c.src;
  img.alt = c.name;
  const span = document.createElement("span");
  span.textContent = c.name;
  btn.appendChild(img);
  btn.appendChild(span);
  btn.addEventListener("click", function () {
    const speech = document.getElementById("speech");
    speech.style.display = "block";
    speech.textContent = c.greet;
  });
  introContainer.appendChild(btn);
});

let quizOrder = [];
let qIndex = 0;
let score = 0;

function startQuiz() {
  quizOrder = shuffle(chars);
  qIndex = 0;
  score = 0;
  document.getElementById("intro-view").style.display = "none";
  document.getElementById("end-view").style.display = "none";
  document.getElementById("quiz-view").style.display = "block";
  renderQuestion();
}

function renderQuestion() {
  document.getElementById("feedback").textContent = "";
  const correct = quizOrder[qIndex];
  document.getElementById("quiz-name").textContent = "" + correct.name + "؟";
  document.getElementById("score-label").textContent = "النقاط: " + score;
  document.getElementById("q-label").textContent = "السؤال " + (qIndex + 1) + " من 4";

  const options = shuffle(chars);
  const container = document.getElementById("quiz-options");
  container.innerHTML = "";

  options.forEach(function (opt) {
    const b = document.createElement("button");
    const img = document.createElement("img");
    img.src = opt.src;
    img.alt = opt.name;
    b.appendChild(img);
    b.addEventListener("click", function () {
      const fb = document.getElementById("feedback");
      if (opt.name === correct.name) {
        fb.style.color = "#2f9e44";
        fb.textContent = "إجابة صحيحة! أحسنت";
        score++;
      } else {
        fb.style.color = "#e03131";
        fb.textContent = "حاول مرة أخرى / " + opt.name;
      }
      setTimeout(function () {
        qIndex++;
        if (qIndex >= quizOrder.length) {
          document.getElementById("quiz-view").style.display = "none";
          document.getElementById("end-view").style.display = "block";
          document.getElementById("final-score").textContent = score;
        } else {
          renderQuestion();
        }
      }, 900);
    });
    container.appendChild(b);
  });
}

document.getElementById("start-quiz").addEventListener("click", startQuiz);
document.getElementById("replay").addEventListener("click", startQuiz);
