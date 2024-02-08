import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LogInForm from './components/LogInForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const savedUser = window.localStorage.getItem('loggedUser')
    if (savedUser) {
      const currentUser = JSON.parse(savedUser)
      setUser(currentUser)
      blogService.setToken(currentUser.token)
    }
  }, [])

  useEffect(() => {
    if (user) {
      blogService.getAll().then(blogs => {
        setBlogs(blogs)
      })
      blogService.setToken(user.token)
    } else {
      setBlogs([])
      blogService.removeToken()
    }
  }, [user])

  const logOut = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }
  
  const setDisplay = () => {
    if (user === null) {
      return <>
        <h2>log in to the application</h2>
        <LogInForm setUser={setUser} setErrorMessage={setErrorMessage} />
      </>
    } else {
      return <>
        <h2>blogs</h2>
        <p>{user.name} logged in <button onClick={() => logOut()}>Log Out</button></p>
        <BlogForm setBlogs={setBlogs} setErrorMessage={setErrorMessage} />
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