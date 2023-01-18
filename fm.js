const forever = require('forever-monitor')

const child = new forever.Monitor('./index.js', {
  uid: 'project-birdnest-app',
  append: true,
  args: [],
})

child.on('restart', function () {
  console.error(
    new Date(),
    'Forever restarting script for ' + child.times + ' time'
  )
})

child.start()
