import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, setOutcomeMessage }) => {
  const [showDetailed, setShowDetailed] = useState(false)

  const blogStyle = {
    paddingTop: '10px',
    paddingLeft: '2px',
    border: 'solid',
    borderWidth: '1px',
    marginBottom: '5px'
  }

  const likePost = async () => {
    try {
      const newBlog = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user.id
      }
      await blogService.updateBlog(newBlog, blog.id)
      const newBlogList = await blogService.getAll()
      setBlogs(newBlogList)
    } catch (error) {
      setOutcomeMessage(['failure', error.message])
    }
  }

  if (showDetailed) {
    return <div style={blogStyle}>
      <p>{blog.title} {blog.author} <button onClick={() => setShowDetailed(false)}>hide</button></p>
      <p>{blog.url}</p>
      <p>likes {blog.likes} <button onClick={() => likePost()}>like</button></p>
      <p>{blog.user.name}</p>
    </div>
  } else {
    return <div style={blogStyle}>
      <p>{blog.title} {blog.author} <button onClick={() => setShowDetailed(true)}>view</button></p>
    </div>
  }
}

export default Blog