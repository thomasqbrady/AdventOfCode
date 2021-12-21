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

function findRecipient(pairMap, add, direction) {
  if (direction === 'l' && (typeof pairMap.left !== 'object')) ||  {
    pairMap.left += add;
  } else {
    if (direction === 'r' && (typeof pairMap.right !== 'object')) ||  {
      pairMap.right += add;
    } else {
      if (pairMap.parent) {
        findRecipient(pairMap.parent, add, direction);
      }
    }
  }
}

function findMine(pairMap, level = 0, parent = null) {
  // console.log({pairMap, level, parent});
  if (parent) {
    pairMap.parent = parent;
  }
  if (typeof pairMap !== 'object') {
    return null;
  }
  if (level === 4) {
    if (parent.left === pairMap) {
      let addLeft = pairMap.left;
      let addRight = pairMap.right;
      parent.left = 0;
      
      // console.log('replace left');
    }
    if (parent.right === pairMap) {
      parent.right = 0;
      // console.log('replace right');
    }
  } else {
    let mine = findMine(pairMap.left, level + 1, pairMap);
    if (mine) {
      return mine
    } else {
      return findMine(pairMap.right, level + 1, pairMap);
    }
  }
}

input.split('\n').forEach((number) => {
  console.log(number);
  let numberObjString = number.replace(/\[/g, '{"left": ');
  numberObjString = numberObjString.replace(/,/g, ',"right": ');
  numberObjString = numberObjString.replace(/\]/g, '}');
  // console.log({numberObjString})
  // let nestLevel = -1;
  // for (let i = 0;i < numberObjString.length;i++) {
  //   if (numberObjString[i] === '{') {
  //     nestLevel += 1;
  //   }
  //   if (numberObjString[i] === '}') {
  //     numberObjString = numberObjString.substring(0, i) + ',"level":' + nestLevel + numberObjString.substring(i, numberObjString.length);
  //     i += 9;
  //     i += String(nestLevel).length;
  //     nestLevel -= 1;      
  //   }
  // }
  // console.log({numberObjString});
  let numberObj = JSON.parse(numberObjString);
  // console.dir(numberObj, {depth: null});

  let mine = findMine(numberObj);
  // while (mine) {

  // }
  console.dir(numberObj, {depth: null});
});

