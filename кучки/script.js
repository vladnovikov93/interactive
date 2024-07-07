let piles = [0, 5, 6, 7];
let history = [];
let initialPiles = [...piles];

function renderPiles() {
    renderPile(1);
    renderPile(2);
    renderPile(3);
}

function renderPile(pileNumber) {
    const pileContainer = document.getElementById(`pile${pileNumber}`);
    pileContainer.innerHTML = '';

    const pileCount = piles[pileNumber];
    const coinsContainer = document.createElement('div');
    coinsContainer.className = 'coins-container';

    let fullStacks = Math.floor(pileCount / 4);
    let remainder = pileCount % 4;

    for (let i = 0; i < fullStacks; i++) {
        const stack = document.createElement('div');
        stack.className = 'coin-stack';
        for (let j = 0; j < 4; j++) {
            const coin = document.createElement('div');
            coin.className = 'coin';
            stack.appendChild(coin);
        }
        coinsContainer.appendChild(stack);
    }

    const remainderStack = document.createElement('div');
    remainderStack.className = 'coin-stack';
    for (let i = 0; i < remainder; i++) {
        const coin = document.createElement('div');
        coin.className = 'coin';
        remainderStack.appendChild(coin);
    }
    coinsContainer.appendChild(remainderStack);

    const pileInfo = document.createElement('div');
    pileInfo.innerText = `Стопка ${pileNumber}: ${pileCount} монет`;

    const removeButton = document.createElement('button');
    removeButton.className = 'remove-btn';
    removeButton.innerText = 'Убрать';
    removeButton.onclick = () => removeOneCoin(pileNumber);

    const moveButtons = document.createElement('div');
    moveButtons.className = 'move-buttons';

    for (let i = 1; i <= 3; i++) {
        if (i !== pileNumber) {
            const moveButton = document.createElement('button');
            moveButton.className = 'move-btn';
            moveButton.innerText = `в ${i}`;
            moveButton.onclick = () => moveHalfCoins(pileNumber, i);
            moveButtons.appendChild(moveButton);
        }
    }

    pileContainer.appendChild(removeButton);
    pileContainer.appendChild(moveButtons);
    pileContainer.appendChild(pileInfo);
    pileContainer.appendChild(coinsContainer);
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
