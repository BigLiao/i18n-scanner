const fs = require('fs');
const path = require('path');

const util = {};

util.readDir = function (filePath, func) {

  const fileType = /\.(js)|(vue)|(jsx)|(txt)$/;

  function readPath(basePath, subPath) {
    try {
      const filePath = path.resolve(basePath, subPath);
      const files = fs.readdirSync(filePath, {
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
  readPath(filePath, '');
}

module.exports = util;