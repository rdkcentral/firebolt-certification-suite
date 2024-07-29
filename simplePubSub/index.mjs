import * as server from './server.mjs'
server.startServer(process.argv.length >=3 && process.argv[2] ? process.argv[2] : 8080);