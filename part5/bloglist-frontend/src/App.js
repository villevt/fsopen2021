import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import Login from "./components/Login"
import NewBlog from "./components/NewBlog"
import Notification from "./components/Notification"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(undefined)
  const [notificationTimeout, setNotificationTimeout] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser")
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const useNotification = newNotification => {
    if (notificationTimeout) {
      clearTimeout(notificationTimeout)
    }
    setNotification(newNotification)
    setNotificationTimeout(setTimeout(setNotification, 3000, undefined))
  }

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem(
        "loggedBloglistUser", JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      useNotification({message: `Logged in successfully as ${user.username}`})
    } catch (error) {
      console.log(error)
      useNotification({message: error.message, error: true})
    }
  }

  const handleLogout = () => {
    setUser(null)
    blogService.setToken("")
    window.localStorage.removeItem("loggedBloglistUser")
    useNotification({message: "Logged out"})
  }
  
  const createBlog = async blog => {
    try {
      const response = await blogService.createNew(blog)
      const copy = [...blogs]
      copy.push(response)
      setBlogs(copy)
      useNotification({message: `Created new blog ${response.title} by ${response.author}`})
    } catch (error) {
      console.log(error)
      useNotification({message: error.message, error: true})
    }
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
      <h2>Create new</h2>
      <NewBlog createBlog={createBlog}/>
      <br/>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )

  return (
    <div>
      <Notification notification={notification}/>
      {user === null 
        ? loginForm()
        : appMain()
      }
    </div>
  )
}

export default App