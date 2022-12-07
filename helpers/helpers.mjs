import { promises as fs } from 'fs'

export function readFile(path) {
    return fs.readFile(path, "utf8", (err, contents) => {});
}

export async function readFileLines(path) {
    const content = await readFile(path);
    return content.split('\n');
}

export async function readFromUrl(path) {
    const content = await fetch(path).then(res => res.text());
    console.log(content);
}

export function add(a, b) {
    return a + b;
}

export function findFirstElement(arr, predicate){
    const [el, ...rest] = arr;
    if(predicate(el)){
        return el;
    }
    return findFirstElement(rest, predicate);
}