import { readFile } from "../helpers/helpers.mjs";

const input = await readFile('./day-6/input.txt');

const UNIQUE_CHAR_COUNT = 14;

const answer = input.split('').reduce((acc, el, i) => {
    if(typeof acc === 'number'){
        // We solved the problem
        return acc;
    }
    if (acc.length < UNIQUE_CHAR_COUNT){
        return [...acc, el];
    }
    if(unique(acc).length === UNIQUE_CHAR_COUNT){
        return i;
    }
    else{
        return [...acc.slice(1), el];
    }
}, []);

function unique(arr) {
    return arr.reduce((acc, el, i, collection) => {
        return acc.includes(el) ? acc : [...acc, el];
    }, []);
}

console.log(answer);