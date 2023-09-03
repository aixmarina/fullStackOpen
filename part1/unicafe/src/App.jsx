import { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick}> {text} </button>

const StatisticLine = ({ text, value }) => {
  if(text !== 'positive'){
    return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
    )
  }
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
      <td>%</td>
    </tr>
  )
}

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
      <table>
        <tbody>
          <StatisticLine text='good' value={good} />  
          <StatisticLine text='neutral' value={neutral} />  
          <StatisticLine text='bad' value={bad} />  
          <StatisticLine text='all' value={all} />  
          <StatisticLine text='average' value={average} />  
          <StatisticLine text='positive' value={positive} />  
        </tbody>
      </table>
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