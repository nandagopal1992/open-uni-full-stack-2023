import React from 'react'
import Person from './Person'

const PersonList = ({persons}) => {
    return (
        persons.map(person => <Person key={person.id} person={person}/>)
    )
}

export default PersonList