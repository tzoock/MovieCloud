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

  }

  handleScrool(playlistId) {
    console.info(playlistId);
    this.setState({scrollTo:playlistId})
  }


  render() {

    return (
      <div className="playlists-wrap">
        <div className="playlists-bar">

          <div className="playlists-bar-top">
            <button className="add-playlist-btn" onClick={ () => (this.props.createPlaylistHandler()) }>Add new
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
