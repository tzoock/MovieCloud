import React from "react";
import SongCard from "./SongCard";

export default class Playlists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playlistNameToggle: true,
      playlistInputToggle: false
    };


  }


  playlistNameToInput() {
    this.setState({
      playlistNameToggle: !this.state.playlistNameToggle,
      playlistInputToggle: !this.state.playlistInputToggle

    });

  }


  inputToName(event) {
    if (event.key === 'Enter') {
      this.setState({
        playlistNameToggle: !this.state.playlistNameToggle,
        playlistInputToggle: !this.state.playlistInputToggle

      });
    }

  }


  handlePlaylistNameChange() {
    
    if (this.state.playlistInputToggle===false) {
      this.props.changePlaylistName(event)
    }


  }

  render() {

    const inputPlaylistClass = this.state.playlistInputToggle ? 'input-playlist-name' : 'input-playlist-name-hide';
    const namePlaylistClass = this.state.playlistNameToggle ? 'playlist-name' : 'playlist-name-hide';

    return (
      <div className="playlist-body">
        <div className="playlists-bar">

          <div className="playlists-bar-top">
            <button className="add-playlist-btn" onClick={ this.props.createPlaylist}>Add new playlist</button>
          </div>
          <div className="playlists-bar-bottom">
            <ul>
              {this.props.playlists.map((playlist, i) => <li key={playlist.id}>
                  {playlist.title}
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="right-playlists">
          {this.props.playlists.map((playlist, i) => <div key={playlist.id} className="user-playlist">
              <div className="playlist-header">
                <div className={namePlaylistClass}
                     onClick={() => {
                       this.playlistNameToInput()
                     }}>
                  {playlist.title}
                </div>
                <span className="song-count">{playlist.songs.length}</span>

                <input type="text"
                       className={inputPlaylistClass}
                       onKeyDown={(event) => {
                         this.inputToName(event)
                       }}
                       value={playlist.title}
                       onChange={ ()=>{this.handlePlaylistNameChange()} }
                       />

              </div>
              <div>
                {playlist.songs.length ?
                  playlist.songs.map((song, i) => (
                    <div key={song.id} className="song-card">
                      <SongCard data={song}
                                updateCurrentTrack={this.props.updateCurrentTrack}
                                playlists={this.props.playlists}/>
                    </div>)
                  )
                  :
                  <div>
                    <h3>Please add some song to the playList</h3>
                  </div>
                }

              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
}
