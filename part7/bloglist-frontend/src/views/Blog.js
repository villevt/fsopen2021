import React from "react"
import { useDispatch, useSelector } from "react-redux"
import PropTypes from "prop-types"

import { initBlogs, likeBlog, removeBlog } from "../reducers/blogs"

const Blog = ({id}) => {
  const dispatch = useDispatch()
  const currentUsername = useSelector(state => state.currentUser.username)
  const blog = useSelector(state => state.blogs.find(blog => blog.id === id))

  if (!blog) {
    dispatch(initBlogs())
  }

  const handleLike = async () => {
    dispatch(likeBlog(blog))
  }

  const handleRemove = async () => {
    dispatch(removeBlog(blog))
  }

  const removeButton = () => (
    <button onClick={() => handleRemove(blog)}>
      Remove
    </button>
  )

  return(
    <div>
      {blog ? <div className="blog">
        <div data-user={`${blog.user.name}`}>
          <h2>{blog.title} {blog.author}</h2>
          <br/>
          <a href={blog.url}>{blog.url}</a>
          <br/>
          <span className="likes">{blog.likes} likes</span>
          <button onClick={handleLike}>Like</button>
          <br/>
          Added by {blog.user.name}
        </div>
        {(currentUsername === blog.user.username) && removeButton()}
      </div>  
        : null
      }
    </div>
  )
}

Blog.propTypes = {
  id: PropTypes.string.isRequired
}

export default Blog