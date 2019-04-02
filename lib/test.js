const util = require('./util');
const path = require('path');


util.readDir('lib', (file) => {
  console.log(file.path);
})