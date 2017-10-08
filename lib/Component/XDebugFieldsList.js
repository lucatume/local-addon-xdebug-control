'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = function (context) {
	var React = context.React;
	var Component = context.React.Component;
	var FieldList = require('./FieldList')(context);
	var XDebugFields = require('./../Data/XDebugFields')();
	var CommonFields = require('./../Data/CommonFields')();

	return function (_Component) {
		_inherits(XDebugFieldsList, _Component);

		function XDebugFieldsList(props) {
			_classCallCheck(this, XDebugFieldsList);

			var _this = _possibleConstructorReturn(this, (XDebugFieldsList.__proto__ || Object.getPrototypeOf(XDebugFieldsList)).call(this, props));

			_this.container = props.container;
			_this.style = props.style;
			return _this;
		}

		_createClass(XDebugFieldsList, [{
			key: 'render',
			value: function render() {
				var toggleOptions = CommonFields.toggleOptions();
				var fieldListProps = {
					fields: [{ title: 'remote_enable', name: 'remote_enable', options: toggleOptions, default: '0' }, { title: 'remote_host', name: 'remote_host', options: XDebugFields.remoteHostOptions(), default: '192.168.94.1' }, { title: 'remote_port', name: 'remote_port', options: XDebugFields.remotePortOptions(), default: '9000' }, { title: 'remote_autostart', name: 'remote_autostart', options: toggleOptions, default: '0' }, { title: 'remote_connect_back', name: 'remote_connect_back', options: toggleOptions, default: '0' }, { title: 'scream', name: 'scream', options: toggleOptions, default: '0' }, { title: 'show_local_vars', name: 'show_local_vars', options: toggleOptions, default: '0' }],
					writeWith: this.container.setXdebugSetting.bind(this.container),
					afterWrite: this.container.restartPhpService.bind(this.container),
					readWith: this.container.readXdebugSetting.bind(this.container),
					settings: XDebugFields.defaults()
				};

				return React.createElement(FieldList, fieldListProps);
			}
		}]);

		return XDebugFieldsList;
	}(Component);
};