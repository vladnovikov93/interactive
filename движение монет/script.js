document.addEventListener('DOMContentLoaded', (event) => {
    initializeCoins();
});

let coins = [];
let initialCoins = []; // To store initial state of coins
let selectedCoinIndex = null;
let numberOfCoins = 7;

function initializeCoins() {
    coins = Array.from({ length: numberOfCoins }, (_, i) => i);
    initialCoins = [...coins]; // Store initial state
    shuffleArray(coins);
    displayCoins();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayCoins() {
    const coinCircle = document.getElementById('coin-circle');
    coinCircle.innerHTML = '';
    const angleIncrement = 360 / coins.length;

    coins.forEach((coin, index) => {
        const coinElement = document.createElement('div');
        coinElement.className = 'coin';
        coinElement.innerText = coin;
        coinElement.onclick = () => selectCoin(index);
        const angle = index * angleIncrement;
        coinElement.style.transform = `rotate(${angle}deg) translate(100px) rotate(-${angle}deg)`;
        coinCircle.appendChild(coinElement);
    });

    // Highlight selected coin if there is one
    if (selectedCoinIndex !== null) {
        const coinsElements = coinCircle.children;
        coinsElements[selectedCoinIndex].classList.add('selected');
    }
}

function selectCoin(index) {
    const coinCircle = document.getElementById('coin-circle');
    const coinsElements = coinCircle.children;

    if (selectedCoinIndex !== null) {
        coinsElements[selectedCoinIndex].classList.remove('selected');
    }

    selectedCoinIndex = index;
    coinsElements[selectedCoinIndex].classList.add('selected');
}

function moveCoin() {
    if (selectedCoinIndex === null) {
        alert('Please select a coin.');
        return;
    }

    const direction = document.getElementById('direction').value;
    const n = coins[selectedCoinIndex];
    const length = coins.length;

    // Save the starting index and value of the selected coin
    const startSelectedIndex = selectedCoinIndex;
    const startCoinValue = coins[selectedCoinIndex];

    for (let i = 0; i < n; i++) {
        if (direction === 'clockwise') {
            const nextIndex = (selectedCoinIndex + 1) % length;
            swapCoins(selectedCoinIndex, nextIndex);
            selectedCoinIndex = nextIndex;
        } else {
            const prevIndex = (selectedCoinIndex - 1 + length) % length;
            swapCoins(selectedCoinIndex, prevIndex);
            selectedCoinIndex = prevIndex;
        }
    }

    // Find the new index of the coin with the same value as startCoinValue
    //const newIndex = coins.findIndex(coin => coin === startCoinValue);
    const newIndex = selectedCoinIndex;
    // Restore selected coin to the new index
    selectedCoinIndex = newIndex !== -1 ? newIndex : startSelectedIndex;

    displayCoins();

    if (checkWin()) {
        document.getElementById('message').innerText = 'Ты победил! Молодец!';
    } else {
        document.getElementById('message').innerText = '';
    }
}

function swapCoins(index1, index2) {
    const temp = coins[index1];
    coins[index1] = coins[index2];
    coins[index2] = temp;
}

function checkWin() {
    const length = coins.length;

    for (let start = 0; start < length; start++) {
        let isNonDecreasing = true;
        for (let i = 0; i < length-1; i++) {
            if (coins[(start + i) % length] > coins[(start + i + 1) % length]) {
                isNonDecreasing = false;
                break;
            }
        }
        if (isNonDecreasing) {
            return true;
        }
    }

    return false;
}


function restart() {
    coins = [...initialCoins]; // Restore coins to initial state
    selectedCoinIndex = null;
    displayCoins();
    document.getElementById('message').innerText = '';
}

function differentArrangement() {
    initialCoins = Array.from({ length: coins.length }, () => Math.floor(Math.random() * coins.length)); // Generate random arrangement
    coins = initialCoins;
    //coins = Array.from({ length: coins.length }, () => Math.floor(Math.random() * coins.length)); // Generate random arrangement
    selectedCoinIndex = null;
    displayCoins();
    document.getElementById('message').innerText = '';
}


function differentQuantity() {
    const quantitySelect = document.getElementById('quantity');
    const newQuantity = parseInt(quantitySelect.value);
    numberOfCoins = newQuantity;
    
    if (isNaN(newQuantity) || newQuantity < 5 || newQuantity > 15) {
        alert('Выберите число от 5 до 15.');
        return;
    }

    coins = Array.from({ length: newQuantity }, (_, i) => i);
    initialCoins = [...coins]; // Update initial state
    shuffleArray(coins); // Shuffle new set of coins
    selectedCoinIndex = null;
    displayCoins();
    document.getElementById('message').innerText = '';
}