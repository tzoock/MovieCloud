import React from 'react';
import {
  NavLink,
  Link
} from "react-router-dom"
import uuid from "uuid";

import './songCard.scss'


export default class SongCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heartMode: '',
      dropDownMode: false,
      value: '',
      checker: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this)
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
          <Link className='create-playlist'
                to='/Playlists'
                onClick={() => {
                  this.handleNewPlaylist()
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
this.props.checkMe===true? this.setState({checker: true}) : this.setState({checker: false})
  }

  componentWillMount() {

  }

  handleInputChange(event) {
    this.props.isInPlaylist(this.props.song);
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    console.info(target.checked);
    console.info(name);

    // this.setState({
    //   value: !this.state.value
    // });
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
           onClick={() => {
             this.toggleDropHeart()
           }}/>


        {this.state.dropDownMode ?
          <div className='dropdown-heart'
               ref={(droper) => (this.droper = droper)}>

            {this.whereFrom()}

            <div className="playlist-list-of-checkbox">

              {this.props.playlists.map((playlist) => {
                return (
                  <div key={uuid()}
                       className="playlist-list-of-checkbox">


                    <label key={playlist.id}>
                      {playlist.title}
                      <input type="checkbox"
                             onChange={this.handleInputChange}
                             // name={playlist.title}
                             checked={this.state.checker}
                             ref={(checkboxElm) => {
                               this.checkboxElm = checkboxElm
                             }}/>
                    </label>


                  </div>)
              })}

            </div>
          </div>
          :
          null}

      </div>
    )
  }
}

//
// <label>
//   Is going:
//   <input
//     name="isGoing"
//     type="checkbox"
//     checked={this.state.isGoing}
//     onChange={this.handleInputChange} />
// </label>

// songCard.propTypes()
