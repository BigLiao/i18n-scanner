const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { Transform, pipeline, Duplex } = require('stream');

const targetPath = path.resolve(__dirname, '../examples/target/test.js');
const sourcePath = path.resolve(__dirname, '../examples/src/index.js');

const regexp = /\$t\('([^_][^\(\)\n]+)'\)/g;  // 匹配$t('')

function readFile(path) {
  const sourceFile = fs.readFileSync(path, {
    flag: 'r+',
    encoding: 'utf-8'
  });


  let match;
  while((match = regexp.exec(sourceFile)) !== null) {
    var msg = 'Found ' + match[1] + '. ';
    msg += 'Next match starts at ' + match.lastIndex;
    console.log(msg);
  }

  // const readStream = fs.createReadStream(path);
  // const writeStream = fs.createWriteStream(path);
}

readFile(sourcePath);