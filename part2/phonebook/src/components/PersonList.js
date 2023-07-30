import React from 'react'
import Person from './Person'
import PersonService from '../service/persons'

const PersonList = ({persons, setPersons}) => {

    const OnDelete = (id) => {

        if(window.confirm(`Do you want to delete the user ${persons.find(p=> p.id == id).name}`)){
          PersonService
          .deletePerson(id)
          .then(response => {
            console.log('deleted')
            setPersons(persons.filter(p => p.id !== id))
          })
          .catch(error => {
            console.log('asdasdas')
          })
        }
      }
    return (
        persons.map(person => <Person key={person.id} person={person} deleteUser={() => OnDelete(person.id)}/>)
    )
}

export default PersonList