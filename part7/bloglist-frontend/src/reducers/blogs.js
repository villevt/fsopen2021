import blogService from "../services/blogs"
import { setNotification } from "./notification"

const reducer = (state = null, action) => {
  switch (action.type) {
    case "INIT_BLOGS": {
      const copy = [...action.data]
      copy.sort((a, b) => b.likes - a.likes)
      return copy
    } case "ADD_BLOG": {
      return state.concat(action.data)
    } case "UPDATE_BLOG": {
      const copy = [...state]
      copy[copy.findIndex(blog => blog.id === action.data.id)] = action.data
      copy.sort((a, b) => b.likes - a.likes)
      return copy
    } default: {
      return state
    }
  }
}

export const initBlogs = () => {
  return async dispatch => {
    try {
      dispatch({
        type: "INIT_BLOGS",
        data: await blogService.getAll()
      })
    } catch (error) {
      if (error.response) {
        dispatch(setNotification({message: error.response.data.error || "Error fetching blogs", error: true}, 3))
      } else {
        dispatch(setNotification({message: "Couldn't reach API to fetch blogs", error: true}, 3))
      }
    }
  }
}

export const addBlog = blog => {
  return async dispatch => {
    try {
      const response = await blogService.createNew(blog)
      dispatch({
        type: "ADD_BLOG",
        data: response
      })
      dispatch(setNotification({message: `Created new blog ${response.title} by ${response.author}`}, 3))
    } catch (error) {
      dispatch(setNotification({message: error.response.data.error || "Error creating blog", error: true}, 3))
    }
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    try {
      const copy = {...blog, likes: blog.likes++}
      await blogService.update(copy)
      dispatch({
        type: "UPDATE_BLOG",
        data: blog
      })
      dispatch(setNotification({message: `Liked blog ${blog.title} by ${blog.author}`}, 3))
    } catch (error) {
      dispatch(setNotification({message: error.response.data.error || "Error liking blog", error: true}, 3))
    }
  }
}

export default reducer