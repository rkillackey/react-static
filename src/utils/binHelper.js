const updateNotifier = require('update-notifier')
const pkg = require('../../package.json')
const PrettyError = require('pretty-error')

updateNotifier({ pkg }).notify({
  isGlobal: false,
})

// necesarry at any entry point of the cli to ensure that Babel-register
// does not attempt to transform non JavaScript files.
const ignoredExtensions = [
  'css',
  'scss',
  'styl',
  'less',
  'png',
  'gif',
  'jpg',
  'jpeg',
  'svg',
  'woff',
  'woff2',
  'ttf',
  'eot',
  'otf',
  'mp4',
  'webm',
  'ogg',
  'mp3',
  'wav',
  'md',
  'yaml',
]
ignoredExtensions.forEach(ext => {
  require.extensions[`.${ext}`] = () => {}
})

console.error = (err, ...rest) => console.log(new PrettyError().render(err), ...rest)

// Be sure to log useful information about unhandled exceptions. This should seriously
// be a default: https://github.com/nodejs/node/issues/9523#issuecomment-259303079
process.on('unhandledRejection', r => {
  console.error(r)
})
