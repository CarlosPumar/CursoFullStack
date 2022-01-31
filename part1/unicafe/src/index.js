import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const Button = ({ handleClick, text }) => {
    return (
      <>
        <button onClick={handleClick}>{text}</button>
      </>
    );
  };

  const Statistics = ({ good, neutral, bad }) => {
    const all = good + neutral + bad;

    if (all === 0) {
      return <>No feedback given</>;
    }

    const average = (good - bad) / all;
    const positive = (good / all) * 100;
    const positiveString = String(positive).concat(" %");

    return (
      <>
        <table>
          <tbody>
            <Statistic text="good" value={good} />
            <Statistic text="neutral" value={neutral} />
            <Statistic text="bad" value={bad} />
            <Statistic text="all" value={all} />
            <Statistic text="average" value={average} />
            <Statistic text="positive" value={positiveString} />
          </tbody>
        </table>
      </>
    );
  };

  const Statistic = ({ text, value }) => {
    return (
      <>
        <tr>
          <td>{text}</td>
          <td>{value}</td>
        </tr>
      </>
    );
  };

  const handleGoodClick = () => {
    const newGood = good + 1;
    setGood(newGood);
  };

  const handleNeutralClick = () => {
    const newNeutral = neutral + 1;
    setNeutral(newNeutral);
  };

  const handleBadClick = () => {
    const newBad = bad + 1;
    setBad(newBad);
  };

  return (
    <>
      <h1>give feed back</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
