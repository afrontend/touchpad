// Require the framework and instantiate it
const exec = require('child_process').exec;

const fastify = require('fastify')({
  logger: true
})

const package = require('./package.json')

// Declare a route
fastify.get('/', function (request, reply) {
  reply.send({ hello: `touchpad server! (${package.version})` })
})

fastify.post('/scrollUp', async (request, reply) => {
  exec('xdotool click 5', function callback(error, stdout, stderr) {
    if (error) {
      reply.send({ hello: 'scrollUp fail!' })
    } else {
      reply.send({ hello: 'scrollUp ok!' })
    }
  });
})

// Run the server!
fastify.listen(3000, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})
