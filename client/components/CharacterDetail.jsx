import React from 'react';
import { Link } from 'react-router-dom'
import superagent from 'superagent'
import AsyncFilmItem from './AsyncFilmItem.jsx'

class CharacterDetail extends React.Component {
  
  constructor() {
    super()
    this.state = {
      isLoading: false,
      data: null
    }
  }

  _charID() {
    return this.props.match.params.charID
  }

  _loadData(url) {
    this.setState({
      isLoading: true,
    })

    superagent
      .get(url)
      .end((err, res) => {
        this.setState({
          isLoading: false,
          data: res.body
        })
      });
  }

  componentDidMount() {
    const apiURL = 'http://localhost:8080/api/people/' + this._charID();
    this._loadData(apiURL);
  }

  render() {
    
    let content = null;
    if (this.state.isLoading) {
      content =(<p>loading...</p>);
    }
    else if (!this.state.data) {
      content = (<p>There is no character with that ID</p>); 
    }
    else {
      content = (
        <div>
          <h1>{this.state.data.name}</h1>
          <p>{JSON.stringify(this.state.data)}</p>
          <h2>Films</h2>
          <ul>
            {
              this.state.data.films.map((filmURL, i) => {
                const components = filmURL.split('/');
                const filmID = components[components.length - 2];
                return <li key={filmID}><AsyncFilmItem filmID={filmID}/></li>
              })
            }
          </ul>
        </div>
      );
    }

    return (
      content
    )
  }

}


export default CharacterDetail;
