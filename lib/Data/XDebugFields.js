'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
	return function () {
		function XDebugFields() {
			_classCallCheck(this, XDebugFields);
		}

		_createClass(XDebugFields, null, [{
			key: 'defaults',
			value: function defaults() {
				return {
					remote_enable: '0',
					remote_host: 'localhost',
					remote_port: '9000',
					remote_autostart: '0',
					remote_connect_back: '0',
					scream: '0',
					show_local_vars: '0'
				};
			}
		}, {
			key: 'remoteHostOptions',
			value: function remoteHostOptions() {
				return [{ value: '192.168.94.1', label: '192.168.94.1 (Mac)' }, { value: '192.168.56.1', label: '192.168.56.1 (Windows, preferred)' }, { value: '192.168.95.1', label: '192.168.95.1 (Windows, fallback)' }, { value: '10.0.2.2', label: '10.0.2.2' }, { value: 'localhost', label: 'localhost' }];
			}
		}, {
			key: 'remotePortOptions',
			value: function remotePortOptions() {
				return [{ value: '9000', label: '9000' }, { value: '9001', label: '9001' }, { value: '9002', label: '9002' }, { value: '9003', label: '9003' }, { value: '9004', label: '9004' }, { value: '9005', label: '9005' }];
			}
		}]);

		return XDebugFields;
	}();
};