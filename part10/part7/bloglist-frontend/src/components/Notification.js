import React from "react"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"
import styled from "styled-components"

const Container = styled.div`
  color: Snow;
  position: absolute;
  right: 1em;
  top: 1.75em;
  width: 30%;
  padding: 1em;
`

const Notification = () => {
  const style = {
    backgroundColor: "SpringGreen"
  }

  const notification = useSelector(state => state.notification)

  if (notification && notification.error) {
    style.backgroundColor = "Tomato"
  } else {
    style.backgroundColor = "SpringGreen"
  }

  if (notification) {
    return (
      <Container style={style} className="notification">
        {notification.message}
      </Container>
    )
  } else {
    return null
  }
}

Notification.propTypes = {
  notification: PropTypes.object
}

export default Notification