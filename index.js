// Require the framework and instantiate it
const package = require('./package.json')
const path = require('path')
const exec = require('child_process').exec;

const fastify = require('fastify')({
  logger: true
})

fastify.get('/version', async (request, reply) => {
  return { version: package.version }
})

fastify.post('/scrollUp', async (request, reply) => {
  exec('xdotool click 5', function callback(error, stdout, stderr) {
    if (error) {
      reply.send({ scroll: 'scrollUp fail!' })
    } else {
      reply.send({ scroll: 'scrollUp ok!' })
    }
  });
})

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'public'),
})

// Run the server!
fastify.listen(3000, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})
