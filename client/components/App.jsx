import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Link } from 'react-router-dom'
import Content from './Content.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

const App = (props) => {
  return (
    <div>
      <Header />
      <Content />
      <Footer />
    </div>
  )
}

export default App;
