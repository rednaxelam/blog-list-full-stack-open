const dummy = blogs => {
  return 1
}

const totalLikes = blogList => {
  return blogList.reduce(
    (totalLikes, blogPost) => totalLikes + blogPost.likes,
    0
  )
}

module.exports = {
  dummy,
  totalLikes
}