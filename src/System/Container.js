const silenceCommand = require( './../Utils/Output' ).silence
const arrayCombine = require( './../Utils/Array' ).arrayCombine
const ContainerError = require( './../Errors/ContainerError' )()
const xdebug = require( './../Data/XDebug' )

module.exports = function () {

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

		execAndSet( commands, updatingObject, updatingKeys ) {
			const callback = function ( action, output ) {
				if ( updatingObject && updatingKeys ) {
					if ( output.length === 0 ) {
						throw new ContainerError(
							`Trying to update "${updatingObject}" with keys ${JSON.stringify( updatingKeys )} but got empty output.` )
					}

					updatingKeys = Array.isArray( updatingKeys ) ? updatingKeys : [updatingKeys]
					action[updatingObject] = arrayCombine( updatingKeys, output )
				}

				return action
			}
			return this.docker.runCommand( this.concatCommands( commands ), this.containerUUId, callback )
		}

		concatCommands( commands ) {
			if ( commands.length === 0 ) {
				throw new ContainerError( 'execAndSet method should not be invoked with empty command(s)' )
			}

			if ( ! Array.isArray( commands ) ) {
				commands = [commands]
			}

			commands = commands.filter( function ( command ) {
				return command.trim().length > 0
			} )

			const fullCommand = commands.join( ' && ' )
			return fullCommand
		}

		exec( commands ) {
			return this.docker.runCommand( this.concatCommands( commands ), this.containerUUId )
		}

		readXDebugSettingCommand( setting ) {
			const iniFile = this.maps.phpIniFile( this.phpVersion )
			return `if cat ${iniFile} | grep -q ^xdebug.${setting}; then cat ${iniFile} | grep ^xdebug.${setting} | cut -d '=' -f 2; else echo 'false'; fi`
		}

		updateXdebugStatus() {
			const settings = Object.keys( xdebug.settings() )
			const settingsReadCommands = settings.map( this.readXDebugSettingCommand.bind( this ) )
			const commands = settingsReadCommands.concat( this.getXdebugStatusCommands() )
			this.execAndSet( commands, 'xdebug', settings.concat( ['status'] ) )
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
				silenceCommand( this.getPhpRestartCommand() ),
			].concat( this.getXdebugStatusCommands() )

			this.execAndSet( commands, 'xdebug', 'status' )
		}

		deactivateXdebug() {
			const phpIniFile = this.getSitePhpIniFilePath()
			const commands = [
				`sed -i '/^zend_extension.*xdebug.so/ s/zend_ex/;zend_ex/' ${phpIniFile}`,
				silenceCommand( this.getPhpRestartCommand() ),
			].concat( this.getXdebugStatusCommands() )

			this.execAndSet( commands, 'xdebug', 'status' )
		}

		restartPhpService() {
			this.exec( silenceCommand( this.getPhpRestartCommand() ) )
		}

		getPhpRestartCommand() {
			const restartCommand = this.maps.phpRestartCommand( this.phpVersion, this.webServer )

			if ( ! restartCommand ) {
				throw new ContainerError( `The ${this.webServer} and PHP ${this.phpVersion} configuration is not supported` )
			}

			return restartCommand
		}

		applyXdebugSettings(settings){

		}

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
	}
}