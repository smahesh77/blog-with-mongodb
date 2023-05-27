const mongoose = require('mongoose')
const express = require('express')
const app = express()
require('dotenv').config()

// listen for request
const connection = mongoose.connect(process.env.URI)
   .then((result) => {
      app.listen(5000)
      console.log('Connected')
   })
   .catch((err) => console.log(err))

module.exports = mongoose