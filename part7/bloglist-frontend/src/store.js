import { applyMiddleware, combineReducers, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import blogsReducer from "./reducers/blogs"
import notificationReducer from "./reducers/notification"

const reducer = combineReducers({
  blogs: blogsReducer,
  notification: notificationReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store