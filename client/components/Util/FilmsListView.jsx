import React from 'react';
import { Link } from 'react-router-dom'

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
  return (
    <ol>
      {props.films.map((film, i) => {
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

export default FilmsListView;
