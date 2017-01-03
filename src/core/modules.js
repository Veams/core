'use strict';
const defaultsHelper = require('../utils/helpers/defaults');
const queryHelper = require('../utils/helpers/query-selector-array');
const forEachHelper = require('../utils/helpers/for-each');
const checkElInContextHelper = require('../utils/helpers/check-element-in-context');

class Modules {
	constructor() {
		this.list = {}; // Module list
		this.currentInstances = []; // Save modules on current page

		this.initialize();
	}

	initialize() {
		this.currentInstances = queryHelper('[' + Veams.options.attrPrefix + '-module]');
	}

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

		let context = obj.context || document.querySelector('html');
		let renderOnInit = obj.render !== false;

		forEachHelper(this.currentInstances, (i, el) => {
			let dataModules = el.getAttribute('data-js-module').split(' ');

			if (dataModules.indexOf(obj.domName) !== -1 && checkElInContextHelper(el, context)) {
				let attrs = el.getAttribute('data-js-options');
				let options = defaultsHelper(obj.options || {}, JSON.parse(attrs));
				let Module = obj.module;
				let module = new Module({
					el: el,
					options: options,
					namespace: obj.domName
				});

				// Render after initial module loading
				if (renderOnInit) module.render();
				// Provide callback function in which you can use module and options
				if (obj.cb && typeof (obj.cb) === 'function') obj.cb(module, options);
			}
		});
	}

	register(arr) {
		if (!Array.isArray(arr)) {
			throw new Error('You need to pass an array!');
		}

		arr.forEach((module) => {
			this.registerOne(module);
		});
	}
}

export default Modules;