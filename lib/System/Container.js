'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var silenceCommand = require('./../Utils/Output').silence;
var arrayCombine = require('./../Utils/Array').arrayCombine;
var ContainerError = require('./../Errors/ContainerError')();
var xdebug = require('./../Data/XDebug');

module.exports = function () {

	return function () {
		function Container(docker, site, maps) {
			_classCallCheck(this, Container);

			if (!site.container) {
				throw new ContainerError('The site docker UUID is missing');
			}

			this.docker = docker;
			this.containerUUId = site.container;
			this.phpVersion = site.phpVersion;
			this.webServer = site.webServer;
			this.environment = site.environment;
			this.maps = maps;
		}

		_createClass(Container, [{
			key: 'getSitePhpVersion',
			value: function getSitePhpVersion() {
				return this.phpVersion;
			}
		}, {
			key: 'getSitePhpIniFilePath',
			value: function getSitePhpIniFilePath() {
				return this.maps.phpIniFile(this.phpVersion);
			}
		}, {
			key: 'getSitePhpBin',
			value: function getSitePhpBin() {
				return this.maps.phpBin(this.phpVersion);
			}
		}, {
			key: 'execAndSet',
			value: function execAndSet(commands, updatingObject, updatingKeys) {
				var callback = function callback(action, output) {
					if (updatingObject && updatingKeys) {
						if (output.length === 0) {
							throw new ContainerError('Trying to update "' + updatingObject + '" with keys ' + JSON.stringify(updatingKeys) + ' but got empty output.');
						}

						updatingKeys = Array.isArray(updatingKeys) ? updatingKeys : [updatingKeys];
						action[updatingObject] = arrayCombine(updatingKeys, output);
					}

					return action;
				};
				return this.docker.runCommand(this.concatCommands(commands), this.containerUUId, callback);
			}
		}, {
			key: 'concatCommands',
			value: function concatCommands(commands) {
				if (commands.length === 0) {
					throw new ContainerError('execAndSet method should not be invoked with empty command(s)');
				}

				if (!Array.isArray(commands)) {
					commands = [commands];
				}

				commands = commands.filter(function (command) {
					return command.trim().length > 0;
				});

				var fullCommand = commands.join(' && ');
				return fullCommand;
			}
		}, {
			key: 'exec',
			value: function exec(commands) {
				return this.docker.runCommand(this.concatCommands(commands), this.containerUUId);
			}
		}, {
			key: 'xdebugSettingReadCommand',
			value: function xdebugSettingReadCommand(setting) {
				var iniFile = this.maps.phpIniFile(this.phpVersion);
				return 'if cat ' + iniFile + ' | grep -q ^xdebug.' + setting + '; then cat ' + iniFile + ' | grep ^xdebug.' + setting + ' | cut -d \'=\' -f 2; else echo \'false\'; fi';
			}
		}, {
			key: 'xdebugSettingUpdateCommand',
			value: function xdebugSettingUpdateCommand(setting, value) {
				var iniFile = this.maps.phpIniFile(this.phpVersion);
				var updateIt = 'sed -i "/^xdebug.' + setting + '/ s/xdebug.' + setting + '.*/xdebug.' + setting + '=' + value + '/" ' + iniFile;
				var createIt = 'sed -i "/^zend_extension.*xdebug.so/ s/xdebug.so/xdebug.so\\nxdebug.' + setting + '=' + value + '/" ' + iniFile;

				return silenceCommand('if cat ' + iniFile + ' | grep -q ^xdebug.' + setting + '; then ' + updateIt + '; else ' + createIt + '; fi');
			}
		}, {
			key: 'readXdebugStatusAndSettings',
			value: function readXdebugStatusAndSettings() {
				var commands = this.xdebugReadStatusAndSettingsCommands();
				var settings = Object.keys(xdebug.settings());
				this.execAndSet(commands, 'xdebug', settings.concat(['status']));
			}
		}, {
			key: 'xdebugReadStatusAndSettingsCommands',
			value: function xdebugReadStatusAndSettingsCommands() {
				var settings = Object.keys(xdebug.settings());
				var settingsReadCommands = settings.map(this.xdebugSettingReadCommand.bind(this));
				// when reading the XDebug status also set the remote_host setting from environment
				return settingsReadCommands.concat(this.xdebugStatusReadCommand()).concat(silenceCommand(this.remoteHostSetCommand()));
			}
		}, {
			key: 'xdebugStatusReadCommand',
			value: function xdebugStatusReadCommand() {
				return ['if [ ! -f /app/public/local-phpinfo.php ]; then echo \'<?php phpinfo();\' > /app/public/local-phpinfo.php; fi', 'if wget -qO- localhost/local-phpinfo.php | grep -q Xdebug; then echo \'active\'; else echo \'inactive\'; fi'];
			}
		}, {
			key: 'activateXdebug',
			value: function activateXdebug() {
				var phpIniFile = this.getSitePhpIniFilePath();
				var commands = ['sed -i \'/^;zend_extension.*xdebug.so/ s/;zend_ex/zend_ex/\' ' + phpIniFile, silenceCommand(this.phpRestartCommand())].concat(this.xdebugReadStatusAndSettingsCommands());

				var settings = Object.keys(xdebug.settings());
				this.execAndSet(commands, 'xdebug', settings.concat(['status']));
			}
		}, {
			key: 'deactivateXdebug',
			value: function deactivateXdebug() {
				var phpIniFile = this.getSitePhpIniFilePath();
				var commands = ['sed -i \'/^zend_extension.*xdebug.so/ s/zend_ex/;zend_ex/\' ' + phpIniFile, silenceCommand(this.phpRestartCommand())].concat(this.xdebugReadStatusAndSettingsCommands());

				var settings = Object.keys(xdebug.settings());
				this.execAndSet(commands, 'xdebug', settings.concat(['status']));
			}
		}, {
			key: 'restartPhpService',
			value: function restartPhpService() {
				this.exec(silenceCommand(this.phpRestartCommand()));
			}
		}, {
			key: 'phpRestartCommand',
			value: function phpRestartCommand() {
				var restartCommand = this.maps.phpRestartCommand(this.phpVersion, this.webServer);

				if (!restartCommand) {
					throw new ContainerError('The ' + this.webServer + ' and PHP ' + this.phpVersion + ' configuration is not supported');
				}

				return restartCommand;
			}
		}, {
			key: 'applyXdebugSettings',
			value: function applyXdebugSettings(settings) {
				var settingsUpdateCommands = [];

				for (var key in settings) {
					settingsUpdateCommands.push(this.xdebugSettingUpdateCommand(key, settings[key]));
				}

				var settingsKeys = Object.keys(settings);
				var settingsReadCommands = settingsKeys.map(this.xdebugSettingReadCommand.bind(this));

				var commands = settingsUpdateCommands.concat(settingsReadCommands).concat(this.xdebugStatusReadCommand());
				commands.push(silenceCommand(this.phpRestartCommand()));

				this.execAndSet(commands, 'xdebug', settingsKeys.concat(['status']));
			}
		}, {
			key: 'remoteHostSetCommand',
			value: function remoteHostSetCommand() {
				// the host machine IP address, in respect to the container, is the one assigned to the `eth0` interface
				var remoteHostVarCommand = 'export REMOTE_HOST=$(ifconfig eth0 | grep \'inet addr:\' | cut -d: -f2 | awk \'{print $1}\')';
				var updateCommand = this.xdebugSettingUpdateCommand('remote_host', '$REMOTE_HOST');

				return remoteHostVarCommand + ' && ' + updateCommand;
			}
		}]);

		return Container;
	}();
};