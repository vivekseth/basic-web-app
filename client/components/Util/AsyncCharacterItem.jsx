import React from 'react';
import { Link } from 'react-router-dom'
import superagent from 'superagent'

// TODO(vivek): Create higher-order component to present data that is loaded via API. 

class AsyncCharacterItem extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoading: false,
      data: null
    }
  }

  _characterID() {
    return this.props.characterID;
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    })

    superagent
      .get('http://localhost:8080/api/people/' + this._characterID())
      .end((err, res) => {
        this.setState({
          isLoading: false,
          data: res.body
        })
      });
  }

  render() {
    if (this.state.isLoading) {
      return (<p>loading...</p>);
    }
    else if (!this.state.data) {
      return (<p>There is no data with that ID</p>); 
    }
    else {
      return (
        <Link to={'/characters/' + this._characterID()}>
          {this.state.data.name}
        </Link>
      )
    }
  }
}


export default AsyncCharacterItem;
