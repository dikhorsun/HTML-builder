const path = require('path');
const fs = require('fs');
const {stdin, stdout, exit} = require('process');
const output = fs.createWriteStream(path.join(__dirname, 'greetings.txt'));

console.log(`Hi. Write something here please!`);
stdin.on('data', data => {
  if(data.toString().trim() === 'exit') {
    goodbyeAndExit()
  }
  output.write(data)
})

process.on('SIGINT', goodbyeAndExit);

function goodbyeAndExit(){
  stdout.write(`Thank you for the text. We appreciate it. \nBye-bye`);
  exit()
}