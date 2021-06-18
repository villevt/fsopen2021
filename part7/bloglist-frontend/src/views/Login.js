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
  width: 100%;
`

const Button = styled.button`
  align-self: center;
  background: none;
  border-color: Sienna;
  color: Sienna;
  border-radius: 100px;
  font-size: 1em;
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