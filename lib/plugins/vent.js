(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("plugins/vent", [], factory);
	else if(typeof exports === 'object')
		exports["plugins/vent"] = factory();
	else
		root["plugins/vent"] = root["plugins/vent"] || {}, root["plugins/vent"]["plugins/vent"] = factory();
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
	 * Represents a Vent plugin which creates an empty object.
	 * The object will be used as publish/subscribe plugin.
	 *
	 * The module extends the default EVENTS object of Veams
	 * when you pass the option called 'furtherEvents'.
	 *
	 * @module VeamsVent
	 *
	 * @author Sebastian Fitzner
	 */
	
	/**
	 * @module EventsHandler
	 *
	 * Pub/Sub system for Loosely Coupled logic.
	 * Based on Peter Higgins' port from Dojo to jQuery
	 * https://github.com/phiggins42/bloody-jquery-plugins/blob/master/pubsub.js
	 * adopted https://github.com/phiggins42/bloody-jquery-plugins/blob/55e41df9bf08f42378bb08b93efcb28555b61aeb/pubsub.js
	 *
	 * modified by Sebastian Fitzner
	 *
	 */
	var EventsHandler = function () {
		var cache = {},
	
		/**
	  *    Events.publish
	  *    e.g.: Events.publish("/Article/added", {article: article}, this);
	  *
	  *    @class Events
	  *    @method publish
	  *    @param topic {String}
	  *    @param args    {Object}
	  *    @param scope {Object} Optional
	  */
		publish = function publish(topic, args, scope) {
			if (cache[topic]) {
				var thisTopic = cache[topic];
				var i = thisTopic.length - 1;
	
				for (i; i >= 0; i -= 1) {
					thisTopic[i].call(scope || this, args || {});
				}
			}
		},
	
		/**
	  *    Events.subscribe
	  *    e.g.: Events.subscribe("/Article/added", Articles.validate)
	  *
	  *    @class Events
	  *    @method subscribe
	  *    @param topic {String}
	  *    @param callback {Function}
	  *    @return Event handler {Array}
	  */
		subscribe = function subscribe(topic, callback) {
			var topics = topic.split(' ');
	
			for (var i = 0; i < topics.length; i++) {
				var _topic = topics[i];
	
				if (!cache[_topic]) {
					cache[_topic] = [];
				}
	
				cache[_topic].push(callback);
			}
		},
	
	
		/**
	  *    Events.unsubscribe
	  *    e.g.: var handle = Events.subscribe("/Article/added", Articles.validate);
	  *        Events.unsubscribe("/Article/added", Articles.validate);
	  *
	  *    @class Events
	  *    @method unsubscribe
	  *    @param topic {String}
	  *    @param handle {Function}
	  *    @param completly {Boolean}
	  */
		unsubscribe = function unsubscribe(topic, handle, completly) {
			var i = cache[topic].length - 1;
	
			if (cache[topic]) {
				for (i; i >= 0; i -= 1) {
					if (cache[topic][i] === handle) {
						cache[topic].splice(cache[topic][i], 1);
						if (completly) {
							delete cache[topic];
						}
					}
				}
			}
		};
	
		return {
			publish: publish,
			subscribe: subscribe,
			unsubscribe: unsubscribe,
			trigger: publish,
			on: subscribe,
			off: unsubscribe
		};
	}();
	
	var VeamsVent = {
		options: {
			furtherEvents: {}
		},
		pluginName: 'Vent',
		initialize: function initialize(Veams, opts) {
	
			if (!Veams.$) {
				console.error('VeamsVent :: You need to add a DOM handler plugin if you want to use Veams.Vent!');
				return;
			}
	
			if (opts) {
				this.options = Veams.helpers.extend(this.options, opts || {});
			}
	
			Veams.Vent = EventsHandler;
			Veams.EVENTS = Veams.helpers.extend(Veams.EVENTS, this.options.furtherEvents);
		}
	};
	
	exports.default = VeamsVent;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=vent.js.map