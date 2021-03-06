'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
	return function () {
		function CommonFields() {
			_classCallCheck(this, CommonFields);
		}

		_createClass(CommonFields, null, [{
			key: 'toggleOptions',
			value: function toggleOptions() {
				return [{ value: '0', label: 'no' }, { value: '1', label: 'yes' }];
			}
		}]);

		return CommonFields;
	}();
};