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

		xdebugSettingReadCommand( setting ) {
			const iniFile = this.maps.phpIniFile( this.phpVersion )
			return `if cat ${iniFile} | grep -q ^xdebug.${setting}; then cat ${iniFile} | grep ^xdebug.${setting} | cut -d '=' -f 2; else echo 'false'; fi`
		}

		xdebugSettingUpdateCommand( setting, value ) {
			const iniFile = this.maps.phpIniFile( this.phpVersion )
			const updateIt = `sed -i "/^xdebug.${setting}/ s/xdebug.${setting}.*/xdebug.${setting}=${value}/" ${iniFile}`
			const createIt = `sed -i "/^zend_extension.*xdebug.so/ s/xdebug.so/xdebug.so\\nxdebug.${setting}=${value}/" ${iniFile}`

			return silenceCommand( `if cat ${iniFile} | grep -q ^xdebug.${setting}; then ${updateIt}; else ${createIt}; fi` )
		}

		readXdebugStatusAndSettings() {
			const commands = this.xdebugReadStatusAndSettingsCommands()
			const settings = Object.keys( xdebug.settings() )
			this.execAndSet( commands, 'xdebug', settings.concat( ['status'] ) )
		}

		xdebugReadStatusAndSettingsCommands() {
			const settings = Object.keys( xdebug.settings() )
			const settingsReadCommands = settings.map( this.xdebugSettingReadCommand.bind( this ) )
			// when reading the XDebug status also set the remote_host setting from environment
			return settingsReadCommands.concat( this.xdebugStatusReadCommand() ).concat( silenceCommand( this.remoteHostSetCommand() ) )
		}

		xdebugStatusReadCommand() {
			return [
				`if [ ! -f /app/public/local-phpinfo.php ]; then echo '<?php phpinfo();' > /app/public/local-phpinfo.php; fi`,
				`if wget -qO- localhost/local-phpinfo.php | grep -q Xdebug; then echo 'active'; else echo 'inactive'; fi`,
			]
		}

		activateXdebug() {
			const phpIniFile = this.getSitePhpIniFilePath()
			const commands = [
				`sed -i '/^;zend_extension.*xdebug.so/ s/;zend_ex/zend_ex/' ${phpIniFile}`,
				silenceCommand( this.phpRestartCommand() ),
			].concat( this.xdebugReadStatusAndSettingsCommands() )

			const settings = Object.keys( xdebug.settings() )
			this.execAndSet( commands, 'xdebug', settings.concat( ['status'] ) )
		}

		deactivateXdebug() {
			const phpIniFile = this.getSitePhpIniFilePath()
			const commands = [
				`sed -i '/^zend_extension.*xdebug.so/ s/zend_ex/;zend_ex/' ${phpIniFile}`,
				silenceCommand( this.phpRestartCommand() ),
			].concat( this.xdebugReadStatusAndSettingsCommands() )

			const settings = Object.keys( xdebug.settings() )
			this.execAndSet( commands, 'xdebug', settings.concat( ['status'] ) )
		}

		restartPhpService() {
			this.exec( silenceCommand( this.phpRestartCommand() ) )
		}

		phpRestartCommand() {
			const restartCommand = this.maps.phpRestartCommand( this.phpVersion, this.webServer )

			if ( ! restartCommand ) {
				throw new ContainerError( `The ${this.webServer} and PHP ${this.phpVersion} configuration is not supported` )
			}

			return restartCommand
		}

		applyXdebugSettings( settings ) {
			let settingsUpdateCommands = []

			for ( let key in settings ) {
				settingsUpdateCommands.push( this.xdebugSettingUpdateCommand( key, settings[key] ) )
			}

			const settingsKeys = Object.keys( settings )
			const settingsReadCommands = settingsKeys.map( this.xdebugSettingReadCommand.bind( this ) )

			const commands = settingsUpdateCommands.concat( settingsReadCommands ).
			                                        concat( this.xdebugStatusReadCommand() )
			commands.push( silenceCommand( this.phpRestartCommand() ) )

			this.execAndSet( commands, 'xdebug', settingsKeys.concat( ['status'] ) )
		}

		remoteHostSetCommand() {
			const remoteHostVarCommand = `export REMOTE_HOST=$(ifconfig eth1 | grep 'inet addr:' | cut -d: -f2 | awk '{print $1}')`
			const updateCommand = this.xdebugSettingUpdateCommand( 'remote_host', '$REMOTE_HOST' )

			return `${remoteHostVarCommand} && ${updateCommand}`
		}
	}
}
