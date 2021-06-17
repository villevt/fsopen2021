import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import NewBlog from "../components/NewBlog"

const Main = () => {
  const blogs = useSelector(state => state.blogs)
  
  const linkContainerStyle = {
    display: "flex",
    flexDirection: "column"
  }

  const linkStyle = {
    border: "2px solid black",
    padding: "2px",
    margin: "2px"
  }

  return (
    <div>
      <NewBlog />
      <br/>
      <div style={linkContainerStyle}>
        {blogs && blogs.map(blog =>
          <Link style={linkStyle} key={blog.id} to={`/blogs/${blog.id}`}>
            {blog.title}
          </Link>
        )}
      </div>
    </div>
  )
}

export default Main