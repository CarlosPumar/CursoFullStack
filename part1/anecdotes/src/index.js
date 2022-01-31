import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));
  const max = Math.max(...points);
  const maxPointsSelected = points.indexOf(max);

  const Button = ({ text, handleClick }) => {
    return (
      <>
        <button onClick={handleClick}>{text}</button>
      </>
    );
  };

  const Anecdote = ({ title, selected, points }) => {
    return (
      <>
        <h1>{title}</h1>
        {anecdotes[selected]}
        <br />
        has {points[selected]} points
      </>
    );
  };

  const handleRandomAnecdoteClick = () => {
    const newSelected = Math.floor(Math.random() * anecdotes.length);
    setSelected(newSelected);
  };

  const handleVoteClick = (selected, points) => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
  };

  return (
    <>
      <Anecdote
        title={"Anecdote of the day"}
        selected={selected}
        points={points}
      />
      <br />
      <Button
        text={"vote"}
        handleClick={() => handleVoteClick(selected, points)}
      />
      <Button text={"next anecdote"} handleClick={handleRandomAnecdoteClick} />
      <Anecdote
        title={"Anecdote with most votes"}
        selected={maxPointsSelected}
        points={points}
      />
    </>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
