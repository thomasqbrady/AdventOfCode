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

function hex2bin(hex){
    hex = hex.replace("0x", "").toLowerCase();
    var out = "";
    for(var c of hex) {
        switch(c) {
            case '0': out += "0000"; break;
            case '1': out += "0001"; break;
            case '2': out += "0010"; break;
            case '3': out += "0011"; break;
            case '4': out += "0100"; break;
            case '5': out += "0101"; break;
            case '6': out += "0110"; break;
            case '7': out += "0111"; break;
            case '8': out += "1000"; break;
            case '9': out += "1001"; break;
            case 'a': out += "1010"; break;
            case 'b': out += "1011"; break;
            case 'c': out += "1100"; break;
            case 'd': out += "1101"; break;
            case 'e': out += "1110"; break;
            case 'f': out += "1111"; break;
            default: return "";
        }
    }
    return out;
}

let outermostPacket = input.split('\n')[0].trim();
let binaryString = hex2bin(outermostPacket);
console.log(binaryString);
// binaryString = '00111000000000000110111101000101001010010001001000000000';

let versionTotal = 0;
function decodePacket(packetStart, nested = false) {
  while (packetStart < binaryString.length) {
    let version = parseInt(binaryString.substring(packetStart,packetStart + 3),2);
    versionTotal += version;
    let type = parseInt(binaryString.substring(packetStart + 3,packetStart + 6),2);
    packetStart += 6
    console.log({version, type});
    switch (type) {
      case 4 :
        let stop = false;
        let bits = '';
        while (!stop) {
          console.log({packetStart, bits})
          bits += binaryString.substring(packetStart + 1, packetStart + 5);
          console.log({bits});
          if (binaryString.substring(packetStart, packetStart + 1) === '0') {
            console.log('stop');
            stop = true;
          }
          packetStart += 5;
        }
        // console.log(bits.length);
        // packetStart += 4 - (((5 * (bits.length / 4)) + 6) % 4);
        console.log({bits}, parseInt(bits, 2));
        console.log({nested});
        return { packetStart, value: parseInt(bits, 2) };
        break;
      default :
        let lengthType = parseInt(binaryString.substring(packetStart, packetStart + 1), 2);
        console.log({lengthType});
        packetStart += 1;
        switch (lengthType) {
          case 0 :
            let packetLength = parseInt(binaryString.substring(packetStart, packetStart + 15),2);
            console.log({packetLength});
            packetStart += 15;
            let subPacketStart = packetStart;
            while (packetStart - subPacketStart <= packetLength) {
              let result = decodePacket(packetStart, true);
              console.log({result})
              if (result) {
                packetStart = result.packetStart;
              } else {
                console.log({nested, packetStart, last: binaryString.length});
                return null;
              }
              console.log(packetStart - subPacketStart);
            }
            console.log({nested});
            break;
          case 1:
            let packetCount = parseInt(binaryString.substring(packetStart, packetStart + 11), 2);
            console.log({packetCount});
            packetStart += 11;
            let processedPackets = 0;
            while (processedPackets < packetCount) {
              processedPackets++;
              let result = decodePacket(packetStart, true);
              console.log({result})
              if (result) {
                packetStart = result.packetStart;
              } else {
                console.log({nested, packetStart, last: binaryString.length});
                return null;
              }
            }
            console.log({nested});
            break;
        }
        break;
    }
  }
}


decodePacket(0);
console.log({versionTotal});