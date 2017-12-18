'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

module.exports = function (context) {
	var React = context.React;
	var Component = context.React.Component;
	var OptionField = require('./OptionField')(context);
	var Button = require('./Button')(context);
	var slugify = require('./../Utils/Strings').slugify;
	var PropTypes = require('prop-types');
	var assertPropTypes = require('check-prop-types').assertPropTypes;

	return function FieldList(props) {
		var propTypes = {
			fields: PropTypes.arrayOf(PropTypes.shape({
				title: PropTypes.string.isRequired,
				name: PropTypes.string,
				value: PropTypes.any.isRequired,
				options: PropTypes.array.isRequired,
				default: PropTypes.any.isRequired
			})),
			applyWith: PropTypes.func.isRequired,
			style: PropTypes.object
		};

		assertPropTypes(propTypes, props);

		var options = props.fields.map(function (field) {
			var fieldProps = {
				title: field.title,
				name: field.name || slugify(field.title),
				value: field.value,
				options: field.options,
				default: field.default
			};

			return React.createElement(OptionField, _extends({}, fieldProps, { className: 'FieldList__Field', key: field.name }));
		});

		var applyWith = function applyWith(e) {
			var target = e.target;
			var selects = [].concat(_toConsumableArray(target.closest('.FieldList').getElementsByTagName('select')));

			if (!selects.length) {
				return;
			}

			var settings = {};

			selects.forEach(function (select) {
				settings[select.name] = select.value;
			});

			props.applyWith(settings);
		};

		return React.createElement(
			'div',
			{ className: 'FieldListWrapper' },
			React.createElement(
				'ul',
				{ className: 'TableList Form FieldList', style: Object.assign({ maxWidth: '600px' }, props.style) },
				options,
				React.createElement(Button, { text: 'Apply Settings', className: 'FieldList__Apply', onClick: applyWith, centered: true, style: { marginTop: '.5em' } })
			)
		);
	};
};