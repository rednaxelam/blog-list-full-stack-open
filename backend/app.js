const express = require('express')
const app = express()
const blogsRouter = require('./controllers/blogs')
const cors = require('cors')
const middleware = require('./utils/middleware')

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)

app.use(middleware.errorHandler)

module.exports = app