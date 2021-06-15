import React, { useState } from "react"
import PropTypes from "prop-types"
import { Redirect } from "react-router-dom"
import { useField } from "../hooks/index"

const CreateNew = ({addNew}) => {
  const content = useField("text")
  const author = useField("text")
  const info = useField("text")
  const [submitted, setSubmitted] = useState(false)


  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <Redirect to="/" />
    )
  } else {
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...content} />
          </div>
          <div>
            author
            <input {...author} />
          </div>
          <div>
            url for more info
            <input {...info} />
          </div>
          <button>create</button>
        </form>
      </div>
    ) 
  }
}

CreateNew.propTypes = {
  addNew: PropTypes.func.isRequired
}

export default CreateNew