import React from 'react';
import { Link } from 'react-router-dom'
import superagent from 'superagent'

const _FilmItem = (props) => {
  const film = props.film;
  const components = film.url.split('/');
  const filmID = components[components.length - 2];
  return (
    <li>
      <Link to={"/films/" + filmID}>
        {film.title}
      </Link>
    </li>
  )
}

class FilmsList extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoading: false,
      films: []
    }
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    })

    superagent
      .get('http://localhost:8080/api/films/')
      .end((err, res) => {
        this.setState({
          isLoading: false,
          films: res.body.results
        })
      });
  }

  render() {
    
    let content = null;
    if (this.state.isLoading) {
      content =(<p>loading...</p>);
    }
    else if (this.state.films.length == 0) {
      content = (<p>There are no films</p>); 
    }
    else {
      content = (
        <ol>
          {this.state.films.map((film, i) => {
            return (
              <_FilmItem 
                key={film.episode_id.toString()} 
                film={film}
              />
            )
          })}
        </ol>
      )
    }

    return (
      <div>
        <h1>Films</h1>
        {content}
      </div>
    )
  }
}


export default FilmsList;
