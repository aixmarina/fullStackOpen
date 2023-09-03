import { useState } from 'react'

const Button = ({ handleClick, text }) => (<button onClick={handleClick}> {text} </button>)

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = (good > 0 || bad > 0) ? ((good - bad) / all) : 0
  const positive = (good > 0) ? (good / all * 100) : 0

  if (good === 0 && neutral === 0 && bad === 0){
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  
  return(
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive} %</p>
    </div>
  )
}
  
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={increaseGood} text='good'/>
      <Button handleClick={increaseNeutral} text='neutral'/>
      <Button handleClick={increaseBad} text='bad'/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App