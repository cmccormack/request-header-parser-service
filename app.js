const express = require('express')

const app = express()
const port = process.env.PORT || 3000

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next();
})

app.get('/', (req, res) => {
  for (val in req){
    if (typeof req[val] === 'string'){
      console.log(`${val}: ${req[val]}`)
    }
  }
  console.log(req.headers)
  console.log(req.accepts())
  console.log(req.socket.address())
  res.send('Woo Hoo!')
})

const server = app.listen(port, () => {
  console.log(`Server started on port ${port}.`)
})