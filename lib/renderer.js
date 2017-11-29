'use strict';

module.exports = function (context) {
	var hooks = context.hooks;
	var React = context.React;
	var Router = context.ReactRouter;
	var createStore = require('redux').createStore;
	var reducers = require('./reducers');

	require('./utils')(context);

	var store = createStore(reducers);

	var XDebugControlProvider = require('./Component/XDebugControlProvider')(context, store);

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

	// Add the XDebug Control route
	hooks.addContent('routesSiteInfo', function () {
		return React.createElement(Router.Route, {
			key: 'site-info-xdebug-control',
			path: '/site-info/:siteID/xdebug-control',
			component: XDebugControlProvider
		});
	});
};