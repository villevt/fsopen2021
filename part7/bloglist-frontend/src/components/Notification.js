import React from "react"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"

const Notification = () => {
  const style = {
    color: "white",
    marginBottom: "10px",
    padding: "2px",
    width: "50%"
  }

  const notification = useSelector(state => state.notification)

  if (notification && notification.error) {
    style.backgroundColor = "red"
  } else {
    style.backgroundColor = "green"
  }

  if (notification) {
    return (
      <div style={style} className="notification">
        {notification.message}
      </div>
    )
  } else {
    return null
  }
}

Notification.propTypes = {
  notification: PropTypes.object
}

export default Notification