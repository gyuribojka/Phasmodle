// Remove the big array! Keep variables empty to start.
let ghosts = [];
let availableGhosts = [];
let targetGhost = null;
let gameWon = false;
let wrongGuesses = 0;

const GUESS_COOLDOWN_MS = 1500;
let lastGuessTime = 0;
let guessCooldownTimer = null;

// DOM Elements
const input = document.getElementById('ghost-input');
const suggestionsList = document.getElementById('suggestions');
const guessBtn = document.getElementById('guess-btn');
const playAgainBtn = document.getElementById('play-again-btn');
const grid = document.getElementById('guesses-grid');
const messageBox = document.getElementById('game-message');
const hintBox = document.getElementById('hint-message');
const errorBox = document.getElementById('error-message');
let errorTimeout;

// Disable inputs temporarily while fetching
input.disabled = true;
guessBtn.disabled = true;

// Fetch the external JSON file
fetch('ghosts.json')
    .then(response => response.json())
    .then(data => {
        ghosts = data;
        ghosts.sort((a, b) => a.name.localeCompare(b.name));
        
        // Setup initial game state
        resetGame();
        
        // Re-enable inputs
        input.disabled = false;
        guessBtn.disabled = false;
    })
    .catch(error => {
        console.error("Error loading ghost data:", error);
        showError("Failed to load ghost data. Are you using a local server?");
    });

// --- Autocomplete Logic ---
input.addEventListener('input', () => {
    const val = input.value.toLowerCase();
    suggestionsList.innerHTML = '';
    
    if (val.length === 0) {
        suggestionsList.classList.add('hidden');
        return;
    }

    const matches = availableGhosts.filter(g => g.name.toLowerCase().includes(val));
    
    if (matches.length > 0) {
        suggestionsList.classList.remove('hidden');
        matches.forEach(match => {
            const li = document.createElement('li');
            li.textContent = match.name;
            li.addEventListener('click', () => {
                input.value = match.name;
                suggestionsList.classList.add('hidden');
                input.focus();
            });
            suggestionsList.appendChild(li);
        });
    } else {
        suggestionsList.classList.add('hidden');
    }
});

document.addEventListener('click', (e) => {
    if (e.target !== input) {
        suggestionsList.classList.add('hidden');
    }
});

function showError(msg) {
    errorBox.textContent = msg;
    clearTimeout(errorTimeout);
    errorTimeout = setTimeout(() => {
        errorBox.textContent = '';
    }, 3000);
}

// --- Cooldown UI ---
function startGuessCooldown() {
    guessBtn.disabled = true;
    guessBtn.classList.add('cooldown');
    lastGuessTime = Date.now();

    clearTimeout(guessCooldownTimer);
    guessCooldownTimer = setTimeout(() => {
        guessBtn.disabled = false;
        guessBtn.classList.remove('cooldown');
        guessBtn.textContent = 'GUESS';
    }, GUESS_COOLDOWN_MS);
}

// --- Confetti Animation ---
function triggerConfetti() {
    const duration = 2500;
    const end = Date.now() + duration;

    (function frame() {
        confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0, y: 1 }, colors: ['#4caf50', '#ffffff', '#888888'] });
        confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1, y: 1 }, colors: ['#4caf50', '#ffffff', '#888888'] });
        if (Date.now() < end) requestAnimationFrame(frame);
    }());
}

// --- Game Logic ---
guessBtn.addEventListener('click', handleGuess);
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleGuess();
});
playAgainBtn.addEventListener('click', resetGame);

function handleGuess() {
    if (gameWon) return;

    if (Date.now() - lastGuessTime < GUESS_COOLDOWN_MS) {
        showError("Too fast! Wait a moment between guesses.");
        return;
    }

    let guessName = input.value.trim().toLowerCase();
    if (!guessName) return;
    
    let guessedGhost = availableGhosts.find(g => g.name.toLowerCase() === guessName);

    if (!guessedGhost) {
        const partialMatches = availableGhosts.filter(g => g.name.toLowerCase().includes(guessName));
        if (partialMatches.length > 0) {
            guessedGhost = partialMatches[0]; 
        }
    }

    if (!guessedGhost) {
        const isAlreadyGuessed = ghosts.find(g => g.name.toLowerCase() === guessName);
        if (isAlreadyGuessed) {
            showError("You have already guessed this ghost.");
        } else {
            showError("Ghost not recognized.");
        }
        return;
    }

    startGuessCooldown();
    availableGhosts = availableGhosts.filter(g => g.name !== guessedGhost.name);

    renderGuessRow(guessedGhost);
    input.value = '';
    input.focus();
    suggestionsList.classList.add('hidden');
    errorBox.textContent = ''; 

    if (guessedGhost.name === targetGhost.name) {
        gameWon = true;
        clearTimeout(guessCooldownTimer);
        guessBtn.disabled = false;
        guessBtn.classList.remove('cooldown');
        guessBtn.textContent = 'GUESS';

        setTimeout(() => {
            messageBox.textContent = `Contract Complete! The ghost was a ${targetGhost.name}.`;
            messageBox.style.textShadow = "0 0 10px #4caf50";
            hintBox.classList.add('hidden'); 
            triggerConfetti(); 
            
            setTimeout(() => {
                playAgainBtn.classList.remove('hidden');
            }, 2500);

        }, 1500);
    } else {
        wrongGuesses++;
        if (wrongGuesses >= 6) {
            hintBox.innerHTML = `<strong>Hint 1:</strong> ${targetGhost.hint1}<br><br><strong>Hint 2:</strong> ${targetGhost.hint2}`;
            hintBox.classList.remove('hidden');
        } else if (wrongGuesses >= 3) {
            hintBox.innerHTML = `<strong>Hint 1:</strong> ${targetGhost.hint1}`;
            hintBox.classList.remove('hidden');
        }
    }
}

function renderGuessRow(guess) {
    const row = document.createElement('div');
    row.classList.add('guess-row');

    row.appendChild(createCell(guess.name, guess.name === targetGhost.name));

    guess.evidences.forEach(ev => {
        const isMatch = targetGhost.evidences.includes(ev);
        row.appendChild(createCell(ev, isMatch));
    });

    let sanityText = guess.sanity + "%";
    if (guess.sanity > targetGhost.sanity) sanityText += " ⬇️"; 
    else if (guess.sanity < targetGhost.sanity) sanityText += " ⬆️"; 
    row.appendChild(createCell(sanityText, guess.sanity === targetGhost.sanity));

    row.appendChild(createCell(guess.speed, guess.speed === targetGhost.speed));

    grid.insertBefore(row, grid.firstChild);
}

function createCell(text, isCorrect) {
    const div = document.createElement('div');
    div.textContent = text;
    div.classList.add(isCorrect ? 'correct' : 'wrong');
    return div;
}

function resetGame() {
    gameWon = false;
    wrongGuesses = 0;
    availableGhosts = [...ghosts];
    targetGhost = ghosts[Math.floor(Math.random() * ghosts.length)];
    lastGuessTime = 0;
    clearTimeout(guessCooldownTimer);
    
    grid.innerHTML = '';
    messageBox.textContent = '';
    messageBox.style.textShadow = 'none';
    hintBox.classList.add('hidden');
    hintBox.textContent = '';
    errorBox.textContent = '';
    input.value = '';
    guessBtn.disabled = false;
    guessBtn.classList.remove('cooldown');
    guessBtn.textContent = 'GUESS';
    
    playAgainBtn.classList.add('hidden');
    input.focus();
}