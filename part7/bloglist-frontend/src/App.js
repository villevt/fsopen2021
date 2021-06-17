import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Blog from "./components/Blog"
import Login from "./components/Login"
import NewBlog from "./components/NewBlog"
import Notification from "./components/Notification"
import { initBlogs } from "./reducers/blogs"
import { getSavedUser, loginUser, logoutUser } from "./reducers/users"

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)
  const loggedUser = useSelector(state => state.users.find(user => user.logged))

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
      <NewBlog />
      <br/>
      <div>
        {blogs && blogs.map(blog =>
          <Blog key={blog.id} blog={blog} currentUsername={loggedUser.username}/>
        )}
      </div>
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