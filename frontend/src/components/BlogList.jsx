import Blog from "./Blog"

const BlogList = ({ blogs, setBlogs, setOutcomeMessage }) => {
  return (
    <div>
      { blogs.map(blog => <Blog
          key={blog.id}
          blog={blog}
          setBlogs={setBlogs}
          setOutcomeMessage={setOutcomeMessage}
        />) }
    </div>
  )
}

export default BlogList