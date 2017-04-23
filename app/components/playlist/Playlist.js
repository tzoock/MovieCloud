import React from "react";
import SongCard from "../songCard/SongCard";
import uuid from "uuid";

import {connect} from "react-redux";
import './playlist.scss'
require('smoothscroll-polyfill').polyfill();

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      editMode: false
    };

  }

  componentDidUpdate() {

    if (this.state.editMode === true) {
      this.focusMe.focus();
    }

    if (this.props.scroller === this.props.playlist.id) {
      console.info('scrooling');
      this.scroolMe.scrollIntoView({block: "start", behavior: "smooth"});
      this.props.handleScroolBlur()
    }

  }

  componentDidMount() {
if (this.props.editMode) {
  this.setState({editMode: true})
}
    if (this.state.editMode === true) {
      this.focusMe.focus();
    }

  }

  inputToName(event) {
    if (event.key === 'Enter' || event.type === 'blur') {

      this.props.changeName(this.props.playlistIndex, event.target.value);
      this.setState({editMode: false});
      this.serverPlaylistNameChange(this.props.playlist);
    }
  }

  handlePlaylistNameChange(event) {
    this.setState({value: event.target.value});
  }

  togglePlaylistTitle() {
    this.setState({editMode: !this.state.editMode})
  }

  serverPlaylistNameChange(playlist) {

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/playlistNameChange');

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.addEventListener('load', () => {
      console.info('loaded...');
    });

    xhr.addEventListener('error', () => {
      console.info('problem!');
    });

    xhr.send(JSON.stringify(playlist));

    return false;
  }

  serverDeletePlaylist (playlistIndex) {

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/serverDeletePlaylist');

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.addEventListener('load', () => {
      console.info('loaded...');
    });

    xhr.addEventListener('error', () => {
      console.info('problem!');
    });

    xhr.send(JSON.stringify(playlistIndex));

    return false;
  }

  deletePlaylistHandler(playlistIndex) {
    this.props.deletePlaylist(playlistIndex);
    this.serverDeletePlaylist({playlistIndex})
  }

  render() {

    return (
      <div>
        { this.state.editMode ?
          <div className="playlist-header">
            <input type="text"
                   className='input-playlist-name'
                   onKeyDown={(event) => {
                     this.inputToName(event)
                   }}
                   placeholder={this.props.playlists[this.props.playlistIndex].title}
                   onChange={() => {
                     this.handlePlaylistNameChange(event)
                   }}
                   onBlur={(event) => {
                     this.inputToName(event)
                   }}
                   ref={(ref) => {
                     this.focusMe = ref
                   }}
            />
          </div>
          :
          <div className="playlist-header">
            <div className='playlist-name'
                 onClick={() => {
                   this.setState({editMode: true})
                 }}
                 ref={(ref) => {
                   this.scroolMe = ref
                 }}>
              {this.props.playlists[this.props.playlistIndex].title}
            </div>
            <span className="song-count">{this.props.playlists[this.props.playlistIndex].songs.length}</span>
            <butten className="deleteBtn"
                    onClick={() => {
                      this.deletePlaylistHandler(this.props.playlistIndex)
                    }
                    }>
              Delete
            </butten>
          </div>}

        <div className="playlist-content">
          {this.props.playlists[this.props.playlistIndex].songs.length > 0 ?
            this.props.playlists[this.props.playlistIndex].songs.map((song, i) => (
              <div key={uuid()} className="song-card">
                <SongCard song={song}
                          from={this.props.from}
                          songIndex={i}/>
              </div>)
            )
            :
            <div className="emptyPlaylist">
              <h3>Please add some song to the playList</h3>
            </div>
          }

        </div>
      </div>
    )

  }
}


function mapDispatchToProps(dispatch) {
  return {
    playlistNameToInput(playlistIndex) {
      dispatch({
        type: 'CHANGE_EDIT_MODE',
        playlistIndex: playlistIndex
      })
    },
    deletePlaylist(playlistIndex) {
      dispatch({
        type: 'DELETE_PLAYLIST',
        playlistIndex: playlistIndex
      });
    },
    changeName(playlistIndex, playlistName) {
      dispatch({
        type: 'CHANGE_PLAYLIST_NAME',
        playlistIndex: playlistIndex,
        playlistName: playlistName,

      })
    }

  }
}

function mapStateToProps(store) {
  return {
    playlists: store.playlists
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
