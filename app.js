const express = require('express')

const app = express()
const port = process.env.PORT || 3000

let ip, os, lang

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

  if (req.headers['x-forwarded-for']){
    ip = req.headers['x-forwarded-for'].split(',')[0]
  } else {
    ip = req.connection.remoteAddress
  }
  os = req.headers['user-agent'].match(/\([^\)]*\)/)[0].slice(1, -1)
  lang = req.headers['accept-language'].split(',')[0]

  next();
})

app.get('/', (req, res, next) => {
  res.type('json').status(200)
  res.send(JSON.stringify({ipaddress: ip, language: lang, software: os}))
})

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.message)
  console.error(err.stack)
  res.status(500)
  res.send(`Error: ${err.message}`)
})

// All Middleware functions and routes exhausted, respond with 404
app.use(function (req, res, next) {
  res.status(404).send("404 Page Not Found")
})

const server = app.listen(port, () => {
  console.log(`Server started on port ${port}.`)
})