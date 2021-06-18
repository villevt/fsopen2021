import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router"
import styled from "styled-components"

import { commentBlog, initBlogs, likeBlog, removeBlog } from "../reducers/blogs"

const Input = styled.input`
  background-color: Sienna;
  border: none;
  color: Snow;
  font-size: 1em;
  :focus {
    outline: Snow;
  }
`

const Button = styled.button`
  background-color: Sienna;
  border: none;
  border-radius: 5px;
  color: Snow;
  margin-left: 0.5em;
  padding: 0.25em;
  :hover {
    background-color: Chocolate;s
  }
`

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
          <Button onClick={handleLike}>Like</Button>
          <br/>
          Added by {blog.user.name}
        </div>
        {(currentUsername === blog.user.username) && removeButton()}
        <h3>Comments</h3>
        <form onSubmit={handleComment}>
          <Input onChange={event => setNewComment(event.target.value)} value={newComment}></Input>
          <Button>Add comment</Button>
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