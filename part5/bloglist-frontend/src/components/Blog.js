import React, {useState} from "react"
import blogs from "../services/blogs"

const Blog = ({blog}) => {
  const [showDetail, setShowDetail] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    border: "2px solid black",
    padding: "2px",
    margin: "2px  "
  }

  const handleLike = async () => {
    await blogs.like(blog)
    setLikes(++blog.likes)
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
      Likes {likes}
      <button onClick={() => handleLike()}>Like</button>
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