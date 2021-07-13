const reducer = (state = null, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION": {
      return action.data
    } case "CLEAR_NOTIFICATION": {
      return null
    } default: {
      return state
    }
  }
}

let notificationTimeout

export const setNotification = (notification, seconds) => {
  return dispatch => {
    dispatch({
      type: "SET_NOTIFICATION",
      data: notification
    })

    clearTimeout(notificationTimeout)
    notificationTimeout = setTimeout(() => {
      dispatch({
        type: "CLEAR_NOTIFICATION"
      })
    }, seconds * 1000)
  }
}

export default reducer