// Data merged with riddles
const ghosts = [
    { name: "Spirit", evidences: ["EMF 5", "Spirit Box", "Ghost Writing"], sanity: 50, speed: "Normal", riddle: "Burn your incense and I will wait… longer than the rest." },
    { name: "Wraith", evidences: ["EMF 5", "Spirit Box", "D.O.T.S"], sanity: 50, speed: "Normal", riddle: "Salt cannot stop what never walks. The ground does not remember my steps." },
    { name: "Phantom", evidences: ["Spirit Box", "Ultraviolet", "D.O.T.S"], sanity: 50, speed: "Normal", riddle: "Look at me too long and you will fade. Capture my face and I disappear." },
    { name: "Poltergeist", evidences: ["Spirit Box", "Ghost Writing", "Ultraviolet"], sanity: 50, speed: "Normal", riddle: "Give me a room full of objects, and I will make it a storm." },
    { name: "Banshee", evidences: ["Ultraviolet", "Ghost Orb", "D.O.T.S"], sanity: 50, speed: "Normal", riddle: "I hear many voices, but only one matters. When the hunt begins, my favorite should run." },
    { name: "Jinn", evidences: ["EMF 5", "Ultraviolet", "Freezing"], sanity: 50, speed: "Fast", riddle: "Give the house power and I gain mine. Cut the lights, and I lose my edge." },
    { name: "Mare", evidences: ["Spirit Box", "Ghost Orb", "Ghost Writing"], sanity: 60, speed: "Normal", riddle: "Darkness is my comfort, light is my enemy. Break the bulb and I feel at home." },
    { name: "Revenant", evidences: ["Ghost Orb", "Ghost Writing", "Freezing"], sanity: 50, speed: "Varies", riddle: "When I know where you are, I fly. When I do not, I wander slowly." },
    { name: "Shade", evidences: ["EMF 5", "Ghost Writing", "Freezing"], sanity: 35, speed: "Normal", riddle: "Crowds make me quiet. Alone, I become bold." },
    { name: "Demon", evidences: ["Ultraviolet", "Ghost Writing", "Freezing"], sanity: 70, speed: "Normal", riddle: "Your sanity means little to me. I grow restless long before others dare." },
    { name: "Yurei", evidences: ["Ghost Orb", "Freezing", "D.O.T.S"], sanity: 50, speed: "Normal", riddle: "I cling to one place and drain what keeps you sane. Doors close when I am near." },
    { name: "Oni", evidences: ["EMF 5", "Freezing", "D.O.T.S"], sanity: 50, speed: "Normal", riddle: "I am loud, I am active, and I do not hide my anger when you stand near." },
    { name: "Yokai", evidences: ["Spirit Box", "Ghost Orb", "D.O.T.S"], sanity: 80, speed: "Normal", riddle: "Speak too much and I will hear you. Silence is your safest friend." },
    { name: "Hantu", evidences: ["Ultraviolet", "Ghost Orb", "Freezing"], sanity: 50, speed: "Varies", riddle: "Cold air feeds my speed, warm lights slow my heart." },
    { name: "Goryo", evidences: ["EMF 5", "Ultraviolet", "D.O.T.S"], sanity: 50, speed: "Normal", riddle: "Through the lens I reveal myself, but in your own eyes I prefer to stay unseen." },
    { name: "Myling", evidences: ["EMF 5", "Ultraviolet", "Ghost Writing"], sanity: 50, speed: "Normal", riddle: "You may hear the house, but not my steps. Silence is my warning." },
    { name: "Onryo", evidences: ["Spirit Box", "Ghost Orb", "Freezing"], sanity: 60, speed: "Normal", riddle: "A single flame can hold me back, but when it dies, I may strike." },
    { name: "The Twins", evidences: ["EMF 5", "Spirit Box", "Freezing"], sanity: 50, speed: "Varies", riddle: "One of me here, one of me there. You will never know which is real." },
    { name: "Raiju", evidences: ["EMF 5", "Ghost Orb", "D.O.T.S"], sanity: 65, speed: "Varies", riddle: "Your devices betray you. The more they buzz, the faster I move." },
    { name: "Obake", evidences: ["EMF 5", "Ultraviolet", "Ghost Orb"], sanity: 50, speed: "Normal", riddle: "Not every handprint stays the same. Look closely — I cannot keep one shape." },
    { name: "The Mimic", evidences: ["Spirit Box", "Ultraviolet", "Freezing"], sanity: 50, speed: "Varies", riddle: "Do not trust what you see. I may be anyone but myself." },
    { name: "Moroi", evidences: ["Spirit Box", "Ghost Writing", "Freezing"], sanity: 50, speed: "Varies", riddle: "Your voice may curse you, and weakness makes me swift. The lower you fall, the faster I come." },
    { name: "Deogen", evidences: ["Spirit Box", "Ghost Writing", "D.O.T.S"], sanity: 40, speed: "Varies", riddle: "You cannot hide from what always knows. Run far and I rush, stand close and I crawl." },
    { name: "Thaye", evidences: ["Ghost Orb", "Ghost Writing", "D.O.T.S"], sanity: 75, speed: "Varies", riddle: "Time is my enemy. I begin strong, but age steals my speed." },
    { name: "Dayan", evidences: ["EMF 5", "Ghost Orb", "Spirit Box"], sanity: 50, speed: "Varies", riddle: "My presence flickers between moments. A blink, a whisper, then nothing." },
    { name: "Gallu", evidences: ["EMF 5", "Ultraviolet", "Spirit Box"], sanity: 50, speed: "Varies", riddle: "My temper shifts without warning. Calm one moment, relentless the next." },
    { name: "Obambo", evidences: ["Ghost Writing", "Ultraviolet", "D.O.T.S"], sanity: 50, speed: "Varies", riddle: "I move where I please, sometimes where I should not be. You may chase the wrong shadow." }
];

ghosts.sort((a, b) => a.name.localeCompare(b.name));

let availableGhosts = [...ghosts];
let targetGhost = ghosts[Math.floor(Math.random() * ghosts.length)];
let gameWon = false;

const GUESS_COOLDOWN_MS = 1500;
let lastGuessTime = 0;
let guessCooldownTimer = null;

// DOM Elements
const input = document.getElementById('ghost-input');
const suggestionsList = document.getElementById('suggestions');
const guessBtn = document.getElementById('guess-btn');
const playAgainBtn = document.getElementById('play-again-btn');
const guessedList = document.getElementById('guessed-list'); // Changed from grid
const messageBox = document.getElementById('game-message');
const errorBox = document.getElementById('error-message');
const riddleDisplay = document.getElementById('riddle-display');
let errorTimeout;

// Init the first riddle
riddleDisplay.textContent = `"${targetGhost.riddle}"`;

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
        if (partialMatches.length > 0) guessedGhost = partialMatches[0]; 
    }

    if (!guessedGhost) {
        const isAlreadyGuessed = ghosts.find(g => g.name.toLowerCase() === guessName);
        if (isAlreadyGuessed) showError("You have already guessed this ghost.");
        else showError("Ghost not recognized.");
        return;
    }

    startGuessCooldown();
    availableGhosts = availableGhosts.filter(g => g.name !== guessedGhost.name);

    renderGuessedItem(guessedGhost);
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
            triggerConfetti(); 
            setTimeout(() => playAgainBtn.classList.remove('hidden'), 2500);
        }, 1500);
    }
}

// Function altered to render tags instead of a full grid row
function renderGuessedItem(guess) {
    const item = document.createElement('div');
    item.textContent = guess.name;
    item.classList.add('guessed-item');
    
    // Color code based on if it's the right answer
    if (guess.name === targetGhost.name) {
        item.classList.add('correct');
    } else {
        item.classList.add('wrong');
    }
    
    // Add to the list
    guessedList.appendChild(item);
}

function resetGame() {
    gameWon = false;
    availableGhosts = [...ghosts];
    targetGhost = ghosts[Math.floor(Math.random() * ghosts.length)];
    lastGuessTime = 0;
    clearTimeout(guessCooldownTimer);
    
    riddleDisplay.textContent = `"${targetGhost.riddle}"`; 
    guessedList.innerHTML = ''; // Clear the tags
    messageBox.textContent = '';
    messageBox.style.textShadow = 'none';
    errorBox.textContent = '';
    input.value = '';
    guessBtn.disabled = false;
    guessBtn.classList.remove('cooldown');
    guessBtn.textContent = 'GUESS';
    
    playAgainBtn.classList.add('hidden');
    input.focus();
}