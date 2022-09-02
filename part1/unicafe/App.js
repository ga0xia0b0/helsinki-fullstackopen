import { useState } from 'react'

const Button = ({text,handleClick}) => 
<button onClick={handleClick}>{text}</button>

const StatisticLine = ({text,value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({good,neutral,bad}) => {
  const all = good + bad + neutral
  const average = ((good - bad)/all).toFixed(1)
  const positive = (good/all*100).toFixed(1)+'%'
  if(good+neutral+bad===0) return(
    <div>
      No feedback given
    </div>
  )
  return(
    <table>
      <tbody>
        <StatisticLine text="good" value ={good} />
        <StatisticLine text="neutral" value ={neutral} />
        <StatisticLine text="bad" value ={bad} />
        <StatisticLine text="all" value ={all} />
        <StatisticLine text="average" value ={average} />
        <StatisticLine text="positive" value ={positive} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <Button text="good" handleClick={()=>setGood(good+1)}></Button>
      <Button text="neutral" handleClick={()=>setNeutral(neutral+1)}></Button>
      <Button text="bad" handleClick={()=>setBad(bad+1)}></Button>
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App