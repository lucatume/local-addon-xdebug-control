'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Actions = require('./../reducers/actions');
var outputToArray = require('./../Utils/Output').toArray;

module.exports = function () {
	var DockerError = require('./../Errors/DockerError')();
	var containerExec = require('dockerode-utils').containerExec;

	return function () {
		function Docker(dockerode, store) {
			_classCallCheck(this, Docker);

			this.dockerode = dockerode;
			this.store = store;
		}

		_createClass(Docker, [{
			key: 'runCommand',
			value: function runCommand(command, containerUuid, callback) {
				if (command.length === 0) {
					throw new DockerError('runCommand method should not be invoked with empty command');
				}

				var container = this.dockerode.getContainer(containerUuid);

				var fullCommand = ['sh', '-c', command];
				var that = this;

				this.store.dispatch({ type: Actions.docker.IS_LOADING });

				containerExec(container, fullCommand).then(function (message) {
					var output = message.length > 0 ? outputToArray(message) : [];
					var action = { type: Actions.docker.GOT_OUTPUT, output: output };

					if (callback) {
						action = callback(action, output);
					}

					that.store.dispatch(action);
				}, function (reason) {
					that.store.dispatch({ type: Actions.docker.GOT_ERROR, error: JSON.stringify(reason) });
				});
			}
		}]);

		return Docker;
	}();
};