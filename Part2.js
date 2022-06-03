const rs = require('readline-sync');
const initQuestion = rs.keyIn('Press any key to start.');

function entireGame(){
// Variables

const grid = [
    ['A1'], ['A2'], ['A3'],
    ['B1'], ['B2'], ['B3'],
    ['C1'], ['C2'], ['C3'],
];
let prevGuesses = [];

//Random Enemy Coordinates 
const randomizer = maxNum => Math.floor(Math.random() * maxNum);
const randomCoord = () => {
    let num = randomizer(9);
    return grid.flat(1)[num];
};
const ship1 = {
    coords: randomCoord(),
    isSunk: false,
};
const ship2 = {
    coords: randomCoord(),
    isSunk: false,
};
let enemyCoords = [ship1.coords, ship2.coords];
let  enemiesLeft = (enemyCoords.map((enemies) => enemies.isSunk ===false).length) -1 ;



// Guess  
function guesser() {
    let coordGuess = rs.question('Enter strike location with a letters a,b, or c, and either numbers 1,2, or 3, such as "A1" or "C3".', {
        limit: grid.flat(1),
        limitMessage: 'Please only enter A, B, or C with 1,2,or 3, such as "C2" or "B3". '
    });
    let actualCoordGuess = coordGuess.toUpperCase();
    if (prevGuesses.includes(actualCoordGuess)) {
        console.log(`You've already guessed ${actualCoordGuess}! Miss!`);
    }
    prevGuesses.push(actualCoordGuess);
    console.log(`Your previous guesses include: ${prevGuesses}. Happy Hunting!`);
    return actualCoordGuess;
};

//Hit or miss
function hitChecker(guess, enemyShip1, enemyShip2) {
    if (guess === enemyShip1.coords || guess === enemyShip2.coords) {
        console.log(`You have hit a Battleship! You have ${enemiesLeft} ship remaining! `);
        if (guess == enemyShip1.coords) {
            enemyShip1.isSunk = true;
        } else if (guess == enemyShip2.coords) {
            enemyShip2.isSunk = true;
        };
    }
    else {
        console.log('You have missed!');


        /* This is for cheating in the game to make it go faster (and helped with my coding ;D ) 

        console.log(`Try aiming for ${enemyCoords}.`);
        
        Remove these if you want EZ mode*/
    };
}

// Actual game structure
function game(guess, enemy1, enemy2) {
    if (prevGuesses.includes(enemy1.coords) &&
        prevGuesses.includes(enemy2.coords)) {
        return console.log('YOU HAVE DESTROYED ALL BATTLESHIPS AND HAVE WON THE BATTLE');
    } else {
        hitChecker(guess, enemy1, enemy2);
        let nextGuess = guesser();
        game(nextGuess, enemy1, enemy2);
    };
};
let startGuess = guesser;
game(startGuess(), ship1, ship2);
if (rs.keyInYN('Do you wish to play again? Please enter Y or N')){
    entireGame();}
}

entireGame();