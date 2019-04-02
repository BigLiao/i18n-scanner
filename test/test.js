const { expect } = require('chai');

describe('测试的测试', () => {
  describe('test测试的测试', () => {
    it('First test for test', () => {
      const a = 1;
      expect(a).to.equal(1);
    })
  })
});
