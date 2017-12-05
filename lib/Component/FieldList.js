'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (context) {
	var React = context.React;
	var Component = context.React.Component;
	var OptionField = require('./OptionField')(context);
	var Button = require('./Button')(context);
	var slugify = require('./../Utils/Strings').slugify;

	return function FieldList(props) {
		var options = props.fields.map(function (field) {
			var fieldProps = {
				title: field.title,
				name: field.name || slugify(field.title),
				value: field.value,
				options: field.options
			};

			return React.createElement(OptionField, _extends({}, fieldProps, { className: 'FieldList__Field', key: field.name }));
		});

		return React.createElement(
			'ul',
			{ className: 'TableList Form FieldList', style: props.style },
			options,
			React.createElement(Button, { text: 'Apply Settings', className: 'FieldList__Apply', onClick: props.applyWith, centered: true })
		);
	};
};