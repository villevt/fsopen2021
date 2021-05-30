import React from 'react'

const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, who is {props.age} years old!</p>
    </div>
  )
}

const App = () => {
  const now = new Date()
  const a = 10
  const b = 20
  const name = "Ville"
  const age = 22
  

  return (
    <div>
      <h1>Greetings!</h1>
      <Hello name={name} age={age}/>
      <p>It is {now.toString()}</p>
      <p>
        {a} plus {b} is {a + b}
      </p>
    </div>
  )
}

export default App;
