import React from 'react';
import { Link } from 'react-router-dom'
import superagent from 'superagent'
import AsyncData from '../Util/AsyncData.jsx'

const FilmItem = (props) => {
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

const FilmsListView = (props) => {
  return (
    <ol>
      {props.data.results.map((film, i) => {
        return (
          <FilmItem 
            key={film.episode_id.toString()} 
            film={film}
          />
        )
      })}
    </ol>
  );
}

const FilmsListPage = (props) => {
  return (
    <div>
      <h1>Films</h1>
      <AsyncData 
        apiURL={'http://localhost:8080/api/films/'}
        IsLoading={(props) => {return (<p>Loading...</p>)}}
        NoData={(props) => {return (<p>There are no films</p>)}}
        HasData={FilmsListView}
      />
    </div>
  );
}

export default FilmsListPage;
