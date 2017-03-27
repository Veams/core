'use strict';

/**
 * Represents a Vent plugin which creates an empty object.
 * The object will be used as publish/subscribe plugin.
 *
 * The module extends the default EVENTS object of Veams
 * when you pass the option called 'furtherEvents'.
 *
 * @module VeamsVent
 *
 * @author Sebastian Fitzner
 */

/**
 * @module EventsHandler
 *
 * Pub/Sub system for Loosely Coupled logic.
 * Based on Peter Higgins' port from Dojo to jQuery
 * https://github.com/phiggins42/bloody-jquery-plugins/blob/master/pubsub.js
 * adopted https://github.com/phiggins42/bloody-jquery-plugins/blob/55e41df9bf08f42378bb08b93efcb28555b61aeb/pubsub.js
 *
 * modified by Sebastian Fitzner
 *
 */
const EventsHandler = (function () {
	let cache = {},
		/**
		 *    Events.publish
		 *    e.g.: Events.publish("/Article/added", {article: article}, this);
		 *
		 *    @class Events
		 *    @method publish
		 *    @param topic {String}
		 *    @param args    {Object}
		 *    @param scope {Object} Optional
		 */
		publish = function (topic, args, scope) {
			if (cache[topic]) {
				let thisTopic = cache[topic];
				let i = thisTopic.length - 1;

				for (i; i >= 0; i -= 1) {
					thisTopic[i].call(scope || this, args || {});
				}
			}
		},
		/**
		 *    Events.subscribe
		 *    e.g.: Events.subscribe("/Article/added", Articles.validate)
		 *
		 *    @class Events
		 *    @method subscribe
		 *    @param topic {String}
		 *    @param callback {Function}
		 *    @return Event handler {Array}
		 */
		subscribe = function (topic, callback) {
			let topics = topic.split(' ');

			for (let i = 0; i < topics.length; i++) {
				let topic = topics[i];

				if (!cache[topic]) {
					cache[topic] = [];
				}

				cache[topic].push(callback);
			}
		},

		/**
		 *    Events.unsubscribe
		 *    e.g.: var handle = Events.subscribe("/Article/added", Articles.validate);
		 *        Events.unsubscribe("/Article/added", Articles.validate);
		 *
		 *    @class Events
		 *    @method unsubscribe
		 *    @param topic {String}
		 *    @param handle {Function}
		 *    @param completly {Boolean}
		 */
		unsubscribe = function (topic, handle, completly = false) {
			let i = cache[topic].length - 1;

			if (cache[topic]) {
				for (i; i >= 0; i--) {
					if (cache[topic][i] === handle) {
						cache[topic].splice(i, 1);
						if (completly) {
							delete cache[topic];
						}
					}
				}
			}
		};

	return {
		publish: publish,
		subscribe: subscribe,
		unsubscribe: unsubscribe,
		trigger: publish,
		on: subscribe,
		off: unsubscribe
	};
}());

const VeamsVent = {
	options: {
		furtherEvents: {}
	},
	pluginName: 'Vent',
	initialize: function (Veams, opts) {

		if (!Veams.$) {
			console.error('VeamsVent :: You need to add a DOM handler plugin if you want to use Veams.Vent!');
			return;
		}

		if (opts) {
			this.options = Veams.helpers.extend(this.options, opts || {});
		}

		Veams.Vent = EventsHandler;
		Veams.EVENTS = Veams.helpers.extend(Veams.EVENTS, this.options.furtherEvents);
	}
};

export default VeamsVent;