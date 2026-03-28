const places = [
    {
        name: 'Tanglewood Drive',
        images: ['screenshots/tanglewood_1.png'],
        hint: 'Small suburban house map with a compact interior.'
    },
    {
        name: 'Willow Street House',
        images: ['screenshots/willow_1.png'],
        hint: 'Another small house map, but with a more stretched layout.'
    },
    {
        name: 'Edgefield Road',
        images: ['screenshots/edgefield_1.png'],
        hint: 'Six-bedroom, two-story tall house with a basement.'
    },
    {
        name: 'Ridgeview Court',
        images: ['screenshots/ridgeview_1.png'],
        hint: 'Two-story suburban house with a long hallway.'
    },
    {
        name: 'Grafton Farmhouse',
        images: ['screenshots/grafton_1.png'],
        hint: 'A two-story farmhouse layout with large spacious rooms.'
    },
    {
        name: 'Bleasdale Farmhouse',
        images: ['screenshots/bleasdale_1.png'],
        hint: 'Large old farmhouse with rustic surroundings and an attic.'
    },
    {
        name: 'Camp Woodwind',
        images: ['screenshots/woodwind_1.png'],
        hint: 'Small outdoor campsite map, a scaled down version.'
    },
    {
        name: 'Maple Lodge Campsite',
        images: ['screenshots/maple_1.png'],
        hint: 'Outdoor map with cabins, trails, and open ground.'
    },
    {
        name: 'Brownstone High School',
        images: ['screenshots/brownstone_1.png'],
        hint: 'Symmetrical school-like structure with long hallways.'
    },
    {
        name: 'Prison',
        images: ['screenshots/prison_1.png'],
        hint: 'Long cell blocks and central corridors define this location.'
    },
    {
        name: 'Sunny Meadows',
        images: ['screenshots/sunnymeadows_1.png'],
        hint: 'Massive asylum-like map with many wings and rooms.'
    },
    {
        name: 'Sunny Meadows Restricted',
        images: ['screenshots/sunnymeadowsrestricted_1.png'],
        hint: 'A smaller restricted variant of the massive asylum.'
    },
    {
        name: 'Point Hope',
        images: ['screenshots/pointhope_1.png'],
        hint: 'Tall vertical location around a lighthouse structure.'
    }
];

let availablePlaces = [];
let targetPlace = null;
let gameWon = false;
let wrongGuesses = 0;

const GUESS_COOLDOWN_MS = 1500;
let lastGuessTime = 0;
let guessCooldownTimer = null;
let errorTimeout;

const revealSteps = [32, 24, 18, 14, 10, 6, 3, 1];

const mainCanvas = document.getElementById('map-canvas');
const mainCtx = mainCanvas.getContext('2d');
const zoomCanvas = document.getElementById('zoom-canvas');
const zoomCtx = zoomCanvas.getContext('2d');

const input = document.getElementById('place-input');
const suggestionsList = document.getElementById('suggestions');
const guessBtn = document.getElementById('guess-btn');
const playAgainBtn = document.getElementById('play-again-btn');
const guessedList = document.getElementById('guessed-list');
const messageBox = document.getElementById('game-message');
const hintBox = document.getElementById('map-hint');
const statusText = document.getElementById('reveal-status');
const errorBox = document.getElementById('error-message');

const baseCanvas = document.createElement('canvas');
baseCanvas.width = 640;
baseCanvas.height = 360;
const baseCtx = baseCanvas.getContext('2d');

const pixelCanvas = document.createElement('canvas');
const pixelCtx = pixelCanvas.getContext('2d');

const revealWindows = [
    { x: 60, y: 50, w: 180, h: 100 },
    { x: 380, y: 210, w: 190, h: 105 },
    { x: 240, y: 110, w: 170, h: 95 },
    { x: 110, y: 220, w: 150, h: 90 }
];

initialize();

function initialize() {
    availablePlaces = [...places].sort((a, b) => a.name.localeCompare(b.name));

    input.addEventListener('input', handleInput);
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

    resetGame();
}

function handleInput() {
    const val = input.value.trim().toLowerCase();
    suggestionsList.innerHTML = '';

    if (!val) {
        suggestionsList.classList.add('hidden');
        return;
    }

    const matches = availablePlaces.filter((p) => p.name.toLowerCase().includes(val));

    if (matches.length === 0) {
        suggestionsList.classList.add('hidden');
        return;
    }

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
}

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

    let guessedPlace = availablePlaces.find((p) => p.name.toLowerCase() === guessName);

    if (!guessedPlace) {
        const partialMatches = availablePlaces.filter((p) => p.name.toLowerCase().includes(guessName));
        if (partialMatches.length > 0) {
            guessedPlace = partialMatches[0];
        }
    }

    if (!guessedPlace) {
        const already = places.find((p) => p.name.toLowerCase() === guessName);
        if (already) {
            showError('You already guessed that place.');
        } else {
            showError('Place not recognized.');
        }
        return;
    }

    startGuessCooldown();
    availablePlaces = availablePlaces.filter((p) => p.name !== guessedPlace.name);

    renderGuessedItem(guessedPlace);
    input.value = '';
    input.focus();
    suggestionsList.classList.add('hidden');

    if (guessedPlace.name === targetPlace.name) {
        gameWon = true;
        clearTimeout(guessCooldownTimer);
        guessBtn.disabled = false;
        guessBtn.classList.remove('cooldown');

        drawMainWithReveal(true);
        statusText.textContent = 'Image fully restored.';
        hintBox.classList.add('hidden');

        setTimeout(() => {
            messageBox.textContent = 'Correct! The place was ' + targetPlace.name + '.';
            messageBox.style.textShadow = '0 0 10px #4caf50';
            triggerConfetti();
            setTimeout(() => {
                playAgainBtn.classList.remove('hidden');
            }, 2500);
        }, 800);
        return;
    }

    wrongGuesses += 1;
    updateRevealState();
}

function renderGuessedItem(place) {
    const item = document.createElement('div');
    item.className = 'guessed-item wrong';
    item.textContent = place.name;
    guessedList.appendChild(item);
}

function resetGame() {
    gameWon = false;
    wrongGuesses = 0;
    availablePlaces = [...places].sort((a, b) => a.name.localeCompare(b.name));
    targetPlace = places[Math.floor(Math.random() * places.length)];
    lastGuessTime = 0;

    clearTimeout(guessCooldownTimer);

    guessedList.innerHTML = '';
    messageBox.textContent = '';
    messageBox.style.textShadow = 'none';
    hintBox.textContent = '';
    hintBox.classList.add('hidden');
    errorBox.textContent = '';
    input.value = '';

    guessBtn.disabled = false;
    guessBtn.classList.remove('cooldown');
    guessBtn.textContent = 'GUESS';

    playAgainBtn.classList.add('hidden');

    drawTargetArtwork();
    updateRevealState();
    input.focus();
}

function updateRevealState() {
    const cappedWrong = Math.min(wrongGuesses, revealSteps.length - 1);
    const pixelSize = revealSteps[cappedWrong];

    drawMainWithReveal(false, pixelSize);

    const revealsUnlocked = Math.min(wrongGuesses, revealWindows.length);
    drawZoomReveal(revealsUnlocked);

    statusText.textContent = 'Pixel size: ' + pixelSize + ' | Zoom clues unlocked: ' + revealsUnlocked + '/' + revealWindows.length;

    if (wrongGuesses >= 2) {
        hintBox.textContent = 'Hint: ' + targetPlace.hint;
        hintBox.classList.remove('hidden');
    }
}

function drawTargetArtwork() {
    baseCtx.clearRect(0, 0, baseCanvas.width, baseCanvas.height);
    
    statusText.textContent = 'Loading image...';
    const img = new Image();
    img.src = targetPlace.images[Math.floor(Math.random() * targetPlace.images.length)];
    img.onload = () => {
        baseCtx.drawImage(img, 0, 0, baseCanvas.width, baseCanvas.height);
        updateRevealState();
    };
}

function drawMainWithReveal(showClear, pixelSize = 1) {
    mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);

    if (showClear || pixelSize <= 1) {
        mainCtx.drawImage(baseCanvas, 0, 0, mainCanvas.width, mainCanvas.height);
        return;
    }

    const smallW = Math.max(1, Math.floor(mainCanvas.width / pixelSize));
    const smallH = Math.max(1, Math.floor(mainCanvas.height / pixelSize));

    pixelCanvas.width = smallW;
    pixelCanvas.height = smallH;

    pixelCtx.imageSmoothingEnabled = false;
    mainCtx.imageSmoothingEnabled = false;

    pixelCtx.clearRect(0, 0, smallW, smallH);
    pixelCtx.drawImage(baseCanvas, 0, 0, smallW, smallH);

    mainCtx.drawImage(pixelCanvas, 0, 0, smallW, smallH, 0, 0, mainCanvas.width, mainCanvas.height);

    const unlocked = Math.min(wrongGuesses, revealWindows.length);
    for (let i = 0; i < unlocked; i += 1) {
        const zone = revealWindows[i];
        mainCtx.drawImage(
            baseCanvas,
            zone.x,
            zone.y,
            zone.w,
            zone.h,
            zone.x,
            zone.y,
            zone.w,
            zone.h
        );

        mainCtx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        mainCtx.lineWidth = 2;
        mainCtx.strokeRect(zone.x, zone.y, zone.w, zone.h);
    }
}

function drawZoomReveal(unlocked) {
    zoomCtx.clearRect(0, 0, zoomCanvas.width, zoomCanvas.height);
    zoomCtx.fillStyle = '#111';
    zoomCtx.fillRect(0, 0, zoomCanvas.width, zoomCanvas.height);

    if (unlocked <= 0) {
        zoomCtx.fillStyle = '#777';
        zoomCtx.font = 'bold 20px Roboto Mono';
        zoomCtx.textAlign = 'center';
        zoomCtx.textBaseline = 'middle';
        zoomCtx.fillText('No zoom clue yet', zoomCanvas.width / 2, zoomCanvas.height / 2);
        return;
    }

    const zone = revealWindows[(unlocked - 1) % revealWindows.length];
    zoomCtx.imageSmoothingEnabled = false;

    zoomCtx.drawImage(
        baseCanvas,
        zone.x,
        zone.y,
        zone.w,
        zone.h,
        0,
        0,
        zoomCanvas.width,
        zoomCanvas.height
    );

    zoomCtx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    zoomCtx.lineWidth = 3;
    zoomCtx.strokeRect(3, 3, zoomCanvas.width - 6, zoomCanvas.height - 6);
}


