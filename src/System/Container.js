module.exports = function () {
	const ContainerError = require( './../Errors/ContainerError' )()

	return class Container {
		constructor( docker, site, maps ) {
			if ( ! site.container ) {
				throw new ContainerError( 'The site docker UUID is missing' )
			}

			this.docker = docker
			this.containerUUId = site.container
			this.phpVersion = site.phpVersion
			this.webServer = site.webServer
			this.environment = site.environment
			this.maps = maps
		}

		getSitePhpVersion() {
			return this.phpVersion
		}

		getSitePhpIniFilePath() {
			return this.maps.phpIniFile( this.phpVersion )
		}

		getSitePhpBin() {
			return this.maps.phpBin( this.phpVersion )
		}

		exec( commands, updatingObject = null, updatingKey = null ) {
			if ( commands.length === 0 ) {
				throw new ContainerError( 'exec method should not be invoked with empty command(s)' )
			}

			if ( ! Array.isArray( commands ) ) {
				commands = [commands]
			}

			commands = commands.filter( function ( command ) {
				return command.trim().length > 0
			} )

			const fullCommand = commands.join( ' && ' )

			return this.docker.runCommand( fullCommand, this.containerUUId, updatingObject, updatingKey )
		}

		updateXdebugStatus() {
			// create the local-phpinfo.php file if it doesn't exist
			this.exec( this.getXdebugStatusCommands(), 'xdebug', 'status' )
		}

		getXdebugStatusCommands() {
			return [
				`if [ ! -f /app/public/local-phpinfo.php ]; then echo '<?php phpinfo();' > /app/public/local-phpinfo.php; fi`,
				`if wget -qO- localhost/local-phpinfo.php | grep -q Xdebug; then echo 'active'; else echo 'inactive'; fi`,
			]
		}

		activateXdebug() {
			const phpIniFile = this.getSitePhpIniFilePath()
			const commands = [
				`sed -i '/^;zend_extension.*xdebug.so/ s/;zend_ex/zend_ex/' ${phpIniFile}`,
				this.getPhpRestartCommand(),
			].concat( this.getXdebugStatusCommands() )

			this.exec( commands, 'xdebug', 'status' )
		}

		deactivateXdebug() {
			const phpIniFile = this.getSitePhpIniFilePath()
			const commands = [
				`sed -i '/^zend_extension.*xdebug.so/ s/zend_ex/;zend_ex/' ${phpIniFile}`,
				this.getPhpRestartCommand(),
			].concat( this.getXdebugStatusCommands() )

			this.exec( commands, 'xdebug', 'status' )
		}

		restartPhpService() {
			this.exec( this.getPhpRestartCommand(), 'xdebug', 'status' )
		}

		getPhpRestartCommand() {
			const restartCommand = this.maps.phpRestartCommand( this.phpVersion, this.webServer )

			if ( ! restartCommand ) {
				throw new ContainerError( `The ${this.webServer} and PHP ${this.sitePhpVersion} configuration is not supported` )
			}

			return restartCommand
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
	}
}