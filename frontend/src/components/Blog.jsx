import { useState } from "react"

const Blog = ({ blog }) => {
  const [showDetailed, setShowDetailed] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (showDetailed) {
    return <div style={blogStyle}>
      <p>{blog.title} {blog.author} <button onClick={() => setShowDetailed(false)}>hide</button></p>
      <p>{blog.url}</p>
      <p>likes {blog.likes} <button>like</button></p>
      <p>{blog.user.name}</p>
    </div>
  } else {
    return <div style={blogStyle}>
      <p>{blog.title} {blog.author} <button onClick={() => setShowDetailed(true)}>view</button></p>
    </div>
  }
}

export default Blog