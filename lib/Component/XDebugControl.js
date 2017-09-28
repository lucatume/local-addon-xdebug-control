'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = function (context) {

	var Component = context.React.Component;
	var React = context.React;
	var Container = require('./../System/Container')();
	var Docker = require('./../System/Docker')();
	var Button = require('./Button')(context);
	var FieldList = require('./FieldsList')(context);
	var childProcess = require('child_process');

	//	const FieldList = require( './FieldsList' )( context )

	return function (_Component) {
		_inherits(XDebugControl, _Component);

		function XDebugControl(props) {
			_classCallCheck(this, XDebugControl);

			var _this = _possibleConstructorReturn(this, (XDebugControl.__proto__ || Object.getPrototypeOf(XDebugControl)).call(this, props));

			_this.state = {
				siteStatus: 'off',
				xdebugStatus: 'n/a'
			};
			_this.site = _this.props.sites[_this.props.params.siteID];
			_this.docker = new Docker(context, childProcess);
			_this.container = new Container(_this.docker, _this.site);
			return _this;
		}

		_createClass(XDebugControl, [{
			key: 'componentWillMount',
			value: function componentWillMount() {}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {}
		}, {
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				var newState = null;

				if (nextProps.siteStatus === 'running') {
					try {
						newState = {
							siteStatus: 'running',
							xdebugStatus: this.container.getXdebugStatus()
						};
					} catch (e) {
						if (e.name === 'DockerError' || e.name === 'ContainerError') {
							newState = {
								siteStatus: 'running',
								xdebugStatus: e.message
							};
						} else {
							throw e;
						}
					}
				} else {
					newState = {
						siteStatus: 'stopped',
						xdebugStatus: 'n/a'
					};
				}

				this.setState(newState);
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				// tear down
			}
		}, {
			key: 'activateXdebug',
			value: function activateXdebug() {
				this.container.activateXdebug();
				this.setState({ xdebugStatus: this.container.getXdebugStatus() });
			}
		}, {
			key: 'deactivateXdebug',
			value: function deactivateXdebug() {
				this.container.deactivateXdebug();
				this.setState({ xdebugStatus: this.container.getXdebugStatus() });
			}
		}, {
			key: 'render',
			value: function render() {
				//			let xdebugStatus = this.state.status || this.container.getXdebugStatus()
				//			let button = null
				//			let statusStyle = {}
				//			let statusString = (
				//				<h4>Only available for custom installations.</h4>
				//			)
				//			let fieldList = null
				//
				//			if ( this.site.environment === 'custom' ) {
				//				statusString = (
				//					<h4>
				//						Current XDebug status: <strong><span style={statusStyle}>{this.state.status}</span></strong>
				//					</h4>
				//				)
				//				if ( xdebugStatus === 'inactive' ) {
				//					button = <Button
				//						text="Activate XDebug"
				//						disabled={this.state.loading === false}
				//						onClick={this.activateXdebug.bind( this )}
				//					/>
				//					statusStyle['color'] = '#FF0000'
				//				} else if ( xdebugStatus === 'active' ) {
				//					button = <Button
				//						text="Deactivate XDebug"
				//						disabled={this.state.loading === false}
				//						onClick={this.deactivateXdebug.bind( this )}
				//					/>
				//					statusStyle['color'] = '#1FC37D'
				//				}
				//
				//				let fieldListStyle = {
				//					'margin-top': '1em',
				//				}
				//
				//				if ( this.props.siteStatus === 'running' && this.props.site.environment === 'custom' ) {
				//					fieldList = <FieldList style={fieldListStyle} container={this.container} disabled={this.state.loading === false}/>
				//				}
				//			}
				//
				//			return (
				//				<div style={{display: 'flex', flexDirection: 'column', flex: 1, padding: '0 5%'}}>
				//					<h3>XDebug Controls</h3>
				//					{statusString}
				//					{button}
				//					{fieldList}
				//				</div>
				//			)

				var statusString = null;
				var button = null;
				var fieldList = null;
				var isCustom = this.site.environment === 'custom';
				var xdebugStatus = null;
				var statusStyle = { 'text-transform': 'uppercase' };
				var isRunning = this.props.siteStatus === 'running';

				if (!isCustom) {
					statusString = 'Only available on custom installations!';
				} else {
					xdebugStatus = this.state.xdebugStatus;

					if (xdebugStatus === 'active') {
						statusStyle['color'] = '#1FC37D';
					} else {
						statusStyle['color'] = '#FF0000';
					}

					if (isRunning) {
						statusString = React.createElement(
							'p',
							null,
							'XDebug status: ',
							React.createElement(
								'span',
								{ style: statusStyle },
								xdebugStatus
							)
						);

						if (xdebugStatus === 'inactive') {
							button = React.createElement(Button, { text: 'Activate XDebug', onClick: this.activateXdebug.bind(this) });
						} else if (xdebugStatus === 'active') {
							button = React.createElement(Button, { text: 'Deactivate XDebug', onClick: this.deactivateXdebug.bind(this) });
						}

						var fieldListStyle = {
							'margin-top': '1em'
						};

						fieldList = React.createElement(FieldList, { style: fieldListStyle, container: this.container, disabled: this.state.loading === false });
					} else {
						statusString = 'Machine non running!';
					}
				}

				return React.createElement(
					'div',
					{ style: { display: 'flex', flexDirection: 'column', flex: 1, padding: '0 5%' } },
					React.createElement(
						'h3',
						null,
						'XDebug Controls'
					),
					React.createElement(
						'h4',
						null,
						React.createElement(
							'strong',
							null,
							statusString
						)
					),
					button,
					fieldList
				);
			}
		}]);

		return XDebugControl;
	}(Component);
};