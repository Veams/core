(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("common/component", [], factory);
	else if(typeof exports === 'object')
		exports["common/component"] = factory();
	else
		root["common/component"] = root["common/component"] || {}, root["common/component"]["common/component"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = methodExtend;

/**
 * Helper method to extend an already existing method.
 *
 * @param {Object} to - view which will be extended
 * @param {Object} from - methods which comes from mixin
 * @param {string} methodName - function name
 */
function methodExtend(to, from, methodName) {
    function isUndefined(value) {
        return typeof value === 'undefined';
    }
    if (from === undefined)
        return;
    // if the method is defined on from ...
    if (!isUndefined(from[methodName])) {
        var old_1 = to[methodName];
        // ... we create a new function on to
        to[methodName] = function () {
            // wherein we first call the method which exists on `to`
            var oldReturn = old_1.apply(this, arguments);
            // and then call the method on `from`
            from[methodName].apply(this, arguments);
            // and then return the expected result,
            // i.e. what the method on `to` returns
            return oldReturn;
        };
    }
}
;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = mixin;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__defaults__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__method_extend__ = __webpack_require__(0);



/**
 * Merge method functions.
 *
 * @param {Object} from - Mixin object which will be merged via Helpers.defaults with the methods of our class
 * @param {Array} methods - Array of method names which will be extended.
 */
function mixin(from, methods) {
    if (methods === void 0) { methods = ['initialize', 'render']; }
    if (from === undefined) {
        console.error("VeamsHelpers : Mixin :: Mixin not found!");
        return;
    }
    var to = this.prototype;
    /** Add those methods which exists on `from` but not on `to` to the latter */
    Object(__WEBPACK_IMPORTED_MODULE_0__defaults__["a" /* default */])({ to: to, from: from });
    /** we do the same for events */
    if (to.events) {
        var toEvents = to.events;
        var fromEvents = from.events;
        Object(__WEBPACK_IMPORTED_MODULE_0__defaults__["a" /* default */])({ toEvents: toEvents, fromEvents: fromEvents });
    }
    // Extend to's methods
    methods.forEach(function (method) {
        Object(__WEBPACK_IMPORTED_MODULE_1__method_extend__["a" /* default */])(to, from, method);
    });
}
;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = defaultsHelper;

/**
 * Simple extend method, which extends an object.
 *
 * @param {Object} obj - object which will be extended
 *
 * @return {Object} obj - extended object
 */
function defaultsHelper(obj) {
    [].slice.call(arguments, 1).forEach(function (item) {
        for (var key in item) {
            if (obj[key] === undefined)
                obj[key] = item[key];
        }
    });
    return obj;
}
;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = makeId;

/**
 * Generates numeric id.
 *
 * @param {Number} [segments=1] - number of segments of generated id (segments consist of 10 digits, separated by '-').
 *
 * @return {String} - generated id
 */
function makeId(segments) {
    if (segments === void 0) { segments = 1; }
    var crypto = window.crypto || window.msCrypto;
    var array = crypto.getRandomValues(new Uint32Array(segments));
    var id = '';
    var i = 0;
    for (; i < array.length; i++) {
        id += array[i] + '-';
    }
    return id.slice(0, -1);
}
;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_internal_helpers_string__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_helpers_mixin__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_helpers_make_id__ = __webpack_require__(3);

/**
 * Represents a base constructor which supports
 * options merging and
 * saving of standard stuff.
 *
 * @module VeamsBase
 * @author Sebastian Fitzner
 */
/**
 * Imports
 */
// import deepExtend from 'deep-extend';



var VeamsBase = /** @class */ (function () {
    /**
     * Constructor
     *
     * to save standard elements like el and options and
     * execute initialize as default method.
     *
     * @param {String} namespace - Add custom namespace to your class.
     * @param {Object} el - Save element in class.
     * @param {Object} options - Options passed by init process.
     * @param {Object} opts [{}] - Object which contains options of the extended class.
     */
    function VeamsBase(_a, opts) {
        var namespace = _a.namespace, el = _a.el, options = _a.options;
        if (opts === void 0) { opts = {}; }
        this.namespace = namespace || "base";
        this.instanceId = this.namespace;
        this.options = opts;
        this._options = options;
        this.mixin = __WEBPACK_IMPORTED_MODULE_1__utils_helpers_mixin__["a" /* default */];
        if (el) {
            this.el = el;
        }
    }
    Object.defineProperty(VeamsBase.prototype, "namespace", {
        get: function () {
            return this._namespace;
        },
        // ----------------------------------------------------------
        // GETTER & SETTERS
        // ----------------------------------------------------------
        set: function (namespace) {
            this._namespace = namespace;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VeamsBase.prototype, "instanceId", {
        get: function () {
            return this._instanceId;
        },
        set: function (id) {
            this._instanceId = id + "_" + Date.now() + "_" + Object(__WEBPACK_IMPORTED_MODULE_2__utils_helpers_make_id__["a" /* default */])();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VeamsBase.prototype, "_options", {
        get: function () {
            return this.options;
        },
        set: function (options) {
            this.options = Object.assign(this.options, options || {});
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VeamsBase.prototype, "el", {
        get: function () {
            return this._el;
        },
        set: function (element) {
            this._el = element;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VeamsBase.prototype, "metaData", {
        /**
         * Get module information
         */
        get: function () {
            return {
                name: typeof this.namespace === "string"
                    ? __WEBPACK_IMPORTED_MODULE_0__utils_internal_helpers_string__["a" /* default */].capitalizeFirstLetter(__WEBPACK_IMPORTED_MODULE_0__utils_internal_helpers_string__["a" /* default */].toCamelCase(this.namespace))
                    : ""
            };
        },
        enumerable: true,
        configurable: true
    });
    return VeamsBase;
}());
/* harmony default export */ __webpack_exports__["default"] = (VeamsBase);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

var stringHelpers = {};
/**
 * CamelCase strings by replacing hyphens, white space and points.
 *
 * @param {String} str - String which will be camelcased
 */
stringHelpers.toCamelCase = function (str) {
    // Lower cases the string
    return str.toLowerCase()
        .replace(/[-_]+/g, ' ')
        .replace(/[^\w\s]/g, '')
        .replace(/ (.)/g, function ($1) {
        return $1.toUpperCase();
    })
        .replace(/ /g, '');
};
/**
 * String which will be hyphenated by replacing white space and lower case the characters.
 * @param {String} str - String
 */
stringHelpers.hyphenate = function (str) {
    return str.replace(/\s/g, '-').toLowerCase();
};
/**
 * String.
 * @param {String} str - String where first char is upper cased
 */
stringHelpers.capitalizeFirstLetter = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
/* harmony default export */ __webpack_exports__["a"] = (stringHelpers);


/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(20);


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_internal_helpers_get_string_value__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_internal_helpers_template_engine__ = __webpack_require__(22);

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Represents a component constructor which supports
 * options merging,
 * binding and unbinding of events and subscriptions with template strings,
 * rendering of templates
 * and a destroy behaviour.
 *
 * Keep in mind, that this class is a dependent of Veams.
 *
 * TODO: Make a native one which does not need any Veams specific stuff.
 *
 * @module VeamsComponent
 * @author Sebastian Fitzner
 */
/**
 * Imports
 */



/**
 * Custom Functions
 */
function buildEvtId(evtKeyArr, fnName) {
    return evtKeyArr.join('_') + '_' + fnName;
}
var VeamsComponent = /** @class */ (function (_super) {
    __extends(VeamsComponent, _super);
    /**
     * Constructor
     *
     * to save standard elements like el and options and
     * execute initialize as default method.
     *
     * @param {Object} obj [{}] - Object which contains el, options from the DOM and namespace.
     * @param {Object} options [{}] - Object which contains options of the extended class.
     */
    function VeamsComponent(obj, options) {
        if (obj === void 0) { obj = {}; }
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, obj, options) || this;
        _this.appInstance = obj.appInstance || window.Veams;
        if (!_this.appInstance) {
            throw new Error('VeamsComponent :: Please provide your app instance!');
        }
        if (!_this.appInstance.$) {
            console.info('VeamsComponent :: Please add a DOM handler like jQuery to the app instance!');
        }
        if (_this.appInstance.$) {
            _this.$el = _this.appInstance.$(obj.el);
        }
        _this.initialize(obj, options);
        _this._create();
        return _this;
    }
    Object.defineProperty(VeamsComponent.prototype, "events", {
        get: function () {
            return this._events;
        },
        // ----------------------------------------------------------
        // GETTER & SETTERS
        // ----------------------------------------------------------
        /**
         * Get and set events object
         */
        set: function (obj) {
            this._events = obj;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VeamsComponent.prototype, "subscribe", {
        get: function () {
            return this._subscribe;
        },
        /**
         * Get and set subscribe object
         */
        set: function (obj) {
            this._subscribe = obj;
        },
        enumerable: true,
        configurable: true
    });
    VeamsComponent.prototype.addSubscriber = function (obj) {
        if (!this.__subscribers) {
            this.__subscribers = {};
        }
        this.__subscribers[obj.id] = {
            delegate: obj.delegate,
            type: obj.type,
            event: obj.event,
            handler: obj.handler
        };
    };
    Object.defineProperty(VeamsComponent.prototype, "_subscribers", {
        get: function () {
            return this.__subscribers;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Private method to create all necessary elements and bindings.
     *
     * @private
     */
    VeamsComponent.prototype._create = function () {
        this.preRender();
        this.registerEvents(this.events, false);
        this.registerEvents(this.subscribe, true);
        this.bindEvents();
    };
    /**
     * Pre-Render templates
     * which can be used to render content into it
     *
     * @public
     */
    VeamsComponent.prototype.preRender = function () {
        return this;
    };
    /**
     * Render your module
     *
     * @public
     */
    VeamsComponent.prototype.render = function () {
        return this;
    };
    /**
     * Destroy component by unbinding events and
     * removing element from DOM
     */
    VeamsComponent.prototype.destroy = function () {
        this.unregisterEvents();
        this.unbindEvents();
        this.$el.remove();
    };
    /**
     * Render template with data
     *
     * @param {String} tplName - Template name which gets returned as rendered element.
     * @param {Object} data - Data which gets handled by the template.
     */
    VeamsComponent.prototype.renderTemplate = function (tplName, data) {
        if (!this.appInstance.templater) {
            console.error("\n\t\t\t\tVeamsComponent :: It seems that you haven't added the VeamsTemplater plugin. In order to work with 'renderTemplate()' you need to add it!\n\t\t\t");
        }
        else {
            return this.appInstance.templater.render(tplName, data);
        }
    };
    // ----------------------------------------------------------
    // EVENTS METHODS
    // ----------------------------------------------------------
    /**
     * Register multiple events which are saved in an object.
     *
     * @param {Object} evts - Events object which contains an object with events as key and functions as value.
     * @param {Boolean} global - Flag to switch between global and local events.
     *
     * @private
     */
    VeamsComponent.prototype.registerEvents = function (evts, global) {
        var _this = this;
        if (global === void 0) { global = false; }
        if (evts) {
            Object.keys(evts).forEach(function (key) {
                _this.registerEvent(key, evts[key], global);
            });
        }
    };
    /**
     * Register an event by using a simple template engine and
     * a key/value pair.
     *
     * @param {String} evtKey - Event key which contains event and additionally a delegated element.
     * @param {String} fn - Function defined as string which will be bound to this.
     * @param {Boolean} global - Flag if global or local event .
     *
     * @public
     *
     * @example
     * this.registerEvent('click .btn', 'render');
     * this.registerEvent('click {{this.options.btn}}', 'render');
     * this.registerEvent('{{App.EVENTS.custom.event', 'render');
     * this.registerEvent('{{App.EVENTS.resize', 'render', true);
     */
    VeamsComponent.prototype.registerEvent = function (evtKey, fn, global) {
        if (global === void 0) { global = false; }
        if (typeof evtKey !== 'string') {
            console.error('VeamsComponent :: Your event is not a string!');
            return;
        }
        if (typeof fn !== 'string') {
            console.error('VeamsComponent :: Your event handler function is not a string!');
            return;
        }
        var evtKeyArr = evtKey.split(' ');
        var arrlen = evtKeyArr.length;
        var evtType = __WEBPACK_IMPORTED_MODULE_1__utils_internal_helpers_get_string_value__["a" /* default */].apply(this, [Object(__WEBPACK_IMPORTED_MODULE_2__utils_internal_helpers_template_engine__["a" /* default */])(evtKeyArr[0]), this.appInstance]);
        var bindFn = this[fn].bind(this);
        var id = buildEvtId(evtKeyArr, fn);
        if (arrlen > 2) {
            throw new Error('It seems like you have more than two strings in your events object!');
        }
        // Bind on this.$el
        if (arrlen === 1 && !global) {
            this.$el.on(evtType, bindFn);
            this.addSubscriber({
                type: 'event',
                id: id,
                event: evtType,
                handler: bindFn
            });
        }
        else if (arrlen === 1 && global) {
            this.appInstance.Vent.subscribe(evtType, bindFn);
            this.addSubscriber({
                type: 'globalEvent',
                id: id,
                event: evtType,
                handler: bindFn
            });
        }
        else {
            var delegate = __WEBPACK_IMPORTED_MODULE_1__utils_internal_helpers_get_string_value__["a" /* default */].apply(this, [Object(__WEBPACK_IMPORTED_MODULE_2__utils_internal_helpers_template_engine__["a" /* default */])(evtKeyArr[1])]);
            this.$el.on(evtType, delegate, bindFn);
            this.addSubscriber({
                type: 'delegatedEvent',
                delegate: delegate,
                id: id,
                event: evtType,
                handler: bindFn
            });
        }
    };
    /**
     * Delete all registered events.
     */
    VeamsComponent.prototype.unregisterEvents = function () {
        for (var key in this.addSubscriber) {
            if (this.addSubscriber.hasOwnProperty(key)) {
                var obj = this.addSubscriber[key];
                if (obj.type === 'globalEvent') {
                    this.appInstance.Vent.unsubscribe(obj.event, obj.handler);
                }
                else if (obj.type === 'delegatedEvent') {
                    this.$el.off(obj.event, obj.delegate, obj.handler);
                }
                else {
                    this.$el.off(obj.event, obj.handler);
                }
            }
        }
    };
    /**
     * Unregister an event by using the saved subscribers and
     * a key/value pair.
     *
     *
     * @param {String} evtKey - Event key which contains event and additionally a delegated element.
     * @param {String} fn - Function defined as string which will be unbound to this.
     *
     * @public
     *
     * @example
     * this.unregisterEvent('click .btn', 'render');
     * this.unregisterEvent('click {{this.options.btn}}', 'render');
     * this.unregisterEvent('{{App.EVENTS.custom.event', 'render');
     * this.unregisterEvent('{{App.EVENTS.resize', 'render');
     */
    VeamsComponent.prototype.unregisterEvent = function (evtKey, fn) {
        var evtKeyArr = evtKey.split(' ');
        var id = buildEvtId(evtKeyArr, fn);
        if (this.addSubscriber[id]) {
            var obj = this.addSubscriber[id];
            if (obj.type === 'globalEvent') {
                this.appInstance.Vent.unsubscribe(obj.event, obj.handler);
            }
            else if (obj.type === 'delegatedEvent') {
                this.$el.off(obj.event, obj.delegate, obj.handler);
            }
            else {
                this.$el.off(obj.event, obj.handler);
            }
        }
    };
    return VeamsComponent;
}(__WEBPACK_IMPORTED_MODULE_0__base__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (VeamsComponent);


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/**
 * Get value out of variable string.
 *
 * @param {String} str - String which is a reference to a var.
 *
 * @return String
 */
var getStringValue = function getStringValue(str, instanceObject) {
    if (str.indexOf('.') === -1)
        return str;
    var arr = str.split('.');
    var context = arr[0];
    var finalStr = context === 'this' ? this : instanceObject ? instanceObject : window[context];
    var strReplacer = function (el, prev) {
        return prev[el];
    };
    arr.shift();
    arr.forEach(function (item) {
        finalStr = strReplacer(item, finalStr);
        return finalStr;
    });
    if (typeof finalStr !== 'string') {
        throw new Error('The resulting variable out of your events object must be a string!');
    }
    else {
        return finalStr;
    }
};
/* harmony default export */ __webpack_exports__["a"] = (getStringValue);


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/**
 * Simple template engine for event system.
 *
 * @param {String} tplStr - Template string.
 *
 * @return String
 */
var templateEngine = function templateEngine(tplStr) {
    var reg = new RegExp('(\{\{\s?)(.+)(\s?\}\})');
    var match = reg.exec(tplStr);
    var returnVal = '';
    if (match) {
        returnVal = match[2];
    }
    else {
        returnVal = tplStr;
    }
    return returnVal;
};
/* harmony default export */ __webpack_exports__["a"] = (templateEngine);


/***/ })
/******/ ]);
});