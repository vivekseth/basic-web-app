import React from 'react'
import superagent from 'superagent'
import { Button, Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'


/*
<Button primary icon>
    <Icon name='star' />
  </Button>
*/

// states (6): (favorited, unfavorited, unknown) x (loading, not loading)
// ignoring unknown state for now...

class FavoriteButton extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      isFavorited: false
    }
  }

  componentDidMount() {
    this._getFavoritedState();
  }

  componentWillReceiveProps(nextProps) {
    const sameType = nextProps.type === this.props.type;
    const sameID = nextProps.fav_id === this.props.fav_id;

    if (!sameType || !sameID) {
      this._getFavoritedState();
    }
  }

  _apiURL() {
    const url = '/api/user/favorites/'+this.props.type+'/'+this.props.fav_id+'';
    console.log(url);
    return url;
  }

  _getFavoritedState() {
    if (!this.props.type || !this.props.fav_id) {
      // This should be unknown, but defaulting to NOT favorited for now.
      this.setState({
        isLoading: false,
        isFavorited: false
      });
    }
    else {
      this.setState({
        isLoading: true,
      })

      superagent
        .get(this._apiURL())
        .end((err, res) => {
          const isFavorited = res.body.data ? true : false;
          this.setState({
            isLoading: false,
            isFavorited: isFavorited
          })
        });
    }
  }

  _setFavoritedState(state) {
    if (!this.props.type || this.props.id) {
      // This should be unknown, but defaulting to NOT favorited for now.
      this.setState({
        isLoading: false,
        isFavorited: false
      });
    }
    else {
      this.setState({
        isLoading: true,
      })

      var request = superagent;
      if (state) {
        request = request.put(this._apiURL());
      }
      else {
        request = request.delete(this._apiURL());
      }

      request.end((err, res) => {
        // if not err, assuming success.
        if (!err) {
          this.setState({
            isLoading: false,
            isFavorited: state
          })
        }
        else {
          this.setState({
            isLoading: false,
          })
        }
      });
    }
  }

  render() {
    var string = "";

    string += (this.state.isLoading ? 'LOADING' : 'not loading')
    string += ", "
    string += (this.state.isFavorited ? 'FAVORITED' : 'unfavorited')

    /*<Button 
        icon
          loading
        //{this.state.isLoading && 'loading'} 
        //{this.state.isFavorited && 'primary'} <Icon name='star' />
        onClick={() => {
          this._setFavoritedState.bind(this)(!this.state.isFavorited)
        }}
      >
       <Icon name='star' />
      </Button>*/

    return (
      

      <Button 
        primary={this.state.isFavorited} 
        loading={this.state.isLoading} 
        icon
        onClick={() => {
          this._setFavoritedState.bind(this)(!this.state.isFavorited)
        }}
        style={this.props.style}
      >
        <Icon name='star'/>
      </Button>
    );
  }
}


export default FavoriteButton;