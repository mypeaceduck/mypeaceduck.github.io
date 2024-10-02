// script.js

const mazeElement = document.getElementById('maze');
const playButton = document.getElementById('playButton');
const rows = 10;
const cols = 10;
let playerPosition = { row: 0, col: 0 };
let isPlaying = false;  // Flag to toggle between build and play modes

// Initially, all cells are empty (0) and walls can be added
let maze = Array.from({ length: rows }, () => Array(cols).fill(0));

// 0 = path, 1 = wall

// Event listener for play button
playButton.addEventListener('click', () => {
  isPlaying = true;
  playButton.disabled = true;  // Disable play button after starting the game
  createMaze();  // Re-render the maze
});

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
      if (row === playerPosition.row && col === playerPosition.col && isPlaying) {
        cell.classList.add('player');
      }
      if (row === rows - 1 && col === cols - 1 && isPlaying) {
        cell.classList.add('goal');
      }

      cell.dataset.row = row;
      cell.dataset.col = col;
      mazeElement.appendChild(cell);

      // Add event listeners based on the mode (building or playing)
      if (!isPlaying) {
        // Build mode: Left-click to add wall, right-click to remove wall
        cell.addEventListener('click', () => toggleWall(row, col));
        cell.addEventListener('contextmenu', (e) => {
          e.preventDefault();  // Prevent the context menu
          removeWall(row, col);
        });
      } else {
        // Play mode: Move by clicking on neighboring cells
        cell.addEventListener('click', () => movePlayer(row, col));
      }
    }
  }
}

// Function to toggle wall during build mode
function toggleWall(row, col) {
  if (maze[row][col] === 0) {
    maze[row][col] = 1;  // Add wall
  } else {
    maze[row][col] = 0;  // Remove wall
  }
  createMaze();  // Re-render the maze
}

// Function to remove wall on right-click
function removeWall(row, col) {
  maze[row][col] = 0;  // Remove wall
  createMaze();  // Re-render the maze
}

// Function to move player during play mode
function movePlayer(row, col) {
  // Check if the clicked cell is a neighboring cell (no diagonal moves)
  const isNeighbor = Math.abs(playerPosition.row - row) + Math.abs(playerPosition.col - col) === 1;

  // Ensure the move is to a neighboring cell and not into a wall
  if (isNeighbor && maze[row][col] === 0) {
    playerPosition = { row, col };
    checkGoal();  // Check if the player reached the goal
    createMaze();  // Re-render the maze
  }
}

// Function to move with arrow keys (during play mode)
function handleKeydown(event) {
  if (!isPlaying) return;  // Only handle keys if in play mode

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

// Initialize the maze builder
createMaze();
window.addEventListener('keydown', handleKeydown);
