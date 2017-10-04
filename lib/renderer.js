'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var path = require('path');

module.exports = function (context) {
	var hooks = context.hooks;
	var React = context.React;
	var remote = context.electron.remote;
	var Router = context.ReactRouter;

	// Development Helpers
	remote.getCurrentWindow().openDevTools();
	window.reload = remote.getCurrentWebContents().reloadIgnoringCache;

	hooks.addFilter('siteInfoMoreMenu', function (menu, site) {
		menu.push({
			label: 'XDebug Control',
			enabled: !this.context.router.isActive('/site-info/' + site.id + '/xdebug-control'),
			click: function click() {
				context.events.send('goToRoute', '/site-info/' + site.id + '/xdebug-control');
			}
		});
		return menu;
	});

	var XDebugControl = require('./Component/XDebugControl')(context);

	// Add Route
	hooks.addContent('routesSiteInfo', function () {
		return React.createElement(Router.Route, _extends({}, context, {
			key: 'site-info-my-component',
			path: '/site-info/:siteID/xdebug-control',
			component: XDebugControl
		}));
	});
};