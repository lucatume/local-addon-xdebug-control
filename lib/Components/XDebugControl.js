'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = function (context) {

	var Component = context.React.Component;
	var React = context.React;
	var $ = context.jQuery;
	var Container = require('./Container')(context);

	return function (_Component) {
		_inherits(XDebugControl, _Component);

		function XDebugControl(props) {
			_classCallCheck(this, XDebugControl);

			var _this = _possibleConstructorReturn(this, (XDebugControl.__proto__ || Object.getPrototypeOf(XDebugControl)).call(this, props));

			_this.state = {
				content: null
			};
			_this.container = new Container(props.sites);
			return _this;
		}

		_createClass(XDebugControl, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				if ('running' === this.props.siteStatus) {
					this.getPluginList();
				} else {
					this.setState({
						content: React.createElement(
							'p',
							null,
							'Machine not running!'
						)
					});
				}
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				// tear down
			}
		}, {
			key: 'getPluginList',
			value: function getPluginList() {
				this.setState({ content: React.createElement(
						'p',
						null,
						'Loading...'
					) });

				// construct command using bundled docker binary to execute 'wp plugin list' inside container
				var iniFilePath = this.container.execute('php -r \'echo php_ini_loaded_file();\'', this.props.sites[this.props.params.siteID]);

				if (false === iniFilePath) {
					return;
				}

				this.setState({
					content: React.createElement(
						'p',
						null,
						'php.ini file path is :',
						React.createElement(
							'pre',
							null,
							iniFilePath
						)
					)
				});
			}
		}, {
			key: 'render',
			value: function render() {
				return React.createElement(
					'div',
					{ style: { display: 'flex', flexDirection: 'column', flex: 1, padding: '0 5%' } },
					React.createElement(
						'h3',
						null,
						'XDebug'
					),
					this.state.content
				);
			}
		}]);

		return XDebugControl;
	}(Component);
};