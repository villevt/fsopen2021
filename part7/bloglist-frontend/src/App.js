import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Blog from "./components/Blog"
import Login from "./components/Login"
import NewBlog from "./components/NewBlog"
import Notification from "./components/Notification"
import { initBlogs } from "./reducers/blogs"
import { setNotification } from "./reducers/notification"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const [user, setUser] = useState(null)

  useEffect(async () => {
    await dispatch(initBlogs())
  }, [])

  useEffect(async () => {
    const loggedUserJSON = await window.localStorage.getItem("loggedBloglistUser")
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem(
        "loggedBloglistUser", JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      dispatch(setNotification({message: `Logged in successfully as ${user.username}`}, 3))
    } catch (error) {
      dispatch(setNotification({message: error.response.data.error || "Error logging in", error: true}, 3))
    }
  }

  const handleLogout = () => {
    setUser(null)
    blogService.setToken("")
    window.localStorage.removeItem("loggedBloglistUser")
    dispatch(setNotification({message: "Logged out"}, 3))
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
      {user.name} logged in
      <button onClick={() => handleLogout()}>
        Logout
      </button>
      <NewBlog />
      <br/>
      <div>
        {blogs && blogs.map(blog =>
          <Blog key={blog.id} blog={blog} currentUsername={user.username}/>
        )}
      </div>
    </div>
  )

  return (
    <div>
      <Notification />
      {user === null 
        ? loginForm()
        : appMain()
      }
    </div>
  )
}

export default App