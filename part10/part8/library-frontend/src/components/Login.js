import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { useMutation } from "@apollo/client"
import { LOGIN } from "../queries"

const Login = ({onLogin, show}) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [login, result] = useMutation(LOGIN, {
    onError: error => console.error(error.graphQLErrors[0])
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      onLogin()
      window.localStorage.setItem("library-user-token", token)
    }
  }, [result.data])

  if (!show) {
    return <div></div>
  }

  const submit = event => {
    event.preventDefault()
    login({variables: {username, password}})
  }

  return (
    <form onSubmit={submit}>
      <div>
        Name
        <input onChange={event => setUsername(event.target.value)} value={username}/>
      </div>
      <div>
        Password
        <input type="password" onChange={event => setPassword(event.target.value)} value={password}/>
      </div>
      <button>Login</button>
    </form>
  )
}

Login.propTypes = {
  onLogin: PropTypes.func,
  show: PropTypes.bool
}

export default Login