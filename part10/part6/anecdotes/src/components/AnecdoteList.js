import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { initializeAnecdotes, voteAnecdote } from "../reducers/anecdoteReducer"
import { changeNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdoteFilter = useSelector(state => state.filter)

  const anecdotes = useSelector(state => state.anecdotes.filter(anecdote => {
    return anecdote.content.toLowerCase().includes(anecdoteFilter.toLowerCase())
  }))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [])

  const vote = anecdote => {
    dispatch(voteAnecdote(anecdote))

    dispatch(changeNotification(`You voted "${anecdote.content}"`, 5))
  }

  return (
    <div>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList