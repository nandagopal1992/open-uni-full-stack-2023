import {useState, useEffect} from 'react'
import Person from './components/Person'
import SearchField from './components/SearchField'
import PersonList from './components/PersonList'
import PersonService from './service/persons'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [searchField, setSearchField] = useState('')
  
  useEffect(() => {
    console.log('effect hook!')
    PersonService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })

  }, [])

  const handleSearchFieldChange = (event) => {
      console.log(event.target.value)
      setSearchField(event.target.value)
    }

  const addName = (event) => {
    setNewName(event.target.value)
  }

  const addPhone = (event) => {
    setNewPhone(event.target.value)
  }


  const addNewPersonToList = (event) => {
    event.preventDefault()
    const person = persons.filter(p => p.name.toLowerCase() === newName.toLowerCase())[0]
    if(person && person.id){
      console.log('Updating existing user with id ', person.id)
      const newPerson = {name : person.name, number: newPhone,  id : person.id}
      PersonService
        .update(person.id, newPerson)
        .then( response => {
          console.log('Updated the record')
          const otherPersons = persons.filter(p => p.id !== person.id)
          setPersons(otherPersons.concat(newPerson))
        }
        )
    }
    else{
      const newPerson = {name : newName, number: newPhone,  id : persons.length+1}
      PersonService
        .create(newPerson)
        .then(
          response => {
            setPersons(persons.concat(response.data))
          }
        )
    }
    
    setNewName('')
    setNewPhone('')
  }

  const filteredPersons = searchField.length > 0 ? persons.filter(
            person => person.name.toLowerCase().includes(searchField)) : persons

  return (
    <div>
      <h1> Phonebook </h1>
      <SearchField handleSearchFieldChange={handleSearchFieldChange}/>

    <div>
      <h3> Add new people to phone book</h3>
      <form onSubmit={addNewPersonToList}>
        <div>
          Name:  
          <input 
          onChange={addName}
          value={newName}
          />
        </div>
        <div>
          Phone:  
          <input
          onChange={addPhone}
          value={newPhone}/>
        </div>
        <div><button type="submit">add</button></div>
        
      </form>
    </div>
      
      
      
      <h1>Numbers </h1>
      <PersonList persons={filteredPersons} setPersons={setPersons}></PersonList>
    </div>
  )
}

export default App;
