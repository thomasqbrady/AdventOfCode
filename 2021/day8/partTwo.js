const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf8');

function outputToFile(contents, filename) {
  fs.writeFile(filename, JSON.stringify(contents), (err) =>{
    console.error(err);
  });
}

