import React, { useState } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"

import { loginUser } from "../reducers/currentUser"

const Container = styled.div`
  align-self: center;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const InputField = styled.div`
  margin-bottom: 1em;
  margin-top: 1em;
`

const Input = styled.input`
  background: Sienna;
  border: none;
  color: Snow;
  font-size: 0.9em;
  margin-top: 0.25em;
  padding: 0.25em;  
  width: 100%;
  :focus {
    outline: solid Snow;
  }
`

const Button = styled.button`
  align-self: center;
  border: none;
  background: Sienna;
  color: Snow;
  border-radius: 5px;
  font-size: 1em;
  padding: 0.25em;
  :hover {
    background: Chocolate;
  }
`

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
    <Container>
      <h2>Login to application</h2>
      <Form onSubmit={handleLogin}>
        <InputField>
          Username
          <Input
            type="text" 
            value={username}
            name="Username"
            autoComplete="current-password"
            onChange={(event) => setUsername(event.target.value)}
          />
        </InputField>
        <InputField>
          Password
          <Input 
            type="password" 
            value={password}
            name="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </InputField>
        <Button type="submit">Login</Button>  
      </Form>
    </Container>
  )
}

export default Login