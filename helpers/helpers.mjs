import { promises as fs } from 'fs'

export function readFile(path) {
    return fs.readFile(path, "utf8", (err, contents) => {});
}

export function add(a, b) {
    return a + b;
}