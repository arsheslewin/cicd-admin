install:
	git pull
	yarn
	yarn build
	npm install -g serve
	pm2 serve build 3001 --spa --name admin
build-source:
	git pull
	yarn 
	yarn build
	pm2 restart admin
