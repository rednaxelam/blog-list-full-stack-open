const Blog = require('../models/blog')

const blogObjectArray = [
  {
    title: 'Blogs are good in and of themselves',
    author: 'Bob',
    url: 'Dummy URL',
    likes: 3,
  },
  {
    title: 'Blogs are inferior to books',
    author: 'Jim',
    url: 'Dummy URL: The Sequel',
    likes: 7
  }
]

const blogObjectSingle = {
  title: 'Luv me blogs',
  author: 'Greg',
  url: 'Dummy URL: Three Times a Charm',
  likes: 53
}

module.exports = { blogObjectArray, blogObjectSingle }