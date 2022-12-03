import { readFile, add } from '../helpers/helpers.mjs';
const contents = await readFile('./day-2/input-1.txt');

const output = contents
    .split('\n')
    .map(line => line.split(' '))
    .map(([player1Move, intendedResult]) => [player1Move, calculateMove([player1Move, intendedResult])])
    .map(getScore)
    .reduce(add)

console.log(output);

function getScore([player1, player2]) {
    const pointsForShapes = {
        X: 1,
        Y: 2,
        Z: 3
    }
    function winOrLose([player1, player2]){
        if (
            (player1 === 'A' && player2 === 'X') ||
            (player1 === 'B' && player2 === 'Y') ||
            (player1 === 'C' && player2 === 'Z')
        ) {
            return 3;
        }
        if(
            (player1 === 'A' && player2 === 'Z') ||
            (player1 === 'B' && player2 === 'X') ||
            (player1 === 'C' && player2 === 'Y')
        ) {
            return 0;
        }
        if(
            (player1 === 'A' && player2 === 'Y') ||
            (player1 === 'B' && player2 === 'Z') ||
            (player1 === 'C' && player2 === 'X')
            ) {
            return 6;
        }
    }
    return winOrLose([player1, player2]) + pointsForShapes[player2];
}

function calculateMove([player1Move, intendedResult]){
    if(intendedResult === 'X'){
        //lose
        const losingMoves = {
            A: 'Z',
            B: 'X',
            C: 'Y'
        };
        return losingMoves[player1Move];
    }
    if(intendedResult === 'Y'){
        //draw
        const drawMoves = {
            A: 'X',
            B: 'Y',
            C: 'Z'
        };
        return drawMoves[player1Move];
    }
    if(intendedResult === 'Z'){
        //win
        const winMoves = {
            A: 'Y',
            B: 'Z',
            C: 'X'
        };
        return winMoves[player1Move];
    }
}