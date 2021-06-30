import React from "react"

type CoursePart = {
  name: string,
  exerciseCount: number
}

const Total = ({courseParts} : {courseParts: CoursePart[]}) => (
  <p>
    Number of exercises{" "}
    {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
)

export default Total