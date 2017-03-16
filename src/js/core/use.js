/**
 * Represents a simple plugin system in which `this` is Veams.
 * @module plugin
 *
 * @author Sebastian Fitzner
 */

export default function (plugin, ...args) {
	if (plugin.pluginName) {
		window.Veams.Plugins[plugin.pluginName] = plugin;
	}

	plugin.initialize(window.Veams, ...args);
}