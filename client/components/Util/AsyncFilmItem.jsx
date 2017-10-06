import React from 'react';
import { Link } from 'react-router-dom'
import superagent from 'superagent'

// TODO(vivek): Create higher-order component to present data that is loaded via API. 

class AsyncFilmItem extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoading: false,
      data: null
    }
  }

  _filmID() {
    return this.props.filmID;
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    })

    superagent
      .get('http://localhost:8080/api/films/' + this._filmID())
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
        <Link to={'/films/' + this._filmID()}>
          {this.state.data.title}
        </Link>
      )
    }
  }
}


export default AsyncFilmItem;
