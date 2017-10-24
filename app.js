const express = require('express')

const app = express()
const port = process.env.PORT || 3000

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next();
})

app.get('/', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || 
  req.connection.remoteAddress || 
  req.socket.remoteAddress ||
  req.connection.socket.remoteAddress
  
  res.send(ip)
})

const server = app.listen(port, () => {
  console.log(`Server started on port ${port}.`)
})