import React from 'react';
import { Link } from 'react-router-dom'
import superagent from 'superagent'
import AsyncData from './AsyncData.jsx'

const AsyncFilmItem = (props) => {
  const filmID = props.filmID;

  return <AsyncData 
    apiURL={
      'http://localhost:8080/api/films/' + filmID
    }
    IsLoading={(props) => {
      return (<p>Loading...</p>)
    }}
    NoData={(props) => {
      return (<p>There is no data with that ID</p>)
    }}
    HasData={(props) => {
      return (
        <Link to={'/films/' + filmID}>
          {props.data.title}
        </Link>
      )
    }}
  />
}

export default AsyncFilmItem;
