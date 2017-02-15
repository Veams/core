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
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
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
			namespace: 'App'
		},
		pluginName: 'Templater',
		initialize: function initialize(Veams, obj) {
			if (!obj.templates) {
				console.error('VeamsTemplater :: You need to pass an object which contains your templates (obj.templates)!');
				return;
			}
	
			if (!obj.engine) {
				console.error('VeamsTemplater :: You need to pass a handlebars instance by providing obj.engine!');
				return;
			}
	
			this.options.namespace = Veams.options.namespace || this.options.namespace;
			this.options.templates = obj.templates;
			this.options.engine = obj.engine;
			Veams.templater = {};
	
			if (obj.helpers) this.registerHelpers(obj.helpers);
			this.addTemplater(Veams);
		},
	
		registerHelpers: function registerHelpers(helpers) {
			if (!Array.isArray(helpers)) {
				console.error('VeamsTemplater :: You need to pass the helpers as an array!');
				return;
			}
	
			for (var i = 0; i < helpers.length; i++) {
				var helper = helpers[i];
	
				if (helper.register) {
					this.options.engine.registerHelper(helper.register(this.options.engine));
				} else {
					console.error('VeamsTemplater :: Your helper does not have a register function, see: ' + helper);
				}
			}
		},
	
		addTemplater: function addTemplater(Veams) {
			var Templates = this.options.templates(this.options.engine);
	
			Veams.templater.render = function (tplName, data) {
				if (!data) {
					console.error('VeamsTemplater: You need to provide some data.');
					return;
				}
	
				if (!Templates[tplName]) {
					console.error('VeamsTemplater :: Template ' + tplName + ' not found.');
					return;
				}
	
				return Templates[tplName](data);
			};
		}
	};
	
	exports.default = VeamsTemplater;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=templater.js.map