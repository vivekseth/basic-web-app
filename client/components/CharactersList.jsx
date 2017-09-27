import React from 'react';
import { Link } from 'react-router-dom'
import superagent from 'superagent'

const _getCharacterID = (char) => {
    const components = char.url.split('/');
    const charID = components[components.length - 2];
    return charID;
}

const CharacterItem = (props) => {
  const name = props.data.name;
  const charID = _getCharacterID(props.data);
  return (
    <li>
      <Link to={"/people/" + charID}>
        {name}
      </Link>
    </li>
  )
}

const PageAdvancementButton = (props) => {
  const str = props.isNext ? "Next" : "Previous";

  if (!props.url) {
    return <span>{str}</span>;
  }
  else {
    const pageString = props.url.split('?')[1];
    console.log(pageString);
    return (
      <Link 
        to={{
          pathname: '/characters',
          search: '?' + pageString,
        }}
        onClick={() => {props.onClickHandler(props.url)}}
      >
        {str}
      </Link>
    )
  }
}

class CharactersList extends React.Component {
  
  constructor() {
    super()
    this.state = {
      isLoading: false,
      data: null
    }
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
    const pageString = window.location.href.split('?')[1];
    const apiURL = 'http://localhost:8080/api/people/?' + pageString;
    this._loadData(apiURL);
  }

  _pageButtonClicked(url) {
    const pageString = url.split('?')[1];
    const apiURL = 'http://localhost:8080/api/people/?' + pageString;
    this._loadData(apiURL);
  }

  _listStart() {
    const components = window.location.href.split('?page=');
    let pageNum = 1;
    if (components.length == 2) {
      pageNum = parseInt(components[1]);
    }
    const listStart = (pageNum - 1) * 10 + 1;
    return listStart;
  }

  render() {
    
    let content = null;
    if (this.state.isLoading) {
      content =(<p>loading...</p>);
    }
    else if (!this.state.data) {
      content = (<p>There are no characters</p>); 
    }
    else {
      const listStart = this._listStart();
      content = (
        <ol start={listStart.toString()}>
          {
            this.state.data.results.map((char, i) => {
              return (
                <CharacterItem 
                  key={_getCharacterID(char)} 
                  data={char}
                />
              )
            })
          }
        </ol>
      )
    }

    const nextURL = (this.state.data ? this.state.data.next : null);
    const prevURL = (this.state.data ? this.state.data.previous : null);

    let nextButton = (
      <PageAdvancementButton 
        isNext={true} 
        url={nextURL} 
        onClickHandler={this._pageButtonClicked.bind(this)}
      />
    );

    let prevButton = (
      <PageAdvancementButton 
        isNext={false} 
        url={prevURL} 
        onClickHandler={this._pageButtonClicked.bind(this)}
      />
    );

    return (
      <div>
        <h1>Characters</h1>
        {content}
        <br />
        {prevButton}...{nextButton}
      </div>
    )
  }

}


export default CharactersList;
