// Require the framework and instantiate it
const package = require('./package.json')
const path = require('path')

const cmdTable = {
  'scrollUp': 'xdotool click 5',
  'scrollDown': 'xdotool click 4',
  'volumeUp': 'xdotool key XF86AudioRaiseVolume',
  'volumeDown': 'xdotool key XF86AudioLowerVolume'
}

const msgTable = {
  'scrollUp': {
    ok: 'scrollUp ok',
    fail: 'scrollUp fail!'
  },
  'scrollDown': {
    ok: 'scrollDown ok',
    fail: 'scrollDown fail!'
  },
  'volumeUp': {
    ok: 'volumeUp ok',
    fail: 'volumeUp fail!'
  },
  'volumeDown': {
    ok: 'volumeDown ok',
    fail: 'volumeDown fail!'
  }
}

const fastify = require('fastify')({
  logger: true
})

fastify.get('/version', (request, reply) => {
  return { version: package.version }
})

fastify.post('/:cmd', async (request, reply) => {
  const exec = require('child_process').exec;
  const cmdName = request.params.cmd
  const command = cmdTable[cmdName]
  if (!cmdName || !command) return { error: 'invalid command'}
  exec(command, function callback(error, stdout, stderr) {
    if (error) {
      reply.send({ command: msgTable[cmdName].fail })
    } else {
      reply.send({ command: msgTable[cmdName].ok })
    }
  });
})

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'public'),
})

// Run the server!
fastify.listen(3000, '0.0.0.0', function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})
