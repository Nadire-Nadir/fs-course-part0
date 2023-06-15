const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const { info, errors } = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    info('connected to MongoDB');
  })
  .catch((error) => {
    errors('error connecting to MongoDB:', error.message);
  })

app.use(cors())
app.use(express.static("build"));
app.use(express.json())

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app


