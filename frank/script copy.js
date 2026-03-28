const ghosts = [
    { name: "Spirit", evidences: ["EMF 5", "Spirit Box", "Ghost Writing"], sanity: 50, speed: "Normal", hint1: "Smudge sticks prevent this ghost from hunting for 180 seconds instead of the usual 90.", hint2: "It has no distinct strengths during a hunt; it moves at standard speed and accelerates normally." },
    { name: "Wraith", evidences: ["EMF 5", "Spirit Box", "D.O.T.S"], sanity: 50, speed: "Normal", hint1: "This ghost will never step in a salt pile.", hint2: "Can teleport directly to a random player outside of a hunt, generating an EMF 2 reading at that player's location." },
    { name: "Phantom", evidences: ["Spirit Box", "Ultraviolet", "D.O.T.S"], sanity: 50, speed: "Normal", hint1: "Taking a photo of this ghost will cause it to temporarily disappear.", hint2: "It is invisible for longer periods during a hunt compared to a normal ghost (blinks slower)." },
    { name: "Poltergeist", evidences: ["Spirit Box", "Ghost Writing", "Ultraviolet"], sanity: 50, speed: "Normal", hint1: "Known for throwing multiple items at once (the 'bomb' effect).", hint2: "Will throw an item exactly every 0.5 seconds during a hunt if items are nearby." },
    { name: "Banshee", evidences: ["Ultraviolet", "Ghost Orb", "D.O.T.S"], sanity: 50, speed: "Normal", hint1: "Targets only one specific player at a time until they die or leave the house.", hint2: "Has a distinctive paranormal scream that can only be heard through the parabolic microphone." },
    { name: "Jinn", evidences: ["EMF 5", "Ultraviolet", "Freezing"], sanity: 50, speed: "Fast", hint1: "Cannot turn off the breaker. Speeds up when the breaker is on and it sees a player.", hint2: "Can instantly zap 25% sanity from a nearby player if the breaker is on, leaving an EMF 2 at the breaker." },
    { name: "Mare", evidences: ["Spirit Box", "Ghost Orb", "Ghost Writing"], sanity: 60, speed: "Normal", hint1: "Cannot turn lights ON. More likely to hunt in the dark.", hint2: "Has a higher chance to perform light-shattering ghost events and will instantly turn off a light switch if you turn it on." },
    { name: "Revenant", evidences: ["Ghost Orb", "Ghost Writing", "Freezing"], sanity: 50, speed: "Varies", hint1: "Moves incredibly slowly when it doesn't see a player, but sprints very fast when it does.", hint2: "Instantly accelerates to 3.0 m/s as soon as it gains line of sight, making it one of the fastest hunters." },
    { name: "Shade", evidences: ["EMF 5", "Ghost Writing", "Freezing"], sanity: 35, speed: "Normal", hint1: "Will not initiate a hunt if multiple people are in the same room.", hint2: "Extremely inactive compared to other ghosts; very rarely performs interactions or events while players are near." },
    { name: "Demon", evidences: ["Ultraviolet", "Ghost Writing", "Freezing"], sanity: 70, speed: "Normal", hint1: "Has a rare ability to hunt at ANY sanity level.", hint2: "Smudge sticks only prevent it from hunting for 60 seconds, rather than the standard 90 seconds." },
    { name: "Yurei", evidences: ["Ghost Orb", "Freezing", "D.O.T.S"], sanity: 50, speed: "Normal", hint1: "Has a unique ability to rapidly drain sanity by fully closing doors.", hint2: "Lighting a smudge stick in its room will temporarily trap it there, preventing it from wandering for 90 seconds." },
    { name: "Oni", evidences: ["EMF 5", "Freezing", "D.O.T.S"], sanity: 50, speed: "Normal", hint1: "Cannot perform the 'airball' (smoke cloud) ghost event. Highly active when players are nearby.", hint2: "It is visible for longer periods during a hunt compared to a normal ghost (blinks much faster)." },
    { name: "Yokai", evidences: ["Spirit Box", "Ghost Orb", "D.O.T.S"], sanity: 80, speed: "Normal", hint1: "Talking near this ghost can trigger hunts at high sanity. It is almost deaf during hunts.", hint2: "During a hunt, it can only hear voices or sense active electronic equipment from about 2.5 meters away." },
    { name: "Hantu", evidences: ["Ultraviolet", "Ghost Orb", "Freezing"], sanity: 50, speed: "Varies", hint1: "Moves much faster in cold rooms and slower in warm rooms.", hint2: "Will never turn on the breaker. It produces visible freezing breath during a hunt if the breaker is off." },
    { name: "Goryo", evidences: ["EMF 5", "Ultraviolet", "D.O.T.S"], sanity: 50, speed: "Normal", hint1: "Its D.O.T.S. evidence can usually only be seen through a video camera.", hint2: "Will rarely wander far from its favorite room and cannot change its favorite room on its own." },
    { name: "Myling", evidences: ["EMF 5", "Ultraviolet", "Ghost Writing"], sanity: 50, speed: "Normal", hint1: "Its footsteps are completely silent during a hunt until it is very close.", hint2: "Produces paranormal sounds on the parabolic microphone much more frequently than other ghosts." },
    { name: "Onryo", evidences: ["Spirit Box", "Ghost Orb", "Freezing"], sanity: 60, speed: "Normal", hint1: "A lit candle acts like a crucifix. It will attempt to hunt if a flame is blown out.", hint2: "Blowing out exactly 3 candles will force it to attempt a hunt, completely regardless of your current sanity." },
    { name: "The Twins", evidences: ["EMF 5", "Spirit Box", "Freezing"], sanity: 50, speed: "Varies", hint1: "Can interact with objects in two different rooms at the exact same time.", hint2: "One twin hunts slightly faster than a normal ghost, while the other twin hunts slightly slower." },
    { name: "Raiju", evidences: ["EMF 5", "Ghost Orb", "D.O.T.S"], sanity: 65, speed: "Varies", hint1: "Speeds up significantly when moving near active electronic equipment.", hint2: "Disrupts electronic equipment (flashlights flickering) from much further away (15 meters) than a normal ghost." },
    { name: "Obake", evidences: ["EMF 5", "Ultraviolet", "Ghost Orb"], sanity: 50, speed: "Normal", hint1: "Has a small chance to leave a unique 6-fingered fingerprint.", hint2: "Has a 6.6% chance every time it flickers during a hunt to momentarily shapeshift into a different ghost model." },
    { name: "The Mimic", evidences: ["Spirit Box", "Ultraviolet", "Freezing"], sanity: 50, speed: "Varies", hint1: "Always presents Ghost Orbs as a fake fourth evidence. Copies other ghost behaviors.", hint2: "Will secretly change which ghost it is currently copying every few minutes." },
    { name: "Moroi", evidences: ["Spirit Box", "Ghost Writing", "Freezing"], sanity: 50, speed: "Varies", hint1: "Its speed increases as the average team sanity drops. Curses players via the Spirit Box.", hint2: "During a hunt, using a smudge stick will blind this ghost for a full 12 seconds instead of the standard 6 seconds." },
    { name: "Deogen", evidences: ["Spirit Box", "Ghost Writing", "D.O.T.S"], sanity: 40, speed: "Varies", hint1: "You cannot hide from it. It moves very fast from afar but to a crawl when near you.", hint2: "Has a unique heavy breathing audio response on the Spirit Box if you are standing directly on top of it." },
    { name: "Thaye", evidences: ["Ghost Orb", "Ghost Writing", "D.O.T.S"], sanity: 75, speed: "Varies", hint1: "Starts the match very active and fast, but 'ages' and slows down significantly over time.", hint2: "Unlike most ghosts, it does not slowly speed up upon maintaining a line of sight with a player during a hunt." },
    
    // --- New ghosts added in Winter's Jest update (v0.15.1.0, December 2025) ---
    { name: "Dayan", evidences: ["EMF 5", "Ghost Orb", "Spirit Box"], sanity: 50, speed: "Varies", hint1: "Always female. Speeds up dramatically when players move near her (within 10m), but slows if they stand still.", hint2: "Does not leave ultraviolet footprints in salt, but will still visibly step in and disturb the salt pile." },
    { name: "Gallu", evidences: ["EMF 5", "Ultraviolet", "Spirit Box"], sanity: 50, speed: "Varies", hint1: "Cycles through Normal, Enraged, and Weakened states. Using protective equipment triggers its enraged state.", hint2: "Dropping a crucifix inside its favorite room will temporarily force it to revert back to its Weakened state." },
    { name: "Obambo", evidences: ["Ghost Writing", "Ultraviolet", "D.O.T.S"], sanity: 50, speed: "Varies", hint1: "Alternates between a Calm state (hunts at 10% sanity) and an Aggressive state (hunts at 65% sanity) every two minutes.", hint2: "Its favorite room will immediately change to a random adjacent room the moment it enters its Aggressive state." }
];

ghosts.sort((a, b) => a.name.localeCompare(b.name));

let availableGhosts = [...ghosts];
let targetGhost = ghosts[Math.floor(Math.random() * ghosts.length)];
let gameWon = false;
let wrongGuesses = 0;

// --- Anti-script rate limiting ---
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
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 1 },
            colors: ['#4caf50', '#ffffff', '#888888']
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 1 },
            colors: ['#4caf50', '#ffffff', '#888888']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
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
        
        // Render hints based on wrong guess count
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
    hintBox.innerHTML = '';
    errorBox.textContent = '';
    input.value = '';
    guessBtn.disabled = false;
    guessBtn.classList.remove('cooldown');
    guessBtn.textContent = 'GUESS';
    
    playAgainBtn.classList.add('hidden');
    input.focus();
}