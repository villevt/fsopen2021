import deepFreeze from "deep-freeze"
import anecdoteReducer, {voteAnecdote} from "./anecdoteReducer"

describe("anecdote reducer", () => {
  test("the state is defined even if no initial state is passed to the reducer", () => {
    const newState = anecdoteReducer(undefined, "NONE")
    expect(newState).toBeDefined()
    expect(newState.length).toBeGreaterThanOrEqual(1)
  })

  test("voting increases the vote counter by one for the right anecdote", () => {
    const initialState = anecdoteReducer(undefined, "NONE")

    deepFreeze(initialState)
    const action = voteAnecdote(initialState[0].id)
    const newState = anecdoteReducer(initialState, action)

    expect(newState[0].votes).toEqual(1)
    expect(newState).not.toEqual(initialState)
  })

  test("voting does not alter other anecdotes", () => {
    const initialState = anecdoteReducer(undefined, "NONE")

    deepFreeze(initialState)
    const action = voteAnecdote(initialState[0].id)
    const newState = anecdoteReducer(initialState, action)

    expect(newState.slice(1)).toEqual(initialState.slice(1))
  })

  test("voting only alters votes", () => {
    const initialState = anecdoteReducer(undefined, "NONE")

    deepFreeze(initialState)
    const action = voteAnecdote(initialState[0].id)
    const newState = anecdoteReducer(initialState, action)

    expect(newState[0].content).toBe(initialState[0].content)
    expect(newState[0].id).toBe(initialState[0].id)
  })
})