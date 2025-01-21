const board = document.getElementById('board');
const winnerText = document.getElementById('winner');
const resetButton = document.getElementById('reset');

// Estado inicial del juego
let currentPlayer = 'X';
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

// Combinaciones ganadoras
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
  [0, 4, 8], [2, 4, 6]             // Diagonales
];

// Crear las celdas del tablero
function createBoard() {
    board.innerHTML = ''; // Limpiar el tablero
    boardState.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.dataset.index = index;
        cellElement.textContent = cell;
        board.appendChild(cellElement);
    });
}

// Manejar clics en las celdas
board.addEventListener('click', (e) => {
    if (!gameActive) return; // Si el juego terminó, no hacer nada
    const target = e.target;
    const index = target.dataset.index;
    if (target.classList.contains('cell') && !target.classList.contains('taken')) {
        boardState[index] = currentPlayer;
        target.textContent = currentPlayer;
        target.classList.add('taken');
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
});

// Verificar si hay un ganador
function checkWinner() {
    let roundWon = false;
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        gameActive = false;
        winnerText.textContent = `¡Jugador ${currentPlayer} gana!`;
        return;
    }
    // Verificar si hay empate
    if (!boardState.includes('')) {
        gameActive = false;
        winnerText.textContent = '¡Es un empate!';
    }
}

// Reiniciar el juego
resetButton.addEventListener('click', () => {
    currentPlayer = 'X';
    gameActive = true;
    boardState = ['', '', '', '', '', '', '', '', ''];
    winnerText.textContent = '';
    createBoard();
});

// Inicializar el tablero
createBoard();