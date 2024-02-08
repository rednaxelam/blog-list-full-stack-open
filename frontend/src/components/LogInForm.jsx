import { useState } from "react"
import loginService from '../services/login'

const LogInForm = ({ setUser, setErrorMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const user = await loginService.logIn({ username, password })
      setUser(user)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
    } catch (error) {
      setErrorMessage('Login Unsuccessful')  
    }

    setUsername('')
    setPassword('')
  }

  const handleInputChange = stateUpdater => {
    return ({ target }) => stateUpdater(target.value)
  } 

  return <form onSubmit={handleSubmit}>
    <div className="form-control">
      <label htmlFor="username">username:</label>
      <input 
        type="text"
        name="username"
        id="username"
        value={ username }
        onChange={ handleInputChange(setUsername) }
      />
    </div>
    <div className="form-control">
      <label htmlFor="pwd">password:</label>
      <input 
        type="password"
        name="pwd"
        id="pwd"
        value={ password }
        onChange={ handleInputChange(setPassword) }
      />
    </div>
    <button type="submit">login</button>
  </form>
}

export default LogInForm