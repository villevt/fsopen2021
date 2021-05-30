import React, { useState } from 'react'

const Button = ({text, handleClick}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = ({name, value}) => <p>{name} {value}</p>

const Statistics = ({good, neutral, bad}) => {
  const total = good + bad + neutral

  const avgRating = () => {
    if (total > 0) {
      return (good + bad * -1) / total
    }
    else {
      return 0
    }
  }

  const pctPositive = () => {
    if (total > 0) {
      return good / total * 100 + " %"
    }
    else {
      return "0 %"
    }
  }
  
  return (
    <div>
      <h1>Statistics</h1>
      <Statistic name="good" value={good} />
      <Statistic name="neutral" value={neutral} />
      <Statistic name="bad" value={bad} />
      <Statistic name="total" value={total} />
      <Statistic name="average" value={avgRating()} />
      <Statistic name="positive" value={pctPositive()} />
    </div>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text="good" handleClick={() => setGood(good + 1)} />
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" handleClick={() => setBad(bad + 1)} />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App