'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = function (context) {
	var React = context.React;
	var Component = context.React.Component;
	var OptionField = require('./OptionField')(context);
	var Button = require('./Button')(context);
	var slugify = require('./../Utils/Strings')().slugify;

	return function (_Component) {
		_inherits(FieldList, _Component);

		function FieldList(props) {
			_classCallCheck(this, FieldList);

			var _this = _possibleConstructorReturn(this, (FieldList.__proto__ || Object.getPrototypeOf(FieldList)).call(this, props));

			_this.fields = props.fields;
			// called with setting.name and setting.value
			_this.write = props.writeWith;
			// called with no arguments
			_this.afterWrite = props.afterWrite;
			// called with name and default
			_this.read = props.readWith;
			_this.style = props.style;
			_this.settings = [];
			return _this;
		}

		_createClass(FieldList, [{
			key: 'readSettings',
			value: function readSettings() {
				return this.fields.map(function (field) {
					var name = field.name || slugify(field.title);
					this.read(name, field.default);
				}, this);
			}
		}, {
			key: 'update',
			value: function update() {
				this.settings.map(function (setting) {
					this.write(setting.name, setting.value);
				}, this);

				this.settings = [];

				this.setState(this.readSettings());

				if (!undefined === this.afterWrite) {
					this.afterWrite();
				}
			}
		}, {
			key: 'onSettingChange',
			value: function onSettingChange(event) {
				var input = event.target;
				this.settings.push({ name: input.name, value: input.value });
			}
		}, {
			key: 'render',
			value: function render() {
				var options = this.fields.map(function (field) {
					var name = field.name || slugify(field.title);
					var fieldProps = {
						title: field.title,
						name: name,
						value: this.read(name, field.default),
						options: field.options,
						onChange: this.onSettingChange.bind(this)
					};

					return React.createElement(OptionField, _extends({}, fieldProps, { className: 'FieldList__Field' }));
				}, this);

				return React.createElement(
					'ul',
					{ className: 'TableList Form FieldList', style: this.style },
					options,
					React.createElement(Button, { text: 'Apply Settings', className: 'FieldList__Apply', onClick: this.update.bind(this), centered: true })
				);
			}
		}]);

		return FieldList;
	}(Component);
};