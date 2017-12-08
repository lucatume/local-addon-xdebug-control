'use strict';

var assertPropTypes = require('check-prop-types').assertPropTypes;

module.exports = {
	checkProps: function checkProps(props, propTypes) {
		try {
			assertPropTypes(propTypes, props);
		} catch (e) {
			return false;
		}

		return true;
	}
};