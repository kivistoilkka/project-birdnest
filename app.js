const express = require('express')

const app = express()

app.get('/', (req, res) => {
  return res.json({ 'Hello world': 'Hello' })
})

module.exports = app
