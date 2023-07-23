import { useState } from 'react'

const Button = ({clickEvent, text}) => {
  return (
  <button onClick={clickEvent}>{text}</button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad, all}) => {
  if(all === 0){
    return (
      <div>No feedback given</div>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good}/>
        <StatisticLine text="neutral" value={neutral}/>
        <StatisticLine text="bad" value={bad}/>
        <StatisticLine text="all" value={all}/>
        <StatisticLine text="average" value={Math.round((good - bad)/ all, 2)} />
        <StatisticLine text="positive %" value={Math.round(good*100/all, 2) + "%"} />
        </tbody>
    </table>
  
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const updateClick = (btnText) => {

    const updateState = () => {
      // console.log(btnText)
      if(btnText === "good"){
        const updatedGood = good + 1
        setGood(updatedGood)
        setAll(updatedGood + neutral + bad)
      }
      else if(btnText === "neutral"){
        const updatedNeu= neutral + 1
        setNeutral(updatedNeu)
        setAll(updatedNeu+ good + bad)
      }
      else {
        const updatedBad = bad + 1
        setBad(updatedBad)
        setAll(updatedBad + good + neutral)
      }
    }
    return updateState
  }

  

  return (
    <div>
      <h1> Feedback Form </h1>
      <Button clickEvent={updateClick("good")} text="good" />
      <Button clickEvent={updateClick("neutral")} text="neutral" />
      <Button clickEvent={updateClick("bad")} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
      
    </div>
  )
}

export default App