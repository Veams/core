export default function (plugin, ...args) {

	if (plugin.pluginName) {
		window.Veams.Plugins[plugin.pluginName] = plugin;
	}

	plugin.initialize(window.Veams, ...args);
}