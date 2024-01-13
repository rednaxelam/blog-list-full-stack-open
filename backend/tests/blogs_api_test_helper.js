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
    likes: 7,
  }
]

const blogObjectSingle = {
  title: 'Luv me blogs',
  author: 'Greg',
  url: 'Dummy URL: Third Time\'s a Charm',
  likes: 53,
}

const blogObjectWithoutLikes = {
  title: 'Likes lead to tyranny of the (stupid) majority. I refuse to use them',
  author: 'Timothy',
  url: 'Dummy URL: I can\'t use punctuation properly'
}

module.exports = { blogObjectArray, blogObjectSingle, blogObjectWithoutLikes }