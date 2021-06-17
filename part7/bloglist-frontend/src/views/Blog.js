import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router"

import { commentBlog, initBlogs, likeBlog, removeBlog } from "../reducers/blogs"

const Blog = ({id}) => {
  const dispatch = useDispatch()
  const currentUsername = useSelector(state => state.currentUser.username)
  const blog = useSelector(state => state.blogs.find(blog => blog.id === id))

  const [newComment, setNewComment] = useState("")
  const [removed, setRemoved] = useState(false)

  if (!blog && !removed) {
    dispatch(initBlogs())
  }

  const handleLike = () => {
    dispatch(likeBlog(blog))
  }

  const handleRemove = async () => {
    await dispatch(removeBlog(blog))
    setRemoved(true)
  }

  const handleComment = async event => {
    event.preventDefault()
    await dispatch(commentBlog(blog, newComment))
    setNewComment("")
  }

  const removeButton = () => (
    <button onClick={() => handleRemove(blog)}>
      Remove
    </button>
  )

  return(
    <div>
      {removed && <Redirect to="/blogs" />}
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
        <h3>Comments</h3>
        <form onSubmit={handleComment}>
          <input onChange={event => setNewComment(event.target.value)} value={newComment}></input>
          <button>Add comment</button>
        </form>
        <ul>
          {blog.comments.map(comment => {
            return(
              <li key={comment.id}>
                {comment.content}
              </li>
            )
          })}
        </ul>
      </div>  
        : null
      }
    </div>
  )
}

export default Blog