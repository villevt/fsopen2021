import React from 'react'

const Notification = ({message, error}) => {
    const style = {
        color: "white",
        marginBottom: "10px",
        padding: "2px",
        width: "50%"
    }

    if (error) {
        style.backgroundColor = "red"
    } else {
        style.backgroundColor = "green"
    }

    if (message) {
        return (
            <div style={style}>
                {message}
            </div>
        )
    } else {
        return null
    }
}

export default Notification