import React from "react"
import {connect} from "react-redux";
import './player.scss'



class Player extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gotSong: true,
    }
  }


  componentDidUpdate(prevProps, prevState) {

    if (!this.props.playinMode) {
      this.myPlayer.pause();
    }
    if (this.props.playinMode) {
      this.myPlayer.play();
    }
  }

  componentDidMount() {


  }


  songTitleLimiter(title) {
    if (title) {
      if (title.length > 35) {
        return title.slice(0, 32) + '...'
      }
      else {
        return title;
      }
    }
    else {
      return null
    }
  }

  handlePauseAudio() {
// if (this.myPlayer)
    this.props.togglePlayin()
  }

  handlePauseAudio() {
// if (this.myPlayer)
    this.props.togglePlayin()
  }

  render() {
    if (this.props.currentTrack) {
      const songUrl = `${this.props.currentTrack.stream_url}?client_id=Jx6UQUTeG43DMdLLbYutFJlXazNXAHHd`;

      return <footer className="player-footer">
        <div className="player-song-info">
          <img src={this.props.currentTrack.artwork_url}/>
          <div>{this.songTitleLimiter(this.props.currentTrack.title)}</div>
        </div>
        <div className="player-audio">
          <audio controls
                 src={songUrl}
                 type="audio/ogg"
                 autoPlay
                 ref={(ref) => {
                   this.myPlayer = ref
                 }}
                 onPlay={ this.props.playPlayin }
                 onPause={ this.props.pausePlayin }
          />
        </div>
      </footer>
    }

    else {
      return <span></span>
    }

  }
}

function mapDispatchToProps(dispatch) {
  return {
    pausePlayin() {
      dispatch({
        type: 'PAUSE_PLAYIN'
      })
    },
    playPlayin() {
      dispatch({
        type: 'PLAY_PLAYIN'
      })
    }
  }
}


function mapStateToProps(store) {
  return {
    currentTrack: store.currentTrack,
    playinMode: store.playinMode
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);


