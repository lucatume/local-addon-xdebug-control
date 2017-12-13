'use strict';

module.exports = {
	tail: function tail(what) {
		var lines = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 30;

		return 'tail -n' + lines + ' ' + what;
	},
	silence: function silence(command) {
		return command + ' >/dev/null 2>&1';
	},
	phpErrorLogPath: function phpErrorLogPath(phpVersion) {
		return ['/opt/php/' + phpVersion + '/bin/php -i | grep ^error_log | sed \'s/^.*\\s//g\''];
	},
	phpErrorLogTail: function phpErrorLogTail(phpVersion) {
		var lines = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 30;

		return [module.exports.tail('$(/opt/php/' + phpVersion + '/bin/php -i | grep ^error_log | sed \'s/^.*\\s//g\')', lines)];
	},
	xdebugRemoteHostSet: function xdebugRemoteHostSet(iniFile) {
		// the host machine IP address, in respect to the container, is the one assigned to the `eth0` interface
		var remoteHostVarCommand = 'export REMOTE_HOST=$(ip -4 a | grep eth0 | grep inet | sed \'s/.*inet\\s//g; s#\\/.*##g\')';
		var updateCommand = xdebugSettingUpdate(iniFile, 'remote_host', '$REMOTE_HOST');

		return [remoteHostVarCommand + ' && ' + updateCommand];
	},
	xdebugStatusRead: function xdebugStatusRead() {
		return ['if [ ! -f /app/public/local-phpinfo.php ]; then echo \'<?php phpinfo();\' > /app/public/local-phpinfo.php; fi', 'if wget -qO- localhost/local-phpinfo.php | grep -q Xdebug; then echo \'active\'; else echo \'inactive\'; fi'];
	},
	xdebugSettingRead: function xdebugSettingRead(iniFile, setting) {
		return ['if cat ' + iniFile + ' | grep -q ^xdebug.' + setting + '; then cat ' + iniFile + ' | grep ^xdebug.' + setting + ' | cut -d \'=\' -f 2; else echo \'false\'; fi'];
	},
	xdebugSettingUpdate: function xdebugSettingUpdate(iniFile, setting, value) {
		var updateIt = 'sed -i "/^xdebug.' + setting + '/ s/xdebug.' + setting + '.*/xdebug.' + setting + '=' + value + '/" ' + iniFile;
		var createIt = 'sed -i "/^zend_extension.*xdebug.so/ s/xdebug.so/xdebug.so\\nxdebug.' + setting + '=' + value + '/" ' + iniFile;

		return [module.exports.silence('if cat ' + iniFile + ' | grep -q ^xdebug.' + setting + '; then ' + updateIt + '; else ' + createIt + '; fi')];
	},
	xdebugReadStatusAndSettings: function xdebugReadStatusAndSettings(iniFile, settings) {
		var settingsReadCommands = settings.map(function (setting) {
			return xdebugSettingRead(iniFile, setting);
		});
		// when reading the XDebug status also set the remote_host setting from environment
		return settingsReadCommands.concat(xdebugStatusRead).concat(module.exports.silence(remoteHostSetCommand(iniFile)));
	}
};