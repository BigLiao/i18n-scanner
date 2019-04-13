const { expect } = require('chai');
const util = require('../lib/util');
const fs = require('fs');
const path = require('path');
const scan = require('../lib/index');

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
});

describe('scan test 扫描测试', () => {
  const srcData = 
`export default function () {
    const text = $t('aaa');
    const text2 = $t('你好我是来自东北的王二小，我家住在王家坡');
    const text3 = $t('_bbb');
    return text;
}`;
  const destData = 
`export default function () {
    const text = $t('_015423dfff36');
    const text2 = $t('_90b4bd5ee7b1');
    const text3 = $t('_bbb');
    return text;
}`;
  const i18nData = 
`{
    "_015423dfff36": "aaa",
    "_90b4bd5ee7b1": "你好我是来自东北的王二小，我家住在王家坡"
}`
  before(function() {
    const srcPath = path.resolve(__dirname, './test-src');
    const targetPath = path.resolve(__dirname, './test-target');
    fs.writeFileSync(srcPath + '/index.js', srcData);
    scan(srcPath, targetPath);
  });
  after(function() {
    const srcPath = path.resolve(__dirname, './test-src');
    const targetPath = path.resolve(__dirname, './test-target');
    fs.writeFileSync(srcPath + '/index.js', '');
    fs.writeFileSync(targetPath + '/default.json', '');
  });
  describe('scan function', () => {
    const srcPath = path.resolve(__dirname, './test-src');
    const targetPath = path.resolve(__dirname, './test-target');
    it('Should change source file', () => {
      const afterData = fs.readFileSync(srcPath + '/index.js', {encoding: 'utf8'});
      expect(afterData).equal(destData);
    });
    it('Generate i18n files', () => {
      const data = fs.readFileSync(targetPath + '/default.json', {encoding: 'utf8'});
      expect(data).equal(i18nData);
    })
  })
})