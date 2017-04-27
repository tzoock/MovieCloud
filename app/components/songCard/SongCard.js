import React from 'react';
import {
  NavLink,
  Link
} from "react-router-dom"
import uuid from "uuid";

import './songCard.scss'

import {connect} from "react-redux";


class SongCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heartMode: '',
      dropDownMode: false,
      value: ''
    };
  }

  componentDidMount() {
    this.props.song.playin === false

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


  // componentDidMount() {
  //   if (this.state.dropDownMode) {
  //     this.droper.focus();
  //
  //   }
  // }
  //
  // componentDidUpdate() {
  //   if (this.state.dropDownMode) {
  //     this.droper.blur();
  //   }
  // }


  whereFrom() {
    console.info(this.props.from);
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
          <div className='create-playlist'
               onClick={() => {
                 this.handleNewPlaylist()
               }}>
            Create playlist +
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
    xhr.open('POST', 'http://localhost:3000/serverAddPlaylistWithSong');

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

  // componentDidMount() {
  //
  // }


  // hendleCheckChange(songs) {
  //   console.info(this);
  //   console.info(songs);
  //   songs.forEach((song) => {
  //     if (song.id === this.props.song.id) {
  //       // this.checkboxElm.checked=true;
  //       console.info('gfgf');
  //       // console.info(this.props.song.id);
  //       this.setState({checkMe: true})
  //
  //     }
  //     else {
  //       // this.checkboxElm.checked=false;
  //       this.setState({checkMe: false})
  //     }
  //   });
  //   // console.info(event);
  //   // console.info(this.checkboxElm);
  //
  // }

  componentWillReceiveProps() {
  }

  componentWillMount() {

  }

  serverAddSong(playlistIndex, checked) {

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/serverAddSong');

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
    console.info(this.props.playlists);
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
    console.info(this.props.song);
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
    const plyMod = this.props.playinMode &&
    this.props.currentTrack === this.props.song ?
      'fa fa-pause-circle-o' :
      'fa fa-play-circle-o';

    const songImg = this.props.song.artwork_url ?
      this.props.song.artwork_url.replace("large", "t300x300") :
      this.props.song.artwork_url;

    const inPlayer = this.props.currentTrack === this.props.song ?
      'song-view-mode playin' :
      'song-view-mode';

    return (
      <div>
        <div className="song-card-img"
             style={{backgroundImage: `url(${songImg})`}}
             onClick={() => {
               this.clickSongHandler()
             }}>
          <div className={inPlayer}>
            <span className={plyMod}/>
          </div>
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
      // this.props.createPlaylist(this.props.song)
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
