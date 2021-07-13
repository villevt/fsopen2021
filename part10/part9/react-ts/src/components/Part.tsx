import React from "react"
import { CoursePart } from "../App"

const Part = ({coursePart}: {coursePart: CoursePart}) => {
  let data
  switch (coursePart.type) {
    case "normal": 
      data = <p><i>{coursePart.description}</i></p>
      break
    case "groupProject":
      data = <p>Project exercises {coursePart.groupProjectCount}</p>
      break
    case "submission":
      data = <p>
        <i>{coursePart.description}</i>
        <br/>
        Submit to {coursePart.exerciseSubmissionLink}
      </p>
      break
    case "special":
      data = <p>
        <i>{coursePart.description}</i>
        <br/>
        Required skills: {coursePart.requirements.join(", ")}
      </p>
      break
    default:
      break
  }

  return (
    <div>
      <b>{coursePart.name} {coursePart.exerciseCount}</b>
      {data}
    </div>
  )
}

export default Part