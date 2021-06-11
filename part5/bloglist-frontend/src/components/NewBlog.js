import React, {useState} from "react"

const NewBlog = ({createBlog}) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const submitData = event => {
    event.preventDefault()
    createBlog({title, author, url})
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  return (
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
  )
}

export default NewBlog