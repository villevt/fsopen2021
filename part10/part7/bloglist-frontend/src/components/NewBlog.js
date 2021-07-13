import React, { useState, useRef } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"

import { addBlog } from "../reducers/blogs"

import Togglable from "../components/Togglable"

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const InputField = styled.div`
  margin-bottom: 0.25em;
  margin-top: 0.25em;
`

const Input = styled.input`
  background: Sienna;
  border: none;
  color: Snow;
  font-size: 0.9em;
  margin-top: 0.25em;
  padding: 0.25em;  
  width: 100%;
  :focus {
    outline: solid Snow;
  }
`

const Button = styled.button`
  align-self: center;
  border: none;
  background: Sienna;
  color: Snow;
  border-radius: 5px;
  font-size: 1em;
  padding: 0.25em;
  :hover {
    background: Chocolate;
  }
`

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
      <Form onSubmit={submitData}>
        <InputField>
          Title
          <Input
            type="text" 
            value={title}
            name="Title"
            onChange={(event) => setTitle(event.target.value)}
          />
        </InputField>
        <InputField>
          Author
          <Input
            type="text" 
            value={author}
            name="Author"
            onChange={(event) => setAuthor(event.target.value)}
          />
        </InputField>
        <InputField>
          Url
          <Input
            type="text" 
            value={url}
            name="Url"
            onChange={(event) => setUrl(event.target.value)}
          />
        </InputField>
        <Button type="submit">Create</Button>
      </Form>
    </Togglable>
  )
}

export default NewBlog