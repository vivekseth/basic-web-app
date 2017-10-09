import React from 'react';
import { Link } from 'react-router-dom'
import superagent from 'superagent'
import AsyncData from '../Util/AsyncData.jsx'

const FilmItem = (props) => {
  return (
    <li>
      <Link to={"/films/" + props.filmID}>
        {props.title}
      </Link>
    </li>
  )
}

const FilmsListView = (props) => {
  const films = props.data.data;
  return (
    <ol>
      {films.map((film, i) => {
        return (
          <FilmItem 
            key={film.episode_id} 
            filmID={film.film_id}
            title={film.title}
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
        apiURL={'/api/pages/films_list'}
        IsLoading={(props) => {return (<p>Loading...</p>)}}
        NoData={(props) => {return (<p>There are no films</p>)}}
        HasData={FilmsListView}
      />
    </div>
  );
}

export default FilmsListPage;
