import { readFile } from "../helpers/helpers.mjs";

const input = await readFile('./day-5/input.txt');

const [state, moves] = input.split('\n\n');
const rows = state.split('\n');
const stacks = rows[rows.length - 1]
    .replaceAll(' ', '')
    .split('')
    .reduce((acc, x) => ({
        ...acc,
        [x]: []
    }), {});

const positions = Object.keys(stacks)
    .map(x => parseInt(x))
    .map((x, i) => (x - 1) * 5 + 1 - (i * 1))

rows
    .reduce(removeLastRow, [])
    .map(splitToColumns)
    .forEach((x, i) => {
        x.forEach((y, j) => {
            stacks[j + 1].push(y);
        })
    });

// remove empty entries in stacks
Object.keys(stacks).forEach(key => {
    stacks[key] = stacks[key].filter(x => x !== ' ' && x !== '').reverse();
})


// Go through the moves

// crateMover 9000
// moves
//     .split('\n')
//     .forEach(move => {
//         const [number, from, to] = parseMove(move);
//         Array.from({length: number}).forEach(() => {
//             stacks[to].push(stacks[from].pop());
//         });
//     })

// crateMover 9001
moves
    .split('\n')
    .forEach(move => {
        const [number, from, to] = parseMove(move);
        const crateGroup = stacks[from].splice(stacks[from].length - number, number);
        stacks[to] = [...stacks[to], ...crateGroup];
    })

const answer = Object.values(stacks).map(
    (stack) => {
        return stack[stack.length - 1]
    }).join('')
console.log('answer', answer1);

function splitToColumns(row) {
    const r = positions.map(x => {
        return row.charAt(x)
    });
    return r;
}

function removeLastRow(acc, row, i, arr) {
    if (i < arr.length - 1) {
        return [...acc, row];
    }
    return acc;
}

function parseMove(move){
    return move
      .split(' ')
      .map(x => parseInt(x))
      .filter(Boolean)
  }