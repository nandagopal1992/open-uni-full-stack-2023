import {useState} from 'react'
import Person from './components/Person'
import SearchField from './components/SearchField'
import PersonList from './components/PersonList'


const App = (props) => {
  const [persons, setPersons] = useState(props.persons)
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [searchField, setSearchField] = useState('')

  const handleSearchFieldChange = (event) => {
      console.log(event.target.value)
      setSearchField(event.target.value)
    }

  const addName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const addPhone = (event) => {
    console.log(event.target.value)
    setNewPhone(event.target.value)
  }
  const addNewPersonToList = (event) => {
    event.preventDefault()
    const isPresent = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())
    if(isPresent){
      alert(`${newName} is already present`)
    }
    else{
      const newPerson = {name : newName, phone: newPhone,  id : persons.length+1}
      setPersons(persons.concat(newPerson))
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
      <PersonList persons={filteredPersons}></PersonList>
    </div>
  )
}

export default App;
