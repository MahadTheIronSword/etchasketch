let gridSize = 16;
let currentColor = "#000000"

const gridContainer = document.querySelector("#grid-container");
const clearGridButton = document.querySelector("#clear-grid");
const gridSizeInput = document.querySelector("#grid-size");
const rainbowButton = document.querySelector("#rainbow");
const blackButton = document.querySelector("#black");
const eraser = document.querySelector("#eraser");

const gridTiles = [];
const hexValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

const generateRandomHexColor = () => {
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += hexValues[Math.floor(Math.random() * hexValues.length)];
    }

    return color;
}

const createGridSquare = (parent) => {
    const square = document.createElement("div");
    square.classList.add("grid-tile");

    square.addEventListener("mouseenter", () => {
        square.style.setProperty(
            "background-color",
            currentColor !== "rainbow" ? currentColor : generateRandomHexColor()
        )
    });

    parent.appendChild(square);
    
    return square;
}

const createGrid = () => {
    gridContainer.removeChild(gridContainer.firstChild);

    const grid = document.createElement("div");
    grid.classList.add("grid-ct");

    grid.style.setProperty(
        "grid-template-columns",
        `repeat(${gridSize}, 1fr)`
    );

    grid.style.setProperty(
        "grid-template-rows",
        `repeat(${gridSize}, 1fr)`
    );

    gridContainer.appendChild(grid);

    for (let i = 0; i < gridSize; i++) {
        gridTiles[i] = [];

        for (let j = 0; j < gridSize; j++) {
            gridTiles[i][j] = createGridSquare(grid);
        }
    }
}

clearGridButton.addEventListener("click", () => {
    gridTiles.forEach(row => {
        row.forEach(tile => {
            tile.style.setProperty(
                "background-color",
                "#FFFFFF"
            )
        });
    })
})

gridSizeInput.addEventListener("focusout", () => {
    const input = gridSizeInput.value;
    const newGridSize = parseInt(input);

    if (newGridSize && newGridSize > 1 && newGridSize < 100) {
        gridSize = newGridSize;
        createGrid();
    }
})

blackButton.addEventListener("click", () => {
    currentColor = "#000000";
})

rainbowButton.addEventListener("click", () => {
    currentColor = "rainbow";
})

eraser.addEventListener("click", () => {
    currentColor = "#FFFFFF";
})

createGrid();