'use strict'

const path = require( 'path' )

module.exports = function ( context ) {
	const hooks = context.hooks
	const React = context.React
	const remote = context.electron.remote
	const Router = context.ReactRouter

	// Open the developer tools pressing `F12`
	document.addEventListener( 'keydown', function ( e ) {
		if ( e.which === 123 ) {
			remote.getCurrentWindow().toggleDevTools()
		} else if ( e.which === 116 ) {
			location.reload()
		}
	} )

	// register a `reload` function that can be used to reload the Electron application from the Developer Tools
	window.reload = remote.getCurrentWebContents().reloadIgnoringCache

	hooks.addFilter( 'siteInfoMoreMenu', function ( menu, site ) {
		menu.push(
			{
				label: 'XDebug Control',
				enabled: ! this.context.router.isActive( `/site-info/${site.id}/xdebug-control` ),
				click: () => {
					context.events.send( 'goToRoute', `/site-info/${site.id}/xdebug-control` )
				},
			} )

		return menu
	} )

	const XDebugControl = require( './Component/XDebugControl' )( context )

	// Add the XDebut Control route
	hooks.addContent( 'routesSiteInfo', () => {
		return <Router.Route
			{...context}
			key="site-info-xdebug-control"
			path="/site-info/:siteID/xdebug-control"
			component={XDebugControl}
		/>
	} )
}