'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = function (context) {
	var React = context.React;
	var $ = context.jQuery;
	var Component = context.React.Component;
	var OptionField = require('./OptionField')(context);
	var Button = require('./Button')(context);

	return function (_Component) {
		_inherits(FieldsList, _Component);

		function FieldsList(props) {
			_classCallCheck(this, FieldsList);

			var _this = _possibleConstructorReturn(this, (FieldsList.__proto__ || Object.getPrototypeOf(FieldsList)).call(this, props));

			_this.container = props.container;
			_this.state = {
				remote_enable: '0',
				remote_host: 'localhost',
				remote_port: '9000',
				remote_autostart: '0',
				remote_connect_back: '0',
				scream: '0',
				show_local_vars: '0'
			};
			return _this;
		}

		_createClass(FieldsList, [{
			key: 'readSettings',
			value: function readSettings() {
				return {
					remote_enable: this.container.readXdebugSetting('remote_enable', '0'),
					remote_host: this.container.readXdebugSetting('remote_host', '192.168.94.1'),
					remote_port: this.container.readXdebugSetting('remote_port', '9000'),
					remote_autostart: this.container.readXdebugSetting('remote_autostart', '0'),
					remote_connect_back: this.container.readXdebugSetting('remote_connect_back', '0'),
					scream: this.container.readXdebugSetting('scream', '0'),
					show_local_vars: this.container.readXdebugSetting('show_local_vars', '0')
				};
			}
		}, {
			key: 'parseSettings',
			value: function parseSettings() {
				var parsed = [];

				$('#' + this.props.id + ' input,select').each(function () {
					var $this = $(this);
					parsed.push({ name: $this.attr('name'), value: $this.val() });
				});

				return parsed;
			}
		}, {
			key: 'updateXdebugSettings',
			value: function updateXdebugSettings() {
				// read the settings from the field list
				var settings = this.parseSettings();

				settings.map(function (setting) {
					this.container.setXdebugSetting(setting.name, setting.value);
				}, this);

				this.setState(this.readSettings());

				this.container.restartPhpService();
			}
		}, {
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps() {
				this.setState(this.readSettings());
			}
		}, {
			key: 'render',
			value: function render() {
				var remoteHostOptions = [{ value: '192.168.94.1', label: '192.168.94.1 (Mac)' }, { value: '10.0.2.2', label: '10.0.2.2' }, { value: 'localhost', label: 'localhost' }];
				var remotePortOptions = [{ value: '9000', label: '9000' }, { value: '9001', label: '9001' }, { value: '9002', label: '9002' }];
				var toggleOptions = [{ value: '0', label: 'no' }, { value: '1', label: 'yes' }];

				return React.createElement(
					'ul',
					{ className: 'TableList Form', id: this.props.id, style: this.props.style },
					React.createElement(OptionField, { title: 'remote_enable', name: 'remote_enable', value: this.state.remote_enable, options: toggleOptions }),
					React.createElement(OptionField, { title: 'remote_host', name: 'remote_host', value: this.state.remote_host, options: remoteHostOptions }),
					React.createElement(OptionField, { title: 'remote_port', name: 'remote_port', value: this.state.remote_port, options: remotePortOptions }),
					React.createElement(OptionField, { title: 'remote_autostart', name: 'remote_autostart', value: this.state.remote_autostart, options: toggleOptions }),
					React.createElement(OptionField, { title: 'remote_connect_back', name: 'remote_connect_back', value: this.state.remote_connect_back,
						options: toggleOptions }),
					React.createElement(OptionField, { title: 'scream', name: 'scream', value: this.state.scream, options: toggleOptions }),
					React.createElement(OptionField, { title: 'show_local_vars', name: 'show_local_vars', value: this.state.show_local_vars, options: toggleOptions }),
					React.createElement(Button, { text: 'Apply Settings', onClick: this.updateXdebugSettings.bind(this), centered: true })
				);
			}
		}]);

		return FieldsList;
	}(Component);
};