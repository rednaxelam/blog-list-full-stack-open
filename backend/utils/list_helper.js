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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}