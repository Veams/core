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
			partials: function partials() {},
			helpers: [],
			namespace: 'Veams'
		},
		pluginName: 'Templater',
		initialize: function initialize(Veams, _ref) {
			var engine = _ref.engine,
			    templates = _ref.templates,
			    partials = _ref.partials,
			    helpers = _ref.helpers;
	
			if (!templates) {
				console.error('VeamsTemplater :: You need to pass an object which contains your templates (obj.templates)!');
				return;
			}
	
			if (!engine) {
				console.error('VeamsTemplater :: You need to pass a handlebars instance by providing obj.engine!');
				return;
			}
	
			this.options.namespace = Veams.options.namespace || this.options.namespace;
			this.options.templates = templates;
			this.options.engine = engine;
	
			if (partials) {
				this.options.partials = partials;
			}
	
			if (helpers) {
				this.options.helpers = helpers;
				this.registerHelpers();
			}
			this.addTemplater(Veams);
		},
	
		registerHelpers: function registerHelpers() {
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
		},
	
		addTemplater: function addTemplater(Veams) {
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
	};
	
	exports.default = VeamsTemplater;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=templater.js.map