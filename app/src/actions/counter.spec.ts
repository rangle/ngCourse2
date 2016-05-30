import {mockStore} from '../mocks/mock-store';
import {INCREMENT_COUNTER, DECREMENT_COUNTER} from './counter';
import * as CounterActions from './counter';
import {
  describe,
  it
} from '@angular/core/testing';
import {Action} from 'redux';

describe('counter action creators', () => {
  it('increment should create INCREMENT_COUNTER action', () => {
    chai.expect(CounterActions.increment())
      .to.deep.equal({
        type: INCREMENT_COUNTER
      });
  });

  it('decrement should create DECREMENT_COUNTER action', () => {
    chai.expect(CounterActions.decrement())
      .to.deep.equal({
        type: DECREMENT_COUNTER
      });
  });

  it('incrementIfOdd should dispatch INCREMENT_COUNTER if counter is odd',
    (done) => {

      const expectedAction = { type: INCREMENT_COUNTER };

      const store = mockStore({
        getState: () => {
          return {
            counter: 1
          };
        },
        dispatch: (action) => {
          chai.expect(action)
            .to.deep.equal(expectedAction);

          done();
        }
      });

      store.dispatch(<Action><any>CounterActions.incrementIfOdd());
    });

  it('incrementAsync should dispatch INCREMENT_COUNTER after given delay', 
    (done) => {
      const expectedAction = { type: INCREMENT_COUNTER };

      const store = mockStore({
        getState: () => {
          return {
            counter: 0
          }
        },
        dispatch: (action) => {
          chai.expect(action)
            .to.deep.equal(expectedAction);

          done();
        }
      });

      store.dispatch(<Action><any>CounterActions.incrementAsync(100));
    });
});
