import React from 'react';
import { Link } from 'react-router-dom'
import superagent from 'superagent'
import AsyncData from './AsyncData.jsx'

const AsyncCharacterItem = (props) => {
  const characterID = props.characterID;

  return <AsyncData 
    apiURL={
      'http://localhost:8080/api/people/' + characterID
    }
    IsLoading={(props) => {
      return (<p>Loading...</p>)
    }}
    NoData={(props) => {
      return (<p>There is no data with that ID</p>)
    }}
    HasData={(props) => {
      return (
        <Link to={'/characters/' + characterID}>
          {props.data.name}
        </Link>
      );
    }}
  />
}

export default AsyncCharacterItem;
