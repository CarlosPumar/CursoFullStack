import React from "react";
import ReactDOM from "react-dom";

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  const Header = (props) => {
    console.log(props.course.name);
    return (
      <>
        <h1>{props.course.name}</h1>
      </>
    );
  };

  const Content = (props) => {
    console.log(props.course.parts[0].exercises);

    return (
      <>
        <Part
          name={props.course.parts[0].name}
          exercise={props.course.parts[0].exercises}
        />
        <Part
          name={props.course.parts[1].name}
          exercise={props.course.parts[1].exercises}
        />
        <Part
          name={props.course.parts[2].name}
          exercise={props.course.parts[2].exercises}
        />
      </>
    );
  };

  const Part = (props) => {
    return (
      <>
        <p>
          {props.name} {props.exercise}
        </p>
      </>
    );
  };

  const Total = (props) => {
    return (
      <>
        <p>
          Number of exercises{" "}
          {props.course.parts[0].exercises +
            props.course.parts[1].exercises +
            props.course.parts[2].exercises}
        </p>
      </>
    );
  };

  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
