import React from 'react';
import { Link } from 'react-router-dom'
import Content from './Content.jsx'
import Header from './Header.jsx'

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Content />
      </div>
    )
  }
}

export default App;
