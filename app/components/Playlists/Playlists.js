import React from "react";
import Playlist from "../playlist/Playlist";
import uuid from "uuid";

import './playlists.scss'
import {connect} from "react-redux";
import {serverLocation} from '../../serverLocation';

class Playlists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollTo: ''
    };

    this.handleCreatePlaylist = this.handleCreatePlaylist.bind(this);
    this.handleScroolBlur = this.handleScroolBlur.bind(this);
  }

  handleScrool(playlistId) {
    this.setState({scrollTo: playlistId})
  }


  serverAddPlaylist(newPlaylist) {
      const xhr = new XMLHttpRequest();
    xhr.open('POST', `${serverLocation}/serverAddPlaylist`);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.addEventListener('load', () => {
      console.info('loaded...');
    });

    xhr.addEventListener('error', () => {
      console.info('problem!');
    });

    xhr.send(JSON.stringify(newPlaylist));

    return false;
  }


  handleCreatePlaylist() {

    const newPlaylistNoSong = {
      editMode: true,
      id: uuid(),
      title: 'Untitled',
      songs: []
    };

    this.serverAddPlaylist(newPlaylistNoSong);
    this.props.createPlaylist(newPlaylistNoSong)
  }

  handleScroolBlur() {
    console.info('bluuur');
    this.setState({scrollTo: ''})
  }

  componentDidMount() {
    console.info(this);
  }

  render() {
console.info(this);
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
                     // onBlur={() => {
                     //   this.handleScroolBlur
                     // }}
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
                from={this.props.history}
                scroller={this.state.scrollTo}
                handleScroolBlur={this.handleScroolBlur}
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
        newPlaylistData: newPlaylist
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
