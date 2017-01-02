if (!window.Veams) {
	throw new Error('Please initialize Veams!')
}

if (!window.Veams.helpers.mixin || !window.Veams.helpers.defaults) {
	throw new Error('The mixin or defaults helper is missing!')
}


if (!window.Veams.$) {
	throw new Error('Please add a Dom handler like jQuery to the window object!')
}

const $ = window.Veams.$;

class VeamsComponent {

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
		this.options = Veams.helpers.defaults(options || {}, this.options);
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
VeamsComponent.mixin = Veams.helpers.mixin;

export default VeamsComponent;