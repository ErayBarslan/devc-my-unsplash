require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const routes = require('./routes')
const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())

app.use(`/api/${process.env.API_KEY}/photos`, routes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('listening...')
    })
  })
  .catch(error => console.log(error))