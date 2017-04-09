import React from "react";
import Playlist from "../playlist/Playlist";
import uuid from "uuid";

import './playlists.scss'

export default class Playlists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

  }


createPlaylistHandler() {
  this.props.createPlaylist()
}



  render() {

    return (
      <div className="playlists-wrap">
        <div className="playlists-bar">

          <div className="playlists-bar-top">
            <button className="add-playlist-btn" onClick={ ()=>(this.createPlaylistHandler()) }>Add new playlist</button>
          </div>
          <div className="playlists-bar-bottom">
            <div>
              {this.props.playlists.map((playlist, i) => <div key={playlist.id? playlist.id : uuid()}>
                  {playlist.title? playlist.title : "Untitled playlist"}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="right-playlists">
          {this.props.playlists.map((playlist, i) => <div key={playlist.id} className="user-playlist">

              < Playlist
              playlist = {playlist}
              changePlaylistName = {this.props.changePlaylistName}
              changeEditMode = {this.props.changeEditMode}
              playlistIndex = {i}
              playlists={this.props.playlists}
              updateCurrentTrack={this.props.updateCurrentTrack}
              from={this.props.match.path}
              deletePlaylist={this.props.deletePlaylist}
              />


            </div>
          )}
        </div>
      </div>
    );
  };
}
