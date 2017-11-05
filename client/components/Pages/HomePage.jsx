import React from 'react';
import { Link } from 'react-router-dom'
import AsyncData from '../Util/AsyncData.jsx'
import FilmsListView from '../Util/FilmsListView.jsx'
import CharactersListView from '../Util/CharactersListView.jsx'

const NoData = (props) => {
  return (<h1>Log in for extra features!</h1>)
};

const Favorites = (props) => {
  console.log('@@favorites', props);

  return (
    <div>
      <h2>Favorites</h2>
      
      <h3>Films</h3>
      <FilmsListView films={props.data.films} />
      
      <h3>Characters</h3>
      <CharactersListView characters={props.data.characters} />
    </div>
  );
}

const HomePage = (props) => {
  return (
    <div>
      <AsyncData
        apiURL='/api/user/'
        IsLoading={(props) => {return (<h1>Loading...</h1>)}}
        NoData={NoData}
        HasData={(props) => {
          if (props.data.success) {
            return (<h1>Hello {props.data.data.username} !</h1>)
          }
          else {
            return NoData(props);
          }
        }}
      />
      <AsyncData
        apiURL='/api/user/favorites'
        IsLoading={(props) => {return (<pre>Loading...</pre>)}}
        NoData={NoData}
        HasData={(props) => {
          if (props.data.success) {
            return (<Favorites data={props.data.data}/>)
          }
          else {
            return null;
          }
        }}
      />
    </div>

  );
}

export default HomePage;
