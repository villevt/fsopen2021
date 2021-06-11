import React from "react"

const Notification = ({notification}) => {
  const style = {
    color: "white",
    marginBottom: "10px",
    padding: "2px",
    width: "50%"
  }

  if (notification && notification.error) {
    style.backgroundColor = "red"
  } else {
    style.backgroundColor = "green"
  }

  if (notification) {
    return (
      <div style={style}>
        {notification.message}
      </div>
    )
  } else {
    return null
  }
}

export default Notification