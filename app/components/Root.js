import React from 'react';

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
      currentTrack: {},
      playlists: [
        {
          id: 111,
          title: 'my 1st playlist',
          songs: [
            {
              id: 250711755,
              title: "The Chainsmokers - Don't Let Me Down (Illenium Remix)",
              duration: 219082,
              stream_url: "https://api.soundcloudcom/tracks/250711755/stream",
              uri: "https://api.soundcloud.com/tracks/250711755",
              artwork_url: "https://i1.sndcdn.com/artworks-000150027827-4exjil-large.jpg"
            }]
        },
        {
          id: 222,
          title: 'my 2nd playlist',
          songs: [
            {
              id: 250711755,
              title: "The Chainsmokers - Don't Let Me Down (Illenium Remix)",
              duration: 219082,
              stream_url: "https://api.soundcloud.com/tracks/250711755/stream",
              uri: "https://api.soundcloud.com/tracks/250711755",
              artwork_url: "https://i1.sndcdn.com/artworks-000150027827-4exjil-large.jpg"
            }]
        }
      ]
    };

    this.updateCurrentTrack = this.updateCurrentTrack.bind(this)
  }


  updateCurrentTrack(song) {
    const newSong = Object.assign({}, song);
    this.setState({currentTrack: newSong})
  }


  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" render={ () => {
            return (
              <div>

                <Topbar/>

                <main>

                  <Switch>

                    <Route exact path="/" render={() => {
                      return <Redirect to="/Explore"/>
                    }}/>

                    <Route path="/Explore/:genre" render={(props) => {
                      return <Explore updateCurrentTrack={this.updateCurrentTrack} {...props} />
                    }}/>

                    <Route exact path="/Explore" component={() => {
                      return <Redirect to="/Explore/trance"/>
                    }}/>

                    <Route path={"/Playlists"} render={() => {
                      return < Playlists playlists={this.state.playlists} updateCurrentTrack={this.updateCurrentTrack}/>
                    }}/>

                  </Switch>
                </main>

                <Player currentTrack={this.state.currentTrack}/>
              </div>
            )
          }}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

