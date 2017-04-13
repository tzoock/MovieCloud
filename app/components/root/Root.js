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


export default class Root extends React.Component {
  constructor() {
    super();
    this.state = {
      currentTrack: {},
      checkMe: false,
      playlists: [
        {
          editMode: false,
          id: uuid(),
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
          editMode: false,
          id: uuid(),
          title: 'my 2nd playlist',
          songs: [
            {
              id: 25071445,
              title: "The Chainsmokers - Don't Let Me Down (Illenium Remix)",
              duration: 219082,
              stream_url: "https://api.soundcloud.com/tracks/250711755/stream",
              uri: "https://api.soundcloud.com/tracks/250711755",
              artwork_url: "https://i1.sndcdn.com/artworks-000150027827-4exjil-large.jpg"
            }]
        }
      ]
    };


    this.createPlaylist = this.createPlaylist.bind(this);
    this.changePlaylistName = this.changePlaylistName.bind(this);
    this.changeEditMode = this.changeEditMode.bind(this);
    this.deletePlaylist = this.deletePlaylist.bind(this);
    this.addSongToPlaylist = this.addSongToPlaylist.bind(this);
    this.isInPlaylist = this.isInPlaylist.bind(this);

  }

  componentDidMount() {

  }

  isInPlaylist(songCard) {
    console.info(songCard);
    this.state.playlists.forEach((playlist) => {
      playlist.songs.forEach((song) => {
        console.info(song);
        if (song.id === songCard.id) {
          this.setState({checkMe: true})
        }
        else {
          this.setState({checkMe: false})
        }
      })

    });

  }



  createPlaylist(song) {

    const newPlaylist = {
      editMode: true,
      id: song ? song.id : uuid(),
      title: 'Untitled playlist',
      songs: song ? [song] : []
    };

    const copyOfPlaylists = [...this.state.playlists];
    copyOfPlaylists.push(newPlaylist);

    this.setState({playlists: copyOfPlaylists})

  }

  addSongToPlaylist(playlistIndex, song) {
    const copyOfPlaylists = [...this.state.playlists];
    copyOfPlaylists[playlistIndex].songs.push(song);

    this.setState({playlists: copyOfPlaylists})
  }


  changePlaylistName(playlistName, playlistIndex) {

    const playlists = [...this.state.playlists];
    playlists[playlistIndex].title = playlistName === '' ? 'Untitled playlist' : playlistName;

    this.setState({playlists: playlists})
  }

  changeEditMode(playlistIndex) {
    const playlists = [...this.state.playlists];
    playlists[playlistIndex].editMode = !this.state.playlists[playlistIndex].editMode;

    this.setState({playlists: playlists})

  }

  deletePlaylist(playlistIndex) {

    const playlists = [...this.state.playlists];
    console.info(playlists);
    playlists.splice(playlistIndex, 1);
    console.info(playlists);
    this.setState({playlists: playlists})
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
                      return <Explore
                                      playlists={this.state.playlists}
                                      createPlaylist={this.createPlaylist}
                                      checkMe={this.state.checkMe}
                                      isInPlaylist={this.isInPlaylist}
                                      {...props}/>
                    }}/>

                    <Route exact path="/Explore" component={() => {
                      return <Redirect to="/Explore/trance"/>
                    }}/>

                    <Route path={"/Playlists"} render={(props) => {
                      return < Playlists {...props}/>
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

