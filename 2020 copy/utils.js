const util = require('util');

exports.log = function() {
  let messages = Array.from(arguments);
  messages.map((message) => {
    console.log(util.inspect(message, false, null, true));
  });
}

exports.numSort = function(arr) {
  arr.sort((a, b) => a-b);
  return arr;
}

exports.arrayStrToNum = function(arr) {
  let newArray = [];
  arr.map((item) => {
    newArray.push(parseInt(item, 10));
  });
  return newArray;
}