'use strict';

var foo = function foo(val) {
	return val;
};

module.exports = function (state) {
	return {
		'foo': foo('bar')
	};
};