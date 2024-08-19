const { open } = require('node:fs/promises');

const readlinePromises = require('node:readline/promises');
const { stdin, stdout } = require('node:process');

const rl = readlinePromises.createInterface({
    input: stdin,
    output: stdout
  });
const fs = require('node:fs')
async function start() {
// User Input
//let fileToSearch = await rl.question('Enter the name of your file to be searched:');
//let stringsearch = await rl.question('Enter the string to be searched in the specified file');
// let searchString = stringsearch;
    let data = [];

    for await(let line of rl) {
        data.push(line);
    }
    fileToSearch = data[0];
    searchString = data[1];
fs.readFile(fileToSearch, function(err, content) {
     if (fs.existsSync(fileToSearch)) {
        console.log(content.indexOf(searchString)>-1 ? "\n\nThe string " + searchString + " is found in file " + fileToSearch : "\n\nThe string " + searchString + " is not found in file " + fileToSearch)
     } else {
        console.log("\n\nThe file " + fileToSearch + " doesn't exist.");
        //if (err) throw err;
    }
     
});

}

start();