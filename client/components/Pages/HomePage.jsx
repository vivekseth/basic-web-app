import React from 'react';
import { Link } from 'react-router-dom'
import AsyncData from '../Util/AsyncData.jsx'

const NoData = (props) => {
  return (<h1>Log in for extra features!</h1>)
};

const HomePage = (props) => {
  return <AsyncData
    apiURL='http://localhost:8080/api/user/'
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
}


export default HomePage;
