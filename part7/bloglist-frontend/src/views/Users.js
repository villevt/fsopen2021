import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import styled from "styled-components"

import { initUsers } from "../reducers/users"

const TdLink = styled.td`
  > a {
    color: Sienna;
  }
  > a:hover {
    color: Chocolate
  }
`

const Users = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initUsers())
  }, [])

  const users = useSelector(state => state.users)

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return (
              <tr key={user.id}>
                <TdLink><Link to={`/users/${user.id}`}>{user.name}</Link></TdLink>
                <td>{user.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Users