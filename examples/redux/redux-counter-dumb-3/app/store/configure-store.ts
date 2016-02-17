import {createStore, applyMiddleware, compose} from 'redux';
import logger from './configure-logger';
import thunk from 'redux-thunk';
import reducer from '../reducers/index'

let middleware: Array<any> = [thunk, logger];

const finalCreateStore = compose(
  applyMiddleware(...middleware)
)(createStore);

export default () => {
  return finalCreateStore(reducer);
}
