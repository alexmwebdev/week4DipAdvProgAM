const { open } = require('node:fs/promises');

const readlinePromises = require('node:readline/promises');
const { stdin, stdout } = require('node:process');

const rl = readlinePromises.createInterface({
    input: stdin,
    output: stdout
  });



  async function start(path) {

    let file = await open(path, 'r');

    let stream = file.createReadStream();

    let rl = readlinePromises.createInterface({
        input: stream,
    })

    for await(let line of rl) {
        console.log(`\nHappy Birthday ${line}!`);
    }
  }

  start('task2/task2.in');