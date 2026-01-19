let currentPlayer = "Player 1";
let selectedPieceType = "KITTEN";
const playmattSpots = document.querySelectorAll('.playmatt-spot');
const chooseKittenButton = document.querySelector("#choose-kitten");
const chooseCatButton = document.querySelector("#choose-cat");
const board = Array(36).fill(null);

const felineTokens = {
    "Player 1": { kittens: 8, cats: 0 },
    "Player 2": { kittens: 8, cats: 0 }
};

const winOrGrowUpCondition =   
[
    [0, 1, 2], 
    [1, 2, 3], 
    [2, 3, 4], 
    [3, 4, 5], 
    [6, 7, 8], 
    [7, 8, 9], 
    [8, 9, 10], 
    [9, 10, 11], 
    [12, 13, 14], 
    [13, 14, 15], 
    [14, 15, 16], 
    [15, 16, 17], 
    [18, 19, 20], 
    [19, 20, 21], 
    [20, 21, 22], 
    [21, 22, 23], 
    [24, 25, 26], 
    [25, 26, 27], 
    [26, 27, 28], 
    [27, 28, 29], 
    [30, 31, 32], 
    [31, 32, 33], 
    [32, 33, 34], 
    [33, 34, 35], 
    [0, 6, 12], 
    [1, 7, 13], 
    [2, 8, 14], 
    [3, 9, 15], 
    [4, 10, 16], 
    [5, 11, 17], 
    [6, 12, 18], 
    [7, 13, 19], 
    [8, 14, 20], 
    [9, 15, 21], 
    [10, 16, 22], 
    [11, 17, 23], 
    [12, 18, 24], 
    [13, 19, 25], 
    [14, 20, 26], 
    [15, 21, 27], 
    [16, 22, 28], 
    [17, 23, 29], 
    [18, 24, 30], 
    [19, 25, 31], 
    [20, 26, 32], 
    [21, 27, 33], 
    [22, 28, 34], 
    [23, 29, 35], 
    [0, 7, 14], 
    [1, 8, 15], 
    [2, 9, 16], 
    [3, 10, 17], 
    [6, 13, 20], 
    [7, 14, 21], 
    [8, 15, 22], 
    [9, 16, 23], 
    [12, 19, 26], 
    [13, 20, 27], 
    [14, 21, 28], 
    [15, 22, 29], 
    [18, 25, 32], 
    [19, 26, 33], 
    [20, 27, 34], 
    [21, 28, 35], 
    [2, 7, 12], 
    [3, 8, 13], 
    [4, 9, 14], 
    [5, 10, 15], 
    [8, 13, 18], 
    [9, 14, 19], 
    [10, 15, 20], 
    [11, 16, 21], 
    [14, 19, 24], 
    [15, 20, 25], 
    [16, 21, 26], 
    [17, 22, 27], 
    [20, 25, 30], 
    [21, 26, 31], 
    [22, 27, 32], 
    [23, 28, 33]
];

function getPlayerToken(piece) {
    const playerNumber = piece.owner === "Player 1" ? "1" : "2";
    const pieceLetter = piece.type === "KITTEN" ? "K" : "C";
    return playerNumber + pieceLetter;
};

function playerTurn() {
    currentPlayer = (currentPlayer === "Player 1") ? "Player 2" : "Player 1";
};

function placePiece(index, clickedPlaymattSpot) {
    if (board[index] !== null) {
        return false;
    }

    let pieceTypeToPlace = null;

    if (felineTokens[currentPlayer].kittens > 0) {
        pieceTypeToPlace = "KITTEN";
        felineTokens[currentPlayer].kittens -= 1;
    } else if (felineTokens[currentPlayer].cats > 0) {
        pieceTypeToPlace = "CAT";
        felineTokens[currentPlayer].cats -= 1;
    } else {
        return false;
    }

    board[index] = { owner: currentPlayer, type: pieceTypeToPlace };
    clickedPlaymattSpot.textContent = getPlayerToken(board[index]);

    return true;
};

function handlePlaymattSpotClicked(event) {
    const indexOfSpotClicked = Number(event.currentTarget.dataset.index);

    console.log("Playmatt spot clicked on:", indexOfSpotClicked);

    const isPlaced = placePiece(indexOfSpotClicked, event.currentTarget);

    if (!isPlaced) return;

    theBoopening(indexOfSpotClicked);

    const result = checker();
    if (result.type === "GROW") {
    growUpKittens(result);
}
    console.log(result);

    playerTurn();
};

function checker() {
    for (const [firstIndex, secondIndex, thirdIndex] of winOrGrowUpCondition) {
        const firstPiece = board[firstIndex];
        const secondPiece = board[secondIndex];
        const thirdPiece = board[thirdIndex];

        if (firstPiece === null || secondPiece === null || thirdPiece === null) {
            continue;
        }

        const sameOwner =
            firstPiece.owner === secondPiece.owner &&
            firstPiece.owner === thirdPiece.owner;

        const allKittens =
            firstPiece.type === "KITTEN" &&
            secondPiece.type === "KITTEN" &&
            thirdPiece.type === "KITTEN";

        if (sameOwner && allKittens) {
            return {
                type: "GROW",
                player: firstPiece.owner,
                line: [firstIndex, secondIndex, thirdIndex]
            };
        }
    }

    return { type: "NONE" };
};

function growUpKittens(result) {
    for (const index of result.line) {
        board[index] = null;
        playmattSpots[index].textContent = "";
    }

    felineTokens[result.player].cats = Math.min(8, felineTokens[result.player].cats + 3);

    console.log(result.player, "cats now:", felineTokens[result.player].cats);
};

function indexToRow(index) {
    return Math.floor(index / 6);
};

function indexToColumn(index) {
    return index % 6;
};

function isInsideBoard(row, column) {
    return row >= 0 && row < 6 && column >= 0 && column < 6;
};

function rowColToIndex(row, column) {
    return row * 6 + column;
};

function getAdjacentIndices(index) {
    const row = indexToRow(index);
    const column = indexToColumn(index);

    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1],  [1, 0],  [1, 1],
    ];

    const adjacentIndices = [];

    for (const [rowOffset, columnOffset] of directions) {
        const newRow = row + rowOffset;
        const newColumn = column + columnOffset;

        if (isInsideBoard(newRow, newColumn)) {
            adjacentIndices.push(rowColToIndex(newRow, newColumn));
        }
    }

    return adjacentIndices;
};

function isLineOfTwoBlocking(placedIndex, rowDirection, columnDirection) {
    const placedRow = indexToRow(placedIndex);
    const placedColumn = indexToColumn(placedIndex);

    const firstRow = placedRow + rowDirection;
    const firstColumn = placedColumn + columnDirection;

    const secondRow = placedRow + (rowDirection * 2);
    const secondColumn = placedColumn + (columnDirection * 2);

    if (!isInsideBoard(firstRow, firstColumn) || !isInsideBoard(secondRow, secondColumn)) {
        return false;
    }

    const firstIndex = rowColToIndex(firstRow, firstColumn);
    const secondIndex = rowColToIndex(secondRow, secondColumn);

    return board[firstIndex] !== null && board[secondIndex] !== null;
};

function theBoopening(placedIndex) {
    const adjacentIndices = getAdjacentIndices(placedIndex);

    for (const adjacentIndex of adjacentIndices) {
        if (board[adjacentIndex] === null) {
            continue;
        }

        const placedRow = indexToRow(placedIndex);
        const placedColumn = indexToColumn(placedIndex);

        const adjacentRow = indexToRow(adjacentIndex);
        const adjacentColumn = indexToColumn(adjacentIndex);

        const rowDirection = adjacentRow - placedRow;
        const columnDirection = adjacentColumn - placedColumn;

        if (isLineOfTwoBlocking(placedIndex, rowDirection, columnDirection)) {
            continue;
        }

        const targetRow = adjacentRow + rowDirection;
        const targetColumn = adjacentColumn + columnDirection;

        const movingPiece = board[adjacentIndex];

        board[adjacentIndex] = null;
        playmattSpots[adjacentIndex].textContent = "";

        if (!isInsideBoard(targetRow, targetColumn)) {
            continue;
        }

        const targetIndex = rowColToIndex(targetRow, targetColumn);

        if (board[targetIndex] === null) {
            board[targetIndex] = movingPiece;
            playmattSpots[targetIndex].textContent = getPlayerToken(movingPiece);
        } else {
            board[adjacentIndex] = movingPiece;
            playmattSpots[adjacentIndex].textContent = getPlayerToken(movingPiece);
        }
    }
};

chooseKittenButton.addEventListener("click", () => {
    selectedPieceType = "KITTEN";
});

chooseCatButton.addEventListener("click", () => {
    selectedPieceType = "CAT";
});

playmattSpots.forEach(item => {
    item.addEventListener('click', handlePlaymattSpotClicked); 
});