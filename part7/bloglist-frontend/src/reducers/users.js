import { setNotification } from "./notification"
import api from "../services/api"

const userService = api("/api/users")

const reducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_USERS": {
      return action.data.sort((a, b) => b.blogs.length - a.blogs.length)
    } default: {
      return state
    }
  }
}

export const initUsers = () => {
  return async dispatch => {
    try {
      const data = await userService.getAll()
      await dispatch({
        type: "INIT_USERS",
        data: data
      })
    } catch(error) {
      dispatch(setNotification({message: error.response.data.error || "Error fetching users", error: true}, 3))
    }
  }
}

export default reducer