import React, {useImperativeHandle, useState} from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const Button = styled.button`
  background-color: Sienna;
  border: none;
  color: Snow;
  font-size: 1em;
  padding: 0.25em;
  border-radius: 5px;
  :hover {
    background-color: Chocolate;
  }
`

const Togglable = React.forwardRef(({buttonLabel, ...props}, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {toggleVisibility}
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
})

Togglable.displayName = "Togglable"
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable