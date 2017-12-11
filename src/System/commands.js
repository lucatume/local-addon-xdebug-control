module.exports = {
	tail: ( what, lines = 30 ) => {
		return `tail -n${lines} ${what}`
	},
	silence: ( command ) => {
		return `${command} >/dev/null 2>&1`
	},
	phpErrorLogPath: ( phpVersion ) => {
		return [`/opt/php/${phpVersion}/bin/php -i | grep ^error_log | sed 's/^.*\\s//g'`]
	},
	phpErrorLogTail: ( phpVersion, lines = 30 ) => {
		return [module.exports.tail( `$(/opt/php/${phpVersion}/bin/php -i | grep ^error_log | sed 's/^.*\\s//g')`, lines )]
	},
	xdebugRemoteHostSet: ( iniFile ) => {
		// the host machine IP address, in respect to the container, is the one assigned to the `eth0` interface
		const remoteHostVarCommand = `export REMOTE_HOST=$(ifconfig eth0 | grep 'inet addr:' | cut -d: -f2 | awk '{print $1}')`
		const updateCommand = xdebugSettingUpdate( iniFile, 'remote_host', '$REMOTE_HOST' )

		return [`${remoteHostVarCommand} && ${updateCommand}`]
	},
	xdebugStatusRead: () => {
		return [
			`if [ ! -f /app/public/local-phpinfo.php ]; then echo '<?php phpinfo();' > /app/public/local-phpinfo.php; fi`,
			`if wget -qO- localhost/local-phpinfo.php | grep -q Xdebug; then echo 'active'; else echo 'inactive'; fi`,
		]
	},
	xdebugSettingRead: ( iniFile, setting ) => {
		return [`if cat ${iniFile} | grep -q ^xdebug.${setting}; then cat ${iniFile} | grep ^xdebug.${setting} | cut -d '=' -f 2; else echo 'false'; fi`]
	},
	xdebugSettingUpdate: ( iniFile, setting, value ) => {
		const updateIt = `sed -i "/^xdebug.${setting}/ s/xdebug.${setting}.*/xdebug.${setting}=${value}/" ${iniFile}`
		const createIt = `sed -i "/^zend_extension.*xdebug.so/ s/xdebug.so/xdebug.so\\nxdebug.${setting}=${value}/" ${iniFile}`

		return [module.exports.silence( `if cat ${iniFile} | grep -q ^xdebug.${setting}; then ${updateIt}; else ${createIt}; fi` )]
	},
	xdebugReadStatusAndSettings: ( iniFile, settings ) => {
		const settingsReadCommands = settings.map( ( setting ) => {
			return xdebugSettingRead( iniFile, setting )
		} )
		// when reading the XDebug status also set the remote_host setting from environment
		return settingsReadCommands.concat( xdebugStatusRead ).concat( module.exports.silence( remoteHostSetCommand( iniFile ) ) )
	},
}