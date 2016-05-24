import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/counter';
import counter from './counter';
import {
  describe,
  it
} from '@angular/core/testing';

describe('counter reducers', () => {
  it('should handle initial state', () => {
    chai.expect(
      counter(undefined, {})
    )
    .to.equal(0);
  });

  it('should handle INCREMENT_COUNTER', () => {
    chai.expect(
      counter(0, {
        type: INCREMENT_COUNTER
      })
    )
    .to.equal(1)
  });

  it('should handle DECREMENT_COUNTER', () => {
    chai.expect(
      counter(1, {
        type: DECREMENT_COUNTER
      })
    )
    .to.equal(0)
  });
});
