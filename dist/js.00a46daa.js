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
})({"js/api.js":[function(require,module,exports) {
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// import jquery from "jquery";
// export default (window.$ = window.jQuery = jquery);
var baseURL = 'https://cdn-api.co-vin.in/api/v2';

var sha256 = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(message) {
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

exports.sendOTP = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(mobile) {
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

exports.validateOTP = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id, otp) {
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

exports.getBeneficiaries = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(token) {
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

exports.getCaptcha = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(token) {
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
},{}],"js/index.js":[function(require,module,exports) {
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* global moment, localStorage, history Vue */
var api = require('./api');

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
      mobile: null,
      user: {
        otp: null,
        otpId: null,
        waitingForOTP: false,
        beneficiaries: [],
        captchaImage: null,
        captcha: null,
        tokenExpiry: null
      },
      // options
      autoSelectAvailableSession: false,
      playSoundWhenAvailable: false,
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
      autoSelectAvailableSession: function autoSelectAvailableSession(value) {
        if (value) localStorage.setItem('autoSelectAvailableSession', value);else localStorage.removeItem('autoSelectAvailableSession');
      },
      playSoundWhenAvailable: function playSoundWhenAvailable(value) {
        if (value) localStorage.setItem('playSoundWhenAvailable', value);else localStorage.removeItem('playSoundWhenAvailable');
      }
    },
    created: function () {
      var _created = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.setUserFromStorage();
                this.setFiltersFromURL();

              case 2:
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
      },
      setUserFromStorage: function setUserFromStorage() {
        this.authenticatedAt = localStorage.getItem('authenticatedAt');
        this.token = localStorage.getItem('token');
        this.mobile = localStorage.getItem('mobile');
        this.autoSelectAvailableSession = localStorage.getItem('autoSelectAvailableSession');
        this.playSoundWhenAvailable = localStorage.getItem('playSoundWhenAvailable');
        if (this.isAuthenticated) this.getBeneficiaries();
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
      setFiltersFromURL: function setFiltersFromURL() {
        var urlParams = new URLSearchParams(window.location.search);

        for (var filter in this.filters) {
          if (urlParams && urlParams.get(filter)) {
            this.filters[filter] = urlParams.get(filter);
            if (filter === 'state_id') this.getDistricts();
          }
        }
      },
      calculateDate: function calculateDate(index) {
        return moment().add(index, 'days');
      },
      sendOTP: function () {
        var _sendOTP = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
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
        var _validateOTP = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
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

                  if (!json.error) {
                    _context3.next = 9;
                    break;
                  }

                  this.otpError = json.error;
                  _context3.next = 15;
                  break;

                case 9:
                  this.token = json.token;
                  this.user.waitingForOTP = false;
                  this.user.otp = null;
                  this.updateTokenExpiry();
                  _context3.next = 15;
                  return this.getBeneficiaries();

                case 15:
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
      getBeneficiaries: function () {
        var _getBeneficiaries = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
          var json;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return api.getBeneficiaries(this.token);

                case 2:
                  json = _context4.sent;
                  this.user.beneficiaries = json.beneficiaries; // auto select all beneficiaries

                  this.selectedBeneficiaries = this.beneficiaryIds;

                case 5:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));

        function getBeneficiaries() {
          return _getBeneficiaries.apply(this, arguments);
        }

        return getBeneficiaries;
      }(),
      getCaptcha: function () {
        var _getCaptcha = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
          var json;
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.next = 2;
                  return api.getCaptcha(this.token);

                case 2:
                  json = _context5.sent;
                  this.user.captchaImage = json.captcha;

                case 4:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5, this);
        }));

        function getCaptcha() {
          return _getCaptcha.apply(this, arguments);
        }

        return getCaptcha;
      }()
    }
  });
});
},{"./api":"js/api.js"}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58492" + '/');

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
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
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
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map