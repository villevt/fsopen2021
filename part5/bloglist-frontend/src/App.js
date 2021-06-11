import React, { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import Login from "./components/Login"
import NewBlog from "./components/NewBlog"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(undefined)
  const [notificationTimeout, setNotificationTimeout] = useState(null)

  const toggleRef = useRef()

  useEffect(async () => {
    try {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch(error) {
      useNotification({message: error.response.data.error || "Error fetching blogs", error: true})
    }
  }, [])

  useEffect(async () => {
    const loggedUserJSON = await window.localStorage.getItem("loggedBloglistUser")
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
      useNotification({message: error.response.data.error || "Error logging in", error: true})
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
      console.log(response)
      const copy = [...blogs]
      copy.push(response)
      setBlogs(copy)
      useNotification({message: `Created new blog ${response.title} by ${response.author}`})
      toggleRef.current.toggleVisibility()
    } catch (error) {
      useNotification({message: error.response.data.error || "Error creating blog", error: true})
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
      <Togglable buttonLabel="Create new blog" ref={toggleRef}>
        <h2>Create new</h2>
        <NewBlog createBlog={createBlog}/>
      </Togglable>
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