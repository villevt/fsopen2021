import React, {useState} from "react"
import { useDispatch } from "react-redux"
import PropTypes from "prop-types"

import { likeBlog } from "../reducers/blogs"

const Blog = ({blog, currentUsername, handleRemove}) => {
  const dispatch = useDispatch()

  const [showDetail, setShowDetail] = useState(false)

  const blogStyle = {
    border: "2px solid black",
    padding: "2px",
    margin: "2px  "
  }

  const handleLike = async () => {
    dispatch(likeBlog(blog))
  }

  const compactView = () => (
    <div>
      {blog.title} {blog.author}
      <button onClick={() => setShowDetail(true)}>view</button>
    </div>
  )

  const detailView = () => (
    <div data-user={`${blog.user.name}`}>
      {blog.title} {blog.author}
      <button onClick={() => setShowDetail(false)}>hide</button>
      <br/>
      {blog.url}
      <br/>
      <span className="likes">Likes {blog.likes}</span>
      <button onClick={handleLike}>Like</button>
      <br/>
      {blog.user.name}
    </div>
  )

  const removeButton = () => (
    <button onClick={() => handleRemove(blog)}>
      Remove
    </button>
  )

  return(
    <div style={blogStyle} className="blog">
      {!showDetail && compactView()}
      {showDetail && detailView()}
      {(currentUsername === blog.user.username) && removeButton()}
    </div>  
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  currentUsername: PropTypes.string.isRequired,
  handleRemove: PropTypes.func.isRequired
}

export default Blog