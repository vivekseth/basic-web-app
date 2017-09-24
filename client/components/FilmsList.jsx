import React from 'react';
import { Link } from 'react-router-dom'
import superagent from 'superagent'

class _FilmItem extends React.Component {
    render() {

    }
}

class FilmsList extends React.Component {
  constructor() {
    super()
    this.state = {
        films: []
    }
  }

  componentDidMount() {
    superagent
      .get('http://localhost:8080/api/films/')
      .end((err, res) => {
        // console.log(err);
        // console.log(res);
        this.setState({
          films: res.body.results
        })
      });
  }

  render() {
    console.log(this.state.films)

    return (
      <div>
        <h1>FilmsList</h1>

        {(this.state.films.length == 0)
          ? <p>loading...</p>
          : <ol>
              {this.state.films.map((element, i) => {
                console.log(i, element);
                return <li key={i.toString()}>{element.title}</li>
              })}
            </ol>
        }

      </div>
    )
  }
}


export default FilmsList;
