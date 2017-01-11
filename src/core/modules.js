'use strict';
const defaultsHelper = require('../utils/helpers/defaults');
const queryHelper = require('../utils/helpers/query-selector-array');
const forEachHelper = require('../utils/helpers/for-each');
const checkElInContextHelper = require('../utils/helpers/check-element-in-context');

const registeredModules = [];
const moduleCache = [];

function containsObject(list, obj) {
	for (let i = 0; i < list.length; i++) {
		if (obj && list[i].domName === obj.domName && obj.module) {
			return true;
		}
	}

	return false;
}

class Modules {
	constructor() {
		this.list = {}; // Module list
		this.modulesInContext = []; // Save modules on current page
		this.queryString = '[' + Veams.options.attrPrefix + '-module]';
		this.references = [];

		this.initialize();
	}

	initialize() {
		this.modulesInContext = queryHelper(this.queryString);
	}

	/**
	 * Save the module in Veams.modules.list.
	 * @param {Object} module - module metadata object (@see VeamsComponent.metaData())
	 * @param {Object} element - module element (this.el)
	 */
	save(module, element) {
		if (!this.list[module.name]) {
			this.list[module.name] = module;
			this.list[module.name].nodes = [element];
		} else {
			this.list[module.name].nodes.push(element);
		}

		Veams.Vent.trigger(Veams.EVENTS.moduleRegistered, {
			module: module,
			el: element
		});
	}

	/**
	 * Initialize a module and render it and/or provide a callback function
	 *
	 * @param {Object} obj - Definition of our module
	 * @param {string} obj.el - Required: element
	 * @param {Object} obj.module - Required: class which will be used to render your module
	 * @param {boolean} [obj.render=true] - Optional: render the class, if false the class will only be initialized
	 * @param {function} [obj.cb] - Optional: provide a function which will be executed after initialisation
	 * @param {Object} [obj.context] - Optional: context of module
	 * @param {Object} [obj.options] - Optional: You can pass options to the module via JS (Useful for DOMChanged)
	 *
	 */
	registerOne(obj) {
		if (!obj.domName) throw new Error('In order to work with register() you need to define the module name as string!');
		if (!obj.module) throw new Error('In order to work with register() you need to define a module!');

		this.initModules(obj.domName, obj.module, obj.render, obj.options, obj.cb);
	}

	/**
	 * Initialize a module and render it and/or provide a callback function
	 *
	 * @param {string} domName - Required: dom name of the element
	 * @param {Object} Module - Required: class which will be used to render your module
	 * @param {boolean} [render=true] - Optional: render the class, if false the class will only be initialized
	 * @param {Object} [options] - Optional: You can pass options to the module via JS (Useful for DOMChanged)
	 * @param {function} [cb] - Optional: provide a function which will be executed after initialisation
	 *
	 */
	initModules(domName, Module, render, options, cb) {
		forEachHelper(this.modulesInContext, (i, el) => {
			let noRender = el.getAttribute(Veams.options.attrPrefix + '-no-render') || render === false || false;
			let dataModules = el.getAttribute(Veams.options.attrPrefix + '-module').split(' ');

			if (dataModules.indexOf(domName) !== -1) {
				let attrs = el.getAttribute('data-js-options');
				let mergedOptions = defaultsHelper(options || {}, JSON.parse(attrs));

				let module = new Module({
					el: el,
					options: mergedOptions,
					namespace: domName
				});

				// Render after initial module loading
				if (!noRender) module.render();
				// Provide callback function in which you can use module and options
				if (cb && typeof (cb) === 'function') cb(module, mergedOptions);
			}
		});
	}

	/**
	 * Register multiple modules.
	 *
	 * @param {Array} arr - Array which contains the modules as object.
	 */
	register(arr) {
		if (!Array.isArray(arr)) {
			throw new Error('You need to pass an array to register()!');
		}

		arr.forEach((module) => {
			this.registerOne(module);
		});

		// this.observe(document.body);
	}

	observe(context) {
		let observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				let entry = {
					mutation: mutation,
					el: mutation.target,
					value: mutation.target.textContent,
					oldValue: mutation.oldValue
				};
				console.log("Recording mutation:", entry);

				if (entry.el instanceof HTMLElement) {
					this.modulesInContext = queryHelper(this.queryString, entry.el);
					this.initInNewContext();
					console.log('modules: ', this.modulesInContext);
				}

			});
		});

		observer.observe(context, {
			attributes: true,
			childList: true,
			subtree: true
		});
	}

	initInNewContext() {
		console.log('ref: ', this.references);
		this.register(this.references);
		console.log('ref: ', this.references);
	}
}

export default Modules;