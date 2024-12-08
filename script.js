// script.js

// Get the canvas and its context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set initial game parameters
const snakeSize = 20;
let snake = [{ x: 60, y: 60 }, { x: 40, y: 60 }, { x: 20, y: 60 }];
let food = { x: 100, y: 100 };
let dx = snakeSize; // Initial direction (right)
let dy = 0;
let score = 0;
let gameInterval;
let isGameRunning = false;

// Function to draw the snake
function drawSnake() {
    ctx.fillStyle = '#00FF00'; // Snake color
    snake.forEach(part => {
        ctx.fillRect(part.x, part.y, snakeSize, snakeSize);
    });
}

// Function to draw the food
function drawFood() {
    ctx.fillStyle = '#FF0000'; // Food color
    ctx.fillRect(food.x, food.y, snakeSize, snakeSize);
}

// Function to update the game state
function update() {
    // Move the snake by adding a new head based on the direction
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // Check for collisions with walls
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || collisionWithSnake(head)) {
        gameOver();
        return;
    }

    // Add the new head to the snake
    snake.unshift(head);

    // Check if the snake eats the food
    if (head.x === food.x && head.y === food.y) {
        score += 10; // Increase the score
        document.getElementById('score').innerText = `Score: ${score}`;
        generateFood(); // Generate a new food
    } else {
        // Remove the tail if no food is eaten
        snake.pop();
    }

    // Clear the canvas and redraw everything
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
}

// Function to check if the snake collides with itself
function collisionWithSnake(head) {
    return snake.some((part, index) => index !== 0 && part.x === head.x && part.y === head.y);
}

// Function to generate a random position for the food
function generateFood() {
    const x = Math.floor(Math.random() * (canvas.width / snakeSize)) * snakeSize;
    const y = Math.floor(Math.random() * (canvas.height / snakeSize)) * snakeSize;
    food = { x, y };
}

// Function to handle keyboard input for controlling the snake
function changeDirection(event) {
    if (event.key === 'ArrowUp' && dy === 0) {
        dx = 0;
        dy = -snakeSize;
    } else if (event.key === 'ArrowDown' && dy === 0) {
        dx = 0;
        dy = snakeSize;
    } else if (event.key === 'ArrowLeft' && dx === 0) {
        dx = -snakeSize;
        dy = 0;
    } else if (event.key === 'ArrowRight' && dx === 0) {
        dx = snakeSize;
        dy = 0;
    }
}

// Function to start the game
function startGame() {
    if (!isGameRunning) {
        isGameRunning = true;
        score = 0;
        document.getElementById('score').innerText = `Score: ${score}`;
        snake = [{ x: 60, y: 60 }, { x: 40, y: 60 }, { x: 20, y: 60 }];
        dx = snakeSize;
        dy = 0;
        gameInterval = setInterval(update, 100);
    }
}

// Function to end the game
function gameOver() {
    clearInterval(gameInterval);
    alert(`Game Over! Final Score: ${score}`);
    isGameRunning = false;
}

// Add event listener for key presses
document.addEventListener('keydown', changeDirection);

// Add event listener for the Start Game button
document.getElementById('startBtn').addEventListener('click', startGame);

// Initialize the game with an initial food spawn
generateFood();
