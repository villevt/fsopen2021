import blogService from "../services/blogs"
import loginService from "../services/login"
import { setNotification } from "./notification"

const reducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_USER": {
      if (!state.find(user => user.id === action.data.id)) {
        return state.concat(action.data)
      } else {
        return state
      }
    } case "LOGIN_USER": {
      return state.map(user => {
        if (user.id === action.data.id) {
          return {
            ...user,
            logged: true
          }
        } else {
          return {
            ...user,
            logged: false
          }
        }
      })
    } case "LOGOUT_USER": {
      return state.map(user => {
        return {
          ...user,
          logged: false
        }
      })
    } default: {
      return state
    }
  }
}

export const getSavedUser = () => {
  return async dispatch => {
    const loggedUserJSON = await window.localStorage.getItem("loggedBloglistUser")
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      blogService.setToken(loggedUser.token)
      dispatch({
        type: "ADD_USER",
        data: loggedUser
      })
      dispatch({
        type: "LOGIN_USER",
        data: loggedUser
      })
    }
  }
}

export const loginUser = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem(
        "loggedBloglistUser", JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch({
        type: "ADD_USER",
        data: user
      })
      dispatch({
        type: "LOGIN_USER",
        data: user
      })
      dispatch(setNotification({message: `Logged in successfully as ${user.username}`}, 3))
    } catch (error) {
      dispatch(setNotification({message: error.response.data.error || "Error logging in", error: true}, 3))
    }
  }
}

export const logoutUser = () => {
  return async dispatch => {
    blogService.setToken("")
    window.localStorage.removeItem("loggedBloglistUser")
    dispatch({
      type: "LOGOUT_USER"
    })
    dispatch(setNotification({message: "Logged out"}, 3))
  }
}

export default reducer