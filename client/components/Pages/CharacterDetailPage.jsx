import React from 'react';
import { Link } from 'react-router-dom'
import AsyncData from '../Util/AsyncData.jsx'
import FavoriteButton from '../Util/FavoriteButton.jsx'
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
    const characterDetail = this.props.data.data;
    var keys = ["name", "height", "mass", "hair_color", "skin_color", "eye_color", "birth_year", "gender"];
    return keys.map((key, i) => {
      return {
        key: key,
        value: characterDetail[key]
      }
    });
  }

  render() {
    const characterDetail = this.props.data.data;
    return (
      <div>

        <FavoriteButton type='characters' fav_id={characterDetail.character_id} style={{
          clear: 'none',
          float: 'left'
        }}/>

        <Header as='h1'>{characterDetail.name}</Header>

        <Header as='h2'>Attributes</Header>
        <CharacterAttributeTable attributes={this._attributes()} />

        <Header as='h2'>Films</Header>
        <List ordered>
        {
          characterDetail.films.map((film, i) => {
            return (
              <List.Item key={film.film_id}>
                <Link to={'/films/' + film.film_id}>
                  {film.title}
                </Link>
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
  const apiURL = '/api/pages/character_detail/' + props.match.params.charID;
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
