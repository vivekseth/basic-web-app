import React from 'react';
import { Link } from 'react-router-dom'
import elemental from 'elemental'
import AsyncData from '../Util/AsyncData.jsx'
import CharactersListView from '../Util/CharactersListView.jsx'

const CharactersListPage = (props) => {
  return (
    <div>
      <h1>Characters</h1>
      <AsyncData 
        apiURL={'/api/pages/characters_list'}
        IsLoading={(props) => {return (<p>Loading...</p>)}}
        NoData={(props) => {return (<p>There are no characters</p>)}}
        HasData={(props) => {
          return (
            <CharactersListView 
              characters={props.data.data}
            />
          );
        }}
      />
    </div>
  );
}


export default CharactersListPage;
