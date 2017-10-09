import React from 'react';
import superagent from 'superagent'

// TODO(vivek): add a case for error retrieving data. 

class AsyncData extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoading: false,
      data: null
    }
  }

  componentDidMount() {
    this._loadData(this.props.apiURL);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.apiURL !== this.props.apiURL) {
      this._loadData(nextProps.apiURL);
    }
  }

  _loadData(apiURL) {
    if (!apiURL) {
      this.setState({
        isLoading: false,
        data: null
      });
    }
    else {
      this.setState({
        isLoading: true,
      })

      superagent
        .get(apiURL)
        .end((err, res) => {
          this.setState({
            isLoading: false,
            data: res.body
          })
        });
    }
  }

  render() {
    if (this.state.isLoading) {
      return <this.props.IsLoading />
    }
    else if (!this.state.data) {
      return <this.props.NoData />
    }
    else {
      return <this.props.HasData data={this.state.data} />
    }
  }
}

export default AsyncData;
