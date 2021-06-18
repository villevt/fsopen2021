import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Switch, Redirect, Route, useRouteMatch } from "react-router-dom"
import styled from "styled-components"

import { initBlogs } from "./reducers/blogs"
import { getSavedUser} from "./reducers/currentUser"

import Blog from "./views/Blog"
import Login from "./views/Login"
import Main from "./views/Main"
import Users from "./views/Users"
import User from "./views/User"

import Logo from "./components/Logo"
import Navigation from "./components/Navigation"
import Notification from "./components/Notification"

const App = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.currentUser)
  const [localUserChecked, setLocalUserChecked] = useState(false)

  const match = useRouteMatch("/*/:id")

  useEffect(async () => {
    await dispatch(initBlogs())
  }, [])

  useEffect(async () => {
    await dispatch(getSavedUser())
    setLocalUserChecked(true)
  }, [])

  const Body = styled.div`
    background-color: Azure;
    display: flex;
    flex-direction: column;
    font-family: 'Montserrat', sans-serif;
    margin: 0;
    min-height: 100vh;
    min-width: 100vw;
    padding: 0;
  `

  return (
    <Body>
      <Logo />
      <Notification />
      {!loggedUser 
        ? <Login />
        : <div>
          {(localUserChecked && !loggedUser) && <Redirect to="/" />}
          <Navigation />
          <h2>Blog app</h2>
          <Switch>
            <Route path="/users/:id">
              <User id={match && match.params.id}/>
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/blogs/:id">
              <Blog id={match && match.params.id}/>
            </Route>
            <Route path="/">
              <Main />
            </Route>
          </Switch>
        </div>
      }
    </Body>
  )
}

export default App