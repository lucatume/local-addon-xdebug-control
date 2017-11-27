'use strict';

var Actions = require('./../reducers/actions');

module.exports = function (state, action) {
	switch (action.type) {
		default:
			return state !== undefined ? Object.assign({}, state) : {
				status: undefined,
				container: undefined
			};
	}
};