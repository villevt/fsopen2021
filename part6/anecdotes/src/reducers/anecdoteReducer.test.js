import deepFreeze from "deep-freeze"
import anecdoteReducer, {voteAnecdote, addAnecdote} from "./anecdoteReducer"

describe("anecdote reducer", () => {
  const initialState = anecdoteReducer(undefined, "NONE")
  deepFreeze(initialState)

  test("the state is defined even if no initial state is passed to the reducer", () => {
    expect(initialState).toBeDefined()
    expect(initialState.length).toBeGreaterThanOrEqual(1)
  })

  describe("voting", () => {
    test("voting increases the vote counter by one for the right anecdote", () => {
      const action = voteAnecdote(initialState[0].id)
      const newState = anecdoteReducer(initialState, action)
  
      expect(newState[0].votes).toEqual(1)
      expect(newState).not.toEqual(initialState)
    })
  
    test("voting does not alter other anecdotes", () => {
      const action = voteAnecdote(initialState[0].id)
      const newState = anecdoteReducer(initialState, action)
  
      expect(newState.slice(1)).toEqual(initialState.slice(1))
    })
  
    test("voting only alters votes", () => {
      const action = voteAnecdote(initialState[0].id)
      const newState = anecdoteReducer(initialState, action)
  
      expect(newState[0].content).toBe(initialState[0].content)
      expect(newState[0].id).toBe(initialState[0].id)
    })
  })

  describe("adding anecdotes", () => {
    test("new anecdote exists in state after adding it", () => {
      const content = "Don't trust anecdotal claims, for those who go as far as to make such egregious overgeneralizing statements, know no better."
      const action = addAnecdote(content)
      const newState = anecdoteReducer(initialState, action)

      expect(newState).toEqual(expect.arrayContaining(
        [expect.objectContaining({content})]
      ))
    })

    test("other anecdotes remain unaltered after new anecdote is added", () => {
      const content = "Don't trust anecdotal claims, for those who go as far as to make such egregious overgeneralizing statements, know no better."
      const action = addAnecdote(content)
      const newState = anecdoteReducer(initialState, action)

      expect(newState).toEqual(expect.arrayContaining(
        initialState
      ))
    })

    test("amount of anecdotes grows by 1", () => {
      const content = "Don't trust anecdotal claims, for those who go as far as to make such egregious overgeneralizing statements, know no better."
      const action = addAnecdote(content)
      const newState = anecdoteReducer(initialState, action)

      expect(newState).toHaveLength(initialState.length + 1)
    })
  })
})