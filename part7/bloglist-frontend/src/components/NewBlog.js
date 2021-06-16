import React, { useState, useRef } from "react"
import { useDispatch } from "react-redux"
import { addBlog } from "../reducers/blogs"
import Togglable from "../components/Togglable"

const NewBlog = () => {
  const dispatch = useDispatch()
  const toggleRef = useRef()

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const submitData = async event => {
    event.preventDefault()
    setTitle("")
    setAuthor("")
    setUrl("")
    toggleRef.current.toggleVisibility()
    await dispatch(addBlog({title, author, url}))
  }

  return (
    <Togglable buttonLabel="Create new blog" ref={toggleRef}>
      <h2>Create new</h2>
      <form onSubmit={submitData}>
        <div>
          Title
          <input 
            type="text" 
            value={title}
            name="Title"
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          Author
          <input 
            type="text" 
            value={author}
            name="Author"
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
          Url
          <input 
            type="text" 
            value={url}
            name="Url"
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </Togglable>
  )
}

export default NewBlog