import React from 'react'

const Filter = ({handleFilter}) => (
    <div>
        find countries <input onChange={handleFilter}/>
    </div>
)

export default Filter