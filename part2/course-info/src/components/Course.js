const Header = ({name}) => {
    return (
      <h2>{name}</h2>
    )
  }
  
  const Part = ({name, exercises}) => {
    return (
      <p>
      {name} {exercises}
      </p>
    )
  }
  const Content = ({parts}) => {
    return (
      <div>
        {parts.map(p => <Part key={p.id} name={p.name} exercises={p.exercises}/>)}
      </div>
    )
  }
  
  const Footer = ({parts}) => {
    const s=0
    const numExercises = parts.reduce((a,p) => a+p.exercises, s)
    return (
      <h4>total of {numExercises} exercises</h4>
    )
  }

  const Course = ({course}) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Footer parts={course.parts} />
        </div>
    )
  }

  export default Course;