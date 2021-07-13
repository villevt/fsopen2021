import React from "react"

const AddNumber = ({handleSubmit}) => {
  const submitPressed = (event) => {
    event.preventDefault()

    if (event.target.form[0].value === "") {
      alert("Please fill in a name")
    } else if (event.target.form[1].value === "") {
      alert("Please fill in a number")
    } else {
      handleSubmit(event)
    }
  }

  return (
    <form>
      <div>
        name: <input />
      </div>
      <div>
        number: <input />
      </div>
      <div>
        <button onClick={submitPressed} type="submit">add</button>
      </div>
    </form>
  )
}

export default AddNumber