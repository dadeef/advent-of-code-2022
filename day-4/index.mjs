import { readFileLines } from "../helpers/helpers.mjs";

const elfPairs = await readFileLines('./day-4/input.txt');

const answer1 = elfPairs
    .map(line => line.split(','))
    .map(expandAssignments)
    .filter(oneAssignmentFullyContainsTheOther)
    .length;
    
// console.log(answer1);

const answer2 = elfPairs
    .map(line => line.split(','))
    .map(expandAssignments)
    .filter(pairsOverlap)
    .length;

console.log(answer2);

function expandAssignments(assignments) {
    return assignments.map(expandAssignment);
}

function expandAssignment(assignment) {
    const [start, end] = assignment.split('-').map(x => parseInt(x));
    let expandedAssignment = [];
    for (let i = start; i <= end; i++) {
        expandedAssignment.push(i);
    }
    return expandedAssignment;
}

function oneAssignmentFullyContainsTheOther(assignments) {
    const [smallAssignment, largeAssignment] = assignments.sort((a, b) => a.length - b.length);
    const sharedItems = smallAssignment.filter(item => largeAssignment.includes(item));
    return sharedItems.length === smallAssignment.length;
}

function pairsOverlap(assignments) {
    const [smallAssignment, largeAssignment] = assignments.sort((a, b) => a.length - b.length);
    return Boolean(smallAssignment.find(item => largeAssignment.includes(item)));
}