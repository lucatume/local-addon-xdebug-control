'use strict';

module.exports = {
	restartCommand: function restartCommand(phpVersion, webServer) {
		var map = {
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

		return map.hasOwnProperty(webServer) && map[webServer].hasOwnProperty(phpVersion) ? map[webServer][phpVersion] : false;
	},
	// /conf/php/5.2.4/php.ini
	iniFile: function iniFile(phpVersion) {
		var map = {
			'5.2.4': '/opt/php/5.2.4/bin/php',
			'5.2.17': '/opt/php/5.2.17/bin/php',
			'5.3.29': '/opt/php/5.3.29/bin/php',
			'5.4.45': '/opt/php/5.4.45/bin/php',
			'5.5.38': '/opt/php/5.5.38/bin/php',
			'5.6.20': '/opt/php/5.6.20/bin/php',
			'7.0.3': '/opt/php/7.0.3/bin/php',
			'7.1.4': '/opt/php/7.1.4/bin/php'
		};
	},
	bin: function bin(phpVersion) {
		var map = {
			'5.2.4': '/opt/php/5.2.4/bin/php',
			'5.2.17': '/opt/php/5.2.17/bin/php',
			'5.3.29': '/opt/php/5.3.29/bin/php',
			'5.4.45': '/opt/php/5.4.45/bin/php',
			'5.5.38': '/opt/php/5.5.38/bin/php',
			'5.6.20': '/opt/php/5.6.20/bin/php',
			'7.0.3': '/opt/php/7.0.3/bin/php',
			'7.1.4': '/opt/php/7.1.4/bin/php'
		};

		return map.hasOwnProperty(phpVersion) ? map.phpVersion : false;
	}
};