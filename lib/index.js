const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { Transform, pipeline, Duplex } = require('stream');
const { readDir } = require('./util');

const targetPath = path.resolve(__dirname, '../examples/target/test.json');
const sourcePath = path.resolve(__dirname, '../examples/src/index.js');

const regexp = /\$t\('([^_][^\n]+)'\)/g;  // 匹配$t('')

function main() {
  let targetObj;
  try {
    const targetStr = fs.readFileSync(targetPath, { encoding: 'utf8' });
    targetObj = JSON.parse(targetStr);
  } catch (error) {
    targetObj = {};
  }
  readDir('examples/src', replace);
  function replace(file) {
    const filePath = file.path;
    const sourceStr = fs.readFileSync(filePath, { encoding: 'utf8' });
    let replaceStr = '';
    let lastIndex = 0;
    let match;
    while((match = regexp.exec(sourceStr)) !== null) {
      const content = match[1];
      const md5 = crypto.createHash('md5');
      const x = md5.update(file.path + content);
      const key = '_' + file.name.split('.')[0] + '-' + x.digest('hex').slice(0, 10);
      targetObj[key] = content;
      replaceStr += sourceStr.slice(lastIndex, match.index + 4);
      lastIndex = match.index + content.length + 4;
      replaceStr += key;
    }
    replaceStr += sourceStr.slice(lastIndex);
    fs.writeFileSync(filePath, replaceStr);
  }
  fs.writeFileSync(targetPath, JSON.stringify(targetObj, null, 4));
}

main();
