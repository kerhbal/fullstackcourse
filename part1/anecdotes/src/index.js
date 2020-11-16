import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0)
  const startPoints = createStartPoints(anecdotes)
  const [points, setPoints] = useState(startPoints)
  // maxIndex is the index of anecdote with max votes
  const [maxIndex, setMaxIndex] = useState(-1)
  const handleSelect = () => setSelected(Math.floor(Math.random() * anecdotes.length))
  const handleVote = () => {
    setPoints(addVote(selected, points));
    
    if (maxIndex === -1 || points[maxIndex] < points[selected] + 1) {
      setMaxIndex(selected)
    }
  }
  return (
    <div>
      <Title text = "Anecdote of the day" />
      <Anecdote anecdotes={anecdotes} selected={selected} />
      <ShowVotes selected={selected} points={points} showEmpty={true}/>
      <Button onClick={handleVote} text="vote" />
      <Button onClick={handleSelect} text="next anecdote" />
      <Title text = "Anecdote with most votes" />
      <Anecdote anecdotes={anecdotes} selected={maxIndex} />
      <ShowVotes selected={maxIndex} points={points} showEmpty={false}/>
    </div>
  )
}

const createStartPoints = (array) => {
  const start = [];
  array.forEach(_ => {
    start.push(0)
  });
  return start
}

const Title = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const ShowVotes = ({ selected, points, showEmpty }) => {
  if (selected === -1) {
    return (
      <div></div>
    )
  }
  const votes = points[selected];
  if (votes === 0 && !showEmpty) {
    return (
      <div></div>
    )
  }
  return (
    <div>
      has {votes} votes
    </div>
  )
}

const addVote = (index, points) => {
  const copy = { ...points };
  copy[index] += 1;
  return copy
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Anecdote = ({ anecdotes, selected }) => {
  if (selected < 0) {
    return <div></div>
  }
  return (
    <div>
      {anecdotes[selected]}
    </div>
  )
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
