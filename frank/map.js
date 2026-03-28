const places = [
    {
        name: 'Tanglewood Drive',
        draw: (ctx, w, h) => {
            drawFloor(ctx, w, h, '#1e2c34');
            drawRoad(ctx, w, h);
            drawHouseBlock(ctx, 40, 70, 220, 160, '#50616d');
            drawHouseBlock(ctx, 260, 70, 140, 100, '#647a86');
            drawHouseBlock(ctx, 260, 180, 210, 100, '#5c707c');
            drawHouseBlock(ctx, 480, 80, 120, 200, '#465660');
            drawTreeDots(ctx, 18, '#334a39', w, h);
        },
        hint: 'Small suburban house map with a compact interior.'
    },
    {
        name: 'Willow Street House',
        draw: (ctx, w, h) => {
            drawFloor(ctx, w, h, '#222d2b');
            drawRoad(ctx, w, h);
            drawHouseBlock(ctx, 90, 65, 160, 210, '#576a63');
            drawHouseBlock(ctx, 255, 65, 140, 90, '#6b7f76');
            drawHouseBlock(ctx, 255, 170, 260, 105, '#4d5f58');
            drawHouseBlock(ctx, 525, 110, 70, 165, '#42504b');
            drawTreeDots(ctx, 16, '#2c4937', w, h);
        },
        hint: 'Another small house map, but with a more stretched layout.'
    },
    {
        name: 'Bleasdale Farmhouse',
        draw: (ctx, w, h) => {
            drawFloor(ctx, w, h, '#30271f');
            drawFieldRows(ctx, w, h, '#3f3327');
            drawHouseBlock(ctx, 140, 70, 250, 200, '#75624d');
            drawHouseBlock(ctx, 400, 110, 130, 160, '#675542');
            drawHouseBlock(ctx, 80, 230, 220, 80, '#5a4a39');
            drawTreeDots(ctx, 12, '#554832', w, h);
        },
        hint: 'Large old farmhouse with rustic surroundings.'
    },
    {
        name: 'Maple Lodge Campsite',
        draw: (ctx, w, h) => {
            drawFloor(ctx, w, h, '#1f3123');
            drawPathway(ctx, w, h, '#5b4d3a');
            drawLake(ctx, 420, 180, 150, 95, '#234b61');
            drawCabin(ctx, 90, 80, 120, 90, '#6b583f');
            drawCabin(ctx, 240, 70, 100, 75, '#756043');
            drawCabin(ctx, 280, 220, 130, 90, '#5d4a34');
            drawCampDots(ctx, 26, '#2f5d39', w, h);
        },
        hint: 'Outdoor map with cabins, trails, and open ground.'
    },
    {
        name: 'Prison',
        draw: (ctx, w, h) => {
            drawFloor(ctx, w, h, '#252c35');
            drawCellGrid(ctx, 70, 55, 500, 250, '#5b6977', '#3f4a56');
            drawHallway(ctx, 280, 40, 80, 280, '#2d3946');
            drawGateBars(ctx, 30, 45, 580, 270, '#7e8b98');
        },
        hint: 'Long cell blocks and central corridors define this location.'
    },
    {
        name: 'Sunny Meadows',
        draw: (ctx, w, h) => {
            drawFloor(ctx, w, h, '#2e2a30');
            drawHospitalWing(ctx, 60, 70, 520, 220, '#6e6271', '#4a414e');
            drawCrosshall(ctx, 285, 40, 70, 280, '#3a3240');
            drawRoomDots(ctx, 24, '#8f8192', 70, 70, 500, 220);
        },
        hint: 'Massive asylum-like map with many wings and rooms.'
    },
    {
        name: 'Brownstone High School',
        draw: (ctx, w, h) => {
            drawFloor(ctx, w, h, '#2b2f2a');
            drawHallway(ctx, 60, 160, 520, 40, '#4d5a4a');
            drawHallway(ctx, 290, 50, 60, 260, '#556252');
            drawClassrooms(ctx, 70, 60, 200, 90, '#6f7f68');
            drawClassrooms(ctx, 370, 60, 200, 90, '#6f7f68');
            drawClassrooms(ctx, 70, 210, 200, 90, '#65735f');
            drawClassrooms(ctx, 370, 210, 200, 90, '#65735f');
        },
        hint: 'Symmetrical school-like structure with long hallways.'
    },
    {
        name: 'Point Hope',
        draw: (ctx, w, h) => {
            drawFloor(ctx, w, h, '#1f252f');
            drawSea(ctx, 0, 0, w, h, '#1f3f57');
            drawRock(ctx, 250, 40, 220, 280, '#46505b');
            drawLighthouseBase(ctx, 300, 90, 120, 210, '#8a7b66');
            drawSpiralMarkers(ctx, 14, 360, 95, 95, '#d6c39e');
        },
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
    targetPlace.draw(baseCtx, baseCanvas.width, baseCanvas.height);

    baseCtx.strokeStyle = 'rgba(255,255,255,0.16)';
    baseCtx.lineWidth = 2;
    baseCtx.strokeRect(8, 8, baseCanvas.width - 16, baseCanvas.height - 16);
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

function drawFloor(ctx, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, w, h);
}

function drawRoad(ctx, w, h) {
    ctx.fillStyle = '#2b2b2b';
    ctx.fillRect(0, h - 70, w, 70);
    ctx.fillStyle = '#585858';
    for (let i = 0; i < w; i += 36) {
        ctx.fillRect(i + 8, h - 36, 16, 4);
    }
}

function drawHouseBlock(ctx, x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = '#d0d6db';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);
}

function drawTreeDots(ctx, count, color, w, h) {
    ctx.fillStyle = color;
    for (let i = 0; i < count; i += 1) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const r = 5 + Math.random() * 12;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawFieldRows(ctx, w, h, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    for (let y = 14; y < h; y += 18) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y + 8);
        ctx.stroke();
    }
}

function drawPathway(ctx, w, h, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 22;
    ctx.beginPath();
    ctx.moveTo(50, 320);
    ctx.quadraticCurveTo(180, 240, 220, 130);
    ctx.quadraticCurveTo(300, 50, 520, 80);
    ctx.stroke();
}

function drawLake(ctx, x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, -0.2, 0, Math.PI * 2);
    ctx.fill();
}

function drawCabin(ctx, x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = '#3a2f22';
    ctx.fillRect(x + 18, y + 20, w - 36, h - 36);
}

function drawCampDots(ctx, count, color, w, h) {
    ctx.fillStyle = color;
    for (let i = 0; i < count; i += 1) {
        const x = 20 + Math.random() * (w - 40);
        const y = 20 + Math.random() * (h - 40);
        const size = 8 + Math.random() * 14;
        ctx.fillRect(x, y, size, size);
    }
}

function drawCellGrid(ctx, x, y, w, h, cellColor, lineColor) {
    ctx.fillStyle = '#1f2730';
    ctx.fillRect(x, y, w, h);

    const cols = 10;
    const rows = 6;
    const cw = w / cols;
    const rh = h / rows;

    ctx.fillStyle = cellColor;
    for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < cols; c += 1) {
            if ((r + c) % 2 === 0) {
                ctx.fillRect(x + c * cw + 2, y + r * rh + 2, cw - 4, rh - 4);
            }
        }
    }

    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 1;
    for (let r = 0; r <= rows; r += 1) {
        ctx.beginPath();
        ctx.moveTo(x, y + r * rh);
        ctx.lineTo(x + w, y + r * rh);
        ctx.stroke();
    }
    for (let c = 0; c <= cols; c += 1) {
        ctx.beginPath();
        ctx.moveTo(x + c * cw, y);
        ctx.lineTo(x + c * cw, y + h);
        ctx.stroke();
    }
}

function drawHallway(ctx, x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawGateBars(ctx, x, y, w, h, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    for (let i = x; i <= x + w; i += 24) {
        ctx.beginPath();
        ctx.moveTo(i, y);
        ctx.lineTo(i, y + h);
        ctx.stroke();
    }
}

function drawHospitalWing(ctx, x, y, w, h, wingColor, lineColor) {
    ctx.fillStyle = wingColor;
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2;
    for (let i = x + 30; i < x + w; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, y);
        ctx.lineTo(i, y + h);
        ctx.stroke();
    }
    for (let i = y + 30; i < y + h; i += 34) {
        ctx.beginPath();
        ctx.moveTo(x, i);
        ctx.lineTo(x + w, i);
        ctx.stroke();
    }
}

function drawCrosshall(ctx, x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
    ctx.fillRect(120, 155, 400, 50);
}

function drawRoomDots(ctx, count, color, x, y, w, h) {
    ctx.fillStyle = color;
    for (let i = 0; i < count; i += 1) {
        const rx = x + Math.random() * w;
        const ry = y + Math.random() * h;
        ctx.fillRect(rx, ry, 8, 8);
    }
}

function drawClassrooms(ctx, x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = '#c8d1c2';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);

    ctx.strokeStyle = '#4a5447';
    ctx.lineWidth = 1;
    for (let i = x + 30; i < x + w; i += 35) {
        ctx.beginPath();
        ctx.moveTo(i, y);
        ctx.lineTo(i, y + h);
        ctx.stroke();
    }
}

function drawSea(ctx, x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = '#4d7da0';
    ctx.lineWidth = 2;
    for (let row = 18; row < h; row += 28) {
        ctx.beginPath();
        ctx.moveTo(0, row);
        ctx.bezierCurveTo(w * 0.2, row + 8, w * 0.4, row - 8, w * 0.6, row + 5);
        ctx.bezierCurveTo(w * 0.8, row + 12, w, row - 6, w, row + 2);
        ctx.stroke();
    }
}

function drawRock(ctx, x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x + 20, y + h);
    ctx.quadraticCurveTo(x - 15, y + h * 0.5, x + 90, y + 30);
    ctx.quadraticCurveTo(x + w, y - 10, x + w - 20, y + h);
    ctx.closePath();
    ctx.fill();
}

function drawLighthouseBase(ctx, x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x + 30, y, w - 60, h);
    ctx.fillStyle = '#a79479';
    for (let i = 0; i < h; i += 20) {
        ctx.fillRect(x + 30, y + i, w - 60, 10);
    }
    ctx.fillStyle = '#e6d8bf';
    ctx.fillRect(x + 18, y - 22, w - 36, 24);
}

function drawSpiralMarkers(ctx, count, cx, cy, radius, color) {
    ctx.fillStyle = color;
    for (let i = 0; i < count; i += 1) {
        const t = i * 0.6;
        const r = (radius / count) * i;
        const x = cx + Math.cos(t) * r;
        const y = cy + Math.sin(t) * r;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
    }
}
