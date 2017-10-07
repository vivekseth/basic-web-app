import React from 'react';
import superagent from 'superagent'

class AsyncData extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoading: false,
      data: null
    }
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    })

    superagent
      .get(this.props.apiURL)
      .end((err, res) => {
        this.setState({
          isLoading: false,
          data: res.body
        })
      });
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
