import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Switch, Route } from "react-router-dom"

import { initBlogs } from "./reducers/blogs"
import { getSavedUser, loginUser, logoutUser } from "./reducers/currentUser"

import Main from "./views/Main"
import Users from "./views/Users"

import Login from "./components/Login"
import Notification from "./components/Notification"

const App = () => {
  const dispatch = useDispatch()

  const loggedUser = useSelector(state => state.currentUser)

  useEffect(async () => {
    await dispatch(initBlogs())
  }, [])

  useEffect(async () => {
    await dispatch(getSavedUser())
  }, [])

  const handleLogin = async (username, password) => {
    await dispatch(loginUser(username, password))
  }

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <Login handleLogin={handleLogin}/>
    </div>
  )

  const appMain = () => (
    <div>
      <h2>Blogs</h2>
      {loggedUser.name} logged in
      <button onClick={() => handleLogout()}>
        Logout
      </button>
      <Switch>
        <Route path="/users">
          <Users />
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