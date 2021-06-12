import React, {useState} from "react"
import PropTypes from "prop-types"

const Blog = ({blog, currentUsername, handleLike, handleRemove}) => {
  const [showDetail, setShowDetail] = useState(false)

  const blogStyle = {
    border: "2px solid black",
    padding: "2px",
    margin: "2px  "
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
      <button onClick={() => handleLike(blog)}>Like</button>
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
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired
}

export default Blog