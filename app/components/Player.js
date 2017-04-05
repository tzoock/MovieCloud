import React from "react"

export default function Player (props) {


  const songUrl = `${props.currentTrack.stream_url}?client_id=2t9loNQH90kzJcsFCODdigxfp325aq4z`;
  return (
    <footer className="player-footer">
      <div className="playing-info">
      <img src={props.currentTrack.artwork_url}/>
      <div>{props.currentTrack.title}</div>
      </div>
      <div>
        <audio controls
               src= {songUrl}
               type="audio/ogg"
                autoPlay/>
      </div>
    </footer>
  );
}

// when get no props make it hide
