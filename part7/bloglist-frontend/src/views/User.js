import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouteMatch } from "react-router"

import { initUsers } from "../reducers/users"

const User = () => {
  const dispatch = useDispatch()

  const id = useRouteMatch("/users/:id").params.id
  const user = useSelector(state => state.users.find(user => user.id === id))

  if (!user) {
    dispatch(initUsers())
  }

  return (
    <div>
      {user
        ? <div>
          <h2>{user.name}</h2>
          <h3>Added blogs</h3>
          <ul>
            {user.blogs.map(blog =>{
              return(
                <li key={blog.id}>
                  {blog.title}
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

export default User