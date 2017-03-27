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
		helpers: [],
		namespace: 'Veams'
	},
	pluginName: 'Templater',
	initialize: function (Veams, {engine, templates, partials, helpers}) {
		if (!templates) {
			console.error(`VeamsTemplater :: You need to pass an object which contains your templates (obj.templates)!`);
			return;
		}

		if (!engine) {
			console.error(`VeamsTemplater :: You need to pass a handlebars instance by providing obj.engine!`);
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

	registerHelpers: function () {
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
	},

	addTemplater: function (Veams) {
		Veams.templater = {
			engine: this.options.engine,
			templates: this.options.templates(this.options.engine),
			partials: this.options.partials ? this.options.partials(this.options.engine): {},
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
};

export default VeamsTemplater;