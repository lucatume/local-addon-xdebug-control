'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
	var DockerError = require('./../Errors/DockerError')();

	return function () {
		function Docker(environment, childProcess) {
			_classCallCheck(this, Docker);

			if (undefined === environment.dockerPath || undefined === environment.dockerEnv) {
				throw new DockerError('Docker path and/or env are not set!');
			}

			this.dockerPath = environment.dockerPath;
			this.dockerEnv = environment.dockerEnv;
			this.childProcess = childProcess;
		}

		_createClass(Docker, [{
			key: 'getDockerPath',
			value: function getDockerPath() {
				return this.dockerPath.replace(/ /g, '\\ ');
			}
		}, {
			key: 'runCommand',
			value: function runCommand(command) {
				if (command.length === 0) {
					throw new DockerError('runCommand method should not be invoked with empty command');
				}

				var dockerPath = this.getDockerPath();
				var fullCommand = dockerPath + ' ' + command;

				try {
					return this.childProcess.execSync(fullCommand, { env: this.dockerEnv }).toString().trim();
				} catch (e) {
					throw new DockerError(e.message);
				}
			}
		}]);

		return Docker;
	}();
};