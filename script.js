// script.js

const mazeElement = document.getElementById('maze');
const rows = 10;
const cols = 10;
let playerPosition = { row: 0, col: 0 };
const maze = [
  [0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 1, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 0, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 0, 1, 0, 0]
];

// 0 = path, 1 = wall

// Function to create maze in the DOM
function createMaze() {
  mazeElement.innerHTML = '';
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      if (maze[row][col] === 1) {
        cell.classList.add('wall');
      }
      if (row === playerPosition.row && col === playerPosition.col) {
        cell.classList.add('player');
      }
      if (row === rows - 1 && col === cols - 1) {
        cell.classList.add('goal');
      }
      cell.dataset.row = row;
      cell.dataset.col = col;
      mazeElement.appendChild(cell);

      // Add click event to move player on click
      cell.addEventListener('click', () => movePlayer(row, col));
    }
  }
}

// Function to move player
function movePlayer(row, col) {
  if (maze[row][col] === 1) return; // Prevent movement into walls
  playerPosition = { row, col };
  checkGoal();
  createMaze();
}

// Function to move with arrow keys
function handleKeydown(event) {
  const { row, col } = playerPosition;
  if (event.key === 'ArrowUp' && row > 0 && maze[row - 1][col] === 0) {
    playerPosition.row--;
  }
  if (event.key === 'ArrowDown' && row < rows - 1 && maze[row + 1][col] === 0) {
    playerPosition.row++;
  }
  if (event.key === 'ArrowLeft' && col > 0 && maze[row][col - 1] === 0) {
    playerPosition.col--;
  }
  if (event.key === 'ArrowRight' && col < cols - 1 && maze[row][col + 1] === 0) {
    playerPosition.col++;
  }
  checkGoal();
  createMaze();
}

// Check if player reached the goal
function checkGoal() {
  if (playerPosition.row === rows - 1 && playerPosition.col === cols - 1) {
    alert('Congratulations! You reached the goal!');
  }
}

// Initialize
createMaze();
window.addEventListener('keydown', handleKeydown);
