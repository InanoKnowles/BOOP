const playmattSpots = document.querySelectorAll('.playmatt-spot');

// 1. Prints the square that was clicked on to the console
// 2. Replaces playmatt spot's number with P1: K

function handlePlaymattSpotClicked(event) {
    console.log("Player1 - Kitten,  playmatt-spot:", event.target.textContent);
    this.textContent = 'P1: K';
}

playmattSpots.forEach(item => {
    item.addEventListener('click', handlePlaymattSpotClicked);
});

// Win Conditions
// Note: need to check if the combination is a kitten or a cat
// If the combination is filled with 3 kittens they boop out of gameplay
// 3 cats join the player's hand 

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