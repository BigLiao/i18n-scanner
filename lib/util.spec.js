const { expect } = require('chai');
const util = require('./util');

describe('util 工具测试', () => {
  describe('readDir 读取目录', () => {
    it('Should read all files', () => {
      const files = [];
      util.readDir('examples/src', (file) => {
        files.push(file.name);
      });
      expect(files).is.includes('hello-world.vue', 'index.js');
    });
  })
})