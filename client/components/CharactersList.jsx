import React from 'react';
import { Link } from 'react-router-dom'
import superagent from 'superagent'
import elemental from 'elemental'

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
      <Link to={"/characters/" + charID}>
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
    const pageString = props.url.split('page=')[1];
    return (
      <Link 
        to={{
          pathname: '/characters',
          search: '?page=' + pageString,
        }}
        onClick={() => {props.onClickHandler(props.url)}}
      >
        {str}
      </Link>
    )
  }
}

class CharactersList extends React.Component {
  
  constructor(props) {
    super(props)
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
    const pageString = url.split('page=')[1];
    this._visitPage(pageString);
  }

  _loadPageData(page) {
    const apiURL = 'http://localhost:8080/api/people/?page=' + page;
    this._loadData(apiURL); 
  }

  _visitPage(page) {
    this._loadPageData(page);
    this.props.history.push('/characters?page='+page, {page: page});
  }

  _listStart() {
    let pageNum = this._currentPageNum();
    const listStart = (pageNum - 1) * 10 + 1;
    return listStart;
  }

  _currentPageNum() {
    const components = window.location.href.split('?page=');
    let pageNum = 1;
    if (components.length == 2) {
      pageNum = parseInt(components[1]);
    }
    return pageNum;
  }

  render() {
    
    let content = null;
    if (this.state.isLoading) {
      content =(<elemental.Spinner size="md" />);
    }
    else if (!this.state.data) {
      content = (<p>There are no characters</p>); 
    }
    else {
      const listStart = this._listStart();
      content = (
        <div>
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
          <br />
          <elemental.Pagination
            currentPage={this._currentPageNum()}
            onPageSelect={this._visitPage.bind(this)}
            pageSize={10} // TODO(vivek): remove need to hard-code this.
            plural={'characters'}
            singular={'character'}
            total={this.state.data.count}
          />
        </div>
      )
    }

    return (
      <div>
        <h1>Characters</h1>
        {content}
      </div>
    )
  }

}


export default CharactersList;
