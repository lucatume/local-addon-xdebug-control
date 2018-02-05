publish:
	npm install --only production
	npm run-script build
	git add -A
	git add -f node_modules

dev:
	mv node_modules-backup node-modules
