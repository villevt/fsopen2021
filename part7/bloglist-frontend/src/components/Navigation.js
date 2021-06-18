import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import styled from "styled-components"

import { logoutUser } from "../reducers/currentUser"

const Container = styled.div`
  background-color: Sienna;
  color: Snow;
  display: flex;
  padding: 1em;
  > a {
    border-color: Snow;
    border-style: solid;
    border-width: 1px;
    border-radius: 5px;
    color: Snow;
    text-decoration: none;
    padding: 0.25em;
    margin-left: 0.5em;
    margin-right: 0.5em;
  }
  > a:hover {
    background-color: Chocolate
  }
`

const User = styled.div`
  align-self: center;
  margin-left: 70%;
  > button {
    background: none;
    border-color: Snow;
    border-style: solid;
    border-width: 1px;
    border-radius: 5px;
    color: Snow;
    text-decoration: none;
    padding: 0.25em;
    margin-left: 0.5em;
    margin-right: 0.5em;
    font-size: 1em;
  }
  > button:hover {
    background-color: Chocolate
  }
`

const Navigation = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.currentUser)

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <Container>
      <Link to="/blogs">
        Blogs
      </Link>
      <Link to="/users">
        Users
      </Link>
      <User>
        {user.name} logged in 
        <button onClick={() => handleLogout()}>
          Logout
        </button>
      </User>
    </Container>
  )
}

export default Navigation