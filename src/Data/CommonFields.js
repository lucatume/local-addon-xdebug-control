module.exports = function () {
	return class CommonFields {
		static toggleOptions() {
			return [
				{value: '0', label: 'no'},
				{value: '1', label: 'yes'},
			]
		}
	}
}