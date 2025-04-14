let currentPlayer = 'X';
let gameBoard = [];
let gameSize = 3;
let scores = { X: 0, O: 0 };

function startGame(size) 
{
    gameSize = size;
    gameBoard = Array(size).fill().map(() => Array(size).fill(''));
    currentPlayer = 'X';
    document.getElementById('winnerMessage').textContent = '';
    renderBoard();
}

function renderBoard() 
{
    const boardElement = document.getElementById('gameBoard');
    boardElement.style.gridTemplateColumns = `repeat(${gameSize}, 1fr)`;
    boardElement.innerHTML = '';

    for (let i = 0; i < gameSize; i++) 
    {
        for (let j = 0; j < gameSize; j++) 
        {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.textContent = gameBoard[i][j];
            
            if (gameBoard[i][j] === 'X') 
            {
                cell.style.color = 'red';
            } 
            else if (gameBoard[i][j] === 'O') 
            {
                cell.style.color = 'black';
            }
            
            cell.addEventListener('click', () => makeMove(i, j));
            boardElement.appendChild(cell);
        }
    }
}

function makeMove(row, col) 
{
    if (gameBoard[row][col] !== '' || checkWinner()) return;

    gameBoard[row][col] = currentPlayer;
    renderBoard();

    if (checkWinner()) 
    {
        scores[currentPlayer]++;
        updateScores();
        document.getElementById('winnerMessage').textContent = `${currentPlayer === 'X' ? 'User 2' : 'User 1'}, you are loser!`;
    } 
    else if (isBoardFull()) 
    {
        document.getElementById('winnerMessage').textContent = '⚠️ Warning: May contain traces of basic-level humans.';
    } 
    else 
    {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner() 
{
    for (let i = 0; i < gameSize; i++) 
    {
        if (gameBoard[i].every(cell => cell === currentPlayer)) return true;
    }

    for (let j = 0; j < gameSize; j++) 
    {
        if (gameBoard.every(row => row[j] === currentPlayer)) return true;
    }

    if (gameBoard.every((row, i) => row[i] === currentPlayer)) return true;

    if (gameBoard.every((row, i) => row[gameSize - 1 - i] === currentPlayer)) return true;

    return false;
}

function isBoardFull() 
{
    return gameBoard.every(row => row.every(cell => cell !== ''));
}

function updateScores() 
{
    document.getElementById('score1').textContent = scores.X;
    document.getElementById('score2').textContent = scores.O;
}

startGame(3); 