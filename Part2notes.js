/* The game starts with the grid  */
/* Takes alphabet and puts it into an iterable series of
numbers */
const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x));

/* This function takes a number for the length and width of
the grid, and combines ALL the letters together with the
corresponding numbers. */
function gridBuilder(num) {
    let arr = [];
    for (i = 0; i < num; i++) {
        let k = alphabet[i] + (i + 1);
        for (j = 0; j < num; j++) {
            arr.push(alphabet[j] + (i + 1));
        };
        if (!arr.includes(k)) {
            arr.push(alphabet[i] + (i + 1));
        }
    }
    return arr;
}
const lenAndWid = 10;
/* The final workable grid is here, which can be adjusted in
size by changing the length and width variable */
const theGrid = gridBuilder(lenAndWid);

/* This is the begining of the randomizing for the Ship Coordinates */
const randomizer = maxNum => Math.floor(Math.random() * maxNum);
const randomCoord = () => {
    let num = randomizer(100);
    return theGrid[num];
};

/*This function takes the the coords apart to be able to 
analyze the individual parts correctly. */
const coordSplitter = (firstCoord = randomCoord()) => {
    firstCoord.split("");
    return firstCoord;
};

/* This is just to flip a coin essentially, of horizontal
or vertical placements */
const randomBool = () => (Math.random() < 0.5);

/* Function to get Letter's number */
const indexOfLetter = (shipFirstIndex) => alphabet.indexOf(shipFirstIndex);


/* Starting here, the functions kinda move backwards, from the Ship Class below
to these builder functions. I built them this way to allow them to call the function
after they've been defined, I've had errors when trying to do the reversed way. */


/* These functions take in the first random Split Coordinate, predetermined ship 
length, and the last index of the coord (1 being the first, 2-9 in the middle,
0 referring to 10) and adds them into a sequenced array increasing BY LETTER */
const wholeShipBuilderVertical = (shipFirstLetter, shipLength, shipLast) => {
    let shipArray = [];
    for (let i = 0; i < shipLength; i++) {
        shipArray.push(alphabet[indexOfLetter(shipFirstLetter) + i].concat(shipLast));
    }
    return shipArray;
};
/* Same as above, but increasing by NUMBER */
const wholeShipBuilderHorizontal = (shipFirstLetter, shipLength, shipLast) => {
    let shipArray = [];
    for (let i = 0; i < shipLength; i++) {
        if (shipLast !== 10) {
            shipArray.push(shipFirstLetter + (Number(shipLast) + Number(i)));
        } else if (shipLast === 10) {
            shipArray.push(shipFirstLetter + (6 + i));
        }
    }
    return shipArray;
};

/* These functions take the parameters, checks to see if they're going out of bounds, 
and if so, it moves the first letter/number back so that the ship's length can still fit in the grid */

const borderCheckerVertical = (shipFirstLetter, shipLength, shipLast) => {
    //run it like usual if its NOT going to run past j and NOT 10   
    if (indexOfLetter(shipFirstLetter) <= (lenAndWid - shipLength) && shipLast != 0) {
        return wholeShipBuilderVertical(shipFirstLetter, shipLength, shipLast);
        //if IS going to run past j and NOT 10, subtract the ship length so  new ind max letter will be j
    } else if (indexOfLetter(shipFirstLetter) > (lenAndWid - shipLength) && shipLast != 0) {
        let newIndex = (indexOfLetter(shipFirstLetter) - shipLength);
        return wholeShipBuilderVertical(alphabet[newIndex], shipLength, shipLast);
        // if IS going to run past j and IS 10, newInd and 10
    } else if (indexOfLetter(shipFirstLetter) > (lenAndWid - shipLength) && shipLast == 0) {
        let newIndex = (indexOfLetter(shipFirstLetter) - shipLength);
        return wholeShipBuilderVertical(alphabet[newIndex], shipLength, 10);
        // if NOT going to run past j and IS 10, first ship and 10
    } else if (indexOfLetter(shipFirstLetter) <= (lenAndWid - shipLength) && shipLast == 0) {
        return wholeShipBuilderVertical(shipFirstLetter, shipLength, 10)
    }
};
const borderCheckerHorizontal = (shipFirstLetter, shipLength, shipLast) => {
    //if number will NOT go over and coord is NOT 10
    if (shipLast <= (lenAndWid - shipLength) && shipLast != 0) {
        return wholeShipBuilderHorizontal(shipFirstLetter, shipLength, shipLast);
        //if number DOES go over and coord  is NOT 10
    } else if (shipLast > (lenAndWid - shipLength)) {
        let newLast = (lenAndWid - shipLength) + 1;
        return wholeShipBuilderHorizontal(shipFirstLetter, shipLength, newLast);
        // if num DOES go over and IS 10
    } else if (shipLast == 0) {
        return wholeShipBuilderHorizontal(shipFirstLetter, shipLength, 10);
    };
}

/* This checks each ship's object and fills in the parameters into the respective function above,
based on the vertical / horizontal coin flip function */
const vertCheck = (isVert, shipFirstLetter, shipLast, shipLength) => {
    if (isVert) {
        return borderCheckerVertical(shipFirstLetter, shipLength, shipLast);
    } else {
        return borderCheckerHorizontal(shipFirstLetter, shipLength, shipLast);
    }
};

let totalCoords = [];
let hitCoords = [];


const dupeCoordsChecker = (coords) => {
    if (!coords.some(elm => totalCoords.includes(elm))) {
        return false;
    } else {
        return true;
    }

};
function generateShip(shipLength) {
    let firstCoord = coordSplitter();
    let orientation = randomBool();
    let coords = vertCheck(orientation, firstCoord[0], firstCoord[firstCoord.length - 1], shipLength);
    return shipDupeChecker(coords);
}

const shipDupeChecker = (coords) => {
    if (dupeCoordsChecker(coords)) {
        return generateShip(coords.length);
    } else {
        totalPusher(coords);
        return coords;
    }
};
function totalPusher(coords) {
    totalCoords.push(...coords);
}

const shipSparta = generateShip(4);

console.log(totalCoords);

const shipTwwo = generateShip(2);

const shipThrree = generateShip(3);

const shipFo = generateShip(4);

const shipFivvv = generateShip(5);

const freet = [shipSparta, shipTwwo, shipThrree, shipFo, shipFivvv].flat(1);

console.log(shipSparta);
// console.log(dupeCoordsChecker(shipSparta));
console.log(shipTwwo);
// console.log(dupeCoordsChecker(shipTwwo));
console.log(shipThrree);
// console.log(dupeCoordsChecker(shipThrree));
console.log(shipFo);
// console.log(dupeCoordsChecker(shipFo))
console.log(shipFivvv);
// console.log(dupeCoordsChecker(shipFivvv));
console.log(totalCoords);
console.log(freet);
/*
class Ship {
    constructor(num, shipLength,coords, isSunk = false){
        this.num = num; //to give ship unique ID
        this.shipLength = shipLength; // assigned when creating the ships
        this.isSunk = isSunk; // will change in the actual game
        this.coords = coords;
    };
    

}

let guess = 'B5';

// console.log(totalCoords);

const shipOne = new Ship(1,2,generateShip(2), false);
// const shipOne = ;
console.log(shipOne);;


// console.log(totalCoords);
const shipTwo = new Ship(2,3,generateShip(3), false);
// const shipTwo = generateShip(3);
// console.log(shipTwo);
// console.log(shipTwo.getDupeCheck());

// console.log(totalCoords);
const shipThree = new Ship(3,3,generateShip(3), false);
// const shipThree = generateShip(3);
// console.log(shipThree);
// console.log(shipThree.getDupeCheck());

// console.log(totalCoords);
const shipFour = new Ship(4,4,generateShip(4), false);
// const shipFour = generateShip(4);
// console.log(shipFour);
// console.log(shipFour.getDupeCheck());

// console.log(totalCoords);
const shipFive = new Ship(5,5,generateShip(5), false);
// const shipFive = generateShip(5);
// console.log(shipFive);
// console.log(shipFive.getDupeCheck());
const fleet = [shipOne,shipTwo,shipThree,shipFour,shipFive];
const fleetMap = (fleet.map((x)=> x.coords)).flat(1);
console.log(fleetMap);
// console.log(totalCoords);



const hitCheck = (guess) =>{
    if (totalCoords.includes(guess)){
        hitCoords.push(guess);
        console.log(`You have hit a Battleship! You have ${totalCoords.length-(hitCoords.length)} ship remaining! `);
    } else {
        console.log('You have missed!');
    }
};
hitCheck();

// console.log(hitCoords);

//THIS Method checks an idividual ship, will have to run this through a seperate function
const deadShipCheck = (ship) => {
        if (hitCoords.includes(ship.coords)){
            ship.isSunk = true;
            console.log(`Ship Number ${ship.num} is sunk!`);
        }
    };

deadShipCheck(shipFive);

const includedInTotal = (x) =>{
    return totalCoords.includes(x);
}

const gameOverCheck = () =>{
    if (hitCoords.every(includedInTotal())){
        console.log("YOU HAVE WON! NO SHIPS REMAINING");
    }
};
// console.log(gameOverCheck());
*/