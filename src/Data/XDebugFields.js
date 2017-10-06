module.exports = function () {
	return class XDebugFields {
		static remoteHostOptions() {
			return [
				{value: '192.168.94.1', label: '192.168.94.1 (Mac)'},
				{value: '192.168.56.1', label: '192.168.56.1 (Windows, preferred)'},
				{value: '192.168.95.1', label: '192.168.95.1 (Windows, fallback)'},
				{value: '10.0.2.2', label: '10.0.2.2'},
				{value: 'localhost', label: 'localhost'},
			]
		}

		static remotePortOptions() {
			return [
				{value: '9000', label: '9000'},
				{value: '9001', label: '9001'},
				{value: '9002', label: '9002'},
				{value: '9003', label: '9003'},
				{value: '9004', label: '9004'},
				{value: '9005', label: '9005'},
			]
		}
	}
}