import React from "react"

type CoursePart = {
  name: string,
  exerciseCount: number
}

const Content = ({courseParts} : {courseParts: CoursePart[]}) => (
  <div>
    {courseParts.map((coursePart: CoursePart) => {
      return(
        <p key={coursePart.name}>{coursePart.name} {coursePart.exerciseCount}</p>
      )
    })}
  </div>
)

export default Content