(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("plugins/templater", [], factory);
	else if(typeof exports === 'object')
		exports["plugins/templater"] = factory();
	else
		root["plugins/templater"] = root["plugins/templater"] || {}, root["plugins/templater"]["plugins/templater"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	/**
	 * Represents the Templater class which will be used in VeamsTemplater plugin.
	 * @module Templater
	 *
	 * @author Sebastian Fitzner
	 */
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Veams = {};
	
	var Templater = function () {
		function Templater() {
			var VEAMS = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.Veams;
			var _ref = arguments[1];
			var engine = _ref.engine,
			    templates = _ref.templates,
			    partials = _ref.partials,
			    helpers = _ref.helpers;
	
			_classCallCheck(this, Templater);
	
			Veams = VEAMS;
	
			if (!templates) {
				console.error('VeamsTemplater :: You need to pass an object which contains your templates (obj.templates)!');
				return;
			}
	
			if (!engine) {
				console.error('VeamsTemplater :: You need to pass a handlebars instance by providing obj.engine!');
				return;
			}
	
			this.options = {
				namespace: Veams.options.namespace,
				engine: engine,
				templates: templates,
				partials: partials,
				helpers: helpers
			};
	
			this.initialize();
		}
	
		_createClass(Templater, [{
			key: 'initialize',
			value: function initialize() {
				if (this.options.helpers) {
					this.registerHelpers();
				}
	
				this.addTemplater();
			}
		}, {
			key: 'registerHelpers',
			value: function registerHelpers() {
				if (!Array.isArray(this.options.helpers)) {
					console.error('VeamsTemplater :: You need to pass the helpers as an array!');
					return;
				}
	
				for (var i = 0; i < this.options.helpers.length; i++) {
					var helper = this.options.helpers[i];
	
					if (helper.register) {
						this.options.engine.registerHelper(helper.register(this.options.engine));
					} else {
						console.error('VeamsTemplater :: Your helper does not have a register function, see: ' + helper);
					}
				}
			}
		}, {
			key: 'addTemplater',
			value: function addTemplater() {
				if (Veams.templater) {
					console.warn('It seems that you are already using Veams.templater! Veams is overriding it now!');
				}
	
				Veams.templater = {
					engine: this.options.engine,
					templates: this.options.templates(this.options.engine),
					partials: this.options.partials ? this.options.partials(this.options.engine) : {},
					helpers: this.options.helpers,
					render: function render(tplName, data) {
						if (!data && Veams.templater.templates[tplName]) {
							console.error('VeamsTemplater :: You need to provide some data for ' + tplName + '.');
							return;
						}
	
						if (!Veams.templater.template[tplName]) {
							console.error('VeamsTemplater :: Template ' + tplName + ' not found.');
							return;
						}
	
						return Veams.templater.template[tplName](data);
					}
				};
			}
		}]);
	
		return Templater;
	}();
	
	/**
	 * Represents a templater plugin which you can use to render your precompiled handlebars templates.
	 * You can also register custom helpers by providing them in an array!
	 *
	 * @module VeamsTemplater
	 *
	 * @author Sebastian Fitzner
	 */
	
	
	var VeamsTemplater = {
		options: {
			engine: function engine() {},
			templates: function templates() {},
			partials: function partials() {},
			helpers: []
		},
		pluginName: 'Templater',
		initialize: function initialize(Veams, _ref2) {
			var engine = _ref2.engine,
			    templates = _ref2.templates,
			    partials = _ref2.partials,
			    helpers = _ref2.helpers;
	
			new Templater(Veams, {
				engine: engine,
				templates: templates,
				partials: partials,
				helpers: helpers
			});
		}
	};
	
	exports.default = VeamsTemplater;
	exports.Templater = Templater;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=templater.js.map