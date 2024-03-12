// require your server and launch it here

const server = require('./api/server')

server.listen('8000', (req, res) => {
    console.log('Server listening on 8000')
})