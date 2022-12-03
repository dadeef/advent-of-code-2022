import { promises as fs } from 'fs'

export function readFile(path) {
    return fs.readFile(path, "utf8", (err, contents) => {});
}

export async function readFileLines(path) {
    const content = await readFile(path);
    return content.split('\n');
}

export function add(a, b) {
    return a + b;
}