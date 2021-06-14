import deepFreeze from "deep-freeze"
import filterReducer, { changeFilter } from "./filterReducer"

describe("filter reducer", () => {
  const initialState = ""
  deepFreeze(initialState)

  test("is initialized as an empty string", () => {
    const newState = filterReducer(undefined, "NONE")

    expect(newState).toBe(initialState)
  })

  test("changes to new string when altered", () => {
    const action = changeFilter("new state")
    const newState = filterReducer(initialState, action)

    expect(newState).toBe("new state")
  })
})