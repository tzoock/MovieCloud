import React from "react"

import './player.scss'

export default class Player extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gotSong: true
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentTrack.title !== this.props.currentTrack.title) {
      this.didSongArrive()
    }
    if (prevState.gotSong !== this.state.gotSong) {
      this.didSongArrive();
    }
  }

  componentDidMount() {
    this.didSongArrive();
  }

  didSongArrive() {
    if (typeof this.props.currentTrack.title === 'undefined') {
      this.setState({gotSong: false})
    }
    else {
      this.setState({gotSong: true})
    }
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

  render() {

    const songUrl = `${this.props.currentTrack.stream_url}?client_id=2t9loNQH90kzJcsFCODdigxfp325aq4z`;


    switch (this.state.gotSong) {
      case false:
        return <span></span>
      case true: {
        return (
          <footer className="player-footer">
            <div className="player-song-info">
              <img src={this.props.currentTrack.artwork_url}/>
              <div>{this.songTitleLimiter(this.props.currentTrack.title)}</div>
            </div>
            <div className="player-audio">
              <audio controls
                     src={songUrl}
                     type="audio/ogg"
                     autoPlay/>
            </div>
          </footer>
        )
      }
    }
  }
}
