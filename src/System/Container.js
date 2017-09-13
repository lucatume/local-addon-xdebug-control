module.exports = function ( context ) {
	const childProcess = require( 'child_process' )
	const Docker = require( './Docker' )( context )

	return class Container {
		constructor( docker, site ) {
			this.docker = docker
			this.site = site
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

		exec( command ) {
			let dockerPath = Docker.getDockerPath()
			let fullCommand = `${dockerPath} exec ${this.site.container} ` + command

			let output = childProcess.execSync( fullCommand, {env: context.environment.dockerEnv} ).toString()

			return output
		}

		getSitePhpIniFilePath() {
			let phpBin = this.getSitePhpBin()

			let iniFilePath = this.exec( `${phpBin} -r "echo php_ini_loaded_file();"` )

			if ( ! iniFilePath ) {
				throw new Error( 'cannot determine the path to PHP ini file' )
			}

			return iniFilePath
		}

		getSitePhpBin() {
			let sitePhpVersion = this.site.phpVersion

			if ( ! sitePhpVersion ) {
				throw new Error( 'could not find the site PHP version' )
			}

			let installedPhpVersions = this.exec( 'find / -name php | grep bin' )

			if ( ! installedPhpVersions ) {
				throw new Error( `could not get the PHP versions installed on the site` )
			}

			installedPhpVersions = installedPhpVersions.split( /\r\n|\r|\n/g )

			let sitePhpBins = installedPhpVersions.filter( function ( phpVersion ) {
				return phpVersion.match( `/.*${sitePhpVersion}.*/` )
			} )

			if ( ! sitePhpBins || ! sitePhpBins[0] ) {
				throw new Error( 'non PHP executable matching the site PHP version was found' )
			}

			return sitePhpBins[0]
		}

		restartPhpService() {
			if ( ! this.restartCommandMap[this.site.webServer][this.site.phpVersion] ) {
				throw new Error( `The ${this.site.webServer} and PHP ${this.site.phpVersion} configuration is not supported` )
			}
			let restartCommand = this.restartCommandMap[this.site.webServer][this.site.phpVersion]
			this.exec( restartCommand )
		}

		getXdebugStatus() {
			let phpVersionEntry = this.exec( `wget -qO- localhost/local-phpinfo.php` )
			return phpVersionEntry.match( /Xdebug/ )
				? 'active'
				: 'inactive'
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
	}
}