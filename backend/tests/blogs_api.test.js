const config = require('../utils/config')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { blogObjectArray,
  blogObjectSingle,
  blogObjectWithoutLikes,
  blogObjectWithoutTitle,
  blogObjectWithoutURL,
  nonExistingID, } = require('./blogs_api_test_helper')

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
  const returnedBlogListPromise = await api.get('/api/blogs')
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

test('If the likes property is missing from a post request, it will default to 0', async () => {
  const returnedBlogPromise = await api.post('/api/blogs').send(blogObjectWithoutLikes)
  const returnedBlog = returnedBlogPromise.body

  expect(returnedBlog.likes).toBe(0)
})

test('If the title or url property is missing from the post request data, there will be a 400 response', async () => {
  await api
    .post('/api/blogs')
    .send(blogObjectWithoutTitle)
    .expect(400)

  await api
    .post('/api/blogs')
    .send(blogObjectWithoutURL)
    .expect(400)

  const returnedBlogListPromise = await api.get('/api/blogs')
  const returnedBlogList = returnedBlogListPromise.body

  expect(returnedBlogList).toHaveLength(blogObjectArray.length)
})

describe('resource deletion', () => {
  test('Delete request with document id removes document from database and returns 204', async () => {
    const beforeReturnedBlogListPromise = await api.get('/api/blogs')
    const beforeReturnedBlogList = beforeReturnedBlogListPromise.body
    const returnedBlogToDelete = beforeReturnedBlogList[0]
    await api
      .delete(`/api/blogs/${returnedBlogToDelete.id}`)
      .expect(204)

    const afterReturnedBlogListPromise = await api.get('/api/blogs')
    const afterReturnedBlogList = afterReturnedBlogListPromise.body

    expect(afterReturnedBlogList).toHaveLength(beforeReturnedBlogList.length - 1)
    expect(afterReturnedBlogList.map(blog => blog.id)).not.toContain(returnedBlogToDelete.id)
  })
  test('Delete request for nonexistent document removes nothing and returns 204', async () => {
    const beforeReturnedBlogListPromise = await api.get('/api/blogs')
    const beforeBlogList = beforeReturnedBlogListPromise.body

    const nonexistentID = await nonExistingID()

    await api
      .delete(`/api/blogs/${nonexistentID}`)
      .expect(204)

    const afterReturnedBlogListPromise = await api.get('/api/blogs')
    const afterBlogList = afterReturnedBlogListPromise.body

    expect(beforeBlogList).toHaveLength(afterBlogList.length)
  })
})


afterAll( async () => {
  await mongoose.connection.close()
})