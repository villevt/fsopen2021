import React, {useState} from "react"

const Login = ({handleLogin}) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const submitData = event => {
    event.preventDefault()
    handleLogin(username, password)
    setUsername("")
    setPassword("")
  }

  return (
    <form onSubmit={submitData}>
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
  )
}

export default Login