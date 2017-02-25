'use strict';
let Veams = {};
// let __cache = {};

class Modules {
	constructor(VEAMS = window.Veams, opts) {
		Veams = VEAMS;

		this.options = opts;
		this._cache = []; // Module list
		this.modulesInContext = []; // Save modules on current page
		this.modulesRegister = [];

		this.initialize();
	}

	initialize() {
		this.queryString = '[' + this.options.attrPrefix + '-module]';
		this.modulesInContext = Veams.helpers.querySelectorArray(this.queryString);

		if (this.options.useMutationObserver) {
			this.observe(document.body);
		}

		this.bindEvents();
	}

	bindEvents() {
		if (!Veams.Vent && this.options.useMutationObserver === false) {
			console.info('VeamsModules :: In order to work with the the ajax handling in VeamsModulesHandler ' +
				'you need to define "useMutationObserver" or use the VeamsVent plugin!');

			return;
		}

		if (Veams.Vent && this.options.useMutationObserver === false) {
			Veams.Vent.on(Veams.EVENTS.DOMchanged, (e, context) => {
				this.modulesInContext = this.getModulesInContext(context);

				if (this.options.logs) {
					console.info('VeamsModules :: Recording new context. When available new modules will be initialised in: ', context);
				}

				this.registerAll();
			});
		}
	}

	/**
	 * Save the module in Veams.modules._cache.
	 *
	 * @param {Object} obj.module - module metadata object (@see VeamsComponent.metaData())
	 * @param {Object} obj.element - module element (this.el)
	 */
	addToCache(obj) {
		this._cache.push(obj);

		if (Veams.Vent) {
			Veams.Vent.trigger(Veams.EVENTS.moduleCached, {
				module: obj.module,
				el: obj.element
			});
		}
	}

	removeFromCache(node) {
		let deleteIndex;

		for (let i = 0; i < this._cache.length; i++) {
			let cacheItem = this._cache[i];

			if (cacheItem.element === node) {
				if (cacheItem.module.willUnmount) cacheItem.module.willUnmount();
				if (cacheItem.module.unregisterEvents) cacheItem.module.unregisterEvents();
				if (cacheItem.module.didUnmount) cacheItem.module.didUnmount();

				deleteIndex = i;
			}
		}

		this._cache.splice(deleteIndex, 1);
	}

	/**
	 * Register multiple modules.
	 *
	 * @param {Array} arr - Array which contains the modules as object.
	 */
	register(arr) {
		if (!Array.isArray(arr)) {
			throw new Error('VeamsModules :: You need to pass an array to register()!');
		}

		this.modulesRegister = arr;
		this.registerAll();
	}

	registerAll() {
		if (!this.modulesRegister) return;

		this.modulesRegister.forEach((module) => {
			this.registerOne(module);
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
		if (!obj.domName) throw new Error('VeamsModules :: In order to work with register() you need to define the module name as string!');
		if (!obj.module) throw new Error('VeamsModules :: In order to work with register() you need to define a module!');

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
		Veams.helpers.forEach(this.modulesInContext, (i, el) => {
			this.initModule(el, domName, Module, render, options, cb);
		});
	}

	initModule(el, domName, Module, render, options, cb) {
		let noRender = el.getAttribute(this.options.attrPrefix + '-no-render') || render === false || false;
		let dataModules = el.getAttribute(this.options.attrPrefix + '-module').split(' ');

		if (dataModules.indexOf(domName) !== -1) {
			let attrs = el.getAttribute('data-js-options');
			let mergedOptions = Veams.helpers.extend(JSON.parse(attrs), options || {});

			let module = new Module({
				el: el,
				options: mergedOptions,
				namespace: domName
			});

			this.addToCache({
				name: domName,
				module: module,
				element: el
			});

			// Render after initial module loading
			if (!noRender) module.render();
			// Provide callback function in which you can use module and options
			if (cb && typeof (cb) === 'function') cb(module, mergedOptions);
		}
	}

	/**
	 * Add mutation observer to observe new modules.
	 *
	 * @param {Object} context - Context for the mutation observer
	 *
	 * TODO: Improve for loops
	 */
	observe(context) {
		let observer = new MutationObserver((mutations) => {
			// look through all mutations that just occured
			for (let i = 0; i < mutations.length; ++i) {
				// look through all added nodes of this mutation

				for (let j = 0; j < mutations[i].addedNodes.length; ++j) {
					let addedNode = mutations[i].addedNodes[j];

					if (addedNode instanceof HTMLElement) {
						if (addedNode.getAttribute(this.options.attrPrefix + '-module')) {
							let domName = addedNode.getAttribute(this.options.attrPrefix + '-module');

							if (this.options.logs) {
								console.info('VeamsModules :: Recording new module: ', addedNode, domName);
							}

							for (let module of this.modulesRegister) {
								if (module.domName === domName) {

									this.initModule(addedNode, module.domName, module.module, module.render, module.options, module.cb);

									break;
								}
							}
						}

						if (this.getModulesInContext(addedNode).length) {
							this.modulesInContext = this.getModulesInContext(addedNode);

							if (this.options.logs) {
								console.info('VeamsModules :: Recording new context. When available new modules will be initialised in: ', addedNode);
							}

							this.registerAll();
						}
					}
				}

				for (let j = 0; j < mutations[i].removedNodes.length; ++j) {
					let removedNode = mutations[i].removedNodes[j];

					if (removedNode instanceof HTMLElement) {
						if (removedNode.getAttribute(this.options.attrPrefix + '-module')) {
							let domName = removedNode.getAttribute(this.options.attrPrefix + '-module');

							if (this.options.logs) {
								console.info('VeamsModules :: Recording deletion of module: ', removedNode, domName);
							}

							this.removeFromCache(removedNode);

						}

						if (this.getModulesInContext(removedNode).length) {
							this.modulesInContext = this.getModulesInContext(removedNode);

							if (this.options.logs) {
								console.info('VeamsModules :: Recording deletion of DOM element. When available modules will be unbound in ', removedNode);
							}

							this.modulesInContext.forEach((node) => {
								this.removeFromCache(node);
							});
						}
					}
				}
			}
		});

		observer.observe(context, {
			childList: true,
			subtree: true
		});
	}

	/**
	 * Get Modules in a specific context.
	 *
	 * @param {Object} context - Context for query specific string
	 */
	getModulesInContext(context) {
		return Veams.helpers.querySelectorArray(this.queryString, context);
	}
}

/**
 * Plugin object
 */
const VeamsModules = {
	options: {
		DEBUG: false,
		attrPrefix: 'data-js',
		logs: false,
		useMutationObserver: false
	},
	pluginName: 'ModulesHandler',
	initialize: function (Veams, opts) {
		this.options = Veams.helpers.extend(this.options, opts || {});
		Veams.modules = Veams.modules || new Modules(Veams, this.options);
	}
};

export default VeamsModules;