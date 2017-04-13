import React from "react";
import Playlist from "../playlist/Playlist";
import uuid from "uuid";

import './playlists.scss'
import store from "../../store";
import {connect} from "react-redux";

class Playlists extends React.Component {
  constructor(props) {
    super(props);


  }






  render() {

    return (
      <div className="playlists-wrap">
        <div className="playlists-bar">

          <div className="playlists-bar-top">
            <button className="add-playlist-btn" onClick={ ()=>(this.props.createPlaylistHandler()) }>Add new playlist</button>
          </div>
          <div className="playlists-bar-bottom">
            <div>
              {this.props.playlists.map((playlist, i) => <div key={playlist.id? playlist.id : uuid()}
                                                             onClick={()=>{
                                                               store.dispatch({
                                                                 type: 'CHANGE_EDIT_MODE',
                                                                 playlistIndex: i
                                                               })
                                                             }}
                                                             className="playlist-bar-titles">
                  {playlist.title? playlist.title : "Untitled playlist"}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="right-playlists">
          {this.props.playlists.map((playlist, i) => <div key={uuid()} className="user-playlist">

              < Playlist
                playlist = {playlist}
                playlistIndex = {i}
                from={this.props.match.path}
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
    createPlaylistHandler() {
      dispatch({
        type: 'CREATE_PLAYLIST',
      })
    },

  }
}

function mapStateToProps(store) {
  return {
    playlists: store.playlists
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
