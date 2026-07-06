const questions = [
  {
    question: "日本の国会議事堂がある都市はどこでしょう？",
    choices: ["大阪府大阪市", "東京都千代田区", "京都府京都市", "神奈川県横浜市"],
    correctIndex: 1,
  },
  {
    question: "1年(平年)は何日でしょう？",
    choices: ["360日", "365日", "366日", "370日"],
    correctIndex: 1,
  },
  {
    question: "「一石二鳥」という言葉の意味として正しいものはどれでしょう？",
    choices: [
      "一つの行動で二つの利益を得ること",
      "石を投げて鳥を追い払うこと",
      "二つの失敗を一度にすること",
      "遠回りをして目的を達成すること",
    ],
    correctIndex: 0,
  },
  {
    question: "水を構成する元素の組み合わせとして正しいものはどれでしょう？",
    choices: ["炭素と酸素", "水素と酸素", "窒素と水素", "酸素と窒素"],
    correctIndex: 1,
  },
  {
    question: "日本で標高が最も高い山はどれでしょう？",
    choices: ["北岳", "穂高岳", "富士山", "槍ヶ岳"],
    correctIndex: 2,
  },
  {
    question: "世界で最も面積が大きい大陸はどれでしょう？",
    choices: ["アフリカ大陸", "ユーラシア大陸", "北アメリカ大陸", "南アメリカ大陸"],
    correctIndex: 1,
  },
  {
    question: "「灯台下暗し」という言葉の意味として正しいものはどれでしょう？",
    choices: [
      "遠くのことほどよく見えること",
      "灯台の近くは船が通れないこと",
      "身近なことほどかえって気づきにくいこと",
      "暗闇では灯台の光が頼りになること",
    ],
    correctIndex: 2,
  },
  {
    question: "人体の中で最も大きい臓器はどれでしょう？",
    choices: ["肝臓", "皮膚", "肺", "小腸"],
    correctIndex: 1,
  },
  {
    question: "1リットルは何ミリリットルでしょう？",
    choices: ["10ミリリットル", "100ミリリットル", "1000ミリリットル", "10000ミリリットル"],
    correctIndex: 2,
  },
  {
    question: "日本の47都道府県の中で最も面積が広いのはどこでしょう？",
    choices: ["岩手県", "福島県", "長野県", "北海道"],
    correctIndex: 3,
  },
];

let currentIndex = 0;
let score = 0;

const questionCounterEl = document.getElementById("question-counter");
const questionTextEl = document.getElementById("question-text");
const choicesEl = document.getElementById("choices");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const resultTextEl = document.getElementById("result-text");
const restartBtn = document.getElementById("restart-btn");

function loadQuestion() {
  const current = questions[currentIndex];

  questionCounterEl.textContent = `第${currentIndex + 1}問 / 全${questions.length}問`;
  questionTextEl.textContent = current.question;
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";
  nextBtn.style.display = "none";

  choicesEl.innerHTML = "";
  current.choices.forEach((choiceText, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-btn";
    button.textContent = choiceText;
    button.addEventListener("click", () => selectAnswer(index));
    choicesEl.appendChild(button);
  });
}

function selectAnswer(selectedIndex) {
  const current = questions[currentIndex];
  const buttons = choicesEl.querySelectorAll(".choice-btn");

  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === current.correctIndex) {
      button.classList.add("correct");
    } else if (index === selectedIndex) {
      button.classList.add("incorrect");
    }
  });

  if (selectedIndex === current.correctIndex) {
    score++;
    feedbackEl.textContent = "正解です！";
    feedbackEl.classList.add("correct");
  } else {
    feedbackEl.textContent = `不正解です。正解は「${current.choices[current.correctIndex]}」です。`;
    feedbackEl.classList.add("incorrect");
  }

  nextBtn.style.display = "block";
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizScreen.style.display = "none";
  resultScreen.style.display = "block";
  resultTextEl.textContent = `結果: ${questions.length}問中${score}問正解でした！`;
}

function restartQuiz() {
  currentIndex = 0;
  score = 0;
  resultScreen.style.display = "none";
  quizScreen.style.display = "block";
  loadQuestion();
}

nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restartQuiz);

loadQuestion();
