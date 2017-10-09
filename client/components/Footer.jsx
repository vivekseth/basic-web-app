import React from 'react';
import { Link } from 'react-router-dom'
import { Segment, Container, List } from 'semantic-ui-react'

const Footer = (props) => {
  
  return (
    <Segment
      inverted
      vertical
      style={{ 
        margin: '5em 0em 0em', 
        padding: '5em 0em'
      }}
    >
      <Container textAlign='center'>
        <List horizontal inverted divided link>
          <List.Item as={Link} to='#'>Site Map</List.Item>
          <List.Item as={Link} to='#'>Contact Us</List.Item>
          <List.Item as={Link} to='#'>Terms and Conditions</List.Item>
          <List.Item as={Link} to='#'>Privacy Policy</List.Item>
        </List>
      </Container>
    </Segment>
  )
}

export default Footer;
