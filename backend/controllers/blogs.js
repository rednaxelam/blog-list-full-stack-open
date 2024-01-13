const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  let blogs = await Blog.find({})

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blogObject = request.body

  if (!Object.hasOwn(blogObject, 'title')) {
    response.status(400).json({ error: 'title missing' })
    return
  } else if (!Object.hasOwn(blogObject, 'url')) {
    response.status(400).json({ error: 'url missing' })
    return
  }

  const blog = new Blog(request.body)

  const result = await blog.save()
  response.status(201).json(result)
})

module.exports = blogsRouter