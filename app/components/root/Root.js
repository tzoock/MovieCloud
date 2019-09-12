import React from 'react';
import uuid from 'uuid';
import Topbar from '../topBar/Topbar';
import Explore from '../Explore/Explore';
import Playlists from '../Playlists/Playlists';
import Player from '../player/Player';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import {connect} from "react-redux";
import {serverLocation} from '../../serverLocation';



class Root extends React.Component {
  constructor() {
    super();

  }

  GetXhr() {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', `${serverLocation}/playlists`);

    xhr.addEventListener('load', () => {
      this.props.gotData(JSON.parse(xhr.responseText));
    });


    xhr.send();
  }

  componentDidMount() {
    this.GetXhr()
  }

  render() {
    return ( <div>
        <Topbar history={this.props.history}/>
            <Route exact path="/" component={() => {
              return <Redirect to="/Explore"/>
            }}/>
            <Route exact path="/Explore" component={() => {return <Redirect to="/Explore/trance"/>}}/>
            <Route path="/Explore/:genre" component={ Explore }/>
            <Route path={"/Playlists"} component={ Playlists }/>
        <Player/>
      </div>
    )

  }
}

function mapDispatchToProps(dispatch) {
  return {
    gotData(data) {
      dispatch({
        type: 'GOT_DATA',
        data: data
      })
    }
  }
}

export default connect(null, mapDispatchToProps)(Root);
