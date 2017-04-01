import React from 'react';

export default function SongCard(props) {
console.info(props);
  function msToTime(duration) {
    const seconds = parseInt((duration / 1000) % 60);
    const minutes = parseInt((duration / (1000 * 60)) % 60);
    return (((minutes < 10) ? "0" + minutes : minutes) + ":" + ((seconds < 10) ? "0" + seconds : seconds));
  }

  function songTitleLimiter(title) {
    return title.slice(0,30)+"..."
  }

  return (
    <div>
      <div className="song-card-img-holder">
        <img src={props.props.artwork_url} className="song-card-img"/>
      </div>
      <div className="song-card-info">
        <div className="song-title">{songTitleLimiter(props.props.title)}</div>
      <div className="song-duration">
        <i className="fa fa-clock-o"/> {msToTime(props.props.duration)}
      </div>
      </div>
      <i className="heart-font fa fa-heart-o"/>
    </div>
  )
}
