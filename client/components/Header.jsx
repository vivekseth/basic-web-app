import React from 'react';
import { Link, NavLink } from 'react-router-dom'
import { Menu, Container, Input } from 'semantic-ui-react'

const Header = (props) => {
  return (
    <Menu fixed='top' size='large' borderless>
      <Container>
        <Menu.Item name='Star Wars Explorer' as={NavLink} exact to="/" />
        <Menu.Item name='Films' as={NavLink} exact to="/films"/>
        <Menu.Item name='Characters' as={NavLink} exact to="/characters"/>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
          <Menu.Item name='Login' as={NavLink} to="/login" />
        </Menu.Menu>
      </Container>
    </Menu>
  )
}

export default Header;
