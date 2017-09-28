module.exports = function () {
	const ContainerError = require( './../Errors/ContainerError' )()

	return class Container {
		constructor( docker, site ) {
			this.docker = docker

			if ( site.container === undefined ) {
				throw new ContainerError( 'site.container information must be defined' )
			}

			this.site = site
			this.sitePhpBin = undefined
			this.sitePhpIniFile = undefined
			this.sitePhpVersion = undefined
			this.restartCommandMap = {
				'apache': {
					'5.2.4': `service apache2 restart`,
					'5.2.17': `service apache2 restart`,
					'5.3.29': `service php-5.3.29-fpm restart`,
					'5.4.45': `service php-5.4.45-fpm restart`,
					'5.5.38': `service php-5.5.38-fpm restart`,
					'5.6.20': `service php-5.6.20-fpm restart`,
					'7.0.3': `service php-7.0.3-fpm restart`,
					'7.1.4': `service php-7.1.4-fpm restart`,
				},
				'nginx': {
					'5.2.4': `service php-5.2.4-fpm restart`,
					'5.2.17': `service php-5.2.17-fpm restart`,
					'5.3.29': `service php-5.3.29-fpm restart`,
					'5.4.45': `service php-5.4.45-fpm restart`,
					'5.5.38': `service php-5.5.38-fpm restart`,
					'5.6.20': `service php-5.6.20-fpm restart`,
					'7.0.3': `service php-7.0.3-fpm restart`,
					'7.1.4': `service php-7.1.4-fpm restart`,
				},
			}
		}

		getSitePhpVersion() {
			if ( this.sitePhpVersion === undefined ) {
				if ( this.site.environment === 'flywheel' ) {
					this.sitePhpVersion = this.exec( `find / -name php | grep bin | grep /opt/php | cut -d '/' -f 4` ).trim()
				} else {
					this.sitePhpVersion = this.site.phpVersion
				}
			}

			return this.sitePhpVersion
		}

		exec( command ) {
			if ( command.length === 0 ) {
				throw new ContainerError( 'exec method should not be invoked with empty command' )
			}

			let fullCommand = `exec -i ${this.site.container} sh -c "${command}"`

			return this.docker.runCommand( fullCommand )
		}

		getSitePhpIniFilePath() {
			if ( this.sitePhpIniFile === undefined ) {
				let phpBin = this.getSitePhpBin()

				let iniFilePath = this.exec( `${phpBin} -r 'echo php_ini_loaded_file();'` )

				if ( ! iniFilePath ) {
					throw new Error( 'cannot determine the path to PHP ini file' )
				}
				this.sitePhpIniFile = iniFilePath
			}

			return this.sitePhpIniFile
		}

		getSitePhpBin() {
			if ( this.sitePhpBin === undefined ) {
				let sitePhpVersion = this.getSitePhpVersion()
				let siteEnvironment = this.site.environment
				let phpBin = null

				if ( siteEnvironment === 'flywheel' ) {
					// default Flywheel installation, the site.phpVersion variable is not accurate
					phpBin = this.exec( `find / -name php | grep bin | grep /opt/php` ).trim()
				} else {
					// custom installation
					if ( ! sitePhpVersion ) {
						throw new Error( 'could not find the site PHP version' )
					}

					try {
						phpBin = this.exec( `find / -name php | grep bin | grep ${sitePhpVersion}` ).trim()
					}
					catch ( e ) {
						throw new Error( 'could not get the site PHP bin path' )
					}
				}

				this.sitePhpBin = phpBin
			}

			return this.sitePhpBin
		}

		restartPhpService() {
			let sitePhpVersion = this.getSitePhpVersion()
			if ( ! this.restartCommandMap[this.site.webServer][sitePhpVersion] ) {
				throw new Error( `The ${this.site.webServer} and PHP ${sitePhpVersion} configuration is not supported` )
			}
			let restartCommand = this.restartCommandMap[this.site.webServer][sitePhpVersion]
			this.exec( restartCommand )
		}

		getXdebugStatus() {
			// create the local-phpinfo.php file if it doesn't exist
			this.exec(`if [ ! -f /app/public/local-phpinfo.php ]; then echo '<?php phpinfo();' > /app/public/local-phpinfo.php; fi`)

			let status = this.exec( `wget -qO- localhost/local-phpinfo.php | grep Xdebug` )

			return status.length !== 0 ? 'active' : 'inactive'
		}

		activateXdebug() {
			let phpIniFile = this.getSitePhpIniFilePath()
			this.exec( `sed -i '/^;zend_extension.*xdebug.so/ s/;zend_ex/zend_ex/' ${phpIniFile}` )
			this.restartPhpService()
		}

		deactivateXdebug() {
			let phpIniFile = this.getSitePhpIniFilePath()
			this.exec( `sed -i '/^zend_extension.*xdebug.so/ s/zend_ex/;zend_ex/' ${phpIniFile}` )
			this.restartPhpService()
		}

		readXdebugSetting( setting, def ) {
			let phpIniFile = this.getSitePhpIniFilePath()
			try {
				let command = `cat ${phpIniFile} | grep ^xdebug.${setting} | cut -d '=' -f 2`
				let value = this.exec( command ).trim()
				return value !== '' ? value : def
			}
			catch ( e ) {
				return def

			}
		}

		setXdebugSetting( setting, value ) {
			let phpIniFile = this.getSitePhpIniFilePath()
			let settingExists = true
			try {
				this.exec( `cat ${phpIniFile} | grep ^xdebug.${setting}` )
			}
			catch ( e ) {
				settingExists = false
			}

			try {
				if ( settingExists ) {
					this.exec( `sed -i '/^xdebug.${setting}/ s/xdebug.${setting}.*/xdebug.${setting}=${value}/' ${phpIniFile}` )
				}
				else {
					this.exec( `sed -i '/^zend_extension.*xdebug.so/ s/xdebug.so/xdebug.so\\nxdebug.${setting}=${value}/' ${phpIniFile}` )
				}
			}
			catch ( e ) {
				// let's move on
			}
		}
	}
}