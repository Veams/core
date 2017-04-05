'use strict';
/**
 * Represents the Templater class which will be used in VeamsTemplater plugin.
 * @module Templater
 *
 * @author Sebastian Fitzner
 */
let Veams = {};

class Templater {
	constructor(VEAMS = window.Veams, {engine, templates, partials, helpers}) {
		Veams = VEAMS;

		if (!templates) {
			console.error(`VeamsTemplater :: You need to pass an object which contains your templates (obj.templates)!`);
			return;
		}

		if (!engine) {
			console.error(`VeamsTemplater :: You need to pass a handlebars instance by providing obj.engine!`);
			return;
		}

		this.options = {
			namespace: Veams.options.namespace,
			engine,
			templates,
			partials,
			helpers
		};

		this.initialize();
	}

	initialize() {
		if (this.options.helpers) {
			this.registerHelpers();
		}

		this.addTemplater();
	}

	registerHelpers() {
		if (!Array.isArray(this.options.helpers)) {
			console.error(`VeamsTemplater :: You need to pass the helpers as an array!`);
			return;
		}

		for (let i = 0; i < this.options.helpers.length; i++) {
			let helper = this.options.helpers[i];

			if (helper.register) {
				this.options.engine.registerHelper(helper.register(this.options.engine));
			} else {
				console.error(`VeamsTemplater :: Your helper does not have a register function, see: ${helper}`);
			}
		}
	}

	addTemplater() {
		if (Veams.templater) {
			console.warn('It seems that you are already using Veams.templater! Veams is overriding it now!');
		}

		Veams.templater = {
			engine: this.options.engine,
			templates: this.options.templates(this.options.engine),
			partials: this.options.partials ? this.options.partials(this.options.engine) : {},
			helpers: this.options.helpers,
			render: function (tplName, data) {
				if (!data && Veams.templater.templates[tplName]) {
					console.error(`VeamsTemplater :: You need to provide some data for ${tplName}.`);
					return;
				}

				if (!Veams.templater.template[tplName]) {
					console.error(`VeamsTemplater :: Template ${tplName} not found.`);
					return;
				}

				return Veams.templater.template[tplName](data);
			}
		};
	}
}

/**
 * Represents a templater plugin which you can use to render your precompiled handlebars templates.
 * You can also register custom helpers by providing them in an array!
 *
 * @module VeamsTemplater
 *
 * @author Sebastian Fitzner
 */
const VeamsTemplater = {
	options: {
		engine: () => {
		},
		templates: () => {
		},
		partials: () => {
		},
		helpers: []
	},
	pluginName: 'Templater',
	initialize: function (Veams, {engine, templates, partials, helpers}) {
		new Templater(Veams, {
			engine,
			templates,
			partials,
			helpers
		});
	}
};

export default VeamsTemplater;
export { Templater };