import {applyMiddleware, Store} from 'redux';
import reducer from '../reducers/index';
const thunk = require('redux-thunk').default;

const middlewares = [thunk];

export function mockStore({ getState, dispatch }) {
  function createStore() {
    return <Store<any>><any>{ getState, dispatch };
  }

  const finalCreateStore = applyMiddleware(
    ...middlewares
  )(createStore);
  
  return finalCreateStore(undefined, undefined);
}
