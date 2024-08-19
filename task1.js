const readlinePromises = require('node:readline/promises');
const { stdin, stdout } = require('node:process');

const rl = readlinePromises.createInterface({
    input: stdin,
    output: stdout
  });



  async function start() {

    let name = await rl.question('What is your name?');
    console.log(`Happy Birthday ${name}!`);

  }

  start();