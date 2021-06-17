import { applyMiddleware, combineReducers, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import blogsReducer from "./reducers/blogs"
import notificationReducer from "./reducers/notification"
import usersReducer from "./reducers/users"

const reducer = combineReducers({
  blogs: blogsReducer,
  notification: notificationReducer,
  users: usersReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store