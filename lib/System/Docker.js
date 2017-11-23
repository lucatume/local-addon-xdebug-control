'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
	var DockerError = require('./../Errors/DockerError')();
	var containerExec = require('dockerode-utils').containerExec;

	return function () {
		function Docker(dockerode) {
			_classCallCheck(this, Docker);

			this.dockerode = dockerode;
		}

		_createClass(Docker, [{
			key: 'runCommand',
			value: function runCommand(command, containerUuid) {
				if (command.length === 0) {
					throw new DockerError('runCommand method should not be invoked with empty command');
				}

				var container = this.dockerode.getContainer(containerUuid);

				// @todo store this Redux state
				var fullCommand = ['sh', '-c', command];
				return containerExec(container, fullCommand).then(function (message) {
					console.log(message);
				});
			}
		}]);

		return Docker;
	}();
};