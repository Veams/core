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
		engine: () => {},
		templates: () => {},
		namespace: 'App'
	},
	pluginName: 'Templater',
	initialize: function (Veams, obj) {
		if (!obj.templates) {
			console.error(`VeamsTemplater :: You need to pass an object which contains your templates (obj.templates)!`);
			return;
		}

		if (!obj.engine) {
			console.error(`VeamsTemplater :: You need to pass a handlebars instance by providing obj.engine!`);
			return;
		}

		this.options.namespace = Veams.options.namespace || this.options.namespace;
		this.options.templates = obj.templates;
		this.options.engine = obj.engine;
		Veams.templater = {};

		if (obj.helpers) this.registerHelpers(obj.helpers);
		this.addTemplater(Veams);
	},

	registerHelpers: function (helpers) {
		if (!Array.isArray(helpers)) {
			console.error(`VeamsTemplater :: You need to pass the helpers as an array!`);
			return;
		}

		for (let i = 0; i < helpers.length; i++) {
			let helper = helpers[i];

			if (helper.register) {
				this.options.engine.registerHelper(helper.register(this.options.engine));
			} else {
				console.error(`VeamsTemplater :: Your helper does not have a register function, see: ${helper}`);
			}
		}
	},

	addTemplater: function (Veams) {
		let Templates = this.options.templates(this.options.engine);

		Veams.templater.render = function (tplName, data) {
			if (!data) {
				console.error('VeamsTemplater: You need to provide some data.');
				return;
			}

			if (!Templates[tplName]) {
				console.error(`VeamsTemplater :: Template ${tplName} not found.`);
				return;
			}

			return Templates[tplName](data);
		};
	}
};

export default VeamsTemplater;