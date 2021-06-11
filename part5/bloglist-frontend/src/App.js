import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import Login from "./components/Login"
import NewBlog from "./components/NewBlog"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)


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

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem(
        "loggedBloglistUser", JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    } catch {
      console.log("Error logging in")
    }
  }

  const handleLogout = () => {
    setUser(null)
    blogService.setToken("")
    window.localStorage.removeItem("loggedBloglistUser")
  }
  
  const createBlog = async blog => {
    try {
      const response = await blogService.createNew(blog)
      const copy = [...blogs]
      copy.push(response)
      setBlogs(copy)
    } catch {
      console.log("Error creating new blog")
    }
  }

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Login handleLogin={handleLogin}/>
      </div>
    )
  } else {
    return (
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
  }
}

export default App