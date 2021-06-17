import React from "react"
import { useSelector } from "react-redux"

import Blog from "../components/Blog"
import NewBlog from "../components/NewBlog"

const Main = () => {
  const blogs = useSelector(state => state.blogs)
  
  return (
    <div>
      <NewBlog />
      <br/>
      <div>
        {blogs && blogs.map(blog =>
          <Blog key={blog.id} blog={blog}/>
        )}
      </div>
    </div>
  )
}

export default Main