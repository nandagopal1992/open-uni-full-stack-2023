import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
const persons = [
  {
    name : 'Nandu',
    phone : '1324234',
    id : 1
  },
  {
    name : 'Sithu',
    phone : '1231231',
    id : 2
  }
]
// const names = [
//   'Nandu',
//   'Situ'
// ]
root.render(
  <React.StrictMode>
    <App persons={persons}/>
  </React.StrictMode>
);
