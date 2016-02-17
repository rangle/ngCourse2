'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.provider = provider;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _connector2 = require('./connector');

var _connector3 = _interopRequireDefault(_connector2);

var _angular2Core = require('angular2/core');

var redux = require('redux');

function provider(store) {
    var _connector = new _connector3['default'](store);

    return _angular2Core.bind('ngRedux').toFactory(function () {
        return _extends({ connect: _connector.connect }, store);
    });
}

/*
 const createStoreWithMiddleware = applyInjectableMiddleware(thunk, 'promise')(createStore);
*/
/*
export function applyInjectableMiddleware(middlewares) {
    const injector = new Injector();
    let resolvedMiddlewares = [];
    _.forEach(middlewares, middleware => {
        _.isString(middleware)
            ? resolvedMiddlewares.push(Injector.resolve(middleware))
            : resolvedMiddlewares.push(middleware)
    });

    return redux.applyMiddleware(...resolvedMiddlewares);
}
*/