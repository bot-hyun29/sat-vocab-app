// A small starter list of SAT words
const vocabList = [
    { word: "capricious", definition: "Given to sudden and unaccountable changes of mood or behavior." },
    { word: "ephemeral", definition: "Lasting for a very short time." },
    { word: "magnanimous", definition: "Generous or forgiving, especially toward a rival or less powerful person." },
    { word: "scrutinize", definition: "Examine or inspect closely and thoroughly." }
];

let currentIndex = 0;

const definitionEl = document.getElementById("definition");
const userInput = document.getElementById("user-input");
const submitBtn = document.getElementById("submit-btn");
const feedbackEl = document.getElementById("feedback");

function loadWord() {
    feedbackEl.textContent = "";
    userInput.value = "";
    definitionEl.textContent = vocabList[currentIndex].definition;
}

submitBtn.addEventListener("click", () => {
    const answer = userInput.value.trim().toLowerCase();
    const correctAnswer = vocabList[currentIndex].word.toLowerCase();

    if (answer === correctAnswer) {
        feedbackEl.style.color = "green";
        feedbackEl.textContent = "Correct! Moving to next word...";
        
        // Move to next word after a brief pause
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