import React from 'react';
import { Link } from 'react-router-dom'
import superagent from 'superagent'
import AsyncData from '../Util/AsyncData.jsx'

// const _WelcomeMessage = (props) => {
//   return (
//     <h1>
//       Hello {props.data.username} !
//     </h1>
//   );
// }

class HomePage extends React.Component {
  
  render() {
    return <AsyncData 
      apiURL='http://localhost:8080/api/user/'
      IsLoading={(props) => {return (<h1>Loading...</h1>)}}
      NoData={(props) => {return (<h1>Log In for extra features!</h1>)}}
      HasData={(props) => {return (<h1>Hello {props.data.data.username} !</h1>)}}
    />
  }
}


export default HomePage;
