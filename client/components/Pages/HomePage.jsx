import React from 'react';
import { Link } from 'react-router-dom'
import superagent from 'superagent'

class HomePage extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoading: false,
      data: null
    }
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    })

    superagent
      .get('http://localhost:8080/api/user/')
      .end((err, res) => {
        this.setState({
          isLoading: false,
          data: res.body.data
        })
      });
  }

  render() {
    const _createContent = () => {
      if (this.state.isLoading) {
        return (<h1>loading...</h1>);
      }
      else if (!this.state.data) {
        return (<h1>Log In for extra features!</h1>); 
      }
      else {
        return (
          <h1>
            Hello {this.state.data.username} !
          </h1>
        ); 
      }
    }

    return (
      <div>
        {_createContent()}
      </div>
    )
  }
}


export default HomePage;
