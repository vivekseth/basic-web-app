import React from 'react';
import { Link } from 'react-router-dom'

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
          props.characters.map((char, i) => {
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

export default CharactersListView;
