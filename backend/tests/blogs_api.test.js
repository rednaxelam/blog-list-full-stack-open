const config = require('../utils/config')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { blogObjectArray, blogObjectSingle } = require('./blogs_api_test_helper')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

const api = supertest(app)

beforeEach( async () => {
  await Blog.deleteMany({})

  for (let blogObject of blogObjectArray) {
    let blog = new Blog(blogObject)
    await blog.save()
  }
})

test('Get request to /api/blogs will return all elements of the collection in the correct format', async () => {
  let returnedBlogListPromise = await api.get('/api/blogs')
  const returnedBlogList = returnedBlogListPromise.body

  for (let i = 0; i < returnedBlogList.length; i++) {
    let returnedBlog = returnedBlogList[i]
    let originalBlog = blogObjectArray[i]
    for (let prop in originalBlog) {
      expect(returnedBlog).toHaveProperty(prop)
      // an assumption is made here that the schema only specifies non-object values
      expect(returnedBlog[prop]).toBe(originalBlog[prop])
    }
  }
})

test('Returned blogs have a property named "id"', async () => {
  let returnedBlogListPromise = await api.get('/api/blogs')
  const returnedBlogList = returnedBlogListPromise.body

  for (let i = 0; i < returnedBlogList.length; i++) {
    expect(returnedBlogList[i].id).toBeDefined()
  }
})

test('Well formed Post request to /api/blogs will successfully create a new blog post', async () => {
  const returnedBlogPromise = await api.post('/api/blogs').send(blogObjectSingle)
  const returnedBlog = returnedBlogPromise.body

  for (let prop in blogObjectSingle) {
    expect(returnedBlog).toHaveProperty(prop)
    // an assumption is made here that the schema only specifies non-object values
    expect(returnedBlog[prop]).toBe(blogObjectSingle[prop])
  }

  expect(returnedBlog.id).toBeDefined()
  expect(returnedBlog._id).toBeUndefined()
  expect(returnedBlog.__v).toBeUndefined()

  let returnedBlogListPromise = await api.get('/api/blogs')
  const returnedBlogList = returnedBlogListPromise.body
  expect(returnedBlogList).toHaveLength(blogObjectArray.length + 1)
})

afterAll( async () => {
  await mongoose.connection.close()
})