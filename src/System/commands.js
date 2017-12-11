module.exports = {
	phpErrorLogPath: ( phpVersion ) => `/opt/php/${phpVersion}/bin/php -i | grep ^error_log | sed 's/^.*\\s//g'`,
	phpErrorLogTail: ( phpVersion, lines = 30 ) => `tail -n${lines} $(/opt/php/${phpVersion}/bin/php -i | grep ^error_log | sed 's/^.*\\s//g')`,
}