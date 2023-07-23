
const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
    {props.part} {props.exercise}
    </p>
  )
}
const Content = (props) => {
  return (
    <div>
      <Part part={props.content[0].part} exercise={props.content[0].exercise} />
      <Part part={props.content[1].part} exercise={props.content[1].exercise} />
      <Part part={props.content[1].part} exercise={props.content[2].exercise} />
    </div>
  )
}

const Footer = (props) => {
  let numExercises = 0
  for(let i= 0; i< props.content.length; i++){
    numExercises += props.content[i].exercise;
  }
  return (
    <p>Number of exercises {numExercises}</p>
  )
}

const App = () => {
  const course = {
    name : 'Half Stack application development',
    content : [
      {part : 'Fundamentals of React', exercise : 10},
      {part : 'Using props to pass data', exercise : 7},
      {part : 'State of a component', exercise : 14},
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content content={course.content} />
      <Footer content={course.content} />
    </div>
  )
}

export default App;
