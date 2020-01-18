import React from 'react';
import uuid from "uuid";
import './songCard.scss'
import {connect} from "react-redux";
import {serverLocation} from '../../serverLocation';
import {NavLink} from "react-router-dom";


class SongCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heartMode: '',
      dropDownMode: false,
      value: ''
    };
  }

  msToTime(duration) {
    const seconds = parseInt((duration / 1000) % 60);
    const minutes = parseInt((duration / (1000 * 60)) % 60);
    return (((minutes < 10) ? "0" + minutes : minutes) + ":" + ((seconds < 10) ? "0" + seconds : seconds));
  }

  songTitleLimiter(title) {
    if (title.length > 35) {
      return title.slice(0, 32) + '...'
    }
    else {
      return title;
    }
  }

  toggleDropHeart() {

    this.setState({
      dropDownMode: !this.state.dropDownMode
    })

  }

  whereFrom() {
    if (this.props.from.location.pathname.includes('/Playlists')) {
      return (
        <div className="drop-heart-header">
          <h6>Edit Playlists</h6>
        </div>)
    }
    else {
      return (
        <div className="drop-heart-header">
          <h6>Add to Playlist</h6>
          <div onClick={() => {
                 this.handleNewPlaylist()
               }}>
            <NavLink to="/Playlists"
                     className='create-playlist'>
              Create playlist +
            </NavLink>

          </div>
        </div>)
    }
  }

  handleNewPlaylist() {
    this.toggleDropHeart();
    const newPlaylist = {
      editMode: true,
      id: uuid(),
      title: 'Untitled',
      songs: [this.props.song]
    };

    this.serverAddPlaylist(newPlaylist);
    this.props.createPlaylistWithSong(newPlaylist);

  }

  serverAddPlaylist(data) {

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${serverLocation}/serverAddPlaylistWithSong`);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.addEventListener('load', () => {
      console.info('loaded...');
      this.props.from.push('/Playlists')
    });

    xhr.addEventListener('error', () => {
      console.info('problem!');
    });

    xhr.send(JSON.stringify(data));

    return false;
  }



  serverAddSong(playlistIndex, checked) {

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${serverLocation}/serverAddSong`);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.addEventListener('load', () => {
      console.info('loaded...');
    });

    xhr.addEventListener('error', () => {
      console.info('problem!');
    });

    xhr.send(JSON.stringify({
      song: this.props.song,
      playlistIndex: playlistIndex,
      checked: checked
    }));

    return false;
  }

  handleplaylistChecking(event, playlistIndex) {

    const checked = event.target.checked;
    this.props.updateSong(this.props.song, playlistIndex, checked);
    this.serverAddSong(playlistIndex, checked)


  }

  checkMe() {
    return this.props.playlists.map((playlist, i) => {
      let checkMe = false;

      playlist.songs.forEach((song) => {
        if (song.id === this.props.song.id) {
          checkMe = true;
        }
      });

      return (<label key={playlist.id}>
          {playlist.title}
          <input type="checkbox"
                 checked={checkMe}
                 onChange={(event) => {
                   this.handleplaylistChecking(event, i)
                 }}
          />
        </label>

      )
    })
  }

  clickSongHandler() {
    if (this.props.currentTrack === null) {
      this.props.handleCurrentSong(this.props.song);
      this.props.togglePlayin()
    }
    if (this.props.currentTrack !== this.props.song) {
      this.props.handleCurrentSong(this.props.song);
    }
    else {

      this.props.togglePlayin()
    }

  }

  componentDidUpdate() {
    if (this.props.playinMode) {

    }
  }

  render() {
    const songImg = this.props.song.artwork_url ?
      this.props.song.artwork_url.replace("large", "t200x200")
      :
      this.props.song.artwork_url;

    const inPlayer = this.props.currentTrack === this.props.song ?
      'song-view-mode playin'
      :
      'song-view-mode';

    const plyMod = this.props.playinMode &&
    inPlayer === 'song-view-mode playin' ?
      'fa fa-pause-circle-o'
      :
      'fa fa-play-circle-o';


    return (
      <div>
        <div className="song-card-img"
             style={{backgroundImage: `url(${songImg})`}}
             onClick={() => {
               this.clickSongHandler()
             }}>
          {this.props.currentTrack === this.props.song ?
            <div className={inPlayer}>
              <span className={plyMod}/>
            </div> : null
          }


        </div>
        <div className="song-card-info">
          <div className="song-title">{this.songTitleLimiter(this.props.song.title)}</div>
          <div className="song-duration">
            <i className="fa fa-clock-o"/> {this.msToTime(this.props.song.duration)}
          </div>
        </div>

        <i className="heart-font fa fa-heart-o"
           onClick={() => {
             this.toggleDropHeart()
           }}/>


        {this.state.dropDownMode ?
          <div className='dropdown-heart'>

            {this.whereFrom()}

            <div className="playlist-list-of-checkbox">

              {this.checkMe()}

            </div>
          </div>
          :
          null}

      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleCurrentSong(song) {
      dispatch({
        type: 'UPDATE_CURRENT_TRACK',
        song: song
      })
    },
    togglePlayin() {
      dispatch({
        type: 'TOGGLE_PLAYIN'
      })
    },
    createPlaylistWithSong(newPlaylist) {
      dispatch({
        type: 'CREATE_PLAYLIST_WITH_SONG',
        newPlaylistData: newPlaylist
      })
    },
    updateSong(song, playlistIndex, checked) {
      dispatch({
        type: 'UPDATE_SONG',
        song: song,
        playlistIndex: playlistIndex,
        checked: checked
      })
    },
    rmvSong(song, playlistIndex) {
      dispatch({
        type: 'RMV_SONG',
        song: song,
        playlistIndex: playlistIndex
      })
    }
  }
}

function mapStateToProps(store) {
  return {
    playlists: store.playlists,
    currentTrack: store.currentTrack,
    playinMode: store.playinMode
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongCard);
