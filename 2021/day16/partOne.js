const fs = require('fs');
const input = fs.readFileSync('./test.txt', 'utf8');

console.log('===============================================');
console.log('===  S        T        A        R        T  ===');
console.log('===============================================');

function outputToFile(contents, filename) {
  fs.writeFile(filename, JSON.stringify(contents), (err) =>{
    console.error(err);
  });
}

input.split('\n').forEach((line) => {
  let version = parseInt(line.substring(0,3),2);
  let type = parseInt(line.substring(3,6),2);
  console.log(version, type);
  switch (type) {
    case 4 :
      for (let i = 6;i < line.length;i += 5) {
        console.log(line.substring(i,i + 5));
      }
      break;
  }
});