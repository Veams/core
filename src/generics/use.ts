'use strict';

/**
 * Represents a simple plugin system in which `this` is Veams.
 * @module plugin
 *
 * @author Sebastian Fitzner
 */
export interface Plugin {
	options?: object,
	pluginName?: string,
	initialize: any
}

/**
 * Simple plugin functionality
 */
export default function (plugin: Plugin, ...args) {
	if (plugin.pluginName) {
		this.Plugins[plugin.pluginName] = plugin;
	}

	plugin.initialize(this, ...args);
}