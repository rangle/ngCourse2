import {applyMiddleware, compose, createStore} from 'redux';
import reducer from '../reducers/index';
const thunk = require('redux-thunk');

const middlewares = [thunk];

export function mockStore({ getState, dispatch }) {
  function createStore() {
    return { getState, dispatch };
  }

  const finalCreateStore = applyMiddleware(
    ...middlewares
  )(createStore);
  
  return finalCreateStore();
}
