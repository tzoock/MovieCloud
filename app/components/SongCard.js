import React from 'react';
import {
  NavLink,
  Link
} from "react-router-dom"
import Heart from "./Heart";

export default class SongCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heartMode: '',
      dropDownMode: false
    }

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

    this.setState({dropDownMode: !this.state.dropDownMode})

  }

  heartClick() {


    this.toggleDropHeart();

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

  handleNewPlaylist() {

    this.props.createPlaylist(this.props.song)
  }

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
          <Link to='/Playlists'
                onClick={() => {
                  this.handleNewPlaylist()
                }}>
            Create playlist +
          </Link>
        </div>)
    }
  }

  blurDrop() {

    this.setState({dropDownMode: !this.state.dropDownMode})
  }

  render() {

    return (<div>
        <div className="song-card-img-holder"
             onClick={() => {
               this.props.updateCurrentTrack(this.props.song)
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
           onClick={(u) => {
             this.heartClick(u)
           }}/>


        {this.state.dropDownMode ?
          <div className='dropdown-heart'
               tabIndex="0"
                onBlur={() => {
              this.blurDrop()
             }}
               ref={(droper) => (this.droper = droper)}>

            {this.whereFrom()}

            <ul className="playlist-list-of-checkbox">

              {this.props.playlists.map((playlist) => {
                return <li key={playlist.id}>
                  <label htmlFor={playlist.id}>
                    {playlist.title}
                  </label>
                  <input type="checkbox" id={playlist.id}/>
                </li>
              })}

            </ul>
          </div>
        :
        null}

      </div>
    )
  }
}
