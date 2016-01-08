import {createStore, applyMiddleware, compose} from 'redux';
const thunk = require('redux-thunk');
import reducer from '../reducers/index';

const finalCreateStore = compose(
  applyMiddleware(thunk)
)(createStore);

export default () => {
  return finalCreateStore(reducer);
}
