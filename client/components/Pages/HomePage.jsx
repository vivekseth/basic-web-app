import React from 'react';
import { Link } from 'react-router-dom'
import AsyncData from '../Util/AsyncData.jsx'
import Privileged from '../Util/Privileged.jsx'
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

const PrivilegedPage = (props) => {
  return (
    <div>
      <h1>Hello {props.userData.username} !</h1>
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

const HomePage = (props) => {
  return (
    <div>
      <Privileged 
        Success={PrivilegedPage}
        Fail={NoData} 
        Loading={(props)=>{return <h1>Loading...</h1>}}
      />
    </div>
  );
}

export default HomePage;
