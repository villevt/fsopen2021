import React from 'react'

const Total = ({ course }) => {

    const sum = course.parts.reduce((a, b) => {
        a.exercises += b.exercises
        return a
    }).exercises
    
    return(
        <p><b>total of {sum} exercises</b></p>
    ) 
}

export default Total