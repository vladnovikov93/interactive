let size = 5; // Initial table size
let table = document.getElementById('gameTable');
let history = []; // To keep track of actions
let countOnes = 0; // To keep track of the number of cells showing 1

function createTable() {
    table.innerHTML = '';
    for (let i = 0; i < size; i++) {
        let row = table.insertRow();
        for (let j = 0; j < size; j++) {
            let cell = row.insertCell();
            cell.onclick = function() { cellClicked(i, j); };
        }
    }
    history = []; // Reset history
    countOnes = 0; // Reset count of ones
    document.getElementById('countOnes').textContent = countOnes;
    document.getElementById('message').textContent = '';
}

function restart() {
    createTable();
}

function undo() {
    if (history.length === 0) return;

    let lastAction = history.pop();
    let cell = table.rows[lastAction.row].cells[lastAction.col];
    if (parseInt(cell.textContent) === 1) {
        countOnes--;
        document.getElementById('countOnes').textContent = countOnes;
    }
    cell.classList.remove('yellow');
    cell.textContent = '';

    // Update neighboring cells
    // updateNeighbors(lastAction.row, lastAction.col, -1);
}

function cellClicked(row, col) {
    let cell = table.rows[row].cells[col];
    if (cell.classList.contains('yellow')) return;

    cell.classList.add('yellow');
    let count = countYellowNeighbors(row, col);
    cell.textContent = count;
    
    if (count === 1) {
        countOnes++;
        document.getElementById('countOnes').textContent = countOnes;
    }

    history.push({row: row, col: col});
    // updateNeighbors(row, col, 1);
}

function countYellowNeighbors(row, col) {
    let count = 0;
    let directions = [
        [0, -1], // left
        [0, 1], // right
        [-1, 0], // up
        [1, 0] // down
    ];
    
    directions.forEach(([dx, dy]) => {
        let newRow = row + dx;
        let newCol = col + dy;
        if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
            if (table.rows[newRow].cells[newCol].classList.contains('yellow')) {
                count++;
            }
        }
    });

    return count;
}

function checkMax() {
    let onesCells = countOnes;
    let required = Math.floor((2 * size * size + 2 * size - 5) / 3)-(size+1)%2+(size==4);

    if (onesCells >= required) {
        document.getElementById('message').textContent = 'Да! Ты молодец!';
    } else {
        document.getElementById('message').textContent = 'Нет, можно больше!';
    }
}

document.getElementById('size').addEventListener('change', function() {
    size = parseInt(this.value);
    restart();
});

// Initial table creation
createTable();
