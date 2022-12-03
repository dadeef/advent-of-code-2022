import { add, readFileLines } from "../helpers/helpers.mjs";

const input = await readFileLines('./day-3/input.txt')
var priorityMap = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        .reduce((acc, el, i) =>(
            {
                ...acc,
                [el]: i + 1
            }
        ), {});

const answer1 = input
                .map(splitIntoCompartments)
                .map(getCommonItem)
                .map(mapToPriority)
                .reduce(add)


console.log('answer1', answer1);

const answer2 = input
            .reduce(groupBy3Elves, [])
            .map(elves => elves.map(unpackItems))
            .map(getCommonItem3)
            .map(mapToPriority)
            .reduce(add)

console.log('answer2', answer2);


function splitIntoCompartments(rucksack){ 
    const itemsForCompartment1 = rucksack.slice(0, rucksack.length / 2).split('');
    const itemsForCompartment2 = rucksack.slice(rucksack.length / 2, rucksack.length).split('');
    return [itemsForCompartment1, itemsForCompartment2]
};

function getCommonItem ([compartment1, compartment2]) {
    return compartment1.find(item => compartment2.includes(item))
}

function mapToPriority (item) {
    return priorityMap[item];
}

function groupBy3Elves(acc, item, i){
    if(i % 3 === 0){
        // create new group
        return [...acc, [item]];
    }
    return [...acc.slice(0, acc.length - 1), [...acc[acc.length - 1], item]];
}

function unpackItems (item) {
    return item.split('');
}

function getCommonItem3 ([elf1, elf2, elf3]) {
    return elf1.find(item => elf2.includes(item) && elf3.includes(item))
}
