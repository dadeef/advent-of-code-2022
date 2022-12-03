import { add, readFile } from "../helpers/helpers.mjs";

const contents = await readFile("./day-1/input-1.txt", "utf8", (err, contents) => {});
console.log(contents);

const output = contents
    .split('\n')
    .reduce((acc, lineItem) => {
        if(lineItem === ''){
            // We need to create a new bucket
            return [...acc, []];
        }
        else {
            // add the current item to the last bucket
            const previousBuckets = acc.slice(0, acc.length - 1);
            const lastBucket = acc[acc.length - 1];
            return [...previousBuckets, [...lastBucket, lineItem]];
        }
    }, [[]])
    .flatMap((bucket) => bucket
        .map(snack => parseInt(snack))
        .reduce(add)
    )
    .sort((a, b) => a - b)
    .reverse()
console.log(output[0] + output[1] + output[2]);