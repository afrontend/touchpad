// Require the framework and instantiate it
const package = require('./package.json')
const path = require('path')
const execFile = require('child_process').execFile;

const cmdTable = {
  'move': {
    file: 'xdotool',
    options: ['mousemove_relative', '--']
  },
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
  'move': {
    ok: 'move ok',
    fail: 'move fail!'
  },
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
  const { x, y } = request.body
  const command = cmdTable[cmdName]
  if (!cmdName || !command) return { error: 'invalid command'}
  const options = []
  if (x && y) {
    options.push(command.options[0])
    options.push(command.options[1])
    options.push(x)
    options.push(y)
    console.log(x, y, options)
  } else {
    options = command.options
  }

  execFile(command.file, options, function callback(error, stdout, stderr) {
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
