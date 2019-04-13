const fs = require('fs');
const crypto = require('crypto');
const { readDir } = require('./util');

const regexp = /\$t\('([^_][^\n]+)'\)/g;  // 匹配$t('')

function scan(inputPath, outputPath) {
  let targetObj;
  const defaultFilePath = outputPath + '/default.json';
  try {
    const targetStr = fs.readFileSync(defaultFilePath, { encoding: 'utf8' });
    targetObj = JSON.parse(targetStr);
  } catch (error) {
    targetObj = {};
  }
  readDir(inputPath, (file) => {
     const fileTargetObj = replace(file.path);
     Object.assign(targetObj, fileTargetObj);
  });
  fs.writeFileSync(defaultFilePath, JSON.stringify(targetObj, null, 4));
  readDir(outputPath, (file) => {
    if (file.name === 'default.json') {
      return;
    }
    if (/\.json$/.test(file.name)) {
      let data;
      try {
        data = JSON.parse(fs.readFileSync(file.path, { encoding: 'utf8' }));        
      } catch (error) {
        data = {};
      }
      const mergeData = Object.assign({}, targetObj, data);
      fs.writeFileSync(file.path, JSON.stringify(mergeData, null, 4));
    }
  })
}

function replace(filePath) {
  const targetObj = {};
  const sourceStr = fs.readFileSync(filePath, { encoding: 'utf8' });
  let replaceStr = '';
  let lastIndex = 0;
  let match;
  while((match = regexp.exec(sourceStr)) !== null) {
    const content = match[1];
    const md5 = crypto.createHash('md5');
    const x = md5.update(filePath + content);
    const key = '_' + x.digest('hex').slice(0, 12);
    targetObj[key] = content;
    replaceStr += sourceStr.slice(lastIndex, match.index + 4);
    lastIndex = match.index + content.length + 4;
    replaceStr += key;
  }
  replaceStr += sourceStr.slice(lastIndex);
  fs.writeFileSync(filePath, replaceStr);
  return targetObj;
}

module.exports = scan;
module.exports.replace = replace;
