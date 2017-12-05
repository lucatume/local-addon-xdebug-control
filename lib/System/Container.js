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
			key: 'readXDebugSettingCommand',
			value: function readXDebugSettingCommand(setting) {
				var iniFile = this.maps.phpIniFile(this.phpVersion);
				return 'if cat ' + iniFile + ' | grep -q ^xdebug.' + setting + '; then cat ' + iniFile + ' | grep ^xdebug.' + setting + ' | cut -d \'=\' -f 2; else echo \'false\'; fi';
			}
		}, {
			key: 'updateXdebugStatus',
			value: function updateXdebugStatus() {
				var settings = Object.keys(xdebug.settings());
				var settingsReadCommands = settings.map(this.readXDebugSettingCommand.bind(this));
				var commands = settingsReadCommands.concat(this.getXdebugStatusCommands());
				this.execAndSet(commands, 'xdebug', settings.concat(['status']));
			}
		}, {
			key: 'getXdebugStatusCommands',
			value: function getXdebugStatusCommands() {
				return ['if [ ! -f /app/public/local-phpinfo.php ]; then echo \'<?php phpinfo();\' > /app/public/local-phpinfo.php; fi', 'if wget -qO- localhost/local-phpinfo.php | grep -q Xdebug; then echo \'active\'; else echo \'inactive\'; fi'];
			}
		}, {
			key: 'activateXdebug',
			value: function activateXdebug() {
				var phpIniFile = this.getSitePhpIniFilePath();
				var commands = ['sed -i \'/^;zend_extension.*xdebug.so/ s/;zend_ex/zend_ex/\' ' + phpIniFile, silenceCommand(this.getPhpRestartCommand())].concat(this.getXdebugStatusCommands());

				this.execAndSet(commands, 'xdebug', 'status');
			}
		}, {
			key: 'deactivateXdebug',
			value: function deactivateXdebug() {
				var phpIniFile = this.getSitePhpIniFilePath();
				var commands = ['sed -i \'/^zend_extension.*xdebug.so/ s/zend_ex/;zend_ex/\' ' + phpIniFile, silenceCommand(this.getPhpRestartCommand())].concat(this.getXdebugStatusCommands());

				this.execAndSet(commands, 'xdebug', 'status');
			}
		}, {
			key: 'restartPhpService',
			value: function restartPhpService() {
				this.exec(silenceCommand(this.getPhpRestartCommand()));
			}
		}, {
			key: 'getPhpRestartCommand',
			value: function getPhpRestartCommand() {
				var restartCommand = this.maps.phpRestartCommand(this.phpVersion, this.webServer);

				if (!restartCommand) {
					throw new ContainerError('The ' + this.webServer + ' and PHP ' + this.phpVersion + ' configuration is not supported');
				}

				return restartCommand;
			}
		}, {
			key: 'applyXdebugSettings',
			value: function applyXdebugSettings(settings) {}

			//		readXdebugSetting( setting, def ) {
			//			const phpIniFile = this.getSitePhpIniFilePath()
			//			if ( this.xdebugSettingExists( setting ) ) {
			//				const command = `cat ${phpIniFile} | grep ^xdebug.${setting} | cut -d '=' -f 2`
			//				const value = this.execAndSet( command ).trim()
			//				return value !== '' ? value : def
			//			}
			//
			//			return def
			//		}
			//
			//		setXdebugSetting( setting, value ) {
			//			const phpIniFile = this.getSitePhpIniFilePath()
			//			const settingExists = this.xdebugSettingExists( setting )
			//
			//			if ( settingExists ) {
			//				this.execAndSet( `sed -i '/^xdebug.${setting}/ s/xdebug.${setting}.*/xdebug.${setting}=${value}/' ${phpIniFile}` )
			//			}
			//			else {
			//				this.execAndSet( `sed -i '/^zend_extension.*xdebug.so/ s/xdebug.so/xdebug.so\\nxdebug.${setting}=${value}/' ${phpIniFile}` )
			//			}
			//		}
			//
			//		xdebugSettingExists( setting ) {
			//			const phpIniFile = this.getSitePhpIniFilePath()
			//			return Boolean( this.execAndSet( `if cat ${phpIniFile} | grep -q ^xdebug.${setting}; then echo 'true'; else echo 'false'; fi` ) )
			//		}

		}]);

		return Container;
	}();
};