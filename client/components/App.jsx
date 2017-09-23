import React from 'react';
import { Link } from 'react-router-dom'

function App(props) {
  return <h1>
    Hello World! <Link to='/page'>Page</Link>
  </h1>
}

export default App;
