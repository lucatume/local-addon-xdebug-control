'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
	return function () {
		function XDegugFields() {
			_classCallCheck(this, XDegugFields);
		}

		_createClass(XDegugFields, null, [{
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
		}]);

		return XDegugFields;
	}();
};