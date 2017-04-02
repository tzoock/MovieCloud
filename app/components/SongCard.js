import React from 'react';
import {
  NavLink,
  Link
} from "react-router-dom"

export default class SongCard extends React.Component {
  constructor(props) {
    super();


  }

  componentDidMount() {
    this.heart.onClick
  }

  static msToTime(duration) {
    const seconds = parseInt((duration / 1000) % 60);
    const minutes = parseInt((duration / (1000 * 60)) % 60);
    return (((minutes < 10) ? "0" + minutes : minutes) + ":" + ((seconds < 10) ? "0" + seconds : seconds));
  }

  static songTitleLimiter(title) {
    if (title.length > 35) {
      return title.slice(0, 34) + '...'
    }
    else {
      return title;
    }
  }

  toggleHeart(classname) {
    if (classname === 'heart-font fa fa-heart-o') {
      this.heart.className = "heart-font fa fa-heart check-h";
    }
    if (classname === "heart-font fa fa-heart check-h") {
      this.heart.className = 'heart-font fa fa-heart-o';
    }
  }

  addToPlaylistMnu() {
    this.toggleHeart(this.heart.className);
    this.heart.querySelector('.drop-heart').style.display='block'

  }

  render() {
    return (<div>

        <div className="song-card-img-holder">
          <img src={this.props.props.artwork_url.replace("large", "t300x300")} className="song-card-img"/>
        </div>
        <div className="song-card-info">
          <div className="song-title">{SongCard.songTitleLimiter(this.props.props.title)}</div>
          <div className="song-duration">
            <i className="fa fa-clock-o"/> {SongCard.msToTime(this.props.props.duration)}
          </div>
        </div>
        <i className="heart-font fa fa-heart-o" ref={(heartDomElm) => {
          this.heart = heartDomElm
        }} onClick={() => {
          this.addToPlaylistMnu()
        }}>
          <div className="drop-heart">
            <div className="drop-heart-header">
              <h6>Add to Playlist</h6>
              <Link to='/Playlist'>Create playlist +</Link>
            </div>
            <ul className="playlist-list">
              <li>
                <input type="checkbox" id="cbox1"/>
                <label htmlFor="cbox1">Rock&roll</label>
              </li>
            </ul>
          </div>
        </i>

      </div>
    )
  }
}
