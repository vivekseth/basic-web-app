import React from 'react';
import { Link } from 'react-router-dom'
import { Button, Checkbox, Form } from 'semantic-ui-react'

class CredentialsPage extends React.Component {

  _onSubmit(a, b, c, d) {
    console.log('_onSubmit',a, b, c, d);
  }

  // onClick(event: SyntheticEvent, data: object)

  _loginTapped(event, data) {
    event.preventDefault();
    this._submitForm(true);
  }

  _registerTapped(event, data) {
    event.preventDefault();
    this._submitForm(false);
  }

  _submitForm(isLogin) {
    const action = isLogin ? '/login' : '/register';
    const form = document.getElementById('credentialsForm');
    // const username = document.getElementsByName('username')[0].value;
    // const password = document.getElementsByName('password')[0].value;
    form.action = action;
    form.submit();
  }

  render() {
    return (
      <div>
        <h1>Log In or Register</h1>
        <Form id="credentialsForm" method="post">
          <Form.Input width="6" name='username' label='Username' />
          <Form.Input width="6" name='password' label='Password' type='password' />
          <Button type='submit' onClick={this._loginTapped.bind(this)} primary>Log In</Button>
          <Button type='submit' onClick={this._registerTapped.bind(this)}>Register</Button>
        </Form>
      </div>
    )
  }
}

export default CredentialsPage;
