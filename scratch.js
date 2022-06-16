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
const randomizer = maxNum => Math.floor(Math.random() * maxNum);
const randomFirstCoord = () => {
    let num = randomizer(100);
    return theGrid[num];
};
const lenAndWid = 10;
const theGrid = gridBuilder(lenAndWid);
let firstCoord = randomFirstCoord()
const coordSplitter = (firstCoord = randomFirstCoord()) => {
 firstCoord.split("");
 // if (firstCoord[2]==0){
    //     firstCoord[1].concat(firstCoord[2]);
    // }
    return firstCoord;
};

let firstShip = coordSplitter();
let indexLetter = alphabet.indexOf(firstShip[0]);
let firstFirst = firstShip[0];
let firstSecond = firstShip[firstShip.length-1];

console.log(theGrid);
// console.log(indexLetter);
// console.log(firstFirst);
// console.log(firstSecond);

