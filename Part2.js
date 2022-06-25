const rs = require('readline-sync');
const initQuestion = rs.keyIn('Press any key to start.');

function entireGame(){
// Grid Builder
const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x));
function gridBuilder(num){
    let arr=[];
    for (i=0; i<num; i++){
        let k = alphabet[i]+(i+1);
        for(j=0; j<num;j++){
            arr.push(alphabet[j]+(i+1));
        };
        if (!arr.includes(k)){
        arr.push(alphabet[i]+(i+1));}
    }
    return arr;
}
const lenAndWid = 10;
const theGrid = gridBuilder(lenAndWid);
let prevGuesses = [];

//Random Enemy Coordinates 
const randomizer = maxNum => Math.floor(Math.random() * maxNum);
const randomCoord = () => {
    let num = randomizer(100);
    return theGrid[num];
};

const randomBool = Math.random() < 0.5;
const coordSplitter = (firstCoord = randomCoord()) => {
    firstCoord.split("");
    return firstCoord;
};
const indexOfLetter = (shipFirstIndex) => alphabet.indexOf(shipFirstIndex);

// Ship Builder
const wholeShipBuilderVertical = (shipFirstLetter, shipLength, shipLast) => {
    let shipArray = [];
    for (let i = 0; i < shipLength; i++) {
        shipArray.push(alphabet[indexOfLetter(shipFirstLetter) + i].concat(shipLast));
    }
    return shipArray;
}
const wholeShipBuilderHorizontal = (shipFirstLetter, shipLength, shipLast) => {
    let shipArray = [];
    for (let i = 0; i < shipLength; i++) {
        if (shipLast !== 10) {
            shipArray.push(shipFirstLetter + (Number(shipLast) + Number(i)));
        } else if (shipLast === 10){
            shipArray.push(shipFirstLetter + (7 + i));
        }
    }
    return shipArray;
}

// If vertical, only going to call this first coord to change letter

const borderCheckerVertical = (shipFirstLetter, shipLength, shipLast) => {

    //run it like usual if its NOT over j and it's NOT 10   
    if (indexOfLetter(shipFirstLetter) <= (lenAndWid - shipLength) && shipLast != 0) {
        return wholeShipBuilderVertical(shipFirstLetter, shipLength, shipLast);

        //if IS going to run over j and NOT 10, subtract the ship length so  new ind max letter will be j
    } else if (indexOfLetter(shipFirstLetter) > (lenAndWid - shipLength) && shipLast != 0) {
        let newIndex = (indexOfLetter(shipFirstLetter) - shipLength);
        return wholeShipBuilderVertical(alphabet[newIndex], shipLength, shipLast);

        // if IS going to run over j and IS 10, newInd and 10
    } else if (indexOfLetter(shipFirstLetter) > (lenAndWid - shipLength) && shipLast == 0) {
        let newIndex = (indexOfLetter(shipFirstLetter) - shipLength);
        return wholeShipBuilderVertical(alphabet[newIndex], shipLength, 10);

        // if NOT over j and IS 10, first ship and 10
    } else if (indexOfLetter(shipFirstLetter) <= (lenAndWid - shipLength) && shipLast == 0) {

        return wholeShipBuilderVertical(shipFirstLetter, shipLength, 10)
    }
};

const borderCheckerHorizontal = (shipFirstLetter, shipLength, shipLast) => {
    //if number NOT go over and coord is NOT 10
    if (shipLast <= (lenAndWid - shipLength) && shipLast != 0) {
        return wholeShipBuilderHorizontal(shipFirstLetter, shipLength, shipLast);

        //if number DOES over and cord  is NOT 10
    } else if (shipLast > (lenAndWid - shipLength)) {
        let newLast = (lenAndWid - shipLength) + 1;
        return wholeShipBuilderHorizontal(shipFirstLetter, shipLength, newLast);

        // if num DOES go over and IS 10, i'll fix it in the next PROBLEM IS HERE
    } else if (shipLast == 0) {
        return wholeShipBuilderHorizontal(shipFirstLetter, shipLength, 10);
    };
}


const vertCheck = (isVert, shipFirstLetter, shipLast, shipLength) => {
    if (isVert) {
        return borderCheckerVertical(shipFirstLetter, shipLength, shipLast);
    } else {
        return borderCheckerHorizontal(shipFirstLetter, shipLength, shipLast);
    }
};

class Ship {
    constructor(shipNum, shipLength, firstCoord,isVert, isSunk = false){
        this.shipNum = shipNum;
        this.shipLength = shipLength;
        this.firstCoord = firstCoord; // coordSplitter() 
        this.isVert= isVert;// randomBool()
        this.isSunk = isSunk;

        this.fullCoords = vertCheck (this.isVert, this.firstCoord[0], this.firstCoord[this.firstCoord.length - 1],this.shipLength);
}
}
const shipOne = new Ship(1,2,coordSplitter(), randomBool);
const shipTwo = new Ship(2,3,coordSplitter(), randomBool);
const shipThree = new Ship(3,3,coordSplitter(), randomBool);
const shipFour = new Ship(4,4,coordSplitter(),randomBool);
const shipFive = new Ship(5,5,coordSplitter(),randomBool);

// Guess  
function guesser() {
    let coordGuess = rs.question('Enter strike location with a letters a,b, or c, and either numbers 1,2, or 3, such as "A1" or "C3".', {
        limit: theGrid,
        limitMessage: 'Please only enter letters A-J with only numbers 1-10 such as "A3" or "B10". '
    });
    let actualCoordGuess = coordGuess.toUpperCase();



    // Break this into duplicate checker function

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
        vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
        console.log(`Try aiming for ${enemyCoords}.`);
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        Remove this comment if you want EZ mode*/
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
