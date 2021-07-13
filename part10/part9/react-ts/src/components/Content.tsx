import React from "react"

import Part from "./Part"
import { CoursePart } from "../App"

const Content = ({courseParts} : {courseParts: CoursePart[]}) => (
  <div>
    {courseParts.map((coursePart: CoursePart) => {
      return(
        <Part key={coursePart.name} coursePart={coursePart} />
      )
    })}
  </div>
)

export default Content