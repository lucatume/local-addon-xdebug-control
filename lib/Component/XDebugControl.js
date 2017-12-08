'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = function (context) {
	var React = context.React;
	var Component = context.React.Component;
	var PT = require('prop-types');
	var assertPropTypes = require('check-prop-types').assertPropTypes;

	var Error = require('./Error')(context);
	var Button = require('./Button')(context);
	var XDebugFieldList = require('./XDebugFieldsList')(context);
	var Loading = require('./Loading')(context);
	var Title = require('./Title')(context);
	var SectionTitle = require('./SectionTitle')(context);
	var OutputArea = require('./OutputArea')(context);
	var OutputSection = require('./OutputSection')(context);
	var StatusString = require('./StatusString')(context);

	return function (_Component) {
		_inherits(XDebugControl, _Component);

		function XDebugControl() {
			_classCallCheck(this, XDebugControl);

			return _possibleConstructorReturn(this, (XDebugControl.__proto__ || Object.getPrototypeOf(XDebugControl)).apply(this, arguments));
		}

		_createClass(XDebugControl, [{
			key: 'render',
			value: function render() {
				if (!this.checkProps(this.props) || this.props.site.loading === true) {
					return React.createElement(Loading, null);
				}

				if (this.props.site.hasError) {
					return React.createElement(Error, { source: 'Site Container', message: this.props.site.error });
				}

				var container = this.props.container();

				if (container.environment !== 'custom') {
					return React.createElement(
						OutputArea,
						null,
						React.createElement(Title, { text: 'Only available in custom installations!' })
					);
				} else {
					var xdebugStatus = this.props.xdebug && this.props.xdebug.status ? this.props.xdebug.status : undefined;

					if (['active', 'inactive'].indexOf(xdebugStatus) === -1) {
						return React.createElement(
							OutputArea,
							null,
							React.createElement(Title, { text: 'XDebug Controls' }),
							React.createElement(StatusString, { text: 'XDeubug status is undefined' })
						);
					}

					var button = null;

					if (xdebugStatus === 'inactive') {
						button = React.createElement(Button, { text: 'Activate XDebug', onClick: container.activateXdebug.bind(container) });
					} else if (xdebugStatus === 'active') {
						button = React.createElement(Button, { text: 'Deactivate XDebug', onClick: container.deactivateXdebug.bind(container) });
					}

					return React.createElement(
						OutputArea,
						null,
						React.createElement(Title, { text: 'XDebug Controls' }),
						React.createElement(
							OutputSection,
							null,
							React.createElement(StatusString, { status: xdebugStatus, text: 'XDeubug is ' + xdebugStatus }),
							button
						),
						React.createElement(
							OutputSection,
							null,
							React.createElement(XDebugFieldList, { applyWith: container.applyXdebugSettings.bind(container), status: this.props.xdebug })
						)
					);
				}
			}
		}, {
			key: 'maybeUpdateStatus',
			value: function maybeUpdateStatus() {
				if (!this.props.xdebug || !this.props.xdebug.status) {
					this.props.container().readXdebugStatus();
				}
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.maybeUpdateStatus();
			}
		}, {
			key: 'checkProps',
			value: function checkProps(props) {
				var propTypes = {
					site: PT.shape({
						prevOutput: PT.array,
						prevError: PT.string,
						hasOutput: PT.bool,
						output: PT.array,
						hasError: PT.bool.isRequired,
						error: PT.string,
						loading: PT.bool.isRequired
					}),
					container: PT.func.isRequired
				};

				try {
					assertPropTypes(propTypes, props);
				} catch (e) {
					return false;
				}

				return true;
			}
		}]);

		return XDebugControl;
	}(Component);
};