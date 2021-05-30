import React from 'react'

import Part from './Part'

const Content = ({ course }) => (
    <div>
        <Part part={course.parts[0]} />
        <Part part={course.parts[1]} />
        <Part part={course.parts[2]} />
    </div>
)

export default Content