import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Switch, Redirect, Route, useRouteMatch } from "react-router-dom"

import { initBlogs } from "./reducers/blogs"
import { getSavedUser, loginUser } from "./reducers/currentUser"

import Blog from "./views/Blog"
import Main from "./views/Main"
import Users from "./views/Users"
import User from "./views/User"

import Login from "./components/Login"
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

  const handleLogin = async (username, password) => {
    await dispatch(loginUser(username, password))
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <Login handleLogin={handleLogin}/>
    </div>
  )

  const appMain = () => (
    <div>
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
  )

  return (
    <div>
      <Notification />
      {!loggedUser 
        ? loginForm()
        : appMain()
      }
    </div>
  )
}

export default App