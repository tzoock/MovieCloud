import React from 'react';

export default function SongCard(props) {


  return (
    <div>
      <img src={props.props.artwork_url} className="song-card-img"/>
      <p className="song-card-info">{props.props.title}</p>
      <i className="love-it fa fa-heart-o"/>
    </div>
  )
}
