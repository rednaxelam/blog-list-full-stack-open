const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  let blogs = await Blog.find({}).populate('user', { blogs: 0 })

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

  const user = await User.findOne({})
  blogObject.user = user._id

  const blog = new Blog(blogObject)
  const result = await blog.save()

  user.blogs = user.blogs.concat(result._id)
  await user.save()

  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  if (!Object.hasOwn(request.body, 'title')) {
    response.status(400).json({ error: 'title missing' })
    return
  } else if (!Object.hasOwn(request.body, 'url')) {
    response.status(400).json({ error: 'url missing' })
    return
  }

  const blogsWithID = await Blog.find({ _id: request.params.id }).exec()
  if (blogsWithID.length < 1) {
    response.status(404).json({ error: 'blog not found' })
    return
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true, context: 'query' })

  response.json(updatedBlog)
})

module.exports = blogsRouter