const config = require('../utils/config')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const blogObjectArray = require('./blogs_api_test_helper').blogObjectArray

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
  let returnedBlogList = await api.get('/api/blogs')
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

afterAll( async () => {
  await mongoose.connection.close()
})