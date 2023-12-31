const dummy = blogs => {
  return 1
}

const totalLikes = blogList => {
  return blogList.reduce(
    (totalLikes, blogPost) => totalLikes + blogPost.likes,
    0
  )
}

const favoriteBlog = blogList => {
  if (blogList.length === 0) return null
  else if (blogList.length === 1) return blogList[0]
  else return blogList.reduce(
    (mostLikedBlog, currentBlog) => mostLikedBlog.likes < currentBlog.likes ? currentBlog : mostLikedBlog
  )
}

const mostBlogs = blogList => {
  if (blogList.length === 0) return null
  else if (blogList.length === 1) return { author: blogList[0].author, blogs: 1 }
  else {
    const numBlogs = {}
    let authorWithMostBlogs = blogList[0].author
    let mostBlogs = 1

    blogList.forEach(blog => {
      if (Object.hasOwn(numBlogs, blog.author)) {
        numBlogs[blog.author]++
        if (numBlogs[blog.author] > mostBlogs) {
          authorWithMostBlogs = blog.author
          mostBlogs++
        }
      } else {
        numBlogs[blog.author] = 1
      }
    })

    return {
      author: authorWithMostBlogs,
      blogs: mostBlogs
    }
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}