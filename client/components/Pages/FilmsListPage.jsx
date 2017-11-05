import React from 'react';
import { Link } from 'react-router-dom'
import AsyncData from '../Util/AsyncData.jsx'
import FilmsListView from '../Util/FilmsListView.jsx'

const FilmsListPage = (props) => {
  return (
    <div>
      <h1>Films</h1>
      <AsyncData 
        apiURL={'/api/pages/films_list'}
        IsLoading={(props) => {return (<p>Loading...</p>)}}
        NoData={(props) => {return (<p>There are no films</p>)}}
        HasData={(props) => {
          return <FilmsListView films={props.data.data}/>
        }}
      />
    </div>
  );
}

export default FilmsListPage;
