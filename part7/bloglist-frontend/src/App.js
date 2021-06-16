import React, { useState, useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import Blog from "./components/Blog"
import Login from "./components/Login"
import NewBlog from "./components/NewBlog"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import { setNotification } from "./reducers/notification"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  const toggleRef = useRef()

  useEffect(async () => {
    try {
      const blogs = await blogService.getAll()
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    } catch(error) {
      if (error.response) { 
        dispatch(setNotification({message: error.response.data.error || "Error fetching blogs", error: true}, 3))
      } else {
        dispatch(setNotification({message: "Couldn't reach API to fetch users", error: true}, 3))
      }
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
  
  const createBlog = async blog => {
    try {
      const response = await blogService.createNew(blog)
      const copy = [...blogs]
      copy.push(response)
      setBlogs(copy)
      dispatch(setNotification({message: `Created new blog ${response.title} by ${response.author}`}, 3))
      toggleRef.current.toggleVisibility()
    } catch (error) {
      dispatch(setNotification({message: error.response.data.error || "Error creating blog", error: true}, 3))
    }
  }

  const handleLike = async blog => {
    try {
      await blogService.like(blog)
      const copy = [...blogs]
      for (let item of copy) {
        if (item.id === blog.id) {
          item.likes++
          break
        }
      }
      copy.sort((a, b) => b.likes - a.likes)
      setBlogs(copy)
      dispatch(setNotification({message: `Liked blog ${blog.title} by ${blog.author}`}, 3))
    } catch (error) {
      dispatch(setNotification({message: error.response.data.error || "Error liking blog", error: true}, 3))
    }
  }

  const handleRemove = async blog => {
    window.confirm(`Are you sure you want to remove blog ${blog.title} by ${blog.author}`)
    try {
      await blogService.remove(blog)
      const copy = blogs.filter(item => item.id !== blog.id)
      setBlogs(copy)
      dispatch(setNotification({message: `Deleted blog ${blog.title} by ${blog.author}`}, 3))
    } catch (error) {
      dispatch(setNotification({message: error.response.data.error || "Error deleting blog", error: true}, 3))
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
          <Blog key={blog.id} blog={blog} currentUsername={user.username} handleLike={handleLike} handleRemove={handleRemove}/>
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