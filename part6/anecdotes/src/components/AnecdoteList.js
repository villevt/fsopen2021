import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { initializeAnecdotes, voteAnecdote } from "../reducers/anecdoteReducer"
import { changeNotification, resetNotification } from "../reducers/notificationReducer"
import anecdoteService from "../services/anecdotes"

const AnecdoteList = () => {
  const anecdoteFilter = useSelector(state => state.filter)

  const anecdotes = useSelector(state => state.anecdotes.filter(anecdote => {
    return anecdote.content.toLowerCase().includes(anecdoteFilter.toLowerCase())
  }))
  const dispatch = useDispatch()

  useEffect(async () => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(initializeAnecdotes(anecdotes))
  }, [])

  const vote = ({id, content}) => {
    dispatch(voteAnecdote(id))

    dispatch(changeNotification(`You voted "${content}"`))
    setTimeout(() => dispatch(resetNotification()), 5000)
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