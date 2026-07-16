const vocabList = [
    { word: "capricious", definition: "Given to sudden and unaccountable changes of mood or behavior." },
    { word: "ephemeral", definition: "Lasting for a very short time." },
    { word: "magnanimous", definition: "Generous or forgiving, especially toward a rival or less powerful person." },
    { word: "scrutinize", definition: "Examine or inspect closely and thoroughly." }
];

let currentIndex = 0;
let currentMode = "study"; // Can be 'study' or 'test'

const definitionEl = document.getElementById("definition");
const wordGuideEl = document.getElementById("word-guide");
const userInput = document.getElementById("user-input");
const submitBtn = document.getElementById("submit-btn");
const modeBtn = document.getElementById("mode-btn");
const feedbackEl = document.getElementById("feedback");

// Toggle between Study and Test mode
modeBtn.addEventListener("click", () => {
    if (currentMode === "study") {
        currentMode = "test";
        modeBtn.textContent = "Mode: Test";
        modeBtn.style.backgroundColor = "#e53935"; // Red for test mode
    } else {
        currentMode = "study";
        modeBtn.textContent = "Mode: Study";
        modeBtn.style.backgroundColor = "#5c6bc0"; // Blue for study mode
    }
    loadWord(); // Refresh the display for the current word
});

function loadWord() {
    feedbackEl.textContent = "";
    userInput.value = "";
    definitionEl.textContent = vocabList[currentIndex].definition;

    // Show or hide the gray word guide based on mode
    if (currentMode === "study") {
        wordGuideEl.textContent = vocabList[currentIndex].word;
    } else {
        wordGuideEl.textContent = ""; // Blank in test mode
    }
}

submitBtn.addEventListener("click", () => {
    const answer = userInput.value.trim().toLowerCase();
    const correctAnswer = vocabList[currentIndex].word.toLowerCase();

    if (answer === correctAnswer) {
        feedbackEl.style.color = "green";
        feedbackEl.textContent = "Correct! Moving to next word...";
        
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % vocabList.length;
            loadWord();
        }, 1500);
    } else {
        feedbackEl.style.color = "red";
        feedbackEl.textContent = "Not quite, try again!";
    }
});

// Start the app
loadWord();