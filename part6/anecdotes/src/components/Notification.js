import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

const Notification = ({notification}) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1
  }
  
  return (
    <div>
      {notification !== "" 
        ? <div style={style}>{notification}</div>
        : null
      }
    </div>
  )
}

Notification.propTypes = {
  notification: PropTypes.string
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification