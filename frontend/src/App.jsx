import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import LogInForm from './components/LogInForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const savedUser = window.localStorage.getItem('loggedUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  useEffect(() => {
    if (user) {
      blogService.getAll().then(blogs => {
        setBlogs(blogs)
      })
    } else {
      setBlogs([])
    }
  }, [user])
  
  const setDisplay = () => {
    if (user === null) {
      return <>
        <h2>log in to the application</h2>
        <LogInForm setUser={setUser} setErrorMessage={setErrorMessage} />
      </>
    } else {
      return <>
        <h2>blogs</h2>
        <p>{user.name} logged in </p>
        <BlogList blogs={blogs} />
      </>
    }
  }

  return (
    <div>
      {setDisplay()}
    </div>
  )
}

export default App