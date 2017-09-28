'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
	var ContainerError = require('./../Errors/ContainerError')();

	return function () {
		function Container(docker, site) {
			_classCallCheck(this, Container);

			this.docker = docker;

			if (site.container === undefined) {
				throw new ContainerError('site.container information must be defined');
			}

			this.site = site;
			this.sitePhpBin = undefined;
			this.sitePhpIniFile = undefined;
			this.sitePhpVersion = undefined;
			this.restartCommandMap = {
				'apache': {
					'5.2.4': 'service apache2 restart',
					'5.2.17': 'service apache2 restart',
					'5.3.29': 'service php-5.3.29-fpm restart',
					'5.4.45': 'service php-5.4.45-fpm restart',
					'5.5.38': 'service php-5.5.38-fpm restart',
					'5.6.20': 'service php-5.6.20-fpm restart',
					'7.0.3': 'service php-7.0.3-fpm restart',
					'7.1.4': 'service php-7.1.4-fpm restart'
				},
				'nginx': {
					'5.2.4': 'service php-5.2.4-fpm restart',
					'5.2.17': 'service php-5.2.17-fpm restart',
					'5.3.29': 'service php-5.3.29-fpm restart',
					'5.4.45': 'service php-5.4.45-fpm restart',
					'5.5.38': 'service php-5.5.38-fpm restart',
					'5.6.20': 'service php-5.6.20-fpm restart',
					'7.0.3': 'service php-7.0.3-fpm restart',
					'7.1.4': 'service php-7.1.4-fpm restart'
				}
			};
		}

		_createClass(Container, [{
			key: 'getSitePhpVersion',
			value: function getSitePhpVersion() {
				if (this.sitePhpVersion === undefined) {
					if (this.site.environment === 'flywheel') {
						this.sitePhpVersion = this.exec('find / -name php | grep bin | grep /opt/php | cut -d \'/\' -f 4').trim();
					} else {
						this.sitePhpVersion = this.site.phpVersion;
					}
				}

				return this.sitePhpVersion;
			}
		}, {
			key: 'exec',
			value: function exec(command) {
				if (command.length === 0) {
					throw new ContainerError('exec method should not be invoked with empty command');
				}

				var fullCommand = 'exec -i ' + this.site.container + ' sh -c "' + command + '"';

				return this.docker.runCommand(fullCommand);
			}
		}, {
			key: 'getSitePhpIniFilePath',
			value: function getSitePhpIniFilePath() {
				if (this.sitePhpIniFile === undefined) {
					var phpBin = this.getSitePhpBin();

					var iniFilePath = this.exec(phpBin + ' -r \'echo php_ini_loaded_file();\'');

					if (!iniFilePath) {
						throw new Error('cannot determine the path to PHP ini file');
					}
					this.sitePhpIniFile = iniFilePath;
				}

				return this.sitePhpIniFile;
			}
		}, {
			key: 'getSitePhpBin',
			value: function getSitePhpBin() {
				if (this.sitePhpBin === undefined) {
					var sitePhpVersion = this.getSitePhpVersion();
					var siteEnvironment = this.site.environment;
					var phpBin = null;

					if (siteEnvironment === 'flywheel') {
						// default Flywheel installation, the site.phpVersion variable is not accurate
						phpBin = this.exec('find / -name php | grep bin | grep /opt/php').trim();
					} else {
						// custom installation
						if (!sitePhpVersion) {
							throw new Error('could not find the site PHP version');
						}

						try {
							phpBin = this.exec('find / -name php | grep bin | grep ' + sitePhpVersion).trim();
						} catch (e) {
							throw new Error('could not get the site PHP bin path');
						}
					}

					this.sitePhpBin = phpBin;
				}

				return this.sitePhpBin;
			}
		}, {
			key: 'restartPhpService',
			value: function restartPhpService() {
				var sitePhpVersion = this.getSitePhpVersion();
				if (!this.restartCommandMap[this.site.webServer][sitePhpVersion]) {
					throw new Error('The ' + this.site.webServer + ' and PHP ' + sitePhpVersion + ' configuration is not supported');
				}
				var restartCommand = this.restartCommandMap[this.site.webServer][sitePhpVersion];
				this.exec(restartCommand);
			}
		}, {
			key: 'getXdebugStatus',
			value: function getXdebugStatus() {
				// create the local-phpinfo.php file if it doesn't exist
				this.exec('if [ ! -f /app/public/local-phpinfo.php ]; then echo \'<?php phpinfo();\' > /app/public/local-phpinfo.php; fi');

				return this.exec('if wget -qO- localhost/local-phpinfo.php | grep -q Xdebug; then echo \'active\'; else echo \'inactive\'; fi');
			}
		}, {
			key: 'activateXdebug',
			value: function activateXdebug() {
				var phpIniFile = this.getSitePhpIniFilePath();
				this.exec('sed -i \'/^;zend_extension.*xdebug.so/ s/;zend_ex/zend_ex/\' ' + phpIniFile);
				this.restartPhpService();
			}
		}, {
			key: 'deactivateXdebug',
			value: function deactivateXdebug() {
				var phpIniFile = this.getSitePhpIniFilePath();
				this.exec('sed -i \'/^zend_extension.*xdebug.so/ s/zend_ex/;zend_ex/\' ' + phpIniFile);
				this.restartPhpService();
			}
		}, {
			key: 'readXdebugSetting',
			value: function readXdebugSetting(setting, def) {
				var phpIniFile = this.getSitePhpIniFilePath();
				if (this.xdebugSettingExists(setting)) {
					var command = 'cat ' + phpIniFile + ' | grep ^xdebug.' + setting + ' | cut -d \'=\' -f 2';
					var value = this.exec(command).trim();
					return value !== '' ? value : def;
				}

				return def;
			}
		}, {
			key: 'setXdebugSetting',
			value: function setXdebugSetting(setting, value) {
				var phpIniFile = this.getSitePhpIniFilePath();
				var settingExists = this.xdebugSettingExists(setting);

				if (settingExists) {
					this.exec('sed -i \'/^xdebug.' + setting + '/ s/xdebug.' + setting + '.*/xdebug.' + setting + '=' + value + '/\' ' + phpIniFile);
				} else {
					this.exec('sed -i \'/^zend_extension.*xdebug.so/ s/xdebug.so/xdebug.so\\nxdebug.' + setting + '=' + value + '/\' ' + phpIniFile);
				}
			}
		}, {
			key: 'xdebugSettingExists',
			value: function xdebugSettingExists(setting) {
				var phpIniFile = this.getSitePhpIniFilePath();
				return Boolean(this.exec('if cat ' + phpIniFile + ' | grep -q ^xdebug.' + setting + '; then echo \'true\'; else echo \'false\'; fi'));
			}
		}]);

		return Container;
	}();
};