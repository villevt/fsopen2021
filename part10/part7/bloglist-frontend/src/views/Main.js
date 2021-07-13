import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import styled from "styled-components"

import NewBlog from "../components/NewBlog"

const Row = styled.div`
  border-color: Sienna;
  border-style: solid;
  border-width: 0 0 2px 0;
  margin-bottom: 0.5em;
  margin-top: 0.5em;
  > a {
    color: Sienna;
    text-decoration: None;
  }
  > a:hover {
    color: Chocolate;
  }
`

const Main = () => {
  const blogs = useSelector(state => state.blogs)
  
  const linkContainerStyle = {
    display: "flex",
    flexDirection: "column"
  }

  return (
    <div>
      <NewBlog />
      <br/>
      <div style={linkContainerStyle}>
        {blogs && blogs.map(blog =>
          <Row key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title}
            </Link>
          </Row>
        )}
      </div>
    </div>
  )
}

export default Main