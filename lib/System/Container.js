'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function (context) {
	var childProcess = require('child_process');
	var Docker = require('./Docker')(context);

	return function () {
		function Container(docker, site) {
			_classCallCheck(this, Container);

			this.docker = docker;
			this.site = site;
			this.sitePhpBin = undefined;
			this.sitePhpIniFile = undefined;
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
			key: 'exec',
			value: function exec(command) {
				var dockerPath = Docker.getDockerPath();
				var fullCommand = dockerPath + ' exec -i ' + this.site.container + ' sh -c \'' + command + '\'';

				var output = childProcess.execSync(fullCommand, { env: context.environment.dockerEnv }).toString();

				return output;
			}
		}, {
			key: 'getSitePhpIniFilePath',
			value: function getSitePhpIniFilePath() {
				if (this.sitePhpIniFile === undefined) {
					var phpBin = this.getSitePhpBin();

					var iniFilePath = this.exec(phpBin + ' -r "echo php_ini_loaded_file();"');

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
					var sitePhpVersion = this.site.phpVersion;
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
				if (!this.restartCommandMap[this.site.webServer][this.site.phpVersion]) {
					throw new Error('The ' + this.site.webServer + ' and PHP ' + this.site.phpVersion + ' configuration is not supported');
				}
				var restartCommand = this.restartCommandMap[this.site.webServer][this.site.phpVersion];
				this.exec(restartCommand);
			}
		}, {
			key: 'getXdebugStatus',
			value: function getXdebugStatus() {
				try {
					this.exec('wget -qO- localhost/local-phpinfo.php | grep Xdebug');
					return 'active';
				} catch (e) {
					return 'inactive';
				}
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
				try {
					var command = 'cat ' + phpIniFile + ' | grep ^xdebug.' + setting + ' | cut -d \'=\' -f 2';
					var value = this.exec(command).trim();
					return value !== '' ? value : def;
				} catch (e) {
					return def;
				}
			}
		}, {
			key: 'setXdebugSetting',
			value: function setXdebugSetting(setting, value) {
				var phpIniFile = this.sitePhpIniFile;
				var settingExists = true;
				try {
					this.exec('cat ' + phpIniFile + ' | grep ^xdebug.' + setting);
				} catch (e) {
					settingExists = false;
				}

				try {
					if (settingExists) {
						this.exec('sed -i \'/^xdebug.' + setting + '/ s/xdebug.' + setting + '.*/xdebug.' + setting + '=' + value + '/\' ' + phpIniFile);
					} else {
						this.exec('sed -i \'/^zend_extension.*xdebug.so/ s/xdebug.so/xdebug.so\\nxdebug.' + setting + '=' + value + '/\' ' + phpIniFile);
					}
				} catch (e) {
					// let's move on
				}
			}
		}]);

		return Container;
	}();
};