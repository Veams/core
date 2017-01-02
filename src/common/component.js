import defaultsHelper from '../../utils/helpers/defaults';
import mixinHelper from '../../utils/helpers/mixin';

const $ = Veams.options.$;

class Component {

	/**
	 * Contructor
	 *
	 * to save standard elements like el and options and
	 * exeute initialize as default method
	 */
	constructor(obj = {}, options = {}) {
		this.el = obj.el;
		this.$el = $(obj.el);
		this.options = options;

		this._options = obj.options;
		this.initialize();
	}

	// GETTER AND SETTER

	/**
	 * Return options
	 */
	get _options() {
		return this.options;
	}

	/**
	 * Save options by merging default options with passed options
	 */
	set _options(options) {
		this.options = defaultsHelper(options || {}, this.options);
	}

	// STANDARD METHODS

	/**
	 * Initialize your module class,
	 * save some references,
	 * optionally scaffold some templates and
	 * bind your events
	 */
	initialize() {
		this.preRender();
		this.bindEvents();
	}

	/**
	 * Destroy module
	 */
	destroy() {
		this.unbindEvents();
		this.$el.remove();
	}

	/**
	 * Bind global and local events
	 */
	bindEvents() {
	}

	/**
	 * Unbind events
	 */
	unbindEvents() {
		this.$el.off();
	}

	/**
	 * Pre-Render templates
	 * which can be used to render content into it
	 */
	preRender() {
	}

	/**
	 * Render template with data
	 */
	renderTemplate(tpl, data) {
	}

	/**
	 * Render your module
	 */
	render() {
	}
}

/**
 * Add mixin functionality to extend module class
 */
Component.mixin = mixinHelper;

export default Component;