let piles = [0, 5, 6, 7];
let history = [];
let initialPiles = [...piles];

function renderPiles() {
    document.getElementById('pile1Count').textContent = piles[1];
    document.getElementById('pile2Count').textContent = piles[2];
    document.getElementById('pile3Count').textContent = piles[3];
}

function moveHalfCoins(from, to) {
    if (piles[from] % 2 === 0) {
        saveState();
        let half = piles[from] / 2;
        piles[from] -= half;
        piles[to] += half;
        renderPiles();
        checkWin();
    } else {
        alert("Нельзя переложить половину монет из этой стопки, так как количество монет нечётное.");
    }
}

function removeOneCoin(pile) {
    if (piles[pile] === 1) {
        saveState();
        piles[pile] -= 1;
        renderPiles();
        checkWin();
    } else {
        alert("Нельзя удалить одну монету из этой стопки, так как количество монет не равно одной.");
    }
}

function saveState() {
    history.push([...piles]);
}

function undo() {
    if (history.length > 0) {
        piles = history.pop();
        renderPiles();
        document.getElementById('winMessage').style.display = 'none';
    } else {
        alert("Нет действий для отмены.");
    }
}

function checkWin() {
    if (piles[1] === 0 && piles[2] === 0 && piles[3] === 0) {
        alert('Ты выиграл!');
        document.getElementById('winMessage').style.display = 'block';
    }
}

function resetGame() {
    piles = [...initialPiles];
    history = [];
    renderPiles();
    document.getElementById('winMessage').style.display = 'none';
}

function startOverWithNewPiles() {
    do {
        piles[1] = getRandomInt(1, 10);
        piles[2] = getRandomInt(1, 10);
        piles[3] = getRandomInt(1, 10);
    } while (!isValidPiles(piles));

    initialPiles = [...piles];
    resetGame();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

function isValidPiles(piles) {
    const evenPiles = piles.filter(pile => pile % 2 === 0);
    if (evenPiles.length < 2) return false;

    for (let i = 1; i <= 3; i++) {
        for (let j = 1; j <= 3; j++) {
            if (i !== j && gcd(piles[i], piles[j]) === 1) {
                return true;
            }
        }
    }
    return false;
}

// Инициализация игры
renderPiles();
