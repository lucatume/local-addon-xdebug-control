'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
	var ContainerError = require('./../Errors/ContainerError')();

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
			key: 'exec',
			value: function exec(commands) {
				var updatingObject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
				var updatingKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

				if (commands.length === 0) {
					throw new ContainerError('exec method should not be invoked with empty command(s)');
				}

				if (!Array.isArray(commands)) {
					commands = [commands];
				}

				commands = commands.filter(function (command) {
					return command.trim().length > 0;
				});

				var fullCommand = commands.join(' && ');

				return this.docker.runCommand(fullCommand, this.containerUUId, updatingObject, updatingKey);
			}
		}, {
			key: 'updateXdebugStatus',
			value: function updateXdebugStatus() {
				// create the local-phpinfo.php file if it doesn't exist
				this.exec(this.getXdebugStatusCommands(), 'xdebug', 'status');
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
				var commands = ['sed -i \'/^;zend_extension.*xdebug.so/ s/;zend_ex/zend_ex/\' ' + phpIniFile, this.getPhpRestartCommand()].concat(this.getXdebugStatusCommands());

				this.exec(commands, 'xdebug', 'status');
			}
		}, {
			key: 'deactivateXdebug',
			value: function deactivateXdebug() {
				var phpIniFile = this.getSitePhpIniFilePath();
				var commands = ['sed -i \'/^zend_extension.*xdebug.so/ s/zend_ex/;zend_ex/\' ' + phpIniFile, this.getPhpRestartCommand()].concat(this.getXdebugStatusCommands());

				this.exec(commands, 'xdebug', 'status');
			}
		}, {
			key: 'restartPhpService',
			value: function restartPhpService() {
				this.exec(this.getPhpRestartCommand(), 'xdebug', 'status');
			}
		}, {
			key: 'getPhpRestartCommand',
			value: function getPhpRestartCommand() {
				var restartCommand = this.maps.phpRestartCommand(this.phpVersion, this.webServer);

				if (!restartCommand) {
					throw new ContainerError('The ' + this.webServer + ' and PHP ' + this.sitePhpVersion + ' configuration is not supported');
				}

				return restartCommand;
			}

			//		readXdebugSetting( setting, def ) {
			//			const phpIniFile = this.getSitePhpIniFilePath()
			//			if ( this.xdebugSettingExists( setting ) ) {
			//				const command = `cat ${phpIniFile} | grep ^xdebug.${setting} | cut -d '=' -f 2`
			//				const value = this.exec( command ).trim()
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
			//				this.exec( `sed -i '/^xdebug.${setting}/ s/xdebug.${setting}.*/xdebug.${setting}=${value}/' ${phpIniFile}` )
			//			}
			//			else {
			//				this.exec( `sed -i '/^zend_extension.*xdebug.so/ s/xdebug.so/xdebug.so\\nxdebug.${setting}=${value}/' ${phpIniFile}` )
			//			}
			//		}
			//
			//		xdebugSettingExists( setting ) {
			//			const phpIniFile = this.getSitePhpIniFilePath()
			//			return Boolean( this.exec( `if cat ${phpIniFile} | grep -q ^xdebug.${setting}; then echo 'true'; else echo 'false'; fi` ) )
			//		}

		}]);

		return Container;
	}();
};