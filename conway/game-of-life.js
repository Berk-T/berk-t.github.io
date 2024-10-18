const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

const startAliveCellRatio = 0.7;
const firstColorRatio = 0.5;
const colors = ["#1a1a1a", "rgb(93, 135, 172)", "rgb(255, 144, 0)"]; // First index is dead cell color.

var updateRate = 42;
var squareSize;
var rows;
var cols;
var grid;

function createGrid(rows, cols) {
    let grid = [];
    for (let row = 0; row < rows; row++) {
        grid.push([]);
        for (let col = 0; col < cols; col++) {
            grid[row].push(
                Math.random() < startAliveCellRatio
                    ? Math.random() < firstColorRatio
                        ? 1
                        : 2
                    : 0
            );
        }
    }
    return grid;
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initializeGrid();
}

function initializeGrid() {
    squareSize = Math.min(canvas.width, canvas.height) / 50;
    rows = Math.floor(canvas.height / squareSize);
    cols = Math.floor(canvas.width / squareSize);
    grid = createGrid(rows, cols);
    drawGrid();
}

function drawGrid() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "black";

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const x = col * squareSize;
            const y = row * squareSize;
            context.fillStyle = colors[grid[row][col]];
            context.fillRect(x, y, squareSize, squareSize);
            context.strokeRect(x, y, squareSize, squareSize);
        }
    }
}

function updateGrid() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const { neighbors, color } = countNeighbors(row, col);
            if (grid[row][col] != 0) {
                if (neighbors < 2 || neighbors > 3) {
                    grid[row][col] = 0;
                }
            } else {
                if (neighbors === 3) {
                    grid[row][col] = color;
                }
            }
        }
    }

    drawGrid();
}

function countNeighbors(row, col) {
    let sum = [0, 0, 0];
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            const r = (row + i + rows) % rows;
            const c = (col + j + cols) % cols;
            sum[grid[r][c]]++;
        }
    }
    sum[grid[row][col]] -= 1;
    if (grid[row][col] === 0)
        return {
            neighbors: sum[1] + sum[2],
            color:
                sum[1] > sum[2]
                    ? 1
                    : sum[1] === sum[2]
                    ? Math.random() < 0.5
                        ? 1
                        : 2
                    : 2,
        };
    else return { neighbors: sum[grid[row][col]], color: grid[row][col] };
}

let interval = setInterval(updateGrid, updateRate);

window.addEventListener("resize", resizeCanvas);

canvas.onwheel = (event) => {
    if (event.deltaY > 0) updateRate = Math.max(42, updateRate - 100);
    else updateRate = Math.min(1000, updateRate + 100);
    clearInterval(interval);
    interval = setInterval(updateGrid, updateRate);
};

resizeCanvas();
