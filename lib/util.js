const fs = require('fs');
const path = require('path');

const util = {};

util.readDir = function (filePath, func) {

  const fileType = /\.(js)|(vue)|(jsx)|(txt)$/;

  function readPath(basePath, subPath) {
    try {
      const files = fs.readdirSync(basePath + subPath, {
        withFileTypes: true
      });
      for (let i = 0; i < files.length; i++) {
        if (files[i].isDirectory()) {
          const pathName = subPath ? subPath + '/' + files[i].name : files[i].name;
          readPath(basePath, pathName);
        } else if (files[i].isFile() && fileType.test(files[i].name)) {
          const pathName = subPath ? subPath + '/' + files[i].name : files[i].name;
          func({
            path: path.resolve(basePath, pathName),
            name: files[i].name
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  readPath(path.resolve(__dirname, '../', filePath), '');
}

module.exports = util;