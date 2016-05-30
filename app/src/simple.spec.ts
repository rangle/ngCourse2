import {
  describe,
  expect,
  it
} from '@angular/core/testing';

describe('Testing math', () => {

  it('multiplying should work', () => {
    let testMe = 16;

    // Using the expect interface
    chai.expect(testMe).to.be.a('number');
    chai.expect(testMe).to.equal(16);

    // Using the should interface
    chai.should();
    testMe.should.be.a('number');
    testMe.should.equal(16);
  });
});
