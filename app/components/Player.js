import React from "react"

export default class Player extends React.Component {
constructor(){
  super()

}

componentDidMount() {

}

render() {
  return (
    <footer className="player-footer">
      {/*<div className="playing-info">*/}
      {/*<img src={props.props.artwork_url}/>*/}
      {/*<div>{props.props.title}</div>*/}
      {/*</div>*/}
      <div>
        <audio controls
               src="https://api.soundcloud.com/tracks/79973942/stream?client_id=2t9loNQH90kzJcsFCODdigxfp325aq4z"
               type="audio/ogg"/>
      </div>
    </footer>
  );
}
};
