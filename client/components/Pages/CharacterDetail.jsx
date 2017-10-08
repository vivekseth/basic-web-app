import React from 'react';
import { Link } from 'react-router-dom'
import superagent from 'superagent'
import AsyncFilmItem from '../Util/AsyncFilmItem.jsx'
import AsyncData from '../Util/AsyncData.jsx'
import { Header, Table, List } from 'semantic-ui-react'

const CharacterAttributeTableRow = (props) => {
  return (
    <Table.Row>
      <Table.Cell>{props.keyName}</Table.Cell>
      <Table.Cell>{props.value}</Table.Cell>
    </Table.Row>
  );
}

const CharacterAttributeTable = (props) => {
  return (
    <Table basic='very'>
      <Table.Body>
      {
        props.attributes.map((attr, i) => {
          return (
            <CharacterAttributeTableRow 
              key={attr.key} 
              keyName={attr.key} 
              value={attr.value} 
            />
          );
        })
      }
      </Table.Body>
    </Table>
  );
}

class CharacterDetailView extends React.Component {
  _attributes() {
    var keys = ["name", "height", "mass", "hair_color", "skin_color", "eye_color", "birth_year", "gender"];
    return keys.map((key, i) => {
      return {
        key: key,
        value: this.props.data[key]
      }
    });
  }

  render() {
    return (
      <div>
        <Header as='h1'>{this.props.data.name}</Header>

        <Header as='h2'>Attributes</Header>
        <CharacterAttributeTable attributes={this._attributes()} />

        <Header as='h2'>Films</Header>
        <List ordered>
        {
          this.props.data.films.map((filmURL, i) => {
            const components = filmURL.split('/');
            const filmID = components[components.length - 2];
            return (
              <List.Item key={filmID}>
                <AsyncFilmItem filmID={filmID}/>
              </List.Item>
            );
          })
        }
        </List>
      </div>
    );
  }
}

const CharacterDetailPage = (props) => {
  const apiURL = 'http://localhost:8080/api/people/' + props.match.params.charID;
  return (
    <AsyncData 
      apiURL={apiURL}
      IsLoading={(props) => {return (<p>Loading...</p>)}}
      NoData={(props) => {return (<p>There is no character with that ID</p>)}}
      HasData={CharacterDetailView}
    />
  );
}

export default CharacterDetailPage;
