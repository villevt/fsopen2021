const reducer = (state = "", action) => {
  switch (action.type) {
    case "CHANGE_NOTIFICATION":
      return action.message
    case "RESET_NOTIFICATION":
      return ""
    default: return state
  }
}

export const changeNotification = message => {
  return {
    type: "CHANGE_NOTIFICATION",
    message
  }
}

export const resetNotification = () => {
  return {
    type: "RESET_NOTIFICATION"
  }
}

export default reducer