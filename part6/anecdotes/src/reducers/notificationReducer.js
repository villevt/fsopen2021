const reducer = (state = "", action) => {
  switch (action.type) {
    case "CHANGE_NOTIFICATION":
      return action.data
    case "RESET_NOTIFICATION":
      return ""
    default: return state
  }
}

let timeout

export const changeNotification = (message, seconds) => {
  return async dispatch => {
    clearTimeout(timeout)
    dispatch({
      type: "CHANGE_NOTIFICATION",
      data: message
    })

    timeout = await setTimeout(() => {
      dispatch({
        type: "RESET_NOTIFICATION"
      })
    }, seconds * 1000)
  }
}
export default reducer