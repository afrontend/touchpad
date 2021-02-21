// Require the framework and instantiate it
const package = require('./package.json')
const path = require('path')
const execFile = require('child_process').execFile;

const cmdTable = {
  'scrollUp': {
    file: 'xdotool',
    options: ['click', '5']
  },
  'scrollDown': {
    file: 'xdotool',
    options: ['click', '4']
  },
  'volumeUp': {
    file: 'xdotool',
    options: ['key', 'XF86AudioRaiseVolume']
  },
  'volumeDown': {
    file: 'xdotool',
    options: ['key', 'XF86AudioLowerVolume']
  },
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
  logger: process.env.LOCAL
})

fastify.get('/version', (request, reply) => {
  return { version: package.version }
})

fastify.post('/:cmd', async (request, reply) => {
  const cmdName = request.params.cmd
  const command = cmdTable[cmdName]
  if (!cmdName || !command) return { error: 'invalid command'}
  execFile(command.file, command.options, function callback(error, stdout, stderr) {
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
