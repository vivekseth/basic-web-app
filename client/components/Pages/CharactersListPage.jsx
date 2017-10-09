import React from 'react';
import { Link } from 'react-router-dom'
import elemental from 'elemental'
import AsyncData from '../Util/AsyncData.jsx'

const CharacterItem = (props) => {
  return (
    <li>
      <Link to={"/characters/" + props.characterID}>
        {props.name}
      </Link>
    </li>
  )
}

const CharactersListView = (props) => {
  return (
    <div>
      <ol>
        {
          props.data.data.map((char, i) => {
            return (
              <CharacterItem 
                key={char.character_id}
                characterID={char.character_id}
                name={char.name}
              />
            )
          })
        }
      </ol>
    </div>
  );
}

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
              data={props.data} 
            />
          );
        }}
      />
    </div>
  );
}


export default CharactersListPage;
