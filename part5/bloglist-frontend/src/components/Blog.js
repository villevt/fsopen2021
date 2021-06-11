import React, {useState} from "react"

const Blog = ({blog, handleLike}) => {
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
    <div>
      {blog.title} {blog.author}
      <button onClick={() => setShowDetail(false)}>hide</button>
      <br/>
      {blog.url}
      <br/>
      Likes {blog.likes}
      <button onClick={() => handleLike(blog)}>Like</button>
      <br/>
      {blog.user.name}
    </div>
  )

  return(
    <div style={blogStyle}>
      {!showDetail && compactView()}
      {showDetail && detailView()}
    </div>  
  )
}

export default Blog