import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { logoutUser } from "../reducers/currentUser"

const Navigation = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.currentUser)

  const navigationStyle = {
    backgroundColor: "lightgray",
    padding: "10px",
    display: "flex"
  }

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <div style={navigationStyle}>
      <Link to="/blogs">
        Blogs
      </Link>
      <Link to="/users">
        Users
      </Link>
      {user.name} logged in 
      <button onClick={() => handleLogout()}>
        Logout
      </button>
    </div>
  )
}

export default Navigation