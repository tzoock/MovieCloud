import React from "react";
import Playlist from "../playlist/Playlist";
import uuid from "uuid";

import './playlists.scss'
import {connect} from "react-redux";

class Playlists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollTo: null
    }

    this.handleCreatePlaylist = this.handleCreatePlaylist.bind(this)

  }

  handleScrool(playlistId) {
    console.info(playlistId);
    this.setState({scrollTo: playlistId})
  }


  serverAddPlaylist(newPlaylist) {
    console.log('adding Playlist...');

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/playlists');

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.addEventListener('load', () => {
      console.info('loaded...');
      // document.querySelector('input[type=text]').value = ''
      // readData();
    });

    xhr.addEventListener('error', () => {
      console.info('problem!');
    });

    xhr.send(JSON.stringify(newPlaylist));

    return false;
  }


  handleCreatePlaylist() {

    const newPlaylist = {
      editMode: "false",
      id: uuid(),
      title: 'Untitled',
      songs: []
    };

    this.serverAddPlaylist(newPlaylist);
    this.props.createPlaylist(newPlaylist)
  }


  render() {

    return (
      <div className="playlists-wrap">
        <div className="playlists-bar">

          <div className="playlists-bar-top">
            <button className="add-playlist-btn" onClick={ () => (this.handleCreatePlaylist()) }>Add new
              playlist
            </button>
          </div>
          <div className="playlists-bar-bottom">
            <div>
              {this.props.playlists.map((playlist, i) =>
                <div key={playlist.id}
                     onClick={() => {
                       this.handleScrool(playlist.id)
                     }}
                     className="playlist-bar-titles">
                  {playlist.title }
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="right-playlists">
          {this.props.playlists.map((playlist, i) =>
            <div key={playlist.id ? playlist.id : uuid()}
                 className="user-playlist">

              < Playlist
                playlist={playlist}
                playlistIndex={i}
                from={this.props.match.path}
                scroller={this.state.scrollTo}
              />


            </div>
          )}
        </div>
      </div>
    );
  };
}

function mapDispatchToProps(dispatch) {

  return {
    createPlaylist(newPlaylist) {
      dispatch({
        type: 'CREATE_PLAYLIST',
        newPlaylist: newPlaylist
      })
    }

  }
}

function mapStateToProps(store) {
  return {
    playlists: store.playlists
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
