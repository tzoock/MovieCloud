export default function Player(props) {


  return (
    <footer className="player-footer">
      <div className="playing-info">
      <img src={props.props.artwork_url}/>
      <div>{props.props.title}</div>
      </div>
      <div>
      <audio controls src="https://api.soundcloud.com/tracks/79973942/stream?client_id=e582b63d83a5fb2997d1dbf2f62705da" type="audio/ogg"/>
      </div>
    </footer>
  );
};
