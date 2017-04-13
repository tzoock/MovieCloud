import React from "react";
import SongCard from "../songCard/SongCard";
import uuid from "uuid";


import store from "../../store";
import {connect} from "react-redux";
import './playlist.scss'


class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      elm: this.focusMe
    };

  }




  inputToName(event) {
    if (event.key === 'Enter' || event.type === 'blur') {

      // this.props.changeEditMode(this.props.playlistIndex);
      // this.props.changePlaylistName(event.target.value, this.props.playlistIndex);

      store.dispatch({
        type: 'CHANGE_PLAYLIST_NAME',
        playlistName: event.target.value,
        playlistIndex: this.props.playlistIndex
      });

      store.dispatch({
        type: 'CHANGE_EDIT_MODE',
        playlistIndex: this.props.playlistIndex
      })

    }

  }


  handlePlaylistNameChange(event) {

    this.setState(Object.assign({}, {value: event.target.value}));

  }

  componentDidUpdate() {
    if (this.props.playlist.editMode) {
      this.focusMe.focus();
      this.focusMe.scrollIntoView(true);
    }
  }

  componentDidMount() {
    if (this.props.playlist.editMode) {
      this.focusMe.focus();
      this.focusMe.scrollIntoView(true);
    }
  }



  render() {
    const storeData = store.getState();
    return (
      <div>
        { storeData.playlists[this.props.playlistIndex].editMode ?
          <div className="playlist-header">
            <input type="text"
                   className='input-playlist-name'
                   onKeyDown={(event) => {
                     this.inputToName(event)
                   }}
                   placeholder={storeData.playlists[this.props.playlistIndex].title}
                   onChange={() => {
                     this.handlePlaylistNameChange(event)
                   }}
                   onBlur={(event) => {
                     this.inputToName(event)
                   }}
                   ref={(inpElm) => {
                     this.focusMe = inpElm
                   }}/>
          </div>
          :
          <div className="playlist-header">
            <div className='playlist-name'
                 onClick={() => {
                   this.props.playlistNameToInput(this.props.playlistIndex)
                 }}>
              {storeData.playlists[this.props.playlistIndex].title}
            </div>
            <span className="song-count">{storeData.playlists[this.props.playlistIndex].songs.length}</span>
            <butten className="deleteBtn"
                    onClick={() => {
                      this.props.deleteHendle(this.props.playlistIndex)
                    }
                    }>
              Delete
            </butten>
          </div>}

        <div className="playlist-content">
          {storeData.playlists[this.props.playlistIndex].songs.length > 0 ?
            storeData.playlists[this.props.playlistIndex].songs.map((song, i) => (
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
      // this.props.changeEditMode(this.props.playlistIndex);
console.info('sss');
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
      // this.props.deletePlaylist(this.props.playlistIndex)
    }

  }
}

function mapStateToProps(store) {
  return {
    playlist: store.playlists
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
