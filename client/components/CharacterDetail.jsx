import React from 'react';
import { Link } from 'react-router-dom'
import superagent from 'superagent'
import AsyncFilmItem from './AsyncFilmItem.jsx'
import { Header, Table } from 'semantic-ui-react'

const CharacterAttributeTable = function(props) {
  const _Row = function(props) {
    return (
      <Table.Row>
        <Table.Cell>{props.keyName}</Table.Cell>
        <Table.Cell>{props.value}</Table.Cell>
      </Table.Row>
    );
  }

  console.log('test', props);

  return (
    <Table basic='very'>
      <Table.Body>
      {
        props.attributes.map((attr, i) => {
          return <_Row keyName={attr.key} value={attr.value} />
        })
      }
      </Table.Body>
    </Table>
  );
}



class CharacterDetail extends React.Component {
  
  constructor() {
    super()
    this.state = {
      isLoading: false,
      data: null
    }
  }

  _charID() {
    return this.props.match.params.charID
  }

  _attributes() {
    var keys = ["name", "height", "mass", "hair_color", "skin_color", "eye_color", "birth_year", "gender"];
    return keys.map((key, i) => {
      return {
        key: key,
        value: this.state.data[key]
      }
    });
  }

  _loadData(url) {
    this.setState({
      isLoading: true,
    })

    superagent
      .get(url)
      .end((err, res) => {
        this.setState({
          isLoading: false,
          data: res.body
        })
      });
  }

  componentDidMount() {
    const apiURL = 'http://localhost:8080/api/people/' + this._charID();
    this._loadData(apiURL);
  }

  render() {
    
    let content = null;
    if (this.state.isLoading) {
      content =(<p>loading...</p>);
    }
    else if (!this.state.data) {
      content = (<p>There is no character with that ID</p>); 
    }
    else {
      content = (
        <div>
          <Header as='h1'>{this.state.data.name}</Header>

          <Header as='h2'>Attributes</Header>
          <CharacterAttributeTable attributes={this._attributes()} />

          <Header as='h2'>Films</Header>
          <ul>
            {
              this.state.data.films.map((filmURL, i) => {
                const components = filmURL.split('/');
                const filmID = components[components.length - 2];
                return <li key={filmID}><AsyncFilmItem filmID={filmID}/></li>
              })
            }
          </ul>
        </div>
      );
    }

    return (
      content
    )
  }

}


export default CharacterDetail;
