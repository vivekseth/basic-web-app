import React from 'react';
import { Link } from 'react-router-dom'
import superagent from 'superagent'
import elemental from 'elemental'
import AsyncData from '../Util/AsyncData.jsx'

const CharacterItem = (props) => {
  return (
    <li>
      <Link to={"/characters/" + props.characterID}>
        {props.data.name}
      </Link>
    </li>
  )
}

class CharactersListView extends React.Component {

  _listStart() {
    let pageNum = this.props.currentPageNum;
    const listStart = (pageNum - 1) * 10 + 1;
    return listStart;
  }

  _getCharacterID(char) {
    const components = char.url.split('/');
    const charID = components[components.length - 2];
    return charID;
  }

  render() {
    const listStart = this._listStart();
    return (
      <div>
        <ol start={listStart.toString()}>
          {
            this.props.data.results.map((char, i) => {
              return (
                <CharacterItem 
                  key={this._getCharacterID(char)}
                  characterID={this._getCharacterID(char)}
                  data={char}
                />
              )
            })
          }
        </ol>
        <br />
        <elemental.Pagination
          currentPage={this.props.currentPageNum}
          onPageSelect={(page) => {this.props.visitPage(page)}}
          pageSize={10} // TODO(vivek): remove need to hard-code this.
          plural={'characters'}
          singular={'character'}
          total={this.props.data.count}
        />
      </div>
    )
  }
}

class CharactersListPage extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      apiURL: this._apiURL(this._currentPageNum()),
    }
  }

  _apiURL(pageNum) {
    return 'http://localhost:8080/api/people/?page=' + pageNum;
  }

  _currentPageNum() {
    // TODO(vivek): make this a function of this.props.data
    const components = window.location.href.split('?page=');
    let pageNum = 1;
    if (components.length == 2) {
      pageNum = parseInt(components[1]);
    }
    return pageNum;
  }

  _visitPage(page) {
    this.setState({
      apiURL: this._apiURL(page)
    });
    if (page !== this._currentPageNum()) {
      this.props.history.push('/characters?page='+page);
    }
  }

  render() {
    return (
      <div>
        <h1>Characters</h1>
        <AsyncData 
          apiURL={this.state.apiURL}
          IsLoading={(props) => {return (<elemental.Spinner size="md" />)}}
          NoData={(props) => {return (<p>There are no characters</p>)}}
          HasData={(props) => {
            return (
              <CharactersListView 
                data={props.data} 
                currentPageNum={this._currentPageNum()}
                visitPage={(page) => {this._visitPage(page)}}
              />
            );
          }}
        />
      </div>
    );
  }
}


export default CharactersListPage;
