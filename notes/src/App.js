import {useState, useEffect} from 'react'
import Note from './components/Note'
import axios from 'axios'
import noteService from './services/notes'
import Notification from './components/Notification'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    noteService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        const updatedNotes = response.data.concat({ id: 10000,
          content: 'This note is not saved to server',
          important: true
        })
        setNotes(updatedNotes)
      })
  }, [])

  const toggleImportanceOf = (id) => {
    const note = notes.find(n=> n.id === id)
    const updatedNote = {...note, important : !note.important}
    console.log(updatedNote)
    noteService
      .update(id, updatedNote)
      .then(response => {
        console.log('importance of '+ id + 'changed')
        console.log(response.data)
        setNotes(notes.map(n => n.id === id ? response.data : n))
      })
      .catch(error => {
        setErrorMessage(
          `No note with ${id} present`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n=>n.id != id))
      })
    
  }

  console.log('rendered', notes.length, 'notes')
  const handleChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content : newNote,
      important : Math.random() < 0.5,
      id : notes.length + 1
    }
    noteService
      .create(noteObject)
      .then(response => {
        setNotes(notes.concat(response.data))
        setNewNote('')
      })
  }


  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
        </button>
      <ul>
       {notesToShow.map(note => <Note
        key={note.id}
        note={note}
        toggleImportance = {() => toggleImportanceOf(note.id)}

         />)}
      </ul>
      <form onSubmit={addNote}>
        <input
         value={newNote}
         onChange={handleChange}
         />
        <button type="submit">save</button>

      </form>
    </div>
  )
}

export default App