const forever = require('forever-monitor')

const child = new forever.Monitor('./index.js', {
  uid: 'project-birdnest-app',
  //max: 3,
  //silent: true,
  append: true,
  // logFile: './logs/forever.log',
  // outFile: './logs/out.log',
  // errFile: './logs/error.log',
  args: [],
})

// child.on('exit', () => {
//   console.log('index.js has exited after 3 restarts')
// })

child.on('restart', function () {
  console.error(
    new Date(),
    'Forever restarting script for ' + child.times + ' time'
  )
})

child.start()
