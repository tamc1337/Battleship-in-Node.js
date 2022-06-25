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
const randomBool = Math.random() < 0.5;


/* THIS WAS ALL JUST USED FOR TESTING
let firstShipCoordsStart = coordSplitter();
let secondShipCoordsStart = coordSplitter();
let thirdShipCoordsStart = coordSplitter();
let fourthShipCoordsStart = coordSplitter();
let fifthShipCoordsStart = coordSplitter();
// console.log(`First random Coord is ${firstShipCoordsStart}.`);

//SHIPS CORDINATE'S FIRST LETTER, NOT 2B CONFUSED WITH FIRST BUILT SHIP 
let firstFirstLetter = firstShipCoordsStart[0];
let secondFirstLetter = secondShipCoordsStart[0];
let thirdFirstLetter = thirdShipCoordsStart[0];
let fouthFirstLetter = fourthShipCoordsStart[0];
let fifthFirstLetter = fifthShipCoordsStart[0];


// console.log(`First random Coord first index is ${firstFirstLetter}.`);
/* LAST INDEX OF!! A-J will either be [0-9] OR [1-10], the last index of the coord vvvvvv will only ever be digits 0-9.  
let firstLast = firstShipCoordsStart[firstShipCoordsStart.length - 1];
let secondLast = secondShipCoordsStart[secondShipCoordsStart.length - 1];
let thirdLast = thirdShipCoordsStart[thirdShipCoordsStart.length - 1];
let fouthLast = fourthShipCoordsStart[fourthShipCoordsStart.length - 1];
let fifthLast = fifthShipCoordsStart[fifthShipCoordsStart.length - 1];
*/

/* Function to get Letter's number */
const indexOfLetter = (shipFirstIndex) => alphabet.indexOf(shipFirstIndex);

/* Starting here, the functions kinda move backwards, from the Ship Class below
to these builder functions. I built them this way to allow them to call the function
after they've been defined, I've had errors when trying to do the other way. */

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
        } else if (shipLast === 10){
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
// const pushIntoTotal = (ship) => {
//     totalCoords.push(...ship.fullCoords);
// }
const dupeCoordsChecker = (shipsFullCoords) =>{
    for (const coord of shipsFullCoords){
        if (totalCoords.includes(coord)){
        return true;
    } else {
        return false;
    }
}
};

//Ship.prototype.firstCoord = coordSplitter();
const fullCoordsBuilder = (thisFullCoordsArg,shipProtoCoord,newVertCheck, vCArg1, vCArg2,vCArg3, vCArg4) => {
   if(dupeCoordsChecker(thisFullCoordsArg)){
    shipProtoCoord = coordSplitter();
    newVertCheck = vertCheck (vCArg1, vCArg2, vCArg3,vCArg4);
}
};
            (shipNum,) => {
    for(let i=0; i>ships; i++){
        for(coord of shipNum[i].fullCoords){

        }
    }
}

class Ship {
    constructor(shipNum, shipLength, firstCoord,isVert, isSunk = false){
        this.shipNum = shipNum; //to give ship unique ID
        this.shipLength = shipLength;
        this.firstCoord = firstCoord; // coordSplitter() 
        this.isVert= isVert;// randomBool()
        this.isSunk = isSunk;

        this.fullCoords = vertCheck (this.isVert, this.firstCoord[0], this.firstCoord[this.firstCoord.length - 1],this.shipLength);
        this.dupeCheck = dupeCoordsChecker(this.fullCoords);//only use this if it's true in the full?
        this.fullCoordsBuilder = fullCoordsBuilder(this.fullCoords,Ship.prototype.firstCoord, Ship.prototype.fullCoords, this.isVert,this.firstCoord[0],this.firstCoord[this.firstCoord.length - 1],this.shipLength);
        this.pusher = totalCoords.push(...(this.fullCoords));
        
    };
    // fullCoordsBuilder() {
    //     while(dupeCoordsChecker(this.fullCoords)){
    //     this.firstCoord = coordSplitter();
    // }
    // };
    // dupeCoordsChecker(thefullCoords) {
    //     for (const coord of thefullCoords ){
    //         if (totalCoords.includes(coord)){
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
    // };

}

const shipOne = new Ship(1,2,coordSplitter(), randomBool);
const shipTwo = new Ship(2,3,coordSplitter(), randomBool);
const shipThree = new Ship(3,3,coordSplitter(), randomBool);
const shipFour = new Ship(4,4,coordSplitter(),randomBool);
const shipFive = new Ship(5,5,coordSplitter(),randomBool);
//AN ARRAY OF OBJECTS - jason from the meeting today 6.18.22
// Idea for dupe checker: add items from ship 1 to a new array[] by ...
// if  newarray.includes any of ship2, then shipTwo.firstCoord = coord splitter, then run through dupecheck again. 


console.log(shipOne.fullCoords);
// console.log(shipOne.dupeCheck);
console.log(shipTwo.fullCoords);
// console.log(shipTwo.dupeCheck);
console.log(shipThree.fullCoords);
// console.log(shipThree.dupeCheck);
console.log(shipFour.fullCoords);
// console.log(shipFour.dupeCheck);
console.log(shipFive.fullCoords);
// console.log(shipFive.dupeCheck);
// console.log(shipFive.pusher);
console.log(totalCoords);


// if new ship's coords are a duplication of other coords, it returns true.

  //Turn this into a function, template litterals

// const fullCoordsBuilder = () =>{
//     while(dupeCoordsChecker(this.fullCoords)){
//     this.firstCoord = coordSplitter();
// };
// }
/*console.log(totalCoords);
 */
// Ship.prototype.duplicateCheck = fullCoordsBuilder(this.fullCoords);
// console.log(shipOne.dupeCoordsChecker(this.fullCoords));

