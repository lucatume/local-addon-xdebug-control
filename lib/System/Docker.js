'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function (context) {
	var childProcess = require('child_process');

	return function () {
		function Docker() {
			_classCallCheck(this, Docker);
		}

		_createClass(Docker, null, [{
			key: 'getDockerPath',
			value: function getDockerPath() {
				return context.environment.dockerPath.replace(/ /g, '\\ ');
			}
		}, {
			key: 'runCommand',
			value: function runCommand(command) {
				var dockerPath = Docker.getDockerPath();
				var fullCommand = dockerPath + ' ' + command;

				return childProcess.execSync(fullCommand, { env: context.environment.dockerEnv }).toString().trim();
			}
		}]);

		return Docker;
	}();
};