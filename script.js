// Organized word sets
const wordSets = {
    set1: [
        { word: "capricious", definition: "Given to sudden and unaccountable changes of mood or behavior." },
        { word: "ephemeral", definition: "Lasting for a very short time." },
        { word: "magnanimous", definition: "Generous or forgiving, especially toward a rival or less powerful person." },
        { word: "scrutinize", definition: "Examine or inspect closely and thoroughly." }
    ],
    set2: [
        { word: "benevolent", definition: "Well meaning and kindly." },
        { word: "cacophony", definition: "A harsh, discordant mixture of sounds." },
        { word: "diligent", definition: "Having or showing care and conscientiousness in one's work." },
        { word: "enigma", definition: "A person or thing that is mysterious, puzzling, or difficult to understand." }
    ]
};

let currentSetKey = "set1";
let currentIndex = 0;
let currentMode = "study";
let score = 0;

// DOM Elements
const setSelect = document.getElementById("set-select");
const modeBtn = document.getElementById("mode-btn");
const scoreDisplay = document.getElementById("score-display");
const progressDisplay = document.getElementById("progress-display");
const definitionEl = document.getElementById("definition");
const wordGuideEl = document.getElementById("word-guide");
const userInput = document.getElementById("user-input");
const submitBtn = document.getElementById("submit-btn");
const feedbackEl = document.getElementById("feedback");
const correctionDisplay = document.getElementById("correction-display");

// Handle changing word sets
setSelect.addEventListener("change", (e) => {
    currentSetKey = e.target.value;
    currentIndex = 0; // Reset progress for the new set
    score = 0;        // Reset score for the new set
    updateScoreboard();
    loadWord();
});

// Mode Selector (Study vs Test)
modeBtn.addEventListener("click", () => {
    if (currentMode === "study") {
        currentMode = "test";
        modeBtn.textContent = "Mode: Test";
        modeBtn.style.backgroundColor = "#e53935";
    } else {
        currentMode = "study";
        modeBtn.textContent = "Mode: Study";
        modeBtn.style.backgroundColor = "#5c6bc0";
    }
    loadWord();
});

function updateScoreboard() {
    const activeSet = wordSets[currentSetKey];
    scoreDisplay.textContent = score;
    progressDisplay.textContent = `${currentIndex}/${activeSet.length}`;
}

function loadWord() {
    const activeSet = wordSets[currentSetKey];
    
    // Check if the set is finished
    if (currentIndex >= activeSet.length) {
        definitionEl.textContent = "🎉 Set complete! Great job!";
        wordGuideEl.textContent = "";
        userInput.style.display = "none";
        submitBtn.style.display = "none";
        return;
    } else {
        userInput.style.display = "inline-block";
        submitBtn.style.display = "inline-block";
    }

    feedbackEl.textContent = "";
    correctionDisplay.textContent = "";
    userInput.value = "";
    definitionEl.textContent = activeSet[currentIndex].definition;

    if (currentMode === "study") {
        wordGuideEl.textContent = activeSet[currentIndex].word;
    } else {
        wordGuideEl.textContent = ""; 
    }
    
    updateScoreboard();
}

submitBtn.addEventListener("click", () => {
    const activeSet = wordSets[currentSetKey];
    const answer = userInput.value.trim().toLowerCase();
    const correctAnswer = activeSet[currentIndex].word.toLowerCase();

    if (answer === correctAnswer) {
        feedbackEl.style.color = "green";
        feedbackEl.textContent = "Correct!";
        score += 10; // Gain 10 points for correct answer
        
        setTimeout(() => {
            currentIndex++;
            loadWord();
        }, 1200);
    } else {
        feedbackEl.style.color = "red";
        feedbackEl.textContent = "Incorrect.";
        
        // Show them the correct answer so they can learn from it
        correctionDisplay.innerHTML = `The correct word was: <strong>${activeSet[currentIndex].word}</strong>`;
        
        // Optional: reduce score slightly for a wrong answer in test mode
        if (currentMode === "test" && score > 0) {
            score -= 5;
            updateScoreboard();
        }

        // Wait a bit longer so they can read the correct answer before advancing
        setTimeout(() => {
            currentIndex++;
            loadWord();
        }, 2500);
    }
});

// Start the app
loadWord();