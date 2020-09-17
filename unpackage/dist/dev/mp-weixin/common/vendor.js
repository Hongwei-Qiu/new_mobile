(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          // eslint-disable-next-line no-sparse-arrays
          ret.push(handler.apply(handlerCtx, (Array.isArray(params) ? params : []).concat([,,,,,,,,,, event])));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 17:
/*!**********************************************!*\
  !*** E:/desktop/new_mobile/static/js/md5.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var rotateLeft = function rotateLeft(lValue, iShiftBits) {
  return lValue << iShiftBits | lValue >>> 32 - iShiftBits;
};

var addUnsigned = function addUnsigned(lX, lY) {
  var lX4, lY4, lX8, lY8, lResult;
  lX8 = lX & 0x80000000;
  lY8 = lY & 0x80000000;
  lX4 = lX & 0x40000000;
  lY4 = lY & 0x40000000;
  lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
  if (lX4 & lY4) return lResult ^ 0x80000000 ^ lX8 ^ lY8;
  if (lX4 | lY4) {
    if (lResult & 0x40000000) return lResult ^ 0xC0000000 ^ lX8 ^ lY8;else
    return lResult ^ 0x40000000 ^ lX8 ^ lY8;
  } else {
    return lResult ^ lX8 ^ lY8;
  }
};

var F = function F(x, y, z) {
  return x & y | ~x & z;
};

var G = function G(x, y, z) {
  return x & z | y & ~z;
};

var H = function H(x, y, z) {
  return x ^ y ^ z;
};

var I = function I(x, y, z) {
  return y ^ (x | ~z);
};

var FF = function FF(a, b, c, d, x, s, ac) {
  a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
  return addUnsigned(rotateLeft(a, s), b);
};

var GG = function GG(a, b, c, d, x, s, ac) {
  a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
  return addUnsigned(rotateLeft(a, s), b);
};

var HH = function HH(a, b, c, d, x, s, ac) {
  a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
  return addUnsigned(rotateLeft(a, s), b);
};

var II = function II(a, b, c, d, x, s, ac) {
  a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
  return addUnsigned(rotateLeft(a, s), b);
};

var convertToWordArray = function convertToWordArray(string) {
  var lWordCount;
  var lMessageLength = string.length;
  var lNumberOfWordsTempOne = lMessageLength + 8;
  var lNumberOfWordsTempTwo = (lNumberOfWordsTempOne - lNumberOfWordsTempOne % 64) / 64;
  var lNumberOfWords = (lNumberOfWordsTempTwo + 1) * 16;
  var lWordArray = Array(lNumberOfWords - 1);
  var lBytePosition = 0;
  var lByteCount = 0;
  while (lByteCount < lMessageLength) {
    lWordCount = (lByteCount - lByteCount % 4) / 4;
    lBytePosition = lByteCount % 4 * 8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | string.charCodeAt(lByteCount) << lBytePosition;
    lByteCount++;
  }
  lWordCount = (lByteCount - lByteCount % 4) / 4;
  lBytePosition = lByteCount % 4 * 8;
  lWordArray[lWordCount] = lWordArray[lWordCount] | 0x80 << lBytePosition;
  lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
  lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
  return lWordArray;
};

var wordToHex = function wordToHex(lValue) {
  var WordToHexValue = "",
  WordToHexValueTemp = "",
  lByte,lCount;
  for (lCount = 0; lCount <= 3; lCount++) {
    lByte = lValue >>> lCount * 8 & 255;
    WordToHexValueTemp = "0" + lByte.toString(16);
    WordToHexValue = WordToHexValue + WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2);
  }
  return WordToHexValue;
};

var uTF8Encode = function uTF8Encode(string) {
  string = string.replace(/\x0d\x0a/g, "\x0a");
  var output = "";
  for (var n = 0; n < string.length; n++) {
    var c = string.charCodeAt(n);
    if (c < 128) {
      output += String.fromCharCode(c);
    } else if (c > 127 && c < 2048) {
      output += String.fromCharCode(c >> 6 | 192);
      output += String.fromCharCode(c & 63 | 128);
    } else {
      output += String.fromCharCode(c >> 12 | 224);
      output += String.fromCharCode(c >> 6 & 63 | 128);
      output += String.fromCharCode(c & 63 | 128);
    }
  }
  return output;
};

function md5(string) {
  var x = Array();
  var k, AA, BB, CC, DD, a, b, c, d;
  var S11 = 7,
  S12 = 12,
  S13 = 17,
  S14 = 22;
  var S21 = 5,
  S22 = 9,
  S23 = 14,
  S24 = 20;
  var S31 = 4,
  S32 = 11,
  S33 = 16,
  S34 = 23;
  var S41 = 6,
  S42 = 10,
  S43 = 15,
  S44 = 21;
  string = uTF8Encode(string);
  x = convertToWordArray(string);
  a = 0x67452301;
  b = 0xEFCDAB89;
  c = 0x98BADCFE;
  d = 0x10325476;
  for (k = 0; k < x.length; k += 16) {
    AA = a;
    BB = b;
    CC = c;
    DD = d;
    a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
    d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
    c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
    b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
    a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
    d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
    c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
    b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
    a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
    d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
    c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
    b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
    a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
    d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
    c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
    b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
    a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
    d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
    c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
    b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
    a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
    d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
    c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
    b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
    a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
    d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
    c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
    b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
    a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
    d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
    c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
    b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
    a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
    d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
    c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
    b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
    a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
    d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
    c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
    b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
    a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
    d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
    c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
    b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
    a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
    d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
    c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
    b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
    a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
    d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
    c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
    b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
    a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
    d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
    c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
    b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
    a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
    d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
    c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
    b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
    a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
    d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
    c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
    b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
    a = addUnsigned(a, AA);
    b = addUnsigned(b, BB);
    c = addUnsigned(c, CC);
    d = addUnsigned(d, DD);
  }
  var tempValue = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
  return tempValue.toLowerCase();
}


module.exports = {
  hexMD5: md5 };

/***/ }),

/***/ 18:
/*!**************************************************!*\
  !*** E:/desktop/new_mobile/static/js/request.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {var app = getApp();

var rootDocment = app.globalData.rootUrl + '/mobileAdmin/'; //主接口; //主接口
var globalUrl = ["login"];
if (uni.getStorageSync("token")) {
  var header = {
    'Accept': 'application/json',
    'content-type': 'application/json', //
    'Authorization': uni.getStorageSync("token") };

}

function timeStamp() {
  return Math.round(new Date().getTime() / 1000);
}
/***
   * uri: 请求地址
   * datas:请求参数
   * success:请求成功的返回值
   * fail:请求失败的返回值
   */
//get请求带加载
function getRequest(url, datas, _success) {
  uni.showLoading({
    title: '加载中...',
    duration: 1000,
    mask: true,
    success: function success(res) {
      uni.request({
        url: rootDocment + url,
        method: 'GET',
        header: {
          'Accept': 'application/json',
          'content-type': 'application/json', //
          'Authorization': uni.getStorageSync("token") },

        data: Object.assign(datas),
        success: function success(res) {
          _success(res);
          if (res.header.authorization != undefined) {
            uni.setStorageSync("token", res.header.authorization);
          }
          if (res.data.code == 400) {
            uni.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 1000,
              success: function success() {

              } });

          }
          if (res.data.code == 401) {
            uni.clearStorage({
              success: function success(reg) {
                uni.navigateTo({
                  url: '/pages/account/login' });

              } });

          }
          if (res.data.code == 404) {

            uni.navigateTo({
              url: '/pages/account/404' });


          }

          uni.hideLoading();
        },
        fail: function fail(res) {
          uni.showModal({
            title: res.data,
            content: '网络出错，请刷新重试',
            showCancel: false });

        } });


    },
    fail: function fail(res) {},
    complete: function complete(res) {} });



}

//get请求
function getRequests(url, datas, _success2) {
  uni.request({
    url: rootDocment + url,
    method: 'GET',
    header: {
      'Accept': 'application/json',
      'content-type': 'application/json',
      'Authorization': uni.getStorageSync("token") },

    data: Object.assign(datas),
    success: function success(res) {
      _success2(res);
      if (res.header.authorization != undefined) {
        uni.setStorageSync("token", res.header.authorization);
      }
      if (res.data.code == 401) {
        uni.clearStorage({
          success: function success(reg) {
            uni.navigateTo({
              url: '/pages/account/login' });

          } });

      }
      if (res.data.code == 404) {
        uni.navigateTo({
          url: '/pages/account/404' });


      }
      if (res.data.code == 408) {
        uni.navigateTo({
          url: '/pages/account/service' });

      }
    },
    fail: function fail(res) {
      uni.showModal({
        title: res.data,
        content: '网络出错，请刷新重试',
        showCancel: false });

    } });


}

/***
   * 
   * uri: 请求地址
   * datas:请求参数
   * success:请求成功的返回值
   * fail:请求失败的返回值
   */
//POST请求带加载中
function postRequest(url, datas, _success3) {
  uni.showLoading({
    title: '加载中',
    mask: true,
    success: function success(res) {
      uni.request({
        url: rootDocment + url,
        method: 'POST',
        header: {
          'Accept': 'application/json',
          'content-type': 'application/json', //
          'Authorization': uni.getStorageSync("token") },

        data: Object.assign(datas),
        success: function success(res) {
          _success3(res);
          if (res.header.authorization != undefined) {
            uni.setStorageSync("token", res.header.authorization);
          }
          if (res.data.code == 400) {
            uni.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 1000,
              success: function success() {

              } });

          }
          if (res.data.code == 401) {

            uni.clearStorage({
              success: function success(reg) {
                uni.navigateTo({
                  url: '/pages/account/login' });

              } });


          }
          if (res.data.code == 403) {
            uni.showToast({
              title: '账号已禁用',
              icon: 'none',
              duration: 1000,
              success: function success() {
                uni.clearStorage({
                  success: function success(reg) {
                    uni.navigateTo({
                      url: '/pages/account/login' });

                  } });

              } });

          }
          if (res.data.code == 404) {

            uni.navigateTo({
              url: '/pages/account/404' });


          }
          if (res.data.code == 408) {
            uni.showToast({
              title: '抱歉，您的服务已到期，请联系《菜东家》工作人员续费！',
              icon: 'none',
              duration: 2000 });

          }
          uni.hideLoading();
        },
        fail: function fail(res) {
          uni.showModal({
            title: '网络错误',
            content: '网络出错，请刷新重试',
            showCancel: false });

        } });


    },
    fail: function fail(res) {},
    complete: function complete(res) {} });


}
//POST请求不带加载中
function postRequests(url, datas, _success4) {
  uni.request({
    url: rootDocment + url,
    method: 'POST',
    header: {
      'Accept': 'application/json',
      'content-type': 'application/json', //
      'Authorization': uni.getStorageSync("token") },

    data: Object.assign(datas),
    success: function success(res) {
      _success4(res);
      if (res.header.authorization != undefined) {
        uni.setStorageSync("token", res.header.authorization);
      }
      if (res.data.code == 401) {

        uni.clearStorage({
          success: function success(reg) {
            uni.navigateTo({
              url: '/pages/account/login' });

          } });


      }
    },
    fail: function fail(res) {
      uni.showModal({
        title: '网络错误',
        content: '网络出错，请刷新重试',
        showCancel: false });

    } });


}

function objKeySort(obj) {//排序的函数
  var newkey = Object.keys(obj).sort();
  //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
  var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
  var sz = '';
  for (var i = 0; i < newkey.length; i++) {//遍历newkey数组
    newObj[newkey[i]] = obj[newkey[i]]; //向新创建的对象中按照排好的顺序依次增加键值对
  }
  Object.keys(newObj).forEach(function (key) {
    sz += '&' + key + '=' + newObj[key];
  });
  return sz.substr(1); //返回排好序的新对象
}


function Toast(message) {
  uni.showToast({
    title: message,
    icon: 'none',
    duration: 1000 });

}

function getLastDay() {
  var current = new Date();
  var currentMonth = current.getMonth();
  var nextMonth = ++currentMonth;

  var nextMonthDayOne = new Date(current.getFullYear(), nextMonth, 1);

  var minusDate = 1000 * 60 * 60 * 24;

  return new Date(nextMonthDayOne.getTime() - minusDate);
}

function thedefaulttime() {//购买记录默认时间
  var date = new Date();
  var year = date.getFullYear().toString();
  var time = (date.getMonth() + 1).toString();


  var month = '';
  if (time < 10) {
    month = "0" + time;
  } else {
    month = time;
  }
  var num = date.getDate().toString();
  var day = getLastDay().getDate();

  // if (num < 10) {
  // 	day = "0" + num;
  // } else {
  // 	day = num;
  // }
  var start = year + '-' + month + '-01';
  var end = year + '-' + month + '-' + day;
  var dateArr = [start, end];
  return dateArr;
}

// 百度地图
function MP(ak) {
  return new Promise(function (resolve, reject) {
    window.init = function () {
      resolve(BMap);
    };
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://api.map.baidu.com/api?v=2.0&ak=" + ak + "&callback=init";
    script.onerror = reject;
    document.head.appendChild(script);
  });

}



module.exports = {
  getRequest: getRequest,
  getRequests: getRequests,
  postRequest: postRequest,
  postRequests: postRequests,
  timeStamp: timeStamp,
  Toast: Toast,
  header: header, //请求头部
  objKeySort: objKeySort, //加密排序
  thedefaulttime: thedefaulttime, //加密排序
  MP: MP };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var rawBindings = vm.__secret_vfa_state__ && vm.__secret_vfa_state__.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }
  
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 27:
/*!**********************************************!*\
  !*** E:/desktop/new_mobile/static/js/uni.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


function doHandleDate() {//获取年月
  var myDate = new Date();
  var tYear = myDate.getFullYear();
  var tMonth = myDate.getMonth();

  var m = tMonth + 1;
  if (m.toString().length == 1) {
    m = "0" + m;
  }
  return tYear + '-' + m;
}
function formatDate(params) {
  // params 0昨天 1今天 2明天
  var date = new Date();
  if (params == 0) {
    date.setTime(date.getTime() - 24 * 60 * 60 * 1000);
  }
  if (params == 2) {
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
  }

  var myyear = date.getFullYear();
  var mymonth = date.getMonth() + 1;
  var myweekday = date.getDate();

  if (mymonth < 10) {
    mymonth = "0" + mymonth;
  }
  if (myweekday < 10) {
    myweekday = "0" + myweekday;
  }
  return myyear + "-" + mymonth + "-" + myweekday;
}

function doHandleYear(tYear) {//获取年
  var myDate = new Date();
  var tYear = myDate.getFullYear();

  return tYear;
}
function doHandleMonth() {//获取月
  var myDate = new Date();
  var tMonth = myDate.getMonth();

  var m = tMonth + 1;
  if (m.toString().length == 1) {
    m = "0" + m;
  }
  return m;
}


module.exports = {
  doHandleDate: doHandleDate,
  formatDate: formatDate,
  doHandleYear: doHandleYear,
  doHandleMonth: doHandleMonth };

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 395:
/*!**********************************************************************!*\
  !*** E:/desktop/new_mobile/js_sdk/u-charts/u-charts/u-charts.min.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {var config = { yAxisWidth: 15, yAxisSplit: 5, xAxisHeight: 15, xAxisLineHeight: 15, legendHeight: 15, yAxisTitleWidth: 15, padding: [10, 10, 10, 10], pixelRatio: 1, rotate: !1, columePadding: 3, fontSize: 13, dataPointShape: ["circle", "circle", "circle", "circle"], colors: ["#1890ff", "#2fc25b", "#facc14", "#f04864", "#8543e0", "#90ed7d"], pieChartLinePadding: 15, pieChartTextPadding: 5, xAxisTextPadding: 3, titleColor: "#333333", titleFontSize: 20, subtitleColor: "#999999", subtitleFontSize: 15, toolTipPadding: 3, toolTipBackground: "#000000", toolTipOpacity: .7, toolTipLineHeight: 20, radarLabelTextMargin: 15, gaugeLabelTextMargin: 15 };var assign = function assign(e) {for (var _len = arguments.length, t = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {t[_key - 1] = arguments[_key];}function i(e, t) {for (var a in t) {e[a] = e[a] && "[object Object]" === e[a].toString() ? i(e[a], t[a]) : e[a] = t[a];}return e;}if (null == e) throw new TypeError("Cannot convert undefined or null to object");return !t || 0 >= t.length ? e : (t.forEach(function (t) {e = i(e, t);}), e);};var util = { toFixed: function toFixed(e, t) {return t = t || 2, this.isFloat(e) && (e = e.toFixed(t)), e;}, isFloat: function isFloat(e) {return 0 != e % 1;}, approximatelyEqual: function approximatelyEqual(e, t) {return 1e-10 > Math.abs(e - t);}, isSameSign: function isSameSign(e, t) {var i = Math.abs;return i(e) === e && i(t) === t || i(e) !== e && i(t) !== t;}, isSameXCoordinateArea: function isSameXCoordinateArea(e, t) {return this.isSameSign(e.x, t.x);}, isCollision: function isCollision(e, t) {e.end = {}, e.end.x = e.start.x + e.width, e.end.y = e.start.y - e.height, t.end = {}, t.end.x = t.start.x + t.width, t.end.y = t.start.y - t.height;var i = t.start.x > e.end.x || t.end.x < e.start.x || t.end.y > e.start.y || t.start.y < e.end.y;return !i;} };function getH5Offset(t) {return t.mp = { changedTouches: [] }, t.mp.changedTouches.push({ x: t.offsetX, y: t.offsetY }), t;}function hexToRgb(e, t) {var i = e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (e, t, i, a) {return t + t + i + i + a + a;}),a = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(i),o = parseInt(a[1], 16),n = parseInt(a[2], 16),l = parseInt(a[3], 16);return "rgba(" + o + "," + n + "," + l + "," + t + ")";}function findRange(e, t, i) {if (isNaN(e)) throw new Error("[uCharts] unvalid series data!");i = i || 10, t = t ? t : "upper";for (var a = 1; 1 > i;) {i *= 10, a *= 10;}for (e = "upper" === t ? Math.ceil(e * a) : Math.floor(e * a); 0 != e % i;) {"upper" === t ? e++ : e--;}return e / a;}function calCandleMA(e, t, i, a) {var o = [];for (var n, l = 0; l < e.length; l++) {n = { data: [], name: t[l], color: i[l] };for (var _t = 0, _i = a.length; _t < _i; _t++) {if (_t < e[l]) {n.data.push(null);continue;}var _i2 = 0;for (var _o = 0; _o < e[l]; _o++) {_i2 += a[_t - _o][1];}n.data.push(+(_i2 / e[l]).toFixed(3));}o.push(n);}return o;}function calValidDistance(e, t, i, a, o) {var n = o.width - o.area[1] - o.area[3],l = i.eachSpacing * (o.chartData.xAxisData.xAxisPoints.length - 1),r = t;return 0 <= t ? (r = 0, e.event.trigger("scrollLeft")) : Math.abs(t) >= l - n && (r = n - l, e.event.trigger("scrollRight")), r;}function isInAngleRange(e, t, i) {function a(e) {for (; 0 > e;) {e += 2 * o;}for (; e > 2 * o;) {e -= 2 * o;}return e;}var o = Math.PI;return e = a(e), t = a(t), i = a(i), t > i && (i += 2 * o, e < t && (e += 2 * o)), e >= t && e <= i;}function calRotateTranslate(e, t, i) {var a = e,o = i - t,n = a + (i - o - a) / 1.4142135623730951;n *= -1;return { transX: n, transY: (i - o) * (1.4142135623730951 - 1) - (i - o - a) / 1.4142135623730951 };}function createCurveControlPoints(e, t) {function i(e, t) {return !!(e[t - 1] && e[t + 1]) && (e[t].y >= l(e[t - 1].y, e[t + 1].y) || e[t].y <= n(e[t - 1].y, e[t + 1].y));}function o(e, t) {return !!(e[t - 1] && e[t + 1]) && (e[t].x >= l(e[t - 1].x, e[t + 1].x) || e[t].x <= n(e[t - 1].x, e[t + 1].x));}var n = Math.min,l = Math.max,r = .2,a = .2,s = null,d = null,h = null,x = null;if (1 > t ? (s = e[0].x + (e[1].x - e[0].x) * r, d = e[0].y + (e[1].y - e[0].y) * r) : (s = e[t].x + (e[t + 1].x - e[t - 1].x) * r, d = e[t].y + (e[t + 1].y - e[t - 1].y) * r), t > e.length - 3) {var c = e.length - 1;h = e[c].x - (e[c].x - e[c - 1].x) * a, x = e[c].y - (e[c].y - e[c - 1].y) * a;} else h = e[t + 1].x - (e[t + 2].x - e[t].x) * a, x = e[t + 1].y - (e[t + 2].y - e[t].y) * a;return i(e, t + 1) && (x = e[t + 1].y), i(e, t) && (d = e[t].y), o(e, t + 1) && (h = e[t + 1].x), o(e, t) && (s = e[t].x), (d >= l(e[t].y, e[t + 1].y) || d <= n(e[t].y, e[t + 1].y)) && (d = e[t].y), (x >= l(e[t].y, e[t + 1].y) || x <= n(e[t].y, e[t + 1].y)) && (x = e[t + 1].y), (s >= l(e[t].x, e[t + 1].x) || s <= n(e[t].x, e[t + 1].x)) && (s = e[t].x), (h >= l(e[t].x, e[t + 1].x) || h <= n(e[t].x, e[t + 1].x)) && (h = e[t + 1].x), { ctrA: { x: s, y: d }, ctrB: { x: h, y: x } };}function convertCoordinateOrigin(e, t, i) {return { x: i.x + e, y: i.y - t };}function avoidCollision(e, t) {if (t) for (; util.isCollision(e, t);) {0 < e.start.x ? e.start.y-- : 0 > e.start.x ? e.start.y++ : 0 < e.start.y ? e.start.y++ : e.start.y--;}return e;}function fillSeries(e, t, i) {var a = 0;return e.map(function (e) {if (e.color || (e.color = i.colors[a], a = (a + 1) % i.colors.length), e.index || (e.index = 0), e.type || (e.type = t.type), "undefined" == typeof e.show && (e.show = !0), e.type || (e.type = t.type), e.pointShape || (e.pointShape = "circle"), !e.legendShape) switch (e.type) {case "line":e.legendShape = "line";break;case "column":e.legendShape = "rect";break;case "area":e.legendShape = "triangle";break;default:e.legendShape = "circle";}return e;});}function getDataRange(e, t) {var i = 0,a = t - e;return i = 1e4 <= a ? 1e3 : 1e3 <= a ? 100 : 100 <= a ? 10 : 10 <= a ? 5 : 1 <= a ? 1 : .1 <= a ? .1 : .01 <= a ? .01 : .001 <= a ? .001 : 1e-4 <= a ? 1e-4 : 1e-5 <= a ? 1e-5 : 1e-6, { minRange: findRange(e, "lower", i), maxRange: findRange(t, "upper", i) };}function measureText(e) {var t = 1 < arguments.length && arguments[1] !== void 0 ? arguments[1] : config.fontSize;e = e + "";var e = e.split(""),a = 0;for (var _t2, o = 0; o < e.length; o++) {_t2 = e[o], a += /[a-zA-Z]/.test(_t2) ? 7 : /[0-9]/.test(_t2) ? 5.5 : /\./.test(_t2) ? 2.7 : /-/.test(_t2) ? 3.25 : /[\u4e00-\u9fa5]/.test(_t2) ? 10 : /\(|\)/.test(_t2) ? 3.73 : /\s/.test(_t2) ? 2.5 : /%/.test(_t2) ? 8 : 10;}return a * t / 10;}function dataCombine(e) {return e.reduce(function (e, t) {return (e.data ? e.data : e).concat(t.data);}, []);}function dataCombineStack(e, t) {for (var o = Array(t), a = 0; a < o.length; a++) {o[a] = 0;}for (var n = 0; n < e.length; n++) {for (var a = 0; a < o.length; a++) {o[a] += e[n].data[a];}}return e.reduce(function (e, t) {return (e.data ? e.data : e).concat(t.data).concat(o);}, []);}function getTouches(t, i, a) {var e, o;return t.clientX ? i.rotate ? (o = i.height - t.clientX * i.pixelRatio, e = (t.pageY - a.currentTarget.offsetTop - i.height / i.pixelRatio / 2 * (i.pixelRatio - 1)) * i.pixelRatio) : (e = t.clientX * i.pixelRatio, o = (t.pageY - a.currentTarget.offsetTop - i.height / i.pixelRatio / 2 * (i.pixelRatio - 1)) * i.pixelRatio) : i.rotate ? (o = i.height - t.x * i.pixelRatio, e = t.y * i.pixelRatio) : (e = t.x * i.pixelRatio, o = t.y * i.pixelRatio), { x: e, y: o };}function getSeriesDataItem(e, t) {var i = [];for (var a, o = 0; o < e.length; o++) {if (a = e[o], null !== a.data[t] && "undefined" != typeof a.data[t] && a.show) {var _e = {};_e.color = a.color, _e.type = a.type, _e.style = a.style, _e.pointShape = a.pointShape, _e.disableLegend = a.disableLegend, _e.name = a.name, _e.show = a.show, _e.data = a.format ? a.format(a.data[t]) : a.data[t], i.push(_e);}}return i;}function getMaxTextListLength(e) {var t = e.map(function (e) {return measureText(e);});return Math.max.apply(null, t);}function getRadarCoordinateSeries(e) {for (var t = Math.PI, a = [], o = 0; o < e; o++) {a.push(2 * t / e * o);}return a.map(function (e) {return -1 * e + t / 2;});}function getToolTipData(e, t, a, i) {var o = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : {},n = e.map(function (e) {var t = [];return t = i ? i : e.data, { text: o.format ? o.format(e, t[a]) : e.name + ": " + e.data, color: e.color };}),l = [],r = { x: 0, y: 0 };for (var _o2, _n = 0; _n < t.length; _n++) {_o2 = t[_n], "undefined" != typeof _o2[a] && null !== _o2[a] && l.push(_o2[a]);}for (var _o3, _n2 = 0; _n2 < l.length; _n2++) {_o3 = l[_n2], r.x = Math.round(_o3.x), r.y += _o3.y;}return r.y /= l.length, { textList: n, offset: r };}function getMixToolTipData(e, t, a, i) {var o = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : {},n = e.map(function (e) {return { text: o.format ? o.format(e, i[a]) : e.name + ": " + e.data, color: e.color, disableLegend: !!e.disableLegend };});n = n.filter(function (e) {if (!0 !== e.disableLegend) return e;});var l = [],r = { x: 0, y: 0 };for (var _o4, _n3 = 0; _n3 < t.length; _n3++) {_o4 = t[_n3], "undefined" != typeof _o4[a] && null !== _o4[a] && l.push(_o4[a]);}for (var _o5, _n4 = 0; _n4 < l.length; _n4++) {_o5 = l[_n4], r.x = Math.round(_o5.x), r.y += _o5.y;}return r.y /= l.length, { textList: n, offset: r };}function getCandleToolTipData(e, t, a, o, i, n) {6 < arguments.length && void 0 !== arguments[6] ? arguments[6] : {};var l = n.color.upFill,r = n.color.downFill,s = [l, l, r, l];var d = [];var h = { text: i[o], color: null };d.push(h), t.map(function (t) {0 == o ? 0 > t.data[1] - t.data[0] ? s[1] = r : s[1] = l : (t.data[0] < e[o - 1][1] && (s[0] = r), t.data[1] < t.data[0] && (s[1] = r), t.data[2] > e[o - 1][1] && (s[2] = l), t.data[3] < e[o - 1][1] && (s[3] = r));var i = { text: "\u5F00\u76D8\uFF1A" + t.data[0], color: s[0] },a = { text: "\u6536\u76D8\uFF1A" + t.data[1], color: s[1] },n = { text: "\u6700\u4F4E\uFF1A" + t.data[2], color: s[2] },h = { text: "\u6700\u9AD8\uFF1A" + t.data[3], color: s[3] };d.push(i, a, n, h);});var x = [],c = { x: 0, y: 0 };for (var _l, _r = 0; _r < a.length; _r++) {_l = a[_r], "undefined" != typeof _l[o] && null !== _l[o] && x.push(_l[o]);}return c.x = Math.round(x[0][0].x), { textList: d, offset: c };}function filterSeries(e) {var t = [];for (var a = 0; a < e.length; a++) {!0 == e[a].show && t.push(e[a]);}return t;}function findCurrentIndex(e, t, i, a) {var o = 4 < arguments.length && arguments[4] !== void 0 ? arguments[4] : 0,n = -1,l = i.chartData.eachSpacing / 2;var r = [];if (0 < t.length) {if ("candle" == i.type) for (var _e2 = 0; _e2 < t[0].length; _e2++) {r.push(t[0][_e2][0].x);} else for (var _e3 = 0; _e3 < t[0].length; _e3++) {r.push(t[0][_e3].x);}("line" == i.type || "area" == i.type) && "justify" == i.xAxis.boundaryGap && (l = i.chartData.eachSpacing / 2), i.categories || (l = 0), isInExactChartArea(e, i, a) && r.forEach(function (t, i) {e.x + o + l > t && (n = i);});}return n;}function findLegendIndex(e, t) {var i = -1;if (isInExactLegendArea(e, t.area)) {var a = t.points,o = -1;for (var _t3, n = 0, l = a.length; n < l; n++) {_t3 = a[n];for (var _a = 0; _a < _t3.length; _a++) {o += 1;var _n5 = _t3[_a].area;if (e.x > _n5[0] && e.x < _n5[2] && e.y > _n5[1] && e.y < _n5[3]) {i = o;break;}}}return i;}return i;}function isInExactLegendArea(e, t) {return e.x > t.start.x && e.x < t.end.x && e.y > t.start.y && e.y < t.end.y;}function isInExactChartArea(e, t) {return e.x <= t.width - t.area[1] + 10 && e.x >= t.area[3] - 10 && e.y >= t.area[0] && e.y <= t.height - t.area[2];}function findRadarChartCurrentIndex(e, t, i) {var a = Math.PI,o = 2 * a / i,n = -1;if (isInExactPieChartArea(e, t.center, t.radius)) {var l = function l(e) {return 0 > e && (e += 2 * a), e > 2 * a && (e -= 2 * a), e;},r = Math.atan2(t.center.y - e.y, e.x - t.center.x);r = -1 * r, 0 > r && (r += 2 * a);var s = t.angleList.map(function (e) {return e = l(-1 * e), e;});s.forEach(function (e, t) {var i = l(e - o / 2),s = l(e + o / 2);s < i && (s += 2 * a), (r >= i && r <= s || r + 2 * a >= i && r + 2 * a <= s) && (n = t);});}return n;}function findFunnelChartCurrentIndex(e, t) {for (var a, o = -1, n = 0, l = t.series.length; n < l; n++) {if (a = t.series[n], e.x > a.funnelArea[0] && e.x < a.funnelArea[2] && e.y > a.funnelArea[1] && e.y < a.funnelArea[3]) {o = n;break;}}return o;}function findWordChartCurrentIndex(e, t) {for (var a, o = -1, n = 0, l = t.length; n < l; n++) {if (a = t[n], e.x > a.area[0] && e.x < a.area[2] && e.y > a.area[1] && e.y < a.area[3]) {o = n;break;}}return o;}function findMapChartCurrentIndex(e, t) {for (var a, o = -1, n = t.chartData.mapData, l = t.series, r = pointToCoordinate(e.y, e.x, n.bounds, n.scale, n.xoffset, n.yoffset), s = [r.x, r.y], d = 0, h = l.length; d < h; d++) {if (a = l[d].geometry.coordinates, isPoiWithinPoly(s, a)) {o = d;break;}}return o;}function findPieChartCurrentIndex(e, t) {var a = -1;if (isInExactPieChartArea(e, t.center, t.radius)) {var o = Math.atan2(t.center.y - e.y, e.x - t.center.x);o = -o;for (var n, l = 0, r = t.series.length; l < r; l++) {if (n = t.series[l], isInAngleRange(o, n._start_, n._start_ + 2 * n._proportion_ * Math.PI)) {a = l;break;}}}return a;}function isInExactPieChartArea(e, t, i) {var a = Math.pow;return a(e.x - t.x, 2) + a(e.y - t.y, 2) <= a(i, 2);}function splitPoints(e) {var t = [],i = [];return e.forEach(function (e) {null === e ? (i.length && t.push(i), i = []) : i.push(e);}), i.length && t.push(i), t;}function calLegendData(e, t, i, a) {var o = Math.max,n = Math.floor;var l = { area: { start: { x: 0, y: 0 }, end: { x: 0, y: 0 }, width: 0, height: 0, wholeWidth: 0, wholeHeight: 0 }, points: [], widthArr: [], heightArr: [] };if (!1 === t.legend.show) return a.legendData = l, l;var r = t.legend.padding,s = t.legend.margin,d = t.legend.fontSize,h = 15 * t.pixelRatio,x = 5 * t.pixelRatio,c = o(t.legend.lineHeight * t.pixelRatio, d);if ("top" == t.legend.position || "bottom" == t.legend.position) {var _a2 = [],_n6 = 0,p = [],g = [];for (var _o6 = 0; _o6 < e.length; _o6++) {var _i3 = e[_o6],_l2 = h + x + measureText(_i3.name || "undefined", d) + t.legend.itemGap;_n6 + _l2 > t.width - t.padding[1] - t.padding[3] ? (_a2.push(g), p.push(_n6 - t.legend.itemGap), _n6 = _l2, g = [_i3]) : (_n6 += _l2, g.push(_i3));}if (g.length) {_a2.push(g), p.push(_n6 - t.legend.itemGap), l.widthArr = p;var _e4 = o.apply(null, p);switch (t.legend.float) {case "left":l.area.start.x = t.padding[3], l.area.end.x = t.padding[3] + 2 * r;break;case "right":l.area.start.x = t.width - t.padding[1] - _e4 - 2 * r, l.area.end.x = t.width - t.padding[1];break;default:l.area.start.x = (t.width - _e4) / 2 - r, l.area.end.x = (t.width + _e4) / 2 + r;}l.area.width = _e4 + 2 * r, l.area.wholeWidth = _e4 + 2 * r, l.area.height = _a2.length * c + 2 * r, l.area.wholeHeight = _a2.length * c + 2 * r + 2 * s, l.points = _a2;}} else {var _i4 = e.length,_a3 = t.height - t.padding[0] - t.padding[2] - 2 * s - 2 * r,_o7 = Math.min(n(_a3 / c), _i4);switch (l.area.height = _o7 * c + 2 * r, l.area.wholeHeight = _o7 * c + 2 * r, t.legend.float) {case "top":l.area.start.y = t.padding[0] + s, l.area.end.y = t.padding[0] + s + l.area.height;break;case "bottom":l.area.start.y = t.height - t.padding[2] - s - l.area.height, l.area.end.y = t.height - t.padding[2] - s;break;default:l.area.start.y = (t.height - l.area.height) / 2, l.area.end.y = (t.height + l.area.height) / 2;}var _p = 0 == _i4 % _o7 ? _i4 / _o7 : n(_i4 / _o7 + 1),_g = [];for (var _t4, _a4 = 0; _a4 < _p; _a4++) {_t4 = e.slice(_a4 * _o7, _a4 * _o7 + _o7), _g.push(_t4);}if (l.points = _g, _g.length) {for (var _e6 = 0; _e6 < _g.length; _e6++) {var _i5 = _g[_e6],_a5 = 0;for (var _e7, _o8 = 0; _o8 < _i5.length; _o8++) {_e7 = h + x + measureText(_i5[_o8].name || "undefined", d) + t.legend.itemGap, _e7 > _a5 && (_a5 = _e7);}l.widthArr.push(_a5), l.heightArr.push(_i5.length * c + 2 * r);}var _e5 = 0;for (var _t5 = 0; _t5 < l.widthArr.length; _t5++) {_e5 += l.widthArr[_t5];}l.area.width = _e5 - t.legend.itemGap + 2 * r, l.area.wholeWidth = l.area.width + r;}}switch (t.legend.position) {case "top":l.area.start.y = t.padding[0] + s, l.area.end.y = t.padding[0] + s + l.area.height;break;case "bottom":l.area.start.y = t.height - t.padding[2] - l.area.height - s, l.area.end.y = t.height - t.padding[2] - s;break;case "left":l.area.start.x = t.padding[3], l.area.end.x = t.padding[3] + l.area.width;break;case "right":l.area.start.x = t.width - t.padding[1] - l.area.width, l.area.end.x = t.width - t.padding[1];}return a.legendData = l, l;}function calCategoriesData(e, t, i, a) {var o = { angle: 0, xAxisHeight: i.xAxisHeight },n = e.map(function (e) {return measureText(e, t.xAxis.fontSize || i.fontSize);}),l = Math.max.apply(this, n);return !0 == t.xAxis.rotateLabel && l + 2 * i.xAxisTextPadding > a && (o.angle = 45 * Math.PI / 180, o.xAxisHeight = 2 * i.xAxisTextPadding + l * Math.sin(o.angle)), o;}function getXAxisTextList(e, t) {var a = Math.min,o = Math.max,n = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : -1,l = dataCombine(e),r = [];l = l.filter(function (e) {return "object" == typeof e && null !== e ? -1 < e.constructor.toString().indexOf("Array") ? null !== e : null !== e.value : null !== e;}), l.map(function (e) {"object" == typeof e ? -1 < e.constructor.toString().indexOf("Array") ? "candle" == t.type ? e.map(function (e) {r.push(e);}) : r.push(e[0]) : r.push(e.value) : r.push(e);});var s = 0,d = 0;if (0 < r.length && (s = a.apply(this, r), d = o.apply(this, r)), -1 < n ? ("number" == typeof t.xAxis.data[n].min && (s = a(t.xAxis.data[n].min, s)), "number" == typeof t.xAxis.data[n].max && (d = o(t.xAxis.data[n].max, d))) : ("number" == typeof t.xAxis.min && (s = a(t.xAxis.min, s)), "number" == typeof t.xAxis.max && (d = o(t.xAxis.max, d))), s === d) {var h = d || 10;d += h;}for (var x = s, c = d, p = [], g = (c - x) / t.xAxis.splitNumber, y = 0; y <= t.xAxis.splitNumber; y++) {p.push(x + g * y);}return p;}function calXAxisData(e, t, i) {var a = { angle: 0, xAxisHeight: i.xAxisHeight };a.ranges = getXAxisTextList(e, t, i), a.rangesFormat = a.ranges.map(function (e) {return e = t.xAxis.format ? t.xAxis.format(e) : util.toFixed(e, 2), e;});var o = a.ranges.map(function (e) {return e = util.toFixed(e, 2), e = t.xAxis.format ? t.xAxis.format(+e) : e, e;});a = Object.assign(a, getXAxisPoints(o, t, i));var n = a.eachSpacing,l = o.map(function (e) {return measureText(e);}),r = Math.max.apply(this, l);return r + 2 * i.xAxisTextPadding > n && (a.angle = 45 * Math.PI / 180, a.xAxisHeight = 2 * i.xAxisTextPadding + r * Math.sin(a.angle)), !0 === t.xAxis.disabled && (a.xAxisHeight = 0), a;}function getRadarDataPoints(e, t, i, a, o) {var n = Math.max,l = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 1,r = o.extra.radar || {};r.max = r.max || 0;var s = n(r.max, n.apply(null, dataCombine(a))),d = [];var _loop = function _loop(_n7) {var o = a[_n7],r = {};r.color = o.color, r.legendShape = o.legendShape, r.pointShape = o.pointShape, r.data = [], o.data.forEach(function (a, o) {var n = {};n.angle = e[o], n.proportion = a / s, n.position = convertCoordinateOrigin(i * n.proportion * l * Math.cos(n.angle), i * n.proportion * l * Math.sin(n.angle), t), r.data.push(n);}), d.push(r);};for (var _n7 = 0; _n7 < a.length; _n7++) {_loop(_n7);}return d;}function getPieDataPoints(e, t) {var a = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : 1,o = 0,n = 0;for (var _a6, _n8 = 0; _n8 < e.length; _n8++) {_a6 = e[_n8], _a6.data = null === _a6.data ? 0 : _a6.data, o += _a6.data;}for (var _n9, l = 0; l < e.length; l++) {_n9 = e[l], _n9.data = null === _n9.data ? 0 : _n9.data, _n9._proportion_ = 0 === o ? 1 / e.length * a : _n9.data / o * a, _n9._radius_ = t;}for (var _a7, _o9 = 0; _o9 < e.length; _o9++) {_a7 = e[_o9], _a7._start_ = n, n += 2 * _a7._proportion_ * Math.PI;}return e;}function getFunnelDataPoints(e, t) {var a = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : 1;e = e.sort(function (e, t) {return parseInt(t.data) - parseInt(e.data);});for (var o = 0; o < e.length; o++) {e[o].radius = e[o].data / e[0].data * t * a, e[o]._proportion_ = e[o].data / e[0].data;}return e.reverse();}function getRoseDataPoints(e, t, a, o) {var n = 4 < arguments.length && arguments[4] !== void 0 ? arguments[4] : 1,l = 0,r = 0,s = [];for (var _n10, _r2 = 0; _r2 < e.length; _r2++) {_n10 = e[_r2], _n10.data = null === _n10.data ? 0 : _n10.data, l += _n10.data, s.push(_n10.data);}var d = Math.min.apply(null, s),h = Math.max.apply(null, s);for (var _r3, _s = 0; _s < e.length; _s++) {_r3 = e[_s], _r3.data = null === _r3.data ? 0 : _r3.data, 0 === l || "area" == t ? (_r3._proportion_ = _r3.data / l * n, _r3._rose_proportion_ = 1 / e.length * n) : (_r3._proportion_ = _r3.data / l * n, _r3._rose_proportion_ = _r3.data / l * n), _r3._radius_ = a + (o - a) * ((_r3.data - d) / (h - d));}for (var _n11, _l3 = 0; _l3 < e.length; _l3++) {_n11 = e[_l3], _n11._start_ = r, r += 2 * _n11._rose_proportion_ * Math.PI;}return e;}function getArcbarDataPoints(e, t) {var a = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : 1;1 == a && (a = .999999);for (var o, n = 0; n < e.length; n++) {o = e[n], o.data = null === o.data ? 0 : o.data;var i = void 0;i = "circle" == t.type ? 2 : t.endAngle < t.startAngle ? 2 + t.endAngle - t.startAngle : t.startAngle - t.endAngle, o._proportion_ = i * o.data * a + t.startAngle, 2 <= o._proportion_ && (o._proportion_ %= 2);}return e;}function getGaugeAxisPoints(e, t, a) {var o = t;for (var n = 0; n < e.length; n++) {e[n].value = null === e[n].value ? 0 : e[n].value, e[n]._startAngle_ = o, e[n]._endAngle_ = (t - a + 1) * e[n].value + t, 2 <= e[n]._endAngle_ && (e[n]._endAngle_ %= 2), o = e[n]._endAngle_;}return e;}function getGaugeDataPoints(e, t, a) {var o = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : 1;for (var n, l = 0; l < e.length; l++) {if (n = e[l], n.data = null === n.data ? 0 : n.data, "auto" == a.pointer.color) {for (var _e8 = 0; _e8 < t.length; _e8++) {if (n.data <= t[_e8].value) {n.color = t[_e8].color;break;}}} else n.color = a.pointer.color;var i = a.startAngle - a.endAngle + 1;n._endAngle_ = i * n.data + a.startAngle, n._oldAngle_ = a.oldAngle, a.oldAngle < a.endAngle && (n._oldAngle_ += 2), n._proportion_ = n.data >= a.oldData ? (n._endAngle_ - n._oldAngle_) * o + a.oldAngle : n._oldAngle_ - (n._oldAngle_ - n._endAngle_) * o, 2 <= n._proportion_ && (n._proportion_ %= 2);}return e;}function getPieTextMaxLength(e) {e = getPieDataPoints(e);var t = 0;for (var a = 0; a < e.length; a++) {var i = e[a],o = i.format ? i.format(+i._proportion_.toFixed(2)) : util.toFixed(100 * i._proportion_) + "%";t = Math.max(t, measureText(o));}return t;}function fixColumeData(e, t, i, a, o, n) {return e.map(function (e) {return null === e ? null : (e.width = Math.ceil((t - 2 * o.columePadding) / i), n.extra.column && n.extra.column.width && 0 < +n.extra.column.width && (e.width = Math.min(e.width, +n.extra.column.width)), 0 >= e.width && (e.width = 1), e.x += (a + .5 - i / 2) * e.width, e);});}function fixColumeMeterData(e, t, i, a, o, n, l) {return e.map(function (e) {return null === e ? null : (e.width = Math.ceil((t - 2 * o.columePadding) / 2), n.extra.column && n.extra.column.width && 0 < +n.extra.column.width && (e.width = Math.min(e.width, +n.extra.column.width)), 0 < a && (e.width -= 2 * l), e);});}function fixColumeStackData(e, t, i, a, o, n) {return e.map(function (e) {return null === e ? null : (e.width = Math.ceil((t - 2 * o.columePadding) / 2), n.extra.column && n.extra.column.width && 0 < +n.extra.column.width && (e.width = Math.min(e.width, +n.extra.column.width)), e);});}function getXAxisPoints(e, t) {var i = t.width - t.area[1] - t.area[3],a = t.enableScroll ? Math.min(t.xAxis.itemCount, e.length) : e.length;("line" == t.type || "area" == t.type) && 1 < a && "justify" == t.xAxis.boundaryGap && (a -= 1);var o = i / a,n = [],l = t.area[3],r = t.width - t.area[1];return e.forEach(function (e, t) {n.push(l + t * o);}), "justify" !== t.xAxis.boundaryGap && (!0 === t.enableScroll ? n.push(l + e.length * o) : n.push(r)), { xAxisPoints: n, startX: l, endX: r, eachSpacing: o };}function getCandleDataPoints(e, t, i, a, o, n) {var l = Math.round,r = 7 < arguments.length && void 0 !== arguments[7] ? arguments[7] : 1,s = [],d = n.height - n.area[0] - n.area[2];return e.forEach(function (e, h) {if (null === e) s.push(null);else {var x = [];e.forEach(function (e) {var s = { x: a[h] + l(o / 2) },c = e.value || e,p = d * (c - t) / (i - t);p *= r, s.y = n.height - l(p) - n.area[2], x.push(s);}), s.push(x);}}), s;}function getDataPoints(e, t, i, a, o, n) {var l = Math.round,r = 7 < arguments.length && void 0 !== arguments[7] ? arguments[7] : 1,s = "center";("line" == n.type || "area" == n.type) && (s = n.xAxis.boundaryGap);var d = [],h = n.height - n.area[0] - n.area[2],x = n.width - n.area[1] - n.area[3];return e.forEach(function (e, c) {if (null === e) d.push(null);else {var p = { color: e.color, x: a[c] },g = e;if ("object" == typeof e && null !== e) if (-1 < e.constructor.toString().indexOf("Array")) {var _t6, _i6, _a8;_t6 = [].concat(n.chartData.xAxisData.ranges), _i6 = _t6.shift(), _a8 = _t6.pop(), g = e[1], p.x = n.area[3] + x * (e[0] - _i6) / (_a8 - _i6);} else g = e.value;"center" == s && (p.x += l(o / 2));var y = h * (g - t) / (i - t);y *= r, p.y = n.height - l(y) - n.area[2], d.push(p);}}), d;}function getStackDataPoints(e, t, i, a, o, n, l, r, s) {var d = Math.round,h = 9 < arguments.length && void 0 !== arguments[9] ? arguments[9] : 1,x = [],c = n.height - n.area[0] - n.area[2];return e.forEach(function (e, l) {if (null === e) x.push(null);else {var p = { color: e.color, x: a[l] + d(o / 2) };if (0 < r) {var g = 0;for (var _e9 = 0; _e9 <= r; _e9++) {g += s[_e9].data[l];}var y = g - e,f = c * (g - t) / (i - t),u = c * (y - t) / (i - t);} else var g = e,f = c * (g - t) / (i - t),u = 0;var m = u;f *= h, m *= h, p.y = n.height - d(f) - n.area[2], p.y0 = n.height - d(m) - n.area[2], x.push(p);}}), x;}function getYAxisTextList(e, t, a, o) {var n,l = Math.min,r = Math.max,s = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : -1;n = "stack" == o ? dataCombineStack(e, t.categories.length) : dataCombine(e);var d = [];n = n.filter(function (e) {return "object" == typeof e && null !== e ? -1 < e.constructor.toString().indexOf("Array") ? null !== e : null !== e.value : null !== e;}), n.map(function (e) {"object" == typeof e ? -1 < e.constructor.toString().indexOf("Array") ? "candle" == t.type ? e.map(function (e) {d.push(e);}) : d.push(e[1]) : d.push(e.value) : d.push(e);});var h = 0,x = 0;if (0 < d.length && (h = l.apply(this, d), x = r.apply(this, d)), -1 < s ? ("number" == typeof t.yAxis.data[s].min && (h = l(t.yAxis.data[s].min, h)), "number" == typeof t.yAxis.data[s].max && (x = r(t.yAxis.data[s].max, x))) : ("number" == typeof t.yAxis.min && (h = l(t.yAxis.min, h)), "number" == typeof t.yAxis.max && (x = r(t.yAxis.max, x))), h === x) {var c = x || 10;x += c;}for (var p = getDataRange(h, x), g = p.minRange, y = p.maxRange, f = [], u = (y - g) / t.yAxis.splitNumber, m = 0; m <= t.yAxis.splitNumber; m++) {f.push(g + u * m);}return f.reverse();}function calYAxisData(e, t, a) {var o = Math.max,n = assign({}, { type: "" }, t.extra.column),l = t.yAxis.data.length,r = Array(l);if (0 < l) {for (var _t7 = 0; _t7 < l; _t7++) {r[_t7] = [];for (var _i7 = 0; _i7 < e.length; _i7++) {e[_i7].index == _t7 && r[_t7].push(e[_i7]);}}var s = Array(l),d = Array(l),h = Array(l);var _loop2 = function _loop2(x, _e11) {_e11 = t.yAxis.data[x], !0 == t.yAxis.disabled && (_e11.disabled = !0), s[x] = getYAxisTextList(r[x], t, a, n.type, x);var i = _e11.fontSize || a.fontSize;h[x] = { position: _e11.position ? _e11.position : "left", width: 0 }, d[x] = s[x].map(function (t) {_e10 = _e11;return t = util.toFixed(t, 6), t = _e11.format ? _e11.format(+t) : t, h[x].width = o(h[x].width, measureText(t, i) + 5), t;});var l = _e11.calibration ? 4 * t.pixelRatio : 0;h[x].width += l + 3 * t.pixelRatio, !0 === _e11.disabled && (h[x].width = 0);_e10 = _e11;};for (var _e10, x = 0; x < l; x++) {_loop2(x, _e10);}} else {var s = [,],d = [,],h = [,];s[0] = getYAxisTextList(e, t, a, n.type), h[0] = { position: "left", width: 0 };var i = t.yAxis.fontSize || a.fontSize;d[0] = s[0].map(function (e) {return e = util.toFixed(e, 6), e = t.yAxis.format ? t.yAxis.format(+e) : e, h[0].width = o(h[0].width, measureText(e, i) + 5), e;}), h[0].width += 3 * t.pixelRatio, !0 === t.yAxis.disabled ? (h[0] = { position: "left", width: 0 }, t.yAxis.data[0] = { disabled: !0 }) : t.yAxis.data[0] = { disabled: !1, position: "left", max: t.yAxis.max, min: t.yAxis.min, format: t.yAxis.format };}return { rangesFormat: d, ranges: s, yAxisWidth: h };}function calTooltipYAxisData(e, t, a) {var o = [].concat(a.chartData.yAxisData.ranges),n = a.height - a.area[0] - a.area[2],l = a.area[0],r = [];for (var s = 0; s < o.length; s++) {var _t8 = o[s].shift(),i = o[s].pop(),d = _t8 - (_t8 - i) * (e - l) / n;d = a.yAxis.data[s].format ? a.yAxis.data[s].format(+d) : d.toFixed(0), r.push(d + "");}return r;}function calMarkLineData(e, t) {var a,o,n = t.height - t.area[0] - t.area[2];for (var l = 0; l < e.length; l++) {e[l].yAxisIndex = e[l].yAxisIndex ? e[l].yAxisIndex : 0;var i = [].concat(t.chartData.yAxisData.ranges[e[l].yAxisIndex]);a = i.pop(), o = i.shift();var r = n * (e[l].value - a) / (o - a);e[l].y = t.height - Math.round(r) - t.area[2];}return e;}function contextRotate(e, t) {var i = Math.PI;!0 === t.rotateLock ? !0 !== t._rotate_ && (e.translate(t.height, 0), e.rotate(90 * i / 180), t._rotate_ = !0) : (e.translate(t.height, 0), e.rotate(90 * i / 180));}function drawPointShape(e, t, i, a, o) {a.beginPath(), "hollow" == o.dataPointShapeType ? (a.setStrokeStyle(t), a.setFillStyle(o.background), a.setLineWidth(2 * o.pixelRatio)) : (a.setStrokeStyle("#ffffff"), a.setFillStyle(t), a.setLineWidth(1 * o.pixelRatio)), "diamond" === i ? e.forEach(function (e) {null !== e && (a.moveTo(e.x, e.y - 4.5), a.lineTo(e.x - 4.5, e.y), a.lineTo(e.x, e.y + 4.5), a.lineTo(e.x + 4.5, e.y), a.lineTo(e.x, e.y - 4.5));}) : "circle" === i ? e.forEach(function (e) {null !== e && (a.moveTo(e.x + 2.5 * o.pixelRatio, e.y), a.arc(e.x, e.y, 3 * o.pixelRatio, 0, 2 * Math.PI, !1));}) : "rect" === i ? e.forEach(function (e) {null !== e && (a.moveTo(e.x - 3.5, e.y - 3.5), a.rect(e.x - 3.5, e.y - 3.5, 7, 7));}) : "triangle" == i && e.forEach(function (e) {null !== e && (a.moveTo(e.x, e.y - 4.5), a.lineTo(e.x - 4.5, e.y + 4.5), a.lineTo(e.x + 4.5, e.y + 4.5), a.lineTo(e.x, e.y - 4.5));}), a.closePath(), a.fill(), a.stroke();}function drawRingTitle(e, t, i, a) {var o = e.title.fontSize || t.titleFontSize,n = e.subtitle.fontSize || t.subtitleFontSize,l = e.title.name || "",r = e.subtitle.name || "",s = e.title.color || t.titleColor,d = e.subtitle.color || t.subtitleColor,h = l ? o : 0,x = r ? n : 0,c = 5;if (r) {var p = measureText(r, n),g = a.x - p / 2 + (e.subtitle.offsetX || 0),y = a.y + n / 2 + (e.subtitle.offsetY || 0);l && (y += (h + c) / 2), i.beginPath(), i.setFontSize(n), i.setFillStyle(d), i.fillText(r, g, y), i.closePath(), i.stroke();}if (l) {var f = measureText(l, o),u = a.x - f / 2 + (e.title.offsetX || 0),m = a.y + o / 2 + (e.title.offsetY || 0);r && (m -= (x + c) / 2), i.beginPath(), i.setFontSize(o), i.setFillStyle(s), i.fillText(l, u, m), i.closePath(), i.stroke();}}function drawPointText(e, t, i, a) {var o = t.data;e.forEach(function (e, n) {if (null !== e) {a.beginPath(), a.setFontSize(t.textSize || i.fontSize), a.setFillStyle(t.textColor || "#666666");var l = o[n];"object" == typeof o[n] && null !== o[n] && (o[n].constructor == Array ? l = o[n][1] : l = o[n].value);var r = t.format ? t.format(l) : l;a.fillText(r + "", e.x - measureText(r, t.textSize || i.fontSize) / 2, e.y - 4), a.closePath(), a.stroke();}});}function drawGaugeLabel(e, t, i, a, o, n) {var l = Math.PI;t -= e.width / 2 + o.gaugeLabelTextMargin;var r = e.startAngle - e.endAngle + 1,s = r / e.splitLine.splitNumber,d = e.endNumber - e.startNumber,h = d / e.splitLine.splitNumber,x = e.startAngle,c = e.startNumber;for (var _r4 = 0; _r4 < e.splitLine.splitNumber + 1; _r4++) {var p = { x: t * Math.cos(x * l), y: t * Math.sin(x * l) },g = e.labelFormat ? e.labelFormat(c) : c;p.x += i.x - measureText(g) / 2, p.y += i.y;var y = p.x,f = p.y;n.beginPath(), n.setFontSize(o.fontSize), n.setFillStyle(e.labelColor || "#666666"), n.fillText(g, y, f + o.fontSize / 2), n.closePath(), n.stroke(), x += s, 2 <= x && (x %= 2), c += h;}}function drawRadarLabel(e, t, i, a, o, n) {var l = a.extra.radar || {};t += o.radarLabelTextMargin, e.forEach(function (e, r) {var s = { x: t * Math.cos(e), y: t * Math.sin(e) },d = convertCoordinateOrigin(s.x, s.y, i),h = d.x,x = d.y;util.approximatelyEqual(s.x, 0) ? h -= measureText(a.categories[r] || "") / 2 : 0 > s.x && (h -= measureText(a.categories[r] || "")), n.beginPath(), n.setFontSize(o.fontSize), n.setFillStyle(l.labelColor || "#666666"), n.fillText(a.categories[r] || "", h, x + o.fontSize / 2), n.closePath(), n.stroke();});}function drawPieText(e, t, a, o, i, n) {var l = Math.cos,r = Math.sin,s = Math.min,d = Math.max,h = Math.PI,x = a.pieChartLinePadding,c = [],p = null,g = e.map(function (e) {var t = e.format ? e.format(+e._proportion_.toFixed(2)) : util.toFixed(100 * e._proportion_.toFixed(4)) + "%";e._rose_proportion_ && (e._proportion_ = e._rose_proportion_);var i = 2 * h - (e._start_ + 2 * h * e._proportion_ / 2),a = e.color,o = e._radius_;return { arc: i, text: t, color: a, radius: o, textColor: e.textColor, textSize: e.textSize };});for (var _h = 0; _h < g.length; _h++) {var _e12 = g[_h],_t9 = l(_e12.arc) * (_e12.radius + x),_i8 = r(_e12.arc) * (_e12.radius + x),_o10 = l(_e12.arc) * _e12.radius,_n12 = r(_e12.arc) * _e12.radius,y = 0 <= _t9 ? _t9 + a.pieChartTextPadding : _t9 - a.pieChartTextPadding,f = _i8,u = measureText(_e12.text, _e12.textSize || a.fontSize),m = f;p && util.isSameXCoordinateArea(p.start, { x: y }) && (0 < y ? m = s(f, p.start.y) : 0 > _t9 ? m = d(f, p.start.y) : 0 < f ? m = d(f, p.start.y) : m = s(f, p.start.y)), 0 > y && (y -= u);var S = { lineStart: { x: _o10, y: _n12 }, lineEnd: { x: _t9, y: _i8 }, start: { x: y, y: m }, width: u, height: a.fontSize, text: _e12.text, color: _e12.color, textColor: _e12.textColor, textSize: _e12.textSize };p = avoidCollision(S, p), c.push(p);}for (var _l4 = 0; _l4 < c.length; _l4++) {var _e13 = c[_l4],_i9 = convertCoordinateOrigin(_e13.lineStart.x, _e13.lineStart.y, n),_r5 = convertCoordinateOrigin(_e13.lineEnd.x, _e13.lineEnd.y, n),_s2 = convertCoordinateOrigin(_e13.start.x, _e13.start.y, n);o.setLineWidth(1 * t.pixelRatio), o.setFontSize(a.fontSize), o.beginPath(), o.setStrokeStyle(_e13.color), o.setFillStyle(_e13.color), o.moveTo(_i9.x, _i9.y);var _d = 0 > _e13.start.x ? _s2.x + _e13.width : _s2.x,_x = 0 > _e13.start.x ? _s2.x - 5 : _s2.x + 5;o.quadraticCurveTo(_r5.x, _r5.y, _d, _s2.y), o.moveTo(_i9.x, _i9.y), o.stroke(), o.closePath(), o.beginPath(), o.moveTo(_s2.x + _e13.width, _s2.y), o.arc(_d, _s2.y, 2, 0, 2 * h), o.closePath(), o.fill(), o.beginPath(), o.setFontSize(_e13.textSize || a.fontSize), o.setFillStyle(_e13.textColor || "#666666"), o.fillText(_e13.text, _x, _s2.y + 3), o.closePath(), o.stroke(), o.closePath();}}function drawToolTipSplitLine(e, t, i, a) {var o = t.extra.tooltip || {};o.gridType = null == o.gridType ? "solid" : o.gridType, o.dashLength = null == o.dashLength ? 4 : o.dashLength;var n = t.area[0],l = t.height - t.area[2];if ("dash" == o.gridType && a.setLineDash([o.dashLength, o.dashLength]), a.setStrokeStyle(o.gridColor || "#cccccc"), a.setLineWidth(1 * t.pixelRatio), a.beginPath(), a.moveTo(e, n), a.lineTo(e, l), a.stroke(), a.setLineDash([]), o.xAxisLabel) {var _n13 = t.categories[t.tooltip.index];a.setFontSize(i.fontSize);var r = measureText(_n13, i.fontSize),s = e - .5 * r,d = l;a.beginPath(), a.setFillStyle(hexToRgb(o.labelBgColor || i.toolTipBackground, o.labelBgOpacity || i.toolTipOpacity)), a.setStrokeStyle(o.labelBgColor || i.toolTipBackground), a.setLineWidth(1 * t.pixelRatio), a.rect(s - i.toolTipPadding, d, r + 2 * i.toolTipPadding, i.fontSize + 2 * i.toolTipPadding), a.closePath(), a.stroke(), a.fill(), a.beginPath(), a.setFontSize(i.fontSize), a.setFillStyle(o.labelFontColor || i.fontColor), a.fillText(_n13 + "", s, d + i.toolTipPadding + i.fontSize), a.closePath(), a.stroke();}}function drawMarkLine(e, t, a) {var o = assign({}, { type: "solid", dashLength: 4, data: [] }, e.extra.markLine),n = e.area[3],l = e.width - e.area[1],r = calMarkLineData(o.data, e);for (var s, d = 0; d < r.length; d++) {if (s = assign({}, { lineColor: "#DE4A42", showLabel: !1, labelFontColor: "#666666", labelBgColor: "#DFE8FF", labelBgOpacity: .8, yAxisIndex: 0 }, r[d]), "dash" == o.type && a.setLineDash([o.dashLength, o.dashLength]), a.setStrokeStyle(s.lineColor), a.setLineWidth(1 * e.pixelRatio), a.beginPath(), a.moveTo(n, s.y), a.lineTo(l, s.y), a.stroke(), a.setLineDash([]), s.showLabel) {var i = e.yAxis.format ? e.yAxis.format(+s.value) : s.value;a.setFontSize(t.fontSize);var _o11 = measureText(i, t.fontSize),_n14 = e.padding[3] + t.yAxisTitleWidth - t.toolTipPadding,_l5 = Math.max(e.area[3], _o11 + 2 * t.toolTipPadding),_r6 = _l5 - _n14,_d2 = s.y;a.setFillStyle(hexToRgb(s.labelBgColor, s.labelBgOpacity)), a.setStrokeStyle(s.labelBgColor), a.setLineWidth(1 * e.pixelRatio), a.beginPath(), a.rect(_n14, _d2 - .5 * t.fontSize - t.toolTipPadding, _r6, t.fontSize + 2 * t.toolTipPadding), a.closePath(), a.stroke(), a.fill(), a.beginPath(), a.setFontSize(t.fontSize), a.setFillStyle(s.labelFontColor), a.fillText(i + "", _n14 + (_r6 - _o11) / 2, _d2 + .5 * t.fontSize), a.stroke();}}}function drawToolTipHorizentalLine(e, t, a, i) {var o = Math.max,n = assign({}, { gridType: "solid", dashLength: 4 }, e.extra.tooltip),l = e.area[3],r = e.width - e.area[1];if ("dash" == n.gridType && a.setLineDash([n.dashLength, n.dashLength]), a.setStrokeStyle(n.gridColor || "#cccccc"), a.setLineWidth(1 * e.pixelRatio), a.beginPath(), a.moveTo(l, e.tooltip.offset.y), a.lineTo(r, e.tooltip.offset.y), a.stroke(), a.setLineDash([]), n.yAxisLabel) {var _l6 = calTooltipYAxisData(e.tooltip.offset.y, e.series, e, t, i),_r7 = e.chartData.yAxisData.yAxisWidth,s = e.area[3],d = e.width - e.area[1];for (var h = 0; h < _l6.length; h++) {a.setFontSize(t.fontSize);var _i10 = void 0,x = void 0,c = void 0,p = measureText(_l6[h], t.fontSize);"left" == _r7[h].position ? (_i10 = s - _r7[h].width, x = o(_i10, _i10 + p + 2 * t.toolTipPadding)) : (_i10 = d, x = o(_i10 + _r7[h].width, _i10 + p + 2 * t.toolTipPadding)), c = x - _i10;var g = _i10 + (c - p) / 2,y = e.tooltip.offset.y;a.beginPath(), a.setFillStyle(hexToRgb(n.labelBgColor || t.toolTipBackground, n.labelBgOpacity || t.toolTipOpacity)), a.setStrokeStyle(n.labelBgColor || t.toolTipBackground), a.setLineWidth(1 * e.pixelRatio), a.rect(_i10, y - .5 * t.fontSize - t.toolTipPadding, c, t.fontSize + 2 * t.toolTipPadding), a.closePath(), a.stroke(), a.fill(), a.beginPath(), a.setFontSize(t.fontSize), a.setFillStyle(n.labelFontColor || t.fontColor), a.fillText(_l6[h], g, y + .5 * t.fontSize), a.closePath(), a.stroke(), "left" == _r7[h].position ? s -= _r7[h].width + e.yAxis.padding : d += _r7[h].width + e.yAxis.padding;}}}function drawToolTipSplitArea(e, t, i, a, o) {var n = assign({}, { activeBgColor: "#000000", activeBgOpacity: .08 }, t.extra.tooltip),l = t.area[0],r = t.height - t.area[2];a.beginPath(), a.setFillStyle(hexToRgb(n.activeBgColor, n.activeBgOpacity)), a.rect(e - o / 2, l, o, r - l), a.closePath(), a.fill();}function drawToolTip(e, t, i, a, o) {var n = Math.round,l = assign({}, { showBox: !0, bgColor: "#000000", bgOpacity: .7, fontColor: "#FFFFFF" }, i.extra.tooltip),r = 4 * i.pixelRatio,s = 5 * i.pixelRatio,d = 8 * i.pixelRatio,h = !1;("line" == i.type || "area" == i.type || "candle" == i.type || "mix" == i.type) && drawToolTipSplitLine(i.tooltip.offset.x, i, a, o), t = assign({ x: 0, y: 0 }, t), t.y -= 8 * i.pixelRatio;var x = e.map(function (e) {return measureText(e.text, a.fontSize);}),c = r + s + 4 * a.toolTipPadding + Math.max.apply(null, x),p = 2 * a.toolTipPadding + e.length * a.toolTipLineHeight;!1 == l.showBox || (t.x - Math.abs(i._scrollDistance_) + d + c > i.width && (h = !0), p + t.y > i.height && (t.y = i.height - p), o.beginPath(), o.setFillStyle(hexToRgb(l.bgColor || a.toolTipBackground, l.bgOpacity || a.toolTipOpacity)), h ? (o.moveTo(t.x, t.y + 10 * i.pixelRatio), o.lineTo(t.x - d, t.y + 10 * i.pixelRatio - 5 * i.pixelRatio), o.lineTo(t.x - d, t.y), o.lineTo(t.x - d - n(c), t.y), o.lineTo(t.x - d - n(c), t.y + p), o.lineTo(t.x - d, t.y + p), o.lineTo(t.x - d, t.y + 10 * i.pixelRatio + 5 * i.pixelRatio), o.lineTo(t.x, t.y + 10 * i.pixelRatio)) : (o.moveTo(t.x, t.y + 10 * i.pixelRatio), o.lineTo(t.x + d, t.y + 10 * i.pixelRatio - 5 * i.pixelRatio), o.lineTo(t.x + d, t.y), o.lineTo(t.x + d + n(c), t.y), o.lineTo(t.x + d + n(c), t.y + p), o.lineTo(t.x + d, t.y + p), o.lineTo(t.x + d, t.y + 10 * i.pixelRatio + 5 * i.pixelRatio), o.lineTo(t.x, t.y + 10 * i.pixelRatio)), o.closePath(), o.fill(), e.forEach(function (e, i) {if (null !== e.color) {o.beginPath(), o.setFillStyle(e.color);var n = t.x + d + 2 * a.toolTipPadding,l = t.y + (a.toolTipLineHeight - a.fontSize) / 2 + a.toolTipLineHeight * i + a.toolTipPadding + 1;h && (n = t.x - c - d + 2 * a.toolTipPadding), o.fillRect(n, l, r, a.fontSize), o.closePath();}}), e.forEach(function (e, i) {var n = t.x + d + 2 * a.toolTipPadding + r + s;h && (n = t.x - c - d + 2 * a.toolTipPadding + +r + s);var x = t.y + (a.toolTipLineHeight - a.fontSize) / 2 + a.toolTipLineHeight * i + a.toolTipPadding;o.beginPath(), o.setFontSize(a.fontSize), o.setFillStyle(l.fontColor), o.fillText(e.text, n, x + a.fontSize), o.closePath(), o.stroke();}));}function drawYAxisTitle(e, t, i, a) {var o = i.xAxisHeight + (t.height - i.xAxisHeight - measureText(e)) / 2;a.save(), a.beginPath(), a.setFontSize(i.fontSize), a.setFillStyle(t.yAxis.titleFontColor || "#333333"), a.translate(0, t.height), a.rotate(-90 * Math.PI / 180), a.fillText(e, o, t.padding[3] + .5 * i.fontSize), a.closePath(), a.stroke(), a.restore();}function drawColumnDataPoints(e, t, i, a) {var o = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : 1,n = t.chartData.xAxisData,l = n.xAxisPoints,r = n.eachSpacing,s = assign({}, { type: "group", width: r / 2, meter: { border: 4, fillColor: "#FFFFFF" } }, t.extra.column),d = [];a.save();var h = -2,x = l.length + 2;return t._scrollDistance_ && 0 !== t._scrollDistance_ && !0 === t.enableScroll && (a.translate(t._scrollDistance_, 0), h = Math.floor(-t._scrollDistance_ / r) - 2, x = h + t.xAxis.itemCount + 4), t.tooltip && t.tooltip.textList && t.tooltip.textList.length && 1 === o && drawToolTipSplitArea(t.tooltip.offset.x, t, i, a, r), e.forEach(function (n, c) {var p, g, y;p = [].concat(t.chartData.yAxisData.ranges[n.index]), g = p.pop(), y = p.shift();var f = n.data;switch (s.type) {case "group":var u = getDataPoints(f, g, y, l, r, t, i, o),m = getStackDataPoints(f, g, y, l, r, t, i, c, e, o);d.push(m), u = fixColumeData(u, r, e.length, c, i, t);for (var _e14, _o12 = 0; _o12 < u.length; _o12++) {if (_e14 = u[_o12], null !== _e14 && _o12 > h && _o12 < x) {a.beginPath(), a.setStrokeStyle(_e14.color || n.color), a.setLineWidth(1), a.setFillStyle(_e14.color || n.color);var S = _e14.x - _e14.width / 2,A = t.height - _e14.y - t.area[2];a.moveTo(S, _e14.y), a.lineTo(S + _e14.width - 2, _e14.y), a.lineTo(S + _e14.width - 2, t.height - t.area[2]), a.lineTo(S, t.height - t.area[2]), a.lineTo(S, _e14.y), a.closePath(), a.stroke(), a.fill();}};break;case "stack":var u = getStackDataPoints(f, g, y, l, r, t, i, c, e, o);d.push(u), u = fixColumeStackData(u, r, e.length, c, i, t, e);for (var _e15, _o13 = 0; _o13 < u.length; _o13++) {if (_e15 = u[_o13], null !== _e15 && _o13 > h && _o13 < x) {a.beginPath(), a.setFillStyle(_e15.color || n.color);var S = _e15.x - _e15.width / 2 + 1,A = t.height - _e15.y - t.area[2],T = t.height - _e15.y0 - t.area[2];0 < c && (A -= T), a.moveTo(S, _e15.y), a.fillRect(S, _e15.y, _e15.width - 2, A), a.closePath(), a.fill();}};break;case "meter":var u = getDataPoints(f, g, y, l, r, t, i, o);if (d.push(u), u = fixColumeMeterData(u, r, e.length, c, i, t, s.meter.border), 0 == c) {for (var _e16, _o14 = 0; _o14 < u.length; _o14++) {if (_e16 = u[_o14], null !== _e16 && _o14 > h && _o14 < x) {a.beginPath(), a.setFillStyle(s.meter.fillColor);var S = _e16.x - _e16.width / 2,A = t.height - _e16.y - t.area[2];a.moveTo(S, _e16.y), a.fillRect(S, _e16.y, _e16.width, A), a.closePath(), a.fill(), 0 < s.meter.border && (a.beginPath(), a.setStrokeStyle(n.color), a.setLineWidth(s.meter.border * t.pixelRatio), a.moveTo(S + .5 * s.meter.border, _e16.y + A), a.lineTo(S + .5 * s.meter.border, _e16.y + .5 * s.meter.border), a.lineTo(S + _e16.width - .5 * s.meter.border, _e16.y + .5 * s.meter.border), a.lineTo(S + _e16.width - .5 * s.meter.border, _e16.y + A), a.stroke());}}} else for (var _e17, _o15 = 0; _o15 < u.length; _o15++) {if (_e17 = u[_o15], null !== _e17 && _o15 > h && _o15 < x) {a.beginPath(), a.setFillStyle(_e17.color || n.color);var S = _e17.x - _e17.width / 2,A = t.height - _e17.y - t.area[2];a.moveTo(S, _e17.y), a.fillRect(S, _e17.y, _e17.width, A), a.closePath(), a.fill();}}}}), !1 !== t.dataLabel && 1 === o && e.forEach(function (n, d) {var h, x, c;h = [].concat(t.chartData.yAxisData.ranges[n.index]), x = h.pop(), c = h.shift();var p = n.data;switch (s.type) {case "group":var g = getDataPoints(p, x, c, l, r, t, i, o);g = fixColumeData(g, r, e.length, d, i, t), drawPointText(g, n, i, a);break;case "stack":var g = getStackDataPoints(p, x, c, l, r, t, i, d, e, o);drawPointText(g, n, i, a);break;case "meter":var g = getDataPoints(p, x, c, l, r, t, i, o);drawPointText(g, n, i, a);}}), a.restore(), { xAxisPoints: l, calPoints: d, eachSpacing: r };}function drawCandleDataPoints(e, t, a, i, o) {var n = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 1,l = assign({}, { color: {}, average: {} }, a.extra.candle);l.color = assign({}, { upLine: "#f04864", upFill: "#f04864", downLine: "#2fc25b", downFill: "#2fc25b" }, l.color), l.average = assign({}, { show: !1, name: [], day: [], color: i.colors }, l.average), a.extra.candle = l;var r = a.chartData.xAxisData,s = r.xAxisPoints,d = r.eachSpacing,h = [];o.save();var x = -2,c = s.length + 2,p = 0,g = a.width + d;return a._scrollDistance_ && 0 !== a._scrollDistance_ && !0 === a.enableScroll && (o.translate(a._scrollDistance_, 0), x = Math.floor(-a._scrollDistance_ / d) - 2, c = x + a.xAxis.itemCount + 4, p = -a._scrollDistance_ - d + a.area[3], g = p + (a.xAxis.itemCount + 4) * d), l.average.show && t.forEach(function (e) {var t, l, r;t = [].concat(a.chartData.yAxisData.ranges[e.index]), l = t.pop(), r = t.shift();var h = e.data,x = getDataPoints(h, l, r, s, d, a, i, n),c = splitPoints(x);for (var _t10, _a9 = 0; _a9 < c.length; _a9++) {if (_t10 = c[_a9], o.beginPath(), o.setStrokeStyle(e.color), o.setLineWidth(1), 1 === _t10.length) o.moveTo(_t10[0].x, _t10[0].y), o.arc(_t10[0].x, _t10[0].y, 1, 0, 2 * Math.PI);else {o.moveTo(_t10[0].x, _t10[0].y);var _e18 = 0;for (var _i11, _a10 = 0; _a10 < _t10.length; _a10++) {if (_i11 = _t10[_a10], 0 == _e18 && _i11.x > p && (o.moveTo(_i11.x, _i11.y), _e18 = 1), 0 < _a10 && _i11.x > p && _i11.x < g) {var y = createCurveControlPoints(_t10, _a10 - 1);o.bezierCurveTo(y.ctrA.x, y.ctrA.y, y.ctrB.x, y.ctrB.y, _i11.x, _i11.y);}}o.moveTo(_t10[0].x, _t10[0].y);}o.closePath(), o.stroke();}}), e.forEach(function (e) {var t, r, p;t = [].concat(a.chartData.yAxisData.ranges[e.index]), r = t.pop(), p = t.shift();var g = e.data,y = getCandleDataPoints(g, r, p, s, d, a, i, n);h.push(y);var f = splitPoints(y);for (var _t11 = 0; _t11 < f[0].length; _t11++) {if (_t11 > x && _t11 < c) {var _e19 = f[0][_t11];o.beginPath(), 0 < g[_t11][1] - g[_t11][0] ? (o.setStrokeStyle(l.color.upLine), o.setFillStyle(l.color.upFill), o.setLineWidth(1 * a.pixelRatio), o.moveTo(_e19[3].x, _e19[3].y), o.lineTo(_e19[1].x, _e19[1].y), o.lineTo(_e19[1].x - d / 4, _e19[1].y), o.lineTo(_e19[0].x - d / 4, _e19[0].y), o.lineTo(_e19[0].x, _e19[0].y), o.lineTo(_e19[2].x, _e19[2].y), o.lineTo(_e19[0].x, _e19[0].y), o.lineTo(_e19[0].x + d / 4, _e19[0].y), o.lineTo(_e19[1].x + d / 4, _e19[1].y), o.lineTo(_e19[1].x, _e19[1].y), o.moveTo(_e19[3].x, _e19[3].y)) : (o.setStrokeStyle(l.color.downLine), o.setFillStyle(l.color.downFill), o.setLineWidth(1 * a.pixelRatio), o.moveTo(_e19[3].x, _e19[3].y), o.lineTo(_e19[0].x, _e19[0].y), o.lineTo(_e19[0].x - d / 4, _e19[0].y), o.lineTo(_e19[1].x - d / 4, _e19[1].y), o.lineTo(_e19[1].x, _e19[1].y), o.lineTo(_e19[2].x, _e19[2].y), o.lineTo(_e19[1].x, _e19[1].y), o.lineTo(_e19[1].x + d / 4, _e19[1].y), o.lineTo(_e19[0].x + d / 4, _e19[0].y), o.lineTo(_e19[0].x, _e19[0].y), o.moveTo(_e19[3].x, _e19[3].y)), o.closePath(), o.fill(), o.stroke();}}}), o.restore(), { xAxisPoints: s, calPoints: h, eachSpacing: d };}function drawAreaDataPoints(e, t, i, a) {var o = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : 1,n = assign({}, { type: "straight", opacity: .2, addLine: !1, width: 2, gradient: !1 }, t.extra.area);var l = t.chartData.xAxisData,r = l.xAxisPoints,s = l.eachSpacing,d = t.height - t.area[2],h = [];a.save();var x = 0,c = t.width + s;return t._scrollDistance_ && 0 !== t._scrollDistance_ && !0 === t.enableScroll && (a.translate(t._scrollDistance_, 0), x = -t._scrollDistance_ - s + t.area[3], c = x + (t.xAxis.itemCount + 4) * s), e.forEach(function (e) {var l, p, g;l = [].concat(t.chartData.yAxisData.ranges[e.index]), p = l.pop(), g = l.shift();var y = e.data,f = getDataPoints(y, p, g, r, s, t, i, o);h.push(f);var u = splitPoints(f);for (var _o16, _l7 = 0; _l7 < u.length; _l7++) {if (_o16 = u[_l7], a.beginPath(), a.setStrokeStyle(hexToRgb(e.color, n.opacity)), n.gradient) {var _i12 = a.createLinearGradient(0, t.area[0], 0, t.height - t.area[2]);_i12.addColorStop("0", hexToRgb(e.color, n.opacity)), _i12.addColorStop("1.0", hexToRgb("#FFFFFF", .1)), a.setFillStyle(_i12);} else a.setFillStyle(hexToRgb(e.color, n.opacity));if (a.setLineWidth(n.width * t.pixelRatio), 1 < _o16.length) {var _e20 = _o16[0],_t12 = _o16[_o16.length - 1];a.moveTo(_e20.x, _e20.y);var _i13 = 0;if ("curve" === n.type) {for (var _e21, _t13 = 0; _t13 < _o16.length; _t13++) {if (_e21 = _o16[_t13], 0 == _i13 && _e21.x > x && (a.moveTo(_e21.x, _e21.y), _i13 = 1), 0 < _t13 && _e21.x > x && _e21.x < c) {var _i14 = createCurveControlPoints(_o16, _t13 - 1);a.bezierCurveTo(_i14.ctrA.x, _i14.ctrA.y, _i14.ctrB.x, _i14.ctrB.y, _e21.x, _e21.y);}}} else for (var _e22, _t14 = 0; _t14 < _o16.length; _t14++) {_e22 = _o16[_t14], 0 == _i13 && _e22.x > x && (a.moveTo(_e22.x, _e22.y), _i13 = 1), 0 < _t14 && _e22.x > x && _e22.x < c && a.lineTo(_e22.x, _e22.y);}a.lineTo(_t12.x, d), a.lineTo(_e20.x, d), a.lineTo(_e20.x, _e20.y);} else {var _e23 = _o16[0];a.moveTo(_e23.x - s / 2, _e23.y), a.lineTo(_e23.x + s / 2, _e23.y), a.lineTo(_e23.x + s / 2, d), a.lineTo(_e23.x - s / 2, d), a.moveTo(_e23.x - s / 2, _e23.y);}if (a.closePath(), a.fill(), n.addLine) {if ("dash" == e.lineType) {var _i15 = e.dashLength ? e.dashLength : 8;_i15 *= t.pixelRatio, a.setLineDash([_i15, _i15]);}if (a.beginPath(), a.setStrokeStyle(e.color), a.setLineWidth(n.width * t.pixelRatio), 1 === _o16.length) a.moveTo(_o16[0].x, _o16[0].y), a.arc(_o16[0].x, _o16[0].y, 1, 0, 2 * Math.PI);else {a.moveTo(_o16[0].x, _o16[0].y);var _e24 = 0;if ("curve" === n.type) {for (var _t15, _i16 = 0; _i16 < _o16.length; _i16++) {if (_t15 = _o16[_i16], 0 == _e24 && _t15.x > x && (a.moveTo(_t15.x, _t15.y), _e24 = 1), 0 < _i16 && _t15.x > x && _t15.x < c) {var _e25 = createCurveControlPoints(_o16, _i16 - 1);a.bezierCurveTo(_e25.ctrA.x, _e25.ctrA.y, _e25.ctrB.x, _e25.ctrB.y, _t15.x, _t15.y);}}} else for (var _t16, _i17 = 0; _i17 < _o16.length; _i17++) {_t16 = _o16[_i17], 0 == _e24 && _t16.x > x && (a.moveTo(_t16.x, _t16.y), _e24 = 1), 0 < _i17 && _t16.x > x && _t16.x < c && a.lineTo(_t16.x, _t16.y);}a.moveTo(_o16[0].x, _o16[0].y);}a.stroke(), a.setLineDash([]);}}!1 !== t.dataPointShape && drawPointShape(f, e.color, e.pointShape, a, t);}), !1 !== t.dataLabel && 1 === o && e.forEach(function (e) {var n, l, d;n = [].concat(t.chartData.yAxisData.ranges[e.index]), l = n.pop(), d = n.shift();var h = e.data,x = getDataPoints(h, l, d, r, s, t, i, o);drawPointText(x, e, i, a);}), a.restore(), { xAxisPoints: r, calPoints: h, eachSpacing: s };}function drawLineDataPoints(e, t, i, a) {var o = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : 1,n = assign({}, { type: "straight", width: 2 }, t.extra.line);n.width *= t.pixelRatio;var l = t.chartData.xAxisData,r = l.xAxisPoints,s = l.eachSpacing;var d = [];a.save();var h = 0,x = t.width + s;return t._scrollDistance_ && 0 !== t._scrollDistance_ && !0 === t.enableScroll && (a.translate(t._scrollDistance_, 0), h = -t._scrollDistance_ - s + t.area[3], x = h + (t.xAxis.itemCount + 4) * s), e.forEach(function (e) {var l, c, p;l = [].concat(t.chartData.yAxisData.ranges[e.index]), c = l.pop(), p = l.shift();var g = e.data,y = getDataPoints(g, c, p, r, s, t, i, o);d.push(y);var f = splitPoints(y);if ("dash" == e.lineType) {var _i18 = e.dashLength ? e.dashLength : 8;_i18 *= t.pixelRatio, a.setLineDash([_i18, _i18]);}a.beginPath(), a.setStrokeStyle(e.color), a.setLineWidth(n.width), f.forEach(function (e) {if (1 === e.length) a.moveTo(e[0].x, e[0].y), a.arc(e[0].x, e[0].y, 1, 0, 2 * Math.PI);else {a.moveTo(e[0].x, e[0].y);var _i19 = 0;if ("curve" === n.type) {for (var _o17, _n15 = 0; _n15 < e.length; _n15++) {if (_o17 = e[_n15], 0 == _i19 && _o17.x > h && (a.moveTo(_o17.x, _o17.y), _i19 = 1), 0 < _n15 && _o17.x > h && _o17.x < x) {var t = createCurveControlPoints(e, _n15 - 1);a.bezierCurveTo(t.ctrA.x, t.ctrA.y, t.ctrB.x, t.ctrB.y, _o17.x, _o17.y);}}} else for (var _t17, _o18 = 0; _o18 < e.length; _o18++) {_t17 = e[_o18], 0 == _i19 && _t17.x > h && (a.moveTo(_t17.x, _t17.y), _i19 = 1), 0 < _o18 && _t17.x > h && _t17.x < x && a.lineTo(_t17.x, _t17.y);}a.moveTo(e[0].x, e[0].y);}}), a.stroke(), a.setLineDash([]), !1 !== t.dataPointShape && drawPointShape(y, e.color, e.pointShape, a, t);}), !1 !== t.dataLabel && 1 === o && e.forEach(function (e) {var n, l, d;n = [].concat(t.chartData.yAxisData.ranges[e.index]), l = n.pop(), d = n.shift();var h = e.data,x = getDataPoints(h, l, d, r, s, t, i, o);drawPointText(x, e, i, a);}), a.restore(), { xAxisPoints: r, calPoints: d, eachSpacing: s };}function drawMixDataPoints(e, t, i, a) {var o = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : 1,n = t.chartData.xAxisData,l = n.xAxisPoints,r = n.eachSpacing,s = t.height - t.area[2],d = [];var h = 0,x = 0;e.forEach(function (e) {"column" == e.type && (x += 1);}), a.save();var c = -2,p = l.length + 2,g = 0,y = t.width + r;if (t._scrollDistance_ && 0 !== t._scrollDistance_ && !0 === t.enableScroll && (a.translate(t._scrollDistance_, 0), c = Math.floor(-t._scrollDistance_ / r) - 2, p = c + t.xAxis.itemCount + 4, g = -t._scrollDistance_ - r + t.area[3], y = g + (t.xAxis.itemCount + 4) * r), e.forEach(function (e) {var n, f, u;n = [].concat(t.chartData.yAxisData.ranges[e.index]), f = n.pop(), u = n.shift();var m = e.data,S = getDataPoints(m, f, u, l, r, t, i, o);if (d.push(S), "column" == e.type) {S = fixColumeData(S, r, x, h, i, t);for (var _o19, _n16 = 0; _n16 < S.length; _n16++) {if (_o19 = S[_n16], null !== _o19 && _n16 > c && _n16 < p) {a.beginPath(), a.setStrokeStyle(_o19.color || e.color), a.setLineWidth(1), a.setFillStyle(_o19.color || e.color);var A = _o19.x - _o19.width / 2,T = t.height - _o19.y - t.area[2];a.moveTo(A, _o19.y), a.moveTo(A, _o19.y), a.lineTo(A + _o19.width - 2, _o19.y), a.lineTo(A + _o19.width - 2, t.height - t.area[2]), a.lineTo(A, t.height - t.area[2]), a.lineTo(A, _o19.y), a.closePath(), a.stroke(), a.fill(), a.closePath(), a.fill();}}h += 1;}if ("area" == e.type) {var _o20 = splitPoints(S);for (var _n17, _l8 = 0; _l8 < _o20.length; _l8++) {if (_n17 = _o20[_l8], a.beginPath(), a.setStrokeStyle(e.color), a.setFillStyle(hexToRgb(e.color, .2)), a.setLineWidth(2 * t.pixelRatio), 1 < _n17.length) {var b = _n17[0];var _t18 = _n17[_n17.length - 1];a.moveTo(b.x, b.y);var _i20 = 0;if ("curve" === e.style) {for (var _e26, _t19 = 0; _t19 < _n17.length; _t19++) {if (_e26 = _n17[_t19], 0 == _i20 && _e26.x > g && (a.moveTo(_e26.x, _e26.y), _i20 = 1), 0 < _t19 && _e26.x > g && _e26.x < y) {var P = createCurveControlPoints(_n17, _t19 - 1);a.bezierCurveTo(P.ctrA.x, P.ctrA.y, P.ctrB.x, P.ctrB.y, _e26.x, _e26.y);}}} else for (var _e27, _t20 = 0; _t20 < _n17.length; _t20++) {_e27 = _n17[_t20], 0 == _i20 && _e27.x > g && (a.moveTo(_e27.x, _e27.y), _i20 = 1), 0 < _t20 && _e27.x > g && _e27.x < y && a.lineTo(_e27.x, _e27.y);}a.lineTo(_t18.x, s), a.lineTo(b.x, s), a.lineTo(b.x, b.y);} else {var _e28 = _n17[0];a.moveTo(_e28.x - r / 2, _e28.y), a.lineTo(_e28.x + r / 2, _e28.y), a.lineTo(_e28.x + r / 2, s), a.lineTo(_e28.x - r / 2, s), a.moveTo(_e28.x - r / 2, _e28.y);}a.closePath(), a.fill();}}if ("line" == e.type) {var _ = splitPoints(S);_.forEach(function (i) {if ("dash" == e.lineType) {var _i21 = e.dashLength ? e.dashLength : 8;_i21 *= t.pixelRatio, a.setLineDash([_i21, _i21]);}if (a.beginPath(), a.setStrokeStyle(e.color), a.setLineWidth(2 * t.pixelRatio), 1 === i.length) a.moveTo(i[0].x, i[0].y), a.arc(i[0].x, i[0].y, 1, 0, 2 * Math.PI);else {a.moveTo(i[0].x, i[0].y);var _t21 = 0;if ("curve" == e.style) {for (var _e29, _n18 = 0; _n18 < i.length; _n18++) {if (_e29 = i[_n18], 0 == _t21 && _e29.x > g && (a.moveTo(_e29.x, _e29.y), _t21 = 1), 0 < _n18 && _e29.x > g && _e29.x < y) {var o = createCurveControlPoints(i, _n18 - 1);a.bezierCurveTo(o.ctrA.x, o.ctrA.y, o.ctrB.x, o.ctrB.y, _e29.x, _e29.y);}}} else for (var _e30, _o21 = 0; _o21 < i.length; _o21++) {_e30 = i[_o21], 0 == _t21 && _e30.x > g && (a.moveTo(_e30.x, _e30.y), _t21 = 1), 0 < _o21 && _e30.x > g && _e30.x < y && a.lineTo(_e30.x, _e30.y);}a.moveTo(i[0].x, i[0].y);}a.stroke(), a.setLineDash([]);});}"point" == e.type && (e.addPoint = !0), !0 == e.addPoint && "column" !== e.type && drawPointShape(S, e.color, e.pointShape, a, t);}), !1 !== t.dataLabel && 1 === o) {var h = 0;e.forEach(function (e) {var n, s, d;n = [].concat(t.chartData.yAxisData.ranges[e.index]), s = n.pop(), d = n.shift();var c = e.data,p = getDataPoints(c, s, d, l, r, t, i, o);"column" === e.type ? (p = fixColumeData(p, r, x, h, i, t), drawPointText(p, e, i, a), h += 1) : drawPointText(p, e, i, a);});}return a.restore(), { xAxisPoints: l, calPoints: d, eachSpacing: r };}function drawToolTipBridge(e, t, i, a, o, n) {var l = e.extra.tooltip || {};l.horizentalLine && e.tooltip && 1 === a && ("line" == e.type || "area" == e.type || "column" == e.type || "candle" == e.type || "mix" == e.type) && drawToolTipHorizentalLine(e, t, i, o, n), i.save(), e._scrollDistance_ && 0 !== e._scrollDistance_ && !0 === e.enableScroll && i.translate(e._scrollDistance_, 0), e.tooltip && e.tooltip.textList && e.tooltip.textList.length && 1 === a && drawToolTip(e.tooltip.textList, e.tooltip.offset, e, t, i, o, n), i.restore();}function drawXAxis(e, t, i, a) {var o = Math.ceil;var n = t.chartData.xAxisData,l = n.xAxisPoints,r = n.startX,s = n.endX,d = n.eachSpacing;var h = "center";("line" == t.type || "area" == t.type) && (h = t.xAxis.boundaryGap);var x = t.height - t.area[2],c = t.area[0];if (t.enableScroll && t.xAxis.scrollShow) {var p = t.height - t.area[2] + i.xAxisHeight,g = s - r,y = d * (l.length - 1),f = 0;t._scrollDistance_ && (f = -t._scrollDistance_ * g / y), a.beginPath(), a.setLineCap("round"), a.setLineWidth(6 * t.pixelRatio), a.setStrokeStyle(t.xAxis.scrollBackgroundColor || "#EFEBEF"), a.moveTo(r, p), a.lineTo(s, p), a.stroke(), a.closePath(), a.beginPath(), a.setLineCap("round"), a.setLineWidth(6 * t.pixelRatio), a.setStrokeStyle(t.xAxis.scrollColor || "#A6A6A6"), a.moveTo(r + f, p), a.lineTo(r + f + g * g / y, p), a.stroke(), a.closePath(), a.setLineCap("butt");}if (a.save(), t._scrollDistance_ && 0 !== t._scrollDistance_ && a.translate(t._scrollDistance_, 0), !0 === t.xAxis.calibration && (a.setStrokeStyle(t.xAxis.gridColor || "#cccccc"), a.setLineCap("butt"), a.setLineWidth(1 * t.pixelRatio), l.forEach(function (e, i) {0 < i && (a.beginPath(), a.moveTo(e - d / 2, x), a.lineTo(e - d / 2, x + 3 * t.pixelRatio), a.closePath(), a.stroke());})), !0 !== t.xAxis.disableGrid && (a.setStrokeStyle(t.xAxis.gridColor || "#cccccc"), a.setLineCap("butt"), a.setLineWidth(1 * t.pixelRatio), "dash" == t.xAxis.gridType && a.setLineDash([t.xAxis.dashLength, t.xAxis.dashLength]), t.xAxis.gridEval = t.xAxis.gridEval || 1, l.forEach(function (e, i) {0 == i % t.xAxis.gridEval && (a.beginPath(), a.moveTo(e, x), a.lineTo(e, c), a.stroke());}), a.setLineDash([])), !0 !== t.xAxis.disabled) {var _n19 = e.length;t.xAxis.labelCount && (_n19 = t.xAxis.itemCount ? o(e.length / t.xAxis.itemCount * t.xAxis.labelCount) : t.xAxis.labelCount, _n19 -= 1);var _r8 = o(e.length / _n19),_s3 = [],_c = e.length;for (var _t22 = 0; _t22 < _c; _t22++) {0 == _t22 % _r8 ? _s3.push(e[_t22]) : _s3.push("");}_s3[_c - 1] = e[_c - 1];var u = t.xAxis.fontSize || i.fontSize;0 === i._xAxisTextAngle_ ? _s3.forEach(function (e, o) {var n = -measureText(e + "", u) / 2;"center" == h && (n += d / 2);var r = 0;t.xAxis.scrollShow && (r = 6 * t.pixelRatio), a.beginPath(), a.setFontSize(u), a.setFillStyle(t.xAxis.fontColor || "#666666"), a.fillText(e + "", l[o] + n, x + u + (i.xAxisHeight - r - u) / 2), a.closePath(), a.stroke();}) : _s3.forEach(function (e, o) {a.save(), a.beginPath(), a.setFontSize(u), a.setFillStyle(t.xAxis.fontColor || "#666666");var n = measureText(e + "", u),r = -n;"center" == h && (r += d / 2);var s = calRotateTranslate(l[o] + d / 2, x + u / 2 + 5, t.height),c = s.transX,p = s.transY;a.rotate(-1 * i._xAxisTextAngle_), a.translate(c, p), a.fillText(e + "", l[o] + r, x + u + 5), a.closePath(), a.stroke(), a.restore();});}a.restore(), t.xAxis.axisLine && (a.beginPath(), a.setStrokeStyle(t.xAxis.axisLineColor), a.setLineWidth(1 * t.pixelRatio), a.moveTo(r, t.height - t.area[2]), a.lineTo(s, t.height - t.area[2]), a.stroke());}function drawYAxisGrid(e, t, i, a) {if (!0 === t.yAxis.disableGrid) return;var o = t.height - t.area[0] - t.area[2],n = o / t.yAxis.splitNumber,l = t.area[3],r = t.chartData.xAxisData.xAxisPoints,s = t.chartData.xAxisData.eachSpacing,d = s * (r.length - 1),h = [];for (var _o22 = 0; _o22 < t.yAxis.splitNumber + 1; _o22++) {h.push(t.height - t.area[2] - n * _o22);}a.save(), t._scrollDistance_ && 0 !== t._scrollDistance_ && a.translate(t._scrollDistance_, 0), "dash" == t.yAxis.gridType && a.setLineDash([t.yAxis.dashLength, t.yAxis.dashLength]), a.setStrokeStyle(t.yAxis.gridColor), a.setLineWidth(1 * t.pixelRatio), h.forEach(function (e) {a.beginPath(), a.moveTo(l, e), a.lineTo(l + d, e), a.stroke();}), a.setLineDash([]), a.restore();}function drawYAxis(e, t, a, o) {if (!0 === t.yAxis.disabled) return;var i = t.height - t.area[0] - t.area[2],n = i / t.yAxis.splitNumber,l = t.area[3],r = t.width - t.area[1],s = t.height - t.area[2],d = s + a.xAxisHeight;t.xAxis.scrollShow && (d -= 3 * t.pixelRatio), t.xAxis.rotateLabel && (d = t.height - t.area[2] + 3), o.beginPath(), o.setFillStyle(t.background || "#ffffff"), 0 > t._scrollDistance_ && o.fillRect(0, 0, l, d), !0 == t.enableScroll && o.fillRect(r, 0, t.width, d), o.closePath(), o.stroke();var h = [];for (var _l9 = 0; _l9 <= t.yAxis.splitNumber; _l9++) {h.push(t.area[0] + n * _l9);}var x = t.area[3],c = t.width - t.area[1];var _loop3 = function _loop3(_n21, _l10) {if (_n21 = t.yAxis.data[_l10], !0 !== _n21.disabled) {var _e31 = t.chartData.yAxisData.rangesFormat[_l10],_i22 = _n21.fontSize || a.fontSize,_r9 = t.chartData.yAxisData.yAxisWidth[_l10];if (_e31.forEach(function (e, a) {var l = h[a] ? h[a] : s;o.beginPath(), o.setFontSize(_i22), o.setLineWidth(1 * t.pixelRatio), o.setStrokeStyle(_n21.axisLineColor || "#cccccc"), o.setFillStyle(_n21.fontColor || "#666666"), "left" == _r9.position ? (o.fillText(e + "", x - _r9.width, l + _i22 / 2), !0 == _n21.calibration && (o.moveTo(x, l), o.lineTo(x - 3 * t.pixelRatio, l))) : (o.fillText(e + "", c + 4 * t.pixelRatio, l + _i22 / 2), !0 == _n21.calibration && (o.moveTo(c, l), o.lineTo(c + 3 * t.pixelRatio, l))), o.closePath(), o.stroke();}), !1 !== _n21.axisLine && (o.beginPath(), o.setStrokeStyle(_n21.axisLineColor || "#cccccc"), o.setLineWidth(1 * t.pixelRatio), "left" == _r9.position ? (o.moveTo(x, t.height - t.area[2]), o.lineTo(x, t.area[0])) : (o.moveTo(c, t.height - t.area[2]), o.lineTo(c, t.area[0])), o.stroke()), t.yAxis.showTitle) {var _e32 = _n21.titleFontSize || a.fontSize,_i23 = _n21.title;o.beginPath(), o.setFontSize(_e32), o.setFillStyle(_n21.titleFontColor || "#666666"), "left" == _r9.position ? o.fillText(_i23, x - measureText(_i23, _e32) / 2, t.area[0] - 10 * t.pixelRatio) : o.fillText(_i23, c - measureText(_i23, _e32) / 2, t.area[0] - 10 * t.pixelRatio), o.closePath(), o.stroke();}"left" == _r9.position ? x -= _r9.width + t.yAxis.padding : c += _r9.width + t.yAxis.padding;}_n20 = _n21;};for (var _n20, _l10 = 0; _l10 < t.yAxis.data.length; _l10++) {_loop3(_n20, _l10);}}function drawLegend(e, t, i, a, o) {if (!1 === t.legend.show) return;var n = o.legendData,l = n.points,r = n.area,s = t.legend.padding,d = t.legend.fontSize,h = 15 * t.pixelRatio,x = 5 * t.pixelRatio,c = t.legend.itemGap,p = Math.max(t.legend.lineHeight * t.pixelRatio, d);a.beginPath(), a.setLineWidth(t.legend.borderWidth), a.setStrokeStyle(t.legend.borderColor), a.setFillStyle(t.legend.backgroundColor), a.moveTo(r.start.x, r.start.y), a.rect(r.start.x, r.start.y, r.width, r.height), a.closePath(), a.fill(), a.stroke(), l.forEach(function (e, o) {var l = 0,g = 0;l = n.widthArr[o], g = n.heightArr[o];var y = 0,f = 0;"top" == t.legend.position || "bottom" == t.legend.position ? (y = r.start.x + (r.width - l) / 2, f = r.start.y + s + o * p) : (l = 0 == o ? 0 : n.widthArr[o - 1], y = r.start.x + s + l, f = r.start.y + s + (r.height - g) / 2), a.setFontSize(i.fontSize);for (var _n22, _l11 = 0; _l11 < e.length; _l11++) {switch (_n22 = e[_l11], _n22.area = [0, 0, 0, 0], _n22.area[0] = y, _n22.area[1] = f, _n22.area[3] = f + p, a.beginPath(), a.setLineWidth(1 * t.pixelRatio), a.setStrokeStyle(_n22.show ? _n22.color : t.legend.hiddenColor), a.setFillStyle(_n22.show ? _n22.color : t.legend.hiddenColor), _n22.legendShape) {case "line":a.moveTo(y, f + .5 * p - 2 * t.pixelRatio), a.fillRect(y, f + .5 * p - 2 * t.pixelRatio, 15 * t.pixelRatio, 4 * t.pixelRatio);break;case "triangle":a.moveTo(y + 7.5 * t.pixelRatio, f + .5 * p - 5 * t.pixelRatio), a.lineTo(y + 2.5 * t.pixelRatio, f + .5 * p + 5 * t.pixelRatio), a.lineTo(y + 12.5 * t.pixelRatio, f + .5 * p + 5 * t.pixelRatio), a.lineTo(y + 7.5 * t.pixelRatio, f + .5 * p - 5 * t.pixelRatio);break;case "diamond":a.moveTo(y + 7.5 * t.pixelRatio, f + .5 * p - 5 * t.pixelRatio), a.lineTo(y + 2.5 * t.pixelRatio, f + .5 * p), a.lineTo(y + 7.5 * t.pixelRatio, f + .5 * p + 5 * t.pixelRatio), a.lineTo(y + 12.5 * t.pixelRatio, f + .5 * p), a.lineTo(y + 7.5 * t.pixelRatio, f + .5 * p - 5 * t.pixelRatio);break;case "circle":a.moveTo(y + 7.5 * t.pixelRatio, f + .5 * p), a.arc(y + 7.5 * t.pixelRatio, f + .5 * p, 5 * t.pixelRatio, 0, 2 * Math.PI);break;case "rect":a.moveTo(y, f + .5 * p - 5 * t.pixelRatio), a.fillRect(y, f + .5 * p - 5 * t.pixelRatio, 15 * t.pixelRatio, 10 * t.pixelRatio);break;default:a.moveTo(y, f + .5 * p - 5 * t.pixelRatio), a.fillRect(y, f + .5 * p - 5 * t.pixelRatio, 15 * t.pixelRatio, 10 * t.pixelRatio);}a.closePath(), a.fill(), a.stroke(), y += h + x;a.beginPath(), a.setFontSize(d), a.setFillStyle(_n22.show ? t.legend.fontColor : t.legend.hiddenColor), a.fillText(_n22.name, y, f + (.5 * p + .5 * d - 2)), a.closePath(), a.stroke(), "top" == t.legend.position || "bottom" == t.legend.position ? (y += measureText(_n22.name, d) + c, _n22.area[2] = y) : (_n22.area[2] = y + measureText(_n22.name, d) + c, y -= h + x, f += p);}});}function drawPieDataPoints(e, t, a, o) {var n = Math.PI,l = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : 1,r = assign({}, { activeOpacity: .5, activeRadius: 10 * t.pixelRatio, offsetAngle: 0, labelWidth: 15 * t.pixelRatio, ringWidth: 0, border: !1, borderWidth: 2, borderColor: "#FFFFFF" }, t.extra.pie),s = { x: t.area[3] + (t.width - t.area[1] - t.area[3]) / 2, y: t.area[0] + (t.height - t.area[0] - t.area[2]) / 2 };0 == a.pieChartLinePadding && (a.pieChartLinePadding = r.activeRadius);var d = Math.min((t.width - t.area[1] - t.area[3]) / 2 - a.pieChartLinePadding - a.pieChartTextPadding - a._pieTextMaxLength_, (t.height - t.area[0] - t.area[2]) / 2 - a.pieChartLinePadding - a.pieChartTextPadding);e = getPieDataPoints(e, d, l);var h = r.activeRadius;if (e = e.map(function (e) {return e._start_ += r.offsetAngle * n / 180, e;}), e.forEach(function (e, i) {t.tooltip && t.tooltip.index == i && (o.beginPath(), o.setFillStyle(hexToRgb(e.color, t.extra.pie.activeOpacity || .5)), o.moveTo(s.x, s.y), o.arc(s.x, s.y, e._radius_ + h, e._start_, e._start_ + 2 * e._proportion_ * n), o.closePath(), o.fill()), o.beginPath(), o.setLineWidth(r.borderWidth * t.pixelRatio), o.lineJoin = "round", o.setStrokeStyle(r.borderColor), o.setFillStyle(e.color), o.moveTo(s.x, s.y), o.arc(s.x, s.y, e._radius_, e._start_, e._start_ + 2 * e._proportion_ * n), o.closePath(), o.fill(), !0 == r.border && o.stroke();}), "ring" === t.type) {var x = .6 * d;"number" == typeof t.extra.pie.ringWidth && 0 < t.extra.pie.ringWidth && (x = Math.max(0, d - t.extra.pie.ringWidth)), o.beginPath(), o.setFillStyle(t.background || "#ffffff"), o.moveTo(s.x, s.y), o.arc(s.x, s.y, x, 0, 2 * n), o.closePath(), o.fill();}if (!1 !== t.dataLabel && 1 === l) {for (var c = !1, p = 0, g = e.length; p < g; p++) {if (0 < e[p].data) {c = !0;break;}}c && drawPieText(e, t, a, o, d, s);}return 1 === l && "ring" === t.type && drawRingTitle(t, a, o, s), { center: s, radius: d, series: e };}function drawRoseDataPoints(e, t, a, o) {var n = Math.PI,l = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : 1,r = assign({}, { type: "area", activeOpacity: .5, activeRadius: 10 * t.pixelRatio, offsetAngle: 0, labelWidth: 15 * t.pixelRatio, border: !1, borderWidth: 2, borderColor: "#FFFFFF" }, t.extra.rose);0 == a.pieChartLinePadding && (a.pieChartLinePadding = r.activeRadius);var s = { x: t.area[3] + (t.width - t.area[1] - t.area[3]) / 2, y: t.area[0] + (t.height - t.area[0] - t.area[2]) / 2 },d = Math.min((t.width - t.area[1] - t.area[3]) / 2 - a.pieChartLinePadding - a.pieChartTextPadding - a._pieTextMaxLength_, (t.height - t.area[0] - t.area[2]) / 2 - a.pieChartLinePadding - a.pieChartTextPadding),h = r.minRadius || .5 * d;e = getRoseDataPoints(e, r.type, h, d, l);var x = r.activeRadius;if (e = e.map(function (e) {return e._start_ += (r.offsetAngle || 0) * n / 180, e;}), e.forEach(function (e, i) {t.tooltip && t.tooltip.index == i && (o.beginPath(), o.setFillStyle(hexToRgb(e.color, r.activeOpacity || .5)), o.moveTo(s.x, s.y), o.arc(s.x, s.y, x + e._radius_, e._start_, e._start_ + 2 * e._rose_proportion_ * n), o.closePath(), o.fill()), o.beginPath(), o.setLineWidth(r.borderWidth * t.pixelRatio), o.lineJoin = "round", o.setStrokeStyle(r.borderColor), o.setFillStyle(e.color), o.moveTo(s.x, s.y), o.arc(s.x, s.y, e._radius_, e._start_, e._start_ + 2 * e._rose_proportion_ * n), o.closePath(), o.fill(), !0 == r.border && o.stroke();}), !1 !== t.dataLabel && 1 === l) {for (var c = !1, p = 0, g = e.length; p < g; p++) {if (0 < e[p].data) {c = !0;break;}}c && drawPieText(e, t, a, o, d, s);}return { center: s, radius: d, series: e };}function drawArcbarDataPoints(e, t, i, a) {var o = Math.PI,n = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : 1,l = assign({}, { startAngle: .75, endAngle: .25, type: "default", width: 12 * t.pixelRatio, gap: 2 * t.pixelRatio }, t.extra.arcbar);e = getArcbarDataPoints(e, l, n);var r = l.center ? l.center : { x: t.width / 2, y: t.height / 2 };var s;l.radius ? s = l.radius : (s = Math.min(r.x, r.y), s -= 5 * t.pixelRatio, s -= l.width / 2);for (var _n23, d = 0; d < e.length; d++) {_n23 = e[d], a.setLineWidth(l.width), a.setStrokeStyle(l.backgroundColor || "#E9E9E9"), a.setLineCap("round"), a.beginPath(), "default" == l.type ? a.arc(r.x, r.y, s - (l.width + l.gap) * d, l.startAngle * o, l.endAngle * o, !1) : a.arc(r.x, r.y, s - (l.width + l.gap) * d, 0, 2 * o, !1), a.stroke(), a.setLineWidth(l.width), a.setStrokeStyle(_n23.color), a.setLineCap("round"), a.beginPath(), a.arc(r.x, r.y, s - (l.width + l.gap) * d, l.startAngle * o, _n23._proportion_ * o, !1), a.stroke();}return drawRingTitle(t, i, a, r), { center: r, radius: s, series: e };}function drawGaugeDataPoints(e, t, a, i, o) {var n = Math.PI,l = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 1,r = assign({}, { type: "default", startAngle: .75, endAngle: .25, width: 15, splitLine: { fixRadius: 0, splitNumber: 10, width: 15, color: "#FFFFFF", childNumber: 5, childWidth: 5 }, pointer: { width: 15, color: "auto" } }, a.extra.gauge);null == r.oldAngle && (r.oldAngle = r.startAngle), null == r.oldData && (r.oldData = 0), e = getGaugeAxisPoints(e, r.startAngle, r.endAngle);var s = { x: a.width / 2, y: a.height / 2 },d = Math.min(s.x, s.y);d -= 5 * a.pixelRatio, d -= r.width / 2;var h = d - r.width,x = 0;if ("progress" == r.type) {var c = d - 3 * r.width;o.beginPath();var _e33 = o.createLinearGradient(s.x, s.y - c, s.x, s.y + c);_e33.addColorStop("0", hexToRgb(t[0].color, .3)), _e33.addColorStop("1.0", hexToRgb("#FFFFFF", .1)), o.setFillStyle(_e33), o.arc(s.x, s.y, c, 0, 2 * n, !1), o.fill(), o.setLineWidth(r.width), o.setStrokeStyle(hexToRgb(t[0].color, .3)), o.setLineCap("round"), o.beginPath(), o.arc(s.x, s.y, h, r.startAngle * n, r.endAngle * n, !1), o.stroke(), x = r.startAngle - r.endAngle + 1;var _i24 = x / r.splitLine.splitNumber,p = x / r.splitLine.splitNumber / r.splitLine.childNumber,g = -d - .5 * r.width - r.splitLine.fixRadius,y = -d - r.width - r.splitLine.fixRadius + r.splitLine.width;o.save(), o.translate(s.x, s.y), o.rotate((r.startAngle - 1) * n);var f = r.splitLine.splitNumber * r.splitLine.childNumber + 1,u = t[0].data * l;for (var _e34 = 0; _e34 < f; _e34++) {o.beginPath(), u > _e34 / f ? o.setStrokeStyle(hexToRgb(t[0].color, 1)) : o.setStrokeStyle(hexToRgb(t[0].color, .3)), o.setLineWidth(3 * a.pixelRatio), o.moveTo(g, 0), o.lineTo(y, 0), o.stroke(), o.rotate(p * n);}o.restore(), t = getArcbarDataPoints(t, r, l), o.setLineWidth(r.width), o.setStrokeStyle(t[0].color), o.setLineCap("round"), o.beginPath(), o.arc(s.x, s.y, h, r.startAngle * n, t[0]._proportion_ * n, !1), o.stroke();var m = d - 2.5 * r.width;o.save(), o.translate(s.x, s.y), o.rotate((t[0]._proportion_ - 1) * n), o.beginPath(), o.setLineWidth(r.width / 3);var S = o.createLinearGradient(0, .6 * -m, 0, .6 * m);S.addColorStop("0", hexToRgb("#FFFFFF", 0)), S.addColorStop("0.5", hexToRgb(t[0].color, 1)), S.addColorStop("1.0", hexToRgb("#FFFFFF", 0)), o.setStrokeStyle(S), o.arc(0, 0, m, .85 * n, 1.15 * n, !1), o.stroke(), o.beginPath(), o.setLineWidth(1), o.setStrokeStyle(t[0].color), o.setFillStyle(t[0].color), o.moveTo(-m - r.width / 3 / 2, -4), o.lineTo(-m - r.width / 3 / 2 - 4, 0), o.lineTo(-m - r.width / 3 / 2, 4), o.lineTo(-m - r.width / 3 / 2, -4), o.stroke(), o.fill(), o.restore();} else {o.setLineWidth(r.width), o.setLineCap("butt");for (var _t23, _a11 = 0; _a11 < e.length; _a11++) {_t23 = e[_a11], o.beginPath(), o.setStrokeStyle(_t23.color), o.arc(s.x, s.y, d, _t23._startAngle_ * n, _t23._endAngle_ * n, !1), o.stroke();}o.save(), x = r.startAngle - r.endAngle + 1;var _c2 = x / r.splitLine.splitNumber,_p2 = x / r.splitLine.splitNumber / r.splitLine.childNumber,_g2 = -d - .5 * r.width - r.splitLine.fixRadius,_y = -d - .5 * r.width - r.splitLine.fixRadius + r.splitLine.width,_f = -d - .5 * r.width - r.splitLine.fixRadius + r.splitLine.childWidth;o.translate(s.x, s.y), o.rotate((r.startAngle - 1) * n);for (var _e35 = 0; _e35 < r.splitLine.splitNumber + 1; _e35++) {o.beginPath(), o.setStrokeStyle(r.splitLine.color), o.setLineWidth(2 * a.pixelRatio), o.moveTo(_g2, 0), o.lineTo(_y, 0), o.stroke(), o.rotate(_c2 * n);}o.restore(), o.save(), o.translate(s.x, s.y), o.rotate((r.startAngle - 1) * n);for (var _e36 = 0; _e36 < r.splitLine.splitNumber * r.splitLine.childNumber + 1; _e36++) {o.beginPath(), o.setStrokeStyle(r.splitLine.color), o.setLineWidth(1 * a.pixelRatio), o.moveTo(_g2, 0), o.lineTo(_f, 0), o.stroke(), o.rotate(_p2 * n);}o.restore(), t = getGaugeDataPoints(t, e, r, l);for (var _e37, _a12 = 0; _a12 < t.length; _a12++) {_e37 = t[_a12], o.save(), o.translate(s.x, s.y), o.rotate((_e37._proportion_ - 1) * n), o.beginPath(), o.setFillStyle(_e37.color), o.moveTo(r.pointer.width, 0), o.lineTo(0, -r.pointer.width / 2), o.lineTo(-h, 0), o.lineTo(0, r.pointer.width / 2), o.lineTo(r.pointer.width, 0), o.closePath(), o.fill(), o.beginPath(), o.setFillStyle("#FFFFFF"), o.arc(0, 0, r.pointer.width / 6, 0, 2 * n, !1), o.fill(), o.restore();}!1 !== a.dataLabel && drawGaugeLabel(r, d, s, a, i, o);}return drawRingTitle(a, i, o, s), 1 === l && "gauge" === a.type && (a.extra.gauge.oldAngle = t[0]._proportion_, a.extra.gauge.oldData = t[0].data), { center: s, radius: d, innerRadius: h, categories: e, totalAngle: x };}function drawRadarDataPoints(e, t, a, o) {var n = Math.cos,l = Math.sin,r = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : 1,s = assign({}, { gridColor: "#cccccc", labelColor: "#666666", opacity: .2, gridCount: 3 }, t.extra.radar),d = getRadarCoordinateSeries(t.categories.length),h = { x: t.area[3] + (t.width - t.area[1] - t.area[3]) / 2, y: t.area[0] + (t.height - t.area[0] - t.area[2]) / 2 },x = Math.min(h.x - (getMaxTextListLength(t.categories) + a.radarLabelTextMargin), h.y - a.radarLabelTextMargin);x -= t.padding[1], o.beginPath(), o.setLineWidth(1 * t.pixelRatio), o.setStrokeStyle(s.gridColor), d.forEach(function (e) {var t = convertCoordinateOrigin(x * n(e), x * l(e), h);o.moveTo(h.x, h.y), o.lineTo(t.x, t.y);}), o.stroke(), o.closePath();for (var c = function c(e) {var i = {};o.beginPath(), o.setLineWidth(1 * t.pixelRatio), o.setStrokeStyle(s.gridColor), d.forEach(function (t, a) {var r = convertCoordinateOrigin(x / s.gridCount * e * n(t), x / s.gridCount * e * l(t), h);0 === a ? (i = r, o.moveTo(r.x, r.y)) : o.lineTo(r.x, r.y);}), o.lineTo(i.x, i.y), o.stroke(), o.closePath();}, p = 1; p <= s.gridCount; p++) {c(p);}var g = getRadarDataPoints(d, h, x, e, t, r);return g.forEach(function (e) {if (o.beginPath(), o.setFillStyle(hexToRgb(e.color, s.opacity)), e.data.forEach(function (e, t) {0 === t ? o.moveTo(e.position.x, e.position.y) : o.lineTo(e.position.x, e.position.y);}), o.closePath(), o.fill(), !1 !== t.dataPointShape) {var i = e.data.map(function (e) {return e.position;});drawPointShape(i, e.color, e.pointShape, o, t);}}), drawRadarLabel(d, x, h, t, a, o), { center: h, radius: x, angleList: d };}function normalInt(e, t, a) {a = 0 == a ? 1 : a;for (var o = [], n = 0; n < a; n++) {o[n] = Math.random();}return Math.floor(o.reduce(function (e, t) {return e + t;}) / a * (t - e)) + e;}function collisionNew(e, t, a, o) {var n = !1;for (var l = 0; l < t.length; l++) {if (t[l].area) if (!(e[3] < t[l].area[1] || e[0] > t[l].area[2] || e[1] > t[l].area[3] || e[2] < t[l].area[0])) {n = !0;break;} else if (0 > e[0] || 0 > e[1] || e[2] > a || e[3] > o) {n = !0;break;} else n = !1;}return n;}function getBoundingBox(e) {var t,a = {};a.xMin = 180, a.xMax = 0, a.yMin = 90, a.yMax = 0;for (var o, n = 0; n < e.length; n++) {o = e[n].geometry.coordinates;for (var l = 0; l < o.length; l++) {t = o[l], 1 == t.length && (t = t[0]);for (var r = 0; r < t.length; r++) {var s = t[r][0],d = t[r][1],h = { x: s, y: d };a.xMin = a.xMin < h.x ? a.xMin : h.x, a.xMax = a.xMax > h.x ? a.xMax : h.x, a.yMin = a.yMin < h.y ? a.yMin : h.y, a.yMax = a.yMax > h.y ? a.yMax : h.y;}}}return a;}function coordinateToPoint(e, t, i, a, o, n) {return { x: (t - i.xMin) * a + o, y: (i.yMax - e) * a + n };}function pointToCoordinate(e, t, i, a, o, n) {return { x: (t - o) / a + i.xMin, y: i.yMax - (e - n) / a };}function isRayIntersectsSegment(e, t, i) {if (t[1] == i[1]) return !1;if (t[1] > e[1] && i[1] > e[1]) return !1;if (t[1] < e[1] && i[1] < e[1]) return !1;if (t[1] == e[1] && i[1] > e[1]) return !1;if (i[1] == e[1] && t[1] > e[1]) return !1;if (t[0] < e[0] && i[1] < e[1]) return !1;var a = i[0] - (i[0] - t[0]) * (i[1] - e[1]) / (i[1] - t[1]);return !(a < e[0]);}function isPoiWithinPoly(e, t) {var i = 0;for (var a, o = 0; o < t.length; o++) {a = t[o][0], 1 == t.length && (a = t[o][0]);for (var _t24 = 0; _t24 < a.length - 1; _t24++) {var _o23 = a[_t24],n = a[_t24 + 1];isRayIntersectsSegment(e, _o23, n) && (i += 1);}}return !(1 != i % 2);}function drawMapDataPoints(e, t, a, o) {var n,l,r = Math.abs,s = assign({}, { border: !0, borderWidth: 1, borderColor: "#666666", fillOpacity: .6, activeBorderColor: "#f04864", activeFillColor: "#facc14", activeFillOpacity: 1 }, t.extra.map),d = e,h = getBoundingBox(d),x = t.width / r(h.xMax - h.xMin),c = t.height / r(h.yMax - h.yMin),p = x < c ? x : c,g = t.width / 2 - r(h.xMax - h.xMin) / 2 * p,y = t.height / 2 - r(h.yMax - h.yMin) / 2 * p;o.beginPath(), o.clearRect(0, 0, t.width, t.height), o.setFillStyle(t.background || "#FFFFFF"), o.rect(0, 0, t.width, t.height), o.fill();for (var f = 0; f < d.length; f++) {o.beginPath(), o.setLineWidth(s.borderWidth * t.pixelRatio), o.setStrokeStyle(s.borderColor), o.setFillStyle(hexToRgb(e[f].color, s.fillOpacity)), t.tooltip && t.tooltip.index == f && (o.setStrokeStyle(s.activeBorderColor), o.setFillStyle(hexToRgb(s.activeFillColor, s.activeFillOpacity)));for (var u = d[f].geometry.coordinates, m = 0; m < u.length; m++) {n = u[m], 1 == n.length && (n = n[0]);for (var S = 0; S < n.length; S++) {l = coordinateToPoint(n[S][1], n[S][0], h, p, g, y), 0 == S ? (o.beginPath(), o.moveTo(l.x, l.y)) : o.lineTo(l.x, l.y);}o.fill(), !0 == s.border && o.stroke();}if (!0 == t.dataLabel) {var A = d[f].properties.centroid;if (A) {l = coordinateToPoint(A[1], A[0], h, p, g, y);var _e38 = d[f].textSize || a.fontSize,_t25 = d[f].properties.name;o.beginPath(), o.setFontSize(_e38), o.setFillStyle(d[f].textColor || "#666666"), o.fillText(_t25, l.x - measureText(_t25, _e38) / 2, l.y + _e38 / 2), o.closePath(), o.stroke();}}}t.chartData.mapData = { bounds: h, scale: p, xoffset: g, yoffset: y }, drawToolTipBridge(t, a, o, 1), o.draw();}function getWordCloudPoint(e, t) {var a = e.series.sort(function (e, t) {return parseInt(t.textSize) - parseInt(e.textSize);});switch (t) {case "normal":for (var _t26 = 0; _t26 < a.length; _t26++) {var i = void 0,_o24 = void 0,n = void 0,l = a[_t26].name,r = a[_t26].textSize,s = measureText(l, r),d = 0;for (;;) {d++, i = normalInt(-e.width / 2, e.width / 2, 5) - s / 2, _o24 = normalInt(-e.height / 2, e.height / 2, 5) + r / 2, n = [i - 5 + e.width / 2, _o24 - 5 - r + e.height / 2, i + s + 5 + e.width / 2, _o24 + 5 + e.height / 2];var _t27 = collisionNew(n, a, e.width, e.height);if (!_t27) break;if (1e3 == d) {n = [-100, -100, -100, -100];break;}}a[_t26].area = n;}break;case "vertical":var o = function o() {return !!(.7 < Math.random());};;for (var _t28 = 0; _t28 < a.length; _t28++) {var _i25 = void 0,_n24 = void 0,_l12 = void 0,_r10 = void 0,_s4 = a[_t28].name,_d3 = a[_t28].textSize,h = measureText(_s4, _d3),x = o(),c = 0;for (;;) {c++;var _t29 = void 0;if (x ? (_i25 = normalInt(-e.width / 2, e.width / 2, 5) - h / 2, _n24 = normalInt(-e.height / 2, e.height / 2, 5) + _d3 / 2, _l12 = [_n24 - 5 - h + e.width / 2, -_i25 - 5 + e.height / 2, _n24 + 5 + e.width / 2, -_i25 + _d3 + 5 + e.height / 2], _r10 = [e.width - (e.width / 2 - e.height / 2) - (-_i25 + _d3 + 5 + e.height / 2) - 5, e.height / 2 - e.width / 2 + (_n24 - 5 - h + e.width / 2) - 5, e.width - (e.width / 2 - e.height / 2) - (-_i25 + _d3 + 5 + e.height / 2) + _d3, e.height / 2 - e.width / 2 + (_n24 - 5 - h + e.width / 2) + h + 5], _t29 = collisionNew(_r10, a, e.height, e.width)) : (_i25 = normalInt(-e.width / 2, e.width / 2, 5) - h / 2, _n24 = normalInt(-e.height / 2, e.height / 2, 5) + _d3 / 2, _l12 = [_i25 - 5 + e.width / 2, _n24 - 5 - _d3 + e.height / 2, _i25 + h + 5 + e.width / 2, _n24 + 5 + e.height / 2], _t29 = collisionNew(_l12, a, e.width, e.height)), !_t29) break;if (1e3 == c) {_l12 = [-1e3, -1e3, -1e3, -1e3];break;}}x ? (a[_t28].area = _r10, a[_t28].areav = _l12) : a[_t28].area = _l12, a[_t28].rotate = x;};}return a;}function drawWordCloudDataPoints(e, t, i, a) {var o = 4 < arguments.length && arguments[4] !== void 0 ? arguments[4] : 1,n = assign({}, { type: "normal", autoColors: !0 }, t.extra.word);a.beginPath(), a.setFillStyle(t.background || "#FFFFFF"), a.rect(0, 0, t.width, t.height), a.fill(), a.save();var l = t.chartData.wordCloudData;a.translate(t.width / 2, t.height / 2);for (var _n25 = 0; _n25 < l.length; _n25++) {a.save(), l[_n25].rotate && a.rotate(90 * Math.PI / 180);var _e39 = l[_n25].name,_i26 = l[_n25].textSize,r = measureText(_e39, _i26);a.beginPath(), a.setStrokeStyle(l[_n25].color), a.setFillStyle(l[_n25].color), a.setFontSize(_i26), l[_n25].rotate ? 0 < l[_n25].areav[0] && (t.tooltip ? t.tooltip.index == _n25 ? a.strokeText(_e39, (l[_n25].areav[0] + 5 - t.width / 2) * o - r * (1 - o) / 2, (l[_n25].areav[1] + 5 + _i26 - t.height / 2) * o) : a.fillText(_e39, (l[_n25].areav[0] + 5 - t.width / 2) * o - r * (1 - o) / 2, (l[_n25].areav[1] + 5 + _i26 - t.height / 2) * o) : a.fillText(_e39, (l[_n25].areav[0] + 5 - t.width / 2) * o - r * (1 - o) / 2, (l[_n25].areav[1] + 5 + _i26 - t.height / 2) * o)) : 0 < l[_n25].area[0] && (t.tooltip ? t.tooltip.index == _n25 ? a.strokeText(_e39, (l[_n25].area[0] + 5 - t.width / 2) * o - r * (1 - o) / 2, (l[_n25].area[1] + 5 + _i26 - t.height / 2) * o) : a.fillText(_e39, (l[_n25].area[0] + 5 - t.width / 2) * o - r * (1 - o) / 2, (l[_n25].area[1] + 5 + _i26 - t.height / 2) * o) : a.fillText(_e39, (l[_n25].area[0] + 5 - t.width / 2) * o - r * (1 - o) / 2, (l[_n25].area[1] + 5 + _i26 - t.height / 2) * o)), a.stroke(), a.restore();}a.restore();}function drawFunnelDataPoints(e, t, i, a) {var o = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : 1,n = assign({}, { activeWidth: 10, activeOpacity: .3, border: !1, borderWidth: 2, borderColor: "#FFFFFF", fillOpacity: 1, labelAlign: "right" }, t.extra.funnel),l = (t.height - t.area[0] - t.area[2]) / e.length,r = { x: t.area[3] + (t.width - t.area[1] - t.area[3]) / 2, y: t.height - t.area[2] },s = n.activeWidth,d = Math.min((t.width - t.area[1] - t.area[3]) / 2 - s, (t.height - t.area[0] - t.area[2]) / 2 - s);e = getFunnelDataPoints(e, d, o), a.save(), a.translate(r.x, r.y);for (var _o25 = 0; _o25 < e.length; _o25++) {0 == _o25 ? (t.tooltip && t.tooltip.index == _o25 && (a.beginPath(), a.setFillStyle(hexToRgb(e[_o25].color, n.activeOpacity)), a.moveTo(-s, 0), a.lineTo(-e[_o25].radius - s, -l), a.lineTo(e[_o25].radius + s, -l), a.lineTo(s, 0), a.lineTo(-s, 0), a.closePath(), a.fill()), e[_o25].funnelArea = [r.x - e[_o25].radius, r.y - l, r.x + e[_o25].radius, r.y], a.beginPath(), a.setLineWidth(n.borderWidth * t.pixelRatio), a.setStrokeStyle(n.borderColor), a.setFillStyle(hexToRgb(e[_o25].color, n.fillOpacity)), a.moveTo(0, 0), a.lineTo(-e[_o25].radius, -l), a.lineTo(e[_o25].radius, -l), a.lineTo(0, 0), a.closePath(), a.fill(), !0 == n.border && a.stroke()) : (t.tooltip && t.tooltip.index == _o25 && (a.beginPath(), a.setFillStyle(hexToRgb(e[_o25].color, n.activeOpacity)), a.moveTo(0, 0), a.lineTo(-e[_o25 - 1].radius - s, 0), a.lineTo(-e[_o25].radius - s, -l), a.lineTo(e[_o25].radius + s, -l), a.lineTo(e[_o25 - 1].radius + s, 0), a.lineTo(0, 0), a.closePath(), a.fill()), e[_o25].funnelArea = [r.x - e[_o25].radius, r.y - l * (_o25 + 1), r.x + e[_o25].radius, r.y - l * _o25], a.beginPath(), a.setLineWidth(n.borderWidth * t.pixelRatio), a.setStrokeStyle(n.borderColor), a.setFillStyle(hexToRgb(e[_o25].color, n.fillOpacity)), a.moveTo(0, 0), a.lineTo(-e[_o25 - 1].radius, 0), a.lineTo(-e[_o25].radius, -l), a.lineTo(e[_o25].radius, -l), a.lineTo(e[_o25 - 1].radius, 0), a.lineTo(0, 0), a.closePath(), a.fill(), !0 == n.border && a.stroke()), a.translate(0, -l);}return a.restore(), !1 !== t.dataLabel && 1 === o && drawFunnelText(e, t, a, l, n.labelAlign, s, r), { center: r, radius: d, series: e };}function drawFunnelText(e, t, a, o, n, l, r) {var s = Math.PI;for (var d = 0; d < e.length; d++) {var i = void 0,h = void 0,x = void 0,c = void 0,p = e[d],g = p.format ? p.format(+p._proportion_.toFixed(2)) : util.toFixed(100 * p._proportion_) + "%";"right" == n ? (i = 0 == d ? (p.funnelArea[2] + r.x) / 2 : (p.funnelArea[2] + e[d - 1].funnelArea[2]) / 2, h = i + 2 * l, x = p.funnelArea[1] + o / 2, c = p.textSize || t.fontSize, a.setLineWidth(1 * t.pixelRatio), a.setStrokeStyle(p.color), a.setFillStyle(p.color), a.beginPath(), a.moveTo(i, x), a.lineTo(h, x), a.stroke(), a.closePath(), a.beginPath(), a.moveTo(h, x), a.arc(h, x, 2, 0, 2 * s), a.closePath(), a.fill(), a.beginPath(), a.setFontSize(c), a.setFillStyle(p.textColor || "#666666"), a.fillText(g, h + 5, x + c / 2 - 2), a.closePath(), a.stroke(), a.closePath()) : (i = 0 == d ? (p.funnelArea[0] + r.x) / 2 : (p.funnelArea[0] + e[d - 1].funnelArea[0]) / 2, h = i - 2 * l, x = p.funnelArea[1] + o / 2, c = p.textSize || t.fontSize, a.setLineWidth(1 * t.pixelRatio), a.setStrokeStyle(p.color), a.setFillStyle(p.color), a.beginPath(), a.moveTo(i, x), a.lineTo(h, x), a.stroke(), a.closePath(), a.beginPath(), a.moveTo(h, x), a.arc(h, x, 2, 0, 2 * s), a.closePath(), a.fill(), a.beginPath(), a.setFontSize(c), a.setFillStyle(p.textColor || "#666666"), a.fillText(g, h - 5 - measureText(g), x + c / 2 - 2), a.closePath(), a.stroke(), a.closePath());}}function drawCanvas(e, t) {t.draw();}var Timing = { easeIn: function easeIn(e) {return Math.pow(e, 3);}, easeOut: function easeOut(e) {return Math.pow(e - 1, 3) + 1;}, easeInOut: function easeInOut(e) {var t = Math.pow;return 1 > (e /= .5) ? .5 * t(e, 3) : .5 * (t(e - 2, 3) + 2);}, linear: function linear(e) {return e;} };function Animation(e) {this.isStop = !1, e.duration = "undefined" == typeof e.duration ? 1e3 : e.duration, e.timing = e.timing || "linear";var t = function () {return "undefined" == typeof setTimeout ? "undefined" == typeof requestAnimationFrame ? function (e) {e(null);} : requestAnimationFrame : function (e, t) {setTimeout(function () {var t = +new Date();e(t);}, t);};}(),i = null,_a13 = function a(o) {if (null === o || !0 === this.isStop) return e.onProcess && e.onProcess(1), void (e.onAnimationFinish && e.onAnimationFinish());if (null === i && (i = o), o - i < e.duration) {var n = (o - i) / e.duration,l = Timing[e.timing];n = l(n), e.onProcess && e.onProcess(n), t(_a13, 17);} else e.onProcess && e.onProcess(1), e.onAnimationFinish && e.onAnimationFinish();};_a13 = _a13.bind(this), t(_a13, 17);}Animation.prototype.stop = function () {this.isStop = !0;};function drawCharts(e, t, a, i) {var o = this,n = t.series,l = t.categories;n = fillSeries(n, t, a);var r = t.animation ? t.duration : 0;o.animationInstance && o.animationInstance.stop();var s = null;if ("candle" == e) {var _e40 = assign({}, t.extra.candle.average);_e40.show ? (s = calCandleMA(_e40.day, _e40.name, _e40.color, n[0].data), s = fillSeries(s, t, a), t.seriesMA = s) : t.seriesMA ? s = t.seriesMA = fillSeries(t.seriesMA, t, a) : s = n;} else s = n;t._series_ = n = filterSeries(n), t.area = [,,,,];for (var _o26 = 0; 4 > _o26; _o26++) {t.area[_o26] = t.padding[_o26];}var d = calLegendData(s, t, a, t.chartData),h = d.area.wholeHeight,x = d.area.wholeWidth;switch (t.legend.position) {case "top":t.area[0] += h;break;case "bottom":t.area[2] += h;break;case "left":t.area[3] += x;break;case "right":t.area[1] += x;}var c = {},p = 0;if ("line" === t.type || "column" === t.type || "area" === t.type || "mix" === t.type || "candle" === t.type) {if (c = calYAxisData(n, t, a), p = c.yAxisWidth, t.yAxis.showTitle) {var _e42 = 0;for (var _o28 = 0; _o28 < t.yAxis.data.length; _o28++) {_e42 = Math.max(_e42, t.yAxis.data[_o28].titleFontSize ? t.yAxis.data[_o28].titleFontSize : a.fontSize);}t.area[0] += (_e42 + 6) * t.pixelRatio;}var _e41 = 0,_o27 = 0;for (var _a14 = 0; _a14 < p.length; _a14++) {"left" == p[_a14].position ? (t.area[3] += 0 < _o27 ? p[_a14].width + t.yAxis.padding : p[_a14].width, _o27 += 1) : (t.area[1] += 0 < _e41 ? p[_a14].width + t.yAxis.padding : p[_a14].width, _e41 += 1);}} else a.yAxisWidth = p;if (t.chartData.yAxisData = c, t.categories && t.categories.length) {t.chartData.xAxisData = getXAxisPoints(t.categories, t, a);var _e43 = calCategoriesData(t.categories, t, a, t.chartData.xAxisData.eachSpacing),_i27 = _e43.xAxisHeight,_o29 = _e43.angle;a.xAxisHeight = _i27, a._xAxisTextAngle_ = _o29, t.area[2] += _i27, t.chartData.categoriesData = _e43;} else if ("line" === t.type || "area" === t.type || "points" === t.type) {t.chartData.xAxisData = calXAxisData(n, t, a), l = t.chartData.xAxisData.rangesFormat;var _e44 = calCategoriesData(l, t, a, t.chartData.xAxisData.eachSpacing),_i28 = _e44.xAxisHeight,_o30 = _e44.angle;a.xAxisHeight = _i28, a._xAxisTextAngle_ = _o30, t.area[2] += _i28, t.chartData.categoriesData = _e44;} else t.chartData.xAxisData = { xAxisPoints: [] };if (t.enableScroll && "right" == t.xAxis.scrollAlign && void 0 === t._scrollDistance_) {var _e45 = 0,_i29 = t.chartData.xAxisData.xAxisPoints,_a15 = t.chartData.xAxisData.startX,_n26 = t.chartData.xAxisData.endX,_l13 = t.chartData.xAxisData.eachSpacing,_r11 = _l13 * (_i29.length - 1);_e45 = _n26 - _a15 - _r11, o.scrollOption = { currentOffset: _e45, startTouchX: _e45, distance: 0, lastMoveTime: 0 }, t._scrollDistance_ = _e45;}switch (("pie" === e || "ring" === e || "rose" === e) && (a._pieTextMaxLength_ = !1 === t.dataLabel ? 0 : getPieTextMaxLength(s)), e) {case "word":var _d4 = assign({}, { type: "normal", autoColors: !0 }, t.extra.word);(!0 == t.updateData || null == t.updateData) && (t.chartData.wordCloudData = getWordCloudPoint(t, _d4.type)), this.animationInstance = new Animation({ timing: "easeInOut", duration: r, onProcess: function onProcess(e) {i.clearRect(0, 0, t.width, t.height), t.rotate && contextRotate(i, t), drawWordCloudDataPoints(n, t, a, i, e), drawCanvas(t, i);}, onAnimationFinish: function onAnimationFinish() {o.event.trigger("renderComplete");} });break;case "map":i.clearRect(0, 0, t.width, t.height), drawMapDataPoints(n, t, a, i);break;case "funnel":this.animationInstance = new Animation({ timing: "easeInOut", duration: r, onProcess: function onProcess(e) {i.clearRect(0, 0, t.width, t.height), t.rotate && contextRotate(i, t), t.chartData.funnelData = drawFunnelDataPoints(n, t, a, i, e), drawLegend(t.series, t, a, i, t.chartData), drawToolTipBridge(t, a, i, e), drawCanvas(t, i);}, onAnimationFinish: function onAnimationFinish() {o.event.trigger("renderComplete");} });break;case "line":this.animationInstance = new Animation({ timing: "easeIn", duration: r, onProcess: function onProcess(e) {i.clearRect(0, 0, t.width, t.height), t.rotate && contextRotate(i, t), drawYAxisGrid(l, t, a, i), drawXAxis(l, t, a, i);var o = drawLineDataPoints(n, t, a, i, e),r = o.xAxisPoints,s = o.calPoints,d = o.eachSpacing;t.chartData.xAxisPoints = r, t.chartData.calPoints = s, t.chartData.eachSpacing = d, drawYAxis(n, t, a, i), !1 !== t.enableMarkLine && 1 === e && drawMarkLine(t, a, i), drawLegend(t.series, t, a, i, t.chartData), drawToolTipBridge(t, a, i, e, d, r), drawCanvas(t, i);}, onAnimationFinish: function onAnimationFinish() {o.event.trigger("renderComplete");} });break;case "mix":this.animationInstance = new Animation({ timing: "easeIn", duration: r, onProcess: function onProcess(e) {i.clearRect(0, 0, t.width, t.height), t.rotate && contextRotate(i, t), drawYAxisGrid(l, t, a, i), drawXAxis(l, t, a, i);var o = drawMixDataPoints(n, t, a, i, e),r = o.xAxisPoints,s = o.calPoints,d = o.eachSpacing;t.chartData.xAxisPoints = r, t.chartData.calPoints = s, t.chartData.eachSpacing = d, drawYAxis(n, t, a, i), !1 !== t.enableMarkLine && 1 === e && drawMarkLine(t, a, i), drawLegend(t.series, t, a, i, t.chartData), drawToolTipBridge(t, a, i, e, d, r), drawCanvas(t, i);}, onAnimationFinish: function onAnimationFinish() {o.event.trigger("renderComplete");} });break;case "column":this.animationInstance = new Animation({ timing: "easeIn", duration: r, onProcess: function onProcess(e) {i.clearRect(0, 0, t.width, t.height), t.rotate && contextRotate(i, t), drawYAxisGrid(l, t, a, i), drawXAxis(l, t, a, i);var o = drawColumnDataPoints(n, t, a, i, e),r = o.xAxisPoints,s = o.calPoints,d = o.eachSpacing;t.chartData.xAxisPoints = r, t.chartData.calPoints = s, t.chartData.eachSpacing = d, drawYAxis(n, t, a, i), !1 !== t.enableMarkLine && 1 === e && drawMarkLine(t, a, i), drawLegend(t.series, t, a, i, t.chartData), drawToolTipBridge(t, a, i, e, d, r), drawCanvas(t, i);}, onAnimationFinish: function onAnimationFinish() {o.event.trigger("renderComplete");} });break;case "area":this.animationInstance = new Animation({ timing: "easeIn", duration: r, onProcess: function onProcess(e) {i.clearRect(0, 0, t.width, t.height), t.rotate && contextRotate(i, t), drawYAxisGrid(l, t, a, i), drawXAxis(l, t, a, i);var o = drawAreaDataPoints(n, t, a, i, e),r = o.xAxisPoints,s = o.calPoints,d = o.eachSpacing;t.chartData.xAxisPoints = r, t.chartData.calPoints = s, t.chartData.eachSpacing = d, drawYAxis(n, t, a, i), !1 !== t.enableMarkLine && 1 === e && drawMarkLine(t, a, i), drawLegend(t.series, t, a, i, t.chartData), drawToolTipBridge(t, a, i, e, d, r), drawCanvas(t, i);}, onAnimationFinish: function onAnimationFinish() {o.event.trigger("renderComplete");} });break;case "ring":case "pie":this.animationInstance = new Animation({ timing: "easeInOut", duration: r, onProcess: function onProcess(e) {i.clearRect(0, 0, t.width, t.height), t.rotate && contextRotate(i, t), t.chartData.pieData = drawPieDataPoints(n, t, a, i, e), drawLegend(t.series, t, a, i, t.chartData), drawToolTipBridge(t, a, i, e), drawCanvas(t, i);}, onAnimationFinish: function onAnimationFinish() {o.event.trigger("renderComplete");} });break;case "rose":this.animationInstance = new Animation({ timing: "easeInOut", duration: r, onProcess: function onProcess(e) {i.clearRect(0, 0, t.width, t.height), t.rotate && contextRotate(i, t), t.chartData.pieData = drawRoseDataPoints(n, t, a, i, e), drawLegend(t.series, t, a, i, t.chartData), drawToolTipBridge(t, a, i, e), drawCanvas(t, i);}, onAnimationFinish: function onAnimationFinish() {o.event.trigger("renderComplete");} });break;case "radar":this.animationInstance = new Animation({ timing: "easeInOut", duration: r, onProcess: function onProcess(e) {i.clearRect(0, 0, t.width, t.height), t.rotate && contextRotate(i, t), t.chartData.radarData = drawRadarDataPoints(n, t, a, i, e), drawLegend(t.series, t, a, i, t.chartData), drawToolTipBridge(t, a, i, e), drawCanvas(t, i);}, onAnimationFinish: function onAnimationFinish() {o.event.trigger("renderComplete");} });break;case "arcbar":this.animationInstance = new Animation({ timing: "easeInOut", duration: r, onProcess: function onProcess(e) {i.clearRect(0, 0, t.width, t.height), t.rotate && contextRotate(i, t), t.chartData.arcbarData = drawArcbarDataPoints(n, t, a, i, e), drawCanvas(t, i);}, onAnimationFinish: function onAnimationFinish() {o.event.trigger("renderComplete");} });break;case "gauge":this.animationInstance = new Animation({ timing: "easeInOut", duration: r, onProcess: function onProcess(e) {i.clearRect(0, 0, t.width, t.height), t.rotate && contextRotate(i, t), t.chartData.gaugeData = drawGaugeDataPoints(l, n, t, a, i, e), drawCanvas(t, i);}, onAnimationFinish: function onAnimationFinish() {o.event.trigger("renderComplete");} });break;case "candle":this.animationInstance = new Animation({ timing: "easeIn", duration: r, onProcess: function onProcess(e) {i.clearRect(0, 0, t.width, t.height), t.rotate && contextRotate(i, t), drawYAxisGrid(l, t, a, i), drawXAxis(l, t, a, i);var o = drawCandleDataPoints(n, s, t, a, i, e),r = o.xAxisPoints,d = o.calPoints,h = o.eachSpacing;t.chartData.xAxisPoints = r, t.chartData.calPoints = d, t.chartData.eachSpacing = h, drawYAxis(n, t, a, i), !1 !== t.enableMarkLine && 1 === e && drawMarkLine(t, a, i), s ? drawLegend(s, t, a, i, t.chartData) : drawLegend(t.series, t, a, i, t.chartData), drawToolTipBridge(t, a, i, e, h, r), drawCanvas(t, i);}, onAnimationFinish: function onAnimationFinish() {o.event.trigger("renderComplete");} });}}function Event() {this.events = {};}Event.prototype.addEventListener = function (e, t) {this.events[e] = this.events[e] || [], this.events[e].push(t);}, Event.prototype.trigger = function () {for (var e = arguments.length, t = Array(e), i = 0; i < e; i++) {t[i] = arguments[i];}var a = t[0],o = t.slice(1);!this.events[a] || this.events[a].forEach(function (e) {try {e.apply(null, o);} catch (t) {console.error(t);}});};var Charts = function Charts(e) {e.pixelRatio = e.pixelRatio ? e.pixelRatio : 1, e.fontSize = e.fontSize ? e.fontSize * e.pixelRatio : 13 * e.pixelRatio, e.title = assign({}, e.title), e.subtitle = assign({}, e.subtitle), e.duration = e.duration ? e.duration : 1e3, e.yAxis = assign({}, { data: [], showTitle: !1, disabled: !1, disableGrid: !1, splitNumber: 5, gridType: "solid", dashLength: 4 * e.pixelRatio, gridColor: "#cccccc", padding: 10, fontColor: "#666666" }, e.yAxis), e.yAxis.dashLength *= e.pixelRatio, e.yAxis.padding *= e.pixelRatio, e.xAxis = assign({}, { rotateLabel: !1, type: "calibration", gridType: "solid", dashLength: 4, scrollAlign: "left", boundaryGap: "center", axisLine: !0, axisLineColor: "#cccccc" }, e.xAxis), e.xAxis.dashLength *= e.pixelRatio, e.legend = assign({}, { show: !0, position: "bottom", float: "center", backgroundColor: "rgba(0,0,0,0)", borderColor: "rgba(0,0,0,0)", borderWidth: 0, padding: 5, margin: 5, itemGap: 10, fontSize: e.fontSize, lineHeight: e.fontSize, fontColor: "#333333", format: {}, hiddenColor: "#CECECE" }, e.legend), e.legend.borderWidth *= e.pixelRatio, e.legend.itemGap *= e.pixelRatio, e.legend.padding *= e.pixelRatio, e.legend.margin *= e.pixelRatio, e.extra = assign({}, e.extra), e.rotate = !!e.rotate, e.animation = !!e.animation, e.rotate = !!e.rotate;var t = JSON.parse(JSON.stringify(config));if (t.colors = e.colors ? e.colors : t.colors, t.yAxisTitleWidth = !0 !== e.yAxis.disabled && e.yAxis.title ? t.yAxisTitleWidth : 0, ("pie" == e.type || "ring" == e.type) && (t.pieChartLinePadding = !1 === e.dataLabel ? 0 : e.extra.pie.labelWidth * e.pixelRatio || t.pieChartLinePadding * e.pixelRatio), "rose" == e.type && (t.pieChartLinePadding = !1 === e.dataLabel ? 0 : e.extra.rose.labelWidth * e.pixelRatio || t.pieChartLinePadding * e.pixelRatio), t.pieChartTextPadding = !1 === e.dataLabel ? 0 : t.pieChartTextPadding * e.pixelRatio, t.yAxisSplit = e.yAxis.splitNumber ? e.yAxis.splitNumber : config.yAxisSplit, t.rotate = e.rotate, e.rotate) {var _t30 = e.width,i = e.height;e.width = i, e.height = _t30;}e.padding = e.padding ? e.padding : t.padding;for (var _t31 = 0; 4 > _t31; _t31++) {e.padding[_t31] *= e.pixelRatio;}t.yAxisWidth = config.yAxisWidth * e.pixelRatio, t.xAxisHeight = config.xAxisHeight * e.pixelRatio, e.enableScroll && e.xAxis.scrollShow && (t.xAxisHeight += 6 * e.pixelRatio), t.xAxisLineHeight = config.xAxisLineHeight * e.pixelRatio, t.fontSize = e.fontSize, t.titleFontSize = config.titleFontSize * e.pixelRatio, t.subtitleFontSize = config.subtitleFontSize * e.pixelRatio, t.toolTipPadding = config.toolTipPadding * e.pixelRatio, t.toolTipLineHeight = config.toolTipLineHeight * e.pixelRatio, t.columePadding = config.columePadding * e.pixelRatio, e.$this = e.$this ? e.$this : this, this.context = uni.createCanvasContext(e.canvasId, e.$this), e.chartData = {}, this.event = new Event(), this.scrollOption = { currentOffset: 0, startTouchX: 0, distance: 0, lastMoveTime: 0 }, this.opts = e, this.config = t, drawCharts.call(this, e.type, e, t, this.context);};Charts.prototype.updateData = function () {var e = 0 < arguments.length && arguments[0] !== void 0 ? arguments[0] : {};this.opts = assign({}, this.opts, e), this.opts.updateData = !0;var t = e.scrollPosition || "current";switch (t) {case "current":this.opts._scrollDistance_ = this.scrollOption.currentOffset;break;case "left":this.opts._scrollDistance_ = 0, this.scrollOption = { currentOffset: 0, startTouchX: 0, distance: 0, lastMoveTime: 0 };break;case "right":var _e46 = calYAxisData(this.opts.series, this.opts, this.config),i = _e46.yAxisWidth;this.config.yAxisWidth = i;var a = 0,o = getXAxisPoints(this.opts.categories, this.opts, this.config),n = o.xAxisPoints,l = o.startX,r = o.endX,s = o.eachSpacing,d = s * (n.length - 1);a = r - l - d, this.scrollOption = { currentOffset: a, startTouchX: a, distance: 0, lastMoveTime: 0 }, this.opts._scrollDistance_ = a;}drawCharts.call(this, this.opts.type, this.opts, this.config, this.context);}, Charts.prototype.zoom = function () {var e = Math.round,t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.opts.xAxis.itemCount;if (!0 !== this.opts.enableScroll) return void console.log("\u8BF7\u542F\u7528\u6EDA\u52A8\u6761\u540E\u4F7F\u7528\uFF01");var i = e(Math.abs(this.scrollOption.currentOffset) / this.opts.chartData.eachSpacing) + e(this.opts.xAxis.itemCount / 2);this.opts.animation = !1, this.opts.xAxis.itemCount = t.itemCount;var a = calYAxisData(this.opts.series, this.opts, this.config),o = a.yAxisWidth;this.config.yAxisWidth = o;var n = 0,l = getXAxisPoints(this.opts.categories, this.opts, this.config),r = l.xAxisPoints,s = l.startX,d = l.endX,h = l.eachSpacing,x = d - s,c = x - h * (r.length - 1);n = x / 2 - h * i, 0 < n && (n = 0), n < c && (n = c), this.scrollOption = { currentOffset: n, startTouchX: n, distance: 0, lastMoveTime: 0 }, this.opts._scrollDistance_ = n, drawCharts.call(this, this.opts.type, this.opts, this.config, this.context);}, Charts.prototype.stopAnimation = function () {this.animationInstance && this.animationInstance.stop();}, Charts.prototype.addEventListener = function (e, t) {this.event.addEventListener(e, t);}, Charts.prototype.getCurrentDataIndex = function (t) {var e = null;if (e = t.changedTouches ? t.changedTouches[0] : t.mp.changedTouches[0], e) {var i = getTouches(e, this.opts, t);return "pie" === this.opts.type || "ring" === this.opts.type || "rose" === this.opts.type ? findPieChartCurrentIndex({ x: i.x, y: i.y }, this.opts.chartData.pieData) : "radar" === this.opts.type ? findRadarChartCurrentIndex({ x: i.x, y: i.y }, this.opts.chartData.radarData, this.opts.categories.length) : "funnel" === this.opts.type ? findFunnelChartCurrentIndex({ x: i.x, y: i.y }, this.opts.chartData.funnelData) : "map" === this.opts.type ? findMapChartCurrentIndex({ x: i.x, y: i.y }, this.opts) : "word" === this.opts.type ? findWordChartCurrentIndex({ x: i.x, y: i.y }, this.opts.chartData.wordCloudData) : findCurrentIndex({ x: i.x, y: i.y }, this.opts.chartData.calPoints, this.opts, this.config, Math.abs(this.scrollOption.currentOffset));}return -1;}, Charts.prototype.getLegendDataIndex = function (t) {var e = null;if (e = t.changedTouches ? t.changedTouches[0] : t.mp.changedTouches[0], e) {var i = getTouches(e, this.opts, t);return findLegendIndex({ x: i.x, y: i.y }, this.opts.chartData.legendData);}return -1;}, Charts.prototype.touchLegend = function (t) {var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},i = null;if (i = t.changedTouches ? t.changedTouches[0] : t.mp.changedTouches[0], i) {var a = getTouches(i, this.opts, t),o = this.getLegendDataIndex(t);0 <= o && (this.opts.series[o].show = !this.opts.series[o].show, this.opts.animation = !!e.animation, this.opts._scrollDistance_ = this.scrollOption.currentOffset, drawCharts.call(this, this.opts.type, this.opts, this.config, this.context));}}, Charts.prototype.showToolTip = function (t) {var e = 1 < arguments.length && arguments[1] !== void 0 ? arguments[1] : {},i = null;i = t.changedTouches ? t.changedTouches[0] : t.mp.changedTouches[0], i || console.log("touchError");var a = getTouches(i, this.opts, t),o = this.scrollOption.currentOffset,n = assign({}, this.opts, { _scrollDistance_: o, animation: !1 });if ("line" === this.opts.type || "area" === this.opts.type || "column" === this.opts.type) {var l = e.index == null ? this.getCurrentDataIndex(t) : e.index;if (-1 < l) {var r = getSeriesDataItem(this.opts.series, l);if (0 !== r.length) {var s = getToolTipData(r, this.opts.chartData.calPoints, l, this.opts.categories, e),d = s.textList,h = s.offset;h.y = a.y, n.tooltip = { textList: e.textList ? e.textList : d, offset: h, option: e, index: l };}}drawCharts.call(this, n.type, n, this.config, this.context);}if ("mix" === this.opts.type) {var l = null == e.index ? this.getCurrentDataIndex(t) : e.index;if (-1 < l) {var o = this.scrollOption.currentOffset,n = assign({}, this.opts, { _scrollDistance_: o, animation: !1 }),r = getSeriesDataItem(this.opts.series, l);if (0 !== r.length) {var x = getMixToolTipData(r, this.opts.chartData.calPoints, l, this.opts.categories, e),d = x.textList,h = x.offset;h.y = a.y, n.tooltip = { textList: e.textList ? e.textList : d, offset: h, option: e, index: l };}}drawCharts.call(this, n.type, n, this.config, this.context);}if ("candle" === this.opts.type) {var l = null == e.index ? this.getCurrentDataIndex(t) : e.index;if (-1 < l) {var o = this.scrollOption.currentOffset,n = assign({}, this.opts, { _scrollDistance_: o, animation: !1 }),r = getSeriesDataItem(this.opts.series, l);if (0 !== r.length) {var s = getCandleToolTipData(this.opts.series[0].data, r, this.opts.chartData.calPoints, l, this.opts.categories, this.opts.extra.candle, e),d = s.textList,h = s.offset;h.y = a.y, n.tooltip = { textList: e.textList ? e.textList : d, offset: h, option: e, index: l };}}drawCharts.call(this, n.type, n, this.config, this.context);}if ("pie" === this.opts.type || "ring" === this.opts.type || "rose" === this.opts.type || "funnel" === this.opts.type) {var l = null == e.index ? this.getCurrentDataIndex(t) : e.index;if (-1 < l) {var o = this.scrollOption.currentOffset,n = assign({}, this.opts, { _scrollDistance_: o, animation: !1 }),r = this.opts._series_[l],d = [{ text: e.format ? e.format(r) : r.name + ": " + r.data, color: r.color }],h = { x: a.x, y: a.y };n.tooltip = { textList: e.textList ? e.textList : d, offset: h, option: e, index: l };}drawCharts.call(this, n.type, n, this.config, this.context);}if ("map" === this.opts.type || "word" === this.opts.type) {var l = null == e.index ? this.getCurrentDataIndex(t) : e.index;if (-1 < l) {var o = this.scrollOption.currentOffset,n = assign({}, this.opts, { _scrollDistance_: o, animation: !1 }),r = this.opts._series_[l],d = [{ text: e.format ? e.format(r) : r.properties.name, color: r.color }],h = { x: a.x, y: a.y };n.tooltip = { textList: e.textList ? e.textList : d, offset: h, option: e, index: l };}n.updateData = !1, drawCharts.call(this, n.type, n, this.config, this.context);}if ("radar" === this.opts.type) {var l = null == e.index ? this.getCurrentDataIndex(t) : e.index;if (-1 < l) {var o = this.scrollOption.currentOffset,n = assign({}, this.opts, { _scrollDistance_: o, animation: !1 }),r = getSeriesDataItem(this.opts.series, l);if (0 !== r.length) {var d = r.map(function (t) {return { text: e.format ? e.format(t) : t.name + ": " + t.data, color: t.color };}),h = { x: a.x, y: a.y };n.tooltip = { textList: e.textList ? e.textList : d, offset: h, option: e, index: l };}}drawCharts.call(this, n.type, n, this.config, this.context);}}, Charts.prototype.translate = function (e) {this.scrollOption = { currentOffset: e, startTouchX: e, distance: 0, lastMoveTime: 0 };var t = assign({}, this.opts, { _scrollDistance_: e, animation: !1 });drawCharts.call(this, this.opts.type, t, this.config, this.context);}, Charts.prototype.scrollStart = function (t) {var e = null;e = t.changedTouches ? t.changedTouches[0] : t.mp.changedTouches[0];var i = getTouches(e, this.opts, t);e && !0 === this.opts.enableScroll && (this.scrollOption.startTouchX = i.x);}, Charts.prototype.scroll = function (t) {0 === this.scrollOption.lastMoveTime && (this.scrollOption.lastMoveTime = Date.now());var e = this.opts.extra.touchMoveLimit || 20,i = Date.now(),a = i - this.scrollOption.lastMoveTime;if (!(a < Math.floor(1e3 / e))) {this.scrollOption.lastMoveTime = i;var o = null;if (o = t.changedTouches ? t.changedTouches[0] : t.mp.changedTouches[0], o && !0 === this.opts.enableScroll) {var n,l = getTouches(o, this.opts, t);n = l.x - this.scrollOption.startTouchX;var r = this.scrollOption.currentOffset,s = calValidDistance(this, r + n, this.opts.chartData, this.config, this.opts);this.scrollOption.distance = n = s - r;var d = assign({}, this.opts, { _scrollDistance_: r + n, animation: !1 });return drawCharts.call(this, d.type, d, this.config, this.context), r + n;}}}, Charts.prototype.scrollEnd = function () {if (!0 === this.opts.enableScroll) {var e = this.scrollOption,t = e.currentOffset,i = e.distance;this.scrollOption.currentOffset = t + i, this.scrollOption.distance = 0;}},  true && "object" == typeof module.exports && (module.exports = Charts);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 4:
/*!****************************************!*\
  !*** E:/desktop/new_mobile/pages.json ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 404:
/*!***********************************************************************************!*\
  !*** E:/desktop/new_mobile/js_sdk/yanhao-echarts-for-wx/uni-ec-canvas/echarts.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function (t, e) { true ? e(exports) : undefined;}(this, function (t) {"use strict";function e(t) {var e = {},n = {},i = t.match(/Firefox\/([\d.]+)/),r = t.match(/MSIE\s([\d.]+)/) || t.match(/Trident\/.+?rv:(([\d.]+))/),o = t.match(/Edge\/([\d.]+)/),a = /micromessenger/i.test(t);return i && (n.firefox = !0, n.version = i[1]), r && (n.ie = !0, n.version = r[1]), o && (n.edge = !0, n.version = o[1]), a && (n.weChat = !0), { browser: n, os: e, node: !1, canvasSupported: !!document.createElement("canvas").getContext, svgSupported: "undefined" != typeof SVGRect, touchEventsSupported: "ontouchstart" in window && !n.ie && !n.edge, pointerEventsSupported: "onpointerdown" in window && (n.edge || n.ie && n.version >= 11), domSupported: "undefined" != typeof document };}function n(t, e) {"createCanvas" === t && (ep = null), Jf[t] = e;}function i(t) {if (null == t || "object" != typeof t) return t;var e = t,n = Uf.call(t);if ("[object Array]" === n) {if (!E(t)) {e = [];for (var r = 0, o = t.length; o > r; r++) {e[r] = i(t[r]);}}} else if (Yf[n]) {if (!E(t)) {var a = t.constructor;if (t.constructor.from) e = a.from(t);else {e = new a(t.length);for (var r = 0, o = t.length; o > r; r++) {e[r] = i(t[r]);}}}} else if (!Xf[n] && !E(t) && !I(t)) {e = {};for (var s in t) {t.hasOwnProperty(s) && (e[s] = i(t[s]));}}return e;}function r(t, e, n) {if (!S(e) || !S(t)) return n ? i(e) : t;for (var o in e) {if (e.hasOwnProperty(o)) {var a = t[o],s = e[o];!S(s) || !S(a) || x(s) || x(a) || I(s) || I(a) || M(s) || M(a) || E(s) || E(a) ? !n && o in t || (t[o] = i(e[o], !0)) : r(a, s, n);}}return t;}function o(t, e) {for (var n = t[0], i = 1, o = t.length; o > i; i++) {n = r(n, t[i], e);}return n;}function a(t, e) {for (var n in e) {e.hasOwnProperty(n) && (t[n] = e[n]);}return t;}function s(t, e, n) {for (var i in e) {e.hasOwnProperty(i) && (n ? null != e[i] : null == t[i]) && (t[i] = e[i]);}return t;}function l() {return ep || (ep = tp().getContext("2d")), ep;}function u(t, e) {if (t) {if (t.indexOf) return t.indexOf(e);for (var n = 0, i = t.length; i > n; n++) {if (t[n] === e) return n;}}return -1;}function h(t, e) {function n() {}var i = t.prototype;n.prototype = e.prototype, t.prototype = new n();for (var r in i) {i.hasOwnProperty(r) && (t.prototype[r] = i[r]);}t.prototype.constructor = t, t.superClass = e;}function c(t, e, n) {t = "prototype" in t ? t.prototype : t, e = "prototype" in e ? e.prototype : e, s(t, e, n);}function d(t) {return t ? "string" == typeof t ? !1 : "number" == typeof t.length : void 0;}function f(t, e, n) {if (t && e) if (t.forEach && t.forEach === qf) t.forEach(e, n);else if (t.length === +t.length) for (var i = 0, r = t.length; r > i; i++) {e.call(n, t[i], i, t);} else for (var o in t) {t.hasOwnProperty(o) && e.call(n, t[o], o, t);}}function p(t, e, n) {if (t && e) {if (t.map && t.map === $f) return t.map(e, n);for (var i = [], r = 0, o = t.length; o > r; r++) {i.push(e.call(n, t[r], r, t));}return i;}}function g(t, e, n, i) {if (t && e) {if (t.reduce && t.reduce === Qf) return t.reduce(e, n, i);for (var r = 0, o = t.length; o > r; r++) {n = e.call(i, n, t[r], r, t);}return n;}}function v(t, e, n) {if (t && e) {if (t.filter && t.filter === Zf) return t.filter(e, n);for (var i = [], r = 0, o = t.length; o > r; r++) {e.call(n, t[r], r, t) && i.push(t[r]);}return i;}}function m(t, e, n) {if (t && e) for (var i = 0, r = t.length; r > i; i++) {if (e.call(n, t[i], i, t)) return t[i];}}function y(t, e) {var n = Kf.call(arguments, 2);return function () {return t.apply(e, n.concat(Kf.call(arguments)));};}function _(t) {var e = Kf.call(arguments, 1);return function () {return t.apply(this, e.concat(Kf.call(arguments)));};}function x(t) {return "[object Array]" === Uf.call(t);}function w(t) {return "function" == typeof t;}function b(t) {return "[object String]" === Uf.call(t);}function S(t) {var e = typeof t;return "function" === e || !!t && "object" === e;}function M(t) {return !!Xf[Uf.call(t)];}function C(t) {return !!Yf[Uf.call(t)];}function I(t) {return "object" == typeof t && "number" == typeof t.nodeType && "object" == typeof t.ownerDocument;}function T(t) {return t !== t;}function k() {for (var t = 0, e = arguments.length; e > t; t++) {if (null != arguments[t]) return arguments[t];}}function D(t, e) {return null != t ? t : e;}function A(t, e, n) {return null != t ? t : null != e ? e : n;}function P() {return Function.call.apply(Kf, arguments);}function O(t) {if ("number" == typeof t) return [t, t, t, t];var e = t.length;return 2 === e ? [t[0], t[1], t[0], t[1]] : 3 === e ? [t[0], t[1], t[2], t[1]] : t;}function L(t, e) {if (!t) throw new Error(e);}function B(t) {return null == t ? null : "function" == typeof t.trim ? t.trim() : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");}function z(t) {t[np] = !0;}function E(t) {return t[np];}function R(t) {function e(t, e) {n ? i.set(t, e) : i.set(e, t);}var n = x(t);this.data = {};var i = this;t instanceof R ? t.each(e) : t && f(t, e);}function N(t) {return new R(t);}function F(t, e) {for (var n = new t.constructor(t.length + e.length), i = 0; i < t.length; i++) {n[i] = t[i];}var r = t.length;for (i = 0; i < e.length; i++) {n[i + r] = e[i];}return n;}function H() {}function V(t, e) {var n = new rp(2);return null == t && (t = 0), null == e && (e = 0), n[0] = t, n[1] = e, n;}function G(t, e) {return t[0] = e[0], t[1] = e[1], t;}function W(t) {var e = new rp(2);return e[0] = t[0], e[1] = t[1], e;}function X(t, e, n) {return t[0] = e, t[1] = n, t;}function Y(t, e, n) {return t[0] = e[0] + n[0], t[1] = e[1] + n[1], t;}function U(t, e, n, i) {return t[0] = e[0] + n[0] * i, t[1] = e[1] + n[1] * i, t;}function j(t, e, n) {return t[0] = e[0] - n[0], t[1] = e[1] - n[1], t;}function q(t) {return Math.sqrt(Z(t));}function Z(t) {return t[0] * t[0] + t[1] * t[1];}function K(t, e, n) {return t[0] = e[0] * n[0], t[1] = e[1] * n[1], t;}function $(t, e, n) {return t[0] = e[0] / n[0], t[1] = e[1] / n[1], t;}function Q(t, e) {return t[0] * e[0] + t[1] * e[1];}function J(t, e, n) {return t[0] = e[0] * n, t[1] = e[1] * n, t;}function te(t, e) {var n = q(e);return 0 === n ? (t[0] = 0, t[1] = 0) : (t[0] = e[0] / n, t[1] = e[1] / n), t;}function ee(t, e) {return Math.sqrt((t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1]));}function ne(t, e) {return (t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1]);}function ie(t, e) {return t[0] = -e[0], t[1] = -e[1], t;}function re(t, e, n, i) {return t[0] = e[0] + i * (n[0] - e[0]), t[1] = e[1] + i * (n[1] - e[1]), t;}function oe(t, e, n) {var i = e[0],r = e[1];return t[0] = n[0] * i + n[2] * r + n[4], t[1] = n[1] * i + n[3] * r + n[5], t;}function ae(t, e, n) {return t[0] = Math.min(e[0], n[0]), t[1] = Math.min(e[1], n[1]), t;}function se(t, e, n) {return t[0] = Math.max(e[0], n[0]), t[1] = Math.max(e[1], n[1]), t;}function le() {this.on("mousedown", this._dragStart, this), this.on("mousemove", this._drag, this), this.on("mouseup", this._dragEnd, this);}function ue(t, e) {return { target: t, topTarget: e && e.topTarget };}function he(t, e) {var n = t._$eventProcessor;return null != e && n && n.normalizeQuery && (e = n.normalizeQuery(e)), e;}function ce(t, e, n, i, r, o) {var a = t._$handlers;if ("function" == typeof n && (r = i, i = n, n = null), !i || !e) return t;n = he(t, n), a[e] || (a[e] = []);for (var s = 0; s < a[e].length; s++) {if (a[e][s].h === i) return t;}var l = { h: i, one: o, query: n, ctx: r || t, callAtLast: i.zrEventfulCallAtLast },u = a[e].length - 1,h = a[e][u];return h && h.callAtLast ? a[e].splice(u, 0, l) : a[e].push(l), t;}function de(t, e, n, i, r, o) {var a = i + "-" + r,s = t.length;if (o.hasOwnProperty(a)) return o[a];if (1 === e) {var l = Math.round(Math.log((1 << s) - 1 & ~r) / dp);return t[n][l];}for (var u = i | 1 << n, h = n + 1; i & 1 << h;) {h++;}for (var c = 0, d = 0, f = 0; s > d; d++) {var p = 1 << d;p & r || (c += (f % 2 ? -1 : 1) * t[n][d] * de(t, e - 1, h, u, r | p, o), f++);}return o[a] = c, c;}function fe(t, e) {var n = [[t[0], t[1], 1, 0, 0, 0, -e[0] * t[0], -e[0] * t[1]], [0, 0, 0, t[0], t[1], 1, -e[1] * t[0], -e[1] * t[1]], [t[2], t[3], 1, 0, 0, 0, -e[2] * t[2], -e[2] * t[3]], [0, 0, 0, t[2], t[3], 1, -e[3] * t[2], -e[3] * t[3]], [t[4], t[5], 1, 0, 0, 0, -e[4] * t[4], -e[4] * t[5]], [0, 0, 0, t[4], t[5], 1, -e[5] * t[4], -e[5] * t[5]], [t[6], t[7], 1, 0, 0, 0, -e[6] * t[6], -e[6] * t[7]], [0, 0, 0, t[6], t[7], 1, -e[7] * t[6], -e[7] * t[7]]],i = {},r = de(n, 8, 0, 0, 0, i);if (0 !== r) {for (var o = [], a = 0; 8 > a; a++) {for (var s = 0; 8 > s; s++) {null == o[s] && (o[s] = 0), o[s] += ((a + s) % 2 ? -1 : 1) * de(n, 7, 0 === a ? 1 : 0, 1 << a, 1 << s, i) / r * e[a];}}return function (t, e, n) {var i = e * o[6] + n * o[7] + 1;t[0] = (e * o[0] + n * o[1] + o[2]) / i, t[1] = (e * o[3] + n * o[4] + o[5]) / i;};}}function pe(t, e, n, i, r) {return ge(pp, e, i, r, !0) && ge(t, n, pp[0], pp[1]);}function ge(t, e, n, i, r) {if (e.getBoundingClientRect && Wf.domSupported && !ye(e)) {var o = e[fp] || (e[fp] = {}),a = ve(e, o),s = me(a, o, r);if (s) return s(t, n, i), !0;}return !1;}function ve(t, e) {var n = e.markers;if (n) return n;n = e.markers = [];for (var i = ["left", "right"], r = ["top", "bottom"], o = 0; 4 > o; o++) {var a = document.createElement("div"),s = a.style,l = o % 2,u = (o >> 1) % 2;s.cssText = ["position: absolute", "visibility: hidden", "padding: 0", "margin: 0", "border-width: 0", "user-select: none", "width:0", "height:0", i[l] + ":0", r[u] + ":0", i[1 - l] + ":auto", r[1 - u] + ":auto", ""].join("!important;"), t.appendChild(a), n.push(a);}return n;}function me(t, e, n) {for (var i = n ? "invTrans" : "trans", r = e[i], o = e.srcCoords, a = !0, s = [], l = [], u = 0; 4 > u; u++) {var h = t[u].getBoundingClientRect(),c = 2 * u,d = h.left,f = h.top;s.push(d, f), a = a && o && d === o[c] && f === o[c + 1], l.push(t[u].offsetLeft, t[u].offsetTop);}return a && r ? r : (e.srcCoords = s, e[i] = n ? fe(l, s) : fe(s, l));}function ye(t) {return "CANVAS" === t.nodeName.toUpperCase();}function _e(t, e, n, i) {return n = n || {}, i || !Wf.canvasSupported ? xe(t, e, n) : Wf.browser.firefox && null != e.layerX && e.layerX !== e.offsetX ? (n.zrX = e.layerX, n.zrY = e.layerY) : null != e.offsetX ? (n.zrX = e.offsetX, n.zrY = e.offsetY) : xe(t, e, n), n;}function xe(t, e, n) {if (Wf.domSupported && t.getBoundingClientRect) {var i = e.clientX,r = e.clientY;if (ye(t)) {var o = t.getBoundingClientRect();return n.zrX = i - o.left, void (n.zrY = r - o.top);}if (ge(mp, t, i, r)) return n.zrX = mp[0], void (n.zrY = mp[1]);}n.zrX = n.zrY = 0;}function we(t) {return t || window.event;}function be(t, e, n) {if (e = we(e), null != e.zrX) return e;var i = e.type,r = i && i.indexOf("touch") >= 0;if (r) {var o = "touchend" !== i ? e.targetTouches[0] : e.changedTouches[0];o && _e(t, o, e, n);} else _e(t, e, e, n), e.zrDelta = e.wheelDelta ? e.wheelDelta / 120 : -(e.detail || 0) / 3;var a = e.button;return null == e.which && void 0 !== a && vp.test(e.type) && (e.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0), e;}function Se(t, e, n, i) {gp ? t.addEventListener(e, n, i) : t.attachEvent("on" + e, n);}function Me(t, e, n, i) {gp ? t.removeEventListener(e, n, i) : t.detachEvent("on" + e, n);}function Ce(t) {var e = t[1][0] - t[0][0],n = t[1][1] - t[0][1];return Math.sqrt(e * e + n * n);}function Ie(t) {return [(t[0][0] + t[1][0]) / 2, (t[0][1] + t[1][1]) / 2];}function Te(t, e, n) {return { type: t, event: n, target: e.target, topTarget: e.topTarget, cancelBubble: !1, offsetX: n.zrX, offsetY: n.zrY, gestureEvent: n.gestureEvent, pinchX: n.pinchX, pinchY: n.pinchY, pinchScale: n.pinchScale, wheelDelta: n.zrDelta, zrByTouch: n.zrByTouch, which: n.which, stop: ke };}function ke() {yp(this.event);}function De() {}function Ae(t, e, n) {if (t[t.rectHover ? "rectContain" : "contain"](e, n)) {for (var i, r = t; r;) {if (r.clipPath && !r.clipPath.contain(e, n)) return !1;r.silent && (i = !0), r = r.parent;}return i ? wp : !0;}return !1;}function Pe(t, e, n) {var i = t.painter;return 0 > e || e > i.getWidth() || 0 > n || n > i.getHeight();}function Oe() {var t = new Mp(6);return Le(t), t;}function Le(t) {return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = 0, t[5] = 0, t;}function Be(t, e) {return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t;}function ze(t, e, n) {var i = e[0] * n[0] + e[2] * n[1],r = e[1] * n[0] + e[3] * n[1],o = e[0] * n[2] + e[2] * n[3],a = e[1] * n[2] + e[3] * n[3],s = e[0] * n[4] + e[2] * n[5] + e[4],l = e[1] * n[4] + e[3] * n[5] + e[5];return t[0] = i, t[1] = r, t[2] = o, t[3] = a, t[4] = s, t[5] = l, t;}function Ee(t, e, n) {return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4] + n[0], t[5] = e[5] + n[1], t;}function Re(t, e, n) {var i = e[0],r = e[2],o = e[4],a = e[1],s = e[3],l = e[5],u = Math.sin(n),h = Math.cos(n);return t[0] = i * h + a * u, t[1] = -i * u + a * h, t[2] = r * h + s * u, t[3] = -r * u + h * s, t[4] = h * o + u * l, t[5] = h * l - u * o, t;}function Ne(t, e, n) {var i = n[0],r = n[1];return t[0] = e[0] * i, t[1] = e[1] * r, t[2] = e[2] * i, t[3] = e[3] * r, t[4] = e[4] * i, t[5] = e[5] * r, t;}function Fe(t, e) {var n = e[0],i = e[2],r = e[4],o = e[1],a = e[3],s = e[5],l = n * a - o * i;return l ? (l = 1 / l, t[0] = a * l, t[1] = -o * l, t[2] = -i * l, t[3] = n * l, t[4] = (i * s - a * r) * l, t[5] = (o * r - n * s) * l, t) : null;}function He(t) {var e = Oe();return Be(e, t), e;}function Ve(t) {return t > Tp || -Tp > t;}function Ge(t) {this._target = t.target, this._life = t.life || 1e3, this._delay = t.delay || 0, this._initialized = !1, this.loop = null == t.loop ? !1 : t.loop, this.gap = t.gap || 0, this.easing = t.easing || "Linear", this.onframe = t.onframe, this.ondestroy = t.ondestroy, this.onrestart = t.onrestart, this._pausedTime = 0, this._paused = !1;}function We(t) {return t = Math.round(t), 0 > t ? 0 : t > 255 ? 255 : t;}function Xe(t) {return t = Math.round(t), 0 > t ? 0 : t > 360 ? 360 : t;}function Ye(t) {return 0 > t ? 0 : t > 1 ? 1 : t;}function Ue(t) {return We(t.length && "%" === t.charAt(t.length - 1) ? parseFloat(t) / 100 * 255 : parseInt(t, 10));}function je(t) {return Ye(t.length && "%" === t.charAt(t.length - 1) ? parseFloat(t) / 100 : parseFloat(t));}function qe(t, e, n) {return 0 > n ? n += 1 : n > 1 && (n -= 1), 1 > 6 * n ? t + (e - t) * n * 6 : 1 > 2 * n ? e : 2 > 3 * n ? t + (e - t) * (2 / 3 - n) * 6 : t;}function Ze(t, e, n) {return t + (e - t) * n;}function Ke(t, e, n, i, r) {return t[0] = e, t[1] = n, t[2] = i, t[3] = r, t;}function $e(t, e) {return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t;}function Qe(t, e) {Vp && $e(Vp, e), Vp = Hp.put(t, Vp || e.slice());}function Je(t, e) {if (t) {e = e || [];var n = Hp.get(t);if (n) return $e(e, n);t += "";var i = t.replace(/ /g, "").toLowerCase();if (i in Fp) return $e(e, Fp[i]), Qe(t, e), e;if ("#" !== i.charAt(0)) {var r = i.indexOf("("),o = i.indexOf(")");if (-1 !== r && o + 1 === i.length) {var a = i.substr(0, r),s = i.substr(r + 1, o - (r + 1)).split(","),l = 1;switch (a) {case "rgba":if (4 !== s.length) return void Ke(e, 0, 0, 0, 1);l = je(s.pop());case "rgb":return 3 !== s.length ? void Ke(e, 0, 0, 0, 1) : (Ke(e, Ue(s[0]), Ue(s[1]), Ue(s[2]), l), Qe(t, e), e);case "hsla":return 4 !== s.length ? void Ke(e, 0, 0, 0, 1) : (s[3] = je(s[3]), tn(s, e), Qe(t, e), e);case "hsl":return 3 !== s.length ? void Ke(e, 0, 0, 0, 1) : (tn(s, e), Qe(t, e), e);default:return;}}Ke(e, 0, 0, 0, 1);} else {if (4 === i.length) {var u = parseInt(i.substr(1), 16);return u >= 0 && 4095 >= u ? (Ke(e, (3840 & u) >> 4 | (3840 & u) >> 8, 240 & u | (240 & u) >> 4, 15 & u | (15 & u) << 4, 1), Qe(t, e), e) : void Ke(e, 0, 0, 0, 1);}if (7 === i.length) {var u = parseInt(i.substr(1), 16);return u >= 0 && 16777215 >= u ? (Ke(e, (16711680 & u) >> 16, (65280 & u) >> 8, 255 & u, 1), Qe(t, e), e) : void Ke(e, 0, 0, 0, 1);}}}}function tn(t, e) {var n = (parseFloat(t[0]) % 360 + 360) % 360 / 360,i = je(t[1]),r = je(t[2]),o = .5 >= r ? r * (i + 1) : r + i - r * i,a = 2 * r - o;return e = e || [], Ke(e, We(255 * qe(a, o, n + 1 / 3)), We(255 * qe(a, o, n)), We(255 * qe(a, o, n - 1 / 3)), 1), 4 === t.length && (e[3] = t[3]), e;}function en(t) {if (t) {var e,n,i = t[0] / 255,r = t[1] / 255,o = t[2] / 255,a = Math.min(i, r, o),s = Math.max(i, r, o),l = s - a,u = (s + a) / 2;if (0 === l) e = 0, n = 0;else {n = .5 > u ? l / (s + a) : l / (2 - s - a);var h = ((s - i) / 6 + l / 2) / l,c = ((s - r) / 6 + l / 2) / l,d = ((s - o) / 6 + l / 2) / l;i === s ? e = d - c : r === s ? e = 1 / 3 + h - d : o === s && (e = 2 / 3 + c - h), 0 > e && (e += 1), e > 1 && (e -= 1);}var f = [360 * e, n, u];return null != t[3] && f.push(t[3]), f;}}function nn(t, e) {var n = Je(t);if (n) {for (var i = 0; 3 > i; i++) {n[i] = 0 > e ? n[i] * (1 - e) | 0 : (255 - n[i]) * e + n[i] | 0, n[i] > 255 ? n[i] = 255 : t[i] < 0 && (n[i] = 0);}return un(n, 4 === n.length ? "rgba" : "rgb");}}function rn(t) {var e = Je(t);return e ? ((1 << 24) + (e[0] << 16) + (e[1] << 8) + +e[2]).toString(16).slice(1) : void 0;}function on(t, e, n) {if (e && e.length && t >= 0 && 1 >= t) {n = n || [];var i = t * (e.length - 1),r = Math.floor(i),o = Math.ceil(i),a = e[r],s = e[o],l = i - r;return n[0] = We(Ze(a[0], s[0], l)), n[1] = We(Ze(a[1], s[1], l)), n[2] = We(Ze(a[2], s[2], l)), n[3] = Ye(Ze(a[3], s[3], l)), n;}}function an(t, e, n) {if (e && e.length && t >= 0 && 1 >= t) {var i = t * (e.length - 1),r = Math.floor(i),o = Math.ceil(i),a = Je(e[r]),s = Je(e[o]),l = i - r,u = un([We(Ze(a[0], s[0], l)), We(Ze(a[1], s[1], l)), We(Ze(a[2], s[2], l)), Ye(Ze(a[3], s[3], l))], "rgba");return n ? { color: u, leftIndex: r, rightIndex: o, value: i } : u;}}function sn(t, e, n, i) {return t = Je(t), t ? (t = en(t), null != e && (t[0] = Xe(e)), null != n && (t[1] = je(n)), null != i && (t[2] = je(i)), un(tn(t), "rgba")) : void 0;}function ln(t, e) {return t = Je(t), t && null != e ? (t[3] = Ye(e), un(t, "rgba")) : void 0;}function un(t, e) {if (t && t.length) {var n = t[0] + "," + t[1] + "," + t[2];return ("rgba" === e || "hsva" === e || "hsla" === e) && (n += "," + t[3]), e + "(" + n + ")";}}function hn(t, e) {return t[e];}function cn(t, e, n) {t[e] = n;}function dn(t, e, n) {return (e - t) * n + t;}function fn(t, e, n) {return n > .5 ? e : t;}function pn(t, e, n, i, r) {var o = t.length;if (1 === r) for (var a = 0; o > a; a++) {i[a] = dn(t[a], e[a], n);} else for (var s = o && t[0].length, a = 0; o > a; a++) {for (var l = 0; s > l; l++) {i[a][l] = dn(t[a][l], e[a][l], n);}}}function gn(t, e, n) {var i = t.length,r = e.length;if (i !== r) {var o = i > r;if (o) t.length = r;else for (var a = i; r > a; a++) {t.push(1 === n ? e[a] : Yp.call(e[a]));}}for (var s = t[0] && t[0].length, a = 0; a < t.length; a++) {if (1 === n) isNaN(t[a]) && (t[a] = e[a]);else for (var l = 0; s > l; l++) {isNaN(t[a][l]) && (t[a][l] = e[a][l]);}}}function vn(t, e, n) {if (t === e) return !0;var i = t.length;if (i !== e.length) return !1;if (1 === n) {for (var r = 0; i > r; r++) {if (t[r] !== e[r]) return !1;}} else for (var o = t[0].length, r = 0; i > r; r++) {for (var a = 0; o > a; a++) {if (t[r][a] !== e[r][a]) return !1;}}return !0;}function mn(t, e, n, i, r, o, a, s, l) {var u = t.length;if (1 === l) for (var h = 0; u > h; h++) {s[h] = yn(t[h], e[h], n[h], i[h], r, o, a);} else for (var c = t[0].length, h = 0; u > h; h++) {for (var d = 0; c > d; d++) {s[h][d] = yn(t[h][d], e[h][d], n[h][d], i[h][d], r, o, a);}}}function yn(t, e, n, i, r, o, a) {var s = .5 * (n - t),l = .5 * (i - e);return (2 * (e - n) + s + l) * a + (-3 * (e - n) - 2 * s - l) * o + s * r + e;}function _n(t) {if (d(t)) {var e = t.length;if (d(t[0])) {for (var n = [], i = 0; e > i; i++) {n.push(Yp.call(t[i]));}return n;}return Yp.call(t);}return t;}function xn(t) {return t[0] = Math.floor(t[0]), t[1] = Math.floor(t[1]), t[2] = Math.floor(t[2]), "rgba(" + t.join(",") + ")";}function wn(t) {var e = t[t.length - 1].value;return d(e && e[0]) ? 2 : 1;}function bn(t, e, n, i, r, o) {var a = t._getter,s = t._setter,l = "spline" === e,u = i.length;if (u) {var h,c = i[0].value,f = d(c),p = !1,g = !1,v = f ? wn(i) : 0;i.sort(function (t, e) {return t.time - e.time;}), h = i[u - 1].time;for (var m = [], y = [], _ = i[0].value, x = !0, w = 0; u > w; w++) {m.push(i[w].time / h);var b = i[w].value;if (f && vn(b, _, v) || !f && b === _ || (x = !1), _ = b, "string" == typeof b) {var S = Je(b);S ? (b = S, p = !0) : g = !0;}y.push(b);}if (o || !x) {for (var M = y[u - 1], w = 0; u - 1 > w; w++) {f ? gn(y[w], M, v) : !isNaN(y[w]) || isNaN(M) || g || p || (y[w] = M);}f && gn(a(t._target, r), M, v);var C,I,T,k,D,A,P = 0,O = 0;if (p) var L = [0, 0, 0, 0];var B = function B(t, e) {var n;if (0 > e) n = 0;else if (O > e) {for (C = Math.min(P + 1, u - 1), n = C; n >= 0 && !(m[n] <= e); n--) {;}n = Math.min(n, u - 2);} else {for (n = P; u > n && !(m[n] > e); n++) {;}n = Math.min(n - 1, u - 2);}P = n, O = e;var i = m[n + 1] - m[n];if (0 !== i) if (I = (e - m[n]) / i, l) {if (k = y[n], T = y[0 === n ? n : n - 1], D = y[n > u - 2 ? u - 1 : n + 1], A = y[n > u - 3 ? u - 1 : n + 2], f) mn(T, k, D, A, I, I * I, I * I * I, a(t, r), v);else {var o;if (p) o = mn(T, k, D, A, I, I * I, I * I * I, L, 1), o = xn(L);else {if (g) return fn(k, D, I);o = yn(T, k, D, A, I, I * I, I * I * I);}s(t, r, o);}} else if (f) pn(y[n], y[n + 1], I, a(t, r), v);else {var o;if (p) pn(y[n], y[n + 1], I, L, 1), o = xn(L);else {if (g) return fn(y[n], y[n + 1], I);o = dn(y[n], y[n + 1], I);}s(t, r, o);}},z = new Ge({ target: t._target, life: h, loop: t._loop, delay: t._delay, onframe: B, ondestroy: n });return e && "spline" !== e && (z.easing = e), z;}}}function Sn(t, e, n, i, r, o, a, s) {function l() {h--, h || o && o();}b(i) ? (o = r, r = i, i = 0) : w(r) ? (o = r, r = "linear", i = 0) : w(i) ? (o = i, i = 0) : w(n) ? (o = n, n = 500) : n || (n = 500), t.stopAnimation(), Mn(t, "", t, e, n, i, s);var u = t.animators.slice(),h = u.length;h || o && o();for (var c = 0; c < u.length; c++) {u[c].done(l).start(r, a);}}function Mn(t, e, n, i, r, o, a) {var s = {},l = 0;for (var u in i) {i.hasOwnProperty(u) && (null != n[u] ? S(i[u]) && !d(i[u]) ? Mn(t, e ? e + "." + u : u, n[u], i[u], r, o, a) : (a ? (s[u] = n[u], Cn(t, e, u, i[u])) : s[u] = i[u], l++) : null == i[u] || a || Cn(t, e, u, i[u]));}l > 0 && t.animate(e, !1).when(null == r ? 500 : r, s).delay(o || 0);}function Cn(t, e, n, i) {if (e) {var r = {};r[e] = {}, r[e][n] = i, t.attr(r);} else t.attr(n, i);}function In(t, e, n, i) {0 > n && (t += n, n = -n), 0 > i && (e += i, i = -i), this.x = t, this.y = e, this.width = n, this.height = i;}function Tn(t) {for (var e = 0; t >= rg;) {e |= 1 & t, t >>= 1;}return t + e;}function kn(t, e, n, i) {var r = e + 1;if (r === n) return 1;if (i(t[r++], t[e]) < 0) {for (; n > r && i(t[r], t[r - 1]) < 0;) {r++;}Dn(t, e, r);} else for (; n > r && i(t[r], t[r - 1]) >= 0;) {r++;}return r - e;}function Dn(t, e, n) {for (n--; n > e;) {var i = t[e];t[e++] = t[n], t[n--] = i;}}function An(t, e, n, i, r) {for (i === e && i++; n > i; i++) {for (var o, a = t[i], s = e, l = i; l > s;) {o = s + l >>> 1, r(a, t[o]) < 0 ? l = o : s = o + 1;}var u = i - s;switch (u) {case 3:t[s + 3] = t[s + 2];case 2:t[s + 2] = t[s + 1];case 1:t[s + 1] = t[s];break;default:for (; u > 0;) {t[s + u] = t[s + u - 1], u--;}}t[s] = a;}}function Pn(t, e, n, i, r, o) {var a = 0,s = 0,l = 1;if (o(t, e[n + r]) > 0) {for (s = i - r; s > l && o(t, e[n + r + l]) > 0;) {a = l, l = (l << 1) + 1, 0 >= l && (l = s);}l > s && (l = s), a += r, l += r;} else {for (s = r + 1; s > l && o(t, e[n + r - l]) <= 0;) {a = l, l = (l << 1) + 1, 0 >= l && (l = s);}l > s && (l = s);var u = a;a = r - l, l = r - u;}for (a++; l > a;) {var h = a + (l - a >>> 1);o(t, e[n + h]) > 0 ? a = h + 1 : l = h;}return l;}function On(t, e, n, i, r, o) {var a = 0,s = 0,l = 1;if (o(t, e[n + r]) < 0) {for (s = r + 1; s > l && o(t, e[n + r - l]) < 0;) {a = l, l = (l << 1) + 1, 0 >= l && (l = s);}l > s && (l = s);var u = a;a = r - l, l = r - u;} else {for (s = i - r; s > l && o(t, e[n + r + l]) >= 0;) {a = l, l = (l << 1) + 1, 0 >= l && (l = s);}l > s && (l = s), a += r, l += r;}for (a++; l > a;) {var h = a + (l - a >>> 1);o(t, e[n + h]) < 0 ? l = h : a = h + 1;}return l;}function Ln(t, e) {function n(t, e) {l[c] = t, u[c] = e, c += 1;}function i() {for (; c > 1;) {var t = c - 2;if (t >= 1 && u[t - 1] <= u[t] + u[t + 1] || t >= 2 && u[t - 2] <= u[t] + u[t - 1]) u[t - 1] < u[t + 1] && t--;else if (u[t] > u[t + 1]) break;o(t);}}function r() {for (; c > 1;) {var t = c - 2;t > 0 && u[t - 1] < u[t + 1] && t--, o(t);}}function o(n) {var i = l[n],r = u[n],o = l[n + 1],h = u[n + 1];u[n] = r + h, n === c - 3 && (l[n + 1] = l[n + 2], u[n + 1] = u[n + 2]), c--;var d = On(t[o], t, i, r, 0, e);i += d, r -= d, 0 !== r && (h = Pn(t[i + r - 1], t, o, h, h - 1, e), 0 !== h && (h >= r ? a(i, r, o, h) : s(i, r, o, h)));}function a(n, i, r, o) {var a = 0;for (a = 0; i > a; a++) {d[a] = t[n + a];}var s = 0,l = r,u = n;if (t[u++] = t[l++], 0 !== --o) {if (1 === i) {for (a = 0; o > a; a++) {t[u + a] = t[l + a];}return void (t[u + o] = d[s]);}for (var c, f, p, g = h;;) {c = 0, f = 0, p = !1;do {if (e(t[l], d[s]) < 0) {if (t[u++] = t[l++], f++, c = 0, 0 === --o) {p = !0;break;}} else if (t[u++] = d[s++], c++, f = 0, 1 === --i) {p = !0;break;}} while (g > (c | f));if (p) break;do {if (c = On(t[l], d, s, i, 0, e), 0 !== c) {for (a = 0; c > a; a++) {t[u + a] = d[s + a];}if (u += c, s += c, i -= c, 1 >= i) {p = !0;break;}}if (t[u++] = t[l++], 0 === --o) {p = !0;break;}if (f = Pn(d[s], t, l, o, 0, e), 0 !== f) {for (a = 0; f > a; a++) {t[u + a] = t[l + a];}if (u += f, l += f, o -= f, 0 === o) {p = !0;break;}}if (t[u++] = d[s++], 1 === --i) {p = !0;break;}g--;} while (c >= og || f >= og);if (p) break;0 > g && (g = 0), g += 2;}if (h = g, 1 > h && (h = 1), 1 === i) {for (a = 0; o > a; a++) {t[u + a] = t[l + a];}t[u + o] = d[s];} else {if (0 === i) throw new Error();for (a = 0; i > a; a++) {t[u + a] = d[s + a];}}} else for (a = 0; i > a; a++) {t[u + a] = d[s + a];}}function s(n, i, r, o) {var a = 0;for (a = 0; o > a; a++) {d[a] = t[r + a];}var s = n + i - 1,l = o - 1,u = r + o - 1,c = 0,f = 0;if (t[u--] = t[s--], 0 !== --i) {if (1 === o) {for (u -= i, s -= i, f = u + 1, c = s + 1, a = i - 1; a >= 0; a--) {t[f + a] = t[c + a];}return void (t[u] = d[l]);}for (var p = h;;) {var g = 0,v = 0,m = !1;do {if (e(d[l], t[s]) < 0) {if (t[u--] = t[s--], g++, v = 0, 0 === --i) {m = !0;break;}} else if (t[u--] = d[l--], v++, g = 0, 1 === --o) {m = !0;break;}} while (p > (g | v));if (m) break;do {if (g = i - On(d[l], t, n, i, i - 1, e), 0 !== g) {for (u -= g, s -= g, i -= g, f = u + 1, c = s + 1, a = g - 1; a >= 0; a--) {t[f + a] = t[c + a];}if (0 === i) {m = !0;break;}}if (t[u--] = d[l--], 1 === --o) {m = !0;break;}if (v = o - Pn(t[s], d, 0, o, o - 1, e), 0 !== v) {for (u -= v, l -= v, o -= v, f = u + 1, c = l + 1, a = 0; v > a; a++) {t[f + a] = d[c + a];}if (1 >= o) {m = !0;break;}}if (t[u--] = t[s--], 0 === --i) {m = !0;break;}p--;} while (g >= og || v >= og);if (m) break;0 > p && (p = 0), p += 2;}if (h = p, 1 > h && (h = 1), 1 === o) {for (u -= i, s -= i, f = u + 1, c = s + 1, a = i - 1; a >= 0; a--) {t[f + a] = t[c + a];}t[u] = d[l];} else {if (0 === o) throw new Error();for (c = u - (o - 1), a = 0; o > a; a++) {t[c + a] = d[a];}}} else for (c = u - (o - 1), a = 0; o > a; a++) {t[c + a] = d[a];}}var l,u,h = og,c = 0,d = [];l = [], u = [], this.mergeRuns = i, this.forceMergeRuns = r, this.pushRun = n;}function Bn(t, e, n, i) {n || (n = 0), i || (i = t.length);var r = i - n;if (!(2 > r)) {var o = 0;if (rg > r) return o = kn(t, n, i, e), void An(t, n, i, n + o, e);var a = new Ln(t, e),s = Tn(r);do {if (o = kn(t, n, i, e), s > o) {var l = r;l > s && (l = s), An(t, n, n + l, n + o, e), o = l;}a.pushRun(n, o), a.mergeRuns(), r -= o, n += o;} while (0 !== r);a.forceMergeRuns();}}function zn(t, e) {return t.zlevel === e.zlevel ? t.z === e.z ? t.z2 - e.z2 : t.z - e.z : t.zlevel - e.zlevel;}function En(t, e, n) {var i = null == e.x ? 0 : e.x,r = null == e.x2 ? 1 : e.x2,o = null == e.y ? 0 : e.y,a = null == e.y2 ? 0 : e.y2;e.global || (i = i * n.width + n.x, r = r * n.width + n.x, o = o * n.height + n.y, a = a * n.height + n.y), i = isNaN(i) ? 0 : i, r = isNaN(r) ? 1 : r, o = isNaN(o) ? 0 : o, a = isNaN(a) ? 0 : a;var s = t.createLinearGradient(i, o, r, a);return s;}function Rn(t, e, n) {var i = n.width,r = n.height,o = Math.min(i, r),a = null == e.x ? .5 : e.x,s = null == e.y ? .5 : e.y,l = null == e.r ? .5 : e.r;e.global || (a = a * i + n.x, s = s * r + n.y, l *= o);var u = t.createRadialGradient(a, s, 0, a, s, l);return u;}function Nn() {return !1;}function Fn(t, e, n) {var i = tp(),r = e.getWidth(),o = e.getHeight(),a = i.style;return a && (a.position = "absolute", a.left = 0, a.top = 0, a.width = r + "px", a.height = o + "px", i.setAttribute("data-zr-dom-id", t)), i.width = r * n, i.height = o * n, i;}function Hn(t) {if ("string" == typeof t) {var e = _g.get(t);return e && e.image;}return t;}function Vn(t, e, n, i, r) {if (t) {if ("string" == typeof t) {if (e && e.__zrImageSrc === t || !n) return e;var o = _g.get(t),a = { hostEl: n, cb: i, cbPayload: r };return o ? (e = o.image, !Wn(e) && o.pending.push(a)) : (e = new Image(), e.onload = e.onerror = Gn, _g.put(t, e.__cachedImgObj = { image: e, pending: [a] }), e.src = e.__zrImageSrc = t), e;}return t;}return e;}function Gn() {var t = this.__cachedImgObj;this.onload = this.onerror = this.__cachedImgObj = null;for (var e = 0; e < t.pending.length; e++) {var n = t.pending[e],i = n.cb;i && i(this, n.cbPayload), n.hostEl.dirty();}t.pending.length = 0;}function Wn(t) {return t && t.width && t.height;}function Xn(t, e) {e = e || Mg;var n = t + ":" + e;if (xg[n]) return xg[n];for (var i = (t + "").split("\n"), r = 0, o = 0, a = i.length; a > o; o++) {r = Math.max(ni(i[o], e).width, r);}return wg > bg && (wg = 0, xg = {}), wg++, xg[n] = r, r;}function Yn(t, e, n, i, r, o, a, s) {return a ? jn(t, e, n, i, r, o, a, s) : Un(t, e, n, i, r, o, s);}function Un(t, e, n, i, r, o, a) {var s = ii(t, e, r, o, a),l = Xn(t, e);r && (l += r[1] + r[3]);var u = s.outerHeight,h = qn(0, l, n),c = Zn(0, u, i),d = new In(h, c, l, u);return d.lineHeight = s.lineHeight, d;}function jn(t, e, n, i, r, o, a, s) {var l = ri(t, { rich: a, truncate: s, font: e, textAlign: n, textPadding: r, textLineHeight: o }),u = l.outerWidth,h = l.outerHeight,c = qn(0, u, n),d = Zn(0, h, i);return new In(c, d, u, h);}function qn(t, e, n) {return "right" === n ? t -= e : "center" === n && (t -= e / 2), t;}function Zn(t, e, n) {return "middle" === n ? t -= e / 2 : "bottom" === n && (t -= e), t;}function Kn(t, e, n) {var i = e.textPosition,r = e.textDistance,o = n.x,a = n.y;r = r || 0;var s = n.height,l = n.width,u = s / 2,h = "left",c = "top";switch (i) {case "left":o -= r, a += u, h = "right", c = "middle";break;case "right":o += r + l, a += u, c = "middle";break;case "top":o += l / 2, a -= r, h = "center", c = "bottom";break;case "bottom":o += l / 2, a += s + r, h = "center";break;case "inside":o += l / 2, a += u, h = "center", c = "middle";break;case "insideLeft":o += r, a += u, c = "middle";break;case "insideRight":o += l - r, a += u, h = "right", c = "middle";break;case "insideTop":o += l / 2, a += r, h = "center";break;case "insideBottom":o += l / 2, a += s - r, h = "center", c = "bottom";break;case "insideTopLeft":o += r, a += r;break;case "insideTopRight":o += l - r, a += r, h = "right";break;case "insideBottomLeft":o += r, a += s - r, c = "bottom";break;case "insideBottomRight":o += l - r, a += s - r, h = "right", c = "bottom";}return t = t || {}, t.x = o, t.y = a, t.textAlign = h, t.textVerticalAlign = c, t;}function $n(t, e, n, i, r) {if (!e) return "";var o = (t + "").split("\n");r = Qn(e, n, i, r);for (var a = 0, s = o.length; s > a; a++) {o[a] = Jn(o[a], r);}return o.join("\n");}function Qn(t, e, n, i) {i = a({}, i), i.font = e;var n = D(n, "...");i.maxIterations = D(i.maxIterations, 2);var r = i.minChar = D(i.minChar, 0);i.cnCharWidth = Xn("国", e);var o = i.ascCharWidth = Xn("a", e);i.placeholder = D(i.placeholder, "");for (var s = t = Math.max(0, t - 1), l = 0; r > l && s >= o; l++) {s -= o;}var u = Xn(n, e);return u > s && (n = "", u = 0), s = t - u, i.ellipsis = n, i.ellipsisWidth = u, i.contentWidth = s, i.containerWidth = t, i;}function Jn(t, e) {var n = e.containerWidth,i = e.font,r = e.contentWidth;if (!n) return "";var o = Xn(t, i);if (n >= o) return t;for (var a = 0;; a++) {if (r >= o || a >= e.maxIterations) {t += e.ellipsis;break;}var s = 0 === a ? ti(t, r, e.ascCharWidth, e.cnCharWidth) : o > 0 ? Math.floor(t.length * r / o) : 0;t = t.substr(0, s), o = Xn(t, i);}return "" === t && (t = e.placeholder), t;}function ti(t, e, n, i) {for (var r = 0, o = 0, a = t.length; a > o && e > r; o++) {var s = t.charCodeAt(o);r += s >= 0 && 127 >= s ? n : i;}return o;}function ei(t) {return Xn("国", t);}function ni(t, e) {return Cg.measureText(t, e);}function ii(t, e, n, i, r) {null != t && (t += "");var o = D(i, ei(e)),a = t ? t.split("\n") : [],s = a.length * o,l = s,u = !0;if (n && (l += n[0] + n[2]), t && r) {u = !1;var h = r.outerHeight,c = r.outerWidth;if (null != h && l > h) t = "", a = [];else if (null != c) for (var d = Qn(c - (n ? n[1] + n[3] : 0), e, r.ellipsis, { minChar: r.minChar, placeholder: r.placeholder }), f = 0, p = a.length; p > f; f++) {a[f] = Jn(a[f], d);}}return { lines: a, height: s, outerHeight: l, lineHeight: o, canCacheByTextString: u };}function ri(t, e) {var n = { lines: [], width: 0, height: 0 };if (null != t && (t += ""), !t) return n;for (var i, r = Sg.lastIndex = 0; null != (i = Sg.exec(t));) {var o = i.index;o > r && oi(n, t.substring(r, o)), oi(n, i[2], i[1]), r = Sg.lastIndex;}r < t.length && oi(n, t.substring(r, t.length));var a = n.lines,s = 0,l = 0,u = [],h = e.textPadding,c = e.truncate,d = c && c.outerWidth,f = c && c.outerHeight;h && (null != d && (d -= h[1] + h[3]), null != f && (f -= h[0] + h[2]));for (var p = 0; p < a.length; p++) {for (var g = a[p], v = 0, m = 0, y = 0; y < g.tokens.length; y++) {var _ = g.tokens[y],x = _.styleName && e.rich[_.styleName] || {},w = _.textPadding = x.textPadding,b = _.font = x.font || e.font,S = _.textHeight = D(x.textHeight, ei(b));if (w && (S += w[0] + w[2]), _.height = S, _.lineHeight = A(x.textLineHeight, e.textLineHeight, S), _.textAlign = x && x.textAlign || e.textAlign, _.textVerticalAlign = x && x.textVerticalAlign || "middle", null != f && s + _.lineHeight > f) return { lines: [], width: 0, height: 0 };_.textWidth = Xn(_.text, b);var M = x.textWidth,C = null == M || "auto" === M;if ("string" == typeof M && "%" === M.charAt(M.length - 1)) _.percentWidth = M, u.push(_), M = 0;else {if (C) {M = _.textWidth;var I = x.textBackgroundColor,T = I && I.image;T && (T = Hn(T), Wn(T) && (M = Math.max(M, T.width * S / T.height)));}var k = w ? w[1] + w[3] : 0;M += k;var P = null != d ? d - m : null;null != P && M > P && (!C || k > P ? (_.text = "", _.textWidth = M = 0) : (_.text = $n(_.text, P - k, b, c.ellipsis, { minChar: c.minChar }), _.textWidth = Xn(_.text, b), M = _.textWidth + k));}m += _.width = M, x && (v = Math.max(v, _.lineHeight));}g.width = m, g.lineHeight = v, s += v, l = Math.max(l, m);}n.outerWidth = n.width = D(e.textWidth, l), n.outerHeight = n.height = D(e.textHeight, s), h && (n.outerWidth += h[1] + h[3], n.outerHeight += h[0] + h[2]);for (var p = 0; p < u.length; p++) {var _ = u[p],O = _.percentWidth;_.width = parseInt(O, 10) / 100 * l;}return n;}function oi(t, e, n) {for (var i = "" === e, r = e.split("\n"), o = t.lines, a = 0; a < r.length; a++) {var s = r[a],l = { styleName: n, text: s, isLineHolder: !s && !i };if (a) o.push({ tokens: [l] });else {var u = (o[o.length - 1] || (o[0] = { tokens: [] })).tokens,h = u.length;1 === h && u[0].isLineHolder ? u[0] = l : (s || !h || i) && u.push(l);}}}function ai(t) {var e = (t.fontSize || t.fontFamily) && [t.fontStyle, t.fontWeight, (t.fontSize || 12) + "px", t.fontFamily || "sans-serif"].join(" ");return e && B(e) || t.textFont || t.font;}function si(t, e) {var n,i,r,o,a = e.x,s = e.y,l = e.width,u = e.height,h = e.r;0 > l && (a += l, l = -l), 0 > u && (s += u, u = -u), "number" == typeof h ? n = i = r = o = h : h instanceof Array ? 1 === h.length ? n = i = r = o = h[0] : 2 === h.length ? (n = r = h[0], i = o = h[1]) : 3 === h.length ? (n = h[0], i = o = h[1], r = h[2]) : (n = h[0], i = h[1], r = h[2], o = h[3]) : n = i = r = o = 0;var c;n + i > l && (c = n + i, n *= l / c, i *= l / c), r + o > l && (c = r + o, r *= l / c, o *= l / c), i + r > u && (c = i + r, i *= u / c, r *= u / c), n + o > u && (c = n + o, n *= u / c, o *= u / c), t.moveTo(a + n, s), t.lineTo(a + l - i, s), 0 !== i && t.arc(a + l - i, s + i, i, -Math.PI / 2, 0), t.lineTo(a + l, s + u - r), 0 !== r && t.arc(a + l - r, s + u - r, r, 0, Math.PI / 2), t.lineTo(a + o, s + u), 0 !== o && t.arc(a + o, s + u - o, o, Math.PI / 2, Math.PI), t.lineTo(a, s + n), 0 !== n && t.arc(a + n, s + n, n, Math.PI, 1.5 * Math.PI);}function li(t) {return ui(t), f(t.rich, ui), t;}function ui(t) {if (t) {t.font = ai(t);var e = t.textAlign;"middle" === e && (e = "center"), t.textAlign = null == e || Tg[e] ? e : "left";var n = t.textVerticalAlign || t.textBaseline;"center" === n && (n = "middle"), t.textVerticalAlign = null == n || kg[n] ? n : "top";var i = t.textPadding;i && (t.textPadding = O(t.textPadding));}}function hi(t, e, n, i, r, o) {i.rich ? di(t, e, n, i, r, o) : ci(t, e, n, i, r, o);}function ci(t, e, n, i, r, o) {var a,s = vi(i),l = !1,u = e.__attrCachedBy === ug.PLAIN_TEXT;o !== hg ? (o && (a = o.style, l = !s && u && a), e.__attrCachedBy = s ? ug.NONE : ug.PLAIN_TEXT) : u && (e.__attrCachedBy = ug.NONE);var h = i.font || Ig;l && h === (a.font || Ig) || (e.font = h);var c = t.__computedFont;t.__styleFont !== h && (t.__styleFont = h, c = t.__computedFont = e.font);var d = i.textPadding,f = i.textLineHeight,p = t.__textCotentBlock;(!p || t.__dirtyText) && (p = t.__textCotentBlock = ii(n, c, d, f, i.truncate));var g = p.outerHeight,v = p.lines,m = p.lineHeight,y = _i(Pg, t, i, r),_ = y.baseX,x = y.baseY,w = y.textAlign || "left",b = y.textVerticalAlign;pi(e, i, r, _, x);var S = Zn(x, g, b),M = _,C = S;if (s || d) {var I = Xn(n, c),T = I;d && (T += d[1] + d[3]);var k = qn(_, T, w);s && mi(t, e, i, k, S, T, g), d && (M = Mi(_, w, d), C += d[0]);}e.textAlign = w, e.textBaseline = "middle", e.globalAlpha = i.opacity || 1;for (var D = 0; D < Dg.length; D++) {var A = Dg[D],P = A[0],O = A[1],L = i[P];l && L === a[P] || (e[O] = lg(e, O, L || A[2]));}C += m / 2;var B = i.textStrokeWidth,z = l ? a.textStrokeWidth : null,E = !l || B !== z,R = !l || E || i.textStroke !== a.textStroke,N = wi(i.textStroke, B),F = bi(i.textFill);if (N && (E && (e.lineWidth = B), R && (e.strokeStyle = N)), F && (l && i.textFill === a.textFill || (e.fillStyle = F)), 1 === v.length) N && e.strokeText(v[0], M, C), F && e.fillText(v[0], M, C);else for (var D = 0; D < v.length; D++) {N && e.strokeText(v[D], M, C), F && e.fillText(v[D], M, C), C += m;}}function di(t, e, n, i, r, o) {o !== hg && (e.__attrCachedBy = ug.NONE);var a = t.__textCotentBlock;(!a || t.__dirtyText) && (a = t.__textCotentBlock = ri(n, i)), fi(t, e, a, i, r);}function fi(t, e, n, i, r) {var o = n.width,a = n.outerWidth,s = n.outerHeight,l = i.textPadding,u = _i(Pg, t, i, r),h = u.baseX,c = u.baseY,d = u.textAlign,f = u.textVerticalAlign;pi(e, i, r, h, c);var p = qn(h, a, d),g = Zn(c, s, f),v = p,m = g;l && (v += l[3], m += l[0]);var y = v + o;vi(i) && mi(t, e, i, p, g, a, s);for (var _ = 0; _ < n.lines.length; _++) {for (var x, w = n.lines[_], b = w.tokens, S = b.length, M = w.lineHeight, C = w.width, I = 0, T = v, k = y, D = S - 1; S > I && (x = b[I], !x.textAlign || "left" === x.textAlign);) {gi(t, e, x, i, M, m, T, "left"), C -= x.width, T += x.width, I++;}for (; D >= 0 && (x = b[D], "right" === x.textAlign);) {gi(t, e, x, i, M, m, k, "right"), C -= x.width, k -= x.width, D--;}for (T += (o - (T - v) - (y - k) - C) / 2; D >= I;) {x = b[I], gi(t, e, x, i, M, m, T + x.width / 2, "center"), T += x.width, I++;}m += M;}}function pi(t, e, n, i, r) {if (n && e.textRotation) {var o = e.textOrigin;"center" === o ? (i = n.width / 2 + n.x, r = n.height / 2 + n.y) : o && (i = o[0] + n.x, r = o[1] + n.y), t.translate(i, r), t.rotate(-e.textRotation), t.translate(-i, -r);}}function gi(t, e, n, i, r, o, a, s) {var l = i.rich[n.styleName] || {};l.text = n.text;var u = n.textVerticalAlign,h = o + r / 2;
    "top" === u ? h = o + n.height / 2 : "bottom" === u && (h = o + r - n.height / 2), !n.isLineHolder && vi(l) && mi(t, e, l, "right" === s ? a - n.width : "center" === s ? a - n.width / 2 : a, h - n.height / 2, n.width, n.height);var c = n.textPadding;c && (a = Mi(a, s, c), h -= n.height / 2 - c[2] - n.textHeight / 2), xi(e, "shadowBlur", A(l.textShadowBlur, i.textShadowBlur, 0)), xi(e, "shadowColor", l.textShadowColor || i.textShadowColor || "transparent"), xi(e, "shadowOffsetX", A(l.textShadowOffsetX, i.textShadowOffsetX, 0)), xi(e, "shadowOffsetY", A(l.textShadowOffsetY, i.textShadowOffsetY, 0)), xi(e, "textAlign", s), xi(e, "textBaseline", "middle"), xi(e, "font", n.font || Ig);var d = wi(l.textStroke || i.textStroke, p),f = bi(l.textFill || i.textFill),p = D(l.textStrokeWidth, i.textStrokeWidth);d && (xi(e, "lineWidth", p), xi(e, "strokeStyle", d), e.strokeText(n.text, a, h)), f && (xi(e, "fillStyle", f), e.fillText(n.text, a, h));}function vi(t) {return !!(t.textBackgroundColor || t.textBorderWidth && t.textBorderColor);}function mi(t, e, n, i, r, o, a) {var s = n.textBackgroundColor,l = n.textBorderWidth,u = n.textBorderColor,h = b(s);if (xi(e, "shadowBlur", n.textBoxShadowBlur || 0), xi(e, "shadowColor", n.textBoxShadowColor || "transparent"), xi(e, "shadowOffsetX", n.textBoxShadowOffsetX || 0), xi(e, "shadowOffsetY", n.textBoxShadowOffsetY || 0), h || l && u) {e.beginPath();var c = n.textBorderRadius;c ? si(e, { x: i, y: r, width: o, height: a, r: c }) : e.rect(i, r, o, a), e.closePath();}if (h) {if (xi(e, "fillStyle", s), null != n.fillOpacity) {var d = e.globalAlpha;e.globalAlpha = n.fillOpacity * n.opacity, e.fill(), e.globalAlpha = d;} else e.fill();} else if (S(s)) {var f = s.image;f = Vn(f, null, t, yi, s), f && Wn(f) && e.drawImage(f, i, r, o, a);}if (l && u) if (xi(e, "lineWidth", l), xi(e, "strokeStyle", u), null != n.strokeOpacity) {var d = e.globalAlpha;e.globalAlpha = n.strokeOpacity * n.opacity, e.stroke(), e.globalAlpha = d;} else e.stroke();}function yi(t, e) {e.image = t;}function _i(t, e, n, i) {var r = n.x || 0,o = n.y || 0,a = n.textAlign,s = n.textVerticalAlign;if (i) {var l = n.textPosition;if (l instanceof Array) r = i.x + Si(l[0], i.width), o = i.y + Si(l[1], i.height);else {var u = e && e.calculateTextPosition ? e.calculateTextPosition(Ag, n, i) : Kn(Ag, n, i);r = u.x, o = u.y, a = a || u.textAlign, s = s || u.textVerticalAlign;}var h = n.textOffset;h && (r += h[0], o += h[1]);}return t = t || {}, t.baseX = r, t.baseY = o, t.textAlign = a, t.textVerticalAlign = s, t;}function xi(t, e, n) {return t[e] = lg(t, e, n), t[e];}function wi(t, e) {return null == t || 0 >= e || "transparent" === t || "none" === t ? null : t.image || t.colorStops ? "#000" : t;}function bi(t) {return null == t || "none" === t ? null : t.image || t.colorStops ? "#000" : t;}function Si(t, e) {return "string" == typeof t ? t.lastIndexOf("%") >= 0 ? parseFloat(t) / 100 * e : parseFloat(t) : t;}function Mi(t, e, n) {return "right" === e ? t - n[1] : "center" === e ? t + n[3] / 2 - n[1] / 2 : t + n[3];}function Ci(t, e) {return null != t && (t || e.textBackgroundColor || e.textBorderWidth && e.textBorderColor || e.textPadding);}function Ii(t) {t = t || {}, Jp.call(this, t);for (var e in t) {t.hasOwnProperty(e) && "style" !== e && (this[e] = t[e]);}this.style = new dg(t.style, this), this._rect = null, this.__clipPaths = null;}function Ti(t) {Ii.call(this, t);}function ki(t) {return parseInt(t, 10);}function Di(t) {return t ? t.__builtin__ ? !0 : "function" != typeof t.resize || "function" != typeof t.refresh ? !1 : !0 : !1;}function Ai(t, e, n) {return Ng.copy(t.getBoundingRect()), t.transform && Ng.applyTransform(t.transform), Fg.width = e, Fg.height = n, !Ng.intersect(Fg);}function Pi(t, e) {if (t === e) return !1;if (!t || !e || t.length !== e.length) return !0;for (var n = 0; n < t.length; n++) {if (t[n] !== e[n]) return !0;}return !1;}function Oi(t, e) {for (var n = 0; n < t.length; n++) {var i = t[n];i.setTransform(e), e.beginPath(), i.buildPath(e, i.shape), e.clip(), i.restoreTransform(e);}}function Li(t, e) {var n = document.createElement("div");return n.style.cssText = ["position:relative", "width:" + t + "px", "height:" + e + "px", "padding:0", "margin:0", "border-width:0"].join(";") + ";", n;}function Bi(t) {return "mousewheel" === t && Wf.browser.firefox ? "DOMMouseScroll" : t;}function zi(t) {var e = t.pointerType;return "pen" === e || "touch" === e;}function Ei(t) {t.touching = !0, null != t.touchTimer && (clearTimeout(t.touchTimer), t.touchTimer = null), t.touchTimer = setTimeout(function () {t.touching = !1, t.touchTimer = null;}, 700);}function Ri(t) {t && (t.zrByTouch = !0);}function Ni(t, e) {return be(t.dom, new Hi(t, e), !0);}function Fi(t, e) {for (var n = e, i = !1; n && 9 !== n.nodeType && !(i = n.domBelongToZr || n !== e && n === t.painterRoot);) {n = n.parentNode;}return i;}function Hi(t, e) {this.type = e.type, this.target = this.currentTarget = t.dom, this.pointerType = e.pointerType, this.clientX = e.clientX, this.clientY = e.clientY;}function Vi(t, e) {var n = e.domHandlers;Wf.pointerEventsSupported ? f(Xg.pointer, function (i) {Wi(e, i, function (e) {n[i].call(t, e);});}) : (Wf.touchEventsSupported && f(Xg.touch, function (i) {Wi(e, i, function (r) {n[i].call(t, r), Ei(e);});}), f(Xg.mouse, function (i) {Wi(e, i, function (r) {r = we(r), e.touching || n[i].call(t, r);});}));}function Gi(t, e) {function n(n) {function i(i) {i = we(i), Fi(t, i.target) || (i = Ni(t, i), e.domHandlers[n].call(t, i));}Wi(e, n, i, { capture: !0 });}Wf.pointerEventsSupported ? f(Yg.pointer, n) : Wf.touchEventsSupported || f(Yg.mouse, n);}function Wi(t, e, n, i) {t.mounted[e] = n, t.listenerOpts[e] = i, Se(t.domTarget, Bi(e), n, i);}function Xi(t) {var e = t.mounted;for (var n in e) {e.hasOwnProperty(n) && Me(t.domTarget, Bi(n), e[n], t.listenerOpts[n]);}t.mounted = {};}function Yi(t, e) {if (t._mayPointerCapture = null, Wg && t._pointerCapturing ^ e) {t._pointerCapturing = e;var n = t._globalHandlerScope;e ? Gi(t, n) : Xi(n);}}function Ui(t, e) {this.domTarget = t, this.domHandlers = e, this.mounted = {}, this.listenerOpts = {}, this.touchTimer = null, this.touching = !1;}function ji(t, e) {cp.call(this), this.dom = t, this.painterRoot = e, this._localHandlerScope = new Ui(t, jg), Wg && (this._globalHandlerScope = new Ui(document, qg)), this._pointerCapturing = !1, this._mayPointerCapture = null, Vi(this, this._localHandlerScope);}function qi(t, e) {var n = new tv(Vf(), t, e);return Qg[n.id] = n, n;}function Zi(t) {if (t) t.dispose();else {for (var e in Qg) {Qg.hasOwnProperty(e) && Qg[e].dispose();}Qg = {};}return this;}function Ki(t) {return Qg[t];}function $i(t, e) {$g[t] = e;}function Qi(t) {delete Qg[t];}function Ji(t) {return t instanceof Array ? t : null == t ? [] : [t];}function tr(t, e, n) {if (t) {t[e] = t[e] || {}, t.emphasis = t.emphasis || {}, t.emphasis[e] = t.emphasis[e] || {};for (var i = 0, r = n.length; r > i; i++) {var o = n[i];!t.emphasis[e].hasOwnProperty(o) && t[e].hasOwnProperty(o) && (t.emphasis[e][o] = t[e][o]);}}}function er(t) {return !iv(t) || rv(t) || t instanceof Date ? t : t.value;}function nr(t) {return iv(t) && !(t instanceof Array);}function ir(t, e) {e = (e || []).slice();var n = p(t || [], function (t) {return { exist: t };});return nv(e, function (t, i) {if (iv(t)) {for (var r = 0; r < n.length; r++) {if (!n[r].option && null != t.id && n[r].exist.id === t.id + "") return n[r].option = t, void (e[i] = null);}for (var r = 0; r < n.length; r++) {var o = n[r].exist;if (!(n[r].option || null != o.id && null != t.id || null == t.name || ar(t) || ar(o) || o.name !== t.name + "")) return n[r].option = t, void (e[i] = null);}}}), nv(e, function (t) {if (iv(t)) {for (var e = 0; e < n.length; e++) {var i = n[e].exist;if (!n[e].option && !ar(i) && null == t.id) {n[e].option = t;break;}}e >= n.length && n.push({ option: t });}}), n;}function rr(t) {var e = N();nv(t, function (t) {var n = t.exist;n && e.set(n.id, t);}), nv(t, function (t) {var n = t.option;L(!n || null == n.id || !e.get(n.id) || e.get(n.id) === t, "id duplicates: " + (n && n.id)), n && null != n.id && e.set(n.id, t), !t.keyInfo && (t.keyInfo = {});}), nv(t, function (t, n) {var i = t.exist,r = t.option,o = t.keyInfo;if (iv(r)) {if (o.name = null != r.name ? r.name + "" : i ? i.name : ov + n, i) o.id = i.id;else if (null != r.id) o.id = r.id + "";else {var a = 0;do {o.id = "\x00" + o.name + "\x00" + a++;} while (e.get(o.id));}e.set(o.id, t);}});}function or(t) {var e = t.name;return !(!e || !e.indexOf(ov));}function ar(t) {return iv(t) && t.id && 0 === (t.id + "").indexOf("\x00_ec_\x00");}function sr(t, e) {return null != e.dataIndexInside ? e.dataIndexInside : null != e.dataIndex ? x(e.dataIndex) ? p(e.dataIndex, function (e) {return t.indexOfRawIndex(e);}) : t.indexOfRawIndex(e.dataIndex) : null != e.name ? x(e.name) ? p(e.name, function (e) {return t.indexOfName(e);}) : t.indexOfName(e.name) : void 0;}function lr() {var t = "__\x00ec_inner_" + sv++ + "_" + Math.random().toFixed(5);return function (e) {return e[t] || (e[t] = {});};}function ur(t, e, n) {if (b(e)) {var i = {};i[e + "Index"] = 0, e = i;}var r = n && n.defaultMainType;!r || hr(e, r + "Index") || hr(e, r + "Id") || hr(e, r + "Name") || (e[r + "Index"] = 0);var o = {};return nv(e, function (i, r) {var i = e[r];if ("dataIndex" === r || "dataIndexInside" === r) return void (o[r] = i);var a = r.match(/^(\w+)(Index|Id|Name)$/) || [],s = a[1],l = (a[2] || "").toLowerCase();if (!(!s || !l || null == i || "index" === l && "none" === i || n && n.includeMainTypes && u(n.includeMainTypes, s) < 0)) {var h = { mainType: s };("index" !== l || "all" !== i) && (h[l] = i);var c = t.queryComponents(h);o[s + "Models"] = c, o[s + "Model"] = c[0];}}), o;}function hr(t, e) {return t && t.hasOwnProperty(e);}function cr(t, e, n) {t.setAttribute ? t.setAttribute(e, n) : t[e] = n;}function dr(t, e) {return t.getAttribute ? t.getAttribute(e) : t[e];}function fr(t) {return "auto" === t ? Wf.domSupported ? "html" : "richText" : t || "html";}function pr(t) {var e = { main: "", sub: "" };return t && (t = t.split(lv), e.main = t[0] || "", e.sub = t[1] || ""), e;}function gr(t) {L(/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(t), 'componentType "' + t + '" illegal');}function vr(t) {t.$constructor = t, t.extend = function (t) {var e = this,n = function n() {t.$constructor ? t.$constructor.apply(this, arguments) : e.apply(this, arguments);};return a(n.prototype, t), n.extend = this.extend, n.superCall = yr, n.superApply = _r, h(n, this), n.superClass = e, n;};}function mr(t) {var e = ["__\x00is_clz", hv++, Math.random().toFixed(3)].join("_");t.prototype[e] = !0, t.isInstance = function (t) {return !(!t || !t[e]);};}function yr(t, e) {var n = P(arguments, 2);return this.superClass.prototype[e].apply(t, n);}function _r(t, e, n) {return this.superClass.prototype[e].apply(t, n);}function xr(t, e) {function n(t) {var e = i[t.main];return e && e[uv] || (e = i[t.main] = {}, e[uv] = !0), e;}e = e || {};var i = {};if (t.registerClass = function (t, e) {if (e) if (gr(e), e = pr(e), e.sub) {if (e.sub !== uv) {var r = n(e);r[e.sub] = t;}} else i[e.main] = t;return t;}, t.getClass = function (t, e, n) {var r = i[t];if (r && r[uv] && (r = e ? r[e] : null), n && !r) throw new Error(e ? "Component " + t + "." + (e || "") + " not exists. Load it first." : t + ".type should be specified.");return r;}, t.getClassesByMainType = function (t) {t = pr(t);var e = [],n = i[t.main];return n && n[uv] ? f(n, function (t, n) {n !== uv && e.push(t);}) : e.push(n), e;}, t.hasClass = function (t) {return t = pr(t), !!i[t.main];}, t.getAllClassMainTypes = function () {var t = [];return f(i, function (e, n) {t.push(n);}), t;}, t.hasSubTypes = function (t) {t = pr(t);var e = i[t.main];return e && e[uv];}, t.parseClassType = pr, e.registerWhenExtend) {var r = t.extend;r && (t.extend = function (e) {var n = r.call(this, e);return t.registerClass(n, e.type);});}return t;}function wr(t) {return t > -yv && yv > t;}function br(t) {return t > yv || -yv > t;}function Sr(t, e, n, i, r) {var o = 1 - r;return o * o * (o * t + 3 * r * e) + r * r * (r * i + 3 * o * n);}function Mr(t, e, n, i, r) {var o = 1 - r;return 3 * (((e - t) * o + 2 * (n - e) * r) * o + (i - n) * r * r);}function Cr(t, e, n, i, r, o) {var a = i + 3 * (e - n) - t,s = 3 * (n - 2 * e + t),l = 3 * (e - t),u = t - r,h = s * s - 3 * a * l,c = s * l - 9 * a * u,d = l * l - 3 * s * u,f = 0;if (wr(h) && wr(c)) {if (wr(s)) o[0] = 0;else {var p = -l / s;p >= 0 && 1 >= p && (o[f++] = p);}} else {var g = c * c - 4 * h * d;if (wr(g)) {var v = c / h,p = -s / a + v,m = -v / 2;p >= 0 && 1 >= p && (o[f++] = p), m >= 0 && 1 >= m && (o[f++] = m);} else if (g > 0) {var y = mv(g),_ = h * s + 1.5 * a * (-c + y),x = h * s + 1.5 * a * (-c - y);_ = 0 > _ ? -vv(-_, wv) : vv(_, wv), x = 0 > x ? -vv(-x, wv) : vv(x, wv);var p = (-s - (_ + x)) / (3 * a);p >= 0 && 1 >= p && (o[f++] = p);} else {var w = (2 * h * s - 3 * a * c) / (2 * mv(h * h * h)),b = Math.acos(w) / 3,S = mv(h),M = Math.cos(b),p = (-s - 2 * S * M) / (3 * a),m = (-s + S * (M + xv * Math.sin(b))) / (3 * a),C = (-s + S * (M - xv * Math.sin(b))) / (3 * a);p >= 0 && 1 >= p && (o[f++] = p), m >= 0 && 1 >= m && (o[f++] = m), C >= 0 && 1 >= C && (o[f++] = C);}}return f;}function Ir(t, e, n, i, r) {var o = 6 * n - 12 * e + 6 * t,a = 9 * e + 3 * i - 3 * t - 9 * n,s = 3 * e - 3 * t,l = 0;if (wr(a)) {if (br(o)) {var u = -s / o;u >= 0 && 1 >= u && (r[l++] = u);}} else {var h = o * o - 4 * a * s;if (wr(h)) r[0] = -o / (2 * a);else if (h > 0) {var c = mv(h),u = (-o + c) / (2 * a),d = (-o - c) / (2 * a);u >= 0 && 1 >= u && (r[l++] = u), d >= 0 && 1 >= d && (r[l++] = d);}}return l;}function Tr(t, e, n, i, r, o) {var a = (e - t) * r + t,s = (n - e) * r + e,l = (i - n) * r + n,u = (s - a) * r + a,h = (l - s) * r + s,c = (h - u) * r + u;o[0] = t, o[1] = a, o[2] = u, o[3] = c, o[4] = c, o[5] = h, o[6] = l, o[7] = i;}function kr(t, e, n, i, r, o, a, s, l, u, h) {var c,d,f,p,g,v = .005,m = 1 / 0;bv[0] = l, bv[1] = u;for (var y = 0; 1 > y; y += .05) {Sv[0] = Sr(t, n, r, a, y), Sv[1] = Sr(e, i, o, s, y), p = lp(bv, Sv), m > p && (c = y, m = p);}m = 1 / 0;for (var _ = 0; 32 > _ && !(_v > v); _++) {d = c - v, f = c + v, Sv[0] = Sr(t, n, r, a, d), Sv[1] = Sr(e, i, o, s, d), p = lp(Sv, bv), d >= 0 && m > p ? (c = d, m = p) : (Mv[0] = Sr(t, n, r, a, f), Mv[1] = Sr(e, i, o, s, f), g = lp(Mv, bv), 1 >= f && m > g ? (c = f, m = g) : v *= .5);}return h && (h[0] = Sr(t, n, r, a, c), h[1] = Sr(e, i, o, s, c)), mv(m);}function Dr(t, e, n, i) {var r = 1 - i;return r * (r * t + 2 * i * e) + i * i * n;}function Ar(t, e, n, i) {return 2 * ((1 - i) * (e - t) + i * (n - e));}function Pr(t, e, n, i, r) {var o = t - 2 * e + n,a = 2 * (e - t),s = t - i,l = 0;if (wr(o)) {if (br(a)) {var u = -s / a;u >= 0 && 1 >= u && (r[l++] = u);}} else {var h = a * a - 4 * o * s;if (wr(h)) {var u = -a / (2 * o);u >= 0 && 1 >= u && (r[l++] = u);} else if (h > 0) {var c = mv(h),u = (-a + c) / (2 * o),d = (-a - c) / (2 * o);u >= 0 && 1 >= u && (r[l++] = u), d >= 0 && 1 >= d && (r[l++] = d);}}return l;}function Or(t, e, n) {var i = t + n - 2 * e;return 0 === i ? .5 : (t - e) / i;}function Lr(t, e, n, i, r) {var o = (e - t) * i + t,a = (n - e) * i + e,s = (a - o) * i + o;r[0] = t, r[1] = o, r[2] = s, r[3] = s, r[4] = a, r[5] = n;}function Br(t, e, n, i, r, o, a, s, l) {var u,h = .005,c = 1 / 0;bv[0] = a, bv[1] = s;for (var d = 0; 1 > d; d += .05) {Sv[0] = Dr(t, n, r, d), Sv[1] = Dr(e, i, o, d);var f = lp(bv, Sv);c > f && (u = d, c = f);}c = 1 / 0;for (var p = 0; 32 > p && !(_v > h); p++) {var g = u - h,v = u + h;Sv[0] = Dr(t, n, r, g), Sv[1] = Dr(e, i, o, g);var f = lp(Sv, bv);if (g >= 0 && c > f) u = g, c = f;else {Mv[0] = Dr(t, n, r, v), Mv[1] = Dr(e, i, o, v);var m = lp(Mv, bv);1 >= v && c > m ? (u = v, c = m) : h *= .5;}}return l && (l[0] = Dr(t, n, r, u), l[1] = Dr(e, i, o, u)), mv(c);}function zr(t, e, n) {if (0 !== t.length) {var i,r = t[0],o = r[0],a = r[0],s = r[1],l = r[1];for (i = 1; i < t.length; i++) {r = t[i], o = Cv(o, r[0]), a = Iv(a, r[0]), s = Cv(s, r[1]), l = Iv(l, r[1]);}e[0] = o, e[1] = s, n[0] = a, n[1] = l;}}function Er(t, e, n, i, r, o) {r[0] = Cv(t, n), r[1] = Cv(e, i), o[0] = Iv(t, n), o[1] = Iv(e, i);}function Rr(t, e, n, i, r, o, a, s, l, u) {var h,c = Ir,d = Sr,f = c(t, n, r, a, Lv);for (l[0] = 1 / 0, l[1] = 1 / 0, u[0] = -1 / 0, u[1] = -1 / 0, h = 0; f > h; h++) {var p = d(t, n, r, a, Lv[h]);l[0] = Cv(p, l[0]), u[0] = Iv(p, u[0]);}for (f = c(e, i, o, s, Bv), h = 0; f > h; h++) {var g = d(e, i, o, s, Bv[h]);l[1] = Cv(g, l[1]), u[1] = Iv(g, u[1]);}l[0] = Cv(t, l[0]), u[0] = Iv(t, u[0]), l[0] = Cv(a, l[0]), u[0] = Iv(a, u[0]), l[1] = Cv(e, l[1]), u[1] = Iv(e, u[1]), l[1] = Cv(s, l[1]), u[1] = Iv(s, u[1]);}function Nr(t, e, n, i, r, o, a, s) {var l = Or,u = Dr,h = Iv(Cv(l(t, n, r), 1), 0),c = Iv(Cv(l(e, i, o), 1), 0),d = u(t, n, r, h),f = u(e, i, o, c);a[0] = Cv(t, r, d), a[1] = Cv(e, o, f), s[0] = Iv(t, r, d), s[1] = Iv(e, o, f);}function Fr(t, e, n, i, r, o, a, s, l) {var u = ae,h = se,c = Math.abs(r - o);if (1e-4 > c % Dv && c > 1e-4) return s[0] = t - n, s[1] = e - i, l[0] = t + n, void (l[1] = e + i);if (Av[0] = kv(r) * n + t, Av[1] = Tv(r) * i + e, Pv[0] = kv(o) * n + t, Pv[1] = Tv(o) * i + e, u(s, Av, Pv), h(l, Av, Pv), r %= Dv, 0 > r && (r += Dv), o %= Dv, 0 > o && (o += Dv), r > o && !a ? o += Dv : o > r && a && (r += Dv), a) {var d = o;o = r, r = d;}for (var f = 0; o > f; f += Math.PI / 2) {f > r && (Ov[0] = kv(f) * n + t, Ov[1] = Tv(f) * i + e, u(s, Ov, s), h(l, Ov, l));}}function Hr(t, e, n, i, r, o, a) {if (0 === r) return !1;var s = r,l = 0,u = t;if (a > e + s && a > i + s || e - s > a && i - s > a || o > t + s && o > n + s || t - s > o && n - s > o) return !1;if (t === n) return Math.abs(o - t) <= s / 2;l = (e - i) / (t - n), u = (t * i - n * e) / (t - n);var h = l * o - a + u,c = h * h / (l * l + 1);return s / 2 * s / 2 >= c;}function Vr(t, e, n, i, r, o, a, s, l, u, h) {if (0 === l) return !1;var c = l;if (h > e + c && h > i + c && h > o + c && h > s + c || e - c > h && i - c > h && o - c > h && s - c > h || u > t + c && u > n + c && u > r + c && u > a + c || t - c > u && n - c > u && r - c > u && a - c > u) return !1;var d = kr(t, e, n, i, r, o, a, s, u, h, null);return c / 2 >= d;}function Gr(t, e, n, i, r, o, a, s, l) {if (0 === a) return !1;var u = a;if (l > e + u && l > i + u && l > o + u || e - u > l && i - u > l && o - u > l || s > t + u && s > n + u && s > r + u || t - u > s && n - u > s && r - u > s) return !1;var h = Br(t, e, n, i, r, o, s, l, null);return u / 2 >= h;}function Wr(t) {return t %= qv, 0 > t && (t += qv), t;}function Xr(t, e, n, i, r, o, a, s, l) {if (0 === a) return !1;var u = a;s -= t, l -= e;var h = Math.sqrt(s * s + l * l);if (h - u > n || n > h + u) return !1;if (Math.abs(i - r) % Zv < 1e-4) return !0;if (o) {var c = i;i = Wr(r), r = Wr(c);} else i = Wr(i), r = Wr(r);i > r && (r += Zv);var d = Math.atan2(l, s);return 0 > d && (d += Zv), d >= i && r >= d || d + Zv >= i && r >= d + Zv;}function Yr(t, e, n, i, r, o) {if (o > e && o > i || e > o && i > o) return 0;if (i === e) return 0;var a = e > i ? 1 : -1,s = (o - e) / (i - e);(1 === s || 0 === s) && (a = e > i ? .5 : -.5);var l = s * (n - t) + t;return l === r ? 1 / 0 : l > r ? a : 0;}function Ur(t, e) {return Math.abs(t - e) < Qv;}function jr() {var t = tm[0];tm[0] = tm[1], tm[1] = t;}function qr(t, e, n, i, r, o, a, s, l, u) {if (u > e && u > i && u > o && u > s || e > u && i > u && o > u && s > u) return 0;var h = Cr(e, i, o, s, u, Jv);if (0 === h) return 0;for (var c, d, f = 0, p = -1, g = 0; h > g; g++) {var v = Jv[g],m = 0 === v || 1 === v ? .5 : 1,y = Sr(t, n, r, a, v);l > y || (0 > p && (p = Ir(e, i, o, s, tm), tm[1] < tm[0] && p > 1 && jr(), c = Sr(e, i, o, s, tm[0]), p > 1 && (d = Sr(e, i, o, s, tm[1]))), f += 2 === p ? v < tm[0] ? e > c ? m : -m : v < tm[1] ? c > d ? m : -m : d > s ? m : -m : v < tm[0] ? e > c ? m : -m : c > s ? m : -m);}return f;}function Zr(t, e, n, i, r, o, a, s) {if (s > e && s > i && s > o || e > s && i > s && o > s) return 0;var l = Pr(e, i, o, s, Jv);if (0 === l) return 0;var u = Or(e, i, o);if (u >= 0 && 1 >= u) {for (var h = 0, c = Dr(e, i, o, u), d = 0; l > d; d++) {var f = 0 === Jv[d] || 1 === Jv[d] ? .5 : 1,p = Dr(t, n, r, Jv[d]);a > p || (h += Jv[d] < u ? e > c ? f : -f : c > o ? f : -f);}return h;}var f = 0 === Jv[0] || 1 === Jv[0] ? .5 : 1,p = Dr(t, n, r, Jv[0]);return a > p ? 0 : e > o ? f : -f;}function Kr(t, e, n, i, r, o, a, s) {if (s -= e, s > n || -n > s) return 0;var l = Math.sqrt(n * n - s * s);Jv[0] = -l, Jv[1] = l;var u = Math.abs(i - r);if (1e-4 > u) return 0;if (1e-4 > u % $v) {i = 0, r = $v;var h = o ? 1 : -1;return a >= Jv[0] + t && a <= Jv[1] + t ? h : 0;}if (o) {var l = i;i = Wr(r), r = Wr(l);} else i = Wr(i), r = Wr(r);i > r && (r += $v);for (var c = 0, d = 0; 2 > d; d++) {var f = Jv[d];if (f + t > a) {var p = Math.atan2(s, f),h = o ? 1 : -1;0 > p && (p = $v + p), (p >= i && r >= p || p + $v >= i && r >= p + $v) && (p > Math.PI / 2 && p < 1.5 * Math.PI && (h = -h), c += h);}}return c;}function $r(t, e, n, i, r) {for (var o = 0, a = 0, s = 0, l = 0, u = 0, h = 0; h < t.length;) {var c = t[h++];switch (c === Kv.M && h > 1 && (n || (o += Yr(a, s, l, u, i, r))), 1 === h && (a = t[h], s = t[h + 1], l = a, u = s), c) {case Kv.M:l = t[h++], u = t[h++], a = l, s = u;break;case Kv.L:if (n) {if (Hr(a, s, t[h], t[h + 1], e, i, r)) return !0;} else o += Yr(a, s, t[h], t[h + 1], i, r) || 0;a = t[h++], s = t[h++];break;case Kv.C:if (n) {if (Vr(a, s, t[h++], t[h++], t[h++], t[h++], t[h], t[h + 1], e, i, r)) return !0;} else o += qr(a, s, t[h++], t[h++], t[h++], t[h++], t[h], t[h + 1], i, r) || 0;a = t[h++], s = t[h++];break;case Kv.Q:if (n) {if (Gr(a, s, t[h++], t[h++], t[h], t[h + 1], e, i, r)) return !0;} else o += Zr(a, s, t[h++], t[h++], t[h], t[h + 1], i, r) || 0;a = t[h++], s = t[h++];break;case Kv.A:var d = t[h++],f = t[h++],p = t[h++],g = t[h++],v = t[h++],m = t[h++];h += 1;var y = 1 - t[h++],_ = Math.cos(v) * p + d,x = Math.sin(v) * g + f;h > 1 ? o += Yr(a, s, _, x, i, r) : (l = _, u = x);var w = (i - d) * g / p + d;if (n) {if (Xr(d, f, g, v, v + m, y, e, w, r)) return !0;} else o += Kr(d, f, g, v, v + m, y, w, r);a = Math.cos(v + m) * p + d, s = Math.sin(v + m) * g + f;break;case Kv.R:l = a = t[h++], u = s = t[h++];var b = t[h++],S = t[h++],_ = l + b,x = u + S;if (n) {if (Hr(l, u, _, u, e, i, r) || Hr(_, u, _, x, e, i, r) || Hr(_, x, l, x, e, i, r) || Hr(l, x, l, u, e, i, r)) return !0;} else o += Yr(_, u, _, x, i, r), o += Yr(l, x, l, u, i, r);break;case Kv.Z:if (n) {if (Hr(a, s, l, u, e, i, r)) return !0;} else o += Yr(a, s, l, u, i, r);a = l, s = u;}}return n || Ur(s, u) || (o += Yr(a, s, l, u, i, r) || 0), 0 !== o;}function Qr(t, e, n) {return $r(t, 0, !1, e, n);}function Jr(t, e, n, i) {return $r(t, e, !0, n, i);}function to(t) {Ii.call(this, t), this.path = null;}function eo(t, e, n, i, r, o, a, s, l, u, h) {var c = l * (dm / 180),d = cm(c) * (t - n) / 2 + hm(c) * (e - i) / 2,f = -1 * hm(c) * (t - n) / 2 + cm(c) * (e - i) / 2,p = d * d / (a * a) + f * f / (s * s);p > 1 && (a *= um(p), s *= um(p));var g = (r === o ? -1 : 1) * um((a * a * s * s - a * a * f * f - s * s * d * d) / (a * a * f * f + s * s * d * d)) || 0,v = g * a * f / s,m = g * -s * d / a,y = (t + n) / 2 + cm(c) * v - hm(c) * m,_ = (e + i) / 2 + hm(c) * v + cm(c) * m,x = gm([1, 0], [(d - v) / a, (f - m) / s]),w = [(d - v) / a, (f - m) / s],b = [(-1 * d - v) / a, (-1 * f - m) / s],S = gm(w, b);pm(w, b) <= -1 && (S = dm), pm(w, b) >= 1 && (S = 0), 0 === o && S > 0 && (S -= 2 * dm), 1 === o && 0 > S && (S += 2 * dm), h.addData(u, y, _, a, s, x, S, c, o);}function no(t) {if (!t) return new jv();for (var e, n = 0, i = 0, r = n, o = i, a = new jv(), s = jv.CMD, l = t.match(vm), u = 0; u < l.length; u++) {for (var h, c = l[u], d = c.charAt(0), f = c.match(mm) || [], p = f.length, g = 0; p > g; g++) {f[g] = parseFloat(f[g]);}for (var v = 0; p > v;) {var m,y,_,x,w,b,S,M = n,C = i;switch (d) {case "l":n += f[v++], i += f[v++], h = s.L, a.addData(h, n, i);break;case "L":n = f[v++], i = f[v++], h = s.L, a.addData(h, n, i);break;case "m":n += f[v++], i += f[v++], h = s.M, a.addData(h, n, i), r = n, o = i, d = "l";break;case "M":n = f[v++], i = f[v++], h = s.M, a.addData(h, n, i), r = n, o = i, d = "L";break;case "h":n += f[v++], h = s.L, a.addData(h, n, i);break;case "H":n = f[v++], h = s.L, a.addData(h, n, i);break;case "v":i += f[v++], h = s.L, a.addData(h, n, i);break;case "V":i = f[v++], h = s.L, a.addData(h, n, i);break;case "C":h = s.C, a.addData(h, f[v++], f[v++], f[v++], f[v++], f[v++], f[v++]), n = f[v - 2], i = f[v - 1];break;case "c":h = s.C, a.addData(h, f[v++] + n, f[v++] + i, f[v++] + n, f[v++] + i, f[v++] + n, f[v++] + i), n += f[v - 2], i += f[v - 1];break;case "S":m = n, y = i;var I = a.len(),T = a.data;e === s.C && (m += n - T[I - 4], y += i - T[I - 3]), h = s.C, M = f[v++], C = f[v++], n = f[v++], i = f[v++], a.addData(h, m, y, M, C, n, i);break;case "s":m = n, y = i;var I = a.len(),T = a.data;e === s.C && (m += n - T[I - 4], y += i - T[I - 3]), h = s.C, M = n + f[v++], C = i + f[v++], n += f[v++], i += f[v++], a.addData(h, m, y, M, C, n, i);break;case "Q":M = f[v++], C = f[v++], n = f[v++], i = f[v++], h = s.Q, a.addData(h, M, C, n, i);break;case "q":M = f[v++] + n, C = f[v++] + i, n += f[v++], i += f[v++], h = s.Q, a.addData(h, M, C, n, i);break;case "T":m = n, y = i;var I = a.len(),T = a.data;e === s.Q && (m += n - T[I - 4], y += i - T[I - 3]), n = f[v++], i = f[v++], h = s.Q, a.addData(h, m, y, n, i);break;case "t":m = n, y = i;var I = a.len(),T = a.data;e === s.Q && (m += n - T[I - 4], y += i - T[I - 3]), n += f[v++], i += f[v++], h = s.Q, a.addData(h, m, y, n, i);break;case "A":_ = f[v++], x = f[v++], w = f[v++], b = f[v++], S = f[v++], M = n, C = i, n = f[v++], i = f[v++], h = s.A, eo(M, C, n, i, b, S, _, x, w, h, a);break;case "a":_ = f[v++], x = f[v++], w = f[v++], b = f[v++], S = f[v++], M = n, C = i, n += f[v++], i += f[v++], h = s.A, eo(M, C, n, i, b, S, _, x, w, h, a);}}("z" === d || "Z" === d) && (h = s.Z, a.addData(h), n = r, i = o), e = h;}return a.toStatic(), a;}function io(t, e) {var n = no(t);return e = e || {}, e.buildPath = function (t) {if (t.setData) {t.setData(n.data);var e = t.getContext();e && t.rebuildPath(e);} else {var e = t;n.rebuildPath(e);}}, e.applyTransform = function (t) {lm(n, t), this.dirty(!0);}, e;}function ro(t, e) {return new to(io(t, e));}function oo(t, e) {return to.extend(io(t, e));}function ao(t, e) {for (var n = [], i = t.length, r = 0; i > r; r++) {var o = t[r];o.path || o.createPathProxy(), o.__dirtyPath && o.buildPath(o.path, o.shape, !0), n.push(o.path);}var a = new to(e);return a.createPathProxy(), a.buildPath = function (t) {t.appendPath(n);var e = t.getContext();e && t.rebuildPath(e);}, a;}function so(t, e, n, i, r, o, a) {var s = .5 * (n - t),l = .5 * (i - e);return (2 * (e - n) + s + l) * a + (-3 * (e - n) - 2 * s - l) * o + s * r + e;}function lo(t, e, n) {var i = e.points,r = e.smooth;if (i && i.length >= 2) {if (r && "spline" !== r) {var o = Cm(i, r, n, e.smoothConstraint);t.moveTo(i[0][0], i[0][1]);for (var a = i.length, s = 0; (n ? a : a - 1) > s; s++) {var l = o[2 * s],u = o[2 * s + 1],h = i[(s + 1) % a];t.bezierCurveTo(l[0], l[1], u[0], u[1], h[0], h[1]);}} else {"spline" === r && (i = Mm(i, n)), t.moveTo(i[0][0], i[0][1]);for (var s = 1, c = i.length; c > s; s++) {t.lineTo(i[s][0], i[s][1]);}}n && t.closePath();}}function uo(t, e, n) {if (e) {var i = e.x1,r = e.x2,o = e.y1,a = e.y2;t.x1 = i, t.x2 = r, t.y1 = o, t.y2 = a;var s = n && n.lineWidth;s && (km(2 * i) === km(2 * r) && (t.x1 = t.x2 = co(i, s, !0)), km(2 * o) === km(2 * a) && (t.y1 = t.y2 = co(o, s, !0)));}}function ho(t, e, n) {if (e) {var i = e.x,r = e.y,o = e.width,a = e.height;t.x = i, t.y = r, t.width = o, t.height = a;var s = n && n.lineWidth;s && (t.x = co(i, s, !0), t.y = co(r, s, !0), t.width = Math.max(co(i + o, s, !1) - t.x, 0 === o ? 0 : 1), t.height = Math.max(co(r + a, s, !1) - t.y, 0 === a ? 0 : 1));}}function co(t, e, n) {if (!e) return t;var i = km(2 * t);return (i + km(e)) % 2 === 0 ? i / 2 : (i + (n ? 1 : -1)) / 2;}function fo(t, e, n) {var i = t.cpx2,r = t.cpy2;return null === i || null === r ? [(n ? Mr : Sr)(t.x1, t.cpx1, t.cpx2, t.x2, e), (n ? Mr : Sr)(t.y1, t.cpy1, t.cpy2, t.y2, e)] : [(n ? Ar : Dr)(t.x1, t.cpx1, t.x2, e), (n ? Ar : Dr)(t.y1, t.cpy1, t.y2, e)];}function po(t) {Ii.call(this, t), this._displayables = [], this._temporaryDisplayables = [], this._cursor = 0, this.notClear = !0;}function go(t) {return to.extend(t);}function vo(t, e) {return oo(t, e);}function mo(t, e) {Km[t] = e;}function yo(t) {return Km.hasOwnProperty(t) ? Km[t] : void 0;}function _o(t, e, n, i) {var r = ro(t, e);return n && ("center" === i && (n = wo(n, r.getBoundingRect())), bo(r, n)), r;}function xo(t, e, n) {var i = new Ti({ style: { image: t, x: e.x, y: e.y, width: e.width, height: e.height }, onload: function onload(t) {if ("center" === n) {var r = { width: t.width, height: t.height };i.setStyle(wo(e, r));}} });return i;}function wo(t, e) {var n,i = e.width / e.height,r = t.height * i;r <= t.width ? n = t.height : (r = t.width, n = r / i);var o = t.x + t.width / 2,a = t.y + t.height / 2;return { x: o - r / 2, y: a - n / 2, width: r, height: n };}function bo(t, e) {if (t.applyTransform) {var n = t.getBoundingRect(),i = n.calculateTransform(e);t.applyTransform(i);}}function So(t) {return uo(t.shape, t.shape, t.style), t;}function Mo(t) {return ho(t.shape, t.shape, t.style), t;}function Co(t) {return null != t && "none" !== t;}function Io(t) {if ("string" != typeof t) return t;var e = Jm.get(t);return e || (e = nn(t, -.1), 1e4 > ty && (Jm.set(t, e), ty++)), e;}function To(t) {if (t.__hoverStlDirty) {t.__hoverStlDirty = !1;var e = t.__hoverStl;if (!e) return void (t.__cachedNormalStl = t.__cachedNormalZ2 = null);var n = t.__cachedNormalStl = {};t.__cachedNormalZ2 = t.z2;var i = t.style;for (var r in e) {null != e[r] && (n[r] = i[r]);}n.fill = i.fill, n.stroke = i.stroke;}}function ko(t) {var e = t.__hoverStl;if (e && !t.__highlighted) {var n = t.__zr,i = t.useHoverLayer && n && "canvas" === n.painter.type;if (t.__highlighted = i ? "layer" : "plain", !(t.isGroup || !n && t.useHoverLayer)) {var r = t,o = t.style;i && (r = n.addHover(t), o = r.style), $o(o), i || To(r), o.extendFrom(e), Do(o, e, "fill"), Do(o, e, "stroke"), Ko(o), i || (t.dirty(!1), t.z2 += Xm);}}}function Do(t, e, n) {!Co(e[n]) && Co(t[n]) && (t[n] = Io(t[n]));}function Ao(t) {var e = t.__highlighted;if (e && (t.__highlighted = !1, !t.isGroup)) if ("layer" === e) t.__zr && t.__zr.removeHover(t);else {var n = t.style,i = t.__cachedNormalStl;i && ($o(n), t.setStyle(i), Ko(n));var r = t.__cachedNormalZ2;null != r && t.z2 - r === Xm && (t.z2 = r);}}function Po(t, e, n) {var i,r = jm,o = jm;t.__highlighted && (r = Um, i = !0), e(t, n), t.__highlighted && (o = Um, i = !0), t.isGroup && t.traverse(function (t) {!t.isGroup && e(t, n);}), i && t.__highDownOnUpdate && t.__highDownOnUpdate(r, o);}function Oo(t, e) {e = t.__hoverStl = e !== !1 && (t.hoverStyle || e || {}), t.__hoverStlDirty = !0, t.__highlighted && (t.__cachedNormalStl = null, Ao(t), ko(t));}function Lo(t) {!Ro(this, t) && !this.__highByOuter && Po(this, ko);}function Bo(t) {!Ro(this, t) && !this.__highByOuter && Po(this, Ao);}function zo(t) {this.__highByOuter |= 1 << (t || 0), Po(this, ko);}function Eo(t) {!(this.__highByOuter &= ~(1 << (t || 0))) && Po(this, Ao);}function Ro(t, e) {return t.__highDownSilentOnTouch && e.zrByTouch;}function No(t, e) {Fo(t, !0), Po(t, Oo, e);}function Fo(t, e) {var n = e === !1;if (t.__highDownSilentOnTouch = t.highDownSilentOnTouch, t.__highDownOnUpdate = t.highDownOnUpdate, !n || t.__highDownDispatcher) {var i = n ? "off" : "on";t[i]("mouseover", Lo)[i]("mouseout", Bo), t[i]("emphasis", zo)[i]("normal", Eo), t.__highByOuter = t.__highByOuter || 0, t.__highDownDispatcher = !n;}}function Ho(t) {return !(!t || !t.__highDownDispatcher);}function Vo(t) {var e = Zm[t];return null == e && 32 >= qm && (e = Zm[t] = qm++), e;}function Go(t, e, n, i, r, o, a) {r = r || Wm;var s,l = r.labelFetcher,u = r.labelDataIndex,h = r.labelDimIndex,c = r.labelProp,d = n.getShallow("show"),f = i.getShallow("show");(d || f) && (l && (s = l.getFormattedLabel(u, "normal", null, h, c)), null == s && (s = w(r.defaultText) ? r.defaultText(u, r) : r.defaultText));var p = d ? s : null,g = f ? D(l ? l.getFormattedLabel(u, "emphasis", null, h, c) : null, s) : null;(null != p || null != g) && (Xo(t, n, o, r), Xo(e, i, a, r, !0)), t.text = p, e.text = g;}function Wo(t, e, n) {var i = t.style;e && ($o(i), t.setStyle(e), Ko(i)), i = t.__hoverStl, n && i && ($o(i), a(i, n), Ko(i));}function Xo(t, e, n, i, r) {return Uo(t, e, i, r), n && a(t, n), t;}function Yo(t, e, n) {var i,r = { isRectText: !0 };n === !1 ? i = !0 : r.autoColor = n, Uo(t, e, r, i);}function Uo(t, e, n, i) {if (n = n || Wm, n.isRectText) {var r;n.getTextPosition ? r = n.getTextPosition(e, i) : (r = e.getShallow("position") || (i ? null : "inside"), "outside" === r && (r = "top")), t.textPosition = r, t.textOffset = e.getShallow("offset");var o = e.getShallow("rotate");null != o && (o *= Math.PI / 180), t.textRotation = o, t.textDistance = D(e.getShallow("distance"), i ? null : 5);}var a,s = e.ecModel,l = s && s.option.textStyle,u = jo(e);if (u) {a = {};for (var h in u) {if (u.hasOwnProperty(h)) {var c = e.getModel(["rich", h]);qo(a[h] = {}, c, l, n, i);}}}return t.rich = a, qo(t, e, l, n, i, !0), n.forceRich && !n.textStyle && (n.textStyle = {}), t;}function jo(t) {for (var e; t && t !== t.ecModel;) {var n = (t.option || Wm).rich;if (n) {e = e || {};for (var i in n) {n.hasOwnProperty(i) && (e[i] = 1);}}t = t.parentModel;}return e;}function qo(t, e, n, i, r, o) {n = !r && n || Wm, t.textFill = Zo(e.getShallow("color"), i) || n.color, t.textStroke = Zo(e.getShallow("textBorderColor"), i) || n.textBorderColor, t.textStrokeWidth = D(e.getShallow("textBorderWidth"), n.textBorderWidth), r || (o && (t.insideRollbackOpt = i, Ko(t)), null == t.textFill && (t.textFill = i.autoColor)), t.fontStyle = e.getShallow("fontStyle") || n.fontStyle, t.fontWeight = e.getShallow("fontWeight") || n.fontWeight, t.fontSize = e.getShallow("fontSize") || n.fontSize, t.fontFamily = e.getShallow("fontFamily") || n.fontFamily, t.textAlign = e.getShallow("align"), t.textVerticalAlign = e.getShallow("verticalAlign") || e.getShallow("baseline"), t.textLineHeight = e.getShallow("lineHeight"), t.textWidth = e.getShallow("width"), t.textHeight = e.getShallow("height"), t.textTag = e.getShallow("tag"), o && i.disableBox || (t.textBackgroundColor = Zo(e.getShallow("backgroundColor"), i), t.textPadding = e.getShallow("padding"), t.textBorderColor = Zo(e.getShallow("borderColor"), i), t.textBorderWidth = e.getShallow("borderWidth"), t.textBorderRadius = e.getShallow("borderRadius"), t.textBoxShadowColor = e.getShallow("shadowColor"), t.textBoxShadowBlur = e.getShallow("shadowBlur"), t.textBoxShadowOffsetX = e.getShallow("shadowOffsetX"), t.textBoxShadowOffsetY = e.getShallow("shadowOffsetY")), t.textShadowColor = e.getShallow("textShadowColor") || n.textShadowColor, t.textShadowBlur = e.getShallow("textShadowBlur") || n.textShadowBlur, t.textShadowOffsetX = e.getShallow("textShadowOffsetX") || n.textShadowOffsetX, t.textShadowOffsetY = e.getShallow("textShadowOffsetY") || n.textShadowOffsetY;}function Zo(t, e) {return "auto" !== t ? t : e && e.autoColor ? e.autoColor : null;}function Ko(t) {var e,n = t.textPosition,i = t.insideRollbackOpt;if (i && null == t.textFill) {var r = i.autoColor,o = i.isRectText,a = i.useInsideStyle,s = a !== !1 && (a === !0 || o && n && "string" == typeof n && n.indexOf("inside") >= 0),l = !s && null != r;(s || l) && (e = { textFill: t.textFill, textStroke: t.textStroke, textStrokeWidth: t.textStrokeWidth }), s && (t.textFill = "#fff", null == t.textStroke && (t.textStroke = r, null == t.textStrokeWidth && (t.textStrokeWidth = 2))), l && (t.textFill = r);}t.insideRollback = e;}function $o(t) {var e = t.insideRollback;e && (t.textFill = e.textFill, t.textStroke = e.textStroke, t.textStrokeWidth = e.textStrokeWidth, t.insideRollback = null);}function Qo(t, e) {var n = e && e.getModel("textStyle");return B([t.fontStyle || n && n.getShallow("fontStyle") || "", t.fontWeight || n && n.getShallow("fontWeight") || "", (t.fontSize || n && n.getShallow("fontSize") || 12) + "px", t.fontFamily || n && n.getShallow("fontFamily") || "sans-serif"].join(" "));}function Jo(t, e, n, i, r, o) {"function" == typeof r && (o = r, r = null);var a = i && i.isAnimationEnabled();if (a) {var s = t ? "Update" : "",l = i.getShallow("animationDuration" + s),u = i.getShallow("animationEasing" + s),h = i.getShallow("animationDelay" + s);"function" == typeof h && (h = h(r, i.getAnimationDelayParams ? i.getAnimationDelayParams(e, r) : null)), "function" == typeof l && (l = l(r)), l > 0 ? e.animateTo(n, l, h || 0, u, o, !!o) : (e.stopAnimation(), e.attr(n), o && o());} else e.stopAnimation(), e.attr(n), o && o();}function ta(t, e, n, i, r) {Jo(!0, t, e, n, i, r);}function ea(t, e, n, i, r) {Jo(!1, t, e, n, i, r);}function na(t, e) {for (var n = Le([]); t && t !== e;) {ze(n, t.getLocalTransform(), n), t = t.parent;}return n;}function ia(t, e, n) {return e && !d(e) && (e = kp.getLocalTransform(e)), n && (e = Fe([], e)), oe([], t, e);}function ra(t, e, n) {var i = 0 === e[4] || 0 === e[5] || 0 === e[0] ? 1 : Math.abs(2 * e[4] / e[0]),r = 0 === e[4] || 0 === e[5] || 0 === e[2] ? 1 : Math.abs(2 * e[4] / e[2]),o = ["left" === t ? -i : "right" === t ? i : 0, "top" === t ? -r : "bottom" === t ? r : 0];return o = ia(o, e, n), Math.abs(o[0]) > Math.abs(o[1]) ? o[0] > 0 ? "right" : "left" : o[1] > 0 ? "bottom" : "top";}function oa(t, e, n) {function i(t) {var e = {};return t.traverse(function (t) {!t.isGroup && t.anid && (e[t.anid] = t);}), e;}function r(t) {var e = { position: W(t.position), rotation: t.rotation };return t.shape && (e.shape = a({}, t.shape)), e;}if (t && e) {var o = i(t);e.traverse(function (t) {if (!t.isGroup && t.anid) {var e = o[t.anid];if (e) {var i = r(t);t.attr(r(e)), ta(t, i, n, t.dataIndex);}}});}}function aa(t, e) {return p(t, function (t) {var n = t[0];n = Vm(n, e.x), n = Gm(n, e.x + e.width);var i = t[1];return i = Vm(i, e.y), i = Gm(i, e.y + e.height), [n, i];});}function sa(t, e) {var n = Vm(t.x, e.x),i = Gm(t.x + t.width, e.x + e.width),r = Vm(t.y, e.y),o = Gm(t.y + t.height, e.y + e.height);return i >= n && o >= r ? { x: n, y: r, width: i - n, height: o - r } : void 0;}function la(t, e, n) {e = a({ rectHover: !0 }, e);var i = e.style = { strokeNoScale: !0 };return n = n || { x: -1, y: -1, width: 2, height: 2 }, t ? 0 === t.indexOf("image://") ? (i.image = t.slice(8), s(i, n), new Ti(e)) : _o(t.replace("path://", ""), e, n, "center") : void 0;}function ua(t, e, n, i, r) {for (var o = 0, a = r[r.length - 1]; o < r.length; o++) {var s = r[o];if (ha(t, e, n, i, s[0], s[1], a[0], a[1])) return !0;a = s;}}function ha(t, e, n, i, r, o, a, s) {var l = n - t,u = i - e,h = a - r,c = s - o,d = ca(h, c, l, u);if (da(d)) return !1;var f = t - r,p = e - o,g = ca(f, p, l, u) / d;if (0 > g || g > 1) return !1;var v = ca(f, p, h, c) / d;return 0 > v || v > 1 ? !1 : !0;}function ca(t, e, n, i) {return t * i - n * e;}function da(t) {return 1e-6 >= t && t >= -1e-6;}function fa(t, e, n) {this.parentModel = e, this.ecModel = n, this.option = t;}function pa(t, e, n) {for (var i = 0; i < e.length && (!e[i] || (t = t && "object" == typeof t ? t[e[i]] : null, null != t)); i++) {;}return null == t && n && (t = n.get(e)), t;}function ga(t, e) {var n = sy(t).getParent;return n ? n.call(t, e) : t.parentModel;}function va(t) {return [t || "", ly++, Math.random().toFixed(5)].join("_");}function ma(t) {var e = {};return t.registerSubTypeDefaulter = function (t, n) {t = pr(t), e[t.main] = n;
    }, t.determineSubType = function (n, i) {var r = i.type;if (!r) {var o = pr(n).main;t.hasSubTypes(n) && e[o] && (r = e[o](i));}return r;}, t;}function ya(t, e) {function n(t) {var n = {},o = [];return f(t, function (a) {var s = i(n, a),l = s.originalDeps = e(a),h = r(l, t);s.entryCount = h.length, 0 === s.entryCount && o.push(a), f(h, function (t) {u(s.predecessor, t) < 0 && s.predecessor.push(t);var e = i(n, t);u(e.successor, t) < 0 && e.successor.push(a);});}), { graph: n, noEntryList: o };}function i(t, e) {return t[e] || (t[e] = { predecessor: [], successor: [] }), t[e];}function r(t, e) {var n = [];return f(t, function (t) {u(e, t) >= 0 && n.push(t);}), n;}t.topologicalTravel = function (t, e, i, r) {function o(t) {l[t].entryCount--, 0 === l[t].entryCount && u.push(t);}function a(t) {h[t] = !0, o(t);}if (t.length) {var s = n(e),l = s.graph,u = s.noEntryList,h = {};for (f(t, function (t) {h[t] = !0;}); u.length;) {var c = u.pop(),d = l[c],p = !!h[c];p && (i.call(r, c, d.originalDeps.slice()), delete h[c]), f(d.successor, p ? a : o);}f(h, function () {throw new Error("Circle dependency may exists");});}};}function _a(t) {return t.replace(/^\s+|\s+$/g, "");}function xa(t, e, n, i) {var r = e[1] - e[0],o = n[1] - n[0];if (0 === r) return 0 === o ? n[0] : (n[0] + n[1]) / 2;if (i) {if (r > 0) {if (t <= e[0]) return n[0];if (t >= e[1]) return n[1];} else {if (t >= e[0]) return n[0];if (t <= e[1]) return n[1];}} else {if (t === e[0]) return n[0];if (t === e[1]) return n[1];}return (t - e[0]) / r * o + n[0];}function wa(t, e) {switch (t) {case "center":case "middle":t = "50%";break;case "left":case "top":t = "0%";break;case "right":case "bottom":t = "100%";}return "string" == typeof t ? _a(t).match(/%$/) ? parseFloat(t) / 100 * e : parseFloat(t) : null == t ? 0 / 0 : +t;}function ba(t, e, n) {return null == e && (e = 10), e = Math.min(Math.max(0, e), 20), t = (+t).toFixed(e), n ? t : +t;}function Sa(t) {return t.sort(function (t, e) {return t - e;}), t;}function Ma(t) {if (t = +t, isNaN(t)) return 0;for (var e = 1, n = 0; Math.round(t * e) / e !== t;) {e *= 10, n++;}return n;}function Ca(t) {var e = t.toString(),n = e.indexOf("e");if (n > 0) {var i = +e.slice(n + 1);return 0 > i ? -i : 0;}var r = e.indexOf(".");return 0 > r ? 0 : e.length - 1 - r;}function Ia(t, e) {var n = Math.log,i = Math.LN10,r = Math.floor(n(t[1] - t[0]) / i),o = Math.round(n(Math.abs(e[1] - e[0])) / i),a = Math.min(Math.max(-r + o, 0), 20);return isFinite(a) ? a : 20;}function Ta(t, e, n) {if (!t[e]) return 0;var i = g(t, function (t, e) {return t + (isNaN(e) ? 0 : e);}, 0);if (0 === i) return 0;for (var r = Math.pow(10, n), o = p(t, function (t) {return (isNaN(t) ? 0 : t) / i * r * 100;}), a = 100 * r, s = p(o, function (t) {return Math.floor(t);}), l = g(s, function (t, e) {return t + e;}, 0), u = p(o, function (t, e) {return t - s[e];}); a > l;) {for (var h = Number.NEGATIVE_INFINITY, c = null, d = 0, f = u.length; f > d; ++d) {u[d] > h && (h = u[d], c = d);}++s[c], u[c] = 0, ++l;}return s[e] / r;}function ka(t) {var e = 2 * Math.PI;return (t % e + e) % e;}function Da(t) {return t > -uy && uy > t;}function Aa(t) {if (t instanceof Date) return t;if ("string" == typeof t) {var e = cy.exec(t);if (!e) return new Date(0 / 0);if (e[8]) {var n = +e[4] || 0;return "Z" !== e[8].toUpperCase() && (n -= e[8].slice(0, 3)), new Date(Date.UTC(+e[1], +(e[2] || 1) - 1, +e[3] || 1, n, +(e[5] || 0), +e[6] || 0, +e[7] || 0));}return new Date(+e[1], +(e[2] || 1) - 1, +e[3] || 1, +e[4] || 0, +(e[5] || 0), +e[6] || 0, +e[7] || 0);}return new Date(null == t ? 0 / 0 : Math.round(t));}function Pa(t) {return Math.pow(10, Oa(t));}function Oa(t) {if (0 === t) return 0;var e = Math.floor(Math.log(t) / Math.LN10);return t / Math.pow(10, e) >= 10 && e++, e;}function La(t, e) {var n,i = Oa(t),r = Math.pow(10, i),o = t / r;return n = e ? 1.5 > o ? 1 : 2.5 > o ? 2 : 4 > o ? 3 : 7 > o ? 5 : 10 : 1 > o ? 1 : 2 > o ? 2 : 3 > o ? 3 : 5 > o ? 5 : 10, t = n * r, i >= -20 ? +t.toFixed(0 > i ? -i : 0) : t;}function Ba(t, e) {var n = (t.length - 1) * e + 1,i = Math.floor(n),r = +t[i - 1],o = n - i;return o ? r + o * (t[i] - r) : r;}function za(t) {function e(t, n, i) {return t.interval[i] < n.interval[i] || t.interval[i] === n.interval[i] && (t.close[i] - n.close[i] === (i ? -1 : 1) || !i && e(t, n, 1));}t.sort(function (t, n) {return e(t, n, 0) ? -1 : 1;});for (var n = -1 / 0, i = 1, r = 0; r < t.length;) {for (var o = t[r].interval, a = t[r].close, s = 0; 2 > s; s++) {o[s] <= n && (o[s] = n, a[s] = s ? 1 : 1 - i), n = o[s], i = a[s];}o[0] === o[1] && a[0] * a[1] !== 1 ? t.splice(r, 1) : r++;}return t;}function Ea(t) {return t - parseFloat(t) >= 0;}function Ra(t) {return isNaN(t) ? "-" : (t = (t + "").split("."), t[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") + (t.length > 1 ? "." + t[1] : ""));}function Na(t, e) {return t = (t || "").toLowerCase().replace(/-(.)/g, function (t, e) {return e.toUpperCase();}), e && t && (t = t.charAt(0).toUpperCase() + t.slice(1)), t;}function Fa(t) {return null == t ? "" : (t + "").replace(py, function (t, e) {return gy[e];});}function Ha(t, e, n) {x(e) || (e = [e]);var i = e.length;if (!i) return "";for (var r = e[0].$vars || [], o = 0; o < r.length; o++) {var a = vy[o];t = t.replace(my(a), my(a, 0));}for (var s = 0; i > s; s++) {for (var l = 0; l < r.length; l++) {var u = e[s][r[l]];t = t.replace(my(vy[l], s), n ? Fa(u) : u);}}return t;}function Va(t, e, n) {return f(e, function (e, i) {t = t.replace("{" + i + "}", n ? Fa(e) : e);}), t;}function Ga(t, e) {t = b(t) ? { color: t, extraCssText: e } : t || {};var n = t.color,i = t.type,e = t.extraCssText,r = t.renderMode || "html",o = t.markerId || "X";return n ? "html" === r ? "subItem" === i ? '<span style="display:inline-block;vertical-align:middle;margin-right:8px;margin-left:3px;border-radius:4px;width:4px;height:4px;background-color:' + Fa(n) + ";" + (e || "") + '"></span>' : '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + Fa(n) + ";" + (e || "") + '"></span>' : { renderMode: r, content: "{marker" + o + "|}  ", style: { color: n } } : "";}function Wa(t, e) {return t += "", "0000".substr(0, e - t.length) + t;}function Xa(t, e, n) {("week" === t || "month" === t || "quarter" === t || "half-year" === t || "year" === t) && (t = "MM-dd\nyyyy");var i = Aa(e),r = n ? "UTC" : "",o = i["get" + r + "FullYear"](),a = i["get" + r + "Month"]() + 1,s = i["get" + r + "Date"](),l = i["get" + r + "Hours"](),u = i["get" + r + "Minutes"](),h = i["get" + r + "Seconds"](),c = i["get" + r + "Milliseconds"]();return t = t.replace("MM", Wa(a, 2)).replace("M", a).replace("yyyy", o).replace("yy", o % 100).replace("dd", Wa(s, 2)).replace("d", s).replace("hh", Wa(l, 2)).replace("h", l).replace("mm", Wa(u, 2)).replace("m", u).replace("ss", Wa(h, 2)).replace("s", h).replace("SSS", Wa(c, 3));}function Ya(t) {return t ? t.charAt(0).toUpperCase() + t.substr(1) : t;}function Ua(t) {return Yn(t.text, t.font, t.textAlign, t.textVerticalAlign, t.textPadding, t.textLineHeight, t.rich, t.truncate);}function ja(t, e, n, i, r, o, a, s) {return Yn(t, e, n, i, r, s, o, a);}function qa(t, e) {if ("_blank" === e || "blank" === e) {var n = window.open();n.opener = null, n.location = t;} else window.open(t, e);}function Za(t, e, n, i, r) {var o = 0,a = 0;null == i && (i = 1 / 0), null == r && (r = 1 / 0);var s = 0;e.eachChild(function (l, u) {var h,c,d = l.position,f = l.getBoundingRect(),p = e.childAt(u + 1),g = p && p.getBoundingRect();if ("horizontal" === t) {var v = f.width + (g ? -g.x + f.x : 0);h = o + v, h > i || l.newline ? (o = 0, h = v, a += s + n, s = f.height) : s = Math.max(s, f.height);} else {var m = f.height + (g ? -g.y + f.y : 0);c = a + m, c > r || l.newline ? (o += s + n, a = 0, c = m, s = f.width) : s = Math.max(s, f.width);}l.newline || (d[0] = o, d[1] = a, "horizontal" === t ? o = h + n : a = c + n);});}function Ka(t, e, n) {n = fy(n || 0);var i = e.width,r = e.height,o = wa(t.left, i),a = wa(t.top, r),s = wa(t.right, i),l = wa(t.bottom, r),u = wa(t.width, i),h = wa(t.height, r),c = n[2] + n[0],d = n[1] + n[3],f = t.aspect;switch (isNaN(u) && (u = i - s - d - o), isNaN(h) && (h = r - l - c - a), null != f && (isNaN(u) && isNaN(h) && (f > i / r ? u = .8 * i : h = .8 * r), isNaN(u) && (u = f * h), isNaN(h) && (h = u / f)), isNaN(o) && (o = i - s - u - d), isNaN(a) && (a = r - l - h - c), t.left || t.right) {case "center":o = i / 2 - u / 2 - n[3];break;case "right":o = i - u - d;}switch (t.top || t.bottom) {case "middle":case "center":a = r / 2 - h / 2 - n[0];break;case "bottom":a = r - h - c;}o = o || 0, a = a || 0, isNaN(u) && (u = i - d - o - (s || 0)), isNaN(h) && (h = r - c - a - (l || 0));var p = new In(o + n[3], a + n[0], u, h);return p.margin = n, p;}function $a(t, e, n) {function i(n, i) {var a = {},l = 0,u = {},h = 0,c = 2;if (xy(n, function (e) {u[e] = t[e];}), xy(n, function (t) {r(e, t) && (a[t] = u[t] = e[t]), o(a, t) && l++, o(u, t) && h++;}), s[i]) return o(e, n[1]) ? u[n[2]] = null : o(e, n[2]) && (u[n[1]] = null), u;if (h !== c && l) {if (l >= c) return a;for (var d = 0; d < n.length; d++) {var f = n[d];if (!r(a, f) && r(t, f)) {a[f] = t[f];break;}}return a;}return u;}function r(t, e) {return t.hasOwnProperty(e);}function o(t, e) {return null != t[e] && "auto" !== t[e];}function a(t, e, n) {xy(t, function (t) {e[t] = n[t];});}!S(n) && (n = {});var s = n.ignoreSize;!x(s) && (s = [s, s]);var l = i(by[0], 0),u = i(by[1], 1);a(by[0], t, l), a(by[1], t, u);}function Qa(t) {return Ja({}, t);}function Ja(t, e) {return e && t && xy(wy, function (n) {e.hasOwnProperty(n) && (t[n] = e[n]);}), t;}function ts(t) {var e = [];return f(Iy.getClassesByMainType(t), function (t) {e = e.concat(t.prototype.dependencies || []);}), e = p(e, function (t) {return pr(t).main;}), "dataset" !== t && u(e, "dataset") <= 0 && e.unshift("dataset"), e;}function es(t, e) {for (var n = t.length, i = 0; n > i; i++) {if (t[i].length > e) return t[i];}return t[n - 1];}function ns(t) {this.fromDataset = t.fromDataset, this.data = t.data || (t.sourceFormat === By ? {} : []), this.sourceFormat = t.sourceFormat || zy, this.seriesLayoutBy = t.seriesLayoutBy || Ry, this.dimensionsDefine = t.dimensionsDefine, this.encodeDefine = t.encodeDefine && N(t.encodeDefine), this.startIndex = t.startIndex || 0, this.dimensionsDetectCount = t.dimensionsDetectCount;}function is(t) {var e = t.option.source,n = zy;if (C(e)) n = Ey;else if (x(e)) {0 === e.length && (n = Oy);for (var i = 0, r = e.length; r > i; i++) {var o = e[i];if (null != o) {if (x(o)) {n = Oy;break;}if (S(o)) {n = Ly;break;}}}} else if (S(e)) {for (var a in e) {if (e.hasOwnProperty(a) && d(e[a])) {n = By;break;}}} else if (null != e) throw new Error("Invalid data");Hy(t).sourceFormat = n;}function rs(t) {return Hy(t).source;}function os(t) {Hy(t).datasetMap = N();}function as(t) {var e = t.option,n = e.data,i = C(n) ? Ey : Py,r = !1,o = e.seriesLayoutBy,a = e.sourceHeader,s = e.dimensions,l = ds(t);if (l) {var u = l.option;n = u.source, i = Hy(l).sourceFormat, r = !0, o = o || u.seriesLayoutBy, null == a && (a = u.sourceHeader), s = s || u.dimensions;}var h = ss(n, i, o, a, s);Hy(t).source = new ns({ data: n, fromDataset: r, seriesLayoutBy: o, sourceFormat: i, dimensionsDefine: h.dimensionsDefine, startIndex: h.startIndex, dimensionsDetectCount: h.dimensionsDetectCount, encodeDefine: e.encode });}function ss(t, e, n, i, r) {if (!t) return { dimensionsDefine: ls(r) };var o, a;if (e === Oy) "auto" === i || null == i ? us(function (t) {null != t && "-" !== t && (b(t) ? null == a && (a = 1) : a = 0);}, n, t, 10) : a = i ? 1 : 0, r || 1 !== a || (r = [], us(function (t, e) {r[e] = null != t ? t : "";}, n, t)), o = r ? r.length : n === Ny ? t.length : t[0] ? t[0].length : null;else if (e === Ly) r || (r = hs(t));else if (e === By) r || (r = [], f(t, function (t, e) {r.push(e);}));else if (e === Py) {var s = er(t[0]);o = x(s) && s.length || 1;}return { startIndex: a, dimensionsDefine: ls(r), dimensionsDetectCount: o };}function ls(t) {if (t) {var e = N();return p(t, function (t) {if (t = a({}, S(t) ? t : { name: t }), null == t.name) return t;t.name += "", null == t.displayName && (t.displayName = t.name);var n = e.get(t.name);return n ? t.name += "-" + n.count++ : e.set(t.name, { count: 1 }), t;});}}function us(t, e, n, i) {if (null == i && (i = 1 / 0), e === Ny) for (var r = 0; r < n.length && i > r; r++) {t(n[r] ? n[r][0] : null, r);} else for (var o = n[0] || [], r = 0; r < o.length && i > r; r++) {t(o[r], r);}}function hs(t) {for (var e, n = 0; n < t.length && !(e = t[n++]);) {;}if (e) {var i = [];return f(e, function (t, e) {i.push(e);}), i;}}function cs(t, e, n) {function i(t, e, n) {for (var i = 0; n > i; i++) {t.push(e + i);}}function r(t) {var e = t.dimsDef;return e ? e.length : 1;}var o = {},a = ds(e);if (!a || !t) return o;var s,l,u = [],h = [],c = e.ecModel,d = Hy(c).datasetMap,p = a.uid + "_" + n.seriesLayoutBy;t = t.slice(), f(t, function (e, n) {!S(e) && (t[n] = { name: e }), "ordinal" === e.type && null == s && (s = n, l = r(t[n])), o[e.name] = [];});var g = d.get(p) || d.set(p, { categoryWayDim: l, valueWayDim: 0 });return f(t, function (t, e) {var n = t.name,a = r(t);if (null == s) {var l = g.valueWayDim;i(o[n], l, a), i(h, l, a), g.valueWayDim += a;} else if (s === e) i(o[n], 0, a), i(u, 0, a);else {var l = g.categoryWayDim;i(o[n], l, a), i(h, l, a), g.categoryWayDim += a;}}), u.length && (o.itemName = u), h.length && (o.seriesName = h), o;}function ds(t) {var e = t.option,n = e.data;return n ? void 0 : t.ecModel.getComponent("dataset", e.datasetIndex || 0);}function fs(t, e) {return ps(t.data, t.sourceFormat, t.seriesLayoutBy, t.dimensionsDefine, t.startIndex, e);}function ps(t, e, n, i, r, o) {function a(t) {var e = b(t);return null != t && isFinite(t) && "" !== t ? e ? Fy.Might : Fy.Not : e && "-" !== t ? Fy.Must : void 0;}var s,l = 5;if (C(t)) return Fy.Not;var u, h;if (i) {var c = i[o];S(c) ? (u = c.name, h = c.type) : b(c) && (u = c);}if (null != h) return "ordinal" === h ? Fy.Must : Fy.Not;if (e === Oy) {if (n === Ny) {for (var d = t[o], f = 0; f < (d || []).length && l > f; f++) {if (null != (s = a(d[r + f]))) return s;}} else for (var f = 0; f < t.length && l > f; f++) {var p = t[r + f];if (p && null != (s = a(p[o]))) return s;}} else if (e === Ly) {if (!u) return Fy.Not;for (var f = 0; f < t.length && l > f; f++) {var g = t[f];if (g && null != (s = a(g[u]))) return s;}} else if (e === By) {if (!u) return Fy.Not;var d = t[u];if (!d || C(d)) return Fy.Not;for (var f = 0; f < d.length && l > f; f++) {if (null != (s = a(d[f]))) return s;}} else if (e === Py) for (var f = 0; f < t.length && l > f; f++) {var g = t[f],v = er(g);if (!x(v)) return Fy.Not;if (null != (s = a(v[o]))) return s;}return Fy.Not;}function gs(t, e) {if (e) {var n = e.seiresIndex,i = e.seriesId,r = e.seriesName;return null != n && t.componentIndex !== n || null != i && t.id !== i || null != r && t.name !== r;}}function vs(t, e) {var n = t.color && !t.colorLayer;f(e, function (e, o) {"colorLayer" === o && n || Iy.hasClass(o) || ("object" == typeof e ? t[o] = t[o] ? r(t[o], e, !1) : i(e) : null == t[o] && (t[o] = e));});}function ms(t) {t = t, this.option = {}, this.option[Vy] = 1, this._componentsMap = N({ series: [] }), this._seriesIndices, this._seriesIndicesMap, vs(t, this._theme.option), r(t, ky, !1), this.mergeOption(t);}function ys(t, e) {x(e) || (e = e ? [e] : []);var n = {};return f(e, function (e) {n[e] = (t.get(e) || []).slice();}), n;}function _s(t, e, n) {var i = e.type ? e.type : n ? n.subType : Iy.determineSubType(t, e);return i;}function xs(t, e) {t._seriesIndicesMap = N(t._seriesIndices = p(e, function (t) {return t.componentIndex;}) || []);}function ws(t, e) {return e.hasOwnProperty("subType") ? v(t, function (t) {return t.subType === e.subType;}) : t;}function bs(t) {f(Wy, function (e) {this[e] = y(t[e], t);}, this);}function Ss() {this._coordinateSystems = [];}function Ms(t) {this._api = t, this._timelineOptions = [], this._mediaList = [], this._mediaDefault, this._currentMediaIndices = [], this._optionBackup, this._newBaseOption;}function Cs(t, e, n) {var i,r,o = [],a = [],s = t.timeline;if (t.baseOption && (r = t.baseOption), (s || t.options) && (r = r || {}, o = (t.options || []).slice()), t.media) {r = r || {};var l = t.media;Yy(l, function (t) {t && t.option && (t.query ? a.push(t) : i || (i = t));});}return r || (r = t), r.timeline || (r.timeline = s), Yy([r].concat(o).concat(p(a, function (t) {return t.option;})), function (t) {Yy(e, function (e) {e(t, n);});}), { baseOption: r, timelineOptions: o, mediaDefault: i, mediaList: a };}function Is(t, e, n) {var i = { width: e, height: n, aspectratio: e / n },r = !0;return f(t, function (t, e) {var n = e.match(Zy);if (n && n[1] && n[2]) {var o = n[1],a = n[2].toLowerCase();Ts(i[a], t, o) || (r = !1);}}), r;}function Ts(t, e, n) {return "min" === n ? t >= e : "max" === n ? e >= t : t === e;}function ks(t, e) {return t.join(",") === e.join(",");}function Ds(t, e) {e = e || {}, Yy(e, function (e, n) {if (null != e) {var i = t[n];if (Iy.hasClass(n)) {e = Ji(e), i = Ji(i);var r = ir(i, e);t[n] = jy(r, function (t) {return t.option && t.exist ? qy(t.exist, t.option, !0) : t.exist || t.option;});} else t[n] = qy(i, e, !0);}});}function As(t) {var e = t && t.itemStyle;if (e) for (var n = 0, i = Qy.length; i > n; n++) {var o = Qy[n],a = e.normal,s = e.emphasis;a && a[o] && (t[o] = t[o] || {}, t[o].normal ? r(t[o].normal, a[o]) : t[o].normal = a[o], a[o] = null), s && s[o] && (t[o] = t[o] || {}, t[o].emphasis ? r(t[o].emphasis, s[o]) : t[o].emphasis = s[o], s[o] = null);}}function Ps(t, e, n) {if (t && t[e] && (t[e].normal || t[e].emphasis)) {var i = t[e].normal,r = t[e].emphasis;i && (n ? (t[e].normal = t[e].emphasis = null, s(t[e], i)) : t[e] = i), r && (t.emphasis = t.emphasis || {}, t.emphasis[e] = r);}}function Os(t) {Ps(t, "itemStyle"), Ps(t, "lineStyle"), Ps(t, "areaStyle"), Ps(t, "label"), Ps(t, "labelLine"), Ps(t, "upperLabel"), Ps(t, "edgeLabel");}function Ls(t, e) {var n = $y(t) && t[e],i = $y(n) && n.textStyle;if (i) for (var r = 0, o = av.length; o > r; r++) {var e = av[r];i.hasOwnProperty(e) && (n[e] = i[e]);}}function Bs(t) {t && (Os(t), Ls(t, "label"), t.emphasis && Ls(t.emphasis, "label"));}function zs(t) {if ($y(t)) {As(t), Os(t), Ls(t, "label"), Ls(t, "upperLabel"), Ls(t, "edgeLabel"), t.emphasis && (Ls(t.emphasis, "label"), Ls(t.emphasis, "upperLabel"), Ls(t.emphasis, "edgeLabel"));var e = t.markPoint;e && (As(e), Bs(e));var n = t.markLine;n && (As(n), Bs(n));var i = t.markArea;i && Bs(i);var r = t.data;if ("graph" === t.type) {r = r || t.nodes;var o = t.links || t.edges;if (o && !C(o)) for (var a = 0; a < o.length; a++) {Bs(o[a]);}f(t.categories, function (t) {Os(t);});}if (r && !C(r)) for (var a = 0; a < r.length; a++) {Bs(r[a]);}var e = t.markPoint;if (e && e.data) for (var s = e.data, a = 0; a < s.length; a++) {Bs(s[a]);}var n = t.markLine;if (n && n.data) for (var l = n.data, a = 0; a < l.length; a++) {x(l[a]) ? (Bs(l[a][0]), Bs(l[a][1])) : Bs(l[a]);}"gauge" === t.type ? (Ls(t, "axisLabel"), Ls(t, "title"), Ls(t, "detail")) : "treemap" === t.type ? (Ps(t.breadcrumb, "itemStyle"), f(t.levels, function (t) {Os(t);})) : "tree" === t.type && Os(t.leaves);}}function Es(t) {return x(t) ? t : t ? [t] : [];}function Rs(t) {return (x(t) ? t[0] : t) || {};}function Ns(t, e) {e = e.split(",");for (var n = t, i = 0; i < e.length && (n = n && n[e[i]], null != n); i++) {;}return n;}function Fs(t, e, n, i) {e = e.split(",");for (var r, o = t, a = 0; a < e.length - 1; a++) {r = e[a], null == o[r] && (o[r] = {}), o = o[r];}(i || null == o[e[a]]) && (o[e[a]] = n);}function Hs(t) {f(t_, function (e) {e[0] in t && !(e[1] in t) && (t[e[1]] = t[e[0]]);});}function Vs(t) {f(t, function (e, n) {var i = [],r = [0 / 0, 0 / 0],o = [e.stackResultDimension, e.stackedOverDimension],a = e.data,s = e.isStackedByIndex,l = a.map(o, function (o, l, u) {var h = a.get(e.stackedDimension, u);if (isNaN(h)) return r;var c, d;s ? d = a.getRawIndex(u) : c = a.get(e.stackedByDimension, u);for (var f = 0 / 0, p = n - 1; p >= 0; p--) {var g = t[p];if (s || (d = g.data.rawIndexOf(g.stackedByDimension, c)), d >= 0) {var v = g.data.getByRawIndex(g.stackResultDimension, d);if (h >= 0 && v > 0 || 0 >= h && 0 > v) {h += v, f = v;break;}}}return i[0] = h, i[1] = f, i;});a.hostModel.setData(l), e.data = l;});}function Gs(t, e) {ns.isInstance(t) || (t = ns.seriesDataToSource(t)), this._source = t;var n = this._data = t.data,i = t.sourceFormat;i === Ey && (this._offset = 0, this._dimSize = e, this._data = n);var r = o_[i === Oy ? i + "_" + t.seriesLayoutBy : i];a(this, r);}function Ws() {return this._data.length;}function Xs(t) {return this._data[t];}function Ys(t) {for (var e = 0; e < t.length; e++) {this._data.push(t[e]);}}function Us(t, e, n) {return null != n ? t[n] : t;}function js(t, e, n, i) {return qs(t[i], this._dimensionInfos[e]);}function qs(t, e) {var n = e && e.type;if ("ordinal" === n) {var i = e && e.ordinalMeta;return i ? i.parseAndCollect(t) : t;}return "time" === n && "number" != typeof t && null != t && "-" !== t && (t = +Aa(t)), null == t || "" === t ? 0 / 0 : +t;}function Zs(t, e, n) {if (t) {var i = t.getRawDataItem(e);if (null != i) {var r,o,a = t.getProvider().getSource().sourceFormat,s = t.getDimensionInfo(n);return s && (r = s.name, o = s.index), a_[a](i, e, o, r);}}}function Ks(t) {return new $s(t);}function $s(t) {t = t || {}, this._reset = t.reset, this._plan = t.plan, this._count = t.count, this._onDirty = t.onDirty, this._dirty = !0, this.context;}function Qs(t, e, n, i, r, o) {c_.reset(n, i, r, o), t._callingProgress = e, t._callingProgress({ start: n, end: i, count: i - n, next: c_.next }, t.context);}function Js(t, e) {t._dueIndex = t._outputDueEnd = t._dueEnd = 0, t._settedOutputEnd = null;var n, i;!e && t._reset && (n = t._reset(t.context), n && n.progress && (i = n.forceFirstProgress, n = n.progress), x(n) && !n.length && (n = null)), t._progress = n, t._modBy = t._modDataCount = null;var r = t._downstream;return r && r.dirty(), i;}function tl(t) {var e = t.name;or(t) || (t.name = el(t) || e);}function el(t) {var e = t.getRawData(),n = e.mapDimension("seriesName", !0),i = [];return f(n, function (t) {var n = e.getDimensionInfo(t);n.displayName && i.push(n.displayName);}), i.join(" ");}function nl(t) {return t.model.getRawData().count();}function il(t) {var e = t.model;return e.setData(e.getRawData().cloneShallow()), rl;}function rl(t, e) {e.outputData && t.end > e.outputData.count() && e.model.getRawData().cloneShallow(e.outputData);}function ol(t, e) {f(t.CHANGABLE_METHODS, function (n) {t.wrapMethod(n, _(al, e));});}function al(t) {var e = sl(t);e && e.setOutputEnd(this.count());}function sl(t) {var e = (t.ecModel || {}).scheduler,n = e && e.getPipeline(t.uid);if (n) {var i = n.currentTask;if (i) {var r = i.agentStubMap;r && (i = r.get(t.uid));}return i;}}function ll() {this.group = new ig(), this.uid = va("viewChart"), this.renderTask = Ks({ plan: cl, reset: dl }), this.renderTask.context = { view: this };}function ul(t, e, n) {if (t && (t.trigger(e, n), t.isGroup && !Ho(t))) for (var i = 0, r = t.childCount(); r > i; i++) {ul(t.childAt(i), e, n);}}function hl(t, e, n) {var i = sr(t, e),r = e && null != e.highlightKey ? Vo(e.highlightKey) : null;null != i ? f(Ji(i), function (e) {ul(t.getItemGraphicEl(e), n, r);}) : t.eachItemGraphicEl(function (t) {ul(t, n, r);});}function cl(t) {return y_(t.model);}function dl(t) {var e = t.model,n = t.ecModel,i = t.api,r = t.payload,o = e.pipelineContext.progressiveRender,a = t.view,s = r && m_(r).updateMethod,l = o ? "incrementalPrepareRender" : s && a[s] ? s : "render";return "render" !== l && a[l](e, n, i, r), x_[l];}function fl(t, e, n) {function i() {h = new Date().getTime(), c = null, t.apply(a, s || []);}var r,o,a,s,l,u = 0,h = 0,c = null;e = e || 0;var d = function d() {r = new Date().getTime(), a = this, s = arguments;var t = l || e,d = l || n;l = null, o = r - (d ? u : h) - t, clearTimeout(c), d ? c = setTimeout(i, t) : o >= 0 ? i() : c = setTimeout(i, -o), u = r;};return d.clear = function () {c && (clearTimeout(c), c = null);}, d.debounceNextCall = function (t) {l = t;}, d;}function pl(t, e, n, i) {var r = t[e];if (r) {var o = r[w_] || r,a = r[S_],s = r[b_];if (s !== n || a !== i) {if (null == n || !i) return t[e] = o;r = t[e] = fl(o, n, "debounce" === i), r[w_] = o, r[S_] = i, r[b_] = n;}return r;}}function gl(t, e, n, i) {this.ecInstance = t, this.api = e, this.unfinished;var n = this._dataProcessorHandlers = n.slice(),i = this._visualHandlers = i.slice();this._allHandlers = n.concat(i), this._stageTaskMap = N();}function vl(t, e, n, i, r) {function o(t, e) {return t.setDirty && (!t.dirtyMap || t.dirtyMap.get(e.__pipeline.id));}r = r || {};var a;f(e, function (e) {if (!r.visualType || r.visualType === e.visualType) {var s = t._stageTaskMap.get(e.uid),l = s.seriesTaskMap,u = s.overallTask;if (u) {var h,c = u.agentStubMap;c.each(function (t) {o(r, t) && (t.dirty(), h = !0);}), h && u.dirty(), A_(u, i);var d = t.getPerformArgs(u, r.block);c.each(function (t) {t.perform(d);}), a |= u.perform(d);} else l && l.each(function (s) {o(r, s) && s.dirty();var l = t.getPerformArgs(s, r.block);l.skip = !e.performRawSeries && n.isSeriesFiltered(s.context.model), A_(s, i), a |= s.perform(l);});}}), t.unfinished |= a;}function ml(t, e, n, i, r) {function o(n) {var o = n.uid,s = a.get(o) || a.set(o, Ks({ plan: Sl, reset: Ml, count: Il }));s.context = { model: n, ecModel: i, api: r, useClearVisual: e.isVisual && !e.isLayout, plan: e.plan, reset: e.reset, scheduler: t }, Tl(t, n, s);}var a = n.seriesTaskMap || (n.seriesTaskMap = N()),s = e.seriesType,l = e.getTargetSeries;e.createOnAllSeries ? i.eachRawSeries(o) : s ? i.eachRawSeriesByType(s, o) : l && l(i, r).each(o);var u = t._pipelineMap;a.each(function (t, e) {u.get(e) || (t.dispose(), a.removeKey(e));});}function yl(t, e, n, i, r) {function o(e) {var n = e.uid,i = s.get(n);i || (i = s.set(n, Ks({ reset: xl, onDirty: bl })), a.dirty()), i.context = { model: e, overallProgress: h, modifyOutputEnd: c }, i.agent = a, i.__block = h, Tl(t, e, i);}var a = n.overallTask = n.overallTask || Ks({ reset: _l });a.context = { ecModel: i, api: r, overallReset: e.overallReset, scheduler: t };var s = a.agentStubMap = a.agentStubMap || N(),l = e.seriesType,u = e.getTargetSeries,h = !0,c = e.modifyOutputEnd;l ? i.eachRawSeriesByType(l, o) : u ? u(i, r).each(o) : (h = !1, f(i.getSeries(), o));var d = t._pipelineMap;s.each(function (t, e) {d.get(e) || (t.dispose(), a.dirty(), s.removeKey(e));});}function _l(t) {t.overallReset(t.ecModel, t.api, t.payload);}function xl(t) {return t.overallProgress && wl;}function wl() {this.agent.dirty(), this.getDownstream().dirty();}function bl() {this.agent && this.agent.dirty();}function Sl(t) {return t.plan && t.plan(t.model, t.ecModel, t.api, t.payload);}function Ml(t) {t.useClearVisual && t.data.clearAllVisual();var e = t.resetDefines = Ji(t.reset(t.model, t.ecModel, t.api, t.payload));return e.length > 1 ? p(e, function (t, e) {return Cl(e);}) : P_;}function Cl(t) {return function (e, n) {var i = n.data,r = n.resetDefines[t];if (r && r.dataEach) for (var o = e.start; o < e.end; o++) {r.dataEach(i, o);} else r && r.progress && r.progress(e, i);};}function Il(t) {return t.data.count();}function Tl(t, e, n) {var i = e.uid,r = t._pipelineMap.get(i);!r.head && (r.head = n), r.tail && r.tail.pipe(n), r.tail = n, n.__idxInPipeline = r.count++, n.__pipeline = r;}function kl(t) {O_ = null;try {t(L_, B_);} catch (e) {}return O_;}function Dl(t, e) {for (var n in e.prototype) {t[n] = H;}}function Al(t) {if (b(t)) {var e = new DOMParser();t = e.parseFromString(t, "text/xml");}for (9 === t.nodeType && (t = t.firstChild); "svg" !== t.nodeName.toLowerCase() || 1 !== t.nodeType;) {t = t.nextSibling;}return t;}function Pl() {this._defs = {}, this._root = null, this._isDefine = !1, this._isText = !1;}function Ol(t, e) {for (var n = t.firstChild; n;) {if (1 === n.nodeType) {var i = n.getAttribute("offset");i = i.indexOf("%") > 0 ? parseInt(i, 10) / 100 : i ? parseFloat(i) : 0;var r = n.getAttribute("stop-color") || "#000000";e.addColorStop(i, r);}n = n.nextSibling;}}function Ll(t, e) {t && t.__inheritedStyle && (e.__inheritedStyle || (e.__inheritedStyle = {}), s(e.__inheritedStyle, t.__inheritedStyle));}function Bl(t) {for (var e = B(t).split(G_), n = [], i = 0; i < e.length; i += 2) {var r = parseFloat(e[i]),o = parseFloat(e[i + 1]);n.push([r, o]);}return n;}function zl(t, e, n, i) {var r = e.__inheritedStyle || {},o = "text" === e.type;if (1 === t.nodeType && (Rl(t, e), a(r, Nl(t)), !i)) for (var s in Y_) {if (Y_.hasOwnProperty(s)) {var l = t.getAttribute(s);null != l && (r[Y_[s]] = l);}}var u = o ? "textFill" : "fill",h = o ? "textStroke" : "stroke";e.style = e.style || new dg();var c = e.style;null != r.fill && c.set(u, El(r.fill, n)), null != r.stroke && c.set(h, El(r.stroke, n)), f(["lineWidth", "opacity", "fillOpacity", "strokeOpacity", "miterLimit", "fontSize"], function (t) {var e = "lineWidth" === t && o ? "textStrokeWidth" : t;null != r[t] && c.set(e, parseFloat(r[t]));}), r.textBaseline && "auto" !== r.textBaseline || (r.textBaseline = "alphabetic"), "alphabetic" === r.textBaseline && (r.textBaseline = "bottom"), "start" === r.textAlign && (r.textAlign = "left"), "end" === r.textAlign && (r.textAlign = "right"), f(["lineDashOffset", "lineCap", "lineJoin", "fontWeight", "fontFamily", "fontStyle", "textAlign", "textBaseline"], function (t) {null != r[t] && c.set(t, r[t]);}), r.lineDash && (e.style.lineDash = B(r.lineDash).split(G_)), c[h] && "none" !== c[h] && (e[h] = !0), e.__inheritedStyle = r;}function El(t, e) {var n = e && t && t.match(U_);if (n) {var i = B(n[1]),r = e[i];return r;}return t;}function Rl(t, e) {var n = t.getAttribute("transform");if (n) {n = n.replace(/,/g, " ");var i = null,r = [];n.replace(j_, function (t, e, n) {r.push(e, n);});for (var o = r.length - 1; o > 0; o -= 2) {var a = r[o],s = r[o - 1];switch (i = i || Oe(), s) {case "translate":a = B(a).split(G_), Ee(i, i, [parseFloat(a[0]), parseFloat(a[1] || 0)]);break;case "scale":a = B(a).split(G_), Ne(i, i, [parseFloat(a[0]), parseFloat(a[1] || a[0])]);break;case "rotate":a = B(a).split(G_), Re(i, i, parseFloat(a[0]));break;case "skew":a = B(a).split(G_), console.warn("Skew transform is not supported yet");break;case "matrix":var a = B(a).split(G_);i[0] = parseFloat(a[0]), i[1] = parseFloat(a[1]), i[2] = parseFloat(a[2]), i[3] = parseFloat(a[3]), i[4] = parseFloat(a[4]), i[5] = parseFloat(a[5]);}}e.setLocalTransform(i);}}function Nl(t) {var e = t.getAttribute("style"),n = {};if (!e) return n;var i = {};q_.lastIndex = 0;for (var r; null != (r = q_.exec(e));) {i[r[1]] = r[2];}for (var o in Y_) {Y_.hasOwnProperty(o) && null != i[o] && (n[Y_[o]] = i[o]);}return n;}function Fl(t, e, n) {var i = e / t.width,r = n / t.height,o = Math.min(i, r),a = [o, o],s = [-(t.x + t.width / 2) * o + e / 2, -(t.y + t.height / 2) * o + n / 2];return { scale: a, position: s };}function Hl(t, e) {return function (n, i, r) {(e || !this._disposed) && (n = n && n.toLowerCase(), cp.prototype[t].call(this, n, i, r));};}function Vl() {cp.call(this);}function Gl(t, e, n) {function r(t, e) {return t.__prio - e.__prio;}n = n || {}, "string" == typeof e && (e = Px[e]), this.id, this.group, this._dom = t;var o = "canvas",a = this._zr = qi(t, { renderer: n.renderer || o, devicePixelRatio: n.devicePixelRatio, width: n.width, height: n.height });this._throttledZrFlush = fl(y(a.flush, a), 17);var e = i(e);e && n_(e, !0), this._theme = e, this._chartsViews = [], this._chartsMap = {}, this._componentsViews = [], this._componentsMap = {}, this._coordSysMgr = new Ss();var s = this._api = au(this);Bn(Ax, r), Bn(Tx, r), this._scheduler = new gl(this, s, Tx, Ax), cp.call(this, this._ecEventProcessor = new su()), this._messageCenter = new Vl(), this._initEvents(), this.resize = y(this.resize, this), this._pendingActions = [], a.animation.on("frame", this._onframe, this), Kl(a, this), z(this);}function Wl(t, e, n) {if (!this._disposed) {var i,r = this._model,o = this._coordSysMgr.getCoordinateSystems();e = ur(r, e);for (var a = 0; a < o.length; a++) {var s = o[a];if (s[t] && null != (i = s[t](r, e, n))) return i;}}}function Xl(t) {var e = t._model,n = t._scheduler;n.restorePipelines(e), n.prepareStageTasks(), $l(t, "component", e, n), $l(t, "chart", e, n), n.plan();}function Yl(t, e, n, i, r) {function o(i) {i && i.__alive && i[e] && i[e](i.__model, a, t._api, n);}var a = t._model;if (!i) return void J_(t._componentsViews.concat(t._chartsViews), o);var s = {};s[i + "Id"] = n[i + "Id"], s[i + "Index"] = n[i + "Index"], s[i + "Name"] = n[i + "Name"];var l = { mainType: i, query: s };r && (l.subType = r);var u = n.excludeSeriesId;null != u && (u = N(Ji(u))), a && a.eachComponent(l, function (e) {u && null != u.get(e.id) || o(t["series" === i ? "_chartsMap" : "_componentsMap"][e.__viewId]);}, t);}function Ul(t, e) {var n = t._chartsMap,i = t._scheduler;e.eachSeries(function (t) {i.updateStreamModes(t, n[t.__viewId]);});}function jl(t, e) {var n = t.type,i = t.escapeConnect,r = Cx[n],o = r.actionInfo,l = (o.update || "update").split(":"),u = l.pop();l = null != l[0] && nx(l[0]), this[yx] = !0;var h = [t],c = !1;t.batch && (c = !0, h = p(t.batch, function (e) {return e = s(a({}, e), t), e.batch = null, e;}));var d,f = [],g = "highlight" === n || "downplay" === n;J_(h, function (t) {d = r.action(t, this._model, this._api), d = d || a({}, t), d.type = o.event || d.type, f.push(d), g ? Yl(this, u, t, "series") : l && Yl(this, u, t, l.main, l.sub);}, this), "none" === u || g || l || (this[_x] ? (Xl(this), Sx.update.call(this, t), this[_x] = !1) : Sx[u].call(this, t)), d = c ? { type: o.event || n, escapeConnect: i, batch: f } : f[0], this[yx] = !1, !e && this._messageCenter.trigger(d.type, d);}function ql(t) {for (var e = this._pendingActions; e.length;) {var n = e.shift();jl.call(this, n, t);}}function Zl(t) {!t && this.trigger("updated");}function Kl(t, e) {t.on("rendered", function () {e.trigger("rendered"), !t.animation.isFinished() || e[_x] || e._scheduler.unfinished || e._pendingActions.length || e.trigger("finished");});}function $l(t, e, n, i) {function r(t) {var e = "_ec_" + t.id + "_" + t.type,r = s[e];if (!r) {var h = nx(t.type),c = o ? p_.getClass(h.main, h.sub) : ll.getClass(h.sub);r = new c(), r.init(n, u), s[e] = r, a.push(r), l.add(r.group);}t.__viewId = r.__id = e, r.__alive = !0, r.__model = t, r.group.__ecComponentInfo = { mainType: t.mainType, index: t.componentIndex }, !o && i.prepareView(r, t, n, u);}for (var o = "component" === e, a = o ? t._componentsViews : t._chartsViews, s = o ? t._componentsMap : t._chartsMap, l = t._zr, u = t._api, h = 0; h < a.length; h++) {a[h].__alive = !1;}o ? n.eachComponent(function (t, e) {"series" !== t && r(e);}) : n.eachSeries(r);for (var h = 0; h < a.length;) {var c = a[h];c.__alive ? h++ : (!o && c.renderTask.dispose(), l.remove(c.group), c.dispose(n, u), a.splice(h, 1), delete s[c.__id], c.__id = c.group.__ecComponentInfo = null);}}function Ql(t) {t.clearColorPalette(), t.eachSeries(function (t) {t.clearColorPalette();});}function Jl(t, e, n, i) {tu(t, e, n, i), J_(t._chartsViews, function (t) {t.__alive = !1;}), eu(t, e, n, i), J_(t._chartsViews, function (t) {t.__alive || t.remove(e, n);});}function tu(t, e, n, i, r) {J_(r || t._componentsViews, function (t) {var r = t.__model;t.render(r, e, n, i), ou(r, t);});}function eu(t, e, n, i, r) {var o,a = t._scheduler;e.eachSeries(function (e) {var n = t._chartsMap[e.__viewId];n.__alive = !0;var s = n.renderTask;a.updatePayload(s, i), r && r.get(e.uid) && s.dirty(), o |= s.perform(a.getPerformArgs(s)), n.group.silent = !!e.get("silent"), ou(e, n), ru(e, n);}), a.unfinished |= o, iu(t, e), I_(t._zr.dom, e);}function nu(t, e) {J_(Dx, function (n) {n(t, e);});}function iu(t, e) {var n = t._zr,i = n.storage,r = 0;i.traverse(function () {r++;}), r > e.get("hoverLayerThreshold") && !Wf.node && e.eachSeries(function (e) {if (!e.preventUsingHoverLayer) {var n = t._chartsMap[e.__viewId];n.__alive && n.group.traverse(function (t) {t.useHoverLayer = !0;});}});}function ru(t, e) {var n = t.get("blendMode") || null;e.group.traverse(function (t) {t.isGroup || t.style.blend !== n && t.setStyle("blend", n), t.eachPendingDisplayable && t.eachPendingDisplayable(function (t) {t.setStyle("blend", n);});});}function ou(t, e) {var n = t.get("z"),i = t.get("zlevel");e.group.traverse(function (t) {"group" !== t.type && (null != n && (t.z = n), null != i && (t.zlevel = i));});}function au(t) {var e = t._coordSysMgr;return a(new bs(t), { getCoordinateSystems: y(e.getCoordinateSystems, e), getComponentByElement: function getComponentByElement(e) {for (; e;) {var n = e.__ecComponentInfo;if (null != n) return t._model.getComponent(n.mainType, n.index);e = e.parent;}} });}function su() {this.eventInfo;}function lu(t) {function e(t, e) {for (var n = 0; n < t.length; n++) {var i = t[n];i[o] = e;}}var n = 0,i = 1,r = 2,o = "__connectUpdateStatus";J_(Ix, function (a, s) {t._messageCenter.on(s, function (a) {if (Bx[t.group] && t[o] !== n) {if (a && a.escapeConnect) return;var s = t.makeActionFromEvent(a),l = [];J_(Lx, function (e) {e !== t && e.group === t.group && l.push(e);}), e(l, n), J_(l, function (t) {t[o] !== i && t.dispatchAction(s);}), e(l, r);}});});}function uu(t, e, n) {var i = fu(t);if (i) return i;var r = new Gl(t, e, n);return r.id = "ec_" + zx++, Lx[r.id] = r, cr(t, Rx, r.id), lu(r), r;}function hu(t) {if (x(t)) {var e = t;t = null, J_(e, function (e) {null != e.group && (t = e.group);}), t = t || "g_" + Ex++, J_(e, function (e) {e.group = t;});}return Bx[t] = !0, t;}function cu(t) {Bx[t] = !1;}function du(t) {"string" == typeof t ? t = Lx[t] : t instanceof Gl || (t = fu(t)), t instanceof Gl && !t.isDisposed() && t.dispose();}function fu(t) {return Lx[dr(t, Rx)];}function pu(t) {return Lx[t];}function gu(t, e) {Px[t] = e;}function vu(t) {kx.push(t);}function mu(t, e) {Mu(Tx, t, e, ax);}function yu(t) {Dx.push(t);
  }function _u(t, e, n) {"function" == typeof e && (n = e, e = "");var i = ex(t) ? t.type : [t, t = { event: e }][0];t.event = (t.event || i).toLowerCase(), e = t.event, Q_(xx.test(i) && xx.test(e)), Cx[i] || (Cx[i] = { action: n, actionInfo: t }), Ix[e] = i;}function xu(t, e) {Ss.register(t, e);}function wu(t) {var e = Ss.get(t);return e ? e.getDimensionsInfo ? e.getDimensionsInfo() : e.dimensions.slice() : void 0;}function bu(t, e) {Mu(Ax, t, e, hx, "layout");}function Su(t, e) {Mu(Ax, t, e, fx, "visual");}function Mu(t, e, n, i, r) {(tx(e) || ex(e)) && (n = e, e = i);var o = gl.wrapStageHandler(n, r);return o.__prio = e, o.__raw = n, t.push(o), o;}function Cu(t, e) {Ox[t] = e;}function Iu(t) {return Iy.extend(t);}function Tu(t) {return p_.extend(t);}function ku(t) {return f_.extend(t);}function Du(t) {return ll.extend(t);}function Au(t) {n("createCanvas", t);}function Pu(t, e, n) {K_.registerMap(t, e, n);}function Ou(t) {var e = K_.retrieveMap(t);return e && e[0] && { geoJson: e[0].geoJSON, specialAreas: e[0].specialAreas };}function Lu(t) {return t;}function Bu(t, e, n, i, r) {this._old = t, this._new = e, this._oldKeyGetter = n || Lu, this._newKeyGetter = i || Lu, this.context = r;}function zu(t, e, n, i, r) {for (var o = 0; o < t.length; o++) {var a = "_ec_" + r[i](t[o], o),s = e[a];null == s ? (n.push(a), e[a] = o) : (s.length || (e[a] = s = [s]), s.push(o));}}function Eu(t) {var e = {},n = e.encode = {},i = N(),r = [],o = [],a = e.userOutput = { dimensionNames: t.dimensions.slice(), encode: {} };f(t.dimensions, function (e) {var s = t.getDimensionInfo(e),l = s.coordDim;if (l) {var u = s.coordDimIndex;Ru(n, l)[u] = e, s.isExtraCoord || (i.set(l, 1), Fu(s.type) && (r[0] = e), Ru(a.encode, l)[u] = s.index), s.defaultTooltip && o.push(e);}Hx.each(function (t, e) {var i = Ru(n, e),r = s.otherDims[e];null != r && r !== !1 && (i[r] = s.name);});});var s = [],l = {};i.each(function (t, e) {var i = n[e];l[e] = i[0], s = s.concat(i);}), e.dataDimsOnCoord = s, e.encodeFirstDimNotExtra = l;var u = n.label;u && u.length && (r = u.slice());var h = n.tooltip;return h && h.length ? o = h.slice() : o.length || (o = r.slice()), n.defaultedLabel = r, n.defaultedTooltip = o, e;}function Ru(t, e) {return t.hasOwnProperty(e) || (t[e] = []), t[e];}function Nu(t) {return "category" === t ? "ordinal" : "time" === t ? "time" : "float";}function Fu(t) {return !("ordinal" === t || "time" === t);}function Hu(t) {null != t && a(this, t), this.otherDims = {};}function Vu(t) {return t._rawCount > 65535 ? Ux : qx;}function Gu(t) {var e = t.constructor;return e === Array ? t.slice() : new e(t);}function Wu(t, e) {f(Zx.concat(e.__wrappedMethods || []), function (n) {e.hasOwnProperty(n) && (t[n] = e[n]);}), t.__wrappedMethods = e.__wrappedMethods, f(Kx, function (n) {t[n] = i(e[n]);}), t._calculationInfo = a(e._calculationInfo);}function Xu(t, e, n, i, r) {var o = Yx[e.type],a = i - 1,s = e.name,l = t[s][a];if (l && l.length < n) {for (var u = new o(Math.min(r - a * n, n)), h = 0; h < l.length; h++) {u[h] = l[h];}t[s][a] = u;}for (var c = i * n; r > c; c += n) {t[s].push(new o(Math.min(r - c, n)));}}function Yu(t) {var e = t._invertedIndicesMap;f(e, function (n, i) {var r = t._dimensionInfos[i],o = r.ordinalMeta;if (o) {n = e[i] = new jx(o.categories.length);for (var a = 0; a < n.length; a++) {n[a] = Wx;}for (var a = 0; a < t._count; a++) {n[t.get(i, a)] = a;}}});}function Uu(t, e, n) {var i;if (null != e) {var r = t._chunkSize,o = Math.floor(n / r),a = n % r,s = t.dimensions[e],l = t._storage[s][o];if (l) {i = l[a];var u = t._dimensionInfos[s].ordinalMeta;u && u.categories.length && (i = u.categories[i]);}}return i;}function ju(t) {return t;}function qu(t) {return t < this._count && t >= 0 ? this._indices[t] : -1;}function Zu(t, e) {var n = t._idList[e];return null == n && (n = Uu(t, t._idDimIdx, e)), null == n && (n = Xx + e), n;}function Ku(t) {return x(t) || (t = [t]), t;}function $u(t, e) {var n = t.dimensions,i = new $x(p(n, t.getDimensionInfo, t), t.hostModel);Wu(i, t);for (var r = i._storage = {}, o = t._storage, a = 0; a < n.length; a++) {var s = n[a];o[s] && (u(e, s) >= 0 ? (r[s] = Qu(o[s]), i._rawExtent[s] = Ju(), i._extent[s] = null) : r[s] = o[s]);}return i;}function Qu(t) {for (var e = new Array(t.length), n = 0; n < t.length; n++) {e[n] = Gu(t[n]);}return e;}function Ju() {return [1 / 0, -1 / 0];}function th(t, e, n) {function r(t, e, n) {null != Hx.get(e) ? t.otherDims[e] = n : (t.coordDim = e, t.coordDimIndex = n, u.set(e, !0));}ns.isInstance(e) || (e = ns.seriesDataToSource(e)), n = n || {}, t = (t || []).slice();for (var o = (n.dimsDef || []).slice(), l = N(), u = N(), h = [], c = eh(e, t, o, n.dimCount), d = 0; c > d; d++) {var p = o[d] = a({}, S(o[d]) ? o[d] : { name: o[d] }),g = p.name,v = h[d] = new Hu();null != g && null == l.get(g) && (v.name = v.displayName = g, l.set(g, d)), null != p.type && (v.type = p.type), null != p.displayName && (v.displayName = p.displayName);}var m = n.encodeDef;!m && n.encodeDefaulter && (m = n.encodeDefaulter(e, c)), m = N(m), m.each(function (t, e) {if (t = Ji(t).slice(), 1 === t.length && !b(t[0]) && t[0] < 0) return void m.set(e, !1);var n = m.set(e, []);f(t, function (t, i) {b(t) && (t = l.get(t)), null != t && c > t && (n[i] = t, r(h[t], e, i));});});var y = 0;f(t, function (t) {var e, t, n, o;if (b(t)) e = t, t = {};else {e = t.name;var a = t.ordinalMeta;t.ordinalMeta = null, t = i(t), t.ordinalMeta = a, n = t.dimsDef, o = t.otherDims, t.name = t.coordDim = t.coordDimIndex = t.dimsDef = t.otherDims = null;}var l = m.get(e);if (l !== !1) {var l = Ji(l);if (!l.length) for (var u = 0; u < (n && n.length || 1); u++) {for (; y < h.length && null != h[y].coordDim;) {y++;}y < h.length && l.push(y++);}f(l, function (i, a) {var l = h[i];if (r(s(l, t), e, a), null == l.name && n) {var u = n[a];!S(u) && (u = { name: u }), l.name = l.displayName = u.name, l.defaultTooltip = u.defaultTooltip;}o && s(l.otherDims, o);});}});var _ = n.generateCoord,x = n.generateCoordCount,w = null != x;x = _ ? x || 1 : 0;for (var M = _ || "value", C = 0; c > C; C++) {var v = h[C] = h[C] || new Hu(),I = v.coordDim;null == I && (v.coordDim = nh(M, u, w), v.coordDimIndex = 0, (!_ || 0 >= x) && (v.isExtraCoord = !0), x--), null == v.name && (v.name = nh(v.coordDim, l)), null != v.type || fs(e, C, v.name) !== Fy.Must && (!v.isExtraCoord || null == v.otherDims.itemName && null == v.otherDims.seriesName) || (v.type = "ordinal");}return h;}function eh(t, e, n, i) {var r = Math.max(t.dimensionsDetectCount || 1, e.length, n.length, i || 0);return f(e, function (t) {var e = t.dimsDef;e && (r = Math.max(r, e.length));}), r;}function nh(t, e, n) {if (n || null != e.get(t)) {for (var i = 0; null != e.get(t + i);) {i++;}t += i;}return e.set(t, !0), t;}function ih(t) {this.coordSysName = t, this.coordSysDims = [], this.axisMap = N(), this.categoryAxisMap = N(), this.firstCategoryDimIndex = null;}function rh(t) {var e = t.get("coordinateSystem"),n = new ih(e),i = ew[e];return i ? (i(t, n, n.axisMap, n.categoryAxisMap), n) : void 0;}function oh(t) {return "category" === t.get("type");}function ah(t, e, n) {n = n || {};var i,r,o,a,s = n.byIndex,l = n.stackedCoordDimension,u = !(!t || !t.get("stack"));if (f(e, function (t, n) {b(t) && (e[n] = t = { name: t }), u && !t.isExtraCoord && (s || i || !t.ordinalMeta || (i = t), r || "ordinal" === t.type || "time" === t.type || l && l !== t.coordDim || (r = t));}), !r || s || i || (s = !0), r) {o = "__\x00ecstackresult", a = "__\x00ecstackedover", i && (i.createInvertedIndices = !0);var h = r.coordDim,c = r.type,d = 0;f(e, function (t) {t.coordDim === h && d++;}), e.push({ name: o, coordDim: h, coordDimIndex: d, type: c, isExtraCoord: !0, isCalculationCoord: !0 }), d++, e.push({ name: a, coordDim: a, coordDimIndex: d, type: c, isExtraCoord: !0, isCalculationCoord: !0 });}return { stackedDimension: r && r.name, stackedByDimension: i && i.name, isStackedByIndex: s, stackedOverDimension: a, stackResultDimension: o };}function sh(t, e) {return !!e && e === t.getCalculationInfo("stackedDimension");}function lh(t, e) {return sh(t, e) ? t.getCalculationInfo("stackResultDimension") : e;}function uh(t, e, n) {n = n || {}, ns.isInstance(t) || (t = ns.seriesDataToSource(t));var i,r = e.get("coordinateSystem"),o = Ss.get(r),a = rh(e);a && (i = p(a.coordSysDims, function (t) {var e = { name: t },n = a.axisMap.get(t);if (n) {var i = n.get("type");e.type = Nu(i);}return e;})), i || (i = o && (o.getDimensionsInfo ? o.getDimensionsInfo() : o.dimensions.slice()) || ["x", "y"]);var s,l,u = tw(t, { coordDimensions: i, generateCoord: n.generateCoord, encodeDefaulter: n.useEncodeDefaulter ? _(cs, i, e) : null });a && f(u, function (t, e) {var n = t.coordDim,i = a.categoryAxisMap.get(n);i && (null == s && (s = e), t.ordinalMeta = i.getOrdinalMeta()), null != t.otherDims.itemName && (l = !0);}), l || null == s || (u[s].otherDims.itemName = 0);var h = ah(e, u),c = new $x(u, e);c.setCalculationInfo(h);var d = null != s && hh(t) ? function (t, e, n, i) {return i === s ? n : this.defaultDimValueGetter(t, e, n, i);} : null;return c.hasItemOption = !1, c.initData(t, null, d), c;}function hh(t) {if (t.sourceFormat === Py) {var e = ch(t.data || []);return null != e && !x(er(e));}}function ch(t) {for (var e = 0; e < t.length && null == t[e];) {e++;}return t[e];}function dh(t) {this._setting = t || {}, this._extent = [1 / 0, -1 / 0], this._interval = 0, this.init && this.init.apply(this, arguments);}function fh(t) {this.categories = t.categories || [], this._needCollect = t.needCollect, this._deduplication = t.deduplication, this._map;}function ph(t) {return t._map || (t._map = N(t.categories));}function gh(t) {return S(t) && null != t.value ? t.value : t + "";}function vh(t, e, n, i) {var r = {},o = t[1] - t[0],a = r.interval = La(o / e, !0);null != n && n > a && (a = r.interval = n), null != i && a > i && (a = r.interval = i);var s = r.intervalPrecision = mh(a),l = r.niceTickExtent = [ow(Math.ceil(t[0] / a) * a, s), ow(Math.floor(t[1] / a) * a, s)];return _h(l, t), r;}function mh(t) {return Ca(t) + 2;}function yh(t, e, n) {t[e] = Math.max(Math.min(t[e], n[1]), n[0]);}function _h(t, e) {!isFinite(t[0]) && (t[0] = e[0]), !isFinite(t[1]) && (t[1] = e[1]), yh(t, 0, e), yh(t, 1, e), t[0] > t[1] && (t[0] = t[1]);}function xh(t) {return t.get("stack") || lw + t.seriesIndex;}function wh(t) {return t.dim + t.index;}function bh(t, e) {var n = [];return e.eachSeriesByType(t, function (t) {kh(t) && !Dh(t) && n.push(t);}), n;}function Sh(t) {var e = {};f(t, function (t) {var n = t.coordinateSystem,i = n.getBaseAxis();if ("time" === i.type || "value" === i.type) for (var r = t.getData(), o = i.dim + "_" + i.index, a = r.mapDimension(i.dim), s = 0, l = r.count(); l > s; ++s) {var u = r.get(a, s);e[o] ? e[o].push(u) : e[o] = [u];}});var n = [];for (var i in e) {if (e.hasOwnProperty(i)) {var r = e[i];if (r) {r.sort(function (t, e) {return t - e;});for (var o = null, a = 1; a < r.length; ++a) {var s = r[a] - r[a - 1];s > 0 && (o = null === o ? s : Math.min(o, s));}n[i] = o;}}}return n;}function Mh(t) {var e = Sh(t),n = [];return f(t, function (t) {var i,r = t.coordinateSystem,o = r.getBaseAxis(),a = o.getExtent();if ("category" === o.type) i = o.getBandWidth();else if ("value" === o.type || "time" === o.type) {var s = o.dim + "_" + o.index,l = e[s],u = Math.abs(a[1] - a[0]),h = o.scale.getExtent(),c = Math.abs(h[1] - h[0]);i = l ? u / c * l : u;} else {var d = t.getData();i = Math.abs(a[1] - a[0]) / d.count();}var f = wa(t.get("barWidth"), i),p = wa(t.get("barMaxWidth"), i),g = wa(t.get("barMinWidth") || 1, i),v = t.get("barGap"),m = t.get("barCategoryGap");n.push({ bandWidth: i, barWidth: f, barMaxWidth: p, barMinWidth: g, barGap: v, barCategoryGap: m, axisKey: wh(o), stackId: xh(t) });}), Ch(n);}function Ch(t) {var e = {};f(t, function (t) {var n = t.axisKey,i = t.bandWidth,r = e[n] || { bandWidth: i, remainedWidth: i, autoWidthCount: 0, categoryGap: "20%", gap: "30%", stacks: {} },o = r.stacks;e[n] = r;var a = t.stackId;o[a] || r.autoWidthCount++, o[a] = o[a] || { width: 0, maxWidth: 0 };var s = t.barWidth;s && !o[a].width && (o[a].width = s, s = Math.min(r.remainedWidth, s), r.remainedWidth -= s);var l = t.barMaxWidth;l && (o[a].maxWidth = l);var u = t.barMinWidth;u && (o[a].minWidth = u);var h = t.barGap;null != h && (r.gap = h);var c = t.barCategoryGap;null != c && (r.categoryGap = c);});var n = {};return f(e, function (t, e) {n[e] = {};var i = t.stacks,r = t.bandWidth,o = wa(t.categoryGap, r),a = wa(t.gap, 1),s = t.remainedWidth,l = t.autoWidthCount,u = (s - o) / (l + (l - 1) * a);u = Math.max(u, 0), f(i, function (t) {var e = t.maxWidth,n = t.minWidth;if (t.width) {var i = t.width;e && (i = Math.min(i, e)), n && (i = Math.max(i, n)), t.width = i, s -= i + a * i, l--;} else {var i = u;e && i > e && (i = Math.min(e, s)), n && n > i && (i = n), i !== u && (t.width = i, s -= i + a * i, l--);}}), u = (s - o) / (l + (l - 1) * a), u = Math.max(u, 0);var h,c = 0;f(i, function (t) {t.width || (t.width = u), h = t, c += t.width * (1 + a);}), h && (c -= h.width * a);var d = -c / 2;f(i, function (t, i) {n[e][i] = n[e][i] || { bandWidth: r, offset: d, width: t.width }, d += t.width * (1 + a);});}), n;}function Ih(t, e, n) {if (t && e) {var i = t[wh(e)];return null != i && null != n && (i = i[xh(n)]), i;}}function Th(t, e) {var n = bh(t, e),i = Mh(n),r = {};f(n, function (t) {var e = t.getData(),n = t.coordinateSystem,o = n.getBaseAxis(),a = xh(t),s = i[wh(o)][a],l = s.offset,u = s.width,h = n.getOtherAxis(o),c = t.get("barMinHeight") || 0;r[a] = r[a] || [], e.setLayout({ bandWidth: s.bandWidth, offset: l, size: u });for (var d = e.mapDimension(h.dim), f = e.mapDimension(o.dim), p = sh(e, d), g = h.isHorizontal(), v = Ah(o, h, p), m = 0, y = e.count(); y > m; m++) {var _ = e.get(d, m),x = e.get(f, m),w = _ >= 0 ? "p" : "n",b = v;p && (r[a][x] || (r[a][x] = { p: v, n: v }), b = r[a][x][w]);var S, M, C, I;if (g) {var T = n.dataToPoint([_, x]);S = b, M = T[1] + l, C = T[0] - v, I = u, Math.abs(C) < c && (C = (0 > C ? -1 : 1) * c), isNaN(C) || p && (r[a][x][w] += C);} else {var T = n.dataToPoint([x, _]);S = T[0] + l, M = b, C = u, I = T[1] - v, Math.abs(I) < c && (I = (0 >= I ? -1 : 1) * c), isNaN(I) || p && (r[a][x][w] += I);}e.setItemLayout(m, { x: S, y: M, width: C, height: I });}}, this);}function kh(t) {return t.coordinateSystem && "cartesian2d" === t.coordinateSystem.type;}function Dh(t) {return t.pipelineContext && t.pipelineContext.large;}function Ah(t, e) {return e.toGlobalCoord(e.dataToCoord("log" === e.type ? 1 : 0));}function Ph(t, e) {return Cw(t, Mw(e));}function Oh(t, e) {var n,i,r,o = t.type,a = e.getMin(),s = e.getMax(),l = t.getExtent();"ordinal" === o ? n = e.getCategories().length : (i = e.get("boundaryGap"), x(i) || (i = [i || 0, i || 0]), "boolean" == typeof i[0] && (i = [0, 0]), i[0] = wa(i[0], 1), i[1] = wa(i[1], 1), r = l[1] - l[0] || Math.abs(l[0])), "dataMin" === a ? a = l[0] : "function" == typeof a && (a = a({ min: l[0], max: l[1] })), "dataMax" === s ? s = l[1] : "function" == typeof s && (s = s({ min: l[0], max: l[1] }));var u = null != a,h = null != s;null == a && (a = "ordinal" === o ? n ? 0 : 0 / 0 : l[0] - i[0] * r), null == s && (s = "ordinal" === o ? n ? n - 1 : 0 / 0 : l[1] + i[1] * r), (null == a || !isFinite(a)) && (a = 0 / 0), (null == s || !isFinite(s)) && (s = 0 / 0), t.setBlank(T(a) || T(s) || "ordinal" === o && !t.getOrdinalMeta().categories.length), e.getNeedCrossZero() && (a > 0 && s > 0 && !u && (a = 0), 0 > a && 0 > s && !h && (s = 0));var c = e.ecModel;if (c && "time" === o) {var d,p = bh("bar", c);if (f(p, function (t) {d |= t.getBaseAxis() === e.axis;}), d) {var g = Mh(p),v = Lh(a, s, e, g);a = v.min, s = v.max;}}return { extent: [a, s], fixMin: u, fixMax: h };}function Lh(t, e, n, i) {var r = n.axis.getExtent(),o = r[1] - r[0],a = Ih(i, n.axis);if (void 0 === a) return { min: t, max: e };var s = 1 / 0;f(a, function (t) {s = Math.min(t.offset, s);});var l = -1 / 0;f(a, function (t) {l = Math.max(t.offset + t.width, l);}), s = Math.abs(s), l = Math.abs(l);var u = s + l,h = e - t,c = 1 - (s + l) / o,d = h / c - h;return e += d * (l / u), t -= d * (s / u), { min: t, max: e };}function Bh(t, e) {var n = Oh(t, e),i = n.extent,r = e.get("splitNumber");"log" === t.type && (t.base = e.get("logBase"));var o = t.type;t.setExtent(i[0], i[1]), t.niceExtent({ splitNumber: r, fixMin: n.fixMin, fixMax: n.fixMax, minInterval: "interval" === o || "time" === o ? e.get("minInterval") : null, maxInterval: "interval" === o || "time" === o ? e.get("maxInterval") : null });var a = e.get("interval");null != a && t.setInterval && t.setInterval(a);}function zh(t, e) {if (e = e || t.get("type")) switch (e) {case "category":return new rw(t.getOrdinalMeta ? t.getOrdinalMeta() : t.getCategories(), [1 / 0, -1 / 0]);case "value":return new sw();default:return (dh.getClass(e) || sw).create(t);}}function Eh(t) {var e = t.scale.getExtent(),n = e[0],i = e[1];return !(n > 0 && i > 0 || 0 > n && 0 > i);}function Rh(t) {var e = t.getLabelModel().get("formatter"),n = "category" === t.type ? t.scale.getExtent()[0] : null;return "string" == typeof e ? e = function (e) {return function (n) {return n = t.scale.getLabel(n), e.replace("{value}", null != n ? n : "");};}(e) : "function" == typeof e ? function (i, r) {return null != n && (r = i - n), e(Nh(t, i), r);} : function (e) {return t.scale.getLabel(e);};}function Nh(t, e) {return "category" === t.type ? t.scale.getLabel(e) : e;}function Fh(t) {var e = t.model,n = t.scale;if (e.get("axisLabel.show") && !n.isBlank()) {var i,r,o = "category" === t.type,a = n.getExtent();o ? r = n.count() : (i = n.getTicks(), r = i.length);var s,l = t.getLabelModel(),u = Rh(t),h = 1;r > 40 && (h = Math.ceil(r / 40));for (var c = 0; r > c; c += h) {var d = i ? i[c] : a[0] + c,f = u(d),p = l.getTextRect(f),g = Hh(p, l.get("rotate") || 0);s ? s.union(g) : s = g;}return s;}}function Hh(t, e) {var n = e * Math.PI / 180,i = t.plain(),r = i.width,o = i.height,a = r * Math.abs(Math.cos(n)) + Math.abs(o * Math.sin(n)),s = r * Math.abs(Math.sin(n)) + Math.abs(o * Math.cos(n)),l = new In(i.x, i.y, a, s);return l;}function Vh(t) {var e = t.get("interval");return null == e ? "auto" : e;}function Gh(t) {return "category" === t.type && 0 === Vh(t.getLabelModel());}function Wh(t, e) {if ("image" !== this.type) {var n = this.style,i = this.shape;i && "line" === i.symbolType ? n.stroke = t : this.__isEmptyBrush ? (n.stroke = t, n.fill = e || "#fff") : (n.fill && (n.fill = t), n.stroke && (n.stroke = t)), this.dirty(!1);}}function Xh(t, e, n, i, r, o, a) {var s = 0 === t.indexOf("empty");s && (t = t.substr(5, 1).toLowerCase() + t.substr(6));var l;return l = 0 === t.indexOf("image://") ? xo(t.slice(8), new In(e, n, i, r), a ? "center" : "cover") : 0 === t.indexOf("path://") ? _o(t.slice(7), {}, new In(e, n, i, r), a ? "center" : "cover") : new Fw({ shape: { symbolType: t, x: e, y: n, width: i, height: r } }), l.__isEmptyBrush = s, l.setColor = Wh, l.setColor(o), l;}function Yh(t) {return uh(t.getSource(), t);}function Uh(t, e) {var n = e;fa.isInstance(e) || (n = new fa(e), c(n, Pw));var i = zh(n);return i.setExtent(t[0], t[1]), Bh(i, n), i;}function jh(t) {c(t, Pw);}function qh(t, e) {return Math.abs(t - e) < Gw;}function Zh(t, e, n) {var i = 0,r = t[0];if (!r) return !1;for (var o = 1; o < t.length; o++) {var a = t[o];i += Yr(r[0], r[1], a[0], a[1], e, n), r = a;}var s = t[0];return qh(r[0], s[0]) && qh(r[1], s[1]) || (i += Yr(r[0], r[1], s[0], s[1], e, n)), 0 !== i;}function Kh(t, e, n) {if (this.name = t, this.geometries = e, n) n = [n[0], n[1]];else {var i = this.getBoundingRect();n = [i.x + i.width / 2, i.y + i.height / 2];}this.center = n;}function $h(t) {if (!t.UTF8Encoding) return t;var e = t.UTF8Scale;null == e && (e = 1024);for (var n = t.features, i = 0; i < n.length; i++) {for (var r = n[i], o = r.geometry, a = o.coordinates, s = o.encodeOffsets, l = 0; l < a.length; l++) {var u = a[l];if ("Polygon" === o.type) a[l] = Qh(u, s[l], e);else if ("MultiPolygon" === o.type) for (var h = 0; h < u.length; h++) {var c = u[h];u[h] = Qh(c, s[l][h], e);}}}return t.UTF8Encoding = !1, t;}function Qh(t, e, n) {for (var i = [], r = e[0], o = e[1], a = 0; a < t.length; a += 2) {var s = t.charCodeAt(a) - 64,l = t.charCodeAt(a + 1) - 64;s = s >> 1 ^ -(1 & s), l = l >> 1 ^ -(1 & l), s += r, l += o, r = s, o = l, i.push([s / n, l / n]);}return i;}function Jh(t) {return "category" === t.type ? ec(t) : rc(t);}function tc(t, e) {return "category" === t.type ? ic(t, e) : { ticks: t.scale.getTicks() };}function ec(t) {var e = t.getLabelModel(),n = nc(t, e);return !e.get("show") || t.scale.isBlank() ? { labels: [], labelCategoryInterval: n.labelCategoryInterval } : n;}function nc(t, e) {var n = oc(t, "labels"),i = Vh(e),r = ac(n, i);if (r) return r;var o, a;return w(i) ? o = dc(t, i) : (a = "auto" === i ? lc(t) : i, o = cc(t, a)), sc(n, i, { labels: o, labelCategoryInterval: a });}function ic(t, e) {var n = oc(t, "ticks"),i = Vh(e),r = ac(n, i);if (r) return r;var o, a;if ((!e.get("show") || t.scale.isBlank()) && (o = []), w(i)) o = dc(t, i, !0);else if ("auto" === i) {var s = nc(t, t.getLabelModel());a = s.labelCategoryInterval, o = p(s.labels, function (t) {return t.tickValue;});} else a = i, o = cc(t, a, !0);return sc(n, i, { ticks: o, tickCategoryInterval: a });}function rc(t) {var e = t.scale.getTicks(),n = Rh(t);return { labels: p(e, function (e, i) {return { formattedLabel: n(e, i), rawLabel: t.scale.getLabel(e), tickValue: e };}) };}function oc(t, e) {return Xw(t)[e] || (Xw(t)[e] = []);}function ac(t, e) {for (var n = 0; n < t.length; n++) {if (t[n].key === e) return t[n].value;}}function sc(t, e, n) {return t.push({ key: e, value: n }), n;}function lc(t) {var e = Xw(t).autoInterval;return null != e ? e : Xw(t).autoInterval = t.calculateCategoryInterval();}function uc(t) {var e = hc(t),n = Rh(t),i = (e.axisRotate - e.labelRotate) / 180 * Math.PI,r = t.scale,o = r.getExtent(),a = r.count();if (o[1] - o[0] < 1) return 0;var s = 1;a > 40 && (s = Math.max(1, Math.floor(a / 40)));for (var l = o[0], u = t.dataToCoord(l + 1) - t.dataToCoord(l), h = Math.abs(u * Math.cos(i)), c = Math.abs(u * Math.sin(i)), d = 0, f = 0; l <= o[1]; l += s) {var p = 0,g = 0,v = Yn(n(l), e.font, "center", "top");p = 1.3 * v.width, g = 1.3 * v.height, d = Math.max(d, p, 7), f = Math.max(f, g, 7);}var m = d / h,y = f / c;isNaN(m) && (m = 1 / 0), isNaN(y) && (y = 1 / 0);var _ = Math.max(0, Math.floor(Math.min(m, y))),x = Xw(t.model),w = t.getExtent(),b = x.lastAutoInterval,S = x.lastTickCount;return null != b && null != S && Math.abs(b - _) <= 1 && Math.abs(S - a) <= 1 && b > _ && x.axisExtend0 === w[0] && x.axisExtend1 === w[1] ? _ = b : (x.lastTickCount = a, x.lastAutoInterval = _, x.axisExtend0 = w[0], x.axisExtend1 = w[1]), _;}function hc(t) {var e = t.getLabelModel();return { axisRotate: t.getRotate ? t.getRotate() : t.isHorizontal && !t.isHorizontal() ? 90 : 0, labelRotate: e.get("rotate") || 0, font: e.getFont() };}function cc(t, e, n) {function i(t) {l.push(n ? t : { formattedLabel: r(t), rawLabel: o.getLabel(t), tickValue: t });}var r = Rh(t),o = t.scale,a = o.getExtent(),s = t.getLabelModel(),l = [],u = Math.max((e || 0) + 1, 1),h = a[0],c = o.count();0 !== h && u > 1 && c / u > 2 && (h = Math.round(Math.ceil(h / u) * u));var d = Gh(t),f = s.get("showMinLabel") || d,p = s.get("showMaxLabel") || d;f && h !== a[0] && i(a[0]);for (var g = h; g <= a[1]; g += u) {i(g);}return p && g - u !== a[1] && i(a[1]), l;}function dc(t, e, n) {var i = t.scale,r = Rh(t),o = [];return f(i.getTicks(), function (t) {var a = i.getLabel(t);e(t, a) && o.push(n ? t : { formattedLabel: r(t), rawLabel: a, tickValue: t });}), o;}function fc(t, e) {var n = t[1] - t[0],i = e,r = n / i / 2;t[0] += r, t[1] -= r;}function pc(t, e, n, i) {function r(t, e) {return t = ba(t), e = ba(e), d ? t > e : e > t;}var o = e.length;if (t.onBand && !n && o) {var a,s,l = t.getExtent();if (1 === o) e[0].coord = l[0], a = e[1] = { coord: l[0] };else {var u = e[o - 1].tickValue - e[0].tickValue,h = (e[o - 1].coord - e[0].coord) / u;f(e, function (t) {t.coord -= h / 2;});var c = t.scale.getExtent();s = 1 + c[1] - e[o - 1].tickValue, a = { coord: e[o - 1].coord + h * s }, e.push(a);}var d = l[0] > l[1];r(e[0].coord, l[0]) && (i ? e[0].coord = l[0] : e.shift()), i && r(l[0], e[0].coord) && e.unshift({ coord: l[0] }), r(l[1], a.coord) && (i ? a.coord = l[1] : e.pop()), i && r(a.coord, l[1]) && e.push({ coord: l[1] });}}function gc(t) {return this._axes[t];}function vc(t) {Kw.call(this, t);}function mc(t, e) {return e.type || (e.data ? "category" : "value");}function yc(t, e) {return t.getCoordSysModel() === e;}function _c(t, e, n) {this._coordsMap = {}, this._coordsList = [], this._axesMap = {}, this._axesList = [], this._initCartesian(t, e, n), this.model = t;}function xc(t, e, n, i) {function r(t) {return t.dim + "_" + t.index;}n.getAxesOnZeroOf = function () {return o ? [o] : [];};var o,a = t[e],s = n.model,l = s.get("axisLine.onZero"),u = s.get("axisLine.onZeroAxisIndex");if (l) {if (null != u) wc(a[u]) && (o = a[u]);else for (var h in a) {if (a.hasOwnProperty(h) && wc(a[h]) && !i[r(a[h])]) {o = a[h];break;}}o && (i[r(o)] = !0);}}function wc(t) {return t && "category" !== t.type && "time" !== t.type && Eh(t);}function bc(t, e) {var n = t.getExtent(),i = n[0] + n[1];t.toGlobalCoord = "x" === t.dim ? function (t) {return t + e;} : function (t) {return i - t + e;}, t.toLocalCoord = "x" === t.dim ? function (t) {return t - e;} : function (t) {return i - t + e;};}function Sc(t) {return p(ob, function (e) {var n = t.getReferringComponents(e)[0];return n;});}function Mc(t) {return "cartesian2d" === t.get("coordinateSystem");}function Cc(t, e) {var n = t.mapDimension("defaultedLabel", !0),i = n.length;if (1 === i) return Zs(t, e, n[0]);if (i) {for (var r = [], o = 0; o < n.length; o++) {var a = Zs(t, e, n[o]);r.push(a);}return r.join(" ");}}function Ic(t, e, n, i, r, o) {var a = n.getModel("label"),s = n.getModel("emphasis.label");Go(t, e, a, s, { labelFetcher: r, labelDataIndex: o, defaultText: Cc(r.getData(), o), isRectText: !0, autoColor: i }), Tc(t), Tc(e);}function Tc(t, e) {"outside" === t.textPosition && (t.textPosition = e);}function kc(t, e, n) {var i = t.getArea(),r = t.getBaseAxis().isHorizontal(),o = i.x,a = i.y,s = i.width,l = i.height,u = n.get("lineStyle.width") || 2;o -= u / 2, a -= u / 2, s += u, l += u, o = Math.floor(o), s = Math.round(s);var h = new Am({ shape: { x: o, y: a, width: s, height: l } });return e && (h.shape[r ? "width" : "height"] = 0, ea(h, { shape: { width: s, height: l } }, n)), h;}function Dc(t, e, n) {var i = t.getArea(),r = new bm({ shape: { cx: ba(t.cx, 1), cy: ba(t.cy, 1), r0: ba(i.r0, 1), r: ba(i.r, 1), startAngle: i.startAngle, endAngle: i.endAngle, clockwise: i.clockwise } });return e && (r.shape.endAngle = i.startAngle, ea(r, { shape: { endAngle: i.endAngle } }, n)), r;}function Ac(t, e, n) {return t ? "polar" === t.type ? Dc(t, e, n) : "cartesian2d" === t.type ? kc(t, e, n) : null : null;}function Pc(t, e) {var n = t.getArea && t.getArea();if ("cartesian2d" === t.type) {var i = t.getBaseAxis();if ("category" !== i.type || !i.onBand) {var r = e.getLayout("bandWidth");i.isHorizontal() ? (n.x -= r, n.width += 2 * r) : (n.y -= r, n.height += 2 * r);}}return n;}function Oc(t, e, n) {n.style.text = null, ta(n, { shape: { width: 0 } }, e, t, function () {n.parent && n.parent.remove(n);});}function Lc(t, e, n) {n.style.text = null, ta(n, { shape: { r: n.shape.r0 } }, e, t, function () {n.parent && n.parent.remove(n);});}function Bc(t) {return null != t.startAngle && null != t.endAngle && t.startAngle === t.endAngle;}function zc(t, e, n, i, r, o, a, l) {var u = e.getItemVisual(n, "color"),h = e.getItemVisual(n, "opacity"),c = e.getVisual("borderColor"),d = i.getModel("itemStyle"),f = i.getModel("emphasis.itemStyle").getBarItemStyle();l || t.setShape("r", d.get("barBorderRadius") || 0), t.useStyle(s({ stroke: Bc(r) ? "none" : c, fill: Bc(r) ? "none" : u, opacity: h }, d.getBarItemStyle()));var p = i.getShallow("cursor");p && t.attr("cursor", p);var g = a ? r.height > 0 ? "bottom" : "top" : r.width > 0 ? "left" : "right";l || Ic(t.style, f, i, u, o, n, g), Bc(r) && (f.fill = f.stroke = "none"), No(t, f);}function Ec(t, e) {var n = t.get(hb) || 0,i = isNaN(e.width) ? Number.MAX_VALUE : Math.abs(e.width),r = isNaN(e.height) ? Number.MAX_VALUE : Math.abs(e.height);return Math.min(n, i, r);}function Rc(t, e, n) {var i = t.getData(),r = [],o = i.getLayout("valueAxisHorizontal") ? 1 : 0;r[1 - o] = i.getLayout("valueAxisStart");var a = i.getLayout("largeDataIndices"),s = i.getLayout("barWidth"),l = t.getModel("backgroundStyle"),u = t.get("showBackground", !0);if (u) {var h = i.getLayout("largeBackgroundPoints"),c = [];c[1 - o] = i.getLayout("backgroundStart");var d = new mb({ shape: { points: h }, incremental: !!n, __startPoint: c, __baseDimIdx: o, __largeDataIndices: a, __barWidth: s, silent: !0, z2: 0 });Hc(d, l, i), e.add(d);}var f = new mb({ shape: { points: i.getLayout("largePoints") }, incremental: !!n, __startPoint: r, __baseDimIdx: o, __largeDataIndices: a, __barWidth: s });e.add(f), Fc(f, t, i), f.seriesIndex = t.seriesIndex, t.get("silent") || (f.on("mousedown", yb), f.on("mousemove", yb));}function Nc(t, e, n) {var i = t.__baseDimIdx,r = 1 - i,o = t.shape.points,a = t.__largeDataIndices,s = Math.abs(t.__barWidth / 2),l = t.__startPoint[r];cb[0] = e, cb[1] = n;for (var u = cb[i], h = cb[1 - i], c = u - s, d = u + s, f = 0, p = o.length / 2; p > f; f++) {var g = 2 * f,v = o[g + i],m = o[g + r];if (v >= c && d >= v && (m >= l ? h >= l && m >= h : h >= m && l >= h)) return a[f];}return -1;}function Fc(t, e, n) {var i = n.getVisual("borderColor") || n.getVisual("color"),r = e.getModel("itemStyle").getItemStyle(["color", "borderColor"]);t.useStyle(r), t.style.fill = null, t.style.stroke = i, t.style.lineWidth = n.getLayout("barWidth");}function Hc(t, e, n) {var i = e.get("borderColor") || e.get("color"),r = e.getItemStyle(["color", "borderColor"]);t.useStyle(r), t.style.fill = null, t.style.stroke = i, t.style.lineWidth = n.getLayout("barWidth");}function Vc(t, e, n) {var i,r = "polar" === n.type;return i = r ? n.getArea() : n.grid.getRect(), r ? { cx: i.cx, cy: i.cy, r0: t ? i.r0 : e.r0, r: t ? i.r : e.r, startAngle: t ? e.startAngle : 0, endAngle: t ? e.endAngle : 2 * Math.PI } : { x: t ? e.x : i.x, y: t ? i.y : e.y, width: t ? e.width : i.width, height: t ? i.height : e.height };}function Gc(t, e, n) {var i = "polar" === t.type ? bm : Am;return new i({ shape: Vc(e, n, t), silent: !0, z2: 0 });}function Wc(t, e, n, i) {var r,o,a = ka(n - t.rotation),s = i[0] > i[1],l = "start" === e && !s || "start" !== e && s;return Da(a - _b / 2) ? (o = l ? "bottom" : "top", r = "center") : Da(a - 1.5 * _b) ? (o = l ? "top" : "bottom", r = "center") : (o = "middle", r = 1.5 * _b > a && a > _b / 2 ? l ? "left" : "right" : l ? "right" : "left"), { rotation: a, textAlign: r, textVerticalAlign: o };}function Xc(t, e, n) {if (!Gh(t.axis)) {var i = t.get("axisLabel.showMinLabel"),r = t.get("axisLabel.showMaxLabel");e = e || [], n = n || [];var o = e[0],a = e[1],s = e[e.length - 1],l = e[e.length - 2],u = n[0],h = n[1],c = n[n.length - 1],d = n[n.length - 2];i === !1 ? (Yc(o), Yc(u)) : Uc(o, a) && (i ? (Yc(a), Yc(h)) : (Yc(o), Yc(u))), r === !1 ? (Yc(s), Yc(c)) : Uc(l, s) && (r ? (Yc(l), Yc(d)) : (Yc(s), Yc(c)));}}function Yc(t) {t && (t.ignore = !0);}function Uc(t, e) {var n = t && t.getBoundingRect().clone(),i = e && e.getBoundingRect().clone();if (n && i) {var r = Le([]);return Re(r, r, -t.rotation), n.applyTransform(ze([], r, t.getLocalTransform())), i.applyTransform(ze([], r, e.getLocalTransform())), n.intersect(i);}}function jc(t) {return "middle" === t || "center" === t;}function qc(t, e, n, i, r) {for (var o = [], a = [], s = [], l = 0; l < t.length; l++) {var u = t[l].coord;a[0] = u, a[1] = 0, s[0] = u, s[1] = n, e && (oe(a, a, e), oe(s, s, e));var h = new Om({ anid: r + "_" + t[l].tickValue, subPixelOptimize: !0, shape: { x1: a[0], y1: a[1], x2: s[0], y2: s[1] }, style: i, z2: 2, silent: !0 });o.push(h);}return o;}function Zc(t, e, n) {var i = e.axis,r = e.getModel("axisTick");if (r.get("show") && !i.scale.isBlank()) {for (var o = r.getModel("lineStyle"), a = n.tickDirection * r.get("length"), l = i.getTicksCoords(), u = qc(l, t._transform, a, s(o.getLineStyle(), { stroke: e.get("axisLine.lineStyle.color") }), "ticks"), h = 0; h < u.length; h++) {t.group.add(u[h]);}return u;}}function Kc(t, e, n) {var i = e.axis,r = e.getModel("minorTick");if (r.get("show") && !i.scale.isBlank()) {var o = i.getMinorTicksCoords();if (o.length) for (var a = r.getModel("lineStyle"), l = n.tickDirection * r.get("length"), u = s(a.getLineStyle(), s(e.getModel("axisTick").getLineStyle(), { stroke: e.get("axisLine.lineStyle.color") })), h = 0; h < o.length; h++) {for (var c = qc(o[h], t._transform, l, u, "minorticks_" + h), d = 0; d < c.length; d++) {t.group.add(c[d]);}}}}function $c(t, e, n) {var i = e.axis,r = k(n.axisLabelShow, e.get("axisLabel.show"));if (r && !i.scale.isBlank()) {var o = e.getModel("axisLabel"),a = o.get("margin"),s = i.getViewLabels(),l = (k(n.labelRotate, o.get("rotate")) || 0) * _b / 180,u = Sb(n.rotation, l, n.labelDirection),h = e.getCategories && e.getCategories(!0),c = [],d = Mb(e),p = e.get("triggerEvent");return f(s, function (r, s) {var l = r.tickValue,f = r.formattedLabel,g = r.rawLabel,v = o;h && h[l] && h[l].textStyle && (v = new fa(h[l].textStyle, o, e.ecModel));var m = v.getTextColor() || e.get("axisLine.lineStyle.color"),y = i.dataToCoord(l),_ = [y, n.labelOffset + n.labelDirection * a],x = new ym({ anid: "label_" + l, position: _, rotation: u.rotation, silent: d, z2: 10 });Xo(x.style, v, { text: f, textAlign: v.getShallow("align", !0) || u.textAlign, textVerticalAlign: v.getShallow("verticalAlign", !0) || v.getShallow("baseline", !0) || u.textVerticalAlign, textFill: "function" == typeof m ? m("category" === i.type ? g : "value" === i.type ? l + "" : l, s) : m }), p && (x.eventData = bb(e), x.eventData.targetType = "axisLabel", x.eventData.value = g), t._dumbGroup.add(x), x.updateTransform(), c.push(x), t.group.add(x), x.decomposeTransform();}), c;}}function Qc(t, e) {var n = { axesInfo: {}, seriesInvolved: !1, coordSysAxesInfo: {}, coordSysMap: {} };return Jc(n, t, e), n.seriesInvolved && ed(n, t), n;}function Jc(t, e, n) {var i = e.getComponent("tooltip"),r = e.getComponent("axisPointer"),o = r.get("link", !0) || [],a = [];Cb(n.getCoordinateSystems(), function (n) {function s(i, s, l) {var h = l.model.getModel("axisPointer", r),d = h.get("show");if (d && ("auto" !== d || i || sd(h))) {null == s && (s = h.get("triggerTooltip")), h = i ? td(l, c, r, e, i, s) : h;var f = h.get("snap"),p = ld(l.model),g = s || f || "category" === l.type,v = t.axesInfo[p] = { key: p, axis: l, coordSys: n, axisPointerModel: h, triggerTooltip: s, involveSeries: g, snap: f, useHandle: sd(h), seriesModels: [] };u[p] = v, t.seriesInvolved |= g;var m = nd(o, l);if (null != m) {var y = a[m] || (a[m] = { axesInfo: {} });y.axesInfo[p] = v, y.mapper = o[m].mapper, v.linkGroup = y;}}}if (n.axisPointerEnabled) {var l = ld(n.model),u = t.coordSysAxesInfo[l] = {};t.coordSysMap[l] = n;var h = n.model,c = h.getModel("tooltip", i);if (Cb(n.getAxes(), Ib(s, !1, null)), n.getTooltipAxes && i && c.get("show")) {var d = "axis" === c.get("trigger"),f = "cross" === c.get("axisPointer.type"),p = n.getTooltipAxes(c.get("axisPointer.axis"));(d || f) && Cb(p.baseAxes, Ib(s, f ? "cross" : !0, d)), f && Cb(p.otherAxes, Ib(s, "cross", !1));}}});}function td(t, e, n, r, o, a) {var l = e.getModel("axisPointer"),u = {};Cb(["type", "snap", "lineStyle", "shadowStyle", "label", "animation", "animationDurationUpdate", "animationEasingUpdate", "z"], function (t) {u[t] = i(l.get(t));}), u.snap = "category" !== t.type && !!a, "cross" === l.get("type") && (u.type = "line");var h = u.label || (u.label = {});if (null == h.show && (h.show = !1), "cross" === o) {var c = l.get("label.show");if (h.show = null != c ? c : !0, !a) {var d = u.lineStyle = l.get("crossStyle");d && s(h, d.textStyle);}}return t.model.getModel("axisPointer", new fa(u, n, r));}function ed(t, e) {e.eachSeries(function (e) {var n = e.coordinateSystem,i = e.get("tooltip.trigger", !0),r = e.get("tooltip.show", !0);n && "none" !== i && i !== !1 && "item" !== i && r !== !1 && e.get("axisPointer.show", !0) !== !1 && Cb(t.coordSysAxesInfo[ld(n.model)], function (t) {var i = t.axis;n.getAxis(i.dim) === i && (t.seriesModels.push(e), null == t.seriesDataCount && (t.seriesDataCount = 0), t.seriesDataCount += e.getData().count());});}, this);}function nd(t, e) {for (var n = e.model, i = e.dim, r = 0; r < t.length; r++) {var o = t[r] || {};if (id(o[i + "AxisId"], n.id) || id(o[i + "AxisIndex"], n.componentIndex) || id(o[i + "AxisName"], n.name)) return r;}}function id(t, e) {return "all" === t || x(t) && u(t, e) >= 0 || t === e;}function rd(t) {var e = od(t);if (e) {var n = e.axisPointerModel,i = e.axis.scale,r = n.option,o = n.get("status"),a = n.get("value");null != a && (a = i.parse(a));var s = sd(n);null == o && (r.status = s ? "show" : "hide");var l = i.getExtent().slice();l[0] > l[1] && l.reverse(), (null == a || a > l[1]) && (a = l[1]), a < l[0] && (a = l[0]), r.value = a, s && (r.status = e.axis.scale.isBlank() ? "hide" : "show");}}function od(t) {var e = (t.ecModel.getComponent("axisPointer") || {}).coordSysAxesInfo;return e && e.axesInfo[ld(t)];}function ad(t) {var e = od(t);return e && e.axisPointerModel;}function sd(t) {return !!t.get("handle.show");}function ld(t) {return t.type + "||" + t.id;}function ud(t, e, n, i, r, o) {var a = Tb.getAxisPointerClass(t.axisPointerClass);if (a) {var s = ad(e);s ? (t._axisPointer || (t._axisPointer = new a())).render(e, s, i, o) : hd(t, i);}}function hd(t, e, n) {var i = t._axisPointer;i && i.dispose(e, n), t._axisPointer = null;}function cd(t, e, n) {n = n || {};var i = t.coordinateSystem,r = e.axis,o = {},a = r.getAxesOnZeroOf()[0],s = r.position,l = a ? "onZero" : s,u = r.dim,h = i.getRect(),c = [h.x, h.x + h.width, h.y, h.y + h.height],d = { left: 0, right: 1, top: 0, bottom: 1, onZero: 2 },f = e.get("offset") || 0,p = "x" === u ? [c[2] - f, c[3] + f] : [c[0] - f, c[1] + f];
    if (a) {var g = a.toGlobalCoord(a.dataToCoord(0));p[d.onZero] = Math.max(Math.min(g, p[1]), p[0]);}o.position = ["y" === u ? p[d[l]] : c[0], "x" === u ? p[d[l]] : c[3]], o.rotation = Math.PI / 2 * ("x" === u ? 0 : 1);var v = { top: -1, bottom: 1, left: -1, right: 1 };o.labelDirection = o.tickDirection = o.nameDirection = v[s], o.labelOffset = a ? p[d[s]] - p[d.onZero] : 0, e.get("axisTick.inside") && (o.tickDirection = -o.tickDirection), k(n.labelInside, e.get("axisLabel.inside")) && (o.labelDirection = -o.labelDirection);var m = e.get("axisLabel.rotate");return o.labelRotate = "top" === l ? -m : m, o.z2 = 1, o;}function dd(t, e, n, i) {var r = n.axis;if (!r.scale.isBlank()) {var o = n.getModel("splitArea"),a = o.getModel("areaStyle"),l = a.get("color"),u = i.coordinateSystem.getRect(),h = r.getTicksCoords({ tickModel: o, clamp: !0 });if (h.length) {var c = l.length,d = t.__splitAreaColors,f = N(),p = 0;if (d) for (var g = 0; g < h.length; g++) {var v = d.get(h[g].tickValue);if (null != v) {p = (v + (c - 1) * g) % c;break;}}var m = r.toGlobalCoord(h[0].coord),y = a.getAreaStyle();l = x(l) ? l : [l];for (var g = 1; g < h.length; g++) {var _,w,b,S,M = r.toGlobalCoord(h[g].coord);r.isHorizontal() ? (_ = m, w = u.y, b = M - _, S = u.height, m = _ + b) : (_ = u.x, w = m, b = u.width, S = M - w, m = w + S);var C = h[g - 1].tickValue;null != C && f.set(C, p), e.add(new Am({ anid: null != C ? "area_" + C : null, shape: { x: _, y: w, width: b, height: S }, style: s({ fill: l[p] }, y), silent: !0 })), p = (p + 1) % c;}t.__splitAreaColors = f;}}}function fd(t) {t.__splitAreaColors = null;}function pd(t, e, n) {ig.call(this), this.updateData(t, e, n);}function gd(t) {return [t[0] / 2, t[1] / 2];}function vd(t, e) {this.parent.drift(t, e);}function md(t, e) {if (!this.incremental && !this.useHoverLayer) if ("emphasis" === e) {var n = this.__symbolOriginalScale,i = n[1] / n[0],r = { scale: [Math.max(1.1 * n[0], n[0] + 3), Math.max(1.1 * n[1], n[1] + 3 * i)] };this.animateTo(r, 400, "elasticOut");} else "normal" === e && this.animateTo({ scale: this.__symbolOriginalScale }, 400, "elasticOut");}function yd(t) {this.group = new ig(), this._symbolCtor = t || pd;}function _d(t, e, n, i) {return !(!e || isNaN(e[0]) || isNaN(e[1]) || i.isIgnore && i.isIgnore(n) || i.clipShape && !i.clipShape.contain(e[0], e[1]) || "none" === t.getItemVisual(n, "symbol"));}function xd(t) {return null == t || S(t) || (t = { isIgnore: t }), t || {};}function wd(t) {var e = t.hostModel;return { itemStyle: e.getModel("itemStyle").getItemStyle(["color"]), hoverItemStyle: e.getModel("emphasis.itemStyle").getItemStyle(), symbolRotate: e.get("symbolRotate"), symbolOffset: e.get("symbolOffset"), hoverAnimation: e.get("hoverAnimation"), labelModel: e.getModel("label"), hoverLabelModel: e.getModel("emphasis.label"), cursorStyle: e.get("cursor") };}function bd(t, e, n) {var i,r = t.getBaseAxis(),o = t.getOtherAxis(r),a = Sd(o, n),s = r.dim,l = o.dim,u = e.mapDimension(l),h = e.mapDimension(s),c = "x" === l || "radius" === l ? 1 : 0,d = p(t.dimensions, function (t) {return e.mapDimension(t);}),f = e.getCalculationInfo("stackResultDimension");return (i |= sh(e, d[0])) && (d[0] = f), (i |= sh(e, d[1])) && (d[1] = f), { dataDimsForPoint: d, valueStart: a, valueAxisDim: l, baseAxisDim: s, stacked: !!i, valueDim: u, baseDim: h, baseDataOffset: c, stackedOverDimension: e.getCalculationInfo("stackedOverDimension") };}function Sd(t, e) {var n = 0,i = t.scale.getExtent();return "start" === e ? n = i[0] : "end" === e ? n = i[1] : i[0] > 0 ? n = i[0] : i[1] < 0 && (n = i[1]), n;}function Md(t, e, n, i) {var r = 0 / 0;t.stacked && (r = n.get(n.getCalculationInfo("stackedOverDimension"), i)), isNaN(r) && (r = t.valueStart);var o = t.baseDataOffset,a = [];return a[o] = n.get(t.baseDim, i), a[1 - o] = r, e.dataToPoint(a);}function Cd(t, e) {var n = [];return e.diff(t).add(function (t) {n.push({ cmd: "+", idx: t });}).update(function (t, e) {n.push({ cmd: "=", idx: e, idx1: t });}).remove(function (t) {n.push({ cmd: "-", idx: t });}).execute(), n;}function Id(t) {return isNaN(t[0]) || isNaN(t[1]);}function Td(t, e, n, i, r, o, a, s, l, u) {return "none" !== u && u ? kd.apply(this, arguments) : Dd.apply(this, arguments);}function kd(t, e, n, i, r, o, a, s, l, u, h) {for (var c = 0, d = n, f = 0; i > f; f++) {var p = e[d];if (d >= r || 0 > d) break;if (Id(p)) {if (h) {d += o;continue;}break;}if (d === n) t[o > 0 ? "moveTo" : "lineTo"](p[0], p[1]);else if (l > 0) {var g = e[c],v = "y" === u ? 1 : 0,m = (p[v] - g[v]) * l;Wb(Yb, g), Yb[v] = g[v] + m, Wb(Ub, p), Ub[v] = p[v] - m, t.bezierCurveTo(Yb[0], Yb[1], Ub[0], Ub[1], p[0], p[1]);} else t.lineTo(p[0], p[1]);c = d, d += o;}return f;}function Dd(t, e, n, i, r, o, a, s, l, u, h) {for (var c = 0, d = n, f = 0; i > f; f++) {var p = e[d];if (d >= r || 0 > d) break;if (Id(p)) {if (h) {d += o;continue;}break;}if (d === n) t[o > 0 ? "moveTo" : "lineTo"](p[0], p[1]), Wb(Yb, p);else if (l > 0) {var g = d + o,v = e[g];if (h) for (; v && Id(e[g]);) {g += o, v = e[g];}var m = .5,y = e[c],v = e[g];if (!v || Id(v)) Wb(Ub, p);else {Id(v) && !h && (v = p), j(Xb, v, y);var _, x;if ("x" === u || "y" === u) {var w = "x" === u ? 0 : 1;_ = Math.abs(p[w] - y[w]), x = Math.abs(p[w] - v[w]);} else _ = sp(p, y), x = sp(p, v);m = x / (x + _), Gb(Ub, p, Xb, -l * (1 - m));}Hb(Yb, Yb, s), Vb(Yb, Yb, a), Hb(Ub, Ub, s), Vb(Ub, Ub, a), t.bezierCurveTo(Yb[0], Yb[1], Ub[0], Ub[1], p[0], p[1]), Gb(Yb, p, Xb, l * m);} else t.lineTo(p[0], p[1]);c = d, d += o;}return f;}function Ad(t, e) {var n = [1 / 0, 1 / 0],i = [-1 / 0, -1 / 0];if (e) for (var r = 0; r < t.length; r++) {var o = t[r];o[0] < n[0] && (n[0] = o[0]), o[1] < n[1] && (n[1] = o[1]), o[0] > i[0] && (i[0] = o[0]), o[1] > i[1] && (i[1] = o[1]);}return { min: e ? n : i, max: e ? i : n };}function Pd(t, e) {if (t.length === e.length) {for (var n = 0; n < t.length; n++) {var i = t[n],r = e[n];if (i[0] !== r[0] || i[1] !== r[1]) return;}return !0;}}function Od(t, e) {var n = [],i = [],r = [],o = [];return zr(t, n, i), zr(e, r, o), Math.max(Math.abs(n[0] - r[0]), Math.abs(n[1] - r[1]), Math.abs(i[0] - o[0]), Math.abs(i[1] - o[1]));}function Ld(t) {return "number" == typeof t ? t : t ? .5 : 0;}function Bd(t, e, n) {if (!n.valueDim) return [];for (var i = [], r = 0, o = e.count(); o > r; r++) {i.push(Md(n, t, e, r));}return i;}function zd(t, e, n) {for (var i = e.getBaseAxis(), r = "x" === i.dim || "radius" === i.dim ? 0 : 1, o = [], a = 0; a < t.length - 1; a++) {var s = t[a + 1],l = t[a];o.push(l);var u = [];switch (n) {case "end":u[r] = s[r], u[1 - r] = l[1 - r], o.push(u);break;case "middle":var h = (l[r] + s[r]) / 2,c = [];u[r] = c[r] = h, u[1 - r] = l[1 - r], c[1 - r] = s[1 - r], o.push(u), o.push(c);break;default:u[r] = l[r], u[1 - r] = s[1 - r], o.push(u);}}return t[a] && o.push(t[a]), o;}function Ed(t, e) {var n = t.getVisual("visualMeta");if (n && n.length && t.count() && "cartesian2d" === e.type) {for (var i, r, o = n.length - 1; o >= 0; o--) {var a = n[o].dimension,s = t.dimensions[a],l = t.getDimensionInfo(s);if (i = l && l.coordDim, "x" === i || "y" === i) {r = n[o];break;}}if (r) {var u = e.getAxis(i),h = p(r.stops, function (t) {return { coord: u.toGlobalCoord(u.dataToCoord(t.value)), color: t.color };}),c = h.length,d = r.outerColors.slice();c && h[0].coord > h[c - 1].coord && (h.reverse(), d.reverse());var g = 10,v = h[0].coord - g,m = h[c - 1].coord + g,y = m - v;if (.001 > y) return "transparent";f(h, function (t) {t.offset = (t.coord - v) / y;}), h.push({ offset: c ? h[c - 1].offset : .5, color: d[1] || "transparent" }), h.unshift({ offset: c ? h[0].offset : .5, color: d[0] || "transparent" });var _ = new Nm(0, 0, 0, 0, h, !0);return _[i] = v, _[i + "2"] = m, _;}}}function Rd(t, e, n) {var i = t.get("showAllSymbol"),r = "auto" === i;if (!i || r) {var o = n.getAxesByScale("ordinal")[0];if (o && (!r || !Nd(o, e))) {var a = e.mapDimension(o.dim),s = {};return f(o.getViewLabels(), function (t) {s[t.tickValue] = 1;}), function (t) {return !s.hasOwnProperty(e.get(a, t));};}}}function Nd(t, e) {var n = t.getExtent(),i = Math.abs(n[1] - n[0]) / t.scale.count();isNaN(i) && (i = 0);for (var r = e.count(), o = Math.max(1, Math.round(r / 5)), a = 0; r > a; a += o) {if (1.5 * pd.getSymbolSize(e, a)[t.isHorizontal() ? 1 : 0] > i) return !1;}return !0;}function Fd(t, e, n) {if ("cartesian2d" === t.type) {var i = t.getBaseAxis().isHorizontal(),r = kc(t, e, n);if (!n.get("clip", !0)) {var o = r.shape,a = Math.max(o.width, o.height);i ? (o.y -= a, o.height += 2 * a) : (o.x -= a, o.width += 2 * a);}return r;}return Dc(t, e, n);}function Hd(t, e, n) {var i,r = {},o = "toggleSelected" === t;return n.eachComponent("legend", function (n) {o && null != i ? n[i ? "select" : "unSelect"](e.name) : "allSelect" === t || "inverseSelect" === t ? n[t]() : (n[t](e.name), i = n.isSelected(e.name));var a = n.getData();f(a, function (t) {var e = t.get("name");if ("\n" !== e && "" !== e) {var i = n.isSelected(e);r[e] = r.hasOwnProperty(e) ? r[e] && i : i;}});}), "allSelect" === t || "inverseSelect" === t ? { selected: r } : { name: e.name, selected: r };}function Vd(t, e) {var n = fy(e.get("padding")),i = e.getItemStyle(["color", "opacity"]);i.fill = e.get("backgroundColor");var t = new Am({ shape: { x: t.x - n[3], y: t.y - n[0], width: t.width + n[1] + n[3], height: t.height + n[0] + n[2], r: e.get("borderRadius") }, style: i, silent: !0, z2: -1 });return t;}function Gd(t, e, n, i, r, o) {var a;return "line" !== e && e.indexOf("empty") < 0 ? (a = n.getItemStyle(), t.style.stroke = i, o || (a.stroke = r)) : a = n.getItemStyle(["borderWidth", "borderColor"]), t.setStyle(a);}function Wd(t, e, n, i) {Yd(t, e, n, i), n.dispatchAction({ type: "legendToggleSelect", name: null != t ? t : e }), Xd(t, e, n, i);}function Xd(t, e, n, i) {var r = n.getZr().storage.getDisplayList()[0];r && r.useHoverLayer || n.dispatchAction({ type: "highlight", seriesName: t, name: e, excludeSeriesId: i });}function Yd(t, e, n, i) {var r = n.getZr().storage.getDisplayList()[0];r && r.useHoverLayer || n.dispatchAction({ type: "downplay", seriesName: t, name: e, excludeSeriesId: i });}function Ud(t, e, n) {var i = t.getOrient(),r = [1, 1];r[i.index] = 0, $a(e, n, { type: "box", ignoreSize: r });}function jd(t, e, n, i, r) {var o = t.axis;if (!o.scale.isBlank() && o.containData(e)) {if (!t.involveSeries) return void n.showPointer(t, e);var s = qd(e, t),l = s.payloadBatch,u = s.snapToValue;l[0] && null == r.seriesIndex && a(r, l[0]), !i && t.snap && o.containData(u) && null != u && (e = u), n.showPointer(t, e, l, r), n.showTooltip(t, s, u);}}function qd(t, e) {var n = e.axis,i = n.dim,r = t,o = [],a = Number.MAX_VALUE,s = -1;return pS(e.seriesModels, function (e) {var l,u,h = e.getData().mapDimension(i, !0);if (e.getAxisTooltipData) {var c = e.getAxisTooltipData(h, t, n);u = c.dataIndices, l = c.nestestValue;} else {if (u = e.getData().indicesOfNearest(h[0], t, "category" === n.type ? .5 : null), !u.length) return;l = e.getData().get(h[0], u[0]);}if (null != l && isFinite(l)) {var d = t - l,f = Math.abs(d);a >= f && ((a > f || d >= 0 && 0 > s) && (a = f, s = d, r = l, o.length = 0), pS(u, function (t) {o.push({ seriesIndex: e.seriesIndex, dataIndexInside: t, dataIndex: e.getData().getRawIndex(t) });}));}}), { payloadBatch: o, snapToValue: r };}function Zd(t, e, n, i) {t[e.key] = { value: n, payloadBatch: i };}function Kd(t, e, n, i) {var r = n.payloadBatch,o = e.axis,a = o.model,s = e.axisPointerModel;if (e.triggerTooltip && r.length) {var l = e.coordSys.model,u = ld(l),h = t.map[u];h || (h = t.map[u] = { coordSysId: l.id, coordSysIndex: l.componentIndex, coordSysType: l.type, coordSysMainType: l.mainType, dataByAxis: [] }, t.list.push(h)), h.dataByAxis.push({ axisDim: o.dim, axisIndex: a.componentIndex, axisType: a.type, axisId: a.id, value: i, valueLabelOpt: { precision: s.get("label.precision"), formatter: s.get("label.formatter") }, seriesDataIndices: r.slice() });}}function $d(t, e, n) {var i = n.axesInfo = [];pS(e, function (e, n) {var r = e.axisPointerModel.option,o = t[n];o ? (!e.useHandle && (r.status = "show"), r.value = o.value, r.seriesDataIndices = (o.payloadBatch || []).slice()) : !e.useHandle && (r.status = "hide"), "show" === r.status && i.push({ axisDim: e.axis.dim, axisIndex: e.axis.model.componentIndex, value: r.value });});}function Qd(t, e, n, i) {if (nf(e) || !t.list.length) return void i({ type: "hideTip" });var r = ((t.list[0].dataByAxis[0] || {}).seriesDataIndices || [])[0] || {};i({ type: "showTip", escapeConnect: !0, x: e[0], y: e[1], tooltipOption: n.tooltipOption, position: n.position, dataIndexInside: r.dataIndexInside, dataIndex: r.dataIndex, seriesIndex: r.seriesIndex, dataByCoordSys: t.list });}function Jd(t, e, n) {var i = n.getZr(),r = "axisPointerLastHighlights",o = vS(i)[r] || {},a = vS(i)[r] = {};pS(t, function (t) {var e = t.axisPointerModel.option;"show" === e.status && pS(e.seriesDataIndices, function (t) {var e = t.seriesIndex + " | " + t.dataIndex;a[e] = t;});});var s = [],l = [];f(o, function (t, e) {!a[e] && l.push(t);}), f(a, function (t, e) {!o[e] && s.push(t);}), l.length && n.dispatchAction({ type: "downplay", escapeConnect: !0, batch: l }), s.length && n.dispatchAction({ type: "highlight", escapeConnect: !0, batch: s });}function tf(t, e) {for (var n = 0; n < (t || []).length; n++) {var i = t[n];if (e.axis.dim === i.axisDim && e.axis.model.componentIndex === i.axisIndex) return i;}}function ef(t) {var e = t.axis.model,n = {},i = n.axisDim = t.axis.dim;return n.axisIndex = n[i + "AxisIndex"] = e.componentIndex, n.axisName = n[i + "AxisName"] = e.name, n.axisId = n[i + "AxisId"] = e.id, n;}function nf(t) {return !t || null == t[0] || isNaN(t[0]) || null == t[1] || isNaN(t[1]);}function rf(t, e, n) {if (!Wf.node) {var i = e.getZr();yS(i).records || (yS(i).records = {}), of(i, e);var r = yS(i).records[t] || (yS(i).records[t] = {});r.handler = n;}}function of(t, e) {function n(n, i) {t.on(n, function (n) {var r = uf(e);_S(yS(t).records, function (t) {t && i(t, n, r.dispatchAction);}), af(r.pendings, e);});}yS(t).initialized || (yS(t).initialized = !0, n("click", _(lf, "click")), n("mousemove", _(lf, "mousemove")), n("globalout", sf));}function af(t, e) {var n,i = t.showTip.length,r = t.hideTip.length;i ? n = t.showTip[i - 1] : r && (n = t.hideTip[r - 1]), n && (n.dispatchAction = null, e.dispatchAction(n));}function sf(t, e, n) {t.handler("leave", null, n);}function lf(t, e, n, i) {e.handler(t, n, i);}function uf(t) {var e = { showTip: [], hideTip: [] },n = function n(i) {var r = e[i.type];r ? r.push(i) : (i.dispatchAction = n, t.dispatchAction(i));};return { dispatchAction: n, pendings: e };}function hf(t, e) {if (!Wf.node) {var n = e.getZr(),i = (yS(n).records || {})[t];i && (yS(n).records[t] = null);}}function cf() {}function df(t, e, n, i) {ff(wS(n).lastProp, i) || (wS(n).lastProp = i, e ? ta(n, i, t) : (n.stopAnimation(), n.attr(i)));}function ff(t, e) {if (S(t) && S(e)) {var n = !0;return f(e, function (e, i) {n = n && ff(t[i], e);}), !!n;}return t === e;}function pf(t, e) {t[e.get("label.show") ? "show" : "hide"]();}function gf(t) {return { position: t.position.slice(), rotation: t.rotation || 0 };}function vf(t, e, n) {var i = e.get("z"),r = e.get("zlevel");t && t.traverse(function (t) {"group" !== t.type && (null != i && (t.z = i), null != r && (t.zlevel = r), t.silent = n);});}function mf(t) {var e,n = t.get("type"),i = t.getModel(n + "Style");return "line" === n ? (e = i.getLineStyle(), e.fill = null) : "shadow" === n && (e = i.getAreaStyle(), e.stroke = null), e;}function yf(t, e, n, i, r) {var o = n.get("value"),a = xf(o, e.axis, e.ecModel, n.get("seriesDataIndices"), { precision: n.get("label.precision"), formatter: n.get("label.formatter") }),s = n.getModel("label"),l = fy(s.get("padding") || 0),u = s.getFont(),h = Yn(a, u),c = r.position,d = h.width + l[1] + l[3],f = h.height + l[0] + l[2],p = r.align;"right" === p && (c[0] -= d), "center" === p && (c[0] -= d / 2);var g = r.verticalAlign;"bottom" === g && (c[1] -= f), "middle" === g && (c[1] -= f / 2), _f(c, d, f, i);var v = s.get("backgroundColor");v && "auto" !== v || (v = e.get("axisLine.lineStyle.color")), t.label = { shape: { x: 0, y: 0, width: d, height: f, r: s.get("borderRadius") }, position: c.slice(), style: { text: a, textFont: u, textFill: s.getTextColor(), textPosition: "inside", textPadding: l, fill: v, stroke: s.get("borderColor") || "transparent", lineWidth: s.get("borderWidth") || 0, shadowBlur: s.get("shadowBlur"), shadowColor: s.get("shadowColor"), shadowOffsetX: s.get("shadowOffsetX"), shadowOffsetY: s.get("shadowOffsetY") }, z2: 10 };}function _f(t, e, n, i) {var r = i.getWidth(),o = i.getHeight();t[0] = Math.min(t[0] + e, r) - e, t[1] = Math.min(t[1] + n, o) - n, t[0] = Math.max(t[0], 0), t[1] = Math.max(t[1], 0);}function xf(t, e, n, i, r) {t = e.scale.parse(t);var o = e.scale.getLabel(t, { precision: r.precision }),a = r.formatter;if (a) {var s = { value: Nh(e, t), axisDimension: e.dim, axisIndex: e.index, seriesData: [] };f(i, function (t) {var e = n.getSeriesByIndex(t.seriesIndex),i = t.dataIndexInside,r = e && e.getDataParams(i);r && s.seriesData.push(r);}), b(a) ? o = a.replace("{value}", o) : w(a) && (o = a(s));}return o;}function wf(t, e, n) {var i = Oe();return Re(i, i, n.rotation), Ee(i, i, n.position), ia([t.dataToCoord(e), (n.labelOffset || 0) + (n.labelDirection || 1) * (n.labelMargin || 0)], i);}function bf(t, e, n, i, r, o) {var a = xb.innerTextLayout(n.rotation, 0, n.labelDirection);n.labelMargin = r.get("label.margin"), yf(e, i, r, o, { position: wf(i.axis, t, n), align: a.textAlign, verticalAlign: a.textVerticalAlign });}function Sf(t, e, n) {return n = n || 0, { x1: t[n], y1: t[1 - n], x2: e[n], y2: e[1 - n] };}function Mf(t, e, n) {return n = n || 0, { x: t[n], y: t[1 - n], width: e[n], height: e[1 - n] };}function Cf(t, e) {var n = {};return n[e.dim + "AxisIndex"] = e.index, t.getCartesian(n);}function If(t) {return "x" === t.dim ? 0 : 1;}function Tf(t) {var e = "cubic-bezier(0.23, 1, 0.32, 1)",n = "left " + t + "s " + e + ",top " + t + "s " + e;return p(kS, function (t) {return t + "transition:" + n;}).join(";");}function kf(t) {var e = [],n = t.get("fontSize"),i = t.getTextColor();i && e.push("color:" + i), e.push("font:" + t.getFont());var r = t.get("lineHeight");null == r && (r = Math.round(3 * n / 2)), n && e.push("line-height:" + r + "px");var o = t.get("textShadowColor"),a = t.get("textShadowBlur") || 0,s = t.get("textShadowOffsetX") || 0,l = t.get("textShadowOffsetY") || 0;return a && e.push("text-shadow:" + s + "px " + l + "px " + a + "px " + o), IS(["decoration", "align"], function (n) {var i = t.get(n);i && e.push("text-" + n + ":" + i);}), e.join(";");}function Df(t) {var e = [],n = t.get("transitionDuration"),i = t.get("backgroundColor"),r = t.getModel("textStyle"),o = t.get("padding");return n && e.push(Tf(n)), i && (Wf.canvasSupported ? e.push("background-Color:" + i) : (e.push("background-Color:#" + rn(i)), e.push("filter:alpha(opacity=70)"))), IS(["width", "color", "radius"], function (n) {var i = "border-" + n,r = TS(i),o = t.get(r);null != o && e.push(i + ":" + o + ("color" === n ? "" : "px"));}), e.push(kf(r)), null != o && e.push("padding:" + fy(o).join("px ") + "px"), e.join(";") + ";";}function Af(t, e, n, i, r) {var o = e && e.painter;if (n) {var a = o && o.getViewportRoot();a && pe(t, a, document.body, i, r);} else {t[0] = i, t[1] = r;var s = o && o.getViewportRootOffset();s && (t[0] += s.offsetLeft, t[1] += s.offsetTop);}t[2] = t[0] / e.getWidth(), t[3] = t[1] / e.getHeight();}function Pf(t, e, n) {if (Wf.wxa) return null;var i = document.createElement("div");i.domBelongToZr = !0, this.el = i;var r = this._zr = e.getZr(),o = this._appendToBody = n && n.appendToBody;this._styleCoord = [0, 0, 0, 0], Af(this._styleCoord, r, o, e.getWidth() / 2, e.getHeight() / 2), o ? document.body.appendChild(i) : t.appendChild(i), this._container = t, this._show = !1, this._hideTimeout;var a = this;i.onmouseenter = function () {a._enterable && (clearTimeout(a._hideTimeout), a._show = !0), a._inContent = !0;}, i.onmousemove = function (t) {if (t = t || window.event, !a._enterable) {var e = r.handler,n = r.painter.getViewportRoot();be(n, t, !0), e.dispatch("mousemove", t);}}, i.onmouseleave = function () {a._enterable && a._show && a.hideLater(a._hideDelay), a._inContent = !1;};}function Of(t, e, n, i) {t[0] = n, t[1] = i, t[2] = t[0] / e.getWidth(), t[3] = t[1] / e.getHeight();}function Lf(t) {var e = this._zr = t.getZr();this._styleCoord = [0, 0, 0, 0], Of(this._styleCoord, e, t.getWidth() / 2, t.getHeight() / 2), this._show = !1, this._hideTimeout;}function Bf(t) {for (var e = t.pop(); t.length;) {var n = t.pop();n && (fa.isInstance(n) && (n = n.get("tooltip", !0)), "string" == typeof n && (n = { formatter: n }), e = new fa(n, e, e.ecModel));}return e;}function zf(t, e) {return t.dispatchAction || y(e.dispatchAction, e);}function Ef(t, e, n, i, r, o, a) {var s = n.getOuterSize(),l = s.width,u = s.height;return null != o && (t + l + o > i ? t -= l + o : t += o), null != a && (e + u + a > r ? e -= u + a : e += a), [t, e];}function Rf(t, e, n, i, r) {var o = n.getOuterSize(),a = o.width,s = o.height;return t = Math.min(t + a, i) - a, e = Math.min(e + s, r) - s, t = Math.max(t, 0), e = Math.max(e, 0), [t, e];}function Nf(t, e, n) {var i = n[0],r = n[1],o = 5,a = 0,s = 0,l = e.width,u = e.height;switch (t) {case "inside":a = e.x + l / 2 - i / 2, s = e.y + u / 2 - r / 2;break;case "top":a = e.x + l / 2 - i / 2, s = e.y - r - o;break;case "bottom":a = e.x + l / 2 - i / 2, s = e.y + u + o;break;case "left":a = e.x - i - o, s = e.y + u / 2 - r / 2;break;case "right":a = e.x + l + o, s = e.y + u / 2 - r / 2;}return [a, s];}function Ff(t) {return "center" === t || "middle" === t;}var Hf = 2311,Vf = function Vf() {return Hf++;},Gf = {};Gf = "object" == typeof wx && "function" == typeof wx.getSystemInfoSync ? { browser: {}, os: {}, node: !1, wxa: !0, canvasSupported: !0, svgSupported: !1, touchEventsSupported: !0, domSupported: !1 } : "undefined" == typeof document && "undefined" != typeof self ? { browser: {}, os: {}, node: !1, worker: !0, canvasSupported: !0, domSupported: !1 } : "undefined" == typeof navigator ? { browser: {}, os: {}, node: !0, worker: !1, canvasSupported: !0, svgSupported: !0, domSupported: !1 } : e(navigator.userAgent);var Wf = Gf,Xf = { "[object Function]": 1, "[object RegExp]": 1, "[object Date]": 1, "[object Error]": 1, "[object CanvasGradient]": 1, "[object CanvasPattern]": 1, "[object Image]": 1, "[object Canvas]": 1 },Yf = { "[object Int8Array]": 1, "[object Uint8Array]": 1, "[object Uint8ClampedArray]": 1, "[object Int16Array]": 1, "[object Uint16Array]": 1, "[object Int32Array]": 1, "[object Uint32Array]": 1, "[object Float32Array]": 1, "[object Float64Array]": 1 },Uf = Object.prototype.toString,jf = Array.prototype,qf = jf.forEach,Zf = jf.filter,Kf = jf.slice,$f = jf.map,Qf = jf.reduce,Jf = {},tp = function tp() {return Jf.createCanvas();};Jf.createCanvas = function () {return document.createElement("canvas");};var ep,np = "__ec_primitive__";R.prototype = { constructor: R, get: function get(t) {return this.data.hasOwnProperty(t) ? this.data[t] : null;}, set: function set(t, e) {return this.data[t] = e;}, each: function each(t, e) {void 0 !== e && (t = y(t, e));for (var n in this.data) {this.data.hasOwnProperty(n) && t(this.data[n], n);}}, removeKey: function removeKey(t) {delete this.data[t];} };var ip = (Object.freeze || Object)({ $override: n, clone: i, merge: r, mergeAll: o, extend: a, defaults: s, createCanvas: tp, getContext: l, indexOf: u, inherits: h, mixin: c, isArrayLike: d, each: f, map: p, reduce: g, filter: v, find: m, bind: y, curry: _, isArray: x, isFunction: w, isString: b, isObject: S, isBuiltInObject: M, isTypedArray: C, isDom: I, eqNaN: T, retrieve: k, retrieve2: D, retrieve3: A, slice: P, normalizeCssArray: O, assert: L, trim: B, setAsPrimitive: z, isPrimitive: E, createHashMap: N, concatArray: F, noop: H }),rp = "undefined" == typeof Float32Array ? Array : Float32Array,op = q,ap = Z,sp = ee,lp = ne,up = (Object.freeze || Object)({ create: V, copy: G, clone: W, set: X, add: Y, scaleAndAdd: U, sub: j, len: q, length: op, lenSquare: Z, lengthSquare: ap, mul: K, div: $, dot: Q, scale: J, normalize: te, distance: ee, dist: sp, distanceSquare: ne, distSquare: lp, negate: ie, lerp: re, applyTransform: oe, min: ae, max: se });le.prototype = { constructor: le, _dragStart: function _dragStart(t) {for (var e = t.target; e && !e.draggable;) {e = e.parent;}e && (this._draggingTarget = e, e.dragging = !0, this._x = t.offsetX, this._y = t.offsetY, this.dispatchToElement(ue(e, t), "dragstart", t.event));}, _drag: function _drag(t) {var e = this._draggingTarget;if (e) {var n = t.offsetX,i = t.offsetY,r = n - this._x,o = i - this._y;this._x = n, this._y = i, e.drift(r, o, t), this.dispatchToElement(ue(e, t), "drag", t.event);var a = this.findHover(n, i, e).target,s = this._dropTarget;this._dropTarget = a, e !== a && (s && a !== s && this.dispatchToElement(ue(s, t), "dragleave", t.event), a && a !== s && this.dispatchToElement(ue(a, t), "dragenter", t.event));}}, _dragEnd: function _dragEnd(t) {var e = this._draggingTarget;e && (e.dragging = !1), this.dispatchToElement(ue(e, t), "dragend", t.event), this._dropTarget && this.dispatchToElement(ue(this._dropTarget, t), "drop", t.event), this._draggingTarget = null, this._dropTarget = null;} };var hp = Array.prototype.slice,cp = function cp(t) {this._$handlers = {}, this._$eventProcessor = t;};cp.prototype = { constructor: cp, one: function one(t, e, n, i) {return ce(this, t, e, n, i, !0);}, on: function on(t, e, n, i) {return ce(this, t, e, n, i, !1);}, isSilent: function isSilent(t) {var e = this._$handlers;return !e[t] || !e[t].length;}, off: function off(t, e) {var n = this._$handlers;if (!t) return this._$handlers = {}, this;if (e) {if (n[t]) {for (var i = [], r = 0, o = n[t].length; o > r; r++) {n[t][r].h !== e && i.push(n[t][r]);}n[t] = i;}n[t] && 0 === n[t].length && delete n[t];} else delete n[t];return this;}, trigger: function trigger(t) {var e = this._$handlers[t],n = this._$eventProcessor;if (e) {var i = arguments,r = i.length;r > 3 && (i = hp.call(i, 1));for (var o = e.length, a = 0; o > a;) {var s = e[a];if (n && n.filter && null != s.query && !n.filter(t, s.query)) a++;else {switch (r) {case 1:s.h.call(s.ctx);break;case 2:s.h.call(s.ctx, i[1]);break;case 3:s.h.call(s.ctx, i[1], i[2]);break;default:s.h.apply(s.ctx, i);}s.one ? (e.splice(a, 1), o--) : a++;}}}return n && n.afterTrigger && n.afterTrigger(t), this;}, triggerWithContext: function triggerWithContext(t) {var e = this._$handlers[t],n = this._$eventProcessor;if (e) {var i = arguments,r = i.length;r > 4 && (i = hp.call(i, 1, i.length - 1));for (var o = i[i.length - 1], a = e.length, s = 0; a > s;) {var l = e[s];if (n && n.filter && null != l.query && !n.filter(t, l.query)) s++;else {switch (r) {case 1:l.h.call(o);break;case 2:l.h.call(o, i[1]);break;case 3:l.h.call(o, i[1], i[2]);break;default:l.h.apply(o, i);}l.one ? (e.splice(s, 1), a--) : s++;}}}return n && n.afterTrigger && n.afterTrigger(t), this;} };var dp = Math.log(2),fp = "___zrEVENTSAVED",pp = [],gp = "undefined" != typeof window && !!window.addEventListener,vp = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,mp = [],yp = gp ? function (t) {t.preventDefault(), t.stopPropagation(), t.cancelBubble = !0;} : function (t) {t.returnValue = !1, t.cancelBubble = !0;},_p = function _p() {this._track = [];};_p.prototype = { constructor: _p, recognize: function recognize(t, e, n) {return this._doTrack(t, e, n), this._recognize(t);}, clear: function clear() {return this._track.length = 0, this;}, _doTrack: function _doTrack(t, e, n) {var i = t.touches;if (i) {for (var r = { points: [], touches: [], target: e, event: t }, o = 0, a = i.length; a > o; o++) {var s = i[o],l = _e(n, s, {});r.points.push([l.zrX, l.zrY]), r.touches.push(s);}this._track.push(r);}}, _recognize: function _recognize(t) {for (var e in xp) {if (xp.hasOwnProperty(e)) {var n = xp[e](this._track, t);if (n) return n;}}} };var xp = { pinch: function pinch(t, e) {var n = t.length;if (n) {var i = (t[n - 1] || {}).points,r = (t[n - 2] || {}).points || i;if (r && r.length > 1 && i && i.length > 1) {var o = Ce(i) / Ce(r);!isFinite(o) && (o = 1), e.pinchScale = o;var a = Ie(i);return e.pinchX = a[0], e.pinchY = a[1], { type: "pinch", target: t[0].target, event: e };}}} },wp = "silent";De.prototype.dispose = function () {};var bp = ["click", "dblclick", "mousewheel", "mouseout", "mouseup", "mousedown", "mousemove", "contextmenu"],Sp = function Sp(t, e, n, i) {cp.call(this), this.storage = t, this.painter = e, this.painterRoot = i, n = n || new De(), this.proxy = null, this._hovered = {}, this._lastTouchMoment, this._lastX, this._lastY, this._gestureMgr, le.call(this), this.setHandlerProxy(n);};Sp.prototype = { constructor: Sp, setHandlerProxy: function setHandlerProxy(t) {this.proxy && this.proxy.dispose(), t && (f(bp, function (e) {t.on && t.on(e, this[e], this);}, this), t.handler = this), this.proxy = t;}, mousemove: function mousemove(t) {var e = t.zrX,n = t.zrY,i = Pe(this, e, n),r = this._hovered,o = r.target;o && !o.__zr && (r = this.findHover(r.x, r.y), o = r.target);var a = this._hovered = i ? { x: e, y: n } : this.findHover(e, n),s = a.target,l = this.proxy;l.setCursor && l.setCursor(s ? s.cursor : "default"), o && s !== o && this.dispatchToElement(r, "mouseout", t), this.dispatchToElement(a, "mousemove", t), s && s !== o && this.dispatchToElement(a, "mouseover", t);}, mouseout: function mouseout(t) {var e = t.zrEventControl,n = t.zrIsToLocalDOM;"only_globalout" !== e && this.dispatchToElement(this._hovered, "mouseout", t), "no_globalout" !== e && !n && this.trigger("globalout", { type: "globalout", event: t });}, resize: function resize() {this._hovered = {};}, dispatch: function dispatch(t, e) {var n = this[t];n && n.call(this, e);}, dispose: function dispose() {this.proxy.dispose(), this.storage = this.proxy = this.painter = null;}, setCursorStyle: function setCursorStyle(t) {var e = this.proxy;e.setCursor && e.setCursor(t);}, dispatchToElement: function dispatchToElement(t, e, n) {t = t || {};var i = t.target;if (!i || !i.silent) {for (var r = "on" + e, o = Te(e, t, n); i && (i[r] && (o.cancelBubble = i[r].call(i, o)), i.trigger(e, o), i = i.parent, !o.cancelBubble);) {;}o.cancelBubble || (this.trigger(e, o), this.painter && this.painter.eachOtherLayer(function (t) {"function" == typeof t[r] && t[r].call(t, o), t.trigger && t.trigger(e, o);}));}}, findHover: function findHover(t, e, n) {for (var i = this.storage.getDisplayList(), r = { x: t, y: e }, o = i.length - 1; o >= 0; o--) {var a;if (i[o] !== n && !i[o].ignore && (a = Ae(i[o], t, e)) && (!r.topTarget && (r.topTarget = i[o]), a !== wp)) {r.target = i[o];break;}}return r;}, processGesture: function processGesture(t, e) {this._gestureMgr || (this._gestureMgr = new _p());var n = this._gestureMgr;"start" === e && n.clear();var i = n.recognize(t, this.findHover(t.zrX, t.zrY, null).target, this.proxy.dom);if ("end" === e && n.clear(), i) {var r = i.type;t.gestureEvent = r, this.dispatchToElement({ target: i.target }, r, i.event);}} }, f(["click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu"], function (t) {Sp.prototype[t] = function (e) {var n,i,r = e.zrX,o = e.zrY,a = Pe(this, r, o);if ("mouseup" === t && a || (n = this.findHover(r, o), i = n.target), "mousedown" === t) this._downEl = i, this._downPoint = [e.zrX, e.zrY], this._upEl = i;else if ("mouseup" === t) this._upEl = i;else if ("click" === t) {if (this._downEl !== this._upEl || !this._downPoint || sp(this._downPoint, [e.zrX, e.zrY]) > 4) return;this._downPoint = null;}this.dispatchToElement(n, t, e);};}), c(Sp, cp), c(Sp, le);var Mp = "undefined" == typeof Float32Array ? Array : Float32Array,Cp = (Object.freeze || Object)({ create: Oe, identity: Le, copy: Be, mul: ze, translate: Ee, rotate: Re, scale: Ne, invert: Fe, clone: He }),Ip = Le,Tp = 5e-5,kp = function kp(t) {t = t || {}, t.position || (this.position = [0, 0]), null == t.rotation && (this.rotation = 0), t.scale || (this.scale = [1, 1]), this.origin = this.origin || null;},Dp = kp.prototype;Dp.transform = null, Dp.needLocalTransform = function () {return Ve(this.rotation) || Ve(this.position[0]) || Ve(this.position[1]) || Ve(this.scale[0] - 1) || Ve(this.scale[1] - 1);};var Ap = [];Dp.updateTransform = function () {var t = this.parent,e = t && t.transform,n = this.needLocalTransform(),i = this.transform;if (!n && !e) return void (i && Ip(i));i = i || Oe(), n ? this.getLocalTransform(i) : Ip(i), e && (n ? ze(i, t.transform, i) : Be(i, t.transform)), this.transform = i;var r = this.globalScaleRatio;if (null != r && 1 !== r) {this.getGlobalScale(Ap);var o = Ap[0] < 0 ? -1 : 1,a = Ap[1] < 0 ? -1 : 1,s = ((Ap[0] - o) * r + o) / Ap[0] || 0,l = ((Ap[1] - a) * r + a) / Ap[1] || 0;i[0] *= s, i[1] *= s, i[2] *= l, i[3] *= l;}this.invTransform = this.invTransform || Oe(), Fe(this.invTransform, i);}, Dp.getLocalTransform = function (t) {return kp.getLocalTransform(this, t);}, Dp.setTransform = function (t) {var e = this.transform,n = t.dpr || 1;e ? t.setTransform(n * e[0], n * e[1], n * e[2], n * e[3], n * e[4], n * e[5]) : t.setTransform(n, 0, 0, n, 0, 0);}, Dp.restoreTransform = function (t) {var e = t.dpr || 1;t.setTransform(e, 0, 0, e, 0, 0);};var Pp = [],Op = Oe();Dp.setLocalTransform = function (t) {if (t) {var e = t[0] * t[0] + t[1] * t[1],n = t[2] * t[2] + t[3] * t[3],i = this.position,r = this.scale;Ve(e - 1) && (e = Math.sqrt(e)), Ve(n - 1) && (n = Math.sqrt(n)), t[0] < 0 && (e = -e), t[3] < 0 && (n = -n), i[0] = t[4], i[1] = t[5], r[0] = e, r[1] = n, this.rotation = Math.atan2(-t[1] / n, t[0] / e);}}, Dp.decomposeTransform = function () {if (this.transform) {var t = this.parent,e = this.transform;t && t.transform && (ze(Pp, t.invTransform, e), e = Pp);var n = this.origin;n && (n[0] || n[1]) && (Op[4] = n[0], Op[5] = n[1], ze(Pp, e, Op), Pp[4] -= n[0], Pp[5] -= n[1], e = Pp), this.setLocalTransform(e);}}, Dp.getGlobalScale = function (t) {var e = this.transform;return t = t || [], e ? (t[0] = Math.sqrt(e[0] * e[0] + e[1] * e[1]), t[1] = Math.sqrt(e[2] * e[2] + e[3] * e[3]), e[0] < 0 && (t[0] = -t[0]), e[3] < 0 && (t[1] = -t[1]), t) : (t[0] = 1, t[1] = 1, t);}, Dp.transformCoordToLocal = function (t, e) {var n = [t, e],i = this.invTransform;return i && oe(n, n, i), n;}, Dp.transformCoordToGlobal = function (t, e) {var n = [t, e],i = this.transform;return i && oe(n, n, i), n;}, kp.getLocalTransform = function (t, e) {e = e || [], Ip(e);var n = t.origin,i = t.scale || [1, 1],r = t.rotation || 0,o = t.position || [0, 0];return n && (e[4] -= n[0], e[5] -= n[1]), Ne(e, e, i), r && Re(e, e, r), n && (e[4] += n[0], e[5] += n[1]), e[4] += o[0], e[5] += o[1], e;};var Lp = { linear: function linear(t) {return t;}, quadraticIn: function quadraticIn(t) {return t * t;}, quadraticOut: function quadraticOut(t) {return t * (2 - t);}, quadraticInOut: function quadraticInOut(t) {return (t *= 2) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1);}, cubicIn: function cubicIn(t) {return t * t * t;}, cubicOut: function cubicOut(t) {return --t * t * t + 1;}, cubicInOut: function cubicInOut(t) {return (t *= 2) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2);}, quarticIn: function quarticIn(t) {return t * t * t * t;}, quarticOut: function quarticOut(t) {return 1 - --t * t * t * t;}, quarticInOut: function quarticInOut(t) {return (t *= 2) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2);}, quinticIn: function quinticIn(t) {return t * t * t * t * t;}, quinticOut: function quinticOut(t) {return --t * t * t * t * t + 1;}, quinticInOut: function quinticInOut(t) {return (t *= 2) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2);}, sinusoidalIn: function sinusoidalIn(t) {return 1 - Math.cos(t * Math.PI / 2);}, sinusoidalOut: function sinusoidalOut(t) {return Math.sin(t * Math.PI / 2);}, sinusoidalInOut: function sinusoidalInOut(t) {return .5 * (1 - Math.cos(Math.PI * t));}, exponentialIn: function exponentialIn(t) {return 0 === t ? 0 : Math.pow(1024, t - 1);}, exponentialOut: function exponentialOut(t) {return 1 === t ? 1 : 1 - Math.pow(2, -10 * t);}, exponentialInOut: function exponentialInOut(t) {return 0 === t ? 0 : 1 === t ? 1 : (t *= 2) < 1 ? .5 * Math.pow(1024, t - 1) : .5 * (-Math.pow(2, -10 * (t - 1)) + 2);}, circularIn: function circularIn(t) {return 1 - Math.sqrt(1 - t * t);}, circularOut: function circularOut(t) {return Math.sqrt(1 - --t * t);}, circularInOut: function circularInOut(t) {return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1);}, elasticIn: function elasticIn(t) {var e,n = .1,i = .4;return 0 === t ? 0 : 1 === t ? 1 : (!n || 1 > n ? (n = 1, e = i / 4) : e = i * Math.asin(1 / n) / (2 * Math.PI), -(n * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / i)));}, elasticOut: function elasticOut(t) {var e,n = .1,i = .4;return 0 === t ? 0 : 1 === t ? 1 : (!n || 1 > n ? (n = 1, e = i / 4) : e = i * Math.asin(1 / n) / (2 * Math.PI), n * Math.pow(2, -10 * t) * Math.sin(2 * (t - e) * Math.PI / i) + 1);}, elasticInOut: function elasticInOut(t) {var e,n = .1,i = .4;return 0 === t ? 0 : 1 === t ? 1 : (!n || 1 > n ? (n = 1, e = i / 4) : e = i * Math.asin(1 / n) / (2 * Math.PI), (t *= 2) < 1 ? -.5 * n * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / i) : n * Math.pow(2, -10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / i) * .5 + 1);}, backIn: function backIn(t) {var e = 1.70158;return t * t * ((e + 1) * t - e);}, backOut: function backOut(t) {var e = 1.70158;return --t * t * ((e + 1) * t + e) + 1;}, backInOut: function backInOut(t) {var e = 2.5949095;return (t *= 2) < 1 ? .5 * t * t * ((e + 1) * t - e) : .5 * ((t -= 2) * t * ((e + 1) * t + e) + 2);}, bounceIn: function bounceIn(t) {return 1 - Lp.bounceOut(1 - t);}, bounceOut: function bounceOut(t) {return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;}, bounceInOut: function bounceInOut(t) {return .5 > t ? .5 * Lp.bounceIn(2 * t) : .5 * Lp.bounceOut(2 * t - 1) + .5;} };Ge.prototype = { constructor: Ge, step: function step(t, e) {if (this._initialized || (this._startTime = t + this._delay, this._initialized = !0), this._paused) return void (this._pausedTime += e);var n = (t - this._startTime - this._pausedTime) / this._life;if (!(0 > n)) {n = Math.min(n, 1);var i = this.easing,r = "string" == typeof i ? Lp[i] : i,o = "function" == typeof r ? r(n) : n;
        return this.fire("frame", o), 1 === n ? this.loop ? (this.restart(t), "restart") : (this._needsRemove = !0, "destroy") : null;}}, restart: function restart(t) {var e = (t - this._startTime - this._pausedTime) % this._life;this._startTime = t - e + this.gap, this._pausedTime = 0, this._needsRemove = !1;}, fire: function fire(t, e) {t = "on" + t, this[t] && this[t](this._target, e);}, pause: function pause() {this._paused = !0;}, resume: function resume() {this._paused = !1;} };var Bp = function Bp() {this.head = null, this.tail = null, this._len = 0;},zp = Bp.prototype;zp.insert = function (t) {var e = new Ep(t);return this.insertEntry(e), e;}, zp.insertEntry = function (t) {this.head ? (this.tail.next = t, t.prev = this.tail, t.next = null, this.tail = t) : this.head = this.tail = t, this._len++;}, zp.remove = function (t) {var e = t.prev,n = t.next;e ? e.next = n : this.head = n, n ? n.prev = e : this.tail = e, t.next = t.prev = null, this._len--;}, zp.len = function () {return this._len;}, zp.clear = function () {this.head = this.tail = null, this._len = 0;};var Ep = function Ep(t) {this.value = t, this.next, this.prev;},Rp = function Rp(t) {this._list = new Bp(), this._map = {}, this._maxSize = t || 10, this._lastRemovedEntry = null;},Np = Rp.prototype;Np.put = function (t, e) {var n = this._list,i = this._map,r = null;if (null == i[t]) {var o = n.len(),a = this._lastRemovedEntry;if (o >= this._maxSize && o > 0) {var s = n.head;n.remove(s), delete i[s.key], r = s.value, this._lastRemovedEntry = s;}a ? a.value = e : a = new Ep(e), a.key = t, n.insertEntry(a), i[t] = a;}return r;}, Np.get = function (t) {var e = this._map[t],n = this._list;return null != e ? (e !== n.tail && (n.remove(e), n.insertEntry(e)), e.value) : void 0;}, Np.clear = function () {this._list.clear(), this._map = {};};var Fp = { transparent: [0, 0, 0, 0], aliceblue: [240, 248, 255, 1], antiquewhite: [250, 235, 215, 1], aqua: [0, 255, 255, 1], aquamarine: [127, 255, 212, 1], azure: [240, 255, 255, 1], beige: [245, 245, 220, 1], bisque: [255, 228, 196, 1], black: [0, 0, 0, 1], blanchedalmond: [255, 235, 205, 1], blue: [0, 0, 255, 1], blueviolet: [138, 43, 226, 1], brown: [165, 42, 42, 1], burlywood: [222, 184, 135, 1], cadetblue: [95, 158, 160, 1], chartreuse: [127, 255, 0, 1], chocolate: [210, 105, 30, 1], coral: [255, 127, 80, 1], cornflowerblue: [100, 149, 237, 1], cornsilk: [255, 248, 220, 1], crimson: [220, 20, 60, 1], cyan: [0, 255, 255, 1], darkblue: [0, 0, 139, 1], darkcyan: [0, 139, 139, 1], darkgoldenrod: [184, 134, 11, 1], darkgray: [169, 169, 169, 1], darkgreen: [0, 100, 0, 1], darkgrey: [169, 169, 169, 1], darkkhaki: [189, 183, 107, 1], darkmagenta: [139, 0, 139, 1], darkolivegreen: [85, 107, 47, 1], darkorange: [255, 140, 0, 1], darkorchid: [153, 50, 204, 1], darkred: [139, 0, 0, 1], darksalmon: [233, 150, 122, 1], darkseagreen: [143, 188, 143, 1], darkslateblue: [72, 61, 139, 1], darkslategray: [47, 79, 79, 1], darkslategrey: [47, 79, 79, 1], darkturquoise: [0, 206, 209, 1], darkviolet: [148, 0, 211, 1], deeppink: [255, 20, 147, 1], deepskyblue: [0, 191, 255, 1], dimgray: [105, 105, 105, 1], dimgrey: [105, 105, 105, 1], dodgerblue: [30, 144, 255, 1], firebrick: [178, 34, 34, 1], floralwhite: [255, 250, 240, 1], forestgreen: [34, 139, 34, 1], fuchsia: [255, 0, 255, 1], gainsboro: [220, 220, 220, 1], ghostwhite: [248, 248, 255, 1], gold: [255, 215, 0, 1], goldenrod: [218, 165, 32, 1], gray: [128, 128, 128, 1], green: [0, 128, 0, 1], greenyellow: [173, 255, 47, 1], grey: [128, 128, 128, 1], honeydew: [240, 255, 240, 1], hotpink: [255, 105, 180, 1], indianred: [205, 92, 92, 1], indigo: [75, 0, 130, 1], ivory: [255, 255, 240, 1], khaki: [240, 230, 140, 1], lavender: [230, 230, 250, 1], lavenderblush: [255, 240, 245, 1], lawngreen: [124, 252, 0, 1], lemonchiffon: [255, 250, 205, 1], lightblue: [173, 216, 230, 1], lightcoral: [240, 128, 128, 1], lightcyan: [224, 255, 255, 1], lightgoldenrodyellow: [250, 250, 210, 1], lightgray: [211, 211, 211, 1], lightgreen: [144, 238, 144, 1], lightgrey: [211, 211, 211, 1], lightpink: [255, 182, 193, 1], lightsalmon: [255, 160, 122, 1], lightseagreen: [32, 178, 170, 1], lightskyblue: [135, 206, 250, 1], lightslategray: [119, 136, 153, 1], lightslategrey: [119, 136, 153, 1], lightsteelblue: [176, 196, 222, 1], lightyellow: [255, 255, 224, 1], lime: [0, 255, 0, 1], limegreen: [50, 205, 50, 1], linen: [250, 240, 230, 1], magenta: [255, 0, 255, 1], maroon: [128, 0, 0, 1], mediumaquamarine: [102, 205, 170, 1], mediumblue: [0, 0, 205, 1], mediumorchid: [186, 85, 211, 1], mediumpurple: [147, 112, 219, 1], mediumseagreen: [60, 179, 113, 1], mediumslateblue: [123, 104, 238, 1], mediumspringgreen: [0, 250, 154, 1], mediumturquoise: [72, 209, 204, 1], mediumvioletred: [199, 21, 133, 1], midnightblue: [25, 25, 112, 1], mintcream: [245, 255, 250, 1], mistyrose: [255, 228, 225, 1], moccasin: [255, 228, 181, 1], navajowhite: [255, 222, 173, 1], navy: [0, 0, 128, 1], oldlace: [253, 245, 230, 1], olive: [128, 128, 0, 1], olivedrab: [107, 142, 35, 1], orange: [255, 165, 0, 1], orangered: [255, 69, 0, 1], orchid: [218, 112, 214, 1], palegoldenrod: [238, 232, 170, 1], palegreen: [152, 251, 152, 1], paleturquoise: [175, 238, 238, 1], palevioletred: [219, 112, 147, 1], papayawhip: [255, 239, 213, 1], peachpuff: [255, 218, 185, 1], peru: [205, 133, 63, 1], pink: [255, 192, 203, 1], plum: [221, 160, 221, 1], powderblue: [176, 224, 230, 1], purple: [128, 0, 128, 1], red: [255, 0, 0, 1], rosybrown: [188, 143, 143, 1], royalblue: [65, 105, 225, 1], saddlebrown: [139, 69, 19, 1], salmon: [250, 128, 114, 1], sandybrown: [244, 164, 96, 1], seagreen: [46, 139, 87, 1], seashell: [255, 245, 238, 1], sienna: [160, 82, 45, 1], silver: [192, 192, 192, 1], skyblue: [135, 206, 235, 1], slateblue: [106, 90, 205, 1], slategray: [112, 128, 144, 1], slategrey: [112, 128, 144, 1], snow: [255, 250, 250, 1], springgreen: [0, 255, 127, 1], steelblue: [70, 130, 180, 1], tan: [210, 180, 140, 1], teal: [0, 128, 128, 1], thistle: [216, 191, 216, 1], tomato: [255, 99, 71, 1], turquoise: [64, 224, 208, 1], violet: [238, 130, 238, 1], wheat: [245, 222, 179, 1], white: [255, 255, 255, 1], whitesmoke: [245, 245, 245, 1], yellow: [255, 255, 0, 1], yellowgreen: [154, 205, 50, 1] },Hp = new Rp(20),Vp = null,Gp = on,Wp = an,Xp = (Object.freeze || Object)({ parse: Je, lift: nn, toHex: rn, fastLerp: on, fastMapToColor: Gp, lerp: an, mapToColor: Wp, modifyHSL: sn, modifyAlpha: ln, stringify: un }),Yp = Array.prototype.slice,Up = function Up(t, e, n, i) {this._tracks = {}, this._target = t, this._loop = e || !1, this._getter = n || hn, this._setter = i || cn, this._clipCount = 0, this._delay = 0, this._doneList = [], this._onframeList = [], this._clipList = [];};Up.prototype = { when: function when(t, e) {var n = this._tracks;for (var i in e) {if (e.hasOwnProperty(i)) {if (!n[i]) {n[i] = [];var r = this._getter(this._target, i);if (null == r) continue;0 !== t && n[i].push({ time: 0, value: _n(r) });}n[i].push({ time: t, value: e[i] });}}return this;}, during: function during(t) {return this._onframeList.push(t), this;}, pause: function pause() {for (var t = 0; t < this._clipList.length; t++) {this._clipList[t].pause();}this._paused = !0;}, resume: function resume() {for (var t = 0; t < this._clipList.length; t++) {this._clipList[t].resume();}this._paused = !1;}, isPaused: function isPaused() {return !!this._paused;}, _doneCallback: function _doneCallback() {this._tracks = {}, this._clipList.length = 0;for (var t = this._doneList, e = t.length, n = 0; e > n; n++) {t[n].call(this);}}, start: function start(t, e) {var n,i = this,r = 0,o = function o() {r--, r || i._doneCallback();};for (var a in this._tracks) {if (this._tracks.hasOwnProperty(a)) {var s = bn(this, t, o, this._tracks[a], a, e);s && (this._clipList.push(s), r++, this.animation && this.animation.addClip(s), n = s);}}if (n) {var l = n.onframe;n.onframe = function (t, e) {l(t, e);for (var n = 0; n < i._onframeList.length; n++) {i._onframeList[n](t, e);}};}return r || this._doneCallback(), this;}, stop: function stop(t) {for (var e = this._clipList, n = this.animation, i = 0; i < e.length; i++) {var r = e[i];t && r.onframe(this._target, 1), n && n.removeClip(r);}e.length = 0;}, delay: function delay(t) {return this._delay = t, this;}, done: function done(t) {return t && this._doneList.push(t), this;}, getClips: function getClips() {return this._clipList;} };var jp = 1;"undefined" != typeof window && (jp = Math.max(window.devicePixelRatio || 1, 1));var qp = 0,Zp = jp,Kp = function Kp() {};1 === qp && (Kp = console.error);var $p = Kp,Qp = function Qp() {this.animators = [];};Qp.prototype = { constructor: Qp, animate: function animate(t, e) {var n,i = !1,r = this,o = this.__zr;if (t) {var a = t.split("."),s = r;i = "shape" === a[0];for (var l = 0, h = a.length; h > l; l++) {s && (s = s[a[l]]);}s && (n = s);} else n = r;if (!n) return void $p('Property "' + t + '" is not existed in element ' + r.id);var c = r.animators,d = new Up(n, e);return d.during(function () {r.dirty(i);}).done(function () {c.splice(u(c, d), 1);}), c.push(d), o && o.animation.addAnimator(d), d;}, stopAnimation: function stopAnimation(t) {for (var e = this.animators, n = e.length, i = 0; n > i; i++) {e[i].stop(t);}return e.length = 0, this;}, animateTo: function animateTo(t, e, n, i, r, o) {Sn(this, t, e, n, i, r, o);}, animateFrom: function animateFrom(t, e, n, i, r, o) {Sn(this, t, e, n, i, r, o, !0);} };var Jp = function Jp(t) {kp.call(this, t), cp.call(this, t), Qp.call(this, t), this.id = t.id || Vf();};Jp.prototype = { type: "element", name: "", __zr: null, ignore: !1, clipPath: null, isGroup: !1, drift: function drift(t, e) {switch (this.draggable) {case "horizontal":e = 0;break;case "vertical":t = 0;}var n = this.transform;n || (n = this.transform = [1, 0, 0, 1, 0, 0]), n[4] += t, n[5] += e, this.decomposeTransform(), this.dirty(!1);}, beforeUpdate: function beforeUpdate() {}, afterUpdate: function afterUpdate() {}, update: function update() {this.updateTransform();}, traverse: function traverse() {}, attrKV: function attrKV(t, e) {if ("position" === t || "scale" === t || "origin" === t) {if (e) {var n = this[t];n || (n = this[t] = []), n[0] = e[0], n[1] = e[1];}} else this[t] = e;}, hide: function hide() {this.ignore = !0, this.__zr && this.__zr.refresh();}, show: function show() {this.ignore = !1, this.__zr && this.__zr.refresh();}, attr: function attr(t, e) {if ("string" == typeof t) this.attrKV(t, e);else if (S(t)) for (var n in t) {t.hasOwnProperty(n) && this.attrKV(n, t[n]);}return this.dirty(!1), this;}, setClipPath: function setClipPath(t) {var e = this.__zr;e && t.addSelfToZr(e), this.clipPath && this.clipPath !== t && this.removeClipPath(), this.clipPath = t, t.__zr = e, t.__clipTarget = this, this.dirty(!1);}, removeClipPath: function removeClipPath() {var t = this.clipPath;t && (t.__zr && t.removeSelfFromZr(t.__zr), t.__zr = null, t.__clipTarget = null, this.clipPath = null, this.dirty(!1));}, addSelfToZr: function addSelfToZr(t) {this.__zr = t;var e = this.animators;if (e) for (var n = 0; n < e.length; n++) {t.animation.addAnimator(e[n]);}this.clipPath && this.clipPath.addSelfToZr(t);}, removeSelfFromZr: function removeSelfFromZr(t) {this.__zr = null;var e = this.animators;if (e) for (var n = 0; n < e.length; n++) {t.animation.removeAnimator(e[n]);}this.clipPath && this.clipPath.removeSelfFromZr(t);} }, c(Jp, Qp), c(Jp, kp), c(Jp, cp);var tg = oe,eg = Math.min,ng = Math.max;In.prototype = { constructor: In, union: function union(t) {var e = eg(t.x, this.x),n = eg(t.y, this.y);this.width = ng(t.x + t.width, this.x + this.width) - e, this.height = ng(t.y + t.height, this.y + this.height) - n, this.x = e, this.y = n;}, applyTransform: function () {var t = [],e = [],n = [],i = [];return function (r) {if (r) {t[0] = n[0] = this.x, t[1] = i[1] = this.y, e[0] = i[0] = this.x + this.width, e[1] = n[1] = this.y + this.height, tg(t, t, r), tg(e, e, r), tg(n, n, r), tg(i, i, r), this.x = eg(t[0], e[0], n[0], i[0]), this.y = eg(t[1], e[1], n[1], i[1]);var o = ng(t[0], e[0], n[0], i[0]),a = ng(t[1], e[1], n[1], i[1]);this.width = o - this.x, this.height = a - this.y;}};}(), calculateTransform: function calculateTransform(t) {var e = this,n = t.width / e.width,i = t.height / e.height,r = Oe();return Ee(r, r, [-e.x, -e.y]), Ne(r, r, [n, i]), Ee(r, r, [t.x, t.y]), r;}, intersect: function intersect(t) {if (!t) return !1;t instanceof In || (t = In.create(t));var e = this,n = e.x,i = e.x + e.width,r = e.y,o = e.y + e.height,a = t.x,s = t.x + t.width,l = t.y,u = t.y + t.height;return !(a > i || n > s || l > o || r > u);}, contain: function contain(t, e) {var n = this;return t >= n.x && t <= n.x + n.width && e >= n.y && e <= n.y + n.height;}, clone: function clone() {return new In(this.x, this.y, this.width, this.height);}, copy: function copy(t) {this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height;}, plain: function plain() {return { x: this.x, y: this.y, width: this.width, height: this.height };} }, In.create = function (t) {return new In(t.x, t.y, t.width, t.height);};var ig = function ig(t) {t = t || {}, Jp.call(this, t);for (var e in t) {t.hasOwnProperty(e) && (this[e] = t[e]);}this._children = [], this.__storage = null, this.__dirty = !0;};ig.prototype = { constructor: ig, isGroup: !0, type: "group", silent: !1, children: function children() {return this._children.slice();}, childAt: function childAt(t) {return this._children[t];}, childOfName: function childOfName(t) {for (var e = this._children, n = 0; n < e.length; n++) {if (e[n].name === t) return e[n];}}, childCount: function childCount() {return this._children.length;}, add: function add(t) {return t && t !== this && t.parent !== this && (this._children.push(t), this._doAdd(t)), this;}, addBefore: function addBefore(t, e) {if (t && t !== this && t.parent !== this && e && e.parent === this) {var n = this._children,i = n.indexOf(e);i >= 0 && (n.splice(i, 0, t), this._doAdd(t));}return this;}, _doAdd: function _doAdd(t) {t.parent && t.parent.remove(t), t.parent = this;var e = this.__storage,n = this.__zr;e && e !== t.__storage && (e.addToStorage(t), t instanceof ig && t.addChildrenToStorage(e)), n && n.refresh();}, remove: function remove(t) {var e = this.__zr,n = this.__storage,i = this._children,r = u(i, t);return 0 > r ? this : (i.splice(r, 1), t.parent = null, n && (n.delFromStorage(t), t instanceof ig && t.delChildrenFromStorage(n)), e && e.refresh(), this);}, removeAll: function removeAll() {var t,e,n = this._children,i = this.__storage;for (e = 0; e < n.length; e++) {t = n[e], i && (i.delFromStorage(t), t instanceof ig && t.delChildrenFromStorage(i)), t.parent = null;}return n.length = 0, this;}, eachChild: function eachChild(t, e) {for (var n = this._children, i = 0; i < n.length; i++) {var r = n[i];t.call(e, r, i);}return this;}, traverse: function traverse(t, e) {for (var n = 0; n < this._children.length; n++) {var i = this._children[n];t.call(e, i), "group" === i.type && i.traverse(t, e);}return this;}, addChildrenToStorage: function addChildrenToStorage(t) {for (var e = 0; e < this._children.length; e++) {var n = this._children[e];t.addToStorage(n), n instanceof ig && n.addChildrenToStorage(t);}}, delChildrenFromStorage: function delChildrenFromStorage(t) {for (var e = 0; e < this._children.length; e++) {var n = this._children[e];t.delFromStorage(n), n instanceof ig && n.delChildrenFromStorage(t);}}, dirty: function dirty() {return this.__dirty = !0, this.__zr && this.__zr.refresh(), this;}, getBoundingRect: function getBoundingRect(t) {for (var e = null, n = new In(0, 0, 0, 0), i = t || this._children, r = [], o = 0; o < i.length; o++) {var a = i[o];if (!a.ignore && !a.invisible) {var s = a.getBoundingRect(),l = a.getLocalTransform(r);l ? (n.copy(s), n.applyTransform(l), e = e || n.clone(), e.union(n)) : (e = e || s.clone(), e.union(s));}}return e || n;} }, h(ig, Jp);var rg = 32,og = 7,ag = function ag() {this._roots = [], this._displayList = [], this._displayListLen = 0;};ag.prototype = { constructor: ag, traverse: function traverse(t, e) {for (var n = 0; n < this._roots.length; n++) {this._roots[n].traverse(t, e);}}, getDisplayList: function getDisplayList(t, e) {return e = e || !1, t && this.updateDisplayList(e), this._displayList;}, updateDisplayList: function updateDisplayList(t) {this._displayListLen = 0;for (var e = this._roots, n = this._displayList, i = 0, r = e.length; r > i; i++) {this._updateAndAddDisplayable(e[i], null, t);}n.length = this._displayListLen, Wf.canvasSupported && Bn(n, zn);}, _updateAndAddDisplayable: function _updateAndAddDisplayable(t, e, n) {if (!t.ignore || n) {t.beforeUpdate(), t.__dirty && t.update(), t.afterUpdate();var i = t.clipPath;if (i) {e = e ? e.slice() : [];for (var r = i, o = t; r;) {r.parent = o, r.updateTransform(), e.push(r), o = r, r = r.clipPath;}}if (t.isGroup) {for (var a = t._children, s = 0; s < a.length; s++) {var l = a[s];t.__dirty && (l.__dirty = !0), this._updateAndAddDisplayable(l, e, n);}t.__dirty = !1;} else t.__clipPaths = e, this._displayList[this._displayListLen++] = t;}}, addRoot: function addRoot(t) {t.__storage !== this && (t instanceof ig && t.addChildrenToStorage(this), this.addToStorage(t), this._roots.push(t));}, delRoot: function delRoot(t) {if (null == t) {for (var e = 0; e < this._roots.length; e++) {var n = this._roots[e];n instanceof ig && n.delChildrenFromStorage(this);}return this._roots = [], this._displayList = [], void (this._displayListLen = 0);}if (t instanceof Array) for (var e = 0, i = t.length; i > e; e++) {this.delRoot(t[e]);} else {var r = u(this._roots, t);r >= 0 && (this.delFromStorage(t), this._roots.splice(r, 1), t instanceof ig && t.delChildrenFromStorage(this));}}, addToStorage: function addToStorage(t) {return t && (t.__storage = this, t.dirty(!1)), this;}, delFromStorage: function delFromStorage(t) {return t && (t.__storage = null), this;}, dispose: function dispose() {this._renderList = this._roots = null;}, displayableSortFunc: zn };var sg = { shadowBlur: 1, shadowOffsetX: 1, shadowOffsetY: 1, textShadowBlur: 1, textShadowOffsetX: 1, textShadowOffsetY: 1, textBoxShadowBlur: 1, textBoxShadowOffsetX: 1, textBoxShadowOffsetY: 1 },lg = function lg(t, e, n) {return sg.hasOwnProperty(e) ? n *= t.dpr : n;},ug = { NONE: 0, STYLE_BIND: 1, PLAIN_TEXT: 2 },hg = 9,cg = [["shadowBlur", 0], ["shadowOffsetX", 0], ["shadowOffsetY", 0], ["shadowColor", "#000"], ["lineCap", "butt"], ["lineJoin", "miter"], ["miterLimit", 10]],dg = function dg(t) {this.extendFrom(t, !1);};dg.prototype = { constructor: dg, fill: "#000", stroke: null, opacity: 1, fillOpacity: null, strokeOpacity: null, lineDash: null, lineDashOffset: 0, shadowBlur: 0, shadowOffsetX: 0, shadowOffsetY: 0, lineWidth: 1, strokeNoScale: !1, text: null, font: null, textFont: null, fontStyle: null, fontWeight: null, fontSize: null, fontFamily: null, textTag: null, textFill: "#000", textStroke: null, textWidth: null, textHeight: null, textStrokeWidth: 0, textLineHeight: null, textPosition: "inside", textRect: null, textOffset: null, textAlign: null, textVerticalAlign: null, textDistance: 5, textShadowColor: "transparent", textShadowBlur: 0, textShadowOffsetX: 0, textShadowOffsetY: 0, textBoxShadowColor: "transparent", textBoxShadowBlur: 0, textBoxShadowOffsetX: 0, textBoxShadowOffsetY: 0, transformText: !1, textRotation: 0, textOrigin: null, textBackgroundColor: null, textBorderColor: null, textBorderWidth: 0, textBorderRadius: 0, textPadding: null, rich: null, truncate: null, blend: null, bind: function bind(t, e, n) {var i = this,r = n && n.style,o = !r || t.__attrCachedBy !== ug.STYLE_BIND;t.__attrCachedBy = ug.STYLE_BIND;for (var a = 0; a < cg.length; a++) {var s = cg[a],l = s[0];(o || i[l] !== r[l]) && (t[l] = lg(t, l, i[l] || s[1]));}if ((o || i.fill !== r.fill) && (t.fillStyle = i.fill), (o || i.stroke !== r.stroke) && (t.strokeStyle = i.stroke), (o || i.opacity !== r.opacity) && (t.globalAlpha = null == i.opacity ? 1 : i.opacity), (o || i.blend !== r.blend) && (t.globalCompositeOperation = i.blend || "source-over"), this.hasStroke()) {var u = i.lineWidth;t.lineWidth = u / (this.strokeNoScale && e && e.getLineScale ? e.getLineScale() : 1);}}, hasFill: function hasFill() {var t = this.fill;return null != t && "none" !== t;}, hasStroke: function hasStroke() {var t = this.stroke;return null != t && "none" !== t && this.lineWidth > 0;}, extendFrom: function extendFrom(t, e) {if (t) for (var n in t) {!t.hasOwnProperty(n) || e !== !0 && (e === !1 ? this.hasOwnProperty(n) : null == t[n]) || (this[n] = t[n]);}}, set: function set(t, e) {"string" == typeof t ? this[t] = e : this.extendFrom(t, !0);}, clone: function clone() {var t = new this.constructor();return t.extendFrom(this, !0), t;}, getGradient: function getGradient(t, e, n) {for (var i = "radial" === e.type ? Rn : En, r = i(t, e, n), o = e.colorStops, a = 0; a < o.length; a++) {r.addColorStop(o[a].offset, o[a].color);}return r;} };for (var fg = dg.prototype, pg = 0; pg < cg.length; pg++) {var gg = cg[pg];gg[0] in fg || (fg[gg[0]] = gg[1]);}dg.getGradient = fg.getGradient;var vg = function vg(t, e) {this.image = t, this.repeat = e, this.type = "pattern";};vg.prototype.getCanvasPattern = function (t) {return t.createPattern(this.image, this.repeat || "repeat");};var mg = function mg(t, e, n) {var i;n = n || Zp, "string" == typeof t ? i = Fn(t, e, n) : S(t) && (i = t, t = i.id), this.id = t, this.dom = i;var r = i.style;r && (i.onselectstart = Nn, r["-webkit-user-select"] = "none", r["user-select"] = "none", r["-webkit-touch-callout"] = "none", r["-webkit-tap-highlight-color"] = "rgba(0,0,0,0)", r.padding = 0, r.margin = 0, r["border-width"] = 0), this.domBack = null, this.ctxBack = null, this.painter = e, this.config = null, this.clearColor = 0, this.motionBlur = !1, this.lastFrameAlpha = .7, this.dpr = n;};mg.prototype = { constructor: mg, __dirty: !0, __used: !1, __drawIndex: 0, __startIndex: 0, __endIndex: 0, incremental: !1, getElementCount: function getElementCount() {return this.__endIndex - this.__startIndex;}, initContext: function initContext() {this.ctx = this.dom.getContext("2d"), this.ctx.dpr = this.dpr;}, createBackBuffer: function createBackBuffer() {var t = this.dpr;this.domBack = Fn("back-" + this.id, this.painter, t), this.ctxBack = this.domBack.getContext("2d"), 1 !== t && this.ctxBack.scale(t, t);}, resize: function resize(t, e) {var n = this.dpr,i = this.dom,r = i.style,o = this.domBack;r && (r.width = t + "px", r.height = e + "px"), i.width = t * n, i.height = e * n, o && (o.width = t * n, o.height = e * n, 1 !== n && this.ctxBack.scale(n, n));}, clear: function clear(t, e) {var n = this.dom,i = this.ctx,r = n.width,o = n.height,e = e || this.clearColor,a = this.motionBlur && !t,s = this.lastFrameAlpha,l = this.dpr;if (a && (this.domBack || this.createBackBuffer(), this.ctxBack.globalCompositeOperation = "copy", this.ctxBack.drawImage(n, 0, 0, r / l, o / l)), i.clearRect(0, 0, r, o), e && "transparent" !== e) {var u;e.colorStops ? (u = e.__canvasGradient || dg.getGradient(i, e, { x: 0, y: 0, width: r, height: o }), e.__canvasGradient = u) : e.image && (u = vg.prototype.getCanvasPattern.call(e, i)), i.save(), i.fillStyle = u || e, i.fillRect(0, 0, r, o), i.restore();}if (a) {var h = this.domBack;i.save(), i.globalAlpha = s, i.drawImage(h, 0, 0, r, o), i.restore();}} };var yg = "undefined" != typeof window && (window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window) || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame) || function (t) {setTimeout(t, 16);},_g = new Rp(50),xg = {},wg = 0,bg = 5e3,Sg = /\{([a-zA-Z0-9_]+)\|([^}]*)\}/g,Mg = "12px sans-serif",Cg = {};Cg.measureText = function (t, e) {var n = l();return n.font = e || Mg, n.measureText(t);};var Ig = Mg,Tg = { left: 1, right: 1, center: 1 },kg = { top: 1, bottom: 1, middle: 1 },Dg = [["textShadowBlur", "shadowBlur", 0], ["textShadowOffsetX", "shadowOffsetX", 0], ["textShadowOffsetY", "shadowOffsetY", 0], ["textShadowColor", "shadowColor", "transparent"]],Ag = {},Pg = {},Og = new In(),Lg = function Lg() {};Lg.prototype = { constructor: Lg, drawRectText: function drawRectText(t, e) {var n = this.style;e = n.textRect || e, this.__dirty && li(n, !0);var i = n.text;if (null != i && (i += ""), Ci(i, n)) {t.save();var r = this.transform;n.transformText ? this.setTransform(t) : r && (Og.copy(e), Og.applyTransform(r), e = Og), hi(this, t, i, n, e, hg), t.restore();}} }, Ii.prototype = { constructor: Ii, type: "displayable", __dirty: !0, invisible: !1, z: 0, z2: 0, zlevel: 0, draggable: !1, dragging: !1, silent: !1, culling: !1, cursor: "pointer", rectHover: !1, progressive: !1, incremental: !1, globalScaleRatio: 1, beforeBrush: function beforeBrush() {}, afterBrush: function afterBrush() {}, brush: function brush() {}, getBoundingRect: function getBoundingRect() {}, contain: function contain(t, e) {return this.rectContain(t, e);}, traverse: function traverse(t, e) {t.call(e, this);}, rectContain: function rectContain(t, e) {var n = this.transformCoordToLocal(t, e),i = this.getBoundingRect();return i.contain(n[0], n[1]);}, dirty: function dirty() {this.__dirty = this.__dirtyText = !0, this._rect = null, this.__zr && this.__zr.refresh();}, animateStyle: function animateStyle(t) {return this.animate("style", t);}, attrKV: function attrKV(t, e) {"style" !== t ? Jp.prototype.attrKV.call(this, t, e) : this.style.set(e);}, setStyle: function setStyle(t, e) {return this.style.set(t, e), this.dirty(!1), this;}, useStyle: function useStyle(t) {return this.style = new dg(t, this), this.dirty(!1), this;}, calculateTextPosition: null }, h(Ii, Jp), c(Ii, Lg), Ti.prototype = { constructor: Ti, type: "image", brush: function brush(t, e) {var n = this.style,i = n.image;n.bind(t, this, e);var r = this._image = Vn(i, this._image, this, this.onload);if (r && Wn(r)) {var o = n.x || 0,a = n.y || 0,s = n.width,l = n.height,u = r.width / r.height;if (null == s && null != l ? s = l * u : null == l && null != s ? l = s / u : null == s && null == l && (s = r.width, l = r.height), this.setTransform(t), n.sWidth && n.sHeight) {var h = n.sx || 0,c = n.sy || 0;t.drawImage(r, h, c, n.sWidth, n.sHeight, o, a, s, l);} else if (n.sx && n.sy) {var h = n.sx,c = n.sy,d = s - h,f = l - c;t.drawImage(r, h, c, d, f, o, a, s, l);} else t.drawImage(r, o, a, s, l);null != n.text && (this.restoreTransform(t), this.drawRectText(t, this.getBoundingRect()));}}, getBoundingRect: function getBoundingRect() {var t = this.style;return this._rect || (this._rect = new In(t.x || 0, t.y || 0, t.width || 0, t.height || 0)), this._rect;} }, h(Ti, Ii);var Bg = 1e5,zg = 314159,Eg = .01,Rg = .001,Ng = new In(0, 0, 0, 0),Fg = new In(0, 0, 0, 0),Hg = function Hg(t, e, n) {this.type = "canvas";var i = !t.nodeName || "CANVAS" === t.nodeName.toUpperCase();this._opts = n = a({}, n || {}), this.dpr = n.devicePixelRatio || Zp, this._singleCanvas = i, this.root = t;var r = t.style;r && (r["-webkit-tap-highlight-color"] = "transparent", r["-webkit-user-select"] = r["user-select"] = r["-webkit-touch-callout"] = "none", t.innerHTML = ""), this.storage = e;var o = this._zlevelList = [],s = this._layers = {};if (this._layerConfig = {}, this._needsManuallyCompositing = !1, i) {var l = t.width,u = t.height;null != n.width && (l = n.width), null != n.height && (u = n.height), this.dpr = n.devicePixelRatio || 1, t.width = l * this.dpr, t.height = u * this.dpr, this._width = l, this._height = u;var h = new mg(t, this, this.dpr);h.__builtin__ = !0, h.initContext(), s[zg] = h, h.zlevel = zg, o.push(zg), this._domRoot = t;} else {this._width = this._getSize(0), this._height = this._getSize(1);var c = this._domRoot = Li(this._width, this._height);t.appendChild(c);}this._hoverlayer = null, this._hoverElements = [];};Hg.prototype = { constructor: Hg, getType: function getType() {return "canvas";}, isSingleCanvas: function isSingleCanvas() {return this._singleCanvas;}, getViewportRoot: function getViewportRoot() {return this._domRoot;}, getViewportRootOffset: function getViewportRootOffset() {var t = this.getViewportRoot();return t ? { offsetLeft: t.offsetLeft || 0, offsetTop: t.offsetTop || 0 } : void 0;}, refresh: function refresh(t) {var e = this.storage.getDisplayList(!0),n = this._zlevelList;this._redrawId = Math.random(), this._paintList(e, t, this._redrawId);for (var i = 0; i < n.length; i++) {var r = n[i],o = this._layers[r];if (!o.__builtin__ && o.refresh) {var a = 0 === i ? this._backgroundColor : null;o.refresh(a);}}return this.refreshHover(), this;}, addHover: function addHover(t, e) {if (!t.__hoverMir) {var n = new t.constructor({ style: t.style, shape: t.shape, z: t.z, z2: t.z2, silent: t.silent });return n.__from = t, t.__hoverMir = n, e && n.setStyle(e), this._hoverElements.push(n), n;}}, removeHover: function removeHover(t) {var e = t.__hoverMir,n = this._hoverElements,i = u(n, e);i >= 0 && n.splice(i, 1), t.__hoverMir = null;}, clearHover: function clearHover() {for (var t = this._hoverElements, e = 0; e < t.length; e++) {var n = t[e].__from;n && (n.__hoverMir = null);}t.length = 0;}, refreshHover: function refreshHover() {var t = this._hoverElements,e = t.length,n = this._hoverlayer;if (n && n.clear(), e) {Bn(t, this.storage.displayableSortFunc), n || (n = this._hoverlayer = this.getLayer(Bg));var i = {};n.ctx.save();for (var r = 0; e > r;) {var o = t[r],a = o.__from;a && a.__zr ? (r++, a.invisible || (o.transform = a.transform, o.invTransform = a.invTransform, o.__clipPaths = a.__clipPaths, this._doPaintEl(o, n, !0, i))) : (t.splice(r, 1), a.__hoverMir = null, e--);}n.ctx.restore();}}, getHoverLayer: function getHoverLayer() {return this.getLayer(Bg);}, _paintList: function _paintList(t, e, n) {if (this._redrawId === n) {e = e || !1, this._updateLayerStatus(t);var i = this._doPaintList(t, e);if (this._needsManuallyCompositing && this._compositeManually(), !i) {var r = this;yg(function () {r._paintList(t, e, n);});}}}, _compositeManually: function _compositeManually() {var t = this.getLayer(zg).ctx,e = this._domRoot.width,n = this._domRoot.height;t.clearRect(0, 0, e, n), this.eachBuiltinLayer(function (i) {i.virtual && t.drawImage(i.dom, 0, 0, e, n);});}, _doPaintList: function _doPaintList(t, e) {for (var n = [], i = 0; i < this._zlevelList.length; i++) {var r = this._zlevelList[i],o = this._layers[r];o.__builtin__ && o !== this._hoverlayer && (o.__dirty || e) && n.push(o);}for (var a = !0, s = 0; s < n.length; s++) {var o = n[s],l = o.ctx,u = {};l.save();var h = e ? o.__startIndex : o.__drawIndex,c = !e && o.incremental && Date.now,d = c && Date.now(),p = o.zlevel === this._zlevelList[0] ? this._backgroundColor : null;if (o.__startIndex === o.__endIndex) o.clear(!1, p);else if (h === o.__startIndex) {var g = t[h];g.incremental && g.notClear && !e || o.clear(!1, p);}-1 === h && (console.error("For some unknown reason. drawIndex is -1"), h = o.__startIndex);for (var v = h; v < o.__endIndex; v++) {var m = t[v];if (this._doPaintEl(m, o, e, u), m.__dirty = m.__dirtyText = !1, c) {var y = Date.now() - d;if (y > 15) break;}}o.__drawIndex = v, o.__drawIndex < o.__endIndex && (a = !1), u.prevElClipPaths && l.restore(), l.restore();}return Wf.wxa && f(this._layers, function (t) {t && t.ctx && t.ctx.draw && t.ctx.draw();}), a;}, _doPaintEl: function _doPaintEl(t, e, n, i) {var r = e.ctx,o = t.transform;if (!(!e.__dirty && !n || t.invisible || 0 === t.style.opacity || o && !o[0] && !o[3] || t.culling && Ai(t, this._width, this._height))) {var a = t.__clipPaths,s = i.prevElClipPaths;(!s || Pi(a, s)) && (s && (r.restore(), i.prevElClipPaths = null, i.prevEl = null), a && (r.save(), Oi(a, r), i.prevElClipPaths = a)), t.beforeBrush && t.beforeBrush(r), t.brush(r, i.prevEl || null), i.prevEl = t, t.afterBrush && t.afterBrush(r);}}, getLayer: function getLayer(t, e) {this._singleCanvas && !this._needsManuallyCompositing && (t = zg);var n = this._layers[t];return n || (n = new mg("zr_" + t, this, this.dpr), n.zlevel = t, n.__builtin__ = !0, this._layerConfig[t] ? r(n, this._layerConfig[t], !0) : this._layerConfig[t - Eg] && r(n, this._layerConfig[t - Eg], !0), e && (n.virtual = e), this.insertLayer(t, n), n.initContext()), n;}, insertLayer: function insertLayer(t, e) {var n = this._layers,i = this._zlevelList,r = i.length,o = null,a = -1,s = this._domRoot;if (n[t]) return void $p("ZLevel " + t + " has been used already");if (!Di(e)) return void $p("Layer of zlevel " + t + " is not valid");if (r > 0 && t > i[0]) {for (a = 0; r - 1 > a && !(i[a] < t && i[a + 1] > t); a++) {;}o = n[i[a]];}if (i.splice(a + 1, 0, t), n[t] = e, !e.virtual) if (o) {var l = o.dom;l.nextSibling ? s.insertBefore(e.dom, l.nextSibling) : s.appendChild(e.dom);} else s.firstChild ? s.insertBefore(e.dom, s.firstChild) : s.appendChild(e.dom);}, eachLayer: function eachLayer(t, e) {var n,i,r = this._zlevelList;for (i = 0; i < r.length; i++) {n = r[i], t.call(e, this._layers[n], n);}}, eachBuiltinLayer: function eachBuiltinLayer(t, e) {var n,i,r,o = this._zlevelList;for (r = 0; r < o.length; r++) {i = o[r], n = this._layers[i], n.__builtin__ && t.call(e, n, i);}}, eachOtherLayer: function eachOtherLayer(t, e) {var n,i,r,o = this._zlevelList;for (r = 0; r < o.length; r++) {i = o[r], n = this._layers[i], n.__builtin__ || t.call(e, n, i);}}, getLayers: function getLayers() {return this._layers;}, _updateLayerStatus: function _updateLayerStatus(t) {function e(t) {o && (o.__endIndex !== t && (o.__dirty = !0), o.__endIndex = t);}if (this.eachBuiltinLayer(function (t) {t.__dirty = t.__used = !1;}), this._singleCanvas) for (var n = 1; n < t.length; n++) {var i = t[n];if (i.zlevel !== t[n - 1].zlevel || i.incremental) {this._needsManuallyCompositing = !0;break;}}for (var r, o = null, a = 0, n = 0; n < t.length; n++) {var s,i = t[n],l = i.zlevel;r !== l && (r = l, a = 0), i.incremental ? (s = this.getLayer(l + Rg, this._needsManuallyCompositing), s.incremental = !0, a = 1) : s = this.getLayer(l + (a > 0 ? Eg : 0), this._needsManuallyCompositing), s.__builtin__ || $p("ZLevel " + l + " has been used by unkown layer " + s.id), s !== o && (s.__used = !0, s.__startIndex !== n && (s.__dirty = !0), s.__startIndex = n, s.__drawIndex = s.incremental ? -1 : n, e(n), o = s), i.__dirty && (s.__dirty = !0, s.incremental && s.__drawIndex < 0 && (s.__drawIndex = n));}e(n), this.eachBuiltinLayer(function (t) {!t.__used && t.getElementCount() > 0 && (t.__dirty = !0, t.__startIndex = t.__endIndex = t.__drawIndex = 0), t.__dirty && t.__drawIndex < 0 && (t.__drawIndex = t.__startIndex);});}, clear: function clear() {return this.eachBuiltinLayer(this._clearLayer), this;}, _clearLayer: function _clearLayer(t) {t.clear();}, setBackgroundColor: function setBackgroundColor(t) {this._backgroundColor = t;}, configLayer: function configLayer(t, e) {if (e) {var n = this._layerConfig;n[t] ? r(n[t], e, !0) : n[t] = e;for (var i = 0; i < this._zlevelList.length; i++) {var o = this._zlevelList[i];if (o === t || o === t + Eg) {var a = this._layers[o];r(a, n[t], !0);}}}}, delLayer: function delLayer(t) {var e = this._layers,n = this._zlevelList,i = e[t];i && (i.dom.parentNode.removeChild(i.dom), delete e[t], n.splice(u(n, t), 1));}, resize: function resize(t, e) {if (this._domRoot.style) {var n = this._domRoot;n.style.display = "none";var i = this._opts;if (null != t && (i.width = t), null != e && (i.height = e), t = this._getSize(0), e = this._getSize(1), n.style.display = "", this._width !== t || e !== this._height) {n.style.width = t + "px", n.style.height = e + "px";for (var r in this._layers) {this._layers.hasOwnProperty(r) && this._layers[r].resize(t, e);}f(this._progressiveLayers, function (n) {n.resize(t, e);}), this.refresh(!0);}this._width = t, this._height = e;} else {if (null == t || null == e) return;this._width = t, this._height = e, this.getLayer(zg).resize(t, e);}return this;}, clearLayer: function clearLayer(t) {var e = this._layers[t];e && e.clear();}, dispose: function dispose() {this.root.innerHTML = "", this.root = this.storage = this._domRoot = this._layers = null;}, getRenderedCanvas: function getRenderedCanvas(t) {if (t = t || {}, this._singleCanvas && !this._compositeManually) return this._layers[zg].dom;var e = new mg("image", this, t.pixelRatio || this.dpr);if (e.initContext(), e.clear(!1, t.backgroundColor || this._backgroundColor), t.pixelRatio <= this.dpr) {this.refresh();var n = e.dom.width,i = e.dom.height,r = e.ctx;this.eachLayer(function (t) {t.__builtin__ ? r.drawImage(t.dom, 0, 0, n, i) : t.renderToCanvas && (e.ctx.save(), t.renderToCanvas(e.ctx), e.ctx.restore());});} else for (var o = {}, a = this.storage.getDisplayList(!0), s = 0; s < a.length; s++) {var l = a[s];this._doPaintEl(l, e, !0, o);}return e.dom;}, getWidth: function getWidth() {return this._width;}, getHeight: function getHeight() {return this._height;}, _getSize: function _getSize(t) {var e = this._opts,n = ["width", "height"][t],i = ["clientWidth", "clientHeight"][t],r = ["paddingLeft", "paddingTop"][t],o = ["paddingRight", "paddingBottom"][t];if (null != e[n] && "auto" !== e[n]) return parseFloat(e[n]);var a = this.root,s = document.defaultView.getComputedStyle(a);return (a[i] || ki(s[n]) || ki(a.style[n])) - (ki(s[r]) || 0) - (ki(s[o]) || 0) | 0;}, pathToImage: function pathToImage(t, e) {e = e || this.dpr;var n = document.createElement("canvas"),i = n.getContext("2d"),r = t.getBoundingRect(),o = t.style,a = o.shadowBlur * e,s = o.shadowOffsetX * e,l = o.shadowOffsetY * e,u = o.hasStroke() ? o.lineWidth : 0,h = Math.max(u / 2, -s + a),c = Math.max(u / 2, s + a),d = Math.max(u / 2, -l + a),f = Math.max(u / 2, l + a),p = r.width + h + c,g = r.height + d + f;n.width = p * e, n.height = g * e, i.scale(e, e), i.clearRect(0, 0, p, g), i.dpr = e;var v = { position: t.position, rotation: t.rotation, scale: t.scale };t.position = [h - r.x, d - r.y], t.rotation = 0, t.scale = [1, 1], t.updateTransform(), t && t.brush(i);var m = Ti,y = new m({ style: { x: 0, y: 0, image: n } });return null != v.position && (y.position = t.position = v.position), null != v.rotation && (y.rotation = t.rotation = v.rotation), null != v.scale && (y.scale = t.scale = v.scale), y;} };var Vg = function Vg(t) {t = t || {}, this.stage = t.stage || {}, this.onframe = t.onframe || function () {}, this._clips = [], this._running = !1, this._time, this._pausedTime, this._pauseStart, this._paused = !1, cp.call(this);};Vg.prototype = { constructor: Vg, addClip: function addClip(t) {this._clips.push(t);}, addAnimator: function addAnimator(t) {t.animation = this;for (var e = t.getClips(), n = 0; n < e.length; n++) {this.addClip(e[n]);}}, removeClip: function removeClip(t) {var e = u(this._clips, t);
      e >= 0 && this._clips.splice(e, 1);}, removeAnimator: function removeAnimator(t) {for (var e = t.getClips(), n = 0; n < e.length; n++) {this.removeClip(e[n]);}t.animation = null;}, _update: function _update() {for (var t = new Date().getTime() - this._pausedTime, e = t - this._time, n = this._clips, i = n.length, r = [], o = [], a = 0; i > a; a++) {var s = n[a],l = s.step(t, e);l && (r.push(l), o.push(s));}for (var a = 0; i > a;) {n[a]._needsRemove ? (n[a] = n[i - 1], n.pop(), i--) : a++;}i = r.length;for (var a = 0; i > a; a++) {o[a].fire(r[a]);}this._time = t, this.onframe(e), this.trigger("frame", e), this.stage.update && this.stage.update();}, _startLoop: function _startLoop() {function t() {e._running && (yg(t), !e._paused && e._update());}var e = this;this._running = !0, yg(t);}, start: function start() {this._time = new Date().getTime(), this._pausedTime = 0, this._startLoop();}, stop: function stop() {this._running = !1;}, pause: function pause() {this._paused || (this._pauseStart = new Date().getTime(), this._paused = !0);}, resume: function resume() {this._paused && (this._pausedTime += new Date().getTime() - this._pauseStart, this._paused = !1);}, clear: function clear() {this._clips = [];}, isFinished: function isFinished() {return !this._clips.length;}, animate: function animate(t, e) {e = e || {};var n = new Up(t, e.loop, e.getter, e.setter);return this.addAnimator(n), n;} }, c(Vg, cp);var Gg = 300,Wg = Wf.domSupported,Xg = function () {var t = ["click", "dblclick", "mousewheel", "mouseout", "mouseup", "mousedown", "mousemove", "contextmenu"],e = ["touchstart", "touchend", "touchmove"],n = { pointerdown: 1, pointerup: 1, pointermove: 1, pointerout: 1 },i = p(t, function (t) {var e = t.replace("mouse", "pointer");return n.hasOwnProperty(e) ? e : t;});return { mouse: t, touch: e, pointer: i };}(),Yg = { mouse: ["mousemove", "mouseup"], pointer: ["pointermove", "pointerup"] },Ug = Hi.prototype;Ug.stopPropagation = Ug.stopImmediatePropagation = Ug.preventDefault = H;var jg = { mousedown: function mousedown(t) {t = be(this.dom, t), this._mayPointerCapture = [t.zrX, t.zrY], this.trigger("mousedown", t);}, mousemove: function mousemove(t) {t = be(this.dom, t);var e = this._mayPointerCapture;!e || t.zrX === e[0] && t.zrY === e[1] || Yi(this, !0), this.trigger("mousemove", t);}, mouseup: function mouseup(t) {t = be(this.dom, t), Yi(this, !1), this.trigger("mouseup", t);}, mouseout: function mouseout(t) {t = be(this.dom, t), this._pointerCapturing && (t.zrEventControl = "no_globalout");var e = t.toElement || t.relatedTarget;t.zrIsToLocalDOM = Fi(this, e), this.trigger("mouseout", t);}, touchstart: function touchstart(t) {t = be(this.dom, t), Ri(t), this._lastTouchMoment = new Date(), this.handler.processGesture(t, "start"), jg.mousemove.call(this, t), jg.mousedown.call(this, t);}, touchmove: function touchmove(t) {t = be(this.dom, t), Ri(t), this.handler.processGesture(t, "change"), jg.mousemove.call(this, t);}, touchend: function touchend(t) {t = be(this.dom, t), Ri(t), this.handler.processGesture(t, "end"), jg.mouseup.call(this, t), +new Date() - this._lastTouchMoment < Gg && jg.click.call(this, t);}, pointerdown: function pointerdown(t) {jg.mousedown.call(this, t);}, pointermove: function pointermove(t) {zi(t) || jg.mousemove.call(this, t);}, pointerup: function pointerup(t) {jg.mouseup.call(this, t);}, pointerout: function pointerout(t) {zi(t) || jg.mouseout.call(this, t);} };f(["click", "mousewheel", "dblclick", "contextmenu"], function (t) {jg[t] = function (e) {e = be(this.dom, e), this.trigger(t, e);};});var qg = { pointermove: function pointermove(t) {zi(t) || qg.mousemove.call(this, t);}, pointerup: function pointerup(t) {qg.mouseup.call(this, t);}, mousemove: function mousemove(t) {this.trigger("mousemove", t);}, mouseup: function mouseup(t) {var e = this._pointerCapturing;Yi(this, !1), this.trigger("mouseup", t), e && (t.zrEventControl = "only_globalout", this.trigger("mouseout", t));} },Zg = ji.prototype;Zg.dispose = function () {Xi(this._localHandlerScope), Wg && Xi(this._globalHandlerScope);}, Zg.setCursor = function (t) {this.dom.style && (this.dom.style.cursor = t || "default");}, c(ji, cp);var Kg = !Wf.canvasSupported,$g = { canvas: Hg },Qg = {},Jg = "4.3.2",tv = function tv(t, e, n) {n = n || {}, this.dom = e, this.id = t;var i = this,r = new ag(),o = n.renderer;if (Kg) {if (!$g.vml) throw new Error("You need to require 'zrender/vml/vml' to support IE8");o = "vml";} else o && $g[o] || (o = "canvas");var a = new $g[o](e, r, n, t);this.storage = r, this.painter = a;var s = Wf.node || Wf.worker ? null : new ji(a.getViewportRoot(), a.root);this.handler = new Sp(r, a, s, a.root), this.animation = new Vg({ stage: { update: y(this.flush, this) } }), this.animation.start(), this._needsRefresh;var l = r.delFromStorage,u = r.addToStorage;r.delFromStorage = function (t) {l.call(r, t), t && t.removeSelfFromZr(i);}, r.addToStorage = function (t) {u.call(r, t), t.addSelfToZr(i);};};tv.prototype = { constructor: tv, getId: function getId() {return this.id;}, add: function add(t) {this.storage.addRoot(t), this._needsRefresh = !0;}, remove: function remove(t) {this.storage.delRoot(t), this._needsRefresh = !0;}, configLayer: function configLayer(t, e) {this.painter.configLayer && this.painter.configLayer(t, e), this._needsRefresh = !0;}, setBackgroundColor: function setBackgroundColor(t) {this.painter.setBackgroundColor && this.painter.setBackgroundColor(t), this._needsRefresh = !0;}, refreshImmediately: function refreshImmediately() {this._needsRefresh = this._needsRefreshHover = !1, this.painter.refresh(), this._needsRefresh = this._needsRefreshHover = !1;}, refresh: function refresh() {this._needsRefresh = !0;}, flush: function flush() {var t;this._needsRefresh && (t = !0, this.refreshImmediately()), this._needsRefreshHover && (t = !0, this.refreshHoverImmediately()), t && this.trigger("rendered");}, addHover: function addHover(t, e) {if (this.painter.addHover) {var n = this.painter.addHover(t, e);return this.refreshHover(), n;}}, removeHover: function removeHover(t) {this.painter.removeHover && (this.painter.removeHover(t), this.refreshHover());}, clearHover: function clearHover() {this.painter.clearHover && (this.painter.clearHover(), this.refreshHover());}, refreshHover: function refreshHover() {this._needsRefreshHover = !0;}, refreshHoverImmediately: function refreshHoverImmediately() {this._needsRefreshHover = !1, this.painter.refreshHover && this.painter.refreshHover();}, resize: function resize(t) {t = t || {}, this.painter.resize(t.width, t.height), this.handler.resize();}, clearAnimation: function clearAnimation() {this.animation.clear();}, getWidth: function getWidth() {return this.painter.getWidth();}, getHeight: function getHeight() {return this.painter.getHeight();}, pathToImage: function pathToImage(t, e) {return this.painter.pathToImage(t, e);}, setCursorStyle: function setCursorStyle(t) {this.handler.setCursorStyle(t);}, findHover: function findHover(t, e) {return this.handler.findHover(t, e);}, on: function on(t, e, n) {this.handler.on(t, e, n);}, off: function off(t, e) {this.handler.off(t, e);}, trigger: function trigger(t, e) {this.handler.trigger(t, e);}, clear: function clear() {this.storage.delRoot(), this.painter.clear();}, dispose: function dispose() {this.animation.stop(), this.clear(), this.storage.dispose(), this.painter.dispose(), this.handler.dispose(), this.animation = this.storage = this.painter = this.handler = null, Qi(this.id);} };var ev = (Object.freeze || Object)({ version: Jg, init: qi, dispose: Zi, getInstance: Ki, registerPainter: $i }),nv = f,iv = S,rv = x,ov = "series\x00",av = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "rich", "tag", "color", "textBorderColor", "textBorderWidth", "width", "height", "lineHeight", "align", "verticalAlign", "baseline", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY", "backgroundColor", "borderColor", "borderWidth", "borderRadius", "padding"],sv = 0,lv = ".",uv = "___EC__COMPONENT__CONTAINER___",hv = 0,cv = function cv(t) {for (var e = 0; e < t.length; e++) {t[e][1] || (t[e][1] = t[e][0]);}return function (e, n, i) {for (var r = {}, o = 0; o < t.length; o++) {var a = t[o][1];if (!(n && u(n, a) >= 0 || i && u(i, a) < 0)) {var s = e.getShallow(a);null != s && (r[t[o][0]] = s);}}return r;};},dv = cv([["lineWidth", "width"], ["stroke", "color"], ["opacity"], ["shadowBlur"], ["shadowOffsetX"], ["shadowOffsetY"], ["shadowColor"]]),fv = { getLineStyle: function getLineStyle(t) {var e = dv(this, t);return e.lineDash = this.getLineDash(e.lineWidth), e;}, getLineDash: function getLineDash(t) {null == t && (t = 1);var e = this.get("type"),n = Math.max(t, 2),i = 4 * t;return "solid" === e || null == e ? !1 : "dashed" === e ? [i, i] : [n, n];} },pv = cv([["fill", "color"], ["shadowBlur"], ["shadowOffsetX"], ["shadowOffsetY"], ["opacity"], ["shadowColor"]]),gv = { getAreaStyle: function getAreaStyle(t, e) {return pv(this, t, e);} },vv = Math.pow,mv = Math.sqrt,yv = 1e-8,_v = 1e-4,xv = mv(3),wv = 1 / 3,bv = V(),Sv = V(),Mv = V(),Cv = Math.min,Iv = Math.max,Tv = Math.sin,kv = Math.cos,Dv = 2 * Math.PI,Av = V(),Pv = V(),Ov = V(),Lv = [],Bv = [],zv = { M: 1, L: 2, C: 3, Q: 4, A: 5, Z: 6, R: 7 },Ev = [],Rv = [],Nv = [],Fv = [],Hv = Math.min,Vv = Math.max,Gv = Math.cos,Wv = Math.sin,Xv = Math.sqrt,Yv = Math.abs,Uv = "undefined" != typeof Float32Array,jv = function jv(t) {this._saveData = !t, this._saveData && (this.data = []), this._ctx = null;};jv.prototype = { constructor: jv, _xi: 0, _yi: 0, _x0: 0, _y0: 0, _ux: 0, _uy: 0, _len: 0, _lineDash: null, _dashOffset: 0, _dashIdx: 0, _dashSum: 0, setScale: function setScale(t, e, n) {n = n || 0, this._ux = Yv(n / Zp / t) || 0, this._uy = Yv(n / Zp / e) || 0;}, getContext: function getContext() {return this._ctx;}, beginPath: function beginPath(t) {return this._ctx = t, t && t.beginPath(), t && (this.dpr = t.dpr), this._saveData && (this._len = 0), this._lineDash && (this._lineDash = null, this._dashOffset = 0), this;}, moveTo: function moveTo(t, e) {return this.addData(zv.M, t, e), this._ctx && this._ctx.moveTo(t, e), this._x0 = t, this._y0 = e, this._xi = t, this._yi = e, this;}, lineTo: function lineTo(t, e) {var n = Yv(t - this._xi) > this._ux || Yv(e - this._yi) > this._uy || this._len < 5;return this.addData(zv.L, t, e), this._ctx && n && (this._needsDash() ? this._dashedLineTo(t, e) : this._ctx.lineTo(t, e)), n && (this._xi = t, this._yi = e), this;}, bezierCurveTo: function bezierCurveTo(t, e, n, i, r, o) {return this.addData(zv.C, t, e, n, i, r, o), this._ctx && (this._needsDash() ? this._dashedBezierTo(t, e, n, i, r, o) : this._ctx.bezierCurveTo(t, e, n, i, r, o)), this._xi = r, this._yi = o, this;}, quadraticCurveTo: function quadraticCurveTo(t, e, n, i) {return this.addData(zv.Q, t, e, n, i), this._ctx && (this._needsDash() ? this._dashedQuadraticTo(t, e, n, i) : this._ctx.quadraticCurveTo(t, e, n, i)), this._xi = n, this._yi = i, this;}, arc: function arc(t, e, n, i, r, o) {return this.addData(zv.A, t, e, n, n, i, r - i, 0, o ? 0 : 1), this._ctx && this._ctx.arc(t, e, n, i, r, o), this._xi = Gv(r) * n + t, this._yi = Wv(r) * n + e, this;}, arcTo: function arcTo(t, e, n, i, r) {return this._ctx && this._ctx.arcTo(t, e, n, i, r), this;}, rect: function rect(t, e, n, i) {return this._ctx && this._ctx.rect(t, e, n, i), this.addData(zv.R, t, e, n, i), this;}, closePath: function closePath() {this.addData(zv.Z);var t = this._ctx,e = this._x0,n = this._y0;return t && (this._needsDash() && this._dashedLineTo(e, n), t.closePath()), this._xi = e, this._yi = n, this;}, fill: function fill(t) {t && t.fill(), this.toStatic();}, stroke: function stroke(t) {t && t.stroke(), this.toStatic();}, setLineDash: function setLineDash(t) {if (t instanceof Array) {this._lineDash = t, this._dashIdx = 0;for (var e = 0, n = 0; n < t.length; n++) {e += t[n];}this._dashSum = e;}return this;}, setLineDashOffset: function setLineDashOffset(t) {return this._dashOffset = t, this;}, len: function len() {return this._len;}, setData: function setData(t) {var e = t.length;this.data && this.data.length === e || !Uv || (this.data = new Float32Array(e));for (var n = 0; e > n; n++) {this.data[n] = t[n];}this._len = e;}, appendPath: function appendPath(t) {t instanceof Array || (t = [t]);for (var e = t.length, n = 0, i = this._len, r = 0; e > r; r++) {n += t[r].len();}Uv && this.data instanceof Float32Array && (this.data = new Float32Array(i + n));for (var r = 0; e > r; r++) {for (var o = t[r].data, a = 0; a < o.length; a++) {this.data[i++] = o[a];}}this._len = i;}, addData: function addData(t) {if (this._saveData) {var e = this.data;this._len + arguments.length > e.length && (this._expandData(), e = this.data);for (var n = 0; n < arguments.length; n++) {e[this._len++] = arguments[n];}this._prevCmd = t;}}, _expandData: function _expandData() {if (!(this.data instanceof Array)) {for (var t = [], e = 0; e < this._len; e++) {t[e] = this.data[e];}this.data = t;}}, _needsDash: function _needsDash() {return this._lineDash;}, _dashedLineTo: function _dashedLineTo(t, e) {var n,i,r = this._dashSum,o = this._dashOffset,a = this._lineDash,s = this._ctx,l = this._xi,u = this._yi,h = t - l,c = e - u,d = Xv(h * h + c * c),f = l,p = u,g = a.length;for (h /= d, c /= d, 0 > o && (o = r + o), o %= r, f -= o * h, p -= o * c; h > 0 && t >= f || 0 > h && f >= t || 0 === h && (c > 0 && e >= p || 0 > c && p >= e);) {i = this._dashIdx, n = a[i], f += h * n, p += c * n, this._dashIdx = (i + 1) % g, h > 0 && l > f || 0 > h && f > l || c > 0 && u > p || 0 > c && p > u || s[i % 2 ? "moveTo" : "lineTo"](h >= 0 ? Hv(f, t) : Vv(f, t), c >= 0 ? Hv(p, e) : Vv(p, e));}h = f - t, c = p - e, this._dashOffset = -Xv(h * h + c * c);}, _dashedBezierTo: function _dashedBezierTo(t, e, n, i, r, o) {var a,s,l,u,h,c = this._dashSum,d = this._dashOffset,f = this._lineDash,p = this._ctx,g = this._xi,v = this._yi,m = Sr,y = 0,_ = this._dashIdx,x = f.length,w = 0;for (0 > d && (d = c + d), d %= c, a = 0; 1 > a; a += .1) {s = m(g, t, n, r, a + .1) - m(g, t, n, r, a), l = m(v, e, i, o, a + .1) - m(v, e, i, o, a), y += Xv(s * s + l * l);}for (; x > _ && (w += f[_], !(w > d)); _++) {;}for (a = (w - d) / y; 1 >= a;) {u = m(g, t, n, r, a), h = m(v, e, i, o, a), _ % 2 ? p.moveTo(u, h) : p.lineTo(u, h), a += f[_] / y, _ = (_ + 1) % x;}_ % 2 !== 0 && p.lineTo(r, o), s = r - u, l = o - h, this._dashOffset = -Xv(s * s + l * l);}, _dashedQuadraticTo: function _dashedQuadraticTo(t, e, n, i) {var r = n,o = i;n = (n + 2 * t) / 3, i = (i + 2 * e) / 3, t = (this._xi + 2 * t) / 3, e = (this._yi + 2 * e) / 3, this._dashedBezierTo(t, e, n, i, r, o);}, toStatic: function toStatic() {var t = this.data;t instanceof Array && (t.length = this._len, Uv && (this.data = new Float32Array(t)));}, getBoundingRect: function getBoundingRect() {Ev[0] = Ev[1] = Nv[0] = Nv[1] = Number.MAX_VALUE, Rv[0] = Rv[1] = Fv[0] = Fv[1] = -Number.MAX_VALUE;for (var t = this.data, e = 0, n = 0, i = 0, r = 0, o = 0; o < t.length;) {var a = t[o++];switch (1 === o && (e = t[o], n = t[o + 1], i = e, r = n), a) {case zv.M:i = t[o++], r = t[o++], e = i, n = r, Nv[0] = i, Nv[1] = r, Fv[0] = i, Fv[1] = r;break;case zv.L:Er(e, n, t[o], t[o + 1], Nv, Fv), e = t[o++], n = t[o++];break;case zv.C:Rr(e, n, t[o++], t[o++], t[o++], t[o++], t[o], t[o + 1], Nv, Fv), e = t[o++], n = t[o++];break;case zv.Q:Nr(e, n, t[o++], t[o++], t[o], t[o + 1], Nv, Fv), e = t[o++], n = t[o++];break;case zv.A:var s = t[o++],l = t[o++],u = t[o++],h = t[o++],c = t[o++],d = t[o++] + c;o += 1;var f = 1 - t[o++];1 === o && (i = Gv(c) * u + s, r = Wv(c) * h + l), Fr(s, l, u, h, c, d, f, Nv, Fv), e = Gv(d) * u + s, n = Wv(d) * h + l;break;case zv.R:i = e = t[o++], r = n = t[o++];var p = t[o++],g = t[o++];Er(i, r, i + p, r + g, Nv, Fv);break;case zv.Z:e = i, n = r;}ae(Ev, Ev, Nv), se(Rv, Rv, Fv);}return 0 === o && (Ev[0] = Ev[1] = Rv[0] = Rv[1] = 0), new In(Ev[0], Ev[1], Rv[0] - Ev[0], Rv[1] - Ev[1]);}, rebuildPath: function rebuildPath(t) {for (var e, n, i, r, o, a, s = this.data, l = this._ux, u = this._uy, h = this._len, c = 0; h > c;) {var d = s[c++];switch (1 === c && (i = s[c], r = s[c + 1], e = i, n = r), d) {case zv.M:e = i = s[c++], n = r = s[c++], t.moveTo(i, r);break;case zv.L:o = s[c++], a = s[c++], (Yv(o - i) > l || Yv(a - r) > u || c === h - 1) && (t.lineTo(o, a), i = o, r = a);break;case zv.C:t.bezierCurveTo(s[c++], s[c++], s[c++], s[c++], s[c++], s[c++]), i = s[c - 2], r = s[c - 1];break;case zv.Q:t.quadraticCurveTo(s[c++], s[c++], s[c++], s[c++]), i = s[c - 2], r = s[c - 1];break;case zv.A:var f = s[c++],p = s[c++],g = s[c++],v = s[c++],m = s[c++],y = s[c++],_ = s[c++],x = s[c++],w = g > v ? g : v,b = g > v ? 1 : g / v,S = g > v ? v / g : 1,M = Math.abs(g - v) > .001,C = m + y;M ? (t.translate(f, p), t.rotate(_), t.scale(b, S), t.arc(0, 0, w, m, C, 1 - x), t.scale(1 / b, 1 / S), t.rotate(-_), t.translate(-f, -p)) : t.arc(f, p, w, m, C, 1 - x), 1 === c && (e = Gv(m) * g + f, n = Wv(m) * v + p), i = Gv(C) * g + f, r = Wv(C) * v + p;break;case zv.R:e = i = s[c], n = r = s[c + 1], t.rect(s[c++], s[c++], s[c++], s[c++]);break;case zv.Z:t.closePath(), i = e, r = n;}}} }, jv.CMD = zv;var qv = 2 * Math.PI,Zv = 2 * Math.PI,Kv = jv.CMD,$v = 2 * Math.PI,Qv = 1e-4,Jv = [-1, -1, -1],tm = [-1, -1],em = vg.prototype.getCanvasPattern,nm = Math.abs,im = new jv(!0);to.prototype = { constructor: to, type: "path", __dirtyPath: !0, strokeContainThreshold: 5, segmentIgnoreThreshold: 0, subPixelOptimize: !1, brush: function brush(t, e) {var n = this.style,i = this.path || im,r = n.hasStroke(),o = n.hasFill(),a = n.fill,s = n.stroke,l = o && !!a.colorStops,u = r && !!s.colorStops,h = o && !!a.image,c = r && !!s.image;if (n.bind(t, this, e), this.setTransform(t), this.__dirty) {var d;l && (d = d || this.getBoundingRect(), this._fillGradient = n.getGradient(t, a, d)), u && (d = d || this.getBoundingRect(), this._strokeGradient = n.getGradient(t, s, d));}l ? t.fillStyle = this._fillGradient : h && (t.fillStyle = em.call(a, t)), u ? t.strokeStyle = this._strokeGradient : c && (t.strokeStyle = em.call(s, t));var f = n.lineDash,p = n.lineDashOffset,g = !!t.setLineDash,v = this.getGlobalScale();if (i.setScale(v[0], v[1], this.segmentIgnoreThreshold), this.__dirtyPath || f && !g && r ? (i.beginPath(t), f && !g && (i.setLineDash(f), i.setLineDashOffset(p)), this.buildPath(i, this.shape, !1), this.path && (this.__dirtyPath = !1)) : (t.beginPath(), this.path.rebuildPath(t)), o) if (null != n.fillOpacity) {var m = t.globalAlpha;t.globalAlpha = n.fillOpacity * n.opacity, i.fill(t), t.globalAlpha = m;} else i.fill(t);if (f && g && (t.setLineDash(f), t.lineDashOffset = p), r) if (null != n.strokeOpacity) {var m = t.globalAlpha;t.globalAlpha = n.strokeOpacity * n.opacity, i.stroke(t), t.globalAlpha = m;} else i.stroke(t);f && g && t.setLineDash([]), null != n.text && (this.restoreTransform(t), this.drawRectText(t, this.getBoundingRect()));}, buildPath: function buildPath() {}, createPathProxy: function createPathProxy() {this.path = new jv();}, getBoundingRect: function getBoundingRect() {var t = this._rect,e = this.style,n = !t;if (n) {var i = this.path;i || (i = this.path = new jv()), this.__dirtyPath && (i.beginPath(), this.buildPath(i, this.shape, !1)), t = i.getBoundingRect();}if (this._rect = t, e.hasStroke()) {var r = this._rectWithStroke || (this._rectWithStroke = t.clone());if (this.__dirty || n) {r.copy(t);var o = e.lineWidth,a = e.strokeNoScale ? this.getLineScale() : 1;e.hasFill() || (o = Math.max(o, this.strokeContainThreshold || 4)), a > 1e-10 && (r.width += o / a, r.height += o / a, r.x -= o / a / 2, r.y -= o / a / 2);}return r;}return t;}, contain: function contain(t, e) {var n = this.transformCoordToLocal(t, e),i = this.getBoundingRect(),r = this.style;if (t = n[0], e = n[1], i.contain(t, e)) {var o = this.path.data;if (r.hasStroke()) {var a = r.lineWidth,s = r.strokeNoScale ? this.getLineScale() : 1;if (s > 1e-10 && (r.hasFill() || (a = Math.max(a, this.strokeContainThreshold)), Jr(o, a / s, t, e))) return !0;}if (r.hasFill()) return Qr(o, t, e);}return !1;}, dirty: function dirty(t) {null == t && (t = !0), t && (this.__dirtyPath = t, this._rect = null), this.__dirty = this.__dirtyText = !0, this.__zr && this.__zr.refresh(), this.__clipTarget && this.__clipTarget.dirty();}, animateShape: function animateShape(t) {return this.animate("shape", t);}, attrKV: function attrKV(t, e) {"shape" === t ? (this.setShape(e), this.__dirtyPath = !0, this._rect = null) : Ii.prototype.attrKV.call(this, t, e);}, setShape: function setShape(t, e) {var n = this.shape;if (n) {if (S(t)) for (var i in t) {t.hasOwnProperty(i) && (n[i] = t[i]);} else n[t] = e;this.dirty(!0);}return this;}, getLineScale: function getLineScale() {var t = this.transform;return t && nm(t[0] - 1) > 1e-10 && nm(t[3] - 1) > 1e-10 ? Math.sqrt(nm(t[0] * t[3] - t[2] * t[1])) : 1;} }, to.extend = function (t) {var e = function e(_e2) {to.call(this, _e2), t.style && this.style.extendFrom(t.style, !1);var n = t.shape;if (n) {this.shape = this.shape || {};var i = this.shape;for (var r in n) {!i.hasOwnProperty(r) && n.hasOwnProperty(r) && (i[r] = n[r]);}}t.init && t.init.call(this, _e2);};h(e, to);for (var n in t) {"style" !== n && "shape" !== n && (e.prototype[n] = t[n]);}return e;}, h(to, Ii);var rm = jv.CMD,om = [[], [], []],am = Math.sqrt,sm = Math.atan2,lm = function lm(t, e) {var n,i,r,o,a,s,l = t.data,u = rm.M,h = rm.C,c = rm.L,d = rm.R,f = rm.A,p = rm.Q;for (r = 0, o = 0; r < l.length;) {switch (n = l[r++], o = r, i = 0, n) {case u:i = 1;break;case c:i = 1;break;case h:i = 3;break;case p:i = 2;break;case f:var g = e[4],v = e[5],m = am(e[0] * e[0] + e[1] * e[1]),y = am(e[2] * e[2] + e[3] * e[3]),_ = sm(-e[1] / y, e[0] / m);l[r] *= m, l[r++] += g, l[r] *= y, l[r++] += v, l[r++] *= m, l[r++] *= y, l[r++] += _, l[r++] += _, r += 2, o = r;break;case d:s[0] = l[r++], s[1] = l[r++], oe(s, s, e), l[o++] = s[0], l[o++] = s[1], s[0] += l[r++], s[1] += l[r++], oe(s, s, e), l[o++] = s[0], l[o++] = s[1];}for (a = 0; i > a; a++) {var s = om[a];s[0] = l[r++], s[1] = l[r++], oe(s, s, e), l[o++] = s[0], l[o++] = s[1];}}},um = Math.sqrt,hm = Math.sin,cm = Math.cos,dm = Math.PI,fm = function fm(t) {return Math.sqrt(t[0] * t[0] + t[1] * t[1]);},pm = function pm(t, e) {return (t[0] * e[0] + t[1] * e[1]) / (fm(t) * fm(e));},gm = function gm(t, e) {return (t[0] * e[1] < t[1] * e[0] ? -1 : 1) * Math.acos(pm(t, e));},vm = /([mlvhzcqtsa])([^mlvhzcqtsa]*)/gi,mm = /-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g,ym = function ym(t) {Ii.call(this, t);};ym.prototype = { constructor: ym, type: "text", brush: function brush(t, e) {var n = this.style;this.__dirty && li(n, !0), n.fill = n.stroke = n.shadowBlur = n.shadowColor = n.shadowOffsetX = n.shadowOffsetY = null;var i = n.text;return null != i && (i += ""), Ci(i, n) ? (this.setTransform(t), hi(this, t, i, n, null, e), void this.restoreTransform(t)) : void (t.__attrCachedBy = ug.NONE);}, getBoundingRect: function getBoundingRect() {var t = this.style;if (this.__dirty && li(t, !0), !this._rect) {var e = t.text;null != e ? e += "" : e = "";var n = Yn(t.text + "", t.font, t.textAlign, t.textVerticalAlign, t.textPadding, t.textLineHeight, t.rich);if (n.x += t.x || 0, n.y += t.y || 0, wi(t.textStroke, t.textStrokeWidth)) {var i = t.textStrokeWidth;n.x -= i / 2, n.y -= i / 2, n.width += i, n.height += i;}this._rect = n;}return this._rect;} }, h(ym, Ii);var _m = to.extend({ type: "circle", shape: { cx: 0, cy: 0, r: 0 }, buildPath: function buildPath(t, e, n) {n && t.moveTo(e.cx + e.r, e.cy), t.arc(e.cx, e.cy, e.r, 0, 2 * Math.PI, !0);} }),xm = [["shadowBlur", 0], ["shadowColor", "#000"], ["shadowOffsetX", 0], ["shadowOffsetY", 0]],wm = function wm(t) {return Wf.browser.ie && Wf.browser.version >= 11 ? function () {var e,n = this.__clipPaths,i = this.style;if (n) for (var r = 0; r < n.length; r++) {var o = n[r],a = o && o.shape,s = o && o.type;if (a && ("sector" === s && a.startAngle === a.endAngle || "rect" === s && (!a.width || !a.height))) {for (var l = 0; l < xm.length; l++) {xm[l][2] = i[xm[l][0]], i[xm[l][0]] = xm[l][1];}e = !0;break;}}if (t.apply(this, arguments), e) for (var l = 0; l < xm.length; l++) {i[xm[l][0]] = xm[l][2];}} : t;},bm = to.extend({ type: "sector", shape: { cx: 0, cy: 0, r0: 0, r: 0, startAngle: 0, endAngle: 2 * Math.PI, clockwise: !0 }, brush: wm(to.prototype.brush), buildPath: function buildPath(t, e) {var n = e.cx,i = e.cy,r = Math.max(e.r0 || 0, 0),o = Math.max(e.r, 0),a = e.startAngle,s = e.endAngle,l = e.clockwise,u = Math.cos(a),h = Math.sin(a);t.moveTo(u * r + n, h * r + i), t.lineTo(u * o + n, h * o + i), t.arc(n, i, o, a, s, !l), t.lineTo(Math.cos(s) * r + n, Math.sin(s) * r + i), 0 !== r && t.arc(n, i, r, s, a, l), t.closePath();} }),Sm = to.extend({ type: "ring", shape: { cx: 0, cy: 0, r: 0, r0: 0 }, buildPath: function buildPath(t, e) {var n = e.cx,i = e.cy,r = 2 * Math.PI;t.moveTo(n + e.r, i), t.arc(n, i, e.r, 0, r, !1), t.moveTo(n + e.r0, i), t.arc(n, i, e.r0, 0, r, !0);} }),Mm = function Mm(t, e) {for (var n = t.length, i = [], r = 0, o = 1; n > o; o++) {r += ee(t[o - 1], t[o]);}var a = r / 2;a = n > a ? n : a;for (var o = 0; a > o; o++) {var s,l,u,h = o / (a - 1) * (e ? n : n - 1),c = Math.floor(h),d = h - c,f = t[c % n];e ? (s = t[(c - 1 + n) % n], l = t[(c + 1) % n], u = t[(c + 2) % n]) : (s = t[0 === c ? c : c - 1], l = t[c > n - 2 ? n - 1 : c + 1], u = t[c > n - 3 ? n - 1 : c + 2]);var p = d * d,g = d * p;i.push([so(s[0], f[0], l[0], u[0], d, p, g), so(s[1], f[1], l[1], u[1], d, p, g)]);}return i;},Cm = function Cm(t, e, n, i) {var r,o,a,s,l = [],u = [],h = [],c = [];if (i) {a = [1 / 0, 1 / 0], s = [-1 / 0, -1 / 0];for (var d = 0, f = t.length; f > d; d++) {ae(a, a, t[d]), se(s, s, t[d]);}ae(a, a, i[0]), se(s, s, i[1]);}for (var d = 0, f = t.length; f > d; d++) {var p = t[d];if (n) r = t[d ? d - 1 : f - 1], o = t[(d + 1) % f];else {if (0 === d || d === f - 1) {l.push(W(t[d]));continue;}r = t[d - 1], o = t[d + 1];}j(u, o, r), J(u, u, e);var g = ee(p, r),v = ee(p, o),m = g + v;0 !== m && (g /= m, v /= m), J(h, u, -g), J(c, u, v);var y = Y([], p, h),_ = Y([], p, c);i && (se(y, y, a), ae(y, y, s), se(_, _, a), ae(_, _, s)), l.push(y), l.push(_);}return n && l.push(l.shift()), l;},Im = to.extend({ type: "polygon", shape: { points: null, smooth: !1, smoothConstraint: null }, buildPath: function buildPath(t, e) {lo(t, e, !0);} }),Tm = to.extend({ type: "polyline", shape: { points: null, smooth: !1, smoothConstraint: null }, style: { stroke: "#000", fill: null }, buildPath: function buildPath(t, e) {lo(t, e, !1);} }),km = Math.round,Dm = {},Am = to.extend({ type: "rect", shape: { r: 0, x: 0, y: 0, width: 0, height: 0 }, buildPath: function buildPath(t, e) {var n, i, r, o;this.subPixelOptimize ? (ho(Dm, e, this.style), n = Dm.x, i = Dm.y, r = Dm.width, o = Dm.height, Dm.r = e.r, e = Dm) : (n = e.x, i = e.y, r = e.width, o = e.height), e.r ? si(t, e) : t.rect(n, i, r, o), t.closePath();} }),Pm = {},Om = to.extend({ type: "line", shape: { x1: 0, y1: 0, x2: 0, y2: 0, percent: 1 }, style: { stroke: "#000", fill: null }, buildPath: function buildPath(t, e) {var n, i, r, o;this.subPixelOptimize ? (uo(Pm, e, this.style), n = Pm.x1, i = Pm.y1, r = Pm.x2, o = Pm.y2) : (n = e.x1, i = e.y1, r = e.x2, o = e.y2);var a = e.percent;0 !== a && (t.moveTo(n, i), 1 > a && (r = n * (1 - a) + r * a, o = i * (1 - a) + o * a), t.lineTo(r, o));}, pointAt: function pointAt(t) {var e = this.shape;return [e.x1 * (1 - t) + e.x2 * t, e.y1 * (1 - t) + e.y2 * t];} }),Lm = [],Bm = to.extend({ type: "bezier-curve", shape: { x1: 0, y1: 0, x2: 0, y2: 0, cpx1: 0, cpy1: 0, percent: 1 }, style: { stroke: "#000", fill: null }, buildPath: function buildPath(t, e) {var n = e.x1,i = e.y1,r = e.x2,o = e.y2,a = e.cpx1,s = e.cpy1,l = e.cpx2,u = e.cpy2,h = e.percent;0 !== h && (t.moveTo(n, i), null == l || null == u ? (1 > h && (Lr(n, a, r, h, Lm), a = Lm[1], r = Lm[2], Lr(i, s, o, h, Lm), s = Lm[1], o = Lm[2]), t.quadraticCurveTo(a, s, r, o)) : (1 > h && (Tr(n, a, l, r, h, Lm), a = Lm[1], l = Lm[2], r = Lm[3], Tr(i, s, u, o, h, Lm), s = Lm[1], u = Lm[2], o = Lm[3]), t.bezierCurveTo(a, s, l, u, r, o)));}, pointAt: function pointAt(t) {return fo(this.shape, t, !1);}, tangentAt: function tangentAt(t) {var e = fo(this.shape, t, !0);return te(e, e);} }),zm = to.extend({ type: "arc", shape: { cx: 0, cy: 0, r: 0, startAngle: 0, endAngle: 2 * Math.PI, clockwise: !0 }, style: { stroke: "#000", fill: null }, buildPath: function buildPath(t, e) {var n = e.cx,i = e.cy,r = Math.max(e.r, 0),o = e.startAngle,a = e.endAngle,s = e.clockwise,l = Math.cos(o),u = Math.sin(o);t.moveTo(l * r + n, u * r + i), t.arc(n, i, r, o, a, !s);} }),Em = to.extend({ type: "compound", shape: { paths: null }, _updatePathDirty: function _updatePathDirty() {for (var t = this.__dirtyPath, e = this.shape.paths, n = 0; n < e.length; n++) {t = t || e[n].__dirtyPath;}this.__dirtyPath = t, this.__dirty = this.__dirty || t;}, beforeBrush: function beforeBrush() {this._updatePathDirty();for (var t = this.shape.paths || [], e = this.getGlobalScale(), n = 0; n < t.length; n++) {t[n].path || t[n].createPathProxy(), t[n].path.setScale(e[0], e[1], t[n].segmentIgnoreThreshold);}}, buildPath: function buildPath(t, e) {for (var n = e.paths || [], i = 0; i < n.length; i++) {n[i].buildPath(t, n[i].shape, !0);}}, afterBrush: function afterBrush() {for (var t = this.shape.paths || [], e = 0; e < t.length; e++) {t[e].__dirtyPath = !1;}}, getBoundingRect: function getBoundingRect() {return this._updatePathDirty(), to.prototype.getBoundingRect.call(this);} }),Rm = function Rm(t) {this.colorStops = t || [];};Rm.prototype = { constructor: Rm, addColorStop: function addColorStop(t, e) {this.colorStops.push({ offset: t, color: e });} };var Nm = function Nm(t, e, n, i, r, o) {this.x = null == t ? 0 : t, this.y = null == e ? 0 : e, this.x2 = null == n ? 1 : n, this.y2 = null == i ? 0 : i, this.type = "linear", this.global = o || !1, Rm.call(this, r);};Nm.prototype = { constructor: Nm }, h(Nm, Rm);var Fm = function Fm(t, e, n, i, r) {this.x = null == t ? .5 : t, this.y = null == e ? .5 : e, this.r = null == n ? .5 : n, this.type = "radial", this.global = r || !1, Rm.call(this, i);};Fm.prototype = { constructor: Fm }, h(Fm, Rm), po.prototype.incremental = !0, po.prototype.clearDisplaybles = function () {this._displayables = [], this._temporaryDisplayables = [], this._cursor = 0, this.dirty(), this.notClear = !1;}, po.prototype.addDisplayable = function (t, e) {e ? this._temporaryDisplayables.push(t) : this._displayables.push(t), this.dirty();}, po.prototype.addDisplayables = function (t, e) {e = e || !1;for (var n = 0; n < t.length; n++) {this.addDisplayable(t[n], e);}}, po.prototype.eachPendingDisplayable = function (t) {for (var e = this._cursor; e < this._displayables.length; e++) {t && t(this._displayables[e]);}for (var e = 0; e < this._temporaryDisplayables.length; e++) {t && t(this._temporaryDisplayables[e]);}}, po.prototype.update = function () {this.updateTransform();for (var t = this._cursor; t < this._displayables.length; t++) {var e = this._displayables[t];e.parent = this, e.update(), e.parent = null;}for (var t = 0; t < this._temporaryDisplayables.length; t++) {var e = this._temporaryDisplayables[t];e.parent = this, e.update(), e.parent = null;}}, po.prototype.brush = function (t) {for (var e = this._cursor; e < this._displayables.length; e++) {var n = this._displayables[e];n.beforeBrush && n.beforeBrush(t), n.brush(t, e === this._cursor ? null : this._displayables[e - 1]), n.afterBrush && n.afterBrush(t);}this._cursor = e;for (var e = 0; e < this._temporaryDisplayables.length; e++) {var n = this._temporaryDisplayables[e];n.beforeBrush && n.beforeBrush(t), n.brush(t, 0 === e ? null : this._temporaryDisplayables[e - 1]), n.afterBrush && n.afterBrush(t);}this._temporaryDisplayables = [], this.notClear = !0;};var Hm = [];po.prototype.getBoundingRect = function () {if (!this._rect) {for (var t = new In(1 / 0, 1 / 0, -1 / 0, -1 / 0), e = 0; e < this._displayables.length; e++) {var n = this._displayables[e],i = n.getBoundingRect().clone();n.needLocalTransform() && i.applyTransform(n.getLocalTransform(Hm)), t.union(i);}this._rect = t;}return this._rect;}, po.prototype.contain = function (t, e) {var n = this.transformCoordToLocal(t, e),i = this.getBoundingRect();if (i.contain(n[0], n[1])) for (var r = 0; r < this._displayables.length; r++) {var o = this._displayables[r];if (o.contain(t, e)) return !0;}return !1;}, h(po, Ii);var Vm = Math.max,Gm = Math.min,Wm = {},Xm = 1,Ym = { color: "textFill", textBorderColor: "textStroke", textBorderWidth: "textStrokeWidth" },Um = "emphasis",jm = "normal",qm = 1,Zm = {},Km = {},$m = ao,Qm = co,Jm = N(),ty = 0;mo("circle", _m), mo("sector", bm), mo("ring", Sm), mo("polygon", Im), mo("polyline", Tm), mo("rect", Am), mo("line", Om), mo("bezierCurve", Bm), mo("arc", zm);var ey = (Object.freeze || Object)({ Z2_EMPHASIS_LIFT: Xm, CACHED_LABEL_STYLE_PROPERTIES: Ym, extendShape: go, extendPath: vo, registerShape: mo, getShapeClass: yo, makePath: _o, makeImage: xo, mergePath: $m, resizePath: bo, subPixelOptimizeLine: So, subPixelOptimizeRect: Mo, subPixelOptimize: Qm, setElementHoverStyle: Oo, setHoverStyle: No, setAsHighDownDispatcher: Fo, isHighDownDispatcher: Ho, getHighlightDigit: Vo, setLabelStyle: Go, modifyLabelStyle: Wo, setTextStyle: Xo, setText: Yo, getFont: Qo, updateProps: ta, initProps: ea, getTransform: na, applyTransform: ia, transformDirection: ra, groupTransition: oa, clipPointsByRect: aa, clipRectByRect: sa, createIcon: la, linePolygonIntersect: ua, lineLineIntersect: ha, Group: ig, Image: Ti, Text: ym, Circle: _m, Sector: bm, Ring: Sm, Polygon: Im, Polyline: Tm, Rect: Am, Line: Om, BezierCurve: Bm, Arc: zm, IncrementalDisplayable: po, CompoundPath: Em, LinearGradient: Nm, RadialGradient: Fm, BoundingRect: In }),ny = ["textStyle", "color"],iy = { getTextColor: function getTextColor(t) {var e = this.ecModel;return this.getShallow("color") || (!t && e ? e.get(ny) : null);}, getFont: function getFont() {return Qo({ fontStyle: this.getShallow("fontStyle"), fontWeight: this.getShallow("fontWeight"), fontSize: this.getShallow("fontSize"), fontFamily: this.getShallow("fontFamily") }, this.ecModel);}, getTextRect: function getTextRect(t) {return Yn(t, this.getFont(), this.getShallow("align"), this.getShallow("verticalAlign") || this.getShallow("baseline"), this.getShallow("padding"), this.getShallow("lineHeight"), this.getShallow("rich"), this.getShallow("truncateText"));} },ry = cv([["fill", "color"], ["stroke", "borderColor"], ["lineWidth", "borderWidth"], ["opacity"], ["shadowBlur"], ["shadowOffsetX"], ["shadowOffsetY"], ["shadowColor"], ["textPosition"], ["textAlign"]]),oy = { getItemStyle: function getItemStyle(t, e) {var n = ry(this, t, e),i = this.getBorderLineDash();return i && (n.lineDash = i), n;}, getBorderLineDash: function getBorderLineDash() {var t = this.get("borderType");return "solid" === t || null == t ? null : "dashed" === t ? [5, 5] : [1, 1];} },ay = c,sy = lr();fa.prototype = { constructor: fa, init: null, mergeOption: function mergeOption(t) {r(this.option, t, !0);}, get: function get(t, e) {return null == t ? this.option : pa(this.option, this.parsePath(t), !e && ga(this, t));}, getShallow: function getShallow(t, e) {var n = this.option,i = null == n ? n : n[t],r = !e && ga(this, t);return null == i && r && (i = r.getShallow(t)), i;}, getModel: function getModel(t, e) {var n,i = null == t ? this.option : pa(this.option, t = this.parsePath(t));return e = e || (n = ga(this, t)) && n.getModel(t), new fa(i, e, this.ecModel);}, isEmpty: function isEmpty() {return null == this.option;}, restoreData: function restoreData() {}, clone: function clone() {var t = this.constructor;return new t(i(this.option));}, setReadOnly: function setReadOnly() {}, parsePath: function parsePath(t) {return "string" == typeof t && (t = t.split(".")), t;}, customizeGetParent: function customizeGetParent(t) {sy(this).getParent = t;}, isAnimationEnabled: function isAnimationEnabled() {if (!Wf.node) {if (null != this.option.animation) return !!this.option.animation;if (this.parentModel) return this.parentModel.isAnimationEnabled();}} }, vr(fa), mr(fa), ay(fa, fv), ay(fa, gv), ay(fa, iy), ay(fa, oy);var ly = 0,uy = 1e-4,hy = 9007199254740991,cy = /^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d\d)(?::(\d\d)(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/,dy = (Object.freeze || Object)({ linearMap: xa, parsePercent: wa, round: ba, asc: Sa, getPrecision: Ma, getPrecisionSafe: Ca, getPixelPrecision: Ia, getPercentWithPrecision: Ta, MAX_SAFE_INTEGER: hy, remRadian: ka, isRadianAroundZero: Da, parseDate: Aa, quantity: Pa, quantityExponent: Oa, nice: La, quantile: Ba, reformIntervals: za, isNumeric: Ea }),fy = O,py = /([&<>"'])/g,gy = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" },vy = ["a", "b", "c", "d", "e", "f", "g"],my = function my(t, e) {return "{" + t + (null == e ? "" : e) + "}";},yy = $n,_y = (Object.freeze || Object)({ addCommas: Ra, toCamelCase: Na, normalizeCssArray: fy, encodeHTML: Fa, formatTpl: Ha, formatTplSimple: Va, getTooltipMarker: Ga, formatTime: Xa, capitalFirst: Ya, truncateText: yy, getTextBoundingRect: Ua, getTextRect: ja, windowOpen: qa }),xy = f,wy = ["left", "right", "top", "bottom", "width", "height"],by = [["width", "left", "right"], ["height", "top", "bottom"]],Sy = Za,My = (_(Za, "vertical"), _(Za, "horizontal"), { getBoxLayoutParams: function getBoxLayoutParams() {return { left: this.get("left"), top: this.get("top"), right: this.get("right"), bottom: this.get("bottom"), width: this.get("width"), height: this.get("height") };} }),Cy = lr(),Iy = fa.extend({ type: "component", id: "", name: "", mainType: "", subType: "", componentIndex: 0, defaultOption: null, ecModel: null, dependentModels: [], uid: null, layoutMode: null, $constructor: function $constructor(t, e, n, i) {fa.call(this, t, e, n, i), this.uid = va("ec_cpt_model");}, init: function init(t, e, n) {this.mergeDefaultAndTheme(t, n);}, mergeDefaultAndTheme: function mergeDefaultAndTheme(t, e) {var n = this.layoutMode,i = n ? Qa(t) : {},o = e.getTheme();r(t, o.get(this.mainType)), r(t, this.getDefaultOption()), n && $a(t, i, n);}, mergeOption: function mergeOption(t) {r(this.option, t, !0);var e = this.layoutMode;e && $a(this.option, t, e);}, optionUpdated: function optionUpdated() {}, getDefaultOption: function getDefaultOption() {var t = Cy(this);if (!t.defaultOption) {for (var e = [], n = this.constructor; n;) {var i = n.prototype.defaultOption;i && e.push(i), n = n.superClass;}for (var o = {}, a = e.length - 1; a >= 0; a--) {o = r(o, e[a], !0);}t.defaultOption = o;}return t.defaultOption;}, getReferringComponents: function getReferringComponents(t) {return this.ecModel.queryComponents({ mainType: t, index: this.get(t + "Index", !0), id: this.get(t + "Id", !0) });} });xr(Iy, { registerWhenExtend: !0 }), ma(Iy), ya(Iy, ts), c(Iy, My);var Ty = "";"undefined" != typeof navigator && (Ty = navigator.platform || "");var ky = { color: ["#c23531", "#2f4554", "#61a0a8", "#d48265", "#91c7ae", "#749f83", "#ca8622", "#bda29a", "#6e7074", "#546570", "#c4ccd3"], gradientColor: ["#f6efa6", "#d88273", "#bf444c"], textStyle: { fontFamily: Ty.match(/^Win/) ? "Microsoft YaHei" : "sans-serif", fontSize: 12, fontStyle: "normal", fontWeight: "normal" }, blendMode: null, animation: "auto", animationDuration: 1e3, animationDurationUpdate: 300, animationEasing: "exponentialOut", animationEasingUpdate: "cubicOut", animationThreshold: 2e3, progressiveThreshold: 3e3, progressive: 400, hoverLayerThreshold: 3e3, useUTC: !1 },Dy = lr(),Ay = { clearColorPalette: function clearColorPalette() {Dy(this).colorIdx = 0, Dy(this).colorNameMap = {};
    }, getColorFromPalette: function getColorFromPalette(t, e, n) {e = e || this;var i = Dy(e),r = i.colorIdx || 0,o = i.colorNameMap = i.colorNameMap || {};if (o.hasOwnProperty(t)) return o[t];var a = Ji(this.get("color", !0)),s = this.get("colorLayer", !0),l = null != n && s ? es(s, n) : a;if (l = l || a, l && l.length) {var u = l[r];return t && (o[t] = u), i.colorIdx = (r + 1) % l.length, u;}} },Py = "original",Oy = "arrayRows",Ly = "objectRows",By = "keyedColumns",zy = "unknown",Ey = "typedArray",Ry = "column",Ny = "row";ns.seriesDataToSource = function (t) {return new ns({ data: t, sourceFormat: C(t) ? Ey : Py, fromDataset: !1 });}, mr(ns);var Fy = { Must: 1, Might: 2, Not: 3 },Hy = lr(),Vy = "\x00_ec_inner",Gy = fa.extend({ init: function init(t, e, n, i) {n = n || {}, this.option = null, this._theme = new fa(n), this._optionManager = i;}, setOption: function setOption(t, e) {L(!(Vy in t), "please use chart.getOption()"), this._optionManager.setOption(t, e), this.resetOption(null);}, resetOption: function resetOption(t) {var e = !1,n = this._optionManager;if (!t || "recreate" === t) {var i = n.mountOption("recreate" === t);this.option && "recreate" !== t ? (this.restoreData(), this.mergeOption(i)) : ms.call(this, i), e = !0;}if (("timeline" === t || "media" === t) && this.restoreData(), !t || "recreate" === t || "timeline" === t) {var r = n.getTimelineOption(this);r && (this.mergeOption(r), e = !0);}if (!t || "recreate" === t || "media" === t) {var o = n.getMediaOption(this, this._api);o.length && f(o, function (t) {this.mergeOption(t, e = !0);}, this);}return e;}, mergeOption: function mergeOption(t) {function e(e, i) {var r = Ji(t[e]),s = ir(o.get(e), r);rr(s), f(s, function (t) {var n = t.option;S(n) && (t.keyInfo.mainType = e, t.keyInfo.subType = _s(e, n, t.exist));});var l = ys(o, i);n[e] = [], o.set(e, []), f(s, function (t, i) {var r = t.exist,s = t.option;if (L(S(s) || r, "Empty component definition"), s) {var u = Iy.getClass(e, t.keyInfo.subType, !0);if (r && r.constructor === u) r.name = t.keyInfo.name, r.mergeOption(s, this), r.optionUpdated(s, !1);else {var h = a({ dependentModels: l, componentIndex: i }, t.keyInfo);r = new u(s, this, this, h), a(r, h), r.init(s, this, this, h), r.optionUpdated(null, !0);}} else r.mergeOption({}, this), r.optionUpdated({}, !1);o.get(e)[i] = r, n[e][i] = r.option;}, this), "series" === e && xs(this, o.get("series"));}var n = this.option,o = this._componentsMap,s = [];os(this), f(t, function (t, e) {null != t && (Iy.hasClass(e) ? e && s.push(e) : n[e] = null == n[e] ? i(t) : r(n[e], t, !0));}), Iy.topologicalTravel(s, Iy.getAllClassMainTypes(), e, this), this._seriesIndicesMap = N(this._seriesIndices = this._seriesIndices || []);}, getOption: function getOption() {var t = i(this.option);return f(t, function (e, n) {if (Iy.hasClass(n)) {for (var e = Ji(e), i = e.length - 1; i >= 0; i--) {ar(e[i]) && e.splice(i, 1);}t[n] = e;}}), delete t[Vy], t;}, getTheme: function getTheme() {return this._theme;}, getComponent: function getComponent(t, e) {var n = this._componentsMap.get(t);return n ? n[e || 0] : void 0;}, queryComponents: function queryComponents(t) {var e = t.mainType;if (!e) return [];var n = t.index,i = t.id,r = t.name,o = this._componentsMap.get(e);if (!o || !o.length) return [];var a;if (null != n) x(n) || (n = [n]), a = v(p(n, function (t) {return o[t];}), function (t) {return !!t;});else if (null != i) {var s = x(i);a = v(o, function (t) {return s && u(i, t.id) >= 0 || !s && t.id === i;});} else if (null != r) {var l = x(r);a = v(o, function (t) {return l && u(r, t.name) >= 0 || !l && t.name === r;});} else a = o.slice();return ws(a, t);}, findComponents: function findComponents(t) {function e(t) {var e = r + "Index",n = r + "Id",i = r + "Name";return !t || null == t[e] && null == t[n] && null == t[i] ? null : { mainType: r, index: t[e], id: t[n], name: t[i] };}function n(e) {return t.filter ? v(e, t.filter) : e;}var i = t.query,r = t.mainType,o = e(i),a = o ? this.queryComponents(o) : this._componentsMap.get(r);return n(ws(a, t));}, eachComponent: function eachComponent(t, e, n) {var i = this._componentsMap;if ("function" == typeof t) n = e, e = t, i.each(function (t, i) {f(t, function (t, r) {e.call(n, i, t, r);});});else if (b(t)) f(i.get(t), e, n);else if (S(t)) {var r = this.findComponents(t);f(r, e, n);}}, getSeriesByName: function getSeriesByName(t) {var e = this._componentsMap.get("series");return v(e, function (e) {return e.name === t;});}, getSeriesByIndex: function getSeriesByIndex(t) {return this._componentsMap.get("series")[t];}, getSeriesByType: function getSeriesByType(t) {var e = this._componentsMap.get("series");return v(e, function (e) {return e.subType === t;});}, getSeries: function getSeries() {return this._componentsMap.get("series").slice();}, getSeriesCount: function getSeriesCount() {return this._componentsMap.get("series").length;}, eachSeries: function eachSeries(t, e) {f(this._seriesIndices, function (n) {var i = this._componentsMap.get("series")[n];t.call(e, i, n);}, this);}, eachRawSeries: function eachRawSeries(t, e) {f(this._componentsMap.get("series"), t, e);}, eachSeriesByType: function eachSeriesByType(t, e, n) {f(this._seriesIndices, function (i) {var r = this._componentsMap.get("series")[i];r.subType === t && e.call(n, r, i);}, this);}, eachRawSeriesByType: function eachRawSeriesByType(t, e, n) {return f(this.getSeriesByType(t), e, n);}, isSeriesFiltered: function isSeriesFiltered(t) {return null == this._seriesIndicesMap.get(t.componentIndex);}, getCurrentSeriesIndices: function getCurrentSeriesIndices() {return (this._seriesIndices || []).slice();}, filterSeries: function filterSeries(t, e) {var n = v(this._componentsMap.get("series"), t, e);xs(this, n);}, restoreData: function restoreData(t) {var e = this._componentsMap;xs(this, e.get("series"));var n = [];e.each(function (t, e) {n.push(e);}), Iy.topologicalTravel(n, Iy.getAllClassMainTypes(), function (n) {f(e.get(n), function (e) {("series" !== n || !gs(e, t)) && e.restoreData();});});} });c(Gy, Ay);var Wy = ["getDom", "getZr", "getWidth", "getHeight", "getDevicePixelRatio", "dispatchAction", "isDisposed", "on", "off", "getDataURL", "getConnectedDataURL", "getModel", "getOption", "getViewOfComponentModel", "getViewOfSeriesModel"],Xy = {};Ss.prototype = { constructor: Ss, create: function create(t, e) {var n = [];f(Xy, function (i) {var r = i.create(t, e);n = n.concat(r || []);}), this._coordinateSystems = n;}, update: function update(t, e) {f(this._coordinateSystems, function (n) {n.update && n.update(t, e);});}, getCoordinateSystems: function getCoordinateSystems() {return this._coordinateSystems.slice();} }, Ss.register = function (t, e) {Xy[t] = e;}, Ss.get = function (t) {return Xy[t];};var Yy = f,Uy = i,jy = p,qy = r,Zy = /^(min|max)?(.+)$/;Ms.prototype = { constructor: Ms, setOption: function setOption(t, e) {t && f(Ji(t.series), function (t) {t && t.data && C(t.data) && z(t.data);}), t = Uy(t);var n = this._optionBackup,i = Cs.call(this, t, e, !n);this._newBaseOption = i.baseOption, n ? (Ds(n.baseOption, i.baseOption), i.timelineOptions.length && (n.timelineOptions = i.timelineOptions), i.mediaList.length && (n.mediaList = i.mediaList), i.mediaDefault && (n.mediaDefault = i.mediaDefault)) : this._optionBackup = i;}, mountOption: function mountOption(t) {var e = this._optionBackup;return this._timelineOptions = jy(e.timelineOptions, Uy), this._mediaList = jy(e.mediaList, Uy), this._mediaDefault = Uy(e.mediaDefault), this._currentMediaIndices = [], Uy(t ? e.baseOption : this._newBaseOption);}, getTimelineOption: function getTimelineOption(t) {var e,n = this._timelineOptions;if (n.length) {var i = t.getComponent("timeline");i && (e = Uy(n[i.getCurrentIndex()], !0));}return e;}, getMediaOption: function getMediaOption() {var t = this._api.getWidth(),e = this._api.getHeight(),n = this._mediaList,i = this._mediaDefault,r = [],o = [];if (!n.length && !i) return o;for (var a = 0, s = n.length; s > a; a++) {Is(n[a].query, t, e) && r.push(a);}return !r.length && i && (r = [-1]), r.length && !ks(r, this._currentMediaIndices) && (o = jy(r, function (t) {return Uy(-1 === t ? i.option : n[t].option);})), this._currentMediaIndices = r, o;} };var Ky = f,$y = S,Qy = ["areaStyle", "lineStyle", "nodeStyle", "linkStyle", "chordStyle", "label", "labelLine"],Jy = function Jy(t, e) {Ky(Es(t.series), function (t) {$y(t) && zs(t);});var n = ["xAxis", "yAxis", "radiusAxis", "angleAxis", "singleAxis", "parallelAxis", "radar"];e && n.push("valueAxis", "categoryAxis", "logAxis", "timeAxis"), Ky(n, function (e) {Ky(Es(t[e]), function (t) {t && (Ls(t, "axisLabel"), Ls(t.axisPointer, "label"));});}), Ky(Es(t.parallel), function (t) {var e = t && t.parallelAxisDefault;Ls(e, "axisLabel"), Ls(e && e.axisPointer, "label");}), Ky(Es(t.calendar), function (t) {Ps(t, "itemStyle"), Ls(t, "dayLabel"), Ls(t, "monthLabel"), Ls(t, "yearLabel");}), Ky(Es(t.radar), function (t) {Ls(t, "name");}), Ky(Es(t.geo), function (t) {$y(t) && (Bs(t), Ky(Es(t.regions), function (t) {Bs(t);}));}), Ky(Es(t.timeline), function (t) {Bs(t), Ps(t, "label"), Ps(t, "itemStyle"), Ps(t, "controlStyle", !0);var e = t.data;x(e) && f(e, function (t) {S(t) && (Ps(t, "label"), Ps(t, "itemStyle"));});}), Ky(Es(t.toolbox), function (t) {Ps(t, "iconStyle"), Ky(t.feature, function (t) {Ps(t, "iconStyle");});}), Ls(Rs(t.axisPointer), "label"), Ls(Rs(t.tooltip).axisPointer, "label");},t_ = [["x", "left"], ["y", "top"], ["x2", "right"], ["y2", "bottom"]],e_ = ["grid", "geo", "parallel", "legend", "toolbox", "title", "visualMap", "dataZoom", "timeline"],n_ = function n_(t, e) {Jy(t, e), t.series = Ji(t.series), f(t.series, function (t) {if (S(t)) {var e = t.type;if ("line" === e) null != t.clipOverflow && (t.clip = t.clipOverflow);else if ("pie" === e || "gauge" === e) null != t.clockWise && (t.clockwise = t.clockWise);else if ("gauge" === e) {var n = Ns(t, "pointer.color");null != n && Fs(t, "itemStyle.color", n);}Hs(t);}}), t.dataRange && (t.visualMap = t.dataRange), f(e_, function (e) {var n = t[e];n && (x(n) || (n = [n]), f(n, function (t) {Hs(t);}));});},i_ = function i_(t) {var e = N();t.eachSeries(function (t) {var n = t.get("stack");if (n) {var i = e.get(n) || e.set(n, []),r = t.getData(),o = { stackResultDimension: r.getCalculationInfo("stackResultDimension"), stackedOverDimension: r.getCalculationInfo("stackedOverDimension"), stackedDimension: r.getCalculationInfo("stackedDimension"), stackedByDimension: r.getCalculationInfo("stackedByDimension"), isStackedByIndex: r.getCalculationInfo("isStackedByIndex"), data: r, seriesModel: t };if (!o.stackedDimension || !o.isStackedByIndex && !o.stackedByDimension) return;i.length && r.setCalculationInfo("stackedOnSeries", i[i.length - 1].seriesModel), i.push(o);}}), e.each(Vs);},r_ = Gs.prototype;r_.pure = !1, r_.persistent = !0, r_.getSource = function () {return this._source;};var o_ = { arrayRows_column: { pure: !0, count: function count() {return Math.max(0, this._data.length - this._source.startIndex);}, getItem: function getItem(t) {return this._data[t + this._source.startIndex];}, appendData: Ys }, arrayRows_row: { pure: !0, count: function count() {var t = this._data[0];return t ? Math.max(0, t.length - this._source.startIndex) : 0;}, getItem: function getItem(t) {t += this._source.startIndex;for (var e = [], n = this._data, i = 0; i < n.length; i++) {var r = n[i];e.push(r ? r[t] : null);}return e;}, appendData: function appendData() {throw new Error('Do not support appendData when set seriesLayoutBy: "row".');} }, objectRows: { pure: !0, count: Ws, getItem: Xs, appendData: Ys }, keyedColumns: { pure: !0, count: function count() {var t = this._source.dimensionsDefine[0].name,e = this._data[t];return e ? e.length : 0;}, getItem: function getItem(t) {for (var e = [], n = this._source.dimensionsDefine, i = 0; i < n.length; i++) {var r = this._data[n[i].name];e.push(r ? r[t] : null);}return e;}, appendData: function appendData(t) {var e = this._data;f(t, function (t, n) {for (var i = e[n] || (e[n] = []), r = 0; r < (t || []).length; r++) {i.push(t[r]);}});} }, original: { count: Ws, getItem: Xs, appendData: Ys }, typedArray: { persistent: !1, pure: !0, count: function count() {return this._data ? this._data.length / this._dimSize : 0;}, getItem: function getItem(t, e) {t -= this._offset, e = e || [];for (var n = this._dimSize * t, i = 0; i < this._dimSize; i++) {e[i] = this._data[n + i];}return e;}, appendData: function appendData(t) {this._data = t;}, clean: function clean() {this._offset += this.count(), this._data = null;} } },a_ = { arrayRows: Us, objectRows: function objectRows(t, e, n, i) {return null != n ? t[i] : t;}, keyedColumns: Us, original: function original(t, e, n) {var i = er(t);return null != n && i instanceof Array ? i[n] : i;}, typedArray: Us },s_ = { arrayRows: js, objectRows: function objectRows(t, e) {return qs(t[e], this._dimensionInfos[e]);}, keyedColumns: js, original: function original(t, e, n, i) {var r = t && (null == t.value ? t : t.value);return !this._rawData.pure && nr(t) && (this.hasItemOption = !0), qs(r instanceof Array ? r[i] : r, this._dimensionInfos[e]);}, typedArray: function typedArray(t, e, n, i) {return t[i];} },l_ = /\{@(.+?)\}/g,u_ = { getDataParams: function getDataParams(t, e) {var n = this.getData(e),i = this.getRawValue(t, e),r = n.getRawIndex(t),o = n.getName(t),a = n.getRawDataItem(t),s = n.getItemVisual(t, "color"),l = n.getItemVisual(t, "borderColor"),u = this.ecModel.getComponent("tooltip"),h = u && u.get("renderMode"),c = fr(h),d = this.mainType,f = "series" === d,p = n.userOutput;return { componentType: d, componentSubType: this.subType, componentIndex: this.componentIndex, seriesType: f ? this.subType : null, seriesIndex: this.seriesIndex, seriesId: f ? this.id : null, seriesName: f ? this.name : null, name: o, dataIndex: r, data: a, dataType: e, value: i, color: s, borderColor: l, dimensionNames: p ? p.dimensionNames : null, encode: p ? p.encode : null, marker: Ga({ color: s, renderMode: c }), $vars: ["seriesName", "name", "value"] };}, getFormattedLabel: function getFormattedLabel(t, e, n, i, r) {e = e || "normal";var o = this.getData(n),a = o.getItemModel(t),s = this.getDataParams(t, n);null != i && s.value instanceof Array && (s.value = s.value[i]);var l = a.get("normal" === e ? [r || "label", "formatter"] : [e, r || "label", "formatter"]);if ("function" == typeof l) return s.status = e, s.dimensionIndex = i, l(s);if ("string" == typeof l) {var u = Ha(l, s);return u.replace(l_, function (e, n) {var i = n.length;return "[" === n.charAt(0) && "]" === n.charAt(i - 1) && (n = +n.slice(1, i - 1)), Zs(o, t, n);});}}, getRawValue: function getRawValue(t, e) {return Zs(this.getData(e), t);}, formatTooltip: function formatTooltip() {} },h_ = $s.prototype;h_.perform = function (t) {function e(t) {return !(t >= 1) && (t = 1), t;}var n = this._upstream,i = t && t.skip;if (this._dirty && n) {var r = this.context;r.data = r.outputData = n.context.outputData;}this.__pipeline && (this.__pipeline.currentTask = this);var o;this._plan && !i && (o = this._plan(this.context));var a = e(this._modBy),s = this._modDataCount || 0,l = e(t && t.modBy),u = t && t.modDataCount || 0;(a !== l || s !== u) && (o = "reset");var h;(this._dirty || "reset" === o) && (this._dirty = !1, h = Js(this, i)), this._modBy = l, this._modDataCount = u;var c = t && t.step;if (this._dueEnd = n ? n._outputDueEnd : this._count ? this._count(this.context) : 1 / 0, this._progress) {var d = this._dueIndex,f = Math.min(null != c ? this._dueIndex + c : 1 / 0, this._dueEnd);if (!i && (h || f > d)) {var p = this._progress;if (x(p)) for (var g = 0; g < p.length; g++) {Qs(this, p[g], d, f, l, u);} else Qs(this, p, d, f, l, u);}this._dueIndex = f;var v = null != this._settedOutputEnd ? this._settedOutputEnd : f;this._outputDueEnd = v;} else this._dueIndex = this._outputDueEnd = null != this._settedOutputEnd ? this._settedOutputEnd : this._dueEnd;return this.unfinished();};var c_ = function () {function t() {return n > i ? i++ : null;}function e() {var t = i % a * r + Math.ceil(i / a),e = i >= n ? null : o > t ? t : i;return i++, e;}var n,i,r,o,a,s = { reset: function reset(l, u, h, c) {i = l, n = u, r = h, o = c, a = Math.ceil(o / r), s.next = r > 1 && o > 0 ? e : t;} };return s;}();h_.dirty = function () {this._dirty = !0, this._onDirty && this._onDirty(this.context);}, h_.unfinished = function () {return this._progress && this._dueIndex < this._dueEnd;}, h_.pipe = function (t) {(this._downstream !== t || this._dirty) && (this._downstream = t, t._upstream = this, t.dirty());}, h_.dispose = function () {this._disposed || (this._upstream && (this._upstream._downstream = null), this._downstream && (this._downstream._upstream = null), this._dirty = !1, this._disposed = !0);}, h_.getUpstream = function () {return this._upstream;}, h_.getDownstream = function () {return this._downstream;}, h_.setOutputEnd = function (t) {this._outputDueEnd = this._settedOutputEnd = t;};var d_ = lr(),f_ = Iy.extend({ type: "series.__base__", seriesIndex: 0, coordinateSystem: null, defaultOption: null, legendVisualProvider: null, visualColorAccessPath: "itemStyle.color", visualBorderColorAccessPath: "itemStyle.borderColor", layoutMode: null, init: function init(t, e, n) {this.seriesIndex = this.componentIndex, this.dataTask = Ks({ count: nl, reset: il }), this.dataTask.context = { model: this }, this.mergeDefaultAndTheme(t, n), as(this);var i = this.getInitialData(t, n);ol(i, this), this.dataTask.context.data = i, d_(this).dataBeforeProcessed = i, tl(this);}, mergeDefaultAndTheme: function mergeDefaultAndTheme(t, e) {var n = this.layoutMode,i = n ? Qa(t) : {},o = this.subType;Iy.hasClass(o) && (o += "Series"), r(t, e.getTheme().get(this.subType)), r(t, this.getDefaultOption()), tr(t, "label", ["show"]), this.fillDataTextStyle(t.data), n && $a(t, i, n);}, mergeOption: function mergeOption(t, e) {t = r(this.option, t, !0), this.fillDataTextStyle(t.data);var n = this.layoutMode;n && $a(this.option, t, n), as(this);var i = this.getInitialData(t, e);ol(i, this), this.dataTask.dirty(), this.dataTask.context.data = i, d_(this).dataBeforeProcessed = i, tl(this);}, fillDataTextStyle: function fillDataTextStyle(t) {if (t && !C(t)) for (var e = ["show"], n = 0; n < t.length; n++) {t[n] && t[n].label && tr(t[n], "label", e);}}, getInitialData: function getInitialData() {}, appendData: function appendData(t) {var e = this.getRawData();e.appendData(t.data);}, getData: function getData(t) {var e = sl(this);if (e) {var n = e.context.data;return null == t ? n : n.getLinkedData(t);}return d_(this).data;}, setData: function setData(t) {var e = sl(this);if (e) {var n = e.context;n.data !== t && e.modifyOutputEnd && e.setOutputEnd(t.count()), n.outputData = t, e !== this.dataTask && (n.data = t);}d_(this).data = t;}, getSource: function getSource() {return rs(this);}, getRawData: function getRawData() {return d_(this).dataBeforeProcessed;}, getBaseAxis: function getBaseAxis() {var t = this.coordinateSystem;return t && t.getBaseAxis && t.getBaseAxis();}, formatTooltip: function formatTooltip(t, e, n, i) {function r(n) {function r(t, n) {var r = c.getDimensionInfo(n);if (r && r.otherDims.tooltip !== !1) {var d = r.type,f = "sub" + a.seriesIndex + "at" + h,p = Ga({ color: y, type: "subItem", renderMode: i, markerId: f }),g = "string" == typeof p ? p : p.content,v = (o ? g + Fa(r.displayName || "-") + ": " : "") + Fa("ordinal" === d ? t + "" : "time" === d ? e ? "" : Xa("yyyy/MM/dd hh:mm:ss", t) : Ra(t));v && s.push(v), l && (u[f] = y, ++h);}}var o = g(n, function (t, e, n) {var i = c.getDimensionInfo(n);return t |= i && i.tooltip !== !1 && null != i.displayName;}, 0),s = [];d.length ? f(d, function (e) {r(Zs(c, t, e), e);}) : f(n, r);var p = o ? l ? "\n" : "<br/>" : "",v = p + s.join(p || ", ");return { renderMode: i, content: v, style: u };}function o(t) {return { renderMode: i, content: Fa(Ra(t)), style: u };}var a = this;i = i || "html";var s = "html" === i ? "<br/>" : "\n",l = "richText" === i,u = {},h = 0,c = this.getData(),d = c.mapDimension("defaultedTooltip", !0),p = d.length,v = this.getRawValue(t),m = x(v),y = c.getItemVisual(t, "color");S(y) && y.colorStops && (y = (y.colorStops[0] || {}).color), y = y || "transparent";var _ = p > 1 || m && !p ? r(v) : o(p ? Zs(c, t, d[0]) : m ? v[0] : v),w = _.content,b = a.seriesIndex + "at" + h,M = Ga({ color: y, type: "item", renderMode: i, markerId: b });u[b] = y, ++h;var C = c.getName(t),I = this.name;or(this) || (I = ""), I = I ? Fa(I) + (e ? ": " : s) : "";var T = "string" == typeof M ? M : M.content,k = e ? T + I + w : I + T + (C ? Fa(C) + ": " + w : w);return { html: k, markers: u };}, isAnimationEnabled: function isAnimationEnabled() {if (Wf.node) return !1;var t = this.getShallow("animation");return t && this.getData().count() > this.getShallow("animationThreshold") && (t = !1), t;}, restoreData: function restoreData() {this.dataTask.dirty();}, getColorFromPalette: function getColorFromPalette(t, e, n) {var i = this.ecModel,r = Ay.getColorFromPalette.call(this, t, e, n);return r || (r = i.getColorFromPalette(t, e, n)), r;}, coordDimToDataDim: function coordDimToDataDim(t) {return this.getRawData().mapDimension(t, !0);}, getProgressive: function getProgressive() {return this.get("progressive");}, getProgressiveThreshold: function getProgressiveThreshold() {return this.get("progressiveThreshold");}, getAxisTooltipData: null, getTooltipPosition: null, pipeTask: null, preventIncremental: null, pipelineContext: null });c(f_, u_), c(f_, Ay);var p_ = function p_() {this.group = new ig(), this.uid = va("viewComponent");};p_.prototype = { constructor: p_, init: function init() {}, render: function render() {}, dispose: function dispose() {}, filterForExposedEvent: null };var g_ = p_.prototype;g_.updateView = g_.updateLayout = g_.updateVisual = function () {}, vr(p_), xr(p_, { registerWhenExtend: !0 });var v_ = function v_() {var t = lr();return function (e) {var n = t(e),i = e.pipelineContext,r = n.large,o = n.progressiveRender,a = n.large = i && i.large,s = n.progressiveRender = i && i.progressiveRender;return !!(r ^ a || o ^ s) && "reset";};},m_ = lr(),y_ = v_();ll.prototype = { type: "chart", init: function init() {}, render: function render() {}, highlight: function highlight(t, e, n, i) {hl(t.getData(), i, "emphasis");}, downplay: function downplay(t, e, n, i) {hl(t.getData(), i, "normal");}, remove: function remove() {this.group.removeAll();}, dispose: function dispose() {}, incrementalPrepareRender: null, incrementalRender: null, updateTransform: null, filterForExposedEvent: null };var __ = ll.prototype;__.updateView = __.updateLayout = __.updateVisual = function (t, e, n, i) {this.render(t, e, n, i);}, vr(ll, ["dispose"]), xr(ll, { registerWhenExtend: !0 }), ll.markUpdateMethod = function (t, e) {m_(t).updateMethod = e;};var x_ = { incrementalPrepareRender: { progress: function progress(t, e) {e.view.incrementalRender(t, e.model, e.ecModel, e.api, e.payload);} }, render: { forceFirstProgress: !0, progress: function progress(t, e) {e.view.render(e.model, e.ecModel, e.api, e.payload);} } },w_ = "\x00__throttleOriginMethod",b_ = "\x00__throttleRate",S_ = "\x00__throttleType",M_ = { createOnAllSeries: !0, performRawSeries: !0, reset: function reset(t, e) {var n = t.getData(),i = (t.visualColorAccessPath || "itemStyle.color").split("."),r = t.get(i),o = !w(r) || r instanceof Rm ? null : r;(!r || o) && (r = t.getColorFromPalette(t.name, null, e.getSeriesCount())), n.setVisual("color", r);var a = (t.visualBorderColorAccessPath || "itemStyle.borderColor").split("."),s = t.get(a);if (n.setVisual("borderColor", s), !e.isSeriesFiltered(t)) {o && n.each(function (e) {n.setItemVisual(e, "color", o(t.getDataParams(e)));});var l = function l(t, e) {var n = t.getItemModel(e),r = n.get(i, !0),o = n.get(a, !0);null != r && t.setItemVisual(e, "color", r), null != o && t.setItemVisual(e, "borderColor", o);};return { dataEach: n.hasItemOption ? l : null };}} },C_ = { legend: { selector: { all: "全选", inverse: "反选" } }, toolbox: { brush: { title: { rect: "矩形选择", polygon: "圈选", lineX: "横向选择", lineY: "纵向选择", keep: "保持选择", clear: "清除选择" } }, dataView: { title: "数据视图", lang: ["数据视图", "关闭", "刷新"] }, dataZoom: { title: { zoom: "区域缩放", back: "区域缩放还原" } }, magicType: { title: { line: "切换为折线图", bar: "切换为柱状图", stack: "切换为堆叠", tiled: "切换为平铺" } }, restore: { title: "还原" }, saveAsImage: { title: "保存为图片", lang: ["右键另存为图片"] } }, series: { typeNames: { pie: "饼图", bar: "柱状图", line: "折线图", scatter: "散点图", effectScatter: "涟漪散点图", radar: "雷达图", tree: "树图", treemap: "矩形树图", boxplot: "箱型图", candlestick: "K线图", k: "K线图", heatmap: "热力图", map: "地图", parallel: "平行坐标图", lines: "线图", graph: "关系图", sankey: "桑基图", funnel: "漏斗图", gauge: "仪表盘图", pictorialBar: "象形柱图", themeRiver: "主题河流图", sunburst: "旭日图" } }, aria: { general: { withTitle: "这是一个关于“{title}”的图表。", withoutTitle: "这是一个图表，" }, series: { single: { prefix: "", withName: "图表类型是{seriesType}，表示{seriesName}。", withoutName: "图表类型是{seriesType}。" }, multiple: { prefix: "它由{seriesCount}个图表系列组成。", withName: "第{seriesId}个系列是一个表示{seriesName}的{seriesType}，", withoutName: "第{seriesId}个系列是一个{seriesType}，", separator: { middle: "；", end: "。" } } }, data: { allData: "其数据是——", partialData: "其中，前{displayCnt}项是——", withName: "{name}的数据是{value}", withoutName: "{value}", separator: { middle: "，", end: "" } } } },I_ = function I_(t, e) {function n(t, e) {if ("string" != typeof t) return t;var n = t;return f(e, function (t, e) {n = n.replace(new RegExp("\\{\\s*" + e + "\\s*\\}", "g"), t);}), n;}function i(t) {var e = a.get(t);if (null == e) {for (var n = t.split("."), i = C_.aria, r = 0; r < n.length; ++r) {i = i[n[r]];}return i;}return e;}function r() {var t = e.getModel("title").option;return t && t.length && (t = t[0]), t && t.text;}function o(t) {return C_.series.typeNames[t] || "自定义图";}var a = e.getModel("aria");if (a.get("show")) {if (a.get("description")) return void t.setAttribute("aria-label", a.get("description"));var s = 0;e.eachSeries(function () {++s;}, this);var l,u = a.get("data.maxCount") || 10,h = a.get("series.maxCount") || 10,c = Math.min(s, h);if (!(1 > s)) {var d = r();l = d ? n(i("general.withTitle"), { title: d }) : i("general.withoutTitle");var p = [],g = s > 1 ? "series.multiple.prefix" : "series.single.prefix";l += n(i(g), { seriesCount: s }), e.eachSeries(function (t, e) {if (c > e) {var r,a = t.get("name"),l = "series." + (s > 1 ? "multiple" : "single") + ".";r = i(a ? l + "withName" : l + "withoutName"), r = n(r, { seriesId: t.seriesIndex, seriesName: t.get("name"), seriesType: o(t.subType) });var h = t.getData();window.data = h, r += h.count() > u ? n(i("data.partialData"), { displayCnt: u }) : i("data.allData");for (var d = [], f = 0; f < h.count(); f++) {if (u > f) {var g = h.getName(f),v = Zs(h, f);d.push(n(i(g ? "data.withName" : "data.withoutName"), { name: g, value: v }));}}r += d.join(i("data.separator.middle")) + i("data.separator.end"), p.push(r);}}), l += p.join(i("series.multiple.separator.middle")) + i("series.multiple.separator.end"), t.setAttribute("aria-label", l);}}},T_ = Math.PI,k_ = function k_(t, e) {e = e || {}, s(e, { text: "loading", textColor: "#000", fontSize: "12px", maskColor: "rgba(255, 255, 255, 0.8)", showSpinner: !0, color: "#c23531", spinnerRadius: 10, lineWidth: 5, zlevel: 0 });var n = new ig(),i = new Am({ style: { fill: e.maskColor }, zlevel: e.zlevel, z: 1e4 });n.add(i);var r = e.fontSize + " sans-serif",o = new Am({ style: { fill: "none", text: e.text, font: r, textPosition: "right", textDistance: 10, textFill: e.textColor }, zlevel: e.zlevel, z: 10001 });if (n.add(o), e.showSpinner) {var a = new zm({ shape: { startAngle: -T_ / 2, endAngle: -T_ / 2 + .1, r: e.spinnerRadius }, style: { stroke: e.color, lineCap: "round", lineWidth: e.lineWidth }, zlevel: e.zlevel, z: 10001 });a.animateShape(!0).when(1e3, { endAngle: 3 * T_ / 2 }).start("circularInOut"), a.animateShape(!0).when(1e3, { startAngle: 3 * T_ / 2 }).delay(300).start("circularInOut"), n.add(a);}return n.resize = function () {var n = Xn(e.text, r),s = e.showSpinner ? e.spinnerRadius : 0,l = (t.getWidth() - 2 * s - (e.showSpinner && n ? 10 : 0) - n) / 2 - (e.showSpinner ? 0 : n / 2),u = t.getHeight() / 2;e.showSpinner && a.setShape({ cx: l, cy: u }), o.setShape({ x: l - s, y: u - s, width: 2 * s, height: 2 * s }), i.setShape({ x: 0, y: 0, width: t.getWidth(), height: t.getHeight() });}, n.resize(), n;},D_ = gl.prototype;D_.restoreData = function (t, e) {t.restoreData(e), this._stageTaskMap.each(function (t) {var e = t.overallTask;e && e.dirty();});}, D_.getPerformArgs = function (t, e) {if (t.__pipeline) {var n = this._pipelineMap.get(t.__pipeline.id),i = n.context,r = !e && n.progressiveEnabled && (!i || i.progressiveRender) && t.__idxInPipeline > n.blockIndex,o = r ? n.step : null,a = i && i.modDataCount,s = null != a ? Math.ceil(a / o) : null;return { step: o, modBy: s, modDataCount: a };}}, D_.getPipeline = function (t) {return this._pipelineMap.get(t);}, D_.updateStreamModes = function (t, e) {var n = this._pipelineMap.get(t.uid),i = t.getData(),r = i.count(),o = n.progressiveEnabled && e.incrementalPrepareRender && r >= n.threshold,a = t.get("large") && r >= t.get("largeThreshold"),s = "mod" === t.get("progressiveChunkMode") ? r : null;t.pipelineContext = n.context = { progressiveRender: o, modDataCount: s, large: a };}, D_.restorePipelines = function (t) {var e = this,n = e._pipelineMap = N();t.eachSeries(function (t) {var i = t.getProgressive(),r = t.uid;n.set(r, { id: r, head: null, tail: null, threshold: t.getProgressiveThreshold(), progressiveEnabled: i && !(t.preventIncremental && t.preventIncremental()), blockIndex: -1, step: Math.round(i || 700), count: 0 }), Tl(e, t, t.dataTask);});}, D_.prepareStageTasks = function () {var t = this._stageTaskMap,e = this.ecInstance.getModel(),n = this.api;f(this._allHandlers, function (i) {var r = t.get(i.uid) || t.set(i.uid, []);i.reset && ml(this, i, r, e, n), i.overallReset && yl(this, i, r, e, n);}, this);}, D_.prepareView = function (t, e, n, i) {var r = t.renderTask,o = r.context;o.model = e, o.ecModel = n, o.api = i, r.__block = !t.incrementalPrepareRender, Tl(this, e, r);}, D_.performDataProcessorTasks = function (t, e) {vl(this, this._dataProcessorHandlers, t, e, { block: !0 });}, D_.performVisualTasks = function (t, e, n) {vl(this, this._visualHandlers, t, e, n);}, D_.performSeriesTasks = function (t) {var e;t.eachSeries(function (t) {e |= t.dataTask.perform();}), this.unfinished |= e;}, D_.plan = function () {this._pipelineMap.each(function (t) {var e = t.tail;do {if (e.__block) {t.blockIndex = e.__idxInPipeline;break;}e = e.getUpstream();} while (e);});};var A_ = D_.updatePayload = function (t, e) {"remain" !== e && (t.context.payload = e);},P_ = Cl(0);gl.wrapStageHandler = function (t, e) {return w(t) && (t = { overallReset: t, seriesType: kl(t) }), t.uid = va("stageHandler"), e && (t.visualType = e), t;};var O_,L_ = {},B_ = {};Dl(L_, Gy), Dl(B_, bs), L_.eachSeriesByType = L_.eachRawSeriesByType = function (t) {O_ = t;}, L_.eachComponent = function (t) {"series" === t.mainType && t.subType && (O_ = t.subType);};var z_ = ["#37A2DA", "#32C5E9", "#67E0E3", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#E062AE", "#E690D1", "#e7bcf3", "#9d96f5", "#8378EA", "#96BFFF"],E_ = { color: z_, colorLayer: [["#37A2DA", "#ffd85c", "#fd7b5f"], ["#37A2DA", "#67E0E3", "#FFDB5C", "#ff9f7f", "#E062AE", "#9d96f5"], ["#37A2DA", "#32C5E9", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#e7bcf3", "#8378EA", "#96BFFF"], z_] },R_ = "#eee",N_ = function N_() {return { axisLine: { lineStyle: { color: R_ } }, axisTick: { lineStyle: { color: R_ } }, axisLabel: { textStyle: { color: R_ } }, splitLine: { lineStyle: { type: "dashed", color: "#aaa" } }, splitArea: { areaStyle: { color: R_ } } };},F_ = ["#dd6b66", "#759aa0", "#e69d87", "#8dc1a9", "#ea7e53", "#eedd78", "#73a373", "#73b9bc", "#7289ab", "#91ca8c", "#f49f42"],H_ = { color: F_, backgroundColor: "#333", tooltip: { axisPointer: { lineStyle: { color: R_ }, crossStyle: { color: R_ }, label: { color: "#000" } } }, legend: { textStyle: { color: R_ } }, textStyle: { color: R_ }, title: { textStyle: { color: R_ } }, toolbox: { iconStyle: { normal: { borderColor: R_ } } }, dataZoom: { textStyle: { color: R_ } }, visualMap: { textStyle: { color: R_ } }, timeline: { lineStyle: { color: R_ }, itemStyle: { normal: { color: F_[1] } }, label: { normal: { textStyle: { color: R_ } } }, controlStyle: { normal: { color: R_, borderColor: R_ } } }, timeAxis: N_(), logAxis: N_(), valueAxis: N_(), categoryAxis: N_(), line: { symbol: "circle" }, graph: { color: F_ }, gauge: { title: { textStyle: { color: R_ } } }, candlestick: { itemStyle: { normal: { color: "#FD1050", color0: "#0CF49B", borderColor: "#FD1050", borderColor0: "#0CF49B" } } } };H_.categoryAxis.splitLine.show = !1, Iy.extend({ type: "dataset", defaultOption: { seriesLayoutBy: Ry, sourceHeader: null, dimensions: null, source: null }, optionUpdated: function optionUpdated() {is(this);} }), p_.extend({ type: "dataset" });var V_ = to.extend({ type: "ellipse", shape: { cx: 0, cy: 0, rx: 0, ry: 0 }, buildPath: function buildPath(t, e) {var n = .5522848,i = e.cx,r = e.cy,o = e.rx,a = e.ry,s = o * n,l = a * n;t.moveTo(i - o, r), t.bezierCurveTo(i - o, r - l, i - s, r - a, i, r - a), t.bezierCurveTo(i + s, r - a, i + o, r - l, i + o, r), t.bezierCurveTo(i + o, r + l, i + s, r + a, i, r + a), t.bezierCurveTo(i - s, r + a, i - o, r + l, i - o, r), t.closePath();} }),G_ = /[\s,]+/;Pl.prototype.parse = function (t, e) {e = e || {};var n = Al(t);if (!n) throw new Error("Illegal svg");var i = new ig();this._root = i;var r = n.getAttribute("viewBox") || "",o = parseFloat(n.getAttribute("width") || e.width),a = parseFloat(n.getAttribute("height") || e.height);isNaN(o) && (o = null), isNaN(a) && (a = null), zl(n, i, null, !0);for (var s = n.firstChild; s;) {this._parseNode(s, i), s = s.nextSibling;}var l, u;if (r) {var h = B(r).split(G_);h.length >= 4 && (l = { x: parseFloat(h[0] || 0), y: parseFloat(h[1] || 0), width: parseFloat(h[2]), height: parseFloat(h[3]) });}if (l && null != o && null != a && (u = Fl(l, o, a), !e.ignoreViewBox)) {var c = i;i = new ig(), i.add(c), c.scale = u.scale.slice(), c.position = u.position.slice();}return e.ignoreRootClip || null == o || null == a || i.setClipPath(new Am({ shape: { x: 0, y: 0, width: o, height: a } })), { root: i, width: o, height: a, viewBoxRect: l, viewBoxTransform: u };}, Pl.prototype._parseNode = function (t, e) {var n = t.nodeName.toLowerCase();"defs" === n ? this._isDefine = !0 : "text" === n && (this._isText = !0);var i;if (this._isDefine) {var r = X_[n];if (r) {var o = r.call(this, t),a = t.getAttribute("id");a && (this._defs[a] = o);}} else {var r = W_[n];r && (i = r.call(this, t, e), e.add(i));}for (var s = t.firstChild; s;) {1 === s.nodeType && this._parseNode(s, i), 3 === s.nodeType && this._isText && this._parseText(s, i), s = s.nextSibling;}"defs" === n ? this._isDefine = !1 : "text" === n && (this._isText = !1);}, Pl.prototype._parseText = function (t, e) {if (1 === t.nodeType) {var n = t.getAttribute("dx") || 0,i = t.getAttribute("dy") || 0;this._textX += parseFloat(n), this._textY += parseFloat(i);}var r = new ym({ style: { text: t.textContent, transformText: !0 }, position: [this._textX || 0, this._textY || 0] });Ll(e, r), zl(t, r, this._defs);var o = r.style.fontSize;o && 9 > o && (r.style.fontSize = 9, r.scale = r.scale || [1, 1], r.scale[0] *= o / 9, r.scale[1] *= o / 9);var a = r.getBoundingRect();return this._textX += a.width, e.add(r), r;};var W_ = { g: function g(t, e) {var n = new ig();return Ll(e, n), zl(t, n, this._defs), n;}, rect: function rect(t, e) {var n = new Am();return Ll(e, n), zl(t, n, this._defs), n.setShape({ x: parseFloat(t.getAttribute("x") || 0), y: parseFloat(t.getAttribute("y") || 0), width: parseFloat(t.getAttribute("width") || 0), height: parseFloat(t.getAttribute("height") || 0) }), n;}, circle: function circle(t, e) {var n = new _m();return Ll(e, n), zl(t, n, this._defs), n.setShape({ cx: parseFloat(t.getAttribute("cx") || 0), cy: parseFloat(t.getAttribute("cy") || 0), r: parseFloat(t.getAttribute("r") || 0) }), n;}, line: function line(t, e) {var n = new Om();return Ll(e, n), zl(t, n, this._defs), n.setShape({ x1: parseFloat(t.getAttribute("x1") || 0), y1: parseFloat(t.getAttribute("y1") || 0), x2: parseFloat(t.getAttribute("x2") || 0), y2: parseFloat(t.getAttribute("y2") || 0) }), n;}, ellipse: function ellipse(t, e) {var n = new V_();return Ll(e, n), zl(t, n, this._defs), n.setShape({ cx: parseFloat(t.getAttribute("cx") || 0), cy: parseFloat(t.getAttribute("cy") || 0), rx: parseFloat(t.getAttribute("rx") || 0), ry: parseFloat(t.getAttribute("ry") || 0) }), n;}, polygon: function polygon(t, e) {var n = t.getAttribute("points");n && (n = Bl(n));var i = new Im({ shape: { points: n || [] } });return Ll(e, i), zl(t, i, this._defs), i;}, polyline: function polyline(t, e) {var n = new to();Ll(e, n), zl(t, n, this._defs);var i = t.getAttribute("points");i && (i = Bl(i));var r = new Tm({ shape: { points: i || [] } });return r;}, image: function image(t, e) {var n = new Ti();return Ll(e, n), zl(t, n, this._defs), n.setStyle({ image: t.getAttribute("xlink:href"), x: t.getAttribute("x"), y: t.getAttribute("y"), width: t.getAttribute("width"), height: t.getAttribute("height") }), n;}, text: function text(t, e) {var n = t.getAttribute("x") || 0,i = t.getAttribute("y") || 0,r = t.getAttribute("dx") || 0,o = t.getAttribute("dy") || 0;this._textX = parseFloat(n) + parseFloat(r), this._textY = parseFloat(i) + parseFloat(o);var a = new ig();return Ll(e, a), zl(t, a, this._defs), a;}, tspan: function tspan(t, e) {var n = t.getAttribute("x"),i = t.getAttribute("y");null != n && (this._textX = parseFloat(n)), null != i && (this._textY = parseFloat(i));var r = t.getAttribute("dx") || 0,o = t.getAttribute("dy") || 0,a = new ig();return Ll(e, a), zl(t, a, this._defs), this._textX += r, this._textY += o, a;}, path: function path(t, e) {var n = t.getAttribute("d") || "",i = ro(n);return Ll(e, i), zl(t, i, this._defs), i;
    } },X_ = { lineargradient: function lineargradient(t) {var e = parseInt(t.getAttribute("x1") || 0, 10),n = parseInt(t.getAttribute("y1") || 0, 10),i = parseInt(t.getAttribute("x2") || 10, 10),r = parseInt(t.getAttribute("y2") || 0, 10),o = new Nm(e, n, i, r);return Ol(t, o), o;}, radialgradient: function radialgradient() {} },Y_ = { fill: "fill", stroke: "stroke", "stroke-width": "lineWidth", opacity: "opacity", "fill-opacity": "fillOpacity", "stroke-opacity": "strokeOpacity", "stroke-dasharray": "lineDash", "stroke-dashoffset": "lineDashOffset", "stroke-linecap": "lineCap", "stroke-linejoin": "lineJoin", "stroke-miterlimit": "miterLimit", "font-family": "fontFamily", "font-size": "fontSize", "font-style": "fontStyle", "font-weight": "fontWeight", "text-align": "textAlign", "alignment-baseline": "textBaseline" },U_ = /url\(\s*#(.*?)\)/,j_ = /(translate|scale|rotate|skewX|skewY|matrix)\(([\-\s0-9\.e,]*)\)/g,q_ = /([^\s:;]+)\s*:\s*([^:;]+)/g,Z_ = N(),K_ = { registerMap: function registerMap(t, e, n) {var i;return x(e) ? i = e : e.svg ? i = [{ type: "svg", source: e.svg, specialAreas: e.specialAreas }] : (e.geoJson && !e.features && (n = e.specialAreas, e = e.geoJson), i = [{ type: "geoJSON", source: e, specialAreas: n }]), f(i, function (t) {var e = t.type;"geoJson" === e && (e = t.type = "geoJSON");var n = $_[e];n(t);}), Z_.set(t, i);}, retrieveMap: function retrieveMap(t) {return Z_.get(t);} },$_ = { geoJSON: function geoJSON(t) {var e = t.source;t.geoJSON = b(e) ? "undefined" != typeof JSON && JSON.parse ? JSON.parse(e) : new Function("return (" + e + ");")() : e;}, svg: function svg(t) {t.svgXML = Al(t.source);} },Q_ = L,J_ = f,tx = w,ex = S,nx = Iy.parseClassType,ix = "4.9.0",rx = { zrender: "4.3.2" },ox = 1,ax = 1e3,sx = 800,lx = 900,ux = 5e3,hx = 1e3,cx = 1100,dx = 2e3,fx = 3e3,px = 3500,gx = 4e3,vx = 5e3,mx = { PROCESSOR: { FILTER: ax, SERIES_FILTER: sx, STATISTIC: ux }, VISUAL: { LAYOUT: hx, PROGRESSIVE_LAYOUT: cx, GLOBAL: dx, CHART: fx, POST_CHART_LAYOUT: px, COMPONENT: gx, BRUSH: vx } },yx = "__flagInMainProcess",_x = "__optionUpdated",xx = /^[a-zA-Z0-9_]+$/;Vl.prototype.on = Hl("on", !0), Vl.prototype.off = Hl("off", !0), Vl.prototype.one = Hl("one", !0), c(Vl, cp);var bx = Gl.prototype;bx._onframe = function () {if (!this._disposed) {var t = this._scheduler;if (this[_x]) {var e = this[_x].silent;this[yx] = !0, Xl(this), Sx.update.call(this), this[yx] = !1, this[_x] = !1, ql.call(this, e), Zl.call(this, e);} else if (t.unfinished) {var n = ox,i = this._model,r = this._api;t.unfinished = !1;do {var o = +new Date();t.performSeriesTasks(i), t.performDataProcessorTasks(i), Ul(this, i), t.performVisualTasks(i), eu(this, this._model, r, "remain"), n -= +new Date() - o;} while (n > 0 && t.unfinished);t.unfinished || this._zr.flush();}}}, bx.getDom = function () {return this._dom;}, bx.getZr = function () {return this._zr;}, bx.setOption = function (t, e, n) {if (!this._disposed) {var i;if (ex(e) && (n = e.lazyUpdate, i = e.silent, e = e.notMerge), this[yx] = !0, !this._model || e) {var r = new Ms(this._api),o = this._theme,a = this._model = new Gy();a.scheduler = this._scheduler, a.init(null, null, o, r);}this._model.setOption(t, kx), n ? (this[_x] = { silent: i }, this[yx] = !1) : (Xl(this), Sx.update.call(this), this._zr.flush(), this[_x] = !1, this[yx] = !1, ql.call(this, i), Zl.call(this, i));}}, bx.setTheme = function () {console.error("ECharts#setTheme() is DEPRECATED in ECharts 3.0");}, bx.getModel = function () {return this._model;}, bx.getOption = function () {return this._model && this._model.getOption();}, bx.getWidth = function () {return this._zr.getWidth();}, bx.getHeight = function () {return this._zr.getHeight();}, bx.getDevicePixelRatio = function () {return this._zr.painter.dpr || window.devicePixelRatio || 1;}, bx.getRenderedCanvas = function (t) {if (Wf.canvasSupported) {t = t || {}, t.pixelRatio = t.pixelRatio || 1, t.backgroundColor = t.backgroundColor || this._model.get("backgroundColor");var e = this._zr;return e.painter.getRenderedCanvas(t);}}, bx.getSvgDataURL = function () {if (Wf.svgSupported) {var t = this._zr,e = t.storage.getDisplayList();return f(e, function (t) {t.stopAnimation(!0);}), t.painter.toDataURL();}}, bx.getDataURL = function (t) {if (!this._disposed) {t = t || {};var e = t.excludeComponents,n = this._model,i = [],r = this;J_(e, function (t) {n.eachComponent({ mainType: t }, function (t) {var e = r._componentsMap[t.__viewId];e.group.ignore || (i.push(e), e.group.ignore = !0);});});var o = "svg" === this._zr.painter.getType() ? this.getSvgDataURL() : this.getRenderedCanvas(t).toDataURL("image/" + (t && t.type || "png"));return J_(i, function (t) {t.group.ignore = !1;}), o;}}, bx.getConnectedDataURL = function (t) {if (!this._disposed && Wf.canvasSupported) {var e = "svg" === t.type,n = this.group,r = Math.min,o = Math.max,a = 1 / 0;if (Bx[n]) {var s = a,l = a,u = -a,h = -a,c = [],d = t && t.pixelRatio || 1;f(Lx, function (a) {if (a.group === n) {var d = e ? a.getZr().painter.getSvgDom().innerHTML : a.getRenderedCanvas(i(t)),f = a.getDom().getBoundingClientRect();s = r(f.left, s), l = r(f.top, l), u = o(f.right, u), h = o(f.bottom, h), c.push({ dom: d, left: f.left, top: f.top });}}), s *= d, l *= d, u *= d, h *= d;var p = u - s,g = h - l,v = tp(),m = qi(v, { renderer: e ? "svg" : "canvas" });if (m.resize({ width: p, height: g }), e) {var y = "";return J_(c, function (t) {var e = t.left - s,n = t.top - l;y += '<g transform="translate(' + e + "," + n + ')">' + t.dom + "</g>";}), m.painter.getSvgRoot().innerHTML = y, t.connectedBackgroundColor && m.painter.setBackgroundColor(t.connectedBackgroundColor), m.refreshImmediately(), m.painter.toDataURL();}return t.connectedBackgroundColor && m.add(new Am({ shape: { x: 0, y: 0, width: p, height: g }, style: { fill: t.connectedBackgroundColor } })), J_(c, function (t) {var e = new Ti({ style: { x: t.left * d - s, y: t.top * d - l, image: t.dom } });m.add(e);}), m.refreshImmediately(), v.toDataURL("image/" + (t && t.type || "png"));}return this.getDataURL(t);}}, bx.convertToPixel = _(Wl, "convertToPixel"), bx.convertFromPixel = _(Wl, "convertFromPixel"), bx.containPixel = function (t, e) {if (!this._disposed) {var n,i = this._model;return t = ur(i, t), f(t, function (t, i) {i.indexOf("Models") >= 0 && f(t, function (t) {var r = t.coordinateSystem;if (r && r.containPoint) n |= !!r.containPoint(e);else if ("seriesModels" === i) {var o = this._chartsMap[t.__viewId];o && o.containPoint && (n |= o.containPoint(e, t));}}, this);}, this), !!n;}}, bx.getVisual = function (t, e) {var n = this._model;t = ur(n, t, { defaultMainType: "series" });var i = t.seriesModel,r = i.getData(),o = t.hasOwnProperty("dataIndexInside") ? t.dataIndexInside : t.hasOwnProperty("dataIndex") ? r.indexOfRawIndex(t.dataIndex) : null;return null != o ? r.getItemVisual(o, e) : r.getVisual(e);}, bx.getViewOfComponentModel = function (t) {return this._componentsMap[t.__viewId];}, bx.getViewOfSeriesModel = function (t) {return this._chartsMap[t.__viewId];};var Sx = { prepareAndUpdate: function prepareAndUpdate(t) {Xl(this), Sx.update.call(this, t);}, update: function update(t) {var e = this._model,n = this._api,i = this._zr,r = this._coordSysMgr,o = this._scheduler;if (e) {o.restoreData(e, t), o.performSeriesTasks(e), r.create(e, n), o.performDataProcessorTasks(e, t), Ul(this, e), r.update(e, n), Ql(e), o.performVisualTasks(e, t), Jl(this, e, n, t);var a = e.get("backgroundColor") || "transparent";if (Wf.canvasSupported) i.setBackgroundColor(a);else {var s = Je(a);a = un(s, "rgb"), 0 === s[3] && (a = "transparent");}nu(e, n);}}, updateTransform: function updateTransform(t) {var e = this._model,n = this,i = this._api;if (e) {var r = [];e.eachComponent(function (o, a) {var s = n.getViewOfComponentModel(a);if (s && s.__alive) if (s.updateTransform) {var l = s.updateTransform(a, e, i, t);l && l.update && r.push(s);} else r.push(s);});var o = N();e.eachSeries(function (r) {var a = n._chartsMap[r.__viewId];if (a.updateTransform) {var s = a.updateTransform(r, e, i, t);s && s.update && o.set(r.uid, 1);} else o.set(r.uid, 1);}), Ql(e), this._scheduler.performVisualTasks(e, t, { setDirty: !0, dirtyMap: o }), eu(n, e, i, t, o), nu(e, this._api);}}, updateView: function updateView(t) {var e = this._model;e && (ll.markUpdateMethod(t, "updateView"), Ql(e), this._scheduler.performVisualTasks(e, t, { setDirty: !0 }), Jl(this, this._model, this._api, t), nu(e, this._api));}, updateVisual: function updateVisual(t) {Sx.update.call(this, t);}, updateLayout: function updateLayout(t) {Sx.update.call(this, t);} };bx.resize = function (t) {if (!this._disposed) {this._zr.resize(t);var e = this._model;if (this._loadingFX && this._loadingFX.resize(), e) {var n = e.resetOption("media"),i = t && t.silent;this[yx] = !0, n && Xl(this), Sx.update.call(this), this[yx] = !1, ql.call(this, i), Zl.call(this, i);}}}, bx.showLoading = function (t, e) {if (!this._disposed && (ex(t) && (e = t, t = ""), t = t || "default", this.hideLoading(), Ox[t])) {var n = Ox[t](this._api, e),i = this._zr;this._loadingFX = n, i.add(n);}}, bx.hideLoading = function () {this._disposed || (this._loadingFX && this._zr.remove(this._loadingFX), this._loadingFX = null);}, bx.makeActionFromEvent = function (t) {var e = a({}, t);return e.type = Ix[t.type], e;}, bx.dispatchAction = function (t, e) {if (!this._disposed && (ex(e) || (e = { silent: !!e }), Cx[t.type] && this._model)) {if (this[yx]) return void this._pendingActions.push(t);jl.call(this, t, e.silent), e.flush ? this._zr.flush(!0) : e.flush !== !1 && Wf.browser.weChat && this._throttledZrFlush(), ql.call(this, e.silent), Zl.call(this, e.silent);}}, bx.appendData = function (t) {if (!this._disposed) {var e = t.seriesIndex,n = this.getModel(),i = n.getSeriesByIndex(e);i.appendData(t), this._scheduler.unfinished = !0;}}, bx.on = Hl("on", !1), bx.off = Hl("off", !1), bx.one = Hl("one", !1);var Mx = ["click", "dblclick", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "globalout", "contextmenu"];bx._initEvents = function () {J_(Mx, function (t) {var e = function e(_e3) {var n,i = this.getModel(),r = _e3.target,o = "globalout" === t;if (o) n = {};else if (r && null != r.dataIndex) {var s = r.dataModel || i.getSeriesByIndex(r.seriesIndex);n = s && s.getDataParams(r.dataIndex, r.dataType, r) || {};} else r && r.eventData && (n = a({}, r.eventData));if (n) {var l = n.componentType,u = n.componentIndex;("markLine" === l || "markPoint" === l || "markArea" === l) && (l = "series", u = n.seriesIndex);var h = l && null != u && i.getComponent(l, u),c = h && this["series" === h.mainType ? "_chartsMap" : "_componentsMap"][h.__viewId];n.event = _e3, n.type = t, this._ecEventProcessor.eventInfo = { targetEl: r, packedEvent: n, model: h, view: c }, this.trigger(t, n);}};e.zrEventfulCallAtLast = !0, this._zr.on(t, e, this);}, this), J_(Ix, function (t, e) {this._messageCenter.on(e, function (t) {this.trigger(e, t);}, this);}, this);}, bx.isDisposed = function () {return this._disposed;}, bx.clear = function () {this._disposed || this.setOption({ series: [] }, !0);}, bx.dispose = function () {if (!this._disposed) {this._disposed = !0, cr(this.getDom(), Rx, "");var t = this._api,e = this._model;J_(this._componentsViews, function (n) {n.dispose(e, t);}), J_(this._chartsViews, function (n) {n.dispose(e, t);}), this._zr.dispose(), delete Lx[this.id];}}, c(Gl, cp), su.prototype = { constructor: su, normalizeQuery: function normalizeQuery(t) {var e = {},n = {},i = {};if (b(t)) {var r = nx(t);e.mainType = r.main || null, e.subType = r.sub || null;} else {var o = ["Index", "Name", "Id"],a = { name: 1, dataIndex: 1, dataType: 1 };f(t, function (t, r) {for (var s = !1, l = 0; l < o.length; l++) {var u = o[l],h = r.lastIndexOf(u);if (h > 0 && h === r.length - u.length) {var c = r.slice(0, h);"data" !== c && (e.mainType = c, e[u.toLowerCase()] = t, s = !0);}}a.hasOwnProperty(r) && (n[r] = t, s = !0), s || (i[r] = t);});}return { cptQuery: e, dataQuery: n, otherQuery: i };}, filter: function filter(t, e) {function n(t, e, n, i) {return null == t[n] || e[i || n] === t[n];}var i = this.eventInfo;if (!i) return !0;var r = i.targetEl,o = i.packedEvent,a = i.model,s = i.view;if (!a || !s) return !0;var l = e.cptQuery,u = e.dataQuery;return n(l, a, "mainType") && n(l, a, "subType") && n(l, a, "index", "componentIndex") && n(l, a, "name") && n(l, a, "id") && n(u, o, "name") && n(u, o, "dataIndex") && n(u, o, "dataType") && (!s.filterForExposedEvent || s.filterForExposedEvent(t, e.otherQuery, r, o));}, afterTrigger: function afterTrigger() {this.eventInfo = null;} };var Cx = {},Ix = {},Tx = [],kx = [],Dx = [],Ax = [],Px = {},Ox = {},Lx = {},Bx = {},zx = new Date() - 0,Ex = new Date() - 0,Rx = "_echarts_instance_",Nx = cu;Su(dx, M_), vu(n_), mu(lx, i_), Cu("default", k_), _u({ type: "highlight", event: "highlight", update: "highlight" }, H), _u({ type: "downplay", event: "downplay", update: "downplay" }, H), gu("light", E_), gu("dark", H_);var Fx = {};Bu.prototype = { constructor: Bu, add: function add(t) {return this._add = t, this;}, update: function update(t) {return this._update = t, this;}, remove: function remove(t) {return this._remove = t, this;}, execute: function execute() {var t,e = this._old,n = this._new,i = {},r = {},o = [],a = [];for (zu(e, i, o, "_oldKeyGetter", this), zu(n, r, a, "_newKeyGetter", this), t = 0; t < e.length; t++) {var s = o[t],l = r[s];if (null != l) {var u = l.length;u ? (1 === u && (r[s] = null), l = l.shift()) : r[s] = null, this._update && this._update(l, t);} else this._remove && this._remove(t);}for (var t = 0; t < a.length; t++) {var s = a[t];if (r.hasOwnProperty(s)) {var l = r[s];if (null == l) continue;if (l.length) for (var h = 0, u = l.length; u > h; h++) {this._add && this._add(l[h]);} else this._add && this._add(l);}}} };var Hx = N(["tooltip", "label", "itemName", "itemId", "seriesName"]),Vx = S,Gx = "undefined",Wx = -1,Xx = "e\x00\x00",Yx = { "float": typeof Float64Array === Gx ? Array : Float64Array, "int": typeof Int32Array === Gx ? Array : Int32Array, ordinal: Array, number: Array, time: Array },Ux = typeof Uint32Array === Gx ? Array : Uint32Array,jx = typeof Int32Array === Gx ? Array : Int32Array,qx = typeof Uint16Array === Gx ? Array : Uint16Array,Zx = ["hasItemOption", "_nameList", "_idList", "_invertedIndicesMap", "_rawData", "_chunkSize", "_chunkCount", "_dimValueGetter", "_count", "_rawCount", "_nameDimIdx", "_idDimIdx"],Kx = ["_extent", "_approximateExtent", "_rawExtent"],$x = function $x(t, e) {t = t || ["x", "y"];for (var n = {}, i = [], r = {}, o = 0; o < t.length; o++) {var a = t[o];b(a) ? a = new Hu({ name: a }) : a instanceof Hu || (a = new Hu(a));var s = a.name;a.type = a.type || "float", a.coordDim || (a.coordDim = s, a.coordDimIndex = 0), a.otherDims = a.otherDims || {}, i.push(s), n[s] = a, a.index = o, a.createInvertedIndices && (r[s] = []);}this.dimensions = i, this._dimensionInfos = n, this.hostModel = e, this.dataType, this._indices = null, this._count = 0, this._rawCount = 0, this._storage = {}, this._nameList = [], this._idList = [], this._optionModels = [], this._visual = {}, this._layout = {}, this._itemVisuals = [], this.hasItemVisual = {}, this._itemLayouts = [], this._graphicEls = [], this._chunkSize = 1e5, this._chunkCount = 0, this._rawData, this._rawExtent = {}, this._extent = {}, this._approximateExtent = {}, this._dimensionsSummary = Eu(this), this._invertedIndicesMap = r, this._calculationInfo = {}, this.userOutput = this._dimensionsSummary.userOutput;},Qx = $x.prototype;Qx.type = "list", Qx.hasItemOption = !0, Qx.getDimension = function (t) {return ("number" == typeof t || !isNaN(t) && !this._dimensionInfos.hasOwnProperty(t)) && (t = this.dimensions[t]), t;}, Qx.getDimensionInfo = function (t) {return this._dimensionInfos[this.getDimension(t)];}, Qx.getDimensionsOnCoord = function () {return this._dimensionsSummary.dataDimsOnCoord.slice();}, Qx.mapDimension = function (t, e) {var n = this._dimensionsSummary;if (null == e) return n.encodeFirstDimNotExtra[t];var i = n.encode[t];return e === !0 ? (i || []).slice() : i && i[e];}, Qx.initData = function (t, e, n) {var i = ns.isInstance(t) || d(t);i && (t = new Gs(t, this.dimensions.length)), this._rawData = t, this._storage = {}, this._indices = null, this._nameList = e || [], this._idList = [], this._nameRepeatCount = {}, n || (this.hasItemOption = !1), this.defaultDimValueGetter = s_[this._rawData.getSource().sourceFormat], this._dimValueGetter = n = n || this.defaultDimValueGetter, this._dimValueGetterArrayRows = s_.arrayRows, this._rawExtent = {}, this._initDataFromProvider(0, t.count()), t.pure && (this.hasItemOption = !1);}, Qx.getProvider = function () {return this._rawData;}, Qx.appendData = function (t) {var e = this._rawData,n = this.count();e.appendData(t);var i = e.count();e.persistent || (i += n), this._initDataFromProvider(n, i);}, Qx.appendValues = function (t, e) {for (var n = this._chunkSize, i = this._storage, r = this.dimensions, o = r.length, a = this._rawExtent, s = this.count(), l = s + Math.max(t.length, e ? e.length : 0), u = this._chunkCount, h = 0; o > h; h++) {var c = r[h];a[c] || (a[c] = Ju()), i[c] || (i[c] = []), Xu(i, this._dimensionInfos[c], n, u, l), this._chunkCount = i[c].length;}for (var d = new Array(o), f = s; l > f; f++) {for (var p = f - s, g = Math.floor(f / n), v = f % n, m = 0; o > m; m++) {var c = r[m],y = this._dimValueGetterArrayRows(t[p] || d, c, p, m);i[c][g][v] = y;var _ = a[c];y < _[0] && (_[0] = y), y > _[1] && (_[1] = y);}e && (this._nameList[f] = e[p]);}this._rawCount = this._count = l, this._extent = {}, Yu(this);}, Qx._initDataFromProvider = function (t, e) {if (!(t >= e)) {for (var n, i = this._chunkSize, r = this._rawData, o = this._storage, a = this.dimensions, s = a.length, l = this._dimensionInfos, u = this._nameList, h = this._idList, c = this._rawExtent, d = this._nameRepeatCount = {}, f = this._chunkCount, p = 0; s > p; p++) {var g = a[p];c[g] || (c[g] = Ju());var v = l[g];0 === v.otherDims.itemName && (n = this._nameDimIdx = p), 0 === v.otherDims.itemId && (this._idDimIdx = p), o[g] || (o[g] = []), Xu(o, v, i, f, e), this._chunkCount = o[g].length;}for (var m = new Array(s), y = t; e > y; y++) {m = r.getItem(y, m);for (var _ = Math.floor(y / i), x = y % i, w = 0; s > w; w++) {var g = a[w],b = o[g][_],S = this._dimValueGetter(m, g, y, w);b[x] = S;var M = c[g];S < M[0] && (M[0] = S), S > M[1] && (M[1] = S);}if (!r.pure) {var C = u[y];if (m && null == C) if (null != m.name) u[y] = C = m.name;else if (null != n) {var I = a[n],T = o[I][_];if (T) {C = T[x];var k = l[I].ordinalMeta;k && k.categories.length && (C = k.categories[C]);}}var D = null == m ? null : m.id;null == D && null != C && (d[C] = d[C] || 0, D = C, d[C] > 0 && (D += "__ec__" + d[C]), d[C]++), null != D && (h[y] = D);}}!r.persistent && r.clean && r.clean(), this._rawCount = this._count = e, this._extent = {}, Yu(this);}}, Qx.count = function () {return this._count;}, Qx.getIndices = function () {var t,e = this._indices;if (e) {var n = e.constructor,i = this._count;if (n === Array) {t = new n(i);for (var r = 0; i > r; r++) {t[r] = e[r];}} else t = new n(e.buffer, 0, i);} else for (var n = Vu(this), t = new n(this.count()), r = 0; r < t.length; r++) {t[r] = r;}return t;}, Qx.get = function (t, e) {if (!(e >= 0 && e < this._count)) return 0 / 0;var n = this._storage;if (!n[t]) return 0 / 0;e = this.getRawIndex(e);var i = Math.floor(e / this._chunkSize),r = e % this._chunkSize,o = n[t][i],a = o[r];return a;}, Qx.getByRawIndex = function (t, e) {if (!(e >= 0 && e < this._rawCount)) return 0 / 0;var n = this._storage[t];if (!n) return 0 / 0;var i = Math.floor(e / this._chunkSize),r = e % this._chunkSize,o = n[i];return o[r];}, Qx._getFast = function (t, e) {var n = Math.floor(e / this._chunkSize),i = e % this._chunkSize,r = this._storage[t][n];return r[i];}, Qx.getValues = function (t, e) {var n = [];x(t) || (e = t, t = this.dimensions);for (var i = 0, r = t.length; r > i; i++) {n.push(this.get(t[i], e));}return n;}, Qx.hasValue = function (t) {for (var e = this._dimensionsSummary.dataDimsOnCoord, n = 0, i = e.length; i > n; n++) {if (isNaN(this.get(e[n], t))) return !1;}return !0;}, Qx.getDataExtent = function (t) {t = this.getDimension(t);var e = this._storage[t],n = Ju();if (!e) return n;var i,r = this.count(),o = !this._indices;if (o) return this._rawExtent[t].slice();if (i = this._extent[t]) return i.slice();i = n;for (var a = i[0], s = i[1], l = 0; r > l; l++) {var u = this._getFast(t, this.getRawIndex(l));a > u && (a = u), u > s && (s = u);}return i = [a, s], this._extent[t] = i, i;}, Qx.getApproximateExtent = function (t) {return t = this.getDimension(t), this._approximateExtent[t] || this.getDataExtent(t);}, Qx.setApproximateExtent = function (t, e) {e = this.getDimension(e), this._approximateExtent[e] = t.slice();}, Qx.getCalculationInfo = function (t) {return this._calculationInfo[t];}, Qx.setCalculationInfo = function (t, e) {Vx(t) ? a(this._calculationInfo, t) : this._calculationInfo[t] = e;}, Qx.getSum = function (t) {var e = this._storage[t],n = 0;if (e) for (var i = 0, r = this.count(); r > i; i++) {var o = this.get(t, i);isNaN(o) || (n += o);}return n;}, Qx.getMedian = function (t) {var e = [];this.each(t, function (t) {isNaN(t) || e.push(t);});var n = [].concat(e).sort(function (t, e) {return t - e;}),i = this.count();return 0 === i ? 0 : i % 2 === 1 ? n[(i - 1) / 2] : (n[i / 2] + n[i / 2 - 1]) / 2;}, Qx.rawIndexOf = function (t, e) {var n = t && this._invertedIndicesMap[t],i = n[e];return null == i || isNaN(i) ? Wx : i;}, Qx.indexOfName = function (t) {for (var e = 0, n = this.count(); n > e; e++) {if (this.getName(e) === t) return e;}return -1;}, Qx.indexOfRawIndex = function (t) {if (t >= this._rawCount || 0 > t) return -1;if (!this._indices) return t;var e = this._indices,n = e[t];if (null != n && n < this._count && n === t) return t;for (var i = 0, r = this._count - 1; r >= i;) {var o = (i + r) / 2 | 0;if (e[o] < t) i = o + 1;else {if (!(e[o] > t)) return o;r = o - 1;}}return -1;}, Qx.indicesOfNearest = function (t, e, n) {var i = this._storage,r = i[t],o = [];if (!r) return o;null == n && (n = 1 / 0);for (var a = 1 / 0, s = -1, l = 0, u = 0, h = this.count(); h > u; u++) {var c = e - this.get(t, u),d = Math.abs(c);n >= d && ((a > d || d === a && c >= 0 && 0 > s) && (a = d, s = c, l = 0), c === s && (o[l++] = u));}return o.length = l, o;}, Qx.getRawIndex = ju, Qx.getRawDataItem = function (t) {if (this._rawData.persistent) return this._rawData.getItem(this.getRawIndex(t));for (var e = [], n = 0; n < this.dimensions.length; n++) {var i = this.dimensions[n];e.push(this.get(i, t));}return e;}, Qx.getName = function (t) {var e = this.getRawIndex(t);return this._nameList[e] || Uu(this, this._nameDimIdx, e) || "";}, Qx.getId = function (t) {return Zu(this, this.getRawIndex(t));}, Qx.each = function (t, e, n, i) {if (this._count) {"function" == typeof t && (i = n, n = e, e = t, t = []), n = n || i || this, t = p(Ku(t), this.getDimension, this);for (var r = t.length, o = 0; o < this.count(); o++) {switch (r) {case 0:e.call(n, o);break;case 1:e.call(n, this.get(t[0], o), o);break;case 2:e.call(n, this.get(t[0], o), this.get(t[1], o), o);break;default:for (var a = 0, s = []; r > a; a++) {s[a] = this.get(t[a], o);}s[a] = o, e.apply(n, s);}}}}, Qx.filterSelf = function (t, e, n, i) {if (this._count) {"function" == typeof t && (i = n, n = e, e = t, t = []), n = n || i || this, t = p(Ku(t), this.getDimension, this);for (var r = this.count(), o = Vu(this), a = new o(r), s = [], l = t.length, u = 0, h = t[0], c = 0; r > c; c++) {var d,f = this.getRawIndex(c);if (0 === l) d = e.call(n, c);else if (1 === l) {var g = this._getFast(h, f);d = e.call(n, g, c);} else {for (var v = 0; l > v; v++) {s[v] = this._getFast(h, f);}s[v] = c, d = e.apply(n, s);}d && (a[u++] = f);}return r > u && (this._indices = a), this._count = u, this._extent = {}, this.getRawIndex = this._indices ? qu : ju, this;}}, Qx.selectRange = function (t) {if (this._count) {var e = [];for (var n in t) {t.hasOwnProperty(n) && e.push(n);}var i = e.length;if (i) {var r = this.count(),o = Vu(this),a = new o(r),s = 0,l = e[0],u = t[l][0],h = t[l][1],c = !1;if (!this._indices) {var d = 0;if (1 === i) {for (var f = this._storage[e[0]], p = 0; p < this._chunkCount; p++) {for (var g = f[p], v = Math.min(this._count - p * this._chunkSize, this._chunkSize), m = 0; v > m; m++) {var y = g[m];(y >= u && h >= y || isNaN(y)) && (a[s++] = d), d++;}}c = !0;} else if (2 === i) {for (var f = this._storage[l], _ = this._storage[e[1]], x = t[e[1]][0], w = t[e[1]][1], p = 0; p < this._chunkCount; p++) {for (var g = f[p], b = _[p], v = Math.min(this._count - p * this._chunkSize, this._chunkSize), m = 0; v > m; m++) {var y = g[m],S = b[m];(y >= u && h >= y || isNaN(y)) && (S >= x && w >= S || isNaN(S)) && (a[s++] = d), d++;}}c = !0;}}if (!c) if (1 === i) for (var m = 0; r > m; m++) {var M = this.getRawIndex(m),y = this._getFast(l, M);(y >= u && h >= y || isNaN(y)) && (a[s++] = M);} else for (var m = 0; r > m; m++) {for (var C = !0, M = this.getRawIndex(m), p = 0; i > p; p++) {var I = e[p],y = this._getFast(n, M);(y < t[I][0] || y > t[I][1]) && (C = !1);}C && (a[s++] = this.getRawIndex(m));}return r > s && (this._indices = a), this._count = s, this._extent = {}, this.getRawIndex = this._indices ? qu : ju, this;}}}, Qx.mapArray = function (t, e, n, i) {"function" == typeof t && (i = n, n = e, e = t, t = []), n = n || i || this;var r = [];return this.each(t, function () {r.push(e && e.apply(this, arguments));}, n), r;}, Qx.map = function (t, e, n, i) {n = n || i || this, t = p(Ku(t), this.getDimension, this);var r = $u(this, t);r._indices = this._indices, r.getRawIndex = r._indices ? qu : ju;for (var o = r._storage, a = [], s = this._chunkSize, l = t.length, u = this.count(), h = [], c = r._rawExtent, d = 0; u > d; d++) {for (var f = 0; l > f; f++) {h[f] = this.get(t[f], d);}h[l] = d;var g = e && e.apply(n, h);if (null != g) {"object" != typeof g && (a[0] = g, g = a);for (var v = this.getRawIndex(d), m = Math.floor(v / s), y = v % s, _ = 0; _ < g.length; _++) {var x = t[_],w = g[_],b = c[x],S = o[x];S && (S[m][y] = w), w < b[0] && (b[0] = w), w > b[1] && (b[1] = w);}}}return r;}, Qx.downSample = function (t, e, n, i) {for (var r = $u(this, [t]), o = r._storage, a = [], s = Math.floor(1 / e), l = o[t], u = this.count(), h = this._chunkSize, c = r._rawExtent[t], d = new (Vu(this))(u), f = 0, p = 0; u > p; p += s) {s > u - p && (s = u - p, a.length = s);for (var g = 0; s > g; g++) {var v = this.getRawIndex(p + g),m = Math.floor(v / h),y = v % h;a[g] = l[m][y];}var _ = n(a),x = this.getRawIndex(Math.min(p + i(a, _) || 0, u - 1)),w = Math.floor(x / h),b = x % h;l[w][b] = _, _ < c[0] && (c[0] = _), _ > c[1] && (c[1] = _), d[f++] = x;}return r._count = f, r._indices = d, r.getRawIndex = qu, r;}, Qx.getItemModel = function (t) {var e = this.hostModel;return new fa(this.getRawDataItem(t), e, e && e.ecModel);}, Qx.diff = function (t) {var e = this;return new Bu(t ? t.getIndices() : [], this.getIndices(), function (e) {return Zu(t, e);}, function (t) {return Zu(e, t);});}, Qx.getVisual = function (t) {var e = this._visual;return e && e[t];}, Qx.setVisual = function (t, e) {if (Vx(t)) for (var n in t) {t.hasOwnProperty(n) && this.setVisual(n, t[n]);} else this._visual = this._visual || {}, this._visual[t] = e;}, Qx.setLayout = function (t, e) {if (Vx(t)) for (var n in t) {t.hasOwnProperty(n) && this.setLayout(n, t[n]);} else this._layout[t] = e;}, Qx.getLayout = function (t) {return this._layout[t];}, Qx.getItemLayout = function (t) {return this._itemLayouts[t];}, Qx.setItemLayout = function (t, e, n) {this._itemLayouts[t] = n ? a(this._itemLayouts[t] || {}, e) : e;}, Qx.clearItemLayouts = function () {this._itemLayouts.length = 0;}, Qx.getItemVisual = function (t, e, n) {var i = this._itemVisuals[t],r = i && i[e];return null != r || n ? r : this.getVisual(e);}, Qx.setItemVisual = function (t, e, n) {var i = this._itemVisuals[t] || {},r = this.hasItemVisual;if (this._itemVisuals[t] = i, Vx(e)) for (var o in e) {e.hasOwnProperty(o) && (i[o] = e[o], r[o] = !0);} else i[e] = n, r[e] = !0;}, Qx.clearAllVisual = function () {this._visual = {}, this._itemVisuals = [], this.hasItemVisual = {};};var Jx = function Jx(t) {t.seriesIndex = this.seriesIndex, t.dataIndex = this.dataIndex, t.dataType = this.dataType;};Qx.setItemGraphicEl = function (t, e) {var n = this.hostModel;e && (e.dataIndex = t, e.dataType = this.dataType, e.seriesIndex = n && n.seriesIndex, "group" === e.type && e.traverse(Jx, e)), this._graphicEls[t] = e;}, Qx.getItemGraphicEl = function (t) {return this._graphicEls[t];}, Qx.eachItemGraphicEl = function (t, e) {f(this._graphicEls, function (n, i) {n && t && t.call(e, n, i);});}, Qx.cloneShallow = function (t) {if (!t) {var e = p(this.dimensions, this.getDimensionInfo, this);t = new $x(e, this.hostModel);}if (t._storage = this._storage, Wu(t, this), this._indices) {var n = this._indices.constructor;t._indices = new n(this._indices);} else t._indices = null;return t.getRawIndex = t._indices ? qu : ju, t;}, Qx.wrapMethod = function (t, e) {var n = this[t];"function" == typeof n && (this.__wrappedMethods = this.__wrappedMethods || [], this.__wrappedMethods.push(t), this[t] = function () {var t = n.apply(this, arguments);return e.apply(this, [t].concat(P(arguments)));});}, Qx.TRANSFERABLE_METHODS = ["cloneShallow", "downSample", "map"], Qx.CHANGABLE_METHODS = ["filterSelf", "selectRange"];var tw = function tw(t, e) {return e = e || {}, th(e.coordDimensions || [], t, { dimsDef: e.dimensionsDefine || t.dimensionsDefine, encodeDef: e.encodeDefine || t.encodeDefine, dimCount: e.dimensionsCount, encodeDefaulter: e.encodeDefaulter, generateCoord: e.generateCoord, generateCoordCount: e.generateCoordCount });},ew = { cartesian2d: function cartesian2d(t, e, n, i) {var r = t.getReferringComponents("xAxis")[0],o = t.getReferringComponents("yAxis")[0];e.coordSysDims = ["x", "y"], n.set("x", r), n.set("y", o), oh(r) && (i.set("x", r), e.firstCategoryDimIndex = 0), oh(o) && (i.set("y", o), null == e.firstCategoryDimIndex & (e.firstCategoryDimIndex = 1));}, singleAxis: function singleAxis(t, e, n, i) {var r = t.getReferringComponents("singleAxis")[0];e.coordSysDims = ["single"], n.set("single", r), oh(r) && (i.set("single", r), e.firstCategoryDimIndex = 0);}, polar: function polar(t, e, n, i) {var r = t.getReferringComponents("polar")[0],o = r.findAxisModel("radiusAxis"),a = r.findAxisModel("angleAxis");e.coordSysDims = ["radius", "angle"], n.set("radius", o), n.set("angle", a), oh(o) && (i.set("radius", o), e.firstCategoryDimIndex = 0), oh(a) && (i.set("angle", a), null == e.firstCategoryDimIndex && (e.firstCategoryDimIndex = 1));}, geo: function geo(t, e) {e.coordSysDims = ["lng", "lat"];}, parallel: function parallel(t, e, n, i) {var r = t.ecModel,o = r.getComponent("parallel", t.get("parallelIndex")),a = e.coordSysDims = o.dimensions.slice();f(o.parallelAxisIndex, function (t, o) {var s = r.getComponent("parallelAxis", t),l = a[o];n.set(l, s), oh(s) && null == e.firstCategoryDimIndex && (i.set(l, s), e.firstCategoryDimIndex = o);});} };dh.prototype.parse = function (t) {return t;}, dh.prototype.getSetting = function (t) {return this._setting[t];}, dh.prototype.contain = function (t) {var e = this._extent;return t >= e[0] && t <= e[1];}, dh.prototype.normalize = function (t) {var e = this._extent;return e[1] === e[0] ? .5 : (t - e[0]) / (e[1] - e[0]);}, dh.prototype.scale = function (t) {var e = this._extent;return t * (e[1] - e[0]) + e[0];}, dh.prototype.unionExtent = function (t) {var e = this._extent;t[0] < e[0] && (e[0] = t[0]), t[1] > e[1] && (e[1] = t[1]);}, dh.prototype.unionExtentFromData = function (t, e) {this.unionExtent(t.getApproximateExtent(e));}, dh.prototype.getExtent = function () {return this._extent.slice();}, dh.prototype.setExtent = function (t, e) {var n = this._extent;isNaN(t) || (n[0] = t), isNaN(e) || (n[1] = e);}, dh.prototype.isBlank = function () {return this._isBlank;}, dh.prototype.setBlank = function (t) {this._isBlank = t;}, dh.prototype.getLabel = null, vr(dh), xr(dh, { registerWhenExtend: !0 }), fh.createByAxisModel = function (t) {var e = t.option,n = e.data,i = n && p(n, gh);return new fh({ categories: i, needCollect: !i, deduplication: e.dedplication !== !1 });};var nw = fh.prototype;nw.getOrdinal = function (t) {return ph(this).get(t);}, nw.parseAndCollect = function (t) {var e,n = this._needCollect;if ("string" != typeof t && !n) return t;if (n && !this._deduplication) return e = this.categories.length, this.categories[e] = t, e;var i = ph(this);return e = i.get(t), null == e && (n ? (e = this.categories.length, this.categories[e] = t, i.set(t, e)) : e = 0 / 0), e;};var iw = dh.prototype,rw = dh.extend({ type: "ordinal", init: function init(t, e) {(!t || x(t)) && (t = new fh({ categories: t })), this._ordinalMeta = t, this._extent = e || [0, t.categories.length - 1];}, parse: function parse(t) {return "string" == typeof t ? this._ordinalMeta.getOrdinal(t) : Math.round(t);}, contain: function contain(t) {return t = this.parse(t), iw.contain.call(this, t) && null != this._ordinalMeta.categories[t];}, normalize: function normalize(t) {return iw.normalize.call(this, this.parse(t));}, scale: function scale(t) {return Math.round(iw.scale.call(this, t));}, getTicks: function getTicks() {for (var t = [], e = this._extent, n = e[0]; n <= e[1];) {t.push(n), n++;}return t;}, getLabel: function getLabel(t) {return this.isBlank() ? void 0 : this._ordinalMeta.categories[t];}, count: function count() {return this._extent[1] - this._extent[0] + 1;}, unionExtentFromData: function unionExtentFromData(t, e) {this.unionExtent(t.getApproximateExtent(e));}, getOrdinalMeta: function getOrdinalMeta() {return this._ordinalMeta;}, niceTicks: H, niceExtent: H });rw.create = function () {return new rw();};var ow = ba,aw = ba,sw = dh.extend({ type: "interval", _interval: 0, _intervalPrecision: 2, setExtent: function setExtent(t, e) {var n = this._extent;isNaN(t) || (n[0] = parseFloat(t)), isNaN(e) || (n[1] = parseFloat(e));}, unionExtent: function unionExtent(t) {var e = this._extent;t[0] < e[0] && (e[0] = t[0]), t[1] > e[1] && (e[1] = t[1]), sw.prototype.setExtent.call(this, e[0], e[1]);}, getInterval: function getInterval() {return this._interval;}, setInterval: function setInterval(t) {this._interval = t, this._niceExtent = this._extent.slice(), this._intervalPrecision = mh(t);}, getTicks: function getTicks(t) {var e = this._interval,n = this._extent,i = this._niceExtent,r = this._intervalPrecision,o = [];if (!e) return o;var a = 1e4;n[0] < i[0] && o.push(t ? aw(i[0] - e, r) : n[0]);for (var s = i[0]; s <= i[1] && (o.push(s), s = aw(s + e, r), s !== o[o.length - 1]);) {if (o.length > a) return [];}var l = o.length ? o[o.length - 1] : i[1];return n[1] > l && o.push(t ? aw(l + e, r) : n[1]), o;}, getMinorTicks: function getMinorTicks(t) {for (var e = this.getTicks(!0), n = [], i = this.getExtent(), r = 1; r < e.length; r++) {for (var o = e[r], a = e[r - 1], s = 0, l = [], u = o - a, h = u / t; t - 1 > s;) {var c = ba(a + (s + 1) * h);c > i[0] && c < i[1] && l.push(c), s++;}n.push(l);}return n;}, getLabel: function getLabel(t, e) {if (null == t) return "";var n = e && e.precision;return null == n ? n = Ca(t) || 0 : "auto" === n && (n = this._intervalPrecision), t = aw(t, n, !0), Ra(t);}, niceTicks: function niceTicks(t, e, n) {t = t || 5;var i = this._extent,r = i[1] - i[0];if (isFinite(r)) {0 > r && (r = -r, i.reverse());var o = vh(i, t, e, n);this._intervalPrecision = o.intervalPrecision, this._interval = o.interval, this._niceExtent = o.niceTickExtent;}}, niceExtent: function niceExtent(t) {var e = this._extent;if (e[0] === e[1]) if (0 !== e[0]) {var n = e[0];t.fixMax ? e[0] -= n / 2 : (e[1] += n / 2, e[0] -= n / 2);} else e[1] = 1;var i = e[1] - e[0];isFinite(i) || (e[0] = 0, e[1] = 1), this.niceTicks(t.splitNumber, t.minInterval, t.maxInterval);var r = this._interval;t.fixMin || (e[0] = aw(Math.floor(e[0] / r) * r)), t.fixMax || (e[1] = aw(Math.ceil(e[1] / r) * r));} });sw.create = function () {return new sw();};var lw = "__ec_stack_",uw = .5,hw = "undefined" != typeof Float32Array ? Float32Array : Array,cw = { seriesType: "bar", plan: v_(), reset: function reset(t) {function e(t, e) {for (var n, d = t.count, f = new hw(2 * d), p = new hw(2 * d), g = new hw(d), v = [], m = [], y = 0, _ = 0; null != (n = t.next());) {m[h] = e.get(s, n), m[1 - h] = e.get(l, n), v = i.dataToPoint(m, null, v), p[y] = u ? r.x + r.width : v[0], f[y++] = v[0], p[y] = u ? v[1] : r.y + r.height, f[y++] = v[1], g[_++] = n;}e.setLayout({ largePoints: f, largeDataIndices: g, largeBackgroundPoints: p, barWidth: c, valueAxisStart: Ah(o, a, !1), backgroundStart: u ? r.x : r.y, valueAxisHorizontal: u });}if (kh(t) && Dh(t)) {var n = t.getData(),i = t.coordinateSystem,r = i.grid.getRect(),o = i.getBaseAxis(),a = i.getOtherAxis(o),s = n.mapDimension(a.dim),l = n.mapDimension(o.dim),u = a.isHorizontal(),h = u ? 0 : 1,c = Ih(Mh([t]), o, t).width;return c > uw || (c = uw), { progress: e };}} },dw = sw.prototype,fw = Math.ceil,pw = Math.floor,gw = 1e3,vw = 60 * gw,mw = 60 * vw,yw = 24 * mw,_w = function _w(t, e, n, i) {for (; i > n;) {var r = n + i >>> 1;t[r][1] < e ? n = r + 1 : i = r;}return n;},xw = sw.extend({ type: "time", getLabel: function getLabel(t) {var e = this._stepLvl,n = new Date(t);return Xa(e[0], n, this.getSetting("useUTC"));}, niceExtent: function niceExtent(t) {var e = this._extent;if (e[0] === e[1] && (e[0] -= yw, e[1] += yw), e[1] === -1 / 0 && 1 / 0 === e[0]) {var n = new Date();e[1] = +new Date(n.getFullYear(), n.getMonth(), n.getDate()), e[0] = e[1] - yw;}this.niceTicks(t.splitNumber, t.minInterval, t.maxInterval);var i = this._interval;t.fixMin || (e[0] = ba(pw(e[0] / i) * i)), t.fixMax || (e[1] = ba(fw(e[1] / i) * i));}, niceTicks: function niceTicks(t, e, n) {t = t || 10;var i = this._extent,r = i[1] - i[0],o = r / t;null != e && e > o && (o = e), null != n && o > n && (o = n);
      var a = ww.length,s = _w(ww, o, 0, a),l = ww[Math.min(s, a - 1)],u = l[1];if ("year" === l[0]) {var h = r / u,c = La(h / t, !0);u *= c;}var d = this.getSetting("useUTC") ? 0 : 60 * new Date(+i[0] || +i[1]).getTimezoneOffset() * 1e3,f = [Math.round(fw((i[0] - d) / u) * u + d), Math.round(pw((i[1] - d) / u) * u + d)];_h(f, i), this._stepLvl = l, this._interval = u, this._niceExtent = f;}, parse: function parse(t) {return +Aa(t);} });f(["contain", "normalize"], function (t) {xw.prototype[t] = function (e) {return dw[t].call(this, this.parse(e));};});var ww = [["hh:mm:ss", gw], ["hh:mm:ss", 5 * gw], ["hh:mm:ss", 10 * gw], ["hh:mm:ss", 15 * gw], ["hh:mm:ss", 30 * gw], ["hh:mm\nMM-dd", vw], ["hh:mm\nMM-dd", 5 * vw], ["hh:mm\nMM-dd", 10 * vw], ["hh:mm\nMM-dd", 15 * vw], ["hh:mm\nMM-dd", 30 * vw], ["hh:mm\nMM-dd", mw], ["hh:mm\nMM-dd", 2 * mw], ["hh:mm\nMM-dd", 6 * mw], ["hh:mm\nMM-dd", 12 * mw], ["MM-dd\nyyyy", yw], ["MM-dd\nyyyy", 2 * yw], ["MM-dd\nyyyy", 3 * yw], ["MM-dd\nyyyy", 4 * yw], ["MM-dd\nyyyy", 5 * yw], ["MM-dd\nyyyy", 6 * yw], ["week", 7 * yw], ["MM-dd\nyyyy", 10 * yw], ["week", 14 * yw], ["week", 21 * yw], ["month", 31 * yw], ["week", 42 * yw], ["month", 62 * yw], ["week", 70 * yw], ["quarter", 95 * yw], ["month", 31 * yw * 4], ["month", 31 * yw * 5], ["half-year", 380 * yw / 2], ["month", 31 * yw * 8], ["month", 31 * yw * 10], ["year", 380 * yw]];xw.create = function (t) {return new xw({ useUTC: t.ecModel.get("useUTC") });};var bw = dh.prototype,Sw = sw.prototype,Mw = Ca,Cw = ba,Iw = Math.floor,Tw = Math.ceil,kw = Math.pow,Dw = Math.log,Aw = dh.extend({ type: "log", base: 10, $constructor: function $constructor() {dh.apply(this, arguments), this._originalScale = new sw();}, getTicks: function getTicks(t) {var e = this._originalScale,n = this._extent,i = e.getExtent();return p(Sw.getTicks.call(this, t), function (t) {var r = ba(kw(this.base, t));return r = t === n[0] && e.__fixMin ? Ph(r, i[0]) : r, r = t === n[1] && e.__fixMax ? Ph(r, i[1]) : r;}, this);}, getMinorTicks: Sw.getMinorTicks, getLabel: Sw.getLabel, scale: function scale(t) {return t = bw.scale.call(this, t), kw(this.base, t);}, setExtent: function setExtent(t, e) {var n = this.base;t = Dw(t) / Dw(n), e = Dw(e) / Dw(n), Sw.setExtent.call(this, t, e);}, getExtent: function getExtent() {var t = this.base,e = bw.getExtent.call(this);e[0] = kw(t, e[0]), e[1] = kw(t, e[1]);var n = this._originalScale,i = n.getExtent();return n.__fixMin && (e[0] = Ph(e[0], i[0])), n.__fixMax && (e[1] = Ph(e[1], i[1])), e;}, unionExtent: function unionExtent(t) {this._originalScale.unionExtent(t);var e = this.base;t[0] = Dw(t[0]) / Dw(e), t[1] = Dw(t[1]) / Dw(e), bw.unionExtent.call(this, t);}, unionExtentFromData: function unionExtentFromData(t, e) {this.unionExtent(t.getApproximateExtent(e));}, niceTicks: function niceTicks(t) {t = t || 10;var e = this._extent,n = e[1] - e[0];if (!(1 / 0 === n || 0 >= n)) {var i = Pa(n),r = t / n * i;for (.5 >= r && (i *= 10); !isNaN(i) && Math.abs(i) < 1 && Math.abs(i) > 0;) {i *= 10;}var o = [ba(Tw(e[0] / i) * i), ba(Iw(e[1] / i) * i)];this._interval = i, this._niceExtent = o;}}, niceExtent: function niceExtent(t) {Sw.niceExtent.call(this, t);var e = this._originalScale;e.__fixMin = t.fixMin, e.__fixMax = t.fixMax;} });f(["contain", "normalize"], function (t) {Aw.prototype[t] = function (e) {return e = Dw(e) / Dw(this.base), bw[t].call(this, e);};}), Aw.create = function () {return new Aw();};var Pw = { getMin: function getMin(t) {var e = this.option,n = t || null == e.rangeStart ? e.min : e.rangeStart;return this.axis && null != n && "dataMin" !== n && "function" != typeof n && !T(n) && (n = this.axis.scale.parse(n)), n;}, getMax: function getMax(t) {var e = this.option,n = t || null == e.rangeEnd ? e.max : e.rangeEnd;return this.axis && null != n && "dataMax" !== n && "function" != typeof n && !T(n) && (n = this.axis.scale.parse(n)), n;}, getNeedCrossZero: function getNeedCrossZero() {var t = this.option;return null != t.rangeStart || null != t.rangeEnd ? !1 : !t.scale;}, getCoordSysModel: H, setRange: function setRange(t, e) {this.option.rangeStart = t, this.option.rangeEnd = e;}, resetRange: function resetRange() {this.option.rangeStart = this.option.rangeEnd = null;} },Ow = go({ type: "triangle", shape: { cx: 0, cy: 0, width: 0, height: 0 }, buildPath: function buildPath(t, e) {var n = e.cx,i = e.cy,r = e.width / 2,o = e.height / 2;t.moveTo(n, i - o), t.lineTo(n + r, i + o), t.lineTo(n - r, i + o), t.closePath();} }),Lw = go({ type: "diamond", shape: { cx: 0, cy: 0, width: 0, height: 0 }, buildPath: function buildPath(t, e) {var n = e.cx,i = e.cy,r = e.width / 2,o = e.height / 2;t.moveTo(n, i - o), t.lineTo(n + r, i), t.lineTo(n, i + o), t.lineTo(n - r, i), t.closePath();} }),Bw = go({ type: "pin", shape: { x: 0, y: 0, width: 0, height: 0 }, buildPath: function buildPath(t, e) {var n = e.x,i = e.y,r = e.width / 5 * 3,o = Math.max(r, e.height),a = r / 2,s = a * a / (o - a),l = i - o + a + s,u = Math.asin(s / a),h = Math.cos(u) * a,c = Math.sin(u),d = Math.cos(u),f = .6 * a,p = .7 * a;t.moveTo(n - h, l + s), t.arc(n, l, a, Math.PI - u, 2 * Math.PI + u), t.bezierCurveTo(n + h - c * f, l + s + d * f, n, i - p, n, i), t.bezierCurveTo(n, i - p, n - h + c * f, l + s + d * f, n - h, l + s), t.closePath();} }),zw = go({ type: "arrow", shape: { x: 0, y: 0, width: 0, height: 0 }, buildPath: function buildPath(t, e) {var n = e.height,i = e.width,r = e.x,o = e.y,a = i / 3 * 2;t.moveTo(r, o), t.lineTo(r + a, o + n), t.lineTo(r, o + n / 4 * 3), t.lineTo(r - a, o + n), t.lineTo(r, o), t.closePath();} }),Ew = { line: Om, rect: Am, roundRect: Am, square: Am, circle: _m, diamond: Lw, pin: Bw, arrow: zw, triangle: Ow },Rw = { line: function line(t, e, n, i, r) {r.x1 = t, r.y1 = e + i / 2, r.x2 = t + n, r.y2 = e + i / 2;}, rect: function rect(t, e, n, i, r) {r.x = t, r.y = e, r.width = n, r.height = i;}, roundRect: function roundRect(t, e, n, i, r) {r.x = t, r.y = e, r.width = n, r.height = i, r.r = Math.min(n, i) / 4;}, square: function square(t, e, n, i, r) {var o = Math.min(n, i);r.x = t, r.y = e, r.width = o, r.height = o;}, circle: function circle(t, e, n, i, r) {r.cx = t + n / 2, r.cy = e + i / 2, r.r = Math.min(n, i) / 2;}, diamond: function diamond(t, e, n, i, r) {r.cx = t + n / 2, r.cy = e + i / 2, r.width = n, r.height = i;}, pin: function pin(t, e, n, i, r) {r.x = t + n / 2, r.y = e + i / 2, r.width = n, r.height = i;}, arrow: function arrow(t, e, n, i, r) {r.x = t + n / 2, r.y = e + i / 2, r.width = n, r.height = i;}, triangle: function triangle(t, e, n, i, r) {r.cx = t + n / 2, r.cy = e + i / 2, r.width = n, r.height = i;} },Nw = {};f(Ew, function (t, e) {Nw[e] = new t();});var Fw = go({ type: "symbol", shape: { symbolType: "", x: 0, y: 0, width: 0, height: 0 }, calculateTextPosition: function calculateTextPosition(t, e, n) {var i = Kn(t, e, n),r = this.shape;return r && "pin" === r.symbolType && "inside" === e.textPosition && (i.y = n.y + .4 * n.height), i;}, buildPath: function buildPath(t, e, n) {var i = e.symbolType;if ("none" !== i) {var r = Nw[i];r || (i = "rect", r = Nw[i]), Rw[i](e.x, e.y, e.width, e.height, r.shape), r.buildPath(t, r.shape, n);}} }),Hw = { isDimensionStacked: sh, enableDataStack: ah, getStackedDimension: lh },Vw = (Object.freeze || Object)({ createList: Yh, getLayoutRect: Ka, dataStack: Hw, createScale: Uh, mixinAxisModelCommonMethods: jh, completeDimensions: th, createDimensions: tw, createSymbol: Xh }),Gw = 1e-8;Kh.prototype = { constructor: Kh, properties: null, getBoundingRect: function getBoundingRect() {var t = this._rect;if (t) return t;for (var e = Number.MAX_VALUE, n = [e, e], i = [-e, -e], r = [], o = [], a = this.geometries, s = 0; s < a.length; s++) {if ("polygon" === a[s].type) {var l = a[s].exterior;zr(l, r, o), ae(n, n, r), se(i, i, o);}}return 0 === s && (n[0] = n[1] = i[0] = i[1] = 0), this._rect = new In(n[0], n[1], i[0] - n[0], i[1] - n[1]);}, contain: function contain(t) {var e = this.getBoundingRect(),n = this.geometries;if (!e.contain(t[0], t[1])) return !1;t: for (var i = 0, r = n.length; r > i; i++) {if ("polygon" === n[i].type) {var o = n[i].exterior,a = n[i].interiors;if (Zh(o, t[0], t[1])) {for (var s = 0; s < (a ? a.length : 0); s++) {if (Zh(a[s])) continue t;}return !0;}}}return !1;}, transformTo: function transformTo(t, e, n, i) {var r = this.getBoundingRect(),o = r.width / r.height;n ? i || (i = n / o) : n = o * i;for (var a = new In(t, e, n, i), s = r.calculateTransform(a), l = this.geometries, u = 0; u < l.length; u++) {if ("polygon" === l[u].type) {for (var h = l[u].exterior, c = l[u].interiors, d = 0; d < h.length; d++) {oe(h[d], h[d], s);}for (var f = 0; f < (c ? c.length : 0); f++) {for (var d = 0; d < c[f].length; d++) {oe(c[f][d], c[f][d], s);}}}}r = this._rect, r.copy(a), this.center = [r.x + r.width / 2, r.y + r.height / 2];}, cloneShallow: function cloneShallow(t) {null == t && (t = this.name);var e = new Kh(t, this.geometries, this.center);return e._rect = this._rect, e.transformTo = null, e;} };var Ww = function Ww(t, e) {return $h(t), p(v(t.features, function (t) {return t.geometry && t.properties && t.geometry.coordinates.length > 0;}), function (t) {var n = t.properties,i = t.geometry,r = i.coordinates,o = [];"Polygon" === i.type && o.push({ type: "polygon", exterior: r[0], interiors: r.slice(1) }), "MultiPolygon" === i.type && f(r, function (t) {t[0] && o.push({ type: "polygon", exterior: t[0], interiors: t.slice(1) });});var a = new Kh(n[e || "name"], o, n.cp);return a.properties = n, a;});},Xw = lr(),Yw = [0, 1],Uw = function Uw(t, e, n) {this.dim = t, this.scale = e, this._extent = n || [0, 0], this.inverse = !1, this.onBand = !1;};Uw.prototype = { constructor: Uw, contain: function contain(t) {var e = this._extent,n = Math.min(e[0], e[1]),i = Math.max(e[0], e[1]);return t >= n && i >= t;}, containData: function containData(t) {return this.scale.contain(t);}, getExtent: function getExtent() {return this._extent.slice();}, getPixelPrecision: function getPixelPrecision(t) {return Ia(t || this.scale.getExtent(), this._extent);}, setExtent: function setExtent(t, e) {var n = this._extent;n[0] = t, n[1] = e;}, dataToCoord: function dataToCoord(t, e) {var n = this._extent,i = this.scale;return t = i.normalize(t), this.onBand && "ordinal" === i.type && (n = n.slice(), fc(n, i.count())), xa(t, Yw, n, e);}, coordToData: function coordToData(t, e) {var n = this._extent,i = this.scale;this.onBand && "ordinal" === i.type && (n = n.slice(), fc(n, i.count()));var r = xa(t, n, Yw, e);return this.scale.scale(r);}, pointToData: function pointToData() {}, getTicksCoords: function getTicksCoords(t) {t = t || {};var e = t.tickModel || this.getTickModel(),n = tc(this, e),i = n.ticks,r = p(i, function (t) {return { coord: this.dataToCoord(t), tickValue: t };}, this),o = e.get("alignWithLabel");return pc(this, r, o, t.clamp), r;}, getMinorTicksCoords: function getMinorTicksCoords() {if ("ordinal" === this.scale.type) return [];var t = this.model.getModel("minorTick"),e = t.get("splitNumber");e > 0 && 100 > e || (e = 5);var n = this.scale.getMinorTicks(e),i = p(n, function (t) {return p(t, function (t) {return { coord: this.dataToCoord(t), tickValue: t };}, this);}, this);return i;}, getViewLabels: function getViewLabels() {return Jh(this).labels;}, getLabelModel: function getLabelModel() {return this.model.getModel("axisLabel");}, getTickModel: function getTickModel() {return this.model.getModel("axisTick");}, getBandWidth: function getBandWidth() {var t = this._extent,e = this.scale.getExtent(),n = e[1] - e[0] + (this.onBand ? 1 : 0);0 === n && (n = 1);var i = Math.abs(t[1] - t[0]);return Math.abs(i) / n;}, isHorizontal: null, getRotate: null, calculateCategoryInterval: function calculateCategoryInterval() {return uc(this);} };var jw = Ww,qw = {};f(["map", "each", "filter", "indexOf", "inherits", "reduce", "filter", "bind", "curry", "isArray", "isString", "isObject", "isFunction", "extend", "defaults", "clone", "merge"], function (t) {qw[t] = ip[t];});var Zw = {};f(["extendShape", "extendPath", "makePath", "makeImage", "mergePath", "resizePath", "createIcon", "setHoverStyle", "setLabelStyle", "setTextStyle", "setText", "getFont", "updateProps", "initProps", "getTransform", "clipPointsByRect", "clipRectByRect", "registerShape", "getShapeClass", "Group", "Image", "Text", "Circle", "Sector", "Ring", "Polygon", "Polyline", "Rect", "Line", "BezierCurve", "Arc", "IncrementalDisplayable", "CompoundPath", "LinearGradient", "RadialGradient", "BoundingRect"], function (t) {Zw[t] = ey[t];});var Kw = function Kw(t) {this._axes = {}, this._dimList = [], this.name = t || "";};Kw.prototype = { constructor: Kw, type: "cartesian", getAxis: function getAxis(t) {return this._axes[t];}, getAxes: function getAxes() {return p(this._dimList, gc, this);}, getAxesByScale: function getAxesByScale(t) {return t = t.toLowerCase(), v(this.getAxes(), function (e) {return e.scale.type === t;});}, addAxis: function addAxis(t) {var e = t.dim;this._axes[e] = t, this._dimList.push(e);}, dataToCoord: function dataToCoord(t) {return this._dataCoordConvert(t, "dataToCoord");}, coordToData: function coordToData(t) {return this._dataCoordConvert(t, "coordToData");}, _dataCoordConvert: function _dataCoordConvert(t, e) {for (var n = this._dimList, i = t instanceof Array ? [] : {}, r = 0; r < n.length; r++) {var o = n[r],a = this._axes[o];i[o] = a[e](t[o]);}return i;} }, vc.prototype = { constructor: vc, type: "cartesian2d", dimensions: ["x", "y"], getBaseAxis: function getBaseAxis() {return this.getAxesByScale("ordinal")[0] || this.getAxesByScale("time")[0] || this.getAxis("x");}, containPoint: function containPoint(t) {var e = this.getAxis("x"),n = this.getAxis("y");return e.contain(e.toLocalCoord(t[0])) && n.contain(n.toLocalCoord(t[1]));}, containData: function containData(t) {return this.getAxis("x").containData(t[0]) && this.getAxis("y").containData(t[1]);}, dataToPoint: function dataToPoint(t, e, n) {var i = this.getAxis("x"),r = this.getAxis("y");return n = n || [], n[0] = i.toGlobalCoord(i.dataToCoord(t[0])), n[1] = r.toGlobalCoord(r.dataToCoord(t[1])), n;}, clampData: function clampData(t, e) {var n = this.getAxis("x").scale,i = this.getAxis("y").scale,r = n.getExtent(),o = i.getExtent(),a = n.parse(t[0]),s = i.parse(t[1]);return e = e || [], e[0] = Math.min(Math.max(Math.min(r[0], r[1]), a), Math.max(r[0], r[1])), e[1] = Math.min(Math.max(Math.min(o[0], o[1]), s), Math.max(o[0], o[1])), e;}, pointToData: function pointToData(t, e) {var n = this.getAxis("x"),i = this.getAxis("y");return e = e || [], e[0] = n.coordToData(n.toLocalCoord(t[0])), e[1] = i.coordToData(i.toLocalCoord(t[1])), e;}, getOtherAxis: function getOtherAxis(t) {return this.getAxis("x" === t.dim ? "y" : "x");}, getArea: function getArea() {var t = this.getAxis("x").getGlobalExtent(),e = this.getAxis("y").getGlobalExtent(),n = Math.min(t[0], t[1]),i = Math.min(e[0], e[1]),r = Math.max(t[0], t[1]) - n,o = Math.max(e[0], e[1]) - i,a = new In(n, i, r, o);return a;} }, h(vc, Kw);var $w = function $w(t, e, n, i, r) {Uw.call(this, t, e, n), this.type = i || "value", this.position = r || "bottom";};$w.prototype = { constructor: $w, index: 0, getAxesOnZeroOf: null, model: null, isHorizontal: function isHorizontal() {var t = this.position;return "top" === t || "bottom" === t;}, getGlobalExtent: function getGlobalExtent(t) {var e = this.getExtent();return e[0] = this.toGlobalCoord(e[0]), e[1] = this.toGlobalCoord(e[1]), t && e[0] > e[1] && e.reverse(), e;}, getOtherAxis: function getOtherAxis() {this.grid.getOtherAxis();}, pointToData: function pointToData(t, e) {return this.coordToData(this.toLocalCoord(t["x" === this.dim ? 0 : 1]), e);}, toLocalCoord: null, toGlobalCoord: null }, h($w, Uw);var Qw = { show: !0, zlevel: 0, z: 0, inverse: !1, name: "", nameLocation: "end", nameRotate: null, nameTruncate: { maxWidth: null, ellipsis: "...", placeholder: "." }, nameTextStyle: {}, nameGap: 15, silent: !1, triggerEvent: !1, tooltip: { show: !1 }, axisPointer: {}, axisLine: { show: !0, onZero: !0, onZeroAxisIndex: null, lineStyle: { color: "#333", width: 1, type: "solid" }, symbol: ["none", "none"], symbolSize: [10, 15] }, axisTick: { show: !0, inside: !1, length: 5, lineStyle: { width: 1 } }, axisLabel: { show: !0, inside: !1, rotate: 0, showMinLabel: null, showMaxLabel: null, margin: 8, fontSize: 12 }, splitLine: { show: !0, lineStyle: { color: ["#ccc"], width: 1, type: "solid" } }, splitArea: { show: !1, areaStyle: { color: ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"] } } },Jw = {};Jw.categoryAxis = r({ boundaryGap: !0, deduplication: null, splitLine: { show: !1 }, axisTick: { alignWithLabel: !1, interval: "auto" }, axisLabel: { interval: "auto" } }, Qw), Jw.valueAxis = r({ boundaryGap: [0, 0], splitNumber: 5, minorTick: { show: !1, splitNumber: 5, length: 3, lineStyle: {} }, minorSplitLine: { show: !1, lineStyle: { color: "#eee", width: 1 } } }, Qw), Jw.timeAxis = s({ scale: !0, min: "dataMin", max: "dataMax" }, Jw.valueAxis), Jw.logAxis = s({ scale: !0, logBase: 10 }, Jw.valueAxis);var tb = ["value", "category", "time", "log"],eb = function eb(t, e, n, i) {f(tb, function (a) {e.extend({ type: t + "Axis." + a, mergeDefaultAndTheme: function mergeDefaultAndTheme(e, i) {var o = this.layoutMode,s = o ? Qa(e) : {},l = i.getTheme();r(e, l.get(a + "Axis")), r(e, this.getDefaultOption()), e.type = n(t, e), o && $a(e, s, o);}, optionUpdated: function optionUpdated() {var t = this.option;"category" === t.type && (this.__ordinalMeta = fh.createByAxisModel(this));}, getCategories: function getCategories(t) {var e = this.option;return "category" === e.type ? t ? e.data : this.__ordinalMeta.categories : void 0;}, getOrdinalMeta: function getOrdinalMeta() {return this.__ordinalMeta;}, defaultOption: o([{}, Jw[a + "Axis"], i], !0) });}), Iy.registerSubTypeDefaulter(t + "Axis", _(n, t));},nb = Iy.extend({ type: "cartesian2dAxis", axis: null, init: function init() {nb.superApply(this, "init", arguments), this.resetRange();}, mergeOption: function mergeOption() {nb.superApply(this, "mergeOption", arguments), this.resetRange();}, restoreData: function restoreData() {nb.superApply(this, "restoreData", arguments), this.resetRange();}, getCoordSysModel: function getCoordSysModel() {return this.ecModel.queryComponents({ mainType: "grid", index: this.option.gridIndex, id: this.option.gridId })[0];} });r(nb.prototype, Pw);var ib = { offset: 0 };eb("x", nb, mc, ib), eb("y", nb, mc, ib), Iy.extend({ type: "grid", dependencies: ["xAxis", "yAxis"], layoutMode: "box", coordinateSystem: null, defaultOption: { show: !1, zlevel: 0, z: 0, left: "10%", top: 60, right: "10%", bottom: 60, containLabel: !1, backgroundColor: "rgba(0,0,0,0)", borderWidth: 1, borderColor: "#ccc" } });var rb = _c.prototype;rb.type = "grid", rb.axisPointerEnabled = !0, rb.getRect = function () {return this._rect;}, rb.update = function (t, e) {var n = this._axesMap;this._updateScale(t, this.model), f(n.x, function (t) {Bh(t.scale, t.model);}), f(n.y, function (t) {Bh(t.scale, t.model);});var i = {};f(n.x, function (t) {xc(n, "y", t, i);}), f(n.y, function (t) {xc(n, "x", t, i);}), this.resize(this.model, e);}, rb.resize = function (t, e, n) {function i() {f(o, function (t) {var e = t.isHorizontal(),n = e ? [0, r.width] : [0, r.height],i = t.inverse ? 1 : 0;t.setExtent(n[i], n[1 - i]), bc(t, e ? r.x : r.y);});}var r = Ka(t.getBoxLayoutParams(), { width: e.getWidth(), height: e.getHeight() });this._rect = r;var o = this._axesList;i(), !n && t.get("containLabel") && (f(o, function (t) {if (!t.model.get("axisLabel.inside")) {var e = Fh(t);if (e) {var n = t.isHorizontal() ? "height" : "width",i = t.model.get("axisLabel.margin");r[n] -= e[n] + i, "top" === t.position ? r.y += e.height + i : "left" === t.position && (r.x += e.width + i);}}}), i());}, rb.getAxis = function (t, e) {var n = this._axesMap[t];if (null != n) {if (null == e) for (var i in n) {if (n.hasOwnProperty(i)) return n[i];}return n[e];}}, rb.getAxes = function () {return this._axesList.slice();}, rb.getCartesian = function (t, e) {if (null != t && null != e) {var n = "x" + t + "y" + e;return this._coordsMap[n];}S(t) && (e = t.yAxisIndex, t = t.xAxisIndex);for (var i = 0, r = this._coordsList; i < r.length; i++) {if (r[i].getAxis("x").index === t || r[i].getAxis("y").index === e) return r[i];}}, rb.getCartesians = function () {return this._coordsList.slice();}, rb.convertToPixel = function (t, e, n) {var i = this._findConvertTarget(t, e);return i.cartesian ? i.cartesian.dataToPoint(n) : i.axis ? i.axis.toGlobalCoord(i.axis.dataToCoord(n)) : null;}, rb.convertFromPixel = function (t, e, n) {var i = this._findConvertTarget(t, e);return i.cartesian ? i.cartesian.pointToData(n) : i.axis ? i.axis.coordToData(i.axis.toLocalCoord(n)) : null;}, rb._findConvertTarget = function (t, e) {var n,i,r = e.seriesModel,o = e.xAxisModel || r && r.getReferringComponents("xAxis")[0],a = e.yAxisModel || r && r.getReferringComponents("yAxis")[0],s = e.gridModel,l = this._coordsList;if (r) n = r.coordinateSystem, u(l, n) < 0 && (n = null);else if (o && a) n = this.getCartesian(o.componentIndex, a.componentIndex);else if (o) i = this.getAxis("x", o.componentIndex);else if (a) i = this.getAxis("y", a.componentIndex);else if (s) {var h = s.coordinateSystem;h === this && (n = this._coordsList[0]);}return { cartesian: n, axis: i };}, rb.containPoint = function (t) {var e = this._coordsList[0];return e ? e.containPoint(t) : void 0;}, rb._initCartesian = function (t, e) {function n(n) {return function (a, s) {if (yc(a, t, e)) {var l = a.get("position");"x" === n ? "top" !== l && "bottom" !== l && (l = i.bottom ? "top" : "bottom") : "left" !== l && "right" !== l && (l = i.left ? "right" : "left"), i[l] = !0;var u = new $w(n, zh(a), [0, 0], a.get("type"), l),h = "category" === u.type;u.onBand = h && a.get("boundaryGap"), u.inverse = a.get("inverse"), a.axis = u, u.model = a, u.grid = this, u.index = s, this._axesList.push(u), r[n][s] = u, o[n]++;}};}var i = { left: !1, right: !1, top: !1, bottom: !1 },r = { x: {}, y: {} },o = { x: 0, y: 0 };return e.eachComponent("xAxis", n("x"), this), e.eachComponent("yAxis", n("y"), this), o.x && o.y ? (this._axesMap = r, void f(r.x, function (e, n) {f(r.y, function (i, r) {var o = "x" + n + "y" + r,a = new vc(o);a.grid = this, a.model = t, this._coordsMap[o] = a, this._coordsList.push(a), a.addAxis(e), a.addAxis(i);}, this);}, this)) : (this._axesMap = {}, void (this._axesList = []));}, rb._updateScale = function (t, e) {function n(t, e) {f(t.mapDimension(e.dim, !0), function (n) {e.scale.unionExtentFromData(t, lh(t, n));});}f(this._axesList, function (t) {t.scale.setExtent(1 / 0, -1 / 0);}), t.eachSeries(function (i) {if (Mc(i)) {var r = Sc(i, t),o = r[0],a = r[1];if (!yc(o, e, t) || !yc(a, e, t)) return;var s = this.getCartesian(o.componentIndex, a.componentIndex),l = i.getData(),u = s.getAxis("x"),h = s.getAxis("y");"list" === l.type && (n(l, u, i), n(l, h, i));}}, this);}, rb.getTooltipAxes = function (t) {var e = [],n = [];return f(this.getCartesians(), function (i) {var r = null != t && "auto" !== t ? i.getAxis(t) : i.getBaseAxis(),o = i.getOtherAxis(r);u(e, r) < 0 && e.push(r), u(n, o) < 0 && n.push(o);}), { baseAxes: e, otherAxes: n };};var ob = ["xAxis", "yAxis"];_c.create = function (t, e) {var n = [];return t.eachComponent("grid", function (i, r) {var o = new _c(i, t, e);o.name = "grid_" + r, o.resize(i, e, !0), i.coordinateSystem = o, n.push(o);}), t.eachSeries(function (e) {if (Mc(e)) {var n = Sc(e, t),i = n[0],r = n[1],o = i.getCoordSysModel(),a = o.coordinateSystem;e.coordinateSystem = a.getCartesian(i.componentIndex, r.componentIndex);}}), n;}, _c.dimensions = _c.prototype.dimensions = vc.prototype.dimensions, Ss.register("cartesian2d", _c);var ab = f_.extend({ type: "series.__base_bar__", getInitialData: function getInitialData() {return uh(this.getSource(), this, { useEncodeDefaulter: !0 });}, getMarkerPosition: function getMarkerPosition(t) {var e = this.coordinateSystem;if (e) {var n = e.dataToPoint(e.clampData(t)),i = this.getData(),r = i.getLayout("offset"),o = i.getLayout("size"),a = e.getBaseAxis().isHorizontal() ? 0 : 1;return n[a] += r + o / 2, n;}return [0 / 0, 0 / 0];}, defaultOption: { zlevel: 0, z: 2, coordinateSystem: "cartesian2d", legendHoverLink: !0, barMinHeight: 0, barMinAngle: 0, large: !1, largeThreshold: 400, progressive: 3e3, progressiveChunkMode: "mod", itemStyle: {}, emphasis: {} } });ab.extend({ type: "series.bar", dependencies: ["grid", "polar"], brushSelector: "rect", getProgressive: function getProgressive() {return this.get("large") ? this.get("progressive") : !1;}, getProgressiveThreshold: function getProgressiveThreshold() {var t = this.get("progressiveThreshold"),e = this.get("largeThreshold");return e > t && (t = e), t;}, defaultOption: { clip: !0, roundCap: !1, showBackground: !1, backgroundStyle: { color: "rgba(180, 180, 180, 0.2)", borderColor: null, borderWidth: 0, borderType: "solid", borderRadius: 0, shadowBlur: 0, shadowColor: null, shadowOffsetX: 0, shadowOffsetY: 0, opacity: 1 } } });var sb = cv([["fill", "color"], ["stroke", "borderColor"], ["lineWidth", "borderWidth"], ["stroke", "barBorderColor"], ["lineWidth", "barBorderWidth"], ["opacity"], ["shadowBlur"], ["shadowOffsetX"], ["shadowOffsetY"], ["shadowColor"]]),lb = { getBarItemStyle: function getBarItemStyle(t) {var e = sb(this, t);if (this.getBorderLineDash) {var n = this.getBorderLineDash();n && (e.lineDash = n);}return e;} },ub = go({ type: "sausage", shape: { cx: 0, cy: 0, r0: 0, r: 0, startAngle: 0, endAngle: 2 * Math.PI, clockwise: !0 }, buildPath: function buildPath(t, e) {var n = e.cx,i = e.cy,r = Math.max(e.r0 || 0, 0),o = Math.max(e.r, 0),a = .5 * (o - r),s = r + a,l = e.startAngle,u = e.endAngle,h = e.clockwise,c = Math.cos(l),d = Math.sin(l),f = Math.cos(u),p = Math.sin(u),g = h ? u - l < 2 * Math.PI : l - u < 2 * Math.PI;g && (t.moveTo(c * r + n, d * r + i), t.arc(c * s + n, d * s + i, a, -Math.PI + l, l, !h)), t.arc(n, i, o, l, u, !h), t.moveTo(f * o + n, p * o + i), t.arc(f * s + n, p * s + i, a, u - 2 * Math.PI, u - Math.PI, !h), 0 !== r && (t.arc(n, i, r, u, l, h), t.moveTo(c * r + n, p * r + i)), t.closePath();} }),hb = ["itemStyle", "barBorderWidth"],cb = [0, 0];a(fa.prototype, lb), Du({ type: "bar", render: function render(t, e, n) {this._updateDrawMode(t);var i = t.get("coordinateSystem");return ("cartesian2d" === i || "polar" === i) && (this._isLargeDraw ? this._renderLarge(t, e, n) : this._renderNormal(t, e, n)), this.group;}, incrementalPrepareRender: function incrementalPrepareRender(t) {this._clear(), this._updateDrawMode(t);}, incrementalRender: function incrementalRender(t, e) {this._incrementalRenderLarge(t, e);}, _updateDrawMode: function _updateDrawMode(t) {var e = t.pipelineContext.large;(null == this._isLargeDraw || e ^ this._isLargeDraw) && (this._isLargeDraw = e, this._clear());}, _renderNormal: function _renderNormal(t) {var e,n = this.group,i = t.getData(),r = this._data,o = t.coordinateSystem,a = o.getBaseAxis();"cartesian2d" === o.type ? e = a.isHorizontal() : "polar" === o.type && (e = "angle" === a.dim);var s = t.isAnimationEnabled() ? t : null,l = t.get("clip", !0),u = Pc(o, i);n.removeClipPath();var h = t.get("roundCap", !0),c = t.get("showBackground", !0),d = t.getModel("backgroundStyle"),f = d.get("barBorderRadius") || 0,p = [],g = this._backgroundEls || [],v = function v(t) {var n = vb[o.type](i, t),r = Gc(o, e, n);return r.useStyle(d.getBarItemStyle()), "cartesian2d" === o.type && r.setShape("r", f), p[t] = r, r;};i.diff(r).add(function (r) {var a = i.getItemModel(r),d = vb[o.type](i, r, a);if (c && v(r), i.hasValue(r)) {if (l) {var f = pb[o.type](u, d);if (f) return void n.remove(p);}var p = gb[o.type](r, d, e, s, !1, h);i.setItemGraphicEl(r, p), n.add(p), zc(p, i, r, a, d, t, e, "polar" === o.type);}}).update(function (a, m) {var y = i.getItemModel(a),_ = vb[o.type](i, a, y);if (c) {var x;0 === g.length ? x = v(m) : (x = g[m], x.useStyle(d.getBarItemStyle()), "cartesian2d" === o.type && x.setShape("r", f), p[a] = x);var w = vb[o.type](i, a),b = Vc(e, w, o);ta(x, { shape: b }, s, a);}var S = r.getItemGraphicEl(m);if (!i.hasValue(a)) return void n.remove(S);if (l) {var M = pb[o.type](u, _);if (M) return void n.remove(S);}S ? ta(S, { shape: _ }, s, a) : S = gb[o.type](a, _, e, s, !0, h), i.setItemGraphicEl(a, S), n.add(S), zc(S, i, a, y, _, t, e, "polar" === o.type);}).remove(function (t) {var e = r.getItemGraphicEl(t);"cartesian2d" === o.type ? e && Oc(t, s, e) : e && Lc(t, s, e);}).execute();var m = this._backgroundGroup || (this._backgroundGroup = new ig());m.removeAll();for (var y = 0; y < p.length; ++y) {m.add(p[y]);}n.add(m), this._backgroundEls = p, this._data = i;}, _renderLarge: function _renderLarge(t) {this._clear(), Rc(t, this.group);var e = t.get("clip", !0) ? Ac(t.coordinateSystem, !1, t) : null;e ? this.group.setClipPath(e) : this.group.removeClipPath();}, _incrementalRenderLarge: function _incrementalRenderLarge(t, e) {this._removeBackground(), Rc(e, this.group, !0);}, dispose: H, remove: function remove(t) {this._clear(t);}, _clear: function _clear(t) {var e = this.group,n = this._data;t && t.get("animation") && n && !this._isLargeDraw ? (this._removeBackground(), this._backgroundEls = [], n.eachItemGraphicEl(function (e) {"sector" === e.type ? Lc(e.dataIndex, t, e) : Oc(e.dataIndex, t, e);})) : e.removeAll(), this._data = null;}, _removeBackground: function _removeBackground() {this.group.remove(this._backgroundGroup), this._backgroundGroup = null;} });var db = Math.max,fb = Math.min,pb = { cartesian2d: function cartesian2d(t, e) {var n = e.width < 0 ? -1 : 1,i = e.height < 0 ? -1 : 1;0 > n && (e.x += e.width, e.width = -e.width), 0 > i && (e.y += e.height, e.height = -e.height);var r = db(e.x, t.x),o = fb(e.x + e.width, t.x + t.width),a = db(e.y, t.y),s = fb(e.y + e.height, t.y + t.height);e.x = r, e.y = a, e.width = o - r, e.height = s - a;var l = e.width < 0 || e.height < 0;return 0 > n && (e.x += e.width, e.width = -e.width), 0 > i && (e.y += e.height, e.height = -e.height), l;}, polar: function polar(t, e) {var n = e.r0 <= e.r ? 1 : -1;if (0 > n) {var i = e.r;e.r = e.r0, e.r0 = i;}var i = fb(e.r, t.r),r = db(e.r0, t.r0);e.r = i, e.r0 = r;var o = 0 > i - r;if (0 > n) {var i = e.r;e.r = e.r0, e.r0 = i;}return o;} },gb = { cartesian2d: function cartesian2d(t, e, n, i, r) {var o = new Am({ shape: a({}, e), z2: 1 });if (o.name = "item", i) {var s = o.shape,l = n ? "height" : "width",u = {};s[l] = 0, u[l] = e[l], ey[r ? "updateProps" : "initProps"](o, { shape: u }, i, t);}return o;}, polar: function polar(t, e, n, i, r, o) {var a = e.startAngle < e.endAngle,l = !n && o ? ub : bm,u = new l({ shape: s({ clockwise: a }, e), z2: 1 });if (u.name = "item", i) {var h = u.shape,c = n ? "r" : "endAngle",d = {};h[c] = n ? 0 : e.startAngle, d[c] = e[c], ey[r ? "updateProps" : "initProps"](u, { shape: d }, i, t);}return u;} },vb = { cartesian2d: function cartesian2d(t, e, n) {var i = t.getItemLayout(e),r = n ? Ec(n, i) : 0,o = i.width > 0 ? 1 : -1,a = i.height > 0 ? 1 : -1;return { x: i.x + o * r / 2, y: i.y + a * r / 2, width: i.width - o * r, height: i.height - a * r };}, polar: function polar(t, e) {var n = t.getItemLayout(e);return { cx: n.cx, cy: n.cy, r0: n.r0, r: n.r, startAngle: n.startAngle, endAngle: n.endAngle };} },mb = to.extend({ type: "largeBar", shape: { points: [] }, buildPath: function buildPath(t, e) {for (var n = e.points, i = this.__startPoint, r = this.__baseDimIdx, o = 0; o < n.length; o += 2) {i[r] = n[o + r], t.moveTo(i[0], i[1]), t.lineTo(n[o], n[o + 1]);}} }),yb = fl(function (t) {var e = this,n = Nc(e, t.offsetX, t.offsetY);e.dataIndex = n >= 0 ? n : null;}, 30, !1),_b = Math.PI,xb = function xb(t, e) {this.opt = e, this.axisModel = t, s(e, { labelOffset: 0, nameDirection: 1, tickDirection: 1, labelDirection: 1, silent: !0 }), this.group = new ig();var n = new ig({ position: e.position.slice(), rotation: e.rotation });n.updateTransform(), this._transform = n.transform, this._dumbGroup = n;};xb.prototype = { constructor: xb, hasBuilder: function hasBuilder(t) {return !!wb[t];}, add: function add(t) {wb[t].call(this);}, getGroup: function getGroup() {return this.group;} };var wb = { axisLine: function axisLine() {var t = this.opt,e = this.axisModel;if (e.get("axisLine.show")) {var n = this.axisModel.axis.getExtent(),i = this._transform,r = [n[0], 0],o = [n[1], 0];i && (oe(r, r, i), oe(o, o, i));var s = a({ lineCap: "round" }, e.getModel("axisLine.lineStyle").getLineStyle());this.group.add(new Om({ anid: "line", subPixelOptimize: !0, shape: { x1: r[0], y1: r[1], x2: o[0], y2: o[1] }, style: s, strokeContainThreshold: t.strokeContainThreshold || 5, silent: !0, z2: 1 }));var l = e.get("axisLine.symbol"),u = e.get("axisLine.symbolSize"),h = e.get("axisLine.symbolOffset") || 0;if ("number" == typeof h && (h = [h, h]), null != l) {"string" == typeof l && (l = [l, l]), ("string" == typeof u || "number" == typeof u) && (u = [u, u]);var c = u[0],d = u[1];f([{ rotate: t.rotation + Math.PI / 2, offset: h[0], r: 0 }, { rotate: t.rotation - Math.PI / 2, offset: h[1], r: Math.sqrt((r[0] - o[0]) * (r[0] - o[0]) + (r[1] - o[1]) * (r[1] - o[1])) }], function (e, n) {if ("none" !== l[n] && null != l[n]) {var i = Xh(l[n], -c / 2, -d / 2, c, d, s.stroke, !0),o = e.r + e.offset,a = [r[0] + o * Math.cos(t.rotation), r[1] - o * Math.sin(t.rotation)];i.attr({ rotation: e.rotate, position: a, silent: !0, z2: 11 }), this.group.add(i);}}, this);}}}, axisTickLabel: function axisTickLabel() {var t = this.axisModel,e = this.opt,n = Zc(this, t, e),i = $c(this, t, e);Xc(t, i, n), Kc(this, t, e);}, axisName: function axisName() {var t = this.opt,e = this.axisModel,n = k(t.axisName, e.get("name"));if (n) {var i,r = e.get("nameLocation"),o = t.nameDirection,s = e.getModel("nameTextStyle"),l = e.get("nameGap") || 0,u = this.axisModel.axis.getExtent(),h = u[0] > u[1] ? -1 : 1,c = ["start" === r ? u[0] - h * l : "end" === r ? u[1] + h * l : (u[0] + u[1]) / 2, jc(r) ? t.labelOffset + o * l : 0],d = e.get("nameRotate");null != d && (d = d * _b / 180);var f;jc(r) ? i = Sb(t.rotation, null != d ? d : t.rotation, o) : (i = Wc(t, r, d || 0, u), f = t.axisNameAvailableWidth, null != f && (f = Math.abs(f / Math.sin(i.rotation)), !isFinite(f) && (f = null)));var p = s.getFont(),g = e.get("nameTruncate", !0) || {},v = g.ellipsis,m = k(t.nameTruncateMaxWidth, g.maxWidth, f),y = null != v && null != m ? yy(n, m, p, v, { minChar: 2, placeholder: g.placeholder }) : n,_ = e.get("tooltip", !0),x = e.mainType,w = { componentType: x, name: n, $vars: ["name"] };w[x + "Index"] = e.componentIndex;var b = new ym({ anid: "name", __fullText: n, __truncatedText: y, position: c, rotation: i.rotation, silent: Mb(e), z2: 1, tooltip: _ && _.show ? a({ content: n, formatter: function formatter() {return n;}, formatterParams: w }, _) : null });Xo(b.style, s, { text: y, textFont: p, textFill: s.getTextColor() || e.get("axisLine.lineStyle.color"), textAlign: s.get("align") || i.textAlign, textVerticalAlign: s.get("verticalAlign") || i.textVerticalAlign }), e.get("triggerEvent") && (b.eventData = bb(e), b.eventData.targetType = "axisName", b.eventData.name = n), this._dumbGroup.add(b), b.updateTransform(), this.group.add(b), b.decomposeTransform();}} },bb = xb.makeAxisEventDataBase = function (t) {var e = { componentType: t.mainType, componentIndex: t.componentIndex };return e[t.mainType + "Index"] = t.componentIndex, e;},Sb = xb.innerTextLayout = function (t, e, n) {var i,r,o = ka(e - t);return Da(o) ? (r = n > 0 ? "top" : "bottom", i = "center") : Da(o - _b) ? (r = n > 0 ? "bottom" : "top", i = "center") : (r = "middle", i = o > 0 && _b > o ? n > 0 ? "right" : "left" : n > 0 ? "left" : "right"), { rotation: o, textAlign: i, textVerticalAlign: r };},Mb = xb.isLabelSilent = function (t) {var e = t.get("tooltip");return t.get("silent") || !(t.get("triggerEvent") || e && e.show);},Cb = f,Ib = _,Tb = Tu({ type: "axis", _axisPointer: null, axisPointerClass: null, render: function render(t, e, n, i) {this.axisPointerClass && rd(t), Tb.superApply(this, "render", arguments), ud(this, t, e, n, i, !0);}, updateAxisPointer: function updateAxisPointer(t, e, n, i) {ud(this, t, e, n, i, !1);}, remove: function remove(t, e) {var n = this._axisPointer;n && n.remove(e), Tb.superApply(this, "remove", arguments);}, dispose: function dispose(t, e) {hd(this, e), Tb.superApply(this, "dispose", arguments);} }),kb = [];Tb.registerAxisPointerClass = function (t, e) {kb[t] = e;}, Tb.getAxisPointerClass = function (t) {return t && kb[t];};var Db = ["axisLine", "axisTickLabel", "axisName"],Ab = ["splitArea", "splitLine", "minorSplitLine"],Pb = Tb.extend({ type: "cartesianAxis", axisPointerClass: "CartesianAxisPointer", render: function render(t, e, n, i) {this.group.removeAll();var r = this._axisGroup;if (this._axisGroup = new ig(), this.group.add(this._axisGroup), t.get("show")) {var o = t.getCoordSysModel(),a = cd(o, t),s = new xb(t, a);f(Db, s.add, s), this._axisGroup.add(s.getGroup()), f(Ab, function (e) {t.get(e + ".show") && this["_" + e](t, o);}, this), oa(r, this._axisGroup, t), Pb.superCall(this, "render", t, e, n, i);}}, remove: function remove() {fd(this);}, _splitLine: function _splitLine(t, e) {var n = t.axis;if (!n.scale.isBlank()) {var i = t.getModel("splitLine"),r = i.getModel("lineStyle"),o = r.get("color");o = x(o) ? o : [o];for (var a = e.coordinateSystem.getRect(), l = n.isHorizontal(), u = 0, h = n.getTicksCoords({ tickModel: i }), c = [], d = [], f = r.getLineStyle(), p = 0; p < h.length; p++) {var g = n.toGlobalCoord(h[p].coord);l ? (c[0] = g, c[1] = a.y, d[0] = g, d[1] = a.y + a.height) : (c[0] = a.x, c[1] = g, d[0] = a.x + a.width, d[1] = g);var v = u++ % o.length,m = h[p].tickValue;this._axisGroup.add(new Om({ anid: null != m ? "line_" + h[p].tickValue : null, subPixelOptimize: !0, shape: { x1: c[0], y1: c[1], x2: d[0], y2: d[1] }, style: s({ stroke: o[v] }, f), silent: !0 }));}}}, _minorSplitLine: function _minorSplitLine(t, e) {var n = t.axis,i = t.getModel("minorSplitLine"),r = i.getModel("lineStyle"),o = e.coordinateSystem.getRect(),a = n.isHorizontal(),s = n.getMinorTicksCoords();if (s.length) for (var l = [], u = [], h = r.getLineStyle(), c = 0; c < s.length; c++) {for (var d = 0; d < s[c].length; d++) {var f = n.toGlobalCoord(s[c][d].coord);a ? (l[0] = f, l[1] = o.y, u[0] = f, u[1] = o.y + o.height) : (l[0] = o.x, l[1] = f, u[0] = o.x + o.width, u[1] = f), this._axisGroup.add(new Om({ anid: "minor_line_" + s[c][d].tickValue, subPixelOptimize: !0, shape: { x1: l[0], y1: l[1], x2: u[0], y2: u[1] }, style: h, silent: !0 }));}}}, _splitArea: function _splitArea(t, e) {dd(this, this._axisGroup, t, e);} });Pb.extend({ type: "xAxis" }), Pb.extend({ type: "yAxis" }), Tu({ type: "grid", render: function render(t) {this.group.removeAll(), t.get("show") && this.group.add(new Am({ shape: t.coordinateSystem.getRect(), style: s({ fill: t.get("backgroundColor") }, t.getItemStyle()), silent: !0, z2: -1 }));
    } }), vu(function (t) {t.xAxis && t.yAxis && !t.grid && (t.grid = {});}), bu(mx.VISUAL.LAYOUT, _(Th, "bar")), bu(mx.VISUAL.PROGRESSIVE_LAYOUT, cw), Su({ seriesType: "bar", reset: function reset(t) {t.getData().setVisual("legendSymbol", "roundRect");} }), f_.extend({ type: "series.line", dependencies: ["grid", "polar"], getInitialData: function getInitialData() {return uh(this.getSource(), this, { useEncodeDefaulter: !0 });}, defaultOption: { zlevel: 0, z: 2, coordinateSystem: "cartesian2d", legendHoverLink: !0, hoverAnimation: !0, clip: !0, label: { position: "top" }, lineStyle: { width: 2, type: "solid" }, step: !1, smooth: !1, smoothMonotone: null, symbol: "emptyCircle", symbolSize: 4, symbolRotate: null, showSymbol: !0, showAllSymbol: "auto", connectNulls: !1, sampling: "none", animationEasing: "linear", progressive: 0, hoverLayerThreshold: 1 / 0 } });var Ob = pd.prototype,Lb = pd.getSymbolSize = function (t, e) {var n = t.getItemVisual(e, "symbolSize");return n instanceof Array ? n.slice() : [+n, +n];};Ob._createSymbol = function (t, e, n, i, r) {this.removeAll();var o = e.getItemVisual(n, "color"),a = Xh(t, -1, -1, 2, 2, o, r);a.attr({ z2: 100, culling: !0, scale: gd(i) }), a.drift = vd, this._symbolType = t, this.add(a);}, Ob.stopSymbolAnimation = function (t) {this.childAt(0).stopAnimation(t);}, Ob.getSymbolPath = function () {return this.childAt(0);}, Ob.getScale = function () {return this.childAt(0).scale;}, Ob.highlight = function () {this.childAt(0).trigger("emphasis");}, Ob.downplay = function () {this.childAt(0).trigger("normal");}, Ob.setZ = function (t, e) {var n = this.childAt(0);n.zlevel = t, n.z = e;}, Ob.setDraggable = function (t) {var e = this.childAt(0);e.draggable = t, e.cursor = t ? "move" : e.cursor;}, Ob.updateData = function (t, e, n) {this.silent = !1;var i = t.getItemVisual(e, "symbol") || "circle",r = t.hostModel,o = Lb(t, e),a = i !== this._symbolType;if (a) {var s = t.getItemVisual(e, "symbolKeepAspect");this._createSymbol(i, t, e, o, s);} else {var l = this.childAt(0);l.silent = !1, ta(l, { scale: gd(o) }, r, e);}if (this._updateCommon(t, e, o, n), a) {var l = this.childAt(0),u = n && n.fadeIn,h = { scale: l.scale.slice() };u && (h.style = { opacity: l.style.opacity }), l.scale = [0, 0], u && (l.style.opacity = 0), ea(l, h, r, e);}this._seriesModel = r;};var Bb = ["itemStyle"],zb = ["emphasis", "itemStyle"],Eb = ["label"],Rb = ["emphasis", "label"];Ob._updateCommon = function (t, e, n, i) {function r(e) {return b ? t.getName(e) : Cc(t, e);}var o = this.childAt(0),s = t.hostModel,l = t.getItemVisual(e, "color");"image" !== o.type ? o.useStyle({ strokeNoScale: !0 }) : o.setStyle({ opacity: 1, shadowBlur: null, shadowOffsetX: null, shadowOffsetY: null, shadowColor: null });var u = i && i.itemStyle,h = i && i.hoverItemStyle,c = i && i.symbolOffset,d = i && i.labelModel,f = i && i.hoverLabelModel,p = i && i.hoverAnimation,g = i && i.cursorStyle;if (!i || t.hasItemOption) {var v = i && i.itemModel ? i.itemModel : t.getItemModel(e);u = v.getModel(Bb).getItemStyle(["color"]), h = v.getModel(zb).getItemStyle(), c = v.getShallow("symbolOffset"), d = v.getModel(Eb), f = v.getModel(Rb), p = v.getShallow("hoverAnimation"), g = v.getShallow("cursor");} else h = a({}, h);var m = o.style,y = t.getItemVisual(e, "symbolRotate");o.attr("rotation", (y || 0) * Math.PI / 180 || 0), c && o.attr("position", [wa(c[0], n[0]), wa(c[1], n[1])]), g && o.attr("cursor", g), o.setColor(l, i && i.symbolInnerColor), o.setStyle(u);var _ = t.getItemVisual(e, "opacity");null != _ && (m.opacity = _);var x = t.getItemVisual(e, "liftZ"),w = o.__z2Origin;null != x ? null == w && (o.__z2Origin = o.z2, o.z2 += x) : null != w && (o.z2 = w, o.__z2Origin = null);var b = i && i.useNameLabel;Go(m, h, d, f, { labelFetcher: s, labelDataIndex: e, defaultText: r, isRectText: !0, autoColor: l }), o.__symbolOriginalScale = gd(n), o.hoverStyle = h, o.highDownOnUpdate = p && s.isAnimationEnabled() ? md : null, No(o);}, Ob.fadeOut = function (t, e) {var n = this.childAt(0);this.silent = n.silent = !0, !(e && e.keepLabel) && (n.style.text = null), ta(n, { style: { opacity: 0 }, scale: [0, 0] }, this._seriesModel, this.dataIndex, t);}, h(pd, ig);var Nb = yd.prototype;Nb.updateData = function (t, e) {e = xd(e);var n = this.group,i = t.hostModel,r = this._data,o = this._symbolCtor,a = wd(t);r || n.removeAll(), t.diff(r).add(function (i) {var r = t.getItemLayout(i);if (_d(t, r, i, e)) {var s = new o(t, i, a);s.attr("position", r), t.setItemGraphicEl(i, s), n.add(s);}}).update(function (s, l) {var u = r.getItemGraphicEl(l),h = t.getItemLayout(s);return _d(t, h, s, e) ? (u ? (u.updateData(t, s, a), ta(u, { position: h }, i)) : (u = new o(t, s), u.attr("position", h)), n.add(u), void t.setItemGraphicEl(s, u)) : void n.remove(u);}).remove(function (t) {var e = r.getItemGraphicEl(t);e && e.fadeOut(function () {n.remove(e);});}).execute(), this._data = t;}, Nb.isPersistent = function () {return !0;}, Nb.updateLayout = function () {var t = this._data;t && t.eachItemGraphicEl(function (e, n) {var i = t.getItemLayout(n);e.attr("position", i);});}, Nb.incrementalPrepareUpdate = function (t) {this._seriesScope = wd(t), this._data = null, this.group.removeAll();}, Nb.incrementalUpdate = function (t, e, n) {function i(t) {t.isGroup || (t.incremental = t.useHoverLayer = !0);}n = xd(n);for (var r = t.start; r < t.end; r++) {var o = e.getItemLayout(r);if (_d(e, o, r, n)) {var a = new this._symbolCtor(e, r, this._seriesScope);a.traverse(i), a.attr("position", o), this.group.add(a), e.setItemGraphicEl(r, a);}}}, Nb.remove = function (t) {var e = this.group,n = this._data;n && t ? n.eachItemGraphicEl(function (t) {t.fadeOut(function () {e.remove(t);});}) : e.removeAll();};var Fb = function Fb(t, e, n, i, r, o, a, s) {for (var l = Cd(t, e), u = [], h = [], c = [], d = [], f = [], p = [], g = [], v = bd(r, e, a), m = bd(o, t, s), y = 0; y < l.length; y++) {var _ = l[y],x = !0;switch (_.cmd) {case "=":var w = t.getItemLayout(_.idx),b = e.getItemLayout(_.idx1);(isNaN(w[0]) || isNaN(w[1])) && (w = b.slice()), u.push(w), h.push(b), c.push(n[_.idx]), d.push(i[_.idx1]), g.push(e.getRawIndex(_.idx1));break;case "+":var S = _.idx;u.push(r.dataToPoint([e.get(v.dataDimsForPoint[0], S), e.get(v.dataDimsForPoint[1], S)])), h.push(e.getItemLayout(S).slice()), c.push(Md(v, r, e, S)), d.push(i[S]), g.push(e.getRawIndex(S));break;case "-":var S = _.idx,M = t.getRawIndex(S);M !== S ? (u.push(t.getItemLayout(S)), h.push(o.dataToPoint([t.get(m.dataDimsForPoint[0], S), t.get(m.dataDimsForPoint[1], S)])), c.push(n[S]), d.push(Md(m, o, t, S)), g.push(M)) : x = !1;}x && (f.push(_), p.push(p.length));}p.sort(function (t, e) {return g[t] - g[e];});for (var C = [], I = [], T = [], k = [], D = [], y = 0; y < p.length; y++) {var S = p[y];C[y] = u[S], I[y] = h[S], T[y] = c[S], k[y] = d[S], D[y] = f[S];}return { current: C, next: I, stackedOnCurrent: T, stackedOnNext: k, status: D };},Hb = ae,Vb = se,Gb = U,Wb = G,Xb = [],Yb = [],Ub = [],jb = to.extend({ type: "ec-polyline", shape: { points: [], smooth: 0, smoothConstraint: !0, smoothMonotone: null, connectNulls: !1 }, style: { fill: null, stroke: "#000" }, brush: wm(to.prototype.brush), buildPath: function buildPath(t, e) {var n = e.points,i = 0,r = n.length,o = Ad(n, e.smoothConstraint);if (e.connectNulls) {for (; r > 0 && Id(n[r - 1]); r--) {;}for (; r > i && Id(n[i]); i++) {;}}for (; r > i;) {i += Td(t, n, i, r, r, 1, o.min, o.max, e.smooth, e.smoothMonotone, e.connectNulls) + 1;}} }),qb = to.extend({ type: "ec-polygon", shape: { points: [], stackedOnPoints: [], smooth: 0, stackedOnSmooth: 0, smoothConstraint: !0, smoothMonotone: null, connectNulls: !1 }, brush: wm(to.prototype.brush), buildPath: function buildPath(t, e) {var n = e.points,i = e.stackedOnPoints,r = 0,o = n.length,a = e.smoothMonotone,s = Ad(n, e.smoothConstraint),l = Ad(i, e.smoothConstraint);if (e.connectNulls) {for (; o > 0 && Id(n[o - 1]); o--) {;}for (; o > r && Id(n[r]); r++) {;}}for (; o > r;) {var u = Td(t, n, r, o, o, 1, s.min, s.max, e.smooth, a, e.connectNulls);Td(t, i, r + u - 1, u, o, -1, l.min, l.max, e.stackedOnSmooth, a, e.connectNulls), r += u + 1, t.closePath();}} });ll.extend({ type: "line", init: function init() {var t = new ig(),e = new yd();this.group.add(e.group), this._symbolDraw = e, this._lineGroup = t;}, render: function render(t, e, n) {var i = t.coordinateSystem,r = this.group,o = t.getData(),a = t.getModel("lineStyle"),l = t.getModel("areaStyle"),u = o.mapArray(o.getItemLayout),h = "polar" === i.type,c = this._coordSys,d = this._symbolDraw,f = this._polyline,p = this._polygon,g = this._lineGroup,v = t.get("animation"),m = !l.isEmpty(),y = l.get("origin"),_ = bd(i, o, y),x = Bd(i, o, _),w = t.get("showSymbol"),b = w && !h && Rd(t, o, i),S = this._data;S && S.eachItemGraphicEl(function (t, e) {t.__temp && (r.remove(t), S.setItemGraphicEl(e, null));}), w || d.remove(), r.add(g);var M,C = !h && t.get("step");i && i.getArea && t.get("clip", !0) && (M = i.getArea(), null != M.width ? (M.x -= .1, M.y -= .1, M.width += .2, M.height += .2) : M.r0 && (M.r0 -= .5, M.r1 += .5)), this._clipShapeForSymbol = M, f && c.type === i.type && C === this._step ? (m && !p ? p = this._newPolygon(u, x, i, v) : p && !m && (g.remove(p), p = this._polygon = null), g.setClipPath(Fd(i, !1, t)), w && d.updateData(o, { isIgnore: b, clipShape: M }), o.eachItemGraphicEl(function (t) {t.stopAnimation(!0);}), Pd(this._stackedOnPoints, x) && Pd(this._points, u) || (v ? this._updateAnimation(o, x, i, n, C, y) : (C && (u = zd(u, i, C), x = zd(x, i, C)), f.setShape({ points: u }), p && p.setShape({ points: u, stackedOnPoints: x })))) : (w && d.updateData(o, { isIgnore: b, clipShape: M }), C && (u = zd(u, i, C), x = zd(x, i, C)), f = this._newPolyline(u, i, v), m && (p = this._newPolygon(u, x, i, v)), g.setClipPath(Fd(i, !0, t)));var I = Ed(o, i) || o.getVisual("color");f.useStyle(s(a.getLineStyle(), { fill: "none", stroke: I, lineJoin: "bevel" }));var T = t.get("smooth");if (T = Ld(t.get("smooth")), f.setShape({ smooth: T, smoothMonotone: t.get("smoothMonotone"), connectNulls: t.get("connectNulls") }), p) {var k = o.getCalculationInfo("stackedOnSeries"),D = 0;p.useStyle(s(l.getAreaStyle(), { fill: I, opacity: .7, lineJoin: "bevel" })), k && (D = Ld(k.get("smooth"))), p.setShape({ smooth: T, stackedOnSmooth: D, smoothMonotone: t.get("smoothMonotone"), connectNulls: t.get("connectNulls") });}this._data = o, this._coordSys = i, this._stackedOnPoints = x, this._points = u, this._step = C, this._valueOrigin = y;}, dispose: function dispose() {}, highlight: function highlight(t, e, n, i) {var r = t.getData(),o = sr(r, i);if (!(o instanceof Array) && null != o && o >= 0) {var a = r.getItemGraphicEl(o);if (!a) {var s = r.getItemLayout(o);if (!s) return;if (this._clipShapeForSymbol && !this._clipShapeForSymbol.contain(s[0], s[1])) return;a = new pd(r, o), a.position = s, a.setZ(t.get("zlevel"), t.get("z")), a.ignore = isNaN(s[0]) || isNaN(s[1]), a.__temp = !0, r.setItemGraphicEl(o, a), a.stopSymbolAnimation(!0), this.group.add(a);}a.highlight();} else ll.prototype.highlight.call(this, t, e, n, i);}, downplay: function downplay(t, e, n, i) {var r = t.getData(),o = sr(r, i);if (null != o && o >= 0) {var a = r.getItemGraphicEl(o);a && (a.__temp ? (r.setItemGraphicEl(o, null), this.group.remove(a)) : a.downplay());} else ll.prototype.downplay.call(this, t, e, n, i);}, _newPolyline: function _newPolyline(t) {var e = this._polyline;return e && this._lineGroup.remove(e), e = new jb({ shape: { points: t }, silent: !0, z2: 10 }), this._lineGroup.add(e), this._polyline = e, e;}, _newPolygon: function _newPolygon(t, e) {var n = this._polygon;return n && this._lineGroup.remove(n), n = new qb({ shape: { points: t, stackedOnPoints: e }, silent: !0 }), this._lineGroup.add(n), this._polygon = n, n;}, _updateAnimation: function _updateAnimation(t, e, n, i, r, o) {var a = this._polyline,s = this._polygon,l = t.hostModel,u = Fb(this._data, t, this._stackedOnPoints, e, this._coordSys, n, this._valueOrigin, o),h = u.current,c = u.stackedOnCurrent,d = u.next,f = u.stackedOnNext;if (r && (h = zd(u.current, n, r), c = zd(u.stackedOnCurrent, n, r), d = zd(u.next, n, r), f = zd(u.stackedOnNext, n, r)), Od(h, d) > 3e3 || s && Od(c, f) > 3e3) return a.setShape({ points: d }), void (s && s.setShape({ points: d, stackedOnPoints: f }));a.shape.__points = u.current, a.shape.points = h, ta(a, { shape: { points: d } }, l), s && (s.setShape({ points: h, stackedOnPoints: c }), ta(s, { shape: { points: d, stackedOnPoints: f } }, l));for (var p = [], g = u.status, v = 0; v < g.length; v++) {var m = g[v].cmd;if ("=" === m) {var y = t.getItemGraphicEl(g[v].idx1);y && p.push({ el: y, ptIdx: v });}}a.animators && a.animators.length && a.animators[0].during(function () {for (var t = 0; t < p.length; t++) {var e = p[t].el;e.attr("position", a.shape.__points[p[t].ptIdx]);}});}, remove: function remove() {var t = this.group,e = this._data;this._lineGroup.removeAll(), this._symbolDraw.remove(!0), e && e.eachItemGraphicEl(function (n, i) {n.__temp && (t.remove(n), e.setItemGraphicEl(i, null));}), this._polyline = this._polygon = this._coordSys = this._points = this._stackedOnPoints = this._data = null;} });var Zb = function Zb(t, e, n) {return { seriesType: t, performRawSeries: !0, reset: function reset(t, i) {function r(e, n) {if (f) {var i = t.getRawValue(n),r = t.getDataParams(n);h && e.setItemVisual(n, "symbol", a(i, r)), c && e.setItemVisual(n, "symbolSize", s(i, r)), d && e.setItemVisual(n, "symbolRotate", u(i, r));}if (e.hasItemOption) {var o = e.getItemModel(n),l = o.getShallow("symbol", !0),p = o.getShallow("symbolSize", !0),g = o.getShallow("symbolRotate", !0),v = o.getShallow("symbolKeepAspect", !0);null != l && e.setItemVisual(n, "symbol", l), null != p && e.setItemVisual(n, "symbolSize", p), null != g && e.setItemVisual(n, "symbolRotate", g), null != v && e.setItemVisual(n, "symbolKeepAspect", v);}}var o = t.getData(),a = t.get("symbol"),s = t.get("symbolSize"),l = t.get("symbolKeepAspect"),u = t.get("symbolRotate"),h = w(a),c = w(s),d = w(u),f = h || c || d,p = !h && a ? a : e,g = c ? null : s;return o.setVisual({ legendSymbol: n || p, symbol: p, symbolSize: g, symbolKeepAspect: l, symbolRotate: u }), i.isSeriesFiltered(t) ? void 0 : { dataEach: o.hasItemOption || f ? r : null };} };},Kb = function Kb(t) {return { seriesType: t, plan: v_(), reset: function reset(t) {function e(t, e) {for (var n = t.end - t.start, r = o && new Float32Array(n * s), l = t.start, u = 0, h = [], c = []; l < t.end; l++) {var d;if (1 === s) {var f = e.get(a[0], l);d = !isNaN(f) && i.dataToPoint(f, null, c);} else {var f = h[0] = e.get(a[0], l),p = h[1] = e.get(a[1], l);d = !isNaN(f) && !isNaN(p) && i.dataToPoint(h, null, c);}o ? (r[u++] = d ? d[0] : 0 / 0, r[u++] = d ? d[1] : 0 / 0) : e.setItemLayout(l, d && d.slice() || [0 / 0, 0 / 0]);}o && e.setLayout("symbolPoints", r);}var n = t.getData(),i = t.coordinateSystem,r = t.pipelineContext,o = r.large;if (i) {var a = p(i.dimensions, function (t) {return n.mapDimension(t);}).slice(0, 2),s = a.length,l = n.getCalculationInfo("stackResultDimension");return sh(n, a[0]) && (a[0] = l), sh(n, a[1]) && (a[1] = l), s && { progress: e };}} };},$b = { average: function average(t) {for (var e = 0, n = 0, i = 0; i < t.length; i++) {isNaN(t[i]) || (e += t[i], n++);}return 0 === n ? 0 / 0 : e / n;}, sum: function sum(t) {for (var e = 0, n = 0; n < t.length; n++) {e += t[n] || 0;}return e;}, max: function max(t) {for (var e = -1 / 0, n = 0; n < t.length; n++) {t[n] > e && (e = t[n]);}return isFinite(e) ? e : 0 / 0;}, min: function min(t) {for (var e = 1 / 0, n = 0; n < t.length; n++) {t[n] < e && (e = t[n]);}return isFinite(e) ? e : 0 / 0;}, nearest: function nearest(t) {return t[0];} },Qb = function Qb(t) {return Math.round(t.length / 2);},Jb = function Jb(t) {return { seriesType: t, modifyOutputEnd: !0, reset: function reset(t) {var e = t.getData(),n = t.get("sampling"),i = t.coordinateSystem;if ("cartesian2d" === i.type && n) {var r = i.getBaseAxis(),o = i.getOtherAxis(r),a = r.getExtent(),s = Math.abs(a[1] - a[0]),l = Math.round(e.count() / s);if (l > 1) {var u;"string" == typeof n ? u = $b[n] : "function" == typeof n && (u = n), u && t.setData(e.downSample(e.mapDimension(o.dim), 1 / l, u, Qb));}}} };};Su(Zb("line", "circle", "line")), bu(Kb("line")), mu(mx.PROCESSOR.STATISTIC, Jb("line")), Iu({ type: "title", layoutMode: { type: "box", ignoreSize: !0 }, defaultOption: { zlevel: 0, z: 6, show: !0, text: "", target: "blank", subtext: "", subtarget: "blank", left: 0, top: 0, backgroundColor: "rgba(0,0,0,0)", borderColor: "#ccc", borderWidth: 0, padding: 5, itemGap: 10, textStyle: { fontSize: 18, fontWeight: "bolder", color: "#333" }, subtextStyle: { color: "#aaa" } } }), Tu({ type: "title", render: function render(t, e, n) {if (this.group.removeAll(), t.get("show")) {var i = this.group,r = t.getModel("textStyle"),o = t.getModel("subtextStyle"),a = t.get("textAlign"),s = D(t.get("textBaseline"), t.get("textVerticalAlign")),l = new ym({ style: Xo({}, r, { text: t.get("text"), textFill: r.getTextColor() }, { disableBox: !0 }), z2: 10 }),u = l.getBoundingRect(),h = t.get("subtext"),c = new ym({ style: Xo({}, o, { text: h, textFill: o.getTextColor(), y: u.height + t.get("itemGap"), textVerticalAlign: "top" }, { disableBox: !0 }), z2: 10 }),d = t.get("link"),f = t.get("sublink"),p = t.get("triggerEvent", !0);l.silent = !d && !p, c.silent = !f && !p, d && l.on("click", function () {qa(d, "_" + t.get("target"));}), f && c.on("click", function () {qa(f, "_" + t.get("subtarget"));}), l.eventData = c.eventData = p ? { componentType: "title", componentIndex: t.componentIndex } : null, i.add(l), h && i.add(c);var g = i.getBoundingRect(),v = t.getBoxLayoutParams();v.width = g.width, v.height = g.height;var m = Ka(v, { width: n.getWidth(), height: n.getHeight() }, t.get("padding"));a || (a = t.get("left") || t.get("right"), "middle" === a && (a = "center"), "right" === a ? m.x += m.width : "center" === a && (m.x += m.width / 2)), s || (s = t.get("top") || t.get("bottom"), "center" === s && (s = "middle"), "bottom" === s ? m.y += m.height : "middle" === s && (m.y += m.height / 2), s = s || "top"), i.attr("position", [m.x, m.y]);var y = { textAlign: a, textVerticalAlign: s };l.setStyle(y), c.setStyle(y), g = i.getBoundingRect();var _ = m.margin,x = t.getItemStyle(["color", "opacity"]);x.fill = t.get("backgroundColor");var w = new Am({ shape: { x: g.x - _[3], y: g.y - _[0], width: g.width + _[1] + _[3], height: g.height + _[0] + _[2], r: t.get("borderRadius") }, style: x, subPixelOptimize: !0, silent: !0 });i.add(w);}} });var tS = C_.legend.selector,eS = { all: { type: "all", title: i(tS.all) }, inverse: { type: "inverse", title: i(tS.inverse) } },nS = Iu({ type: "legend.plain", dependencies: ["series"], layoutMode: { type: "box", ignoreSize: !0 }, init: function init(t, e, n) {this.mergeDefaultAndTheme(t, n), t.selected = t.selected || {}, this._updateSelector(t);}, mergeOption: function mergeOption(t) {nS.superCall(this, "mergeOption", t), this._updateSelector(t);}, _updateSelector: function _updateSelector(t) {var e = t.selector;e === !0 && (e = t.selector = ["all", "inverse"]), x(e) && f(e, function (t, n) {b(t) && (t = { type: t }), e[n] = r(t, eS[t.type]);});}, optionUpdated: function optionUpdated() {this._updateData(this.ecModel);var t = this._data;if (t[0] && "single" === this.get("selectedMode")) {for (var e = !1, n = 0; n < t.length; n++) {var i = t[n].get("name");if (this.isSelected(i)) {this.select(i), e = !0;break;}}!e && this.select(t[0].get("name"));}}, _updateData: function _updateData(t) {var e = [],n = [];t.eachRawSeries(function (i) {var r = i.name;n.push(r);var o;if (i.legendVisualProvider) {var a = i.legendVisualProvider,s = a.getAllNames();t.isSeriesFiltered(i) || (n = n.concat(s)), s.length ? e = e.concat(s) : o = !0;} else o = !0;o && or(i) && e.push(i.name);}), this._availableNames = n;var i = this.get("data") || e,r = p(i, function (t) {return ("string" == typeof t || "number" == typeof t) && (t = { name: t }), new fa(t, this, this.ecModel);}, this);this._data = r;}, getData: function getData() {return this._data;}, select: function select(t) {var e = this.option.selected,n = this.get("selectedMode");if ("single" === n) {var i = this._data;f(i, function (t) {e[t.get("name")] = !1;});}e[t] = !0;}, unSelect: function unSelect(t) {"single" !== this.get("selectedMode") && (this.option.selected[t] = !1);}, toggleSelected: function toggleSelected(t) {var e = this.option.selected;e.hasOwnProperty(t) || (e[t] = !0), this[e[t] ? "unSelect" : "select"](t);}, allSelect: function allSelect() {var t = this._data,e = this.option.selected;f(t, function (t) {e[t.get("name", !0)] = !0;});}, inverseSelect: function inverseSelect() {var t = this._data,e = this.option.selected;f(t, function (t) {var n = t.get("name", !0);e.hasOwnProperty(n) || (e[n] = !0), e[n] = !e[n];});}, isSelected: function isSelected(t) {var e = this.option.selected;return !(e.hasOwnProperty(t) && !e[t]) && u(this._availableNames, t) >= 0;}, getOrient: function getOrient() {return "vertical" === this.get("orient") ? { index: 1, name: "vertical" } : { index: 0, name: "horizontal" };}, defaultOption: { zlevel: 0, z: 4, show: !0, orient: "horizontal", left: "center", top: 0, align: "auto", backgroundColor: "rgba(0,0,0,0)", borderColor: "#ccc", borderRadius: 0, borderWidth: 0, padding: 5, itemGap: 10, itemWidth: 25, itemHeight: 14, inactiveColor: "#ccc", inactiveBorderColor: "#ccc", itemStyle: { borderWidth: 0 }, textStyle: { color: "#333" }, selectedMode: !0, selector: !1, selectorLabel: { show: !0, borderRadius: 10, padding: [3, 5, 3, 5], fontSize: 12, fontFamily: " sans-serif", color: "#666", borderWidth: 1, borderColor: "#666" }, emphasis: { selectorLabel: { show: !0, color: "#eee", backgroundColor: "#666" } }, selectorPosition: "auto", selectorItemGap: 7, selectorButtonGap: 10, tooltip: { show: !1 } } });_u("legendToggleSelect", "legendselectchanged", _(Hd, "toggleSelected")), _u("legendAllSelect", "legendselectall", _(Hd, "allSelect")), _u("legendInverseSelect", "legendinverseselect", _(Hd, "inverseSelect")), _u("legendSelect", "legendselected", _(Hd, "select")), _u("legendUnSelect", "legendunselected", _(Hd, "unSelect"));var iS = _,rS = f,oS = ig,aS = Tu({ type: "legend.plain", newlineDisabled: !1, init: function init() {this.group.add(this._contentGroup = new oS()), this._backgroundEl, this.group.add(this._selectorGroup = new oS()), this._isFirstRender = !0;}, getContentGroup: function getContentGroup() {return this._contentGroup;}, getSelectorGroup: function getSelectorGroup() {return this._selectorGroup;}, render: function render(t, e, n) {var i = this._isFirstRender;if (this._isFirstRender = !1, this.resetInner(), t.get("show", !0)) {var r = t.get("align"),o = t.get("orient");r && "auto" !== r || (r = "right" === t.get("left") && "vertical" === o ? "right" : "left");var a = t.get("selector", !0),l = t.get("selectorPosition", !0);!a || l && "auto" !== l || (l = "horizontal" === o ? "end" : "start"), this.renderInner(r, t, e, n, a, o, l);var u = t.getBoxLayoutParams(),h = { width: n.getWidth(), height: n.getHeight() },c = t.get("padding"),d = Ka(u, h, c),f = this.layoutInner(t, r, d, i, a, l),p = Ka(s({ width: f.width, height: f.height }, u), h, c);this.group.attr("position", [p.x - f.x, p.y - f.y]), this.group.add(this._backgroundEl = Vd(f, t));}}, resetInner: function resetInner() {this.getContentGroup().removeAll(), this._backgroundEl && this.group.remove(this._backgroundEl), this.getSelectorGroup().removeAll();}, renderInner: function renderInner(t, e, n, i, r, o, a) {var s = this.getContentGroup(),l = N(),u = e.get("selectedMode"),h = [];n.eachRawSeries(function (t) {!t.get("legendHoverLink") && h.push(t.id);}), rS(e.getData(), function (r, o) {var a = r.get("name");if (!this.newlineDisabled && ("" === a || "\n" === a)) return void s.add(new oS({ newline: !0 }));var c = n.getSeriesByName(a)[0];if (!l.get(a)) if (c) {var d = c.getData(),f = d.getVisual("color"),p = d.getVisual("borderColor");"function" == typeof f && (f = f(c.getDataParams(0))), "function" == typeof p && (p = p(c.getDataParams(0)));var g = d.getVisual("legendSymbol") || "roundRect",v = d.getVisual("symbol"),m = this._createItem(a, o, r, e, g, v, t, f, p, u);m.on("click", iS(Wd, a, null, i, h)).on("mouseover", iS(Xd, c.name, null, i, h)).on("mouseout", iS(Yd, c.name, null, i, h)), l.set(a, !0);} else n.eachRawSeries(function (n) {if (!l.get(a) && n.legendVisualProvider) {var s = n.legendVisualProvider;if (!s.containName(a)) return;var c = s.indexOfName(a),d = s.getItemVisual(c, "color"),f = s.getItemVisual(c, "borderColor"),p = "roundRect",g = this._createItem(a, o, r, e, p, null, t, d, f, u);g.on("click", iS(Wd, null, a, i, h)).on("mouseover", iS(Xd, null, a, i, h)).on("mouseout", iS(Yd, null, a, i, h)), l.set(a, !0);}}, this);}, this), r && this._createSelector(r, e, i, o, a);}, _createSelector: function _createSelector(t, e, n) {function i(t) {var i = t.type,o = new ym({ style: { x: 0, y: 0, align: "center", verticalAlign: "middle" }, onclick: function onclick() {n.dispatchAction({ type: "all" === i ? "legendAllSelect" : "legendInverseSelect" });} });r.add(o);var a = e.getModel("selectorLabel"),s = e.getModel("emphasis.selectorLabel");Go(o.style, o.hoverStyle = {}, a, s, { defaultText: t.title, isRectText: !1 }), No(o);}var r = this.getSelectorGroup();rS(t, function (t) {i(t);});}, _createItem: function _createItem(t, e, n, i, r, o, s, l, u, h) {var c = i.get("itemWidth"),d = i.get("itemHeight"),f = i.get("inactiveColor"),p = i.get("inactiveBorderColor"),g = i.get("symbolKeepAspect"),v = i.getModel("itemStyle"),m = i.isSelected(t),y = new oS(),_ = n.getModel("textStyle"),x = n.get("icon"),w = n.getModel("tooltip"),b = w.parentModel;r = x || r;var S = Xh(r, 0, 0, c, d, m ? l : f, null == g ? !0 : g);if (y.add(Gd(S, r, v, u, p, m)), !x && o && (o !== r || "none" === o)) {var M = .8 * d;"none" === o && (o = "circle");var C = Xh(o, (c - M) / 2, (d - M) / 2, M, M, m ? l : f, null == g ? !0 : g);y.add(Gd(C, o, v, u, p, m));}var I = "left" === s ? c + 5 : -5,T = s,k = i.get("formatter"),D = t;"string" == typeof k && k ? D = k.replace("{name}", null != t ? t : "") : "function" == typeof k && (D = k(t)), y.add(new ym({ style: Xo({}, _, { text: D, x: I, y: d / 2, textFill: m ? _.getTextColor() : f, textAlign: T, textVerticalAlign: "middle" }) }));var A = new Am({ shape: y.getBoundingRect(), invisible: !0, tooltip: w.get("show") ? a({ content: t, formatter: b.get("formatter", !0) || function () {return t;}, formatterParams: { componentType: "legend", legendIndex: i.componentIndex, name: t, $vars: ["name"] } }, w.option) : null });return y.add(A), y.eachChild(function (t) {t.silent = !0;}), A.silent = !h, this.getContentGroup().add(y), No(y), y.__legendDataIndex = e, y;}, layoutInner: function layoutInner(t, e, n, i, r, o) {var a = this.getContentGroup(),s = this.getSelectorGroup();Sy(t.get("orient"), a, t.get("itemGap"), n.width, n.height);var l = a.getBoundingRect(),u = [-l.x, -l.y];if (r) {Sy("horizontal", s, t.get("selectorItemGap", !0));var h = s.getBoundingRect(),c = [-h.x, -h.y],d = t.get("selectorButtonGap", !0),f = t.getOrient().index,p = 0 === f ? "width" : "height",g = 0 === f ? "height" : "width",v = 0 === f ? "y" : "x";"end" === o ? c[f] += l[p] + d : u[f] += h[p] + d, c[1 - f] += l[g] / 2 - h[g] / 2, s.attr("position", c), a.attr("position", u);var m = { x: 0, y: 0 };return m[p] = l[p] + d + h[p], m[g] = Math.max(l[g], h[g]), m[v] = Math.min(0, h[v] + c[1 - f]), m;}return a.attr("position", u), this.group.getBoundingRect();}, remove: function remove() {this.getContentGroup().removeAll(), this._isFirstRender = !0;} }),sS = function sS(t) {var e = t.findComponents({ mainType: "legend" });e && e.length && t.filterSeries(function (t) {for (var n = 0; n < e.length; n++) {if (!e[n].isSelected(t.name)) return !1;}return !0;});};mu(mx.PROCESSOR.SERIES_FILTER, sS), Iy.registerSubTypeDefaulter("legend", function () {return "plain";});var lS = nS.extend({ type: "legend.scroll", setScrollDataIndex: function setScrollDataIndex(t) {this.option.scrollDataIndex = t;}, defaultOption: { scrollDataIndex: 0, pageButtonItemGap: 5, pageButtonGap: null, pageButtonPosition: "end", pageFormatter: "{current}/{total}", pageIcons: { horizontal: ["M0,0L12,-10L12,10z", "M0,0L-12,-10L-12,10z"], vertical: ["M0,0L20,0L10,-20z", "M0,0L20,0L10,20z"] }, pageIconColor: "#2f4554", pageIconInactiveColor: "#aaa", pageIconSize: 15, pageTextStyle: { color: "#333" }, animationDurationUpdate: 800 }, init: function init(t, e, n, i) {var r = Qa(t);lS.superCall(this, "init", t, e, n, i), Ud(this, t, r);}, mergeOption: function mergeOption(t, e) {lS.superCall(this, "mergeOption", t, e), Ud(this, this.option, t);} }),uS = ig,hS = ["width", "height"],cS = ["x", "y"],dS = aS.extend({ type: "legend.scroll", newlineDisabled: !0, init: function init() {dS.superCall(this, "init"), this._currentIndex = 0, this.group.add(this._containerGroup = new uS()), this._containerGroup.add(this.getContentGroup()), this.group.add(this._controllerGroup = new uS()), this._showController;}, resetInner: function resetInner() {dS.superCall(this, "resetInner"), this._controllerGroup.removeAll(), this._containerGroup.removeClipPath(), this._containerGroup.__rectSize = null;}, renderInner: function renderInner(t, e, n, i, r, o, a) {function s(t, n) {var r = t + "DataIndex",o = la(e.get("pageIcons", !0)[e.getOrient().name][n], { onclick: y(l._pageGo, l, r, e, i) }, { x: -h[0] / 2, y: -h[1] / 2, width: h[0], height: h[1] });o.name = t, u.add(o);}var l = this;dS.superCall(this, "renderInner", t, e, n, i, r, o, a);var u = this._controllerGroup,h = e.get("pageIconSize", !0);x(h) || (h = [h, h]), s("pagePrev", 0);var c = e.getModel("pageTextStyle");u.add(new ym({ name: "pageText", style: { textFill: c.getTextColor(), font: c.getFont(), textVerticalAlign: "middle", textAlign: "center" }, silent: !0 })), s("pageNext", 1);}, layoutInner: function layoutInner(t, e, n, r, o, a) {var s = this.getSelectorGroup(),l = t.getOrient().index,u = hS[l],h = cS[l],c = hS[1 - l],d = cS[1 - l];o && Sy("horizontal", s, t.get("selectorItemGap", !0));var f = t.get("selectorButtonGap", !0),p = s.getBoundingRect(),g = [-p.x, -p.y],v = i(n);o && (v[u] = n[u] - p[u] - f);var m = this._layoutContentAndController(t, r, v, l, u, c, d);if (o) {if ("end" === a) g[l] += m[u] + f;else {var y = p[u] + f;g[l] -= y, m[h] -= y;}m[u] += p[u] + f, g[1 - l] += m[d] + m[c] / 2 - p[c] / 2, m[c] = Math.max(m[c], p[c]), m[d] = Math.min(m[d], p[d] + g[1 - l]), s.attr("position", g);}return m;}, _layoutContentAndController: function _layoutContentAndController(t, e, n, i, r, o, a) {var s = this.getContentGroup(),l = this._containerGroup,u = this._controllerGroup;Sy(t.get("orient"), s, t.get("itemGap"), i ? n.width : null, i ? null : n.height), Sy("horizontal", u, t.get("pageButtonItemGap", !0));var h = s.getBoundingRect(),c = u.getBoundingRect(),d = this._showController = h[r] > n[r],f = [-h.x, -h.y];e || (f[i] = s.position[i]);var p = [0, 0],g = [-c.x, -c.y],v = D(t.get("pageButtonGap", !0), t.get("itemGap", !0));if (d) {var m = t.get("pageButtonPosition", !0);"end" === m ? g[i] += n[r] - c[r] : p[i] += c[r] + v;}g[1 - i] += h[o] / 2 - c[o] / 2, s.attr("position", f), l.attr("position", p), u.attr("position", g);var y = { x: 0, y: 0 };if (y[r] = d ? n[r] : h[r], y[o] = Math.max(h[o], c[o]), y[a] = Math.min(0, c[a] + g[1 - i]), l.__rectSize = n[r], d) {var _ = { x: 0, y: 0 };_[r] = Math.max(n[r] - c[r] - v, 0), _[o] = y[o], l.setClipPath(new Am({ shape: _ })), l.__rectSize = _[r];} else u.eachChild(function (t) {t.attr({ invisible: !0, silent: !0 });});var x = this._getPageInfo(t);return null != x.pageIndex && ta(s, { position: x.contentPosition }, d ? t : !1), this._updatePageInfoView(t, x), y;}, _pageGo: function _pageGo(t, e, n) {var i = this._getPageInfo(e)[t];null != i && n.dispatchAction({ type: "legendScroll", scrollDataIndex: i, legendId: e.id });}, _updatePageInfoView: function _updatePageInfoView(t, e) {var n = this._controllerGroup;f(["pagePrev", "pageNext"], function (i) {var r = null != e[i + "DataIndex"],o = n.childOfName(i);o && (o.setStyle("fill", r ? t.get("pageIconColor", !0) : t.get("pageIconInactiveColor", !0)), o.cursor = r ? "pointer" : "default");});var i = n.childOfName("pageText"),r = t.get("pageFormatter"),o = e.pageIndex,a = null != o ? o + 1 : 0,s = e.pageCount;i && r && i.setStyle("text", b(r) ? r.replace("{current}", a).replace("{total}", s) : r({ current: a, total: s }));}, _getPageInfo: function _getPageInfo(t) {function e(t) {if (t) {var e = t.getBoundingRect(),n = e[l] + t.position[a];return { s: n, e: n + e[s], i: t.__legendDataIndex };}}function n(t, e) {return t.e >= e && t.s <= e + o;}var i = t.get("scrollDataIndex", !0),r = this.getContentGroup(),o = this._containerGroup.__rectSize,a = t.getOrient().index,s = hS[a],l = cS[a],u = this._findTargetItemIndex(i),h = r.children(),c = h[u],d = h.length,f = d ? 1 : 0,p = { contentPosition: r.position.slice(), pageCount: f, pageIndex: f - 1, pagePrevDataIndex: null, pageNextDataIndex: null };if (!c) return p;var g = e(c);p.contentPosition[a] = -g.s;for (var v = u + 1, m = g, y = g, _ = null; d >= v; ++v) {_ = e(h[v]), (!_ && y.e > m.s + o || _ && !n(_, m.s)) && (m = y.i > m.i ? y : _, m && (null == p.pageNextDataIndex && (p.pageNextDataIndex = m.i), ++p.pageCount)), y = _;}for (var v = u - 1, m = g, y = g, _ = null; v >= -1; --v) {_ = e(h[v]), _ && n(y, _.s) || !(m.i < y.i) || (y = m, null == p.pagePrevDataIndex && (p.pagePrevDataIndex = m.i), ++p.pageCount, ++p.pageIndex), m = _;}return p;}, _findTargetItemIndex: function _findTargetItemIndex(t) {if (!this._showController) return 0;var e,n,i = this.getContentGroup();return i.eachChild(function (i, r) {var o = i.__legendDataIndex;null == n && null != o && (n = r), o === t && (e = r);}), null != e ? e : n;} });_u("legendScroll", "legendscroll", function (t, e) {var n = t.scrollDataIndex;null != n && e.eachComponent({ mainType: "legend", subType: "scroll", query: t }, function (t) {t.setScrollDataIndex(n);});});var fS = function fS(t, e) {var n,i = [],r = t.seriesIndex;if (null == r || !(n = e.getSeriesByIndex(r))) return { point: [] };var o = n.getData(),a = sr(o, t);if (null == a || 0 > a || x(a)) return { point: [] };var s = o.getItemGraphicEl(a),l = n.coordinateSystem;if (n.getTooltipPosition) i = n.getTooltipPosition(a) || [];else if (l && l.dataToPoint) i = l.dataToPoint(o.getValues(p(l.dimensions, function (t) {return o.mapDimension(t);}), a, !0)) || [];else if (s) {var u = s.getBoundingRect().clone();u.applyTransform(s.transform), i = [u.x + u.width / 2, u.y + u.height / 2];}return { point: i, el: s };},pS = f,gS = _,vS = lr(),mS = function mS(t, e, n) {var i = t.currTrigger,r = [t.x, t.y],o = t,a = t.dispatchAction || y(n.dispatchAction, n),s = e.getComponent("axisPointer").coordSysAxesInfo;if (s) {nf(r) && (r = fS({ seriesIndex: o.seriesIndex, dataIndex: o.dataIndex }, e).point);var l = nf(r),u = o.axesInfo,h = s.axesInfo,c = "leave" === i || nf(r),d = {},f = {},p = { list: [], map: {} },g = { showPointer: gS(Zd, f), showTooltip: gS(Kd, p) };pS(s.coordSysMap, function (t, e) {var n = l || t.containPoint(r);pS(s.coordSysAxesInfo[e], function (t) {var e = t.axis,i = tf(u, t);if (!c && n && (!u || i)) {var o = i && i.value;null != o || l || (o = e.pointToData(r)), null != o && jd(t, o, g, !1, d);}});});var v = {};return pS(h, function (t, e) {var n = t.linkGroup;n && !f[e] && pS(n.axesInfo, function (e, i) {var r = f[i];if (e !== t && r) {var o = r.value;n.mapper && (o = t.axis.scale.parse(n.mapper(o, ef(e), ef(t)))), v[t.key] = o;}});}), pS(v, function (t, e) {jd(h[e], t, g, !0, d);}), $d(f, h, d), Qd(p, r, t, a), Jd(h, a, n), d;}},yS = (Iu({ type: "axisPointer", coordSysAxesInfo: null, defaultOption: { show: "auto", triggerOn: null, zlevel: 0, z: 50, type: "line", snap: !1, triggerTooltip: !0, value: null, status: null, link: [], animation: null, animationDurationUpdate: 200, lineStyle: { color: "#aaa", width: 1, type: "solid" }, shadowStyle: { color: "rgba(150,150,150,0.3)" }, label: { show: !0, formatter: null, precision: "auto", margin: 3, color: "#fff", padding: [5, 7, 5, 7], backgroundColor: "auto", borderColor: null, borderWidth: 0, shadowBlur: 3, shadowColor: "#aaa" }, handle: { show: !1, icon: "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z", size: 45, margin: 50, color: "#333", shadowBlur: 3, shadowColor: "#aaa", shadowOffsetX: 0, shadowOffsetY: 2, throttle: 40 } } }), lr()),_S = f,xS = Tu({ type: "axisPointer", render: function render(t, e, n) {var i = e.getComponent("tooltip"),r = t.get("triggerOn") || i && i.get("triggerOn") || "mousemove|click";rf("axisPointer", n, function (t, e, n) {"none" !== r && ("leave" === t || r.indexOf(t) >= 0) && n({ type: "updateAxisPointer", currTrigger: t, x: e && e.offsetX, y: e && e.offsetY });});}, remove: function remove(t, e) {hf(e.getZr(), "axisPointer"), xS.superApply(this._model, "remove", arguments);}, dispose: function dispose(t, e) {hf("axisPointer", e), xS.superApply(this._model, "dispose", arguments);} }),wS = lr(),bS = i,SS = y;cf.prototype = { _group: null, _lastGraphicKey: null, _handle: null, _dragging: !1, _lastValue: null, _lastStatus: null, _payloadInfo: null, animationThreshold: 15, render: function render(t, e, n, i) {var r = e.get("value"),o = e.get("status");if (this._axisModel = t, this._axisPointerModel = e, this._api = n, i || this._lastValue !== r || this._lastStatus !== o) {this._lastValue = r, this._lastStatus = o;var a = this._group,s = this._handle;
        if (!o || "hide" === o) return a && a.hide(), void (s && s.hide());a && a.show(), s && s.show();var l = {};this.makeElOption(l, r, t, e, n);var u = l.graphicKey;u !== this._lastGraphicKey && this.clear(n), this._lastGraphicKey = u;var h = this._moveAnimation = this.determineAnimation(t, e);if (a) {var c = _(df, e, h);this.updatePointerEl(a, l, c, e), this.updateLabelEl(a, l, c, e);} else a = this._group = new ig(), this.createPointerEl(a, l, t, e), this.createLabelEl(a, l, t, e), n.getZr().add(a);vf(a, e, !0), this._renderHandle(r);}}, remove: function remove(t) {this.clear(t);}, dispose: function dispose(t) {this.clear(t);}, determineAnimation: function determineAnimation(t, e) {var n = e.get("animation"),i = t.axis,r = "category" === i.type,o = e.get("snap");if (!o && !r) return !1;if ("auto" === n || null == n) {var a = this.animationThreshold;if (r && i.getBandWidth() > a) return !0;if (o) {var s = od(t).seriesDataCount,l = i.getExtent();return Math.abs(l[0] - l[1]) / s > a;}return !1;}return n === !0;}, makeElOption: function makeElOption() {}, createPointerEl: function createPointerEl(t, e) {var n = e.pointer;if (n) {var i = wS(t).pointerEl = new ey[n.type](bS(e.pointer));t.add(i);}}, createLabelEl: function createLabelEl(t, e, n, i) {if (e.label) {var r = wS(t).labelEl = new Am(bS(e.label));t.add(r), pf(r, i);}}, updatePointerEl: function updatePointerEl(t, e, n) {var i = wS(t).pointerEl;i && e.pointer && (i.setStyle(e.pointer.style), n(i, { shape: e.pointer.shape }));}, updateLabelEl: function updateLabelEl(t, e, n, i) {var r = wS(t).labelEl;r && (r.setStyle(e.label.style), n(r, { shape: e.label.shape, position: e.label.position }), pf(r, i));}, _renderHandle: function _renderHandle(t) {if (!this._dragging && this.updateHandleTransform) {var e = this._axisPointerModel,n = this._api.getZr(),i = this._handle,r = e.getModel("handle"),o = e.get("status");if (!r.get("show") || !o || "hide" === o) return i && n.remove(i), void (this._handle = null);var a;this._handle || (a = !0, i = this._handle = la(r.get("icon"), { cursor: "move", draggable: !0, onmousemove: function onmousemove(t) {yp(t.event);}, onmousedown: SS(this._onHandleDragMove, this, 0, 0), drift: SS(this._onHandleDragMove, this), ondragend: SS(this._onHandleDragEnd, this) }), n.add(i)), vf(i, e, !1);var s = ["color", "borderColor", "borderWidth", "opacity", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"];i.setStyle(r.getItemStyle(null, s));var l = r.get("size");x(l) || (l = [l, l]), i.attr("scale", [l[0] / 2, l[1] / 2]), pl(this, "_doDispatchAxisPointer", r.get("throttle") || 0, "fixRate"), this._moveHandleToValue(t, a);}}, _moveHandleToValue: function _moveHandleToValue(t, e) {df(this._axisPointerModel, !e && this._moveAnimation, this._handle, gf(this.getHandleTransform(t, this._axisModel, this._axisPointerModel)));}, _onHandleDragMove: function _onHandleDragMove(t, e) {var n = this._handle;if (n) {this._dragging = !0;var i = this.updateHandleTransform(gf(n), [t, e], this._axisModel, this._axisPointerModel);this._payloadInfo = i, n.stopAnimation(), n.attr(gf(i)), wS(n).lastProp = null, this._doDispatchAxisPointer();}}, _doDispatchAxisPointer: function _doDispatchAxisPointer() {var t = this._handle;if (t) {var e = this._payloadInfo,n = this._axisModel;this._api.dispatchAction({ type: "updateAxisPointer", x: e.cursorPoint[0], y: e.cursorPoint[1], tooltipOption: e.tooltipOption, axesInfo: [{ axisDim: n.axis.dim, axisIndex: n.componentIndex }] });}}, _onHandleDragEnd: function _onHandleDragEnd() {this._dragging = !1;var t = this._handle;if (t) {var e = this._axisPointerModel.get("value");this._moveHandleToValue(e), this._api.dispatchAction({ type: "hideTip" });}}, getHandleTransform: null, updateHandleTransform: null, clear: function clear(t) {this._lastValue = null, this._lastStatus = null;var e = t.getZr(),n = this._group,i = this._handle;e && n && (this._lastGraphicKey = null, n && e.remove(n), i && e.remove(i), this._group = null, this._handle = null, this._payloadInfo = null);}, doClear: function doClear() {}, buildLabel: function buildLabel(t, e, n) {return n = n || 0, { x: t[n], y: t[1 - n], width: e[n], height: e[1 - n] };} }, cf.prototype.constructor = cf, vr(cf);var MS = cf.extend({ makeElOption: function makeElOption(t, e, n, i, r) {var o = n.axis,a = o.grid,s = i.get("type"),l = Cf(a, o).getOtherAxis(o).getGlobalExtent(),u = o.toGlobalCoord(o.dataToCoord(e, !0));if (s && "none" !== s) {var h = mf(i),c = CS[s](o, u, l);c.style = h, t.graphicKey = c.type, t.pointer = c;}var d = cd(a.model, n);bf(e, t, d, n, i, r);}, getHandleTransform: function getHandleTransform(t, e, n) {var i = cd(e.axis.grid.model, e, { labelInside: !1 });return i.labelMargin = n.get("handle.margin"), { position: wf(e.axis, t, i), rotation: i.rotation + (i.labelDirection < 0 ? Math.PI : 0) };}, updateHandleTransform: function updateHandleTransform(t, e, n) {var i = n.axis,r = i.grid,o = i.getGlobalExtent(!0),a = Cf(r, i).getOtherAxis(i).getGlobalExtent(),s = "x" === i.dim ? 0 : 1,l = t.position;l[s] += e[s], l[s] = Math.min(o[1], l[s]), l[s] = Math.max(o[0], l[s]);var u = (a[1] + a[0]) / 2,h = [u, u];h[s] = l[s];var c = [{ verticalAlign: "middle" }, { align: "center" }];return { position: l, rotation: t.rotation, cursorPoint: h, tooltipOption: c[s] };} }),CS = { line: function line(t, e, n) {var i = Sf([e, n[0]], [e, n[1]], If(t));return { type: "Line", subPixelOptimize: !0, shape: i };}, shadow: function shadow(t, e, n) {var i = Math.max(1, t.getBandWidth()),r = n[1] - n[0];return { type: "Rect", shape: Mf([e - i / 2, n[0]], [i, r], If(t)) };} };Tb.registerAxisPointerClass("CartesianAxisPointer", MS), vu(function (t) {if (t) {(!t.axisPointer || 0 === t.axisPointer.length) && (t.axisPointer = {});var e = t.axisPointer.link;e && !x(e) && (t.axisPointer.link = [e]);}}), mu(mx.PROCESSOR.STATISTIC, function (t, e) {t.getComponent("axisPointer").coordSysAxesInfo = Qc(t, e);}), _u({ type: "updateAxisPointer", event: "updateAxisPointer", update: ":updateAxisPointer" }, mS), Iu({ type: "tooltip", dependencies: ["axisPointer"], defaultOption: { zlevel: 0, z: 60, show: !0, showContent: !0, trigger: "item", triggerOn: "mousemove|click", alwaysShowContent: !1, displayMode: "single", renderMode: "auto", confine: !1, showDelay: 0, hideDelay: 100, transitionDuration: .4, enterable: !1, backgroundColor: "rgba(50,50,50,0.7)", borderColor: "#333", borderRadius: 4, borderWidth: 0, padding: 5, extraCssText: "", axisPointer: { type: "line", axis: "auto", animation: "auto", animationDurationUpdate: 200, animationEasingUpdate: "exponentialOut", crossStyle: { color: "#999", width: 1, type: "dashed", textStyle: {} } }, textStyle: { color: "#fff", fontSize: 14 } } });var IS = f,TS = Na,kS = ["", "-webkit-", "-moz-", "-o-"],DS = "position:absolute;display:block;border-style:solid;white-space:nowrap;z-index:9999999;";Pf.prototype = { constructor: Pf, _enterable: !0, update: function update(t) {var e = this._container,n = e.currentStyle || document.defaultView.getComputedStyle(e),i = e.style;"absolute" !== i.position && "absolute" !== n.position && (i.position = "relative");var r = t.get("alwaysShowContent");r && this._moveTooltipIfResized();}, _moveTooltipIfResized: function _moveTooltipIfResized() {var t = this._styleCoord[2],e = this._styleCoord[3],n = t * this._zr.getWidth(),i = e * this._zr.getHeight();this.moveTo(n, i);}, show: function show(t) {clearTimeout(this._hideTimeout);var e = this.el,n = this._styleCoord;e.style.cssText = DS + Df(t) + ";left:" + n[0] + "px;top:" + n[1] + "px;" + (t.get("extraCssText") || ""), e.style.display = e.innerHTML ? "block" : "none", e.style.pointerEvents = this._enterable ? "auto" : "none", this._show = !0;}, setContent: function setContent(t) {this.el.innerHTML = null == t ? "" : t;}, setEnterable: function setEnterable(t) {this._enterable = t;}, getSize: function getSize() {var t = this.el;return [t.clientWidth, t.clientHeight];}, moveTo: function moveTo(t, e) {var n = this._styleCoord;Af(n, this._zr, this._appendToBody, t, e);var i = this.el.style;i.left = n[0] + "px", i.top = n[1] + "px";}, hide: function hide() {this.el.style.display = "none", this._show = !1;}, hideLater: function hideLater(t) {!this._show || this._inContent && this._enterable || (t ? (this._hideDelay = t, this._show = !1, this._hideTimeout = setTimeout(y(this.hide, this), t)) : this.hide());}, isShow: function isShow() {return this._show;}, dispose: function dispose() {this.el.parentNode.removeChild(this.el);}, getOuterSize: function getOuterSize() {var t = this.el.clientWidth,e = this.el.clientHeight;if (document.defaultView && document.defaultView.getComputedStyle) {var n = document.defaultView.getComputedStyle(this.el);n && (t += parseInt(n.borderLeftWidth, 10) + parseInt(n.borderRightWidth, 10), e += parseInt(n.borderTopWidth, 10) + parseInt(n.borderBottomWidth, 10));}return { width: t, height: e };} }, Lf.prototype = { constructor: Lf, _enterable: !0, update: function update(t) {var e = t.get("alwaysShowContent");e && this._moveTooltipIfResized();}, _moveTooltipIfResized: function _moveTooltipIfResized() {var t = this._styleCoord[2],e = this._styleCoord[3],n = t * this._zr.getWidth(),i = e * this._zr.getHeight();this.moveTo(n, i);}, show: function show() {this._hideTimeout && clearTimeout(this._hideTimeout), this.el.attr("show", !0), this._show = !0;}, setContent: function setContent(t, e, n) {this.el && this._zr.remove(this.el);for (var i = {}, r = t, o = "{marker", a = "|}", s = r.indexOf(o); s >= 0;) {var l = r.indexOf(a),u = r.substr(s + o.length, l - s - o.length);i["marker" + u] = u.indexOf("sub") > -1 ? { textWidth: 4, textHeight: 4, textBorderRadius: 2, textBackgroundColor: e[u], textOffset: [3, 0] } : { textWidth: 10, textHeight: 10, textBorderRadius: 5, textBackgroundColor: e[u] }, r = r.substr(l + 1), s = r.indexOf("{marker");}var h = n.getModel("textStyle"),c = h.get("fontSize"),d = n.get("textLineHeight");null == d && (d = Math.round(3 * c / 2)), this.el = new ym({ style: Xo({}, h, { rich: i, text: t, textBackgroundColor: n.get("backgroundColor"), textBorderRadius: n.get("borderRadius"), textFill: n.get("textStyle.color"), textPadding: n.get("padding"), textLineHeight: d }), z: n.get("z") }), this._zr.add(this.el);var f = this;this.el.on("mouseover", function () {f._enterable && (clearTimeout(f._hideTimeout), f._show = !0), f._inContent = !0;}), this.el.on("mouseout", function () {f._enterable && f._show && f.hideLater(f._hideDelay), f._inContent = !1;});}, setEnterable: function setEnterable(t) {this._enterable = t;}, getSize: function getSize() {var t = this.el.getBoundingRect();return [t.width, t.height];}, moveTo: function moveTo(t, e) {if (this.el) {var n = this._styleCoord;Of(n, this._zr, t, e), this.el.attr("position", [n[0], n[1]]);}}, hide: function hide() {this.el && this.el.hide(), this._show = !1;}, hideLater: function hideLater(t) {!this._show || this._inContent && this._enterable || (t ? (this._hideDelay = t, this._show = !1, this._hideTimeout = setTimeout(y(this.hide, this), t)) : this.hide());}, isShow: function isShow() {return this._show;}, dispose: function dispose() {clearTimeout(this._hideTimeout), this.el && this._zr.remove(this.el);}, getOuterSize: function getOuterSize() {var t = this.getSize();return { width: t[0], height: t[1] };} };var AS = y,PS = f,OS = wa,LS = new Am({ shape: { x: -1, y: -1, width: 2, height: 2 } });Tu({ type: "tooltip", init: function init(t, e) {if (!Wf.node) {var n = t.getComponent("tooltip"),i = n.get("renderMode");this._renderMode = fr(i);var r;"html" === this._renderMode ? (r = new Pf(e.getDom(), e, { appendToBody: n.get("appendToBody", !0) }), this._newLine = "<br/>") : (r = new Lf(e), this._newLine = "\n"), this._tooltipContent = r;}}, render: function render(t, e, n) {if (!Wf.node) {this.group.removeAll(), this._tooltipModel = t, this._ecModel = e, this._api = n, this._lastDataByCoordSys = null, this._alwaysShowContent = t.get("alwaysShowContent");var i = this._tooltipContent;i.update(t), i.setEnterable(t.get("enterable")), this._initGlobalListener(), this._keepShow();}}, _initGlobalListener: function _initGlobalListener() {var t = this._tooltipModel,e = t.get("triggerOn");rf("itemTooltip", this._api, AS(function (t, n, i) {"none" !== e && (e.indexOf(t) >= 0 ? this._tryShow(n, i) : "leave" === t && this._hide(i));}, this));}, _keepShow: function _keepShow() {var t = this._tooltipModel,e = this._ecModel,n = this._api;if (null != this._lastX && null != this._lastY && "none" !== t.get("triggerOn")) {var i = this;clearTimeout(this._refreshUpdateTimeout), this._refreshUpdateTimeout = setTimeout(function () {!n.isDisposed() && i.manuallyShowTip(t, e, n, { x: i._lastX, y: i._lastY });});}}, manuallyShowTip: function manuallyShowTip(t, e, n, i) {if (i.from !== this.uid && !Wf.node) {var r = zf(i, n);this._ticket = "";var o = i.dataByCoordSys;if (i.tooltip && null != i.x && null != i.y) {var a = LS;a.position = [i.x, i.y], a.update(), a.tooltip = i.tooltip, this._tryShow({ offsetX: i.x, offsetY: i.y, target: a }, r);} else if (o) this._tryShow({ offsetX: i.x, offsetY: i.y, position: i.position, dataByCoordSys: i.dataByCoordSys, tooltipOption: i.tooltipOption }, r);else if (null != i.seriesIndex) {if (this._manuallyAxisShowTip(t, e, n, i)) return;var s = fS(i, e),l = s.point[0],u = s.point[1];null != l && null != u && this._tryShow({ offsetX: l, offsetY: u, position: i.position, target: s.el }, r);} else null != i.x && null != i.y && (n.dispatchAction({ type: "updateAxisPointer", x: i.x, y: i.y }), this._tryShow({ offsetX: i.x, offsetY: i.y, position: i.position, target: n.getZr().findHover(i.x, i.y).target }, r));}}, manuallyHideTip: function manuallyHideTip(t, e, n, i) {var r = this._tooltipContent;!this._alwaysShowContent && this._tooltipModel && r.hideLater(this._tooltipModel.get("hideDelay")), this._lastX = this._lastY = null, i.from !== this.uid && this._hide(zf(i, n));}, _manuallyAxisShowTip: function _manuallyAxisShowTip(t, e, n, i) {var r = i.seriesIndex,o = i.dataIndex,a = e.getComponent("axisPointer").coordSysAxesInfo;if (null != r && null != o && null != a) {var s = e.getSeriesByIndex(r);if (s) {var l = s.getData(),t = Bf([l.getItemModel(o), s, (s.coordinateSystem || {}).model, t]);if ("axis" === t.get("trigger")) return n.dispatchAction({ type: "updateAxisPointer", seriesIndex: r, dataIndex: o, position: i.position }), !0;}}}, _tryShow: function _tryShow(t, e) {var n = t.target,i = this._tooltipModel;if (i) {this._lastX = t.offsetX, this._lastY = t.offsetY;var r = t.dataByCoordSys;r && r.length ? this._showAxisTooltip(r, t) : n && null != n.dataIndex ? (this._lastDataByCoordSys = null, this._showSeriesItemTooltip(t, n, e)) : n && n.tooltip ? (this._lastDataByCoordSys = null, this._showComponentItemTooltip(t, n, e)) : (this._lastDataByCoordSys = null, this._hide(e));}}, _showOrMove: function _showOrMove(t, e) {var n = t.get("showDelay");e = y(e, this), clearTimeout(this._showTimout), n > 0 ? this._showTimout = setTimeout(e, n) : e();}, _showAxisTooltip: function _showAxisTooltip(t, e) {var n = this._ecModel,i = this._tooltipModel,o = [e.offsetX, e.offsetY],a = [],s = [],l = Bf([e.tooltipOption, i]),u = this._renderMode,h = this._newLine,c = {};PS(t, function (t) {PS(t.dataByAxis, function (t) {var e = n.getComponent(t.axisDim + "Axis", t.axisIndex),i = t.value,o = [];if (e && null != i) {var l = xf(i, e.axis, n, t.seriesDataIndices, t.valueLabelOpt);f(t.seriesDataIndices, function (a) {var h = n.getSeriesByIndex(a.seriesIndex),d = a.dataIndexInside,f = h && h.getDataParams(d);if (f.axisDim = t.axisDim, f.axisIndex = t.axisIndex, f.axisType = t.axisType, f.axisId = t.axisId, f.axisValue = Nh(e.axis, i), f.axisValueLabel = l, f) {s.push(f);var p,g = h.formatTooltip(d, !0, null, u);if (S(g)) {p = g.html;var v = g.markers;r(c, v);} else p = g;o.push(p);}});var d = l;a.push("html" !== u ? o.join(h) : (d ? Fa(d) + h : "") + o.join(h));}});}, this), a.reverse(), a = a.join(this._newLine + this._newLine);var d = e.position;this._showOrMove(l, function () {this._updateContentNotChangedOnAxis(t) ? this._updatePosition(l, d, o[0], o[1], this._tooltipContent, s) : this._showTooltipContent(l, a, s, Math.random(), o[0], o[1], d, void 0, c);});}, _showSeriesItemTooltip: function _showSeriesItemTooltip(t, e, n) {var i = this._ecModel,r = e.seriesIndex,o = i.getSeriesByIndex(r),a = e.dataModel || o,s = e.dataIndex,l = e.dataType,u = a.getData(l),h = Bf([u.getItemModel(s), a, o && (o.coordinateSystem || {}).model, this._tooltipModel]),c = h.get("trigger");if (null == c || "item" === c) {var d,f,p = a.getDataParams(s, l),g = a.formatTooltip(s, !1, l, this._renderMode);S(g) ? (d = g.html, f = g.markers) : (d = g, f = null);var v = "item_" + a.name + "_" + s;this._showOrMove(h, function () {this._showTooltipContent(h, d, p, v, t.offsetX, t.offsetY, t.position, t.target, f);}), n({ type: "showTip", dataIndexInside: s, dataIndex: u.getRawIndex(s), seriesIndex: r, from: this.uid });}}, _showComponentItemTooltip: function _showComponentItemTooltip(t, e, n) {var i = e.tooltip;if ("string" == typeof i) {var r = i;i = { content: r, formatter: r };}var o = new fa(i, this._tooltipModel, this._ecModel),a = o.get("content"),s = Math.random();this._showOrMove(o, function () {this._showTooltipContent(o, a, o.get("formatterParams") || {}, s, t.offsetX, t.offsetY, t.position, e);}), n({ type: "showTip", from: this.uid });}, _showTooltipContent: function _showTooltipContent(t, e, n, i, r, o, a, s, l) {if (this._ticket = "", t.get("showContent") && t.get("show")) {var u = this._tooltipContent,h = t.get("formatter");a = a || t.get("position");var c = e;if (h && "string" == typeof h) c = Ha(h, n, !0);else if ("function" == typeof h) {var d = AS(function (e, i) {e === this._ticket && (u.setContent(i, l, t), this._updatePosition(t, a, r, o, u, n, s));}, this);this._ticket = i, c = h(n, i, d);}u.setContent(c, l, t), u.show(t), this._updatePosition(t, a, r, o, u, n, s);}}, _updatePosition: function _updatePosition(t, e, n, i, r, o, a) {var s = this._api.getWidth(),l = this._api.getHeight();e = e || t.get("position");var u = r.getSize(),h = t.get("align"),c = t.get("verticalAlign"),d = a && a.getBoundingRect().clone();if (a && d.applyTransform(a.transform), "function" == typeof e && (e = e([n, i], o, r.el, d, { viewSize: [s, l], contentSize: u.slice() })), x(e)) n = OS(e[0], s), i = OS(e[1], l);else if (S(e)) {e.width = u[0], e.height = u[1];var f = Ka(e, { width: s, height: l });n = f.x, i = f.y, h = null, c = null;} else if ("string" == typeof e && a) {var p = Nf(e, d, u);n = p[0], i = p[1];} else {var p = Ef(n, i, r, s, l, h ? null : 20, c ? null : 20);n = p[0], i = p[1];}if (h && (n -= Ff(h) ? u[0] / 2 : "right" === h ? u[0] : 0), c && (i -= Ff(c) ? u[1] / 2 : "bottom" === c ? u[1] : 0), t.get("confine")) {var p = Rf(n, i, r, s, l);n = p[0], i = p[1];}r.moveTo(n, i);}, _updateContentNotChangedOnAxis: function _updateContentNotChangedOnAxis(t) {var e = this._lastDataByCoordSys,n = !!e && e.length === t.length;return n && PS(e, function (e, i) {var r = e.dataByAxis || {},o = t[i] || {},a = o.dataByAxis || [];n &= r.length === a.length, n && PS(r, function (t, e) {var i = a[e] || {},r = t.seriesDataIndices || [],o = i.seriesDataIndices || [];n &= t.value === i.value && t.axisType === i.axisType && t.axisId === i.axisId && r.length === o.length, n && PS(r, function (t, e) {var i = o[e];n &= t.seriesIndex === i.seriesIndex && t.dataIndex === i.dataIndex;});});}), this._lastDataByCoordSys = t, !!n;}, _hide: function _hide(t) {this._lastDataByCoordSys = null, t({ type: "hideTip", from: this.uid });}, dispose: function dispose(t, e) {Wf.node || (this._tooltipContent.dispose(), hf("itemTooltip", e));} }), _u({ type: "showTip", event: "showTip", update: "tooltip:manuallyShowTip" }, function () {}), _u({ type: "hideTip", event: "hideTip", update: "tooltip:manuallyHideTip" }, function () {}), t.version = ix, t.dependencies = rx, t.PRIORITY = mx, t.init = uu, t.connect = hu, t.disConnect = cu, t.disconnect = Nx, t.dispose = du, t.getInstanceByDom = fu, t.getInstanceById = pu, t.registerTheme = gu, t.registerPreprocessor = vu, t.registerProcessor = mu, t.registerPostUpdate = yu, t.registerAction = _u, t.registerCoordinateSystem = xu, t.getCoordinateSystemDimensions = wu, t.registerLayout = bu, t.registerVisual = Su, t.registerLoading = Cu, t.extendComponentModel = Iu, t.extendComponentView = Tu, t.extendSeriesModel = ku, t.extendChartView = Du, t.setCanvasCreator = Au, t.registerMap = Pu, t.getMap = Ou, t.dataTool = Fx, t.zrender = ev, t.number = dy, t.format = _y, t.throttle = fl, t.helper = Vw, t.matrix = Cp, t.vector = up, t.color = Xp, t.parseGeoJSON = Ww, t.parseGeoJson = jw, t.util = qw, t.graphic = Zw, t.List = $x, t.Model = fa, t.Axis = Uw, t.env = Wf;});

/***/ }),

/***/ 553:
/*!***********************************************************!*\
  !*** E:/desktop/new_mobile/components/uni-icons/icons.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  'contact': "\uE100",
  'person': "\uE101",
  'personadd': "\uE102",
  'contact-filled': "\uE130",
  'person-filled': "\uE131",
  'personadd-filled': "\uE132",
  'phone': "\uE200",
  'email': "\uE201",
  'chatbubble': "\uE202",
  'chatboxes': "\uE203",
  'phone-filled': "\uE230",
  'email-filled': "\uE231",
  'chatbubble-filled': "\uE232",
  'chatboxes-filled': "\uE233",
  'weibo': "\uE260",
  'weixin': "\uE261",
  'pengyouquan': "\uE262",
  'chat': "\uE263",
  'qq': "\uE264",
  'videocam': "\uE300",
  'camera': "\uE301",
  'mic': "\uE302",
  'location': "\uE303",
  'mic-filled': "\uE332",
  'speech': "\uE332",
  'location-filled': "\uE333",
  'micoff': "\uE360",
  'image': "\uE363",
  'map': "\uE364",
  'compose': "\uE400",
  'trash': "\uE401",
  'upload': "\uE402",
  'download': "\uE403",
  'close': "\uE404",
  'redo': "\uE405",
  'undo': "\uE406",
  'refresh': "\uE407",
  'star': "\uE408",
  'plus': "\uE409",
  'minus': "\uE410",
  'circle': "\uE411",
  'checkbox': "\uE411",
  'close-filled': "\uE434",
  'clear': "\uE434",
  'refresh-filled': "\uE437",
  'star-filled': "\uE438",
  'plus-filled': "\uE439",
  'minus-filled': "\uE440",
  'circle-filled': "\uE441",
  'checkbox-filled': "\uE442",
  'closeempty': "\uE460",
  'refreshempty': "\uE461",
  'reload': "\uE462",
  'starhalf': "\uE463",
  'spinner': "\uE464",
  'spinner-cycle': "\uE465",
  'search': "\uE466",
  'plusempty': "\uE468",
  'forward': "\uE470",
  'back': "\uE471",
  'left-nav': "\uE471",
  'checkmarkempty': "\uE472",
  'home': "\uE500",
  'navigate': "\uE501",
  'gear': "\uE502",
  'paperplane': "\uE503",
  'info': "\uE504",
  'help': "\uE505",
  'locked': "\uE506",
  'more': "\uE507",
  'flag': "\uE508",
  'home-filled': "\uE530",
  'gear-filled': "\uE532",
  'info-filled': "\uE534",
  'help-filled': "\uE535",
  'more-filled': "\uE537",
  'settings': "\uE560",
  'list': "\uE562",
  'bars': "\uE563",
  'loop': "\uE565",
  'paperclip': "\uE567",
  'eye': "\uE568",
  'arrowup': "\uE580",
  'arrowdown': "\uE581",
  'arrowleft': "\uE582",
  'arrowright': "\uE583",
  'arrowthinup': "\uE584",
  'arrowthindown': "\uE585",
  'arrowthinleft': "\uE586",
  'arrowthinright': "\uE587",
  'pulldown': "\uE588",
  'closefill': "\uE589",
  'sound': "\uE590",
  'scan': "\uE612" };exports.default = _default;

/***/ }),

/***/ 610:
/*!*************************************************************************************!*\
  !*** E:/desktop/new_mobile/js_sdk/yanhao-echarts-for-wx/uni-ec-canvas/wx-canvas.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var WxCanvas = /*#__PURE__*/function () {
  function WxCanvas(ctx, canvasId, isNew, canvasNode) {_classCallCheck(this, WxCanvas);
    this.ctx = ctx;
    this.canvasId = canvasId;
    this.chart = null;
    this.isNew = isNew;
    if (isNew) {
      this.canvasNode = canvasNode;
    } else {
      this._initStyle(ctx);
    }

    // this._initCanvas(zrender, ctx);

    this._initEvent();
  }_createClass(WxCanvas, [{ key: "getContext", value: function getContext(

    contextType) {
      if (contextType === '2d') {
        return this.ctx;
      }
    }

    // canvasToTempFilePath(opt) {
    //   if (!opt.canvasId) {
    //     opt.canvasId = this.canvasId;
    //   }
    //   return wx.canvasToTempFilePath(opt, this);
    // }
  }, { key: "setChart", value: function setChart(
    chart) {
      this.chart = chart;
    } }, { key: "attachEvent", value: function attachEvent()

    {
      // noop
    } }, { key: "detachEvent", value: function detachEvent()

    {
      // noop
    } }, { key: "_initCanvas", value: function _initCanvas(

    zrender, ctx) {
      zrender.util.getContext = function () {
        return ctx;
      };

      zrender.util.$override('measureText', function (text, font) {
        ctx.font = font || '12px sans-serif';
        return ctx.measureText(text);
      });
    } }, { key: "_initStyle", value: function _initStyle(

    ctx) {var _arguments = arguments;
      var styles = ['fillStyle', 'strokeStyle', 'globalAlpha',
      'textAlign', 'textBaseAlign', 'shadow', 'lineWidth',
      'lineCap', 'lineJoin', 'lineDash', 'miterLimit', 'fontSize'];


      styles.forEach(function (style) {
        Object.defineProperty(ctx, style, {
          set: function set(value) {
            if (style !== 'fillStyle' && style !== 'strokeStyle' ||
            value !== 'none' && value !== null)
            {
              ctx['set' + style.charAt(0).toUpperCase() + style.slice(1)](value);
            }
          } });

      });

      ctx.createRadialGradient = function () {
        return ctx.createCircularGradient(_arguments);
      };
    } }, { key: "_initEvent", value: function _initEvent()

    {var _this = this;
      this.event = {};
      var eventNames = [{
        wxName: 'touchStart',
        ecName: 'mousedown' },
      {
        wxName: 'touchMove',
        ecName: 'mousemove' },
      {
        wxName: 'touchEnd',
        ecName: 'mouseup' },
      {
        wxName: 'touchEnd',
        ecName: 'click' }];


      eventNames.forEach(function (name) {
        _this.event[name.wxName] = function (e) {
          var touch = e.touches[0];
          _this.chart.getZr().handler.dispatch(name.ecName, {
            zrX: name.wxName === 'tap' ? touch.clientX : touch.x,
            zrY: name.wxName === 'tap' ? touch.clientY : touch.y });

        };
      });
    } }, { key: "width", set: function set(

    w) {
      if (this.canvasNode) this.canvasNode.width = w;
    }, get: function get()




    {
      if (this.canvasNode)
      return this.canvasNode.width;
      return 0;
    } }, { key: "height", set: function set(h) {if (this.canvasNode) this.canvasNode.height = h;}, get: function get()
    {
      if (this.canvasNode)
      return this.canvasNode.height;
      return 0;
    } }]);return WxCanvas;}();exports.default = WxCanvas;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map