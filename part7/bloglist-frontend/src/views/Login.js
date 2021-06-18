import React, { useState } from "react"
import { useDispatch } from "react-redux"

import { loginUser } from "../reducers/currentUser"

const Login = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async event => {
    event.preventDefault()
    setUsername("")
    setPassword("")
    await dispatch(loginUser(username, password))
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input 
            type="text" 
            value={username}
            name="Username"
            autoComplete="current-password"
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          Password
          <input 
            type="password" 
            value={password}
            name="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Login</button>  
      </form>
    </div>
  )
}

export default Login