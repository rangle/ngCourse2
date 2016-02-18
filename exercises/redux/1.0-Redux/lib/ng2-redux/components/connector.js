  'use strict';

  exports.__esModule = true;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var _utilsShallowEqual = require('../utils/shallowEqual');

  var _utilsShallowEqual2 = _interopRequireDefault(_utilsShallowEqual);

  var _utilsWrapActionCreators = require('../utils/wrapActionCreators');

  var _utilsWrapActionCreators2 = _interopRequireDefault(_utilsWrapActionCreators);

  var _invariant = require('invariant');

  var _invariant2 = _interopRequireDefault(_invariant);

  var _lodash = require('lodash');

  var _lodash2 = _interopRequireDefault(_lodash);

  var Connector = (function () {
    function Connector(store) {
      var _this = this;

      _classCallCheck(this, Connector);

      this.connect = function (mapStateToTarget, mapDispatchToTarget) {

        var finalMapStateToTarget = mapStateToTarget || _this._defaultMapStateToTarget;

        var finalMapDispatchToTarget = _lodash2['default'].isPlainObject(mapDispatchToTarget) ? _utilsWrapActionCreators2['default'](mapDispatchToTarget) : mapDispatchToTarget || _this._defaultMapDispatchToTarget;

        _invariant2['default'](_lodash2['default'].isFunction(finalMapStateToTarget), 'mapStateToTarget must be a Function. Instead received $s.', finalMapStateToTarget);

        _invariant2['default'](_lodash2['default'].isPlainObject(finalMapDispatchToTarget) || _lodash2['default'].isFunction(finalMapDispatchToTarget), 'mapDispatchToTarget must be a plain Object or a Function. Instead received $s.', finalMapDispatchToTarget);

        var slice = _this.getStateSlice(_this._store.getState(), finalMapStateToTarget);

        var boundActionCreators = finalMapDispatchToTarget(_this._store.dispatch);

        return function (target) {

          _invariant2['default'](_lodash2['default'].isFunction(target) || _lodash2['default'].isObject(target), 'The target parameter passed to connect must be a Function or a plain object.');

          //Initial update
          _this.updateTarget(target, slice, boundActionCreators);

          var unsubscribe = _this._store.subscribe(function () {
            var nextSlice = _this.getStateSlice(_this._store.getState(), finalMapStateToTarget);
            if (!_utilsShallowEqual2['default'](slice, nextSlice)) {
              slice = nextSlice;
              _this.updateTarget(target, slice, boundActionCreators);
            }
          });
          return unsubscribe;
        };
      };

      this._store = store;
      this._defaultMapStateToTarget = function () {
        return {};
      };
      this._defaultMapDispatchToTarget = function (dispatch) {
        return { dispatch: dispatch };
      };
    }

    Connector.prototype.updateTarget = function updateTarget(target, StateSlice, dispatch) {
      if (_lodash2['default'].isFunction(target)) {
        target(StateSlice, dispatch);
      } else {
        _lodash2['default'].assign(target, StateSlice, dispatch);
      }
    };

    Connector.prototype.getStateSlice = function getStateSlice(state, mapStateToScope) {
      var slice = mapStateToScope(state);

      _invariant2['default'](_lodash2['default'].isPlainObject(slice), '`mapStateToScope` must return an object. Instead received %s.', slice);

      return slice;
    };

    return Connector;
  })();

  exports['default'] = Connector;
  module.exports = exports['default'];