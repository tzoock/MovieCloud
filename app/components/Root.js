import React from 'react';
import Signup from './Signup';
import Login from './Login';
import Topbar from './Topbar';
import Explore from './Explore/Explore';
import Playlists from './Playlists';
import Player from './Player';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'


export default class Root extends React.Component {
  constructor() {
    super();
    this.state = {
      currentTrack: {}
    }
  }

  // GetXhr() {
  //
  //   const genre = this.props.match.params.genre;
  //   const clientId = '2t9loNQH90kzJcsFCODdigxfp325aq4z';
  //
  //   const xhr = new XMLHttpRequest();
  //
  //   xhr.open('GET', `https://api.soundcloud.com/tracks?client_id=${clientId}&limit=15&offset=0&tags=${genre}`);
  //   console.info('url', `https://api.soundcloud.com/tracks?client_id=${clientId}&limit=15&offset=0&tags=${genre}`);
  //
  //   xhr.addEventListener('load', () => {
  //     this.setState({tracks: JSON.parse(xhr.responseText), Loading: 'loaded'});
  //   });
  //   xhr.addEventListener('error', () => {
  //     this.setState({Loading: 'error'});
  //   });
  //   xhr.send();
  // }
  //
  // componentDidMount() {
  //   this.GetXhr();
  //
  // }
  //
  // componentDidUpdate(prevProps) {
  //   if (prevProps.match.params.genre === this.props.match.params.genre)
  //     return;
  //   this.GetXhr();
  // }
  updateCurrentTrack() {
    this.setState({})
  }

  render() {

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/signup" component={ Signup }/>
          <Route exact path="/login" component={ Login }/>

          <Route path="/" component={ () => {
            return <div>
              <Topbar/>

              <main>
                <Switch>
                  <Route exact path="/" render={() => {
                    return <Redirect to="/Explore"/>
                  }}/>
                  <Route path="/Explore/:genre" component={ Explore }/>
                  <Route exact path="/Explore" component={() => {
                    return <Redirect to="/Explore/trance"/>
                  }}/>

                  <Route path={"/Playlists"} component={Playlists}/>

                </Switch>
              </main>

              <Player/>
            </div>
          }}/>
        </Switch>
      </BrowserRouter>

    );
  }
}

