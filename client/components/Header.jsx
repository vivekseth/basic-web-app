import React from 'react';
import { Link, NavLink } from 'react-router-dom'
import { Menu, Container, Input } from 'semantic-ui-react'
import Privileged from './Util/Privileged.jsx'

const _PrivilegedHeader = (props) => {
  return (
    <Menu fixed='top' size='large' borderless>
      <Container>
        <Menu.Item name='Star Wars Explorer' as={NavLink} exact to="/" />
        <Menu.Item name='Films' as={NavLink} exact to="/films"/>
        <Menu.Item name='Characters' as={NavLink} exact to="/characters"/>
        {(props.isPrivileged) && <Menu.Item name='Favorites' as={NavLink} exact to="/favorites"/>}
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
          {(props.isPrivileged) ? (
            <Menu.Item name='Logout' as={NavLink} to="/logout" />
          ) : (
            <Menu.Item name='Login' as={NavLink} to="/login" />
          )}
        </Menu.Menu>
      </Container>
    </Menu>
  )
}

const Header = (props) => {
  return <Privileged
    Success={_PrivilegedHeader}
    Fail={_PrivilegedHeader}
    Loading={_PrivilegedHeader}
  />
}


export default Header;
