import React from 'react';
import {
  NavLink,
  Link
} from "react-router-dom"
import uuid from "uuid";

import './songCard.scss'

import store from "../../store";
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
    if (this.props.from === '/Playlists') {
      return (
        <div className="drop-heart-header">
          <h6>Edit Playlists</h6>
        </div>)
    }
    else {
      return (
        <div className="drop-heart-header">
          <h6>Add to Playlist</h6>
          <Link className='create-playlist'
                to='/Playlists'
                onClick={() => {
                  this.props.handleNewPlaylist(this.props.song)
                }}>
            Create playlist +
          </Link>
        </div>)
    }
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

  handleInputChange(event, playlistIndex) {

    const checked = event.target.checked;
  this.props.updateSong(this.props.song, playlistIndex, checked)


  }

  checkMe() {

    return this.props.playlists.map((playlist, i) => {
      let checkMe = false;

      playlist.songs.forEach((song) => {
        if (song.id === this.props.song.id) {
          console.info('gotcha');
          checkMe = true;
        }
      });

      return (<label key={playlist.id}>
          {playlist.title}
          <input type="checkbox"
                 checked={checkMe}
                 onChange={(event)=>{this.handleInputChange(event, i)}}
          />
        </label>

      )
    })
  }

  render() {

    return (<div>
        <div className="song-card-img-holder"
             onClick={() => {
               this.props.handleCurrentSong(this.props.song)
             }}>
          <img className="song-card-img"
               src={this.props.song.artwork_url ?
                 this.props.song.artwork_url.replace("large", "t300x300") :
                 this.props.song.artwork_url}/>
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
    handleNewPlaylist(song) {
      dispatch({
        type: 'CREATE_PLAYLIST',
        song: song
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
    playlists: store.playlists
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongCard);
