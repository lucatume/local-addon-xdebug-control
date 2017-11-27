'use strict';

module.exports = function (context) {
	var remote = context.electron.remote;

	// Open the developer tools pressing `F12`
	document.addEventListener('keydown', function (e) {
		if (e.which === 123) {
			remote.getCurrentWindow().toggleDevTools();
		} else if (e.which === 116) {
			location.reload();
		}
	});

	// register a `reload` function that can be used to reload the Electron application from the Developer Tools
	window.reload = remote.getCurrentWebContents().reloadIgnoringCache;
};