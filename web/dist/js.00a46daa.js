// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/underscore/modules/_setup.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MAX_ARRAY_INDEX = exports.nonEnumerableProps = exports.hasEnumBug = exports._isFinite = exports._isNaN = exports.nativeIsView = exports.nativeCreate = exports.nativeKeys = exports.nativeIsArray = exports.supportsDataView = exports.supportsArrayBuffer = exports.hasOwnProperty = exports.toString = exports.slice = exports.push = exports.SymbolProto = exports.ObjProto = exports.ArrayProto = exports.root = exports.VERSION = void 0;
// Current version.
var VERSION = '1.13.1'; // Establish the root object, `window` (`self`) in the browser, `global`
// on the server, or `this` in some virtual machines. We use `self`
// instead of `window` for `WebWorker` support.

exports.VERSION = VERSION;
var root = typeof self == 'object' && self.self === self && self || typeof global == 'object' && global.global === global && global || Function('return this')() || {}; // Save bytes in the minified (but not gzipped) version:

exports.root = root;
var ArrayProto = Array.prototype,
    ObjProto = Object.prototype;
exports.ObjProto = ObjProto;
exports.ArrayProto = ArrayProto;
var SymbolProto = typeof Symbol !== 'undefined' ? Symbol.prototype : null; // Create quick reference variables for speed access to core prototypes.

exports.SymbolProto = SymbolProto;
var push = ArrayProto.push,
    slice = ArrayProto.slice,
    toString = ObjProto.toString,
    hasOwnProperty = ObjProto.hasOwnProperty; // Modern feature detection.

exports.hasOwnProperty = hasOwnProperty;
exports.toString = toString;
exports.slice = slice;
exports.push = push;
var supportsArrayBuffer = typeof ArrayBuffer !== 'undefined',
    supportsDataView = typeof DataView !== 'undefined'; // All **ECMAScript 5+** native function implementations that we hope to use
// are declared here.

exports.supportsDataView = supportsDataView;
exports.supportsArrayBuffer = supportsArrayBuffer;
var nativeIsArray = Array.isArray,
    nativeKeys = Object.keys,
    nativeCreate = Object.create,
    nativeIsView = supportsArrayBuffer && ArrayBuffer.isView; // Create references to these builtin functions because we override them.

exports.nativeIsView = nativeIsView;
exports.nativeCreate = nativeCreate;
exports.nativeKeys = nativeKeys;
exports.nativeIsArray = nativeIsArray;
var _isNaN = isNaN,
    _isFinite = isFinite; // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.

exports._isFinite = _isFinite;
exports._isNaN = _isNaN;
var hasEnumBug = !{
  toString: null
}.propertyIsEnumerable('toString');
exports.hasEnumBug = hasEnumBug;
var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString']; // The largest integer that can be represented exactly.

exports.nonEnumerableProps = nonEnumerableProps;
var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
exports.MAX_ARRAY_INDEX = MAX_ARRAY_INDEX;
},{}],"node_modules/underscore/modules/restArguments.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = restArguments;

// Some functions take a variable number of arguments, or a few expected
// arguments at the beginning and then a variable number of values to operate
// on. This helper accumulates all remaining arguments past the function’s
// argument length (or an explicit `startIndex`), into an array that becomes
// the last argument. Similar to ES6’s "rest parameter".
function restArguments(func, startIndex) {
  startIndex = startIndex == null ? func.length - 1 : +startIndex;
  return function () {
    var length = Math.max(arguments.length - startIndex, 0),
        rest = Array(length),
        index = 0;

    for (; index < length; index++) {
      rest[index] = arguments[index + startIndex];
    }

    switch (startIndex) {
      case 0:
        return func.call(this, rest);

      case 1:
        return func.call(this, arguments[0], rest);

      case 2:
        return func.call(this, arguments[0], arguments[1], rest);
    }

    var args = Array(startIndex + 1);

    for (index = 0; index < startIndex; index++) {
      args[index] = arguments[index];
    }

    args[startIndex] = rest;
    return func.apply(this, args);
  };
}
},{}],"node_modules/underscore/modules/isObject.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isObject;

// Is a given variable an object?
function isObject(obj) {
  var type = typeof obj;
  return type === 'function' || type === 'object' && !!obj;
}
},{}],"node_modules/underscore/modules/isNull.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isNull;

// Is a given value equal to null?
function isNull(obj) {
  return obj === null;
}
},{}],"node_modules/underscore/modules/isUndefined.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isUndefined;

// Is a given variable undefined?
function isUndefined(obj) {
  return obj === void 0;
}
},{}],"node_modules/underscore/modules/isBoolean.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isBoolean;

var _setup = require("./_setup.js");

// Is a given value a boolean?
function isBoolean(obj) {
  return obj === true || obj === false || _setup.toString.call(obj) === '[object Boolean]';
}
},{"./_setup.js":"node_modules/underscore/modules/_setup.js"}],"node_modules/underscore/modules/isElement.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isElement;

// Is a given value a DOM element?
function isElement(obj) {
  return !!(obj && obj.nodeType === 1);
}
},{}],"node_modules/underscore/modules/_tagTester.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = tagTester;

var _setup = require("./_setup.js");

// Internal function for creating a `toString`-based type tester.
function tagTester(name) {
  var tag = '[object ' + name + ']';
  return function (obj) {
    return _setup.toString.call(obj) === tag;
  };
}
},{"./_setup.js":"node_modules/underscore/modules/_setup.js"}],"node_modules/underscore/modules/isString.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _tagTester.default)('String');

exports.default = _default;
},{"./_tagTester.js":"node_modules/underscore/modules/_tagTester.js"}],"node_modules/underscore/modules/isNumber.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _tagTester.default)('Number');

exports.default = _default;
},{"./_tagTester.js":"node_modules/underscore/modules/_tagTester.js"}],"node_modules/underscore/modules/isDate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _tagTester.default)('Date');

exports.default = _default;
},{"./_tagTester.js":"node_modules/underscore/modules/_tagTester.js"}],"node_modules/underscore/modules/isRegExp.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _tagTester.default)('RegExp');

exports.default = _default;
},{"./_tagTester.js":"node_modules/underscore/modules/_tagTester.js"}],"node_modules/underscore/modules/isError.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _tagTester.default)('Error');

exports.default = _default;
},{"./_tagTester.js":"node_modules/underscore/modules/_tagTester.js"}],"node_modules/underscore/modules/isSymbol.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _tagTester.default)('Symbol');

exports.default = _default;
},{"./_tagTester.js":"node_modules/underscore/modules/_tagTester.js"}],"node_modules/underscore/modules/isArrayBuffer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _tagTester.default)('ArrayBuffer');

exports.default = _default;
},{"./_tagTester.js":"node_modules/underscore/modules/_tagTester.js"}],"node_modules/underscore/modules/isFunction.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

var _setup = require("./_setup.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isFunction = (0, _tagTester.default)('Function'); // Optimize `isFunction` if appropriate. Work around some `typeof` bugs in old
// v8, IE 11 (#1621), Safari 8 (#1929), and PhantomJS (#2236).

var nodelist = _setup.root.document && _setup.root.document.childNodes;

if (typeof /./ != 'function' && typeof Int8Array != 'object' && typeof nodelist != 'function') {
  isFunction = function (obj) {
    return typeof obj == 'function' || false;
  };
}

var _default = isFunction;
exports.default = _default;
},{"./_tagTester.js":"node_modules/underscore/modules/_tagTester.js","./_setup.js":"node_modules/underscore/modules/_setup.js"}],"node_modules/underscore/modules/_hasObjectTag.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _tagTester.default)('Object');

exports.default = _default;
},{"./_tagTester.js":"node_modules/underscore/modules/_tagTester.js"}],"node_modules/underscore/modules/_stringTagBug.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isIE11 = exports.hasStringTagBug = void 0;

var _setup = require("./_setup.js");

var _hasObjectTag = _interopRequireDefault(require("./_hasObjectTag.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// In IE 10 - Edge 13, `DataView` has string tag `'[object Object]'`.
// In IE 11, the most common among them, this problem also applies to
// `Map`, `WeakMap` and `Set`.
var hasStringTagBug = _setup.supportsDataView && (0, _hasObjectTag.default)(new DataView(new ArrayBuffer(8))),
    isIE11 = typeof Map !== 'undefined' && (0, _hasObjectTag.default)(new Map());
exports.isIE11 = isIE11;
exports.hasStringTagBug = hasStringTagBug;
},{"./_setup.js":"node_modules/underscore/modules/_setup.js","./_hasObjectTag.js":"node_modules/underscore/modules/_hasObjectTag.js"}],"node_modules/underscore/modules/isDataView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

var _isFunction = _interopRequireDefault(require("./isFunction.js"));

var _isArrayBuffer = _interopRequireDefault(require("./isArrayBuffer.js"));

var _stringTagBug = require("./_stringTagBug.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isDataView = (0, _tagTester.default)('DataView'); // In IE 10 - Edge 13, we need a different heuristic
// to determine whether an object is a `DataView`.

function ie10IsDataView(obj) {
  return obj != null && (0, _isFunction.default)(obj.getInt8) && (0, _isArrayBuffer.default)(obj.buffer);
}

var _default = _stringTagBug.hasStringTagBug ? ie10IsDataView : isDataView;

exports.default = _default;
},{"./_tagTester.js":"node_modules/underscore/modules/_tagTester.js","./isFunction.js":"node_modules/underscore/modules/isFunction.js","./isArrayBuffer.js":"node_modules/underscore/modules/isArrayBuffer.js","./_stringTagBug.js":"node_modules/underscore/modules/_stringTagBug.js"}],"node_modules/underscore/modules/isArray.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _setup = require("./_setup.js");

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Is a given value an array?
// Delegates to ECMA5's native `Array.isArray`.
var _default = _setup.nativeIsArray || (0, _tagTester.default)('Array');

exports.default = _default;
},{"./_setup.js":"node_modules/underscore/modules/_setup.js","./_tagTester.js":"node_modules/underscore/modules/_tagTester.js"}],"node_modules/underscore/modules/_has.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = has;

var _setup = require("./_setup.js");

// Internal function to check whether `key` is an own property name of `obj`.
function has(obj, key) {
  return obj != null && _setup.hasOwnProperty.call(obj, key);
}
},{"./_setup.js":"node_modules/underscore/modules/_setup.js"}],"node_modules/underscore/modules/isArguments.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

var _has = _interopRequireDefault(require("./_has.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isArguments = (0, _tagTester.default)('Arguments'); // Define a fallback version of the method in browsers (ahem, IE < 9), where
// there isn't any inspectable "Arguments" type.

(function () {
  if (!isArguments(arguments)) {
    isArguments = function (obj) {
      return (0, _has.default)(obj, 'callee');
    };
  }
})();

var _default = isArguments;
exports.default = _default;
},{"./_tagTester.js":"node_modules/underscore/modules/_tagTester.js","./_has.js":"node_modules/underscore/modules/_has.js"}],"node_modules/underscore/modules/isFinite.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isFinite;

var _setup = require("./_setup.js");

var _isSymbol = _interopRequireDefault(require("./isSymbol.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Is a given object a finite number?
function isFinite(obj) {
  return !(0, _isSymbol.default)(obj) && (0, _setup._isFinite)(obj) && !isNaN(parseFloat(obj));
}
},{"./_setup.js":"node_modules/underscore/modules/_setup.js","./isSymbol.js":"node_modules/underscore/modules/isSymbol.js"}],"node_modules/underscore/modules/isNaN.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isNaN;

var _setup = require("./_setup.js");

var _isNumber = _interopRequireDefault(require("./isNumber.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Is the given value `NaN`?
function isNaN(obj) {
  return (0, _isNumber.default)(obj) && (0, _setup._isNaN)(obj);
}
},{"./_setup.js":"node_modules/underscore/modules/_setup.js","./isNumber.js":"node_modules/underscore/modules/isNumber.js"}],"node_modules/underscore/modules/constant.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = constant;

// Predicate-generating function. Often useful outside of Underscore.
function constant(value) {
  return function () {
    return value;
  };
}
},{}],"node_modules/underscore/modules/_createSizePropertyCheck.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createSizePropertyCheck;

var _setup = require("./_setup.js");

// Common internal logic for `isArrayLike` and `isBufferLike`.
function createSizePropertyCheck(getSizeProperty) {
  return function (collection) {
    var sizeProperty = getSizeProperty(collection);
    return typeof sizeProperty == 'number' && sizeProperty >= 0 && sizeProperty <= _setup.MAX_ARRAY_INDEX;
  };
}
},{"./_setup.js":"node_modules/underscore/modules/_setup.js"}],"node_modules/underscore/modules/_shallowProperty.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = shallowProperty;

// Internal helper to generate a function to obtain property `key` from `obj`.
function shallowProperty(key) {
  return function (obj) {
    return obj == null ? void 0 : obj[key];
  };
}
},{}],"node_modules/underscore/modules/_getByteLength.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _shallowProperty = _interopRequireDefault(require("./_shallowProperty.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Internal helper to obtain the `byteLength` property of an object.
var _default = (0, _shallowProperty.default)('byteLength');

exports.default = _default;
},{"./_shallowProperty.js":"node_modules/underscore/modules/_shallowProperty.js"}],"node_modules/underscore/modules/_isBufferLike.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createSizePropertyCheck = _interopRequireDefault(require("./_createSizePropertyCheck.js"));

var _getByteLength = _interopRequireDefault(require("./_getByteLength.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Internal helper to determine whether we should spend extensive checks against
// `ArrayBuffer` et al.
var _default = (0, _createSizePropertyCheck.default)(_getByteLength.default);

exports.default = _default;
},{"./_createSizePropertyCheck.js":"node_modules/underscore/modules/_createSizePropertyCheck.js","./_getByteLength.js":"node_modules/underscore/modules/_getByteLength.js"}],"node_modules/underscore/modules/isTypedArray.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _setup = require("./_setup.js");

var _isDataView = _interopRequireDefault(require("./isDataView.js"));

var _constant = _interopRequireDefault(require("./constant.js"));

var _isBufferLike = _interopRequireDefault(require("./_isBufferLike.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Is a given value a typed array?
var typedArrayPattern = /\[object ((I|Ui)nt(8|16|32)|Float(32|64)|Uint8Clamped|Big(I|Ui)nt64)Array\]/;

function isTypedArray(obj) {
  // `ArrayBuffer.isView` is the most future-proof, so use it when available.
  // Otherwise, fall back on the above regular expression.
  return _setup.nativeIsView ? (0, _setup.nativeIsView)(obj) && !(0, _isDataView.default)(obj) : (0, _isBufferLike.default)(obj) && typedArrayPattern.test(_setup.toString.call(obj));
}

var _default = _setup.supportsArrayBuffer ? isTypedArray : (0, _constant.default)(false);

exports.default = _default;
},{"./_setup.js":"node_modules/underscore/modules/_setup.js","./isDataView.js":"node_modules/underscore/modules/isDataView.js","./constant.js":"node_modules/underscore/modules/constant.js","./_isBufferLike.js":"node_modules/underscore/modules/_isBufferLike.js"}],"node_modules/underscore/modules/_getLength.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _shallowProperty = _interopRequireDefault(require("./_shallowProperty.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Internal helper to obtain the `length` property of an object.
var _default = (0, _shallowProperty.default)('length');

exports.default = _default;
},{"./_shallowProperty.js":"node_modules/underscore/modules/_shallowProperty.js"}],"node_modules/underscore/modules/_collectNonEnumProps.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = collectNonEnumProps;

var _setup = require("./_setup.js");

var _isFunction = _interopRequireDefault(require("./isFunction.js"));

var _has = _interopRequireDefault(require("./_has.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Internal helper to create a simple lookup structure.
// `collectNonEnumProps` used to depend on `_.contains`, but this led to
// circular imports. `emulatedSet` is a one-off solution that only works for
// arrays of strings.
function emulatedSet(keys) {
  var hash = {};

  for (var l = keys.length, i = 0; i < l; ++i) hash[keys[i]] = true;

  return {
    contains: function (key) {
      return hash[key];
    },
    push: function (key) {
      hash[key] = true;
      return keys.push(key);
    }
  };
} // Internal helper. Checks `keys` for the presence of keys in IE < 9 that won't
// be iterated by `for key in ...` and thus missed. Extends `keys` in place if
// needed.


function collectNonEnumProps(obj, keys) {
  keys = emulatedSet(keys);
  var nonEnumIdx = _setup.nonEnumerableProps.length;
  var constructor = obj.constructor;

  var proto = (0, _isFunction.default)(constructor) && constructor.prototype || _setup.ObjProto; // Constructor is a special case.


  var prop = 'constructor';
  if ((0, _has.default)(obj, prop) && !keys.contains(prop)) keys.push(prop);

  while (nonEnumIdx--) {
    prop = _setup.nonEnumerableProps[nonEnumIdx];

    if (prop in obj && obj[prop] !== proto[prop] && !keys.contains(prop)) {
      keys.push(prop);
    }
  }
}
},{"./_setup.js":"node_modules/underscore/modules/_setup.js","./isFunction.js":"node_modules/underscore/modules/isFunction.js","./_has.js":"node_modules/underscore/modules/_has.js"}],"node_modules/underscore/modules/keys.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = keys;

var _isObject = _interopRequireDefault(require("./isObject.js"));

var _setup = require("./_setup.js");

var _has = _interopRequireDefault(require("./_has.js"));

var _collectNonEnumProps = _interopRequireDefault(require("./_collectNonEnumProps.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Retrieve the names of an object's own properties.
// Delegates to **ECMAScript 5**'s native `Object.keys`.
function keys(obj) {
  if (!(0, _isObject.default)(obj)) return [];
  if (_setup.nativeKeys) return (0, _setup.nativeKeys)(obj);
  var keys = [];

  for (var key in obj) if ((0, _has.default)(obj, key)) keys.push(key); // Ahem, IE < 9.


  if (_setup.hasEnumBug) (0, _collectNonEnumProps.default)(obj, keys);
  return keys;
}
},{"./isObject.js":"node_modules/underscore/modules/isObject.js","./_setup.js":"node_modules/underscore/modules/_setup.js","./_has.js":"node_modules/underscore/modules/_has.js","./_collectNonEnumProps.js":"node_modules/underscore/modules/_collectNonEnumProps.js"}],"node_modules/underscore/modules/isEmpty.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isEmpty;

var _getLength = _interopRequireDefault(require("./_getLength.js"));

var _isArray = _interopRequireDefault(require("./isArray.js"));

var _isString = _interopRequireDefault(require("./isString.js"));

var _isArguments = _interopRequireDefault(require("./isArguments.js"));

var _keys = _interopRequireDefault(require("./keys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Is a given array, string, or object empty?
// An "empty" object has no enumerable own-properties.
function isEmpty(obj) {
  if (obj == null) return true; // Skip the more expensive `toString`-based type checks if `obj` has no
  // `.length`.

  var length = (0, _getLength.default)(obj);
  if (typeof length == 'number' && ((0, _isArray.default)(obj) || (0, _isString.default)(obj) || (0, _isArguments.default)(obj))) return length === 0;
  return (0, _getLength.default)((0, _keys.default)(obj)) === 0;
}
},{"./_getLength.js":"node_modules/underscore/modules/_getLength.js","./isArray.js":"node_modules/underscore/modules/isArray.js","./isString.js":"node_modules/underscore/modules/isString.js","./isArguments.js":"node_modules/underscore/modules/isArguments.js","./keys.js":"node_modules/underscore/modules/keys.js"}],"node_modules/underscore/modules/isMatch.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isMatch;

var _keys2 = _interopRequireDefault(require("./keys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Returns whether an object has a given set of `key:value` pairs.
function isMatch(object, attrs) {
  var _keys = (0, _keys2.default)(attrs),
      length = _keys.length;

  if (object == null) return !length;
  var obj = Object(object);

  for (var i = 0; i < length; i++) {
    var key = _keys[i];
    if (attrs[key] !== obj[key] || !(key in obj)) return false;
  }

  return true;
}
},{"./keys.js":"node_modules/underscore/modules/keys.js"}],"node_modules/underscore/modules/underscore.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _;

var _setup = require("./_setup.js");

// If Underscore is called as a function, it returns a wrapped object that can
// be used OO-style. This wrapper holds altered versions of all functions added
// through `_.mixin`. Wrapped objects may be chained.
function _(obj) {
  if (obj instanceof _) return obj;
  if (!(this instanceof _)) return new _(obj);
  this._wrapped = obj;
}

_.VERSION = _setup.VERSION; // Extracts the result from a wrapped and chained object.

_.prototype.value = function () {
  return this._wrapped;
}; // Provide unwrapping proxies for some methods used in engine operations
// such as arithmetic and JSON stringification.


_.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

_.prototype.toString = function () {
  return String(this._wrapped);
};
},{"./_setup.js":"node_modules/underscore/modules/_setup.js"}],"node_modules/underscore/modules/_toBufferView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toBufferView;

var _getByteLength = _interopRequireDefault(require("./_getByteLength.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Internal function to wrap or shallow-copy an ArrayBuffer,
// typed array or DataView to a new view, reusing the buffer.
function toBufferView(bufferSource) {
  return new Uint8Array(bufferSource.buffer || bufferSource, bufferSource.byteOffset || 0, (0, _getByteLength.default)(bufferSource));
}
},{"./_getByteLength.js":"node_modules/underscore/modules/_getByteLength.js"}],"node_modules/underscore/modules/isEqual.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isEqual;

var _underscore = _interopRequireDefault(require("./underscore.js"));

var _setup = require("./_setup.js");

var _getByteLength = _interopRequireDefault(require("./_getByteLength.js"));

var _isTypedArray = _interopRequireDefault(require("./isTypedArray.js"));

var _isFunction = _interopRequireDefault(require("./isFunction.js"));

var _stringTagBug = require("./_stringTagBug.js");

var _isDataView = _interopRequireDefault(require("./isDataView.js"));

var _keys2 = _interopRequireDefault(require("./keys.js"));

var _has = _interopRequireDefault(require("./_has.js"));

var _toBufferView = _interopRequireDefault(require("./_toBufferView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// We use this string twice, so give it a name for minification.
var tagDataView = '[object DataView]'; // Internal recursive comparison function for `_.isEqual`.

function eq(a, b, aStack, bStack) {
  // Identical objects are equal. `0 === -0`, but they aren't identical.
  // See the [Harmony `egal` proposal](https://wiki.ecmascript.org/doku.php?id=harmony:egal).
  if (a === b) return a !== 0 || 1 / a === 1 / b; // `null` or `undefined` only equal to itself (strict comparison).

  if (a == null || b == null) return false; // `NaN`s are equivalent, but non-reflexive.

  if (a !== a) return b !== b; // Exhaust primitive checks

  var type = typeof a;
  if (type !== 'function' && type !== 'object' && typeof b != 'object') return false;
  return deepEq(a, b, aStack, bStack);
} // Internal recursive comparison function for `_.isEqual`.


function deepEq(a, b, aStack, bStack) {
  // Unwrap any wrapped objects.
  if (a instanceof _underscore.default) a = a._wrapped;
  if (b instanceof _underscore.default) b = b._wrapped; // Compare `[[Class]]` names.

  var className = _setup.toString.call(a);

  if (className !== _setup.toString.call(b)) return false; // Work around a bug in IE 10 - Edge 13.

  if (_stringTagBug.hasStringTagBug && className == '[object Object]' && (0, _isDataView.default)(a)) {
    if (!(0, _isDataView.default)(b)) return false;
    className = tagDataView;
  }

  switch (className) {
    // These types are compared by value.
    case '[object RegExp]': // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')

    case '[object String]':
      // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
      // equivalent to `new String("5")`.
      return '' + a === '' + b;

    case '[object Number]':
      // `NaN`s are equivalent, but non-reflexive.
      // Object(NaN) is equivalent to NaN.
      if (+a !== +a) return +b !== +b; // An `egal` comparison is performed for other numeric values.

      return +a === 0 ? 1 / +a === 1 / b : +a === +b;

    case '[object Date]':
    case '[object Boolean]':
      // Coerce dates and booleans to numeric primitive values. Dates are compared by their
      // millisecond representations. Note that invalid dates with millisecond representations
      // of `NaN` are not equivalent.
      return +a === +b;

    case '[object Symbol]':
      return _setup.SymbolProto.valueOf.call(a) === _setup.SymbolProto.valueOf.call(b);

    case '[object ArrayBuffer]':
    case tagDataView:
      // Coerce to typed array so we can fall through.
      return deepEq((0, _toBufferView.default)(a), (0, _toBufferView.default)(b), aStack, bStack);
  }

  var areArrays = className === '[object Array]';

  if (!areArrays && (0, _isTypedArray.default)(a)) {
    var byteLength = (0, _getByteLength.default)(a);
    if (byteLength !== (0, _getByteLength.default)(b)) return false;
    if (a.buffer === b.buffer && a.byteOffset === b.byteOffset) return true;
    areArrays = true;
  }

  if (!areArrays) {
    if (typeof a != 'object' || typeof b != 'object') return false; // Objects with different constructors are not equivalent, but `Object`s or `Array`s
    // from different frames are.

    var aCtor = a.constructor,
        bCtor = b.constructor;

    if (aCtor !== bCtor && !((0, _isFunction.default)(aCtor) && aCtor instanceof aCtor && (0, _isFunction.default)(bCtor) && bCtor instanceof bCtor) && 'constructor' in a && 'constructor' in b) {
      return false;
    }
  } // Assume equality for cyclic structures. The algorithm for detecting cyclic
  // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
  // Initializing stack of traversed objects.
  // It's done here since we only need them for objects and arrays comparison.


  aStack = aStack || [];
  bStack = bStack || [];
  var length = aStack.length;

  while (length--) {
    // Linear search. Performance is inversely proportional to the number of
    // unique nested structures.
    if (aStack[length] === a) return bStack[length] === b;
  } // Add the first object to the stack of traversed objects.


  aStack.push(a);
  bStack.push(b); // Recursively compare objects and arrays.

  if (areArrays) {
    // Compare array lengths to determine if a deep comparison is necessary.
    length = a.length;
    if (length !== b.length) return false; // Deep compare the contents, ignoring non-numeric properties.

    while (length--) {
      if (!eq(a[length], b[length], aStack, bStack)) return false;
    }
  } else {
    // Deep compare objects.
    var _keys = (0, _keys2.default)(a),
        key;

    length = _keys.length; // Ensure that both objects contain the same number of properties before comparing deep equality.

    if ((0, _keys2.default)(b).length !== length) return false;

    while (length--) {
      // Deep compare each member
      key = _keys[length];
      if (!((0, _has.default)(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
    }
  } // Remove the first object from the stack of traversed objects.


  aStack.pop();
  bStack.pop();
  return true;
} // Perform a deep comparison to check if two objects are equal.


function isEqual(a, b) {
  return eq(a, b);
}
},{"./underscore.js":"node_modules/underscore/modules/underscore.js","./_setup.js":"node_modules/underscore/modules/_setup.js","./_getByteLength.js":"node_modules/underscore/modules/_getByteLength.js","./isTypedArray.js":"node_modules/underscore/modules/isTypedArray.js","./isFunction.js":"node_modules/underscore/modules/isFunction.js","./_stringTagBug.js":"node_modules/underscore/modules/_stringTagBug.js","./isDataView.js":"node_modules/underscore/modules/isDataView.js","./keys.js":"node_modules/underscore/modules/keys.js","./_has.js":"node_modules/underscore/modules/_has.js","./_toBufferView.js":"node_modules/underscore/modules/_toBufferView.js"}],"node_modules/underscore/modules/allKeys.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = allKeys;

var _isObject = _interopRequireDefault(require("./isObject.js"));

var _setup = require("./_setup.js");

var _collectNonEnumProps = _interopRequireDefault(require("./_collectNonEnumProps.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Retrieve all the enumerable property names of an object.
function allKeys(obj) {
  if (!(0, _isObject.default)(obj)) return [];
  var keys = [];

  for (var key in obj) keys.push(key); // Ahem, IE < 9.


  if (_setup.hasEnumBug) (0, _collectNonEnumProps.default)(obj, keys);
  return keys;
}
},{"./isObject.js":"node_modules/underscore/modules/isObject.js","./_setup.js":"node_modules/underscore/modules/_setup.js","./_collectNonEnumProps.js":"node_modules/underscore/modules/_collectNonEnumProps.js"}],"node_modules/underscore/modules/_methodFingerprint.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ie11fingerprint = ie11fingerprint;
exports.setMethods = exports.weakMapMethods = exports.mapMethods = void 0;

var _getLength = _interopRequireDefault(require("./_getLength.js"));

var _isFunction = _interopRequireDefault(require("./isFunction.js"));

var _allKeys = _interopRequireDefault(require("./allKeys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Since the regular `Object.prototype.toString` type tests don't work for
// some types in IE 11, we use a fingerprinting heuristic instead, based
// on the methods. It's not great, but it's the best we got.
// The fingerprint method lists are defined below.
function ie11fingerprint(methods) {
  var length = (0, _getLength.default)(methods);
  return function (obj) {
    if (obj == null) return false; // `Map`, `WeakMap` and `Set` have no enumerable keys.

    var keys = (0, _allKeys.default)(obj);
    if ((0, _getLength.default)(keys)) return false;

    for (var i = 0; i < length; i++) {
      if (!(0, _isFunction.default)(obj[methods[i]])) return false;
    } // If we are testing against `WeakMap`, we need to ensure that
    // `obj` doesn't have a `forEach` method in order to distinguish
    // it from a regular `Map`.


    return methods !== weakMapMethods || !(0, _isFunction.default)(obj[forEachName]);
  };
} // In the interest of compact minification, we write
// each string in the fingerprints only once.


var forEachName = 'forEach',
    hasName = 'has',
    commonInit = ['clear', 'delete'],
    mapTail = ['get', hasName, 'set']; // `Map`, `WeakMap` and `Set` each have slightly different
// combinations of the above sublists.

var mapMethods = commonInit.concat(forEachName, mapTail),
    weakMapMethods = commonInit.concat(mapTail),
    setMethods = ['add'].concat(commonInit, forEachName, hasName);
exports.setMethods = setMethods;
exports.weakMapMethods = weakMapMethods;
exports.mapMethods = mapMethods;
},{"./_getLength.js":"node_modules/underscore/modules/_getLength.js","./isFunction.js":"node_modules/underscore/modules/isFunction.js","./allKeys.js":"node_modules/underscore/modules/allKeys.js"}],"node_modules/underscore/modules/isMap.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

var _stringTagBug = require("./_stringTagBug.js");

var _methodFingerprint = require("./_methodFingerprint.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _stringTagBug.isIE11 ? (0, _methodFingerprint.ie11fingerprint)(_methodFingerprint.mapMethods) : (0, _tagTester.default)('Map');

exports.default = _default;
},{"./_tagTester.js":"node_modules/underscore/modules/_tagTester.js","./_stringTagBug.js":"node_modules/underscore/modules/_stringTagBug.js","./_methodFingerprint.js":"node_modules/underscore/modules/_methodFingerprint.js"}],"node_modules/underscore/modules/isWeakMap.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

var _stringTagBug = require("./_stringTagBug.js");

var _methodFingerprint = require("./_methodFingerprint.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _stringTagBug.isIE11 ? (0, _methodFingerprint.ie11fingerprint)(_methodFingerprint.weakMapMethods) : (0, _tagTester.default)('WeakMap');

exports.default = _default;
},{"./_tagTester.js":"node_modules/underscore/modules/_tagTester.js","./_stringTagBug.js":"node_modules/underscore/modules/_stringTagBug.js","./_methodFingerprint.js":"node_modules/underscore/modules/_methodFingerprint.js"}],"node_modules/underscore/modules/isSet.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

var _stringTagBug = require("./_stringTagBug.js");

var _methodFingerprint = require("./_methodFingerprint.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _stringTagBug.isIE11 ? (0, _methodFingerprint.ie11fingerprint)(_methodFingerprint.setMethods) : (0, _tagTester.default)('Set');

exports.default = _default;
},{"./_tagTester.js":"node_modules/underscore/modules/_tagTester.js","./_stringTagBug.js":"node_modules/underscore/modules/_stringTagBug.js","./_methodFingerprint.js":"node_modules/underscore/modules/_methodFingerprint.js"}],"node_modules/underscore/modules/isWeakSet.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _tagTester.default)('WeakSet');

exports.default = _default;
},{"./_tagTester.js":"node_modules/underscore/modules/_tagTester.js"}],"node_modules/underscore/modules/values.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = values;

var _keys2 = _interopRequireDefault(require("./keys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Retrieve the values of an object's properties.
function values(obj) {
  var _keys = (0, _keys2.default)(obj);

  var length = _keys.length;
  var values = Array(length);

  for (var i = 0; i < length; i++) {
    values[i] = obj[_keys[i]];
  }

  return values;
}
},{"./keys.js":"node_modules/underscore/modules/keys.js"}],"node_modules/underscore/modules/pairs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pairs;

var _keys2 = _interopRequireDefault(require("./keys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Convert an object into a list of `[key, value]` pairs.
// The opposite of `_.object` with one argument.
function pairs(obj) {
  var _keys = (0, _keys2.default)(obj);

  var length = _keys.length;
  var pairs = Array(length);

  for (var i = 0; i < length; i++) {
    pairs[i] = [_keys[i], obj[_keys[i]]];
  }

  return pairs;
}
},{"./keys.js":"node_modules/underscore/modules/keys.js"}],"node_modules/underscore/modules/invert.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = invert;

var _keys2 = _interopRequireDefault(require("./keys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Invert the keys and values of an object. The values must be serializable.
function invert(obj) {
  var result = {};

  var _keys = (0, _keys2.default)(obj);

  for (var i = 0, length = _keys.length; i < length; i++) {
    result[obj[_keys[i]]] = _keys[i];
  }

  return result;
}
},{"./keys.js":"node_modules/underscore/modules/keys.js"}],"node_modules/underscore/modules/functions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = functions;

var _isFunction = _interopRequireDefault(require("./isFunction.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Return a sorted list of the function names available on the object.
function functions(obj) {
  var names = [];

  for (var key in obj) {
    if ((0, _isFunction.default)(obj[key])) names.push(key);
  }

  return names.sort();
}
},{"./isFunction.js":"node_modules/underscore/modules/isFunction.js"}],"node_modules/underscore/modules/_createAssigner.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createAssigner;

// An internal function for creating assigner functions.
function createAssigner(keysFunc, defaults) {
  return function (obj) {
    var length = arguments.length;
    if (defaults) obj = Object(obj);
    if (length < 2 || obj == null) return obj;

    for (var index = 1; index < length; index++) {
      var source = arguments[index],
          keys = keysFunc(source),
          l = keys.length;

      for (var i = 0; i < l; i++) {
        var key = keys[i];
        if (!defaults || obj[key] === void 0) obj[key] = source[key];
      }
    }

    return obj;
  };
}
},{}],"node_modules/underscore/modules/extend.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createAssigner = _interopRequireDefault(require("./_createAssigner.js"));

var _allKeys = _interopRequireDefault(require("./allKeys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Extend a given object with all the properties in passed-in object(s).
var _default = (0, _createAssigner.default)(_allKeys.default);

exports.default = _default;
},{"./_createAssigner.js":"node_modules/underscore/modules/_createAssigner.js","./allKeys.js":"node_modules/underscore/modules/allKeys.js"}],"node_modules/underscore/modules/extendOwn.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createAssigner = _interopRequireDefault(require("./_createAssigner.js"));

var _keys = _interopRequireDefault(require("./keys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Assigns a given object with all the own properties in the passed-in
// object(s).
// (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
var _default = (0, _createAssigner.default)(_keys.default);

exports.default = _default;
},{"./_createAssigner.js":"node_modules/underscore/modules/_createAssigner.js","./keys.js":"node_modules/underscore/modules/keys.js"}],"node_modules/underscore/modules/defaults.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createAssigner = _interopRequireDefault(require("./_createAssigner.js"));

var _allKeys = _interopRequireDefault(require("./allKeys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Fill in a given object with default properties.
var _default = (0, _createAssigner.default)(_allKeys.default, true);

exports.default = _default;
},{"./_createAssigner.js":"node_modules/underscore/modules/_createAssigner.js","./allKeys.js":"node_modules/underscore/modules/allKeys.js"}],"node_modules/underscore/modules/_baseCreate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = baseCreate;

var _isObject = _interopRequireDefault(require("./isObject.js"));

var _setup = require("./_setup.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Create a naked function reference for surrogate-prototype-swapping.
function ctor() {
  return function () {};
} // An internal function for creating a new object that inherits from another.


function baseCreate(prototype) {
  if (!(0, _isObject.default)(prototype)) return {};
  if (_setup.nativeCreate) return (0, _setup.nativeCreate)(prototype);
  var Ctor = ctor();
  Ctor.prototype = prototype;
  var result = new Ctor();
  Ctor.prototype = null;
  return result;
}
},{"./isObject.js":"node_modules/underscore/modules/isObject.js","./_setup.js":"node_modules/underscore/modules/_setup.js"}],"node_modules/underscore/modules/create.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = create;

var _baseCreate = _interopRequireDefault(require("./_baseCreate.js"));

var _extendOwn = _interopRequireDefault(require("./extendOwn.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Creates an object that inherits from the given prototype object.
// If additional properties are provided then they will be added to the
// created object.
function create(prototype, props) {
  var result = (0, _baseCreate.default)(prototype);
  if (props) (0, _extendOwn.default)(result, props);
  return result;
}
},{"./_baseCreate.js":"node_modules/underscore/modules/_baseCreate.js","./extendOwn.js":"node_modules/underscore/modules/extendOwn.js"}],"node_modules/underscore/modules/clone.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = clone;

var _isObject = _interopRequireDefault(require("./isObject.js"));

var _isArray = _interopRequireDefault(require("./isArray.js"));

var _extend = _interopRequireDefault(require("./extend.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Create a (shallow-cloned) duplicate of an object.
function clone(obj) {
  if (!(0, _isObject.default)(obj)) return obj;
  return (0, _isArray.default)(obj) ? obj.slice() : (0, _extend.default)({}, obj);
}
},{"./isObject.js":"node_modules/underscore/modules/isObject.js","./isArray.js":"node_modules/underscore/modules/isArray.js","./extend.js":"node_modules/underscore/modules/extend.js"}],"node_modules/underscore/modules/tap.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = tap;

// Invokes `interceptor` with the `obj` and then returns `obj`.
// The primary purpose of this method is to "tap into" a method chain, in
// order to perform operations on intermediate results within the chain.
function tap(obj, interceptor) {
  interceptor(obj);
  return obj;
}
},{}],"node_modules/underscore/modules/toPath.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toPath;

var _underscore = _interopRequireDefault(require("./underscore.js"));

var _isArray = _interopRequireDefault(require("./isArray.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Normalize a (deep) property `path` to array.
// Like `_.iteratee`, this function can be customized.
function toPath(path) {
  return (0, _isArray.default)(path) ? path : [path];
}

_underscore.default.toPath = toPath;
},{"./underscore.js":"node_modules/underscore/modules/underscore.js","./isArray.js":"node_modules/underscore/modules/isArray.js"}],"node_modules/underscore/modules/_toPath.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toPath;

var _underscore = _interopRequireDefault(require("./underscore.js"));

require("./toPath.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Internal wrapper for `_.toPath` to enable minification.
// Similar to `cb` for `_.iteratee`.
function toPath(path) {
  return _underscore.default.toPath(path);
}
},{"./underscore.js":"node_modules/underscore/modules/underscore.js","./toPath.js":"node_modules/underscore/modules/toPath.js"}],"node_modules/underscore/modules/_deepGet.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = deepGet;

// Internal function to obtain a nested property in `obj` along `path`.
function deepGet(obj, path) {
  var length = path.length;

  for (var i = 0; i < length; i++) {
    if (obj == null) return void 0;
    obj = obj[path[i]];
  }

  return length ? obj : void 0;
}
},{}],"node_modules/underscore/modules/get.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = get;

var _toPath = _interopRequireDefault(require("./_toPath.js"));

var _deepGet = _interopRequireDefault(require("./_deepGet.js"));

var _isUndefined = _interopRequireDefault(require("./isUndefined.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Get the value of the (deep) property on `path` from `object`.
// If any property in `path` does not exist or if the value is
// `undefined`, return `defaultValue` instead.
// The `path` is normalized through `_.toPath`.
function get(object, path, defaultValue) {
  var value = (0, _deepGet.default)(object, (0, _toPath.default)(path));
  return (0, _isUndefined.default)(value) ? defaultValue : value;
}
},{"./_toPath.js":"node_modules/underscore/modules/_toPath.js","./_deepGet.js":"node_modules/underscore/modules/_deepGet.js","./isUndefined.js":"node_modules/underscore/modules/isUndefined.js"}],"node_modules/underscore/modules/has.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = has;

var _has2 = _interopRequireDefault(require("./_has.js"));

var _toPath = _interopRequireDefault(require("./_toPath.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Shortcut function for checking if an object has a given property directly on
// itself (in other words, not on a prototype). Unlike the internal `has`
// function, this public version can also traverse nested properties.
function has(obj, path) {
  path = (0, _toPath.default)(path);
  var length = path.length;

  for (var i = 0; i < length; i++) {
    var key = path[i];
    if (!(0, _has2.default)(obj, key)) return false;
    obj = obj[key];
  }

  return !!length;
}
},{"./_has.js":"node_modules/underscore/modules/_has.js","./_toPath.js":"node_modules/underscore/modules/_toPath.js"}],"node_modules/underscore/modules/identity.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = identity;

// Keep the identity function around for default iteratees.
function identity(value) {
  return value;
}
},{}],"node_modules/underscore/modules/matcher.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = matcher;

var _extendOwn = _interopRequireDefault(require("./extendOwn.js"));

var _isMatch = _interopRequireDefault(require("./isMatch.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Returns a predicate for checking whether an object has a given set of
// `key:value` pairs.
function matcher(attrs) {
  attrs = (0, _extendOwn.default)({}, attrs);
  return function (obj) {
    return (0, _isMatch.default)(obj, attrs);
  };
}
},{"./extendOwn.js":"node_modules/underscore/modules/extendOwn.js","./isMatch.js":"node_modules/underscore/modules/isMatch.js"}],"node_modules/underscore/modules/property.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = property;

var _deepGet = _interopRequireDefault(require("./_deepGet.js"));

var _toPath = _interopRequireDefault(require("./_toPath.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Creates a function that, when passed an object, will traverse that object’s
// properties down the given `path`, specified as an array of keys or indices.
function property(path) {
  path = (0, _toPath.default)(path);
  return function (obj) {
    return (0, _deepGet.default)(obj, path);
  };
}
},{"./_deepGet.js":"node_modules/underscore/modules/_deepGet.js","./_toPath.js":"node_modules/underscore/modules/_toPath.js"}],"node_modules/underscore/modules/_optimizeCb.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = optimizeCb;

// Internal function that returns an efficient (for current engines) version
// of the passed-in callback, to be repeatedly applied in other Underscore
// functions.
function optimizeCb(func, context, argCount) {
  if (context === void 0) return func;

  switch (argCount == null ? 3 : argCount) {
    case 1:
      return function (value) {
        return func.call(context, value);
      };
    // The 2-argument case is omitted because we’re not using it.

    case 3:
      return function (value, index, collection) {
        return func.call(context, value, index, collection);
      };

    case 4:
      return function (accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
  }

  return function () {
    return func.apply(context, arguments);
  };
}
},{}],"node_modules/underscore/modules/_baseIteratee.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = baseIteratee;

var _identity = _interopRequireDefault(require("./identity.js"));

var _isFunction = _interopRequireDefault(require("./isFunction.js"));

var _isObject = _interopRequireDefault(require("./isObject.js"));

var _isArray = _interopRequireDefault(require("./isArray.js"));

var _matcher = _interopRequireDefault(require("./matcher.js"));

var _property = _interopRequireDefault(require("./property.js"));

var _optimizeCb = _interopRequireDefault(require("./_optimizeCb.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// An internal function to generate callbacks that can be applied to each
// element in a collection, returning the desired result — either `_.identity`,
// an arbitrary callback, a property matcher, or a property accessor.
function baseIteratee(value, context, argCount) {
  if (value == null) return _identity.default;
  if ((0, _isFunction.default)(value)) return (0, _optimizeCb.default)(value, context, argCount);
  if ((0, _isObject.default)(value) && !(0, _isArray.default)(value)) return (0, _matcher.default)(value);
  return (0, _property.default)(value);
}
},{"./identity.js":"node_modules/underscore/modules/identity.js","./isFunction.js":"node_modules/underscore/modules/isFunction.js","./isObject.js":"node_modules/underscore/modules/isObject.js","./isArray.js":"node_modules/underscore/modules/isArray.js","./matcher.js":"node_modules/underscore/modules/matcher.js","./property.js":"node_modules/underscore/modules/property.js","./_optimizeCb.js":"node_modules/underscore/modules/_optimizeCb.js"}],"node_modules/underscore/modules/iteratee.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = iteratee;

var _underscore = _interopRequireDefault(require("./underscore.js"));

var _baseIteratee = _interopRequireDefault(require("./_baseIteratee.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// External wrapper for our callback generator. Users may customize
// `_.iteratee` if they want additional predicate/iteratee shorthand styles.
// This abstraction hides the internal-only `argCount` argument.
function iteratee(value, context) {
  return (0, _baseIteratee.default)(value, context, Infinity);
}

_underscore.default.iteratee = iteratee;
},{"./underscore.js":"node_modules/underscore/modules/underscore.js","./_baseIteratee.js":"node_modules/underscore/modules/_baseIteratee.js"}],"node_modules/underscore/modules/_cb.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cb;

var _underscore = _interopRequireDefault(require("./underscore.js"));

var _baseIteratee = _interopRequireDefault(require("./_baseIteratee.js"));

var _iteratee = _interopRequireDefault(require("./iteratee.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// The function we call internally to generate a callback. It invokes
// `_.iteratee` if overridden, otherwise `baseIteratee`.
function cb(value, context, argCount) {
  if (_underscore.default.iteratee !== _iteratee.default) return _underscore.default.iteratee(value, context);
  return (0, _baseIteratee.default)(value, context, argCount);
}
},{"./underscore.js":"node_modules/underscore/modules/underscore.js","./_baseIteratee.js":"node_modules/underscore/modules/_baseIteratee.js","./iteratee.js":"node_modules/underscore/modules/iteratee.js"}],"node_modules/underscore/modules/mapObject.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mapObject;

var _cb = _interopRequireDefault(require("./_cb.js"));

var _keys2 = _interopRequireDefault(require("./keys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Returns the results of applying the `iteratee` to each element of `obj`.
// In contrast to `_.map` it returns an object.
function mapObject(obj, iteratee, context) {
  iteratee = (0, _cb.default)(iteratee, context);

  var _keys = (0, _keys2.default)(obj),
      length = _keys.length,
      results = {};

  for (var index = 0; index < length; index++) {
    var currentKey = _keys[index];
    results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
  }

  return results;
}
},{"./_cb.js":"node_modules/underscore/modules/_cb.js","./keys.js":"node_modules/underscore/modules/keys.js"}],"node_modules/underscore/modules/noop.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = noop;

// Predicate-generating function. Often useful outside of Underscore.
function noop() {}
},{}],"node_modules/underscore/modules/propertyOf.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = propertyOf;

var _noop = _interopRequireDefault(require("./noop.js"));

var _get = _interopRequireDefault(require("./get.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Generates a function for a given object that returns a given property.
function propertyOf(obj) {
  if (obj == null) return _noop.default;
  return function (path) {
    return (0, _get.default)(obj, path);
  };
}
},{"./noop.js":"node_modules/underscore/modules/noop.js","./get.js":"node_modules/underscore/modules/get.js"}],"node_modules/underscore/modules/times.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = times;

var _optimizeCb = _interopRequireDefault(require("./_optimizeCb.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Run a function **n** times.
function times(n, iteratee, context) {
  var accum = Array(Math.max(0, n));
  iteratee = (0, _optimizeCb.default)(iteratee, context, 1);

  for (var i = 0; i < n; i++) accum[i] = iteratee(i);

  return accum;
}
},{"./_optimizeCb.js":"node_modules/underscore/modules/_optimizeCb.js"}],"node_modules/underscore/modules/random.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = random;

// Return a random integer between `min` and `max` (inclusive).
function random(min, max) {
  if (max == null) {
    max = min;
    min = 0;
  }

  return min + Math.floor(Math.random() * (max - min + 1));
}
},{}],"node_modules/underscore/modules/now.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// A (possibly faster) way to get the current timestamp as an integer.
var _default = Date.now || function () {
  return new Date().getTime();
};

exports.default = _default;
},{}],"node_modules/underscore/modules/_createEscaper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createEscaper;

var _keys = _interopRequireDefault(require("./keys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Internal helper to generate functions for escaping and unescaping strings
// to/from HTML interpolation.
function createEscaper(map) {
  var escaper = function (match) {
    return map[match];
  }; // Regexes for identifying a key that needs to be escaped.


  var source = '(?:' + (0, _keys.default)(map).join('|') + ')';
  var testRegexp = RegExp(source);
  var replaceRegexp = RegExp(source, 'g');
  return function (string) {
    string = string == null ? '' : '' + string;
    return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
  };
}
},{"./keys.js":"node_modules/underscore/modules/keys.js"}],"node_modules/underscore/modules/_escapeMap.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// Internal list of HTML entities for escaping.
var _default = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;'
};
exports.default = _default;
},{}],"node_modules/underscore/modules/escape.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createEscaper = _interopRequireDefault(require("./_createEscaper.js"));

var _escapeMap = _interopRequireDefault(require("./_escapeMap.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Function for escaping strings to HTML interpolation.
var _default = (0, _createEscaper.default)(_escapeMap.default);

exports.default = _default;
},{"./_createEscaper.js":"node_modules/underscore/modules/_createEscaper.js","./_escapeMap.js":"node_modules/underscore/modules/_escapeMap.js"}],"node_modules/underscore/modules/_unescapeMap.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _invert = _interopRequireDefault(require("./invert.js"));

var _escapeMap = _interopRequireDefault(require("./_escapeMap.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Internal list of HTML entities for unescaping.
var _default = (0, _invert.default)(_escapeMap.default);

exports.default = _default;
},{"./invert.js":"node_modules/underscore/modules/invert.js","./_escapeMap.js":"node_modules/underscore/modules/_escapeMap.js"}],"node_modules/underscore/modules/unescape.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createEscaper = _interopRequireDefault(require("./_createEscaper.js"));

var _unescapeMap = _interopRequireDefault(require("./_unescapeMap.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Function for unescaping strings from HTML interpolation.
var _default = (0, _createEscaper.default)(_unescapeMap.default);

exports.default = _default;
},{"./_createEscaper.js":"node_modules/underscore/modules/_createEscaper.js","./_unescapeMap.js":"node_modules/underscore/modules/_unescapeMap.js"}],"node_modules/underscore/modules/templateSettings.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _underscore = _interopRequireDefault(require("./underscore.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// By default, Underscore uses ERB-style template delimiters. Change the
// following template settings to use alternative delimiters.
var _default = _underscore.default.templateSettings = {
  evaluate: /<%([\s\S]+?)%>/g,
  interpolate: /<%=([\s\S]+?)%>/g,
  escape: /<%-([\s\S]+?)%>/g
};

exports.default = _default;
},{"./underscore.js":"node_modules/underscore/modules/underscore.js"}],"node_modules/underscore/modules/template.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = template;

var _defaults = _interopRequireDefault(require("./defaults.js"));

var _underscore = _interopRequireDefault(require("./underscore.js"));

require("./templateSettings.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// When customizing `_.templateSettings`, if you don't want to define an
// interpolation, evaluation or escaping regex, we need one that is
// guaranteed not to match.
var noMatch = /(.)^/; // Certain characters need to be escaped so that they can be put into a
// string literal.

var escapes = {
  "'": "'",
  '\\': '\\',
  '\r': 'r',
  '\n': 'n',
  '\u2028': 'u2028',
  '\u2029': 'u2029'
};
var escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;

function escapeChar(match) {
  return '\\' + escapes[match];
} // In order to prevent third-party code injection through
// `_.templateSettings.variable`, we test it against the following regular
// expression. It is intentionally a bit more liberal than just matching valid
// identifiers, but still prevents possible loopholes through defaults or
// destructuring assignment.


var bareIdentifier = /^\s*(\w|\$)+\s*$/; // JavaScript micro-templating, similar to John Resig's implementation.
// Underscore templating handles arbitrary delimiters, preserves whitespace,
// and correctly escapes quotes within interpolated code.
// NB: `oldSettings` only exists for backwards compatibility.

function template(text, settings, oldSettings) {
  if (!settings && oldSettings) settings = oldSettings;
  settings = (0, _defaults.default)({}, settings, _underscore.default.templateSettings); // Combine delimiters into one regular expression via alternation.

  var matcher = RegExp([(settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source].join('|') + '|$', 'g'); // Compile the template source, escaping string literals appropriately.

  var index = 0;
  var source = "__p+='";
  text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
    source += text.slice(index, offset).replace(escapeRegExp, escapeChar);
    index = offset + match.length;

    if (escape) {
      source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
    } else if (interpolate) {
      source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
    } else if (evaluate) {
      source += "';\n" + evaluate + "\n__p+='";
    } // Adobe VMs need the match returned to produce the correct offset.


    return match;
  });
  source += "';\n";
  var argument = settings.variable;

  if (argument) {
    // Insure against third-party code injection. (CVE-2021-23358)
    if (!bareIdentifier.test(argument)) throw new Error('variable is not a bare identifier: ' + argument);
  } else {
    // If a variable is not specified, place data values in local scope.
    source = 'with(obj||{}){\n' + source + '}\n';
    argument = 'obj';
  }

  source = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + source + 'return __p;\n';
  var render;

  try {
    render = new Function(argument, '_', source);
  } catch (e) {
    e.source = source;
    throw e;
  }

  var template = function (data) {
    return render.call(this, data, _underscore.default);
  }; // Provide the compiled source as a convenience for precompilation.


  template.source = 'function(' + argument + '){\n' + source + '}';
  return template;
}
},{"./defaults.js":"node_modules/underscore/modules/defaults.js","./underscore.js":"node_modules/underscore/modules/underscore.js","./templateSettings.js":"node_modules/underscore/modules/templateSettings.js"}],"node_modules/underscore/modules/result.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = result;

var _isFunction = _interopRequireDefault(require("./isFunction.js"));

var _toPath = _interopRequireDefault(require("./_toPath.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Traverses the children of `obj` along `path`. If a child is a function, it
// is invoked with its parent as context. Returns the value of the final
// child, or `fallback` if any child is undefined.
function result(obj, path, fallback) {
  path = (0, _toPath.default)(path);
  var length = path.length;

  if (!length) {
    return (0, _isFunction.default)(fallback) ? fallback.call(obj) : fallback;
  }

  for (var i = 0; i < length; i++) {
    var prop = obj == null ? void 0 : obj[path[i]];

    if (prop === void 0) {
      prop = fallback;
      i = length; // Ensure we don't continue iterating.
    }

    obj = (0, _isFunction.default)(prop) ? prop.call(obj) : prop;
  }

  return obj;
}
},{"./isFunction.js":"node_modules/underscore/modules/isFunction.js","./_toPath.js":"node_modules/underscore/modules/_toPath.js"}],"node_modules/underscore/modules/uniqueId.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = uniqueId;
// Generate a unique integer id (unique within the entire client session).
// Useful for temporary DOM ids.
var idCounter = 0;

function uniqueId(prefix) {
  var id = ++idCounter + '';
  return prefix ? prefix + id : id;
}
},{}],"node_modules/underscore/modules/chain.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = chain;

var _underscore = _interopRequireDefault(require("./underscore.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Start chaining a wrapped Underscore object.
function chain(obj) {
  var instance = (0, _underscore.default)(obj);
  instance._chain = true;
  return instance;
}
},{"./underscore.js":"node_modules/underscore/modules/underscore.js"}],"node_modules/underscore/modules/_executeBound.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = executeBound;

var _baseCreate = _interopRequireDefault(require("./_baseCreate.js"));

var _isObject = _interopRequireDefault(require("./isObject.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Internal function to execute `sourceFunc` bound to `context` with optional
// `args`. Determines whether to execute a function as a constructor or as a
// normal function.
function executeBound(sourceFunc, boundFunc, context, callingContext, args) {
  if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
  var self = (0, _baseCreate.default)(sourceFunc.prototype);
  var result = sourceFunc.apply(self, args);
  if ((0, _isObject.default)(result)) return result;
  return self;
}
},{"./_baseCreate.js":"node_modules/underscore/modules/_baseCreate.js","./isObject.js":"node_modules/underscore/modules/isObject.js"}],"node_modules/underscore/modules/partial.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _restArguments = _interopRequireDefault(require("./restArguments.js"));

var _executeBound = _interopRequireDefault(require("./_executeBound.js"));

var _underscore = _interopRequireDefault(require("./underscore.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Partially apply a function by creating a version that has had some of its
// arguments pre-filled, without changing its dynamic `this` context. `_` acts
// as a placeholder by default, allowing any combination of arguments to be
// pre-filled. Set `_.partial.placeholder` for a custom placeholder argument.
var partial = (0, _restArguments.default)(function (func, boundArgs) {
  var placeholder = partial.placeholder;

  var bound = function () {
    var position = 0,
        length = boundArgs.length;
    var args = Array(length);

    for (var i = 0; i < length; i++) {
      args[i] = boundArgs[i] === placeholder ? arguments[position++] : boundArgs[i];
    }

    while (position < arguments.length) args.push(arguments[position++]);

    return (0, _executeBound.default)(func, bound, this, this, args);
  };

  return bound;
});
partial.placeholder = _underscore.default;
var _default = partial;
exports.default = _default;
},{"./restArguments.js":"node_modules/underscore/modules/restArguments.js","./_executeBound.js":"node_modules/underscore/modules/_executeBound.js","./underscore.js":"node_modules/underscore/modules/underscore.js"}],"node_modules/underscore/modules/bind.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _restArguments = _interopRequireDefault(require("./restArguments.js"));

var _isFunction = _interopRequireDefault(require("./isFunction.js"));

var _executeBound = _interopRequireDefault(require("./_executeBound.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Create a function bound to a given object (assigning `this`, and arguments,
// optionally).
var _default = (0, _restArguments.default)(function (func, context, args) {
  if (!(0, _isFunction.default)(func)) throw new TypeError('Bind must be called on a function');
  var bound = (0, _restArguments.default)(function (callArgs) {
    return (0, _executeBound.default)(func, bound, context, this, args.concat(callArgs));
  });
  return bound;
});

exports.default = _default;
},{"./restArguments.js":"node_modules/underscore/modules/restArguments.js","./isFunction.js":"node_modules/underscore/modules/isFunction.js","./_executeBound.js":"node_modules/underscore/modules/_executeBound.js"}],"node_modules/underscore/modules/_isArrayLike.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createSizePropertyCheck = _interopRequireDefault(require("./_createSizePropertyCheck.js"));

var _getLength = _interopRequireDefault(require("./_getLength.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Internal helper for collection methods to determine whether a collection
// should be iterated as an array or as an object.
// Related: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
// Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
var _default = (0, _createSizePropertyCheck.default)(_getLength.default);

exports.default = _default;
},{"./_createSizePropertyCheck.js":"node_modules/underscore/modules/_createSizePropertyCheck.js","./_getLength.js":"node_modules/underscore/modules/_getLength.js"}],"node_modules/underscore/modules/_flatten.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flatten;

var _getLength = _interopRequireDefault(require("./_getLength.js"));

var _isArrayLike = _interopRequireDefault(require("./_isArrayLike.js"));

var _isArray = _interopRequireDefault(require("./isArray.js"));

var _isArguments = _interopRequireDefault(require("./isArguments.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Internal implementation of a recursive `flatten` function.
function flatten(input, depth, strict, output) {
  output = output || [];

  if (!depth && depth !== 0) {
    depth = Infinity;
  } else if (depth <= 0) {
    return output.concat(input);
  }

  var idx = output.length;

  for (var i = 0, length = (0, _getLength.default)(input); i < length; i++) {
    var value = input[i];

    if ((0, _isArrayLike.default)(value) && ((0, _isArray.default)(value) || (0, _isArguments.default)(value))) {
      // Flatten current level of array or arguments object.
      if (depth > 1) {
        flatten(value, depth - 1, strict, output);
        idx = output.length;
      } else {
        var j = 0,
            len = value.length;

        while (j < len) output[idx++] = value[j++];
      }
    } else if (!strict) {
      output[idx++] = value;
    }
  }

  return output;
}
},{"./_getLength.js":"node_modules/underscore/modules/_getLength.js","./_isArrayLike.js":"node_modules/underscore/modules/_isArrayLike.js","./isArray.js":"node_modules/underscore/modules/isArray.js","./isArguments.js":"node_modules/underscore/modules/isArguments.js"}],"node_modules/underscore/modules/bindAll.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _restArguments = _interopRequireDefault(require("./restArguments.js"));

var _flatten = _interopRequireDefault(require("./_flatten.js"));

var _bind = _interopRequireDefault(require("./bind.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Bind a number of an object's methods to that object. Remaining arguments
// are the method names to be bound. Useful for ensuring that all callbacks
// defined on an object belong to it.
var _default = (0, _restArguments.default)(function (obj, keys) {
  keys = (0, _flatten.default)(keys, false, false);
  var index = keys.length;
  if (index < 1) throw new Error('bindAll must be passed function names');

  while (index--) {
    var key = keys[index];
    obj[key] = (0, _bind.default)(obj[key], obj);
  }

  return obj;
});

exports.default = _default;
},{"./restArguments.js":"node_modules/underscore/modules/restArguments.js","./_flatten.js":"node_modules/underscore/modules/_flatten.js","./bind.js":"node_modules/underscore/modules/bind.js"}],"node_modules/underscore/modules/memoize.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = memoize;

var _has = _interopRequireDefault(require("./_has.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Memoize an expensive function by storing its results.
function memoize(func, hasher) {
  var memoize = function (key) {
    var cache = memoize.cache;
    var address = '' + (hasher ? hasher.apply(this, arguments) : key);
    if (!(0, _has.default)(cache, address)) cache[address] = func.apply(this, arguments);
    return cache[address];
  };

  memoize.cache = {};
  return memoize;
}
},{"./_has.js":"node_modules/underscore/modules/_has.js"}],"node_modules/underscore/modules/delay.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _restArguments = _interopRequireDefault(require("./restArguments.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Delays a function for the given number of milliseconds, and then calls
// it with the arguments supplied.
var _default = (0, _restArguments.default)(function (func, wait, args) {
  return setTimeout(function () {
    return func.apply(null, args);
  }, wait);
});

exports.default = _default;
},{"./restArguments.js":"node_modules/underscore/modules/restArguments.js"}],"node_modules/underscore/modules/defer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _partial = _interopRequireDefault(require("./partial.js"));

var _delay = _interopRequireDefault(require("./delay.js"));

var _underscore = _interopRequireDefault(require("./underscore.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Defers a function, scheduling it to run after the current call stack has
// cleared.
var _default = (0, _partial.default)(_delay.default, _underscore.default, 1);

exports.default = _default;
},{"./partial.js":"node_modules/underscore/modules/partial.js","./delay.js":"node_modules/underscore/modules/delay.js","./underscore.js":"node_modules/underscore/modules/underscore.js"}],"node_modules/underscore/modules/throttle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = throttle;

var _now2 = _interopRequireDefault(require("./now.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.
function throttle(func, wait, options) {
  var timeout, context, args, result;
  var previous = 0;
  if (!options) options = {};

  var later = function () {
    previous = options.leading === false ? 0 : (0, _now2.default)();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  var throttled = function () {
    var _now = (0, _now2.default)();

    if (!previous && options.leading === false) previous = _now;
    var remaining = wait - (_now - previous);
    context = this;
    args = arguments;

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }

      previous = _now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }

    return result;
  };

  throttled.cancel = function () {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  return throttled;
}
},{"./now.js":"node_modules/underscore/modules/now.js"}],"node_modules/underscore/modules/debounce.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = debounce;

var _restArguments = _interopRequireDefault(require("./restArguments.js"));

var _now = _interopRequireDefault(require("./now.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// When a sequence of calls of the returned function ends, the argument
// function is triggered. The end of a sequence is defined by the `wait`
// parameter. If `immediate` is passed, the argument function will be
// triggered at the beginning of the sequence instead of at the end.
function debounce(func, wait, immediate) {
  var timeout, previous, args, result, context;

  var later = function () {
    var passed = (0, _now.default)() - previous;

    if (wait > passed) {
      timeout = setTimeout(later, wait - passed);
    } else {
      timeout = null;
      if (!immediate) result = func.apply(context, args); // This check is needed because `func` can recursively invoke `debounced`.

      if (!timeout) args = context = null;
    }
  };

  var debounced = (0, _restArguments.default)(function (_args) {
    context = this;
    args = _args;
    previous = (0, _now.default)();

    if (!timeout) {
      timeout = setTimeout(later, wait);
      if (immediate) result = func.apply(context, args);
    }

    return result;
  });

  debounced.cancel = function () {
    clearTimeout(timeout);
    timeout = args = context = null;
  };

  return debounced;
}
},{"./restArguments.js":"node_modules/underscore/modules/restArguments.js","./now.js":"node_modules/underscore/modules/now.js"}],"node_modules/underscore/modules/wrap.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = wrap;

var _partial = _interopRequireDefault(require("./partial.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Returns the first function passed as an argument to the second,
// allowing you to adjust arguments, run code before and after, and
// conditionally execute the original function.
function wrap(func, wrapper) {
  return (0, _partial.default)(wrapper, func);
}
},{"./partial.js":"node_modules/underscore/modules/partial.js"}],"node_modules/underscore/modules/negate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = negate;

// Returns a negated version of the passed-in predicate.
function negate(predicate) {
  return function () {
    return !predicate.apply(this, arguments);
  };
}
},{}],"node_modules/underscore/modules/compose.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = compose;

// Returns a function that is the composition of a list of functions, each
// consuming the return value of the function that follows.
function compose() {
  var args = arguments;
  var start = args.length - 1;
  return function () {
    var i = start;
    var result = args[start].apply(this, arguments);

    while (i--) result = args[i].call(this, result);

    return result;
  };
}
},{}],"node_modules/underscore/modules/after.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = after;

// Returns a function that will only be executed on and after the Nth call.
function after(times, func) {
  return function () {
    if (--times < 1) {
      return func.apply(this, arguments);
    }
  };
}
},{}],"node_modules/underscore/modules/before.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = before;

// Returns a function that will only be executed up to (but not including) the
// Nth call.
function before(times, func) {
  var memo;
  return function () {
    if (--times > 0) {
      memo = func.apply(this, arguments);
    }

    if (times <= 1) func = null;
    return memo;
  };
}
},{}],"node_modules/underscore/modules/once.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _partial = _interopRequireDefault(require("./partial.js"));

var _before = _interopRequireDefault(require("./before.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Returns a function that will be executed at most one time, no matter how
// often you call it. Useful for lazy initialization.
var _default = (0, _partial.default)(_before.default, 2);

exports.default = _default;
},{"./partial.js":"node_modules/underscore/modules/partial.js","./before.js":"node_modules/underscore/modules/before.js"}],"node_modules/underscore/modules/findKey.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findKey;

var _cb = _interopRequireDefault(require("./_cb.js"));

var _keys2 = _interopRequireDefault(require("./keys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Returns the first key on an object that passes a truth test.
function findKey(obj, predicate, context) {
  predicate = (0, _cb.default)(predicate, context);

  var _keys = (0, _keys2.default)(obj),
      key;

  for (var i = 0, length = _keys.length; i < length; i++) {
    key = _keys[i];
    if (predicate(obj[key], key, obj)) return key;
  }
}
},{"./_cb.js":"node_modules/underscore/modules/_cb.js","./keys.js":"node_modules/underscore/modules/keys.js"}],"node_modules/underscore/modules/_createPredicateIndexFinder.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createPredicateIndexFinder;

var _cb = _interopRequireDefault(require("./_cb.js"));

var _getLength = _interopRequireDefault(require("./_getLength.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Internal function to generate `_.findIndex` and `_.findLastIndex`.
function createPredicateIndexFinder(dir) {
  return function (array, predicate, context) {
    predicate = (0, _cb.default)(predicate, context);
    var length = (0, _getLength.default)(array);
    var index = dir > 0 ? 0 : length - 1;

    for (; index >= 0 && index < length; index += dir) {
      if (predicate(array[index], index, array)) return index;
    }

    return -1;
  };
}
},{"./_cb.js":"node_modules/underscore/modules/_cb.js","./_getLength.js":"node_modules/underscore/modules/_getLength.js"}],"node_modules/underscore/modules/findIndex.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createPredicateIndexFinder = _interopRequireDefault(require("./_createPredicateIndexFinder.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Returns the first index on an array-like that passes a truth test.
var _default = (0, _createPredicateIndexFinder.default)(1);

exports.default = _default;
},{"./_createPredicateIndexFinder.js":"node_modules/underscore/modules/_createPredicateIndexFinder.js"}],"node_modules/underscore/modules/findLastIndex.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createPredicateIndexFinder = _interopRequireDefault(require("./_createPredicateIndexFinder.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Returns the last index on an array-like that passes a truth test.
var _default = (0, _createPredicateIndexFinder.default)(-1);

exports.default = _default;
},{"./_createPredicateIndexFinder.js":"node_modules/underscore/modules/_createPredicateIndexFinder.js"}],"node_modules/underscore/modules/sortedIndex.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sortedIndex;

var _cb = _interopRequireDefault(require("./_cb.js"));

var _getLength = _interopRequireDefault(require("./_getLength.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Use a comparator function to figure out the smallest index at which
// an object should be inserted so as to maintain order. Uses binary search.
function sortedIndex(array, obj, iteratee, context) {
  iteratee = (0, _cb.default)(iteratee, context, 1);
  var value = iteratee(obj);
  var low = 0,
      high = (0, _getLength.default)(array);

  while (low < high) {
    var mid = Math.floor((low + high) / 2);
    if (iteratee(array[mid]) < value) low = mid + 1;else high = mid;
  }

  return low;
}
},{"./_cb.js":"node_modules/underscore/modules/_cb.js","./_getLength.js":"node_modules/underscore/modules/_getLength.js"}],"node_modules/underscore/modules/_createIndexFinder.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createIndexFinder;

var _getLength = _interopRequireDefault(require("./_getLength.js"));

var _setup = require("./_setup.js");

var _isNaN = _interopRequireDefault(require("./isNaN.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Internal function to generate the `_.indexOf` and `_.lastIndexOf` functions.
function createIndexFinder(dir, predicateFind, sortedIndex) {
  return function (array, item, idx) {
    var i = 0,
        length = (0, _getLength.default)(array);

    if (typeof idx == 'number') {
      if (dir > 0) {
        i = idx >= 0 ? idx : Math.max(idx + length, i);
      } else {
        length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
      }
    } else if (sortedIndex && idx && length) {
      idx = sortedIndex(array, item);
      return array[idx] === item ? idx : -1;
    }

    if (item !== item) {
      idx = predicateFind(_setup.slice.call(array, i, length), _isNaN.default);
      return idx >= 0 ? idx + i : -1;
    }

    for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
      if (array[idx] === item) return idx;
    }

    return -1;
  };
}
},{"./_getLength.js":"node_modules/underscore/modules/_getLength.js","./_setup.js":"node_modules/underscore/modules/_setup.js","./isNaN.js":"node_modules/underscore/modules/isNaN.js"}],"node_modules/underscore/modules/indexOf.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sortedIndex = _interopRequireDefault(require("./sortedIndex.js"));

var _findIndex = _interopRequireDefault(require("./findIndex.js"));

var _createIndexFinder = _interopRequireDefault(require("./_createIndexFinder.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Return the position of the first occurrence of an item in an array,
// or -1 if the item is not included in the array.
// If the array is large and already in sort order, pass `true`
// for **isSorted** to use binary search.
var _default = (0, _createIndexFinder.default)(1, _findIndex.default, _sortedIndex.default);

exports.default = _default;
},{"./sortedIndex.js":"node_modules/underscore/modules/sortedIndex.js","./findIndex.js":"node_modules/underscore/modules/findIndex.js","./_createIndexFinder.js":"node_modules/underscore/modules/_createIndexFinder.js"}],"node_modules/underscore/modules/lastIndexOf.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _findLastIndex = _interopRequireDefault(require("./findLastIndex.js"));

var _createIndexFinder = _interopRequireDefault(require("./_createIndexFinder.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Return the position of the last occurrence of an item in an array,
// or -1 if the item is not included in the array.
var _default = (0, _createIndexFinder.default)(-1, _findLastIndex.default);

exports.default = _default;
},{"./findLastIndex.js":"node_modules/underscore/modules/findLastIndex.js","./_createIndexFinder.js":"node_modules/underscore/modules/_createIndexFinder.js"}],"node_modules/underscore/modules/find.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = find;

var _isArrayLike = _interopRequireDefault(require("./_isArrayLike.js"));

var _findIndex = _interopRequireDefault(require("./findIndex.js"));

var _findKey = _interopRequireDefault(require("./findKey.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Return the first value which passes a truth test.
function find(obj, predicate, context) {
  var keyFinder = (0, _isArrayLike.default)(obj) ? _findIndex.default : _findKey.default;
  var key = keyFinder(obj, predicate, context);
  if (key !== void 0 && key !== -1) return obj[key];
}
},{"./_isArrayLike.js":"node_modules/underscore/modules/_isArrayLike.js","./findIndex.js":"node_modules/underscore/modules/findIndex.js","./findKey.js":"node_modules/underscore/modules/findKey.js"}],"node_modules/underscore/modules/findWhere.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findWhere;

var _find = _interopRequireDefault(require("./find.js"));

var _matcher = _interopRequireDefault(require("./matcher.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Convenience version of a common use case of `_.find`: getting the first
// object containing specific `key:value` pairs.
function findWhere(obj, attrs) {
  return (0, _find.default)(obj, (0, _matcher.default)(attrs));
}
},{"./find.js":"node_modules/underscore/modules/find.js","./matcher.js":"node_modules/underscore/modules/matcher.js"}],"node_modules/underscore/modules/each.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = each;

var _optimizeCb = _interopRequireDefault(require("./_optimizeCb.js"));

var _isArrayLike = _interopRequireDefault(require("./_isArrayLike.js"));

var _keys2 = _interopRequireDefault(require("./keys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// The cornerstone for collection functions, an `each`
// implementation, aka `forEach`.
// Handles raw objects in addition to array-likes. Treats all
// sparse array-likes as if they were dense.
function each(obj, iteratee, context) {
  iteratee = (0, _optimizeCb.default)(iteratee, context);
  var i, length;

  if ((0, _isArrayLike.default)(obj)) {
    for (i = 0, length = obj.length; i < length; i++) {
      iteratee(obj[i], i, obj);
    }
  } else {
    var _keys = (0, _keys2.default)(obj);

    for (i = 0, length = _keys.length; i < length; i++) {
      iteratee(obj[_keys[i]], _keys[i], obj);
    }
  }

  return obj;
}
},{"./_optimizeCb.js":"node_modules/underscore/modules/_optimizeCb.js","./_isArrayLike.js":"node_modules/underscore/modules/_isArrayLike.js","./keys.js":"node_modules/underscore/modules/keys.js"}],"node_modules/underscore/modules/map.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = map;

var _cb = _interopRequireDefault(require("./_cb.js"));

var _isArrayLike = _interopRequireDefault(require("./_isArrayLike.js"));

var _keys2 = _interopRequireDefault(require("./keys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Return the results of applying the iteratee to each element.
function map(obj, iteratee, context) {
  iteratee = (0, _cb.default)(iteratee, context);

  var _keys = !(0, _isArrayLike.default)(obj) && (0, _keys2.default)(obj),
      length = (_keys || obj).length,
      results = Array(length);

  for (var index = 0; index < length; index++) {
    var currentKey = _keys ? _keys[index] : index;
    results[index] = iteratee(obj[currentKey], currentKey, obj);
  }

  return results;
}
},{"./_cb.js":"node_modules/underscore/modules/_cb.js","./_isArrayLike.js":"node_modules/underscore/modules/_isArrayLike.js","./keys.js":"node_modules/underscore/modules/keys.js"}],"node_modules/underscore/modules/_createReduce.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createReduce;

var _isArrayLike = _interopRequireDefault(require("./_isArrayLike.js"));

var _keys2 = _interopRequireDefault(require("./keys.js"));

var _optimizeCb = _interopRequireDefault(require("./_optimizeCb.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Internal helper to create a reducing function, iterating left or right.
function createReduce(dir) {
  // Wrap code that reassigns argument variables in a separate function than
  // the one that accesses `arguments.length` to avoid a perf hit. (#1991)
  var reducer = function (obj, iteratee, memo, initial) {
    var _keys = !(0, _isArrayLike.default)(obj) && (0, _keys2.default)(obj),
        length = (_keys || obj).length,
        index = dir > 0 ? 0 : length - 1;

    if (!initial) {
      memo = obj[_keys ? _keys[index] : index];
      index += dir;
    }

    for (; index >= 0 && index < length; index += dir) {
      var currentKey = _keys ? _keys[index] : index;
      memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }

    return memo;
  };

  return function (obj, iteratee, memo, context) {
    var initial = arguments.length >= 3;
    return reducer(obj, (0, _optimizeCb.default)(iteratee, context, 4), memo, initial);
  };
}
},{"./_isArrayLike.js":"node_modules/underscore/modules/_isArrayLike.js","./keys.js":"node_modules/underscore/modules/keys.js","./_optimizeCb.js":"node_modules/underscore/modules/_optimizeCb.js"}],"node_modules/underscore/modules/reduce.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createReduce = _interopRequireDefault(require("./_createReduce.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// **Reduce** builds up a single result from a list of values, aka `inject`,
// or `foldl`.
var _default = (0, _createReduce.default)(1);

exports.default = _default;
},{"./_createReduce.js":"node_modules/underscore/modules/_createReduce.js"}],"node_modules/underscore/modules/reduceRight.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createReduce = _interopRequireDefault(require("./_createReduce.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// The right-associative version of reduce, also known as `foldr`.
var _default = (0, _createReduce.default)(-1);

exports.default = _default;
},{"./_createReduce.js":"node_modules/underscore/modules/_createReduce.js"}],"node_modules/underscore/modules/filter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = filter;

var _cb = _interopRequireDefault(require("./_cb.js"));

var _each = _interopRequireDefault(require("./each.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Return all the elements that pass a truth test.
function filter(obj, predicate, context) {
  var results = [];
  predicate = (0, _cb.default)(predicate, context);
  (0, _each.default)(obj, function (value, index, list) {
    if (predicate(value, index, list)) results.push(value);
  });
  return results;
}
},{"./_cb.js":"node_modules/underscore/modules/_cb.js","./each.js":"node_modules/underscore/modules/each.js"}],"node_modules/underscore/modules/reject.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reject;

var _filter = _interopRequireDefault(require("./filter.js"));

var _negate = _interopRequireDefault(require("./negate.js"));

var _cb = _interopRequireDefault(require("./_cb.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Return all the elements for which a truth test fails.
function reject(obj, predicate, context) {
  return (0, _filter.default)(obj, (0, _negate.default)((0, _cb.default)(predicate)), context);
}
},{"./filter.js":"node_modules/underscore/modules/filter.js","./negate.js":"node_modules/underscore/modules/negate.js","./_cb.js":"node_modules/underscore/modules/_cb.js"}],"node_modules/underscore/modules/every.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = every;

var _cb = _interopRequireDefault(require("./_cb.js"));

var _isArrayLike = _interopRequireDefault(require("./_isArrayLike.js"));

var _keys2 = _interopRequireDefault(require("./keys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Determine whether all of the elements pass a truth test.
function every(obj, predicate, context) {
  predicate = (0, _cb.default)(predicate, context);

  var _keys = !(0, _isArrayLike.default)(obj) && (0, _keys2.default)(obj),
      length = (_keys || obj).length;

  for (var index = 0; index < length; index++) {
    var currentKey = _keys ? _keys[index] : index;
    if (!predicate(obj[currentKey], currentKey, obj)) return false;
  }

  return true;
}
},{"./_cb.js":"node_modules/underscore/modules/_cb.js","./_isArrayLike.js":"node_modules/underscore/modules/_isArrayLike.js","./keys.js":"node_modules/underscore/modules/keys.js"}],"node_modules/underscore/modules/some.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = some;

var _cb = _interopRequireDefault(require("./_cb.js"));

var _isArrayLike = _interopRequireDefault(require("./_isArrayLike.js"));

var _keys2 = _interopRequireDefault(require("./keys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Determine if at least one element in the object passes a truth test.
function some(obj, predicate, context) {
  predicate = (0, _cb.default)(predicate, context);

  var _keys = !(0, _isArrayLike.default)(obj) && (0, _keys2.default)(obj),
      length = (_keys || obj).length;

  for (var index = 0; index < length; index++) {
    var currentKey = _keys ? _keys[index] : index;
    if (predicate(obj[currentKey], currentKey, obj)) return true;
  }

  return false;
}
},{"./_cb.js":"node_modules/underscore/modules/_cb.js","./_isArrayLike.js":"node_modules/underscore/modules/_isArrayLike.js","./keys.js":"node_modules/underscore/modules/keys.js"}],"node_modules/underscore/modules/contains.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = contains;

var _isArrayLike = _interopRequireDefault(require("./_isArrayLike.js"));

var _values = _interopRequireDefault(require("./values.js"));

var _indexOf = _interopRequireDefault(require("./indexOf.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Determine if the array or object contains a given item (using `===`).
function contains(obj, item, fromIndex, guard) {
  if (!(0, _isArrayLike.default)(obj)) obj = (0, _values.default)(obj);
  if (typeof fromIndex != 'number' || guard) fromIndex = 0;
  return (0, _indexOf.default)(obj, item, fromIndex) >= 0;
}
},{"./_isArrayLike.js":"node_modules/underscore/modules/_isArrayLike.js","./values.js":"node_modules/underscore/modules/values.js","./indexOf.js":"node_modules/underscore/modules/indexOf.js"}],"node_modules/underscore/modules/invoke.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _restArguments = _interopRequireDefault(require("./restArguments.js"));

var _isFunction = _interopRequireDefault(require("./isFunction.js"));

var _map = _interopRequireDefault(require("./map.js"));

var _deepGet = _interopRequireDefault(require("./_deepGet.js"));

var _toPath = _interopRequireDefault(require("./_toPath.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Invoke a method (with arguments) on every item in a collection.
var _default = (0, _restArguments.default)(function (obj, path, args) {
  var contextPath, func;

  if ((0, _isFunction.default)(path)) {
    func = path;
  } else {
    path = (0, _toPath.default)(path);
    contextPath = path.slice(0, -1);
    path = path[path.length - 1];
  }

  return (0, _map.default)(obj, function (context) {
    var method = func;

    if (!method) {
      if (contextPath && contextPath.length) {
        context = (0, _deepGet.default)(context, contextPath);
      }

      if (context == null) return void 0;
      method = context[path];
    }

    return method == null ? method : method.apply(context, args);
  });
});

exports.default = _default;
},{"./restArguments.js":"node_modules/underscore/modules/restArguments.js","./isFunction.js":"node_modules/underscore/modules/isFunction.js","./map.js":"node_modules/underscore/modules/map.js","./_deepGet.js":"node_modules/underscore/modules/_deepGet.js","./_toPath.js":"node_modules/underscore/modules/_toPath.js"}],"node_modules/underscore/modules/pluck.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pluck;

var _map = _interopRequireDefault(require("./map.js"));

var _property = _interopRequireDefault(require("./property.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Convenience version of a common use case of `_.map`: fetching a property.
function pluck(obj, key) {
  return (0, _map.default)(obj, (0, _property.default)(key));
}
},{"./map.js":"node_modules/underscore/modules/map.js","./property.js":"node_modules/underscore/modules/property.js"}],"node_modules/underscore/modules/where.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = where;

var _filter = _interopRequireDefault(require("./filter.js"));

var _matcher = _interopRequireDefault(require("./matcher.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Convenience version of a common use case of `_.filter`: selecting only
// objects containing specific `key:value` pairs.
function where(obj, attrs) {
  return (0, _filter.default)(obj, (0, _matcher.default)(attrs));
}
},{"./filter.js":"node_modules/underscore/modules/filter.js","./matcher.js":"node_modules/underscore/modules/matcher.js"}],"node_modules/underscore/modules/max.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = max;

var _isArrayLike = _interopRequireDefault(require("./_isArrayLike.js"));

var _values = _interopRequireDefault(require("./values.js"));

var _cb = _interopRequireDefault(require("./_cb.js"));

var _each = _interopRequireDefault(require("./each.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Return the maximum element (or element-based computation).
function max(obj, iteratee, context) {
  var result = -Infinity,
      lastComputed = -Infinity,
      value,
      computed;

  if (iteratee == null || typeof iteratee == 'number' && typeof obj[0] != 'object' && obj != null) {
    obj = (0, _isArrayLike.default)(obj) ? obj : (0, _values.default)(obj);

    for (var i = 0, length = obj.length; i < length; i++) {
      value = obj[i];

      if (value != null && value > result) {
        result = value;
      }
    }
  } else {
    iteratee = (0, _cb.default)(iteratee, context);
    (0, _each.default)(obj, function (v, index, list) {
      computed = iteratee(v, index, list);

      if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
        result = v;
        lastComputed = computed;
      }
    });
  }

  return result;
}
},{"./_isArrayLike.js":"node_modules/underscore/modules/_isArrayLike.js","./values.js":"node_modules/underscore/modules/values.js","./_cb.js":"node_modules/underscore/modules/_cb.js","./each.js":"node_modules/underscore/modules/each.js"}],"node_modules/underscore/modules/min.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = min;

var _isArrayLike = _interopRequireDefault(require("./_isArrayLike.js"));

var _values = _interopRequireDefault(require("./values.js"));

var _cb = _interopRequireDefault(require("./_cb.js"));

var _each = _interopRequireDefault(require("./each.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Return the minimum element (or element-based computation).
function min(obj, iteratee, context) {
  var result = Infinity,
      lastComputed = Infinity,
      value,
      computed;

  if (iteratee == null || typeof iteratee == 'number' && typeof obj[0] != 'object' && obj != null) {
    obj = (0, _isArrayLike.default)(obj) ? obj : (0, _values.default)(obj);

    for (var i = 0, length = obj.length; i < length; i++) {
      value = obj[i];

      if (value != null && value < result) {
        result = value;
      }
    }
  } else {
    iteratee = (0, _cb.default)(iteratee, context);
    (0, _each.default)(obj, function (v, index, list) {
      computed = iteratee(v, index, list);

      if (computed < lastComputed || computed === Infinity && result === Infinity) {
        result = v;
        lastComputed = computed;
      }
    });
  }

  return result;
}
},{"./_isArrayLike.js":"node_modules/underscore/modules/_isArrayLike.js","./values.js":"node_modules/underscore/modules/values.js","./_cb.js":"node_modules/underscore/modules/_cb.js","./each.js":"node_modules/underscore/modules/each.js"}],"node_modules/underscore/modules/sample.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sample;

var _isArrayLike = _interopRequireDefault(require("./_isArrayLike.js"));

var _clone = _interopRequireDefault(require("./clone.js"));

var _values = _interopRequireDefault(require("./values.js"));

var _getLength = _interopRequireDefault(require("./_getLength.js"));

var _random = _interopRequireDefault(require("./random.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Sample **n** random values from a collection using the modern version of the
// [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
// If **n** is not specified, returns a single random element.
// The internal `guard` argument allows it to work with `_.map`.
function sample(obj, n, guard) {
  if (n == null || guard) {
    if (!(0, _isArrayLike.default)(obj)) obj = (0, _values.default)(obj);
    return obj[(0, _random.default)(obj.length - 1)];
  }

  var sample = (0, _isArrayLike.default)(obj) ? (0, _clone.default)(obj) : (0, _values.default)(obj);
  var length = (0, _getLength.default)(sample);
  n = Math.max(Math.min(n, length), 0);
  var last = length - 1;

  for (var index = 0; index < n; index++) {
    var rand = (0, _random.default)(index, last);
    var temp = sample[index];
    sample[index] = sample[rand];
    sample[rand] = temp;
  }

  return sample.slice(0, n);
}
},{"./_isArrayLike.js":"node_modules/underscore/modules/_isArrayLike.js","./clone.js":"node_modules/underscore/modules/clone.js","./values.js":"node_modules/underscore/modules/values.js","./_getLength.js":"node_modules/underscore/modules/_getLength.js","./random.js":"node_modules/underscore/modules/random.js"}],"node_modules/underscore/modules/shuffle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = shuffle;

var _sample = _interopRequireDefault(require("./sample.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Shuffle a collection.
function shuffle(obj) {
  return (0, _sample.default)(obj, Infinity);
}
},{"./sample.js":"node_modules/underscore/modules/sample.js"}],"node_modules/underscore/modules/sortBy.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sortBy;

var _cb = _interopRequireDefault(require("./_cb.js"));

var _pluck = _interopRequireDefault(require("./pluck.js"));

var _map = _interopRequireDefault(require("./map.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Sort the object's values by a criterion produced by an iteratee.
function sortBy(obj, iteratee, context) {
  var index = 0;
  iteratee = (0, _cb.default)(iteratee, context);
  return (0, _pluck.default)((0, _map.default)(obj, function (value, key, list) {
    return {
      value: value,
      index: index++,
      criteria: iteratee(value, key, list)
    };
  }).sort(function (left, right) {
    var a = left.criteria;
    var b = right.criteria;

    if (a !== b) {
      if (a > b || a === void 0) return 1;
      if (a < b || b === void 0) return -1;
    }

    return left.index - right.index;
  }), 'value');
}
},{"./_cb.js":"node_modules/underscore/modules/_cb.js","./pluck.js":"node_modules/underscore/modules/pluck.js","./map.js":"node_modules/underscore/modules/map.js"}],"node_modules/underscore/modules/_group.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = group;

var _cb = _interopRequireDefault(require("./_cb.js"));

var _each = _interopRequireDefault(require("./each.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// An internal function used for aggregate "group by" operations.
function group(behavior, partition) {
  return function (obj, iteratee, context) {
    var result = partition ? [[], []] : {};
    iteratee = (0, _cb.default)(iteratee, context);
    (0, _each.default)(obj, function (value, index) {
      var key = iteratee(value, index, obj);
      behavior(result, value, key);
    });
    return result;
  };
}
},{"./_cb.js":"node_modules/underscore/modules/_cb.js","./each.js":"node_modules/underscore/modules/each.js"}],"node_modules/underscore/modules/groupBy.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _group = _interopRequireDefault(require("./_group.js"));

var _has = _interopRequireDefault(require("./_has.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Groups the object's values by a criterion. Pass either a string attribute
// to group by, or a function that returns the criterion.
var _default = (0, _group.default)(function (result, value, key) {
  if ((0, _has.default)(result, key)) result[key].push(value);else result[key] = [value];
});

exports.default = _default;
},{"./_group.js":"node_modules/underscore/modules/_group.js","./_has.js":"node_modules/underscore/modules/_has.js"}],"node_modules/underscore/modules/indexBy.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _group = _interopRequireDefault(require("./_group.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Indexes the object's values by a criterion, similar to `_.groupBy`, but for
// when you know that your index values will be unique.
var _default = (0, _group.default)(function (result, value, key) {
  result[key] = value;
});

exports.default = _default;
},{"./_group.js":"node_modules/underscore/modules/_group.js"}],"node_modules/underscore/modules/countBy.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _group = _interopRequireDefault(require("./_group.js"));

var _has = _interopRequireDefault(require("./_has.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Counts instances of an object that group by a certain criterion. Pass
// either a string attribute to count by, or a function that returns the
// criterion.
var _default = (0, _group.default)(function (result, value, key) {
  if ((0, _has.default)(result, key)) result[key]++;else result[key] = 1;
});

exports.default = _default;
},{"./_group.js":"node_modules/underscore/modules/_group.js","./_has.js":"node_modules/underscore/modules/_has.js"}],"node_modules/underscore/modules/partition.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _group = _interopRequireDefault(require("./_group.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Split a collection into two arrays: one whose elements all pass the given
// truth test, and one whose elements all do not pass the truth test.
var _default = (0, _group.default)(function (result, value, pass) {
  result[pass ? 0 : 1].push(value);
}, true);

exports.default = _default;
},{"./_group.js":"node_modules/underscore/modules/_group.js"}],"node_modules/underscore/modules/toArray.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toArray;

var _isArray = _interopRequireDefault(require("./isArray.js"));

var _setup = require("./_setup.js");

var _isString = _interopRequireDefault(require("./isString.js"));

var _isArrayLike = _interopRequireDefault(require("./_isArrayLike.js"));

var _map = _interopRequireDefault(require("./map.js"));

var _identity = _interopRequireDefault(require("./identity.js"));

var _values = _interopRequireDefault(require("./values.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Safely create a real, live array from anything iterable.
var reStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;

function toArray(obj) {
  if (!obj) return [];
  if ((0, _isArray.default)(obj)) return _setup.slice.call(obj);

  if ((0, _isString.default)(obj)) {
    // Keep surrogate pair characters together.
    return obj.match(reStrSymbol);
  }

  if ((0, _isArrayLike.default)(obj)) return (0, _map.default)(obj, _identity.default);
  return (0, _values.default)(obj);
}
},{"./isArray.js":"node_modules/underscore/modules/isArray.js","./_setup.js":"node_modules/underscore/modules/_setup.js","./isString.js":"node_modules/underscore/modules/isString.js","./_isArrayLike.js":"node_modules/underscore/modules/_isArrayLike.js","./map.js":"node_modules/underscore/modules/map.js","./identity.js":"node_modules/underscore/modules/identity.js","./values.js":"node_modules/underscore/modules/values.js"}],"node_modules/underscore/modules/size.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = size;

var _isArrayLike = _interopRequireDefault(require("./_isArrayLike.js"));

var _keys = _interopRequireDefault(require("./keys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Return the number of elements in a collection.
function size(obj) {
  if (obj == null) return 0;
  return (0, _isArrayLike.default)(obj) ? obj.length : (0, _keys.default)(obj).length;
}
},{"./_isArrayLike.js":"node_modules/underscore/modules/_isArrayLike.js","./keys.js":"node_modules/underscore/modules/keys.js"}],"node_modules/underscore/modules/_keyInObj.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = keyInObj;

// Internal `_.pick` helper function to determine whether `key` is an enumerable
// property name of `obj`.
function keyInObj(value, key, obj) {
  return key in obj;
}
},{}],"node_modules/underscore/modules/pick.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _restArguments = _interopRequireDefault(require("./restArguments.js"));

var _isFunction = _interopRequireDefault(require("./isFunction.js"));

var _optimizeCb = _interopRequireDefault(require("./_optimizeCb.js"));

var _allKeys = _interopRequireDefault(require("./allKeys.js"));

var _keyInObj = _interopRequireDefault(require("./_keyInObj.js"));

var _flatten = _interopRequireDefault(require("./_flatten.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Return a copy of the object only containing the allowed properties.
var _default = (0, _restArguments.default)(function (obj, keys) {
  var result = {},
      iteratee = keys[0];
  if (obj == null) return result;

  if ((0, _isFunction.default)(iteratee)) {
    if (keys.length > 1) iteratee = (0, _optimizeCb.default)(iteratee, keys[1]);
    keys = (0, _allKeys.default)(obj);
  } else {
    iteratee = _keyInObj.default;
    keys = (0, _flatten.default)(keys, false, false);
    obj = Object(obj);
  }

  for (var i = 0, length = keys.length; i < length; i++) {
    var key = keys[i];
    var value = obj[key];
    if (iteratee(value, key, obj)) result[key] = value;
  }

  return result;
});

exports.default = _default;
},{"./restArguments.js":"node_modules/underscore/modules/restArguments.js","./isFunction.js":"node_modules/underscore/modules/isFunction.js","./_optimizeCb.js":"node_modules/underscore/modules/_optimizeCb.js","./allKeys.js":"node_modules/underscore/modules/allKeys.js","./_keyInObj.js":"node_modules/underscore/modules/_keyInObj.js","./_flatten.js":"node_modules/underscore/modules/_flatten.js"}],"node_modules/underscore/modules/omit.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _restArguments = _interopRequireDefault(require("./restArguments.js"));

var _isFunction = _interopRequireDefault(require("./isFunction.js"));

var _negate = _interopRequireDefault(require("./negate.js"));

var _map = _interopRequireDefault(require("./map.js"));

var _flatten = _interopRequireDefault(require("./_flatten.js"));

var _contains = _interopRequireDefault(require("./contains.js"));

var _pick = _interopRequireDefault(require("./pick.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Return a copy of the object without the disallowed properties.
var _default = (0, _restArguments.default)(function (obj, keys) {
  var iteratee = keys[0],
      context;

  if ((0, _isFunction.default)(iteratee)) {
    iteratee = (0, _negate.default)(iteratee);
    if (keys.length > 1) context = keys[1];
  } else {
    keys = (0, _map.default)((0, _flatten.default)(keys, false, false), String);

    iteratee = function (value, key) {
      return !(0, _contains.default)(keys, key);
    };
  }

  return (0, _pick.default)(obj, iteratee, context);
});

exports.default = _default;
},{"./restArguments.js":"node_modules/underscore/modules/restArguments.js","./isFunction.js":"node_modules/underscore/modules/isFunction.js","./negate.js":"node_modules/underscore/modules/negate.js","./map.js":"node_modules/underscore/modules/map.js","./_flatten.js":"node_modules/underscore/modules/_flatten.js","./contains.js":"node_modules/underscore/modules/contains.js","./pick.js":"node_modules/underscore/modules/pick.js"}],"node_modules/underscore/modules/initial.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initial;

var _setup = require("./_setup.js");

// Returns everything but the last entry of the array. Especially useful on
// the arguments object. Passing **n** will return all the values in
// the array, excluding the last N.
function initial(array, n, guard) {
  return _setup.slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
}
},{"./_setup.js":"node_modules/underscore/modules/_setup.js"}],"node_modules/underscore/modules/first.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = first;

var _initial = _interopRequireDefault(require("./initial.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Get the first element of an array. Passing **n** will return the first N
// values in the array. The **guard** check allows it to work with `_.map`.
function first(array, n, guard) {
  if (array == null || array.length < 1) return n == null || guard ? void 0 : [];
  if (n == null || guard) return array[0];
  return (0, _initial.default)(array, array.length - n);
}
},{"./initial.js":"node_modules/underscore/modules/initial.js"}],"node_modules/underscore/modules/rest.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rest;

var _setup = require("./_setup.js");

// Returns everything but the first entry of the `array`. Especially useful on
// the `arguments` object. Passing an **n** will return the rest N values in the
// `array`.
function rest(array, n, guard) {
  return _setup.slice.call(array, n == null || guard ? 1 : n);
}
},{"./_setup.js":"node_modules/underscore/modules/_setup.js"}],"node_modules/underscore/modules/last.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = last;

var _rest = _interopRequireDefault(require("./rest.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Get the last element of an array. Passing **n** will return the last N
// values in the array.
function last(array, n, guard) {
  if (array == null || array.length < 1) return n == null || guard ? void 0 : [];
  if (n == null || guard) return array[array.length - 1];
  return (0, _rest.default)(array, Math.max(0, array.length - n));
}
},{"./rest.js":"node_modules/underscore/modules/rest.js"}],"node_modules/underscore/modules/compact.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = compact;

var _filter = _interopRequireDefault(require("./filter.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Trim out all falsy values from an array.
function compact(array) {
  return (0, _filter.default)(array, Boolean);
}
},{"./filter.js":"node_modules/underscore/modules/filter.js"}],"node_modules/underscore/modules/flatten.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flatten;

var _flatten2 = _interopRequireDefault(require("./_flatten.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Flatten out an array, either recursively (by default), or up to `depth`.
// Passing `true` or `false` as `depth` means `1` or `Infinity`, respectively.
function flatten(array, depth) {
  return (0, _flatten2.default)(array, depth, false);
}
},{"./_flatten.js":"node_modules/underscore/modules/_flatten.js"}],"node_modules/underscore/modules/difference.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _restArguments = _interopRequireDefault(require("./restArguments.js"));

var _flatten = _interopRequireDefault(require("./_flatten.js"));

var _filter = _interopRequireDefault(require("./filter.js"));

var _contains = _interopRequireDefault(require("./contains.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Take the difference between one array and a number of other arrays.
// Only the elements present in just the first array will remain.
var _default = (0, _restArguments.default)(function (array, rest) {
  rest = (0, _flatten.default)(rest, true, true);
  return (0, _filter.default)(array, function (value) {
    return !(0, _contains.default)(rest, value);
  });
});

exports.default = _default;
},{"./restArguments.js":"node_modules/underscore/modules/restArguments.js","./_flatten.js":"node_modules/underscore/modules/_flatten.js","./filter.js":"node_modules/underscore/modules/filter.js","./contains.js":"node_modules/underscore/modules/contains.js"}],"node_modules/underscore/modules/without.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _restArguments = _interopRequireDefault(require("./restArguments.js"));

var _difference = _interopRequireDefault(require("./difference.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Return a version of the array that does not contain the specified value(s).
var _default = (0, _restArguments.default)(function (array, otherArrays) {
  return (0, _difference.default)(array, otherArrays);
});

exports.default = _default;
},{"./restArguments.js":"node_modules/underscore/modules/restArguments.js","./difference.js":"node_modules/underscore/modules/difference.js"}],"node_modules/underscore/modules/uniq.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = uniq;

var _isBoolean = _interopRequireDefault(require("./isBoolean.js"));

var _cb = _interopRequireDefault(require("./_cb.js"));

var _getLength = _interopRequireDefault(require("./_getLength.js"));

var _contains = _interopRequireDefault(require("./contains.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Produce a duplicate-free version of the array. If the array has already
// been sorted, you have the option of using a faster algorithm.
// The faster algorithm will not work with an iteratee if the iteratee
// is not a one-to-one function, so providing an iteratee will disable
// the faster algorithm.
function uniq(array, isSorted, iteratee, context) {
  if (!(0, _isBoolean.default)(isSorted)) {
    context = iteratee;
    iteratee = isSorted;
    isSorted = false;
  }

  if (iteratee != null) iteratee = (0, _cb.default)(iteratee, context);
  var result = [];
  var seen = [];

  for (var i = 0, length = (0, _getLength.default)(array); i < length; i++) {
    var value = array[i],
        computed = iteratee ? iteratee(value, i, array) : value;

    if (isSorted && !iteratee) {
      if (!i || seen !== computed) result.push(value);
      seen = computed;
    } else if (iteratee) {
      if (!(0, _contains.default)(seen, computed)) {
        seen.push(computed);
        result.push(value);
      }
    } else if (!(0, _contains.default)(result, value)) {
      result.push(value);
    }
  }

  return result;
}
},{"./isBoolean.js":"node_modules/underscore/modules/isBoolean.js","./_cb.js":"node_modules/underscore/modules/_cb.js","./_getLength.js":"node_modules/underscore/modules/_getLength.js","./contains.js":"node_modules/underscore/modules/contains.js"}],"node_modules/underscore/modules/union.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _restArguments = _interopRequireDefault(require("./restArguments.js"));

var _uniq = _interopRequireDefault(require("./uniq.js"));

var _flatten = _interopRequireDefault(require("./_flatten.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Produce an array that contains the union: each distinct element from all of
// the passed-in arrays.
var _default = (0, _restArguments.default)(function (arrays) {
  return (0, _uniq.default)((0, _flatten.default)(arrays, true, true));
});

exports.default = _default;
},{"./restArguments.js":"node_modules/underscore/modules/restArguments.js","./uniq.js":"node_modules/underscore/modules/uniq.js","./_flatten.js":"node_modules/underscore/modules/_flatten.js"}],"node_modules/underscore/modules/intersection.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = intersection;

var _getLength = _interopRequireDefault(require("./_getLength.js"));

var _contains = _interopRequireDefault(require("./contains.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Produce an array that contains every item shared between all the
// passed-in arrays.
function intersection(array) {
  var result = [];
  var argsLength = arguments.length;

  for (var i = 0, length = (0, _getLength.default)(array); i < length; i++) {
    var item = array[i];
    if ((0, _contains.default)(result, item)) continue;
    var j;

    for (j = 1; j < argsLength; j++) {
      if (!(0, _contains.default)(arguments[j], item)) break;
    }

    if (j === argsLength) result.push(item);
  }

  return result;
}
},{"./_getLength.js":"node_modules/underscore/modules/_getLength.js","./contains.js":"node_modules/underscore/modules/contains.js"}],"node_modules/underscore/modules/unzip.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = unzip;

var _max = _interopRequireDefault(require("./max.js"));

var _getLength = _interopRequireDefault(require("./_getLength.js"));

var _pluck = _interopRequireDefault(require("./pluck.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Complement of zip. Unzip accepts an array of arrays and groups
// each array's elements on shared indices.
function unzip(array) {
  var length = array && (0, _max.default)(array, _getLength.default).length || 0;
  var result = Array(length);

  for (var index = 0; index < length; index++) {
    result[index] = (0, _pluck.default)(array, index);
  }

  return result;
}
},{"./max.js":"node_modules/underscore/modules/max.js","./_getLength.js":"node_modules/underscore/modules/_getLength.js","./pluck.js":"node_modules/underscore/modules/pluck.js"}],"node_modules/underscore/modules/zip.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _restArguments = _interopRequireDefault(require("./restArguments.js"));

var _unzip = _interopRequireDefault(require("./unzip.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Zip together multiple lists into a single array -- elements that share
// an index go together.
var _default = (0, _restArguments.default)(_unzip.default);

exports.default = _default;
},{"./restArguments.js":"node_modules/underscore/modules/restArguments.js","./unzip.js":"node_modules/underscore/modules/unzip.js"}],"node_modules/underscore/modules/object.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = object;

var _getLength = _interopRequireDefault(require("./_getLength.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Converts lists into objects. Pass either a single array of `[key, value]`
// pairs, or two parallel arrays of the same length -- one of keys, and one of
// the corresponding values. Passing by pairs is the reverse of `_.pairs`.
function object(list, values) {
  var result = {};

  for (var i = 0, length = (0, _getLength.default)(list); i < length; i++) {
    if (values) {
      result[list[i]] = values[i];
    } else {
      result[list[i][0]] = list[i][1];
    }
  }

  return result;
}
},{"./_getLength.js":"node_modules/underscore/modules/_getLength.js"}],"node_modules/underscore/modules/range.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = range;

// Generate an integer Array containing an arithmetic progression. A port of
// the native Python `range()` function. See
// [the Python documentation](https://docs.python.org/library/functions.html#range).
function range(start, stop, step) {
  if (stop == null) {
    stop = start || 0;
    start = 0;
  }

  if (!step) {
    step = stop < start ? -1 : 1;
  }

  var length = Math.max(Math.ceil((stop - start) / step), 0);
  var range = Array(length);

  for (var idx = 0; idx < length; idx++, start += step) {
    range[idx] = start;
  }

  return range;
}
},{}],"node_modules/underscore/modules/chunk.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = chunk;

var _setup = require("./_setup.js");

// Chunk a single array into multiple arrays, each containing `count` or fewer
// items.
function chunk(array, count) {
  if (count == null || count < 1) return [];
  var result = [];
  var i = 0,
      length = array.length;

  while (i < length) {
    result.push(_setup.slice.call(array, i, i += count));
  }

  return result;
}
},{"./_setup.js":"node_modules/underscore/modules/_setup.js"}],"node_modules/underscore/modules/_chainResult.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = chainResult;

var _underscore = _interopRequireDefault(require("./underscore.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Helper function to continue chaining intermediate results.
function chainResult(instance, obj) {
  return instance._chain ? (0, _underscore.default)(obj).chain() : obj;
}
},{"./underscore.js":"node_modules/underscore/modules/underscore.js"}],"node_modules/underscore/modules/mixin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mixin;

var _underscore = _interopRequireDefault(require("./underscore.js"));

var _each = _interopRequireDefault(require("./each.js"));

var _functions = _interopRequireDefault(require("./functions.js"));

var _setup = require("./_setup.js");

var _chainResult = _interopRequireDefault(require("./_chainResult.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Add your own custom functions to the Underscore object.
function mixin(obj) {
  (0, _each.default)((0, _functions.default)(obj), function (name) {
    var func = _underscore.default[name] = obj[name];

    _underscore.default.prototype[name] = function () {
      var args = [this._wrapped];

      _setup.push.apply(args, arguments);

      return (0, _chainResult.default)(this, func.apply(_underscore.default, args));
    };
  });
  return _underscore.default;
}
},{"./underscore.js":"node_modules/underscore/modules/underscore.js","./each.js":"node_modules/underscore/modules/each.js","./functions.js":"node_modules/underscore/modules/functions.js","./_setup.js":"node_modules/underscore/modules/_setup.js","./_chainResult.js":"node_modules/underscore/modules/_chainResult.js"}],"node_modules/underscore/modules/underscore-array-methods.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _underscore = _interopRequireDefault(require("./underscore.js"));

var _each = _interopRequireDefault(require("./each.js"));

var _setup = require("./_setup.js");

var _chainResult = _interopRequireDefault(require("./_chainResult.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Add all mutator `Array` functions to the wrapper.
(0, _each.default)(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function (name) {
  var method = _setup.ArrayProto[name];

  _underscore.default.prototype[name] = function () {
    var obj = this._wrapped;

    if (obj != null) {
      method.apply(obj, arguments);

      if ((name === 'shift' || name === 'splice') && obj.length === 0) {
        delete obj[0];
      }
    }

    return (0, _chainResult.default)(this, obj);
  };
}); // Add all accessor `Array` functions to the wrapper.

(0, _each.default)(['concat', 'join', 'slice'], function (name) {
  var method = _setup.ArrayProto[name];

  _underscore.default.prototype[name] = function () {
    var obj = this._wrapped;
    if (obj != null) obj = method.apply(obj, arguments);
    return (0, _chainResult.default)(this, obj);
  };
});
var _default = _underscore.default;
exports.default = _default;
},{"./underscore.js":"node_modules/underscore/modules/underscore.js","./each.js":"node_modules/underscore/modules/each.js","./_setup.js":"node_modules/underscore/modules/_setup.js","./_chainResult.js":"node_modules/underscore/modules/_chainResult.js"}],"node_modules/underscore/modules/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "VERSION", {
  enumerable: true,
  get: function () {
    return _setup.VERSION;
  }
});
Object.defineProperty(exports, "restArguments", {
  enumerable: true,
  get: function () {
    return _restArguments.default;
  }
});
Object.defineProperty(exports, "isObject", {
  enumerable: true,
  get: function () {
    return _isObject.default;
  }
});
Object.defineProperty(exports, "isNull", {
  enumerable: true,
  get: function () {
    return _isNull.default;
  }
});
Object.defineProperty(exports, "isUndefined", {
  enumerable: true,
  get: function () {
    return _isUndefined.default;
  }
});
Object.defineProperty(exports, "isBoolean", {
  enumerable: true,
  get: function () {
    return _isBoolean.default;
  }
});
Object.defineProperty(exports, "isElement", {
  enumerable: true,
  get: function () {
    return _isElement.default;
  }
});
Object.defineProperty(exports, "isString", {
  enumerable: true,
  get: function () {
    return _isString.default;
  }
});
Object.defineProperty(exports, "isNumber", {
  enumerable: true,
  get: function () {
    return _isNumber.default;
  }
});
Object.defineProperty(exports, "isDate", {
  enumerable: true,
  get: function () {
    return _isDate.default;
  }
});
Object.defineProperty(exports, "isRegExp", {
  enumerable: true,
  get: function () {
    return _isRegExp.default;
  }
});
Object.defineProperty(exports, "isError", {
  enumerable: true,
  get: function () {
    return _isError.default;
  }
});
Object.defineProperty(exports, "isSymbol", {
  enumerable: true,
  get: function () {
    return _isSymbol.default;
  }
});
Object.defineProperty(exports, "isArrayBuffer", {
  enumerable: true,
  get: function () {
    return _isArrayBuffer.default;
  }
});
Object.defineProperty(exports, "isDataView", {
  enumerable: true,
  get: function () {
    return _isDataView.default;
  }
});
Object.defineProperty(exports, "isArray", {
  enumerable: true,
  get: function () {
    return _isArray.default;
  }
});
Object.defineProperty(exports, "isFunction", {
  enumerable: true,
  get: function () {
    return _isFunction.default;
  }
});
Object.defineProperty(exports, "isArguments", {
  enumerable: true,
  get: function () {
    return _isArguments.default;
  }
});
Object.defineProperty(exports, "isFinite", {
  enumerable: true,
  get: function () {
    return _isFinite.default;
  }
});
Object.defineProperty(exports, "isNaN", {
  enumerable: true,
  get: function () {
    return _isNaN.default;
  }
});
Object.defineProperty(exports, "isTypedArray", {
  enumerable: true,
  get: function () {
    return _isTypedArray.default;
  }
});
Object.defineProperty(exports, "isEmpty", {
  enumerable: true,
  get: function () {
    return _isEmpty.default;
  }
});
Object.defineProperty(exports, "isMatch", {
  enumerable: true,
  get: function () {
    return _isMatch.default;
  }
});
Object.defineProperty(exports, "isEqual", {
  enumerable: true,
  get: function () {
    return _isEqual.default;
  }
});
Object.defineProperty(exports, "isMap", {
  enumerable: true,
  get: function () {
    return _isMap.default;
  }
});
Object.defineProperty(exports, "isWeakMap", {
  enumerable: true,
  get: function () {
    return _isWeakMap.default;
  }
});
Object.defineProperty(exports, "isSet", {
  enumerable: true,
  get: function () {
    return _isSet.default;
  }
});
Object.defineProperty(exports, "isWeakSet", {
  enumerable: true,
  get: function () {
    return _isWeakSet.default;
  }
});
Object.defineProperty(exports, "keys", {
  enumerable: true,
  get: function () {
    return _keys.default;
  }
});
Object.defineProperty(exports, "allKeys", {
  enumerable: true,
  get: function () {
    return _allKeys.default;
  }
});
Object.defineProperty(exports, "values", {
  enumerable: true,
  get: function () {
    return _values.default;
  }
});
Object.defineProperty(exports, "pairs", {
  enumerable: true,
  get: function () {
    return _pairs.default;
  }
});
Object.defineProperty(exports, "invert", {
  enumerable: true,
  get: function () {
    return _invert.default;
  }
});
Object.defineProperty(exports, "functions", {
  enumerable: true,
  get: function () {
    return _functions.default;
  }
});
Object.defineProperty(exports, "methods", {
  enumerable: true,
  get: function () {
    return _functions.default;
  }
});
Object.defineProperty(exports, "extend", {
  enumerable: true,
  get: function () {
    return _extend.default;
  }
});
Object.defineProperty(exports, "extendOwn", {
  enumerable: true,
  get: function () {
    return _extendOwn.default;
  }
});
Object.defineProperty(exports, "assign", {
  enumerable: true,
  get: function () {
    return _extendOwn.default;
  }
});
Object.defineProperty(exports, "defaults", {
  enumerable: true,
  get: function () {
    return _defaults.default;
  }
});
Object.defineProperty(exports, "create", {
  enumerable: true,
  get: function () {
    return _create.default;
  }
});
Object.defineProperty(exports, "clone", {
  enumerable: true,
  get: function () {
    return _clone.default;
  }
});
Object.defineProperty(exports, "tap", {
  enumerable: true,
  get: function () {
    return _tap.default;
  }
});
Object.defineProperty(exports, "get", {
  enumerable: true,
  get: function () {
    return _get.default;
  }
});
Object.defineProperty(exports, "has", {
  enumerable: true,
  get: function () {
    return _has.default;
  }
});
Object.defineProperty(exports, "mapObject", {
  enumerable: true,
  get: function () {
    return _mapObject.default;
  }
});
Object.defineProperty(exports, "identity", {
  enumerable: true,
  get: function () {
    return _identity.default;
  }
});
Object.defineProperty(exports, "constant", {
  enumerable: true,
  get: function () {
    return _constant.default;
  }
});
Object.defineProperty(exports, "noop", {
  enumerable: true,
  get: function () {
    return _noop.default;
  }
});
Object.defineProperty(exports, "toPath", {
  enumerable: true,
  get: function () {
    return _toPath.default;
  }
});
Object.defineProperty(exports, "property", {
  enumerable: true,
  get: function () {
    return _property.default;
  }
});
Object.defineProperty(exports, "propertyOf", {
  enumerable: true,
  get: function () {
    return _propertyOf.default;
  }
});
Object.defineProperty(exports, "matcher", {
  enumerable: true,
  get: function () {
    return _matcher.default;
  }
});
Object.defineProperty(exports, "matches", {
  enumerable: true,
  get: function () {
    return _matcher.default;
  }
});
Object.defineProperty(exports, "times", {
  enumerable: true,
  get: function () {
    return _times.default;
  }
});
Object.defineProperty(exports, "random", {
  enumerable: true,
  get: function () {
    return _random.default;
  }
});
Object.defineProperty(exports, "now", {
  enumerable: true,
  get: function () {
    return _now.default;
  }
});
Object.defineProperty(exports, "escape", {
  enumerable: true,
  get: function () {
    return _escape.default;
  }
});
Object.defineProperty(exports, "unescape", {
  enumerable: true,
  get: function () {
    return _unescape.default;
  }
});
Object.defineProperty(exports, "templateSettings", {
  enumerable: true,
  get: function () {
    return _templateSettings.default;
  }
});
Object.defineProperty(exports, "template", {
  enumerable: true,
  get: function () {
    return _template.default;
  }
});
Object.defineProperty(exports, "result", {
  enumerable: true,
  get: function () {
    return _result.default;
  }
});
Object.defineProperty(exports, "uniqueId", {
  enumerable: true,
  get: function () {
    return _uniqueId.default;
  }
});
Object.defineProperty(exports, "chain", {
  enumerable: true,
  get: function () {
    return _chain.default;
  }
});
Object.defineProperty(exports, "iteratee", {
  enumerable: true,
  get: function () {
    return _iteratee.default;
  }
});
Object.defineProperty(exports, "partial", {
  enumerable: true,
  get: function () {
    return _partial.default;
  }
});
Object.defineProperty(exports, "bind", {
  enumerable: true,
  get: function () {
    return _bind.default;
  }
});
Object.defineProperty(exports, "bindAll", {
  enumerable: true,
  get: function () {
    return _bindAll.default;
  }
});
Object.defineProperty(exports, "memoize", {
  enumerable: true,
  get: function () {
    return _memoize.default;
  }
});
Object.defineProperty(exports, "delay", {
  enumerable: true,
  get: function () {
    return _delay.default;
  }
});
Object.defineProperty(exports, "defer", {
  enumerable: true,
  get: function () {
    return _defer.default;
  }
});
Object.defineProperty(exports, "throttle", {
  enumerable: true,
  get: function () {
    return _throttle.default;
  }
});
Object.defineProperty(exports, "debounce", {
  enumerable: true,
  get: function () {
    return _debounce.default;
  }
});
Object.defineProperty(exports, "wrap", {
  enumerable: true,
  get: function () {
    return _wrap.default;
  }
});
Object.defineProperty(exports, "negate", {
  enumerable: true,
  get: function () {
    return _negate.default;
  }
});
Object.defineProperty(exports, "compose", {
  enumerable: true,
  get: function () {
    return _compose.default;
  }
});
Object.defineProperty(exports, "after", {
  enumerable: true,
  get: function () {
    return _after.default;
  }
});
Object.defineProperty(exports, "before", {
  enumerable: true,
  get: function () {
    return _before.default;
  }
});
Object.defineProperty(exports, "once", {
  enumerable: true,
  get: function () {
    return _once.default;
  }
});
Object.defineProperty(exports, "findKey", {
  enumerable: true,
  get: function () {
    return _findKey.default;
  }
});
Object.defineProperty(exports, "findIndex", {
  enumerable: true,
  get: function () {
    return _findIndex.default;
  }
});
Object.defineProperty(exports, "findLastIndex", {
  enumerable: true,
  get: function () {
    return _findLastIndex.default;
  }
});
Object.defineProperty(exports, "sortedIndex", {
  enumerable: true,
  get: function () {
    return _sortedIndex.default;
  }
});
Object.defineProperty(exports, "indexOf", {
  enumerable: true,
  get: function () {
    return _indexOf.default;
  }
});
Object.defineProperty(exports, "lastIndexOf", {
  enumerable: true,
  get: function () {
    return _lastIndexOf.default;
  }
});
Object.defineProperty(exports, "find", {
  enumerable: true,
  get: function () {
    return _find.default;
  }
});
Object.defineProperty(exports, "detect", {
  enumerable: true,
  get: function () {
    return _find.default;
  }
});
Object.defineProperty(exports, "findWhere", {
  enumerable: true,
  get: function () {
    return _findWhere.default;
  }
});
Object.defineProperty(exports, "each", {
  enumerable: true,
  get: function () {
    return _each.default;
  }
});
Object.defineProperty(exports, "forEach", {
  enumerable: true,
  get: function () {
    return _each.default;
  }
});
Object.defineProperty(exports, "map", {
  enumerable: true,
  get: function () {
    return _map.default;
  }
});
Object.defineProperty(exports, "collect", {
  enumerable: true,
  get: function () {
    return _map.default;
  }
});
Object.defineProperty(exports, "reduce", {
  enumerable: true,
  get: function () {
    return _reduce.default;
  }
});
Object.defineProperty(exports, "foldl", {
  enumerable: true,
  get: function () {
    return _reduce.default;
  }
});
Object.defineProperty(exports, "inject", {
  enumerable: true,
  get: function () {
    return _reduce.default;
  }
});
Object.defineProperty(exports, "reduceRight", {
  enumerable: true,
  get: function () {
    return _reduceRight.default;
  }
});
Object.defineProperty(exports, "foldr", {
  enumerable: true,
  get: function () {
    return _reduceRight.default;
  }
});
Object.defineProperty(exports, "filter", {
  enumerable: true,
  get: function () {
    return _filter.default;
  }
});
Object.defineProperty(exports, "select", {
  enumerable: true,
  get: function () {
    return _filter.default;
  }
});
Object.defineProperty(exports, "reject", {
  enumerable: true,
  get: function () {
    return _reject.default;
  }
});
Object.defineProperty(exports, "every", {
  enumerable: true,
  get: function () {
    return _every.default;
  }
});
Object.defineProperty(exports, "all", {
  enumerable: true,
  get: function () {
    return _every.default;
  }
});
Object.defineProperty(exports, "some", {
  enumerable: true,
  get: function () {
    return _some.default;
  }
});
Object.defineProperty(exports, "any", {
  enumerable: true,
  get: function () {
    return _some.default;
  }
});
Object.defineProperty(exports, "contains", {
  enumerable: true,
  get: function () {
    return _contains.default;
  }
});
Object.defineProperty(exports, "includes", {
  enumerable: true,
  get: function () {
    return _contains.default;
  }
});
Object.defineProperty(exports, "include", {
  enumerable: true,
  get: function () {
    return _contains.default;
  }
});
Object.defineProperty(exports, "invoke", {
  enumerable: true,
  get: function () {
    return _invoke.default;
  }
});
Object.defineProperty(exports, "pluck", {
  enumerable: true,
  get: function () {
    return _pluck.default;
  }
});
Object.defineProperty(exports, "where", {
  enumerable: true,
  get: function () {
    return _where.default;
  }
});
Object.defineProperty(exports, "max", {
  enumerable: true,
  get: function () {
    return _max.default;
  }
});
Object.defineProperty(exports, "min", {
  enumerable: true,
  get: function () {
    return _min.default;
  }
});
Object.defineProperty(exports, "shuffle", {
  enumerable: true,
  get: function () {
    return _shuffle.default;
  }
});
Object.defineProperty(exports, "sample", {
  enumerable: true,
  get: function () {
    return _sample.default;
  }
});
Object.defineProperty(exports, "sortBy", {
  enumerable: true,
  get: function () {
    return _sortBy.default;
  }
});
Object.defineProperty(exports, "groupBy", {
  enumerable: true,
  get: function () {
    return _groupBy.default;
  }
});
Object.defineProperty(exports, "indexBy", {
  enumerable: true,
  get: function () {
    return _indexBy.default;
  }
});
Object.defineProperty(exports, "countBy", {
  enumerable: true,
  get: function () {
    return _countBy.default;
  }
});
Object.defineProperty(exports, "partition", {
  enumerable: true,
  get: function () {
    return _partition.default;
  }
});
Object.defineProperty(exports, "toArray", {
  enumerable: true,
  get: function () {
    return _toArray.default;
  }
});
Object.defineProperty(exports, "size", {
  enumerable: true,
  get: function () {
    return _size.default;
  }
});
Object.defineProperty(exports, "pick", {
  enumerable: true,
  get: function () {
    return _pick.default;
  }
});
Object.defineProperty(exports, "omit", {
  enumerable: true,
  get: function () {
    return _omit.default;
  }
});
Object.defineProperty(exports, "first", {
  enumerable: true,
  get: function () {
    return _first.default;
  }
});
Object.defineProperty(exports, "head", {
  enumerable: true,
  get: function () {
    return _first.default;
  }
});
Object.defineProperty(exports, "take", {
  enumerable: true,
  get: function () {
    return _first.default;
  }
});
Object.defineProperty(exports, "initial", {
  enumerable: true,
  get: function () {
    return _initial.default;
  }
});
Object.defineProperty(exports, "last", {
  enumerable: true,
  get: function () {
    return _last.default;
  }
});
Object.defineProperty(exports, "rest", {
  enumerable: true,
  get: function () {
    return _rest.default;
  }
});
Object.defineProperty(exports, "tail", {
  enumerable: true,
  get: function () {
    return _rest.default;
  }
});
Object.defineProperty(exports, "drop", {
  enumerable: true,
  get: function () {
    return _rest.default;
  }
});
Object.defineProperty(exports, "compact", {
  enumerable: true,
  get: function () {
    return _compact.default;
  }
});
Object.defineProperty(exports, "flatten", {
  enumerable: true,
  get: function () {
    return _flatten.default;
  }
});
Object.defineProperty(exports, "without", {
  enumerable: true,
  get: function () {
    return _without.default;
  }
});
Object.defineProperty(exports, "uniq", {
  enumerable: true,
  get: function () {
    return _uniq.default;
  }
});
Object.defineProperty(exports, "unique", {
  enumerable: true,
  get: function () {
    return _uniq.default;
  }
});
Object.defineProperty(exports, "union", {
  enumerable: true,
  get: function () {
    return _union.default;
  }
});
Object.defineProperty(exports, "intersection", {
  enumerable: true,
  get: function () {
    return _intersection.default;
  }
});
Object.defineProperty(exports, "difference", {
  enumerable: true,
  get: function () {
    return _difference.default;
  }
});
Object.defineProperty(exports, "unzip", {
  enumerable: true,
  get: function () {
    return _unzip.default;
  }
});
Object.defineProperty(exports, "transpose", {
  enumerable: true,
  get: function () {
    return _unzip.default;
  }
});
Object.defineProperty(exports, "zip", {
  enumerable: true,
  get: function () {
    return _zip.default;
  }
});
Object.defineProperty(exports, "object", {
  enumerable: true,
  get: function () {
    return _object.default;
  }
});
Object.defineProperty(exports, "range", {
  enumerable: true,
  get: function () {
    return _range.default;
  }
});
Object.defineProperty(exports, "chunk", {
  enumerable: true,
  get: function () {
    return _chunk.default;
  }
});
Object.defineProperty(exports, "mixin", {
  enumerable: true,
  get: function () {
    return _mixin.default;
  }
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _underscoreArrayMethods.default;
  }
});

var _setup = require("./_setup.js");

var _restArguments = _interopRequireDefault(require("./restArguments.js"));

var _isObject = _interopRequireDefault(require("./isObject.js"));

var _isNull = _interopRequireDefault(require("./isNull.js"));

var _isUndefined = _interopRequireDefault(require("./isUndefined.js"));

var _isBoolean = _interopRequireDefault(require("./isBoolean.js"));

var _isElement = _interopRequireDefault(require("./isElement.js"));

var _isString = _interopRequireDefault(require("./isString.js"));

var _isNumber = _interopRequireDefault(require("./isNumber.js"));

var _isDate = _interopRequireDefault(require("./isDate.js"));

var _isRegExp = _interopRequireDefault(require("./isRegExp.js"));

var _isError = _interopRequireDefault(require("./isError.js"));

var _isSymbol = _interopRequireDefault(require("./isSymbol.js"));

var _isArrayBuffer = _interopRequireDefault(require("./isArrayBuffer.js"));

var _isDataView = _interopRequireDefault(require("./isDataView.js"));

var _isArray = _interopRequireDefault(require("./isArray.js"));

var _isFunction = _interopRequireDefault(require("./isFunction.js"));

var _isArguments = _interopRequireDefault(require("./isArguments.js"));

var _isFinite = _interopRequireDefault(require("./isFinite.js"));

var _isNaN = _interopRequireDefault(require("./isNaN.js"));

var _isTypedArray = _interopRequireDefault(require("./isTypedArray.js"));

var _isEmpty = _interopRequireDefault(require("./isEmpty.js"));

var _isMatch = _interopRequireDefault(require("./isMatch.js"));

var _isEqual = _interopRequireDefault(require("./isEqual.js"));

var _isMap = _interopRequireDefault(require("./isMap.js"));

var _isWeakMap = _interopRequireDefault(require("./isWeakMap.js"));

var _isSet = _interopRequireDefault(require("./isSet.js"));

var _isWeakSet = _interopRequireDefault(require("./isWeakSet.js"));

var _keys = _interopRequireDefault(require("./keys.js"));

var _allKeys = _interopRequireDefault(require("./allKeys.js"));

var _values = _interopRequireDefault(require("./values.js"));

var _pairs = _interopRequireDefault(require("./pairs.js"));

var _invert = _interopRequireDefault(require("./invert.js"));

var _functions = _interopRequireDefault(require("./functions.js"));

var _extend = _interopRequireDefault(require("./extend.js"));

var _extendOwn = _interopRequireDefault(require("./extendOwn.js"));

var _defaults = _interopRequireDefault(require("./defaults.js"));

var _create = _interopRequireDefault(require("./create.js"));

var _clone = _interopRequireDefault(require("./clone.js"));

var _tap = _interopRequireDefault(require("./tap.js"));

var _get = _interopRequireDefault(require("./get.js"));

var _has = _interopRequireDefault(require("./has.js"));

var _mapObject = _interopRequireDefault(require("./mapObject.js"));

var _identity = _interopRequireDefault(require("./identity.js"));

var _constant = _interopRequireDefault(require("./constant.js"));

var _noop = _interopRequireDefault(require("./noop.js"));

var _toPath = _interopRequireDefault(require("./toPath.js"));

var _property = _interopRequireDefault(require("./property.js"));

var _propertyOf = _interopRequireDefault(require("./propertyOf.js"));

var _matcher = _interopRequireDefault(require("./matcher.js"));

var _times = _interopRequireDefault(require("./times.js"));

var _random = _interopRequireDefault(require("./random.js"));

var _now = _interopRequireDefault(require("./now.js"));

var _escape = _interopRequireDefault(require("./escape.js"));

var _unescape = _interopRequireDefault(require("./unescape.js"));

var _templateSettings = _interopRequireDefault(require("./templateSettings.js"));

var _template = _interopRequireDefault(require("./template.js"));

var _result = _interopRequireDefault(require("./result.js"));

var _uniqueId = _interopRequireDefault(require("./uniqueId.js"));

var _chain = _interopRequireDefault(require("./chain.js"));

var _iteratee = _interopRequireDefault(require("./iteratee.js"));

var _partial = _interopRequireDefault(require("./partial.js"));

var _bind = _interopRequireDefault(require("./bind.js"));

var _bindAll = _interopRequireDefault(require("./bindAll.js"));

var _memoize = _interopRequireDefault(require("./memoize.js"));

var _delay = _interopRequireDefault(require("./delay.js"));

var _defer = _interopRequireDefault(require("./defer.js"));

var _throttle = _interopRequireDefault(require("./throttle.js"));

var _debounce = _interopRequireDefault(require("./debounce.js"));

var _wrap = _interopRequireDefault(require("./wrap.js"));

var _negate = _interopRequireDefault(require("./negate.js"));

var _compose = _interopRequireDefault(require("./compose.js"));

var _after = _interopRequireDefault(require("./after.js"));

var _before = _interopRequireDefault(require("./before.js"));

var _once = _interopRequireDefault(require("./once.js"));

var _findKey = _interopRequireDefault(require("./findKey.js"));

var _findIndex = _interopRequireDefault(require("./findIndex.js"));

var _findLastIndex = _interopRequireDefault(require("./findLastIndex.js"));

var _sortedIndex = _interopRequireDefault(require("./sortedIndex.js"));

var _indexOf = _interopRequireDefault(require("./indexOf.js"));

var _lastIndexOf = _interopRequireDefault(require("./lastIndexOf.js"));

var _find = _interopRequireDefault(require("./find.js"));

var _findWhere = _interopRequireDefault(require("./findWhere.js"));

var _each = _interopRequireDefault(require("./each.js"));

var _map = _interopRequireDefault(require("./map.js"));

var _reduce = _interopRequireDefault(require("./reduce.js"));

var _reduceRight = _interopRequireDefault(require("./reduceRight.js"));

var _filter = _interopRequireDefault(require("./filter.js"));

var _reject = _interopRequireDefault(require("./reject.js"));

var _every = _interopRequireDefault(require("./every.js"));

var _some = _interopRequireDefault(require("./some.js"));

var _contains = _interopRequireDefault(require("./contains.js"));

var _invoke = _interopRequireDefault(require("./invoke.js"));

var _pluck = _interopRequireDefault(require("./pluck.js"));

var _where = _interopRequireDefault(require("./where.js"));

var _max = _interopRequireDefault(require("./max.js"));

var _min = _interopRequireDefault(require("./min.js"));

var _shuffle = _interopRequireDefault(require("./shuffle.js"));

var _sample = _interopRequireDefault(require("./sample.js"));

var _sortBy = _interopRequireDefault(require("./sortBy.js"));

var _groupBy = _interopRequireDefault(require("./groupBy.js"));

var _indexBy = _interopRequireDefault(require("./indexBy.js"));

var _countBy = _interopRequireDefault(require("./countBy.js"));

var _partition = _interopRequireDefault(require("./partition.js"));

var _toArray = _interopRequireDefault(require("./toArray.js"));

var _size = _interopRequireDefault(require("./size.js"));

var _pick = _interopRequireDefault(require("./pick.js"));

var _omit = _interopRequireDefault(require("./omit.js"));

var _first = _interopRequireDefault(require("./first.js"));

var _initial = _interopRequireDefault(require("./initial.js"));

var _last = _interopRequireDefault(require("./last.js"));

var _rest = _interopRequireDefault(require("./rest.js"));

var _compact = _interopRequireDefault(require("./compact.js"));

var _flatten = _interopRequireDefault(require("./flatten.js"));

var _without = _interopRequireDefault(require("./without.js"));

var _uniq = _interopRequireDefault(require("./uniq.js"));

var _union = _interopRequireDefault(require("./union.js"));

var _intersection = _interopRequireDefault(require("./intersection.js"));

var _difference = _interopRequireDefault(require("./difference.js"));

var _unzip = _interopRequireDefault(require("./unzip.js"));

var _zip = _interopRequireDefault(require("./zip.js"));

var _object = _interopRequireDefault(require("./object.js"));

var _range = _interopRequireDefault(require("./range.js"));

var _chunk = _interopRequireDefault(require("./chunk.js"));

var _mixin = _interopRequireDefault(require("./mixin.js"));

var _underscoreArrayMethods = _interopRequireDefault(require("./underscore-array-methods.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./_setup.js":"node_modules/underscore/modules/_setup.js","./restArguments.js":"node_modules/underscore/modules/restArguments.js","./isObject.js":"node_modules/underscore/modules/isObject.js","./isNull.js":"node_modules/underscore/modules/isNull.js","./isUndefined.js":"node_modules/underscore/modules/isUndefined.js","./isBoolean.js":"node_modules/underscore/modules/isBoolean.js","./isElement.js":"node_modules/underscore/modules/isElement.js","./isString.js":"node_modules/underscore/modules/isString.js","./isNumber.js":"node_modules/underscore/modules/isNumber.js","./isDate.js":"node_modules/underscore/modules/isDate.js","./isRegExp.js":"node_modules/underscore/modules/isRegExp.js","./isError.js":"node_modules/underscore/modules/isError.js","./isSymbol.js":"node_modules/underscore/modules/isSymbol.js","./isArrayBuffer.js":"node_modules/underscore/modules/isArrayBuffer.js","./isDataView.js":"node_modules/underscore/modules/isDataView.js","./isArray.js":"node_modules/underscore/modules/isArray.js","./isFunction.js":"node_modules/underscore/modules/isFunction.js","./isArguments.js":"node_modules/underscore/modules/isArguments.js","./isFinite.js":"node_modules/underscore/modules/isFinite.js","./isNaN.js":"node_modules/underscore/modules/isNaN.js","./isTypedArray.js":"node_modules/underscore/modules/isTypedArray.js","./isEmpty.js":"node_modules/underscore/modules/isEmpty.js","./isMatch.js":"node_modules/underscore/modules/isMatch.js","./isEqual.js":"node_modules/underscore/modules/isEqual.js","./isMap.js":"node_modules/underscore/modules/isMap.js","./isWeakMap.js":"node_modules/underscore/modules/isWeakMap.js","./isSet.js":"node_modules/underscore/modules/isSet.js","./isWeakSet.js":"node_modules/underscore/modules/isWeakSet.js","./keys.js":"node_modules/underscore/modules/keys.js","./allKeys.js":"node_modules/underscore/modules/allKeys.js","./values.js":"node_modules/underscore/modules/values.js","./pairs.js":"node_modules/underscore/modules/pairs.js","./invert.js":"node_modules/underscore/modules/invert.js","./functions.js":"node_modules/underscore/modules/functions.js","./extend.js":"node_modules/underscore/modules/extend.js","./extendOwn.js":"node_modules/underscore/modules/extendOwn.js","./defaults.js":"node_modules/underscore/modules/defaults.js","./create.js":"node_modules/underscore/modules/create.js","./clone.js":"node_modules/underscore/modules/clone.js","./tap.js":"node_modules/underscore/modules/tap.js","./get.js":"node_modules/underscore/modules/get.js","./has.js":"node_modules/underscore/modules/has.js","./mapObject.js":"node_modules/underscore/modules/mapObject.js","./identity.js":"node_modules/underscore/modules/identity.js","./constant.js":"node_modules/underscore/modules/constant.js","./noop.js":"node_modules/underscore/modules/noop.js","./toPath.js":"node_modules/underscore/modules/toPath.js","./property.js":"node_modules/underscore/modules/property.js","./propertyOf.js":"node_modules/underscore/modules/propertyOf.js","./matcher.js":"node_modules/underscore/modules/matcher.js","./times.js":"node_modules/underscore/modules/times.js","./random.js":"node_modules/underscore/modules/random.js","./now.js":"node_modules/underscore/modules/now.js","./escape.js":"node_modules/underscore/modules/escape.js","./unescape.js":"node_modules/underscore/modules/unescape.js","./templateSettings.js":"node_modules/underscore/modules/templateSettings.js","./template.js":"node_modules/underscore/modules/template.js","./result.js":"node_modules/underscore/modules/result.js","./uniqueId.js":"node_modules/underscore/modules/uniqueId.js","./chain.js":"node_modules/underscore/modules/chain.js","./iteratee.js":"node_modules/underscore/modules/iteratee.js","./partial.js":"node_modules/underscore/modules/partial.js","./bind.js":"node_modules/underscore/modules/bind.js","./bindAll.js":"node_modules/underscore/modules/bindAll.js","./memoize.js":"node_modules/underscore/modules/memoize.js","./delay.js":"node_modules/underscore/modules/delay.js","./defer.js":"node_modules/underscore/modules/defer.js","./throttle.js":"node_modules/underscore/modules/throttle.js","./debounce.js":"node_modules/underscore/modules/debounce.js","./wrap.js":"node_modules/underscore/modules/wrap.js","./negate.js":"node_modules/underscore/modules/negate.js","./compose.js":"node_modules/underscore/modules/compose.js","./after.js":"node_modules/underscore/modules/after.js","./before.js":"node_modules/underscore/modules/before.js","./once.js":"node_modules/underscore/modules/once.js","./findKey.js":"node_modules/underscore/modules/findKey.js","./findIndex.js":"node_modules/underscore/modules/findIndex.js","./findLastIndex.js":"node_modules/underscore/modules/findLastIndex.js","./sortedIndex.js":"node_modules/underscore/modules/sortedIndex.js","./indexOf.js":"node_modules/underscore/modules/indexOf.js","./lastIndexOf.js":"node_modules/underscore/modules/lastIndexOf.js","./find.js":"node_modules/underscore/modules/find.js","./findWhere.js":"node_modules/underscore/modules/findWhere.js","./each.js":"node_modules/underscore/modules/each.js","./map.js":"node_modules/underscore/modules/map.js","./reduce.js":"node_modules/underscore/modules/reduce.js","./reduceRight.js":"node_modules/underscore/modules/reduceRight.js","./filter.js":"node_modules/underscore/modules/filter.js","./reject.js":"node_modules/underscore/modules/reject.js","./every.js":"node_modules/underscore/modules/every.js","./some.js":"node_modules/underscore/modules/some.js","./contains.js":"node_modules/underscore/modules/contains.js","./invoke.js":"node_modules/underscore/modules/invoke.js","./pluck.js":"node_modules/underscore/modules/pluck.js","./where.js":"node_modules/underscore/modules/where.js","./max.js":"node_modules/underscore/modules/max.js","./min.js":"node_modules/underscore/modules/min.js","./shuffle.js":"node_modules/underscore/modules/shuffle.js","./sample.js":"node_modules/underscore/modules/sample.js","./sortBy.js":"node_modules/underscore/modules/sortBy.js","./groupBy.js":"node_modules/underscore/modules/groupBy.js","./indexBy.js":"node_modules/underscore/modules/indexBy.js","./countBy.js":"node_modules/underscore/modules/countBy.js","./partition.js":"node_modules/underscore/modules/partition.js","./toArray.js":"node_modules/underscore/modules/toArray.js","./size.js":"node_modules/underscore/modules/size.js","./pick.js":"node_modules/underscore/modules/pick.js","./omit.js":"node_modules/underscore/modules/omit.js","./first.js":"node_modules/underscore/modules/first.js","./initial.js":"node_modules/underscore/modules/initial.js","./last.js":"node_modules/underscore/modules/last.js","./rest.js":"node_modules/underscore/modules/rest.js","./compact.js":"node_modules/underscore/modules/compact.js","./flatten.js":"node_modules/underscore/modules/flatten.js","./without.js":"node_modules/underscore/modules/without.js","./uniq.js":"node_modules/underscore/modules/uniq.js","./union.js":"node_modules/underscore/modules/union.js","./intersection.js":"node_modules/underscore/modules/intersection.js","./difference.js":"node_modules/underscore/modules/difference.js","./unzip.js":"node_modules/underscore/modules/unzip.js","./zip.js":"node_modules/underscore/modules/zip.js","./object.js":"node_modules/underscore/modules/object.js","./range.js":"node_modules/underscore/modules/range.js","./chunk.js":"node_modules/underscore/modules/chunk.js","./mixin.js":"node_modules/underscore/modules/mixin.js","./underscore-array-methods.js":"node_modules/underscore/modules/underscore-array-methods.js"}],"node_modules/underscore/modules/index-default.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var allExports = _interopRequireWildcard(require("./index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Default Export
// ==============
// In this module, we mix our bundled exports into the `_` object and export
// the result. This is analogous to setting `module.exports = _` in CommonJS.
// Hence, this module is also the entry point of our UMD bundle and the package
// entry point for CommonJS and AMD users. In other words, this is (the source
// of) the module you are interfacing with when you do any of the following:
//
// ```js
// // CommonJS
// var _ = require('underscore');
//
// // AMD
// define(['underscore'], function(_) {...});
//
// // UMD in the browser
// // _ is available as a global variable
// ```
// Add all of the Underscore functions to the wrapper object.
var _ = (0, allExports.mixin)(allExports); // Legacy Node.js API.


_._ = _; // Export the Underscore API.

var _default = _;
exports.default = _default;
},{"./index.js":"node_modules/underscore/modules/index.js"}],"node_modules/underscore/modules/index-all.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _indexDefault.default;
  }
});

var _indexDefault = _interopRequireDefault(require("./index-default.js"));

var _index = require("./index.js");

Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _index[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./index-default.js":"node_modules/underscore/modules/index-default.js","./index.js":"node_modules/underscore/modules/index.js"}],"js/api.js":[function(require,module,exports) {
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// import jquery from "jquery";
// export default (window.$ = window.jQuery = jquery);
var baseURL = 'https://cdn-api.co-vin.in/api/v2';

var sha256 =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(message) {
    var msgUint8, hashBuffer, hashArray, hashHex;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            msgUint8 = new TextEncoder().encode(message);
            _context.next = 3;
            return crypto.subtle.digest('SHA-256', msgUint8);

          case 3:
            hashBuffer = _context.sent;
            hashArray = Array.from(new Uint8Array(hashBuffer));
            hashHex = hashArray.map(function (b) {
              return b.toString(16).padStart(2, '0');
            }).join('');
            return _context.abrupt("return", hashHex);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function sha256(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.sendOTP =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(mobile) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // const mobile = $('#mobileNo').val();
            $('#alert').text('OTP successfully sent to ' + mobile);
            $('#alertPanel').removeAttr('style');
            $('#validatePanel').removeAttr('style');
            return _context2.abrupt("return", fetch("".concat(baseURL, "/auth/generateMobileOTP"), {
              method: 'post',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                mobile: mobile,
                secret: 'U2FsdGVkX19mD56KTNfQsZgXJMwOG7u/6tuj0Qvil1LEjx783oxHXGUTDWYm+XMYVGXPeu+a24sl5ndEKcLTUQ=='
              })
            }));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.validateOTP =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(id, otp) {
    var response;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.t0 = fetch;
            _context3.t1 = "".concat(baseURL, "/auth/validateMobileOtp");
            _context3.t2 = {
              'Content-Type': 'application/json'
            };
            _context3.t3 = JSON;
            _context3.t4 = id;
            _context3.next = 7;
            return sha256(otp);

          case 7:
            _context3.t5 = _context3.sent;
            _context3.t6 = {
              txnId: _context3.t4,
              otp: _context3.t5
            };
            _context3.t7 = _context3.t3.stringify.call(_context3.t3, _context3.t6);
            _context3.t8 = {
              method: 'post',
              headers: _context3.t2,
              body: _context3.t7
            };
            _context3.next = 13;
            return (0, _context3.t0)(_context3.t1, _context3.t8);

          case 13:
            response = _context3.sent;
            return _context3.abrupt("return", response.json());

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getBeneficiaries =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(token) {
    var response;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return fetch("".concat(baseURL, "/appointment/beneficiaries"), {
              headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer ".concat(token)
              }
            });

          case 2:
            response = _context4.sent;
            return _context4.abrupt("return", response.json());

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x5) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getCaptcha =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(token) {
    var response;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return fetch("".concat(baseURL, "/auth/getRecaptcha"), {
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer ".concat(token)
              },
              body: JSON.stringify({})
            });

          case 2:
            response = _context5.sent;
            return _context5.abrupt("return", response.json());

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x6) {
    return _ref5.apply(this, arguments);
  };
}();
},{}],"node_modules/axios/lib/helpers/bind.js":[function(require,module,exports) {
'use strict';

module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

},{}],"node_modules/axios/lib/utils.js":[function(require,module,exports) {
'use strict';

var bind = require('./helpers/bind');

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};

},{"./helpers/bind":"node_modules/axios/lib/helpers/bind.js"}],"node_modules/axios/lib/helpers/buildURL.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

},{"./../utils":"node_modules/axios/lib/utils.js"}],"node_modules/axios/lib/core/InterceptorManager.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

},{"./../utils":"node_modules/axios/lib/utils.js"}],"node_modules/axios/lib/core/transformData.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};

},{"./../utils":"node_modules/axios/lib/utils.js"}],"node_modules/axios/lib/cancel/isCancel.js":[function(require,module,exports) {
'use strict';

module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

},{}],"node_modules/axios/lib/helpers/normalizeHeaderName.js":[function(require,module,exports) {
'use strict';

var utils = require('../utils');

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

},{"../utils":"node_modules/axios/lib/utils.js"}],"node_modules/axios/lib/core/enhanceError.js":[function(require,module,exports) {
'use strict';

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};

},{}],"node_modules/axios/lib/core/createError.js":[function(require,module,exports) {
'use strict';

var enhanceError = require('./enhanceError');

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

},{"./enhanceError":"node_modules/axios/lib/core/enhanceError.js"}],"node_modules/axios/lib/core/settle.js":[function(require,module,exports) {
'use strict';

var createError = require('./createError');

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};

},{"./createError":"node_modules/axios/lib/core/createError.js"}],"node_modules/axios/lib/helpers/cookies.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);

},{"./../utils":"node_modules/axios/lib/utils.js"}],"node_modules/axios/lib/helpers/isAbsoluteURL.js":[function(require,module,exports) {
'use strict';

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

},{}],"node_modules/axios/lib/helpers/combineURLs.js":[function(require,module,exports) {
'use strict';

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};

},{}],"node_modules/axios/lib/core/buildFullPath.js":[function(require,module,exports) {
'use strict';

var isAbsoluteURL = require('../helpers/isAbsoluteURL');
var combineURLs = require('../helpers/combineURLs');

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};

},{"../helpers/isAbsoluteURL":"node_modules/axios/lib/helpers/isAbsoluteURL.js","../helpers/combineURLs":"node_modules/axios/lib/helpers/combineURLs.js"}],"node_modules/axios/lib/helpers/parseHeaders.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

},{"./../utils":"node_modules/axios/lib/utils.js"}],"node_modules/axios/lib/helpers/isURLSameOrigin.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);

},{"./../utils":"node_modules/axios/lib/utils.js"}],"node_modules/axios/lib/adapters/xhr.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');
var settle = require('./../core/settle');
var cookies = require('./../helpers/cookies');
var buildURL = require('./../helpers/buildURL');
var buildFullPath = require('../core/buildFullPath');
var parseHeaders = require('./../helpers/parseHeaders');
var isURLSameOrigin = require('./../helpers/isURLSameOrigin');
var createError = require('../core/createError');

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

},{"./../utils":"node_modules/axios/lib/utils.js","./../core/settle":"node_modules/axios/lib/core/settle.js","./../helpers/cookies":"node_modules/axios/lib/helpers/cookies.js","./../helpers/buildURL":"node_modules/axios/lib/helpers/buildURL.js","../core/buildFullPath":"node_modules/axios/lib/core/buildFullPath.js","./../helpers/parseHeaders":"node_modules/axios/lib/helpers/parseHeaders.js","./../helpers/isURLSameOrigin":"node_modules/axios/lib/helpers/isURLSameOrigin.js","../core/createError":"node_modules/axios/lib/core/createError.js"}],"../../../../../../usr/local/lib/node_modules/parcel-bundler/node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"node_modules/axios/lib/defaults.js":[function(require,module,exports) {
var process = require("process");
'use strict';

var utils = require('./utils');
var normalizeHeaderName = require('./helpers/normalizeHeaderName');

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = require('./adapters/xhr');
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = require('./adapters/http');
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

},{"./utils":"node_modules/axios/lib/utils.js","./helpers/normalizeHeaderName":"node_modules/axios/lib/helpers/normalizeHeaderName.js","./adapters/xhr":"node_modules/axios/lib/adapters/xhr.js","./adapters/http":"node_modules/axios/lib/adapters/xhr.js","process":"../../../../../../usr/local/lib/node_modules/parcel-bundler/node_modules/process/browser.js"}],"node_modules/axios/lib/core/dispatchRequest.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');
var transformData = require('./transformData');
var isCancel = require('../cancel/isCancel');
var defaults = require('../defaults');

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};

},{"./../utils":"node_modules/axios/lib/utils.js","./transformData":"node_modules/axios/lib/core/transformData.js","../cancel/isCancel":"node_modules/axios/lib/cancel/isCancel.js","../defaults":"node_modules/axios/lib/defaults.js"}],"node_modules/axios/lib/core/mergeConfig.js":[function(require,module,exports) {
'use strict';

var utils = require('../utils');

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};

},{"../utils":"node_modules/axios/lib/utils.js"}],"node_modules/axios/lib/core/Axios.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');
var buildURL = require('../helpers/buildURL');
var InterceptorManager = require('./InterceptorManager');
var dispatchRequest = require('./dispatchRequest');
var mergeConfig = require('./mergeConfig');

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;

},{"./../utils":"node_modules/axios/lib/utils.js","../helpers/buildURL":"node_modules/axios/lib/helpers/buildURL.js","./InterceptorManager":"node_modules/axios/lib/core/InterceptorManager.js","./dispatchRequest":"node_modules/axios/lib/core/dispatchRequest.js","./mergeConfig":"node_modules/axios/lib/core/mergeConfig.js"}],"node_modules/axios/lib/cancel/Cancel.js":[function(require,module,exports) {
'use strict';

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;

},{}],"node_modules/axios/lib/cancel/CancelToken.js":[function(require,module,exports) {
'use strict';

var Cancel = require('./Cancel');

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;

},{"./Cancel":"node_modules/axios/lib/cancel/Cancel.js"}],"node_modules/axios/lib/helpers/spread.js":[function(require,module,exports) {
'use strict';

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

},{}],"node_modules/axios/lib/helpers/isAxiosError.js":[function(require,module,exports) {
'use strict';

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return (typeof payload === 'object') && (payload.isAxiosError === true);
};

},{}],"node_modules/axios/lib/axios.js":[function(require,module,exports) {
'use strict';

var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var mergeConfig = require('./core/mergeConfig');
var defaults = require('./defaults');

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = require('./helpers/spread');

// Expose isAxiosError
axios.isAxiosError = require('./helpers/isAxiosError');

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;

},{"./utils":"node_modules/axios/lib/utils.js","./helpers/bind":"node_modules/axios/lib/helpers/bind.js","./core/Axios":"node_modules/axios/lib/core/Axios.js","./core/mergeConfig":"node_modules/axios/lib/core/mergeConfig.js","./defaults":"node_modules/axios/lib/defaults.js","./cancel/Cancel":"node_modules/axios/lib/cancel/Cancel.js","./cancel/CancelToken":"node_modules/axios/lib/cancel/CancelToken.js","./cancel/isCancel":"node_modules/axios/lib/cancel/isCancel.js","./helpers/spread":"node_modules/axios/lib/helpers/spread.js","./helpers/isAxiosError":"node_modules/axios/lib/helpers/isAxiosError.js"}],"node_modules/axios/index.js":[function(require,module,exports) {
module.exports = require('./lib/axios');
},{"./lib/axios":"node_modules/axios/lib/axios.js"}],"src/user-service.js":[function(require,module,exports) {
"use strict";

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _ = require('underscore');

var axiosInstance = _axios.default.create({
  baseURL: 'http://localhost:3000'
  /* other custom settings */

});

exports.getUserDetail =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(mobile) {
    var result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            axiosInstance.interceptors.request.use(function (config) {
              // perform a task before the request is sent
              // console.log('Request was sent');
              return config;
            }, function (error) {
              // handle the error
              return Promise.reject(error);
            });
            _context.next = 3;
            return axiosInstance.get("users/getDetail?mobile=" + mobile);

          case 3:
            result = _context.sent;

            if (!_.isEmpty(result.data)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", null);

          case 8:
            return _context.abrupt("return", result.data);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.addUser =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(mobile, beneficiaries) {
    var result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return axiosInstance({
              method: 'post',
              url: 'users/addUser',
              data: {
                mobile: mobile,
                beneficiaries: beneficiaries
              }
            });

          case 2:
            result = _context2.sent;

            if (!(result && result.status === 200)) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", true);

          case 7:
            return _context2.abrupt("return", false);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.updateBeneficiaries =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(userId, beneficiaries) {
    var result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return axiosInstance({
              method: 'post',
              url: 'users/updateBeneficiaries',
              data: {
                userId: userId,
                beneficiaries: beneficiaries
              }
            });

          case 2:
            result = _context3.sent;

            if (!(result && result.status === 200)) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt("return", true);

          case 7:
            return _context3.abrupt("return", false);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();
},{"axios":"node_modules/axios/index.js","underscore":"node_modules/underscore/modules/index-all.js"}],"js/index.js":[function(require,module,exports) {
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* global moment, localStorage, history Vue */
var _ = require('underscore');

var api = require('./api');

var UserService = require("../src/user-service");

function resetUser() {
  return {
    otp: null,
    otpId: null,
    waitingForOTP: false,
    beneficiaries: [],
    captchaImage: null,
    captcha: null,
    tokenExpiry: null
  };
}

document.addEventListener('DOMContentLoaded', function () {
  var app = new Vue({
    el: '#app',
    data: {
      // selected
      selectedSession: null,
      selectedBeneficiaries: [],
      updatedAt: null,
      authenticatedAt: null,
      token: null,
      finishedProcess: false,
      mobile: null,
      user: resetUser(),
      // options
      // error success messages
      scheduleSuccess: null,
      scheduleError: null,
      otpError: null,
      sendOTPSuccess: null,
      sendOTPError: null,
      options: {
        age: ['18', '45'],
        dose: ['1', '2'],
        type: ['Free', 'Paid'],
        vaccine: ['COVISHIELD', 'COVAXIN']
      }
    },
    computed: {
      filteredCenters: function filteredCenters() {
        var _this = this;

        return this.centers.filter(function (center) {
          var flag = true;
          if (_this.filters.type) flag = flag && center.fee_type === _this.filters.type;
          if (_this.filters.age || _this.filters.vaccine || _this.filters.dose) flag = flag && _this.checkSessions(center.sessions);
          return flag;
        });
      },
      isAuthenticated: function isAuthenticated() {
        return !!this.token;
      },
      isFinishedProcess: function isFinishedProcess() {
        return this.finishedProcess;
      },
      isVaccinated: function isVaccinated() {
        var beneficiaries = this.user.beneficiaries || [];
        return _.find(beneficiaries, function (person) {
          return !_.isEmpty(person.dose1_date) || !_.isEmpty(person.dose2_date);
        }) != null; // return this.user.dbuser.cnt > 0;
      },
      beneficiaryIds: function beneficiaryIds() {
        return this.user.beneficiaries.map(function (beneficiary) {
          return beneficiary.beneficiary_reference_id;
        });
      },
      beneficiaries: function beneficiaries() {
        return this.user.beneficiaries.map(function (beneficiary) {
          var dose;

          if (!!beneficiary.dose2_date) {
            dose = 2;
          } else if (!!beneficiary.dose1_date) {
            dose = 1;
          }

          var years = 2021 - beneficiary.birth_year;
          var age;
          if (years >= 45) age = '45+';else age = '18+';
          return _objectSpread(_objectSpread({}, beneficiary), {}, {
            dose: dose,
            age: age
          });
        });
      }
    },
    watch: {
      token: function token(value) {
        if (value) {
          localStorage.setItem('token', value);
          this.authenticatedAt = this.authenticatedAt || Date.now();
        } else {
          this.authenticatedAt = null;
          localStorage.removeItem('token');
        }
      },
      authenticatedAt: function authenticatedAt(value) {
        if (value) localStorage.setItem('authenticatedAt', value);else localStorage.removeItem('authenticatedAt');
      },
      mobile: function mobile(value) {
        if (value) localStorage.setItem('mobile', value);else localStorage.removeItem('mobile');
      },
      selectedSession: function selectedSession() {
        this.captcha = null;
        this.captchaImage = null;
        this.scheduleError = null;
        this.scheduleSuccess = null;
      },
      playSoundWhenAvailable: function playSoundWhenAvailable(value) {
        if (value) localStorage.setItem('playSoundWhenAvailable', value);else localStorage.removeItem('playSoundWhenAvailable');
      }
    },
    created: function () {
      var _created = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.setUserFromStorage();

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function created() {
        return _created.apply(this, arguments);
      }

      return created;
    }(),
    methods: {
      updateTokenExpiry: function updateTokenExpiry() {
        var _this2 = this;

        setInterval(function () {
          if (_this2.authenticatedAt) {
            var seconds = Math.floor((_this2.authenticatedAt - Date.now() + 15 * 60 * 1000) / 1000);
            var minutes = Math.floor(seconds / 60);
            if (seconds <= 0) _this2.logout();
            if (minutes !== 0) _this2.user.tokenExpiry = "~".concat(minutes, "m");else _this2.user.tokenExpiry = "".concat(seconds, "s");
          }
        }, 1000);
      },
      logout: function logout() {
        this.token = null;
        this.user = resetUser();
        this.finishedProcess = false;
      },
      setUserFromStorage: function setUserFromStorage() {
        this.authenticatedAt = localStorage.getItem('authenticatedAt');
        this.token = localStorage.getItem('token');
        this.mobile = localStorage.getItem('mobile');
        this.autoSelectAvailableSession = localStorage.getItem('autoSelectAvailableSession');
        this.playSoundWhenAvailable = localStorage.getItem('playSoundWhenAvailable');
        if (this.isAuthenticated) this.loggedIn();
        if (this.authenticatedAt) this.updateTokenExpiry();
      },
      updateUrl: function updateUrl() {
        var urlParams = new URLSearchParams();

        for (var filter in this.filters) {
          if (this.filters[filter]) urlParams.set(filter, this.filters[filter]);
        }

        var url = new URL(window.location.href);
        url.search = urlParams;
        history.pushState({}, null, url.href);
      },
      calculateDate: function calculateDate(index) {
        return moment().add(index, 'days');
      },
      sendOTP: function () {
        var _sendOTP = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2() {
          var response, json;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return api.sendOTP(this.mobile);

                case 2:
                  response = _context2.sent;

                  if (!response.ok) {
                    _context2.next = 12;
                    break;
                  }

                  _context2.next = 6;
                  return response.json();

                case 6:
                  json = _context2.sent;
                  this.user.otpId = json.txnId;
                  this.user.waitingForOTP = true;
                  this.sendOTPSuccess = "OTP sent successfully to ".concat(this.mobile);
                  _context2.next = 13;
                  break;

                case 12:
                  this.sendOTPError = 'Failed to send OTP. Please try again';

                case 13:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function sendOTP() {
          return _sendOTP.apply(this, arguments);
        }

        return sendOTP;
      }(),
      validateOTP: function () {
        var _validateOTP = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee3() {
          var json;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  this.sendOTPSuccess = null;
                  this.otpError = null;
                  _context3.next = 4;
                  return api.validateOTP(this.user.otpId, this.user.otp);

                case 4:
                  json = _context3.sent;
                  if (json.error && json.errorCode !== 'APPOIN0001') this.otpError = json.error;else {
                    this.token = json.token;
                    this.user.waitingForOTP = false;
                    this.user.otp = null;
                    this.updateTokenExpiry();
                    this.loggedIn();
                  }

                case 6:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function validateOTP() {
          return _validateOTP.apply(this, arguments);
        }

        return validateOTP;
      }(),
      loggedIn: function () {
        var _loggedIn = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee4() {
          var dbUser, beneficiaries, _dbUser;

          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return UserService.getUserDetail(this.mobile);

                case 2:
                  dbUser = _context4.sent;
                  this.user.dbUser = dbUser;
                  _context4.next = 6;
                  return this.getBeneficiaries();

                case 6:
                  beneficiaries = _context4.sent;

                  if (!_.isEmpty(beneficiaries)) {
                    _context4.next = 10;
                    break;
                  }

                  _context4.next = 22;
                  break;

                case 10:
                  if (!this.isVaccinated) {
                    _context4.next = 22;
                    break;
                  }

                  if (!(dbUser == null)) {
                    _context4.next = 21;
                    break;
                  }

                  _context4.next = 14;
                  return UserService.addUser(this.mobile, beneficiaries);

                case 14:
                  _context4.next = 16;
                  return UserService.getUserDetail(this.mobile);

                case 16:
                  _dbUser = _context4.sent;
                  this.user.dbUser = _dbUser;
                  this.updateBeneficiaries(); // If person newly vaccinated, mark in db

                  _context4.next = 22;
                  break;

                case 21:
                  if (dbUser.cnt != beneficiaries.length) {
                    this.updateBeneficiaries();
                  }

                case 22:
                  this.finishedProcess = true;
                  $('#mainPanel').removeAttr('style');

                case 24:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));

        function loggedIn() {
          return _loggedIn.apply(this, arguments);
        }

        return loggedIn;
      }(),
      getBeneficiaries: function () {
        var _getBeneficiaries = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee5() {
          var json;
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.next = 2;
                  return api.getBeneficiaries(this.token);

                case 2:
                  json = _context5.sent;
                  this.user.beneficiaries = json.beneficiaries || []; // auto select all beneficiaries

                  this.selectedBeneficiaries = this.beneficiaryIds; // backend.getUserDetail().then(event => console.log("ev: " + event));
                  // console.log("backend: " + backend.getUserDetail());

                  return _context5.abrupt("return", this.user.beneficiaries);

                case 6:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5, this);
        }));

        function getBeneficiaries() {
          return _getBeneficiaries.apply(this, arguments);
        }

        return getBeneficiaries;
      }(),
      updateBeneficiaries: function () {
        var _updateBeneficiaries = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee6() {
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  if (!this.user.dbUser) {
                    _context6.next = 3;
                    break;
                  }

                  _context6.next = 3;
                  return UserService.updateBeneficiaries(this.user.dbUser.id, this.user.beneficiaries);

                case 3:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6, this);
        }));

        function updateBeneficiaries() {
          return _updateBeneficiaries.apply(this, arguments);
        }

        return updateBeneficiaries;
      }(),
      getCaptcha: function () {
        var _getCaptcha = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee7() {
          var json;
          return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.next = 2;
                  return api.getCaptcha(this.token);

                case 2:
                  json = _context7.sent;
                  this.user.captchaImage = json.captcha;

                case 4:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee7, this);
        }));

        function getCaptcha() {
          return _getCaptcha.apply(this, arguments);
        }

        return getCaptcha;
      }()
    }
  });
});
},{"underscore":"node_modules/underscore/modules/index-all.js","./api":"js/api.js","../src/user-service":"src/user-service.js"}],"../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61782" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map