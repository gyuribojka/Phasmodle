const places = [
    {
        name: 'Tanglewood Drive',
        images: ['https://rogers.kaposztaleves.hu/screenshots/tanglewood_1.png', 'https://rogers.kaposztaleves.hu/screenshots/tanglewood_2.png', 'https://rogers.kaposztaleves.hu/screenshots/tanglewood_3.png', 'https://rogers.kaposztaleves.hu/screenshots/tanglewood_4.png', 'https://rogers.kaposztaleves.hu/screenshots/tanglewood_5.png', 'https://rogers.kaposztaleves.hu/screenshots/tanglewood_6.png', 'https://rogers.kaposztaleves.hu/screenshots/tanglewood_7.png', 'https://rogers.kaposztaleves.hu/screenshots/tanglewood_8.png', 'https://rogers.kaposztaleves.hu/screenshots/tanglewood_9.png'],
        hint: 'Small suburban house map with a compact interior.'
    },
    {
        name: 'Willow Street House',
        images: ['https://rogers.kaposztaleves.hu/screenshots/willow_1.png', 'https://rogers.kaposztaleves.hu/screenshots/willow_2.png', 'https://rogers.kaposztaleves.hu/screenshots/willow_3.png', 'https://rogers.kaposztaleves.hu/screenshots/willow_4.png', 'https://rogers.kaposztaleves.hu/screenshots/willow_5.png'],
        hint: 'Another small house map, but with a more stretched layout.'
    },
    {
        name: 'Edgefield Road',
        images: ['https://rogers.kaposztaleves.hu/screenshots/edgefield_1.png', 'https://rogers.kaposztaleves.hu/screenshots/edgefield_2.png', 'https://rogers.kaposztaleves.hu/screenshots/edgefield_3.png', 'https://rogers.kaposztaleves.hu/screenshots/edgefield_4.png', 'https://rogers.kaposztaleves.hu/screenshots/edgefield_5.png', 'https://rogers.kaposztaleves.hu/screenshots/edgefield_6.png'],
        hint: 'Six-bedroom, two-story tall house with a basement.'
    },
    {
        name: 'Ridgeview Court',
        images: ['https://rogers.kaposztaleves.hu/screenshots/ridgeview_1.png', 'https://rogers.kaposztaleves.hu/screenshots/ridgeview_2.png', 'https://rogers.kaposztaleves.hu/screenshots/ridgeview_3.png', 'https://rogers.kaposztaleves.hu/screenshots/ridgeview_4.png', 'https://rogers.kaposztaleves.hu/screenshots/ridgeview_5.png', 'https://rogers.kaposztaleves.hu/screenshots/ridgeview_6.png', 'https://rogers.kaposztaleves.hu/screenshots/ridgeview_7.png'],
        hint: 'Two-story suburban house with a long hallway.'
    },
    {
        name: 'Grafton Farmhouse',
        images: ['https://rogers.kaposztaleves.hu/screenshots/grafton_1.png', 'https://rogers.kaposztaleves.hu/screenshots/grafton_2.png', 'https://rogers.kaposztaleves.hu/screenshots/grafton_3.png', 'https://rogers.kaposztaleves.hu/screenshots/grafton_4.png', 'https://rogers.kaposztaleves.hu/screenshots/grafton_5.png', 'https://rogers.kaposztaleves.hu/screenshots/grafton_6.png', 'https://rogers.kaposztaleves.hu/screenshots/grafton_7.png', 'https://rogers.kaposztaleves.hu/screenshots/grafton_8.png', 'https://rogers.kaposztaleves.hu/screenshots/grafton_9.png', 'https://rogers.kaposztaleves.hu/screenshots/grafton_10.png', 'https://rogers.kaposztaleves.hu/screenshots/grafton_11.png'],
        hint: 'A two-story farmhouse layout with large spacious rooms.'
    },
    {
        name: 'Bleasdale Farmhouse',
        images: ['https://rogers.kaposztaleves.hu/screenshots/bleasdale_1.png'],
        hint: 'Large old farmhouse with rustic surroundings and an attic.'
    },
    {
        name: 'Camp Woodwind',
        images: ['https://rogers.kaposztaleves.hu/screenshots/woodwind_1.png', 'https://rogers.kaposztaleves.hu/screenshots/woodwind_2.png', 'https://rogers.kaposztaleves.hu/screenshots/woodwind_3.png', 'https://rogers.kaposztaleves.hu/screenshots/woodwind_4.png', 'https://rogers.kaposztaleves.hu/screenshots/woodwind_5.png', 'https://rogers.kaposztaleves.hu/screenshots/woodwind_6.png', 'https://rogers.kaposztaleves.hu/screenshots/woodwind_7.png', 'https://rogers.kaposztaleves.hu/screenshots/woodwind_8.png', 'https://rogers.kaposztaleves.hu/screenshots/woodwind_9.png'],
        hint: 'Small outdoor campsite map, a scaled down version.'
    },
    {
        name: 'Maple Lodge Campsite',
        images: ['https://rogers.kaposztaleves.hu/screenshots/maple_1.png', 'https://rogers.kaposztaleves.hu/screenshots/maple_2.png', 'https://rogers.kaposztaleves.hu/screenshots/maple_3.png', 'https://rogers.kaposztaleves.hu/screenshots/maple_4.png', 'https://rogers.kaposztaleves.hu/screenshots/maple_5.png', 'https://rogers.kaposztaleves.hu/screenshots/maple_6.png', 'https://rogers.kaposztaleves.hu/screenshots/maple_7.png', 'https://rogers.kaposztaleves.hu/screenshots/maple_8.png', 'https://rogers.kaposztaleves.hu/screenshots/maple_9.png', 'https://rogers.kaposztaleves.hu/screenshots/maple_10.png'],
        hint: 'Outdoor map with cabins, trails, and open ground.'
    },
    {
        name: 'Brownstone High School',
        images: ['https://rogers.kaposztaleves.hu/screenshots/brownstone_1.png'],
        hint: 'Symmetrical school-like structure with long hallways.'
    },
    {
        name: 'Prison',
        images: ['https://rogers.kaposztaleves.hu/screenshots/prison_1.png'],
        hint: 'Long cell blocks and central corridors define this location.'
    },
    {
        name: 'Sunny Meadows / Restricted',
        images: ['https://rogers.kaposztaleves.hu/screenshots/sunnymeadows_1.png'],
        hint: 'Massive asylum-like map with many wings and rooms. Includes its smaller restricted variant.'
    },
    {
        name: 'Point Hope',
        images: ['https://rogers.kaposztaleves.hu/screenshots/pointhope_1.png', 'https://rogers.kaposztaleves.hu/screenshots/pointhope_2.png', 'https://rogers.kaposztaleves.hu/screenshots/pointhope_3.png', 'https://rogers.kaposztaleves.hu/screenshots/pointhope_4.png', 'https://rogers.kaposztaleves.hu/screenshots/pointhope_5.png', 'https://rogers.kaposztaleves.hu/screenshots/pointhope_6.png', 'https://rogers.kaposztaleves.hu/screenshots/pointhope_7.png', 'https://rogers.kaposztaleves.hu/screenshots/pointhope_8.png', 'https://rogers.kaposztaleves.hu/screenshots/pointhope_9.png', 'https://rogers.kaposztaleves.hu/screenshots/pointhope_10.png', 'https://rogers.kaposztaleves.hu/screenshots/pointhope_11.png', 'https://rogers.kaposztaleves.hu/screenshots/pointhope_12.png'],
        hint: 'Tall vertical location around a lighthouse structure.'
    },
    {
        name: 'Nells Diner',
        images: ['https://rogers.kaposztaleves.hu/screenshots/nellsdiner_1.png', 'https://rogers.kaposztaleves.hu/screenshots/nellsdiner_2.png', 'https://rogers.kaposztaleves.hu/screenshots/nellsdiner_3.png', 'https://rogers.kaposztaleves.hu/screenshots/nellsdiner_4.png', 'https://rogers.kaposztaleves.hu/screenshots/nellsdiner_5.png', 'https://rogers.kaposztaleves.hu/screenshots/nellsdiner_6.png', 'https://rogers.kaposztaleves.hu/screenshots/nellsdiner_7.png', 'https://rogers.kaposztaleves.hu/screenshots/nellsdiner_8.png', 'https://rogers.kaposztaleves.hu/screenshots/nellsdiner_9.png', 'https://rogers.kaposztaleves.hu/screenshots/nellsdiner_10.png'],
        hint: 'A roadside diner with a dining area, kitchen, and restrooms.'
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
    input.addEventListener('blur', () => {
        // Delay hiding slightly to allow mousedown on suggestions to fire
        setTimeout(() => suggestionsList.classList.add('hidden'), 150);
    });
    document.addEventListener('click', (e) => {
        if (e.target !== input && !suggestionsList.contains(e.target)) {
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
    
    // Optimization: Use DocumentFragment to batch DOM insertions
    const fragment = document.createDocumentFragment();
    matches.forEach((match) => {
        const li = document.createElement('li');
        li.textContent = match.name;
        li.addEventListener('mousedown', (e) => { // Use mousedown so it fires before blur
            e.preventDefault(); // Prevent input blurring
            input.value = match.name;
            suggestionsList.classList.add('hidden');
            input.focus();
        });
        fragment.appendChild(li);
    });
    suggestionsList.appendChild(fragment);
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
        if (partialMatches.length === 1) { // Only fallback if there is exactly ONE unambiguous match
            guessedPlace = partialMatches[0];
        }
    }

    if (!guessedPlace) {
        // Optimization: Use array.some() instead of find() since we only need a boolean
        const already = places.some((p) => p.name.toLowerCase() === guessName);
        if (already) {
            showError('You already guessed that place.');
        } else {
            showError('Place not recognized or too ambiguous.');
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
    // updateRevealState() will be called automatically when the image finishes loading
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


