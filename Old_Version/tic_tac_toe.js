let currentPlayer = 'X';
let gameBoard = [];
let gameSize = 3;

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
        document.getElementById('winnerMessage').textContent = `${currentPlayer === 'X' ? 'User1' : 'User2'}, you won!`;
    } 
    else if (isBoardFull()) 
    {
        document.getElementById('winnerMessage').textContent = 'It\'s a tie!';
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

startGame(3); 