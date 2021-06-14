import deepFreeze from "deep-freeze"
import notificationReducer, {changeNotification, resetNotification} from "./notificationReducer"

describe("notification reducer", () => {
  const initialState = ""
  deepFreeze(initialState)

  test("is initialized as an empty string", () => {
    const newState = notificationReducer(undefined, "NONE")

    expect(newState).toBe(initialState)
  })

  test("changes to new string when altered", () => {
    const action = changeNotification("new state")
    const newState = notificationReducer(initialState, action)

    expect(newState).toBe("new state")
  })

  test("is an empty string after reset", () => {
    const actionChange = changeNotification("new state")
    const newState = notificationReducer(initialState, actionChange)
    deepFreeze(newState)
    expect(newState).toBe("new state")

    const actionReset = resetNotification()
    const resetState = notificationReducer(newState, actionReset)
    expect(resetState).toBe("")
  })
})