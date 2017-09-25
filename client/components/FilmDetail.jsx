import React from 'react';
import { Link } from 'react-router-dom'
import superagent from 'superagent'
import AsyncCharacterItem from './AsyncCharacterItem.jsx'

class FilmDetail extends React.Component {
  constructor(props) {
    super(props)

    console.log(props)

    this.state = {
      isLoading: false,
      film: null
    }
  }

  _filmID() {
    return this.props.match.params.filmID
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    })

    console.log(this._filmID());

    superagent
      .get('http://localhost:8080/api/films/' + this._filmID())
      .end((err, res) => {
        console.log(err);
        console.log(res);
        this.setState({
          isLoading: false,
          film: res.body
        })
      });
  }

  render() {
    const film = this.state.film;

    if (this.state.isLoading) {
      return (<p>loading...</p>);
    }
    else if (!film) {
      return (<p>There is no film with that ID</p>); 
    }
    else {
      return (
        <div>
          <h1>
            <Link to={"/films/" + film.episode_id.toString()}>
              {film.title}
            </Link>
          </h1>
          <h2>Director: {film.director}</h2>
          <h2>Producer: {film.producer}</h2>
          <p>Release Date: {film.release_date}</p>
          <p>{film.opening_crawl}</p>
          <h3>Characters</h3>
          <ul> {
            film.characters.map((url, i) => {
              const components = url.split('/');
              const characterID = components[components.length - 2];
              return (
                <li key={characterID}>
                  <AsyncCharacterItem characterID={characterID} />
                </li>
              );
            })
          } </ul>
        </div>
      )
    }
  }
}

/*
<li>Luke Skywalker</li>
            <li>Darth Vader</li>
            <li>Han Solo</li>
            <li>Chewey</li>
            <li>R2-D2</li>
            <li>CP30</li>
            */

export default FilmDetail;
