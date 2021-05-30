import React, { useState } from 'react'

const AnecdotePanel = ({anecdote, votes}) => <p>{anecdote}<br/> has {votes} votes</p>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const mostVoted = () => {
    let max = 0
    let maxIdx = 0
    let idx = 0

    anecdotes.forEach(value => {
      if (votes[idx] > max) {
        max = votes[idx]
        maxIdx = idx
      }
      idx++
    })

    return [anecdotes[maxIdx], max]
  }

  const voteCurrent = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const [mostVotedAnecdote, mostVotedVotes] = mostVoted()

  const selectRandom = () => setSelected(Math.floor(Math.random() * anecdotes.length))
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <AnecdotePanel anecdote={anecdotes[selected]} votes={votes[selected]} />

      <button onClick={voteCurrent}>
        Vote
      </button>
      <button onClick={selectRandom}>
        Next anecdote
      </button>

      <h1>Anecdote with most votes</h1>
      <AnecdotePanel anecdote={mostVotedAnecdote} votes={mostVotedVotes} />
    </div>
  )
}

export default App