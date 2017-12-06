'use strict';

module.exports = {
	settings: function settings() {
		return {
			remote_enable: '0',
			remote_port: '9000',
			remote_autostart: '0',
			remote_connect_back: '0',
			scream: '0',
			show_local_vars: '0'
		};
	},
	remotePortOptions: function remotePortOptions() {
		return [{ value: '9000', label: '9000' }, { value: '9001', label: '9001' }, { value: '9002', label: '9002' }, { value: '9003', label: '9003' }, { value: '9004', label: '9004' }, { value: '9005', label: '9005' }];
	}
};