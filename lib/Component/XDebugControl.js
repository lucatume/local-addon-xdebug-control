'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = function (context) {
	var React = context.React;
	var Component = context.React.Component;
	var Container = require('./../System/Container')();
	var Error = require('./Error')(context);
	var Button = require('./Button')(context);
	var XDebugFieldList = require('./XDebugFieldsList')(context);
	var Loading = require('./Loading')(context);

	return function (_Component) {
		_inherits(XDebugControl, _Component);

		function XDebugControl() {
			_classCallCheck(this, XDebugControl);

			return _possibleConstructorReturn(this, (XDebugControl.__proto__ || Object.getPrototypeOf(XDebugControl)).apply(this, arguments));
		}

		_createClass(XDebugControl, [{
			key: 'render',

			//		constructor( props ) {
			//			super( props )
			//
			//			if ( props.loading ) {
			//				return
			//			}
			//
			//			this.site = props.site
			//			this.container = new Container( props.docker, props.site.container )
			//
			//			this.state = {
			//				loading: props.container.loading,
			//				error: props.container.hasError ? props.container.error : false,
			//				xdebugStatus: props.container.xdebugStatus,
			//				siteStatus: props.site.status,
			//			}
			//		}

			//		componentDidMount() {
			//			if ( this.state.xdebugStatus === undefined ) {
			//				this.container.getXdebugStatus()
			//			}
			//		}

			//		componentWillReceiveProps( nextProps ) {
			//			let newState = null
			//
			//			if ( nextProps.siteStatus === 'running' ) {
			//				try {
			//					newState = {
			//						siteStatus: 'running',
			//						xdebugStatus: this.container.getXdebugStatus(),
			//						error: null,
			//					}
			//				}
			//				catch ( e ) {
			//					if ( e.name === 'DockerError' || e.name === 'ContainerError' ) {
			//						const source = e.name === 'DockerError' ? 'Docker' : 'Container'
			//						const cta = e.message.indexOf( 'No such docker' ) !== - 1 ? 'Try to restart the local machine via the Help menu' : null
			//
			//						newState = {
			//							error: {
			//								'source': source,
			//								message: e.message,
			//								'cta': cta,
			//							},
			//						}
			//					} else {
			//						throw e
			//					}
			//				}
			//			} else {
			//				newState = {
			//					siteStatus: 'stopped',
			//					xdebugStatus: 'n/a',
			//					error: null,
			//				}
			//			}
			//
			//			newState.loading = false
			//
			//			this.setState( newState )
			//		}

			//		activateXdebug() {
			//			this.container.activateXdebug()
			//			this.setState( {xdebugStatus: this.container.getXdebugStatus()} )
			//		}
			//
			//		deactivateXdebug() {
			//			this.container.deactivateXdebug()
			//			this.setState( {xdebugStatus: this.container.getXdebugStatus()} )
			//		}

			value: function render() {
				if (this.props.container.loading === true) {
					return React.createElement(Loading, null);
				}

				//			let statusString = null
				//			let error = null
				//			let button = null
				//			let fieldList = null
				//			let isCustom = this.site.environment === 'custom'
				//			let xdebugStatus = null
				//			let statusStyle = {'textTransform': 'uppercase'}
				//			let isRunning = this.props.siteStatus === 'running'
				//
				//			if ( this.state.error !== null ) {
				//				error = (
				//					<Error {...this.state.error}/>
				//				)
				//			} else {
				//				if ( ! isCustom ) {
				//					statusString = 'Only available for custom installations!'
				//				} else {
				//					xdebugStatus = this.state.xdebugStatus
				//
				//					const green = '#1FC37D'
				//					const red = '#FF0000'
				//
				//					if ( xdebugStatus === 'active' ) {
				//						statusStyle['color'] = green
				//					} else {
				//						statusStyle['color'] = red
				//					}
				//
				//					if ( isRunning ) {
				//						statusString = (
				//							<span style={statusStyle}>XDebug is {xdebugStatus}</span>
				//						)
				//
				//						if ( xdebugStatus === 'inactive' ) {
				//							button = <Button text="Activate XDebug" onClick={this.activateXdebug.bind( this )}/>
				//						} else if ( xdebugStatus === 'active' ) {
				//							button = <Button text="Deactivate XDebug" onClick={this.deactivateXdebug.bind( this )}/>
				//						}
				//
				//						let fieldListStyle = {
				//							'margin-top': '1em',
				//						}
				//
				//						const fieldListProps = {
				//							style: fieldListStyle,
				//							container: this.container,
				//						}
				//
				//						fieldList = <XDebugFieldList {...fieldListProps}/>
				//
				//					} else {
				//						statusString = 'Machine not running!'
				//					}
				//				}
				//			}
				//
				//			const titleStyle = {margin: '.25em auto', 'fontSize': '125%'}
				//			const statusAndControlStyle = {marginBottom: '1em', display: 'flex', flexDirection: 'column'}
				//
				//			return (
				//				<div style={{display: 'flex', flexDirection: 'column', flex: 1, padding: '0 5%'}}>
				//					<h3>XDebug Controls</h3>
				//					{error}
				//
				//					<div style={statusAndControlStyle}>
				//						<div className='XdebugStatus' style={titleStyle}>{statusString}</div>
				//						{button}
				//					</div>
				//
				//					{fieldList}
				//				</div>
				//			)
			}
		}]);

		return XDebugControl;
	}(Component);
};