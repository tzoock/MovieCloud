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
   // if (this.props.playlists.editMode) {
   //   this.setState({editMode: true})
   // }
   // else {
   //   this.setState({editMode: false})
   // }

    if (this.props.scroller === this.props.playlist.id) {
      console.info('scrooling');
      this.scroolMe.scrollIntoView({ block: "start" , behavior: "smooth"});
      this.scroolMe.scrollIntoView({ top:100})
    }

    else if (this.state.editMode) {
      this.focusMe.focus();
      // this.focusMe.scrollIntoView(true);
    }
  }

  componentDidMount() {

    if (this.props.playlist.editMode) {

      this.setState({editMode: true})
    }
    // else {
    //   this.setState({editMode: false})
    // }

    // if (this.state.editMode) {
    //   this.focusMe.focus();
    //   // this.focusMe.scrollIntoView(true);
    // }
  }

  inputToName(event) {
    if (event.key === 'Enter' || event.type === 'blur') {
      this.props.changeName(this.props.playlistIndex, event.target.value);
      this.togglePlaylistTitle()
    }
  }

  handlePlaylistNameChange(event) {
    this.setState( {value: event.target.value});
  }

  togglePlaylistTitle() {
    this.setState({editMode: !this.state.editMode})
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
                   this.togglePlaylistTitle()
                 }}
                 ref={(ref) => {
                   this.scroolMe = ref
                 }}>
              {this.props.playlists[this.props.playlistIndex].title}
            </div>
            <span className="song-count">{this.props.playlists[this.props.playlistIndex].songs.length}</span>
            <butten className="deleteBtn"
                    onClick={() => {
                      this.props.deleteHendle(this.props.playlistIndex)
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
    deleteHendle(playlistIndex) {
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
