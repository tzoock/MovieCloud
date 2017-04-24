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



class Root extends React.Component {
  constructor() {
    super();

  }

  GetXhr() {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'http://localhost:3000/playlists');

    xhr.addEventListener('load', () => {
      this.props.gotData(JSON.parse(xhr.responseText));
    });


    xhr.send();
  }

  componentDidMount() {
    this.GetXhr()
  }


  // componentDidMount() {
  //
  // }
  //
  // isInPlaylist(songCard) {
  //   console.info(songCard);
  //   this.state.playlists.forEach((playlist) => {
  //     playlist.songs.forEach((song) => {
  //       console.info(song);
  //       if (song.id === songCard.id) {
  //         this.setState({checkMe: true})
  //       }
  //       else {
  //         this.setState({checkMe: false})
  //       }
  //     })
  //
  //   });
  //
  // }
  //
  //
  // createPlaylist(song) {
  //
  //   const newPlaylist = {
  //     editMode: true,
  //     id: song ? song.id : uuid(),
  //     title: 'Untitled playlist',
  //     songs: song ? [song] : []
  //   };
  //
  //   const copyOfPlaylists = [...this.state.playlists];
  //   copyOfPlaylists.push(newPlaylist);
  //
  //   this.setState({playlists: copyOfPlaylists})
  //
  // }
  //
  // addSongToPlaylist(playlistIndex, song) {
  //   const copyOfPlaylists = [...this.state.playlists];
  //   copyOfPlaylists[playlistIndex].songs.push(song);
  //
  //   this.setState({playlists: copyOfPlaylists})
  // }
  //
  //
  // changePlaylistName(playlistName, playlistIndex) {
  //
  //   const playlists = [...this.state.playlists];
  //   playlists[playlistIndex].title = playlistName === '' ? 'Untitled playlist' : playlistName;
  //
  //   this.setState({playlists: playlists})
  // }
  //
  // changeEditMode(playlistIndex) {
  //   const playlists = [...this.state.playlists];
  //   playlists[playlistIndex].editMode = !this.state.playlists[playlistIndex].editMode;
  //
  //   this.setState({playlists: playlists})
  //
  // }
  //
  // deletePlaylist(playlistIndex) {
  //
  //   const playlists = [...this.state.playlists];
  //   console.info(playlists);
  //   playlists.splice(playlistIndex, 1);
  //   console.info(playlists);
  //   this.setState({playlists: playlists})
  // }

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
