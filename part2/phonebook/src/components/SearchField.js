import React from 'react'
import {useState} from 'react'

const SearchField = ({handleSearchFieldChange}) => {

    return (
        <div>
            <h2>Search</h2>
            <input 
            type="search"
            onChange={handleSearchFieldChange}/>

        </div>
    )
}

export default SearchField