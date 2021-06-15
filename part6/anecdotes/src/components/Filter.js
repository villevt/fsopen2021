import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { changeFilter } from "../reducers/filterReducer"

const Filter = ({changeFilter}) => {
  const handleChange = event => {
    changeFilter(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

Filter.propTypes = {
  changeFilter: PropTypes.func
}

const ConnectedFilter = connect(null, {changeFilter})(Filter)

export default ConnectedFilter