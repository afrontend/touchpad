// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true
})

const package = require('./package.json')

// Declare a route
fastify.get('/', function (request, reply) {
  reply.send({ hello: `touchpad server! (${package.version})` })
})

// Run the server!
fastify.listen(3000, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})
