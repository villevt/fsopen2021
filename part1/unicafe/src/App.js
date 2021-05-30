import React, { useState } from 'react'

const Button = ({text, handleClick}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = ({text, amount}) => (
  <p>{text} {amount}</p>
)

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

      <h1>Statistics</h1>
      <Statistic text="good" amount={good} />
      <Statistic text="neutral" amount={neutral} />
      <Statistic text="bad" amount={bad} />
    </div>
  )
}

export default App