'use strict';
let Veams = {};
// let __cache = {};

/**
 * TODO: Clean up of class
 *
 * Make it more pure!!! It is work in progress but it works, yeah!
 *
 */

/**
 * - Get modules in DOM
 * - Get Classes and options from init process
 * - Split up conditional modules from other modules
 * - Init other modules
 * - Bind events when available from conditional modules
 * -
 */

class Modules {
	constructor(VEAMS = window.Veams, opts) {
		Veams = VEAMS;

		this.options = opts;
		this._cache = []; // Module list
		this.modulesInContext = []; // Save modules on current page
		this.modulesRegister = [];
		this.modulesOnInit = [];
		this.modulesOnConditions = [];

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

	removeFromCacheByKey(obj, key = 'element') {
		let deleteIndex;

		for (let i = 0; i < this._cache.length; i++) {
			let cacheItem = this._cache[i];

			if (cacheItem[key] === obj) {
				if (cacheItem.instance.willUnmount) cacheItem.instance.willUnmount();
				if (cacheItem.instance.unregisterEvents) cacheItem.instance.unregisterEvents();
				if (cacheItem.instance.didUnmount) cacheItem.instance.didUnmount();

				deleteIndex = i;
			}
		}

		if (deleteIndex) this._cache.splice(deleteIndex, 1);
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

		this.modulesRegister = this.modulesRegister.concat(arr);

		this.splitUpModules();
		this.bindConditions();
		this.registerAll();
	}

	registerAll() {
		if (!this.modulesRegister) return;

		this.registerInitialModules();
		this.registerConditionalModules();
	}

	registerConditionalModules() {
		this.modulesOnConditions.forEach((module) => {
			this.registerOne(module);
		});
	}

	registerInitialModules() {
		this.modulesOnInit.forEach((module) => {
			this.registerOne(module);
		});
	}

	splitUpModules() {
		this.modulesRegister.forEach((module) => {
			if (this.isCondition(module)) {
				this.modulesOnConditions.push(module);
			} else {
				this.modulesOnInit.push(module);
			}
		});
	}

	isCondition(obj) {
		return obj.conditions && typeof obj.conditions === 'function';
	}

	makeConditionCheck(obj) {
		if (obj.conditions && typeof obj.conditions === 'function') {
			return obj.conditions();
		}
	}

	checkModuleInCache(obj, key = 'element') {
		let state = false;

		this._cache.forEach((module) => {
			if (module[key] === obj) state = true;
		});

		return state;
	}

	checkModule(node) {
		let state = false;

		this._cache.forEach((module) => {
			if (module.element === node) state = true;
		});

		return state;
	}

	bindConditions() {
		this.modulesOnConditions.forEach((module) => {
			if (module.conditionsListenOn && module.conditionsListenOn.length) {
				this.registerCondition(module);
			}
		});
	}

	registerCondition(module) {
		let globalEvts = module.conditionsListenOn.join(' ');

		if (Veams.Vent) {
			Veams.Vent.subscribe(globalEvts, () => {
				if (this.makeConditionCheck(module)) {
					this.registerOne(module);
				} else {
					this.unregisterOne(module);
				}
			});
		}
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

		this.initModules(obj);
	}

	unregisterOne(obj) {
		if (this.checkModuleInCache(obj.module, 'module') === true) {
			this.removeFromCacheByKey(obj.module, 'module');
		}
	}

	/**
	 * Initialize a module and render it and/or provide a callback function
	 *
	 * @param {string} obj.domName - Required: dom name of the element
	 * @param {Object} obj.Module - Required: class which will be used to render your module
	 * @param {boolean} [obj.render=true] - Optional: render the class, if false the class will only be initialized
	 * @param {Object} [obj.options] - Optional: You can pass options to the module via JS (Useful for DOMChanged)
	 * @param {function} [obj.cb] - Optional: provide a function which will be executed after initialisation
	 *
	 */
	initModules(obj) {
		Veams.helpers.forEach(this.modulesInContext, (i, el) => {
			this.initModule(Veams.helpers.extend({
				el: el
			}, obj));
		});
	}

	initModule(obj) {
		let noRender = obj.el.getAttribute(this.options.attrPrefix + '-no-render') || obj.render === false || false;
		let dataModules = obj.el.getAttribute(this.options.attrPrefix + '-module').split(' ');

		if (dataModules.indexOf(obj.domName) !== -1) {

			// Check condition
			if (obj.conditions && typeof obj.conditions === 'function' && obj.conditions() !== true) {
				return;
			}

			// Check init state
			if (this.checkModule(obj.el) === true) {
				console.info('VeamsModules :: Element is already in cache and initialized: ');
				console.log(obj.el);
				return;
			}

			// Go ahead when condition is true
			let attrs = obj.el.getAttribute('data-js-options');
			let mergedOptions = Veams.helpers.extend(JSON.parse(attrs), obj.options || {});
			let Module = obj.module;
			let module = new Module({
				el: obj.el,
				namespace: obj.domName,
				options: mergedOptions
			});

			this.addToCache({
				element: obj.el,
				module: obj.module,
				instance: module,
				name: obj.domName
			});

			// Mount process
			if (module.willMount) module.willMount();

			// Render after initial module loading
			if (!noRender) module.render();

			// Provide callback function in which you can use module and options
			if (obj.cb && typeof (obj.cb) === 'function') obj.cb(module, mergedOptions);

			// Mount process
			if (module.didMount) module.didMount();
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
									let obj = Veams.helpers.extend({
										el: addedNode
									}, module);

									this.initModule(obj);

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

							this.removeFromCacheByKey(removedNode);

						}

						if (this.getModulesInContext(removedNode).length) {
							this.modulesInContext = this.getModulesInContext(removedNode);

							if (this.options.logs) {
								console.info('VeamsModules :: Recording deletion of DOM element. When available modules will be unbound in ', removedNode);
							}

							this.modulesInContext.forEach((node) => {
								this.removeFromCacheByKey(node);
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