let ghosts = [];
let availableGhosts = [];
let targetGhost = null;
let gameWon = false;
let wrongGuesses = 0;

const GUESS_COOLDOWN_MS = 1500;
let lastGuessTime = 0;
let guessCooldownTimer = null;
let errorTimeout;

const MAX_CLUES = 4;

const input = document.getElementById('ghost-input');
const suggestionsList = document.getElementById('suggestions');
const guessBtn = document.getElementById('guess-btn');
const playAgainBtn = document.getElementById('play-again-btn');
const guessedList = document.getElementById('guessed-list');
const messageBox = document.getElementById('game-message');
const errorBox = document.getElementById('error-message');
const emojiCluesBox = document.getElementById('emoji-clues');
const emojiProgress = document.getElementById('emoji-progress');

const emojiProfiles = {
    'Spirit': [
        ['🕯️🚫👻', '🧂❌⭐', '⏱️1️⃣8️⃣0️⃣', '😐🏃'],
        ['👻📓', '🗣️📻', '🖐️📖', '🏃‍♂️🚪']
    ],
    'Wraith': [
        ['🧂🚫👣', '📡⚡👤', '👣❌', '🫥🛸'],
        ['👻📓', '🗣️📻', '🌡️❄️', '👣🚫']
    ],
    'Phantom': [
        ['📸👻❌', '👀😨', '🫥🫥', '😱📉'],
        ['🗣️📻', '🖐️📖', '🟢🔦', '📸🫥']
    ],
    'Poltergeist': [
        ['📦📦📦', '🌀🏠', '🪑🛋️🧸', '💥🎯'],
        ['🗣️📻', '🖐️📖', '👻📓', '💥📦']
    ],
    'Banshee': [
        ['🎯1️⃣👤', '🎧😱', '🎤👻', '🏃‍♂️💀'],
        ['🖐️📖', '👻📓', '🟢🔦', '🎤😱']
    ],
    'Jinn': ['💡⚡⬆️', '🔌✅', '⚡🧠⬇️', '🏃‍♂️💨'],
    'Mare': ['🌑❤️', '💡❌', '💥💡', '🌘🔪'],
    'Revenant': ['🐢❓', '👀➡️🚀', '🧊➡️🔥', '🏃💀'],
    'Shade': ['👥🤫', '🧍➡️😈', '📉🎲', '🕶️'],
    'Demon': ['😈🔪', '🧠❌', '🕯️⏱️6️⃣0️⃣', '⚠️📈'],
    'Yurei': ['🚪🔒', '🧠⬇️⬇️', '🕯️🧱', '🏠📍'],
    'Oni': ['👥➡️📈', '💨❌', '👻🫥❌', '😡'],
    'Yokai': ['🗣️➡️🔪', '👂📉', '🤫✅', '📻❌'],
    'Hantu': ['🥶➡️💨', '🌡️🔥➡️🐢', '🔌❌', '😮‍💨❄️'],
    'Goryo': ['📹👀✅', '👁️❌', '🏠📍', '🚶❌'],
    'Myling': ['👣🔇', '🎧📈', '🏠🔊', '😶'],
    'Onryo': ['🕯️🛡️', '💨🕯️➡️🔪', '3️⃣🕯️➡️⚠️', '🔥😡'],
    'The Twins': ['2️⃣👻', '🏠↔️🏠', '⚡🐢', '❓❓'],
    'Raiju': ['📱⚡➡️💨', '🔦📡📈', '🔌🧲', '🏃‍♂️⚡'],
    'Obake': ['✋6️⃣', '👻🔁', '🫥🫥', '🕵️'],
    'The Mimic': ['🎭👻', '🧊📦➕', '🟣☁️🎣', '❓🪞'],
    'Moroi': ['🗣️➡️🤬', '🧠⬇️➡️💨', '🕯️⏱️1️⃣2️⃣', '😷'],
    'Deogen': ['🙈❌', '🏃🔙➡️💨', '👤🔜➡️🐢', '😮‍💨🎙️'],
    'Thaye': ['👶➡️👴', '⏳📉', '🏃📉', '👀➡️🚫📈'],
    'Dayan': ['👩👻', '🏃🔜➡️💨', '🧍🛑➡️🐢', '🧂👣✅ 🟣❌'],
    'Gallu': ['😌😡😴', '🛡️➡️😡', '✝️➡️😴', '🔁⚠️'],
    'Obambo': ['😌🔁😡', '1️⃣0️⃣%/6️⃣5️⃣%', '🚪➡️🏠🔀', '🫥🏃']
};

const fallbackGhosts = Object.keys(emojiProfiles).map((name) => ({
    name,
    evidences: [],
    sanity: 50,
    speed: 'Normal'
}));

input.disabled = true;
guessBtn.disabled = true;
emojiCluesBox.textContent = 'Summoning symbols...';
emojiProgress.textContent = '';

fetch('lemmingblommingfrankotamas.json')
    .then((response) => {
        if (!response.ok) {
            throw new Error('HTTP ' + response.status);
        }
        return response.json();
    })
    .then((data) => {
        ghosts = data;
        ghosts.sort((a, b) => a.name.localeCompare(b.name));
        resetGame();
        input.disabled = false;
        guessBtn.disabled = false;
    })
    .catch((error) => {
        console.error('Error loading ghost data:', error);

        // Fallback lets the mode work even when opened without a local server.
        ghosts = [...fallbackGhosts].sort((a, b) => a.name.localeCompare(b.name));
        resetGame();
        input.disabled = false;
        guessBtn.disabled = false;

        showError('Using offline fallback data.');
    });

input.addEventListener('input', () => {
    const val = input.value.toLowerCase();
    suggestionsList.innerHTML = '';

    if (!val) {
        suggestionsList.classList.add('hidden');
        return;
    }

    const matches = availableGhosts.filter((g) => g.name.toLowerCase().includes(val));

    if (matches.length > 0) {
        suggestionsList.classList.remove('hidden');
        matches.forEach((match) => {
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

guessBtn.addEventListener('click', handleGuess);
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleGuess();
    }
});
playAgainBtn.addEventListener('click', resetGame);

function showError(msg) {
    errorBox.textContent = msg;
    clearTimeout(errorTimeout);
    errorTimeout = setTimeout(() => {
        errorBox.textContent = '';
    }, 2500);
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

function triggerConfetti() {
    const duration = 2500;
    const end = Date.now() + duration;

    (function frame() {
        confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0, y: 1 }, colors: ['#4caf50', '#ffffff', '#888888'] });
        confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1, y: 1 }, colors: ['#4caf50', '#ffffff', '#888888'] });
        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

function getEmojiForEvidence(evidence) {
    const evidenceEmojis = {
        'EMF Level 5': '📟',
        'Spirit Box': '📻',
        'Ultraviolet': '🔦',
        'Ghost Orb': '⚪',
        'Ghost Writing': '📖',
        'Freezing Temperatures': '❄️',
        'D.O.T.S Projector': '🟢'
    };
    return evidenceEmojis[evidence] || evidence;
}

function getEmojiCluesForGhost(ghost) {
    if (ghost.currentEmojiClues) {
        return ghost.currentEmojiClues;
    }

    let profile = emojiProfiles[ghost.name];
    if (profile) {
        if (Array.isArray(profile[0])) {
            profile = profile[Math.floor(Math.random() * profile.length)];
        }
        if (profile.length >= MAX_CLUES) {
            ghost.currentEmojiClues = profile;
            return profile;
        }
    }

    const fallback = [
        ghost.evidences[0] ? '🔎 ' + getEmojiForEvidence(ghost.evidences[0]) : '🔎 ❓',
        ghost.evidences[1] ? '🧾 ' + getEmojiForEvidence(ghost.evidences[1]) : '🧾 ❓',
        '🧠 ' + ghost.sanity + '%',
        ghost.speed === 'Varies' ? '🏃❓' : ghost.speed === 'Fast' ? '🏃💨' : '🏃'
    ];

    ghost.currentEmojiClues = fallback;
    return fallback;
}

function renderEmojiClues() {
    const clues = getEmojiCluesForGhost(targetGhost);
    const cluesToShow = Math.min(1 + wrongGuesses, MAX_CLUES);

    emojiCluesBox.innerHTML = '';

    for (let i = 0; i < cluesToShow; i += 1) {
        const clue = document.createElement('span');
        clue.className = 'emoji-chip';
        clue.textContent = clues[i];
        emojiCluesBox.appendChild(clue);
    }

    for (let i = cluesToShow; i < MAX_CLUES; i += 1) {
        const hidden = document.createElement('span');
        hidden.className = 'emoji-chip hidden-clue';
        hidden.textContent = '❓❓❓';
        emojiCluesBox.appendChild(hidden);
    }

    emojiProgress.textContent = 'Clues unlocked: ' + cluesToShow + '/' + MAX_CLUES;
}

function handleGuess() {
    if (gameWon) {
        return;
    }

    if (Date.now() - lastGuessTime < GUESS_COOLDOWN_MS) {
        showError('Too fast! Wait a moment between guesses.');
        return;
    }

    const guessName = input.value.trim().toLowerCase();
    if (!guessName) {
        return;
    }

    let guessedGhost = availableGhosts.find((g) => g.name.toLowerCase() === guessName);

    if (!guessedGhost) {
        const partialMatches = availableGhosts.filter((g) => g.name.toLowerCase().includes(guessName));
        if (partialMatches.length > 0) {
            guessedGhost = partialMatches[0];
        }
    }

    if (!guessedGhost) {
        const isAlreadyGuessed = ghosts.find((g) => g.name.toLowerCase() === guessName);
        if (isAlreadyGuessed) {
            showError('You already guessed that ghost.');
        } else {
            showError('Ghost not recognized.');
        }
        return;
    }

    startGuessCooldown();
    availableGhosts = availableGhosts.filter((g) => g.name !== guessedGhost.name);

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

        setTimeout(() => {
            messageBox.textContent = 'Contract Complete! The ghost was ' + targetGhost.name + '.';
            messageBox.style.textShadow = '0 0 10px #4caf50';
            triggerConfetti();
            setTimeout(() => {
                playAgainBtn.classList.remove('hidden');
            }, 2500);
        }, 900);
        return;
    }

    wrongGuesses += 1;
    renderEmojiClues();
}

function renderGuessedItem(ghost) {
    const item = document.createElement('div');
    item.className = 'guessed-item';
    item.textContent = ghost.name;

    if (ghost.name === targetGhost.name) {
        item.classList.add('correct');
    } else {
        item.classList.add('wrong');
    }

    guessedList.appendChild(item);
}

function resetGame() {
    gameWon = false;
    wrongGuesses = 0;
    availableGhosts = [...ghosts];
    targetGhost = ghosts[Math.floor(Math.random() * ghosts.length)];
    targetGhost.currentEmojiClues = null; // Clear old clues to generate a new shuffle
    lastGuessTime = 0;
    clearTimeout(guessCooldownTimer);

    guessedList.innerHTML = '';
    messageBox.textContent = '';
    messageBox.style.textShadow = 'none';
    errorBox.textContent = '';
    input.value = '';
    guessBtn.disabled = false;
    guessBtn.classList.remove('cooldown');
    guessBtn.textContent = 'GUESS';

    playAgainBtn.classList.add('hidden');
    renderEmojiClues();
    input.focus();
}
