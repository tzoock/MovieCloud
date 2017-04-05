import React from 'react';
import {
  NavLink,
  Link
} from "react-router-dom"
import Heart from "./Heart";

export default class SongCard extends React.Component {
  constructor(props) {
    super(props);


  }

  componentDidMount() {

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

  static toggleDropHeart(elm) {


    if (elm.className === 'dropdown-heart-hide') {
      elm.className = "dropdown-heart";
    }
    else  {
      elm.className = 'dropdown-heart-hide';
    }
  }

  heartClick() {
    SongCard.toggleDropHeart(this.dropHeartElm);


  }

  // Heart() {
  //
  //   return(
  //     <div>
  //       <div className="dropdown-heart">
  //         <div className="drop-heart-header">
  //           <h6>Add to Playlist</h6>
  //           <Link to='/Playlist'>Create playlist +</Link>
  //         </div>
  //         <ul className="playlist-list-of checkbox">
  //           <li>
  //             <input type="checkbox" id="playlist-checkbox"/>
  //             <label htmlFor="playlist-checkbox">Rock&roll</label>
  //           </li>
  //         </ul>
  //       </div>
  //     </div>
  //   )
  // }


  render() {
    return (<div>
        <div className="song-card-img-holder" ref={(cardImg)=>{
          this.cardImg=cardImg
        }} onClick={()=>{this.props.updateCurrentTrack(this.props.data)}}>
          <img src={this.props.data.artwork_url? this.props.data.artwork_url.replace("large", "t300x300") : this.props.data.artwork_url} className="song-card-img"/>
        </div>
        <div className="song-card-info">
          <div className="song-title">{SongCard.songTitleLimiter(this.props.data.title)}</div>
          <div className="song-duration">
            <i className="fa fa-clock-o"/> {SongCard.msToTime(this.props.data.duration)}
          </div>
        </div>

        <i className="heart-font fa fa-heart-o" ref={(heartDomElm) => {
          this.heart = heartDomElm
        }} onClick={() => {
          this.heartClick()
        }}/>

          <div className="dropdown-heart-hide" ref={(dropHeart)=>{this.dropHeartElm = dropHeart}}>
            <div className="drop-heart-header">
              <h6>Add to Playlist</h6>
              <Link to='/Playlists'>Create playlist +</Link>
            </div>
            <ul className="playlist-list-of-checkbox">

              {this.props.playlists.map((playlist)=> {
                return <li key={playlist.id}>
                  <input type="checkbox" id="playlist-checkbox"/>
                  <label htmlFor="playlist-checkbox">{playlist.title}</label>
                </li>
              })}

            </ul>
          </div>

      </div>
    )
  }
}
