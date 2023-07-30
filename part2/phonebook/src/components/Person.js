import React from 'react'

const Person = ({person, deleteUser}) =>{

    return(
        <li>
            {person.name} {person.number}
            <button onClick={deleteUser}>delete</button>
        </li>
    )
}

export default Person;