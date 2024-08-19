const { open } = require('node:fs/promises');
const { parse } = require("csv-parse");
const readlinePromises = require('node:readline/promises');
const { stdin, stdout } = require('node:process');

const rl = readlinePromises.createInterface({
    input: stdin,
    output: stdout
  });
const fs = require('node:fs')
async function start() {
// User Input
let fileCSV = await rl.question('Enter the name of your CSV file to be searched: ');
let columnCSV = await rl.question('Enter the column number for your CSV data: ');
// let searchString = stringsearch;
fs.readFile(fileCSV, function(err, content) {
     if (fs.existsSync(fileCSV)) {
        fs.createReadStream(fileCSV)
        .pipe(parse({ delimiter: "," }))
        .on("data", function (row) {
            if (row[columnCSV] == undefined) {
                console.log("Empty");
            } else {
                console.log(row[columnCSV]);
            }
        })
        .on("error", function (error) {
            console.log(error.message);
        })
        .on("end", function () {
            console.log("\nfinished");
        });
     } else {
        console.log("\n\nThe file " + fileCSV + " doesn't exist.");
        //if (err) throw err;
    }
     
});

}

start();