'use strict';
let Veams = {};
let __cache = [];
let __register = {
	modulesInRegister: [],
	modulesOnConditions: [],
	modulesOnInit: [],
	modulesInContext: []
};

/**
 * TODO: Clean up mutation observer
 * TODO: Add destructuring pattern
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

		if (!this.options.internalCacheOnly) {
			this._cache = __cache; // Module list
		}

		if (!this.options.internalRegisterOnly) {
			this._register = __register;
		}

		this.initialize();
	}

	initialize() {
		this.queryString = '[' + this.options.attrPrefix + '-module]';
		__register.modulesInContext = Veams.helpers.querySelectorArray(this.queryString);

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
				__register.modulesInContext = this.getModulesInContext(context);

				if (this.options.logs) {
					console.info('VeamsModules :: Recording new context. When available new modules will be initialised in: ', context);
				}

				this.registerAll();
			});
		}
	}

	// ------------------------
	// STATIC CACHE HANDLER
	// ------------------------

	/**
	 * Save the module in __cache.
	 *
	 * @param {Object} obj.module - module metadata object (@see VeamsComponent.metaData())
	 * @param {Object} obj.element - module element (this.el)
	 */
	static addToCache(obj) {
		__cache.push(obj);

		if (Veams.Vent) {
			Veams.Vent.trigger(Veams.EVENTS.moduleCached, {
				module: obj.module,
				el: obj.element
			});
		}
	}

	static removeFromCacheByKey(obj, key = 'element') {
		let deleteIndex;

		for (let i = 0; i < __cache.length; i++) {
			let cacheItem = __cache[i];

			if (cacheItem[key] === obj) {
				if (cacheItem.instance.willUnmount) cacheItem.instance.willUnmount();
				if (cacheItem.instance.unregisterEvents) cacheItem.instance.unregisterEvents();
				if (cacheItem.instance.didUnmount) cacheItem.instance.didUnmount();

				deleteIndex = i;
			}
		}

		if (deleteIndex) __cache.splice(deleteIndex, 1);
	}

	checkModuleInCache(obj, key = 'element') {
		let state = false;

		__cache.forEach((module) => {
			if (module[key] === obj) state = true;
		});

		return state;
	}

	// ------------------------
	// CONDITIONS HANDLER
	// ------------------------

	static isCondition(obj) {
		return obj.conditions && typeof obj.conditions === 'function';
	}

	static makeConditionCheck(obj) {
		if (obj.conditions && typeof obj.conditions === 'function') {
			return obj.conditions();
		}
	}

	bindConditions() {
		__register.modulesOnConditions.forEach((module) => {
			if (module.conditionsListenOn && module.conditionsListenOn.length) {
				this.bindCondition(module);
			}
		});
	}

	bindCondition(module) {
		let globalEvts = module.conditionsListenOn.join(' ');

		if (Veams.Vent) {
			Veams.Vent.subscribe(globalEvts, () => {
				this.registerConditionalModule(module);
			});
		}
	}

	// ------------------------
	// UN/REGISTER HANDLER
	// ------------------------

	/**
	 * Split up modules depending on condition check
	 */
	splitUpModules() {
		__register.modulesInRegister.forEach((obj) => {
			if (this.constructor.isCondition(obj)) {
				__register.modulesOnConditions.push(obj);
			} else {
				__register.modulesOnInit.push(obj);
			}
		});
	}

	/**
	 * Register multiple modules.
	 *
	 * @param {Array} arr - Array which contains the modules as object.
	 *
	 * @public
	 */
	register(arr) {
		if (!Array.isArray(arr)) {
			throw new Error('VeamsModules :: You need to pass an array to register()!');
		}

		__register.modulesInRegister = __register.modulesInRegister.concat(arr);

		this.splitUpModules();
		this.bindConditions();
		this.registerAll();
	}

	/**
	 * Register all modules
	 */
	registerAll() {
		if (!__register.modulesInRegister) return;

		this.registerInitialModules();
		this.registerConditionalModules();
	}

	/**
	 * Register all initial modules
	 */
	registerInitialModules() {
		__register.modulesOnInit.forEach((obj) => {
			this.registerOne(obj);
		});
	}

	/**
	 * Register conditional modules
	 *
	 * Therefore we check the condition and
	 * when true register the specific module
	 * when false unregister the specific module
	 */
	registerConditionalModules() {
		__register.modulesOnConditions.forEach((obj) => {
			this.registerConditionalModule(obj);
		});
	}

	registerConditionalModule(obj) {
		if (this.constructor.makeConditionCheck(obj)) {
			this.registerOne(obj);
		} else {
			this.unregisterOne(obj);
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
			this.constructor.removeFromCacheByKey(obj.module, 'module');
		}
	}

	// ------------------------
	// INIT HANDLER
	// ------------------------

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
		Veams.helpers.forEach(__register.modulesInContext, (i, el) => {
			this.initModule(Veams.helpers.extend({
				el: el
			}, obj));
		});
	}

	initModule(obj) {
		let noRender = obj.el.getAttribute(this.options.attrPrefix + '-no-render') || obj.render === false || false;
		let dataModules = obj.el.getAttribute(this.options.attrPrefix + '-module').split(' ');

		if (dataModules.indexOf(obj.domName) !== -1) {
			// Check init state
			if (this.checkModuleInCache(obj.el) === true) {
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

			this.constructor.addToCache({
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

							for (let module of __register.modulesInRegister) {
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
							__register.modulesInContext = this.getModulesInContext(addedNode);

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

							this.constructor.removeFromCacheByKey(removedNode);

						}

						if (this.getModulesInContext(removedNode).length) {
							__register.modulesInContext = this.getModulesInContext(removedNode);

							if (this.options.logs) {
								console.info('VeamsModules :: Recording deletion of DOM element. When available modules will be unbound in ', removedNode);
							}

							__register.modulesInContext.forEach((node) => {
								this.constructor.removeFromCacheByKey(node);
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
		internalCacheOnly: true,
		internalRegisterOnly: false,
		useMutationObserver: false
	},
	pluginName: 'ModulesHandler',
	initialize: function (Veams, opts) {
		this.options = Veams.helpers.extend(this.options, opts || {});
		Veams.modules = Veams.modules || new Modules(Veams, this.options);
	}
};

export default VeamsModules;