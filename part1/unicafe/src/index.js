import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const handleClick = (input) => {
    if (input === 0) {
      return () => setNeutral(neutral + 1)
    }
    if (input === 1) {
      return () => setGood(good + 1)
    }
    if (input === -1) {
      return () => setBad(bad + 1)
    }
  }
  return (
    <div>
      <FeedBack handleFunc={handleClick} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>

  )
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const FeedBack = ({ handleFunc }) => {
  return (
    <div>
      <Title title="give feedback" />
      <Button onClick={handleFunc(1)} text="good" />
      <Button onClick={handleFunc(0)} text="neutral" />
      <Button onClick={handleFunc(-1)} text="bad" />
    </div>

  )
}

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  if (all === 0) {
    return (
      <div>
        <Title title="statistics" />
        <div>No feedback given</div>
      </div>
    )
  }
  const positive = good / all * 100
  return (
    <div>
      <Title title="statistics" />
      <table>
        <tbody>
          <Statistic name="good" content={good} />
          <Statistic name="neutral" content={neutral} />
          <Statistic name="bad" content={bad} />
          <Statistic name="all" content={all} />
          <Statistic name="average" content={(good - bad) / all} />
          <Statistic name="positive" content={positive + ' %'} />
        </tbody>
      </table>
    </div>

  )
}

const Statistic = ({ name, content }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{content}</td>
    </tr>
  )
}

const Title = ({ title }) => {
  return (
    <h1>
      {title}
    </h1>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
