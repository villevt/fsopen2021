import React, { useState } from 'react'

const AnecdotePanel = ({header, anecdote, votes}) => (
  <div>
    <h1>
      {header}
    </h1>
    <p>
      {anecdote}
      <br/> 
      has {votes} votes
    </p>
  </div>
)

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>

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
  
  const selectRandom = () => setSelected(Math.floor(Math.random() * anecdotes.length))

  const [mostVotedAnecdote, mostVotedVotes] = mostVoted()

  return (
    <div>
      <AnecdotePanel anecdote={anecdotes[selected]} header="Anecdote of the day" votes={votes[selected]} />
      <Button handleClick={voteCurrent} text="Vote" />
      <Button handleClick={selectRandom} text="Next anecdote" />
      <AnecdotePanel anecdote={mostVotedAnecdote} header="Anecdote with most votes" votes={mostVotedVotes} />
    </div>
  )
}

export default App