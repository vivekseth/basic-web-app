import React from 'react';
import { Link, NavLink } from 'react-router-dom'

class Header extends React.Component {
  render() {
    const activeStyle = {fontWeight: 'bold', color: 'red'};
    
    return (
      <div>
        <NavLink exact to="/" activeStyle={activeStyle}>
          Home
        </NavLink>

        <br />

        <NavLink to="/films" activeStyle={activeStyle}>
          Films
        </NavLink>

        <br />

        <NavLink to="/characters" activeStyle={activeStyle}>
          Characters
        </NavLink>

      </div>
    )
  }
}


export default Header;
