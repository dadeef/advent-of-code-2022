import { add, findFirstElement, readFile } from "../helpers/helpers.mjs";

const input = await readFile('./day-7/input.txt')

let currentPath = '/';
let fileTree = [];

input.split('\n')
    .forEach(el => {
        if(isCd(el)){
            const result = execute(currentPath, el);
            currentPath = result.currentPath;
        }
        else if(isLs(el)){
            //add new entry to fileTree
            fileTree = [...fileTree, {directory: currentPath, files: []}]
        }
        else if(!el.startsWith('$')) {
            // not a command, add entry to fileTree
            fileTree[fileTree.length - 1].files.push(el);
        }
    })

const directoriesWithSizes = fileTree.map(x => {
    return {
        ...x,
        totalSize: recursiveSizeAdder(x)
    }
});

const answer1 = directoriesWithSizes.map(x => x.totalSize).filter(x => x <= 100000).reduce(add);
console.log(answer1);


const sortedDirectories = directoriesWithSizes.sort((x, y) =>  y.totalSize - x.totalSize);
const totalSpace = 70000000;
const spaceNeededForUpdate = 30000000;
const availableSpace = totalSpace - sortedDirectories[0].totalSize;
const spaceNeeded = spaceNeededForUpdate - availableSpace;
const answer2 = findFirstElement(sortedDirectories.reverse(), x => x.totalSize >= spaceNeeded).totalSize;

console.log(answer2);

function recursiveSizeAdder({directory, files}) {
    return files.reduce((acc, fileOrDirectory) => {
        if(fileOrDirectory.startsWith('dir')){
            // its a directory
            const dirName = fileOrDirectory.split(' ')[1];
            const newDirectory = fileTree.find(x => x.directory === directory + (directory === '/' ? '' : '/') + dirName);
            return acc + recursiveSizeAdder(newDirectory);
        }
        else {
            const [size, _filename] = fileOrDirectory.split(' ');
            return acc + parseInt(size);
        }
    }, 0);
}

function isCd(x){
    return x.startsWith('$ cd');
}
function isLs(x){
    return x.startsWith('$ ls');
}

function execute(currentPath, command){
    const [_$, cmd, arg] = command.split(' ');
    if (command.startsWith('$ cd')){
        const newPath = cd(currentPath, arg);
        return {
            currentPath: newPath
        }
    }
}
function cd(currentDirectory, command){
    if (command === '/'){
        return '/';
    }
    if (command === '..'){
        return currentDirectory.slice(0, currentDirectory.lastIndexOf('/'));
    }
    else {
        return currentDirectory + (currentDirectory.endsWith('/') ? '' : '/') + command;
    }
}
